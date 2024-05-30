import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { InfoSnackBarComponent } from './component/info-snack-bar/info-snack-bar.component';

@NgModule({
    declarations: [
    
    InfoSnackBarComponent
  ],
    imports: [
        HttpClientModule,
        SharedModule,
    ],
    exports: [],
    providers: [
        
    ]
})

export class CoreModule { }
