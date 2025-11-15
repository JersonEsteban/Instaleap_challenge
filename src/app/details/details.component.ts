import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housingLocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="max-w-7xl mx-auto mt-10 p-6">

      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">

        
        <img 
          class="w-full h-[450px] object-cover rounded-2xl shadow-lg" 
          [src]="housingLocation?.photo" 
          alt="Listing image"
        >

        
        <div>

          <section class="mb-8">
            <h2 class="text-4xl font-bold text-gray-900 mb-2">
              {{housingLocation?.name}}
            </h2>
            <p class="text-xl flex items-center gap-2 text-gray-600">
              <img src="/assets/location-pin.svg" class="w-5 h-5 opacity-70" />
              {{housingLocation?.city}}, {{housingLocation?.state}}
            </p>
          </section>

          <section class="mb-10">
            <h2 class="text-2xl font-semibold text-indigo-600 mb-4">
              About this housing location
            </h2>

            <ul class="space-y-2 text-lg text-gray-700">
              <li>Units available: <strong>{{housingLocation?.availableUnits}}</strong></li>
              <li>Wifi available: <strong>{{housingLocation?.wifi}}</strong></li>
              <li>Laundry available: <strong>{{housingLocation?.laundry}}</strong></li>
            </ul>
          </section>

        </div>
      </div>

      
      <section class="w-full bg-white shadow-xl rounded-2xl p-12 mb-10">

        <h2 class="text-3xl font-semibold text-indigo-600 mb-10 text-center">
          Apply now to live here
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          
          <div class="text-lg text-gray-700 leading-relaxed">
            <p class="mb-4">
              Complete your application to start the process of living at 
              <strong>{{housingLocation?.name}}</strong>. 
            </p>
            <p class="mb-4">
              After submitting the form, our team will review your application 
              and contact you via email for the next steps.
            </p>
            <p>
              Please make sure the information you provide is accurate to avoid delays.
            </p>
          </div>

          <!-- Formulario -->
          <form 
            [formGroup]="applyForm" 
            (submit)="submitApplication()" 
            class="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-200"
          >

            <div>
              <label class="font-medium text-gray-700 mb-1 block">First Name</label>
              <input 
                id="first-name"
                type="text"
                formControlName="firstName"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 
                       focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 
                       outline-none transition"
              >
            </div>

            <div>
              <label class="font-medium text-gray-700 mb-1 block">Last Name</label>
              <input 
                id="last-name"
                type="text"
                formControlName="lastName"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 
                       focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 
                       outline-none transition"
              >
            </div>

            <div>
              <label class="font-medium text-gray-700 mb-1 block">Email</label>
              <input 
                id="email"
                type="text"
                formControlName="email"
                class="w-full border border-gray-300 rounded-xl px-4 py-3 
                       focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 
                       outline-none transition"
              >
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 
                     rounded-xl font-medium transition active:scale-95 shadow-md"
            >
              Apply now
            </button>

          </form>

        </div>

      </section>

    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
