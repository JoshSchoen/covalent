import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalesPersonService {

  constructor(private _http: HttpInterceptorService) {}

  query(): any {
   return this._http.get('data/salesPerson.json')
   .map((res: Response) => {
     console.log(res);
     return res.json();
   });
  }
}
