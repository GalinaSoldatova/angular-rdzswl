import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

@Component({
  selector: 'my-app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  isFetching = false;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  userForm = this.fb.group({
    username: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(24),
    ]),
    email: ['', [Validators.required, Validators.email]],
    type: ['user', Validators.required],
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(24),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*?[^ws]).{5,24}$'),
    ]),
  });

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get type() {
    return this.userForm.get('type');
  }

  get password() {
    return this.userForm.get('password');
  }

  onSubmit() {
    console.warn(this.userForm.value);
    this.createUser(this.userForm.value);
  }

  private async createUser(user: UserDto) {
    this.isFetching = true;

    await new Promise((res) => setTimeout(res, 2500));

    if (Math.random() < 0.5) {
      this.isFetching = false;
      return Promise.reject('Request Failed');
    }

    // Backend call happening here.

    // TODO - we can
    //this.http.post('http://localhost:3000/register', user).subscribe({
    this.http
      .post('https://node-rwunh6--3000.local.webcontainer.io/register', user)
      .subscribe({
        next: (response) => {
          this.isFetching = false;
          console.log(response);
        },
        error: (error) => {
          this.isFetching = false;
          console.log(error);
        },
      });

    return { username: user.username, email: user.email, type: user.type };
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
