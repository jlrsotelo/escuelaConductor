import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentAddComponent } from './establishment-add.component';

describe('EstablishmentAddComponent', () => {
  let component: EstablishmentAddComponent;
  let fixture: ComponentFixture<EstablishmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
