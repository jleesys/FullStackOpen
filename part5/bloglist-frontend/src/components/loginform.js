import PropTypes from 'prop-types';

const LoginForm = ({ username,
  password,
  handleLogin,
  setUsername,
  setPassword }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <h2>log in to application</h2>
          username
          <input id='username'
            placeholder='username'
            name='Username'
            value={username}
            onChange={({ target }) => { setUsername(target.value) }}></input>
        </div>
        <div>
          password
          <input id='password'
            placeholder='password'
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}></input>
        </div>
        <button id='loginButton' name='sendLogin' type='submit'>log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;