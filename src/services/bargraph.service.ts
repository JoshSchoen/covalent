import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BargraphService {

  constructor(private _http: HttpInterceptorService) {}

  query(): any {
   return this._http.get('data/bargraph.json')
   .map((res: Response) => {
     return res.json();
   });
  }
}
