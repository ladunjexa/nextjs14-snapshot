import {Client, Account, Databases, Storage, Avatars} from 'appwrite';

import appwriteConfig from '@/appwrite/conf';

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export {ID} from 'appwrite';
