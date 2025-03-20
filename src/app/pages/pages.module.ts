import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SimplebarAngularModule } from 'simplebar-angular';
// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { LightboxModule } from 'ngx-lightbox';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProjectsModule } from './projects/projects.module';
import { ExtraspagesModule } from './extraspages/extraspages.module';
import { TimelineModule } from './timeline/timeline.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    SharedModule,
    WidgetModule,
    LeafletModule,
    SimplebarAngularModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbTooltipModule,
    ContactsModule,
    ProjectsModule,
    ExtraspagesModule,
    TimelineModule,
    DndModule,
    LightboxModule,
    
  ]
})
export class PagesModule { }
