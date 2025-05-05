import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoctionService } from 'src/app/core/services/api/master/loction.service';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent  implements OnInit {
  locationForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
   cols =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'locationName',label:'Location Name'},
    {key:'locationCode',label:'Location Code'}] ;  
   fields  =[
    {key:'entityName',label:'Entity Name'},
    {key:'locationName',label:'Location Name'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  addNewLink: any;
  title= "Location Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/location";
  item: any;
  filename!: string;
  allItems: any[] = [];
  companyField:any[] = [];
  entityField:any[] = [];
  partyForm!: FormGroup;
  activeTab: string = "general";
  isSubmitting = false;


  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private commonService:CommonService,
    private locationService: LoctionService) {

  }
  




change(event: any) {
  console.log("Step changed:", event.selectedIndex);
}

  ngOnInit(): void {
    this.loadData();
    this.initForm();
    this.loadDropDownData();
  }
 
  loadData(): void {
    this.locationService.getEntityListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error);
      }
    });
  }
  
  private initForm(): void {
    this.locationForm = this.fb.group({
      companyId: [null,Validators.required,],
      entityId: ['',Validators.required],
      locationName: ['',Validators.required],
      locationCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
    });
    if(this.selectedItemId){
      this.locationService.getDataByID(this.selectedItemId).subscribe({
        next:(response)=>{ 
          this.onCompanyChange({ id: response.companyId });
            setTimeout(() => {
              this.populateForm(response);

            }, 2000);
          // this.onCompanyChange({ id: response.companyId });

        }
      })
    }
  }

  populateForm(data:any):void{
    this.locationForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      locationName: data.locationName,
      locationCode: data.locationCode
    });

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
    onCompanyChange(event:any):void{
      this.entityField = [];
      this.locationForm.get('entityId')?.setValue(null);
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

  onSubmit() {
    if (this.locationForm.valid) {
      const formData = this.locationForm.value;
      delete formData.companyId;
      console.log('Submitted Data:', formData);
  
      if(this.selectedItemId){
        this.locationService.updateEntity(this.selectedItemId,formData).subscribe({
          next: (response) => {
            alert('Location Update Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }else{
        this.locationService.postData(formData).subscribe({
          next: (response) => {
            alert('Location Created Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }
  
    } else {
      this.locationForm.markAllAsTouched(); 
      console.log('Form is invalid');
      // alert('Please fill all required fields correctly.');
    }
  }
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['locationId'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    this.initForm();
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
    this.locationForm.reset();

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
