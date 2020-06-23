var Buffer = require('buffer/').Buffer

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + Buffer.from(user.userName+":"+user.token).toString('base64') };
    } else {
        return {};
    }
}