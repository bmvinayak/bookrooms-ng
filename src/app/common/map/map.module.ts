import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';

import { MapComponent} from './map.component';

import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  declarations: [MapComponent] ,
  exports: [MapComponent],
  imports: [AgmCoreModule.forRoot({
              apiKey: 'YOUR_KEY_HERE'
            }), 
            AppRoutingModule,
            CommonModule] ,
  providers: [MapService, CamelizePipe]
})
export class MapModule { }