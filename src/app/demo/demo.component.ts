import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdDataTableService, TdLoadingService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn  } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { SalesPersonService } from '../../services';

@Component({
  selector: 'demo-dashboard',
  templateUrl: './demo.component.html',
  viewProviders: [ SalesPersonService ],
})
export class DemoComponent implements AfterViewInit {

  clicked($event) : void {
    console.log($event);
  }

    columns: ITdDataTableColumn[] = [
      { name: 'display_name', label: 'Name', tooltip: 'Stock Keeping Unit' },
      { name: 'id', label: 'ID' },
      { name: 'sales', label: 'Sales (US$)'},
      { name: 'email', label: 'Email' },
      { name: 'region', label: 'Region' },
      { name: 'site_admin', label: 'Admin' },
    ];

  salesPeople: any[];

  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'sku';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _salesPeople: SalesPersonService,
              private _dataTableService: TdDataTableService) {}

            sort(sortEvent: ITdDataTableSortChangeEvent): void {
              this.sortBy = sortEvent.name;
              this.sortOrder = sortEvent.order;
              console.log(this);
              this.filter();
            }
            search(searchTerm: string): void {
              this.searchTerm = searchTerm;
              this.filter();
            }
            page(pagingEvent: IPageChangeEvent): void {
              this.fromRow = pagingEvent.fromRow;
              this.currentPage = pagingEvent.page;
              this.pageSize = pagingEvent.pageSize;
              this.filter();
            }
            filter(): void {
              let newData: any[] = this.salesPeople;
              newData = this._dataTableService.filterData(newData, this.searchTerm, true);
              this.filteredTotal = newData.length;
              newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
              newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
              this.filteredData = newData;
            }

    ngAfterViewInit(): void {

        this._titleService.setTitle( "Josh's Demo Dashboard" );

        this._loadingService.register('salesPerson.load');
        this._salesPeople.query().subscribe((salesPeople: any) => {
        this.salesPeople = salesPeople;
        this.filteredData = salesPeople;
        this.filteredTotal = salesPeople.length;
        console.log(salesPeople);
        this.filter();
        setTimeout(() => {
          this._loadingService.resolve('salesPerson.load');
        }, 750);
      }, (error: Error) => {
        console.log(error);
      });
  }


}
