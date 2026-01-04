import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpoonService } from '../../services/spoon.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start"><ion-back-button defaultHref="/"></ion-back-button></ion-buttons>
    <ion-title>{{ recipe?.title || 'Details' }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding" *ngIf="recipe">
  <ion-card>
    <img [src]="recipe.image" *ngIf="recipe.image"/>
    <ion-card-header>
      <ion-card-title>{{ recipe.title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <h3>Ingredients</h3>
      <ion-list>
        <ion-item *ngFor="let ing of measuredIngredients">
          <ion-label>
            {{ ing.original }} — {{ ing.amount }} {{ ing.unit }}
          </ion-label>
        </ion-item>
      </ion-list>

      <h3>Instructions</h3>
      <div *ngIf="steps?.length; else noInst">
        <ol>
          <li *ngFor="let s of steps">{{ s.number }}. {{ s.step }}</li>
        </ol>
      </div>
      <ng-template #noInst><p>No instructions available.</p></ng-template>

      <ion-button expand="block" (click)="toggleFavourite()">{{ favButton }}</ion-button>
    </ion-card-content>
  </ion-card>
</ion-content>
`,
  providers: [SpoonService]
})
export class DetailsPage {
  recipe: any = null;
  measuredIngredients: any[] = [];
  steps: any[] = [];
  favButton = 'Add to Favourites';
  constructor(private route: ActivatedRoute, private spoon: SpoonService, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.load(id);
  }

  async load(id: number) {
    this.recipe = await this.spoon.getRecipeInformation(id);
    const measurement = this.spoon.getMeasurement(); // 'metric' or 'us'
    this.measuredIngredients = (this.recipe?.extendedIngredients || []).map((ing: any) => {
      const m = measurement === 'us' ? (ing.measures?.us || {}) : (ing.measures?.metric || {});
      return {
        original: ing.original,
        amount: m.amount ?? '',
        unit: m.unitLong ?? ''
      };
    });
    this.steps = (this.recipe?.analyzedInstructions?.[0]?.steps || []).map((s: any) => ({ number: s.number, step: s.step }));
    const idStr = String(this.recipe.id);
    const favs = this.spoon.getFavourites();
    this.favButton = favs.includes(idStr) ? 'Remove From Favourites' : 'Add to Favourites';
  }

  toggleFavourite() {
    const idStr = String(this.recipe.id);
    const isFav = this.spoon.toggleFavourite(idStr);
    this.favButton = isFav ? 'Remove From Favourites' : 'Add to Favourites';
  }
}
