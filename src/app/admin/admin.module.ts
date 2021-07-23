import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { BarangComponent } from './barang/barang.component';
import { MaterialDesign } from '../material/material';
import { BarangDetailComponent } from './barang/barang-detail/barang-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PegawaiComponent } from './pegawai/pegawai.component';
import { PegawaiDetailComponent } from './pegawai/pegawai-detail/pegawai-detail.component';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'barang',
        component: BarangComponent
      },
      {
        path: 'pegawai',
        component: PegawaiComponent
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo:'/admin/dashboard'
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    BarangComponent,
    BarangDetailComponent,
    PegawaiComponent,
    PegawaiDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialDesign,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
