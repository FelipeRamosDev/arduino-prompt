/* eslint-disable eqeqeq */
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageService {
    constructor() { }

    async setItem({ collection, item }) {
        return new Promise(async (resolve, reject) => {
            try {
                let coll = await AsyncStorage.getItem(collection);

                if (!coll) {
                    await AsyncStorage.setItem(
                        collection,
                        JSON.stringify([item])
                    );
                    resolve([item]);
                } else {
                    let parsed = JSON.parse(coll);

                    if (!parsed.find(x => x.key === item.key)) {
                        parsed.push(item);

                        await AsyncStorage.setItem(
                            collection,
                            JSON.stringify(parsed)
                        );
                        resolve(parsed);
                    } else {
                        parsed.map((x, i) => {
                            if (x.key === item.key) {
                                x = item;
                            }
                        });
                        await AsyncStorage.setItem(
                            collection,
                            JSON.stringify(parsed)
                        );

                        resolve(parsed);
                    }
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    async readCollection(collection) {
        return new Promise(async (resolve, reject) => {
            let coll = await AsyncStorage.getItem(collection);
            try {

                if (coll) {
                    if (coll.length > 0) {
                        resolve(JSON.parse(coll));
                    } else {
                        resolve([]);
                    }
                } else {
                    resolve([]);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    async updateItem({ collection, keyProp, newItem }) {
        return new Promise(async (resolve, reject) => {
            try {
                let coll = await AsyncStorage.getItem(collection);
                let parsed = JSON.parse(coll);

                if (parsed) {

                    parsed.map((x, i) => {
                        if (x[keyProp] == newItem[keyProp]) {
                            parsed[i] = newItem;
                        }
                    });

                    await AsyncStorage.setItem(collection, JSON.stringify(parsed));
                    resolve(parsed);
                } else {
                    reject({ message: 'A coleção declarada não foi encontrada!' });
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    async deleteCollItem({ collection, item }) {
        return new Promise(async (resolve, reject) => {
            try {
                let coll = await AsyncStorage.getItem(collection);
                let parsed = JSON.parse(coll);
                let index = parsed.indexOf(item);

                parsed.splice(index, 1);
                await AsyncStorage.setItem(collection, JSON.stringify(parsed));

                resolve(parsed);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
