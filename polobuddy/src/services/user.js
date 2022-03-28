import { findExistingDocument } from "./collections";

/*
* Find a document within the firestore with a matching document ID
*/

const getExistingUser = async (user) => findExistingDocument(user.uid, 'Players');

export {
  getExistingUser,
}
