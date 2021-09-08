import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'admin-breadcrumb',
  templateUrl: './admin-breadcrumb.component.html',
  styleUrls: ['./admin-breadcrumb.component.scss']
})
export class adminBreadcrumbComponent implements OnInit {
  title: string;
  breadcrumbs: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ){

  }

  
  ngOnInit(){
    this.setBreadCrumb (this.route.snapshot.children[0].children[0].data);
    this.router.events.subscribe((event)=>{
      if (event instanceof RoutesRecognized) {
       this.setBreadCrumb (event.state.root.firstChild.children[0].children[0].data);
      }
      

      
    })
    
   
  }

 

  setBreadCrumb(data){
   
    this.title  = data.title
    this.breadcrumbs = data.breadcrumbs
  }
  
}
