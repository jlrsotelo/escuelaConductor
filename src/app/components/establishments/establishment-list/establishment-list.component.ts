import {Component, inject, OnInit} from '@angular/core';
import {Establishment} from '../../../interfaces/establishment';
import {EstablishmentService} from '../../../services/establishment.service';
import {ActivatedRoute} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {Department} from '../../../interfaces/department';
import {DepartmentService} from '../../../services/department.service';
import {ProvinceService} from '../../../services/province.service';
import {DistrictService} from '../../../services/district.service';
import {Province} from '../../../interfaces/province';
import {District} from '../../../interfaces/district';
import {CommonModule} from '@angular/common';
import {PageChangedEvent, PaginationModule} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-establishment-list',
    imports: [
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      PaginationModule
    ],
  templateUrl: './establishment-list.component.html',
  styleUrl: './establishment-list.component.css'
})
export class EstablishmentListComponent implements OnInit{
  establishmentService=inject(EstablishmentService);
  departmentService=inject(DepartmentService);
  provinceService=inject(ProvinceService);
  districtService=inject(DistrictService);
  activatedRoute= inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  establishments: Establishment[]=[];
  departments:Department[]=[];
  provinces:Province[]=[];
  districts:District[]=[];
  pagedItems:Establishment[]=[];
  currentPage:number=1;
  itemsPerPage:number=10;
  id:number=0;
  frm1!:FormGroup;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p)=> {
      this.id=p['id'];
      this.limpiar();
      this.createForm1();
      this.getDepartment();
    });
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.frm1.controls;
  }

  limpiarLista(){
    this.establishments=[];
    this.pagedItems=[];
  }

  limpiar(){
    this.establishments=[];
    this.provinces=[];
    this.districts=[];
    this.pagedItems=[];
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
      }
    )
  }

  buscar(){
    this.limpiarLista();
    let cUbigeo: string = "";
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
      this.findByType(this.id);
    }else{
      this.findByUbigeo(this.id, cUbigeo);
    }
  }

  findByType(id:number){
    this.establishmentService.findByType(id).subscribe(
      {
        next: (response) => {
          this.establishments = response;
          this.pagedItems = this.establishments.slice(0, this.itemsPerPage);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  findByUbigeo(id:number, cUbigeo:string){
    this.establishmentService.findByUbigeo(id, cUbigeo).subscribe(
      {
        next: (response) => {
          this.establishments = response;
          this.pagedItems = this.establishments.slice(0, this.itemsPerPage);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      }
    )
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * this.itemsPerPage; //0
    const endItem = event.page * this.itemsPerPage; //10
    this.pagedItems = this.establishments.slice(startItem, endItem);
  }
}
