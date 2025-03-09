import { Component, Input, ElementRef, OnInit  } from '@angular/core';

@Component({
  template: ``

})
export abstract class AbstractGenericPreviewComponent{
  abstract message: string;
  abstract data: any; // Add this line to accept data
  constructor(private elementRef: ElementRef) {
    console.log(elementRef)
    console.log("Hello")
  }
  ngOnInit(): void {
    console.log("OnInit")
  }


  close() {
    // Implement your modal close logic here
  }
  printModal() {
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-body').innerHTML;
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow?.document.write('<html><head><title>Print Modal</title></head><body>');
    printWindow?.document.write(modalContent);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  }

}