import { IUser } from "../../types";
import omit from 'lodash/omit'; 

const notPublicItems: Array<keyof IUser> = [
    'created-at',
    'updated-at',
    'password-hash',
    'avatar-url',
    'synced',
    'id',
]

export const prepareProfileItems = (obj: IUser): Partial<IUser> => {
    return omit({...obj}, notPublicItems);
}