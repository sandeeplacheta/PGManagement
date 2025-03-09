import { HttpEventType } from '@angular/common/http';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, of } from 'rxjs';
import { FileHandlingService } from 'src/app/core/services/file-handling.service';
import { blobToBase64, createFileUrl } from '../../helpers/util-methods';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() formFields: any[] = [];
  @Input() buttonText: string = '';
  @Input() showBackButton: boolean = true;
  @Input() showSubmitButton: boolean = true;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Input() item: any;
  //form!: FormGroup;

  form: FormGroup = new FormGroup({});
  subsFileFileUrl: string | ArrayBuffer | null = null;
  //formFields: any[] = formFields;
  activeTabIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private fileService: FileHandlingService
  ) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.item) {
  //     console.log('item from shared componnt', this.item);
  //     this.form = this.fb.group(this.item);
  //   } else {
  //     this.form = this.fb.group({});
  //   }
  //   if (this.form) {
  //     this.setupFormControls();
  //   }
  // }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      // If item exists, set the form values for edit mode
      console.log('Editing item:', this.item);
      this.form = this.fb.group(this.item); // Populate the form with item values
    } else {
      // If no item, reset the form to empty values for add mode
      console.log('Adding new item');
      this.form.reset(); // Clear the form completely
      this.buildForm();  // Rebuild the form structure (empty/default values)
    }
  }
  
  getFieldPairs(fields: any[]): any[][] {
    const pairs = [];
    for (let i = 0; i < fields.length; i += 2) {
      pairs.push([fields[i], fields[i + 1] ? fields[i + 1] : null]);
    }
    return pairs;
  }
  ngOnInit() {
    if (this.item) {
      console.log('item from shared componnt1', this.item);
      this.form = this.fb.group(this.item);
    } else {
      this.form = this.fb.group({});
    }

    if (this.form) {
      this.setupFormControls();
      console.log('setup controls', this.setupFormControls());
    }
    this.buildForm();
  }

  // Function to build the form dynamically
  buildForm() {
    this.formFields.forEach((field: any) => {
        // Add each field to the form group
        this.form.addControl(
          field.name,
          new FormControl({ value: '', disabled: !field.editable })
        );
      // });
    });
  }

  // Function to handle tab change
  onTabChange(index: number) {
    this.activeTabIndex = index; // Track active tab
  }

  setupFormControls() {
    this.formFields.forEach((field: any) => {
        const validations = [];
        let defaultValue = '';
        if (field.required) {
          validations.push(Validators.required);
        }
        if (field.type === 'number') {
          validations.push(Validators.pattern('^[0-9]*$'));
        } else if (field.type === 'email') {
          validations.push(Validators.email);
        } else if (field.type === 'text' && field.minLength) {
          validations.push(Validators.minLength(field.minLength));
        } else if (field.type === 'text' && field.maxLength) {
          validations.push(Validators.maxLength(field.maxLength));
        } else if (field.type === 'date') {
          defaultValue = this.getCurrentDate();
        } else if (field.type === 'month-year-picker') {
          const current = new Date();
          defaultValue = `${current.getFullYear()}-${String(
            current.getMonth() + 1
          ).padStart(2, '0')}`;
        } else if (field.type === 'select') {
          defaultValue =
            field.options.find(
              (option: any) => option.value === field.defaultValue
            )?.label || '';
        }
        this.form.addControl(
          field.name,
          this.fb.control(defaultValue, validations)
        );
        if (field.conditionalFields) {
          this.form.get(field.name)?.valueChanges.subscribe((selectedValue) => {
            this.handleConditionalFields(
              selectedValue,
              field.conditionalFields
            );
          });
        }
      }
    // )
    );
  }

  handleConditionalFields(selectedValue: string, conditionalFields: any) {
    const fieldsToAdd = conditionalFields[selectedValue] || [];
    fieldsToAdd.forEach((conditionalField: any) => {
      const validations = [];
      if (conditionalField.required) {
        validations.push(Validators.required);
      }
      if (!this.form.contains(conditionalField.name)) {
        this.form.addControl(
          conditionalField.name,
          this.fb.control('', validations)
        );
      }
    });
  }

  getConditionalFields(field: any) {
    return field.conditionalFields
      ? field.conditionalFields[this.form.get(field.name)?.value] || []
      : [];
  }

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  onSubmit() {
    this.markAllFieldsAsTouched();
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      const formData = this.form.value;
      console.log(formData);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }
  onSelectChange(fieldName: string) {
    const selectedOptions = this.form.get(fieldName)?.value;
    if (selectedOptions.value) {
      if (Array.isArray(selectedOptions.value)) {
        const concatenatedIds = selectedOptions.value
          .map((option: any) => option.id)
          .join(',');
        this.form.get(fieldName)?.setValue(concatenatedIds);
      }else if(typeof selectedOptions.value === 'object'){
        this.form.get(fieldName)?.setValue(selectedOptions.value)
      }
      else{
        this.form.get(fieldName)?.setValue(selectedOptions.value)
      }
    }
  }

  selectedFile: File | null = null;
 triggerFileDownload(fileUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename;
    link.click();
  }
}
