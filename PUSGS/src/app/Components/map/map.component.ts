import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import TileJSON from 'ol/source/TileJSON.js';
import ol from 'ol/layer/VectorImage';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let map = new Map({
      target: 'hotel_map',
      layers: [
         new TileLayer({
           source: new OSM()
         })
      ],
      view: new View({
        center: olProj.fromLonLat([7.0785, 51.4614]),
        zoom: 3
      })
    });

    let cc = new ol({
        source: new VectorSource({
        url:'./src/app/Components/map/mmap.geojson',
        format: new GeoJSON()
      }),
      visible: true,
      title: 'Srbija'
    })

    map.addLayer(cc);
  }
}
