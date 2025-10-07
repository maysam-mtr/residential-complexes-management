import { Component } from '@angular/core';
import { IBuilding } from '../../core/models/interfaces/building';
import { AuthService } from '../../core/services/auth';
import { BuildingListService } from '../../core/services/buildings-list/building-list-service';
import { AdminsListService } from '../../core/services/admin-list/admins-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-building-admin-buildings',
  imports: [CommonModule],
  templateUrl: './building-admin-buildings.html',
  styleUrl: './building-admin-buildings.css'
})
export class BuildingAdminBuildings {
  buildings: IBuilding[] = [];
  adminId: number = 0;

  constructor(
      private adminService: AdminsListService,
      private authService: AuthService) {}
  
  
    ngOnInit(): void {
      this.adminId = this.authService.admin?.id || 0;
      this.getBuildings();
    }

    getBuildings(){
      this.adminService.getAdminBuildings(this.adminId)
    .subscribe({
      next: res => {
        console.log(res)
        if(res.success && res.data){
          this.buildings = res.data.buildings;
        }else{
          alert("Failed to get buildings. Try again")
        }
      },
      error: err => {
        console.error('Error:', err);
        alert("Failed to get complexes. Try again");
      }
    })

    }
}
