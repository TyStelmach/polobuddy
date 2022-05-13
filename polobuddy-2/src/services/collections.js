import { db } from '../libs/firebase-config'; 
import { addDoc, getDoc, setDoc, deleteDoc, updateDoc, collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const subscribeToSnapshot = async (documentId, collectionName) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    let b;
    const unsub = await onSnapshot(doc(db, "Sessions", documentId), doc => {
      return doc.data();
    });
    // const q = await onSnapshot(documentRef, doc => doc.data);
    // console.log('a', q)
    // return q;
    console.log('bb', unsub)
  } catch (err) {
    console.log('err', err);
  }
};

/*
* Find a document within the firestore with a matching document ID
*/

const findExistingDocument = async (documentId, collectionName) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    const q = await getDoc(documentRef);
    return q.data();
  } catch (err) {
    console.log('err', err);
  }
}

/* Posts new document to collection with a preset id */
const addNewDocumentPresetId = async (id, payload, collectionName) => {
  try {
    const documentRef = doc(db, collectionName, id);
    await setDoc(documentRef, payload);
  } catch (err) {
    console.log('err', err);
  }  
}

/* Posts new document with generated id - returns id */
const addNewDocumentRandomId = async (payload, collectionName) => {
  try {
    const documentRef = collection(db, collectionName);
    const q = await addDoc(documentRef, payload);
    return q.id;
  } catch (err) {
    console.log('err', err);
  }  
}

/* Update nested fields of an existing document */
const updateExistingDocument = async (id, payload, collectionName) => {
  try {
    const documentRef = doc(db, collectionName, id);
    const q = await updateDoc(documentRef, payload);
    return q;
  } catch (err) {
    console.log('err', err);
  } 
}

/* Delets a document by id and collection */
const deleteDocumentById = async (id, collectionName) => {
  try {
    const documentRef = doc(db, collectionName, id);
    // await deleteDoc(documentRef);
    await deleteDoc(doc(db, "Players", id));

  } catch (err) {
    console.log('err', err);
  }  
};

export {
  subscribeToSnapshot,
  findExistingDocument,
  addNewDocumentPresetId,
  addNewDocumentRandomId,
  updateExistingDocument,
  deleteDocumentById
}


// export const findExistingDocument =  async (collection, id) => {
//   try {
//     console.log(db)
//   } catch (err) {
//     console.log('err', err);
//   }
// }

// export const getDocumentInCollection = async (collection, id) => {
//   const documentRef = firestore.collection(collection).doc(id);
//   const document = await documentRef.get();
//   if (document) {
//     return document.data();
//   }
// };

// /*
//   If publicId is included, create a document using that id, else generate one in Firebase
// */
// export const addDocToCollection = async (collection, data, publicId) => {
//   try {
//     const docExists = await findExistingDocument(collection, publicId);
//     if (!docExists) {
//       //Document does not already exist
//       firestore.collection(collection).doc(publicId).set(data);
//     };
//   } catch (err) {
//     console.log('err', err);
//   }
// };