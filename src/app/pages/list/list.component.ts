import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserserviceService } from 'src/app/services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list = new MatTableDataSource<any>();
  displayedColumns: string[] = ['firstname', 'lastname', 'birthday', 'email', "update", "delete"];

  constructor(
    private userService: UserserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.get()
  }

  get() {
    this.userService.getEmployee().subscribe((res: any) => {
      if ( res ) {
        this.list.data = res
      }
    });
  }

  create() {
    this.router.navigate(['/create']);
  }

  update(id) {
    this.router.navigate(['/update/' + id]);
  }

  delete(id) {
    this.userService.daleteEmployee(id).subscribe((res: any) => {
      if ( res ) {
        this.get()
      }
    });
  }

}
