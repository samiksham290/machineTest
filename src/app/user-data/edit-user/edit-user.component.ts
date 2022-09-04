import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm= this._fb.group({
    id: [''],
    name: ['', [Validators.required]],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    date: ['', Validators.required],
    address: ['', Validators.required],
  });

  constructor(
    public dialogRef : MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _service : UserServiceService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm.get('id').setValue(this.data.id);
    this.editForm.get('name').setValue(this.data.name);
    this.editForm.get('email').setValue(this.data.email);
    this.editForm.get('gender').setValue(this.data.gender);
    this.editForm.get('date').setValue(this.data.date);
    this.editForm.get('address').setValue(this.data.address);

    console.log(this.data);
    console.log(this.editForm);
    
  }

  updateData(){
    //console.log(this.registrationForm.value);
    this._service.updateUser({...this.editForm.value}).subscribe(res=>{
      this._service.notification("User updated sucessfully");
      this.dialogRef.close(true);
    })
  }

}
