import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DonateComponent } from './components/donate/donate.component';

const routes: Routes = [
  {   path:'',  component:HomeComponent, pathMatch:'full' },
  {   path:'home',  component:HomeComponent },
  {   path:'about',  component:AboutusComponent},
  {   path:'contact',  component:ContactusComponent },
  {   path:'events',  component:EventsComponent },
  {   path:'gallery',  component:GalleryComponent },
  {   path:'donate',  component:DonateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
