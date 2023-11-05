import {database, ID} from '@/appwrite/client';
import config from '@/appwrite/conf';

export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await database.createDocument(
      config.databaseId,
      config.saveCollectionId,
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
      config.databaseId,
      config.saveCollectionId,
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
