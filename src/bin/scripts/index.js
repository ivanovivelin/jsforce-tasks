

/**
 * @description CI2 update Profile , Sprint 78 This is an example tasks
 * @param {*} conn 
 * @param {*} profileName 
 */

export async function updateProfile(conn, profileName) {
    conn.metadata.read('Profile', [profileName], async function (err, metadata) {

        var profileName = 'Admin';

        console.log("Correction permissions for the profile: " + profileName);

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
            await upsertMetadata(conn, "Profile",  metadataUpdated);
        } catch(e) {
            reject(e);
        }
    });
}



/**
 * 
 */

export async function runAllScripts(conn, profileName) { 
    try {
        await foo(); 
        await bar();
        await updateProfile(conn, profileName);
      } catch (err) {
        console.log('Error running Tasks => ', err);
    }
}

export default {foo, bar, runAllScripts, updateProfile}