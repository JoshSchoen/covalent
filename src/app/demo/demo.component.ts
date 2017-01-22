import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdDataTableService, TdLoadingService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { SalesPersonService } from '../../services';


@Component({
  selector: 'demo-dashboard',
  templateUrl: './demo.component.html',
  viewProviders: [ SalesPersonService ],
})
export class DemoComponent implements AfterViewInit {

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _salesPeople: SalesPersonService,
              private _monthlySales: SalesPersonService,
              private _dataTableService: TdDataTableService) {}

  clicked($event) : void {
    console.log($event);
  }
    columns: ITdDataTableColumn[] = [
      { name: 'picture', label: 'Photo'},
      { name: 'display_name', label: 'Name', tooltip: 'Stock Keeping Unit' },
      { name: 'title', label: 'Title'},
      { name: 'sales', label: 'Sales (US$)'},
      { name: 'email', label: 'Email' },
      { name: 'region', label: 'State' },
      { name: 'site_admin', label: 'Admin' },
    ];

  salesPeople: any[];
  jsonData: any[];


  table: any = [
    {
      "label": "jan",
      "sales": 431742.57,
      "margin": 0.28
    },
    {
      "label": "feb",
      "sales": 540164.33,
      "margin": 0.38
    },
    {
      "label": "mar",
      "sales": 625675.83,
      "margin": 0.07
    },
    {
      "label": "apr",
      "sales": 583686.79,
      "margin": 0.32
    },
    {
      "label": "may",
      "sales": 482767.13,
      "margin": 0.28
    },
    {
      "label": "jun",
      "sales": 466579.3,
      "margin": 0.09
    },
    {
      "label": "july",
      "sales": 414995.84,
      "margin": 0.23
    },
    {
      "label": "aug",
      "sales": 677844.25,
      "margin": 0.43
    },
    {
      "label": "sept",
      "sales": 504764.31,
      "margin": 0.08
    },
    {
      "label": "oct",
      "sales": 493825.46,
      "margin": 0.44
    },
    {
      "label": "nov",
      "sales": 616150.63,
      "margin": 0.33
    },
    {
      "label": "dec",
      "sales": 653582.86,
      "margin": 0.09
    }];


  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'sku';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

            sort(sortEvent: ITdDataTableSortChangeEvent): void {
              this.sortBy = sortEvent.name;
              this.sortOrder = sortEvent.order;
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

            getTotalMonthSales(salesPeople) {
              let sValues : any[];
              for (let total of salesPeople) {
                if (total.total_monthly_sales) {
                sValues = total.total_monthly_sales;
              }
            }
              return sValues
          }


    ngAfterViewInit(): void {

        this._titleService.setTitle( "Josh's Demo Dashboard" );

        this._loadingService.register('salesPerson.load');
        this._salesPeople.query().subscribe((salesPeople: any) => {
        this.salesPeople = salesPeople;
        this.filteredData = salesPeople;
        this.filteredTotal = salesPeople.length;

        this.filter();
        this.jsonData = this.getTotalMonthSales(salesPeople);

        setTimeout(() => {
          this._loadingService.resolve('salesPerson.load');
        }, 750);
      }, (error: Error) => {
        console.log(error);
      });


  }


}
