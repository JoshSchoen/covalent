import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
    title: 'Demo Dashboard',
    route: '/',
    icon: 'dashboard',
  }, {
    title: 'Dashboard',
    route: '/overview',
    icon: 'dashboard',
  }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },
  ];

  constructor(private _router: Router) {}
  firstname : String = 'Josh';
  lastname : String = 'Schoen';
  logout(): void {
    this._router.navigate(['/login']);
  }
}
