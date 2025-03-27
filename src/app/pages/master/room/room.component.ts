import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  selectedBedForm!: FormGroup;

  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'},
    {key:'sandeep',label:'Location Name'},
    {key:'sandeep',label:'Building Name'},
    {key:'sandeep',label:'Floor Name'},
    {key:'sandeep',label:'Room No.'}
  ] ;  
   fields  =[
    {key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'},
    {key:'sandeep',label:'Location Name'},
    {key:'sandeep',label:'Building Name'},
    {key:'sandeep',label:'Floor Name'},
    {key:'sandeep',label:'Room No.'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title= "Room Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/room";
  item: any;
  filename!: string;
  allItems: any[] = [];
  activeTab: string = "general";
  isSubmitting = false;
  isModalOpen = false;
  selectedBedIndex: number | null = null;

  constructor(private fb: FormBuilder, private loc: Location) {
    this.roomForm = this.fb.group({
      companyid: [''],
      entityid: [''],      
      locationid: [''],
      buildingid: [''],
      floorid:[''],
      roomname:[''],
      roomcode:[''],
      roomtype:[''],
      noofbed:[''],
      beds: this.fb.array([]) 
    });

  }
  
  get beds(): FormArray {
    return this.roomForm.get('beds') as FormArray;
  }
  generateBeds() {
    this.beds.clear(); // Clear existing beds
    const numBeds = this.roomForm.get('noofbed')?.value || 0;

    for (let i = 1; i <= numBeds; i++) {
      this.beds.push(this.fb.group({
        bedNo: [i], // Auto-numbered bed
        bedType: [''],
        personName: [''],
        contactNo: [''],
        depositAmount: [''],
        document: [null]
      }));
    }
  }

  getBedFormGroup(index: number): FormGroup {
    return this.beds.at(index) as FormGroup;
  }
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed.');
        return;
      }
      
      const fileURL = URL.createObjectURL(file);
      this.selectedBedForm.patchValue({ document: fileURL });
    }
  }
  

change(event: any) {
  console.log("Step changed:", event.selectedIndex);
}

  ngOnInit(): void {
  }
  

  onSubmit() {
    if (this.roomForm.valid) {
      console.log('Submitted Data:', this.roomForm.value);
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
 
 
  menuIndex: number | null = null; // To track which menu is open

toggleMenu(index: number) {
  this.menuIndex = this.menuIndex === index ? null : index;
}

editBed(index: number) {
  console.log(`Edit bed at index ${index}`);
  this.menuIndex = null; // Close menu after action
}

changeBed(index: number) {
  console.log(`Change bed at index ${index}`);
  this.menuIndex = null;
}

changeRoom(index: number) {
  console.log(`Change room at index ${index}`);
  this.menuIndex = null;
}

exchangeBed(index: number) {
  console.log(`Exchange bed at index ${index}`);
  this.menuIndex = null;
}
  
openModal(index: number) {
  this.selectedBedIndex = index;
  this.selectedBedForm = this.fb.group({
    bedNo: [{ value: this.beds.at(index).get('bedNo')?.value, disabled: true }],
    bedType: [this.beds.at(index).get('bedType')?.value, Validators.required],
    personName: [this.beds.at(index).get('personName')?.value, Validators.required],
    contactNo: [this.beds.at(index).get('contactNo')?.value, Validators.required],
    depositAmount: [this.beds.at(index).get('depositAmount')?.value],
    document: [this.beds.at(index).get('document')?.value]
  });

  this.isModalOpen = true;
  this.menuIndex = null; // Close menu
}

closeModal() {
  this.isModalOpen = false;
  this.selectedBedIndex = null;
}

updateBed() {
  if (this.selectedBedIndex !== null) {
    this.beds.at(this.selectedBedIndex).patchValue(this.selectedBedForm.getRawValue());
  }
  this.closeModal();
}

}
