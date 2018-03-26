import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProfessionService} from 'common/core/services/profession.service';
import {ResumeService} from 'common/core/services/resume.service';
import {Resume} from 'common/core/models/resume';
import {StorageService} from 'common/core/services/storage.service';

@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.scss']
})
export class ResumeDetailComponent implements OnInit {

  resume: Resume;
  profession: string;

  constructor(
    private route: ActivatedRoute,
    private professionService: ProfessionService,
    private resumeService: ResumeService,
    private location: Location,
    private router: Router,
    private storage: StorageService) { }

  ngOnInit(): void {
    const storageUserData = this.storage.getUserData();
    this.resumeService.getResume(storageUserData.userId, storageUserData.resumeId)
      .subscribe((resume: Resume) => {
        this.resume = resume;
        this.profession = this.professionService.getProfession(this.resume.profession);
      });
  }

  deleteResume(): void {
    this.resumeService.deleteResume(this.resume.userId, this.resume.id)
      .subscribe(
        () => {
          this.location.back();
        }
      );
  }

}
