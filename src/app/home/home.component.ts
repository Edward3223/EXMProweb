import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../Service/data-base.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private db: DataBaseService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  Contact: any[]
  existsIdProduct: number
  existid: boolean = false

  SetContact = {
    Nombre: '',
    Apellido: '',
    Email: '',
    Numero: '',
  }

  editableContact = {
    Id: '',
    Nombre: '',
    Apellido: '',
    Email: '',
    Numero: '',
  }


  getContacts(){

    this.db.getContacts().subscribe(resp =>{
      this.Contact = resp
      console.log(this.Contact)
    }, (err) =>{

    })


  }



  setContact(){

    if(!this.existid){
      this.db.setContacts(this.SetContact).subscribe(resp =>{
        this.getContacts();
        Swal.fire({
          title: 'Yay!',
          text: 'Producto enviado!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
  
      }, (err) =>{
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })

    }
    else{
      this.db.updateContacts(this.existsIdProduct)
      this.existid = false
    }

  }

  deleteContact(id: any){
    this.db.delectContacts(this.Contact[id].Id).subscribe(resp =>{
      this.getContacts();
      Swal.fire({
        title: 'Yay!',
        text: 'Producto eliminado!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    })
  }

  setProductEditable(id: number){
    
    this.SetContact.Nombre = this.Contact[id].Nombre;;
    this.SetContact.Apellido = this.Contact[id].Apellido;;
    this.SetContact.Numero = this.Contact[id].Numero;
    this.SetContact.Email = this.Contact[id].Email;
    this.existid = true
    this.existsIdProduct = id
  }

  upgradeContact(){
    this.editableContact.Id = this.Contact[this.existsIdProduct].Id
    this.editableContact.Nombre = this.SetContact.Nombre;
    this.editableContact.Apellido = this.SetContact.Nombre;
    this.editableContact.Numero = this.SetContact.Nombre;
    this.editableContact.Email = this.SetContact.Nombre;
    console.log(this.editableContact)
    this.db.updateContacts(this.editableContact).subscribe(resp =>{
      this.getContacts()
      Swal.fire({
        title: 'Yay!',
        text: 'Producto Editado!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }, (err) =>{
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
    
  }

}
