import { Injectable } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import { Observable } from 'rxjs';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
export interface Organisation {
  logo: string;
  org: {
    name: string;
    phone?: string;
    primaryDomain: string;
    status: string;
    websiteUrl: string;
    key: string;
    logoThumbnail: string;
    thumb?: string;
    id: string;
    welcomeMessageTemplate?: string;
  };
  security: {
    roles: Role[];
  };
}

export interface Role {
  roleId: string;
  role: string;
}

export interface OrgProps {
  org: Organisation;
}

@Injectable({ providedIn: 'root' })
export class OrgRepository {
  public org$: Observable<Organisation> = null;
  public store: Store = null;

  constructor() {
    this.init();
  }

  setOrgInfo(org: Organisation) {
    this.store.update((state) => ({
      ...state,
      org: {
        ...state.org,
        ...org
      }
    }));
  }

  updateOrgInfo(org: Organisation) {
    this.store.update((state) => ({
      ...state,
      org: {
        ...state.org,
        ...org
      }
    }));
  }

  removeOrgInfo() {
    this.store.update(() => ({
      org: null
    }));
  }

  setOrgLogo(logo: string) {
    this.store.update((state) => ({
      ...state,
      org: {
        ...state.org,
        logo
      }
    }));
  }

  private init() {
    this.store = this.createStore();
    persistState(this.store, {
      key: 'org',
      storage: localStorageStrategy
    });
    this.org$ = this.store.pipe(select((state) => state.org));
  }

  private createStore() {
    const store = createStore({ name: 'org' }, withProps<OrgProps>({ org: null }));
    return store;
  }
}
