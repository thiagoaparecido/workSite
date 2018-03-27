import { NgModule } from '@angular/core';
import {DexieModule, DexieConfig} from 'ngx-dexie';

const config: DexieConfig = {
  databaseName: 'AppDatabase',
  schema: {
    users: '++id,email,password,firstName,surName,dateOfBirth,gender,isAdmin,firm,city,*chats',
    resumes: '++id,userId,userName,gender,city,experience,description,salary,profession',
    suggestions: '++id,userId,employerName,city,salary,profession,description'
  }
};

@NgModule({
  imports: [
    DexieModule.forRoot(config)
  ],
  exports: [
    DexieModule
  ]
})
export class DatabaseModule { }
