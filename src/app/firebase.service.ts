import { Injectable } from '@angular/core';
import { Database, ref, set, push, remove, onValue, update } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Contato {
  id?: string;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContatoService {

  private dbPath = 'contatos';

  constructor(private db: Database) {}

  getContatos(): Observable<Contato[]> {
    return new Observable((observer) => {
      const contatosRef = ref(this.db, this.dbPath);

      onValue(contatosRef, (snapshot) => {
        const data = snapshot.val();
        const lista: Contato[] = data
          ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
          : [];

        observer.next(lista);
      });
    });
  }

  addContato(contato: Contato) {
    const contatosRef = ref(this.db, this.dbPath);
    const novoRef = push(contatosRef);
    return set(novoRef, contato);
  }

  updateContato(contato: Contato) {
    const contatoRef = ref(this.db, `${this.dbPath}/${contato.id}`);
    return update(contatoRef, { nome: contato.nome, email: contato.email });
  }

  deleteContato(id: string) {
    const contatoRef = ref(this.db, `${this.dbPath}/${id}`);
    return remove(contatoRef);
  }
}