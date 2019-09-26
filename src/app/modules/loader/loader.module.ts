import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';



@NgModule({
})
export class LoaderModule {  
  static forRoot (): ModuleWithProviders { 
    return { 
      ngModule: LoaderModule, 
      providers: [LoaderService] 
    } 
  } 
}
