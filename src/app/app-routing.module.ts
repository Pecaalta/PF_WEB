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
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { NewsPublicListComponent } from './pages/news-public-list/news-public-list.component';
import { DraftSeeComponent } from './pages/draft-see/draft-see.component';
import { FilterCreateComponent } from './pages/filter-create/filter-create.component';
import { FilterListComponent } from './pages/filter-list/filter-list.component';
import { NewletterFormComponent } from './pages/newletter-form/newletter-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  // Visitante
  { path: '', pathMatch:'full', redirectTo: 'home' },
  { path: 'home',                     component: HomeComponent,           },
  { path: 'login',                    component: LoginComponent,          canActivate:[AuthGuard] },
  { path: 'registry',                 component: RegistryComponent,       canActivate:[AuthGuard] },
  { path: 'news',                     component: NewsPublicListComponent, canActivate:[AuthGuard] },
  { path: 'news/new',                 component: RegistryComponent,       canActivate:[AuthGuard] },
  { path: 'news/:id',                 component: NewComponent,            },
  { path: 'legal',                    component: DraftNewComponent,       canActivate:[AuthGuard] },
  { path: 'profile',                  component: ProfileComponent,         },
  // Emprendedor
  { path: 'user/draft',               component: DraftListComponent,      canActivate:[AuthGuard] },
  { path: 'user/draft/new',           component: DraftNewComponent,       canActivate:[AuthGuard] },
  { path: 'user/draft/edit/:id',      component: DraftNewComponent,       canActivate:[AuthGuard] },
  { path: 'user/draft/:id',           component: DraftSeeComponent,       canActivate:[AuthGuard] },
  { path: 'user/chat',                component: ChatComponent,           canActivate:[AuthGuard] },
  // Admin
  { path: 'admin/draft',              component: DraftListAdminComponent, canActivate:[AuthGuard] },
  { path: 'admin/draft/:id',          component: DraftNewComponent,       canActivate:[AuthGuard] },
  { path: 'admin/chat',               component: ChatComponent,           canActivate:[AuthGuard] },
  { path: 'admin/report',             component: ReportComponent,         canActivate:[AuthGuard] },
  { path: 'admin/filters',            component: FilterListComponent,     canActivate:[AuthGuard] },
  { path: 'admin/filters/create',     component: FilterCreateComponent,   canActivate:[AuthGuard] },
  { path: 'admin/filters/:id',        component: FilterCreateComponent,   canActivate:[AuthGuard] },
  { path: 'admin/newletter',          component: NewletterFormComponent,  canActivate:[AuthGuard] },
  { path: 'admin/newletter/create',   component: NewletterFormComponent,  canActivate:[AuthGuard] },
  { path: 'admin/newletter/:id',      component: NewletterFormComponent,  canActivate:[AuthGuard] },
  { path: 'admin/news',               component: NewsListComponent,       canActivate:[AuthGuard] },
  { path: 'admin/news/create',        component: NewsCreateComponent,     canActivate:[AuthGuard] },
  { path: 'admin/news/:id',           component: NewsCreateComponent,     canActivate:[AuthGuard] },
  { path: 'admin/user',              component: UserListComponent,       canActivate:[AuthGuard] },
  { path: 'admin/user/:id',           component: ProfileComponent,        canActivate:[AuthGuard] },
  // Errores
  { path: '401',                      component: Error401Component },
  { path: '404',                      component: Error404Component },
  { path: '**',                       component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
