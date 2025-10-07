import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  role: any = '';
  links: {name: string, route: string}[] = [];
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router ){}

  ngOnInit(): void {
    this.role = this.authService.role;
    if(this.role === 'SUPER_ADMIN'){
      this.links = [
        { name: 'Dashboard', route: '/dashboard'},
        { name: 'Admins', route: '/admins'},
        { name: 'Complexes', route: '/complexes'},
        { name: 'Buildings', route: '/buildings'}
      ]
    }else if (this.role === 'COMPLEX_ADMIN'){
      this.links = [
        { name: 'Dashboard', route: '/dashboard'},
        { name: 'My Complexes', route: '/mycomplexes'},
      ]
    }else if(this.role === 'BUILDING_ADMIN'){
      this.links = [
        { name: 'Dashboard', route: '/dashboard'},
        { name: 'My Buildings', route: '/mybuildings'}
      ]
    }
    
  }

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
