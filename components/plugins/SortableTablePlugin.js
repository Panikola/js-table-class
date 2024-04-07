import TablePlugin from './TablePlugin.js';

class SortableTablePlugin extends TablePlugin {
	#currentColumnIndex = 0;
	#isAscending = true;

	constructor(table, defaultColumn = null) {
		super(table);
		if (defaultColumn) {
			this.#applySort(defaultColumn);
		}
	}

	addListeners() {
		this.table.columns.forEach((column, index) => {
			this.#applyStyle(column, index)

			// Добавляем обработчик клика на заголовок столбца
			column.element.addEventListener('click', () => {
				// Определяем, нужно ли менять направление сортировки
				if (this.#currentColumnIndex === index) {
					this.#isAscending = !this.#isAscending;
				}
				else {
					this.#currentColumnIndex = index;
					this.#isAscending = true;
				}

				this.#applySort(column);
			});
		});
	}

	#applyStyle(column, index) {
		if(index === this.#currentColumnIndex) {
			column.element.classList.add('sorted');
		}
	}

	#applySort(column) {
		const sortedData = this.#sortData(
			this.table.data,
			column.name
		);
		this.setTableData(sortedData);
	}

	#sortData(data, field) {
		return data.slice().sort((a, b) => {
			if (a[field] < b[field]) return this.#isAscending ? -1 : 1;
			if (a[field] > b[field]) return this.#isAscending ? 1 : -1;
			return 0;
		});
	}
}

export default SortableTablePlugin;