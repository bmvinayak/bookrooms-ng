import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of as observableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import tt from '@tomtom-international/web-sdk-maps';

import { config } from 'src/config';

interface TomtomResponse {
	summary: { [key: string]: any };
	results: { [key: string]: any }[];
}

interface GeoPosition {
	lat: number;
	lon: number;
}

@Injectable({
	providedIn: 'root'
})
export class MapService {

	private locationCache: { [key: string]: GeoPosition } = {};


	constructor(private http: HttpClient) { }

	getGeoPosition(location: string, apiKey: string): Observable<GeoPosition> {
		const cachedLocation = this.getCachedLocation(location);
		return cachedLocation ? observableOf(cachedLocation) :
			this.requestGoePosition(location, apiKey);
	}

	private requestGoePosition(location: string, apiKey: string): Observable<GeoPosition> {
		return this.http
			.get(`${config.TOMTOM_MAP_URL}${location}.JSON?key=${apiKey}`)
			.pipe(
				map((ttresponse: TomtomResponse) => {
					const results = ttresponse.results;
					if (results && results.length > 0) {
						const position = results[0].position;
						this.cacheLocation(location, position);
						return position;
					}
					throw this.locationError;
				}), catchError(_ => throwError(this.locationError)));
	}


	createMap(options) {
		return tt.map({
			key: options.apiKey,
			container: 'bwm-map',
			zoom: 14,
			scrollZoom: false
		});
	}

	initMap(currentMap: any, position: GeoPosition) {
		this.centerMap(currentMap, position);
		this.addMarkerToMap(currentMap, position);
	}

	centerMap(currentMap: any, position: GeoPosition) {
		currentMap.setCenter(new tt.LngLat(position.lon, position.lat));
	}

	addMarkerToMap(currentMap: any, position: GeoPosition) {
		this.removePreviousMarkers();
		const markerDiv = document.createElement('div');
		markerDiv.className = 'bwm-marker';

		new tt.Marker({
			element: markerDiv
		})
			.setLngLat([position.lon, position.lat])
			.addTo(currentMap);
	}

	addPopopToMap(currentMap: any, message: string) {
		this.removePreviousPopups();
		new tt.Popup({ className: 'bwm-popup', closeButton: false, closeOnClick: false })
			.setLngLat(new tt.LngLat(0, 0))
			.setHTML(`<p>${message}</p>`)
			.addTo(currentMap);
	}

	private cacheLocation(location: string, position: GeoPosition) {
		const locationkey = this.normalizeLocation(location);
		this.locationCache[locationkey] = position;
	}

	private getCachedLocation(location: string): GeoPosition {
		const locationkey = this.normalizeLocation(location);
		return this.locationCache[locationkey];
	}

	private normalizeLocation(location: string) {
		return location.replace(/\s/g, '').toLowerCase();

	}

	private get locationError() {
		return new Error('Location not found');
	}

	private removePreviousPopups() {
		this.removeElementByClass('bwm-popup');
	}

	private removePreviousMarkers() {
		this.removeElementByClass('bwm-marker');
	}


	private removeElementByClass(className) {
		const elements = document.getElementsByClassName(className);

		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
}
