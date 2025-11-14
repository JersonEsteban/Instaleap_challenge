import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="listing">
      <img class="listing-photo" src="" alt="">
      <h2 class="listing-heading"></h2>
      <p class="listing-location"></p>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {

}
