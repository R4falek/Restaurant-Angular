import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentArray!: Array<any>;
  @Input() id!: string;
  nick: string = 'Gość';

  constructor(private commentService: CommentsService, private route: ActivatedRoute, private authService: AuthService, private userService: UsersService) { }

  ngOnInit(): void {
    this.authService.userLoggedIn.subscribe(val => {
      if (val) {
        this.userService.loadUsers().subscribe(data => {
          const userData = data.find(user => user['uid'] == val.uid)
          this.nick = JSON.parse(JSON.stringify(userData)).email;
        })
      }
    })

    this.commentService.loadComments(this.id).subscribe(data => {
      this.commentArray = data;
      this.commentArray = this.commentArray.sort((a, b) => b.date - a.date)
    })
  }

  onSubmit(form: any) {
    const newComment: Comment = {
      nick: this.nick,
      comment: form.value.opinion,
      date: new Date()
    }
    this.commentService.saveComment(this.id, newComment);
    form.reset()
  }

}
