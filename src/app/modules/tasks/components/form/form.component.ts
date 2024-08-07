import { Component, OnInit, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { LoadingService, NotificationService, UtilFunctionsService } from '@app/shared/services';
import { ModelFormGroup } from '@app/shared/interfaces';
import { TasksService } from '../../services';
import { ITask } from '../../interfaces';

@Component({
	selector: 'app-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
		TextFieldModule,
		AsyncPipe
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
	onTaskCreated = output<boolean>({ alias: "reloadTasks" });
	form!: ModelFormGroup<Pick<ITask, "title" | "description" | "completed">>;

	constructor(
		private fb: FormBuilder,
		private tasksService: TasksService,
		private notificationService: NotificationService,
		public loadingService: LoadingService,
		public utilFunctionsService: UtilFunctionsService
	) { }

	ngOnInit(): void { this.createForm(); }

	private createForm() {
		this.form = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			completed: Boolean(null)
		});
	}

	onSubmit() {
		if (!this.utilFunctionsService.validateForm(this.form)) return;
		this.tasksService.create(this.form.value as ITask).subscribe(res => {
			if (res.success) {
				this.notificationService.openSnackBar(res.message, "SUCCESS");
				this.close(true);
			}
		});
	}

	close(created: boolean = false) { this.onTaskCreated.emit(created); }
}