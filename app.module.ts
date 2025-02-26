import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './src/app/app.component';
import { Adminclass5Component } from './src/app/adminpanel/adminclass5/adminclass5.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpErrorResponse, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './src/app/app.routes';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AppComponent,
    FormsModule,
    
  ],

  providers: [
    provideHttpClient(withFetch())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line
})
export class AppModule {}
