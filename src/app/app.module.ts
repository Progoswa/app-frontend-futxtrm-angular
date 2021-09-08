
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login-components/login/login.component';
import { RecuperarPasswordComponent } from './login-components/recuperar-password/recuperar-password.component';
import { RegistroComponent } from './registro-components/registro/registro.component';
import { RegistroClienteComponent } from './registro-components/registro-cliente/registro-cliente.component';
import { RegistroProveedorComponent } from './registro-components/registro-proveedor/registro-proveedor.component';
import { NuevaPasswordComponent } from './login-components/nueva-password/nueva-password.component';
import { NewPasswordSuccesComponent } from './login-components/login-dialogs/new-password-succes/new-password-succes.component';
import { CredencialesInvalidasComponent } from './login-components/login-dialogs/credenciales-invalidas/credenciales-invalidas.component';

import { FacebookWrongComponent } from './login-components/login-dialogs/facebook-wrong/facebook-wrong.component';
import { GoogleWrongComponent } from './login-components/login-dialogs/google-wrong/google-wrong.component';
import { EmailRepeatComponent } from './registro-components/registro-dialogs/email-repeat/email-repeat.component';
import { RegistroSuccessComponent } from './registro-components/registro-dialogs/registro-success/registro-success.component';
import { NoVerificadoComponent } from './login-components/no-verificado/no-verificado.component';
import { EmailResendComponent } from './login-components/login-dialogs/email-resend/email-resend.component';
import { VerificarComponent } from './login-components/verificar/verificar.component';
import { RecuperarPasswordDialogComponent } from './login-components/login-dialogs/recuperar-password-dialog/recuperar-password-dialog.component';
import { RecuperarPasswordFailedDialogComponent } from './login-components/login-dialogs/recuperar-password-failed-dialog/recuperar-password-failed-dialog.component';
import { adminFullComponent } from './admin-layout/admin.full.component';
import { adminHeaderComponent } from './admin-layout/admin-header/admin-header.component';
import { adminSidebarComponent } from './admin-layout/admin-sidebar/admin-sidebar.component';
import { adminBreadcrumbComponent } from './admin-layout/admin-breadcrumb/admin-breadcrumb.component';
import { CustomPaginator } from './CustomPaginatorConfiguration';
import { MatPaginatorIntl } from '@angular/material';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { ModificarComponent } from './globals-dialogs/modificar/modificar.component';
import { AceptarComponent } from './globals-dialogs/aceptar/aceptar.component';
import { ImagenComponent } from './globals-dialogs/imagen/imagen.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { clienteFullComponent } from './cliente-layout/cliente.full.component';
import { clienteBreadcrumbComponent } from './cliente-layout/cliente-breadcrumb/cliente-breadcrumb.component';
import { clienteHeaderComponent } from './cliente-layout/cliente-header/cliente-header.component';
import { clienteSidebarComponent } from './cliente-layout/cliente-sidebar/cliente-sidebar.component';
import { clienteSidebarHorizontalComponent } from './cliente-layout/cliente-sidebar-horizontal/cliente-sidebar-horizontal.component';
import { PedirDatoStringComponent } from './globals-dialogs/pedir-dato-string/pedir-dato-string.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { VimeoMainPipe } from './vimeo.module';
import {  NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EjercicioPipe } from './ejercicio.pipe';
import { ClientCategoriesFreeComponent } from './cliente-components/client-categories-free/client-categories-free.component';
import { NoCategorieComponent } from './cliente-components/no-categorie/no-categorie.component';
import { ChooseStartComponent } from './cliente-components/choose-start/choose-start.component';
const config: SocketIoConfig = { url: environment.URL_SOCKET, options: {} };

const firebaseConfig = {
   apiKey: "AIzaSyA-45fOe6B7Gi-kfhwTPmUkKpLu93IyKu4",
   authDomain: "futxtrm-10181.firebaseapp.com",
   databaseURL: "https://futxtrm-10181.firebaseio.com",
   projectId: "futxtrm-10181",
   storageBucket: "futxtrm-10181.appspot.com",
   messagingSenderId: "641671210436",
   appId: "1:641671210436:web:3a11764ac74ac4387eb091"
 };


 FullCalendarModule.registerPlugins([ // register FullCalendar plugins
   dayGridPlugin,
   interactionPlugin
 ]);


@NgModule({
   declarations: [
      AppComponent,
      FullComponent,
      AppHeaderComponent,
      SpinnerComponent,
      AppSidebarComponent,
      LoginComponent,
      RecuperarPasswordComponent,
      RegistroComponent,
      RegistroClienteComponent,
      RegistroProveedorComponent,
      NuevaPasswordComponent,
      NewPasswordSuccesComponent,
      CredencialesInvalidasComponent,
      FacebookWrongComponent,
      GoogleWrongComponent,
      EmailRepeatComponent,
      RegistroSuccessComponent,
      NoVerificadoComponent,
      EmailResendComponent,
      VerificarComponent,
      RecuperarPasswordDialogComponent,
      RecuperarPasswordFailedDialogComponent,
      adminFullComponent,
      adminHeaderComponent,
      adminSidebarComponent,
      adminBreadcrumbComponent,
      ModificarComponent,
      AceptarComponent, 
      ImagenComponent,
      clienteFullComponent,
      clienteBreadcrumbComponent,
      clienteHeaderComponent,
      clienteSidebarComponent,
      clienteSidebarHorizontalComponent,
      PedirDatoStringComponent,
      ClientCategoriesFreeComponent,
      NoCategorieComponent,
      ChooseStartComponent


   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      DemoMaterialModule,
      FormsModule,
      FlexLayoutModule,
      HttpClientModule,
      SharedModule,
      RouterModule.forRoot(AppRoutes),
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      SocketIoModule.forRoot(config),
      RecaptchaFormsModule,
      RecaptchaModule, 
      FullCalendarModule,
      VimeoMainPipe,
      NgxMatIntlTelInputModule,
      NgxMaterialTimepickerModule,
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: HttpLoaderFactory,
             deps: [HttpClient]
         }
     })
   ],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http,"./assets/i18n/");
}
