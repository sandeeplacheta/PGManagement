
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NotFoundComponent } from './notfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent,NotFoundComponent],
  imports: [CommonModule,RouterModule],
  exports: [NavigationComponent,NotFoundComponent] ,
  schemas:[CUSTOM_ELEMENTS_SCHEMA] // Export it so other modules can use it
})
export class AppNavigationModule {}


