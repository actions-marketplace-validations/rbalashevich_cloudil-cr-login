const core = require('@actions/core');
const exec = require('@actions/exec');


async function run() {
    const cloudilSaJsonCredentials = core.getInput('cloudil-sa-json-credentials', {required: true});

    try {

        // Execute the docker login command
        let doLoginStdout = '';
        let doLoginStderr = '';
        const exitCode = await exec.exec('docker login',
            ['--username', 'json_key', '--password-stdin', 'cr.cloudil.com'], {
                silent: false,
                ignoreReturnCode: false,
                input: Buffer.from(cloudilSaJsonCredentials),
                listeners: {
                    stdout: (data) => {
                        doLoginStdout += data.toString();
                    },
                    stderr: (data) => {
                        doLoginStderr += data.toString();
                    }
                }
            });
        
        if (exitCode != 0) {
            core.debug(doLoginStdout);
            throw new Error('Could not login: ' + doLoginStderr);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}
