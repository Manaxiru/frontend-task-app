import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarLabel } from '@angular/material/snack-bar';

@Component({
	selector: 'app-notification',
	standalone: true,
	imports: [MatSnackBarLabel],
	template: `
		@for (item of getType(data); track $index) {
		<p matSnackBarLabel class="p2"> {{item}} </p>
	}
	`,
	styles: ''
})
export class NotificationComponent {

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string | string[]) { }

	getType(data: string | string[]): string | string[] { return !Array.isArray(data) ? [data] : data; }
}
