import { User } from "../../types";
import omit from 'lodash/omit'; 

const notPublicItems: Array<keyof User['user']> = [
    'created-at',
    'updated-at',
    'password-hash',
    'avatar-url',
    'synced',
    'id',
]

export const prepareProfileItems = (obj: User): Partial<User> => {
    return omit({...obj}, notPublicItems);
}