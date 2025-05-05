import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.scss']
})
export class UserrolesComponent  implements OnInit {
  userrolesForm: FormGroup;
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
    this.userrolesForm  = this.fb.group({
      userrolename: [''],
     });

  }
  
  ngOnInit(): void {
    this.userrolesForm  = this.fb.group({
      userrolename: [''],
    });
    console.log(this.userrolesForm.controls); // ✅ Now it's safe to access
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
    if (view === 'basic' && !this.userrolesForm.contains('userrolename')) {
      this.userrolesForm.addControl('userrolename', new FormControl('', Validators.required));
    }
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
 
   

  
  modulesList = [
    {
      key: 'Master',
      label: 'Master',
      leftList: [
        { id: 1, name: 'Create Master' },
        { id: 2, name: 'View Master' },
        { id: 3, name: 'Edit Master' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'PGManagement',
      label: 'PG Management',
      leftList: [
        { id: 4, name: 'Add PG' },
        { id: 5, name: 'Update PG' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'AMS',
      label: 'Asset Management',
      leftList: [
        { id: 6, name: 'Add Asset' },
        { id: 7, name: 'Track Asset' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'P2P',
      label: 'P2P',
      leftList: [
        { id: 8, name: 'Raise PO' },
        { id: 9, name: 'Approve PO' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'S2P',
      label: 'S2P',
      leftList: [
        { id: 10, name: 'Vendor Management' },
        { id: 11, name: 'Invoice Process' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'Reports',
      label: 'Reports',
      leftList: [
        { id: 12, name: 'Daily Report' },
        { id: 13, name: 'Monthly Report' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    },
    {
      key: 'Dashboards',
      label: 'Dashboards',
      leftList: [
        { id: 14, name: 'Admin Dashboard' },
        { id: 15, name: 'User Dashboard' }
      ] as PermissionItem[],
      rightList: [] as PermissionItem[],
      selectedLeft: [] as PermissionItem[],
      selectedRight: [] as PermissionItem[],
      leftSearch: ''
    }
  ];

  moveToRight(module: any) {
    module.selectedLeft.forEach((item: PermissionItem) => {
      if (!module.rightList.some((r: PermissionItem) => r.id === item.id)) {
        module.rightList.push(item);
      }
    });
    module.leftList = module.leftList.filter((item: PermissionItem) => !module.selectedLeft.includes(item));
    module.selectedLeft = [];
  }
  

  moveToLeft(module: any) {
    module.leftList.push(...module.selectedRight);
    module.rightList = module.rightList.filter((item: PermissionItem) => !module.selectedRight.includes(item));
    module.selectedRight = [];
  }

  filteredLeft(module: any): PermissionItem[] {
    const term = module.leftSearch?.toLowerCase() || '';
    return module.leftList.filter((item: PermissionItem) => item.name.toLowerCase().includes(term));
  }
  
}

export interface PermissionItem {
  id: number;
  name: string;
}
