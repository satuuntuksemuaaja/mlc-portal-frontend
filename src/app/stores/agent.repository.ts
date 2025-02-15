import { Injectable } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import { Observable } from 'rxjs';

export interface Agents {
  agents: Agent[];
}

export interface Agent {
  created: string;
  email: string;
  id: string;
  name: string;
  roleId: string;
  status: string;
  phone: string;
}

export interface AgentProps {
  agents: Agents;
}

@Injectable({ providedIn: 'root' })
export class AgentRepository {
  public store: Store = null;
  public agents$: Observable<Agents> = null;

  constructor() {
    this.init();
  }

  setAgentInfo(agents: Agents) {
    this.store.update(() => ({
      agents
    }));
  }

  private init() {
    this.store = this.createStore();
    this.agents$ = this.store.pipe(select((state) => state.agents));
  }

  private createStore() {
    const store = createStore({ name: 'agents' }, withProps<Agents>({ agents: null }));
    return store;
  }
}
