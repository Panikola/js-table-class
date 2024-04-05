export default class Input {
	#input = null;
	#timeoutId = null;
	#settings = {
		className: 'custom-input',
		debounceTime: 300,
		placeholder: '',
		type: 'text',
	};

	constructor(settings = {}) {
		Object.assign(this.#settings, settings);
		this.#input = document.createElement('input');
		this.#setupInput();
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
                const customEvent = new CustomEvent('customkeyup', {
                    detail: { value: this.#input.value }
                });
                this.#input.dispatchEvent(customEvent);
            }, this.#settings.debounceTime);
        }
    };

	get element() {
		return this.#input;
	}
}

