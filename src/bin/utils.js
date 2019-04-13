import * as root from './root';
const jsforce = require('jsforce');

/**
 * @description Generic function to connect to Salesforce
 * @author Ivelin Ivanov
 * @param {*} options 
 */

export async function connect(options) {
  return new Promise(async (resolve, reject) => {
    const config =  await root.getJob(options);
    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : config.env
    });
    conn.login(config.username, config.password, async function(err, userInfo) {
      if (err) { 
        reject(`Error connection to Salesforce => ${err}`); 
      } else {
        console.log(`Successfully connected to Instance => ${userInfo.organizationId}`);
        resolve(conn);
      }
    });
  });
}

/**
 * @description Generic function to update metadata
 * @author Ivelin Ivanov
 * @param {*} conn 
 * @param {*} type 
 * @param {*} metadata 
 */

export async function upsertMetadata(conn, type, metadata) {
  return new Promise((resolve, reject) => {
      conn.metadata.upsert(type, metadata, async function (err, results) {
          if (err) {
            reject(err);
          }
          console.log(`FullName: ${results.fullName}`);
          console.log(`Created?: ${results.created}`);
          console.log(`Success?: ${results.success}`);
          if (results.success === false) {
              reject(`Failed on updating metadata =>`);
          } else {
              resolve(results.success);
          }
      });
  });
}