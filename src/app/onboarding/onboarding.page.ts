import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  public onboardSlides = [];
  public showGoButton = false;
  @ViewChild('mainSlides', {static: true}) slides: IonSlides;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.onboardSlides = [
      {
        title: 'Hello',
        img: 'slide_1',
        desc: 'Welcome to Mojix Code Challenge'
      },
      {
        title: 'Who I am?',
        img: 'slide_2',
        desc: 'Héctor Veitía Vila, lover of mobile development.'
      },
      {
        title: 'About the challenge',
        img: 'slide_3',
        desc: 'Small app that interacts with the API https://www.themoviedb.org/ using the best practices.'
      }
    ];
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
