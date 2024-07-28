import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@app/shared/services';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
	const loadingService = inject(LoadingService);
	if (loadingService.getCount() === 0) loadingService.setLoading();
	loadingService.addCount();
	return next(req).pipe(
		finalize(() => {
			loadingService.subCount();
			if (loadingService.getCount() === 0) loadingService.setLoading(false);
		})
	);
};
