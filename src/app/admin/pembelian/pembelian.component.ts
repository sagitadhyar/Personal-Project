import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { PembelianDetailComponent } from './pembelian-detail/pembelian-detail.component';

export interface Pembelian {
  faktur_pembelian: string;
  nama_barang: string;
  jumlah: number;
  tanggal: Date;
  supplier: string;
  nip: string;
}
@Component({
  selector: 'app-pembelian',
  templateUrl: './pembelian.component.html',
  styleUrls: ['./pembelian.component.scss']
})
export class PembelianComponent implements AfterViewInit {
  pageTitle: string = 'HISTORY TRANSAKSI BARANG MASUK'
  buttonAddText: string = 'Buat Transaksi Masuk'
  localStorageItemName: string = 'pembelian'
  displayedColumns: string[] = ['index', 'faktur_pembelian', 'nama_barang', 'jumlah', 'supplier', 'actions'];
  dataSource: MatTableDataSource<Pembelian>
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

  showDetail(row: Pembelian) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "Faktur Pembelian", value: row.faktur_pembelian },
        { key: "Nama Barang", value: row.nama_barang },
        { key: "Jumlah", value: row.jumlah },
        { key: "Tanggal", value: row.tanggal },
        { key: "Supplier", value: row.supplier },
        { key: "NIP", value: row.nip }
      ]
    })
  }

  addData() {
    this.dialog.open(PembelianDetailComponent, {
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
    this.dialog.open(PembelianDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Pembelian) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data transaksi masuk dengan faktur pembelian ${row.faktur_pembelian}`
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

// // /** Builds and returns a new Pembelian. */
// const { DUMMY_NAMA_PEMBELIAN_PREFIX, DUMMY_NAMA_PEMBELIAN_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
// function createDummyData(): Pembelian {
//   const name = DUMMY_NAMA_PEMBELIAN_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_PEMBELIAN_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_PEMBELIAN_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_PEMBELIAN_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
//   const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
//   const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
//   const kode_pembelian = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

//   return {
//     kode_pembelian: kode_pembelian,
//     nama_pembelian: name,
//     satuan: satuan,
//     kategori: kategori,
//     stok: Math.round(Math.random() * 50),
//   };
// }
