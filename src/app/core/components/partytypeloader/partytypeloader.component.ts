
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FilterdropdownService } from '../../services/filterdropdownservice.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'; // Add this import
import 'jspdf-autotable'; // Add this import
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-partytypeloader',
  templateUrl: './partytypeloader.component.html',
  styleUrls: ['./partytypeloader.component.scss']
})
export class PartytypeloaderComponent implements OnInit {
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
  @Output() valueSelected = new EventEmitter<{ fieldName: string, value: any,isActiveField:boolean }>();
  @Output() exportExcel: EventEmitter<void> = new EventEmitter<void>();
  @Output() exportPdf: EventEmitter<void> = new EventEmitter<void>();
  @Output() exportCsv: EventEmitter<void> = new EventEmitter<void>();
  @Input() exportOptions = { excel: false, pdf: false, csv: false };
  @Input() showSearch: boolean = true;
  @Input() showCount: boolean = true;
  @Input() showTitle: boolean = true;
  @Input() titleColor: string = 'black'; // Default color
  @Input() showListGridToggle: boolean = true;
  @Input() headingType: 'h3' | 'h6' = 'h6';
  @Input() exportMessage: string = 'The selected date range is more than 6 months. Do you wish to download the data?';
  filteredFields: any[] = [];
  constructor(private srvc: FilterdropdownService) {}

  ngOnInit(): void {
    this.filterFieldsByPartyType();
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

  // @Input() showSearch: boolean = true;
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
      this.valueSelected.emit({ fieldName: field.name, value: selectedValue, isActiveField: true });
    } else {
      const selectedValue = event?.value ?? "";
      // this.valueSelected.emit({ fieldName: field.name, value: selectedValue });
      this.valueSelected.emit({ fieldName: field.name, value: selectedValue, isActiveField: true });

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
  // exportToExcel(): void {
  //   const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;

  //   if (!dataToExport || !this.exportableColumns || !Array.isArray(dataToExport) || !Array.isArray(this.exportableColumns)) {
  //     console.warn('Invalid export data or columns');
  //     return;
  //   }

  //   try {
  //     // Prepare data for export
  //     const exportData = dataToExport.map(item => {
  //       const row: any = {};
  //       this.exportableColumns.forEach(col => {
  //         if (!col || typeof col.field !== 'string') {
  //           return; // Skip invalid column definitions
  //         }

  //         try {
  //           let value = item[col.field];
            
  //           // Handle nested objects if field contains dots
  //           if (col.field && col.field.includes('.')) {
  //             value = col.field.split('.').reduce((obj: any, key: string) => {
  //               return obj && typeof obj === 'object' ? obj[key] : undefined;
  //             }, item);
  //           }

  //           // Use column label or header, fallback to field name
  //           const columnName = col.label || col.header || col.field;
            
  //           // Handle different value types
  //           if (value === null || value === undefined) {
  //             row[columnName] = '';
  //           } else if (typeof value === 'object') {
  //             row[columnName] = JSON.stringify(value);
  //           } else {
  //             row[columnName] = value;
  //           }
  //         } catch (err) {
  //           console.warn(`Error processing field ${col.field}:`, err);
  //           row[col.label || col.header || col.field] = '';
  //         }
  //       });
  //       return row;
  //     });

  //     // Create worksheet
  //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      
  //     // Add column widths
  //     const colWidths = this.exportableColumns.map(() => ({ wch: 20 }));
  //     ws['!cols'] = colWidths;

  //     // Create workbook and add worksheet
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Data');
      
  //     // Save file with timestamp to avoid duplicate names
  //     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  //     const finalFileName = `${this.fileName}-${timestamp}.xlsx`;
      
  //     XLSX.writeFile(wb, finalFileName);
  //   } catch (error) {
  //     console.error('Error exporting to Excel:', error);
  //   }
  // } 
  // its working serial no. is not there
  // exportToPdf(): void {
  //   const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
    
  //   if (!dataToExport || !this.exportableColumns) {
  //     console.warn('Invalid export data or columns');
  //     return;
  //   }

  //   try {
  //     const doc = new jsPDF();
      
  //     // Prepare the data for PDF export
  //     const pdfData = dataToExport.map((item: any) => {
  //       return this.exportableColumns.map(col => {
  //         let value = item[col.field];
          
  //         // Handle nested objects if field contains dots
  //         if (col.field && col.field.includes('.')) {
  //           value = col.field.split('.').reduce((obj: any, key: string) => {
  //             return obj && typeof obj === 'object' ? obj[key] : undefined;
  //           }, item);
  //         }
          
  //         // Convert value to string and handle null/undefined
  //         return value != null ? String(value) : '';
  //       });
  //     });

  //     // Get headers for the PDF
  //     const headers = this.exportableColumns.map(col => col.label || col.header || col.field);

  //     // Add title to PDF
  //     doc.text(this.title || 'Export Data', 14, 15);

  //     // Add timestamp
  //     const timestamp = new Date().toLocaleString();
  //     doc.setFontSize(10);
  //     doc.text(`Generated on: ${timestamp}`, 14, 22);

  //     // Create the table
  //     (doc as any).autoTable({
  //       head: [headers],
  //       body: pdfData,
  //       startY: 25,
  //       margin: { top: 25 },
  //       styles: {
  //         overflow: 'linebreak',
  //         lineWidth: 0.2, // Thin border
  //         cellPadding: 1, // Add padding for readability
  //       },
  //       tableLineColor: [0, 0, 0], // Black border color
  //       tableLineWidth: 0.2, // Thin border width
  //     });
      

  //     // Save the PDF
  //     const timestamp2 = new Date().toISOString().replace(/[:.]/g, '-');
  //     doc.save(`${this.fileName}-${timestamp2}.pdf`);
  //   } catch (error) {
  //     console.error('Error exporting to PDF:', error);
  //   }
  // }

  exportToPdf(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
    
    if (!dataToExport || !this.exportableColumns) {
      console.warn('Invalid export data or columns');
      return;
    }
  
    try {
      const doc = new jsPDF({
        orientation: 'landscape', // Landscape mode for better table fitting
        unit: 'mm',
        format: 'a4' // A4 page size
      });
  
      // Prepare the data for PDF export with Serial Number
      const pdfData = dataToExport.map((item: any, index: number) => {
        return [
          index + 1, // Serial Number
          ...this.exportableColumns.map(col => {
            let value = item[col.field];
  
            // Handle nested objects if field contains dots
            if (col.field && col.field.includes('.')) {
              value = col.field.split('.').reduce((obj: any, key: string) => {
                return obj && typeof obj === 'object' ? obj[key] : undefined;
              }, item);
            }
            
            // Convert value to string and handle null/undefined
            return value != null ? String(value) : '';
          })
        ];
      });
  
      // Add "Sl No." as the first column in the headers
      const headers = ['Sl No.', ...this.exportableColumns.map(col => col.label || col.header || col.field)];
  
      // Add title to PDF
      doc.setFontSize(14);
      doc.text(this.title || 'Export Data', 14, 15);
  
      // Add timestamp
      const timestamp = new Date().toLocaleString();
      doc.setFontSize(10);
      doc.text(`Generated on: ${timestamp}`, 14, 22);
  
      // Create the table with auto-adjusted columns
      (doc as any).autoTable({
        head: [headers],
        body: pdfData,
        startY: 30, // Adjusted to prevent overlapping with title
        theme: 'grid', // Better visibility of table
        styles: {
          fontSize: 8, // Adjust font size for better fitting
          cellPadding: 2,
          overflow: 'linebreak',
        },
        headStyles: {
          fillColor: [3, 142, 220], // Exact extracted color
          textColor: 255, // White text for contrast
          fontStyle: 'bold',
          lineColor: [3, 142, 220], // Match header border with header fill
          lineWidth: 0.5, // Slightly thicker header border
        },        
        columnStyles: {
          0: { cellWidth: 10 }, // Serial Number column width
        },
        margin: { top: 25, left: 10, right: 10 },
        didDrawPage: function () {
          doc.setFontSize(8);
          const pageCount = doc.getNumberOfPages(); // Correct way to get page count
          doc.text(`Page ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10); // Positioning page number at bottom-right
        }
      });
  
      // Save the PDF
      const timestamp2 = new Date().toISOString().replace(/[:.]/g, '-');
      doc.save(`${this.fileName}-${timestamp2}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  }
  exportToExcel(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
  
    if (!dataToExport || !this.exportableColumns || !Array.isArray(dataToExport) || !Array.isArray(this.exportableColumns)) {
      console.warn('Invalid export data or columns');
      return;
    }
  
    try {
      // Prepare data for export with Sl. No.
      const exportData = dataToExport.map((item, index) => {
        const row: any = { 'Sl. No.': index + 1 }; // Add Sl. No. column
  
        this.exportableColumns.forEach(col => {
          if (!col || typeof col.field !== 'string') return; // Skip invalid column definitions
  
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
      const colWidths = [{ wch: 10 }, ...this.exportableColumns.map(() => ({ wch: 20 }))]; // Sl. No. column width
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
  
  exportToCsv(): void {
    const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
  
    if (!dataToExport || !this.exportableColumns) {
      console.warn('Invalid export data or columns');
      return;
    }
  
    try {
      // Add Sl. No. to headers
      const headers = ['Sl. No.', ...this.exportableColumns.map(col => col.label || col.header || col.field)];
  
      // Prepare data rows with Sl. No.
      const rows = dataToExport.map((item, index) => {
        return [
          index + 1, // Sl. No.
          ...this.exportableColumns.map(col => {
            let value = item[col.field];
  
            // Handle nested objects if field contains dots
            if (col.field && col.field.includes('.')) {
              value = col.field.split('.').reduce((obj: any, key: string) => {
                return obj && typeof obj === 'object' ? obj[key] : undefined;
              }, item);
            }
  
            // Convert value to string and handle null/undefined
            return value != null ? String(value).replace(/,/g, ';') : ''; // Replace commas to avoid CSV conflicts
          })
        ];
      });
  
      // Combine headers and rows
      const csvContent = [
        headers.join(','), 
        ...rows.map(row => row.join(','))
      ].join('\n');
  
      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
      if (window.navigator && (navigator as any).msSaveBlob) { // IE compatibility
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
  
  
// adding sl in export options
  // exportToCsv(): void {
  //   const dataToExport = this.filteredData.length > 0 ? this.filteredData : this.exportableData;
    
  //   if (!dataToExport || !this.exportableColumns) {
  //     console.warn('Invalid export data or columns');
  //     return;
  //   }

  //   try {
  //     // Prepare headers
  //     const headers = this.exportableColumns.map(col => col.label || col.header || col.field);
      
  //     // Prepare data rows
  //     const rows = dataToExport.map(item => {
  //       return this.exportableColumns.map(col => {
  //         let value = item[col.field];
          
  //         // Handle nested objects if field contains dots
  //         if (col.field && col.field.includes('.')) {
  //           value = col.field.split('.').reduce((obj: any, key: string) => {
  //             return obj && typeof obj === 'object' ? obj[key] : undefined;
  //           }, item);
  //         }
          
  //         // Convert value to string and handle null/undefined
  //         return value != null ? String(value).replace(/,/g, ';') : ''; // Replace commas with semicolons to avoid CSV conflicts
  //       });
  //     });

  //     // Combine headers and rows
  //     const csvContent = [
  //       headers.join(','),
  //       ...rows.map(row => row.join(','))
  //     ].join('\n');

  //     // Create and download the file
  //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //     const link = document.createElement('a');
  //     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
  //     if (window.navigator && (navigator as any).msSaveBlob) { // Type assertion for legacy IE support
  //       (navigator as any).msSaveBlob(blob, `${this.fileName}-${timestamp}.csv`);
  //     } else {
  //       link.href = URL.createObjectURL(blob);
  //       link.download = `${this.fileName}-${timestamp}.csv`;
  //       link.style.visibility = 'hidden';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   } catch (error) {
  //     console.error('Error exporting to CSV:', error);
  //   }
  // }
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



  filterFieldsByPartyType() {
    if (this.SearchFields){
    const storedPartyType = localStorage.getItem("partyType");
    let partyTypeArray: string[] = [];
  
    if (storedPartyType) {
      try {
        if (storedPartyType.startsWith("[") && storedPartyType.endsWith("]")) {
          partyTypeArray = JSON.parse(storedPartyType); 
        } else {
          partyTypeArray = [storedPartyType]; 
        }
      } catch (error) {
        console.error("Invalid partytype data in localStorage", error);
      }
    }
  
    console.log("Filtered Party Types: ", partyTypeArray); 
  
    if (partyTypeArray.length > 0 ) {
      this.filteredFields = this.SearchFields.filter(
        (field) =>
          !field.partytype || 
          field.partytype.length === 0 || 
          field.partytype.some((type: string) => partyTypeArray.includes(type)) 
      );
    } else {
      this.filteredFields = [...this.SearchFields]; 
    }
    this.filteredFields = this.filteredFields.filter(field => Object.keys(field).length > 0);

    console.log("Filtered Party Types: ", this.filteredFields); // Debugging
  }
  }
  
  
  openExportModal() {
    const modal = document.getElementById('exportModal');
    if (modal) {
      new bootstrap.Modal(modal).show();
    }
  }
  onDownload() {
    if (this.exportOptions.excel) {
      this.exportExcel.emit();
    }
    if (this.exportOptions.pdf) {
      this.exportPdf.emit();
    }
    if (this.exportOptions.csv) {
      this.exportCsv.emit();
    }
  }

}
