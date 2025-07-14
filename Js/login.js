        (() => {
        const passwordInput = document.getElementById('password-login');
        const togglePasswordButton = document.querySelector('.toggle-password');
        const loginForm = document.getElementById('login-form');
        const emailInput = document.getElementById('email-login');
        const loginResult = document.getElementById('login-result');
        const emailError = document.getElementById('email-login-error');
        const passwordError = document.getElementById('password-login-error');

        togglePasswordButton.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
        });

        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function clearErrors() {
            emailError.style.display = 'none';
            emailError.textContent = '';
            passwordError.style.display = 'none';
            passwordError.textContent = '';
            loginResult.style.display = 'none';
            loginResult.textContent = '';
            loginResult.classList.remove('success-message', 'error-message');
        }

        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }

        function showSuccess(message) {
            loginResult.textContent = message;
            loginResult.style.display = 'block';
            loginResult.classList.remove('error-message');
            loginResult.classList.add('success-message');
        }

        function showFailure(message) {
            loginResult.textContent = message;
            loginResult.style.display = 'block';
            loginResult.classList.remove('success-message');
            loginResult.classList.add('error-message');
        }


        async function checkCredentials(email, password6chars) {
            try {
            const response = await fetch('https://edu-me01.github.io/Traval-task/api/data.json');
            if (!response.ok) {
                throw new Error('Failed to fetch user data.');
            }
            const data = await response.json();

            if (!data.users || !Array.isArray(data.users)) {
                throw new Error('Invalid data format.');
            }

            const userExists = data.users.some(user => user.email.toLowerCase() === email.toLowerCase());

            return userExists;
            } catch (error) {
            console.error('Error fetching user data:', error);
            showFailure('Failed to contact server. Please try again later.');
            return false;
            }
        }

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearErrors();

            const emailValue = emailInput.value.trim();
            const passwordValueRaw = passwordInput.value;

            if (!emailValue) {
            showError(emailError, 'Email is required.');
            emailInput.focus();
            return;
            } else if (!isValidEmail(emailValue)) {
            showError(emailError, 'Please enter a valid email address.');
            emailInput.focus();
            return;
            }

            if (!passwordValueRaw) {
            showError(passwordError, 'Password is required.');
            passwordInput.focus();
            return;
            } else if (passwordValueRaw.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters.');
            passwordInput.focus();
            return;
            }

            const passwordValue = passwordValueRaw.substring(0, 6);

            showFailure(''); 

            const emailLower = emailValue.toLowerCase();

            const isUserPresent = await checkCredentials(emailLower, passwordValue);
            if (isUserPresent) {
            showSuccess('Login successful! Redirecting...');
            window.open("./home.html");
            setTimeout(() => {
                loginForm.reset();
                clearErrors();
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'You have successfully logged in. Enjoy your adventure!',
                    confirmButtonText: 'Let\'s go!'
                });
            }, 2000);

            } else {
            showFailure('Invalid email or password.');
            passwordInput.focus();
            }
        });
        })();
