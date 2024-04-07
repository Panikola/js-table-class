import './styles/style.css';
import FilterableTablePlugin from './components/plugins/FilterableTablePlugin.js';
import Input from './components/Input.js';
import SortableTablePlugin from './components/plugins/SortableTablePlugin.js';
import Table from './components/Table.js';
import fetchJson from './helpers/fetchData.js';
import mergeData from './helpers/mergeData.js';

const CARS_DATA_URL = './data/cars.json';
const DEVICES_DATA_URL = './data/devices.json';
const TABLE_COLUMNS = ['RegNumber', 'Device', 'VIN', 'Model', 'InventoryNumber', 'ReleaseDate'];
const TABLE_CONTAINER = '#tableContainer'
const FILTER_CONTAINER = '#inputContainer'

async function initializeTable() {
	try {
		// Загрузка и слияние данных
		const [
			carsData,
			devicesData
		] = await Promise.all([
			fetchJson(CARS_DATA_URL),
			fetchJson(DEVICES_DATA_URL)
		]);
		const mergedData = mergeData(
			carsData,
			devicesData,
			'DeviceId',
			'Id',
			{Device: 'Esn'}
		);

		// Инициализация таблицы
		const tableContainer = document.querySelector(TABLE_CONTAINER);
		const table = new Table(tableContainer);
		TABLE_COLUMNS.forEach(column => {
			table.addColumn({title: column});
		});
		table.setData(mergedData);

		// Инициализация инпута для фильтрации
		const inputContainer = document.querySelector(FILTER_CONTAINER);
		const input = new Input(inputContainer);

		// Добавление плагинов к таблице
		table.addPlugin(new SortableTablePlugin(table, TABLE_COLUMNS[0]));
		table.addPlugin(new FilterableTablePlugin(table, input.element, input.eventName));


	}
	catch (error) {
		console.error('Failed to initialize the table:', error);
	}
}

document.addEventListener('DOMContentLoaded', initializeTable);