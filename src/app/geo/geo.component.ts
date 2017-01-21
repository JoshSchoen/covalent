import { Component, AfterViewInit, NgModule } from '@angular/core';

import { Title }     from '@angular/platform-browser';
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

    // google maps zoom level
zoom: number = 8;

// initial center position for the map
title: string = "Sales by Location";
subtitle: string = "Regional Manager Comparisons";
lat: number = 51.678418;
lng: number = 7.809007;

markers: any[] = [
  {
    lat: 51.673858,
    lng: 7.815982,
    label: 'B',
    content: 'This is content b',
    draggable: true
  },
  {
    lat: 51.373858,
    lng: 7.215982,
    label: 'C',
    content: 'This is content c',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'A',
    content: 'This is content a',
    draggable: true
  }
]


clickedMarker(label: string, index: number) {
   console.log(`clicked the marker: ${label || index}`);
   //this.edited = true;
   //this.mark = `clicked the marker: ${label}`;

 }

  ngAfterViewInit(): void {

  }

}
