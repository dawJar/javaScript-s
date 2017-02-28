(function () {

    var container = document.getElementById('app');
    var result = document.getElementById('result');

    var inputLogin = document.createElement('input');
    var inputPassword = document.createElement('input');
    var resultHint = document.createElement('p');
    var users = [];


    var createRegistationForm = function () {
        var form = document.createElement('form');

        var inputs = createInputs();

        var registrationBtn = document.createElement('input');
        registrationBtn.onclick = registration;
        registrationBtn.setAttribute('type', 'button');
        registrationBtn.setAttribute('value', 'registration');

        var loginBtn = document.createElement('input');
        loginBtn.onclick = login;
        loginBtn.setAttribute('type', 'button');
        loginBtn.setAttribute('value', 'login');

        form.appendChild(inputs);
        form.appendChild(registrationBtn);
        form.appendChild(loginBtn);

        container.appendChild(form);
    }

    var createInputs = function () {
        var div = document.createElement('div');

        var loginHint = document.createElement('p');
        loginHint.innerHTML = 'Login:';
        inputLogin.setAttribute('type', 'text');
        inputLogin.setAttribute('name',"login");

        var passwordHint = document.createElement('p');
        passwordHint.innerHTML = 'Password:';
        inputPassword.setAttribute('type', 'password');
        inputPassword.setAttribute('name',"login");

        div.appendChild(loginHint);
        div.appendChild(inputLogin);
        div.appendChild(passwordHint);
        div.appendChild(inputPassword);
        return div;
    }

    var registration = function () {
        if (inputLogin.value !== '' && inputPassword.value !== '') {
            var newUser = inputLogin.value;

            var checkIfUserExists = users.filter(x => x.user === newUser).length !== 0;

            if (!checkIfUserExists) {
                users = [...users, {
                    user: newUser,
                    pass: inputPassword.value
                }];
                inputLogin.value = '';
                inputPassword.value = '';
                resultHint.innerHTML = 'new user: ' + newUser;
                result.appendChild(resultHint);
            }
        }
    }

    var login = function () {
        if (inputLogin.value !== '' && inputPassword.value !== '') {
            var loginData = inputLogin.value;
            var passData = inputPassword.value;
            var findAndValidateUser = users.filter(x => x.user === loginData
                                                                && x.pass === passData);
            if (findAndValidateUser.length > 0) {
                inputLogin.value = '';
                inputPassword.value = '';
                resultHint.innerHTML = 'logged in as: ' + loginData;
            } else {
                resultHint.innerHTML = 'wrong login or password';
                result.appendChild(resultHint);
            }
        }
    }

    createRegistationForm();

})();
