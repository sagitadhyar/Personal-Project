import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pengiriman-detail',
  templateUrl: './pengiriman-detail.component.html',
  styleUrls: ['./pengiriman-detail.component.scss']
})
export class PengirimanDetailComponent implements OnInit {
  dialogTitle: string
  dialogOkButton: string
  item: any
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<PengirimanDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data ? "Ubah Data Pengiriman" : "Tambah Data Pengiriman"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.item = (data ? JSON.parse(JSON.stringify(data)) : {}) as any
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}