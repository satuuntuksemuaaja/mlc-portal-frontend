import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';
import { UserDetails, UserRepository } from 'src/app/stores/user.repository';
import { ValidationHelper } from 'src/app/utils/validation-helper';

@Component({
  selector: 'mlc-agent-settings',
  templateUrl: './agent-settings.page.html',
  styleUrls: ['./agent-settings.page.scss']
})
export class AgentSettingsPage implements OnInit, OnDestroy {
  public clientForm: FormGroup;
  public userDetails: UserDetails = null;
  public loading = false;
  public userProfileImage = null;
  public cropImage = false;
  private destroy$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private userRepo: UserRepository,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.userRepo.userDetails$
      .pipe(takeUntil(this.destroy$.asObservable()))
      .subscribe((userDetails) => {
        this.userDetails = { ...userDetails };
      });
    this.setupForm();

    this.userRepo.userImages$
      .pipe(takeUntil(this.destroy$?.asObservable()))
      .subscribe((userImages) => {
        if (userImages?.photo) {
          this.userProfileImage = this.utilityService.getSecureUrl(userImages?.photo);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  setupForm() {
    this.clientForm = this.formBuilder.group({
      name: [this.userDetails?.me?.name, [Validators.required]],
      email: [{ value: this.userDetails?.me?.email, disabled: true }, [Validators.required]],
      phone: [this.userDetails?.me?.phone, [...ValidationHelper.phoneValidationRules]]
    });
  }

  cancel() {
    this.setupForm();
  }

  save() {
    if (this.clientForm?.valid) {
      this.loading = true;
      console.log(this.userDetails?.me?.name);
      this.authService
        .updateUserInformaiton({
          name: this.clientForm.value?.name,
          phone: this.clientForm.value?.phone
        })
        .subscribe({
          next: () => {
            this.loading = false;
          },
          error: (e) => {
            console.log(e);
            this.loading = false;
          }
        });
    }
  }

  updateImage($event) {
    this.cancelCropper();
    this.loading = true;
    this.authService.updateUserPhoto({ thumb: $event }).subscribe({
      next: () => {},
      error: (e) => {
        console.log(e);
        this.cancelCropper();
        this.loading = false;
        this.utilityService.openAlert({
          title: 'Update Image Failed',
          message: 'Image Updated Successfully',
          type: 'error'
        });
      },
      complete: () => {
        this.loading = false;
        this.utilityService.openAlert({
          title: 'Upload Success',
          message: 'Image Updated Successfully',
          type: 'success'
        });
      }
    });
  }

  cancelCropper() {
    this.cropImage = false;
  }

  showCropper() {
    this.cropImage = true;
  }
}
