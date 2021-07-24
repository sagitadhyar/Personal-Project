import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pembelian-detail',
  templateUrl: './pembelian-detail.component.html',
  styleUrls: ['./pembelian-detail.component.scss']
})
export class PembelianDetailComponent implements OnInit {
  dialogTitle: string
  dialogOkButton: string
  item: any
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<PembelianDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data ? "Ubah Data Transaksi Masuk" : "Buat Data Transaksi Masuk"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.item = (data ? JSON.parse(JSON.stringify(data)) : {}) as any
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
