import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';

@Injectable()
export class SalesPersonService {
  constructor(private _http: HttpInterceptorService) { }

  query(): any {
    return this._http.get('data/salesPerson.json')
      .map((res: Response) => {
        return res.json();
      });

  }
}
