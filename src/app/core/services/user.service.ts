import { effect, inject, Injectable, Injector, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { first, Observable, tap } from 'rxjs';
import { LocalStorageService } from '@core/services';
import { NotificationService, UtilFunctionsService } from '@app/shared/services';
import { AppNavigation } from '@app/shared/navigation';
import { BackendModules, Messages } from '@app/shared/enums';
import { IResponse, IUser } from '@app/shared/interfaces';
import { GenericCrud } from '@app/shared/classes';

@Injectable({
	providedIn: 'root'
})
export class UserService extends GenericCrud {
	private localStorageService: LocalStorageService = inject(LocalStorageService);
	private utilFunctionsService: UtilFunctionsService = inject(UtilFunctionsService);
	private notificationService: NotificationService = inject(NotificationService);
	private router: Router = inject(Router);
	currentUserSignal: WritableSignal<IUser | null>;

	constructor(private injector: Injector) {
		super(BackendModules.USERS);
		this.currentUserSignal = signal(null);
		// effect(() => { console.log(`The current user is: ${this.currentUserSignal()?.email}`); });
	}

	checkEmail(user: Pick<IUser, "email">): Observable<IResponse> { return super.readOne(user.email, false); }

	register(user: Pick<IUser, "email">): Observable<IResponse> { return super.create(user, false); }

	getCurrentUser(): Observable<IUser | null> {
		return toObservable(this.currentUserSignal, { injector: this.injector })
			.pipe(
				first(),
				tap({
					next: () => {
						if (this.utilFunctionsService.isValidToken(this.localStorageService.getItem()))
							this.setCurrentUser(this.localStorageService.getItem());
						else
							this.clearCurrentUser();
					},
					error: () => this.clearCurrentUser()
				})
			);
	}

	setCurrentUser(data: IUser | null) { this.currentUserSignal.set(data); }

	private clearCurrentUser() {
		this.localStorageService.clear();
		this.setCurrentUser(null);
		this.notificationService.openSnackBar(Messages.TOKEN_INVALID, "ERROR");
		this.router.navigateByUrl(AppNavigation.ROOT);
	}
}
