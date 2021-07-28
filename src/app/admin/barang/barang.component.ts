import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { BarangDetailComponent } from './barang-detail/barang-detail.component';

export interface Barang {
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  kategori: string;
  stok: number;
  harga: number;
}
@Component({
  selector: 'app-barang',
  templateUrl: './barang.component.html',
  styleUrls: ['./barang.component.scss']
})
export class BarangComponent implements AfterViewInit {
  pageTitle: string = 'BARANG'
  buttonAddText: string = 'Tambah Barang'
  localStorageItemName: string = 'barang'
  displayedColumns: string[] = ['index', 'kode_barang', 'nama_barang', 'satuan', 'kategori', 'stok', 'harga', 'actions'];
  dataSource: MatTableDataSource<Barang>
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

  showDetail(row: Barang) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "Kode Barang", value: row.kode_barang },
        { key: "Nama Barang", value: row.nama_barang },
        { key: "Satuan", value: row.satuan },
        { key: "Kategori", value: row.kategori },
        { key: "Stok", value: row.stok.toString() },
        { key: "Harga", value: "Rp. " + this.numberWithCommas(row.harga) }
      ]
    })
  }

  addData() {
    this.dialog.open(BarangDetailComponent, {
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
    this.dialog.open(BarangDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Barang) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data dengan kode '${row.kode_barang}'`
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
    this.dataSource.data.unshift(createDummyData())
    this.dataSource._updateChangeSubscription()
    LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
  }
  
  numberWithCommas(num: number) {
    if(!num) return 0
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// /** Builds and returns a new Barang. */
const { DUMMY_NAMA_BARANG_PREFIX, DUMMY_NAMA_BARANG_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
function createDummyData(): Barang {
  const name = DUMMY_NAMA_BARANG_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_BARANG_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_BARANG_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_BARANG_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
  const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
  const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
  const kode_barang = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

  return {
    kode_barang: kode_barang,
    nama_barang: name,
    satuan: satuan,
    kategori: kategori,
    stok: Math.round(Math.random() * 50),
    harga: Math.round(Math.random() * 99999999),
  };
}