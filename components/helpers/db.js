import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('contact.db');

const dbInitQuery = 'CREATE TABLE IF NOT EXISTS contacts ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) , mobile VARCHAR(30) , landline VARCHAR(30) , imageUri VARCHAR(1000));'
const tableInitQuery = `INSERT INTO contacts (name,mobile,landline) VALUES (? ,? , ?)`;
const dbShowTableQuery = "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'";
const retrieveDataQuery = "SELECT name,mobile,landline,imageUri FROM contacts";

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(dbInitQuery,
                [],
                () => {
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

export const insertData = (username, mobile, landline) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(tableInitQuery,
                [username, mobile, landline],
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