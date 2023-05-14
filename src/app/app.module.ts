import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgbCarouselModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EventsComponent } from './components/events/events.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DonateComponent } from './components/donate/donate.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ExecutiveMembersComponent } from './components/executiveMembers/executiveMembers.component';
import { AllMembersComponent } from './components/all-members/all-members.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { GurudevaPaginationComponent } from './shared/gurudeva-pagination/gurudeva-pagination.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactusComponent,
    ExecutiveMembersComponent,
    FooterComponent,
    EventsComponent,
    GalleryComponent,
    DonateComponent,
    AllMembersComponent,
    GurudevaPaginationComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule,
    HttpClientModule,
    NgbCarouselModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
