import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, UserService } from '@app/core/services';
import { AppNavigation } from '@app/shared/navigation';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [MatToolbarModule, DatePipe, UpperCasePipe, MatButtonModule, RouterOutlet],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

	constructor(
		public userService: UserService,
		private authService: AuthService,
		private router: Router
	) { }

	logout() {
		this.authService.logout()
			.pipe(finalize(() => this.router.navigateByUrl(AppNavigation.ROOT)))
			.subscribe();
	}
}
