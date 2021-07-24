import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-permintaan-detail',
  templateUrl: './permintaan-detail.component.html',
  styleUrls: ['./permintaan-detail.component.scss']
})
export class PermintaanDetailComponent implements OnInit {
  dialogTitle: string
  dialogOkButton: string
  item: any
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<PermintaanDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data ? "Ubah Data Permintaan" : "Tambah Data Permintaan"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.item = (data ? JSON.parse(JSON.stringify(data)) : {}) as any
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}