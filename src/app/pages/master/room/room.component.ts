import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/core/services/common.service';
import { RoomService } from 'src/app/core/services/api/master/room.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomForm!: FormGroup;
  selectedBedForm!: FormGroup;

  activeView: string = 'list';
  count = 0;
  items: any[] = [];
  formFields: any[] | undefined;
  cols = [
    { key: 'buildingName', label: 'Company Name' },
    { key: 'buildingName', label: 'Entity Name' },
    { key: 'buildingName', label: 'Building Name' },
    { key: 'floorName', label: 'Floor Name' },
    { key: 'roomName', label: 'Room Name' },
    { key: 'numBeds', label: 'Total Bed' },
  ];
  fields = [
    { key: 'buildingName', label: 'Company Name' },
    { key: 'buildingName', label: 'Entity Name' },
    { key: 'buildingName', label: 'Building Name' },
    { key: 'floorName', label: 'Floor Name' },
    { key: 'roomName', label: 'Room Name' },
    { key: 'numBeds', label: 'Total Bed' },
  ];
  exportColumns = [
    { key: 'buildingName', label: 'Company Name' },
    { key: 'buildingName', label: 'Entity Name' },
    { key: 'buildingName', label: 'Building Name' },
    { key: 'floorName', label: 'Floor Name' },
    { key: 'roomName', label: 'Room Name' },
    { key: 'numBeds', label: 'Total Bed' },
  ];
  selectedItemId!: number;
  selectedCode!: string;
  addNewLink: any;
  title = 'Room Master';
  form: FormGroup = new FormGroup({});
  basePath = '/master/room';
  item: any;
  filename!: string;
  allItems: any[] = [];
  activeTab: string = 'general';
  isSubmitting = false;
  isModalOpen = false;
  selectedBedIndex: number | null = null;
  companyField: any[] = [];
  entityField: any[] = [];
  locationField: any[] = [];
  buildingField: any[] = [];
  floorField: any[] = [];
  roomTypeField: any[] = [];

  constructor(
    private fb: FormBuilder,
    private loc: Location,
    private commonService: CommonService,
    private roomService: RoomService
  ) {}

  get beds(): FormArray {
    return this.roomForm.get('beds') as FormArray;
  }
  generateBeds() {
    this.beds.clear(); // Clear existing beds
    const numBeds = this.roomForm.get('noofbed')?.value || 0;

    for (let i = 1; i <= numBeds; i++) {
      this.beds.push(
        this.fb.group({
          bedNo: [i],
          bedType: [''],
          personName: [''],
          contactNo: [''],
          depositAmount: [''],
          document: [null],
        })
      );
    }
  }

  getBedFormGroup(index: number): FormGroup {
    return this.beds.at(index) as FormGroup;
  }

  loadData(): void {
    this.roomService.getRoomListViewData().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        console.error('Error loading entity list:', error);
      },
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
  onCompanyChange(event: any): void {
    this.entityField = [];
    this.locationField = [];
    this.buildingField = [];
    this.roomForm.get('entityId')?.setValue(null);
    this.roomForm.get('locationId')?.setValue(null);
    this.roomForm.get('buildingId')?.setValue(null);

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
  onEntityChange(event: any): void {
    this.locationField = [];
    this.buildingField = [];
    this.roomForm.get('locationId')?.setValue(null);
    this.roomForm.get('buildingId')?.setValue(null);

    this.commonService
      .getDropDownDataForMaster('location', event.id, '')
      .subscribe({
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
  onLocationChange(event: any): void {
    this.buildingField = [];
    this.floorField = [];
    this.roomForm.get('buildingId')?.setValue(null);
    this.roomForm.get('floorId')?.setValue(null);

    this.commonService
      .getDropDownDataForMaster('building', event.id, '')
      .subscribe({
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
  onBuildingChange(event: any): void {
    this.floorField = [];
    this.roomForm.get('floorId')?.setValue(null);

    this.commonService
      .getDropDownDataForMaster('floor', event.id, '')
      .subscribe({
        next: (response) => {
          this.floorField = response.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        },
        error: (error) => {
          console.error('Error fetching dropdown data:', error);
        },
      });
    this.roomService.getRoomTypeDataByBuildingId(event.id).subscribe({
      next: (response) => {
        console.log('room type by building id', response);
        this.roomTypeField = response.map((item: any) => ({
          id: item.roomTypeId,
          name: item.roomTypeName,
          monthlyPrice: item.monthlyPrice,
        }));
      },
      error: (error) => {
        console.error('Error fetching dropdown data:', error);
      },
    });
  }

  onRoomTypeChange(event: any): void {
    const selectedRoomType = this.roomTypeField.find(
      (item: any) => item.id === event.id
    );
    if (selectedRoomType) {
      this.roomForm
        .get('perBedCharge')
        ?.setValue(selectedRoomType.monthlyPrice);
    } else {
      this.roomForm.get('perBedCharge')?.setValue(0);
    }
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
    console.log('Step changed:', event.selectedIndex);
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDropDownData();
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const formData = this.roomForm.value;
      delete formData.companyId;
      delete formData.entityId;
      delete formData.locationId;
      delete formData.buildingId;
      // delete formData.perBedCharge;
      delete formData.beds;
      console.log('Submitted Data:', formData);

      if (this.selectedItemId) {
        // delete formData.companyId;
        // delete formData.entityId;

        this.roomService
          .updateRoomData(this.selectedItemId, formData)
          .subscribe({
            next: (response) => {
              // alert('Floor Update Successfully');
              this.showMessage(
                'success',
                'Floor Update Successfully',
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
        this.roomService.postDataRoom(formData).subscribe({
          next: (response) => {
            // alert('Floor Created Successfully');
            this.showMessage(
              'success',
              'Floor Created Successfully',
              'Creation Successful'
            );
            this.onBack();
          },
          error: (err) => {
            console.error('Error saving entity:', err);
            // alert('Error occurred while saving entity.');
            this.showMessage(
              'error',
              'Error occurred while saving entity.',
              'Creation Failed'
            );
          },
        });
      }
    } else {
      this.roomForm.markAllAsTouched();
      console.log('Form is invalid');
      this.showMessage(
        'error',
        'Please fill all required fields correctly.',
        'Form Validation Failed'
      );
    }
  }

  onCardClick(item: any) {
    this.selectedItemId = item['roomId'];
    this.activeView = 'form';
    console.log('Selected Item ID:', this.selectedItemId);
    this.initForm(item);
    this.updateURL();
  }
  private initForm(item: any): void {
    this.roomForm = this.fb.group({
      companyId: [''],
      entityId: [''],
      locationId: [''],
      buildingId: [''],
      floorId: ['', Validators.required],
      roomName: ['', Validators.required],
      roomCode: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      roomTypeId: ['', Validators.required],
      numBeds: ['', Validators.required],
      perBedCharge: [''],
      beds: this.fb.array([]),
    });
    if (this.selectedItemId) {
      this.onCompanyChange({ id: item['companyId'] });
      this.onEntityChange({ id: item['entityId'] });
      this.onLocationChange({ id: item['locationId'] });
      this.onBuildingChange({ id: item['buildingId'] });
      this.roomService.geRoomtDataByID(this.selectedItemId).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.onRoomTypeChange({ id: response.roomTypeId });
            this.populateForm(response);
          }, 2000);
        },
      });
    }
  }
  populateForm(data: any): void {
    this.roomForm.patchValue({
      companyId: String(data.companyId),
      entityId: String(data.entityId),
      locationId: String(data.locationId),
      buildingId: String(data.buildingId),
      floorId: String(data.floorId),
      roomTypeId: data.roomTypeId,
      roomName: data.roomName,
      roomCode: data.roomCode,
      numBeds: data.numBeds,
    });
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
    this.activeView = 'list'; 
    this.loadData();
    this.resetForm();
    this.updateURL();
  }
  resetForm(): void {
    this.selectedItemId = 0;
    this.roomForm.reset();
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
      bedNo: [
        { value: this.beds.at(index).get('bedNo')?.value, disabled: true },
      ],
      bedType: [this.beds.at(index).get('bedType')?.value, Validators.required],
      personName: [
        this.beds.at(index).get('personName')?.value,
        Validators.required,
      ],
      contactNo: [
        this.beds.at(index).get('contactNo')?.value,
        Validators.required,
      ],
      depositAmount: [this.beds.at(index).get('depositAmount')?.value],
      document: [this.beds.at(index).get('document')?.value],
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
      this.beds
        .at(this.selectedBedIndex)
        .patchValue(this.selectedBedForm.getRawValue());
    }
    this.closeModal();
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
