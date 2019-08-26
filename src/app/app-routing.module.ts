import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Paginas
import { NewsListComponent } from './pages/news-list/news-list.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DraftListComponent } from './pages/draft-list/draft-list.component';
import { DraftNewComponent } from './pages/draft-new/draft-new.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewComponent } from './pages/new/new.component';
import { ReportComponent } from './pages/report/report.component';
import { DraftListAdminComponent } from './pages/draft-list-admin/draft-list-admin.component';
import { ChatComponent } from './pages/chat/chat.component';
import { Error401Component } from './pages/error401/error401.component';
import { Error404Component } from './pages/error404/error404.component';

// Guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Visitante
  { path: '', pathMatch:'full', redirectTo: '404' },
  { path: 'home',             component: HomeComponent,           canActivate:[AuthGuard] },
  { path: 'login',            component: LoginComponent,          canActivate:[AuthGuard] },
  { path: 'registry',         component: RegistryComponent,       canActivate:[AuthGuard] },
  { path: 'news',             component: NewsListComponent,       canActivate:[AuthGuard] },
  { path: 'news/new',         component: RegistryComponent,       canActivate:[AuthGuard] },
  { path: 'news/:id',         component: NewComponent,            canActivate:[AuthGuard] },
  { path: 'legal',            component: DraftNewComponent,       canActivate:[AuthGuard] },
  // Emprendedor
  { path: 'user/draft',       component: DraftListComponent,      canActivate:[AuthGuard] },
  { path: 'user/draft/new',   component: DraftNewComponent,       canActivate:[AuthGuard] },
  { path: 'user/draft/:id',   component: ProfileComponent,        canActivate:[AuthGuard] },
  { path: 'user/chat',        component: ChatComponent,           canActivate:[AuthGuard] },
  // Admin
  { path: 'admin/draft',      component: DraftListAdminComponent, canActivate:[AuthGuard] },
  { path: 'admin/chat',       component: ChatComponent,           canActivate:[AuthGuard] },
  { path: 'admin/report',     component: ReportComponent,         canActivate:[AuthGuard] },
  { path: 'admin/user/:id',   component: ProfileComponent,        canActivate:[AuthGuard] },
  // Errores
  { path: '401',              component: Error401Component },
  { path: '404',              component: Error404Component },
  { path: '**',              component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
