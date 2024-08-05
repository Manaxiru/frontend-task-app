import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, first, Observable, tap } from 'rxjs';
import { LocalStorageService, UserService } from '@core/services';
import { TOKEN_ENABLED } from '@core/interceptors';
import { InternalBackendRoutes } from '@app/shared/constants';
import { BackendModules } from '@app/shared/enums';
import { IResponse, IUser } from '@app/shared/interfaces';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private localStorageService: LocalStorageService
	) { }

	login(user: Pick<IUser, "email">): Observable<IResponse<IUser>> {
		return this.http.post<IResponse<IUser>>(
			BackendModules.AUTH + `/${InternalBackendRoutes.AUTH.LOGIN}`,
			user,
			{ context: new HttpContext().set(TOKEN_ENABLED, false) }
		)
			.pipe(
				first(),
				tap(res => this.setAuth(res.data as IUser))
			);
	}

	logout(): Observable<IResponse> {
		return this.http.post<IResponse>(BackendModules.AUTH + `/${InternalBackendRoutes.AUTH.LOGOUT}`, undefined)
			.pipe(
				first(),
				finalize(() => this.purgeAuth())
			)
	}

	private setAuth(user: IUser) {
		this.localStorageService.setItem("user", user);
		this.userService.setCurrentUser(user);
	}

	purgeAuth() {
		this.localStorageService.clear();
		this.userService.setCurrentUser(null);
	}
}
