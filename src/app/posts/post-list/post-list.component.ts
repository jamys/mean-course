import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, PostService } from '../';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  constructor(public postsService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string): void {
    this.postsService.deletePost(postId);
  }

}
