import {DraggableColumnsMixin} from '../mixins/DraggableColumnsMixin.js';
import {SortableColumnsMixin} from '../mixins/SortableColumnsMixin.js';

function applyMixins(...mixins) {
	return mixins.reduce((base, mixin) => mixin(base), Object);
}

export default class Table extends applyMixins(DraggableColumnsMixin, SortableColumnsMixin) {
	#tableElement = document.createElement('table');
	#data;
	#dataForRender;
	#columns;
	#settings = {
		sortColumn: 'id',
		filterDebounce: 300
	};

	constructor(data, columns, settings = {}) {
		super();
		Object.assign(this.#settings, settings);
		this.#data          = data;
		this.#dataForRender = data;
		this.#columns       = columns;

		this.#initialize();
	}

	#initialize() {
        this.#highlight();
        this.#sortData();
        this.#render();
    }

	#render() {
        this.#tableElement.innerHTML = `<thead><tr>${this.#columns.map(header => `<th>${header}</th>`).join('')}</tr></thead>`;
        const rowsHtml = this.#dataForRender.map(item => `<tr>${this.#columns.map(key => `<td>${item[key]}</td>`).join('')}</tr>`).join('');
        this.#tableElement.innerHTML += `<tbody>${rowsHtml}</tbody>`;
	}

	#sortData() {
		this.#dataForRender.sort((a, b) =>
			String(a[this.#settings.sortColumn]).localeCompare(String(b[this.#settings.sortColumn])));
	}

	#highlight() {
		this.#tableElement.addEventListener('click', e => {
            if (e.target.tagName === 'TD') {
                e.target.parentNode.classList.toggle('highlight');
            }
        });
	}

	sort(columnName) {
		this.#settings.sortColumn = columnName;
		this.#sortData();
		this.#render();
	}

	filters(searchString) {
        this.#dataForRender = searchString ? this.#filterData(searchString) : [...this.#data];
        this.#render();
    }

    #filterData(searchString) {
        const filterValue = searchString.toLowerCase().trim();
        const startsWith = filterValue.startsWith('^');
        const adjustedFilterValue = startsWith ? filterValue.slice(1) : filterValue;

        return this.#data.filter(item => this.#columns.some(key => {
            const value = item[key]?.toLowerCase();
            return value ? (startsWith ? value.startsWith(adjustedFilterValue) : value.includes(adjustedFilterValue)) : false;
        }));
    }

	get element() {
		return this.#tableElement;
	}
}