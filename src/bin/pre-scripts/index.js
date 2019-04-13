import * as utils from '../utils';

/**
 * @description CI2 update Profile , Sprint 78 This is an example tasks
 * @param {*} conn 
 * @param {*} profileName 
 */

export async function updateProfile(conn, profileName) {
    conn.metadata.read('Profile', [profileName], async function (err, metadata) {

        var profileName = 'Admin';

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
            await utils.upsertMetadata(conn, "Profile",  metadataUpdated);
        } catch(e) {
            reject(e);
        }
    });
}



/**
 * @author Ivelin Ivanov
 * @description wrapper function to call all scripts
 */

export async function runAllScripts(conn, profileName) { 
    try {
        //add all functions here
        await updateProfile(conn, profileName);
      } catch (err) {
        console.log('Error running Tasks => ', err);
    }
}

export default { runAllScripts }