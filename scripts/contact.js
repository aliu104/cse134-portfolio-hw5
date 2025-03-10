const formErrMsg = 'Failed to submit form. Please fix the inputted fields.';
const patternErrMsg = "Only letters and certain punctuation allowed.";
const maxChar = 300;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea, select');
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comments');
    const errorMessage = document.querySelector('.error-message');
    const infoMessage = document.querySelector('.info-message');
    const regexPattern = /^[A-Za-z\s.,!;:?'\-]*$/;
    const regexNegPattern = /[^A-Za-z\s.,!;:?'\-]+/g;

    let form_errors = [];

    function logError(inp, errorType, value, timestamp) {
        err = {
            field: inp.id,
            error: errorType,
            invalid_value: value,
            timestamp: timestamp
        };
        console.log("logged", err);
        form_errors.push(err)
    }

    function validateName() {
        const name = nameInput.value.trim();
        if (!name.includes(' ')) {
            nameInput.validity.valid = false;
            nameInput.setCustomValidity('Please enter both your first and last name.');
            this.classList.add('invalid');
        }
    }

    function addInputMask(inp, errMessage, charLimit = null) {
        let value = inp.value;
        if (value != '' && !regexPattern.test(value)) {
            inp.classList.add("flash");
            errorMessage.textContent = errMessage;

            setTimeout(() => {
                errorMessage.style.opacity = "0";
                setTimeout(() => {
                    errorMessage.textContent = '';
                    errorMessage.style.opacity = "1";
                }, 1000);
            }, 1000);

            inp.value = value.replace(regexNegPattern, '');
        } 

        setTimeout(() => inp.classList.remove("flash"), 300);

        if (charLimit) {
            let remaining = charLimit - inp.value.length;
            infoMessage.textContent = `Remaining characters: ${remaining}`;

            if (remaining <= 20 && remaining > 0) {
                infoMessage.style.color = "orange"; // Warning color
            } else if (remaining <= 0) {
                infoMessage.style.color = 'var(--fail-color)'; // Error color
                inp.value = inp.value.substring(0, charLimit); // Prevent exceeding limit
                infoMessage.textContent = "Character limit reached!";
            } else {
                infoMessage.style.color = 'var(--info-color)'; // Reset color
            }
        }
    }

    function validateFields(inp) {
        let timestamp = new Date().toISOString();
        let value = inp.value;
        let message = '';
        let errType = 'Invalid input';
        if (inp.validity.valueMissing) {
            message = 'This is a required field.';
            errType = 'Missing field';
        } else if (inp.validity.typeMismatch) {
            if (inp.id == 'email') {
                message = 'Please enter a valid email.';
                errType = 'Invalid email';
            } else {
                message = 'Please enter a valid input.';
                errType = 'Invalid type';
            }
        } else if (inp.validity.patternMismatch) {
            message = 'Please enter valid characters.';
            errType = 'Invalid characters';
        }
        logError(inp, errType, value, timestamp);
        inp.setCustomValidity(message);
        inp.classList.add('invalid');
        errorMessage.textContent = formErrMsg;
        infoMessage.textContent = '';
    }

    inputs.forEach(inp => {
        // clear validity messages on input
        inp.addEventListener('input', function () {
            this.setCustomValidity('');
            errorMessage.textContent = '';
            infoMessage.textContent = '';
            this.classList.remove('invalid');
        });

        inp.addEventListener('invalid', function () {
            validateFields(inp);
        });
    }); 

    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('invalid', validateName);
    nameInput.addEventListener('input', function () {
        addInputMask(this, patternErrMsg);
    })

    commentInput.addEventListener('input', function () {
        addInputMask(this, patternErrMsg, maxChar);
    })

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let timestamp = new Date().toISOString();

        // validate fields
        let name = nameInput.value.trim();
        if (!name.includes(' ')) {
            logError(nameInput, "Invalid name", name, timestamp);
        }

        console.log("FORM SUBMITTED");

        // submit form
        const formData = new FormData(form);
        formData.append('form-errors', JSON.stringify(form_errors));

        // uncomment for synchronous request
        // form.submit();
        // document.getElementById('form-errors').value = JSON.stringify(form_errors);

        // uncomment for asynchronous request
        fetch(form.action, {
            method: form.method,
            body: formData,
        })
        .then(response => response.json()) 
        .then(data => {
            infoMessage.style.color = 'var(--success-color)';
            infoMessage.textContent = "Form submitted successfully!";
            console.log("Success:", data);
            console.log(data.form["form-errors"]);
        })
        .catch(error => {
            errorMessage.textContent = "Error submitting form.";
            console.error("Error:", error);
        });
    });
});

