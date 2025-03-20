import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() title: string = 'Table Title';
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() showCheckboxes: boolean = false;
  @Input() showActions: boolean = false;
  @Input() itemsPerPage: number = 5;
  
  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() addNewClicked = new EventEmitter<void>();

  searchQuery: string = '';
  filteredData: any[] = [];
  currentPage: number = 1;
  sortedColumn: string = '';
  isAscending: boolean = true;
  isListView: boolean = true; // Toggle between list and grid view

  ngOnInit() {
    this.filteredData = [...this.data]; // Initialize filteredData
  }

  onSort(column: string) {
    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.filteredData.sort((a, b) => {
      const valA = a[column]?.toString().toLowerCase() || '';
      const valB = b[column]?.toString().toLowerCase() || '';

      return this.isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  onActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  onSearchChange() {
    this.filteredData = this.data.filter(item =>
      Object.values(item).some(val =>
        val?.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  toggleView() {
    this.isListView = !this.isListView;
  }

  onAddNew() {
    this.addNewClicked.emit();
  }
}
