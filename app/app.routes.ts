import { Route } from '@angular/router';
export const routes: Route[] = [
  { path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'details/:id', loadComponent: () => import('./pages/details/details.page').then(m => m.DetailsPage) },
  { path: 'favourites', loadComponent: () => import('./pages/favourites/favourites.page').then(m => m.FavouritesPage) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage) },
];
