import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { EMPTY } from "rxjs";

import { routes } from "./app.routes";
import { loadingInterceptor, apiInterceptor, errorInterceptor } from "@core/interceptors";
import { LocalStorageService, UserService } from "@core/services";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initAuth,
			deps: [LocalStorageService, UserService],
			multi: true
		},
		provideRouter(routes),
		provideHttpClient(
			withInterceptors([loadingInterceptor, apiInterceptor, errorInterceptor])
		),
		provideAnimationsAsync(),
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
	]
};

export function initAuth(localStorageService: LocalStorageService, userService: UserService) {
	return () => (localStorageService.getItem() ? userService.getCurrentUser() : EMPTY);
}