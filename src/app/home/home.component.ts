import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from '../housingLocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form action=" ">
        <input type="" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location  *ngFor="let HousingLocation of filteredLocationList" [housingLocation]="HousingLocation" ></app-housing-location>
      
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  // agregar lista 
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject
  (HousingService) 
  filteredLocationList: HousingLocation[] = [];
  constructor(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }
  filterResults(text: string){
    if(!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

}
