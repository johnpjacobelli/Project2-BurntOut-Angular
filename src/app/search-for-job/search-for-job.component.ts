import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../services/job';
import { JobService } from '../services/job.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-search-for-job',
  templateUrl: './search-for-job.component.html',
  styleUrls: ['./search-for-job.component.css']
})
export class SearchForJobComponent implements OnInit {
  pageTitle = "Search for a job";

  jobs : Job [];

  jobsFilteredByName : Job [] = [];

  constructor(private router : Router, private jobServ : JobService, private sessServ: SessionService) {
    //this.jobsFilteredByName = this.jobs;
   }

 
  jobsByNameFilterString = "";

  get jobsByNameFilter() : string {
    return this.jobsByNameFilterString;
  }

  set jobsByNameFilter(temp:string) {
    this.jobsByNameFilterString = temp;
    this.jobsFilteredByName = this.jobsByNameFilterString ? 
    this.performFilter(this.jobsByNameFilterString) : this.jobs;
}

performFilter(filterBy:string) : Job[] {
    filterBy = filterBy.toLowerCase();
    return this.jobs.filter((job:Job)=> {
        return (job.title.toLowerCase().indexOf(filterBy) !==-1) 
                || (job.locationName.toLowerCase().indexOf(filterBy) !==-1)
                || (job.companyName.toLowerCase().indexOf(filterBy) !==-1)
                || (job.industryName.toLowerCase().indexOf(filterBy) !==-1);
    });
}

  ngOnInit(): void {
    if(this.sessServ.verifySession()){

    } else {
      window.location.href = '/login';
    }
    this.getAllJobs();
  }

  getAllJobs() : void {
    let thisArray : Job [];
    this.jobServ.retrieveAllJobs().subscribe (
      response => {
      console.log(response[0]);
      console.log(response);
      console.log(typeof(response));
      console.log(typeof(response[0]));
      thisArray = Object.values(response);
      
      console.log(thisArray);
      this.jobs = thisArray;
      }
    )
  }

  goToAppFormPage() : void {
    this.router.navigate(['jobs/application']);
  }
}
