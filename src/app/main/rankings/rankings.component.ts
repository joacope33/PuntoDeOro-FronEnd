import { Component } from '@angular/core';
import { FemaleComponent } from './female/female.component';
import { MaleComponent } from './male/male.component';
@Component({
  selector: 'app-rankings',
  imports: [FemaleComponent, MaleComponent],
  templateUrl: './rankings.component.html',
  standalone: true,
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {}
