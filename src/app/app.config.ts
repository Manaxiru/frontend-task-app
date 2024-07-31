import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { EMPTY } from "rxjs";

import { routes } from "./app.routes";
import { loadingInterceptor, apiInterceptor, tokenInterceptor, errorInterceptor } from "@core/interceptors";
import { LocalStorageService, UserService } from "@core/services";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MAT_ICON_DEFAULT_OPTIONS } from "@angular/material/icon";

registerLocaleData(localeEs, "es");

export const appConfig: ApplicationConfig = {
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: initAuth,
			deps: [LocalStorageService, UserService],
			multi: true
		},
		{ provide: LOCALE_ID, useValue: "es-VE" },
		provideRouter(routes),
		provideHttpClient(
			withInterceptors([loadingInterceptor, apiInterceptor, tokenInterceptor, errorInterceptor])
		),
		provideAnimationsAsync(),
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
		{ provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-icons-round' } }
	]
};

export function initAuth(localStorageService: LocalStorageService, userService: UserService) {
	return () => (localStorageService.getItem() ? userService.getCurrentUser() : EMPTY);
}