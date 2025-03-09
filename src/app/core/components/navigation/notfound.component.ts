import { Component, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notfound.component.html',
  styleUrls: [ './navigation.component.scss'],
})
export class NotFoundComponent   {
  @Input() title = "Default Value"
  @Input() readonly = true
  route!: string;
  constructor(private router:Router, private activatedRoute: ActivatedRoute){
    this.route = this.activatedRoute.snapshot.url.join("*****")
  }

}


