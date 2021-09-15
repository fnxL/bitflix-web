import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { platformSlice } from './platformSlice';

const useStore = create(
  devtools((set, get) => ({
    ...platformSlice(set, get),
  }))
);

export default useStore;
