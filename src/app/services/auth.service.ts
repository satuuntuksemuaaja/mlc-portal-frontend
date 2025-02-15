import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientsRepository } from '../stores/clients.repository';
import { UserDetails, UserRepository } from '../stores/user.repository';
import API_ENDPOINTS from './api-endpoints';
import { UtilityService } from './utility.service';

const mockAPIKeys: string[] = [
  'ZAqyuuB77cTBY/Z5p0b3q3+10fo=B77cTBY/Z5p0b3',
  'WEksdjkfsdkf=sdfksdniklf+dsfhjsdklfjsdfldd',
  'zgG7KHzPUjIjt1OMPRrj0mb3q3+10fo=B77cTBYp0b'
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentSettings: any;
  private readonly baseUrl = environment.baseUrl;
  constructor(
    private userRepo: UserRepository,
    private http: HttpClient,
    private msalService: MsalService,
    private utilityService: UtilityService,
    private clientsRepo: ClientsRepository
  ) {}

  checkSystemDown() {
    return this.http.get(this.baseUrl + API_ENDPOINTS.checkSystemDown);
  }

  getToken() {
    return this.userRepo.store.state?.token;
  }

  getUserId() {
    // eslint-disable-next-line no-underscore-dangle
    return this.userRepo.store.state?.user?._id;
  }

  getTokenExpiry() {
    return this.userRepo.store.state?.tokenExpiry;
  }

  async checkAPIKey(apiKey: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isAvailable = mockAPIKeys.indexOf(apiKey) > -1;
        if (isAvailable) {
          return resolve({
            result: 'ok'
          });
        } else {
          return reject({
            result: 'failed'
          });
        }
      }, 4000);
    });
  }

  getUserDetails() {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.me}`).pipe(
      map((response: UserDetails) => {
        if (response) {
          this.userRepo.updateUserDetails(response);
        }
        return response;
      })
    );
  }

  getUserProfileImage() {
    return this.http
      .get(`${this.baseUrl}${API_ENDPOINTS.getPhoto}`, {
        responseType: 'arraybuffer'
      })
      .pipe(
        map((response) => {
          if (response.byteLength > 0) {
            const blob = new Blob([new Uint8Array(response)]);
            const blobUrl = URL.createObjectURL(blob);
            this.userRepo.updateUserImages({ photo: blobUrl });
            return blobUrl;  
          }else {
            this.userRepo.updateUserImages({ photo: 'assets/images/person-circle-outline.png' });
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            this.userRepo.updateUserImages({ photo: 'assets/images/person-circle-outline.png' });
          }
          return throwError(() => error);
        })
      );
  }

  async refreshToken() {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (activeAccount) {
      return this.storeToken(activeAccount);
    }
  }

  updateUserInformaiton({ name, phone }: { name: string; phone: string }) {
    return this.http
      .put(`${environment?.baseUrl}${API_ENDPOINTS.me}`, {
        name,
        phone
      })
      .pipe(
        map((res: UserDetails) => {
          this.userRepo.updateUserDetails(res);
          return res;
        })
      );
  }

  updateUserPhoto({ thumb }: { thumb: string }) {
    return this.http
      .put(
        `${environment?.baseUrl}${API_ENDPOINTS.mePhotoUpdate}`,
        {
          thumb
        },
        {
          responseType: 'arraybuffer'
        }
      )
      .pipe(
        map((response) => {
          const blob = new Blob([new Uint8Array(response)]);
          const blobUrl = URL.createObjectURL(blob);
          this.userRepo.updateUserImages({ photo: blobUrl });
          return blobUrl;
        }),
        catchError((error) => {
          if (error.status === 404) {
            this.userRepo.updateUserImages({ photo: 'assets/images/person-circle-outline.png' });
          }
          return throwError(() => error);
        })
      );
  }

  private storeToken(activeAccount) {
    const accessTokenRequest = {
      scopes: [],
      account: activeAccount,
      redirectUri: '/',
      authority: environment?.b2cPolicies.authorities.signUpSignIn.authority,
      forceRefresh: true
    };
    return new Promise((res, rej) => {
      this.msalService.acquireTokenSilent(accessTokenRequest).subscribe({
        next: (data) => {
          let expiryTime = null;
          if ((data?.idTokenClaims as any)?.exp > 0) {
            expiryTime = (data?.idTokenClaims as any)?.exp * 1000;
          } else {
            expiryTime = new Date().setHours(new Date().getHours() + 1);
          }
          this.userRepo.updateToken(data.idToken, parseInt(expiryTime, 10));
          res(true);
        },
        error: (e) => {
          if (e.name === 'InteractionRequiredAuthError') {
            this.userRepo.removeUser();
            this.clientsRepo.clear();
            this.msalService.logout().subscribe(() => {});
          }
          // console.error(e);
          rej(e);
        }
      });
    });
  }

  private getUrl(baseG4: string) {
    const blob = this.utilityService.b64toBlob(baseG4);
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
}
