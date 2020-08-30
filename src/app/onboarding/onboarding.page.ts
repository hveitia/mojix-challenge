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

  // Slides showing onboarding information
  public onboardSlides = [];

  // Flag to show the button that leads to home
  public showGoButton = false;

  // Reference for handling sliders
  @ViewChild('mainSlides', {static: true}) slides: IonSlides;
  constructor(private router: Router) {}

  ngOnInit() {
    this.onboardSlides = onboardingValues;
  }

  // Go to previous slide
  public goBack(){
    this.slides.slidePrev();
  }

  // Go to home
  public skipBtn(){
    this.router.navigate(['./home']);
  }

  // Go to next slide
  public goNext(){
    this.slides.slideNext();
  }

  // Check if the last slide has been shown
  public doCheck(){
    this.slides.isEnd().then(data => {
      if (data){
        this.showGoButton = true;
      }
    });
  }
}
