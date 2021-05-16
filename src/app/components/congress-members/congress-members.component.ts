import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CongressService } from 'src/app/services/congress/congress.service';

@Component({
  selector: 'app-congress-members',
  templateUrl: './congress-members.component.html',
  styleUrls: ['./congress-members.component.scss']
})
export class CongressMembersComponent implements OnInit {

  congressInfo = [];
  displayedColumns: string[] = ['title', 'name', 'party', 'state'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private congressService: CongressService,private router: Router) { }

  ngOnInit(): void {
    this.getAllCongressmen();
  }

  getAllCongressmen() {
    let congressmenData;
    this.congressService.getAllCongressmen().subscribe(
      res => {
        console.log(res);
        this.dataSource = new MatTableDataSource<any>(res.results[0].members);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: any) {
    this.router.navigateByUrl(`congressman-detail/${row.id}`)
  }

}
