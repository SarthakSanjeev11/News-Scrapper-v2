import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668d21fe000fb5ad099d');

export const account = new Account(client);
export { ID } from 'appwrite';
