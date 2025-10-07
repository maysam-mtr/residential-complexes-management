import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { IAdmin } from '../../core/models/interfaces/admin';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  constructor(private authService: AuthService) {}

  adminRole: string = '';
  admin: IAdmin = {
    id: 0,
    firstName: '',
    lastName: '',
    role: 'BUILDING_ADMIN',
    email: '',
    civility: '',
    phone: '',
    status: 'ACTIVE'
  };

  ngOnInit(): void {
    this.adminRole = this.authService.role || 'Admin';
    if(this.adminRole === 'SUPER_ADMIN'){
      this.adminRole = 'Super Admin'
    }else if (this.adminRole === 'COMPLEX_ADMIN'){
      this.adminRole = 'Complex Admin'
    }else if( this.adminRole === 'BUILDING_ADMIN'){
      this.adminRole = 'Building Admin'
    }else{
      this.adminRole = 'Admin';
    }

    if(this.authService.admin){

       this.admin = this.authService.admin;
    }
  }

}
