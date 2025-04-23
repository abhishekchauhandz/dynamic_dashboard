import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'disabled';
  lastLogin: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2023-05-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Regular User',
      email: 'user@example.com',
      role: 'user',
      status: 'active',
      lastLogin: '2023-05-14T15:45:00Z',
    },
    {
      id: '3',
      name: 'Disabled User',
      email: 'disabled@example.com',
      role: 'user',
      status: 'disabled',
      lastLogin: '2023-05-10T08:20:00Z',
    },
  ],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserRole(
      state,
      action: PayloadAction<{ id: string; role: 'admin' | 'user' }>
    ) {
      const user = state.users.find((u) => u.id === action.payload.id);
      if (user) {
        user.role = action.payload.role;
      }
    },
    toggleUserStatus(state, action: PayloadAction<string>) {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.status = user.status === 'active' ? 'disabled' : 'active';
      }
    },
  },
});

export const { updateUserRole, toggleUserStatus } = usersSlice.actions;

export default usersSlice.reducer;