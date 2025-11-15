import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main class="min-h-screen bg-gray-50">
      <header class="flex justify-center items-center h-20 px-6 shadow-md bg-white">
        <img class="h-10 w-auto" src="assets/logo.svg" alt="logo" aria-hidden="true">
      </header>

      <section class="p-4 max-w-7xl mx-auto">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = 'homes';
}
