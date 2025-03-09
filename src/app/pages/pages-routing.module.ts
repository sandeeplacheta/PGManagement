import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { routes as masterroutes } from './master/master-routing.module';

const children: Routes = [
  {
    path: "master",
    loadChildren: () =>
      import("./master/master.module").then((m) => m.MasterModule),
    children: masterroutes
  },
]
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: "",
    // component: NavigationComponent,
    children: children,
  },
  {
    path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)
  },
  {
    path: 'timeline', loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
