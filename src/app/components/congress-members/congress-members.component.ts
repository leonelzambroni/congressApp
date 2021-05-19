import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CongressService } from 'src/app/services/congress/congress.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

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
  advancedFilter: boolean = false;

  public searchForm: FormGroup | undefined;
  public name = '';
  public party = '';
  public birth = '';

  public basicSearchForm: FormGroup | undefined;
  public congress = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(private congressService: CongressService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.searchFormInit()
    this.getAllCongressmen(this.chamberGroups[0].name, this.chamberGroups[0].congressNumber[0]);



  }

    getAllCongressmen(name: string, number: string) {
    this.loading = true;
    this.dataSource = new MatTableDataSource<any>([])
    this.congressService.getAllCongressmen(name, number).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res.results[0].members);
        this.searchFormInit();
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

  searchFormInit() {
    this.searchForm = new FormGroup({
      name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      party: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      birth: new FormControl(''),
    });
    this.basicSearchForm = new FormGroup({
      congress: new FormControl('')
    })
  }

  /* this method well be called for each row in table  */
  getFilterPredicate() {
    return (row: any, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const birth = filterArray[0];
      const party = filterArray[1];
      const name = filterArray[2];

      const matchFilter = [];

      // Fetch data from row
      const columnBirth = row.date_of_birth;
      const columnParty = row.party;
      const columnName = row.first_name + ' ' + row.last_name;

      // verify fetching data by our searching values
      const customFilterB = columnBirth.toLowerCase().includes(birth);
      const customFilterP = columnParty.toLowerCase().includes(party);
      const customFilterN = columnName.toLowerCase().includes(name);

      // push boolean values into array
      matchFilter.push(customFilterB);
      matchFilter.push(customFilterP);
      matchFilter.push(customFilterN);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  toggleAdvancedFilters() {
    this.advancedFilter = !this.advancedFilter;
    if (this.advancedFilter == true) {
      this.dataSource.filterPredicate = this.getFilterPredicate();
    }
    else {
      this.dataSource.filterPredicate =
        function (data, filter) {
          var dataStr = Object.keys(data).reduce(function (currentTerm, key) {
            return currentTerm + data[key] + '◬';
          }, '').toLowerCase();
          var transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) != -1;

        };
    }
    this.dataSource.filter = "";


  }

  applyAdvancedFilter() {
    
    if (this.searchForm) {
      const date = this.searchForm.get('birth')!.value;
      const p = this.searchForm.get('party')!.value;
      const n = this.searchForm.get('name')!.value;

      this.birth = (date === null || date === '') ? '' : date.toDateString();
      if (this.birth != '') {
        this.birth = formatDate(this.birth, 'yyyy-MM-dd', 'en_US')
      }
      this.name = n === null ? '' : n;
      this.party = p === null ? '' : p;

      // create string of our searching values and split if by '$'
      const filterValue = this.birth + '$' + this.party + '$' + this.name;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  getRow(row: any) {
    this.router.navigateByUrl(`congressman-detail/${row.id}`)
  }

}
