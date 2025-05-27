import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_CONSTANT} from '../constants/api.constant';
import {HttpClient} from '@angular/common/http';
import {Department} from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  uri= `${API_CONSTANT.apiBase}/ubigeo`
  http = inject(HttpClient);

  constructor() { }

  getDepartment():Observable<Department[]>{
    const uri_local=`${this.uri}/by-department`;
    console.log(uri_local)
    return this.http.get<Department[]>(uri_local);
  }
}
