import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox'

const modules = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRadioModule,
  AngularSvgIconModule,
  MatSnackBarModule,
  MatCheckboxModule
]

@NgModule({
  imports: [modules],
  exports: [modules]
})
export class MaterialModule { }
