import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiURL = 'https://intense-island-88289.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  public getContacts() {
    return this.httpClient.get<Contact[]>(`${this.apiURL}/contact/`);
  }

  public searchContacts(keyword) {
    return this.httpClient.get<Contact[]>(`${this.apiURL}/contact/search/?search=${keyword}`);
  }

  public getContactWithId(id: number) {
    return this.httpClient.get(`${this.apiURL}/contact/${id}`);
  }

  public createContact(contact: Contact) {
    return this.httpClient.post(`${this.apiURL}/contact/`, contact);
  }

  public updateContact(contact: Contact, id) {
    return this.httpClient.put(`${this.apiURL}/contact/${id}/`, contact);
  }

  public deleteContact(id: number) {
    return this.httpClient.delete(`${this.apiURL}/contact/${id}/`);
  }

}
