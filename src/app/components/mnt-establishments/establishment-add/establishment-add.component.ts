import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Establishment } from '../../../interfaces/establishment';
import { EstablishmentService } from '../../../services/establishment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-establishment-add',
  imports: [ReactiveFormsModule],
  templateUrl: './establishment-add.component.html',
  styleUrl: './establishment-add.component.css'
})
export class EstablishmentAddComponent implements OnInit{
  frm1!:FormGroup;
  router=inject(Router);
  establishment?:Establishment;
  establishmentService=inject(EstablishmentService);
  toastr= inject(ToastrService);

  ngOnInit(): void {

  }

  onSubmit(){
    const tipo=this.frm1.controls['tipo'].value;

    const establishment:Establishment={
      "type": tipo,
      "name": "MUNICIPALIDAD PROVINCIAL DE UTCUBAMBA NUEVO",
      "address": "JR. ANGAMOS NRO. 349 SECTOR PUEBLO NUEVO",
      "state": "1",
      "email": "user2nuevo@gmail.com",
      "phone": "953685695",
      "cubigeo": "010701",
      "nruc": "20146917400"
    };
    console.log(establishment);
    this.add(establishment);
  }

  cancelar(){
    this.router.navigate(['establecimiento/mantenimiento']);
  }

  add(establishment:Establishment){
    this.establishmentService.add(establishment).subscribe(
      {
        next: (response) => {
          this.establishment = response;
          //console.log(this.product)
          this.toastr.success('El establecimiento fue registrado con exito, id='+this.establishment?.cestablishment,'Aviso');
        },
        error: (error) => {
          this.toastr.error('Error al registrar el establecimiento','Error');
        }
      }
  )}  
}
