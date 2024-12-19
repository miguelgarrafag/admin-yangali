import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { MatInputModule } from '@angular/material/input'; // Importar el módulo de mat-input
import { MatFormFieldModule } from '@angular/material/form-field'; // Para utilizar FormField con mat-input
import { ContenidoComponent } from './contenido/contenido.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'contenido', component: ContenidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,MatInputModule,MatFormFieldModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
