class Filterable {
    constructor(inputSelector) {
        this.inputElement = document.querySelector(inputSelector);
    }

    apply(table) {
        this.table = table;
        this.originalData = [...table.data]; // Сохраняем исходные данные для сброса фильтра

        this.inputElement.addEventListener('input', this.handleInput.bind(this));
    }

    handleInput(event) {
        const filterValue = event.target.value.toLowerCase();
        const filteredData = this.originalData.filter(row => {
            // Пример фильтрации: проверяем, содержит ли хотя бы одно значение в строке текст из поля ввода
            // Эту логику можно адаптировать под ваши нужды
            return Object.values(row).some(value => value.toString().toLowerCase().includes(filterValue));
        });

        this.table.setData(filteredData);
        this.table.render();
    }
}

export default Filterable;