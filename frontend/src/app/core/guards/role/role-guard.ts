import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data['roles'] ?? [];
  const adminRole = authService.role;

  if(adminRole && allowedRoles.includes(adminRole)){
    return true;
  }else{
    router.navigate(['/unauthorized']);
    return false;
  }
};
