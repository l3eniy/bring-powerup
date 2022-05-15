function setAuthToken(t, username, password) {
    return t.set('member', 'private', 'auth', {
        username: username,
        password: password
    });
}
window.utils = {
    setAuthToken: setAuthToken,
};
