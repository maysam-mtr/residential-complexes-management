import { Component, OnInit } from '@angular/core';
import { IAdmin } from '../../core/models/interfaces/admin';
import { IBuilding } from '../../core/models/interfaces/building';
import { BuildingListService } from '../../core/services/buildings-list/building-list-service';
import { AdminsListService } from '../../core/services/admin-list/admins-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from '../../shared/modal/modal';
import { IComplex } from '../../core/models/interfaces/complex';
import { ComplexListService } from '../../core/services/complex-list/complex-list';

@Component({
  selector: 'app-building-list',
  imports: [CommonModule, FormsModule, Modal],
  templateUrl: './building-list.html',
  styleUrl: './building-list.css'
})
export class BuildingList implements OnInit{
  admins: IAdmin[] =[];
  buildings: IBuilding[] = [];
  adminMap: Record<number, string> = {};
  showAddModal: boolean = false;
  newBuilding = {
     name: '',
     admin_id: 0,
     complex_id: 0
   };

  complexes: IComplex[] = [];
  filteredBuildings: IBuilding[] = [];
  selectedComplexId: number = 0;
 
  constructor(
    private buildingService: BuildingListService, 
    private adminsListService: AdminsListService,
    private complexService: ComplexListService) {}


  ngOnInit(): void {
    this.getBuildings();
    this.getAdmins();
    this.getComplexes();
  }
   
  getBuildings(){
    this.buildingService.getAllBuildings()
    .subscribe({
      next: res => {
        console.log(res)
        if(res.success && res.data){
          this.buildings = res.data.buildings;
          this.filteredBuildings = [...this.buildings]

        }else{
          alert("Failed to get buildings. Try again")
        }
      },
      error: err => {
        console.error('Error:', err);
        alert("Failed to get buildings. Try again");
      }
    })
  }

  addBuilding(){
    this.buildingService.addBuilding(this.newBuilding)
    .subscribe({next: res => {
      if(res.success){
        alert("Building Added!")
        this.getBuildings();
      }else{
        alert("Failed to add building try again")
      }
      },
      error: err => {
        const errors = err.error.error;

        let allMessages = Object.values(errors).flat().join(', '); 
        console.error('Error:', err);
        alert("An error occurred while adding building: " + allMessages);
      }
    })
  }

  deleteBuilding(id: number){
    this.buildingService.deleteBuilding(id)
    .subscribe({next: res => {
      if(res.success){
        alert("Building Deleted!")
        this.getBuildings();
      }else{
        alert("Failed to delete building try again")
      }
      },
      error: err => {
        const errors = err.error.error;

        let allMessages = Object.values(errors).flat().join(', '); 
        console.error('Error:', err);
        alert("An error occurred while deleting building: " + allMessages);
      }
    })
  }

  filterBuildings(){
    if ( this.selectedComplexId == 0) {
      this.filteredBuildings = [...this.buildings];
    } else {
      this.filteredBuildings = this.buildings.filter(
      b => b.complex_id === +this.selectedComplexId
      );
    }
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

  getComplexes() {
    this.complexService.getAllComplexes().subscribe({
      next: res => {
        if (res.success && res.data) {
          this.complexes = res.data.complexes;
        } else {
          alert("Failed to get complexes. Try again");
        }
      },
      error: err => {
        console.error(err);
        alert("Failed to get complexes. Try again");
      }
  });
}


  openAddBuildingModal(){
    this.showAddModal = true;
  }
}
