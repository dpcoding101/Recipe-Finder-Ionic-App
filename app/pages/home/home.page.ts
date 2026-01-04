import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpoonService } from '../../services/spoon.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
  template: `
<ion-header translucent>
  <ion-toolbar>
    <ion-title>G00398731</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/favourites" aria-label="Favourites"><ion-icon name="heart"></ion-icon></ion-button>
      <ion-button routerLink="/settings" aria-label="Settings"><ion-icon name="settings"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-item>
    <ion-label position="stacked">Enter ingredients (comma separated)</ion-label>
    <ion-input [(ngModel)]="query" placeholder="eg. chicken, rice"></ion-input>
  </ion-item>
  <ion-button expand="block" (click)="search()">Search</ion-button>

  <ion-list *ngIf="recipes?.length">
    <ion-item *ngFor="let r of recipes">
      <ion-thumbnail slot="start">
        <img [src]="r.image" />
      </ion-thumbnail>
      <ion-label>
        <h2>{{ r.title }}</h2>
        <p>Id: {{ r.id }}</p>
      </ion-label>
      <ion-button slot="end" (click)="details(r.id)">Details</ion-button>
    </ion-item>
  </ion-list>

  <ion-list *ngIf="recipes && recipes.length === 0">
    <ion-item>
      <ion-label>No recipes found.</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
`,
  providers: [SpoonService]
})
export class HomePage {
  query = '';
  recipes: any[] = [];
  constructor(private spoon: SpoonService, private router: Router) {}
  search() {
    const q = (this.query || '').trim();
    if (!q) { this.recipes = []; return; }
    this.spoon.searchByIngredients(q).then(r => {
      this.recipes = r || [];
    }).catch(e => {
      console.error(e);
      this.recipes = [];
    })
  }
  details(id: number) {
    this.router.navigate(['/details', id]);
  }
}
