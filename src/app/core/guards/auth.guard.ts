import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppNavigation } from '@app/shared/navigation';
import { UserService } from '@core/services';

export const authGuard: CanActivateFn = () => {
	return inject(UserService).currentUserSignal() ? true : inject(Router).createUrlTree([AppNavigation.ROOT]);
};

export const noAuthGuard: CanActivateFn = () => {
	return !inject(UserService).currentUserSignal() ? true : inject(Router).createUrlTree(['/' + AppNavigation.DASHBOARD]);
};