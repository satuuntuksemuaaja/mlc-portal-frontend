import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'mlc-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public showLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.signupForm = this.formBuilder.group({
      key: ['', [Validators.required]]
    });
  }

  async checkAPIKey() {
    if (this.signupForm.valid) {
      try {
        this.showLoading = true;
        const isAvailable: any = await this.authService.checkAPIKey(this.signupForm.value?.key);
        this.showLoading = false;
        if (isAvailable.result !== 'ok') {
          return await this.utilityService.openAlert({
            title: 'Invalid Sign-up Key',
            message: 'Confirm with your administrator for My Life Capsule.',
            type: 'error'
          });
        }

        console.log('proceed signup');
      } catch (error) {
        this.showLoading = false;
        return await this.utilityService.openAlert({
          title: 'Invalid Sign-up Key',
          message: 'Confirm with your administrator for My Life Capsule.',
          type: 'error'
        });
      }
    }
  }
}
