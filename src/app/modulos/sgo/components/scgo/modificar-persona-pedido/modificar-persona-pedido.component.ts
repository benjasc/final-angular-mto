import { Component, OnInit } from '@angular/core';
import { ModificarPersonaPedidoService } from '../../../services/modificarPersonaPedido.service';
import { ModificarPersonaPedidoModel } from '../../../model/modificarPersonaPedidoModel.model';



@Component({
  selector: 'app-modificar-persona-pedido',
  templateUrl: './modificar-persona-pedido.component.html',
  styleUrls: ['./modificar-persona-pedido.component.scss']
})
export class ModificarPersonaPedidoComponent implements OnInit {

 objPersona:ModificarPersonaPedidoModel;

 objPersona2:ModificarPersonaPedidoModel;

  constructor(private modificarPersonaPedidoService : ModificarPersonaPedidoService) {

    this.objPersona = new ModificarPersonaPedidoModel();
         this.modificarPersonaPedidoService.getPersonas().subscribe(res=>{
            console.log('El objeto es:',res.json());
            this.objPersona = res.json();
          },err=>{
            console.log("No se pudo obtener la data");
            
          })
   }

  ngOnInit() {
  }

  saveUser(){
    console.log(this.objPersona[0]);
    this.objPersona2 = {
      rut: this.objPersona[0].rut,
      nombre: this.objPersona[0].nombre,
      apelldio: this.objPersona[0].apelldio,
      id: this.objPersona[0].id,
      telefono: this.objPersona[0].telefono,
      email: this.objPersona[0].email
    }
    var x = Math.floor(Math.random() * Object.keys(this.objPersona).length-1) + 0  ;
  console.log("xx",x);
  

    
    
    this.modificarPersonaPedidoService.savePersona(this.objPersona2);
  }

}
