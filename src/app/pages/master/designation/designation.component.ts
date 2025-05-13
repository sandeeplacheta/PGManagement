import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/core/services/common.service';
import { DesignationService } from 'src/app/core/services/api/master/designation.service';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  designationForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'designationName',label:'Designation Name'},
    {key:'designationCode',label:'Designation Code'}
  ] ;  
   fields  =[
    {key:'companyName',label:'Company Name'},
    {key:'entityName',label:'Entity Name'},
    {key:'designationName',label:'Designation Name'},
    {key:'designationCode',label:'Designation Code'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  addNewLink: any;
  title= "Designation Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/designation";
  item: any;
  filename!: string;
  allItems: any[] = [];
  isSubmitting = false;
  companyField: any[] = [];
  entityField: any[] = [];


  constructor(
    private fb: FormBuilder, 
    private loc: Location,
    private commonService:CommonService,
    private designationservice:DesignationService
  ) {}
  




change(event: any) {
  console.log("Step changed:", event.selectedIndex);
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
  onCompanyChange(event: any): void {
    this.entityField = [];
    this.designationForm.get('entityId')?.setValue(null);
    this.commonService
      .getDropDownDataForMaster('entity', event.id, '')
      .subscribe({
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
  initForm(item: any): void {
    this.designationForm = this.fb.group({
      companyId: [''],
      entityId: [''], 
      designationName:[''],
      designationCode:[''],
    });
    if (this.selectedItemId) {
      this.onCompanyChange({ id: item['companyId'] });
      this.designationservice.getDesignationDataByID(this.selectedItemId).subscribe({
        next: (response) => {
            this.populateForm(response);
        },
        error: (error) => {
        this.showMessage(
                'error',
                error.message,
                'Loading Data Failed'
              );
      },
      });
    }
  }
  populateForm(data: any): void {
    this.designationForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      designationName: data.designationName,
      designationCode: data.designationCode,
    });
  }

    loadData(): void {
    this.designationservice.getListViewDataForDesignation().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        // console.error('Error loading entity list:', error);
        this.showMessage(
                'error',
                error.message,
                'Loading Data Failed'
              );
      },
    });
  }
 onSubmit() {
    if (this.designationForm.valid) {
      const formData = this.designationForm.value;
      delete formData.companyId;
      console.log('Submitted Data:', formData);

      if (this.selectedItemId) {

        this.designationservice
          .updateDesignationData(this.selectedItemId, formData)
          .subscribe({
            next: (response) => {
              // alert('Floor Update Successfully');
              this.showMessage(
                'success',
                'Designation Update Successfully',
                'Update Successful'
              );
              this.onBack();
            },
            error: (err) => {
              console.error('Error saving entity:', err);
              // alert('Error occurred while saving entity.');
              this.showMessage(
                'error',
                'Error occurred while saving entity.',
                'Update Failed'
              );
            },
          });
      } else {
        this.designationservice.postDataDesignation(formData).subscribe({
          next: (response) => {
            // alert('Floor Created Successfully');
            this.showMessage(
              'success',
              'Designation Created Successfully',
              'Creation Successful'
            );
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            // alert('Error occurred while saving entity.');
            this.showMessage(
              'error',
              err.message,
              'Creation Failed'
            );
          },
        });
      }
    } else {
      this.designationForm.markAllAsTouched();
      console.log('Form is invalid');
      this.showMessage(
        'error',
        'Please fill all required fields correctly.',
        'Form Validation Failed'
      );
    }
  }
  
  onCardClick(item: any) {
   
    this.selectedItemId = item['designationId'];
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
    this.activeView='list';
    this.loadData();
    this.updateURL();
    this.resetForm();
  }
  resetForm(): void {
    this.selectedItemId = 0;
    this.designationForm.reset();
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

  showMessage(
    type: 'success' | 'error' | 'update' | 'delete',
    msg: string,
    title: string
  ) {
    this.toastType = type;
    this.toastMsg = msg;
    this.toastTitle = title; // New property for dynamic title
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // auto-hide in 3 seconds
  }

}
