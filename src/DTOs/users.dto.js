export default class UsersDto {
    constructor(user) {
        this._id = user._id;
        this.first_name = user.first_name;
        this.email = user.email;
        this.role = user.role;
        this.last_connection = user.last_connection;
        this.isLoggedIn = user.isLoggedIn;
    }
}