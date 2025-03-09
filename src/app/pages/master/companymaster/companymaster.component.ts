import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.scss']
})
export class CompanymasterComponent implements OnInit {
  companyForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
   cols =[{key:'sandeep',label:'syan'}] ;
   formFields: any[] | undefined;
   fields  =[{key:'sandeep',label:'syan'}] ;
   exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title: any;
  form: FormGroup = new FormGroup({});
   basePath ="./samee";
  item: any;
  filename!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern('L[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}')]],
      companyName: ['', Validators.required],
      pan: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]')]],
      tin: ['', Validators.required],
      gstin: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      gstDocument: [null, Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      registeredAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      incorporationDate: ['', Validators.required],
      companyType: ['', Validators.required],
      directorDetails: ['', Validators.required],
      authorizedCapital: ['', Validators.required],
      paidUpCapital: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
      alert('Company Registered Successfully');
    } else {
      alert('Please fill all required fields correctly');
    }
  }
  onCardClick(item: any) {
   
    this.selectedItemId = item['id'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    // this.initForm();
    // this.updateURL();
  }
}
