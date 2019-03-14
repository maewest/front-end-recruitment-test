const REGEX_EMAIL = /^[a-zA-Z0-9.!]+@[a-zA-Z0-9.!]+\.[a-zA-Z0-9]+$/;
const REGEX_POSTAL_CODE = /^\d{5}$/;
const REGEX_PHONE_NUMBER = /^\(\d{3}\)\ \d{3}\-\d{2}\-\d{2}$/;
const REGEX_CREDIT_CARD = /^(\d{4}\-){3}\d{4}$/;
const REGEX_SECURITY_NUMBER = /^\d{4}$/;
const REGEX_EXPIRATION_DATE = /^\d{2}\/\d{2}$/;

/**
* Represents a validation object.
*/
class Validator {
  /**
  *@param {string} form Form selector.
  */
    constructor(form) {
        this.form = document.querySelector(form);
        this.fieldsValidation = [];

        if (this.form) {
            this.button = this.form.querySelector('button');
            this.fields = Array.from(
                this.form.querySelectorAll('#js-validate')
            );
        }
    }

    /**
    * Preparing fields to validation (adding listeners)
    */
    prepareForm() {
        const fields = this.fields;

        fields.forEach((field, idx) => {
            const input = field.querySelector('.form__input');
            this.handleFilledClass(input);

            this.fieldsValidation[idx] = field.getAttribute('data-required')
                ? false
                : true;

            field.addEventListener('change', (event) => {
                this.validate(field, idx, event.target.value);
                this.handleFilledClass(input);
            });
        });
    }

    /**
    * Adding class when field is not empty
    * @param {element} element Form input element
    */
    handleFilledClass(element) {
        if (element && element.value) {
            element.classList.add('filled');
        } else {
            element.classList.remove('filled');
        }
    }

    /**
    * Validating required fields and special types
    * @param {element} field Field element
    * @param {number} idx Index of field element
    * @param {string} value Value to validate
    */
    validate(field, idx, value) {
        const required = field.getAttribute('data-required')
            ? true
            : false;
        const type = field.getAttribute('data-validation');
        let valid = !required || value.length > 0;

        switch (type) {
            case 'email':
                valid = (!value || REGEX_EMAIL.test(value)) && valid;
                break;
            case 'postalCode':
                valid = (!value || REGEX_POSTAL_CODE.test(value)) && valid;
            break;
            case 'phone':
                valid = (!value || REGEX_PHONE_NUMBER.test(value)) && valid;
                break;
            case 'creditCard':
                valid = (!value || REGEX_CREDIT_CARD.test(value)) && valid;
                break;
            case 'security':
                valid = (!value || REGEX_SECURITY_NUMBER.test(value)) && valid;
                break;
            case 'expiration':
                valid = (!value || REGEX_EXPIRATION_DATE.test(value)) && valid;
                break;
            default:
                break;
        }

        if (!valid) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }

        this.fieldsValidation[idx] = valid;
        this.handleButtonState();
    }

    /**
    * Enabling/Disabling form button
    */
    handleButtonState() {
        const formIsValid = this.fieldsValidation
            .reduce((a, b) => a && b);
        this.button.disabled = !formIsValid;
    }
}

const validator = new Validator('#js-checkout');
validator.prepareForm();
