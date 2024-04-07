export default class Input {
	#input = null;
	#timeoutId = null;
	#settings = {
		className: 'custom-input',
		eventName: 'custom-keyup',
		debounceTime: 300,
		placeholder: '',
		type: 'text',
	};
	#container = null;

	constructor(container, settings = {}) {
		Object.assign(this.#settings, settings);
		this.#input = document.createElement('input');
		this.#setupInput();
		this.#container = container; // DOM элемент, в который будет рендериться таблица
		this.#container.appendChild(this.#input);
	}

	#setupInput() {
		this.#input.setAttribute('type', this.#settings.type);
		this.#input.setAttribute('placeholder', this.#settings.placeholder);
		this.#input.setAttribute('class', this.#settings.className);
		this.#input.addEventListener('keyup', this.#handleKeyUp);
	}

	#handleKeyUp = (e) => {
		clearTimeout(this.#timeoutId);
		if (e.key !== 'Enter') {
			e.stopPropagation();
			this.#timeoutId = setTimeout(() => {
				const customEvent = new CustomEvent(
					this.#settings.eventName, {
						detail: {value: this.#input.value}
					}
				);
				this.#input.dispatchEvent(customEvent);
			}, this.#settings.debounceTime);
		}
	};

	get element() {
		return this.#input;
	}

	get eventName() {
		return this.#settings.eventName;
	}
}

