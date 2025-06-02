import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
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
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-establishment-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './establishment-add.component.html',
  styleUrl: './establishment-add.component.css'
})
export class EstablishmentAddComponent implements OnInit{
  establishmentService=inject(EstablishmentService);
  typesService=inject(TypesService);
  departmentService=inject(DepartmentService);
  provinceService=inject(ProvinceService);
  districtService=inject(DistrictService);
  toastr= inject(ToastrService);
  formBuilder = inject(FormBuilder);
  activatedRoute= inject(ActivatedRoute);
  frm1!:FormGroup;
  router=inject(Router);
  establishment?:Establishment;
  types:Types[]=[];
  departments:Department[]=[];
  provinces:Province[]=[];
  districts:District[]=[];
  id:number=0;

  // @ts-ignore
  ngOnInit(): void {
    this.getAllTypes();
    this.createForm1();
    this.getDepartment();

    this.activatedRoute.params.subscribe((p)=>{
      if(p['id']){
        this.id=p['id'];
        this.findById(this.id);
      }
    })
  }

  findById(id:number){
    this.establishmentService.findById(id).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.frm1.patchValue(response);
          this.fp['cDepartamento'].setValue(response.cubigeo.cdepartamento);
          this.fp['cProvincia'].setValue(response.cubigeo.cprovincia);
          this.fp['cDistrito'].setValue(response.cubigeo.cdistrito);

          this.getProvince(this.fp['cDepartamento'].value);
          this.getDistrict(this.fp['cDepartamento'].value, this.fp['cProvincia'].value);
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

  onSubmit(){
    if(this.frm1.invalid){
      return;
    }

    const nruc=this.frm1.controls['nruc'].value;
    const type=this.frm1.controls['type'].value;
    const name=this.frm1.controls['name'].value;
    const address=this.frm1.controls['address'].value;
    const state=this.frm1.controls['state'].value;
    const email=this.frm1.controls['email'].value;
    const phone=this.frm1.controls['phone'].value;
    const cDepartamento=this.frm1.controls['cDepartamento'].value;
    const cProvincia=this.frm1.controls['cProvincia'].value;
    const cDistrito=this.frm1.controls['cDistrito'].value;

    const establishment:Establishment={
      type: type,
      name: name,
      address: address,
      state: state,
      email: email,
      phone: phone,
      nruc: nruc,
      cubigeo: {
        cubigeo: cDepartamento + cProvincia + cDistrito
      }
    }
    console.log(establishment);

    if(this.id>0){
      this.update(establishment);
    }else{
      this.add(establishment)
    }
  }

  cancelar(){
    this.router.navigate(['establecimiento/mantenimiento']);
  }

  add(establishment:Establishment){
    this.establishmentService.add(establishment).subscribe(
      {
        next: (response) => {
          this.establishment = response;
          this.toastr.success('El establecimiento fue registrado con exito, id='+this.establishment?.cestablishment,'Aviso');
        },
        error: (error) => {
          this.toastr.error('Error al registrar el establecimiento','Error');
        }
      }
    )
    //this.cancelar();
  }

  update(establishment:Establishment){
    this.establishmentService.update(this.id,establishment).subscribe(
      {
        next: (response) => {
          this.establishment = response;
          console.log(this.establishment)
          this.toastr.success('El establecimiento fue actualizado con exito, id='+this.establishment.cestablishment,'Aviso');
        },
        error: (error) => {
          this.toastr.error('Error al actualizar el establecimiento','Error');
        }
      }
    )
    //this.cancelar();
  }

  createForm1(){
    this.frm1= this.formBuilder.group(
      {
        type: [
          Validators.required
        ],
        name: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ],
        address: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
        state: [
          Validators.required
        ],
        email: [
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
        phone: [
          Validators.minLength(7),
          Validators.maxLength(20),
        ],
        nruc: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
        cDepartamento: [
          Validators.required
        ],
        cProvincia: [
          Validators.required
        ],
        cDistrito: [
          Validators.required
        ],
      }
    )
  }

  // Alias del formulario
  get fp(): { [key: string]: AbstractControl } {
    return this.frm1.controls;
  }
}
