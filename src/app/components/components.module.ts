import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import {
  NgbModule,
  NgbNavModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap'
import * as sharedComponents from './shared'
import { ModalContentComponent } from './shared/modal/modal-content.component'
import { FormGeneratorComponent } from './form-generator/form-generator.component'
import { ListComponent } from './list/list.component'
import { PipesModule } from '../pipes/pipes.module'
import { FooterComponent } from './footer/footer.component'
import { LogoComponent } from './logo/logo.component'
@NgModule({
  declarations: [
    ...sharedComponents.components,
    ModalContentComponent,
    ListComponent,
    FormGeneratorComponent,
    FooterComponent,
    LogoComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    NgbNavModule,
    NgbModalModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    FooterComponent,
    NgbModule,
    FormsModule,
    NgbNavModule,
    NgbModalModule,
    ReactiveFormsModule,
    ListComponent,
    FormGeneratorComponent,
    LogoComponent,
    ...sharedComponents.components,
  ],
  entryComponents: [ModalContentComponent],
})
export class SharedComponentsModule {}