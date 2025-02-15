import { Injectable } from '@angular/core';
import { createStore, select, Store, withProps } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Observable } from 'rxjs';

export interface Activity {
  id: string;
  title: string;
  name: string;
  agentId: string;
  clientId: string;
  message: string;
  section: string;
  created: Date;
  read: boolean;
}

export interface ActivityList {
  activities: Activity[];
  total: number;
}

export interface ActivityProps {
  loading: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ActivityRepository {
  public activity$: Observable<Activity[]>;
  public loading$: Observable<boolean>;
  public store: Store = null;

  constructor() {
    this.init();
  }

  setActivity(activity: Activity[]) {
    this.store.update(setEntities(activity));
  }

  addActivity(activity: Activity[]) {
    this.store.update(addEntities(activity));
  }

  updateActivity(id: Activity['id'], activity: Partial<Activity>) {
    this.store.update(updateEntities(id, activity));
  }

  deleteActivity(id: Activity['id']) {
    this.store.update(deleteEntities(id));
  }

  setLoading(status: boolean) {
    this.store.update((state) => ({
      ...state,
      loading: status
    }));
  }

  clear() {
    this.store.destroy();
  }

  private init() {
    this.store = this.createStore();
    persistState(this.store, {
      key: 'activity',
      storage: localStorageStrategy
    });
    this.activity$ = this.store.pipe(selectAllEntities());
    this.loading$ = this.store.pipe(select((state) => state?.loading));
  }

  private createStore(): typeof store {
    const store = createStore(
      { name: 'activity' },
      withProps<ActivityProps>({ loading: false }),
      withEntities<Activity, 'id'>({ idKey: 'id' })
    );
    return store;
  }
}
