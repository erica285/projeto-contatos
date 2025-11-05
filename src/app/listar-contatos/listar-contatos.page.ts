import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.page.html',
  styleUrls: ['./listar-contatos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarContatosPage implements OnInit {
  usuarios: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() : void{
      this.apiService.getUsers().subscribe(res => {
      this.usuarios = res;
  });
}
}
