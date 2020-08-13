import { Injectable } from '@angular/core';
import { User } from '../Model/Users';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userToken: string;

  
  private saveToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  logIn( Profile: User ){

    const authData = {
      email: Profile.Email,
      password: Profile.Password,
      returnSecureToken: true
    }

    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDR7iS7eKooeypqzeezpF4gYRB_u6CkS8E', 
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );

  }

  SigUp( Profile: User ){

    const authData = {
      email: Profile.Email,
      password: Profile.Password,
      returnSecureToken: true
    }

    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDR7iS7eKooeypqzeezpF4gYRB_u6CkS8E', 
      authData
    ).pipe(
      map( resp => {
        this.saveToken( resp['idToken'] );
        return resp;
      })
    );

  }

  readToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  authentication(){
    return this.userToken.length > 2 
  }



}
