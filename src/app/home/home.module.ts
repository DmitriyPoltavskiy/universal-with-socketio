import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';

import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    TranslateModule.forChild(),
    MatTabsModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
