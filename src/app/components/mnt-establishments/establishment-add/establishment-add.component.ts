import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Establishment } from '../../../interfaces/establishment';
import { EstablishmentService } from '../../../services/establishment.service';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../../services/types.service';
import { Types } from '../../../interfaces/types';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../interfaces/department';
import {ProvinceService} from '../../../services/province.service';
import {DistrictService} from '../../../services/district.service';
import {Province} from '../../../interfaces/province';
import {District} from '../../../interfaces/district';

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
  types:Types[]=[];
  departments:Department[]=[];
  provinces:Province[]=[];
  districts:District[]=[];
  establishmentService=inject(EstablishmentService);
  typesService=inject(TypesService);
  departmentService=inject(DepartmentService);
  provinceService=inject(ProvinceService);
  districtService=inject(DistrictService);
  toastr= inject(ToastrService);
  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getAllTypes();
    this.createForm1();
    this.getDepartment();
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

  getDepartment(){
    this.departmentService.getDepartment().subscribe(
      {
        next: (response) => {
          this.departments = response;
          console.log(this.types)
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
          console.log(this.types)
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
          console.log(this.types)
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  onSubmit(){
    const cubigeo=this.frm1.controls['cubigeo'].value;
    const nruc=this.frm1.controls['nruc'].value;
    const type=this.frm1.controls['type'].value;
    const name=this.frm1.controls['name'].value;
    const address=this.frm1.controls['address'].value;
    const state=this.frm1.controls['state'].value;
    const email=this.frm1.controls['email'].value;
    const phone=this.frm1.controls['phone'].value;

    const establishment:Establishment={
      type: type,
      name: name,
      address: address,
      state: state,
      email: email,
      phone: phone,
      cubigeo: cubigeo,
      nruc: nruc
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

  createForm1(){
    this.frm1= this.formBuilder.group(
      {
        type: [''],
        name: [''],
        address: [''],
        state: [''],
        email: [''],
        phone: [''],
        cubigeo:[''],
        nruc: ['']
      }
    )
  }
}
