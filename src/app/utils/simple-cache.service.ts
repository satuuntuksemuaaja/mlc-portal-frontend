import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { FileTypes } from '../interfaces/File.interface';

export class SimpleCacheService {
  private cache = new Map<string, Map<string, SimpleCacheItem>>();
  private sidebar = new SideBarComponent();
  constructor(private cacheValidity: number) {}

  clear() {
    this.cache.clear();
  }

  checkUser(clientId: string) {
    return this.cache.has(clientId);
  }

  getClientData(clientId: string) {
    return this.cache.get(clientId);
  }

  getClientFile(data: Map<string, SimpleCacheItem>, fileId: string) {
    return data.get(fileId);
  }

  get(clientId: string, fileId: string): Promise<SimpleCacheItem> {
    return new Promise((resolve, reject) => {
      if (this.checkUser(clientId)) {
        const item = this.getClientData(clientId);
        const file = this.getClientFile(item, fileId);
        if (!file?.expired()) {
          resolve(file);
        } else {
          item.delete(fileId);
        }
      } else {
        reject(undefined);
      }
    });
  }

  put(value: any, fileId: string, clientId: string, fileType: FileTypes) {
    if (this.cache.has(clientId)) {
      const item = new SimpleCacheItem(this.cacheValidity);
      item.registered = Date.now();
      item.id = fileId;
      item.value = value;
      this.getClientData(clientId).set(fileId, item);
    } else {
      const item = new SimpleCacheItem(this.cacheValidity);
      item.registered = Date.now();
      item.id = fileId;
      item.value = value;
      item.type = fileType;
      const data = new Map<string, SimpleCacheItem>();
      data.set(fileId, item);
      this.cache.set(clientId, data);
    }
  }
}

export class SimpleCacheItem {
  id: string;
  value: any;
  registered: number;
  type: FileTypes;
  constructor(private ttl: number) {}
  expired() {
    return Date.now() - this.registered > this.ttl;
  }
}
