import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { AppModule } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/core/components/loader/loader.module';
import { GridModule } from 'src/app/core/components/grid/grid.module';
import { ListModule } from 'src/app/core/components/list/list.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ExtrapagesModule } from 'src/app/extrapages/extrapages.module';


@NgModule({
  declarations: [
    RolesComponent
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
    ExtrapagesModule,  
    RolesRoutingModule
  ]
})
export class RolesModule { }
