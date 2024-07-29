import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '@core/services';

export const TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
	let tokenReq = req;
	if (req.context.get(TOKEN_ENABLED)) {
		tokenReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${inject(UserService).currentUserSignal()?.token}`
			}
		});
	}
	return next(tokenReq);
};
