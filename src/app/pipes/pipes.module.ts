import { NgModule } from '@angular/core';
import { TranslatePipe } from './translation.pipe';
@NgModule({
  declarations: [
    TranslatePipe
  ],
  providers: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class PipesModule {}
