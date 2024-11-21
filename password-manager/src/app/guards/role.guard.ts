import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (route.data['roles'] && route.data['roles'].includes(authService.role)) {
    return true;
  }

  const router = inject(Router);
  router.navigate(['/login']);

  return false;
};