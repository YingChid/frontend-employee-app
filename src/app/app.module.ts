import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatTableModule } from '@angular/material/table';

import { LoadingScreenInterceptor } from './interceptors/loading.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { UserserviceService} from './services/userservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { ToastrModule } from 'ngx-toastr';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    AddEmployeeComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  },UserserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
