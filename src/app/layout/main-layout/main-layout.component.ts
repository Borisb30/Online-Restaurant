import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  navItems!: { label: string, icon: string, url: string }[];
  activeLink: string | undefined;
  loadingFlag = true;
  constructor(
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.activeLink =  this.route.snapshot.firstChild?.routeConfig?.path;
    setTimeout(() => {
      this.loadingFlag = false;
    }, 1000)
    this.navItems = [
      { label: 'მთავარი გვერდი', icon: '', url: 'home' },
      { label: 'კალათა', icon: '', url: 'cart' },
    ]
  }
}
