import {Component, Inject, OnInit} from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[] = [] as Leader[]
  leadersErrMess: string = '';

  constructor( private leaderservice: LeaderService,
              private route: ActivatedRoute,
              @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders)
    //errmess => this.leadersErrMess = <any>errmess);
    this.leaders = LEADERS
  }

}
