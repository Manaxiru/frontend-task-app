import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from "@shared/components";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private snackBar: MatSnackBar) { }

	openSnackBar(message: string | string[], type: "SUCCESS" | "ERROR" = "SUCCESS") {
		this.snackBar.openFromComponent(
			NotificationComponent,
			{
				data: message,
				panelClass: type === "SUCCESS" ? "success-notification" : "error-notification",
				verticalPosition: "top",
				horizontalPosition: "right"
			});
	}
}
