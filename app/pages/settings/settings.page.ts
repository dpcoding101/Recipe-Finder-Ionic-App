import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SpoonService } from '../../services/spoon.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Settings</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list>
    <ion-radio-group [(ngModel)]="measurement" (ionChange)="save()">
      <ion-list-header><ion-label>Measurement</ion-label></ion-list-header>
      <ion-item>
        <ion-label>Metric</ion-label>
        <ion-radio slot="start" value="metric"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>US</ion-label>
        <ion-radio slot="start" value="us"></ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</ion-content>
`,
  providers: [SpoonService]
})
export class SettingsPage {
  measurement = 'metric';
  constructor(private spoon: SpoonService) {
    this.measurement = this.spoon.getMeasurement();
  }
  save() {
    this.spoon.setMeasurement(this.measurement);
  }
}
