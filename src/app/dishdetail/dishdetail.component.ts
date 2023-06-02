import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import {Params, ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {

  dish: Dish = {} as Dish;
  dishcopy = {} as Dish;
  dishIds: number[] = [];
  prev: number = 0;
  next: number = 0;
  commentForm: FormGroup = {} as FormGroup;
  commentObject: Comment = {} as Comment;
  date: Date = new Date();
  errMess: string = '';
  visibility = 'shown';

  formErrors = {
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    },
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    }
  };


  constructor(private dishservice: DishService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location,
  @Inject('BaseURL') public BaseURL: URL ) {
  }

  ngOnInit() {
    this.createForm();
    this.date = new Date();
    this.date.toISOString();
    //this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.dishIds = [1,2,3,4]
    this.route.params.pipe(
      switchMap((params: Params) => { this.visibility = 'hidden'; return DISHES.filter(d => d.id == +params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field as keyof typeof this.formErrors] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field as keyof typeof this.validationMessages];
        for (const key in control.errors) {
          this.formErrors[field as keyof typeof this.formErrors] += messages[key as keyof typeof messages] + ' ';
        }
      }
    }
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.router.navigateByUrl('/menu');
  }

  onSubmit() {
    this.commentObject = this.commentForm.value;
    this.commentObject.date = this.date.toISOString();
    this.dishcopy.comments.push(this.commentObject);
    this.dish = this.dishcopy;
    console.log(this.commentObject);
    this.commentForm.reset({
      rating: '',
      comment: '',
      author: ''
    });
  }

}

