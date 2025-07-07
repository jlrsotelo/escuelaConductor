import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'escuelaConductor';

  authService=inject(AuthService);
  router=inject(Router);

  ngOnInit(): void {

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['licenciaConducir/home']);
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  login(){
    this.router.navigate(['users/login']);
  }
}
