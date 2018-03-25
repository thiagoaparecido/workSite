import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {StorageService} from 'common/core/services/storage.service';
import {User} from 'common/shared/models/user';
import {Resume} from 'common/shared/models/resume';
import {ProfessionService} from 'common/core/services/profession.service';

@Component({
  selector: 'app-resume-item',
  templateUrl: './resume-item.component.html',
  styleUrls: ['./resume-item.component.scss']
})
export class ResumeItemComponent implements OnInit {

  @Input() resume: Resume;
  @Input() user: User;
  @Output() deleteResume = new EventEmitter<number>();

  profession: string;

  constructor(
    private professionService: ProfessionService,
    private router: Router,
    private storage: StorageService) {}

  ngOnInit(): void {
    this.profession = this.professionService.getProfession(this.resume.profession);
  }

  delete(): void {
    this.deleteResume.emit(this.resume.id);
  }

  goToResumeDetail(): void {
    const resumeData = {
      resumeId: this.resume.id
    };
    this.storage.setUserData(resumeData);
    this.router.navigate(['/user', 'resume']);
  }
}
