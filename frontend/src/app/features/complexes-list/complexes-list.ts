import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/modal/modal';
import { IComplex } from '../../core/models/interfaces/complex';
import { ComplexListService } from '../../core/services/complex-list/complex-list';
import { Router } from '@angular/router';
import { AdminsListService } from '../../core/services/admin-list/admins-list';
import { IAdmin } from '../../core/models/interfaces/admin';
import { IBuilding } from '../../core/models/interfaces/building';

@Component({
  selector: 'app-complexes-list',
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './complexes-list.html',
  styleUrl: './complexes-list.css'
})
export class ComplexesList implements OnInit{
  complexes: IComplex[] = [];
  admins: IAdmin[] =[];
  buildingsMap: Record<number, IBuilding[]> = {};
  adminMap: Record<number, string> = {};
  showAddModal: boolean = false;
  newComplex = {
     identity: '',
     address: '',
     campaign_info: '',
     admin_id: 0,
   };
 
  constructor(
    private complexListService: ComplexListService, 
    private adminsListService: AdminsListService) {}


  ngOnInit(): void {
    this.getComplexes();
    this.getAdmins();
  }
   
  getComplexes(){
    this.complexListService.getAllComplexes()
    .subscribe({
      next: res => {
        console.log(res)
        if(res.success && res.data){
          this.complexes = res.data.complexes;

          this.complexes.forEach(complex => {
            this.complexListService.getComplexBuildings(complex.id).subscribe({
              next: buildingsRes => {
                if (buildingsRes.success && buildingsRes.data) {
                  this.buildingsMap[complex.id] = buildingsRes.data.buildings;
                } else {
                  this.buildingsMap[complex.id] = [];
                }
              },
              error: err => {
                console.error(`Error fetching buildings for complex ${complex.id}`, err);
                this.buildingsMap[complex.id] = [];
              }
            });
          })
        }else{
          alert("Failed to get complexed. Try again")
        }
      },
      error: err => {
        console.error('Error:', err);
        alert("Failed to get complexes. Try again");
      }
    })
  }

  addComplex(){
    console.log(this.newComplex)
    this.complexListService.addComplex(this.newComplex)
    .subscribe({next: res => {
      if(res.success){
        alert("Complex Added!")
      }else{
        alert("Failed to add complex try again")
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

  getAdmins(){
    this.adminsListService.getAllAdmins(1, 1000)
    .subscribe({
      next: res => {
        if(res.success && res.data){
          this.admins = res.data.admins;
          this.admins.forEach(admin => {
          this.adminMap[admin.id] = `${admin.firstName} ${admin.lastName}`;
           });
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

  openAddComplexModal(){
    this.showAddModal = true
  }

}
