import { News } from "../model/news.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../model/user.model";

@Injectable()
export class NewsService{

  private readonly API_URL = 'https://www.smartadvicens.com/api/news/' /*https://www.smartadvicens.com/api/news/*/;
  private readonly COMMENTS_URL = 'https://www.smartadvicens.com/api/comments/';

  dataChange: BehaviorSubject<News[]> = new BehaviorSubject<News[]>([]);
  user: User | null = null;

  constructor(private httpClient: HttpClient, public userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.name + ' ' + error.message);
    return [];
  }

  public getAllNews(): Observable<News[]> {
    return this.httpClient.get<News[]>(this.API_URL).pipe(
      tap(data => {
        this.dataChange.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        return throwError(error);
      })
    );
  }
  

  public getNewsById(id: number): Observable<News> {
    const url = `${this.API_URL}${id}`;
    return this.httpClient.get<News>(url);
  }

  public getNewsByAuthorId(): Observable<News[]> {
    const url = `${this.API_URL}author/${this.user!.id}`;
    return this.httpClient.get<News[]>(url);
  }

  public getNewsByNaslov(naslov: string): Observable<News> {
    const naslovWithSpaces = naslov.replace(/_/g, ' '); // Zamena znaka minus sa razmakom
    const url = `${this.API_URL}naslov/${encodeURIComponent(naslovWithSpaces)}`;
    return this.httpClient.get<News>(url);
  }

  public updateNews(news: News, headers: any): void {
    news.autor = this.user!;
    news.tekst = news.tekst.replace(/\n/g, '<br>');
    this.httpClient.put(this.API_URL + news.id, news, {headers}).subscribe();
  }

  public addNews(news: News, headers: any): void {
    news.autor = this.user!;
    news.tekst = news.tekst.replace(/\n/g, '<br>');
    this.httpClient.post(this.API_URL, news, {headers}).subscribe();
  }

  public deleteNews(news: News, headers: any): void {
    this.httpClient.delete(this.API_URL + news.id, {headers}).subscribe();
  }

  public getCommentsByNewsId(newsId: number): Observable<any[]> {
  const url = `${this.COMMENTS_URL}${newsId}`;
  return this.httpClient.get<any[]>(url).pipe(
    catchError(this.handleError));
  }

  public addComment(comment: any) {
  return this.httpClient.post(`${this.COMMENTS_URL}`, comment);
  }

  public deleteComment(comment: any): void {
    this.httpClient.delete(`${this.COMMENTS_URL}commentId/${comment.id}`).subscribe();
  }

  public addPlus(updComment: any): void {
    updComment.plus = updComment.plus + 1; 
    this.httpClient.put(`${this.COMMENTS_URL}commentId/${updComment.id}`, updComment).subscribe();
  }

  public updateComment(updComment: any): void {
    this.httpClient.put(`${this.COMMENTS_URL}commentId/${updComment.id}`, updComment).subscribe();
  }

  public addMinus(updComment: any): void {
    updComment.minus = updComment.minus + 1; 
    this.httpClient.put(`${this.COMMENTS_URL}commentId/${updComment.id}`, updComment).subscribe();
  }
}