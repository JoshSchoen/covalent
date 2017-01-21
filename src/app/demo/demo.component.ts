import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdLoadingService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn  } from '@covalent/core';

import { SalesPersonService } from '../../services';

@Component({
  selector: 'demo-dashboard',
  templateUrl: './demo.component.html',
  viewProviders: [ SalesPersonService ],
})
export class DemoComponent implements AfterViewInit {

  salesPerson: any;

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _salesPerson: SalesPersonService,) {
  }

    ngAfterViewInit(): void {
      this._titleService.setTitle( "Josh's Demo Dashboard" );

      this._loadingService.register('salesPerson.load');
      this._salesPerson.query().subscribe((salesPerson: any) => {
        this.salesPerson = salesPerson;
        console.log(salesPerson);

        setTimeout(() => {
          this._loadingService.resolve('salesPerson.load');
        }, 750);
      }, (error: Error) => {
        console.log(error);
      });
  }


}
