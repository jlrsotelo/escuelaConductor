import {inject, Injectable} from '@angular/core';
import {API_CONSTANT} from '../constants/api.constant';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District} from '../interfaces/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  uri= `${API_CONSTANT.apiBase}/ubigeo`
  http = inject(HttpClient);

  constructor() { }

  getDistrict(cdep:string, cprov:string):Observable<District[]>{
    const uri_local=`${this.uri}/by-district?cdep=${cdep}&cprov=${cprov}`;
    console.log(uri_local)
    return this.http.get<District[]>(uri_local);
  }
}
