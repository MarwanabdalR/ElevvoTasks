window.onload = function(){
    const inputs = document.querySelectorAll('input, textarea');
    const form = document.querySelector('form');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.border = '1px solid rgb(140, 0, 255)';
        });

        input.addEventListener('blur', () => {
            input.style.border = '';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        inputs.forEach(input => input.classList.remove('input-error'));

        const email = document.getElementById('email');
        const name = document.getElementById('fname');
        const message = document.getElementById('textarea');

        let isValid = true;

        if (name.value.trim() === '' || name.value.length < 3) {
            isValid = false;
            showError(name, 'Name is required and must be at least 3 characters long.');
        }

        if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address.');
        }

        if (message.value.trim() === '' || message.value.length < 10) {
            isValid = false;
            showError(message, 'Message is required and must be at least 10 characters long.');
        }

        if (isValid) {
            const subject = 'Contact Form Submission from ' + name.value;
            const body = `Email: ${email.value}\nName: ${name.value}\nMessage: ${message.value}`;
            window.location.href = `mailto:marwanabdalrady13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    });

    function showError(input, message) {
        input.classList.add('input-error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
}