import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';
import { FormInvoiceitemComponent } from '../form-invoiceitem/form-invoiceitem.component';
import { TotalService } from '../../services/abstract/total.service';
import { SearchdataService } from '../../services/searchdata.service';


export interface Option {

  name: string;
  dependancy: string | null;

}
export interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: any[];
}
export interface TableColumn {
  name: string;
  header: string;
  type: string;
  editable: boolean;
  options?: any[];
  required?: boolean;
  calculate?: boolean;
  width?: string; // Added width property
}
export interface ButtonConfig {
  label: string;
  action: () => void;
  type: 'primary' | 'secondary';
}
export interface ComponentConfig {
  title: string;
  formFields: FormField[];
  tableColumns: TableColumn[];
  viewControls: boolean;
  totalFormFields: any[];
  showFnKeyControls: boolean;
  showAddItem?: boolean;
  Addbutton?: boolean;
  removeAction: boolean;
  selectInvoice?: any;
  createinvwithoutso?: any;
}

@Component({
  template: ''
})
export abstract class AbstractGenericSuperViewComponent implements OnInit {
  @ViewChild('invoiceForm') invoiceForm!: FormInvoiceitemComponent;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  abstract tableitemsKey: string;
  abstract totals: any;
  abstract modelname: string;
  item: any = {};
  lineItems !: any[];
  abstract cols: any[]
  abstract fields: any[]
  id: any;
  abstract addNewLink: string;
  abstract basePath: string;
  formData: any = {};
  products!: any[];
  abstract config: ComponentConfig
  abstract readonly: boolean;
  abstract emitOnRowClick: boolean;

  dataSvc!: DataService;
  totalService!: TotalService;

  abstract loadoption(res: any, fieldname: string): void
  abstract filteredforminvoicedata(res: any): any;


  editableOnView() {
    return this.svc.editablOnView()
  }

  allbuttons = [
    { label: 'F6 Save', action: () => this.validSubmit(), type: 'primary', },
    { label: 'F10 Close', action: () => this.onCancel(), type: 'secondary' },
  ]

  controle_buttons!: any[];
  abstract actionControl: boolean;
  buttons = [
    { label: 'Back', action: () => this.onCancel(), type: 'secondary' },
  ]
  gridActions = [
    {
      classname: 'uil uil-edit',
      action: (id: number) => this.createInvoice(id),
      tooltip: 'Edit'
    },
    {
      classname: 'uil uil-trash-alt',
      action: (id: number) => this.viewDataDetails(id),
      tooltip: 'Delete'
    }
  ];
  listActions = [
    {
      name: 'uil uil-edit',
      action: (id: number) => this.createInvoice(id),
      tooltip: 'Edit'
    },
    {
      name: 'uil uil-trash-alt',
      action: (id: number) => this.viewDataDetails(id),
      tooltip: 'Delete'
    },

  ];

  onSearchQuery(eve: string) {
    this.searchsvc?.getresult(this.modelname, eve).subscribe((data: any) => {
      console.log(data);

      if (typeof data === 'object' && data !== null) {

        const originalKeys = Object.keys(data);
        const modelKey = this.modelname.toLowerCase() + 's';
        const lowerCaseKeys = originalKeys.map(key => key.toLowerCase());
        console.log(originalKeys, lowerCaseKeys, modelKey);


        if (lowerCaseKeys.includes(modelKey)) {
          // Find the original key that matches the lowercase modelKey
          const matchingKey = originalKeys[lowerCaseKeys.indexOf(modelKey)];
          console.log(matchingKey);

          // Assign data to this.items
          this.items = data[matchingKey].reverse();
          console.log(this.items);

        } else {
          console.error(`No key found in the data.`);
        }

      } else {
        console.log('No Data for search Result');

        return
      }


    })

  }
  selectedItemId: number = 0;
  selectedItem: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private svc: DataService,
    private totalSvc?: TotalService,
    private searchsvc?: SearchdataService,
  ) {
    this.dataSvc = svc;
    if (this.totalSvc) {

      this.totalService = this.totalSvc;

    }
    console.log("Total Service", this.totalService)


  }




  onEdit() { }
  onView() { }
  onNew() { }
  onPrint() {
    window.print();
  }
  onClear() { }
  addNewItem(): void {

    this.initForm()
    this.activeView = 'form';
    this.selectedItemId = 0;
    this.item = null;
    this.updateURL();
  }
  ngOnInit() {
    // this.formFields.forEach((field) => {
    //   this.formData[field.name] =
    //     field.type === 'date' ? new Date().toISOString().split('T')[0] : '';
    // });

    this.route.url.subscribe((value) => {
      if (value.length > 0) {
        this.activeView = value[0].path;
        console.log(this.activeView);

      }
    });
    // this.route.params.subscribe((params) => {
    //   if(params.id !== undefined && this.activeView == "form"){
    //     this.item.id = params.id;
    //     this.viewDataDetails(this.item);
    //   }
    //   console.log("route parameters active view", this.activeView )
    //   console.log('route parameters ', params)
    // });
    this.totals = {};
    this.config.totalFormFields.forEach(field => {
      this.totals[field.name] = 0;
    });
    // this.initForm();
    this.loadData();
    this.fetchoption()
    this.initTotalForm();
    // this.populateInitialProducts(6);

  }


  abstract fetchoption(): void;





  populateInitialProducts(count: number) {
    const initialProducts = this.lineItems;

    for (let i = 0; i < count; i++) {
      if (i < initialProducts.length) {
        this.products.push(initialProducts[i]);
      }
    }
  }

  abstract searchFields: any[];
  lists !: any[]
  loadData(): void {
    this.dataSvc.getData().subscribe((data) => {
      console.log('load sales order view data', data);
      // data.reverse()
      this.lists = data;
      this.items = data.map((item: any, index: number) => ({
        ...item,
        serialNumber: index + 1,
      }));
      this.count = this.items.length;
      if (this.searchFields) {

        data.forEach((item: any) => {
          this.searchFields.forEach(field => {
            if (field.name in item) {
              field.options = [
                ...new Map(data.map((item: any) =>
                  [item[field.name], { label: item[field.name], value: item['id'] }]
                )).values()
              ];
            }
          })
        })
      }
    });


  }

  validSubmit() {
    console.log('valid');

    this.activeView = 'list';
    this.location.replaceState(`${this.basePath}`);

    let forminvoicedata: any = this.invoiceForm.onSubmit();
    console.log(forminvoicedata, 'before filtering form data');

    this.filteredforminvoicedata(forminvoicedata);
    console.log(forminvoicedata, 'after filtering form data');


    if (forminvoicedata != null) {
      this.dataSvc.postData(forminvoicedata).subscribe(res => {
        console.log(res);
        this.loadData();
      })
    }

  }
  initTotalForm() {
    // const formControls = this.totalFormFields.reduce((acc, field) => {
    //   const validations = [];
    //   if (field.required) {
    //     validations.push(Validators.required);
    //   }
    //   if (field.type === 'number') {
    //     validations.push(Validators.pattern('^[0-9]*$'));
    //   }
    //   acc[field.name] = this.fb.control('', validations);
    //   return acc;
    // }, {});

    // this.form = this.fb.group(formControls);
  }
  onClickingCard(item: any) {
    this.id = item.id;
    // this.form.patchValue(item);
    this.activeView = 'form';
    this.router.navigate([this.basePath, 'form']);
    this.navigateTo('form');
  }
  createInvoice(item: any) {
    this.onClickingCard(item);
  }

  viewDataDetails(item: any): void {
    this.item = item
    this.readonly = true;
    this.config.removeAction = false;
    this.selectedItemId = item['id'];
    this.controle_buttons = this.buttons;
    console.log('selectedItemId in edit item', this.selectedItemId);
    console.log("id from editItem method", item)
    this.dataSvc.getDataById(this.selectedItemId).subscribe((data: any) => {
      console.log('get data by id from abstract generic class',data);

      this.selectedItem = data;
      this.products = item[this.tableitemsKey]
      this.initForm();
      // this.initTotalForm();
      this.activeView = 'form';
      this.updateURL();
      // this.fetchoption()
      // this.form.patchValue(item);
    });

  }


  updateURL(): void {
    if (this.activeView === 'form') {
      this.location.replaceState(`${this.basePath}/form/${this.selectedItemId || `${this.basePath}/list`}`);
    } else {
      this.location.replaceState(`${this.basePath}/list`);
    }
  }
  initForm(): void {
    console.log('init triggered')
    if (this.selectedItemId) {
      this.dataSvc.getDataById(this.selectedItemId).subscribe(
        (data: { [key: string]: any; }) => {
          console.log('Data received:', data);
          
        },
        (error: any) => {
          console.error('Error loading item data:', error);
        }
      );
    }
  }

  navigateTo(view: string) {
    this.activeView = view;
    this.router.navigate([`${this.basePath}/${view}`]);
  }
  onToggleView(view: string) {
    console.log('msg: toggle view');

    this.selectedItem = "";
    this.products = [];
    this.activeView = view;
    this.location.replaceState(`${this.basePath}/${view}`);

    this.controle_buttons = this.allbuttons;
    this.fetchoption();

    this.readonly = false;
    // this.populateInitialProducts(6);
  }


  onCancel() {
    this.activeView = 'list';
    this.location.replaceState(`${this.basePath}`);
  }
  loadItemData(id: any): void {
    console.log('Fetching data for ID:', id['id']);
    this.dataSvc.getDataById(id['id']).subscribe(
      (data: { [key: string]: any; }) => {
        console.log('Data received:', data);
        // if (this.form) {
        //   console.log('Patching form with data:', data);
        //   this.form.patchValue(data);
        // } else {
        //   console.error('Form is not initialized.');
        // }
      },
      (error: any) => {
        console.error('Error loading item data:', error);
      }
    );
  }



  markAllFieldsAsTouched() {
    // Object.keys(this.form.controls).forEach((field) => {
    //   const control = this.form.get(field);
    //   control?.markAsTouched({ onlySelf: true });
    //   control?.markAsDirty({ onlySelf: true });
    // });
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'F3':
        this.onNew();
        event.preventDefault();
        break;
      case 'F4':
        this.onEdit();
        event.preventDefault();
        break;
      case 'F6':
        this.validSubmit();
        event.preventDefault();
        break;
      case 'F7':
        this.onView();
        event.preventDefault();
        break;
      case 'F8':
        this.onPrint();
        event.preventDefault();
        break;
      case 'F9':
        this.onClear();
        event.preventDefault();
        break;
      case 'F10':
        this.onCancel();
        event.preventDefault();
        break;
      default:
        break;
    }
  }
}

