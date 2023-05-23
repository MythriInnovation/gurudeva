import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public AddRolesToStorage(roles:any){
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRolesFromStorage(){
    return JSON.parse(sessionStorage.getItem('roles')!);
  }

  public AddUserRolesToStorage(userRole:any){
    sessionStorage.setItem('UserRoles', JSON.stringify(userRole));
  }
  public getUserRolesFromStorage(){
    return JSON.parse(sessionStorage.getItem('UserRoles')!);
  }

  public AddUserToStorage(user:any){
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUserFromStorage(){
    return JSON.parse(sessionStorage.getItem('currentUser')!);
  }

  public AddUserRoleToStorage(curUserRole:any){
    sessionStorage.setItem('currentUserRole', JSON.stringify(curUserRole));
  }
  
  public getCurrentUserRoleFromStorage(){
    return JSON.parse(sessionStorage.getItem('currentUserRole')!);
  }

  public removeSessionValues(){
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUserRole');
  }
}
