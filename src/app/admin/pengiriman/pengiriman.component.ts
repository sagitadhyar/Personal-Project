import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { PengirimanDetailComponent } from './pengiriman-detail/pengiriman-detail.component';

export interface Pengiriman {
  faktur_pengiriman: string;
  faktur_permintaan: string;
  nama_barang: string;
  jumlah_barang: number;
  driver: string;
  tanggal_kirim: Date;
  status: string;
}
@Component({
  selector: 'app-pengiriman',
  templateUrl: './pengiriman.component.html',
  styleUrls: ['./pengiriman.component.scss']
})
export class PengirimanComponent implements AfterViewInit {
  pageTitle: string = 'PENGIRIMAN'
  buttonAddText: string = 'Tambah Data Pengiriman'
  localStorageItemName: string = 'pengiriman'
  displayedColumns: string[] = ['index', 'faktur_pengiriman', 'nama_barang', 'jumlah_barang', 'driver', 'status', 'actions'];
  dataSource: MatTableDataSource<Pengiriman>
  showDummyButton: boolean = Constants.SHOW_DUMMY_BUTTON

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog:MatDialog) {
    const data = LocalStorageHelper.getArrayObject(this.localStorageItemName)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetail(row: Pengiriman) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "Faktur Pengiriman", value: row.faktur_pengiriman },
        { key: "Faktur Permintaan", value: row.faktur_permintaan },
        { key: "Nama Barang", value: row.nama_barang },
        { key: "Jumlah Barang", value: row.jumlah_barang.toString() },
        { key: "Driver", value: row.driver },
        { key: "Tanggal Kirim", value: row.tanggal_kirim },
        { key: "Status", value: row.status }
      ]
    })
  }

  addData() {
    this.dialog.open(PengirimanDetailComponent, {
      width: '400px'
    }).afterClosed().subscribe(result => {
      if(result) {
        this.dataSource.data.unshift(result)
        this.dataSource._updateChangeSubscription();
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  editData(row: any) {
    this.dialog.open(PengirimanDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Pengiriman) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data dengan faktur pengiriman ${row.faktur_pengiriman}`
      }
    }).afterClosed().subscribe(ok => {
      if(ok) {
        const index = this.dataSource.data.indexOf(row)
        this.dataSource.data.splice(index, 1)
        this.dataSource._updateChangeSubscription()
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  clearAllData(){
    this.dataSource.data = []
    this.dataSource._updateChangeSubscription()
    LocalStorageHelper.setObject(this.localStorageItemName, [])
  }

  addDummyData(){
    // this.dataSource.data.unshift(createDummyData())
    this.dataSource._updateChangeSubscription()
    LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
  }
}

// // /** Builds and returns a new Pengiriman. */
// const { DUMMY_NAMA_PENGIRIMAN_PREFIX, DUMMY_NAMA_PENGIRIMAN_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
// function createDummyData(): Pengiriman {
//   const name = DUMMY_NAMA_PENGIRIMAN_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_PENGIRIMAN_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_PENGIRIMAN_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_PENGIRIMAN_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
//   const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
//   const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
//   const kode_pengiriman = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

//   return {
//     kode_pengiriman: kode_pengiriman,
//     nama_pengiriman: name,
//     satuan: satuan,
//     kategori: kategori,
//     stok: Math.round(Math.random() * 50),
//   };
// }
