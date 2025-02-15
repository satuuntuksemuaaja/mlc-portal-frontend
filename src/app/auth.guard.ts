import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AgentService } from './services/agent.service';
import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';
import { Agents } from './stores/agent.repository';
import { PopupService } from './services/popup.service';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navService: NavigationService,
    private agentService: AgentService,
    private popupService: PopupService,
    private msalService: MsalService
  ) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userId = this.authService.getUserId();

    const isLoggedIn = this.msalService.instance.getAllAccounts().length > 0;

    if (!isLoggedIn) {
      this.popupService.setPopup({title: 'Run Logged-Out', confirm: true});
    }

    if (!userId) {
      this.navService.navigateForward('invalid-organisation', true);
      return false;
    }
    else{
      this.authService.getUserDetails().subscribe({
      next: (data) => {
        const currentUser = data;
        this.agentService.getAllAgents().subscribe({
          next: (agents: Agents) => {
            const foundUser = agents.agents.find((agent) => currentUser.me.email === agent.email);
            if (foundUser.status === 'archived' || foundUser.status === 'cancel' || !foundUser) {
              this.navService.navigateForward('/invalid-user', true);
              return false;
            }
          },
          error: (err) => {
            this.navService.navigateForward('/invalid-user', true);
            return false;
          }
        });
      },
      error: (err) => {
        this.navService.navigateForward('/invalid-user', true);
        return false;
      }
    });
    }
    return true;
  }
}
