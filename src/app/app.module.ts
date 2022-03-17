import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from './stepper/stepper.component';
import { AppRoutingModule } from './app-routing.module';
import { AddGroupComponent } from './groups/add-group/add-group.component';

import { ListGroupComponent } from './groups/list-group/list-group.component'
import { RouterModule, Routes } from '@angular/router';
import { AddSensorComponent } from './sensors/add-sensor/add-sensor/add-sensor.component'

import { ListSensorComponent } from './sensors/list-sensor/list-sensor/list-sensor.component';
import { LoginComponent } from './login/login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ListSensorsComponent } from './groups/add-group/list-sensors/list-sensors.component';

import {EncrDecrService} from './service/encr-decr.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopNavBarComponent } from './shared/top-nav-bar/top-nav-bar.component';
import { BottomNavBarComponent } from './shared/bottom-nav-bar/bottom-nav-bar.component';
import { SideNavBarComponent } from './shared/side-nav-bar/side-nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { ErrorDialogComponent } from './sensors/error-dialog/error-dialog.component';
import { IndexComponent } from './index/index.component';
import { RolesComponent } from './roles/roles.component';
import { LogsComponent } from './logs/logs.component';
import { GroupSensorComponent } from './group-sensor/group-sensor.component';
import { GroupSensorTreeComponent } from './group-sensor-tree/group-sensor-tree.component';


import { ListSensorTypeComponent } from './sensor-type/list-sensor-type/list-sensor-type.component';
import { TestcomComponent } from './testcom/testcom.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './test/table/table.component';
import { AddressFormComponent } from './test/address-form/address-form.component';
import { NavigationComponent } from './test/navigation/navigation.component';
import { Dashboard2Component } from './test/dashboard2/dashboard2.component';
import { TesttreeComponent } from './test/testtree/testtree.component';
import { DragComponent } from './test/drag/drag.component';



@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    AddGroupComponent,
    ListGroupComponent,

    AddSensorComponent,

    ListSensorComponent,

    LoginComponent,

    LoginDialogComponent,

    ListSensorsComponent,

    DeleteDialogComponent,

    SidenavComponent,

    TopNavBarComponent,

    BottomNavBarComponent,

    SideNavBarComponent,

    DashboardComponent,
    SignupComponent,

    SignupDialogComponent,

    ErrorDialogComponent,

    IndexComponent,

    RolesComponent,
    LogsComponent,
    GroupSensorComponent,
    GroupSensorTreeComponent,
   
    ListSensorTypeComponent,
   
    TestcomComponent,
   
    TableComponent,
   
    AddressFormComponent,
   
    NavigationComponent,
   
    Dashboard2Component,
   
    TesttreeComponent,
   
    DragComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    LayoutModule,


  ],
  providers: [EncrDecrService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
