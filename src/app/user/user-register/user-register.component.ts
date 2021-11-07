import { AlertifyService } from './../../services/alertify.service';
import { User } from './../../model/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;
  user!: User;
  userSubmitted: boolean = false;
  //we could make the code of the form group more easier and shorter by using form builder
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(11)])
    // }, this.passwordMatchingValidator);

    this.createRegisterationForm();

    //the calling for custom validaiton
    this.registerationForm.setValidators(this.passwordMatchingValidator);
  }

  //the other way using form builder
  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(11)]]
    });
  }

  //we used key and value in the method to use the key in the html (not matched)
  passwordMatchingValidator(fg: AbstractControl): Validators | any {
    return (fg.get('password')?.value === fg.get('confirmPassword')?.value) ? null : {notmatched: true};
  }

  onSubmit() {
    this.userSubmitted = true;

    if (this.registerationForm.valid) {
      //this.user = Object.assign(this.user, this.registerationForm.value);

      //use model instead of using Object.assign()
      this.userService.addUser(this.userData());

      this.registerationForm.reset();
      this.userSubmitted = false;


      this.alertify.success("Congrats, you are successfully registered");
    } else {
      this.alertify.error("Kindly provide the required fields");
    }
  }

  userData(): User {
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      mobile: this.mobile.value,
      password: this.password.value,
    }
  }

  //getter methods for all form controls
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }
  //................................................
}
