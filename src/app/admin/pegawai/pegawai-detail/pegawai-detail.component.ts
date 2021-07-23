import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pegawai-detail',
  templateUrl: './pegawai-detail.component.html',
  styleUrls: ['./pegawai-detail.component.scss']
})
export class PegawaiDetailComponent implements OnInit {
  dialogTitle: string
  dialogOkButton: string
  item: any
  dialogForm!: FormGroup

  constructor(
    public dialogRef:MatDialogRef<PegawaiDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.dialogTitle = data ? "Ubah Data Pegawai" : "Tambah Data Pegawai"
    this.dialogOkButton = data ? "Ubah" : "Simpan"

    this.item = (data ? JSON.parse(JSON.stringify(data)) : {}) as any
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
