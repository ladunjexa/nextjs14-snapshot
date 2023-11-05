import {database, storage, ID} from '@/appwrite/client';
import config from '@/appwrite/conf';

import type {INewPost, IUpdatePost} from '@/types';
import {Query} from 'appwrite';

export async function createPost(post: INewPost) {
  try {
    // Upload image to storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) {
      throw new Error('File upload failed');
    }

    // Get image URL
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw new Error('File URL not found');
    }

    // Convert tags to array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Save post to database
    const newPost = await database.createDocument(
      config.databaseId,
      config.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw new Error('Post creation failed');
    }

    return newPost;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload image to storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) {
        throw new Error('File upload failed');
      }

      // Get image URL
      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error('File URL not found');
      }

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id};
    }

    // Convert tags to array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Save post to database
    const updatedPost = await database.updateDocument(
      config.databaseId,
      config.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw new Error('Post creation failed');
    }

    return updatedPost;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) {
    throw new Error('Missing post or image ID');
  }

  try {
    const deletedPost = await database.deleteDocument(
      config.databaseId,
      config.postCollectionId,
      postId
    );

    if (!deletedPost) {
      throw new Error('Post deletion failed');
    }

    return deletedPost;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    const deletedFile = await storage.deleteFile(config.storageId, fileId);

    if (!deletedFile) {
      throw new Error('File deletion failed');
    }

    return deletedFile;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(config.storageId, ID.unique(), file);

    return uploadedFile;
  } catch (error) {
    console.error(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await database.getDocument(config.databaseId, config.postCollectionId, postId);

    if (!post) {
      throw new Error('Post retrieval failed');
    }

    return post;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await database.listDocuments(config.databaseId, config.postCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(20),
    ]);

    if (!posts) {
      throw new Error('Post retrieval failed');
    }

    return posts;
  } catch (error) {
    console.error(error);
  }
}
