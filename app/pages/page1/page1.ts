import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Contacts} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class HomePage implements OnInit{
  contacttobefound: string;
  contacts: any[];
  search: boolean;

  constructor(private nav: NavController) {
  }
  static get parameters(){
    return [NavController];
  }
  ngOnInit() {
    Contacts.find(['*'],{}).then((contacts) => {
          this.contacts = contacts;
          if (this.contacts.length == 0)
          this.contacts.push({displayName: 'No contacts found'})
      })
  }
 
 

}
