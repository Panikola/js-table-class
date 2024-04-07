class TablePlugin {
	#table = null;

	constructor(table) {
		this.#table = table;
	}

	init() {
		if (this.constructor === TablePlugin) {
			throw new Error('Abstract classes can\'t be instantiated.');
		}
		this.addListeners();
	}

	addListeners() {
		return false;
	}

	setTableData(data) {
		this.#table.setData(data);
	}

	get table() {
		return this.#table;
	}

	set table(table) {
		this.#table = table;
	}
}

export default TablePlugin;