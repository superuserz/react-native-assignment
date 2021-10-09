import * as SQLite from 'expo-sqlite';
import * as QUERY from './DBQuery';


const db = SQLite.openDatabase('contact.db');
const deleteAllDataQuery = "DELETE FROM contacts";
const dropTableQuery = "DROp TABLE IF EXISTS contacts;";
const decribleTableQuery = "PRAGMA table_info (contacts)";

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            // tx.executeSql(dropTableQuery,
            //     [],
            //     () => {
            //         resolve();
            //     },
            //     (_, err) => {
            //         console.log(err);
            //         reject();
            //     });

            tx.executeSql(QUERY.DATABASE_INIT,
                [],
                (tx, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    console.log(err);
                    reject();
                });
        })
    })
    return promise;

};

export const insertData = (username, mobile, landline, image, starred) => {
    const flag = (starred == true) ? 1 : 0;
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.INSERT_CONTACT,
                [username, mobile, landline, image, flag],
                (_, res) => {
                    resolve(res);
                },
                (_, err) => {
                    console.log(err);
                    reject(err);
                });
        })
    })
    return promise;
};

export const retrieveData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.GET_ALL_CONTACTS,
                [],
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    reject(err);
                });
        })
    })
    return promise;
};

export const retrieveStarredContacts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.GET_FAVOURITE_CONTACTS,
                [],
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    reject(err);
                });
        })
    })
    return promise;
};

export const getContactById = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.GET_CONTACT_BY_ID,
                [id],
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    reject(err);
                });
        })
    })
    return promise;
};

export const updateDataByContactId = (id, name, mobile, landline, imageUri, starred) => {
    const flag = (starred == true) ? 1 : 0;
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.UPDATE_CONTACT_BY_ID,
                [name, mobile, landline, imageUri, flag, id],
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    reject(err);
                });
        })
    })
    return promise;
};

export const deleteContactByContactId = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.DELETE_CONTACT_BY_ID,
                [id],
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, err) => {
                    reject(err);
                });
        })
    })
    return promise;
};

