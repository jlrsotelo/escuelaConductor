import {inject, Injectable} from '@angular/core';
import {API_CONSTANT} from '../constants/api.constant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Province} from '../interfaces/province';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  uri= `${API_CONSTANT.apiBase}/ubigeo`
  http = inject(HttpClient);

  constructor() { }

  getProvince(cdep:string):Observable<Province[]>{
    const uri_local=`${this.uri}/by-province?cdep=${cdep}`;
    console.log(uri_local)
    return this.http.get<Province[]>(uri_local);
  }
}
