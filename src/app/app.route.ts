import { Routes } from '@angular/router';
import { LoginComponent } from './components/common/login/login.component';
import { PlayerComponent } from './components/nba/player/players-grid.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'players', component: PlayerComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
  
