import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { LAYOUT_MODE } from '../../layouts/layouts.model';
import { LoginLogoutService } from 'src/app/core/services/api/master/loginlogout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;

  constructor(
    // private formBuilder: UntypedFormBuilder,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // private authenticationService: AuthenticationService,
    // private authFackservice: AuthfakeauthenticationService,
    private loginService: LoginLogoutService
  ) {
    // redirect to home if already logged in
    
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE
    if (this.layout_mode === 'dark') {
      document.body.setAttribute("data-bs-theme", "dark");
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.body.setAttribute('data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      // if (environment.defaultauth === 'firebase') {
      //   this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
      //     this.router.navigate(['/']);
      //   })
      //     .catch(error => {
      //       this.error = error ? error : '';
      //     });
      // } else {
        // this.authFackservice.login(this.f.email.value, this.f.password.value)
        //   .pipe(first())
        //   .subscribe(
        //     data => {
        //       this.router.navigate(['/']);
        //     },
        //     error => {
        //       this.error = error ? error : '';
        //     });
        const payload = {
          userEmail: this.loginForm.value.email,
          userPassword: this.loginForm.value.password
        };
        
        this.loginService.LoginAPI(payload)
          .subscribe(
            data => {
              this.router.navigate(['/']);
            },
            error => {
              // Extract and show backend error message
              this.error = error?.error?.message || 'Login failed. Please try again.';
            }
          );
        
            
      // }
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
