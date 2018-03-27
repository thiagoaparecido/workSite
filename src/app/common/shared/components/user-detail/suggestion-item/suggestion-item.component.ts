import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {User} from 'common/core/models/user';
import {ProfessionService} from 'common/core/services/profession.service';
import {StorageService} from 'common/core/services/storage.service';
import {Suggestion} from 'common/core/models/suggestion';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent implements OnInit {

  @Input() suggestion: Suggestion;
  @Input() user: User;
  @Output() deleteSuggestion = new EventEmitter<number>();

  profession: string;

  constructor(
    private professionService: ProfessionService,
    private router: Router,
    private storage: StorageService) {}

  ngOnInit(): void {
    this.profession = this.professionService.getProfession(this.suggestion.profession);
  }

  delete(): void {
    this.deleteSuggestion.emit(this.suggestion.id);
  }

  goToSuggestionDetail(): void {
    const suggestionData = {
      suggestionId: this.suggestion.id
    };
    this.storage.setUserData(suggestionData);
    this.router.navigate(['/user', 'suggestion']);
  }

}
