import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() location: string;

  isPositionError: boolean = false;
  lat: number;
  lng: number;
  
  constructor(private mapService: MapService,
              private changeDetectorRef: ChangeDetectorRef) { }

  mapReadyHandler() {

    this.mapService.getLocationCode(this.location).subscribe(
      //next function
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.changeDetectorRef.detectChanges();
      },
      //error function
      () => {
        this.isPositionError = true;
      }
    )
  }

}
