import {Injectable} from '@angular/core';

import {professions} from 'common/core/constants/professions';

@Injectable()
export class ProfessionService {
  professions = professions;

  getProfessions(): string[] {
    return this.professions;
  }

  getProfession(id: number): string {
    return this.professions[id];
  }
}
