import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string = 'Josh';
  password: string = 'Schoen';

  constructor(private _router: Router,
              private _loadingService: TdLoadingService) {}

  login(): void {
    this._loadingService.register('main');
    alert('Mock log in as ' + this.username);
    setTimeout(() => {
      this._router.navigate(['/']);
      this._loadingService.resolve('main');
    }, 2000);
  }
}
