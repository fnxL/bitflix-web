import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { platformSlice } from './platformSlice';
import { homeRowSlice } from './homeRowSlice';
import { tvRowSlice } from './tvRowSlice';

const useStore = create(
  devtools((set, get) => ({
    ...platformSlice(set, get),
    ...homeRowSlice(set, get),
    ...tvRowSlice(set, get),
  }))
);

export default useStore;
