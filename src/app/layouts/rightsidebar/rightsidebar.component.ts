import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/services/event.service';
import {
  LAYOUT_MODE,
  LAYOUT_WIDTH,
  TOPBAR,
  SIDEBAR_SIZE,
  SIDEBAR_COLOR,
  LAYOUT_POSITION,
} from '../layouts.model';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})

/**
 * Right-sidebar component
 */
export class RightsidebarComponent implements OnInit {

  layout: any;
  mode: string | undefined;
  width: string | undefined;
  position: string | undefined;
  topbar: string | undefined;
  sidebarcolor: string | undefined;
  sidebarsize: string | undefined;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.mode = LAYOUT_MODE;
    this.width = LAYOUT_WIDTH;
    this.topbar = TOPBAR;
    this.sidebarcolor = SIDEBAR_COLOR;
    this.sidebarsize = SIDEBAR_SIZE;
    this.position = LAYOUT_POSITION;

    /**
     * horizontal-vertical layput set
     */
     this.layout = document.body.getAttribute('data-layout');
     const vertical = document.getElementById('is-layout');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (this.layout == 'horizontal') {
       vertical?.removeAttribute('checked');
     }
    //this.applyThemeColor(this.selectedThemeColor);
  }
  

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  /**
   * Change the Mode onclick
   * @param mode Change the layout
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);
  }

  /**
   * Change the Width onclick
   * @param Width Change the layout
   */
  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
  }

  /**
   * Change the Position onclick
   * @param Position Change the layout
   */
  changePosition(scrollable: string) {
    this.position = scrollable;
    this.eventService.broadcast('changePosition', scrollable);
  }

  /**
   * Change the Topbar onclick
   * @param topbar Change the layout
   */
  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
  }

  /**
   * Change the Sidebar Size onclick
   * @param Sidebar Size Change the layout
   */
  changeSidebarSize(sidebarsize: string) {
    this.sidebarsize = sidebarsize;
    this.eventService.broadcast('changeSidebarSize', sidebarsize);
  }

  /**
   * Change the Sidebar Color onclick
   * @param Sidebar Color Change the layout
   */
  changeSidebarColor(sidebarcolor: string) {
    this.sidebarcolor = sidebarcolor;
    this.eventService.broadcast('changeSidebarColor', sidebarcolor);
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: any) {
    if (layout.target.checked == true)
      this.eventService.broadcast('changeLayout', 'vertical');
    else this.eventService.broadcast('changeLayout', 'horizontal');
  }

  // Declare in your component
  // themeColors: string[] = [
  //   '#00a1ff',
  //   '#0074ba',
  //   '#763ebd',
  //   '#0a7ea4',
  //   '#01c0c8',
  //   '#fa896b',
  //   '#20c59b',
  //   '#c52083',
  //   '#763ebd',
  //   '#3bafda',
  //   'linear-gradient(135deg, rgba(3, 142, 220, 1), rgba(191, 90, 242, 0.8))'
  // ];
  // selectedThemeColor: string = localStorage.getItem('themeColor') || '#00a1ff';

  changeThemeColor(color: string) {
    // this.selectedThemeColor = color;
    // localStorage.setItem('themeColor', color);
    //this.applyThemeColor(color);
  }

//   applyThemeColor(color: string) {
//   document.documentElement.style.setProperty('--theme-primary', color);
//   const rgb = this.hexToRgb(color);
//   if (rgb) {
//     document.documentElement.style.setProperty('--theme-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
//   }
// }

// applyThemeColor(color: string) {
//   const isGradient = color.startsWith('linear-gradient');

//   // Always set --theme-primary (whether gradient or solid)
//   document.documentElement.style.setProperty('--theme-primary', color);

//   if (isGradient) {
//     // Skip RGB parsing, since it's not a hex color
//     document.documentElement.style.removeProperty('--theme-primary-rgb');
//   } else {
//     // Try to extract RGB for shadows, borders, etc.
//     const rgb = this.hexToRgb(color);
//     if (rgb) {
//       document.documentElement.style.setProperty('--theme-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
//     } else {
//       document.documentElement.style.removeProperty('--theme-primary-rgb');
//     }
//   }

//   // Optional: Apply gradient directly to themed elements
//   const themedElements = document.querySelectorAll('.themed-bg');
//   themedElements.forEach((el) => {
//     (el as HTMLElement).style.background = color;
//   });
// }
//  hexToRgb(hex: string): { r: number, g: number, b: number } | null {
//   const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
//   return match ? {
//     r: parseInt(match[1], 16),
//     g: parseInt(match[2], 16),
//     b: parseInt(match[3], 16)
//   } : null;
// }

}
