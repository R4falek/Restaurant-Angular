import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { passwordsMatch } from 'src/app/validators/passwordsMatch.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formStatus: string = 'Zaloguj';
  registerForm: any;
  loginForm: any;

  constructor(private authService: AuthService, private fb: FormBuilder, private userService: UsersService) {
    this.registerForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
      passwordCheck: ['', [Validators.required, passwordsMatch.passwordsMatchValidations]]
    })

    this.loginForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
    })
  }

  onSubmit(data: any) {
    if (this.formStatus == 'Zaloguj') {
      this.authService.login(data.email, data.password)
    } else if (this.formStatus == 'Zarejestruj') {
      this.authService.registerUser(data.email, data.password);
    }
  }

  registerToggle() {
    if (this.formStatus == 'Zarejestruj') {
      this.formStatus = 'Zaloguj'
    } else {
      this.formStatus = 'Zarejestruj';
    }
    this.loginForm.reset();
    this.registerForm.reset();
  }

  get fc(){
    return this.loginForm.controls;
  }

  get fcRegister(){
    return this.registerForm.controls;
  }

}
