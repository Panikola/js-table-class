import './styles/style.css';
import Table from './components/Table.js';
import Sortable from './components/Sortable.js';
import Filterable from './components/Filterable.js';
import fetchJson from './helpers/fetchData.js';
import mergeData from './helpers/mergeData.js';

const CARS_DATA_URL = './public/data/cars.json';
const DEVICES_DATA_URL = './public/data/devices.json';
const TABLE_COLUMNS = ['RegNumber', 'Device', 'VIN', 'Model', 'InventoryNumber', 'ReleaseDate'];

async function initializeTable() {
    try {
        const [carsData, devicesData] = await Promise.all([
            fetchJson(CARS_DATA_URL),
            fetchJson(DEVICES_DATA_URL)
        ]);

        // Используем вашу функцию mergeData для слияния данных
        const mergedData = mergeData(carsData, devicesData, 'DeviceId', 'Id', {Device: 'Esn'});

        const tableContainer = document.querySelector('#tableContainer');
        const table = new Table(tableContainer);

        // Добавляем столбцы в таблицу, используя TABLE_COLUMNS
        TABLE_COLUMNS.forEach(column => {
            table.addColumn({ title: column, field: column.toLowerCase() }); // Преобразование для примера, адаптируйте под вашу структуру данных
        });

        table.setData(mergedData);
        
        table.render();

		table.addPlugin(new Sortable());
		table.addPlugin(new Filterable('#filterInput'));
    } catch (error) {
        console.error('Failed to initialize the table:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeTable);