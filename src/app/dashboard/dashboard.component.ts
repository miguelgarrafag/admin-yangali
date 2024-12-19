import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

interface Banner {
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
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  welcomeMessage: string = '¡Bienvenido al dashboard!';
  mostrarModal: boolean = false;
  modalData: ModalData[] = [];
  modal: ModalData;

  banner: Banner;
  constructor() {
    this.banner = { titulo: '', descripcion: ''};
    this.modal = { id:0, titulo: '', descripcion: '', status: false};
    this.loadData();
    this.loadModal();

  }
  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
  async loadData() {
    const { data, error } = await supabase.from('BANNER').select('*');
    if (data) {
      this.banner.titulo = data[0].titulo;
      this.banner.descripcion = data[0].descripcion;
    } else {
      console.error(error);
    }
  }
  async loadModal() {
    const { data, error } = await supabase.from('VENTANA_EMERGENTE').select('*');
    if (data) {
      this.modalData = data;
      this.modal.titulo = data[0].titulo;
      this.modal.descripcion = data[0].descripcion;
      this.modal.status = data[0].status;
      if(this.modal.status){
        this.mostrarModal = true;
      }else{
        this.mostrarModal = false;
      }
    } else {
      console.error(error);
    }
  }
}
