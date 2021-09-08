import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { VimeoPipe } from './vimeo.pipe';
import { EjercicioPipe } from './ejercicio.pipe';
import { FechaPipe } from './pipes/fecha.pipe';
import { DaysPipe } from './pipes/days.pipe';



@NgModule({
  declarations:[VimeoPipe,EjercicioPipe,FechaPipe,DaysPipe], // <---
  imports:[CommonModule],
  exports:[VimeoPipe,EjercicioPipe,FechaPipe,DaysPipe] // <---
})

export class VimeoMainPipe{}