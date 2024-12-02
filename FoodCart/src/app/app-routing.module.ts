import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardDetailsComponent } from './card-details/card-details.component';

const routes: Routes = [
  { path: '', component: CardComponent },
  { path: 'product-details/:id', component: CardDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
