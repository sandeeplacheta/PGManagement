import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messagealert',
  templateUrl: './messagealert.component.html',
  styleUrls: ['./messagealert.component.scss']
})
export class MessagealertComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'update' | 'delete' | 'warning' = 'success';
  @Input() show: boolean = false;
  @Input() title?: string;  // Added title as optional input
  @Output() closed = new EventEmitter<void>();
  @Input() confirmMode: boolean = false; // New input to switch to confirmation mode
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.show) {
      setTimeout(() => this.close(), 3000);
    }
  }

 close() {
  this.show = false;
  this.closed.emit();
}


  get typeClass() {
    switch (this.type) {
      case 'success': return 'border-start border-5 border-success';
      case 'error': return 'border-start border-5 border-danger';
      case 'update': return 'border-start border-5 border-info';
      case 'delete': return 'border-start border-5 border-warning';
      default: return 'border-start border-5 border-secondary';
    }
  }

  get iconClass() {
    switch (this.type) {
      case 'success': return 'bi bi-check-circle-fill text-success';
      case 'error': return 'bi bi-x-circle-fill text-danger';
      case 'update': return 'bi bi-info-circle-fill text-info';
      case 'delete': return 'bi bi-exclamation-triangle-fill text-warning';
      default: return 'bi bi-bell-fill text-secondary';
    }
  }

  get titleText() {
    return this.title || this.type.charAt(0).toUpperCase() + this.type.slice(1); // Use dynamic title or fallback to type
  }

  onConfirm() {
    this.show = false;
    this.confirmed.emit();
  }
  
  onCancel() {
    this.show = false;
    this.cancelled.emit();
  }
  
}
