import { Component, OnInit } from '@angular/core';
import {Contact} from '../contact';
import {RestService} from '../rest.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  page = 1;
  submitted = false;
  valid = true;
  contacts = [];
  selectedContact: Contact;
  myForm: FormGroup;
  searchForm: FormGroup;
  isSearch = false;

  constructor(private restService: RestService, private fb: FormBuilder) { }


  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }


  ngOnInit() {

    this.getAllContacts();

    this.myForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.maxLength(30)]],
      job_title: ['', [Validators.maxLength(20)]],
      phone1: ['', [Validators.required, Validators.pattern('[0-9]{9,15}')]],
      phone2: ['', [Validators.pattern('[0-9]{9,15}')]],
      phone3: ['', [Validators.pattern('[0-9]{9,15}')]],
      gender: ['', [Validators.required, Validators.maxLength(1), Validators.pattern('[oOmMfF]')]],
      email: ['', [Validators.pattern('[a-z0-9.@]*')]],
      home_address: ['', [Validators.maxLength(200)]],
      city: ['', [Validators.maxLength(25)]],
      img_src: ['', [Validators.maxLength(200)]],
      organization: ['', [Validators.maxLength(15)]],
    });

    this.searchForm = this.fb.group({
      search_val: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(1)]],
    });
  }

  getAllContacts() {  this.restService.getContacts().subscribe((data) => {
    this.contacts = data;
  }); }

  getId(value)  {
    console.log('in', value);
    this.contacts = this.contacts.filter((elem) => {
      return elem.id !== value;
    });
    this.selectedContact = null;
  }

  updateId(value)  {

    this.selectedContact = null;

    this.getAllContacts();
  }

  onSubmit(form: FormGroup) {
    console.log(form.valid);
    if(form.valid) {
      this.restService.createContact(form.value).subscribe((res) => {
        this.selectedContact = form.value;
        this.contacts.push(res);
        this.valid = true;
        this.submitted = false;
      });
    }
    else {
      this.valid = false;
      this.submitted = true;
    }
  }

  onSearchSubmit(form: FormGroup) {
    console.log('in', form.value.search_val);
    this.restService.searchContacts(form.value.search_val).subscribe((res) => {
      console.log(res);
      this.contacts = res;
      this.isSearch = true;
    });
  }

  viewAll() {
    this.isSearch = false;
    this.getAllContacts();
  }

  viewAdd() {
    this.selectedContact = null;
  }
}


