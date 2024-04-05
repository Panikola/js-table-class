import './style.css';
import Input from './components/Input.js';
import Table from './components/Table.js';
import fetchJson from './helpers/fetchData.js';
import mergeData from './helpers/mergeData.js';

const CARS_DATA_URL = './data/cars.json';
const DEVICES_DATA_URL = './data/devices.json';
const TABLE_COLUMNS = ['RegNumber', 'Device', 'VIN', 'Model', 'InventoryNumber', 'ReleaseDate'];

function createTable(data, columns) {
    return new Table(data, columns, {
        defaultSortColumn: 'RegNumber',
        filterDebounce: 300,
    });
}

function createInput() {
    const input = new Input('filter-input', {placeholder: 'Фильтр'});
    document.body.insertBefore(input.element, document.body.firstChild);
    return input;
}

async function loadDataAndInitializeUI() {
    try {
        const [cars, devices] = await Promise.all([
            fetchJson(CARS_DATA_URL),
            fetchJson(DEVICES_DATA_URL)
        ]);

        const mergedData = mergeData(cars, devices, 'DeviceId', 'Id', {Device: 'Esn'});
        const table = createTable(mergedData, TABLE_COLUMNS);
        const input = createInput();

        input.element.addEventListener('customkeyup', e => table.filters(e.detail.value));
        document.body.appendChild(table.element);

    } catch (error) {
        console.error('Error initializing UI:', error);
    }
}

await loadDataAndInitializeUI();