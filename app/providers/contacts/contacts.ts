import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import {IContact} from '../../pages/page1/contact.component';
/*
  Generated class for the Contacts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactsProvider {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getContactList(contacts: any[]): Observable<IContact[]>{
    console.log("teste")
      let body = JSON.stringify(contacts);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var registerUrl = 'http://10.96.127.155/api/contacts'

      return this.http.post(registerUrl, body, options)
                    .map((response: Response) => <Response>response.json())
                    .catch(this.handleError);
   }
  
    private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}