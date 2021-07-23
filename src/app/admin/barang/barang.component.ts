import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { BarangDetailComponent } from './barang-detail/barang-detail.component';

export interface Barang {
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  kategori: string;
  stok: number;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-barang',
  templateUrl: './barang.component.html',
  styleUrls: ['./barang.component.scss']
})
export class BarangComponent implements AfterViewInit {
  localStorageItemName: string = 'barang'
  displayedColumns: string[] = ['index', 'kode_barang', 'nama_barang', 'satuan', 'kategori', 'stok', 'actions'];
  dataSource: MatTableDataSource<Barang>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog:MatDialog) {

    // // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewData(k + 1));
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
    //TODO: Save to localstorage
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
    if(confirm(`Hapus data dengan kode '${row.kode_barang}'?`))
    {
      const index = this.dataSource.data.indexOf(row)
      this.dataSource.data.splice(index, 1)
      this.dataSource._updateChangeSubscription()
      LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
    }
  }
}

// /** Builds and returns a new Barang. */
// function createNewData(id: number): Barang {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   let str = "" + id
//   let pad = "000"
//   var kode_barang = pad.substring(0, pad.length - str.length) + str

//   return {
//     kode_barang: kode_barang,
//     nama_barang: name,
//     satuan: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//     kategori: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//     stok: Math.round(Math.random() * 100),
//   };
// }