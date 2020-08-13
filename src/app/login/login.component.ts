import { Component, OnInit } from '@angular/core';
import { User } from '../Model/Users';
import Swal from 'sweetalert2'
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private routes: Router) { }

  ngOnInit(): void {

    
    
  }
  usuario: User = new User;
  recuerdame = false;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Login(){

    Swal.fire({
      title: 'Espere...',
      icon: 'info',
    });
    Swal.showLoading();

    if ( this.recuerdame ) {
      localStorage.setItem('email', this.usuario.Email);
    }
    else{
      localStorage.removeItem('email')
    }


    this.auth.logIn(this.usuario).subscribe(resp =>{
      console.log(resp)
      Swal.close()
      this.routes.navigateByUrl('/home')
      this.Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })

    }, (err)=>{

      Swal.fire({
        title: err.error.error.message,
        icon: 'error',
      });
    })
  }
}
