import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ClienteRoutes } from './cliente.routing';
import { ComprarCategoriaComponent } from './cliente-dialogs/comprar-categoria/comprar-categoria.component';
import { ClienteCategoriaComponent } from './cliente-categoria/cliente-categoria.component';
import { ClientePlantillasComponent } from './cliente-plantillas/cliente-plantillas.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { ClienteCalendarioComponent } from './cliente-calendario/cliente-calendario.component';
import { CategoriasCalendarioComponent } from './categorias-calendario/categorias-calendario.component';
import { PlantillaCalendarioComponent } from './plantilla-calendario/plantilla-calendario.component';
import { ClientePerfilComponent } from './cliente-perfil/cliente-perfil.component';
import { CategoriaPagarComponent } from './categoria-pagar/categoria-pagar.component';
import { ClienteNotificacionesComponent } from './cliente-notificaciones/cliente-notificaciones.component';
import { VimeoMainPipe } from '../vimeo.module';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { CategoriaSeleccionComponent } from './categoria-seleccion/categoria-seleccion.component';
import { FechaPredeterminadaComponent } from './fecha-predeterminada/fecha-predeterminada.component';
import { EjercicioPipe } from '../ejercicio.pipe';
import { FechaPersonalizadaComponent } from './fecha-personalizada/fecha-personalizada.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClientCategoriesFreeComponent } from './client-categories-free/client-categories-free.component';
import { ClienteMembresiasComponent } from './cliente-membresias/cliente-membresias.component';
import { MembresiaInfoComponent } from './membresias-ctrl/membresia-info/membresia-info.component';
import { ComprarMembresiaComponent } from './membresias-ctrl/comprar-membresia/comprar-membresia.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClienteRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    VimeoMainPipe,
    NgxMatIntlTelInputModule,
    NgxMaterialTimepickerModule,
    TranslateModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [	
    ComprarCategoriaComponent,
    ClienteCategoriaComponent,
    ClientePlantillasComponent,
    PlantillaComponent,
    ClienteCalendarioComponent,
    CategoriasCalendarioComponent,
    PlantillaCalendarioComponent,
    ClientePerfilComponent,
    CategoriaPagarComponent,
    ClienteNotificacionesComponent,
    CategoriaSeleccionComponent,
    FechaPredeterminadaComponent,
    FechaPersonalizadaComponent,
    ClienteMembresiasComponent,
    MembresiaInfoComponent,
    ComprarMembresiaComponent
    

   ]
})
export class ClienteComponentsModule {}
