import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite'

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.test.lib',
    projectId: '67248ffa001459efaa8c',
    databaseId: '672491ef001c0318a4a2',
    userCollectionId: '672492c7001dfdfc74bd',
    videoCollectionId: '672492ce000f78e97a6a',
    storageId: '6724958c002b8f3222e5'
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const signInAction = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        )
        return session;
    } catch (error) {
        throw new Error(error)
    }
}
export const createUserAction = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signInAction(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;
    }catch (error) {
        console.log('create Loi roi: ' + error.message)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        console.log(currentAccount);
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );
        console.log(currentUser);
        if (!currentUser) throw Error;
        console.log(currentUser.documents[0]);
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signOutAction = async () => {
    try {
        const deleteSess = await account.deleteSession("current");
        return deleteSess;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt")]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt", Query.limit(7))]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const SearchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.search("title", query),
        ]);
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
};

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(config.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error("Invalide file type");
        }
        if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(config.storageId, ID.unique(), asset);
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    }catch (e) {
        console.log(e)
    }
};

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);
        const newPost = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );
        return newPost;
    } catch (error) {
        throw new Error(error);
    }
};