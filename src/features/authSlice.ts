import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  password?: string; 
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async Thunk for login
export const login = createAsyncThunk<LoginResponse, LoginCredentials, {
  rejectValue: string;
}>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock users database
      const mockUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin' as const,
          avatar: '/avatars/admin.png',
        },
        {
          id: '2',
          name: 'Regular User',
          email: 'user@example.com',
          password: 'user123',
          role: 'user' as const,
          avatar: '/avatars/user.png',
        },
      ];

      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password before returning
      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ...(user.avatar && { avatar: user.avatar }) // Optional avatar
      };
      const token = `mock-token-${user.id}`;
      return { user: userWithoutPassword, token };
      
      return { user: userWithoutPassword, token };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
    changePassword: (state, action: PayloadAction<{ newPassword: string }>) => {
        if (state.user) {
          // In a real app, you would hash the password before storing
          // This is just for demonstration
          state.user.password = action.payload.newPassword;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      });
  },
});

// Export actions and reducer
export const { logout, updateProfile, updateAvatar, changePassword  } = authSlice.actions;
export default authSlice.reducer;