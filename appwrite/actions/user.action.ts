import {Query} from 'appwrite';

import {account, avatars, database, ID} from '@/appwrite/client';
import {uploadFile, getFilePreview, deleteFile} from '@/appwrite/actions/post.action';
import appwriteConfig from '@/appwrite/conf';

import type {INewUser, IUpdateUser} from '@/types';

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

export async function updateUserAccount(user: IUpdateUser) {
  try {
    const hasFileToUpdate = user.file.length > 0;

    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);

      if (!uploadedFile) {
        throw new Error('File not uploaded');
      }

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error('File not found');
      }

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id};
    }

    const updatedUser = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        email: user.email,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    if (!updatedUser) {
      if (hasFileToUpdate && image.imageId) {
        await deleteFile(image.imageId);
      }

      throw new Error('User not updated');
    }

    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
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

export async function getUsers(limit?: number) {
  try {
    const users = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(10)]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserFollowers(userId: string, followers: string[]) {
  try {
    const user = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        followers,
      }
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUserFollowing(userId: string, following: string[]) {
  try {
    const user = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        following,
      }
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}
