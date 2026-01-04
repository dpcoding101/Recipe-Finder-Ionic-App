import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SpoonService } from '../../services/spoon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>Favourites</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list *ngIf="favourites.length; else noFav">
    <ion-item *ngFor="let f of favourites">
      <ion-label>
        <h2>{{ f.title }}</h2>
        <p>Id: {{ f.id }}</p>
      </ion-label>
      <ion-button slot="end" (click)="details(f.id)">Details</ion-button>
    </ion-item>
  </ion-list>
  <ng-template #noFav>
    <p>No favourites yet.</p>
  </ng-template>
</ion-content>
`,
  providers: [SpoonService]
})
export class FavouritesPage {
  favourites: any[] = [];
  constructor(private spoon: SpoonService, private router: Router) {
    this.load();
  }
  async load() {
    const favIds = this.spoon.getFavourites();
    // fetch brief info for each favourite
    this.favourites = [];
    for (const id of favIds) {
      try {
        const info = await this.spoon.getRecipeInformation(Number(id));
        this.favourites.push({ id: info.id, title: info.title });
      } catch(e) { console.error(e); }
    }
  }
  details(id: number) { this.router.navigate(['/details', id]); }
}
