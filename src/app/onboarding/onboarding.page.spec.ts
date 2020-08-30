import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { OnboardingPage } from './onboarding.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingPage ],
      imports: [RouterTestingModule, IonicModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should Create', () => {
    expect(component).toBeTruthy();
  });
  it('Must have Skip button', () => {
    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#buttonSkipContainer').textContent).toEqual(' Skip ');
  });
  it('Must contain 3 slides', () => {
    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.onb-card').length).toBe(3);
  });
});
