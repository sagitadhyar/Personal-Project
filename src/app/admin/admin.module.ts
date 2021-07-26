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
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierDetailComponent } from './supplier/supplier-detail/supplier-detail.component';
import { PermintaanComponent } from './permintaan/permintaan.component';
import { PermintaanDetailComponent } from './permintaan/permintaan-detail/permintaan-detail.component';
import { PembelianComponent } from './pembelian/pembelian.component';
import { PembelianDetailComponent } from './pembelian/pembelian-detail/pembelian-detail.component';
import { PengirimanComponent } from './pengiriman/pengiriman.component';
import { PengirimanDetailComponent } from './pengiriman/pengiriman-detail/pengiriman-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'barang',
        component: BarangComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pegawai',
        component: PegawaiComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'supplier',
        component: SupplierComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'permintaan',
        component: PermintaanComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pembelian',
        component: PembelianComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pengiriman',
        component: PengirimanComponent,
        canActivate: [AuthGuard]
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
    PegawaiDetailComponent,
    SupplierComponent,
    SupplierDetailComponent,
    PermintaanComponent,
    PermintaanDetailComponent,
    PembelianComponent,
    PembelianDetailComponent,
    PengirimanComponent,
    PengirimanDetailComponent
  ],
  providers: [AuthGuard],
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
