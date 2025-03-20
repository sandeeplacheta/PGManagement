import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { AppModule } from 'src/app/app.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/core/components/loader/loader.module';
import { GridModule } from 'src/app/core/components/grid/grid.module';
import { ListModule } from 'src/app/core/components/list/list.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    ConfigurationComponent
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
    AppModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
