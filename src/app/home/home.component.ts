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
    <section class="flex justify-center mt-10">
      <form class="flex items-center gap-3 bg-white shadow-lg px-5 py-4 rounded-2xl w-full max-w-xl">
        <input 
          placeholder="Filter by city"
          #filter
          class="border border-gray-300 rounded-xl px-4 py-2 w-full focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 outline-none transition"
        >
        
        <button 
          type="button" 
          class="px-5 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>

    <section 
      class="grid gap-6 mt-12 px-5 
             sm:grid-cols-2 
             md:grid-cols-2 
             lg:grid-cols-3 
             xl:grid-cols-4 
             justify-center">

      <div 
        *ngFor="let HousingLocation of filteredLocationList"
        class="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl"
      >
        <app-housing-location  
          [housingLocation]="HousingLocation">
        </app-housing-location>
      </div>

    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService) 
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) =>{
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string){
    if(!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
