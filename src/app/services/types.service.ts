import { inject, Injectable } from '@angular/core';
import { Types } from '../interfaces/types';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANT } from '../constants/api.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  uri= `${API_CONSTANT.apiBase}/types`
  http = inject(HttpClient);

  constructor() { }

  getAll():Observable<Types[]>{
    const uri_local=`${this.uri}/all`;
    console.log(uri_local)
    return this.http.get<Types[]>(uri_local);
  }
}
