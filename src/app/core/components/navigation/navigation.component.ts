import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() title: string = 'No Title';
  currentRoute: string = 'no idea';

  redirectionHistory: {value:string,class:string}[] = [];
  links =    [ "/sales/salseorderview",
    "/sales/salseinvoice",
    "/sales/salseorderview/form", 
    "/sales/salseinvoice/form",
    "/sales/salseorderview/list", 
    "/sales/salseinvoice/list",
    "sales/salseorderview/list", 
    "sales/salseinvoice/list",
    "sales/salseorderview/form", 
    "sales/salseinvoice/form",
    "salseorderview",
    "salseinvoice",
    "salseorderview/form", 
    "salseinvoice/form",
    "salseorderview/list", 
    "salseinvoice/list",
    "../salseorderview",
    "../salseinvoice",
    "../salseorderview/form", 
    "../salseinvoice/form",
    "../salseorderview/list", 
    "../salseinvoice/list",

    "../../salseorderview",
    "../../salseinvoice",
    "../../salseorderview/form", 
    "../../salseinvoice/form",
    "../../salseorderview/list", 
    "../../salseinvoice/list",

    "../.././",
    "../.././form", 
    "../../../form",
    "../../../list", 
    "../../../list",
    "form" , "grid" , "list", "../list" , "../form" ]
  constructor(private router: Router,private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {

    // Subscribe to router events to capture mid-redirect events
    this.router.events.subscribe(event => {
      console.log(this.router.config)
      if (event instanceof NavigationStart) {
        this.logEvent(`NavigationStart ${this.title} routing events : ${event.url}`,"start");
      } else if (event instanceof RoutesRecognized) {
        this.logEvent(`RoutesRecognized ${this.title} routing events : ${event.url}`, "recognized");
      } else if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;  // Update current route
        this.logEvent(`NavigationEnd ${this.title} routing events : ${event.url}`,"end");
      } else if (event instanceof NavigationCancel) {
        this.logEvent(`NavigationCancel ${this.title} routing events : ${event.url}`,"cancel");
      } else if (event instanceof NavigationError) {
        console.log("navigation error", event)
        this.logEvent(`NavigationError ${this.title} routing events : ${event.url}`, "red");
      }
      this.activatedRoute.url.subscribe((route) => {
        this.currentRoute =  route.map(segment => segment.path).join('/');
      });
    });
  }

  navigate(link:string[]){
    console.log(this.router.config)
    this.router.navigate(link);
  }

  private logEvent(message: string ,cat: string): void {
  
    this.redirectionHistory.push({value:message, class: cat});

    // Optional: Limit the redirection history size to last 10 entries
    if (this.redirectionHistory.length > 10) {
      this.redirectionHistory.shift();  // Remove the oldest event if the list exceeds 10
    }
  }
}
