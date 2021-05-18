import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CongressService } from 'src/app/services/congress/congress.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  loading: boolean = false;

  congressman: any[] = [];

  fullName: string = "";
  dateOfBirth: string = "";
  gender: string = "";
  inOffice: string = "";
  currentParty: string = "";
  lastUpdated: string = "";
  mostRecentVote: string = "";
  roles: any[] = [];
  facebook: string = "";
  twitter: string = "";
  youtube: string = "";
  website: string = "";

  displayedColumns: string[] = ['title', 'service', 'party', 'bills-sponsored'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;



  constructor(private congressService: CongressService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getCongressman(params['id']);
      }
    )
  }

  ngOnInit(): void {


  }


  getCongressman(id: string) {
    this.loading = true;
    this.dataSource = new MatTableDataSource<any>([])
    // this.dataSource = new MatTableDataSource<any>([])
    this.congressService.getCongressman(id).subscribe(
      res => {
        // this.dataSource = new MatTableDataSource<any>(res.results[0].members);
        // if (this.paginator) {
        //   this.dataSource.paginator = this.paginator;
        // }
        this.congressman = res.results;
        this.dataSource = new MatTableDataSource<any>(res.results[0].roles);
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.formatCongressmanData();
      },
      err => {
        this.loading = false;
        console.error('error caught in service');
      }
    )

  }

  formatCongressmanData() {
    this.fullName = " "
    if (this.congressman[0].first_name) {
      this.fullName += this.congressman[0].first_name + " ";
    }

    if (this.congressman[0].middle_name) {
      this.fullName += this.congressman[0].middle_name + " ";
    }

    if (this.congressman[0].last_name) {
      this.fullName += this.congressman[0].last_name + " ";
    }

    if (this.congressman[0].suffix) {
      this.fullName += this.congressman[0].suffix;
    }
    this.dateOfBirth = this.congressman[0].date_of_birth;

    if (this.congressman[0].gender == "M") {
      this.gender = "Male";
    }

    else if (this.congressman[0].gender == "F") {
      this.gender = "Female";
    }
    else {
      this.gender = this.congressman[0].gender;
    }
    if (this.congressman[0].in_office == true) {
      this.inOffice = "In Office";
    }
    else {
      this.inOffice = "Service Ended";
    }

    if(this.congressman[0].current_party == "D"){
      this.currentParty = "Democrat";
    }
    else if(this.congressman[0].current_party == "R"){
      this.currentParty = "Republic";
    }
    else{
      this.currentParty = this.congressman[0].current_party;
    }

    this.lastUpdated = this.congressman[0].last_updated;
    this.mostRecentVote = this.congressman[0].most_recent_vote;

    if (this.congressman[0].facebook_account) {
      this.facebook = "https://www.facebook.com/" + this.congressman[0].facebook_account;
    }

    if (this.congressman[0].twitter_account) {
      this.twitter = "https://twitter.com/" + this.congressman[0].twitter_account;
    }

    if (this.congressman[0].youtube_account) {
      this.youtube = "https://www.youtube.com/user/" + this.congressman[0].youtube_account;
    }
    this.website = this.congressman[0].url;
    // this.roles = ;

    this.loading = false;
  }
}
