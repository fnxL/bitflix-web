import Row from '../components/Row/Row';

export const homeRowSlice = (set, get) => ({
  homeFeatured: undefined,
  setHomeFeatured: (item) => set({ homeFeatured: item }),
  homeRowData: [],
  homeHasMore: true,
  homeRowCount: 1,
  homeHandleNext: (rows) => {
    if (get().homeRowData.length === rows.length) return;
    const render = [];
    for (let i = 0; i < get().homeRowCount; i++) {
      render.push(<Row key={rows[i].id} {...rows[i]} />);
    }
    set((state) => ({
      homeRowData: render,
      homeRowCount: state.homeRowCount + 1,
    }));
    if (get().homeRowData.length === rows.length) set({ homeHasMore: false });
  },
});
