/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { FileTypes } from '../interfaces/File.interface';
import { SimpleCacheService } from '../utils/simple-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentStorageService {
  private localCache: SimpleCacheService = new SimpleCacheService(1000 * 60 * 60 * 24); // 1 day

  constructor() {}

  public addFile(fileData: any, fileId: string, clientId: string, fileType: FileTypes) {
    this.localCache.put(fileData, fileId, clientId, fileType);
  }

  public getFile(clientId: string, fileId: string) {
    return this.localCache.get(clientId, fileId);
  }

  public clearAll() {
    this.localCache.clear();
  }
}
