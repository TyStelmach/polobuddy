import { db } from '../providers/FirebaseProvider'


export const findExistingDocument =  async (collection, id) => {
  try {
    console.log(db)
  } catch (err) {
    console.log('err', err);
  }
}

export const getDocumentInCollection = async (collection, id) => {
  const documentRef = firestore.collection(collection).doc(id);
  const document = await documentRef.get();
  if (document) {
    return document.data();
  }
};

/*
  If publicId is included, create a document using that id, else generate one in Firebase
*/
export const addDocToCollection = async (collection, data, publicId) => {
  try {
    const docExists = await findExistingDocument(collection, publicId);
    if (!docExists) {
      //Document does not already exist
      firestore.collection(collection).doc(publicId).set(data);
    };
  } catch (err) {
    console.log('err', err);
  }
};