import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-view-user-list',
  templateUrl: './view-user-list.component.html',
  styleUrls: ['./view-user-list.component.scss']
})
export class ViewUserListComponent implements OnInit {

  userList: any[] = [];
  user: any;
  selectAll = false;
  genderConunt = {
    male: 0,
    female: 0
  };

  constructor(
    private _service : UserServiceService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._service.getUsers().subscribe(res=>{
        this.userList = res;
        this.userList.forEach(user => user.selected = false);
        this.getGender();
    })
  }

  editUser(list: any){
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: list,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  deleteUser(user){
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
          this._service.deleteUser(user.id).subscribe(res=>{
            this._service.notification("User deleted successfully")
            this.userList = this.userList.filter(u=> u.id !== user.id);
          })
      }
    });
  }


  getGender(){
    const male = this.userList.filter(u => u.gender == 'male');
    const female = this.userList.filter(u => u.gender == 'female');

    this.genderConunt = {
      female: female.length,
      male: male.length
    }
  }

  

  toggleSelectAll(event){
    console.log('sss', event.checked);
    this.userList.forEach(user => user.selected = event.checked)
    
  }
  
  getPercent() {
    const count =  this.genderConunt.female + this.genderConunt.male;
    return count / 10 * 100;

  }

}
