import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UnauthorizedLayoutComponent } from './unauthorized-layout/unauthorized-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    MainLayoutComponent,
    UnauthorizedLayoutComponent,
  ],
  declarations: [
    MainLayoutComponent,
    UnauthorizedLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
