import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService, 
    private router: Router 
  ) { 
    
  }

  get f() { return this.myForm.controls; }

  ngOnInit() {
    this.myForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  submit() {
    if (this.myForm.valid) {
      // this.userService.login(this.myForm.value.Email, this.myForm.value.Password).subscribe((res: any) => {
      //   if( !res.errors ) {
      //     localStorage.setItem('jwt', res.data.tokenAuth.token);
      //     this.userService.getCurrentUser().valueChanges.subscribe((result: any) =>  {
      //       localStorage.setItem('currentUser', JSON.stringify(result.data.user));
      //       this.userService.currentUserSubject.next(result.data.user);
      //       this.router.navigateByUrl('dashboard');
      //     });
      //   }
      // });
    }
  }

}
