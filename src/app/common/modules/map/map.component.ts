import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	ViewEncapsulation
} from '@angular/core';
import { config } from 'src/config';
import { Subject } from 'rxjs';
import { MapService } from './map.service';


@Component({
	selector: 'bwm-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {

	private map: any;
	public readonly API_KEY = config.TOMTOM_API_KEY;

	@Input('location') location: string;
	@Input('mapNotifier') mapNotifier: Subject<string>;

	constructor(private mapService: MapService) { }

	ngOnInit() {
		this.createMap();
		this.getGeoPosition(this.location);

		if (this.mapNotifier) {
			this.mapNotifier.subscribe(location => {
				this.getGeoPosition(location);
			});
		}
	}

	ngOnDestroy() {
		if (this.mapNotifier) {
			this.mapNotifier.unsubscribe();
		}
	}
	private createMap() {
		this.map = this.mapService.createMap({ apiKey: this.API_KEY });
	}

	private getGeoPosition(location: string) {
		this.mapService
			.getGeoPosition(location, this.API_KEY)
			.subscribe(position => {
				this.mapService.initMap(this.map, position);
			}, (error: Error) => {
				this.mapService.centerMap(this.map, { lat: 0, lon: 0 });
				this.mapService.addPopopToMap(this.map, error.message);
			});
	}

}
