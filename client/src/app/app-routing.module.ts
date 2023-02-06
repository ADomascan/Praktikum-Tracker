import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailFormComponent } from './form/detail-form/detail-form.component';
import { FormComponent } from './form/form.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: SearchComponent},
  { path: 'search', component:SearchComponent},
  { path: 'form', component: FormComponent},
  { path: 'form/detail-form', component: DetailFormComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//export const appRoutingModule = RouterModule.forRoot(routes);
