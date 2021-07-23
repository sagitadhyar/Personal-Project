import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Barang } from '../barang.component';

@Component({
  selector: 'app-barang-detail',
  templateUrl: './barang-detail.component.html',
  styleUrls: ['./barang-detail.component.scss']
})
export class BarangDetailComponent implements OnInit {
  isEdit: boolean = false
  dialogTitle: string
  dialogOkButton: string
  barang: Barang
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<BarangDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barang,
  ) { 
    this.dialogTitle = data ? "Ubah Barang" : "Tambah Barang"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.barang = (data ? JSON.parse(JSON.stringify(data)) : {}) as Barang
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
