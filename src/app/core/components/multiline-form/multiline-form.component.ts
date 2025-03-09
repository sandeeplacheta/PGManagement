import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenericMultiLineFormClass } from '../extendables/ genericMultilineFromClass';
import { DataService } from '../../services/data.service';
import { TotalService } from '../../services/abstract/total.service';

@Component({
  selector: 'app-multiline-form',
  templateUrl: './multiline-form.component.html',
  styleUrls: ['./multiline-form.component.scss'],
})
export class MultilineFormComponent extends GenericMultiLineFormClass {
  @Input() tableColumns!: {
    header: string;
    name: string;
    type: string;
    required?: boolean;
    editable?: boolean;
    width?: string;
    hidden?: boolean;
    options?: any[] | null;
  }[];
  @Input() tdata!: any[];
  @Input() readonly!: boolean;
  @Input() svc!: DataService;
  @Input() config!: {
    totalService: TotalService;
    totals: any[];
    showAddItem: boolean;
    selectInvoice: any;
    schemedata: any;
  };
  @Input() Action: boolean = true;
}

