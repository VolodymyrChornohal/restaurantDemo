import {Inject, Injectable} from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LeaderService {

  constructor(private httpClient: HttpClient, @Inject('BaseURL') private baseURL: string) { }

  getLeaders(): Observable<Leader[]> {
    return this.httpClient.get<Leader[]>(`${this.baseURL}` + 'leaders');
  }

  getLeader(id: number): Observable<Leader> {
    return this.httpClient.get<Leader>(`${this.baseURL}` + `leaders/${id}`);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.httpClient.get(`${this.baseURL}` + 'leaders').pipe(leader => Object.values(leader)[0]);
  }
}
