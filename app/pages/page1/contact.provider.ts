import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IContact} from './contact.component';



@Injectable()
export class ContactProvider {
  private registerUrl = 'http://10.96.127.155/api/contacts'
  constructor(private http: Http) {}

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


    registerContacts(contact : any[]): Observable<IContact[]>{
      let body = JSON.stringify(contact);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.registerUrl, body, options)
                      .map((response: Response) => <IContact[]>response.json())
                      .catch(this.handleError);
   }
}