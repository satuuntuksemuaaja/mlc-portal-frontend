import { createStore } from '@ngneat/elf';

export class MlcRepository {
  private store;

  constructor() {
    this.store = this.createStore();
  }

  private createStore(): typeof store {
    const store = createStore({ name: 'mlc' });

    return store;
  }
}
