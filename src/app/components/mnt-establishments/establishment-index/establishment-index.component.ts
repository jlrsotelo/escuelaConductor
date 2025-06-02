import { Component, inject, OnInit } from '@angular/core';
import { Establishment } from '../../../interfaces/establishment';
import Swal from 'sweetalert2';
import { EstablishmentService } from '../../../services/establishment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-establishment-list',
  imports: [ReactiveFormsModule],
  templateUrl: './establishment-index.component.html',
  styleUrl: './establishment-index.component.css'
})
export class EstablishmentIndexComponent implements OnInit{
  establishmentService=inject(EstablishmentService);
  establishments:Establishment[]=[];
  toastr= inject(ToastrService);
  pagedItems:Establishment[]=[];
  itemsPerPage:number=10;
  router=inject(Router);
  frm1!:FormGroup;
  formBuilder: any;

  ngOnInit(): void {
    this.createForm1();
  }

  buscar(){
    this.getAll();
  }

  nuevo(){
    this.router.navigate(['establecimiento/add']);
  }

  getAll(){
    this.establishmentService.getAll().subscribe(
      {
        next: (response) => {
          this.establishments = response;
          this.pagedItems = this.establishments.slice(0, this.itemsPerPage);
        },
        error: (error) => {
          console.error('Error fetching data - products:', error);
        }
      }
    )
  }

  eliminar(establishment:Establishment){
    Swal.fire({
      title: "Alerta",
      text: "Confirma la eliminacion del establecimiento: "+establishment.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.establishmentService.delete(establishment.cestablishment).subscribe(
          {
            next: (response) => {
              console.log(response)
              if(response==null){
                this.toastr.success('El establecimiento '+establishment.name +', fue eliminado con exito','Aviso');
                this.establishments = this.establishments.filter(p => p.cestablishment != establishment.cestablishment);
              }else{
                this.toastr.warning('Error al eliminar el establecimiento 1','Error');
              }
            },
            error: (error) => {
              this.toastr.error('Error al eliminar el establecimiento 2','Error');
            }
          }
        )
      }
    });
  }

  modificar(establishment:Establishment){
    this.router.navigate(['establecimiento/add', establishment.cestablishment]);
  }

  createForm1(){
    this.frm1= this.formBuilder.group(
      {

      }
    )
  }
}
