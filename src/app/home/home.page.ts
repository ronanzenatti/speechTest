import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { Platform } from '@ionic/angular';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

export interface IOptions {
  /** text to speak */
  text: string;
  /** a string like 'en-US', 'zh-CN', etc */
  locale?: string;
  /** speed rate, 0 ~ 1 */
  rate?: number;
  /** ambient(iOS) */
  category?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isRecording = false;
  public matchs: String[];

  ngOnInit(): void {

  }

  constructor(private plt: Platform, private speechRecognition: SpeechRecognition, private changeDetector: ChangeDetectorRef, private tts: TextToSpeech) {
  }

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
      language: 'pt-BR',
      prompt: 'Diga o seu problema?',
      showPopup: true,
      showPartial: true
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

  public speakText(text: string) {

    let options: IOptions = {
      text: text,
      locale: 'pt-BR'
    }

    this.tts.speak(options);
  }



}
