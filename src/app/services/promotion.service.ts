import {Inject, Injectable} from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs';

import { baseURL } from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PromotionService {

  constructor(private httpClient: HttpClient, @Inject('BaseURL') private baseURL: string) { }

  getPromotions(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(`${this.baseURL}` + 'promotions');
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.httpClient.get<Promotion>(`${this.baseURL}` + `promotions/${id}`);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.httpClient.get(`${this.baseURL}` + 'promotions').pipe(promo => Object.values(promo)[0]);
  }
}
