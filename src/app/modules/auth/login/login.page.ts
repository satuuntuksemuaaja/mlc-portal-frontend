import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService
} from '@azure/msal-angular';
import {
  RedirectRequest,
  PopupRequest,
  InteractionType,
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { OrgService } from 'src/app/services/org.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Organisation, OrgRepository } from 'src/app/stores/org.repository';

@Component({
  selector: 'mlc-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
  public isIframe = false;
  public loginDisplay = false;
  public showLoading = true;
  public orgLoaded = false;
  public organisation: Organisation = null;

  private readonly destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private navService: NavigationService,
    private router: ActivatedRoute,
    private orgService: OrgService,
    private orgRepo: OrgRepository,
    private authenticationService: AuthService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(async () => {
        this.setLoginDisplay();
        if (this.authService.instance.getAllAccounts().length > 0) {
          await this.authenticationService.refreshToken();
          this.showLoading = false;
          this.navService.navigateForward('/dashboard', true);
        }
      });
    this.msalBroadcastService.inProgress$.pipe(takeUntil(this.destroying$)).subscribe((data) => {
      if (
        data === InteractionStatus.HandleRedirect ||
        data === InteractionStatus.Startup ||
        data === InteractionStatus.Login
      ) {
        this.showLoading = true;
      } else {
        this.showLoading = false;
        this.router.queryParams.subscribe(async (params) => {
          if (this.authService.instance.getAllAccounts().length === 0) {
            if (!params?.org) {
              const org = this.orgRepo.store.state.org?.org;
              if (org?.key) {
                await this.checkOrganisationStatus(org?.key);
              } else {
                this.navService.navigateForward('/invalid-organisation');
              }
            } else {
              await this.checkOrganisationStatus(params?.org);
            }
          }
        });
      }
    });

    this.orgRepo.org$.pipe(takeUntil(this.destroying$)).subscribe((data) => {
      this.organisation = data;
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  proceedLogin(userFlowRequest?: RedirectRequest | PopupRequest) {
    this.showLoading = true;
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup(userFlowRequest).subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
          ...userFlowRequest
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  gotoRegister() {
    this.proceedLogin();
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
  }

  imageError() {
    this.utilityService.hideImageOnError('org-logo');
  }

  private async checkOrganisationStatus(orgId: string) {
    try {
      this.showLoading = true;
      const org = await this.orgService.getOrganisation(orgId);
      this.orgLoaded = true;
      this.showLoading = false;
      if (!org) {
        return this.navService.navigateForward('/invalid-organisation');
      }
    } catch (error) {
      return this.navService.navigateForward('/invalid-organisation');
    }
  }
}
