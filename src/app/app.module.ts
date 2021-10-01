import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {HeaderComponent} from './navigation/header/header.component';
import {StopTrainingComponent} from './training/current-training/stop-training/stop-training.component';
import {AuthService} from "./auth/auth.service";
import {TrainingService} from "./training/training.service";
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {SETTINGS} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {UiService} from "./shared/ui.service";
import {AuthModule} from "./auth/auth.module";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./app.reducer";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AuthModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService,
    {provide: SETTINGS, useValue: {appVerificationDisabledForTesting: true}},
  ],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {
}
