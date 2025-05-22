import {Component, inject} from '@angular/core';
import {Establishment} from '../../../interfaces/establishment';
import {EstablishmentService} from '../../../services/establishment.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-establishment-list',
  imports: [],
  templateUrl: './establishment-list.component.html',
  styleUrl: './establishment-list.component.css'
})
export class EstablishmentListComponent {
  establishments: Establishment[] = [];
  establishmentService=inject(EstablishmentService);
  activatedRoute= inject(ActivatedRoute);
  id:number=0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p)=>{
      if(p['id']){
        this.id=p['id'];
        console.log(this.id);
        this.findByType(this.id);
      }
    })
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
}
