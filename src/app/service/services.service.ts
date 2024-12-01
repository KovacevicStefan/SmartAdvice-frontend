import { Service } from "../model/service.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ServicesService{

  private readonly API_URL = 'https://www.smartadvicens.com/api/services/'/*https://www.smartadvicens.com/api/services/*/;

  dataChange: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.API_URL).pipe(
      tap(data => {
        this.dataChange.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        return throwError(error);
      })
    );
  }

  public getServiceById(id: number): Observable<Service> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.get<Service>(url);
  }

  public addNews(service: Service, headers: any): void {
    this.httpClient.post(this.API_URL, service, {headers}).subscribe();
  }

  public updateNews(service: Service, headers: any): void {
    this.httpClient.put(this.API_URL + service.id, service, {headers}).subscribe();
  }

  public deleteService(service: Service, headers: any): void {
    this.httpClient.delete(this.API_URL + service.id, {headers}).subscribe();
  }
}