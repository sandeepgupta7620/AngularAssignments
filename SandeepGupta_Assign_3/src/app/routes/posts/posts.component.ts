import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Correctly import MatTableModule
import { User } from '../../shared/models/User';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatTableModule,MatProgressBarModule,MatInputModule,MatFormFieldModule, MatSortModule, MatPaginatorModule], // Add MatTableModule here
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit{
  userList!: User[];
  
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiservice: ApiService){}

  ngOnInit(): void {
    this.getPostData();
  }

  getPostData() {
    this.apiservice.getPosts()
    .subscribe((res:any)=>{
      this.userList =res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      console.table(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if( this.dataSource.paginator) {
      this.dataSource.paginator.firstPage;
    }
  }
}