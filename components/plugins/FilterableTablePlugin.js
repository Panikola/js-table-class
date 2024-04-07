import TablePlugin from './TablePlugin.js';

class FilterableTablePlugin extends TablePlugin{
	#inputElement = null;
	#inputEvent = null;
	#originalData = null;

	constructor(table, input, inputEvent = 'input') {
		super(table);
		this.#inputElement = input;
		this.#inputEvent = inputEvent;
		this.#originalData = [...this.table.data];
	}

	addListeners() {
		this.#inputElement.addEventListener(
			this.#inputEvent, this.#handleInput.bind(this)
		);
	}

	#handleInput(event) {
		const filterValue = event.target.value.toLowerCase();
		const filteredData = this.#originalData.filter(row => {
			return Object.values(row).some(value => value?.toString().toLowerCase().includes(filterValue));
		});

		this.setTableData(filteredData);
	}
}

export default FilterableTablePlugin;