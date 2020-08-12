import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient) { }
  private ObjectToArray(ObjProducts: Object){

    const Contact = []

    console.log(ObjProducts)

    Object.keys( ObjProducts ).forEach( key =>{

      let ContactModel = {
        Id: '',
        Nombre: '',
        Apellido: '',
        Email: '',
        Numero: '',

      }

      ContactModel = ObjProducts[key];
      ContactModel.Id = key
      Contact.push( ContactModel )
    })

    if(ObjProducts === null){return [];}

    return Contact

  }

  getContacts(){
    return this.http.get('https://proyectov-33057.firebaseio.com/Contact.json')
                    .pipe(
                      map(this.ObjectToArray)
                    )

  }
  setContacts(item: any){
    return this.http.post('https://proyectov-33057.firebaseio.com/Contact.json', item);
  }

  updateContacts(item: any){

    const itemtemp = {
      ...item
    }
    delete itemtemp.id
    return this.http.put(`https://proyectov-33057.firebaseio.com/Contact/${item.Id}.json`, itemtemp);
  }

  delectContacts(id: any){
    return this.http.delete(`https://proyectov-33057.firebaseio.com/Contact/${id}.json`);
  }
  
}
