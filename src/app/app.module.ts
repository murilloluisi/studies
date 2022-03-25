import { CursoRwDevComponent } from './RxJS/components/curso-rw-dev/curso-rw-dev.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JSStudiesComponent } from './JS/js-studies/js-studies.component';

@NgModule({
  declarations: [
    AppComponent,
    JSStudiesComponent,
    CursoRwDevComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
