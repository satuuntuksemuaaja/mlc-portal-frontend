import { Injectable } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../interfaces/clients.interface';

export interface ClientsProps {
  active: Client[];
  archived: Client[];
  cancelled: Client[];
  pending: Client[];
}

@Injectable({ providedIn: 'root' })
export class ClientsRepository {
  public clients$: Observable<ClientsProps> = null;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private store: Store = null;

  constructor() {
    this.init();
  }

  setClients(clients: ClientsProps) {
    this.store.update(() => ({
      ...clients
    }));
  }

  setLoading(status: boolean) {
    this.loading$.next(status);
  }

  setActiveClients(clients: { active: Client[] }) {
    this.store.update(() => ({
      ...clients
    }));
  }
  clear() {
    this.store.update(() => ({
      active: [],
      archived: [],
      cancelled: []
    }));
  }
  private init() {
    this.store = this.createStore();
    persistState(this.store, {
      key: 'clients',
      storage: localStorageStrategy
    });
    this.clients$ = this.store.pipe(select((state) => state));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'clients' },
      withProps<ClientsProps>({
        active: [],
        archived: [],
        cancelled: [],
        pending: []
      })
    );
    return store;
  }
}
