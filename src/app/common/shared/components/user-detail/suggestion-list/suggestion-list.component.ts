import {Component, Input, OnInit} from '@angular/core';

import {User} from 'common/core/models/user';
import {Suggestion} from 'common/core/models/suggestion';
import {SuggestionService} from 'common/core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.scss']
})
export class SuggestionListComponent implements OnInit {
  @Input() user: User;

  suggestions: Suggestion[];
  noSuggestionsMsg: boolean;

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit(): void {
    this.suggestionService.getSuggestions(this.user.id)
      .subscribe(
        (suggestion) => {
          this.suggestions = suggestion;
          this.noSuggestionsMsg = !!this.suggestions.length;
        }
      );
  }

  deleteSuggestion(suggestionId: number): void {
    this.suggestionService.deleteSuggestion(suggestionId)
      .subscribe(
        () => {
          this.suggestionService.getSuggestions(this.user.id)
            .subscribe(
              (suggestions) => {
                this.suggestions = suggestions;
                this.noSuggestionsMsg = !!this.suggestions.length;
              }
            );
        }
      );
  }
}
