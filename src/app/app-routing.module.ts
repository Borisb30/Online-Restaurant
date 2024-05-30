import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => 
        import('./modules/home-page/home-page.module').then(m => m.HomePageModule)
    },
    {
      path: 'cart',
      loadChildren: () => 
        import('./modules/cart/cart.module').then(m => m.CartModule)
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
