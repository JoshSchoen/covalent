import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Title }     from '@angular/platform-browser';
import { TdLoadingService } from '@covalent/core';
import { SalesPersonService } from '../../services';

import {
  AgmCoreModule
} from 'angular2-google-maps/core';


@Component({
  selector: 'geo-pane',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})

export class GoogleMap {

  constructor(private _titleService: Title,
    private _loadingService: TdLoadingService,
    private _salesPeople: SalesPersonService,) {
              }

// google maps zoom level
zoom: number = 4;
salesPeople: any[];
//sets changed to emit to parent component
@Output() changed : EventEmitter<any> = new EventEmitter();

// initial center position for the map
title: string = "Sales by Location";
subtitle: string = "Regional Manager Comparisons";
lat: number = 38.242959;
lng: number = -98.269911;
markers: any[];
edited : boolean = false;
mark : String;
selected: any[];

//triggers chart chart change and dialog
clickedMarker(salesPeople: any) {
   this.edited = true;
   this.selected = salesPeople;
    //emits hange to parent component intialize swap of the bar chart
   this.changed.emit(salesPeople);
 }

 ngAfterViewInit(): void {

     this._titleService.setTitle( "Josh's Demo Dashboard" );

     this._loadingService.register('salesPerson.load');
     this._salesPeople.query().subscribe((salesPeople: any) => {
     this.salesPeople = salesPeople;
     this.markers = salesPeople;
     setTimeout(() => {
       this._loadingService.resolve('salesPerson.load');
     }, 750);
   }, (error: Error) => {
     console.log(error);
   });
}

}
