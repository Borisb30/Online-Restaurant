import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-snack-bar',
  templateUrl: './info-snack-bar.component.html',
  styleUrls: ['./info-snack-bar.component.scss']
})

export class InfoSnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void { }

}
