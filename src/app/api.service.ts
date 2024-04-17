import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpservice: HttpClient) { }

  public register(signup: any){
    const payload = {
        firstname: signup.firstname,
        lastname: signup.lastname,
        email: signup.email,
        password: signup.password,
        phone_number: signup.phonenumber
      }
      return this.httpservice.post("http://127.0.0.1:9000/roommate/signup",payload)
  }

  public login(signIn: any){
    const payload = {
      email: signIn.email,
      password: signIn.password
    }
    return this.httpservice.post("http://127.0.0.1:9000/roommate/signin",payload);
  }

 public universities(){
  return this.httpservice.get("http://127.0.0.1:9000/roommate/universities-list");
 }

 public listOfAccom(id: any){
  const payload = {
    university_id: id
  }
 return this.httpservice.post("http://127.0.0.1:9000/roommate/acc-list",payload)
 }

 public listOfAminity(){
  return this.httpservice.get("http://127.0.0.1:9000/roommate/aminity-list");
 }

 public uniRegister(register: any){
   const payload = {
    university_name: register.universityName,
    address: register.universityAddress
   }
   return this.httpservice.post("http://127.0.0.1:9000/roommate/university-registry",payload);
 }

 public aminity(aminity: any){
  const payload = {
    amenity_name: aminity.amenityName
  }
  return this.httpservice.post("http://127.0.0.1:9000/roommate/aminity-registry",payload);
}

public accomadationRegister(acc: any){
  const payload = {
    name: acc.name,
    address: acc.address,
    price: acc.price,
    availability: acc.availability,
    person_id: localStorage.getItem("UserId")
  }
  return this.httpservice.post("http://127.0.0.1:9000//roommate/accommodation-register",payload);
}

public accUniLink(uniLink: any){
  return this.httpservice.post("http://127.0.0.1:9000/roommate/acc-uni-map",uniLink);
}

public booking(acc_id?: any){
  const payload = {
    accomidation_id: acc_id.accomidation_id,
    total_room: acc_id.availability
  }
  return this.httpservice.post("http://127.0.0.1:9000/roommate/booking-room",payload);
}

}
