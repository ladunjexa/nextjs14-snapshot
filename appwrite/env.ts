export const url: string = process.env.NEXT_PUBLIC_APPWRITE_URL || 'https://cloud.appwrite.io/v1';

export const projectId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  'NEXT_PUBLIC_APPWRITE_PROJECT_ID'
);

export const databaseId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  'NEXT_PUBLIC_APPWRITE_DATABASE_ID'
);

export const storageId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
  'NEXT_PUBLIC_APPWRITE_STORAGE_ID'
);

export const userCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  'NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID'
);

export const postCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID,
  'NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID'
);

export const saveCollectionId: string = assertValue(
  process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID,
  'NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID'
);

function assertValue<T>(v: T | undefined, envVarName: string): T {
  if (v === undefined) {
    throw new Error(`Missing environment variable: ${envVarName}`);
  }

  return v;
}
