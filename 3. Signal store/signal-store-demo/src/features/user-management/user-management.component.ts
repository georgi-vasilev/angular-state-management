import { Component, OnInit, effect, inject } from '@angular/core';
import { UserStore } from '../+store/user.state';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
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
  searchForm!: FormGroup;
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  snack = inject(MatSnackBar);

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

  removeUser(id: number) {
    this.store.removeUser(id);
    this.snack.open('User removed successfully!', 'Close', { duration: 3000 });
  }
}
