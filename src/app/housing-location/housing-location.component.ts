import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housingLocation';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}"> <!-- Interpolación lección 7 -->
      <h2 class="listing-heading">{{ housingLocation.name }}</h2> <!-- Interpolación  -->
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>  <!-- Interpolación  -->
      <a [routerLink]="['/details',housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

}
