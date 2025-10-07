import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if(res.success){
          this.router.navigate(['/dashboard'])
        }else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        console.error(err)
        this.errorMessage = "Invalid email or password"
        alert(this.errorMessage)
      }
    })
  }
}
