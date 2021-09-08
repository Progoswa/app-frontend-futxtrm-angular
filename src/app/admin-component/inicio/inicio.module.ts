import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { InicioComponent } from './inicio.component';
import { InicioRoutes } from './inicio.routing';
import { DemoMaterialModule } from '../../demo-material-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(InicioRoutes),
    TranslateModule
  ],
  declarations: [
    InicioComponent
  ]
})
export class InicioModule {}
