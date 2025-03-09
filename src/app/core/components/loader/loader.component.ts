import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
// import { FilterdropdownService } from '../../services/filterdropdownservice.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
// import 'jspdf-autotable'; 
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() activeView: string = 'list';
  @Input() count!: number;
  @Input() title!: string;
  @Input() addNewLink!: string;
  @Input() basePath: string = '';
  @Input() SearchFields!: any[];
  // @Input() MonthlySearchFields!: any[];
  @Input() enableExport: boolean = false;
  @Input() enablePdfExport: boolean = false;
  @Input() exportableData: any[] = [];
  @Input() exportableColumns: any[] = [];
  @Input() enableCsvExport: boolean = false; // Add this property
  @Input() fileName: string = 'exported-data';
  @Output() toggleView: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() showAddButton: boolean = true;
  @Input() invoicewithoutso!: any;
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Input() filteredData: any[] = [];
  @Output() dateFilterChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() dateSelected = new EventEmitter<{ fieldName: string, date: string }>();
  @Output() valueSelected = new EventEmitter<{ fieldName: string, value: any }>();

  constructor() {}

  ngOnInit(): void {
    // Set up search subscription for faster response
    this.searchSubject.pipe(
      debounceTime(300), // Lower debounce for faster searching
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery.emit(query); // Emit search query
      this.onSearchQuery(query); // Filter items based on the query
    });
  }

  items: any[] = [];
  allItems: any[] = [];
  searchSubject: Subject<string> = new Subject();

  @Input() showSearch: boolean = true;
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSearchInputChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm); // Pass search term into the subject
  }

  onSearchQuery(searchTerm: string): void {
    if (!searchTerm) {
      this.items = [...this.allItems];
      this.count = this.items.length;
      this.searchQuery.emit(searchTerm); // Emit search term
      return;
    }

    this.items = this.allItems.filter(item =>
      Object.keys(item).some(key =>
        typeof item[key] === 'string' && item[key].toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    this.count = this.items.length;
    this.searchQuery.emit(searchTerm); // Emit search term
  }

  // onDropDownChange(event: any, field: any) {
  //   if (field.type === 'date') {
  //     this.srvc.onDropDownChange(event, field);
  //     // Emit date change event
  //     this.dateFilterChange.emit({
  //       name: field.name,
  //       value: event.target.value
  //     });
  //   } else {
  //     // Handle other dropdown changes
  //     this.srvc.onDropDownChange(event, field);
  //   }
  // }

  onDropDownChange(event: any, field: any) {
    if (field.type === 'date') {
      const selectedDate = event.target.value;
      this.dateSelected.emit({ fieldName: field.name, date: selectedDate });
    }
    else if (field.multpleselection === true) {
      const selectedValue = event ?? "";
      this.valueSelected.emit({ fieldName: field.name, value: selectedValue });
    } else {
      const selectedValue = event?.label ?? "";
      this.valueSelected.emit({ fieldName: field.name, value: selectedValue });
    }
  }
  navigateTo(view: string) {
    this.activeView = view;
    this.onToggleView(view);
  }

  onToggleView(view: string): void {
    this.toggleView.emit(view);
  }

  addNew(): void {
    this.addNewEvent.emit();
  }
  exportToExcel(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;

    if (!dataToExport || !this.exportableColumns || !Array.isArray(dataToExport) || !Array.isArray(this.exportableColumns)) {
      console.warn('Invalid export data or columns');
      return;
    }

    try {
      // Prepare data for export
      const exportData = dataToExport.map(item => {
        const row: any = {};
        this.exportableColumns.forEach(col => {
          if (!col || typeof col.field !== 'string') {
            return; // Skip invalid column definitions
          }

          try {
            let value = item[col.field];
            
            // Handle nested objects if field contains dots
            if (col.field && col.field.includes('.')) {
              value = col.field.split('.').reduce((obj: any, key: string) => {
                return obj && typeof obj === 'object' ? obj[key] : undefined;
              }, item);
            }

            // Use column label or header, fallback to field name
            const columnName = col.label || col.header || col.field;
            
            // Handle different value types
            if (value === null || value === undefined) {
              row[columnName] = '';
            } else if (typeof value === 'object') {
              row[columnName] = JSON.stringify(value);
            } else {
              row[columnName] = value;
            }
          } catch (err) {
            console.warn(`Error processing field ${col.field}:`, err);
            row[col.label || col.header || col.field] = '';
          }
        });
        return row;
      });

      // Create worksheet
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      
      // Add column widths
      const colWidths = this.exportableColumns.map(() => ({ wch: 20 }));
      ws['!cols'] = colWidths;

      // Create workbook and add worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      
      // Save file with timestamp to avoid duplicate names
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const finalFileName = `${this.fileName}-${timestamp}.xlsx`;
      
      XLSX.writeFile(wb, finalFileName);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  } 
  exportToPdf(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
    
    if (!dataToExport || !this.exportableColumns) {
      console.warn('Invalid export data or columns');
      return;
    }

    try {
      const doc = new jsPDF();
      
      // Prepare the data for PDF export
      const pdfData = dataToExport.map((item: any) => {
        return this.exportableColumns.map(col => {
          let value = item[col.field];
          
          // Handle nested objects if field contains dots
          if (col.field && col.field.includes('.')) {
            value = col.field.split('.').reduce((obj: any, key: string) => {
              return obj && typeof obj === 'object' ? obj[key] : undefined;
            }, item);
          }
          
          // Convert value to string and handle null/undefined
          return value != null ? String(value) : '';
        });
      });

      // Get headers for the PDF
      const headers = this.exportableColumns.map(col => col.label || col.header || col.field);

      // Add title to PDF
      doc.text(this.title || 'Export Data', 14, 15);

      // Add timestamp
      const timestamp = new Date().toLocaleString();
      doc.setFontSize(10);
      doc.text(`Generated on: ${timestamp}`, 14, 22);

      // Create the table
      (doc as any).autoTable({
        head: [headers],
        body: pdfData,
        startY: 25,
        margin: { top: 25 },
        styles: {
          overflow: 'linebreak',
          lineWidth: 0.2, // Thin border
          cellPadding: 1, // Add padding for readability
        },
        tableLineColor: [0, 0, 0], // Black border color
        tableLineWidth: 0.2, // Thin border width
      });
      

      // Save the PDF
      const timestamp2 = new Date().toISOString().replace(/[:.]/g, '-');
      doc.save(`${this.fileName}-${timestamp2}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  }
  exportToCsv(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
    
    if (!dataToExport || !this.exportableColumns) {
      console.warn('Invalid export data or columns');
      return;
    }

    try {
      // Prepare headers
      const headers = this.exportableColumns.map(col => col.label || col.header || col.field);
      
      // Prepare data rows
      const rows = dataToExport.map(item => {
        return this.exportableColumns.map(col => {
          let value = item[col.field];
          
          // Handle nested objects if field contains dots
          if (col.field && col.field.includes('.')) {
            value = col.field.split('.').reduce((obj: any, key: string) => {
              return obj && typeof obj === 'object' ? obj[key] : undefined;
            }, item);
          }
          
          // Convert value to string and handle null/undefined
          return value != null ? String(value).replace(/,/g, ';') : ''; // Replace commas with semicolons to avoid CSV conflicts
        });
      });

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n');

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      if (window.navigator && (navigator as any).msSaveBlob) { // Type assertion for legacy IE support
        (navigator as any).msSaveBlob(blob, `${this.fileName}-${timestamp}.csv`);
      } else {
        link.href = URL.createObjectURL(blob);
        link.download = `${this.fileName}-${timestamp}.csv`;
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    }
  }
  isExportDropdownOpen = false;
  toggleExportDropdown(): void {
    this.isExportDropdownOpen = !this.isExportDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isExportDropdownOpen = false;
    }
  }
}
