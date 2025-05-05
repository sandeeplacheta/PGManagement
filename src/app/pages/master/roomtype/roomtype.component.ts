import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RoomService } from 'src/app/core/services/api/master/room.service';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.scss']
})
export class RoomtypeComponent implements OnInit {
  roomtypeForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'locationName',label:'Location Name'},
    {key:'buildingName',label:'Building Name'},
    {key:'roomTypeName',label:'RoomType Name'},
    {key:'roomTypeCode',label:'RoomType Code'},
    {key:'monthlyPrice',label:'RoomType Price'}
  ] ;  
   fields  =[
    {key:'buildingName',label:'Building Name'},
    {key:'roomTypeName',label:'RoomType Name'},
    {key:'roomTypeCode',label:'RoomType Code'},
    {key:'monthlyPrice',label:'RoomType Price'}
  ] ;
  exportColumns =[
    {field:'buildingName',label:'Building Name'},
    {field:'roomTypeName',label:'RoomType Name'},
    {field:'roomTypeCode',label:'RoomType Code'},
    {field:'monthlyPrice',label:'RoomType Price'}
  ] ;
  selectedItemId!: number;
  addNewLink: any;
   title= "Room Type Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/roomtype";
  item: any;
  filename!: string;
  allItems: any[] = [];
  activeTab: string = "general";
  isSubmitting = false;
  companyField:any[] = [];
  entityField:any[] = [];
  locationField:any[] = [];
  buildingField:any[]=[];

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private commonService:CommonService,
    private roomTypeService:RoomService) {
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
    this.roomTypeService.getRoomTypeListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error.message);
      }
    });
  }
  private initForm(item:any): void {
    this.roomtypeForm= this.fb.group({
      companyId: [null,Validators.required,],
      entityId: ['',Validators.required],
      locationId: ['',Validators.required],
      buildingId: ['',Validators.required],
      roomTypeName: ['',Validators.required],
      monthlyPrice: [0,Validators.required],
      description: [''],
      roomTypeCode: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
    });
    if(this.selectedItemId){
      this.onCompanyChange({ id: item['companyId'] });
      this.onEntityChange({id: item['entityId']});
      this.onLocationChange({id: item['locationId']});
      this.roomTypeService.getRoomTypeDataByID(this.selectedItemId).subscribe({
        next:(response)=>{
          setTimeout(() => {
            this.populateForm(response);
          }, 2000);
          

        }
      })
    }
  }
  populateForm(data:any):void{
    this.roomtypeForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      locationId: String(data.locationId),
      buildingId: String(data.buildingId),
      description: data.description,
      monthlyPrice: data.monthlyPrice,
      roomTypeCode: data.roomTypeCode,
      roomTypeName: data.roomTypeName
    });

  }

  onCompanyChange(event:any):void{
    this.entityField = [];
    this.locationField = [];
    this.buildingField = [];
    this.roomtypeForm.get('entityId')?.setValue(null);
    this.roomtypeForm.get('locationId')?.setValue(null);
    this.roomtypeForm.get('buildingId')?.setValue(null);

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
    this.roomtypeForm.get('locationId')?.setValue(null);
    this.roomtypeForm.get('buildingId')?.setValue(null);

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
    this.roomtypeForm.get('buildingId')?.setValue(null);

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
    if (this.roomtypeForm.valid) {
      const formData = this.roomtypeForm.value;
      delete formData.companyId;
      delete formData.entityId;
      delete formData.locationId;
      console.log('Submitted Data:', formData);
  
      if(this.selectedItemId){
        delete formData.companyId;
        delete formData.entityId;
        this.roomTypeService.updateRoomType(this.selectedItemId,formData).subscribe({
          next: (response) => {
            alert('Room Type Update Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }else{
        this.roomTypeService.postDataRoomType(formData).subscribe({
          next: (response) => {
            alert('Room Type Created Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert(err.message);
          }
        });
      }
  
    } else {
      this.roomtypeForm.markAllAsTouched(); 
      console.log('Form is invalid');
      // alert('Please fill all required fields correctly.');
    }
  }
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['roomTypeId'];
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
    this.roomtypeForm.reset();

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
