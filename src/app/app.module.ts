import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AddDestinationComponent} from './add-destination/add-destination.component';
import {EditDestinationComponent} from './edit-destination/edit-destination.component';
import {DeleteDestinationComponent} from './delete-destination/delete-destination.component';
import {RouterModule} from "@angular/router";
import {DestinationsComponent} from './destinations/destinations.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Service} from "./app.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    AddDestinationComponent,
    EditDestinationComponent,
    DeleteDestinationComponent,
    DestinationsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot([
      {path: '', component: WelcomePageComponent},
      {path: 'destinations', component: DestinationsComponent},
      {path: 'add', component: AddDestinationComponent},
      {path: 'edit', component: EditDestinationComponent},
      {path: 'delete', component: DeleteDestinationComponent},
    ]),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule {
}
