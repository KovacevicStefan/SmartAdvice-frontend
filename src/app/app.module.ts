import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { EmailComponent } from './components/email/email.component';
import { EmailService } from './service/email.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'material.module';
import { EmailDialogComponent } from './components/dialog/email-dialog/email-dialog.component';
import { NewsComponent } from './components/news/news.component';
import { NewsService } from './service/news.service';
import { NewsDetailedComponent } from './components/news-detailed/news-detailed.component';
import { NewsDialogComponent } from './components/dialog/news-dialog/news-dialog.component';
import { NewsManageComponent } from './components/news-manage/news-manage.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { ServicesService } from './service/services.service';
import { LoginGuard } from './login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordDialogComponent } from './components/dialog/password-dialog/password-dialog.component';
import { CommentDialogComponent } from './components/dialog/comment-dialog/comment-dialog.component';
import { ServicesManageComponent } from './components/services-manage/services-manage.component';
import { ServicesDialogComponent } from './components/dialog/services-dialog/services-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactPageComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'email', component: EmailComponent, canActivate: [AuthGuard]},
  { path: 'blog', component: NewsComponent},
  { path: 'blog/:naslov', component: NewsDetailedComponent},
  { path: 'news', component: NewsManageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'services-manage', component: ServicesManageComponent, canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ContactComponent,
    ContactPageComponent,
    ServicesComponent,
    ContactFormComponent,
    EmailComponent,
    EmailDialogComponent,
    NewsComponent,
    NewsDetailedComponent,
    NewsManageComponent,
    NewsDialogComponent,
    LoginComponent,
    ProfileComponent,
    PasswordDialogComponent,
    CommentDialogComponent,
    ServicesManageComponent,
    ServicesDialogComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    NewsService,
    EmailService,
    ServicesService,
    RouterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
