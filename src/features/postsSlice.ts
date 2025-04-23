import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'First Post',
      content: 'This is the content of the first post.',
      author: 'Regular User',
      status: 'published',
      createdAt: '2023-05-10T08:20:00Z',
    },
    {
      id: '2',
      title: 'Pending Post',
      content: 'This post is waiting for approval.',
      author: 'New User',
      status: 'pending',
      createdAt: '2023-05-14T15:45:00Z',
    },
    {
      id: '3',
      title: 'Inappropriate Post',
      content: 'This post contains inappropriate content.',
      author: 'Problem User',
      status: 'rejected',
      createdAt: '2023-05-12T11:30:00Z',
    },
  ],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    approvePost(state, action: PayloadAction<string>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.status = 'published';
      }
    },
    rejectPost(state, action: PayloadAction<string>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.status = 'rejected';
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { approvePost, rejectPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;