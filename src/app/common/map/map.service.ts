import { Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {
    private geoCoder;
    private locationCache: any = {};

    constructor(private camalizePipe: CamelizePipe) {}
    private cacheLocation(location: string, coordinates: any) {
        this.locationCache[this.camalizePipe.transform(location)] = coordinates;
    }
    private isLocationCached(location: string): boolean {
        return this.locationCache[this.camalizePipe.transform(location)];
    }

    private geoCodeLocation(location: string): Observable<any>{
        if (!this.geoCoder) {
            this.geoCoder = new (<any>window).google.maps.Geocoder();
        }      
        return new Observable((observer) => {
            this.geoCoder.geocode({address: location}, (result, status) => {
                if (status === 'OK') {
                    const geometry = result[0].geometry.location;
                    const coordinates = {lat:geometry.lat(), lng:geometry.lng()};
                    this.cacheLocation(location,coordinates);
                    observer.next(coordinates);
                } else  {
                    observer.error('Location could not be geocoded');
                }
            });      
       });   
    }

    public getLocationCode(location: string): Observable<any> {      
        if (this.isLocationCached(location)) {
            // return location coordinates from cache
            return of(this.locationCache[this.camalizePipe.transform(location)]);
        } else {
            // get location coordinates using geocode function
            return this.geoCodeLocation(location);
        }
    };
    
}