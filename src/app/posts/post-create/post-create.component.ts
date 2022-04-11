import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})


export class PostCreateComponent implements OnInit {


  enteredTitle = '';
  enteredContent = '';



  constructor(public postsService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.postsService.addPost(form.value.title, form.value.content);
    console.log(this.postsService.getPosts())

  }

}
