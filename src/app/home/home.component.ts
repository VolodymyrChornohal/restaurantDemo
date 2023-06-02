import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish = {} as Dish;
  promotion: Promotion = {} as Promotion;
  leader: Leader = {} as Leader;
  dishErrMess: string = "";
  promoErrMess: string = "";
  leaderErrMess: string = "";
  allDishes = DISHES
  allLeaders = LEADERS
  allPromos  = PROMOTIONS


  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') public BaseURL: string ) { }

  ngOnInit() {
    //this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
    //  errmess => this.dishErrMess = <any>errmess);
    //this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
    //  errmess => this.promoErrMess = <any>errmess);
    //this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,
    //  errmess => this.leaderErrMess = <any>errmess);
    this.dish = this.allDishes.filter(d => d.featured)[0]
    this.leader = this.allLeaders.filter(l => l.featured)[0]
    this.promotion = this.allPromos.filter(p => p.featured)[0]
    console.info(this.allDishes);
  }

}
