import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  darkMode: boolean;
  sidebarCollapsed: boolean;
  currentPageTitle: string;
}

const initialState: UIState = {
  darkMode: false,
  sidebarCollapsed: false,
  currentPageTitle: 'Dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
        state.sidebarCollapsed = action.payload;
      },
    setPageTitle(state, action: PayloadAction<string>) {
      state.currentPageTitle = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setPageTitle, setSidebarCollapsed } = uiSlice.actions;

export default uiSlice.reducer;