import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService, UtilFunctionsService } from '@app/shared/services';

@Component({
	selector: 'app-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		AsyncPipe
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
	@Input() value!: { email: string };
	@Output() private formValue = new EventEmitter<{ email: string }>();
	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		public loadingService: LoadingService,
		public utilFunctionsService: UtilFunctionsService
	) { }

	ngOnInit(): void { this.createForm(this.value); }

	private createForm(value: { email: string }) {
		this.form = this.fb.group({ email: [null, [Validators.required, Validators.email]] });
		value && this.form.patchValue(value);
	}

	onSubmit() {
		if (!this.utilFunctionsService.validateForm(this.form)) return;
		this.formValue.emit(this.form.value);
	}

	close() { this.formValue.emit(undefined); }
}
