import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  AuthenticationResult,
  InteractionStatus
} from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';
import { OrgService } from './services/org.service';
import { SideBarService } from './services/side-bar.service';
import { UtilityService } from './services/utility.service';
import { ActivityRepository } from './stores/activity.repository';
import { ClientsRepository } from './stores/clients.repository';
import { OrgRepository } from './stores/org.repository';
import { User, UserDetails, UserRepository } from './stores/user.repository';
import { Popup, PopupService } from './services/popup.service';

@Component({
  selector: 'mlc-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('appDrawer') public sidenav: MatSidenav;
  isLoggedIn = false;
  displayedColumns: string[] = ['claim', 'value'];
  orgLogo: string = null;
  userDetails: UserDetails = null;
  dataSource: {
    name: string;
    sub: string;
    givenName: string;
    familyName: string;
  } = null;
  public checkingSystemUp = true;
  public isSystemDown = false;
  private intervalID = null;
  private readonly destroying$ = new Subject<void>();
  constructor(
    private sidebarService: SideBarService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private userRepo: UserRepository,
    private clientsRepo: ClientsRepository,
    private authService: AuthService,
    private navService: NavigationService,
    private orgRepo: OrgRepository,
    private activityRepo: ActivityRepository,
    private router: Router,
    private utilityService: UtilityService,
    private orgService: OrgService,
    private popupService: PopupService
  ) {
    this.checkSystemDown();
  }

  ngAfterViewInit(): void {
    this.sidebarService.setSidenav(this.sidenav);

    window.addEventListener('online', () => this.checkSystemDown());
    window.addEventListener('offline', () => this.checkSystemDown());
    this.intervalID = window.setInterval(() => {
      this.checkSystemDown();
    }, 60000);
    
  }

  ngOnInit(): void {
    let activeAccount = this.msalService.instance.getActiveAccount();
    const accounts = this.msalService.instance.getAllAccounts();

    if (activeAccount && accounts?.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      this.getClaims(activeAccount?.idTokenClaims);
      this.storeUser(activeAccount);
      this.setLoginDisplay();
    } else {
      this.msalBroadcastService.msalSubject$
        .pipe(
          filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
          takeUntil(this.destroying$)
        )
        .subscribe(async (result: EventMessage) => {
          const payload = result.payload as AuthenticationResult;
          this.msalService.instance.setActiveAccount(payload.account);
          activeAccount = this.msalService.instance.getActiveAccount();
          await this.authService.refreshToken();
          this.getClaims(activeAccount?.idTokenClaims);
          this.storeUser(activeAccount);
        });
      this.msalBroadcastService.inProgress$
        .pipe(filter((status: InteractionStatus) => status === InteractionStatus.None))
        .subscribe(() => {
          this.setLoginDisplay();
          this.checkAndSetActiveAccount();
          activeAccount = this.msalService.instance.getActiveAccount();
          this.getClaims(activeAccount?.idTokenClaims);
        });
    }

    this.orgRepo.org$.pipe(takeUntil(this.destroying$)).subscribe((data) => {
      this.orgLogo = data?.org.logoThumbnail;
    });

    this.userRepo.userDetails$.pipe(takeUntil(this.destroying$)).subscribe({
      next: (data) => {
        this.userDetails = data;
      }
    });
    this.getPopupDetails();
  }

  getPopupDetails() {
    this.popupService.popupUpdated.pipe(takeUntil(this.destroying$)).subscribe((details: Popup) => {
      try {
        if (details.title==='Run Logged-Out') {
          this.logout();
        }
      } catch (error) {
        console.log('Error');
      }
    });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      const accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  imageError() {
    this.utilityService.hideImageOnError('orgLogoRef');
  }

  setLoginDisplay() {
    this.isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;
    setTimeout(() => {
      this.sidebarService.setSidenav(this.sidenav);
    }, 300);
  }

  getClaims(claims: any) {
    this.dataSource = {
      name: claims ? claims.name : null,
      sub: claims ? claims.sub : null,
      givenName: claims ? claims.given_name : null,
      familyName: claims ? claims.family_name : null
    };
  }

  ngOnDestroy(): void {
    this.destroying$.next(undefined);
    this.destroying$.complete();
    clearInterval(this.intervalID);
  }

  logout() {
    this.userRepo.removeUser();
    this.clientsRepo.clear();
    this.activityRepo.clear();
    this.msalService.logout().subscribe(() => {});
  }

  private storeUser(activeAccount) {
    const user: User = {
      _id: activeAccount.localAccountId,
      accessLevel: 'Standard',
      email:
        activeAccount.idTokenClaims.emails?.length > 0
          ? activeAccount.idTokenClaims.emails[0]
          : activeAccount.username,
      ...this.dataSource,
      localAccountId: activeAccount.localAccountId,
      photo: null
    };

    this.userRepo.setUser(user);
    this.refreshUserDetails();
  }

  private refreshUserDetails() {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        console.log('updated user details --- ', data);
      },
      error: console.error
    });
    this.authService.getUserProfileImage().subscribe({
      next: (data) => {
        console.log('updated user profile image --- ', data);
      },
      error: (e) => {
        console.log(e);
      }
    });
    this.orgService.getAllOrganisation();
  }

  private checkSystemDown() {
    this.authService.checkSystemDown().subscribe({
      next: () => {
        this.isSystemDown = false;
        this.checkingSystemUp = false;
        setTimeout(() => {
          this.sidebarService.setSidenav(this.sidenav);
        }, 300);
      },
      error: () => {
        // this.navService.navigateForward('system-down', true);
        this.isSystemDown = true;
        this.checkingSystemUp = false;
      }
    });
  }
}
