import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Timestamp } from 'rxjs';
import Swal from 'sweetalert2';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

interface ContenidoData {
  id: number;
  titulo: string;
  descripcion: string;
}
interface ModalData {
  id: number;
  titulo: string;
  descripcion: string;
  status: boolean;
}
@Component({
  selector: 'app-contenido',
  imports: [CommonModule,FormsModule],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent {
  userData: ContenidoData[] = [];
  modalData: ModalData[] = [];
  newUser: ContenidoData = { id: 2, titulo: 'Segunda Prueba', descripcion: 'Segunda Descripción' };
  newModal: ModalData;
  isFocusedBanner: boolean = false;
  isFocusedNosotros: boolean = false;
  isFocusedModal: boolean = false;
  isDisabledModal: boolean = true;
  isDisabledBanner: boolean = true;
  onFocusModal(): void {
    this.isFocusedModal = true;
    this.isFocusedNosotros = false;
    this.isFocusedBanner = false;
  }
  onBlurModal(): void {
    this.isFocusedModal = false;
    this.isFocusedBanner = false;
    this.isFocusedNosotros = false;
  }
  onFocusBanner(): void {
    this.isFocusedBanner = true;
    this.isFocusedNosotros = false;
  }
  onBlurBanner(): void {
    this.isFocusedBanner = false;
    this.isFocusedNosotros = false;
  }
  onFocusNosotros(): void {
    this.isFocusedBanner = false;
    this.isFocusedNosotros = true;
  }
  onBlurBannerNosotros(): void {
    this.isFocusedBanner = false;
    this.isFocusedNosotros = false;
  }
  load(){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,  // Previene que cierren la alerta al hacer clic fuera
      didOpen: () => {
        Swal.showLoading();  // Muestra el spinner
      }
    });
  }
  constructor() {
    this.newModal = { id:0, titulo: '', descripcion: '', status: false};
    this.loadData();
    this.loadModal();
  }
  async loadData() {
    const { data, error } = await supabase.from('BANNER').select('*');
    if (data) {
      this.userData = data;
      this.newUser.titulo = data[0].titulo;
      this.newUser.descripcion = data[0].descripcion;
    } else {
      console.error(error);
    }
  }
  async loadModal() {
    const { data, error } = await supabase.from('VENTANA_EMERGENTE').select('*');
    if (data) {
      this.modalData = data;
      this.newModal.titulo = data[0].titulo;
      this.newModal.descripcion = data[0].descripcion;
      this.newModal.status = data[0].status;
    } else {
      console.error(error);
    }
  }
  async updateBanner(userData: ContenidoData) {
    this.isDisabledBanner = true;
    this.load();
    const { data, error } = await supabase.from('BANNER').upsert([userData]);
    if (data) {
      this.loadData();  // Reload data
    } else {
      console.error(error);
    }
    Swal.close();
  }
  async updateModal(modalData: ModalData) {
    this.isDisabledModal = true;
    this.load();
    const { data, error } = await supabase.from('VENTANA_EMERGENTE').upsert([modalData]);
    if (data) {
      this.loadModal();  // Reload data
    } else {
      console.error(error);
    }
    Swal.close();
  }
  async editarModal(){
    this.isDisabledModal = false;
  }
  async cancelarModal(){
    this.isDisabledModal = true;
  }
  async editarBanner(){
    this.isDisabledBanner = false;
  }
  async cancelarBanner(){
    this.isDisabledBanner = true;
  }
  nosotros = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' }
  ];

  servicios = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' }
  ];
}
