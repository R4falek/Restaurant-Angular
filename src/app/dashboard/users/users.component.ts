import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userArray!: Array<any>;

  constructor(private userService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe(data => {
      this.userArray = data;
    })
  }

  onDeleteData(user: any) {
    user.history = []
    this.userService.editUser(user.id, user);
  }

  onEditRole(user: any) {
    if(user.role == 'admin'){
      user.role = 'user'
    } else{
      user.role = 'admin'
    }
    this.userService.editUser(user.id, user)
  }

}
