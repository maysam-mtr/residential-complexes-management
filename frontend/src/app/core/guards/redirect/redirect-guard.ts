import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { inject } from '@angular/core';

export const redirectGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(!authService.isLoggedIn()){
      router.navigate(['/login']);
      return false;
    }

    const role = authService.role;
    if(role === 'SUPER_ADMIN') router.navigate(['/dashboard/super']);
    else if(role === 'COMPLEX_ADMIN') router.navigate(['/dashboard/complex']);
    else if(role === 'BUILDING_ADMIN') router.navigate(['/dashboard/building']);
    else router.navigate(['/unauthorized']);

    return false;

};
