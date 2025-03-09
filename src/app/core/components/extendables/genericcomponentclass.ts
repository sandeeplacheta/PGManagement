import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  template: '',
})
export abstract class GenericComponentClass implements OnInit {
  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  abstract cols: any[];
  abstract formFields: any[];
  abstract fields: any[];
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
  abstract title: any;
  form: FormGroup = new FormGroup({});
  abstract basePath: string;
  item: any;

  listActions = [
    {
      name: 'uil uil-edit',
      action: (id: number) => this.editItem(id),
      tooltip: 'Edit',
    },
    {
      name: 'uil uil-trash-alt',
      action: (id: number) => this.deleteItem(id),
      tooltip: 'Delete',
    },
    {
      name: 'uil uil-print',
      action: () => this.printItem(),
      tooltip: 'Print',
    },
  ];

  gridActions = [
    {
      classname: 'uil uil-edit',
      action: (id: number) => this.editItem(id),
      tooltip: 'Edit',
    },
    {
      classname: 'uil uil-trash-alt',
      action: (id: number) => this.deleteItem(id),
      tooltip: 'Delete',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private svc: DataService,
    private location: Location
  ) {}

  getFormBuilder() {
    return this.fb;
  }
  ngOnInit() {
    this.route.url.subscribe((value) => {
      if (value.length > 0) {
        this.activeView = value[0].path;
      }
    });
    this.route.params.subscribe((params) => {
      if (params['activeView']) {
        this.activeView = params['activeView'];
      }
    });
    console.log(this.selectedItemId);
    this.loadData();
    this.initForm();
  }
  allItems: any[] = [];  // Store original data

  loadData(): void {
    this.svc.getData().subscribe((data) => {
      console.log('load data', data);
      this.items = data.reverse().map((item: any, index: number) => ({
        ...item,
        serialNumber: index + 1,
      }));
      this.count = this.items.length;
      this.allItems = this.items;  // Keep original data
    });
  }

  addNewItem(): void {
    this.item = null;
    this.form.reset();
    this.activeView = 'form';
    this.updateURL();
  }

  editItem(item: any): void {
    console.log(item);
    this.selectedItemId = item['id'];
    console.log('selectedItemId in edit item', this.selectedItemId);
    console.log('id from editItem method', item);
    this.activeView = 'form';
    this.initForm();
    this.updateURL();
  }

  abstract getFormGroupInitializer(): any;
  initForm(): void {
    if (this.selectedItemId) {
      this.svc.getDataById(this.selectedItemId).subscribe(
        (data: { [key: string]: any }) => {
          console.log('Data received:', data);
          this.item = data;
        },
        (error: any) => {
          console.error('Error loading item data:', error);
        }
      );
    } else {
      this.form = this.fb.group({});
    }
  }
  validSubmit(event: any): void {
    console.log('Form submission data:', event);
    // this.markAllFieldsAsTouched();
    const formData = {
      id: this.selectedItemId || 0,
      ...event,
    };
    const apiCall = this.selectedItemId
      ? this.svc.postData(formData)
      : this.svc.postData(formData);
    this.selectedItemId = 0;

    apiCall.subscribe(
      (response) => {  ;
        console.log(
          this.selectedItemId ? 'Item updated:' : 'New item added:',
          response
        );
        this.loadData();
        this.resetForm();
        this.form.reset();
        this.selectedItemId = 0;
        this.activeView = 'list';
        this.location.replaceState(`${this.basePath}/list`);
      
      },
      (error) => {
        console.error(
          this.selectedItemId ? 'Error updating item:' : 'Error adding item:',
          error
        );
        console.error('Error details:', error.error);
      }
    );
  }
  onCancel(): void {
    this.resetForm();
    this.activeView = 'list';
    this.selectedItemId = 0;
    this.loadData();
    this.updateURL();
  }
  resetForm(): void {
    this.selectedItemId = 0;
    this.form.reset();
    this.activeView = 'list';
  }
  onToggleView(view: string): void {
    this.activeView = view;
    this.updateURL();
  }
  updateURL(): void {
    if (this.activeView === 'form') {
      this.location.replaceState(
        `${this.basePath}/form/${this.selectedItemId || ''}`
      );
    }else if (this.activeView === 'grid') {
      this.location.replaceState(
        `${this.basePath}/grid`
      );
    }
     else {
      this.location.replaceState(`${this.basePath}/list`);
    }
  }
  printItem(): void {}
  deleteItem(id: number): void {}
  onCardClick(item: any) {
   
    this.selectedItemId = item['id'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    this.initForm();
    this.updateURL();
  }
}
