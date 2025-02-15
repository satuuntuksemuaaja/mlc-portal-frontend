import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { InvalidOrganisationPage } from './invalid-organisation.page';

describe('InvalidOrganisationPage', () => {
  let component: InvalidOrganisationPage;
  let fixture: ComponentFixture<InvalidOrganisationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidOrganisationPage],
      imports: [IonicModule.forRoot(), ComponentsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InvalidOrganisationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
