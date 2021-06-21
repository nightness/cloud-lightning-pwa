import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions'
import * as FirebaseAuth from 'react-firebase-hooks/auth'
import * as FirebaseFirestore from 'react-firebase-hooks/firestore'

export type FirebaseError = firebase.FirebaseError
export type FirebaseUser = firebase.User
export type AuthError = firebase.auth.Error
export type DocumentChange<T> = firebase.firestore.DocumentChange<T>
export type DocumentData = firebase.firestore.DocumentData
export type DocumentSnapshot<T> = firebase.firestore.DocumentSnapshot<T>
export type Timestamp = firebase.firestore.Timestamp
export type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>
export type QueryDocumentSnapshot<T> = firebase.firestore.QueryDocumentSnapshot<T>

interface LoginSuccess {
    type: 'success'
    accessToken?: string
    idToken?: string
    refreshToken?: string
}

export const Init = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}

export const getFirestore = () => {
    var firestore = firebase.firestore()
    // if (false && location.hostname === 'localhost') {
    //     firestore.settings({
    //         host: 'localhost:8080',
    //     })
    // }
    return firestore
}

const firebaseConfig = {
    apiKey: 'AIzaSyA0QwzJ1I_i4w-jO-9Vk1W5YKHFAyVSal4',
    authDomain: 'cloud-lightning-lite.firebaseapp.com',
    projectId: 'cloud-lightning-lite',
    storageBucket: 'cloud-lightning-lite.appspot.com',
    messagingSenderId: '607208296062',
    appId: '1:607208296062:web:17cfe68400f2a65ddcd22f',
    measurementId: 'G-R55E0ZP42N',
}

export const getAuth = () => firebase.auth()
export const firebaseAuth = firebase.auth
export const firebaseFunctions = firebase.functions
export const firebaseFirestore = firebase.firestore
export const firestoreMessenging = firebase.messaging

export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider

export const getCurrentTimeStamp = () => firebase.firestore.FieldValue.serverTimestamp()
export const getCurrentUser = () => firebaseAuth().currentUser

export const useAuthState = () => FirebaseAuth.useAuthState(firebaseAuth())

export const getCollection = (collectionPath: string) =>
    getFirestore().collection(collectionPath)
export const useCollection = (collectionPath: string, includeMetadataChanges = false) => {
    try {
        return FirebaseFirestore.useCollection(getCollection(collectionPath), {
            snapshotListenOptions: { includeMetadataChanges },
        })
    } catch (error) {
        return [undefined, false, error]
    }
}

export const useCollectionOnce = (collectionPath: string) => {
    try {
        return FirebaseFirestore.useCollectionOnce(getCollection(collectionPath))
    } catch (error) {
        return [undefined, false, error]
    }
}

export const useCollectionData = (collectionPath: string,) => {
    try {
        return FirebaseFirestore.useCollectionData(getCollection(collectionPath))
    } catch (error) {
        return [undefined, false, error]
    }
}


export const useCollectionDataOnce = (
    collectionPath: string,
) => {
    try {
        return FirebaseFirestore.useCollectionDataOnce(getCollection(collectionPath))
    } catch (error) {
        return [undefined, false, error]
    }
}

export const getDocument = (documentPath: string) => getFirestore().doc(documentPath)
export const useDocument = (documentPath: string, includeMetadataChanges = false) => {
    try {
        return FirebaseFirestore.useDocument(getDocument(documentPath), {
            snapshotListenOptions: { includeMetadataChanges },
        })
    } catch (error) {
        return [undefined, false, error]
    }
}

export const useDocumentOnce = (documentPath: string) => {
    try {
        return FirebaseFirestore.useDocumentOnce(getDocument(documentPath))
    } catch (error) {
        return [undefined, false, error]
    }
}

export const useDocumentData = (documentPath: string, includeMetadataChanges = false) => {
    try {
        return FirebaseFirestore.useDocumentData(getDocument(documentPath), {
            snapshotListenOptions: { includeMetadataChanges },
        })
    } catch (error) {
        return [undefined, false, error]
    }
}

export const useDocumentDataOnce = (documentPath: string,) => {
    try {
        return FirebaseFirestore.useDocumentDataOnce(getDocument(documentPath))
    } catch (error) {
        return [undefined, false, error]
    }
}

export const getData = (
    querySnapshot: QuerySnapshot<DocumentData>,
    orderBy?: string,
    length?: number,
    firstItem?: any
) => {
    if (!orderBy) return querySnapshot.query.get()
    else if (!length) return querySnapshot.query.orderBy(orderBy).get()
    else if (!firstItem)
        return querySnapshot.query.orderBy(orderBy).limitToLast(length).get()
    else
        return querySnapshot.query
            .orderBy(orderBy)
            .limitToLast(length)
            .startAt(firstItem)
            .get()
}

export const getDocumentsDataWithId = (querySnapshot: QuerySnapshot<DocumentData>) => {
    let docs: DocumentData[] = []
    querySnapshot.docs.forEach((doc) => {
        const data = doc.data()
        // Adds the doc's id to it's own data
        data.id = doc.id
        docs.push(data)
    })
    return docs
}

export const collectionContains = async (collection: string, docId: string) => {
    const firestore = firebaseFirestore()
    return await firestore.collection(collection).doc('ABC').get()
}

// Returns a promise
export const callFirebaseFunction = (funcName: string, data: any) => {
    return firebase.functions().httpsCallable(funcName)(data)
}