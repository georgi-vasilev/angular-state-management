import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  patchState,
  withComputed
} from '@ngrx/signals';
import { switchMap, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserState {
  users: User[];
  search: string;
}

const initialState: UserState = {
  users: [],
  search: '',
};

export const UserStore = signalStore(
  withState(initialState),

  withComputed(({ users, search }) => ({
    filteredUsers: computed(() =>
      users().filter((user: User) =>
        user.name.toLowerCase().includes(search().toLowerCase())
      )
    ),
  })),

  withMethods((store, http = inject(HttpClient)) => ({
    addUser(user: User) {
      const updatedUsers = [...store.users(), user];
      patchState(store, { users: updatedUsers });
    },
    removeUser(id: number) {
      const updatedUsers = store.users().filter((user: User) => user.id !== id);
      patchState(store, { users: updatedUsers });
    },
    updateSearch(search: string) {
      patchState(store, { search });
    },
    loadUsers: rxMethod<void>(
      pipe(
        switchMap(() => {
          return http.get<User[]>('https://jsonplaceholder.typicode.com/users')
            .pipe(
              tap((users) => {
                patchState(store, { users });
              })
            );
        })
      )
    ),
    batchEditUsers(updates: { id: number; changes: Partial<User> }[]) {
      const updatedUsers = store.users().map(user => {
        const update = updates.find(u => u.id === user.id);
        return update ? { ...user, ...update.changes } : user;
      });

      patchState(store, { users: updatedUsers });
    },
  })),

  withHooks({
    onInit(store) {
      store.loadUsers();
    },
  })
);

