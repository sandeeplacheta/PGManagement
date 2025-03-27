import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent  implements OnInit {
  userrolesForm: FormGroup;
  isMasterEnabled: boolean = false;
  isPGManagementEnabled: boolean = false;
  isAMSEnabled: boolean = false;
  isP2PEnabled: boolean = false;
  isS2PEnabled: boolean = false;
  isDashboardsEnabled: boolean = false;
  isReportsEnabled: boolean = false;

  Master: boolean = false;
  PGManagement: boolean = false;
  AMS: boolean = false;
  P2P: boolean = false;
  S2P: boolean = false;
  Reports: boolean = false;
  Dashboards: boolean = false;
  
  masterOptions = [
    { label: 'Company', value: 'company' },
    { label: 'Location', value: 'location' }
  ];

  pgManagementOptions = [
    { label: 'Room 1', value: 'room1' },
    { label: 'Room 2', value: 'room2' }
  ];

  AMSOptions = [
    { label: 'Company', value: 'company' },
    { label: 'Location', value: 'location' }
  ];

  P2POptions = [
    { label: 'Room 1', value: 'room1' },
    { label: 'Room 2', value: 'room2' }
  ];

  S2POptions = [
    { label: 'Company', value: 'company' },
    { label: 'Location', value: 'location' }
  ];

  DashboardsOptions = [
    { label: 'Room 1', value: 'room1' },
    { label: 'Room 2', value: 'room2' }
  ];
  ReportsOptions = [
    { label: 'Company', value: 'company' },
    { label: 'Location', value: 'location' }
  ];


  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[{key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'}] ;  
   fields  =[
    {key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title= "User Roles Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/userroles";
  item: any;
  filename!: string;
  allItems: any[] = [];
  partyForm!: FormGroup;
  activeTab: string = "general";
  isSubmitting = false;


  constructor(private fb: FormBuilder, private loc: Location) {
    this.userrolesForm = this.fb.group({
      userrolename: [''],
      isMasterEnabled: [false], 
      isPGManagementEnabled: [false],
      isAMSEnabled: [false], 
      isP2PEnabled: [false],
      isS2PEnabled: [false], 
      isDashboardsEnabled: [false],
      isReportsEnabled: [false], 

      masterSelection: [[]], 
      pgManagementSelection: [[]] ,
      AMSSelection: [[]], 
      P2PSelection: [[]] ,
      S2PSelection: [[]], 
      DashboardsSelection: [[]] ,
      ReportsSelection: [[]], 

      Master: [false],
      PGManagement: [false],
      AMS: [false],
      P2P: [false],
      S2P: [false],
      Reports: [false],
      Dashboards: [false],
    });

  }
  
  ngOnInit(): void {
    this.userrolesForm.get('Master')?.valueChanges.subscribe(value => {
      this.Master = value;
      if (value) {
        this.userrolesForm.patchValue({ isMasterEnabled: true });
      }
    });
    this.userrolesForm.get('PGManagement')?.valueChanges.subscribe(value => {
      this.PGManagement = value;
      if (value) {
        this.userrolesForm.patchValue({ isPGManagementEnabled: true });
      }
    });
    this.userrolesForm.get('AMS')?.valueChanges.subscribe(value => {
      this.AMS = value;
      if (value) {
        this.userrolesForm.patchValue({ isAMSEnabled: true });
      }
    });
    this.userrolesForm.get('P2P')?.valueChanges.subscribe(value => {
      this.P2P = value;
      if (value) {
        this.userrolesForm.patchValue({ isP2PEnabled: true });
      }
    });
    this.userrolesForm.get('S2P')?.valueChanges.subscribe(value => {
      this.S2P = value;
      if (value) {
        this.userrolesForm.patchValue({ isS2PEnabled: true });
      }
    });
    this.userrolesForm.get('Reports')?.valueChanges.subscribe(value => {
      this.Reports = value;
      if (value) {
        this.userrolesForm.patchValue({ isReportsEnabled: true });
      }
    });
    this.userrolesForm.get('Dashboards')?.valueChanges.subscribe(value => {
      this.Dashboards = value;
      if (value) {
        this.userrolesForm.patchValue({ isDashboardsEnabled: true });
      }
    });
   
   
    this.userrolesForm.get('isMasterEnabled')?.valueChanges.subscribe(value => {
      this.isMasterEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ Master: false });
      }
    });
  
    this.userrolesForm.get('isPGManagementEnabled')?.valueChanges.subscribe(value => {
      this.isPGManagementEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ PGManagement: false });
      }
    });

    this.userrolesForm.get('isAMSEnabled')?.valueChanges.subscribe(value => {
      this.isAMSEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ AMS: false });
      }
    });
    this.userrolesForm.get('isP2PEnabled')?.valueChanges.subscribe(value => {
      this.isP2PEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ P2P: false });
      }
    });
    this.userrolesForm.get('isS2PEnabled')?.valueChanges.subscribe(value => {
      this.isS2PEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ S2P: false });
      }
    });
    this.userrolesForm.get('isDashboardsEnabled')?.valueChanges.subscribe(value => {
      this.isDashboardsEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ Dashboards: false });
      }
    });
    this.userrolesForm.get('isReportsEnabled')?.valueChanges.subscribe(value => {
      this.isReportsEnabled = value;
      if (!value) {
        this.userrolesForm.patchValue({ Reports: false });
      }
    });

  }



change(event: any) {
  console.log("Step changed:", event.selectedIndex);
}


  

  onSubmit() {
    if (this.userrolesForm.valid) {
      console.log('Submitted Data:', this.userrolesForm.value);
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
