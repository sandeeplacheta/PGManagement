import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators ,AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { control } from 'leaflet';
import { TotalService } from '../../services/abstract/total.service';
import { CheckboxdispatchService } from '../../services/sales/checkboxdispatch.service';
import { debounceTime, throttleTime } from 'rxjs';
import { SalesorderviewService } from '../../services/sales/salesorderview.service';
import { CommonTotalService } from '../../services/sales/CommonTotal.service';
import { SalesorderinvoiceService } from '../../services/sales/salesorderinvoice.service';
import { SchemesService } from '../../services/sales/schemes.service';
@Component({
  template: '',
})
export abstract class GenericMultiLineFormClass implements OnInit, AfterViewInit, OnChanges {
  partyId !: number;
  itemId !: number;
  item !: any;
  abstract config: any
  ngAfterViewInit(): void {
    
    if (this.tdata !== undefined && this.tdata.length > 0) {
    
      this.tdata.forEach((trow) => {
        this.itemId = trow.productId
        console.log(this.partyId,this.itemId,trow)
        console.log('table row', trow);
        const item = this.mapToFormItem(trow)
        const itemGroup = new FormGroup(item);
        this.items.push(itemGroup);
      });
    } else {
      this.tdata = []
      this.populateinitialproduct(6);
    }
  }
  toggleSelectAll(event: Event) {
    this.checkboxsvc.toggleSelectAll(event, this.myForm);
  }
  onInputChecked(event: Event, item: any) {
    this.checkboxsvc.onInputChecked(event, item);
  }
  isChecked(item: any): boolean {
    return this.checkboxsvc.isChecked(item);
  }
  constructor(
    private fb: FormBuilder,
    private checkboxsvc: CheckboxdispatchService,
    private _salesorderviewService: SalesorderviewService,
    private _salesinvsvc: SalesorderinvoiceService,
    private _salesinvtotalsvc: CommonTotalService,
    private _schemesvc: SchemesService,
  ) {
    this.onInit()
    this._schemesvc.currentData.subscribe(data => {
      console.log(data)
    });
  }
  quantityValidator(stock: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const qty = control.value;
      if (qty > stock) {
        alert(`Only ${stock} stock is available.`);
        control.reset();
        return { qtyExceedsStock: true };
      }
      return null;
    };
  }
 
  onInit() {
    this._salesorderviewService.currentData.subscribe((res: any) => {
      if (res.name === 'customer') {
        this.partyId = res.value.value
      }else if (typeof res === 'number') {
        this.partyId = res;
      }
      if (res.name === 'productName') {
        this.itemId = res.value.value;
        this.item = res.value
      }
     
      this._schemesvc.currentData.pipe().subscribe(res => {
        this.config.schemedata = res;
        if (this.config.schemedata) {
          if (this.config.schemedata.schemeType && this.config.schemedata.schemeType == "mrpAmount") {
            let remaining_schem_amount = 0
            let allowedItems = this.config.schemedata.freeItems
            if (this.config.schemedata.schemeAmount) {
              remaining_schem_amount = this.config.schemedata.schemeAmount
            }
            (this.myForm.controls["items"] as FormArray).controls.forEach((item, index) => {
              if (allowedItems.filter((alloweditem: { idMaterial: any; }) => (alloweditem.idMaterial == this.tdata[index].productId)).length > 0) {
                let lineitem = item as FormGroup
                let newFreeQty = Math.floor(remaining_schem_amount / lineitem.value.mrp)
                remaining_schem_amount = remaining_schem_amount % lineitem.value.mrp
                lineitem.controls["freeQty"].patchValue(newFreeQty)
              }
            });
          }
          if (this.config.schemedata.schemeType && this.config.schemedata.schemeType == "discount") {
            
            console.log('discount applicable on the order')
          }
        }
      });
    })
    this._salesinvsvc.currentData.subscribe((res: any) => {
      console.log(res);
      if (res.name === 'customer') {
        this.partyId = res.value.value
      } else if (typeof res === 'number') {
        this.partyId = res;
      }
      if (res.name === 'productName') {
        this.itemId = res.value.value;
        this.item = res.value;
      }
      
      this._schemesvc.currentData.pipe().subscribe(res => {
        this.config.schemedata = res;
        if (this.config.schemedata) {
          if (this.config.schemedata.schemeType && this.config.schemedata.schemeType == "mrpAmount") {
            let remaining_schem_amount = 0
            let allowedItems = this.config.schemedata.freeItems
            if (this.config.schemedata.schemeAmount) {
              remaining_schem_amount = this.config.schemedata.schemeAmount
            }
            (this.myForm.controls["items"] as FormArray).controls.forEach((item, index) => {
              if (allowedItems.filter((alloweditem: { idMaterial: any; }) => (alloweditem.idMaterial == this.tdata[index].productId)).length > 0) {
                let lineitem = item as FormGroup
                let newFreeQty = Math.floor(remaining_schem_amount / lineitem.value.mrp)
                remaining_schem_amount = remaining_schem_amount % lineitem.value.mrp
                lineitem.controls["freeQty"].patchValue(newFreeQty)
              }
            });
          }
          if (this.config.schemedata.schemeType && this.config.schemedata.schemeType == "discount") {
            
             
            console.log('discount applicable on the order')
          }
        }
      });
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tdata'], this.tdata) {
      if (this.items) {
        console.log(this.items, `on changes of table data`);
        this.items.clear();
        this.ngAfterViewInit();
      }
    }
  }
  
  myForm!: FormGroup;
  abstract svc: DataService
  abstract tableColumns: any[];
  abstract tdata: any[];
  // abstract readonly :boolean;
  ngOnInit(): void {
    console.log("oninit",this.tdata)
    console.log(this.config)
    this.myForm = new FormGroup({
      items: new FormArray([])
    });
  }
  populateinitialproduct(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addItem();
    }
  }
  onDropDownChange(event: any, field: any) {
    this.svc.onDropDownChange(event, field);
    this.itemId=event.value;
    
    console.log( this.itemId, this.partyId);
      this.items.controls.forEach((group) => {
        if (group.getRawValue().productName.label === event.label) {
          group.get('mrp')?.setValue((event.boxMrp).toFixed(2))
          group.get('qty')?.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
            if (value) {
              group.get('netAmount')?.setValue((+value * group.getRawValue().price).toFixed(2))
              group.get('totalVolume')?.setValue((+value * event.ltrperbox).toFixed(2))
              group.get('gstAmount')?.setValue((+value * group.getRawValue().gst).toFixed(2))
            }
          })
        }
      })
   
  }
  get items(): FormArray {
    return this.myForm.controls['items'] as FormArray;
  }
  addItem(): void {
    const item = this.createEmptyItem()
    console.log(item);
    this.tdata.push(item);
    const itemGroup = new FormGroup(item);
    this.items.push(itemGroup);
  }
  createEmptyItem() {
    let item: { [key: string]: any } = {};
    this.tableColumns.forEach((column) => {
      if (column.name === 'qty') {
        item[column.name] = new FormControl(0, [
          Validators.required,
          this.quantityValidator(item.stock) 
        ]);
      } else {
        item[column.name] = new FormControl(column.type === 'number' ? 0 : '', Validators.required);
      }
    });
    return item;
  }
 mapToFormItem(item: any) {
  let product: any = {};
  this.tableColumns.forEach((column) => {
    if (column.name === 'qty') {
      product[column.name] = new FormControl(item[column.name] ? item[column.name] : 0, [
        Validators.required,
        this.quantityValidator(item.stock) // Use actual stock value
      ]);
    } else {
      product[column.name] = new FormControl(item[column.name] ? item[column.name] : 0, Validators.required);
    }
  });
  return product;
}
  removeItem(index: number): void {
    this.tdata = this.tdata.slice(index, index + 1)
    this.items.removeAt(index);
  }
  onSubmit() {
    if (this.myForm.valid) {
      let total: any = {}
      this.config.totals.forEach((ele: any) => {
        total[ele.name] = this.config.totalService.getTotal(ele.name, this.items.value);
      });
      console.log(this.myForm.value);
      console.log(total);
      return {
        ...total,
        ...this.myForm.value
      }
    }
    else {
      console.log("invalid")
      this.myForm.markAllAsTouched()
      this.myForm.markAsDirty()
      return null
    }
  }
  isValid(): boolean {
    return this.myForm.valid;
  }
}

