import {database, ID} from '@/appwrite/client';
import appwriteConfig from '@/appwrite/conf';

export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) {
      throw new Error('Post update failed');
    }

    return updatedPost;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const deletedRecord = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      savedRecordId
    );

    if (!deletedRecord) {
      throw new Error('Post deletion failed');
    }

    return deletedRecord;
  } catch (error) {
    console.error(error);
  }
}
