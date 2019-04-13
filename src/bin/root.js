const yaml = require('js-yaml');
const fs = require('fs');

/**
 * 
 * @param {*} options 
 */

 export async function getJob(options) {
    return new Promise((resolve, reject) => {
        try {
            var config = yaml.safeLoad(fs.readFileSync(process.cwd() + '/' + options.job, 'utf8'));
            const indentedJson = JSON.stringify(config, null, 4);
            console.log(`Current YAML config => ${indentedJson}`);
            resolve(config);
        } catch (e) {
            reject(e);
        }
    });
}