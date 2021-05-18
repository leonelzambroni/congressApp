import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CongressService } from 'src/app/services/congress/congress.service';
import { FormControl } from '@angular/forms';

interface chamberGroup {
  name: string;
  congressNumber: string[];
}

@Component({
  selector: 'app-congress-members',
  templateUrl: './congress-members.component.html',
  styleUrls: ['./congress-members.component.scss']
})
export class CongressMembersComponent implements OnInit {

  loading: boolean = false;
  chamberControl = new FormControl();
  chamberGroups: chamberGroup[] = [
    {
      name: 'House',
      congressNumber: ['102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117']
    },
    {
      name: 'Senate',
      congressNumber: ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99',
        '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117']
    },
  ]

  congressInfo = [];
  displayedColumns: string[] = ['title', 'name', 'party', 'state'];
  dataSource = new MatTableDataSource<any>([]);
  filterObj = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private congressService: CongressService, private router: Router, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllCongressmen(this.chamberGroups[0].name, this.chamberGroups[0].congressNumber[0]);
  }

  getAllCongressmen(name: string, number: string) {
    this.loading = true;
    this.dataSource = new MatTableDataSource<any>([])
    this.congressService.getAllCongressmen(name, number).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res.results[0].members);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('error caught in service');
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

  applyAdvancedFilter(key: string, filterValue?: string) {
    this.filterObj = {
      value: filterValue?.trim().toLowerCase(),
      key: key
    }
    if (filterValue) {
      this.dataSource.filter = filterValue;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getRow(row: any) {
    this.router.navigateByUrl(`congressman-detail/${row.id}`)
  }

}
