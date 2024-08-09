import { ChangeDetectionStrategy, Component, effect, input, OnInit, output, signal, TemplateRef, untracked, viewChild, WritableSignal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NotificationService, UtilFunctionsService } from '@app/shared/services';
import { ModelFormGroup } from '@app/shared/interfaces';
import { TasksService } from '../../services';
import { ITask } from '../../interfaces';

@Component({
	selector: 'app-task',
	standalone: true,
	imports: [
		NgClass,
		DatePipe,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogTitle,
		MatDialogActions,
		MatDialogClose,
		TextFieldModule,
		CdkDrag,
		CdkDragHandle
	],
	templateUrl: './task.component.html',
	styleUrl: './task.component.scss',
	animations: [
		trigger("showFormTrigger", [
			transition(":enter", [
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 }))
			]),
			transition(":leave", [animate(125, style({ height: 0, opacity: 0 }))])
		]),
		trigger("showCardTrigger", [
			transition(":enter", [
				style({ height: 0, opacity: 0 }),
				animate(125, style({ height: '*', opacity: 1 }))
			])
		])
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
	tasks = input.required<ITask[]>({ alias: "userTasks" });
	tasksAdjustedSignal: WritableSignal<(ITask & { editMode: boolean })[]>;
	showDraggable = input.required<boolean>();
	onTaskChange = output({ alias: "reloadTasks" });
	onTaskDragChange = output({ alias: "draggingTasks" });

	taskSelected: ITask | null;

	form!: ModelFormGroup<Pick<ITask, "id" | "title" | "description">>;

	private confirmDialog = viewChild<TemplateRef<any>>("confirmDialog");
	private isDialogOpen: boolean;

	constructor(
		private fb: FormBuilder,
		private tasksService: TasksService,
		private matDialog: MatDialog,
		private notificationService: NotificationService,
		public utilFunctionsService: UtilFunctionsService
	) {
		this.taskSelected = null;
		this.isDialogOpen = false;
		this.tasksAdjustedSignal = signal([]);
		effect(() => {
			this.tasks();
			untracked(() => this.tasksAdjustedSignal.set(this.tasks().map(x => ({ ...x, editMode: false }))));
		});
	}

	ngOnInit(): void {
		this.taskSelected = null;
	}

	private createForm(task: ITask) {
		this.form = this.fb.group({
			id: ['', Validators.required],
			title: ['', Validators.required],
			description: ['', Validators.required]
		});
		this.form.patchValue(task);
	}

	editTask(task: ITask) {
		this.createForm(task);
		this.taskSelected = task;
		this.tasksAdjustedSignal.update(x => x.map(y => ({ ...y, editMode: y.id === task.id })));
	}

	completed(task: ITask) {
		this.tasksService.update(task.id, { completed: !task.completed }).subscribe(res => {
			if (res.success) {
				this.notificationService.openSnackBar(res.message, "SUCCESS");
				this.taskSelected = null;
				this.onTaskChange.emit();
			}
		});
	}

	back() {
		this.taskSelected = null;
		this.tasksAdjustedSignal.update(x => x.map(y => ({ ...y, editMode: false })));
	}

	onSubmit() {
		if (!this.utilFunctionsService.validateForm(this.form)) return;
		const formValue = this.utilFunctionsService.getFormTouchedValues(this.form) as ITask;
		this.tasksService.update(this.form.value.id!, formValue).subscribe(res => {
			if (res.success) {
				this.notificationService.openSnackBar(res.message, "SUCCESS");
				this.taskSelected = null;
				this.onTaskChange.emit();
			}
		});
	}

	confirmAction(task: ITask) {
		if (!this.isDialogOpen) {
			this.taskSelected = task;
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
