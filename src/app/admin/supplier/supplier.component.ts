import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';

export interface Supplier {
  kode: string;
  nama: string;
  kategori: string;
  alamat: string;
  no_telp: string;
}
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements AfterViewInit {
  pageTitle: string = 'SUPPLIER'
  buttonAddText: string = 'Tambah Data Supplier'
  localStorageItemName: string = 'supplier'
  displayedColumns: string[] = ['index', 'kode', 'nama', 'kategori', 'no_telp', 'actions'];
  dataSource: MatTableDataSource<Supplier>
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

  showDetail(row: Supplier) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "Kode", value: row.kode },
        { key: "Nama", value: row.nama },
        { key: "Kategori", value: row.kategori },
        { key: "Alamat", value: row.alamat },
        { key: "No Telp", value: row.no_telp }
      ]
    })
  }

  addData() {
    this.dialog.open(SupplierDetailComponent, {
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
    this.dialog.open(SupplierDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Supplier) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data supplier ${row.kode} - ${row.nama} `
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

// // /** Builds and returns a new Supplier. */
// const { DUMMY_NAMA_SUPPLIER_PREFIX, DUMMY_NAMA_SUPPLIER_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
// function createDummyData(): Supplier {
//   const name = DUMMY_NAMA_SUPPLIER_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_SUPPLIER_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_SUPPLIER_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_SUPPLIER_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
//   const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
//   const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
//   const kode_supplier = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

//   return {
//     kode_supplier: kode_supplier,
//     nama_supplier: name,
//     satuan: satuan,
//     kategori: kategori,
//     stok: Math.round(Math.random() * 50),
//   };
// }
