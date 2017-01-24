import { Component, AfterViewInit, Input } from '@angular/core';
import { GoogleMap } from '../geo/geo.component';
import { Title }     from '@angular/platform-browser';

import { TdDataTableService, TdLoadingService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { SalesPersonService } from '../../services';


@Component({
  selector: 'demo-dashboard',
  templateUrl: './demo.component.html',
  viewProviders: [ SalesPersonService ]
})
export class DemoComponent implements AfterViewInit {
//@Input() changed: SalesPersonService;


  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _salesPeople: SalesPersonService,
              private _monthlySales: SalesPersonService,
              private _dataTableService: TdDataTableService) {}

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
  salesTable : number[];
  markersChange : Object[];
  singleSales : String = 'true;'
  changed(changedCharacter: any){
    if (changedCharacter) {
      console.log(this.singleSales);
      if (this.singleSales) {
        this.singleSales = null;
      }
      else {
        this.singleSales ='true';
      }

      //this.markersChange = changedCharacter.monthy_sales;
      console.log(changedCharacter);
      this.salesTable = null;
      this.table = null;
      this.salesTable = changedCharacter;

      //setTimeout(() => { this.selectedPane = v.id; }, 0);

    }
  }


table: any = [
    {
      "label": "jan",
      "margin": 0.28,
      "sales": 431742.57

    },
    {
      "label": "feb",
      "margin": 0.38,
      "sales": 540164.33

    },
    {
      "label": "mar",
      "margin": 0.07,
      "sales": 625675.83

    },
    {
      "label": "apr",
      "margin": 0.32,
      "sales": 583686.79

    },
    {
      "label": "may",
      "margin": 0.28,
      "sales": 482767.13

    },
    {
      "label": "jun",
      "margin": 0.09,
      "sales": 466579.3

    },
    {
      "label": "july",
      "margin": 0.23,
      "sales": 414995.84

    },
    {
      "label": "aug",
      "margin": 0.43,
      "sales": 677844.25
    },
    {
      "label": "sept",
      "margin": 0.08,
      "sales": 504764.31

    },
    {
      "label": "oct",
      "margin": 0.44,
      "sales": 493825.46

    },
    {
      "label": "nov",
      "margin": 0.33,
      "sales": 616150.63
    },
    {
      "label": "dec",
      "margin": 0.09,
      "sales": 653582.86
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
        console.log(this.table);
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
