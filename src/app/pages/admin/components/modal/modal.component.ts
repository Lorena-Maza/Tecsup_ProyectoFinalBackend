import { UsersService } from './../../services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormUsers } from '@shared/utils/base-form-users';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUsers,
    private dialogRef: MatDialogRef<ModalComponent>,
    private userSvc: UsersService
  ) {}

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('usuId')) {
      this.actionTODO = Action.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password').setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.pathFormData();
    }
  }

  onSave(): void {
    let formValue = this.userForm.baseForm.value;
    formValue.usuCumple = formValue.usuCumple.toISOString().substring(0,10);
    // console.log(formValue.usuCumple);
    if (formValue.role==='admin'){
      formValue.is_superuser=true;
      formValue.is_staff=true;
    }else{
      formValue.is_superuser=false;
      formValue.is_staff=true;
    }
    console.log(formValue);
    if (this.actionTODO === Action.NEW) {
      this.userSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.dialogRef.close();
      });
    } else {
      const userId = this.data?.user?.usuId;
      this.userSvc.update(userId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field);
  }

  private pathFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
    });
  }
}
