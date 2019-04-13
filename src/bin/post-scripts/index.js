import * as utils from '../utils';

/**
 * @author Ivelin Ivanov
 * @description CI2 update Profile , Sprint 78 This is an example task
 * @param {*} conn 
 * @param {*} profileName 
 */

export async function updateProfile(conn, profileName) {
    return new Promise((resolve, reject) => {
        conn.metadata.read('Profile', [profileName], async function (err, metadata) {

            var metadataUpdated = {
                fullName: profileName,
                fieldPermissions: [],
                tabVisibilities: [],
                recordTypeVisibilities: []
            };
    
            if(err) {
                reject(err);
            }
            metadataUpdated.fieldPermissions.push(metadata.fieldPermissions);
        
            metadataUpdated.fieldPermissions.forEach(function (field) {
                field.editable = "true";
                field.readable = "true";
            });
        
            try {
                const res = await utils.upsertMetadata(conn, "Profile",  metadataUpdated);
                resolve(res);
            } catch(e) {
                reject(e);
            }
        });
    });
}



/**
 * @author Ivelin Ivanov
 * @description wrapper function to call all scripts
 * @param {*} conn 
 */

export async function runAll(conn) { 
    return new Promise(async (resolve, reject) => {
        try {
            // add all tasks here
            const res = await updateProfile(conn, 'Admin');
            resolve(res);
          } catch (err) {
            reject(`Failed running post-scripts tasks => ${err}`);
        }
    });
}

export default { runAll }