import {INewUser} from '@/types';
import appwriteConfig from '../conf';
import {account, avatars, database, ID} from '../client';
import {Query} from 'appwrite';

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

    if (!newAccount) {
      throw new Error('User not created');
    }

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error: any) {
    console.error(error);
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId as string,
      appwriteConfig.userCollectionId as string,
      ID.unique(),
      user
    );

    if (!newUser) {
      throw new Error('User not saved to DB');
    }

    return newUser;
  } catch (error: any) {
    console.error(error);
  }
}

export async function signInAccount(user: {email: string; password: string}) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error: any) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('No current user');
    }

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) {
      throw new Error('No user found');
    }

    return currentUser.documents[0];
  } catch (error: any) {
    console.error(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error: any) {
    console.error(error);
  }
}
