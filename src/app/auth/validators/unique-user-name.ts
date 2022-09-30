import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueUserName implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate = (control: AbstractControl): any => {
    const { value } = control;
    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        map((value) => {
          if (value.available) {
            return null;
          }
        })
      );
  };
}
