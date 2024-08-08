import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AppNavigation } from '@app/shared/navigation';
import { AuthService, UserService } from '@app/core/services';
import { NotificationService } from '@app/shared/services';
import { IResponse, IUser } from '@app/shared/interfaces';
import { FormComponent, RegistrationModalComponent } from './components';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		MatCardModule,
		FormComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	private isDialogOpen: boolean;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private matDialog: MatDialog,
		private router: Router,
		private notificationService: NotificationService
	) {
		this.isDialogOpen = false;
	}

	processLogin(value: { email: string }) {
		this.userService.checkEmail(value)
			.pipe(switchMap(() => this.processLoginSwitchMap(value)))
			.subscribe({
				error: ({ error }: IResponse) => {
					if (error.success) this.openRegistrationModal(value);
				}
			})
	}

	private processRegister(value: { email: string }) {
		this.userService.register(value)
			.pipe(switchMap(() => this.processLoginSwitchMap(value)))
			.subscribe({
				error: ({ error }: IResponse) => error.success && this.notificationService.openSnackBar(error.message, "ERROR")
			});
	}

	private openRegistrationModal(data: { email: string }) {
		if (!this.isDialogOpen) {
			const dialogRef = this.matDialog.open(RegistrationModalComponent,
				{
					data,
					disableClose: true,
					closeOnNavigation: true
				});

			this.isDialogOpen = true;

			dialogRef.afterClosed().subscribe(result => {
				if (result) this.processRegister(result);
				this.isDialogOpen = false;
			});
		}
	}

	private processLoginSwitchMap(value: { email: string }): Observable<IResponse<IUser>> {
		return this.authService.login(value)
			.pipe(
				tap({ complete: () => this.router.navigateByUrl(AppNavigation.DASHBOARD) })
			);
	}
}
