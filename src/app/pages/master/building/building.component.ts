import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/core/services/common.service';
import { BuildingService } from 'src/app/core/services/api/master/building.service';
@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent  implements OnInit {
  buildingForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'locationName',label:'Location Name'},
    {key:'buildingName',label:'Building Name'},
    {key:'buildingCode',label:'Building Code'}
  ] ;  
   fields  =[
    {key:'locationName',label:'Location Name'},
    {key:'buildingName',label:'Building Name'}
  ] ;
  exportColumns =[
    {field:'companyName',label:'Company Name'},
    {field:'entityName',label:'Entity Name'},
    {field:'locationName',label:'Location Name'},
    {field:'buildingName',label:'Building Name'},
    {field:'buildingCode',label:'Building Code'}
  ] ; 
  selectedItemId!: number;
  addNewLink: any;
  title= "Building Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/building";
  item: any;
  filename!: string;
  allItems: any[] = [];
  activeTab: string = "general";
  isSubmitting = false;

  companyField:any[] = [];
  entityField:any[] = [];
  locationField:any[] = [];
  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private buildingService:BuildingService,
    private commonService:CommonService,
    ) {
   

  }
  





  ngOnInit(): void {
    this.loadData();
    this.initForm('');
    this.loadDropDownData();
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
    this.buildingService.getEntityListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error);
      }
    });
  }
  private initForm(item:any): void {
    this.buildingForm = this.fb.group({
      companyId: [null,Validators.required,],
      entityId: ['',Validators.required],
      locationId: ['',Validators.required],
      buildingName: ['',Validators.required],
      buildingCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
    });
    if(this.selectedItemId){
      this.onCompanyChange({ id: item['companyId'] });
      this.onEntityChange({id: item['entityId']});
      this.buildingService.getDataByID(this.selectedItemId).subscribe({
        next:(response)=>{
          // setTimeout(() => {
            this.populateForm(response);
          // }, 2000);
          

        }
      })
    }
  }
  populateForm(data:any):void{
    this.buildingForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      locationId: String(data.locationId),
      buildingName: data.buildingName,
      buildingCode: data.buildingCode
    });

  }

  onCompanyChange(event:any):void{
    this.entityField = [];
    this.locationField = [];
    this.buildingForm.get('entityId')?.setValue(null);
    this.buildingForm.get('locationId')?.setValue(null);

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
    this.buildingForm.get('locationId')?.setValue(null);

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

  onSubmit() {
    if (this.buildingForm.valid) {
      const formData = this.buildingForm.value;
      delete formData.companyId;
      console.log('Submitted Data:', formData);
  
      if(this.selectedItemId){
        delete formData.companyId;
        delete formData.entityId;
        this.buildingService.updateEntity(this.selectedItemId,formData).subscribe({
          next: (response) => {
            alert('Building Update Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }else{
        this.buildingService.postData(formData).subscribe({
          next: (response) => {
            alert('Building Created Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }
  
    } else {
      this.buildingForm.markAllAsTouched(); 
      console.log('Form is invalid');
      // alert('Please fill all required fields correctly.');
    }
  }
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['buildingId'];
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
    this.buildingForm.reset();

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
