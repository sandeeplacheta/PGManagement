import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services/api/master/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
   cols =[
    {key:'employeeName',label:'Employee Name'},
    {key:'employeeCode',label:'Employee Code'},
    {key:'employeeEmail',label:'Email'},
    {key:'entityName',label:'Entity Name'},
    {key:'companyName',label:'Company Name'},
    {key:'locationName',label:'Location'},
  ] ;
   formFields: any[] | undefined;
   fields  =[{key:'sandeep',label:'syan'}] ;
   exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title= "Employee Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/employee";
  item: any;
  filename!: string;
  allItems: any[] = [];
  partyForm!: FormGroup;
  activeTab: string = "general";
  isSubmitting = false;


  constructor(private fb: FormBuilder, private loc: Location,private userservice: UserService) {
    this.employeeForm = this.fb.group({
      gstApplicable: [''],
      gstNumber: [''],
      companyName: [''],
      email: [''],
      fax: [''],
      phoneNo: [''],
      contactNo: [''],
      country: [''],
      state: [''],
      city: [''],
      address:[''],
      pin: [''],
      tin: [''],
      pan: [''],
      cin: [''],
      logo: [''],
      documents: ['']
    });

  }
  




change(event: any) {
  console.log("Step changed:", event.selectedIndex);
}

  ngOnInit(): void {
    // this.companyForm = this.fb.group({
    //   // General Information
    //   cin: ['', [Validators.required, Validators.pattern('L[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}')]],
    //   companyName: ['', Validators.required],
    //   pan: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]')]],
    //   tin: ['', Validators.required],
    //   gstin: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
    //   gstDocument: [null, Validators.required],
    //   state: ['', Validators.required],
    //   pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    //   registeredAddress: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    //   incorporationDate: ['', Validators.required],
    //   companyType: ['', Validators.required],
    //   directorDetails: ['', Validators.required],
    //   authorizedCapital: ['', Validators.required],
    //   paidUpCapital: ['', Validators.required],
    //   status: ['', Validators.required],
  
    //   // Documents Section
    //   documentType: ['', Validators.required],
    //   documentNumber: ['', Validators.required],
    //   documentFile: [null, Validators.required],
  
    //   // Bank Details
    //   bankName: ['', Validators.required],
    //   bankAddress: ['', Validators.required],
    //   accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]],
    //   ifscSwiftCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
  
    //   // Others Section
    //   additionalInfo: [''],
    //   remarks: ['']
    // });

    this.loadData();
  }
  loadData(){
    this.userservice.getListViewData().subscribe(
      (response: any[]) => {
        this.items = response;
        this.count=this.items.length;
      },
      (error) => {
        console.error('Error fetching company data:', error);
      }
    )
   }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Submitted Data:', this.employeeForm.value);
      alert('Company Registered Successfully');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['id'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    // this.initForm();
    // this.updateURL();
  }


  columns = [
    { label: 'Name', field: 'name' },
    { label: 'Position', field: 'position' },
    { label: 'Email', field: 'email' },
    { label: 'Tags', field: 'tags' },
  ];
  
  contacts = [
    { name: 'Paul Sanchez', position: 'Angular Developer', email: 'paulsanchez@minia.com', tags: ['Php', 'Javascript'] },
    { name: 'Darlene Smith', position: 'Backend Developer', email: 'darlenesmith@minia.com', tags: ['Php', 'Java', 'Python'] },
  ];
  
  
  handleAction(event: { action: string }) {
    console.log(event.action);
  }
  
  onRowSelect(item: any) {
    console.log('Row selected:', item);
  }
  onAddNew() {
    console.log('Row selected:',);
  }

  onSearchQuery(searchTerm: string): void {
    if (!searchTerm) {
      this.items = [...this.allItems]; // Reset items if search term is cleared
      this.count = this.items.length;
      return;
    }

    this.items = this.allItems.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    console.log('Filtered Items:', this.items);
    this.count = this.items.length;
  }
  onToggleView(view: string): void {
    this.activeView = view;
    this.updateURL();
  }

  onBack(): void {
    
    this.activeTab = "general"; // Reset to general tab
    // this.loadData();
    this.updateURL();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  private updateURL(): void {
    if (this.activeView === 'form') {
      this.loc.replaceState(
        `${this.basePath}/form/${this.selectedItemId || ''}`
      );
    } else {
      this.loc.replaceState(`${this.basePath}/list`);
    }
  }
 
  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      const formData = this.employeeForm.get('documents');
      if (formData) {
        formData.patchValue({ [fieldName]: file });
        formData.markAsTouched();
      }
    }
  }
  
  
}
