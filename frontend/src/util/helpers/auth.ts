import jwtDecode from 'jwt-decode';

import { User } from '../../store/Auth/auth.type';

export const getUserByToken = (): User | null => {
    const token = localStorage.getItem('accessToken');

    return token ? jwtDecode(token) : null;
}