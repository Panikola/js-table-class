class Table {
	#plugins = [];
	#settings = {};
	#container = null;
	columns = [];
	data = [];

	constructor(container, columns, settings = {}) {
		this.#container = container;
		this.columns = columns.map(column => ({
			name: column,
			element: null
		}));
		Object.assign(this.#settings, settings);
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
			headerCell.textContent = column.name;
			column.element = headerCell; // Сохраняем ссылку на DOM-элемент заголовка столбца
			headerRow.appendChild(headerCell);
		});
		thead.appendChild(headerRow);
		tableElement.appendChild(thead);

		// Создание и добавление строк таблицы
		const tbody = document.createElement('tbody');
		this.data.forEach(rowData => {
			const row = document.createElement('tr');
			this.columns.forEach(column => {
				const cell = document.createElement('td');
				cell.textContent = rowData[column.name];
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
