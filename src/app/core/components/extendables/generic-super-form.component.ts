import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MultilineFormComponent } from '../multiline-form/multiline-form.component';
import { DataService } from '../../services/data.service';
import { TotalService } from '../../services/abstract/total.service';

@Component({
  template: '',
})
export abstract class GenericSuperFormComponent implements OnChanges, OnInit{



  abstract title: string;
  abstract fields: any[];
  abstract tableColumns: any[];
  abstract tdata: any[];
  abstract totals:any[] ;
  abstract showAddItem: boolean ;
  abstract buttons: any[];
  abstract showFnKeyControls: boolean;
  abstract totalFormFields: any[];
  abstract rootData:any;
  abstract readonly:boolean;
  abstract svc: DataService;
  @ViewChild('childForm') childForm!: MultilineFormComponent;
  invoiceform!: FormGroup<any>;
  formData : any = {};
  abstract totalService: TotalService;


  constructor( private fb: FormBuilder){
    
  }
  ngOnChanges(changes: SimpleChanges): void {


    if(changes['rootData'], this.rootData){
      console.log(this.rootData);
      console.log('changes in rootData');
      this.createformcontrols();
    }
  }

  onDropDownChange(event:any,field:any){
    this.svc.onDropDownChange(event,field);
  }

  ngOnInit(): void {
    console.log("totals Service oninit", this.totalService)
    this.fields.forEach((field) => {
      this.formData[field.name] =
        field.type === 'date' ? new Date().toISOString().split('T')[0] : '';
    });
    // console.log("root data", this.rootData)
    this.createformcontrols();
  }
  initialFormFieldValue(field:any):any{

    if(this.rootData){
      if(field.type === 'select'){
        let control = this.fb.control((field.name in this.rootData) ? this.rootData[field.name] : field.options[0], Validators.required);
        control.setValue((field.name in this.rootData) ? this.rootData[field.name] : field.options[0]);
        return control;     
      }if(field.type === 'text'){
        return this.fb.control((field.name in this.rootData) ? this.rootData[field.name] : '',field.required? Validators.required :Validators.nullValidator);
      }
      else{
        return this.fb.control(field.type === 'date' ? new Date().toISOString().split('T')[0] : '',field.required? Validators.required :Validators.nullValidator);
      }
    }else{
      return this.fb.control(field.type === 'date' ? new Date().toISOString().split('T')[0] : field.type  === 'number' ? 0 : " ", field.required? Validators.required :Validators.nullValidator);
    }
  }

  createformcontrols(){
    let transformedObj:any = {}
    this.fields.map((field:any) => {
      transformedObj[field.name] = this.initialFormFieldValue(field)
    });
    this.invoiceform = this.fb.group(transformedObj);
    console.log("invoice form",this.invoiceform);
    console.log("end");

    
  }

  
  addProduct() {
    this.tdata.push(this.createEmptyProduct());
  }

  createEmptyProduct() {
    let product: { [key: string]: any } = {};
    this.tableColumns.forEach((column) => {
      product[column.name] = column.type === 'number' ? 0 : '';
    });
    return product;
  }



  onSubmit(){
    let postinvoiceobj = {}
    if(this.childForm){
      if(this.invoiceform.valid){ 
        const obj = {...this.invoiceform.value}
        console.log(obj);
        const keysToTransform = ['paymentTerm', 'termAndCondition'];

        keysToTransform.forEach((key) => {
          if (obj[key]) {
            obj[key] = { id: obj[key] };
          }
        });

        postinvoiceobj = {
          ...obj,
          ...this.childForm.onSubmit(),
        }
        console.log(postinvoiceobj);
        
      }else{
        console.log('Invalid', this.invoiceform);
      }
    }
    if(this.childForm.isValid()){
      console.log("valid Form")
    }
    
    return postinvoiceobj;
  }

}
