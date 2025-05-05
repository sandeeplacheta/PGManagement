import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { FloorService } from 'src/app/core/services/api/master/floor.service';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent  implements OnInit {
  floorForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'locationName',label:'Location Name'},
    {key:'buildingName',label:'Building Name'},
    {key:'floorName',label:'Floor Name'},
    {key:'floorCode',label:'Floor Code'}
  ] ;  
   fields  =[
    {key:'sandeep',label:'Company Name'},
    {key:'sandeep',label:'Entity Name'},
    {key:'sandeep',label:'Location Name'},
    {key:'sandeep',label:'Building Name'},
    {key:'sandeep',label:'Floor Name'},
    {key:'sandeep',label:'Floor Code'}
  ] ;
  exportColumns =[
    {field:'companyName',label:'Company Name'},
    {field:'entityName',label:'Entity Name'},
    {field:'locationName',label:'Location Name'},
    {field:'buildingName',label:'Building Name'},
    {field:'floorName',label:'Floor Name'},
    {field:'floorCode',label:'Floor Code'}
  ] ;
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
   title= "Floor Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/floor";
  item: any;
  filename!: string;
  allItems: any[] = [];
  partyForm!: FormGroup;
  activeTab: string = "general";
  isSubmitting = false;
  companyField:any[] = [];
  entityField:any[] = [];
  locationField:any[] = [];
  buildingField:any[]=[];

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private floorService:FloorService,
    private commonService:CommonService
  ) {

  }
  


  ngOnInit(): void {
    this.loadDropDownData();
    this.loadData();
    this.initForm('');
  }
  
  loadDropDownData(): void {
    this.commonService.getDropDownDataForMaster('company', '', '').subscribe({
      next: (response) => {
        this.companyField = response.map((item: any) => ({
          id: item.id,
          name: item.name, 
        }));
      },
      error: (error) => {
        console.error('Error fetching dropdown data:', error);
      },
    });
  }
  loadData(): void {
    this.floorService.getEntityListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error);
      }
    });
  }
  private initForm(item:any): void {
    this.floorForm = this.fb.group({
      companyId: [null,Validators.required,],
      entityId: ['',Validators.required],
      locationId: ['',Validators.required],
      buildingId: ['',Validators.required],
      floorName: ['',Validators.required],
      floorCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
    });
    if(this.selectedItemId){
      this.onCompanyChange({ id: item['companyId'] });
      this.onEntityChange({id: item['entityId']});
      this.onLocationChange({id: item['locationId']});
      this.floorService.getDataByID(this.selectedItemId).subscribe({
        next:(response)=>{
          setTimeout(() => {
            this.populateForm(response);
          }, 2000);
          

        }
      })
    }
  }
  populateForm(data:any):void{
    this.floorForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      locationId: String(data.locationId),
      buildingId: String(data.buildingId),
      floorName: data.floorName,
      floorCode: data.floorCode
    });

  }

  onCompanyChange(event:any):void{
    this.entityField = [];
    this.locationField = [];
    this.buildingField = [];
    this.floorForm.get('entityId')?.setValue(null);
    this.floorForm.get('locationId')?.setValue(null);
    this.floorForm.get('buildingId')?.setValue(null);

    this.commonService.getDropDownDataForMaster('entity', event.id, '').subscribe({
      next: (response) => {
        this.entityField = response.map((item: any) => ({
          id: item.id,
          name: item.name, 
        }));
      },
      error: (error) => {
        console.error('Error fetching dropdown data:', error);
      },
    });
  }
  onEntityChange(event:any):void{
    this.locationField = [];
    this.buildingField = [];
    this.floorForm.get('locationId')?.setValue(null);
    this.floorForm.get('buildingId')?.setValue(null);

    this.commonService.getDropDownDataForMaster('location', event.id, '').subscribe({
      next: (response) => {
        this.locationField = response.map((item: any) => ({
          id: item.id,
          name: item.name, 
        }));
      },
      error: (error) => {
        console.error('Error fetching dropdown data:', error);
      },
    });
  }
  onLocationChange(event:any):void{
    this.buildingField = [];
    this.floorForm.get('buildingId')?.setValue(null);

    this.commonService.getDropDownDataForMaster('building', event.id, '').subscribe({
      next: (response) => {
        this.buildingField = response.map((item: any) => ({
          id: item.id,
          name: item.name, 
        }));
      },
      error: (error) => {
        console.error('Error fetching dropdown data:', error);
      },
    });
  }

  onSubmit() {
    if (this.floorForm.valid) {
      const formData = this.floorForm.value;
      delete formData.companyId;
      delete formData.entityId;
      delete formData.locationId;
      console.log('Submitted Data:', formData);
  
      if(this.selectedItemId){
        delete formData.companyId;
        delete formData.entityId;
        this.floorService.updateEntity(this.selectedItemId,formData).subscribe({
          next: (response) => {
            // alert('Floor Update Successfully');
            this.showMessage('success', 'Floor Update Successfully', 'Update Successful');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            // alert('Error occurred while saving entity.');
            this.showMessage('error', 'Error occurred while saving entity.', 'Update Failed');

          }
        });
      }else{
        this.floorService.postData(formData).subscribe({
          next: (response) => {
            // alert('Floor Created Successfully');
            this.showMessage('success', 'Floor Created Successfully', 'Creation Successful');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            // alert('Error occurred while saving entity.');
            this.showMessage('error', 'Error occurred while saving entity.', 'Creation Failed');
          }
        });
      }
  
    } else {
      this.floorForm.markAllAsTouched(); 
      console.log('Form is invalid');
      this.showMessage('error', 'Please fill all required fields correctly.', 'Form Validation Failed');

      // alert('Please fill all required fields correctly.');
    }
  }
  
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['floorId'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    this.initForm(item);
    this.updateURL();
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
    this.activeView='list'
    this.activeTab = 'general'; // Reset to general tab
    this.loadData();
    this.resetForm();
    this.updateURL();
  }
  resetForm():void{
    this.selectedItemId=0;
    this.floorForm.reset();

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
 

  
  toastMsg: string = '';
  toastTitle: string = '';
toastType: 'success' | 'error' | 'update' | 'delete' = 'success';
showToast: boolean = false;

showMessage(type: 'success' | 'error' | 'update' | 'delete', msg: string, title: string) {
  this.toastType = type;
  this.toastMsg = msg;
  this.toastTitle = title; // New property for dynamic title
  this.showToast = true;

  setTimeout(() => {
    this.showToast = false;
  }, 3000); // auto-hide in 3 seconds
}

  
showConfirm = false;

askConfirmation() {
  this.showConfirm = true;
}

handleConfirm() {
  console.log('User confirmed.');
  // Proceed with action
}

handleCancel() {
  console.log('User cancelled.');
  // Cancel the action
}

}
