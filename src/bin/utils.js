import * as root from './root';
const jsforce = require('jsforce');

var args = process.argv.slice(2);

var parseArgs = require('minimist');

var argv = parseArgs(args);

/**
 * @description
 * @author
 */

export async function connectSF() {
  return new Promise(async (resolve, reject) => {

    const config =  await root.getYaml(argv);

    const conn = new jsforce.Connection({
      // you can change loginUrl to connect to sandbox or prerelease env.
      loginUrl : config.env
    });

    conn.login(config.username, config.password, async function(err, userInfo) {
      if (err) { 
        reject(`Error connection to Salesforce => ${err}`); 
      } else {
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        resolve(userInfo.id);
      }
    });
  });
}

/**
 * @description
 * @author
 * @param {*} conn 
 * @param {*} type 
 * @param {*} metadata 
 */

export async function upsertMetadata(conn, type, metadata) {
  return new Promise((resolve, reject) => {
      conn.metadata.upsert(type, metadata, async function (err, results) {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('FullName: ' + results.fullName);
          console.log('Created?: ' + results.created);
          console.log('Success?: ' + results.success);
          if (results.success === false) {
              reject("failed to update");
          } else {
              resolve(results.success);
          }
      });
  });
}