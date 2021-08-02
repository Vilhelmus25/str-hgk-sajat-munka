import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { UsersComponent } from './pages/users/users.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    AdminComponent,
    LoginComponent,
    NavigationComponent,
    UsersComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [      // itt meg kell adni a provide-ot mint szolgáltatót; Ez fontos, hogy be legyen állítva
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }    // a multi azt jelenti, hogy többet is fel lehet venni, nem csak egyet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
