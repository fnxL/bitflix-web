import { Row } from '../components';

export const tvRowSlice = (set, get) => ({
  tvFeatured: undefined,
  setTvFeatured: (item) => set({ tvFeatured: item }),
  tvRowData: [],
  tvHasMore: true,
  tvRowCount: 1,
  tvHandleNext: (rows) => {
    if (get().tvRowData.length === rows.length) return;
    const render = [];
    for (let i = 0; i < get().tvRowCount; i++) {
      render.push(<Row key={rows[i].id} {...rows[i]} />);
    }
    set((state) => ({
      tvRowData: render,
      tvRowCount: state.tvRowCount + 1,
    }));
    if (get().tvRowData.length === rows.length) set({ tvHasMore: false });
  },
});
