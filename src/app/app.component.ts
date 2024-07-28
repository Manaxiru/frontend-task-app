import { NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RouterOutlet } from "@angular/router";
import { LoadingService } from "@shared/services";
import { LoadingComponent } from "@shared/components"
import { Constants } from "@shared/enums";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NgOptimizedImage],
	template: `
		<img [ngSrc]="image" fill>
		<router-outlet />
	`,
	styles: `
		img {
			z-index: -1;
			object-fit: cover;
			filter: brightness(90%);
		}
	`
})
export class AppComponent implements OnInit {
	title = "Task App";
	image = Constants.IMG_ASSETS + "/bg.svg";
	private loadingDialog!: MatDialogRef<LoadingComponent>;
	private isLoading: boolean;

	constructor(
		private loadingService: LoadingService,
		private matDialog: MatDialog
	) {
		this.isLoading = false;
	}

	ngOnInit(): void {
		this.loadingService.getLoading().subscribe(
			status => {
				if (status && !this.isLoading) {
					this.loadingDialog = this.matDialog.open(LoadingComponent,
						{
							disableClose: true,
							closeOnNavigation: false,
							panelClass: "loading-dialog"
						});

					this.isLoading = true;
					this.loadingDialog.afterClosed().subscribe(() => this.isLoading = false);
				}

				if (!status) this.loadingDialog.close();
			}
		)
	}
}
