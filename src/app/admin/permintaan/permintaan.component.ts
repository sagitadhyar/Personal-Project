import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { PermintaanDetailComponent } from './permintaan-detail/permintaan-detail.component';

export interface Permintaan {
  faktur_permintaan: string;
  nama_barang: string;
  jumlah: number;
  tanggal_permintaan: Date;
  store: string;
  nip: string;
  status: string;
}
@Component({
  selector: 'app-permintaan',
  templateUrl: './permintaan.component.html',
  styleUrls: ['./permintaan.component.scss']
})
export class PermintaanComponent implements AfterViewInit {
  pageTitle: string = 'PERMINTAAN'
  buttonAddText: string = 'Tambah Data Permintaan'
  localStorageItemName: string = 'permintaan'
  displayedColumns: string[] = ['index', 'faktur_permintaan', 'nama_barang', 'jumlah', 'tanggal_permintaan', 'status', 'actions'];
  dataSource: MatTableDataSource<Permintaan>
  showDummyButton: boolean = Constants.SHOW_DUMMY_BUTTON

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog:MatDialog) {
    const data = LocalStorageHelper.getObject(this.localStorageItemName)
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(data ? data : []);
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

  showDetail(row: Permintaan) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "Faktur Permintaan", value: row.faktur_permintaan },
        { key: "Nama Barang", value: row.nama_barang },
        { key: "Jumlah", value: row.jumlah },
        { key: "Tanggal Permintaan", value: row.tanggal_permintaan },
        { key: "Store", value: row.store },
        { key: "NIP", value: row.nip },
        { key: "Status", value: row.status }
      ]
    })
  }

  addData() {
    this.dialog.open(PermintaanDetailComponent, {
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
    this.dialog.open(PermintaanDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Permintaan) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data permintaan ${row.faktur_permintaan}`
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

// // /** Builds and returns a new Permintaan. */
// const { DUMMY_NAMA_PERMINTAAN_PREFIX, DUMMY_NAMA_PERMINTAAN_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
// function createDummyData(): Permintaan {
//   const name = DUMMY_NAMA_PERMINTAAN_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_PERMINTAAN_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_PERMINTAAN_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_PERMINTAAN_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
//   const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
//   const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
//   const kode_permintaan = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

//   return {
//     kode_permintaan: kode_permintaan,
//     nama_permintaan: name,
//     satuan: satuan,
//     kategori: kategori,
//     stok: Math.round(Math.random() * 50),
//   };
// }
