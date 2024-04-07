class Table {
	#plugins = [];
	#settings = {};
	columns = [];
	#container = null;
	data = [];

	constructor(container, settings = {}) {
		this.#container = container; // DOM элемент, в который будет рендериться таблица
		Object.assign(this.#settings, settings);
	}

	addColumn(column) {
		this.columns.push(column);
	}

	setData(data) {
		this.data = data;
		this.render();
	}

	addPlugin(plugin) {
		plugin.init();
		this.#plugins.push(plugin);
	}

	render() {
		const tableElement = document.createElement('table');
		tableElement.className = 'custom-table'; // Пример класса для стилизации

		// Создание и добавление заголовков таблицы
		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');
		this.columns.forEach(column => {
			const headerCell = document.createElement('th');
			headerCell.textContent = column.title;
			column.element = headerCell; // Сохраняем ссылку на DOM-элемент заголовка столбца
			headerRow.appendChild(headerCell);
		});
		thead.appendChild(headerRow);
		tableElement.appendChild(thead);

		// Создание и добавление строк данных
		const tbody = document.createElement('tbody');
		this.data.forEach(rowData => {
			const row = document.createElement('tr');
			this.columns.forEach(column => {
				const cell = document.createElement('td');
				cell.textContent = rowData[column.title];
				row.appendChild(cell);
			});
			tbody.appendChild(row);
		});
		tableElement.appendChild(tbody);

		// Очистка контейнера и добавление сгенерированной таблицы
		this.#container.innerHTML = '';
		this.#container.appendChild(tableElement);

		// Пересоздание слушателей событий плагинов
		this.#plugins.forEach(plugin => plugin.init());
	}
}

export default Table;
