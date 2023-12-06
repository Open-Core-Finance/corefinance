import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActionMenuItem, LanguageMenuItem, MenuGroup, MenuItem } from '../classes/Menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.sass']
})
export class LeftMenuComponent implements OnInit, OnDestroy {

  @Input()
  menuGroups: MenuGroup[] = [];
  @Output() menuClosedEmitter = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  menuItemClicked(menuItem: MenuItem) {
    if (!menuItem.activated) {
      return;
    }
    const urlToNavigate = "/" + menuItem.activateUrl;
    const sameUrl = this.isSameUrl(menuItem);
    if (!sameUrl) {
      this.router.navigateByUrl(urlToNavigate);
      this.toggleMenu();
    }
  }

  isSameUrl(menuItem: MenuItem) {
    if (this.isActionItem(menuItem)) {
      return false;
    }
    const currentUrl = this.router.url;
    const urlToNavigate = "/" + menuItem.activateUrl;
    return currentUrl === urlToNavigate;
  }

  toggleMenu() {
    if (this.menuClosedEmitter) {
      this.menuClosedEmitter.emit();
    }
  }

  ngOnDestroy() { }

  isActionItem(menuItem: MenuItem): boolean {
    return (menuItem instanceof ActionMenuItem);
  }

  isLanuageItem(menuItem: MenuItem): boolean {
    return (menuItem instanceof LanguageMenuItem);
  }

  callMenuAction(menuItem: MenuItem) {
    if (menuItem instanceof ActionMenuItem) {
      if (menuItem.action) {
        menuItem.action(menuItem);
      }
      this.toggleMenu();
    }
  }
}
