module.exports.validateRegister = (
  password,
  username,
  confirmPassword,
  email
) => {
  const errors = {};
  if (username.trim() == "") {
    errors.username = "username must not be empty";
  }
  if (password.trim() == "") {
    errors.password = "password must not be empty";
  } else if (password != confirmPassword) {
    errors.confirmPassword = "password is not same";
  }
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(regEx)) {
    errors.email = "email is not valid email";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLogin = (password, username) => {
  const errors = {};
  if (username.trim() == "") {
    errors.username = "username must not be empty";
  }
  if (password.trim() == "") {
    errors.password = "password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
