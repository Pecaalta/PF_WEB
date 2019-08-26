import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

// Pipes
import { PrintDateStringPipe } from './pipes/print-date-string.pipe';
import { PrintImgPipe } from './pipes/print-img.pipe';

// Componentes
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardNewComponent } from './components/card-new/card-new.component';
import { SectionNewsComponent } from './components/section-news/section-news.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MessageComponent } from './components/message/message.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatUserComponent } from './components/chat-user/chat-user.component';
import { environment } from 'src/environments/environment';
import { ModalChatFilterComponent } from './components/modal-chat-filter/modal-chat-filter.component';

// Paginas
import { NewComponent } from './pages/new/new.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { DraftListComponent } from './pages/draft-list/draft-list.component';
import { DraftNewComponent } from './pages/draft-new/draft-new.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DraftListAdminComponent } from './pages/draft-list-admin/draft-list-admin.component';
import { ReportComponent } from './pages/report/report.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error401Component } from './pages/error401/error401.component';

// FireBase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from 'angularfire2';

// Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    CardNewComponent,
    SectionNewsComponent,
    ChatBoxComponent,
    MessageComponent,
    NewComponent,
    LoginComponent,
    RegistryComponent,
    NewsListComponent,
    HomeComponent,
    ChatComponent,
    DraftListComponent,
    DraftNewComponent,
    ProfileComponent,
    DraftListAdminComponent,
    ReportComponent,
    PrintDateStringPipe,
    PrintImgPipe,
    ChatMessageComponent,
    ChatUserComponent,
    ModalChatFilterComponent,
    Error404Component,
    Error401Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // Angular material
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  entryComponents: [ 
    ModalChatFilterComponent
  ]
})
export class AppModule { }
