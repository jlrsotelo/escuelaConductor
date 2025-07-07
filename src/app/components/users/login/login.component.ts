import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../interfaces/user';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formBuilder = inject(FormBuilder);
  authService=inject(AuthService);
  toastr= inject(ToastrService);
  router=inject(Router);
  user?:User;
  frmLogin!:FormGroup;

  ngOnInit(): void {
    this.createForm1();
  }

  onSubmit(){
    if(this.frmLogin.invalid){
      return;
    }

    const usuario=this.frmLogin.controls['usuario'].value;
    const clave=this.frmLogin.controls['clave'].value;

    const user:User={
      nomUser: usuario,
      pwdUser: clave
    }
    this.accesoUsuario(user);
  }

  accesoUsuario(user:User){
    this.authService.login(user).subscribe(
      {
        next: (response) => {
          this.user = response;
          this.router.navigate(['licenciaConducir/home']);
        },
        error: (error) => {
          this.toastr.warning('Usuario o clave incorrecta','Aviso');
        }
      }
    )
  }

  createForm1(){
    this.frmLogin = this.formBuilder.group(
      {
        usuario: [
          '',
          [
            Validators.required
          ]
        ],
        clave: [
          '',
          [
            Validators.required,
          ]
        ],
      }
    )
  }

  // Alias del formulario
  get fp(): { [key: string]: AbstractControl } {
    return this.frmLogin.controls;
  }
}
