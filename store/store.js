import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { platformSlice } from './platformSlice';
import { homeRowSlice } from './homeRowSlice';

const useStore = create(
  devtools((set, get) => ({
    ...platformSlice(set, get),
    ...homeRowSlice(set, get),
  }))
);

export default useStore;
