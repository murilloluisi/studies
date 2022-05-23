import { AuthorComponent } from './Udemy/Angular Styling & Animations/author/author.component';
import { QuoteComponent } from './Udemy/Angular Styling & Animations/quote/quote.component';
import { GoalComponent } from './Udemy/Angular Styling & Animations/goal/goal.component';
import { CursoRwDevComponent } from './RxJS/components/curso-rw-dev/curso-rw-dev.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { JSStudiesComponent } from './JS/js-studies/js-studies.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    JSStudiesComponent,
    CursoRwDevComponent,
    GoalComponent,
    QuoteComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
