import {Component, Input, OnInit} from '@angular/core';

import {User} from 'common/core/models/user';
import {Resume} from 'common/core/models/resume';
import {ResumeService} from 'common/core/services/resume.service';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {

  @Input() user: User;

  $resumes: Resume[];
  noResumesMsg: boolean;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.resumeService.getResumes(this.user.id)
      .subscribe(
        (resumes) => {
          this.$resumes = resumes;
          this.noResumesMsg = !!this.$resumes.length;
        }
      );
  }

  deleteResume(resumeId: number): void {
    this.resumeService.deleteResume(this.user.id, resumeId)
      .subscribe(
        () => {
          this.resumeService.getResumes(this.user.id)
            .subscribe(
              (resumes) => {
                this.$resumes = resumes;
                this.noResumesMsg = !!this.$resumes.length;
              }
            );
        }
      );
  }
}
