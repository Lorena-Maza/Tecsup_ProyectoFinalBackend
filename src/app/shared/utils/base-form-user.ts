import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
    role: ['', [Validators.required]],
    usuNombre : ['',[Validators.minLength(0)]],
    usuFono : ['',[Validators.minLength(0)]],
    usuCumple : ['',[Validators.minLength(0)]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'Usted tiene que ingresar un valor.',
        pattern: 'No es un correo válido',
        minlength: `Este campo tiene que contener por lo menos ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
