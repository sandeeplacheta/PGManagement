import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanymasterRoutingModule } from './companymaster-routing.module';
import { CompanymasterComponent } from './companymaster.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/core/components/loader/loader.module';
import { GridModule } from 'src/app/core/components/grid/grid.module';
import { ListModule } from 'src/app/core/components/list/list.module';
import { AppModule } from "../../../app.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    CompanymasterComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    GridModule,
    ListModule,
    NgbModule,
    FormsModule,
    NgStepperModule,
    CdkStepperModule,
    NgSelectModule,
    ReactiveFormsModule,
    CompanymasterRoutingModule,
    AppModule
]
})
export class CompanymasterModule { }
