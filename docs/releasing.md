# Releasing a New Version

This document outlines the process for publishing a new version of the `@jose.donas/decorators` package to the npm registry.

## Overview

The release process is automated using GitHub Actions. When a new release is published on GitHub, a workflow is triggered to:

1. Run all tests to ensure code quality.
2. Build the project.
3. Publish the new version to npm.

This ensures that every published version is tagged, versioned, and has passed all continuous integration checks.

## Security

The ability to publish new releases is restricted to repository administrators. The workflow is triggered by the `release` event on GitHub, which can only be created by users with write or admin permissions. The npm automation token is stored as an encrypted secret and is only accessible to the publishing workflow.

## Steps to Release a New Version

1. **Ensure `main` is up-to-date**: Make sure all changes for the new version have been merged into the `main` branch.

2. **Update the Version**: Decide on the new version number based on Semantic Versioning (e.g., `v0.2.0`). Update the `version` field in `package.json`.

3. **Commit and Push**: Commit the version change to `package.json` and push it to the `main` branch.

    ```sh
    git add package.json
    git commit -m "chore(release): v0.2.0"
    git push origin main
    ```

4. **Create a New Release on GitHub**:
    * Navigate to the **Releases** page of the repository.
    * Click on **"Draft a new release"**.
    * For "Tag version", enter the new version number (e.g., `v0.2.0`). It's important that this tag matches the version in `package.json`.
    * Set the "Target" to the `main` branch.
    * Add a title for the release (e.g., "Version 0.2.0").
    * Write a description of the changes in this release.
    * Click **"Publish release"**.

Once the release is published, the `Release` workflow will automatically start. You can monitor its progress in the "Actions" tab of the repository. If the `test` and `publish` jobs succeed, your new package version will be available on npm.
