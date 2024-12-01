import { Email } from "../model/email.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class EmailService{

  //private readonly API_URL = 'http://localhost:8082/api/email/
  private readonly API_URL = 'https://www.smartadvicens.com/api/email/';

  dataChange: BehaviorSubject<Email[]> = new BehaviorSubject<Email[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllEmail(headers: any): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.API_URL, { headers }).pipe(
      tap(data => {
        this.dataChange.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        return throwError(error);
      })
    );
  }

  public addEmail(email: Email): void {
    this.httpClient.post(this.API_URL, email).subscribe();
  }

  public deleteEmail(email: Email, headers: any): void {
    this.httpClient.delete(this.API_URL + email.id, {headers}).subscribe();
  }

}