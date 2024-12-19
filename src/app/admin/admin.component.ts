import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from "../contenido/contenido.component";
import { ContactoComponent } from "../contacto/contacto.component";
import { UsuariosComponent } from "../usuarios/usuarios.component"; // Importar CommonModule

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ContenidoComponent, ContactoComponent, UsuariosComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selectedSection: string = 'contenido';  // Sección por defecto

  showSection(section: string) {
    this.selectedSection = section;
  }
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
