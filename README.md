## CloudIL CR "Login" Action for GitHub Actions

Logs in the local Docker client to CloudIL Container Registry.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [License Summary](#license-summary)

<!-- tocstop -->

## Usage

```yaml
    - name: Login to CloudIL Cloud Container Registry
      id: login-cr
      uses: cloudil-actions/cloudil-cr-login@v1
      with:
        cloudil-sa-json-credentials: ${{ secrets.CLIL_SA_JSON_CREDENTIALS }}

    - name: Build, tag, and push image to CloudIL Cloud Container Registry
      env:
        CR_REGISTRY: crp00000000000000000
        CR_REPOSITORY: my-cr-repo
        IMAGE_TAG: ${{ github.sha }}
      run: |
        docker build -t cr.cloudil.com/$CR_REGISTRY/$CR_REPOSITORY:$IMAGE_TAG .
        docker push cr.cloudil.com/$CR_REGISTRY/$CR_REPOSITORY:$IMAGE_TAG
```

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.



## License Summary

This code is made available under the MIT license.
