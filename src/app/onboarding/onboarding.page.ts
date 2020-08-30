import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import {onboardingValues} from '../data/onboarding';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  public onboardSlides = [];
  public showGoButton = false;
  @ViewChild('mainSlides', {static: true}) slides: IonSlides;
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.onboardSlides = onboardingValues;
  }

  public goBack(){
    this.slides.slidePrev();
  }

  public skipBtn(){
    this.navCtrl.navigateRoot(['./home']);
  }

  public goNext(){
    this.slides.slideNext();
  }

  public doCheck(){
    this.slides.isEnd().then(data => {
      if (data){
        this.showGoButton = true;
      }
    });
  }
}
