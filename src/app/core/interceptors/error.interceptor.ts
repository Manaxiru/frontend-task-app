import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@core/services';
import { NotificationService } from '@app/shared/services';
import { AppNavigation } from '@app/shared/navigation';
import { IResponse } from '@app/shared/interfaces';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const notificationService = inject(NotificationService);
	const authService = inject(AuthService);
	const router = inject(Router);
	return next(req)
		.pipe(
			catchError(
				(err: HttpErrorResponse) => {
					if (typeof err.error === "object" && err.status !== 0) {
						if ((err.error as IResponse).message)
							!(err.error as IResponse).success && notificationService.openSnackBar((err.error as IResponse).message, "ERROR");
						if (err.status === HttpStatusCode.Unauthorized) {
							authService.purgeAuth();
							router.navigateByUrl(AppNavigation.ROOT);
						}
					} else notificationService.openSnackBar(err.statusText, "ERROR");

					return throwError(() => err);
				}
			)
		);
};
