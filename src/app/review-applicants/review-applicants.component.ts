
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../services/application';
import { JobService } from '../services/job.service';
import { JobPosting } from '../services/jobPosting';
import { SessionService } from '../services/session.service';
import { ViewApplicantsService } from '../services/view-applicants.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-review-applicants',
  templateUrl: './review-applicants.component.html',
  styleUrls: ['./review-applicants.component.css']
})
export class ReviewApplicantsComponent implements OnInit {

  constructor(private router: Router, private viewAppServ: ViewApplicantsService, private route: ActivatedRoute,
    private route: ActivatedRoute, private sessServ:SessionService, private jobServ:JobService, @Inject(DOCUMENT) private document: Document) { }
 
  applicants: Application[];
  postingId: Number;
  private sub: any;
  posterId: number;
  private url: string;

  ngOnInit(): void {
    this.verification=false;
    this.sub = this.route.params.subscribe(params => {
      this.postingId = +params['id']; // (+) converts string 'id' to a number
      this.getSessionInfo(this.postingId);
   });
  }

  getAllApplicants() : void {
    let thisArray : Application [];
    this.viewAppServ.retrieveAllApplicants(this.postingId).subscribe (
      response => {
      thisArray = Object.values(response);
      this.applicants = thisArray;
      }
    )
  }

  getUrl(firstName, lastName, postingId) : string {
    this.url = "https://burntout.s3.amazonaws.com/" + firstName + lastName+ "JobId" + postingId;
    return this.url;
  }

  approveApplicant(applicationId: number): void{
    this.viewAppServ.postApproveApplicant(applicationId).subscribe (
      response => {
        
      },
      error => {
       
      }
    )
  }

  rejectApplicant(applicationId: number): void{
    this.viewAppServ.postRejectApplicant(applicationId).subscribe (
      response => {
        
      }
    )
  }

  getSessionInfo(postingId:Number){
     this.jobServ.retrieveJobByPostingId(postingId).subscribe(
      response=>{
        console.log(response);
        this.posterId = response.poster_id;
        console.log(this.posterId);
        if(this.sessServ.verifyUser(this.posterId)){
          this.getAllApplicants();
        } else{
          window.alert('You do not have access to this page')
  //        location.href='/'
        }
        },
      error=>{
        console.log(error);
        return false;
      }
    )
  }

}
 