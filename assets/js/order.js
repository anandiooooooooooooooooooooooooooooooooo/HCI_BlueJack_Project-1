// script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('coffeeOrderForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('deliveryAddress');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const addressError = document.getElementById('addressError');

    const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const successMessageDiv = document.getElementById('successMessage');

    const basePrice = 25000; // Base price in Rupiah

    // Function to format currency (simple version)
    function formatCurrency(amount) {
        return 'Rp.' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Function to update total price
    function updateTotalPrice() {
        let currentTotal = basePrice;
        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                currentTotal += parseInt(checkbox.value);
            }
        });
        totalPriceDisplay.textContent = formatCurrency(currentTotal);
    }

    // Add event listeners to checkboxes
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });

    // Initialize total price
    updateTotalPrice();

    // --- Validation Functions ---
    function showError(inputElement, errorElement, message) {
        if (errorElement) errorElement.textContent = message;
        if (errorElement) errorElement.style.display = 'block';
        if (inputElement) inputElement.classList.add('invalid');
        if (inputElement) inputElement.classList.remove('valid');
    }

    function clearError(inputElement, errorElement) {
        if (errorElement) errorElement.textContent = '';
        if (errorElement) errorElement.style.display = 'none';
        if (inputElement) inputElement.classList.remove('invalid');
        // Optionally add 'valid' class
        // if (inputElement && inputElement.value.trim() !== '') inputElement.classList.add('valid');
    }
    
    function showValid(inputElement) {
        if (inputElement) inputElement.classList.add('valid');
        if (inputElement) inputElement.classList.remove('invalid');
    }


    function validateFullName() {
        const value = fullNameInput.value.trim();
        if (value === '') {
            showError(fullNameInput, fullNameError, 'Full name is required.');
            return false;
        }
        clearError(fullNameInput, fullNameError);
        showValid(fullNameInput);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === '') {
            showError(emailInput, emailError, 'Email address is required.');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailInput, emailError);
        showValid(emailInput);
        return true;
    }

    function validateAddress() {
        const value = addressInput.value.trim();
        if (value === '') {
            showError(addressInput, addressError, 'Delivery address is required.');
            return false;
        }
        clearError(addressInput, addressError);
        showValid(addressInput);
        return true;
    }

    // Real-time validation feedback (on input/blur)
    fullNameInput.addEventListener('input', validateFullName);
    emailInput.addEventListener('input', validateEmail);
    addressInput.addEventListener('input', validateAddress);

    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    addressInput.addEventListener('blur', validateAddress);


    // Form submission handler
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Perform all validations one last time before submission
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isAddressValid = validateAddress();

        if (isFullNameValid && isEmailValid && isAddressValid) {
            console.log('Form submitted successfully!');
            // Collect form data (example)
            const formData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                deliveryAddress: addressInput.value.trim(),
                addons: [],
                totalPrice: totalPriceDisplay.textContent
            };
            addonCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    formData.addons.push(checkbox.dataset.name);
                }
            });
            console.log("Collected data:", formData);

            // Show success message
            successMessageDiv.classList.add('show');
            setTimeout(() => {
                successMessageDiv.classList.remove('show');
            }, 3000); // Hide after 3 seconds

            // Optionally reset the form
            // form.reset();
            // updateTotalPrice(); // Reset price display
            // Clear validation styles from inputs
            [fullNameInput, emailInput, addressInput].forEach(input => {
                input.classList.remove('valid', 'invalid');
            });

        } else {
            console.log('Form validation failed.');
            // Focus on the first invalid field (optional)
            if (!isFullNameValid) fullNameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isAddressValid) addressInput.focus();
        }
    });

    document.querySelectorAll('.addon-item').forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('.addon-checkbox');
            checkbox.checked = !checkbox.checked;
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        let total = 25000; // Base price
        document.querySelectorAll('.addon-checkbox:checked').forEach(checkbox => {
            total += parseInt(checkbox.value);
        });
        document.getElementById('totalPrice').textContent = `Rp.${total}`;
    }
});
