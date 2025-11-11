import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { Contato, ContatoService } from '../services/firebase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonInput]
})
export class AdicionarContatoPage implements OnInit {

  contatos: Contato[] = [];
  contato: Contato = { nome: '', email: '' };

  constructor(private contatoService: ContatoService,
              private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  this.contatoService.getContatos().subscribe(contatos => {
    console.log('🔥 Dados do Firestore:', contatos);
    this.contatos = contatos;
  });
}
  

  async salvarContato() {
    if (!this.contato.nome || !this.contato.email) {
      this.showToast('Preencha todos os campos!');
      return;
    }

    try {
      if (this.contato.id) {
        await this.contatoService.updateContato(this.contato);
        this.showToast('Contato atualizado com sucesso!');
      } else {
        await this.contatoService.addContato(this.contato);
        this.showToast('Contato adicionado com sucesso!');
      }
      this.contato = { nome: '', email: '' }; // limpa o formulário
    } catch (error) {
      console.error(error);
      this.showToast('Erro ao salvar contato.');
    }
  }

  editarContato(c: Contato) {
    this.contato = { ...c }; // clona o contato para edição
  }

  async excluirContato(id: string | undefined) {
    if (!id) return;
    if (confirm('Deseja realmente excluir este contato?')) {
      await this.contatoService.deleteContato(id);
      this.showToast('Contato excluído.');
    }
  }

  cancelarEdicao() {
    this.contato = { nome: '', email: '' };
  }

  private async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
