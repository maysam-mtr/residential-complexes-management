import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminsListService } from '../../core/services/admin-list/admins-list';
import { IComplex } from '../../core/models/interfaces/complex';
import { AuthService } from '../../core/services/auth';
import { ComplexListService } from '../../core/services/complex-list/complex-list';
import { IBuilding } from '../../core/models/interfaces/building';

@Component({
  selector: 'app-complex-admin-complexes',
  imports: [CommonModule],
  templateUrl: './complex-admin-complexes.html',
  styleUrl: './complex-admin-complexes.css'
})
export class ComplexAdminComplexes implements OnInit{
  complexes: IComplex[] = [];
  buildingsMap: Record<number, IBuilding[]> = {}
  adminId: number = 0;

  constructor(private adminService: AdminsListService,
    private authService: AuthService,
    private complexServices: ComplexListService
  ){}

    ngOnInit(): void {
      this.adminId = this.authService.admin?.id || 0;
      this.getComplexes();
    }

  getComplexes(){
    this.adminService.getAdminComplexes(this.adminId)
    .subscribe({
      next: res => {
        console.log(res)
        if(res.success && res.data){
          this.complexes = res.data.complexes;

          this.complexes.forEach(complex => {
            this.complexServices.getComplexBuildings(complex.id).subscribe({
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
}
