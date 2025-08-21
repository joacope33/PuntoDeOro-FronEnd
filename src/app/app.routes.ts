import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TorneosComponent } from './main/torneos/torneos.component';
import { RankingsComponent } from './main/rankings/rankings.component';
import { MaleComponent } from './main/rankings/male/male.component';
import { FemaleComponent } from './main/rankings/female/female.component';
import { LoginComponent } from '././auth/login/login.component';
import { ModalTurnoComponent } from './main/new-calendar/modalturno/modalturno.component';
import { CanchasComponent } from './main/canchas/canchas.component';
import { GrillaComponent } from './main/torneos/grilla/grilla.component';
import { NewCalendarComponent } from './main/new-calendar/new-calendar.component';


export const routes: Routes = [
  { path: '', component: MainComponent }, // Ruta principal
  { path: 'calendar', component: CanchasComponent },
  { path: 'torneos', component: TorneosComponent },
  { path: 'ranking', component: RankingsComponent },
  { path: 'ranking/male', component: MaleComponent },
  { path: 'ranking/female', component: FemaleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'turno', component: ModalTurnoComponent },
  { path: 'canchas', component: CanchasComponent },
  { path: 'grilla', component: GrillaComponent },
  { path: 'calendario', component: NewCalendarComponent },
];
