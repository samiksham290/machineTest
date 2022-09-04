import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar

  ) { }

  getUsers(){
    return this._http.get<any[]>(environment.api + 'user')
   } 
   
   deleteUser(id){
    return this._http.delete(environment.api + 'user/' + id)
   } 

   updateUser(payload:any){
    let id = payload.id;
    delete payload.id;
    return this._http.put(environment.api + 'user/' + id , payload)
   } 

  notification(msg:string){
    this._snackBar.open(msg, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration:5000
    });
   }
  
}
