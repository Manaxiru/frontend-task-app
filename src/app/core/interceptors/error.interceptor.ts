import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '@app/shared/services';
import { IResponse } from '@app/shared/interfaces';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const notificationService = inject(NotificationService);
	return next(req)
		.pipe(
			catchError(
				(err: HttpErrorResponse) => {
					console.log("👀 ~ errorInterceptor catchError err:", err, typeof err.error === "object");
					if (typeof err.error === "object" && err.status !== 0) {
						if ((err.error as IResponse).message)
							!(err.error as IResponse).success && notificationService.openSnackBar((err.error as IResponse).message, "ERROR");
					} else notificationService.openSnackBar(err.statusText, "ERROR");

					return throwError(() => err);
				}
			)
		);
};
