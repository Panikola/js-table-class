import TablePlugin from './TablePlugin.js';

class SelectRowTablePlugin extends TablePlugin {
	constructor(table) {
		super(table);
	}

	addListeners() {
		this.table.data.forEach((row, index) => {
			if (row.selected) row.element.classList.add('selected');
			row.element.addEventListener('click', this.#onRowClick.bind(this, index));
		});
	}

	#onRowClick = (i) => {
		this.table.data[i].selected = this.table.data[i].element.classList.toggle('selected');
	};
}

export default SelectRowTablePlugin;