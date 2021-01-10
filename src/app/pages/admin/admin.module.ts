import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '@app/material.module';
// import { PersonasRoutingModule } from './personas/personas-routing.module';
// import { PersonasComponent } from './personas/personas.component';


@NgModule({
  declarations: [AdminComponent, ModalComponent], //PersonasComponent
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    // PersonasRoutingModule,
    // PersonasComponent,
  ],
})
export class AdminModule {}
