import { Component, OnInit, effect, inject } from '@angular/core';
import { User, UserStore } from '../+store/user.state';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    AddUserDialogComponent,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  providers: [UserStore],
})
export class UserManagementComponent implements OnInit {
  store = inject(UserStore);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  snack = inject(MatSnackBar);

  searchForm!: FormGroup;
  editDataSource: any[] = [];
  editForm!: FormGroup;
  editMode = false;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    effect(() => {
      const searchTerm = this.searchForm.get('searchTerm')!.value;
      this.store.updateSearch(searchTerm);
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result) {
          const newUser = { id: Date.now(), ...result };
          this.store.addUser(newUser);
        }
      });
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')!.value;
    this.store.updateSearch(searchTerm);
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.store.updateSearch('');
  }

  removeUser(id: number): void {
    this.store.removeUser(id);
    this.snack.open('User removed successfully!', 'Close', { duration: 3000 });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.searchForm.get('searchTerm')?.setValue('');
      this.store.updateSearch('');
      this.initEditForm();
    }
  }


  initEditForm(): void {
    const users = this.store.users();

    this.editForm = this.fb.group({
      users: this.fb.array(
        users.map(user =>
          this.fb.group({
            id: [user.id],
            name: [user.name, Validators.required],
            username: [user.username],
            email: [user.email, [Validators.required, Validators.email]],
          })
        )
      ),
    });
  }


  get usersFormArray(): FormArray {
    console.log('Users Form Array:', this.editForm.get('users')?.value);
    return this.editForm.get('users') as FormArray;
  }


  saveAllEdits(): void {
    const updates = this.editForm.value.users
      .map((user: User) => ({
        id: user.id,
        changes: {
          name: user.name,
          username: user.username,
          email: user.email,
        },
      }));

    this.store.batchEditUsers(updates);
    this.snack.open('Batch edits saved successfully!', 'Close', { duration: 3000 });
    this.editMode = false;
  }
}
