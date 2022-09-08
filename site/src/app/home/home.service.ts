import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

type EntityResponseType = HttpResponse<string>;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  public resourceUrl = "http://localhost:3000/" + 'api';

  constructor(private http: HttpClient) { 

  }

  getHello(): Observable<EntityResponseType> {
    return this.http.get<string>(`${this.resourceUrl}/hello`, {
      observe: 'response',
    });
  }
}
