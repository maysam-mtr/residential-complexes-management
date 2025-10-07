import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { NgModule } from '@angular/core';
import { NotFound } from './features/not-found/not-found';
import { authGuard } from './core/guards/auth/auth-guard';
import { roleGuard } from './core/guards/role/role-guard';
import { ComplexesList } from './features/complexes-list/complexes-list';
import { BuildingList } from './features/building-list/building-list';
import { Unauthorized } from './features/unauthorized/unauthorized';
import { MainLayout } from './shared/main-layout/main-layout';
import { redirectGuard } from './core/guards/redirect/redirect-guard';
import { AdminsList } from './features/admins-list/admins-list';
import { ComplexAdminComplexes } from './features/complex-admin-complexes/complex-admin-complexes';
import { Dashboard } from './features/dashboard/dashboard';
import { BuildingAdminBuildings } from './features/building-admin-buildings/building-admin-buildings';

export const routes: Routes = [
    {path: '', canActivate: [redirectGuard], pathMatch: 'full', component: NotFound},
    {path: "login", component: LoginComponent},
    {
        path: '',
        component: MainLayout,
        canActivate:[authGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'admins',
                canActivate: [roleGuard],
                data: {roles: ['SUPER_ADMIN']},
                component: AdminsList
            },
            {
                path: 'complexes',
                canActivate: [roleGuard],
                data: {roles: ['SUPER_ADMIN']},
                component: ComplexesList
            },
            {
                path: 'buildings',
                canActivate: [roleGuard],
                data: {roles: ['SUPER_ADMIN']},
                component: BuildingList
            },
            {
                path: 'mycomplexes',
                canActivate: [roleGuard],
                data: {roles: ['COMPLEX_ADMIN']},
                component: ComplexAdminComplexes
            },
            {
                path: 'mybuildings',
                canActivate: [roleGuard],
                data: {roles: ['BUILDING_ADMIN']},
                component: BuildingAdminBuildings
            },
        ]
    },
    {path: 'unauthorized', component: Unauthorized},
    {path: '**', component: NotFound}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }