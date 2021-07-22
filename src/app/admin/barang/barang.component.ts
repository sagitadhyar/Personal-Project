import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Barang {
  id: string;
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
  displayedColumns: string[] = ['id', 'kode_barang', 'nama_barang', 'satuan', 'kategori', 'stok', 'actions'];
  dataSource: MatTableDataSource<Barang>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    console.log(users)
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
    this.dataSource.data.push(createNewUser(this.dataSource.data.length +1));
    this.dataSource._updateChangeSubscription();
  }

  editData(row: Barang) {
    console.log(row)
  }

  deleteData(row: Barang) {
    const index = this.dataSource.data.indexOf(row)
    this.dataSource.data.splice(index, 1)
    this.dataSource._updateChangeSubscription()
  }
}

/** Builds and returns a new Barang. */
function createNewUser(id: number): Barang {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  let str = "" + id
  let pad = "000"
  var kode_barang = pad.substring(0, pad.length - str.length) + str

  return {
    id: id.toString(),
    kode_barang: kode_barang,
    nama_barang: name,
    satuan: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    kategori: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    stok: Math.round(Math.random() * 100),
  };
}
