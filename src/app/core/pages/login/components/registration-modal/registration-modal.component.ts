import { Component, Inject } from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from '@angular/material/dialog';
import { FormComponent } from '../index'

@Component({
	selector: 'app-registration-modal',
	standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogContent,
		FormComponent
	],
	templateUrl: './registration-modal.component.html',
	styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {
	constructor(
		public dialogRef: MatDialogRef<RegistrationModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { email: string }
	) { }
}
