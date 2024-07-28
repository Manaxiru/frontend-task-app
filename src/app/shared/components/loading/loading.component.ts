import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [MatProgressSpinnerModule],
	template: "<mat-spinner></mat-spinner>",
	styleUrl: "./loading.component.scss"
})
export class LoadingComponent { }
