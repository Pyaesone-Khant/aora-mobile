import { CreateUserProps, SignInProps } from '@/types/typings';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.pk.aora',
    projectId: '66c4b2fe0018f586a017',
    databaseId: '66c4b417002a74654e31',
    userCollectionId: '66c4b4340006864555b8',
    videoCollectionId: '66c4b46b00091e0f58c6',
    storageId: '66c4b5b0000284824f7a'
}

// initializing react-native sdk for appwrite
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client)

export const createUser = async ({ email, username, password }: CreateUserProps) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatar.getInitials(username);

        await signIn({ email, password });
        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        });

        return newUser;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const signIn = async ({ email, password }: SignInProps) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error: any) {
        throw new Error(error)
    }
}