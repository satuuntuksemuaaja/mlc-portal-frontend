import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then((m) => m.ClientsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'files',
    loadChildren: () => import('./modules/files/files.module').then((m) => m.FilesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./modules/messages/messages.module').then((m) => m.MessagesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./modules/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardPageModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./modules/administration/administration.module').then((m) => m.AdministrationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./modules/auth/signup/signup.module').then((m) => m.SignupPageModule)
  },
  {
    path: 'system-down',
    loadChildren: () =>
      import('./modules/system/system-down/system-down.module').then((m) => m.SystemDownPageModule)
  },
  {
    path: 'invalid-organisation',
    loadChildren: () =>
      import('./modules/auth/invalid-organisation/invalid-organisation.module').then(
        (m) => m.InvalidOrganisationPageModule
      )
  },
  {
    path: 'invalid-user',
    loadChildren: () =>
      import('./modules/auth/invalid-user/invalid-user.module').then(
        (m) => m.InvalidUserModule
      )
  },
  {
    path: 'agent-settings',
    loadChildren: () =>
      import('./modules/agent-settings/agent-settings.module').then(
        (m) => m.AgentSettingsPageModule
      ),
    canActivate: [AuthGuard]
  }
];
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
