import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../_services';
import { first } from 'rxjs/operators';

@Component({templateUrl: './register.component.html'})
export class RegisterComponent implements OnInit{
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            cpf: ['', Validators.required],
            email: ['', Validators.required],
            isadmin: ['', Validators.required],            
            password: ['', Validators.required]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }

    isValidCpf() {        
          const cpf = this.f.cpf.value;
          if (cpf) {
            let numbers, digits, sum, i, result, equalDigits;
            equalDigits = 1;
            if (cpf.length < 11) {
             return null;
            }
   
            for (i = 0; i < cpf.length - 1; i++) {
              if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                equalDigits = 0;
                break;
              }
            }
   
            if (!equalDigits) {
              numbers = cpf.substring(0, 9);
              digits = cpf.substring(9);
              sum = 0;
              for (i = 10; i > 1; i--) {
                sum += numbers.charAt(10 - i) * i;
              }
   
              result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   
              if (result !== Number(digits.charAt(0))) {
                return { cpfNotValid: true };
              }
              numbers = cpf.substring(0, 10);
              sum = 0;
   
              for (i = 11; i > 1; i--) {
                sum += numbers.charAt(11 - i) * i;
              }
              result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   
              if (result !== Number(digits.charAt(1))) {
                return { cpfNotValid: true };
              }
              return null;
            } else {
              return { cpfNotValid: true };
            }
         }
       return null;
     };
}

