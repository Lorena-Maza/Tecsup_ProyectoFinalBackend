import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasComponent } from './personas.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [PersonasComponent],
  imports: [CommonModule, PersonasRoutingModule, MaterialModule] 
})
export class PersonasModule {}
