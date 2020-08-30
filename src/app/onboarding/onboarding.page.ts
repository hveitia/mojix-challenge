import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {onboardingValues} from '../data/onboarding';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  public onboardSlides = [];
  public showGoButton = false;
  @ViewChild('mainSlides', {static: true}) slides: IonSlides;
  constructor(private router: Router) {}

  ngOnInit() {
    this.onboardSlides = onboardingValues;
  }

  public goBack(){
    this.slides.slidePrev();
  }

  public skipBtn(){
    this.router.navigate(['./home']);
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
