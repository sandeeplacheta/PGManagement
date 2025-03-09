import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MasterRoutingModule } from './master-routing.module';
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EntityComponent } from './entity/entity.component';
import { LocationComponent } from './location/location.component';
import { BuildingComponent } from './building/building.component';
import { FloorComponent } from './floor/floor.component';
import { RoomComponent } from './room/room.component';
import { CompanymasterModule } from './companymaster/companymaster.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { EntityModule } from './entity/entity.module';
import { LocationModule } from './location/location.module';
import { BuildingModule } from './building/building.module';
import { FloorModule } from './floor/floor.module';
import { RoomModule } from './room/room.module';
import { DesignationModule } from './designation/designation.module';
import { UserrolesModule } from './userroles/userroles.module';
import { EmployeeModule } from './employee/employee.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CompanymasterModule,
    ConfigurationModule,
    EntityModule,
    LocationModule,
    BuildingModule,
    FloorModule,
    RoomModule,
    DesignationModule,
    UserrolesModule,
    EmployeeModule
    // MasterRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MasterModule { }
