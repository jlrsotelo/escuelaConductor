import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import { Establishment } from '../../../interfaces/establishment';
import Swal from 'sweetalert2';
import { EstablishmentService } from '../../../services/establishment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Department} from '../../../interfaces/department';
import {Province} from '../../../interfaces/province';
import {District} from '../../../interfaces/district';
import {DepartmentService} from '../../../services/department.service';
import {ProvinceService} from '../../../services/province.service';
import {DistrictService} from '../../../services/district.service';
import {CommonModule, JsonPipe} from '@angular/common';
import {TypesService} from '../../../services/types.service';
import {Types} from '../../../interfaces/types';
import {ModalModule, BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-establishment-list',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    /*JsonPipe*/
  ],
  providers: [
    BsModalService
  ],
  templateUrl: './establishment-index.component.html',
  styleUrl: './establishment-index.component.css'
})
export class EstablishmentIndexComponent implements OnInit{
  establishmentService=inject(EstablishmentService);
  departmentService=inject(DepartmentService);
  provinceService=inject(ProvinceService);
  districtService=inject(DistrictService);
  typesService=inject(TypesService);
  toastr= inject(ToastrService);
  formBuilder = inject(FormBuilder);
  router=inject(Router);
  modalService= inject(BsModalService);

  pagedItems:Establishment[]=[];
  establishments:Establishment[]=[];
  departments:Department[]=[];
  provinces:Province[]=[];
  districts:District[]=[];
  types:Types[]=[];
  itemsPerPage:number=10;
  frm1!:FormGroup;
  establishmentSelect?:Establishment;
  modalRef?: BsModalRef;

  ngOnInit(): void {
    this.createForm1();
    this.getDepartment();
    this.getAllTypes();
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.frm1.controls;
  }

  buscar(){
    if(this.frm1.invalid){
      return;
    }

    let cUbigeo: string = "";
    let tipo = this.fp['type'].value;

    if(this.fp['cDepartamento'].value != ''){
      cUbigeo = this.fp['cDepartamento'].value;
    }
    if(this.fp['cProvincia'].value != '') {
      cUbigeo += this.fp['cProvincia'].value;
    }
    if(this.fp['cDistrito'].value != ''){
      cUbigeo += this.fp['cDistrito'].value;
    }
    if(cUbigeo==""){
      this.findByType(tipo);
    }else{
      this.findByUbigeo(tipo, cUbigeo);
    }
  }

  nuevo(){
    this.router.navigate(['mantenimiento/establecimiento/add']);
  }

  getDepartment(){
    this.departmentService.getDepartment().subscribe(
      {
        next: (response) => {
          this.departments = response;
          console.log(this.departments)
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  getProvince(cdep:string){
    this.provinceService.getProvince(cdep).subscribe(
      {
        next: (response) => {
          this.provinces = response;
          console.log(this.provinces)
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  getDistrict(cdep:string, cprov:string){
    this.districtService.getDistrict(cdep,cprov).subscribe(
      {
        next: (response) => {
          this.districts = response;
          console.log(this.districts)
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  findByType(id:number){
    this.establishmentService.findByType(id).subscribe(
      {
        next: (response) => {
          this.establishments = response;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
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
    this.router.navigate(['mantenimiento/establecimiento/add', establishment.cestablishment]);
  }

  createForm1(){
    this.frm1= this.formBuilder.group(
      {
        cDepartamento: [
          ''
        ],
        cProvincia: [
          ''
        ],
        cDistrito: [
          ''
        ],
        type: [
          '',
          [
            Validators.required
          ]
        ],
      }
    )
  }

  findByUbigeo(tipo:number, cUbigeo:string){
    this.establishmentService.findByUbigeo(tipo,cUbigeo).subscribe(
      {
        next: (response) => {
          this.establishments = response;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  getAllTypes(){
    this.typesService.getAll().subscribe(
      {
        next: (response) => {
          this.types = response;
          console.log(this.types)
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  visualizar(establishment:Establishment,template: TemplateRef<void>){
    this.establishmentSelect=establishment
    this.openModal(template)
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
