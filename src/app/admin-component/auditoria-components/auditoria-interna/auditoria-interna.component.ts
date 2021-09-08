import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { BitacoraService } from '../../../globals-services/bitacora.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as moment from 'moment'
import { SuccessDialogComponent } from '../../../globals-dialogs/success-dialog/success-dialog.component';
import { ExcelService } from '../../../globals-services/excel.service';
import { PdfMakeWrapper, Img, Txt, Columns, Cell, Table, Stack } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { UsuarioService } from '../../../globals-services/usuario.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-auditoria-interna',
  templateUrl: './auditoria-interna.component.html',
  styleUrls: ['./auditoria-interna.component.scss']
})
export class AuditoriaInternaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource;
  displayedColumns: string[] = ['Usuario','nombre', 'Accion','Fecha'];
  query: string = "";
  since: any;
  until: any;
  historial: any;
  usuario: any;

  constructor(
    private dialog: MatDialog,
    private bitacoraServices: BitacoraService,
    private router: Router,
    private fb: FormBuilder,
    private excelService:ExcelService,
    private usuarioService:UsuarioService,
    private translate:TranslateService
  ) { }

  filterForm = this.fb.group({
    query: [''],
    since: [''],
    until: [''],

  }, {validators:this.checkvalues})

  checkvalues(form: FormGroup){
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.getBitacora()
    this.usuarioService.getUser(localStorage.getItem('id')).subscribe((resp:any)=>{
      if(resp.ok){
        this.usuario = resp.data
        
      }
    })

  }

  listarBitacora(bitacora){
    this.dataSource = new MatTableDataSource(bitacora)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getBitacora(){
    this.bitacoraServices.getAllBitacora().subscribe((resp: any) => {
   
      
      if (resp.ok) {
        this.historial = resp.historial
        this.listarBitacora(resp.historial)
      }
    })
  }

  getBitacoraFilter(){
    this.bitacoraServices.getBitacoraFilter({query:this.query, since: this.since, until: this.until}).subscribe((resp: any) => {      
      if (resp.ok) {
        
        this.listarBitacora(resp.historial)
      }
    })
  }

  

  generateExcel(){
    this.success(this.translate.instant('pages.audits.generate.xlsx.title'),this.translate.instant('pages.audits.generate.xlsx.subtitle'))
    let historial = []
    let j = 0

    
    this.historial.forEach(async (data,i,arr:any[]) => {
      historial.push({
        Fecha:moment(data.fecha).format('DD-MM-YYYY HH:mm'),
        Usuario:`${data.usuario.nombre} ${data.usuario.apellido} (${data.usuario.username})`,
        Accion:data.accion

      })
      j += 1
      if(j == arr.length){

        this.exportAsXLSX(historial,'bitacora')
      }
    });

  }


  
  exportAsXLSX(data,nombre):void {
    this.excelService.exportAsExcelFile(data,nombre);
 }


  success(title,msg){
 
    this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      data:{title,msg}
    });
  
  }

 
    async generatePDF(){

      this.success(this.translate.instant('pages.audits.generate.pdf.title'),this.translate.instant('pages.audits.generate.pdf.subtitle'))

          
      PdfMakeWrapper.setFonts(pdfFonts);
   
  const pdf = new PdfMakeWrapper();
   

pdf.add(
   await new Img('assets/images/logon.png').height(75).width(200).alignment('center').build()
)

pdf.add(
pdf.ln(1)
)



  pdf.add(
    new Txt(`Fecha: ${moment().format('DD-MM-YYYY HH:mm')}`).end
  )

  pdf.add(
    new Txt(`Administrador: ${this.usuario.nombre} ${this.usuario.apellido}`).end
  )
  pdf.add(
    new Txt(`Teléfono: ${this.usuario.telefono}`).end
  )
  pdf.add(
    new Txt(`Correo: ${this.usuario.email}`).end
  )
  pdf.add(
    pdf.ln(1)
  )
  

 


      pdf.add(
        new Table([
          [new Txt(`Auditoria interna`).width("*").fontSize(15).color('#fff').alignment('center').end]]).layout({defaultBorder:false,fillColor:function (rowIndex, node, columnIndex) {
                return (rowIndex === 0) ? '#D0AE3D' : null;
            }}).widths(['*']).end
      )

      



      
      let table = []
            
      table.push(
        [ 
          new Txt('Usuario').color('#000').bold().alignment('left').end,
          new Txt('Accion').color('#000').bold().end,
          new Txt('Fecha').color('#000').bold().alignment('center').end
        ]
      )
      for (const registro of this.historial) {
        
          table.push(
             [
              new Txt(`${registro.usuario.nombre} ${registro.usuario.apellido} (${registro.usuario.username})`).fontSize(10).alignment('left').end, 
              new Txt(`${registro.accion}`).fontSize(10).alignment('center').end,
              new Txt(moment(registro.fecha).format('DD-MM-YYYY HH:mm')).fontSize(10).alignment('center').end
            ])
    
        
        
      }
      pdf.add(
        new Table(table).widths([ '*','*','*']).layout({hLineWidth:()=>{return 0.2},vLineWidth:()=>{return 0.2}}).end
      )
      
  




  pdf.create().download('historial_futxtrm');
    
  

}

  

  onSearchChange(value){
    this.query = value.query;

    this.since = value.since;

    this.until = value.until;
   
    
    this.getBitacoraFilter()
  }



}
