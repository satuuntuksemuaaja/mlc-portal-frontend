import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MsalBroadcastService,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE
} from '@azure/msal-angular';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { MSALInstanceFactory } from 'src/app/auth.config';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let msalServiceStub: Partial<MsalService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: MSAL_GUARD_CONFIG, useValue: MSAL_GUARD_CONFIG },
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory
        },
        { provide: MsalService, useValue: msalServiceStub },
        MsalBroadcastService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
