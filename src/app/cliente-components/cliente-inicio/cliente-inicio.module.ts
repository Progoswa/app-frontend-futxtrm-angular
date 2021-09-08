import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteInicioComponent } from './cliente-inicio.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { RouterModule } from '@angular/router';
import { ClienteInicioRoutes } from './cliente-inicio.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(ClienteInicioRoutes),
    TranslateModule
  ],
  declarations: [ClienteInicioComponent]
})
export class ClienteInicioModule { }
