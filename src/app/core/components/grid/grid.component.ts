import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnChanges {
  @Input() addNewLink!: string;
  @Input() items!: any[];
  @Input() fields: { label: string; key: string }[] = [];
  @Input() activeView: string = '';
  @Input() basePath: string = '';
  @Input() gridActions: {
    action: Function;
    classname: string;
    tooltip: string;
  }[] = [];
  @Output() cardClick = new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnChanges(): void {}

  ngOnInit() {}

  navigateTo(view: string) {
    this.router.navigate([`/${this.basePath}${view}`]);
    this.activeView = view;
  }
  onCardClick(item: any) {
    this.cardClick.emit(item);
  }
  executeAction(action: Function, item: any) {
    action(item);
  }
}
