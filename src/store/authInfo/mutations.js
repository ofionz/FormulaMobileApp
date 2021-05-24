export function setLogin (state, n) {
    state.login = n;
}
export function setPassword (state, n) {
    state.password = n;
}
export function setToken (state, n) {
    state.token = n;
}
export function setRoles(state, roles) {
    roles.forEach(role =>{
    switch (role.TYPE) {
        case 1:
            role.url = 'student';
            break;
        case 2:
            role.url = 'instructor';
            break;
        case 3:
            role.url = 'teacher';
            break;
        case 4:
            role.url = 'examinator';
            break;
        default: throw Error('Unexpected user type')
    }
});
    state.roles = roles;
}