import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Contact } from '../contact';
import {RestService} from '../rest.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() contact: Contact;
  contactId: number;
  submitted = false;
  valid = true;


  @Output() getId = new EventEmitter<number>();
  @Output() updateId = new EventEmitter<number>();

  myForm: FormGroup;

  edit = false;

  constructor(private restService: RestService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  deleteContact() {
    this.restService.deleteContact(+this.contact.id).subscribe((res) => {
      console.log('in deletecontact api', this.contact.id, this.getId, this.getId.emit(this.contact.id));
      this.getId.emit(+this.contact.id);
    }, error => console.log('There was an error: ', error));
  }

  updateContact(myForm: FormGroup) {
    if (myForm.valid){
      this.restService.updateContact(myForm.value, this.contactId).subscribe((res) => {
        this.edit = !this.edit;
        this.updateId.emit(this.contact.id);
        this.valid = true;
        this.submitted = false;
      });}
    else {
      this.valid = false;
      this.submitted = true;
  }

}

  editContact() {
    this.edit = !this.edit;
    this.contactId = this.contact.id;
    this.myForm = this.fb.group({
      first_name: [this.contact.first_name, [Validators.required, Validators.maxLength(30)]],
      last_name: [this.contact.last_name, [Validators.maxLength(30)]],
      job_title: [this.contact.job_title, [Validators.maxLength(20)]],
      phone1: [this.contact.phone1, [Validators.required, Validators.pattern('[0-9]{9,15}')]],
      phone2: [this.contact.phone2, [Validators.pattern('[0-9]{9,15}')]],
      phone3: [this.contact.phone3, [Validators.pattern('[0-9]{9,15}')]],
      gender: [this.contact.gender, [Validators.required, Validators.maxLength(1)]],
      email: [this.contact.email, [Validators.pattern('[a-z0-9.@]*')]],
      home_address: [this.contact.home_address, [Validators.maxLength(200)]],
      city: [this.contact.city, [Validators.maxLength(25)]],
      img_src: [this.contact.img_src, [Validators.maxLength(200)]],
      organization: [this.contact.organization, [Validators.maxLength(15)]],
    });
  }
}
