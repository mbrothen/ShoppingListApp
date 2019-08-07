import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PantryListComponent } from './pantry-list/pantry-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';
import { ErrorComponent } from './error.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { FormsModule } from '@angular/forms';
import { RestCallService } from './rest-call.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './popup/popup.component';

const appRoutes: Routes = [
  { path:   'pantry-list', component: PantryListComponent },
  { path:   'shopping-list', component: ShoppingListComponent },
  { path:   'user-create', component: UserCreateComponent},
  { path:   'login', component: LoginComponent },
  { path:   'create-user', component: UserCreateComponent},
  { path:   'create-item', component: ItemCreateComponent},
  { path: '', redirectTo: '/login',

  pathMatch:  'full'
},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShoppingListComponent,
    PantryListComponent,
    UserCreateComponent,
    ErrorComponent,
    ItemCreateComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MyMaterialModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    HttpClientModule,
    
    
  ],
  entryComponents: [ErrorComponent, PopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
