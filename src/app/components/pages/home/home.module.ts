import { PostComponent } from './../../posts/post/post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule} from '../../../material.module';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [HomeComponent, PostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MatCardModule
  ]
})
export class HomeModule { }
