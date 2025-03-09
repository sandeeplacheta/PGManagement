import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadspinnerService } from '../../services/loadspinner.service';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent {
  isLoading = false;
  private subscription!: Subscription;

  constructor(private loaderService: LoadspinnerService) {}

  ngOnInit() {
    this.subscription = this.loaderService.isLoading$.subscribe(
      (loading: boolean) => {
        this.isLoading = loading;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
