import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExecutiveMembersComponent } from './components/executiveMembers/executiveMembers.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DonateComponent } from './components/donate/donate.component';
import { AllMembersComponent } from './components/all-members/all-members.component';

const routes: Routes = [
  {   path:'',  component:HomeComponent, pathMatch:'full' },
  {   path:'home',  component:HomeComponent },
  {   path:'executiveMembers',  component:ExecutiveMembersComponent},
  {   path:'allMembers',  component:AllMembersComponent},
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
