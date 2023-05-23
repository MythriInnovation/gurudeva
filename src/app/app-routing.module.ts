import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExecutiveMembersComponent } from './components/executiveMembers/executiveMembers.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DonateComponent } from './components/donate/donate.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {   path:'',  component:HomeComponent, pathMatch:'full' },
  {   path:'home',  component:HomeComponent },
  {   path:'executiveMembers',  component:ExecutiveMembersComponent ,canActivate: [AuthGuard]  },
  {   path:'allMembers',  component:AllMembersComponent ,canActivate: [AuthGuard]  },
  {   path:'contact',  component:ContactusComponent ,canActivate: [AuthGuard]  },
  {   path:'events',  component:EventsComponent,canActivate: [AuthGuard]   },
  {   path:'gallery',  component:GalleryComponent,canActivate: [AuthGuard]   },
  {   path:'donate',  component:DonateComponent,canActivate: [AuthGuard]   },
  {   path:'signup',  component:SignUpComponent,canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
