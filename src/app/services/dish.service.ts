import {Inject, Injectable} from '@angular/core';
import { Dish } from '../shared/dish';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DishService {

  constructor(private httpClient: HttpClient, @Inject('BaseURL') private baseURL: string) { }

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${this.baseURL}` + 'dishes');
  }

  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>(`${this.baseURL}` + `dishes${id}`);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.httpClient.get(`${this.baseURL}` + 'dishes').pipe(dishes => Object.values(dishes)[0]);
  }

  getDishIds(): Observable<number[]> {
    // @ts-ignore
    return this.getDishes().pipe( dishes => Object.values(dishes).map( dish => dish.id ));
      // .catch(error => { return error; } );
  }
}
