export const DATABASE_INIT = 'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) , mobile VARCHAR(30) , landline VARCHAR(30) , imageUri VARCHAR(1000) , starred INTEGER);'
export const GET_ALL_CONTACTS = "SELECT id, name, mobile, landline, imageUri, starred FROM contacts ORDER BY name ASC";
export const GET_FAVOURITE_CONTACTS = "SELECT id, name, mobile, landline, imageUri, starred FROM contacts where starred=1 ORDER BY name ASC";
export const GET_CONTACT_BY_ID = "SELECT id, name, mobile, landline, imageUri, starred FROM contacts where id=?";
export const INSERT_CONTACT = "INSERT INTO contacts (name,mobile,landline, imageUri, starred) VALUES (? ,? , ?, ?, ?)";
export const UPDATE_CONTACT_BY_ID = "UPDATE contacts SET name=?,mobile=?,landline=?, imageUri=?, starred=? WHERE id=?";
export const DELETE_CONTACT_BY_ID = "DELETE from contacts WHERE id=?";