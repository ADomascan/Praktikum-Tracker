import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OverviewSearchComponent } from './search/overview-search/overview-search.component';
import { DetailFormComponent } from './form/detail-form/detail-form.component';
import { FormComponent } from './form/form.component';
import { SearchComponent } from './search/search.component';
import { EditStudentComponent } from './form/edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OverviewSearchComponent,
    SearchComponent,
    DetailFormComponent,
    FormComponent,
    EditStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
