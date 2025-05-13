import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/core/services/common.service';
import { DesignationService } from 'src/app/core/services/api/master/designation.service';
import { RolesService } from 'src/app/core/services/api/master/roles.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  rolesForm!: FormGroup;
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
   cols =[
    {key:'roleMenu',label:'Role Menu'},
    {key:'roleName',label:'Role Name'},
    {key:'roleNameId',label:'Role ID'}
  ] ;  
   fields  =[
    {key:'roleMenu',label:'Role Menu'},
    {key:'roleName',label:'Role Name'},
    {key:'roleNameId',label:'Role ID'}
  ] ;
  exportColumns =[{key:'sandeep',label:'syan'}] ;
  selectedItemId!: number;
  addNewLink: any;
  title= "Role Master";
  form: FormGroup = new FormGroup({});
  basePath ="/master/roles";
  item: any;
  filename!: string;
  allItems: any[] = [];
  isSubmitting = false;
  rolesField: any[] = [{id:"Master",name:"Master"}];
  // entityField: any[] = [];


  constructor(
    private fb: FormBuilder, 
    private loc: Location,
    private commonService:CommonService,
    private roleservice:RolesService
  ) {}
  



  ngOnInit(): void {
    this.loadData();
    this.initForm('');
  }
  
  initForm(item: any): void {
    this.rolesForm = this.fb.group({
      roleMenu: [''],
      roleNameId: [''], 
      roleName:[''],
    });
    // if (this.selectedItemId) {
    //   this.roleservice.getDesignationDataByID(this.selectedItemId).subscribe({
    //     next: (response) => {
    //         this.populateForm(response);
    //     },
    //     error: (error) => {
    //     this.showMessage(
    //             'error',
    //             error.message,
    //             'Loading Data Failed'
    //           );
    //   },
    //   });
    // }
  }
  // populateForm(data: any): void {
  //   this.designationForm.patchValue({
  //     companyId: String(data.companyId),
  //     entityId: String(data.entityId),
  //     designationName: data.designationName,
  //     designationCode: data.designationCode,
  //   });
  // }

    loadData(): void {
    this.roleservice.getListViewData().subscribe({
      next: (response) => {
        this.items = response;
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
 onSubmit() {
    if (this.rolesForm.valid) {
      const formData = this.rolesForm.value;
      console.log('Submitted Data:', formData);

      if (this.selectedItemId) {

        // this.roleservice
        //   .updateDesignationData(this.selectedItemId, formData)
        //   .subscribe({
        //     next: (response) => {
        //       // alert('Floor Update Successfully');
        //       this.showMessage(
        //         'success',
        //         'Designation Update Successfully',
        //         'Update Successful'
        //       );
        //       this.onBack();
        //     },
        //     error: (err) => {
        //       console.error('Error saving entity:', err);
        //       // alert('Error occurred while saving entity.');
        //       this.showMessage(
        //         'error',
        //         'Error occurred while saving entity.',
        //         'Update Failed'
        //       );
        //     },
        //   });
      } else {
        this.roleservice.postData(formData).subscribe({
          next: (response) => {
            this.showMessage(
              'success',
              'Designation Created Successfully',
              'Creation Successful'
            );
            this.onBack();
          },
          error: (err) => {
            this.showMessage(
              'error',
              err.message,
              'Creation Failed'
            );
          },
        });
      }
    } else {
      this.rolesForm.markAllAsTouched();
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
    this.rolesForm.reset();
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
