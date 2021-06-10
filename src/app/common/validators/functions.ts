import {
	AbstractControl,
	ValidatorFn,
	FormGroup,
	ValidationErrors,
	NgForm
} from '@angular/forms';

export function validateInputs(form: NgForm) {
	Object.keys(form.controls).forEach(controlName => {
		form.controls[controlName].markAsDirty();
	});
}

export function sameAsValidator(controls: string[]): ValidatorFn {
	return (control: FormGroup): ValidationErrors | null => {

		const firstControl = control.get(controls[0]);
		const secondControl = control.get(controls[1]);

		if (!firstControl || !secondControl) { return null; }

		return firstControl.value !== secondControl.value ? { sameAs: { value: control.value } } : null;
	};
}
