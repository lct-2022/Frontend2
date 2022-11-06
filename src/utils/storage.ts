import { UserData } from "../types";

export function lsSaveAuthorizedUser(user: UserData) {
    try {
        localStorage.setItem('authorised_user_ideahunt', JSON.stringify(user));
    } catch(err) {
        // pass
    }
}

export function lsGetAuthorizedUser(): UserData | undefined {
    try {
        const user = localStorage.getItem('authorised_user_ideahunt');
        
        if (user) {
            return JSON.parse(user);
        }

        return;
    } catch(err) {
        // pass
    }
}

export function lsRemoveAuthorizedUser() {
    try {
        localStorage.removeItem('authorised_user_ideahunt');
    } catch(err) {
        // pass
    }
}

export function lsSaveCurrentUser(user: UserData) {
    try {
        localStorage.setItem('current_user_ideahunt', JSON.stringify(user));
    } catch(err) {
        // pass
    }
}

export function lsGetCurrentUser(): UserData | undefined {
    try {
        const user = localStorage.getItem('current_user_ideahunt');
        
        if (user) {
            return JSON.parse(user);
        }

        return;
    } catch(err) {
        // pass
    }
}

export function lsRemoveCurrentUser() {
    try {
        localStorage.removeItem('current_user_ideahunt');
    } catch(err) {
        // pass
    }
}