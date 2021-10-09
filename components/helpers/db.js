import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('contact.db');

const dbInitQuery = 'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) , mobile VARCHAR(30) , landline VARCHAR(30) , imageUri VARCHAR(1000) , starred INTEGER);'
const tableInitQuery = `INSERT INTO contacts (name,mobile,landline, imageUri, starred) VALUES (? ,? , ?, ?, ?)`;
const dbShowTableQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'";
const retrieveDataQuery = "SELECT name, mobile, landline, imageUri, starred FROM contacts ORDER BY name ASC";
const deleteAllDataQuery = "DELETE FROM contacts";
const dropTableQuery = "DROp TABLE IF EXISTS contacts;"
const decribleTableQuery = "PRAGMA table_info (contacts)"

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

            tx.executeSql(dbInitQuery,
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

export const verifyData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(dbShowTableQuery,
                [],
                (tx, res) => {
                    resolve();
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
            tx.executeSql(tableInitQuery,
                [username, mobile, landline, image, flag],
                (tx, res) => {
                    resolve(res);
                },
                (_, err) => {
                    console.log(err);
                    reject();
                });
        })
    })
    return promise;
};

export const retrieveData = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(retrieveDataQuery,
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