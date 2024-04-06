class Sortable {
    constructor() {
        this.currentColumn = null;
        this.isAscending = true;
    }

    apply(table) {
        table.columns.forEach((column, index) => {
            // Добавляем обработчик клика на заголовок столбца
            column.element.addEventListener('click', () => {
                // Определяем, нужно ли менять направление сортировки
                if (this.currentColumn === index) {
                    this.isAscending = !this.isAscending;
                } else {
                    this.currentColumn = index;
                    this.isAscending = true;
                }

                const sortedData = this.sortData(table.data, column.field);
                table.setData(sortedData);
                table.render();
            });
        });
    }

    sortData(data, field) {
        return data.slice().sort((a, b) => {
            if (a[field] < b[field]) return this.isAscending ? -1 : 1;
            if (a[field] > b[field]) return this.isAscending ? 1 : -1;
            return 0;
        });
    }
}

export default Sortable;