import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../globals-services/usuario.service';

@Component({
  selector: 'app-choose-start',
  templateUrl: './choose-start.component.html',
  styleUrls: ['./choose-start.component.scss']
})
export class ChooseStartComponent implements OnInit {


  free = true
  constructor(
    public userService:UsuarioService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  navigateTo(o){
      this.router.navigate(["/start"],{queryParams:{o}})
  }

}
