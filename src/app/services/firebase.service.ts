import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Contato {
  id?: string;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private collectionName = 'contatos';

  constructor(private firestore: Firestore) {}

  getContatos(): Observable<Contato[]> {
    const contatosRef = collection(this.firestore, this.collectionName);
    return collectionData(contatosRef, { idField: 'id' }) as Observable<Contato[]>;
  }

  addContato(contato: Contato) {
    const contatosRef = collection(this.firestore, this.collectionName);
    return addDoc(contatosRef, contato);
  }

  updateContato(contato: Contato) {
    const contatoRef = doc(this.firestore, `${this.collectionName}/${contato.id}`);
    const contatoData = { nome: contato.nome, email: contato.email };
    return updateDoc(contatoRef, contatoData as any);
  }

  deleteContato(id: string) {
    const contatoRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(contatoRef);
  }
}
