import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component'

const routes: Routes = [
  { path: 'admin/products', redirectTo: 'products/index', pathMatch: 'full' },
  { path: 'admin/products/index', component: IndexComponent },
  { path: 'admin/products/:productId/view', component: ViewComponent },
  { path: 'admin/products/create', component: CreateComponent },
  { path: 'admin/products/:productId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
