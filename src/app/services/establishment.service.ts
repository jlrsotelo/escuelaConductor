import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Establishment} from '../interfaces/establishment';
import {Observable} from 'rxjs';
import {API_CONSTANT} from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  uri= `${API_CONSTANT.apiBase}/establishment`
  http = inject(HttpClient)
  constructor() { }

  getAll():Observable<Establishment[]>{
    const uri_local=`${this.uri}/all`;
    console.log(uri_local)
    return this.http.get<Establishment[]>(uri_local);
  }

  add(establishment:Establishment):Observable<Establishment>{
    return this.http.post<Establishment>(this.uri,establishment);
  }

  update(id:number,establishment:Establishment):Observable<Establishment>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local)
    return this.http.put<Establishment>(uri_local,establishment);
  }

  delete(id?:number):Observable<boolean>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local)
    return this.http.delete<boolean>(uri_local);

  }

  findByType(type?:number):Observable<Establishment[]>{
    const uri_local=`${this.uri}/by-type?type=${type}`;
    console.log(uri_local)
    return this.http.get<Establishment[]>(uri_local);
  }

  findById(id?:number):Observable<Establishment>{
    const uri_local=`${this.uri}/${id}`;
    console.log(uri_local);
    return this.http.get<Establishment>(uri_local);
  }

  findByUbigeo(type?:number, cUbigeo?:string):Observable<Establishment[]>{
    const uri_local=`${this.uri}/by-ubigeo?type=${type}&cubigeo=${cUbigeo}`;
    console.log(uri_local)
    return this.http.get<Establishment[]>(uri_local);
  }
}
