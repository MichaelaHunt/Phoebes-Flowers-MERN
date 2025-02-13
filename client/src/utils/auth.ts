import { JwtPayload, jwtDecode } from 'jwt-decode';


//create an interface that extends the JwtPayload interface to account for user data
interface ExtendedJwt extends JwtPayload {
    data: {
        username: string;
        email: string;
        _id: unknown;
    };
};

//set up the AuthService class
class AuthService {
    getProfile() {
        return jwtDecode<ExtendedJwt>(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

//check to see if token is expired
    isTokenExpired(token: string) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    //get the token from local storage
    getToken(): string {
        const loggedInUser = localStorage.getItem('id_token') || '';
        return loggedInUser;
    }

    //set up login method
    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    //set up logout method
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    getUser() {
        return jwtDecode<ExtendedJwt>(this.getToken()).data._id;
    }

    getUsername() {
        return jwtDecode<ExtendedJwt>(this.getToken()).data.username;
    }

}

export default new AuthService();