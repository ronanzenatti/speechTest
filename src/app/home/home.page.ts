import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Platform } from '@ionic/angular';
import { Component, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isRecording = false;
  public matchs: String[];

  constructor(private plt: Platform, private speechRecognition: SpeechRecognition, private changeDetector: ChangeDetectorRef) { }

  public isIos() {
    return this.plt.is('ios');
  }

  public getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }

  public startListening() {
    let options = {
      language: 'pt-BR'
    }

    this.speechRecognition.startListening(options).subscribe(matchs => {
      this.matchs = matchs;
      this.changeDetector.detectChanges();
    });

    this.isRecording = true;

  }

  public stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    })
  }



}
