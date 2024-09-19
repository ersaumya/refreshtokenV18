import { Component, inject } from '@angular/core';
import { Login } from '../../core/models/login';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: Login = {
    EmailId: '',
    Password: '',
  };

  userService = inject(UserService);

  constructor(private router: Router) {}

  login() {
    debugger;
    this.userService.onLogin(this.loginObj).subscribe(
      (res: any) => {
        if (res.result) {
          localStorage.setItem('tokenData', JSON.stringify(res.data));
          localStorage.setItem('tokenDataEmail', res.data.emailId);
          localStorage.setItem('tokenDataUserId', res.data.userId);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert('Incorrect credentials!');
      }
    );
  }
}
