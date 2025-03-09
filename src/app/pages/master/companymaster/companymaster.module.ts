import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanymasterRoutingModule } from './companymaster-routing.module';
import { CompanymasterComponent } from './companymaster.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/core/components/loader/loader.module';
import { GridModule } from 'src/app/core/components/grid/grid.module';
import { ListModule } from 'src/app/core/components/list/list.module';


@NgModule({
  declarations: [
    CompanymasterComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    GridModule,
    ListModule,
    ReactiveFormsModule,
    CompanymasterRoutingModule
  ]
})
export class CompanymasterModule { }
