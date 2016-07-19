import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Contacts} from 'ionic-native';
import {ContactsProvider} from '../../providers/contacts/contacts';
import {IContact} from './contact.component';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})

export class HomePage implements OnInit{
  contacttobefound: any[];
  contacts: IContact[];
  search: boolean;
  errorMessage: string;

  constructor(private nav: NavController, _contactProvider: ContactsProvider) {
    let a = ['a', 'b'];
    _contactProvider.getContactList(a).subscribe(
      () => console.log("done"),
      error => this.errorMessage = error
    )
  }

  static get parameters(){
    return [NavController];
  }

  ngOnInit() {
    
    /*Contacts.find(['*'],{}).then((contacttobefound) => {
          this._contactProvider.getContactList(contacttobefound).subscribe(
              response => this.contacts = response,
               error =>  this.errorMessage = <any>error);
  })*/
  console.log("asdas");
 
  }
}
