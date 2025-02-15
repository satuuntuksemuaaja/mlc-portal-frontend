/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import API_ENDPOINTS from './api-endpoints';
import { AuthService } from './auth.service';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly baseUrl = environment.baseUrl;
  private readonly token = this.authService.getToken();
  header = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  constructor(private http: HttpClient, private authService: AuthService) {}

  /*** Downloads an attachment
   * @param clientId the client
   * @param itemId  the meeco item id of the attachment
   * @param attachmentId the meeco attachment id
   */
  getAttachment(clientId: string, itemId: string, attachmentId: string) {
    const attachmentUrl = API_ENDPOINTS.downloadAttachment
      .replace('{clientId}', clientId)
      .replace('{itemId}', itemId)
      .replace('{attachmentId}', attachmentId);

    return this.http
      .get(`${this.baseUrl}${attachmentUrl}`, {
        responseType: 'arraybuffer'
      })
      .pipe(
        map((response) => {
          const blob = new Blob([new Uint8Array(response)]);
          //const blobUrl = URL.createObjectURL(blob);
          // this.userRepo.updateUserImages({ photo: blobUrl });
          return blob;
        }),
        catchError((error) => {
          if (error.status === 404) {
            // this.userRepo.updateUserImages({ photo: 'assets/images/person-circle-outline.png' });
          }
          return throwError(() => error);
        })
      );
  }

  getClientFiles(clientId: string, direction: string) {
    return this.http.get(`${this.baseUrl}/api/items/${clientId}/${direction}`, {
      headers: this.header
    });
  }

  createItem(clientId: string, body: { name: string; notes: string }) {
    return this.http.post(`${this.baseUrl}/api/item/create/${clientId}`, body);
  }

  sendFile(clientId: string, itemId: string, file) {
    const formData: FormData = new FormData();
    formData.append('0', file, file.name);
    return this.http.post(`${this.baseUrl}/api/item/attach/${clientId}/${itemId}`, formData);
  }

  completeSendFile(clientId: string, itemId: string, body = '') {
    return this.http.post(`${this.baseUrl}/api/item/complete/${clientId}/${itemId}`, body);
  }

  cleanUpFiles(clientId: string, itemId: string) {
    return this.http.get(`${this.baseUrl}/api/item/cleanup/${clientId}/${itemId}`);
  }
}
