import { Component, OnInit } from '@angular/core';
import {ProfessionService} from 'common/core/services/profession.service';

import {StorageService} from 'common/core/services/storage.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {Suggestion} from 'common/core/models/suggestion';
import {SuggestionService} from 'common/core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.scss']
})
export class SuggestionDetailComponent implements OnInit {

  suggestion: Suggestion;
  profession: string;

  constructor(
    private route: ActivatedRoute,
    private professionService: ProfessionService,
    private suggestionService: SuggestionService,
    private location: Location,
    private router: Router,
    private storage: StorageService) { }

  ngOnInit(): void {
    const storageUserData = this.storage.getUserData();
    this.suggestionService.getSuggestion(storageUserData.suggestionId)
      .subscribe((suggestion: Suggestion) => {
        this.suggestion = suggestion;
        this.profession = this.professionService.getProfession(this.suggestion.profession);
      });
  }

  deleteSuggestion(): void {
    this.suggestionService.deleteSuggestion(this.suggestion.id)
      .subscribe(
        () => {
          this.location.back();
        }
      );
  }

}
