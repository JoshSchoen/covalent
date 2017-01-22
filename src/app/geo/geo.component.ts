import { Component, AfterViewInit, NgModule } from '@angular/core';

import { Title }     from '@angular/platform-browser';
import { TdLoadingService } from '@covalent/core';
import { SalesPersonService } from '../../services';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';


@Component({
  selector: 'geo-pane',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})

export class GoogleMap {

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _salesPeople: SalesPersonService,) {
                console.log('sales');
              }

    // google maps zoom level
zoom: number = 4;
salesPeople: any[];
// initial center position for the map
title: string = "Sales by Location";
subtitle: string = "Regional Manager Comparisons";
lat: number = 38.242959;
lng: number = -98.269911;
markers: any[];
edited : boolean = false;
mark : String;

clickedMarker(label: string, index: number) {
   console.log(`clicked the marker: ${label || index}`);
   this.edited = true;
   this.mark = `clicked the marker: ${label}`;
   this.markers = null;
 }

 ngAfterViewInit(): void {

     this._titleService.setTitle( "Josh's Demo Dashboard" );

     this._loadingService.register('salesPerson.load');
     this._salesPeople.query().subscribe((salesPeople: any) => {
     this.salesPeople = salesPeople;
     this.markers = salesPeople;
     console.log(salesPeople);
     setTimeout(() => {
       this._loadingService.resolve('salesPerson.load');
     }, 750);
   }, (error: Error) => {
     console.log(error);
   });
}

}
