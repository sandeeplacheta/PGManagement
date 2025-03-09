import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanymasterComponent } from './companymaster/companymaster.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EntityComponent } from './entity/entity.component';
import { LocationComponent } from './location/location.component';
import { BuildingComponent } from './building/building.component';
import { FloorComponent } from './floor/floor.component';
import { RoomComponent } from './room/room.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { DesignationComponent } from './designation/designation.component';
import { routes as companymasterroutes } from './companymaster/companymaster-routing.module';
import { routes as configurationroutes } from './configuration/configuration-routing.module';
import { routes as entityroutes } from './entity/entity-routing.module';
import { routes as locationroutes } from './location/location-routing.module';
import { routes as buildingroutes } from './building/building-routing.module';
import { routes as floorroutes } from './floor/floor-routing.module';
import { routes as roomroutes } from './room/room-routing.module';
import { routes as designationroutes } from './designation/designation-routing.module';
import { routes as userrolesroutes } from './userroles/userroles-routing.module';
import { routes as employeeroutes } from './employee/employee-routing.module';

// const routes: Routes = [
//     {
//         path: 'companymaster',
//         component: companymaster
//     }
//     {
//         path: 'configuration',
//         component: ConfigurationComponent
//     },
//     {
//       path: 'entity',
//       component: EntityComponent
//     },
//     {
//       path: 'location',
//       component: LocationComponent
//     },
//     {
//         path: 'building',
//         component: BuildingComponent
//     },
//     {
//       path: 'floor',
//       component: FloorComponent
//     },
//     {
//       path: 'room',
//       component: RoomComponent
//     },
//     {
//       path: 'designation',
//       component: DesignationComponent
//     },
//     {
//       path: 'userrole',
//       component: UserrolesComponent
//     },
//     {
//       path: 'employee',
//       component: EmployeeComponent
//     }
// 
// ]
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class MasterRoutingModule { }

export const routes: Routes = [
  {
    path: 'companymaster',
    loadChildren: () =>
      import('./companymaster/companymaster.module').then((m) => m.CompanymasterModule),
    children: companymasterroutes
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./configuration/configuration.module').then((m) => m.ConfigurationModule),
    children: configurationroutes
  },
  {
    path: 'entity',
    loadChildren: () =>
      import('./entity/entity.module').then((m) => m.EntityModule),
    children: entityroutes
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule),
    children: locationroutes
  },
  {
    path: 'building',
    loadChildren: () =>
      import('./building/building.module').then((m) => m.BuildingModule),
    children: buildingroutes
  },
  {
    path: 'floor',
    loadChildren: () =>
      import('./floor/floor.module').then((m) => m.FloorModule),
    children: floorroutes
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./room/room.module').then((m) => m.RoomModule),
    children: roomroutes
  },
  {
    path: 'designation',
    loadChildren: () =>
      import('./designation/designation.module').then((m) => m.DesignationModule),
    children: designationroutes
  },
  {
    path: 'userroles',
    loadChildren: () =>
      import('./userroles/userroles.module').then((m) => m.UserrolesModule),
    children: userrolesroutes
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    children: employeeroutes
  },
  // {
  //   path: "",
  //   children: children
  // },

  // {
  //   path: "",
  //   redirectTo: "",
  //   pathMatch: "full"
  // }

];