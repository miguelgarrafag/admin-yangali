import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  showHeader: boolean = false;
  showInLogin : boolean = true;
  showInAdmin : boolean = true;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showInLogin = this.router.url !== '/login';
      this.showInAdmin = this.router.url !== '/admin';
      console.log("login : ", this.showInLogin);
      console.log("admin : ", this.showInAdmin);
      if(this.showInLogin && this.showInAdmin){
        this.showHeader = true;
      }else{
        this.showHeader = false;
      }
    });  
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
