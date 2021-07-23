import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Constants } from 'src/app/utils/constants';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';
import { PegawaiDetailComponent } from './pegawai-detail/pegawai-detail.component';

export interface Pegawai {
  nip: string;
  nama_pegawai: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat: string;
  jabatan: string;
  no_handphone: string;
}
@Component({
  selector: 'app-pegawai',
  templateUrl: './pegawai.component.html',
  styleUrls: ['./pegawai.component.scss']
})
export class PegawaiComponent implements AfterViewInit {
  pageTitle: string = 'PEGAWAI'
  buttonAddText: string = 'Tambah Data Pegawai'
  localStorageItemName: string = 'pegawai'
  displayedColumns: string[] = ['index', 'nip', 'nama_pegawai', 'jenis_kelamin', 'no_handphone', 'actions'];
  dataSource: MatTableDataSource<Pegawai>
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

  showDetail(row: Pegawai) {
    this.dialog.open(DialogContentComponent, {
      width: '400px',
      data: [
        { key: "NIP", value: row.nip },
        { key: "Nama Pegawai", value: row.nama_pegawai },
        { key: "Tempat Lahir", value: row.tempat_lahir },
        { key: "Tanggal Lahir", value: row.tanggal_lahir },
        { key: "Jenis Kelamin", value: row.jenis_kelamin },
        { key: "Alamat", value: row.alamat },
        { key: "Jabatan", value: row.jabatan },
        { key: "No HP", value: row.no_handphone }
      ]
    })
  }

  addData() {
    this.dialog.open(PegawaiDetailComponent, {
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
    this.dialog.open(PegawaiDetailComponent, {
      width: '400px',
      data: row
    }).afterClosed().subscribe(result => {
      if(result) {
        for(var k in result) row[k] = result[k];
        LocalStorageHelper.setObject(this.localStorageItemName, this.dataSource.data)
      }
    });
  }

  deleteData(row: Pegawai) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Anda yakin?",
        text: `hapus data pegawai ${row.nip} - ${row.nama_pegawai} `
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

// // /** Builds and returns a new Pegawai. */
// const { DUMMY_NAMA_PEGAWAI_PREFIX, DUMMY_NAMA_PEGAWAI_SUFIX, DUMMY_KATEGORI, DUMMY_SATUAN } = Constants
// function createDummyData(): Pegawai {
//   const name = DUMMY_NAMA_PEGAWAI_PREFIX[Math.round(Math.random() * (DUMMY_NAMA_PEGAWAI_PREFIX.length - 1))] + ' ' + DUMMY_NAMA_PEGAWAI_SUFIX[Math.round(Math.random() * (DUMMY_NAMA_PEGAWAI_SUFIX.length - 1))]/*.charAt(0) + '.'*/;
//   const satuan = DUMMY_SATUAN[Math.round(Math.random() * (DUMMY_SATUAN.length - 1))] 
//   const kategori = DUMMY_KATEGORI[Math.round(Math.random() * (DUMMY_KATEGORI.length - 1))] 
//   const kode_pegawai = "000" + name.charAt(0).toUpperCase() + satuan.charAt(0).toUpperCase() + kategori.charAt(0) + Math.floor(Math.random()*(999-100+1)+100);

//   return {
//     kode_pegawai: kode_pegawai,
//     nama_pegawai: name,
//     satuan: satuan,
//     kategori: kategori,
//     stok: Math.round(Math.random() * 50),
//   };
// }
