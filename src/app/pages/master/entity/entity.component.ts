import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/core/services/common.service';
import { EntityService } from 'src/app/core/services/api/master/entity.service';
@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  entityForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
  cols = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'entityName', label: 'Entity Name' },
    { key: 'entityPrefix', label: 'Entity Prefix' }
  ];
  fields = [
    { key: 'companyName', label: 'Company Name'},
    { key: 'entityName', label: 'Entity Name' }
  ];
  exportColumns = [
    { field: 'companyName', label: 'Company Name'},
    { field: 'entityName', label: 'Entity Name' },
    { field: 'entityPrefix', label: 'Entity Prefix' }];
  selectedItemId!: number;
  addNewLink: any;
  title = 'Entity Master';
  form: FormGroup = new FormGroup({});
  basePath = '/master/entity';
  item: any;
  filename: string= "Entity_Details";
  allItems: any[] = [];
  partyForm!: FormGroup;
  activeTab: string = 'general';
  isSubmitting = false;
  companyField: any[] = [];

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private commonService: CommonService,
    private entityService: EntityService
  ) {}

  change(event: any) {
    console.log('Step changed:', event.selectedIndex);
  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
    this.loadDropDownData();
  }


  loadData(): void {
    this.entityService.getEntityListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error);
      }
    });
  }
  
  private initForm(): void {
    this.entityForm = this.fb.group({
      companyId: [null,Validators.required,],
      entityName: ['',Validators.required,],
      entityPrefix: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
    });
    if(this.selectedItemId){
      this.entityService.getDataByID(this.selectedItemId).subscribe({
        next:(response)=>{
          this.populateForm(response);
        }
      })
    }
  }

  populateForm(data:any):void{
    this.entityForm.patchValue({
      companyId: String(data.companyId),
      entityName: data.entityName,
      entityPrefix: data.entityPrefix
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

  onSubmit() {
    if (this.entityForm.valid) {
      const formData = this.entityForm.value;
      console.log('Submitted Data:', formData);
  
      if(this.selectedItemId){
        this.entityService.updateEntity(this.selectedItemId,formData).subscribe({
          next: (response) => {
            alert('Entity Update Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }else{
        this.entityService.postData(formData).subscribe({
          next: (response) => {
            alert('Entity Registered Successfully');
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            alert('Error occurred while saving entity.');
          }
        });
      }
  
    } else {
      this.entityForm.markAllAsTouched(); 
      console.log('Form is invalid');
      // alert('Please fill all required fields correctly.');
    }
  }
  

  

  onCardClick(item: any) {
    this.selectedItemId = item['entityId'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    this.initForm();
    this.updateURL();
  }



  handleAction(event: { action: string }) {
    console.log(event.action);
  }

  onRowSelect(item: any) {
    console.log('Row selected:', item);
  }
  onAddNew() {
    console.log('Row selected:');
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
    this.entityForm.reset();

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
