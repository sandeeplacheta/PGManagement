import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { key: string; label: string; type?: string; action?: Function; actionlabel?: string }[] = [];
  @Input() addNewLink!: string;
  @Input() basePath: string = '';
  @Input() listActions: { name: string; action: Function; tooltip: string }[] =
    [];
  @Input() activeView: string = '';
  @Input() showActions: boolean = false;
  @Output() cardClick = new EventEmitter<any>();
  @Input() showCheckboxes = false;
  @Input() emitOnRowClick: boolean = true;
  @Input() itemsPerPage: number = 12;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  public paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.paginationConfig.itemsPerPage = this.itemsPerPage;
    this.paginationConfig.totalItems = this.data.length;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  navigateTo(view: string) {
    this.router.navigate([`/${this.basePath}${view}`]);
    this.activeView = view;
  }
  executeAction(action: Function, item: any) {
    action(item);
  }
  executeColumnAction(action: Function, item: any) {
    action(item);
  }
  onRowClick(itemId: any) { // Assuming the item has an 'id' property
    if (this.emitOnRowClick) {
      this.cardClick.emit(itemId);
    }
  }
  navigateToEdit(item: any) {
    this.cardClick.emit(item);
  }
  toggleAllCheckboxes(event: any) {
    const isChecked = event.target.checked;
    this.data.forEach(item => (item.selected = isChecked));
  }

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }


}
