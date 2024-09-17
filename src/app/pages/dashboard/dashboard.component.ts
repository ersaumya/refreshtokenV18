import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }
}
