import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { IAdmin } from '../../core/models/interfaces/admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminsListService } from '../../core/services/admin-list/admins-list';
import { Modal } from '../../shared/modal/modal';

@Component({
  selector: 'app-admins-list',
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './admins-list.html',
  styleUrl: './admins-list.css'
})
export class AdminsList implements OnInit{
  searchQuery: string = '';
  currentPage: number = 1;
  limit: number = 10;
  totalAdmins: number = 0;
  admins: IAdmin[] = [];
  showAddModal: boolean = false;
  newAdmin = {
    first_name: '',
    last_name: '',
    email: '',
    civility: '',
    phone: '',
    role: 0,
    password: ''
  };

  constructor(private authService: AuthService, private adminsListService: AdminsListService) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.adminsListService.getAllAdmins(this.currentPage, this.limit, this.searchQuery)
    .subscribe({
      next: res => {
        if(res.success && res.data){
          this.admins = res.data.admins;
          this.totalAdmins = res.data.total;
        }else{
          alert("Failed to get admins. Try again")
        }
      },
      error: err => {
        console.error('Error:', err);
        alert("Failed to get admins. Try again");
      }
    })
  }

  onSearch() {
    this.currentPage = 1;
    this.getAdmins();
    
  }

  nextPage() {
    this.currentPage++;
    this.getAdmins();
  }

  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.getAdmins();
    }
  }

  openAddAdminModal(){
    this.showAddModal = true
  }

  addAdmin(){
    console.log(this.newAdmin)
    this.newAdmin.role = +this.newAdmin.role
    this.adminsListService.addAdmin(this.newAdmin)
    .subscribe({next: res => {
      if(res.success){
        alert("Admin Added!")
      }else{
        alert("Failed to add admin try again")
      }
      },
      error: err => {
        const errors = err.error.error;

        let allMessages = Object.values(errors).flat().join(', '); 
        console.error('Error:', err);
        alert("An error occurred while adding admin: " + allMessages);
      }
    })
  }
}
