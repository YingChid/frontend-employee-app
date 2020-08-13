import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  myForm: any;
  id = null;
  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService, 
    private router: Router ,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = this.activatedRoute.snapshot.params.id;
    });
  }

  get f() { return this.myForm.controls; }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    if(this.id) {
      this.userService.getEmployeeById(this.id).subscribe((res: any) => {
        this.myForm = this.fb.group({
          firstname: [res.firstname, Validators.required],
          lastname: [res.lastname, Validators.required],
          birthday: [res.birthday, Validators.required],
          email: [res.email, [Validators.required, Validators.email]],
        });
      });
    }
    
  }

  submit() {
    if (this.myForm.valid){
      if(this.id) {
        this.userService.putEmployee(this.id, this.myForm.value).subscribe(
          (data) => this.router.navigateByUrl('list'),
          (error) => { alert(error.error[0].message) }
        );
      } else {
        this.userService.postEmployee(this.myForm.value).subscribe(
          (data) => this.router.navigateByUrl('list'),
          (error) => { alert(error.error[0].message) }
        );
      }
    }
  }

}
