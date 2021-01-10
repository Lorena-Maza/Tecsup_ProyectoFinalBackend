import { takeUntil } from 'rxjs/operators';
import { PersonasService } from '../services/personas.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss'],
})
export class PersonasComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['perId', 'perDni','perNombres','perApellidos', 'perCorreo', 'perCelular', 'actions'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private personasSvc: PersonasService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.personasSvc.getAll().subscribe((personas:any) => {
      this.dataSource.data = personas.content;      
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  onDelete(personaId: number): void {
    if (window.confirm('Do you really want remove this Person')) {
      this.personasSvc
        .delete(personaId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          window.alert(res);
          // Update result after deleting the user.
          this.personasSvc.getAll().subscribe((personas) => {
            this.dataSource.data = personas;
          });
        });
    }
  }

  onOpenModal(persona = {}): void {
    console.log('Persona->', persona);
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '550px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New Person', persona},      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new user.
      this.personasSvc.getAll().subscribe((personas) => {
        this.dataSource.data = personas;
        console.log('Persona->', personas);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

