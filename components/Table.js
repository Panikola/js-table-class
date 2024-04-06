class Table {
    constructor(container, options = {}) {
        this.container = container; // DOM элемент, в который будет рендериться таблица
        this.options = options;
        this.columns = []; // Массив для хранения столбцов
        this.data = []; // Данные для отображения в таблице
    }

    addColumn(column) {
		column.element = null; // Инициализируем здесь, добавим элемент позже
        this.columns.push(column);
    }

    setData(data) {
        this.data = data;
    }

	addPlugin(plugin) {
        plugin.apply(this);
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
                cell.textContent = rowData[column.field];
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        tableElement.appendChild(tbody);
        // Очистка контейнера и добавление сгенерированной таблицы
        this.container.innerHTML = '';
        this.container.appendChild(tableElement);
    }
}

// Экспорт класса для использования в других частях приложения
export default Table;
