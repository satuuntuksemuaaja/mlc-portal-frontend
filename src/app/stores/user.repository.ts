import { Injectable } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';
export interface User {
  _id: string;
  name: string;
  sub: string;
  givenName: string;
  familyName: string;
  localAccountId: string;
  email: string;
  accessLevel: string;
  photo: string;
}

export interface UserDetails {
  me: {
    email: string;
    name: string;
    role: string;
    phone: string;
  };
  org: {
    name: string;
  };
}

export interface UserImages {
  photo: string;
  orglogo: string;
}

export interface UserProps {
  user: User;
  token: string;
  userDetails: UserDetails;
  tokenExpiry: number;
  userImages: UserImages;
}
@Injectable({ providedIn: 'root' })
export class UserRepository {
  public user$: Observable<User>;
  public userDetails$: Observable<UserDetails>;
  public userImages$: Observable<UserImages>;
  public token$: Observable<string>;
  public store: Store = null;

  constructor() {
    this.init();
  }

  setUser(user: User) {
    this.store.update((state) => ({
      ...state,
      user
    }));
  }

  updateUser(user: User) {
    this.store.update((state) => ({
      ...state,
      user
    }));
  }

  updateToken(token: string, expiration: number) {
    this.store.update((state) => ({
      ...state,
      token,
      tokenExpiry: expiration
    }));
  }

  updateUserDetails(userDetails: UserDetails) {
    this.store.update((state) => ({
      ...state,
      userDetails
    }));
  }

  updateUserImages({ photo, orglogo }: { photo: string; orglogo?: string }) {
    this.store.update((state) => ({
      ...state,
      userImages: {
        photo,
        orglogo
      }
    }));
  }

  removeUser() {
    this.store.update(() => ({
      user: null,
      token: null,
      userDetails: null,
      tokenExpiry: null,
      userImages: null
    }));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'user' },
      withProps<UserProps>({
        user: null,
        token: null,
        userDetails: null,
        tokenExpiry: 0,
        userImages: null
      })
    );
    return store;
  }

  private init() {
    this.store = this.createStore();
    persistState(this.store, {
      key: 'user',
      storage: localStorageStrategy
    });
    this.user$ = this.store.pipe(select((state) => state.user));
    this.userDetails$ = this.store.pipe(select((state) => state.userDetails));
    this.userImages$ = this.store.pipe(select((state) => state.userImages));
    this.token$ = this.store.pipe(select((state) => state.token));
  }
}
