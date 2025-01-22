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
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  providers: [UserStore],
})
export class UserManagementComponent implements OnInit {
  store = inject(UserStore);
  searchForm!: FormGroup;
  fb = inject(FormBuilder);
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

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')!.value;
    this.store.updateSearch(searchTerm);
  }

  removeUser(id: number) {
    this.store.removeUser(id);
    this.snack.open('User removed successfully!', 'Close', { duration: 3000 });
  }

  filteredUsers() {
    const users = this.store.users();
    const search = this.store.search();
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
