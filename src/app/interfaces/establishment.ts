import {Ubigeo} from './ubigeo';
import {Types} from './types';

export interface Establishment {
  type:Types,
  name:string,
  address:string,
  state:string,
  email:string,
  phone:string,
  cestablishment?:number,
  nruc:string,
  cubigeo:Ubigeo
}
