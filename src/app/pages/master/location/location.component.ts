import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent  implements OnInit {
  locationForm: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[{key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'},
    {key:'sandeep',label:'Location Name'},
    {key:'sandeep',label:'Location Code'}] ;  
   fields  =[
    {key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'},
    {key:'sandeep',label:'Location Name'},
    {key:'sandeep',label:'Location Code'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title= "Location Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/location";
  item: any;
  filename!: string;
  allItems: any[] = [];
  partyForm!: FormGroup;
  activeTab: string = "general";
  isSubmitting = false;


  constructor(private fb: FormBuilder, private loc: Location) {
    this.locationForm = this.fb.group({
      companyid: [''],
      entityid: [''],      
      locationid: [''],
      locationcode: [''],
    });

  }
  




change(event: any) {
  console.log("Step changed:", event.selectedIndex);
}

  ngOnInit(): void {
  }
  

  onSubmit() {
    if (this.locationForm.valid) {
      console.log('Submitted Data:', this.locationForm.value);
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
 

  
  
}
