import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantillaService } from '../../globals-services/plantilla.service';
import { DomSanitizer } from '@angular/platform-browser';

import { PdfMakeWrapper, Img, Txt, Columns, Cell, Table, Stack } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { EjercicioPipe } from '../../ejercicio.pipe';
import * as moment from 'moment'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.scss']
})
export class PlantillaComponent implements OnInit {
  id: any;
  plantilla: any;
  url: any;
  calendario: any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private plantillaService:PlantillaService,
    private sanitizer:DomSanitizer,
    public translate:TranslateService
  ) { 

    route.queryParams.subscribe((data)=>{
      this.id = data.id
    })

  }

  ngOnInit() {

    this.getPlantilla(this.id)
  }
  getPlantilla(id: any) {
    this.plantillaService.getPlantilla(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.calendario = resp.calendario
        this.plantilla = resp.plantilla
        this.url = resp.url
        
      }
    })
  }

  uploadVimeo(id){
    
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${id}?autoplay=1&color=d0ae3d&byline=0&portrait=0`)
  
   
  }


  getTotalTime(plantilla){
    // let cantidad = 0
    let minutos = 0
    plantilla.plantilla.forEach((objeto) => {
      // cantidad += objeto.cantidad
      minutos += objeto.minutos * objeto.cantidad
    });
    return minutos
    
  }

  getTimeSeccion(seccion){
    
    return seccion.minutos * seccion.cantidad
  }


  formatTime(time){
    let hour = moment().startOf('day').add(time,'hours').hour()
    if(hour > 12){
      return `${moment().startOf('day').add(time,'hours').subtract(12,'hours').format('HH:mm')} PM`
    }else{
      return `${moment().startOf('day').add(time,'hours').format('HH:mm')} AM`
   
    }
    
  }

  async convertirPDF(){


          
          PdfMakeWrapper.setFonts(pdfFonts);
       
      const pdf = new PdfMakeWrapper();
       
    pdf.background(await new Img('assets/images/watermark.png').width(400).height(550).absolutePosition(235,20).opacity(0.1).build())
    pdf.add(
       await new Img('assets/images/logon.png').width(150).alignment('center').build()
    )
      pdf.pageOrientation("landscape")
    pdf.add(
  pdf.ln(1)
)


      pdf.add(
        new Columns([   new Txt(`Categoria: ${this.calendario.categoria.nombre}`).end,new Txt(`Tipo de entrenamiento: ${new EjercicioPipe(this.translate).transform(this.calendario.condicional)}`).end
      ]).end
      )
      pdf.add(
        new Columns([    new Txt(`Fecha: ${moment(this.calendario.dia).format('DD-MM-YYYY')}`).end,        new Txt(`Hora de inicio: ${this.formatTime(this.calendario.horario.min)} -  ${this.formatTime(this.calendario.horario.max)}` ).end

      ]).end
      )


   
    
     
     

      pdf.add(
        new Txt(`Entrenador: ${this.plantilla.usuario.nombre} ${this.plantilla.usuario.apellido}`).end
      )
      pdf.add(
        pdf.ln(1)
      )
      

      pdf.add(
        new Table([[new Txt(`${this.plantilla.nombre}`).width("*").fontSize(15).color('#fff').alignment('center').end]]).layout({defaultBorder:false,fillColor:function (rowIndex, node, columnIndex) {
                return (rowIndex === 0) ? '#909090' : null;
            }}).widths(['*']).end
      )

      for (const seccion of this.plantilla.plantilla) {

          pdf.add(
            new Table([[new Txt(`${seccion.seccion.nombre} (${this.getTimeSeccion(seccion)} min totales)`).width("*").fontSize(15).color('#fff').alignment('center').end]]).layout({defaultBorder:false,fillColor:function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#D0AE3D' : null;
                }}).widths(['*']).end
          )

          


          let table = []
         

          table.push(          [ new Txt('Ejercicio').color('#000').bold().alignment('left').end, new Txt('Requerimientos').color('#000').bold().end,new Txt('Repeticiones').color('#000').bold().alignment('center').end,new Txt('Descanso').color('#000').bold().alignment('center').end]
          )

        
          for (const ejercicio of seccion.ejercicios) {
            
              table.push( [ new Txt(`${ejercicio.entrenamiento.descripcion}`).alignment('left').fontSize(10).end, new Txt(`${ejercicio.entrenamiento.requerimientos}`).fontSize(10).alignment('center').end,new Txt(`${ejercicio.entrenamiento.repeticiones} minutos`).alignment('center').end,new Txt(`${ejercicio.entrenamiento.descanso} segundos`).alignment('center').end])
        
            
            
          }
          pdf.add(
            new Table(table).widths([ 170,130,'*','*']).layout({hLineWidth:()=>{return 0.2},vLineWidth:()=>{return 0.2}}).end
          )
          
      }

 
    
   
      pdf.create().download(this.plantilla.nombre);
        
      
    
  }

}
