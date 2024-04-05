export const SortableColumnsMixin = Base => class extends Base {
  enableColumnSorting() {
    console.log('SortableColumnsMixin enabled');
  }
};