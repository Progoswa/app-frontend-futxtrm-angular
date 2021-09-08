import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from '../../globals-services/pagos.service';

@Component({
  selector: 'app-admin-pago-m',
  templateUrl: './admin-pago-m.component.html',
  styleUrls: ['./admin-pago-m.component.scss']
})
export class AdminPagoMComponent implements OnInit {
  id: any;
  pago: any;
  url: any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private pagosService:PagosService,
    private dialog:MatDialog
  ) {
    route.queryParams.subscribe((data)=>{
      this.id = data.id
    })
   }

  ngOnInit() {
 
    this.getPago()
  }


 

  getPago(){
    this.pagosService.getPagoM(this.id).subscribe((resp:any)=>{
      if(resp.ok){
        this.pago = resp.pago
        this.url = resp.url
        console.log(resp);
        
      }
      
    })
  }

}
