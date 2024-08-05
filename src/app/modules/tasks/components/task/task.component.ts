import { Component, input, OnInit, output, TemplateRef, viewChild } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { NotificationService } from '@app/shared/services';
import { TasksService } from '../../services';
import { ITask } from '../../interfaces';

@Component({
	selector: 'app-task',
	standalone: true,
	imports: [
		NgClass,
		DatePipe,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatDialogTitle,
		MatDialogActions,
		MatDialogClose
	],
	templateUrl: './task.component.html',
	styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
	tasks = input.required<ITask[]>({ alias: "userTasks" });
	onTaskChange = output({ alias: "reloadTasks" });

	taskSelected: ITask | null;

	confirmDialog = viewChild<TemplateRef<any>>("confirmDialog");
	isDialogOpen: boolean;

	constructor(
		private tasksService: TasksService,
		private matDialog: MatDialog,
		private notificationService: NotificationService
	) {
		this.taskSelected = null;
		this.isDialogOpen = false;
	}

	ngOnInit(): void {
		this.taskSelected = null;
		this.isDialogOpen = false;
	}

	confirmAction(task: ITask) {
		if (!this.isDialogOpen) {
			const dialogRef = this.matDialog.open(this.confirmDialog() as TemplateRef<any>,
				{
					panelClass: "confirm-dialog",
					disableClose: true,
					closeOnNavigation: true
				});

			this.isDialogOpen = true;

			dialogRef.afterClosed().subscribe(result => {
				if (result) this.deleteTask(task);
				this.isDialogOpen = false;
			});

		}
	}

	private deleteTask(task: ITask) {
		this.tasksService.delete(task.id).subscribe(res => {
			if (res.success) {
				this.notificationService.openSnackBar(res.message, "SUCCESS");
				this.taskSelected = null;
				this.onTaskChange.emit();
			}
		});
	}
}
