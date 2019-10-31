/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

export const serviceName = 'pgSQLToolsService';
export const providerId = 'PGSQL';
export const serviceCrashMessage = 'PG SQL Tools Service component exited unexpectedly. Please restart Azure Data Studio.';
export const serviceCrashButton = 'View Known Issues';
export const serviceCrashLink = 'https://github.com/microsoft/pgtoolsservice/issues?q=is%3Aopen+is%3Aissue+label%3Aknown-issues';
export const projectOutputChannel = 'pgSQLProject';
export const templateDoesNotExistMessage = 'No templates matched the input template name: pgproj.';
export const projectNameSpecialCharsErrorMessage = 'Project names cannot contain any of the following characters: /?:&\\*"<>|#%;';
export const projectNameInvalidErrorMessage = 'Project names cannot be \'.\' or \'..\'';
export const projectNameInvalidCharErrorMessage = 'Project names cannot contain \'..\'';
export const projectNameEmptyErrorMessage = 'Project names cannot be empty';
export const buildCancelMessage = 'Build has been cancelled';
export const buildProgressTitle = 'Building projects';
export const unsupportedPostgreSQLSdkMessage = 'There are some projects that use unsupported version of PostgreSQL SDK.';
export const buildFailedUnsupportedSdkMessage = 'Failed to build project {0}.\nUpdate PostgreSQL SDK to latest version.';
export const buildStartedMessage = 'Build started: Project: {0}';
export const buildCompletedMessage = 'Done building project {0}\n';
export const updatingSdkMessage = 'Updating PostgreSQL SDK version for file {0}.';
export const updatingSdkErrorMessage = 'Error updating SDK version for file {0}.';
export const sdkUpdateCompleteMessage = 'Project file {0} has been updated.';
