// @ts-nocheck   
import { writable } from 'svelte/store';

export const storeUser = writable(null); // start with no user

export const logout = () => storeUser.set(null);

// export async function signUp(username, password) {
//   return Auth.signUp(username, password, email)
//           .then((data) => void storeUser.set(data));
// }
