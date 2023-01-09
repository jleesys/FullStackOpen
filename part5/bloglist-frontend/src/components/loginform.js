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
                    <input placeholder='username'
                        name='Username'
                        value={username}
                        onChange={({ target }) => { setUsername(target.value) }}></input>
                </div>
                <div>
                    password
                    <input placeholder='password'
                        type='password'
                        name='Password'
                        value={password}
                        onChange={({ target }) => { setPassword(target.value) }}></input>
                </div>
                <button name='sendLogin' type='submit'>log in</button>
            </form>
        </div>
    )
}

export default LoginForm;