import { effect, inject, Injectable, Injector, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { first, Observable, tap } from 'rxjs';
import { LocalStorageService } from '@core/services';
import { BackendModules } from '@app/shared/enums';
import { IResponse, IUser } from '@app/shared/interfaces';
import { GenericCrud } from '@app/shared/classes';

@Injectable({
	providedIn: 'root'
})
export class UserService extends GenericCrud {
	private localStorageService: LocalStorageService = inject(LocalStorageService);
	currentUserSignal: WritableSignal<IUser | null>;

	constructor(private injector: Injector) {
		super(BackendModules.USERS);
		this.currentUserSignal = signal(null);
		effect(() => { console.log(`The current user is: ${this.currentUserSignal()?.email}`); });
	}

	checkEmail(user: Pick<IUser, "email">): Observable<IResponse> { return super.readOne(user.email); }

	register(user: Pick<IUser, "email">): Observable<IResponse> { return super.create(user); }

	getCurrentUser(): Observable<IUser | null> {
		return toObservable(this.currentUserSignal, { injector: this.injector })
			.pipe(
				first(),
				tap({
					next: () => this.setCurrentUser(this.localStorageService.getItem()),
					error: () => {
						this.setCurrentUser(null);
						this.localStorageService.clear();
					}
				})
			);
	}

	setCurrentUser(data: IUser | null) { this.currentUserSignal.set(data); }
}
