import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class UtilFunctionsService {

	validateForm(form: FormGroup): boolean {
		if (form.invalid) {
			for (const i in form.controls) {
				form.controls[i].markAsTouched();
				form.controls[i].updateValueAndValidity();
			}
		} else {
			for (const i in form.controls) {
				form.controls[i].markAsDirty();
				form.controls[i].updateValueAndValidity();
			}
		}
		return form.valid;
	}

	validateFormInHTML = (control: AbstractControl): boolean => control.invalid && (control.dirty || control.touched);

	errorText(errors: ValidationErrors | null): string {
		if (errors) {
			return Object.entries(errors).map(
				([key, value]) => {
					switch (key) {
						case "required": return "El campo no puede estar vacío";
						case "pattern": return "Debe tener un formato correcto";
						case "integersOnly": return "Debe ser solo un número entero";
						case "min": return `Debe ser mayor o igual a ${value.min}`;
						case "max": return `Debe ser menor o igual a ${value.max}`;
						case "minlength": return `Debe contener al menos ${value.requiredLength} caracteres`;
						case "maxlength": return `Máximo ${value.requiredLength} caracteres`;
						case "email": return "Debe tener un formato correcto de correo";
						default: return "Error";
					}
				}
			).join(", ");
		}
		return '';
	}
}
