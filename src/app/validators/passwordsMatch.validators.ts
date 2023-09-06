import { AbstractControl, ValidationErrors } from "@angular/forms";

export class passwordsMatch {
  static passwordsMatchValidations(control: AbstractControl): ValidationErrors | null {

    let password = control.parent?.get('password')?.value
    let confirmPassword = control.value

    if (password != confirmPassword) {
      return { passwordsMatchValidator: true };
    } else {
      return null;
    }
  }
}