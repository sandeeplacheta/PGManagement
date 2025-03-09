import { Component,Input, SimpleChanges} from '@angular/core';
import { CreatepoService } from '../../services/purchase/createpo.service';


import { FormBuilder } from '@angular/forms';
import { GenericSuperFormComponent } from '../extendables/generic-super-form.component';
import { Option } from '../extendables/abstract-generic-super-view.component';
import { DataService } from '../../services/data.service';
import { TotalService } from '../../services/abstract/total.service';
import { SchemesService } from '../../services/sales/schemes.service';




@Component({
  selector: 'app-form-invoiceitem',
  templateUrl: '../extendables/templates/abstract-generic-super-form.compoent.html',
  styleUrls: ['./form-invoiceitem.component.scss']
})
export class FormInvoiceitemComponent extends GenericSuperFormComponent{
  
    @Input() readonly!: boolean;
    @Input() title!: string;
    @Input() fields!: any[];
    @Input() tableColumns!: any[];
    @Input() tdata!: any[];
    @Input() totals !: any[];
    @Input() buttons!: any[];
    @Input() showAddItem!: boolean;
    @Input() totalFormFields!: any[];
    @Input() showFnKeyControls: boolean = true
    @Input() rootData: any;
    @Input() dropDownServiceMap!: Map<string, DataService>;
    @Input() svc!: DataService
    @Input() totalService!:TotalService;
    @Input() showActionControl !: boolean;
    @Input() selectInvoices !: any;
    constructor(  fb: FormBuilder){
      super(fb);    
    }
  }

