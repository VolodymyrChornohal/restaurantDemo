import {Inject, Injectable} from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FeedbackService {

  constructor(private httpClient: HttpClient, @Inject('BaseURL') private baseURL: string) { }

  submitFeedback(feedback: Feedback): Observable<Feedback>{
    return this.httpClient.post<Feedback>(`${this.baseURL}` + 'feedback', feedback);
  }

}
