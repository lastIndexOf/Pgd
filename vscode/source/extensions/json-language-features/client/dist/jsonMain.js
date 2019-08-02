(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = __webpack_require__(1);
	const fs = __webpack_require__(2);
	const nls = __webpack_require__(3);
	const request_light_1 = __webpack_require__(4);
	const localize = nls.loadMessageBundle(__webpack_require__(1).join(__dirname, 'jsonMain.ts'));
	const vscode_1 = __webpack_require__(33);
	const vscode_languageclient_1 = __webpack_require__(34);
	const vscode_extension_telemetry_1 = __webpack_require__(77);
	const hash_1 = __webpack_require__(155);
	var VSCodeContentRequest;
	(function (VSCodeContentRequest) {
		VSCodeContentRequest.type = new vscode_languageclient_1.RequestType('vscode/content');
	})(VSCodeContentRequest || (VSCodeContentRequest = {}));
	var SchemaContentChangeNotification;
	(function (SchemaContentChangeNotification) {
		SchemaContentChangeNotification.type = new vscode_languageclient_1.NotificationType('json/schemaContent');
	})(SchemaContentChangeNotification || (SchemaContentChangeNotification = {}));
	var ForceValidateRequest;
	(function (ForceValidateRequest) {
		ForceValidateRequest.type = new vscode_languageclient_1.RequestType('json/validate');
	})(ForceValidateRequest || (ForceValidateRequest = {}));
	var SchemaAssociationNotification;
	(function (SchemaAssociationNotification) {
		SchemaAssociationNotification.type = new vscode_languageclient_1.NotificationType('json/schemaAssociations');
	})(SchemaAssociationNotification || (SchemaAssociationNotification = {}));
	let telemetryReporter;
	function activate(context) {
		let toDispose = context.subscriptions;
		let packageInfo = getPackageInfo(context);
		telemetryReporter = packageInfo && new vscode_extension_telemetry_1.default(packageInfo.name, packageInfo.version, packageInfo.aiKey);
		let serverMain = readJSONFile(context.asAbsolutePath('./server/package.json')).main;
		let serverModule = context.asAbsolutePath(path.join('server', serverMain));
		// The debug options for the server
		let debugOptions = { execArgv: ['--nolazy', '--inspect=' + (9000 + Math.round(Math.random() * 10000))] };
		// If the extension is launch in debug mode the debug server options are use
		// Otherwise the run options are used
		let serverOptions = {
			run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
			debug: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc, options: debugOptions }
		};
		let documentSelector = ['json', 'jsonc'];
		let schemaResolutionErrorStatusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 0);
		schemaResolutionErrorStatusBarItem.command = '_json.retryResolveSchema';
		schemaResolutionErrorStatusBarItem.tooltip = localize(0, null) + ' ' + localize(1, null);
		schemaResolutionErrorStatusBarItem.text = '$(alert)';
		toDispose.push(schemaResolutionErrorStatusBarItem);
		let fileSchemaErrors = new Map();
		// Options to control the language client
		let clientOptions = {
			// Register the server for json documents
			documentSelector,
			initializationOptions: {
				handledSchemaProtocols: ['file'] // language server only loads file-URI. Fetching schemas with other protocols ('http'...) are made on the client.
			},
			synchronize: {
				// Synchronize the setting section 'json' to the server
				configurationSection: ['json', 'http'],
				fileEvents: vscode_1.workspace.createFileSystemWatcher('**/*.json')
			},
			middleware: {
				workspace: {
					didChangeConfiguration: () => client.sendNotification(vscode_languageclient_1.DidChangeConfigurationNotification.type, { settings: getSettings() })
				},
				handleDiagnostics: (uri, diagnostics, next) => {
					const schemaErrorIndex = diagnostics.findIndex(candidate => candidate.code === /* SchemaResolveError */ 0x300);
					if (schemaErrorIndex === -1) {
						fileSchemaErrors.delete(uri.toString());
						return next(uri, diagnostics);
					}
					const schemaResolveDiagnostic = diagnostics[schemaErrorIndex];
					fileSchemaErrors.set(uri.toString(), schemaResolveDiagnostic.message);
					if (vscode_1.window.activeTextEditor && vscode_1.window.activeTextEditor.document.uri.toString() === uri.toString()) {
						schemaResolutionErrorStatusBarItem.show();
					}
					next(uri, diagnostics);
				}
			}
		};
		// Create the language client and start the client.
		let client = new vscode_languageclient_1.LanguageClient('json', localize(2, null), serverOptions, clientOptions);
		client.registerProposedFeatures();
		let disposable = client.start();
		toDispose.push(disposable);
		client.onReady().then(() => {
			disposable = client.onTelemetry(e => {
				if (telemetryReporter) {
					telemetryReporter.sendTelemetryEvent(e.key, e.data);
				}
			});
			// handle content request
			client.onRequest(VSCodeContentRequest.type, (uriPath) => {
				let uri = vscode_1.Uri.parse(uriPath);
				if (uri.scheme !== 'http' && uri.scheme !== 'https') {
					return vscode_1.workspace.openTextDocument(uri).then(doc => {
						return doc.getText();
					}, error => {
						return Promise.reject(error);
					});
				}
				else {
					const headers = { 'Accept-Encoding': 'gzip, deflate' };
					return request_light_1.xhr({ url: uriPath, followRedirects: 5, headers }).then(response => {
						return response.responseText;
					}, (error) => {
						return Promise.reject(error.responseText || request_light_1.getErrorStatusDescription(error.status) || error.toString());
					});
				}
			});
			let handleContentChange = (uri) => {
				if (uri.scheme === 'vscode' && uri.authority === 'schemas') {
					client.sendNotification(SchemaContentChangeNotification.type, uri.toString());
				}
			};
			let handleActiveEditorChange = (activeEditor) => {
				if (!activeEditor) {
					return;
				}
				const activeDocUri = activeEditor.document.uri.toString();
				if (activeDocUri && fileSchemaErrors.has(activeDocUri)) {
					schemaResolutionErrorStatusBarItem.show();
				}
				else {
					schemaResolutionErrorStatusBarItem.hide();
				}
			};
			toDispose.push(vscode_1.workspace.onDidChangeTextDocument(e => handleContentChange(e.document.uri)));
			toDispose.push(vscode_1.workspace.onDidCloseTextDocument(d => {
				handleContentChange(d.uri);
				fileSchemaErrors.delete(d.uri.toString());
			}));
			toDispose.push(vscode_1.window.onDidChangeActiveTextEditor(handleActiveEditorChange));
			let handleRetryResolveSchemaCommand = () => {
				if (vscode_1.window.activeTextEditor) {
					schemaResolutionErrorStatusBarItem.text = '$(watch)';
					const activeDocUri = vscode_1.window.activeTextEditor.document.uri.toString();
					client.sendRequest(ForceValidateRequest.type, activeDocUri).then((diagnostics) => {
						const schemaErrorIndex = diagnostics.findIndex(candidate => candidate.code === /* SchemaResolveError */ 0x300);
						if (schemaErrorIndex !== -1) {
							// Show schema resolution errors in status bar only; ref: #51032
							const schemaResolveDiagnostic = diagnostics[schemaErrorIndex];
							fileSchemaErrors.set(activeDocUri, schemaResolveDiagnostic.message);
						}
						else {
							schemaResolutionErrorStatusBarItem.hide();
						}
						schemaResolutionErrorStatusBarItem.text = '$(alert)';
					});
				}
			};
			toDispose.push(vscode_1.commands.registerCommand('_json.retryResolveSchema', handleRetryResolveSchemaCommand));
			client.sendNotification(SchemaAssociationNotification.type, getSchemaAssociation(context));
			vscode_1.extensions.onDidChange(_ => {
				client.sendNotification(SchemaAssociationNotification.type, getSchemaAssociation(context));
			});
			documentSelector.forEach(selector => {
				toDispose.push(vscode_1.languages.registerSelectionRangeProvider(selector, {
					async provideSelectionRanges(document, positions) {
						const textDocument = client.code2ProtocolConverter.asTextDocumentIdentifier(document);
						const rawResult = await client.sendRequest('$/textDocument/selectionRanges', { textDocument, positions: positions.map(client.code2ProtocolConverter.asPosition) });
						if (Array.isArray(rawResult)) {
							return rawResult.map(rawSelectionRanges => {
								return rawSelectionRanges.reduceRight((parent, selectionRange) => {
									return {
										range: client.protocol2CodeConverter.asRange(selectionRange.range),
										parent,
									};
								}, undefined);
							});
						}
						return [];
					}
				}));
			});
		});
		let languageConfiguration = {
			wordPattern: /("(?:[^\\\"]*(?:\\.)?)*"?)|[^\s{}\[\],:]+/,
			indentationRules: {
				increaseIndentPattern: /^.*(\{[^}]*|\[[^\]]*)$/,
				decreaseIndentPattern: /^\s*[}\]],?\s*$/
			}
		};
		vscode_1.languages.setLanguageConfiguration('json', languageConfiguration);
		vscode_1.languages.setLanguageConfiguration('jsonc', languageConfiguration);
	}
	exports.activate = activate;
	function deactivate() {
		return telemetryReporter ? telemetryReporter.dispose() : Promise.resolve(null);
	}
	exports.deactivate = deactivate;
	function getSchemaAssociation(_context) {
		let associations = {};
		vscode_1.extensions.all.forEach(extension => {
			let packageJSON = extension.packageJSON;
			if (packageJSON && packageJSON.contributes && packageJSON.contributes.jsonValidation) {
				let jsonValidation = packageJSON.contributes.jsonValidation;
				if (Array.isArray(jsonValidation)) {
					jsonValidation.forEach(jv => {
						let { fileMatch, url } = jv;
						if (fileMatch && url) {
							if (url[0] === '.' && url[1] === '/') {
								url = vscode_1.Uri.file(path.join(extension.extensionPath, url)).toString();
							}
							if (fileMatch[0] === '%') {
								fileMatch = fileMatch.replace(/%APP_SETTINGS_HOME%/, '/User');
								fileMatch = fileMatch.replace(/%APP_WORKSPACES_HOME%/, '/Workspaces');
							}
							else if (fileMatch.charAt(0) !== '/' && !fileMatch.match(/\w+:\/\//)) {
								fileMatch = '/' + fileMatch;
							}
							let association = associations[fileMatch];
							if (!association) {
								association = [];
								associations[fileMatch] = association;
							}
							association.push(url);
						}
					});
				}
			}
		});
		return associations;
	}
	function getSettings() {
		let httpSettings = vscode_1.workspace.getConfiguration('http');
		let settings = {
			http: {
				proxy: httpSettings.get('proxy'),
				proxyStrictSSL: httpSettings.get('proxyStrictSSL')
			},
			json: {
				format: vscode_1.workspace.getConfiguration('json').get('format'),
				schemas: [],
			}
		};
		let schemaSettingsById = Object.create(null);
		let collectSchemaSettings = (schemaSettings, rootPath, fileMatchPrefix) => {
			for (let setting of schemaSettings) {
				let url = getSchemaId(setting, rootPath);
				if (!url) {
					continue;
				}
				let schemaSetting = schemaSettingsById[url];
				if (!schemaSetting) {
					schemaSetting = schemaSettingsById[url] = { url, fileMatch: [] };
					settings.json.schemas.push(schemaSetting);
				}
				let fileMatches = setting.fileMatch;
				let resultingFileMatches = schemaSetting.fileMatch;
				if (Array.isArray(fileMatches)) {
					if (fileMatchPrefix) {
						for (let fileMatch of fileMatches) {
							if (fileMatch[0] === '/') {
								resultingFileMatches.push(fileMatchPrefix + fileMatch);
								resultingFileMatches.push(fileMatchPrefix + '/*' + fileMatch);
							}
							else {
								resultingFileMatches.push(fileMatchPrefix + '/' + fileMatch);
								resultingFileMatches.push(fileMatchPrefix + '/*/' + fileMatch);
							}
						}
					}
					else {
						resultingFileMatches.push(...fileMatches);
					}
				}
				if (setting.schema) {
					schemaSetting.schema = setting.schema;
				}
			}
		};
		// merge global and folder settings. Qualify all file matches with the folder path.
		let globalSettings = vscode_1.workspace.getConfiguration('json', null).get('schemas');
		if (Array.isArray(globalSettings)) {
			collectSchemaSettings(globalSettings, vscode_1.workspace.rootPath);
		}
		let folders = vscode_1.workspace.workspaceFolders;
		if (folders) {
			for (let folder of folders) {
				let folderUri = folder.uri;
				let schemaConfigInfo = vscode_1.workspace.getConfiguration('json', folderUri).inspect('schemas');
				let folderSchemas = schemaConfigInfo.workspaceFolderValue;
				if (Array.isArray(folderSchemas)) {
					let folderPath = folderUri.toString();
					if (folderPath[folderPath.length - 1] === '/') {
						folderPath = folderPath.substr(0, folderPath.length - 1);
					}
					collectSchemaSettings(folderSchemas, folderUri.fsPath, folderPath);
				}
			}
		}
		return settings;
	}
	function getSchemaId(schema, rootPath) {
		let url = schema.url;
		if (!url) {
			if (schema.schema) {
				url = schema.schema.id || `vscode://schemas/custom/${encodeURIComponent(hash_1.hash(schema.schema).toString(16))}`;
			}
		}
		else if (rootPath && (url[0] === '.' || url[0] === '/')) {
			url = vscode_1.Uri.file(path.normalize(path.join(rootPath, url))).toString();
		}
		return url;
	}
	function getPackageInfo(context) {
		let extensionPackage = readJSONFile(context.asAbsolutePath('./package.json'));
		if (extensionPackage) {
			return {
				name: extensionPackage.name,
				version: extensionPackage.version,
				aiKey: extensionPackage.aiKey
			};
		}
		return undefined;
	}
	function readJSONFile(location) {
		try {
			return JSON.parse(fs.readFileSync(location).toString());
		}
		catch (e) {
			console.log(`Problems reading ${location}: ${e}`);
			return {};
		}
	}


	/***/ }),
	/* 1 */
	/***/ (function(module, exports) {

	module.exports = require("path");

	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {

	module.exports = require("fs");

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	var path = __webpack_require__(1);
	var fs = __webpack_require__(2);
	var toString = Object.prototype.toString;
	function isDefined(value) {
		return typeof value !== 'undefined';
	}
	function isNumber(value) {
		return toString.call(value) === '[object Number]';
	}
	function isString(value) {
		return toString.call(value) === '[object String]';
	}
	function isBoolean(value) {
		return value === true || value === false;
	}
	function readJsonFileSync(filename) {
		return JSON.parse(fs.readFileSync(filename, 'utf8'));
	}
	var MessageFormat;
	(function (MessageFormat) {
		MessageFormat["file"] = "file";
		MessageFormat["bundle"] = "bundle";
		MessageFormat["both"] = "both";
	})(MessageFormat = exports.MessageFormat || (exports.MessageFormat = {}));
	var LocalizeInfo;
	(function (LocalizeInfo) {
		function is(value) {
			var candidate = value;
			return candidate && isDefined(candidate.key) && isDefined(candidate.comment);
		}
		LocalizeInfo.is = is;
	})(LocalizeInfo || (LocalizeInfo = {}));
	var resolvedLanguage;
	var resolvedBundles;
	var options;
	var isPseudo;
	function initializeSettings() {
		options = { locale: undefined, languagePackSupport: false, cacheLanguageResolution: true, messageFormat: MessageFormat.bundle };
		if (isString(process.env.VSCODE_NLS_CONFIG)) {
			try {
				var vscodeOptions = JSON.parse(process.env.VSCODE_NLS_CONFIG);
				if (isString(vscodeOptions.locale)) {
					options.locale = vscodeOptions.locale.toLowerCase();
				}
				if (isBoolean(vscodeOptions._languagePackSupport)) {
					options.languagePackSupport = vscodeOptions._languagePackSupport;
				}
				if (isString(vscodeOptions._cacheRoot)) {
					options.cacheRoot = vscodeOptions._cacheRoot;
				}
				if (isString(vscodeOptions._languagePackId)) {
					options.languagePackId = vscodeOptions._languagePackId;
				}
				if (isString(vscodeOptions._translationsConfigFile)) {
					options.translationsConfigFile = vscodeOptions._translationsConfigFile;
					try {
						options.translationsConfig = readJsonFileSync(options.translationsConfigFile);
					}
					catch (error) {
						// We can't read the translation config file. Mark the cache as corrupted.
						if (vscodeOptions._corruptedFile) {
							fs.writeFile(vscodeOptions._corruptedFile, 'corrupted', 'utf8', function (err) {
								console.error(err);
							});
						}
					}
				}
			}
			catch (_a) {
				// Do nothing.
			}
		}
		isPseudo = options.locale === 'pseudo';
		resolvedLanguage = undefined;
		resolvedBundles = Object.create(null);
	}
	initializeSettings();
	function supportsLanguagePack() {
		return options.languagePackSupport === true && options.cacheRoot !== undefined && options.languagePackId !== undefined && options.translationsConfigFile !== undefined
			&& options.translationsConfig !== undefined;
	}
	function format(message, args) {
		var result;
		if (isPseudo) {
			// FF3B and FF3D is the Unicode zenkaku representation for [ and ]
			message = '\uFF3B' + message.replace(/[aouei]/g, '$&$&') + '\uFF3D';
		}
		if (args.length === 0) {
			result = message;
		}
		else {
			result = message.replace(/\{(\d+)\}/g, function (match, rest) {
				var index = rest[0];
				var arg = args[index];
				var replaced = match;
				if (typeof arg === 'string') {
					replaced = arg;
				}
				else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) {
					replaced = String(arg);
				}
				return replaced;
			});
		}
		return result;
	}
	function createScopedLocalizeFunction(messages) {
		return function (key, message) {
			var args = [];
			for (var _i = 2; _i < arguments.length; _i++) {
				args[_i - 2] = arguments[_i];
			}
			if (isNumber(key)) {
				if (key >= messages.length) {
					console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: " + new Error('').stack);
					return;
				}
				return format(messages[key], args);
			}
			else {
				if (isString(message)) {
					console.warn("Message " + message + " didn't get externalized correctly.");
					return format(message, args);
				}
				else {
					console.error("Broken localize call found. Stacktrace is\n: " + new Error('').stack);
				}
			}
		};
	}
	function localize(key, message) {
		var args = [];
		for (var _i = 2; _i < arguments.length; _i++) {
			args[_i - 2] = arguments[_i];
		}
		return format(message, args);
	}
	function resolveLanguage(file) {
		var resolvedLanguage;
		if (options.cacheLanguageResolution && resolvedLanguage) {
			resolvedLanguage = resolvedLanguage;
		}
		else {
			if (isPseudo || !options.locale) {
				resolvedLanguage = '.nls.json';
			}
			else {
				var locale = options.locale;
				while (locale) {
					var candidate = '.nls.' + locale + '.json';
					if (fs.existsSync(file + candidate)) {
						resolvedLanguage = candidate;
						break;
					}
					else {
						var index = locale.lastIndexOf('-');
						if (index > 0) {
							locale = locale.substring(0, index);
						}
						else {
							resolvedLanguage = '.nls.json';
							locale = null;
						}
					}
				}
			}
			if (options.cacheLanguageResolution) {
				resolvedLanguage = resolvedLanguage;
			}
		}
		return file + resolvedLanguage;
	}
	function findInTheBoxBundle(root) {
		var locale = options.locale;
		while (locale) {
			var candidate = path.join(root, "nls.bundle." + locale + ".json");
			if (fs.existsSync(candidate)) {
				return candidate;
			}
			else {
				var index = locale.lastIndexOf('-');
				if (index > 0) {
					locale = locale.substring(0, index);
				}
				else {
					locale = undefined;
				}
			}
		}
		// Test if we can reslove the default bundle.
		if (locale === undefined) {
			var candidate = path.join(root, 'nls.bundle.json');
			if (fs.existsSync(candidate)) {
				return candidate;
			}
		}
		return undefined;
	}
	function mkdir(directory) {
		try {
			fs.mkdirSync(directory);
		}
		catch (err) {
			if (err.code === 'EEXIST') {
				return;
			}
			else if (err.code === 'ENOENT') {
				var parent = path.dirname(directory);
				if (parent !== directory) {
					mkdir(parent);
					fs.mkdirSync(directory);
				}
			}
			else {
				throw err;
			}
		}
	}
	function createDefaultNlsBundle(folder) {
		var metaData = readJsonFileSync(path.join(folder, 'nls.metadata.json'));
		var result = Object.create(null);
		for (var module_1 in metaData) {
			var entry = metaData[module_1];
			result[module_1] = entry.messages;
		}
		return result;
	}
	function createNLSBundle(header, metaDataPath) {
		var languagePackLocation = options.translationsConfig[header.id];
		if (!languagePackLocation) {
			return undefined;
		}
		var languagePack = readJsonFileSync(languagePackLocation).contents;
		var metaData = readJsonFileSync(path.join(metaDataPath, 'nls.metadata.json'));
		var result = Object.create(null);
		for (var module_2 in metaData) {
			var entry = metaData[module_2];
			var translations = languagePack[header.outDir + "/" + module_2];
			if (translations) {
				var resultMessages = [];
				for (var i = 0; i < entry.keys.length; i++) {
					var messageKey = entry.keys[i];
					var key = isString(messageKey) ? messageKey : messageKey.key;
					var translatedMessage = translations[key];
					if (translatedMessage === undefined) {
						translatedMessage = entry.messages[i];
					}
					resultMessages.push(translatedMessage);
				}
				result[module_2] = resultMessages;
			}
			else {
				result[module_2] = entry.messages;
			}
		}
		return result;
	}
	function touch(file) {
		var d = new Date();
		fs.utimes(file, d, d, function () {
			// Do nothing. Ignore
		});
	}
	function cacheBundle(key, bundle) {
		resolvedBundles[key] = bundle;
		return bundle;
	}
	function loadNlsBundleOrCreateFromI18n(header, bundlePath) {
		var result;
		var bundle = path.join(options.cacheRoot, header.id + "-" + header.hash + ".json");
		var useMemoryOnly = false;
		var writeBundle = false;
		try {
			result = JSON.parse(fs.readFileSync(bundle, { encoding: 'utf8', flag: 'r' }));
			touch(bundle);
			return result;
		}
		catch (err) {
			if (err.code === 'ENOENT') {
				writeBundle = true;
			}
			else if (err instanceof SyntaxError) {
				// We have a syntax error. So no valid JSON. Use
				console.log("Syntax error parsing message bundle: " + err.message + ".");
				fs.unlink(bundle, function (err) {
					if (err) {
						console.error("Deleting corrupted bundle " + bundle + " failed.");
					}
				});
				useMemoryOnly = true;
			}
			else {
				throw err;
			}
		}
		result = createNLSBundle(header, bundlePath);
		if (!result || useMemoryOnly) {
			return result;
		}
		if (writeBundle) {
			try {
				fs.writeFileSync(bundle, JSON.stringify(result), { encoding: 'utf8', flag: 'wx' });
			}
			catch (err) {
				if (err.code === 'EEXIST') {
					return result;
				}
				throw err;
			}
		}
		return result;
	}
	function loadDefaultNlsBundle(bundlePath) {
		try {
			return createDefaultNlsBundle(bundlePath);
		}
		catch (err) {
			console.log("Generating default bundle from meta data failed.", err);
			return undefined;
		}
	}
	function loadNlsBundle(header, bundlePath) {
		var result;
		// Core decided to use a language pack. Do the same in the extension
		if (supportsLanguagePack()) {
			try {
				result = loadNlsBundleOrCreateFromI18n(header, bundlePath);
			}
			catch (err) {
				console.log("Load or create bundle failed ", err);
			}
		}
		if (!result) {
			// No language pack found, but core is running in language pack mode
			// Don't try to use old in the box bundles since the might be stale
			// Fall right back to the default bundle.
			if (options.languagePackSupport) {
				return loadDefaultNlsBundle(bundlePath);
			}
			var candidate = findInTheBoxBundle(bundlePath);
			if (candidate) {
				try {
					return readJsonFileSync(candidate);
				}
				catch (err) {
					console.log("Loading in the box message bundle failed.", err);
				}
			}
			result = loadDefaultNlsBundle(bundlePath);
		}
		return result;
	}
	function tryFindMetaDataHeaderFile(file) {
		var result;
		var dirname = path.dirname(file);
		while (true) {
			result = path.join(dirname, 'nls.metadata.header.json');
			if (fs.existsSync(result)) {
				break;
			}
			var parent = path.dirname(dirname);
			if (parent === dirname) {
				result = undefined;
				break;
			}
			else {
				dirname = parent;
			}
		}
		return result;
	}
	function loadMessageBundle(file) {
		if (!file) {
			// No file. We are in dev mode. Return the default
			// localize function.
			return localize;
		}
		// Remove extension since we load json files.
		var ext = path.extname(file);
		if (ext) {
			file = file.substr(0, file.length - ext.length);
		}
		if (options.messageFormat === MessageFormat.both || options.messageFormat === MessageFormat.bundle) {
			var headerFile = tryFindMetaDataHeaderFile(file);
			if (headerFile) {
				var bundlePath = path.dirname(headerFile);
				var bundle = resolvedBundles[bundlePath];
				if (bundle === undefined) {
					try {
						var header = JSON.parse(fs.readFileSync(headerFile, 'utf8'));
						try {
							var nlsBundle = loadNlsBundle(header, bundlePath);
							bundle = cacheBundle(bundlePath, nlsBundle ? { header: header, nlsBundle: nlsBundle } : null);
						}
						catch (err) {
							console.error('Failed to load nls bundle', err);
							bundle = cacheBundle(bundlePath, null);
						}
					}
					catch (err) {
						console.error('Failed to read header file', err);
						bundle = cacheBundle(bundlePath, null);
					}
				}
				if (bundle) {
					var module_3 = file.substr(bundlePath.length + 1).replace(/\\/g, '/');
					var messages = bundle.nlsBundle[module_3];
					if (messages === undefined) {
						console.error("Messages for file " + file + " not found. See console for details.");
						return function () {
							return 'Messages not found.';
						};
					}
					return createScopedLocalizeFunction(messages);
				}
			}
		}
		if (options.messageFormat === MessageFormat.both || options.messageFormat === MessageFormat.file) {
			// Try to load a single file bundle
			try {
				var json = readJsonFileSync(resolveLanguage(file));
				if (Array.isArray(json)) {
					return createScopedLocalizeFunction(json);
				}
				else {
					if (isDefined(json.messages) && isDefined(json.keys)) {
						return createScopedLocalizeFunction(json.messages);
					}
					else {
						console.error("String bundle '" + file + "' uses an unsupported format.");
						return function () {
							return 'File bundle has unsupported format. See console for details';
						};
					}
				}
			}
			catch (err) {
				if (err.code !== 'ENOENT') {
					console.error('Failed to load single file bundle', err);
				}
			}
		}
		console.error("Failed to load message bundle for file " + file);
		return function () {
			return 'Failed to load message bundle. See console for details.';
		};
	}
	exports.loadMessageBundle = loadMessageBundle;
	function config(opts) {
		if (opts) {
			if (isString(opts.locale)) {
				options.locale = opts.locale.toLowerCase();
				resolvedLanguage = undefined;
				resolvedBundles = Object.create(null);
			}
			if (opts.messageFormat !== undefined) {
				options.messageFormat = opts.messageFormat;
			}
		}
		isPseudo = options.locale === 'pseudo';
		return loadMessageBundle;
	}
	exports.config = config;
	//# sourceMappingURL=main.js.map

	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	var url_1 = __webpack_require__(5);
	var https = __webpack_require__(6);
	var http = __webpack_require__(7);
	var HttpProxyAgent = __webpack_require__(8);
	var HttpsProxyAgent = __webpack_require__(26);
	var zlib = __webpack_require__(32);
	var nls = __webpack_require__(3);
	nls.config(process.env['VSCODE_NLS_CONFIG']);
	var localize = nls.loadMessageBundle();
	var proxyUrl = null;
	var strictSSL = true;
	function configure(_proxyUrl, _strictSSL) {
		proxyUrl = _proxyUrl;
		strictSSL = _strictSSL;
	}
	exports.configure = configure;
	function xhr(options) {
		var agent = getProxyAgent(options.url, { proxyUrl: proxyUrl, strictSSL: strictSSL });
		options = assign({}, options);
		options = assign(options, { agent: agent, strictSSL: strictSSL });
		if (typeof options.followRedirects !== 'number') {
			options.followRedirects = 5;
		}
		return request(options).then(function (result) { return new Promise(function (c, e) {
			var res = result.res;
			var readable = res;
			var encoding = res.headers && res.headers['content-encoding'];
			var isCompleted = false;
			if (encoding === 'gzip') {
				var gunzip = zlib.createGunzip();
				res.pipe(gunzip);
				readable = gunzip;
			}
			else if (encoding === 'deflate') {
				var inflate = zlib.createInflate();
				res.pipe(inflate);
				readable = inflate;
			}
			var data = [];
			readable.on('data', function (c) { return data.push(c); });
			readable.on('end', function () {
				if (isCompleted) {
					return;
				}
				isCompleted = true;
				if (options.followRedirects > 0 && (res.statusCode >= 300 && res.statusCode <= 303 || res.statusCode === 307)) {
					var location = res.headers['location'];
					if (location) {
						var newOptions = {
							type: options.type, url: location, user: options.user, password: options.password, responseType: options.responseType, headers: options.headers,
							timeout: options.timeout, followRedirects: options.followRedirects - 1, data: options.data
						};
						xhr(newOptions).then(c, e);
						return;
					}
				}
				var response = {
					responseText: data.join(''),
					status: res.statusCode
				};
				if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 1223) {
					c(response);
				}
				else {
					e(response);
				}
			});
			readable.on('error', function (err) {
				var response = {
					responseText: localize('error', 'Unable to access {0}. Error: {1}', options.url, err.message),
					status: 500
				};
				isCompleted = true;
				e(response);
			});
		}); }, function (err) {
			var message;
			if (agent) {
				message = localize('error.cannot.connect.proxy', 'Unable to connect to {0} through a proxy . Error: {1}', options.url, err.message);
			}
			else {
				message = localize('error.cannot.connect', 'Unable to connect to {0}. Error: {1}', options.url, err.message);
			}
			return Promise.reject({
				responseText: message,
				status: 404
			});
		});
	}
	exports.xhr = xhr;
	function assign(destination) {
		var sources = [];
		for (var _i = 1; _i < arguments.length; _i++) {
			sources[_i - 1] = arguments[_i];
		}
		sources.forEach(function (source) { return Object.keys(source).forEach(function (key) { return destination[key] = source[key]; }); });
		return destination;
	}
	function request(options) {
		var req;
		return new Promise(function (c, e) {
			var endpoint = url_1.parse(options.url);
			var opts = {
				hostname: endpoint.hostname,
				port: endpoint.port ? parseInt(endpoint.port) : (endpoint.protocol === 'https:' ? 443 : 80),
				path: endpoint.path,
				method: options.type || 'GET',
				headers: options.headers,
				agent: options.agent,
				rejectUnauthorized: (typeof options.strictSSL === 'boolean') ? options.strictSSL : true
			};
			if (options.user && options.password) {
				opts.auth = options.user + ':' + options.password;
			}
			var handler = function (res) {
				if (res.statusCode >= 300 && res.statusCode < 400 && options.followRedirects && options.followRedirects > 0 && res.headers['location']) {
					c(request(assign({}, options, {
						url: res.headers['location'],
						followRedirects: options.followRedirects - 1
					})));
				}
				else {
					c({ req: req, res: res });
				}
			};
			if (endpoint.protocol === 'https:') {
				req = https.request(opts, handler);
			}
			else {
				req = http.request(opts, handler);
			}
			req.on('error', e);
			if (options.timeout) {
				req.setTimeout(options.timeout);
			}
			if (options.data) {
				req.write(options.data);
			}
			req.end();
		});
	}
	function getErrorStatusDescription(status) {
		if (status < 400) {
			return void 0;
		}
		switch (status) {
			case 400: return localize('status.400', 'Bad request. The request cannot be fulfilled due to bad syntax.');
			case 401: return localize('status.401', 'Unauthorized. The server is refusing to respond.');
			case 403: return localize('status.403', 'Forbidden. The server is refusing to respond.');
			case 404: return localize('status.404', 'Not Found. The requested location could not be found.');
			case 405: return localize('status.405', 'Method not allowed. A request was made using a request method not supported by that location.');
			case 406: return localize('status.406', 'Not Acceptable. The server can only generate a response that is not accepted by the client.');
			case 407: return localize('status.407', 'Proxy Authentication Required. The client must first authenticate itself with the proxy.');
			case 408: return localize('status.408', 'Request Timeout. The server timed out waiting for the request.');
			case 409: return localize('status.409', 'Conflict. The request could not be completed because of a conflict in the request.');
			case 410: return localize('status.410', 'Gone. The requested page is no longer available.');
			case 411: return localize('status.411', 'Length Required. The "Content-Length" is not defined.');
			case 412: return localize('status.412', 'Precondition Failed. The precondition given in the request evaluated to false by the server.');
			case 413: return localize('status.413', 'Request Entity Too Large. The server will not accept the request, because the request entity is too large.');
			case 414: return localize('status.414', 'Request-URI Too Long. The server will not accept the request, because the URL is too long.');
			case 415: return localize('status.415', 'Unsupported Media Type. The server will not accept the request, because the media type is not supported.');
			case 500: return localize('status.500', 'Internal Server Error.');
			case 501: return localize('status.501', 'Not Implemented. The server either does not recognize the request method, or it lacks the ability to fulfill the request.');
			case 503: return localize('status.503', 'Service Unavailable. The server is currently unavailable (overloaded or down).');
			default: return localize('status.416', 'HTTP status code {0}', status);
		}
	}
	exports.getErrorStatusDescription = getErrorStatusDescription;
	// proxy handling
	function getSystemProxyURI(requestURL) {
		if (requestURL.protocol === 'http:') {
			return process.env.HTTP_PROXY || process.env.http_proxy || null;
		}
		else if (requestURL.protocol === 'https:') {
			return process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null;
		}
		return null;
	}
	function getProxyAgent(rawRequestURL, options) {
		if (options === void 0) { options = {}; }
		var requestURL = url_1.parse(rawRequestURL);
		var proxyURL = options.proxyUrl || getSystemProxyURI(requestURL);
		if (!proxyURL) {
			return null;
		}
		var proxyEndpoint = url_1.parse(proxyURL);
		if (!/^https?:$/.test(proxyEndpoint.protocol)) {
			return null;
		}
		var opts = {
			host: proxyEndpoint.hostname,
			port: Number(proxyEndpoint.port),
			auth: proxyEndpoint.auth,
			rejectUnauthorized: (typeof options.strictSSL === 'boolean') ? options.strictSSL : true
		};
		return requestURL.protocol === 'http:' ? new HttpProxyAgent(opts) : new HttpsProxyAgent(opts);
	}
	//# sourceMappingURL=main.js.map

	/***/ }),
	/* 5 */
	/***/ (function(module, exports) {

	module.exports = require("url");

	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {

	module.exports = require("https");

	/***/ }),
	/* 7 */
	/***/ (function(module, exports) {

	module.exports = require("http");

	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Module dependencies.
	 */

	var net = __webpack_require__(9);
	var tls = __webpack_require__(10);
	var url = __webpack_require__(5);
	var Agent = __webpack_require__(11);
	var inherits = __webpack_require__(13).inherits;
	var debug = __webpack_require__(18)('http-proxy-agent');

	/**
	 * Module exports.
	 */

	module.exports = HttpProxyAgent;

	/**
	 * The `HttpProxyAgent` implements an HTTP Agent subclass that connects to the
	 * specified "HTTP proxy server" in order to proxy HTTP requests.
	 *
	 * @api public
	 */

	function HttpProxyAgent (opts) {
	  if (!(this instanceof HttpProxyAgent)) return new HttpProxyAgent(opts);
	  if ('string' == typeof opts) opts = url.parse(opts);
	  if (!opts) throw new Error('an HTTP(S) proxy server `host` and `port` must be specified!');
	  debug('creating new HttpProxyAgent instance: %o', opts);
	  Agent.call(this, opts);

	  var proxy = Object.assign({}, opts);

	  // if `true`, then connect to the proxy server over TLS. defaults to `false`.
	  this.secureProxy = proxy.protocol ? /^https:?$/i.test(proxy.protocol) : false;

	  // prefer `hostname` over `host`, and set the `port` if needed
	  proxy.host = proxy.hostname || proxy.host;
	  proxy.port = +proxy.port || (this.secureProxy ? 443 : 80);

	  if (proxy.host && proxy.path) {
		// if both a `host` and `path` are specified then it's most likely the
		// result of a `url.parse()` call... we need to remove the `path` portion so
		// that `net.connect()` doesn't attempt to open that as a unix socket file.
		delete proxy.path;
		delete proxy.pathname;
	  }

	  this.proxy = proxy;
	}
	inherits(HttpProxyAgent, Agent);

	/**
	 * Called when the node-core HTTP client library is creating a new HTTP request.
	 *
	 * @api public
	 */

	HttpProxyAgent.prototype.callback = function connect (req, opts, fn) {
	  var proxy = this.proxy;

	  // change the `http.ClientRequest` instance's "path" field
	  // to the absolute path of the URL that will be requested
	  var parsed = url.parse(req.path);
	  if (null == parsed.protocol) parsed.protocol = 'http:';
	  if (null == parsed.hostname) parsed.hostname = opts.hostname || opts.host;
	  if (null == parsed.port) parsed.port = opts.port;
	  if (parsed.port == 80) {
		// if port is 80, then we can remove the port so that the
		// ":80" portion is not on the produced URL
		delete parsed.port;
	  }
	  var absolute = url.format(parsed);
	  req.path = absolute;

	  // inject the `Proxy-Authorization` header if necessary
	  if (proxy.auth) {
		req.setHeader(
		  'Proxy-Authorization',
		  'Basic ' + Buffer.from(proxy.auth).toString('base64')
		);
	  }

	  // create a socket connection to the proxy server
	  var socket;
	  if (this.secureProxy) {
		socket = tls.connect(proxy);
	  } else {
		socket = net.connect(proxy);
	  }

	  // at this point, the http ClientRequest's internal `_header` field might have
	  // already been set. If this is the case then we'll need to re-generate the
	  // string since we just changed the `req.path`
	  if (req._header) {
		debug('regenerating stored HTTP header string for request');
		req._header = null;
		req._implicitHeader();
		if (req.output && req.output.length > 0) {
		  debug('patching connection write() output buffer with updated header');
		  // the _header has already been queued to be written to the socket
		  var first = req.output[0];
		  var endOfHeaders = first.indexOf('\r\n\r\n') + 4;
		  req.output[0] = req._header + first.substring(endOfHeaders);
		  debug('output buffer: %o', req.output);
		}
	  }

	  fn(null, socket);
	};


	/***/ }),
	/* 9 */
	/***/ (function(module, exports) {

	module.exports = require("net");

	/***/ }),
	/* 10 */
	/***/ (function(module, exports) {

	module.exports = require("tls");

	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(12);
	const inherits = __webpack_require__(13).inherits;
	const promisify = __webpack_require__(14);
	const EventEmitter = __webpack_require__(17).EventEmitter;

	module.exports = Agent;

	function isAgent(v) {
	  return v && typeof v.addRequest === 'function';
	}

	/**
	 * Base `http.Agent` implementation.
	 * No pooling/keep-alive is implemented by default.
	 *
	 * @param {Function} callback
	 * @api public
	 */
	function Agent(callback, _opts) {
	  if (!(this instanceof Agent)) {
		return new Agent(callback, _opts);
	  }

	  EventEmitter.call(this);

	  // The callback gets promisified if it has 3 parameters
	  // (i.e. it has a callback function) lazily
	  this._promisifiedCallback = false;

	  let opts = _opts;
	  if ('function' === typeof callback) {
		this.callback = callback;
	  } else if (callback) {
		opts = callback;
	  }

	  // timeout for the socket to be returned from the callback
	  this.timeout = (opts && opts.timeout) || null;

	  this.options = opts;
	}
	inherits(Agent, EventEmitter);

	/**
	 * Override this function in your subclass!
	 */
	Agent.prototype.callback = function callback(req, opts) {
	  throw new Error(
		'"agent-base" has no default implementation, you must subclass and override `callback()`'
	  );
	};

	/**
	 * Called by node-core's "_http_client.js" module when creating
	 * a new HTTP request with this Agent instance.
	 *
	 * @api public
	 */
	Agent.prototype.addRequest = function addRequest(req, _opts) {
	  const ownOpts = Object.assign({}, _opts);

	  // Set default `host` for HTTP to localhost
	  if (null == ownOpts.host) {
		ownOpts.host = 'localhost';
	  }

	  // Set default `port` for HTTP if none was explicitly specified
	  if (null == ownOpts.port) {
		ownOpts.port = ownOpts.secureEndpoint ? 443 : 80;
	  }

	  const opts = Object.assign({}, this.options, ownOpts);

	  if (opts.host && opts.path) {
		// If both a `host` and `path` are specified then it's most likely the
		// result of a `url.parse()` call... we need to remove the `path` portion so
		// that `net.connect()` doesn't attempt to open that as a unix socket file.
		delete opts.path;
	  }

	  delete opts.agent;
	  delete opts.hostname;
	  delete opts._defaultAgent;
	  delete opts.defaultPort;
	  delete opts.createConnection;

	  // Hint to use "Connection: close"
	  // XXX: non-documented `http` module API :(
	  req._last = true;
	  req.shouldKeepAlive = false;

	  // Create the `stream.Duplex` instance
	  let timeout;
	  let timedOut = false;
	  const timeoutMs = this.timeout;
	  const freeSocket = this.freeSocket;

	  function onerror(err) {
		if (req._hadError) return;
		req.emit('error', err);
		// For Safety. Some additional errors might fire later on
		// and we need to make sure we don't double-fire the error event.
		req._hadError = true;
	  }

	  function ontimeout() {
		timeout = null;
		timedOut = true;
		const err = new Error(
		  'A "socket" was not created for HTTP request before ' + timeoutMs + 'ms'
		);
		err.code = 'ETIMEOUT';
		onerror(err);
	  }

	  function callbackError(err) {
		if (timedOut) return;
		if (timeout != null) {
		  clearTimeout(timeout);
		  timeout = null;
		}
		onerror(err);
	  }

	  function onsocket(socket) {
		if (timedOut) return;
		if (timeout != null) {
		  clearTimeout(timeout);
		  timeout = null;
		}
		if (isAgent(socket)) {
		  // `socket` is actually an http.Agent instance, so relinquish
		  // responsibility for this `req` to the Agent from here on
		  socket.addRequest(req, opts);
		} else if (socket) {
		  function onfree() {
			freeSocket(socket, opts);
		  }
		  socket.on('free', onfree);
		  req.onSocket(socket);
		} else {
		  const err = new Error(
			'no Duplex stream was returned to agent-base for `' + req.method + ' ' + req.path + '`'
		  );
		  onerror(err);
		}
	  }

	  if (!this._promisifiedCallback && this.callback.length >= 3) {
		// Legacy callback function - convert to a Promise
		this.callback = promisify(this.callback, this);
		this._promisifiedCallback = true;
	  }

	  if (timeoutMs > 0) {
		timeout = setTimeout(ontimeout, timeoutMs);
	  }

	  try {
		Promise.resolve(this.callback(req, opts)).then(onsocket, callbackError);
	  } catch (err) {
		Promise.reject(err).catch(callbackError);
	  }
	};

	Agent.prototype.freeSocket = function freeSocket(socket, opts) {
	  // TODO reuse sockets
	  socket.destroy();
	};


	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	const url = __webpack_require__(5);
	const https = __webpack_require__(6);

	/**
	 * This currently needs to be applied to all Node.js versions
	 * in order to determine if the `req` is an HTTP or HTTPS request.
	 *
	 * There is currently no PR attempting to move this property upstream.
	 */
	https.request = (function(request) {
	  return function(_options, cb) {
		let options;
		if (typeof _options === 'string') {
		  options = url.parse(_options);
		} else {
		  options = Object.assign({}, _options);
		}
		if (null == options.port) {
		  options.port = 443;
		}
		options.secureEndpoint = true;
		return request.call(https, options, cb);
	  };
	})(https.request);

	/**
	 * This is needed for Node.js >= 9.0.0 to make sure `https.get()` uses the
	 * patched `https.request()`.
	 *
	 * Ref: https://github.com/nodejs/node/commit/5118f31
	 */
	https.get = function(options, cb) {
	  const req = https.request(options, cb);
	  req.end();
	  return req;
	};


	/***/ }),
	/* 13 */
	/***/ (function(module, exports) {

	module.exports = require("util");

	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/* global module, require */
	module.exports = function () {

		"use strict";

		// Get a promise object. This may be native, or it may be polyfilled

		var ES6Promise = __webpack_require__(15);

		/**
		 * thatLooksLikeAPromiseToMe()
		 *
		 * Duck-types a promise.
		 *
		 * @param {object} o
		 * @return {bool} True if this resembles a promise
		 */
		function thatLooksLikeAPromiseToMe(o) {
			return o && typeof o.then === "function" && typeof o.catch === "function";
		}

		/**
		 * promisify()
		 *
		 * Transforms callback-based function -- func(arg1, arg2 .. argN, callback) -- into
		 * an ES6-compatible Promise. Promisify provides a default callback of the form (error, result)
		 * and rejects when `error` is truthy. You can also supply settings object as the second argument.
		 *
		 * @param {function} original - The function to promisify
		 * @param {object} settings - Settings object
		 * @param {object} settings.thisArg - A `this` context to use. If not set, assume `settings` _is_ `thisArg`
		 * @param {bool} settings.multiArgs - Should multiple arguments be returned as an array?
		 * @return {function} A promisified version of `original`
		 */
		return function promisify(original, settings) {

			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var returnMultipleArguments = settings && settings.multiArgs;

				var target = void 0;
				if (settings && settings.thisArg) {
					target = settings.thisArg;
				} else if (settings) {
					target = settings;
				}

				// Return the promisified function
				return new ES6Promise(function (resolve, reject) {

					// Append the callback bound to the context
					args.push(function callback(err) {

						if (err) {
							return reject(err);
						}

						for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
							values[_key2 - 1] = arguments[_key2];
						}

						if (false === !!returnMultipleArguments) {
							return resolve(values[0]);
						}

						resolve(values);
					});

					// Call the function
					var response = original.apply(target, args);

					// If it looks like original already returns a promise,
					// then just resolve with that promise. Hopefully, the callback function we added will just be ignored.
					if (thatLooksLikeAPromiseToMe(response)) {
						resolve(response);
					}
				});
			};
		};
	}();

	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/* global self, window, module, global, require */
	module.exports = function () {

		"use strict";

		var globalObject = void 0;

		function isFunction(x) {
			return typeof x === "function";
		}

		// Seek the global object
		if (global !== undefined) {
			globalObject = global;
		} else if (window !== undefined && window.document) {
			globalObject = window;
		} else {
			globalObject = self;
		}

		// Test for any native promise implementation, and if that
		// implementation appears to conform to the specificaton.
		// This code mostly nicked from the es6-promise module polyfill
		// and then fooled with.
		var hasPromiseSupport = function () {

			// No promise object at all, and it's a non-starter
			if (!globalObject.hasOwnProperty("Promise")) {
				return false;
			}

			// There is a Promise object. Does it conform to the spec?
			var P = globalObject.Promise;

			// Some of these methods are missing from
			// Firefox/Chrome experimental implementations
			if (!P.hasOwnProperty("resolve") || !P.hasOwnProperty("reject")) {
				return false;
			}

			if (!P.hasOwnProperty("all") || !P.hasOwnProperty("race")) {
				return false;
			}

			// Older version of the spec had a resolver object
			// as the arg rather than a function
			return function () {

				var resolve = void 0;

				var p = new globalObject.Promise(function (r) {
					resolve = r;
				});

				if (p) {
					return isFunction(resolve);
				}

				return false;
			}();
		}();

		// Export the native Promise implementation if it
		// looks like it matches the spec
		if (hasPromiseSupport) {
			return globalObject.Promise;
		}

		//  Otherwise, return the es6-promise polyfill by @jaffathecake.
		return __webpack_require__(16).Promise;
	}();

	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   v4.2.6+9869a4bc
	 */

	(function (global, factory) {
		 true ? module.exports = factory() :
		undefined;
	}(this, (function () { 'use strict';

	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}



	var _isArray = void 0;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
		return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = void 0;
	var customSchedulerFn = void 0;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
		// If len is 2, that means that we need to schedule an async flush.
		// If additional callbacks are queued before the queue is flushed, they
		// will be processed by this flush that we are scheduling.
		if (customSchedulerFn) {
		  customSchedulerFn(flush);
		} else {
		  scheduleFlush();
		}
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
		return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
		return function () {
		  vertxNext(flush);
		};
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
		node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
		return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
		return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
		var callback = queue[i];
		var arg = queue[i + 1];

		callback(arg);

		queue[i] = undefined;
		queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
		var vertx = Function('return this')().require('vertx');
		vertxNext = vertx.runOnLoop || vertx.runOnContext;
		return useVertxTimer();
	  } catch (e) {
		return useSetTimeout();
	  }
	}

	var scheduleFlush = void 0;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
		makePromise(child);
	  }

	  var _state = parent._state;


	  if (_state) {
		var callback = arguments[_state - 1];
		asap(function () {
		  return invokeCallback(_state, child, callback, parent._result);
		});
	  } else {
		subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
		resolve(1);
	  });

	  promise.then(function(value){
		// value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
		// value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
		return object;
	  }

	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(2);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var TRY_CATCH_ERROR = { error: null };

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
		return promise.then;
	  } catch (error) {
		TRY_CATCH_ERROR.error = error;
		return TRY_CATCH_ERROR;
	  }
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
		then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
		return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
		var sealed = false;
		var error = tryThen(then$$1, thenable, function (value) {
		  if (sealed) {
			return;
		  }
		  sealed = true;
		  if (thenable !== value) {
			resolve(promise, value);
		  } else {
			fulfill(promise, value);
		  }
		}, function (reason) {
		  if (sealed) {
			return;
		  }
		  sealed = true;

		  reject(promise, reason);
		}, 'Settle: ' + (promise._label || ' unknown promise'));

		if (!sealed && error) {
		  sealed = true;
		  reject(promise, error);
		}
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
		fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
		reject(promise, thenable._result);
	  } else {
		subscribe(thenable, undefined, function (value) {
		  return resolve(promise, value);
		}, function (reason) {
		  return reject(promise, reason);
		});
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
		handleOwnThenable(promise, maybeThenable);
	  } else {
		if (then$$1 === TRY_CATCH_ERROR) {
		  reject(promise, TRY_CATCH_ERROR.error);
		  TRY_CATCH_ERROR.error = null;
		} else if (then$$1 === undefined) {
		  fulfill(promise, maybeThenable);
		} else if (isFunction(then$$1)) {
		  handleForeignThenable(promise, maybeThenable, then$$1);
		} else {
		  fulfill(promise, maybeThenable);
		}
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
		reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
		handleMaybeThenable(promise, value, getThen(value));
	  } else {
		fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
		promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
		return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
		asap(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
		return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;


	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
		asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
		return;
	  }

	  var child = void 0,
		  callback = void 0,
		  detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
		child = subscribers[i];
		callback = subscribers[i + settled];

		if (child) {
		  invokeCallback(settled, child, callback, detail);
		} else {
		  callback(detail);
		}
	  }

	  promise._subscribers.length = 0;
	}

	function tryCatch(callback, detail) {
	  try {
		return callback(detail);
	  } catch (e) {
		TRY_CATCH_ERROR.error = e;
		return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
		  value = void 0,
		  error = void 0,
		  succeeded = void 0,
		  failed = void 0;

	  if (hasCallback) {
		value = tryCatch(callback, detail);

		if (value === TRY_CATCH_ERROR) {
		  failed = true;
		  error = value.error;
		  value.error = null;
		} else {
		  succeeded = true;
		}

		if (promise === value) {
		  reject(promise, cannotReturnOwn());
		  return;
		}
	  } else {
		value = detail;
		succeeded = true;
	  }

	  if (promise._state !== PENDING) {
		// noop
	  } else if (hasCallback && succeeded) {
		resolve(promise, value);
	  } else if (failed) {
		reject(promise, error);
	  } else if (settled === FULFILLED) {
		fulfill(promise, value);
	  } else if (settled === REJECTED) {
		reject(promise, value);
	  }
	}

	function initializePromise(promise, resolver) {
	  try {
		resolver(function resolvePromise(value) {
		  resolve(promise, value);
		}, function rejectPromise(reason) {
		  reject(promise, reason);
		});
	  } catch (e) {
		reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	var Enumerator = function () {
	  function Enumerator(Constructor, input) {
		this._instanceConstructor = Constructor;
		this.promise = new Constructor(noop);

		if (!this.promise[PROMISE_ID]) {
		  makePromise(this.promise);
		}

		if (isArray(input)) {
		  this.length = input.length;
		  this._remaining = input.length;

		  this._result = new Array(this.length);

		  if (this.length === 0) {
			fulfill(this.promise, this._result);
		  } else {
			this.length = this.length || 0;
			this._enumerate(input);
			if (this._remaining === 0) {
			  fulfill(this.promise, this._result);
			}
		  }
		} else {
		  reject(this.promise, validationError());
		}
	  }

	  Enumerator.prototype._enumerate = function _enumerate(input) {
		for (var i = 0; this._state === PENDING && i < input.length; i++) {
		  this._eachEntry(input[i], i);
		}
	  };

	  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
		var c = this._instanceConstructor;
		var resolve$$1 = c.resolve;


		if (resolve$$1 === resolve$1) {
		  var _then = getThen(entry);

		  if (_then === then && entry._state !== PENDING) {
			this._settledAt(entry._state, i, entry._result);
		  } else if (typeof _then !== 'function') {
			this._remaining--;
			this._result[i] = entry;
		  } else if (c === Promise$1) {
			var promise = new c(noop);
			handleMaybeThenable(promise, entry, _then);
			this._willSettleAt(promise, i);
		  } else {
			this._willSettleAt(new c(function (resolve$$1) {
			  return resolve$$1(entry);
			}), i);
		  }
		} else {
		  this._willSettleAt(resolve$$1(entry), i);
		}
	  };

	  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
		var promise = this.promise;


		if (promise._state === PENDING) {
		  this._remaining--;

		  if (state === REJECTED) {
			reject(promise, value);
		  } else {
			this._result[i] = value;
		  }
		}

		if (this._remaining === 0) {
		  fulfill(promise, this._result);
		}
	  };

	  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
		var enumerator = this;

		subscribe(promise, undefined, function (value) {
		  return enumerator._settledAt(FULFILLED, i, value);
		}, function (reason) {
		  return enumerator._settledAt(REJECTED, i, reason);
		});
	  };

	  return Enumerator;
	}();

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
		// The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
		// Code here never runs because there are rejected promises!
	  }, function(error) {
		// error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
		setTimeout(function(){
		  resolve('promise 1');
		}, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
		setTimeout(function(){
		  resolve('promise 2');
		}, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
		// result === 'promise 2' because it was resolved before promise1
		// was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
		setTimeout(function(){
		  resolve('promise 1');
		}, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
		setTimeout(function(){
		  reject(new Error('promise 2'));
		}, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
		// Code here never runs
	  }, function(reason){
		// reason.message === 'promise 2' because promise 2 became rejected before
		// promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
		return new Constructor(function (_, reject) {
		  return reject(new TypeError('You must pass an array to race.'));
		});
	  } else {
		return new Constructor(function (resolve, reject) {
		  var length = entries.length;
		  for (var i = 0; i < length; i++) {
			Constructor.resolve(entries[i]).then(resolve, reject);
		  }
		});
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
		reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
		// Code here doesn't run because the promise is rejected!
	  }, function(reason){
		// reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
		// Code here doesn't run because the promise is rejected!
	  }, function(reason){
		// reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
		// on success
		resolve(value);

		// on failure
		reject(reason);
	  });

	  promise.then(function(value) {
		// on fulfillment
	  }, function(reason) {
		// on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
		return new Promise(function(resolve, reject){
		  let xhr = new XMLHttpRequest();

		  xhr.open('GET', url);
		  xhr.onreadystatechange = handler;
		  xhr.responseType = 'json';
		  xhr.setRequestHeader('Accept', 'application/json');
		  xhr.send();

		  function handler() {
			if (this.readyState === this.DONE) {
			  if (this.status === 200) {
				resolve(this.response);
			  } else {
				reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
			  }
			}
		  };
		});
	  }

	  getJSON('/posts.json').then(function(json) {
		// on fulfillment
	  }, function(reason) {
		// on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
		getJSON('/posts'),
		getJSON('/comments')
	  ]).then(function(values){
		values[0] // => postsJSON
		values[1] // => commentsJSON

		return values;
	  });
	  ```

	  @class Promise
	  @param {Function} resolver
	  Useful for tooling.
	  @constructor
	*/

	var Promise$1 = function () {
	  function Promise(resolver) {
		this[PROMISE_ID] = nextId();
		this._result = this._state = undefined;
		this._subscribers = [];

		if (noop !== resolver) {
		  typeof resolver !== 'function' && needsResolver();
		  this instanceof Promise ? initializePromise(this, resolver) : needsNew();
		}
	  }

	  /**
	  The primary way of interacting with a promise is through its `then` method,
	  which registers callbacks to receive either a promise's eventual value or the
	  reason why the promise cannot be fulfilled.
	   ```js
	  findUser().then(function(user){
		// user is available
	  }, function(reason){
		// user is unavailable, and you are given the reason why
	  });
	  ```
	   Chaining
	  --------
	   The return value of `then` is itself a promise.  This second, 'downstream'
	  promise is resolved with the return value of the first promise's fulfillment
	  or rejection handler, or rejected if the handler throws an exception.
	   ```js
	  findUser().then(function (user) {
		return user.name;
	  }, function (reason) {
		return 'default name';
	  }).then(function (userName) {
		// If `findUser` fulfilled, `userName` will be the user's name, otherwise it
		// will be `'default name'`
	  });
	   findUser().then(function (user) {
		throw new Error('Found user, but still unhappy');
	  }, function (reason) {
		throw new Error('`findUser` rejected and we're unhappy');
	  }).then(function (value) {
		// never reached
	  }, function (reason) {
		// if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
		// If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	  });
	  ```
	  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	   ```js
	  findUser().then(function (user) {
		throw new PedagogicalException('Upstream error');
	  }).then(function (value) {
		// never reached
	  }).then(function (value) {
		// never reached
	  }, function (reason) {
		// The `PedgagocialException` is propagated all the way down to here
	  });
	  ```
	   Assimilation
	  ------------
	   Sometimes the value you want to propagate to a downstream promise can only be
	  retrieved asynchronously. This can be achieved by returning a promise in the
	  fulfillment or rejection handler. The downstream promise will then be pending
	  until the returned promise is settled. This is called *assimilation*.
	   ```js
	  findUser().then(function (user) {
		return findCommentsByAuthor(user);
	  }).then(function (comments) {
		// The user's comments are now available
	  });
	  ```
	   If the assimliated promise rejects, then the downstream promise will also reject.
	   ```js
	  findUser().then(function (user) {
		return findCommentsByAuthor(user);
	  }).then(function (comments) {
		// If `findCommentsByAuthor` fulfills, we'll have the value here
	  }, function (reason) {
		// If `findCommentsByAuthor` rejects, we'll have the reason here
	  });
	  ```
	   Simple Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let result;
	   try {
		result = findResult();
		// success
	  } catch(reason) {
		// failure
	  }
	  ```
	   Errback Example
	   ```js
	  findResult(function(result, err){
		if (err) {
		  // failure
		} else {
		  // success
		}
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findResult().then(function(result){
		// success
	  }, function(reason){
		// failure
	  });
	  ```
	   Advanced Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let author, books;
	   try {
		author = findAuthor();
		books  = findBooksByAuthor(author);
		// success
	  } catch(reason) {
		// failure
	  }
	  ```
	   Errback Example
	   ```js
	   function foundBooks(books) {
	   }
	   function failure(reason) {
	   }
	   findAuthor(function(author, err){
		if (err) {
		  failure(err);
		  // failure
		} else {
		  try {
			findBoooksByAuthor(author, function(books, err) {
			  if (err) {
				failure(err);
			  } else {
				try {
				  foundBooks(books);
				} catch(reason) {
				  failure(reason);
				}
			  }
			});
		  } catch(error) {
			failure(err);
		  }
		  // success
		}
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findAuthor().
		then(findBooksByAuthor).
		then(function(books){
		  // found books
	  }).catch(function(reason){
		// something went wrong
	  });
	  ```
	   @method then
	  @param {Function} onFulfilled
	  @param {Function} onRejected
	  Useful for tooling.
	  @return {Promise}
	  */

	  /**
	  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	  as the catch block of a try/catch statement.
	  ```js
	  function findAuthor(){
	  throw new Error('couldn't find that author');
	  }
	  // synchronous
	  try {
	  findAuthor();
	  } catch(reason) {
	  // something went wrong
	  }
	  // async with promises
	  findAuthor().catch(function(reason){
	  // something went wrong
	  });
	  ```
	  @method catch
	  @param {Function} onRejection
	  Useful for tooling.
	  @return {Promise}
	  */


	  Promise.prototype.catch = function _catch(onRejection) {
		return this.then(null, onRejection);
	  };

	  /**
		`finally` will be invoked regardless of the promise's fate just as native
		try/catch/finally behaves

		Synchronous example:

		```js
		findAuthor() {
		  if (Math.random() > 0.5) {
			throw new Error();
		  }
		  return new Author();
		}

		try {
		  return findAuthor(); // succeed or fail
		} catch(error) {
		  return findOtherAuther();
		} finally {
		  // always runs
		  // doesn't affect the return value
		}
		```

		Asynchronous example:

		```js
		findAuthor().catch(function(reason){
		  return findOtherAuther();
		}).finally(function(){
		  // author was either found, or not
		});
		```

		@method finally
		@param {Function} callback
		@return {Promise}
	  */


	  Promise.prototype.finally = function _finally(callback) {
		var promise = this;
		var constructor = promise.constructor;

		if (isFunction(callback)) {
		  return promise.then(function (value) {
			return constructor.resolve(callback()).then(function () {
			  return value;
			});
		  }, function (reason) {
			return constructor.resolve(callback()).then(function () {
			  throw reason;
			});
		  });
		}

		return promise.then(callback, callback);
	  };

	  return Promise;
	}();

	Promise$1.prototype.then = then;
	Promise$1.all = all;
	Promise$1.race = race;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;
	Promise$1._setScheduler = setScheduler;
	Promise$1._setAsap = setAsap;
	Promise$1._asap = asap;

	/*global self*/
	function polyfill() {
	  var local = void 0;

	  if (typeof global !== 'undefined') {
		local = global;
	  } else if (typeof self !== 'undefined') {
		local = self;
	  } else {
		try {
		  local = Function('return this')();
		} catch (e) {
		  throw new Error('polyfill failed because global object is unavailable in this environment');
		}
	  }

	  var P = local.Promise;

	  if (P) {
		var promiseToString = null;
		try {
		  promiseToString = Object.prototype.toString.call(P.resolve());
		} catch (e) {
		  // silently ignored
		}

		if (promiseToString === '[object Promise]' && !P.cast) {
		  return;
		}
	  }

	  local.Promise = Promise$1;
	}

	// Strange compat..
	Promise$1.polyfill = polyfill;
	Promise$1.Promise = Promise$1;

	return Promise$1;

	})));



	//# sourceMappingURL=es6-promise.map


	/***/ }),
	/* 17 */
	/***/ (function(module, exports) {

	module.exports = require("events");

	/***/ }),
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Detect Electron renderer process, which is node, but we should
	 * treat as a browser.
	 */

	if (typeof process === 'undefined' || process.type === 'renderer') {
	  module.exports = __webpack_require__(19);
	} else {
	  module.exports = __webpack_require__(22);
	}


	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(20);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
				   && 'undefined' != typeof chrome.storage
					  ? chrome.storage.local
					  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
	  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
	  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
	  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
	  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
	  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
	  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
	  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
	  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
	  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
	  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
		return true;
	  }

	  // Internet Explorer and Edge do not support colors.
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
		return JSON.stringify(v);
	  } catch (err) {
		return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
		+ this.namespace
		+ (useColors ? ' %c' : ' ')
		+ args[0]
		+ (useColors ? '%c ' : ' ')
		+ '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
		if ('%%' === match) return;
		index++;
		if ('%c' === match) {
		  // we only are interested in the *last* %c
		  // (the user may have provided their own)
		  lastC = index;
		}
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
		&& console.log
		&& Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
		if (null == namespaces) {
		  exports.storage.removeItem('debug');
		} else {
		  exports.storage.debug = namespaces;
		}
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
		r = exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
		return window.localStorage;
	  } catch (e) {}
	}


	/***/ }),
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(21);

	/**
	 * Active `debug` instances.
	 */
	exports.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
		hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  var prevTime;

	  function debug() {
		// disabled?
		if (!debug.enabled) return;

		var self = debug;

		// set `diff` timestamp
		var curr = +new Date();
		var ms = curr - (prevTime || curr);
		self.diff = ms;
		self.prev = prevTime;
		self.curr = curr;
		prevTime = curr;

		// turn the `arguments` into a proper Array
		var args = new Array(arguments.length);
		for (var i = 0; i < args.length; i++) {
		  args[i] = arguments[i];
		}

		args[0] = exports.coerce(args[0]);

		if ('string' !== typeof args[0]) {
		  // anything else let's inspect with %O
		  args.unshift('%O');
		}

		// apply any `formatters` transformations
		var index = 0;
		args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
		  // if we encounter an escaped % then don't increase the array index
		  if (match === '%%') return match;
		  index++;
		  var formatter = exports.formatters[format];
		  if ('function' === typeof formatter) {
			var val = args[index];
			match = formatter.call(self, val);

			// now we need to remove `args[index]` since it's inlined in the `format`
			args.splice(index, 1);
			index--;
		  }
		  return match;
		});

		// apply env-specific formatting (colors, etc.)
		exports.formatArgs.call(self, args);

		var logFn = debug.log || exports.log || console.log.bind(console);
		logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	  debug.destroy = destroy;

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
		exports.init(debug);
	  }

	  exports.instances.push(debug);

	  return debug;
	}

	function destroy () {
	  var index = exports.instances.indexOf(this);
	  if (index !== -1) {
		exports.instances.splice(index, 1);
		return true;
	  } else {
		return false;
	  }
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var i;
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (i = 0; i < len; i++) {
		if (!split[i]) continue; // ignore empty strings
		namespaces = split[i].replace(/\*/g, '.*?');
		if (namespaces[0] === '-') {
		  exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
		} else {
		  exports.names.push(new RegExp('^' + namespaces + '$'));
		}
	  }

	  for (i = 0; i < exports.instances.length; i++) {
		var instance = exports.instances[i];
		instance.enabled = exports.enabled(instance.namespace);
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  if (name[name.length - 1] === '*') {
		return true;
	  }
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
		if (exports.skips[i].test(name)) {
		  return false;
		}
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
		if (exports.names[i].test(name)) {
		  return true;
		}
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


	/***/ }),
	/* 21 */
	/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
		return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
		return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
		'val is not a non-empty string or a valid number. val=' +
		  JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
		return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
		str
	  );
	  if (!match) {
		return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
		  return n * y;
		case 'days':
		case 'day':
		case 'd':
		  return n * d;
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
		  return n * h;
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
		  return n * m;
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
		  return n * s;
		case 'milliseconds':
		case 'millisecond':
		case 'msecs':
		case 'msec':
		case 'ms':
		  return n;
		default:
		  return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
		return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
		return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
		return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
		return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
		plural(ms, h, 'hour') ||
		plural(ms, m, 'minute') ||
		plural(ms, s, 'second') ||
		ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
		return;
	  }
	  if (ms < n * 1.5) {
		return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


	/***/ }),
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(23);
	var util = __webpack_require__(13);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(20);
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [ 6, 2, 3, 4, 5, 1 ];

	try {
	  var supportsColor = __webpack_require__(24);
	  if (supportsColor && supportsColor.level >= 2) {
		exports.colors = [
		  20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
		  69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
		  135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
		  172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
		  205, 206, 207, 208, 209, 214, 215, 220, 221
		];
	  }
	} catch (err) {
	  // swallow - we only care if `supports-color` is available; it doesn't have to be.
	}

	/**
	 * Build up the default `inspectOpts` object from the environment variables.
	 *
	 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	 */

	exports.inspectOpts = Object.keys(process.env).filter(function (key) {
	  return /^debug_/i.test(key);
	}).reduce(function (obj, key) {
	  // camel-case
	  var prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

	  // coerce string value into JS value
	  var val = process.env[key];
	  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
	  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
	  else if (val === 'null') val = null;
	  else val = Number(val);

	  obj[prop] = val;
	  return obj;
	}, {});

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  return 'colors' in exports.inspectOpts
		? Boolean(exports.inspectOpts.colors)
		: tty.isatty(process.stderr.fd);
	}

	/**
	 * Map %o to `util.inspect()`, all on a single line.
	 */

	exports.formatters.o = function(v) {
	  this.inspectOpts.colors = this.useColors;
	  return util.inspect(v, this.inspectOpts)
		.split('\n').map(function(str) {
		  return str.trim()
		}).join(' ');
	};

	/**
	 * Map %o to `util.inspect()`, allowing multiple lines if needed.
	 */

	exports.formatters.O = function(v) {
	  this.inspectOpts.colors = this.useColors;
	  return util.inspect(v, this.inspectOpts);
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var name = this.namespace;
	  var useColors = this.useColors;

	  if (useColors) {
		var c = this.color;
		var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
		var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
	  } else {
		args[0] = getDate() + name + ' ' + args[0];
	  }
	}

	function getDate() {
	  if (exports.inspectOpts.hideDate) {
		return '';
	  } else {
		return new Date().toISOString() + ' ';
	  }
	}

	/**
	 * Invokes `util.format()` with the specified arguments and writes to stderr.
	 */

	function log() {
	  return process.stderr.write(util.format.apply(util, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	  } else {
		process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Init logic for `debug` instances.
	 *
	 * Create a new `inspectOpts` object in case `useColors` is set
	 * differently for a particular `debug` instance.
	 */

	function init (debug) {
	  debug.inspectOpts = {};

	  var keys = Object.keys(exports.inspectOpts);
	  for (var i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	  }
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());


	/***/ }),
	/* 23 */
	/***/ (function(module, exports) {

	module.exports = require("tty");

	/***/ }),
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var hasFlag = __webpack_require__(25);

	var support = function (level) {
		if (level === 0) {
			return false;
		}

		return {
			level: level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	};

	var supportLevel = (function () {
		if (hasFlag('no-color') ||
			hasFlag('no-colors') ||
			hasFlag('color=false')) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (hasFlag('color') ||
			hasFlag('colors') ||
			hasFlag('color=true') ||
			hasFlag('color=always')) {
			return 1;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return 0;
		}

		if (process.platform === 'win32') {
			return 1;
		}

		if ('CI' in process.env) {
			if ('TRAVIS' in process.env || process.env.CI === 'Travis') {
				return 1;
			}

			return 0;
		}

		if ('TEAMCITY_VERSION' in process.env) {
			return process.env.TEAMCITY_VERSION.match(/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/) === null ? 0 : 1;
		}

		if (/^(screen|xterm)-256(?:color)?/.test(process.env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in process.env) {
			return 1;
		}

		if (process.env.TERM === 'dumb') {
			return 0;
		}

		return 0;
	})();

	if (supportLevel === 0 && 'FORCE_COLOR' in process.env) {
		supportLevel = 1;
	}

	module.exports = process && support(supportLevel);


	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (flag, argv) {
		argv = argv || process.argv;

		var terminatorPos = argv.indexOf('--');
		var prefix = /^--/.test(flag) ? '' : '--';
		var pos = argv.indexOf(prefix + flag);

		return pos !== -1 && (terminatorPos !== -1 ? pos < terminatorPos : true);
	};


	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var net = __webpack_require__(9);
	var tls = __webpack_require__(10);
	var url = __webpack_require__(5);
	var Agent = __webpack_require__(11);
	var inherits = __webpack_require__(13).inherits;
	var debug = __webpack_require__(27)('https-proxy-agent');

	/**
	 * Module exports.
	 */

	module.exports = HttpsProxyAgent;

	/**
	 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to the
	 * specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
	 *
	 * @api public
	 */

	function HttpsProxyAgent(opts) {
	  if (!(this instanceof HttpsProxyAgent)) return new HttpsProxyAgent(opts);
	  if ('string' == typeof opts) opts = url.parse(opts);
	  if (!opts)
		throw new Error(
		  'an HTTP(S) proxy server `host` and `port` must be specified!'
		);
	  debug('creating new HttpsProxyAgent instance: %o', opts);
	  Agent.call(this, opts);

	  var proxy = Object.assign({}, opts);

	  // if `true`, then connect to the proxy server over TLS. defaults to `false`.
	  this.secureProxy = proxy.protocol ? /^https:?$/i.test(proxy.protocol) : false;

	  // prefer `hostname` over `host`, and set the `port` if needed
	  proxy.host = proxy.hostname || proxy.host;
	  proxy.port = +proxy.port || (this.secureProxy ? 443 : 80);

	  // ALPN is supported by Node.js >= v5.
	  // attempt to negotiate http/1.1 for proxy servers that support http/2
	  if (this.secureProxy && !('ALPNProtocols' in proxy)) {
		proxy.ALPNProtocols = ['http 1.1']
	  }

	  if (proxy.host && proxy.path) {
		// if both a `host` and `path` are specified then it's most likely the
		// result of a `url.parse()` call... we need to remove the `path` portion so
		// that `net.connect()` doesn't attempt to open that as a unix socket file.
		delete proxy.path;
		delete proxy.pathname;
	  }

	  this.proxy = proxy;
	  this.defaultPort = 443;
	}
	inherits(HttpsProxyAgent, Agent);

	/**
	 * Called when the node-core HTTP client library is creating a new HTTP request.
	 *
	 * @api public
	 */

	HttpsProxyAgent.prototype.callback = function connect(req, opts, fn) {
	  var proxy = this.proxy;

	  // create a socket connection to the proxy server
	  var socket;
	  if (this.secureProxy) {
		socket = tls.connect(proxy);
	  } else {
		socket = net.connect(proxy);
	  }

	  // we need to buffer any HTTP traffic that happens with the proxy before we get
	  // the CONNECT response, so that if the response is anything other than an "200"
	  // response code, then we can re-play the "data" events on the socket once the
	  // HTTP parser is hooked up...
	  var buffers = [];
	  var buffersLength = 0;

	  function read() {
		var b = socket.read();
		if (b) ondata(b);
		else socket.once('readable', read);
	  }

	  function cleanup() {
		socket.removeListener('data', ondata);
		socket.removeListener('end', onend);
		socket.removeListener('error', onerror);
		socket.removeListener('close', onclose);
		socket.removeListener('readable', read);
	  }

	  function onclose(err) {
		debug('onclose had error %o', err);
	  }

	  function onend() {
		debug('onend');
	  }

	  function onerror(err) {
		cleanup();
		fn(err);
	  }

	  function ondata(b) {
		buffers.push(b);
		buffersLength += b.length;
		var buffered = Buffer.concat(buffers, buffersLength);
		var str = buffered.toString('ascii');

		if (!~str.indexOf('\r\n\r\n')) {
		  // keep buffering
		  debug('have not received end of HTTP headers yet...');
		  if (socket.read) {
			read();
		  } else {
			socket.once('data', ondata);
		  }
		  return;
		}

		var firstLine = str.substring(0, str.indexOf('\r\n'));
		var statusCode = +firstLine.split(' ')[1];
		debug('got proxy server response: %o', firstLine);

		if (200 == statusCode) {
		  // 200 Connected status code!
		  var sock = socket;

		  // nullify the buffered data since we won't be needing it
		  buffers = buffered = null;

		  if (opts.secureEndpoint) {
			// since the proxy is connecting to an SSL server, we have
			// to upgrade this socket connection to an SSL connection
			debug(
			  'upgrading proxy-connected socket to TLS connection: %o',
			  opts.host
			);
			opts.socket = socket;
			opts.servername = opts.servername || opts.host;
			opts.host = null;
			opts.hostname = null;
			opts.port = null;
			sock = tls.connect(opts);
		  }

		  cleanup();
		  fn(null, sock);
		} else {
		  // some other status code that's not 200... need to re-play the HTTP header
		  // "data" events onto the socket once the HTTP machinery is attached so that
		  // the user can parse and handle the error status code
		  cleanup();

		  // save a reference to the concat'd Buffer for the `onsocket` callback
		  buffers = buffered;

		  // need to wait for the "socket" event to re-play the "data" events
		  req.once('socket', onsocket);
		  fn(null, socket);
		}
	  }

	  function onsocket(socket) {
		// replay the "buffers" Buffer onto the `socket`, since at this point
		// the HTTP module machinery has been hooked up for the user
		if ('function' == typeof socket.ondata) {
		  // node <= v0.11.3, the `ondata` function is set on the socket
		  socket.ondata(buffers, 0, buffers.length);
		} else if (socket.listeners('data').length > 0) {
		  // node > v0.11.3, the "data" event is listened for directly
		  socket.emit('data', buffers);
		} else {
		  // never?
		  throw new Error('should not happen...');
		}

		// nullify the cached Buffer instance
		buffers = null;
	  }

	  socket.on('error', onerror);
	  socket.on('close', onclose);
	  socket.on('end', onend);

	  if (socket.read) {
		read();
	  } else {
		socket.once('data', ondata);
	  }

	  var hostname = opts.host + ':' + opts.port;
	  var msg = 'CONNECT ' + hostname + ' HTTP/1.1\r\n';

	  var headers = Object.assign({}, proxy.headers);
	  if (proxy.auth) {
		headers['Proxy-Authorization'] =
		  'Basic ' + Buffer.from(proxy.auth).toString('base64');
	  }

	  // the Host header should only include the port
	  // number when it is a non-standard port
	  var host = opts.host;
	  if (!isDefaultPort(opts.port, opts.secureEndpoint)) {
		host += ':' + opts.port;
	  }
	  headers['Host'] = host;

	  headers['Connection'] = 'close';
	  Object.keys(headers).forEach(function(name) {
		msg += name + ': ' + headers[name] + '\r\n';
	  });

	  socket.write(msg + '\r\n');
	};

	function isDefaultPort(port, secure) {
	  return Boolean((!secure && port === 80) || (secure && port === 443));
	}


	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/**
	 * Detect Electron renderer / nwjs process, which is node, but we should
	 * treat as a browser.
	 */
	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	  module.exports = __webpack_require__(28);
	} else {
	  module.exports = __webpack_require__(31);
	}



	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/* eslint-env browser */

	/**
	 * This is the web browser implementation of `debug()`.
	 */
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	/**
	 * Colors.
	 */

	exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	// eslint-disable-next-line complexity

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	  } // Internet Explorer and Edge do not support colors.


	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	  } // Is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */


	function formatArgs(args) {
	  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

	  if (!this.useColors) {
		return;
	  }

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into

	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
		if (match === '%%') {
		  return;
		}

		index++;

		if (match === '%c') {
		  // We only are interested in the *last* %c
		  // (the user may have provided their own)
		  lastC = index;
		}
	  });
	  args.splice(lastC, 0, c);
	}
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */


	function log() {
	  var _console;

	  // This hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
	}
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */


	function save(namespaces) {
	  try {
		if (namespaces) {
		  exports.storage.setItem('debug', namespaces);
		} else {
		  exports.storage.removeItem('debug');
		}
	  } catch (error) {// Swallow
		// XXX (@Qix-) should we be logging these?
	  }
	}
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */


	function load() {
	  var r;

	  try {
		r = exports.storage.getItem('debug');
	  } catch (error) {} // Swallow
	  // XXX (@Qix-) should we be logging these?
	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


	  if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	  }

	  return r;
	}
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */


	function localstorage() {
	  try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	  } catch (error) {// Swallow
		// XXX (@Qix-) should we be logging these?
	  }
	}

	module.exports = __webpack_require__(29)(exports);
	var formatters = module.exports.formatters;
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	formatters.j = function (v) {
	  try {
		return JSON.stringify(v);
	  } catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	  }
	};



	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */
	function setup(env) {
	  createDebug.debug = createDebug;
	  createDebug.default = createDebug;
	  createDebug.coerce = coerce;
	  createDebug.disable = disable;
	  createDebug.enable = enable;
	  createDebug.enabled = enabled;
	  createDebug.humanize = __webpack_require__(30);
	  Object.keys(env).forEach(function (key) {
		createDebug[key] = env[key];
	  });
	  /**
	  * Active `debug` instances.
	  */

	  createDebug.instances = [];
	  /**
	  * The currently active debug mode names, and names to skip.
	  */

	  createDebug.names = [];
	  createDebug.skips = [];
	  /**
	  * Map of special "%n" handling functions, for the debug "format" argument.
	  *
	  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	  */

	  createDebug.formatters = {};
	  /**
	  * Selects a color for a debug namespace
	  * @param {String} namespace The namespace string for the for the debug instance to be colored
	  * @return {Number|String} An ANSI color code for the given namespace
	  * @api private
	  */

	  function selectColor(namespace) {
		var hash = 0;

		for (var i = 0; i < namespace.length; i++) {
		  hash = (hash << 5) - hash + namespace.charCodeAt(i);
		  hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	  }

	  createDebug.selectColor = selectColor;
	  /**
	  * Create a debugger with the given `namespace`.
	  *
	  * @param {String} namespace
	  * @return {Function}
	  * @api public
	  */

	  function createDebug(namespace) {
		var prevTime;

		function debug() {
		  // Disabled?
		  if (!debug.enabled) {
			return;
		  }

		  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		  }

		  var self = debug; // Set `diff` timestamp

		  var curr = Number(new Date());
		  var ms = curr - (prevTime || curr);
		  self.diff = ms;
		  self.prev = prevTime;
		  self.curr = curr;
		  prevTime = curr;
		  args[0] = createDebug.coerce(args[0]);

		  if (typeof args[0] !== 'string') {
			// Anything else let's inspect with %O
			args.unshift('%O');
		  } // Apply any `formatters` transformations


		  var index = 0;
		  args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
			// If we encounter an escaped % then don't increase the array index
			if (match === '%%') {
			  return match;
			}

			index++;
			var formatter = createDebug.formatters[format];

			if (typeof formatter === 'function') {
			  var val = args[index];
			  match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

			  args.splice(index, 1);
			  index--;
			}

			return match;
		  }); // Apply env-specific formatting (colors, etc.)

		  createDebug.formatArgs.call(self, args);
		  var logFn = self.log || createDebug.log;
		  logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend; // Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;
		// env-specific initialization logic for debug instances

		if (typeof createDebug.init === 'function') {
		  createDebug.init(debug);
		}

		createDebug.instances.push(debug);
		return debug;
	  }

	  function destroy() {
		var index = createDebug.instances.indexOf(this);

		if (index !== -1) {
		  createDebug.instances.splice(index, 1);
		  return true;
		}

		return false;
	  }

	  function extend(namespace, delimiter) {
		return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	  }
	  /**
	  * Enables a debug mode by namespaces. This can include modes
	  * separated by a colon and wildcards.
	  *
	  * @param {String} namespaces
	  * @api public
	  */


	  function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.names = [];
		createDebug.skips = [];
		var i;
		var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		var len = split.length;

		for (i = 0; i < len; i++) {
		  if (!split[i]) {
			// ignore empty strings
			continue;
		  }

		  namespaces = split[i].replace(/\*/g, '.*?');

		  if (namespaces[0] === '-') {
			createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
		  } else {
			createDebug.names.push(new RegExp('^' + namespaces + '$'));
		  }
		}

		for (i = 0; i < createDebug.instances.length; i++) {
		  var instance = createDebug.instances[i];
		  instance.enabled = createDebug.enabled(instance.namespace);
		}
	  }
	  /**
	  * Disable debug output.
	  *
	  * @api public
	  */


	  function disable() {
		createDebug.enable('');
	  }
	  /**
	  * Returns true if the given mode name is enabled, false otherwise.
	  *
	  * @param {String} name
	  * @return {Boolean}
	  * @api public
	  */


	  function enabled(name) {
		if (name[name.length - 1] === '*') {
		  return true;
		}

		var i;
		var len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
		  if (createDebug.skips[i].test(name)) {
			return false;
		  }
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
		  if (createDebug.names[i].test(name)) {
			return true;
		  }
		}

		return false;
	  }
	  /**
	  * Coerce `val`.
	  *
	  * @param {Mixed} val
	  * @return {Mixed}
	  * @api private
	  */


	  function coerce(val) {
		if (val instanceof Error) {
		  return val.stack || val.message;
		}

		return val;
	  }

	  createDebug.enable(createDebug.load());
	  return createDebug;
	}

	module.exports = setup;



	/***/ }),
	/* 30 */
	/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
		return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
		return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
		'val is not a non-empty string or a valid number. val=' +
		  JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
		return;
	  }
	  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		str
	  );
	  if (!match) {
		return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
		  return n * y;
		case 'weeks':
		case 'week':
		case 'w':
		  return n * w;
		case 'days':
		case 'day':
		case 'd':
		  return n * d;
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
		  return n * h;
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
		  return n * m;
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
		  return n * s;
		case 'milliseconds':
		case 'millisecond':
		case 'msecs':
		case 'msec':
		case 'ms':
		  return n;
		default:
		  return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
		return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
		return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
		return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
		return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
		return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
		return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
		return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
		return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}


	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/**
	 * Module dependencies.
	 */
	var tty = __webpack_require__(23);

	var util = __webpack_require__(13);
	/**
	 * This is the Node.js implementation of `debug()`.
	 */


	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	try {
	  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	  // eslint-disable-next-line import/no-extraneous-dependencies
	  var supportsColor = __webpack_require__(24);

	  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
	  }
	} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

	/**
	 * Build up the default `inspectOpts` object from the environment variables.
	 *
	 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	 */


	exports.inspectOpts = Object.keys(process.env).filter(function (key) {
	  return /^debug_/i.test(key);
	}).reduce(function (obj, key) {
	  // Camel-case
	  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
		return k.toUpperCase();
	  }); // Coerce string value into JS value

	  var val = process.env[key];

	  if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	  } else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	  } else if (val === 'null') {
		val = null;
	  } else {
		val = Number(val);
	  }

	  obj[prop] = val;
	  return obj;
	}, {});
	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */


	function formatArgs(args) {
	  var name = this.namespace,
		  useColors = this.useColors;

	  if (useColors) {
		var c = this.color;
		var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
		var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
	  } else {
		args[0] = getDate() + name + ' ' + args[0];
	  }
	}

	function getDate() {
	  if (exports.inspectOpts.hideDate) {
		return '';
	  }

	  return new Date().toISOString() + ' ';
	}
	/**
	 * Invokes `util.format()` with the specified arguments and writes to stderr.
	 */


	function log() {
	  return process.stderr.write(util.format.apply(util, arguments) + '\n');
	}
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */


	function save(namespaces) {
	  if (namespaces) {
		process.env.DEBUG = namespaces;
	  } else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	  }
	}
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */


	function load() {
	  return process.env.DEBUG;
	}
	/**
	 * Init logic for `debug` instances.
	 *
	 * Create a new `inspectOpts` object in case `useColors` is set
	 * differently for a particular `debug` instance.
	 */


	function init(debug) {
	  debug.inspectOpts = {};
	  var keys = Object.keys(exports.inspectOpts);

	  for (var i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	  }
	}

	module.exports = __webpack_require__(29)(exports);
	var formatters = module.exports.formatters;
	/**
	 * Map %o to `util.inspect()`, all on a single line.
	 */

	formatters.o = function (v) {
	  this.inspectOpts.colors = this.useColors;
	  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
	};
	/**
	 * Map %O to `util.inspect()`, allowing multiple lines if needed.
	 */


	formatters.O = function (v) {
	  this.inspectOpts.colors = this.useColors;
	  return util.inspect(v, this.inspectOpts);
	};



	/***/ }),
	/* 32 */
	/***/ (function(module, exports) {

	module.exports = require("zlib");

	/***/ }),
	/* 33 */
	/***/ (function(module, exports) {

	module.exports = require("vscode");

	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	const cp = __webpack_require__(35);
	const fs = __webpack_require__(2);
	const SemVer = __webpack_require__(36);
	const client_1 = __webpack_require__(37);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const colorProvider_1 = __webpack_require__(69);
	const configuration_1 = __webpack_require__(70);
	const implementation_1 = __webpack_require__(71);
	const typeDefinition_1 = __webpack_require__(72);
	const workspaceFolders_1 = __webpack_require__(73);
	const foldingRange_1 = __webpack_require__(74);
	const declaration_1 = __webpack_require__(75);
	const Is = __webpack_require__(62);
	const processes_1 = __webpack_require__(76);
	__export(__webpack_require__(37));
	const REQUIRED_VSCODE_VERSION = '^1.30'; // do not change format, updated by `updateVSCode` script
	var Executable;
	(function (Executable) {
		function is(value) {
			return Is.string(value.command);
		}
		Executable.is = is;
	})(Executable || (Executable = {}));
	var TransportKind;
	(function (TransportKind) {
		TransportKind[TransportKind["stdio"] = 0] = "stdio";
		TransportKind[TransportKind["ipc"] = 1] = "ipc";
		TransportKind[TransportKind["pipe"] = 2] = "pipe";
		TransportKind[TransportKind["socket"] = 3] = "socket";
	})(TransportKind = exports.TransportKind || (exports.TransportKind = {}));
	var Transport;
	(function (Transport) {
		function isSocket(value) {
			let candidate = value;
			return candidate && candidate.kind === TransportKind.socket && Is.number(candidate.port);
		}
		Transport.isSocket = isSocket;
	})(Transport || (Transport = {}));
	var NodeModule;
	(function (NodeModule) {
		function is(value) {
			return Is.string(value.module);
		}
		NodeModule.is = is;
	})(NodeModule || (NodeModule = {}));
	var StreamInfo;
	(function (StreamInfo) {
		function is(value) {
			let candidate = value;
			return candidate && candidate.writer !== void 0 && candidate.reader !== void 0;
		}
		StreamInfo.is = is;
	})(StreamInfo || (StreamInfo = {}));
	var ChildProcessInfo;
	(function (ChildProcessInfo) {
		function is(value) {
			let candidate = value;
			return candidate && candidate.process !== void 0 && typeof candidate.detached === 'boolean';
		}
		ChildProcessInfo.is = is;
	})(ChildProcessInfo || (ChildProcessInfo = {}));
	class LanguageClient extends client_1.BaseLanguageClient {
		constructor(arg1, arg2, arg3, arg4, arg5) {
			let id;
			let name;
			let serverOptions;
			let clientOptions;
			let forceDebug;
			if (Is.string(arg2)) {
				id = arg1;
				name = arg2;
				serverOptions = arg3;
				clientOptions = arg4;
				forceDebug = !!arg5;
			}
			else {
				id = arg1.toLowerCase();
				name = arg1;
				serverOptions = arg2;
				clientOptions = arg3;
				forceDebug = arg4;
			}
			if (forceDebug === void 0) {
				forceDebug = false;
			}
			super(id, name, clientOptions);
			this._serverOptions = serverOptions;
			this._forceDebug = forceDebug;
			try {
				this.checkVersion();
			}
			catch (error) {
				if (Is.string(error.message)) {
					this.outputChannel.appendLine(error.message);
				}
				throw error;
			}
		}
		checkVersion() {
			let codeVersion = SemVer.parse(vscode_1.version);
			if (!codeVersion) {
				throw new Error(`No valid VS Code version detected. Version string is: ${vscode_1.version}`);
			}
			// Remove the insider pre-release since we stay API compatible.
			if (codeVersion.prerelease && codeVersion.prerelease.length > 0) {
				codeVersion.prerelease = [];
			}
			if (!SemVer.satisfies(codeVersion, REQUIRED_VSCODE_VERSION)) {
				throw new Error(`The language client requires VS Code version ${REQUIRED_VSCODE_VERSION} but received version ${vscode_1.version}`);
			}
		}
		stop() {
			return super.stop().then(() => {
				if (this._serverProcess) {
					let toCheck = this._serverProcess;
					this._serverProcess = undefined;
					if (this._isDetached === void 0 || !this._isDetached) {
						this.checkProcessDied(toCheck);
					}
					this._isDetached = undefined;
				}
			});
		}
		checkProcessDied(childProcess) {
			if (!childProcess) {
				return;
			}
			setTimeout(() => {
				// Test if the process is still alive. Throws an exception if not
				try {
					process.kill(childProcess.pid, 0);
					processes_1.terminate(childProcess);
				}
				catch (error) {
					// All is fine.
				}
			}, 2000);
		}
		handleConnectionClosed() {
			this._serverProcess = undefined;
			super.handleConnectionClosed();
		}
		createMessageTransports(encoding) {
			function getEnvironment(env) {
				if (!env) {
					return process.env;
				}
				let result = Object.create(null);
				Object.keys(process.env).forEach(key => result[key] = process.env[key]);
				Object.keys(env).forEach(key => result[key] = env[key]);
				return result;
			}
			function startedInDebugMode() {
				let args = process.execArgv;
				if (args) {
					return args.some((arg) => /^--debug=?/.test(arg) || /^--debug-brk=?/.test(arg) || /^--inspect=?/.test(arg) || /^--inspect-brk=?/.test(arg));
				}
				;
				return false;
			}
			let server = this._serverOptions;
			// We got a function.
			if (Is.func(server)) {
				return server().then((result) => {
					if (client_1.MessageTransports.is(result)) {
						this._isDetached = !!result.detached;
						return result;
					}
					else if (StreamInfo.is(result)) {
						this._isDetached = !!result.detached;
						return { reader: new vscode_languageserver_protocol_1.StreamMessageReader(result.reader), writer: new vscode_languageserver_protocol_1.StreamMessageWriter(result.writer) };
					}
					else {
						let cp;
						if (ChildProcessInfo.is(result)) {
							cp = result.process;
							this._isDetached = result.detached;
						}
						else {
							cp = result;
							this._isDetached = false;
						}
						cp.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
						return { reader: new vscode_languageserver_protocol_1.StreamMessageReader(cp.stdout), writer: new vscode_languageserver_protocol_1.StreamMessageWriter(cp.stdin) };
					}
				});
			}
			let json;
			let runDebug = server;
			if (runDebug.run || runDebug.debug) {
				// We are under debugging. So use debug as well.
				if (typeof v8debug === 'object' || this._forceDebug || startedInDebugMode()) {
					json = runDebug.debug;
				}
				else {
					json = runDebug.run;
				}
			}
			else {
				json = server;
			}
			return this._getServerWorkingDir(json.options).then(serverWorkingDir => {
				if (NodeModule.is(json) && json.module) {
					let node = json;
					let transport = node.transport || TransportKind.stdio;
					if (node.runtime) {
						let args = [];
						let options = node.options || Object.create(null);
						if (options.execArgv) {
							options.execArgv.forEach(element => args.push(element));
						}
						args.push(node.module);
						if (node.args) {
							node.args.forEach(element => args.push(element));
						}
						let execOptions = Object.create(null);
						execOptions.cwd = serverWorkingDir;
						execOptions.env = getEnvironment(options.env);
						let pipeName = undefined;
						if (transport === TransportKind.ipc) {
							// exec options not correctly typed in lib
							execOptions.stdio = [null, null, null, 'ipc'];
							args.push('--node-ipc');
						}
						else if (transport === TransportKind.stdio) {
							args.push('--stdio');
						}
						else if (transport === TransportKind.pipe) {
							pipeName = vscode_languageserver_protocol_1.generateRandomPipeName();
							args.push(`--pipe=${pipeName}`);
						}
						else if (Transport.isSocket(transport)) {
							args.push(`--socket=${transport.port}`);
						}
						args.push(`--clientProcessId=${process.pid.toString()}`);
						if (transport === TransportKind.ipc || transport === TransportKind.stdio) {
							let serverProcess = cp.spawn(node.runtime, args, execOptions);
							if (!serverProcess || !serverProcess.pid) {
								return Promise.reject(`Launching server using runtime ${node.runtime} failed.`);
							}
							this._serverProcess = serverProcess;
							serverProcess.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
							if (transport === TransportKind.ipc) {
								serverProcess.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								return Promise.resolve({ reader: new vscode_languageserver_protocol_1.IPCMessageReader(serverProcess), writer: new vscode_languageserver_protocol_1.IPCMessageWriter(serverProcess) });
							}
							else {
								return Promise.resolve({ reader: new vscode_languageserver_protocol_1.StreamMessageReader(serverProcess.stdout), writer: new vscode_languageserver_protocol_1.StreamMessageWriter(serverProcess.stdin) });
							}
						}
						else if (transport == TransportKind.pipe) {
							return vscode_languageserver_protocol_1.createClientPipeTransport(pipeName).then((transport) => {
								let process = cp.spawn(node.runtime, args, execOptions);
								if (!process || !process.pid) {
									return Promise.reject(`Launching server using runtime ${node.runtime} failed.`);
								}
								this._serverProcess = process;
								process.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								process.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								return transport.onConnected().then((protocol) => {
									return { reader: protocol[0], writer: protocol[1] };
								});
							});
						}
						else if (Transport.isSocket(transport)) {
							return vscode_languageserver_protocol_1.createClientSocketTransport(transport.port).then((transport) => {
								let process = cp.spawn(node.runtime, args, execOptions);
								if (!process || !process.pid) {
									return Promise.reject(`Launching server using runtime ${node.runtime} failed.`);
								}
								this._serverProcess = process;
								process.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								process.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								return transport.onConnected().then((protocol) => {
									return { reader: protocol[0], writer: protocol[1] };
								});
							});
						}
					}
					else {
						let pipeName = undefined;
						return new Promise((resolve, _reject) => {
							let args = node.args && node.args.slice() || [];
							if (transport === TransportKind.ipc) {
								args.push('--node-ipc');
							}
							else if (transport === TransportKind.stdio) {
								args.push('--stdio');
							}
							else if (transport === TransportKind.pipe) {
								pipeName = vscode_languageserver_protocol_1.generateRandomPipeName();
								args.push(`--pipe=${pipeName}`);
							}
							else if (Transport.isSocket(transport)) {
								args.push(`--socket=${transport.port}`);
							}
							args.push(`--clientProcessId=${process.pid.toString()}`);
							let options = node.options || Object.create(null);
							options.execArgv = options.execArgv || [];
							options.cwd = serverWorkingDir;
							options.silent = true;
							if (transport === TransportKind.ipc || transport === TransportKind.stdio) {
								let sp = cp.fork(node.module, args || [], options);
								this._serverProcess = sp;
								sp.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
								if (transport === TransportKind.ipc) {
									sp.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
									resolve({ reader: new vscode_languageserver_protocol_1.IPCMessageReader(this._serverProcess), writer: new vscode_languageserver_protocol_1.IPCMessageWriter(this._serverProcess) });
								}
								else {
									resolve({ reader: new vscode_languageserver_protocol_1.StreamMessageReader(sp.stdout), writer: new vscode_languageserver_protocol_1.StreamMessageWriter(sp.stdin) });
								}
							}
							else if (transport === TransportKind.pipe) {
								vscode_languageserver_protocol_1.createClientPipeTransport(pipeName).then((transport) => {
									let sp = cp.fork(node.module, args || [], options);
									this._serverProcess = sp;
									sp.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
									sp.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
									transport.onConnected().then((protocol) => {
										resolve({ reader: protocol[0], writer: protocol[1] });
									});
								});
							}
							else if (Transport.isSocket(transport)) {
								vscode_languageserver_protocol_1.createClientSocketTransport(transport.port).then((transport) => {
									let sp = cp.fork(node.module, args || [], options);
									this._serverProcess = sp;
									sp.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
									sp.stdout.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
									transport.onConnected().then((protocol) => {
										resolve({ reader: protocol[0], writer: protocol[1] });
									});
								});
							}
						});
					}
				}
				else if (Executable.is(json) && json.command) {
					let command = json;
					let args = command.args || [];
					let options = Object.assign({}, command.options);
					options.cwd = options.cwd || serverWorkingDir;
					let serverProcess = cp.spawn(command.command, args, options);
					if (!serverProcess || !serverProcess.pid) {
						return Promise.reject(`Launching server using command ${command.command} failed.`);
					}
					serverProcess.stderr.on('data', data => this.outputChannel.append(Is.string(data) ? data : data.toString(encoding)));
					this._serverProcess = serverProcess;
					this._isDetached = !!options.detached;
					return Promise.resolve({ reader: new vscode_languageserver_protocol_1.StreamMessageReader(serverProcess.stdout), writer: new vscode_languageserver_protocol_1.StreamMessageWriter(serverProcess.stdin) });
				}
				return Promise.reject(new Error(`Unsupported server configuration ` + JSON.stringify(server, null, 4)));
			});
		}
		registerProposedFeatures() {
			this.registerFeatures(ProposedFeatures.createAll(this));
		}
		registerBuiltinFeatures() {
			super.registerBuiltinFeatures();
			this.registerFeature(new configuration_1.ConfigurationFeature(this));
			this.registerFeature(new typeDefinition_1.TypeDefinitionFeature(this));
			this.registerFeature(new implementation_1.ImplementationFeature(this));
			this.registerFeature(new colorProvider_1.ColorProviderFeature(this));
			this.registerFeature(new workspaceFolders_1.WorkspaceFoldersFeature(this));
			this.registerFeature(new foldingRange_1.FoldingRangeFeature(this));
			this.registerFeature(new declaration_1.DeclarationFeature(this));
		}
		_mainGetRootPath() {
			let folders = vscode_1.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				return undefined;
			}
			let folder = folders[0];
			if (folder.uri.scheme === 'file') {
				return folder.uri.fsPath;
			}
			return undefined;
		}
		_getServerWorkingDir(options) {
			let cwd = options && options.cwd;
			if (!cwd) {
				cwd = this.clientOptions.workspaceFolder
					? this.clientOptions.workspaceFolder.uri.fsPath
					: this._mainGetRootPath();
			}
			if (cwd) {
				// make sure the folder exists otherwise creating the process will fail
				return new Promise(s => {
					fs.lstat(cwd, (err, stats) => {
						s(!err && stats.isDirectory() ? cwd : undefined);
					});
				});
			}
			return Promise.resolve(undefined);
		}
	}
	exports.LanguageClient = LanguageClient;
	class SettingMonitor {
		constructor(_client, _setting) {
			this._client = _client;
			this._setting = _setting;
			this._listeners = [];
		}
		start() {
			vscode_1.workspace.onDidChangeConfiguration(this.onDidChangeConfiguration, this, this._listeners);
			this.onDidChangeConfiguration();
			return new vscode_1.Disposable(() => {
				if (this._client.needsStop()) {
					this._client.stop();
				}
			});
		}
		onDidChangeConfiguration() {
			let index = this._setting.indexOf('.');
			let primary = index >= 0 ? this._setting.substr(0, index) : this._setting;
			let rest = index >= 0 ? this._setting.substr(index + 1) : undefined;
			let enabled = rest ? vscode_1.workspace.getConfiguration(primary).get(rest, false) : vscode_1.workspace.getConfiguration(primary);
			if (enabled && this._client.needsStart()) {
				this._client.start();
			}
			else if (!enabled && this._client.needsStop()) {
				this._client.stop();
			}
		}
	}
	exports.SettingMonitor = SettingMonitor;
	// Exporting proposed protocol.
	var ProposedFeatures;
	(function (ProposedFeatures) {
		function createAll(_client) {
			let result = [];
			return result;
		}
		ProposedFeatures.createAll = createAll;
	})(ProposedFeatures = exports.ProposedFeatures || (exports.ProposedFeatures = {}));


	/***/ }),
	/* 35 */
	/***/ (function(module, exports) {

	module.exports = require("child_process");

	/***/ }),
	/* 36 */
	/***/ (function(module, exports) {

	exports = module.exports = SemVer;

	// The debug function is excluded entirely from the minified version.
	/* nomin */ var debug;
	/* nomin */ if (typeof process === 'object' &&
		/* nomin */ process.env &&
		/* nomin */ process.env.NODE_DEBUG &&
		/* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
	  /* nomin */ debug = function() {
		/* nomin */ var args = Array.prototype.slice.call(arguments, 0);
		/* nomin */ args.unshift('SEMVER');
		/* nomin */ console.log.apply(console, args);
		/* nomin */ };
	/* nomin */ else
	  /* nomin */ debug = function() {};

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';

	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

	// Max safe segment length for coercion.
	var MAX_SAFE_COMPONENT_LENGTH = 16;

	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;

	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.

	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.

	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.

	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


	// ## Main Version
	// Three dot-separated numeric identifiers.

	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
					   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
					   '(' + src[NUMERICIDENTIFIER] + ')';

	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
							'(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
							'(' + src[NUMERICIDENTIFIERLOOSE] + ')';

	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.

	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
								'|' + src[NONNUMERICIDENTIFIER] + ')';

	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
									 '|' + src[NONNUMERICIDENTIFIER] + ')';


	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.

	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
					  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
						   '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.

	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.

	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
				 '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.

	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.

	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] +
					src[PRERELEASE] + '?' +
					src[BUILD] + '?';

	src[FULL] = '^' + FULLPLAIN + '$';

	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
					 src[PRERELEASELOOSE] + '?' +
					 src[BUILD] + '?';

	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';

	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';

	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:' + src[PRERELEASE] + ')?' +
					   src[BUILD] + '?' +
					   ')?)?';

	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:' + src[PRERELEASELOOSE] + ')?' +
							src[BUILD] + '?' +
							')?)?';

	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

	// Coercion.
	// Extract anything that could conceivably be a part of a valid semver
	var COERCE = R++;
	src[COERCE] = '(?:^|[^\\d])' +
				  '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
				  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
				  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
				  '(?:$|[^\\d])';

	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';

	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';

	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';

	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';

	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
						  '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';


	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
					   '\\s+-\\s+' +
					   '(' + src[XRANGEPLAIN] + ')' +
					   '\\s*$';

	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
							'\\s+-\\s+' +
							'(' + src[XRANGEPLAINLOOSE] + ')' +
							'\\s*$';

	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';

	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i])
		re[i] = new RegExp(src[i]);
	}

	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer)
		return version;

	  if (typeof version !== 'string')
		return null;

	  if (version.length > MAX_LENGTH)
		return null;

	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version))
		return null;

	  try {
		return new SemVer(version, loose);
	  } catch (er) {
		return null;
	  }
	}

	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}


	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}

	exports.SemVer = SemVer;

	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
		if (version.loose === loose)
		  return version;
		else
		  version = version.version;
	  } else if (typeof version !== 'string') {
		throw new TypeError('Invalid Version: ' + version);
	  }

	  if (version.length > MAX_LENGTH)
		throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

	  if (!(this instanceof SemVer))
		return new SemVer(version, loose);

	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

	  if (!m)
		throw new TypeError('Invalid Version: ' + version);

	  this.raw = version;

	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];

	  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
		throw new TypeError('Invalid major version')

	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
		throw new TypeError('Invalid minor version')

	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
		throw new TypeError('Invalid patch version')

	  // numberify any prerelease numeric ids
	  if (!m[4])
		this.prerelease = [];
	  else
		this.prerelease = m[4].split('.').map(function(id) {
		  if (/^[0-9]+$/.test(id)) {
			var num = +id;
			if (num >= 0 && num < MAX_SAFE_INTEGER)
			  return num;
		  }
		  return id;
		});

	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}

	SemVer.prototype.format = function() {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length)
		this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};

	SemVer.prototype.toString = function() {
	  return this.version;
	};

	SemVer.prototype.compare = function(other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  return this.compareMain(other) || this.comparePre(other);
	};

	SemVer.prototype.compareMain = function(other) {
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  return compareIdentifiers(this.major, other.major) ||
			 compareIdentifiers(this.minor, other.minor) ||
			 compareIdentifiers(this.patch, other.patch);
	};

	SemVer.prototype.comparePre = function(other) {
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length)
		return -1;
	  else if (!this.prerelease.length && other.prerelease.length)
		return 1;
	  else if (!this.prerelease.length && !other.prerelease.length)
		return 0;

	  var i = 0;
	  do {
		var a = this.prerelease[i];
		var b = other.prerelease[i];
		debug('prerelease compare', i, a, b);
		if (a === undefined && b === undefined)
		  return 0;
		else if (b === undefined)
		  return 1;
		else if (a === undefined)
		  return -1;
		else if (a === b)
		  continue;
		else
		  return compareIdentifiers(a, b);
	  } while (++i);
	};

	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function(release, identifier) {
	  switch (release) {
		case 'premajor':
		  this.prerelease.length = 0;
		  this.patch = 0;
		  this.minor = 0;
		  this.major++;
		  this.inc('pre', identifier);
		  break;
		case 'preminor':
		  this.prerelease.length = 0;
		  this.patch = 0;
		  this.minor++;
		  this.inc('pre', identifier);
		  break;
		case 'prepatch':
		  // If this is already a prerelease, it will bump to the next version
		  // drop any prereleases that might already exist, since they are not
		  // relevant at this point.
		  this.prerelease.length = 0;
		  this.inc('patch', identifier);
		  this.inc('pre', identifier);
		  break;
		// If the input is a non-prerelease version, this acts the same as
		// prepatch.
		case 'prerelease':
		  if (this.prerelease.length === 0)
			this.inc('patch', identifier);
		  this.inc('pre', identifier);
		  break;

		case 'major':
		  // If this is a pre-major version, bump up to the same major version.
		  // Otherwise increment major.
		  // 1.0.0-5 bumps to 1.0.0
		  // 1.1.0 bumps to 2.0.0
		  if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
			this.major++;
		  this.minor = 0;
		  this.patch = 0;
		  this.prerelease = [];
		  break;
		case 'minor':
		  // If this is a pre-minor version, bump up to the same minor version.
		  // Otherwise increment minor.
		  // 1.2.0-5 bumps to 1.2.0
		  // 1.2.1 bumps to 1.3.0
		  if (this.patch !== 0 || this.prerelease.length === 0)
			this.minor++;
		  this.patch = 0;
		  this.prerelease = [];
		  break;
		case 'patch':
		  // If this is not a pre-release version, it will increment the patch.
		  // If it is a pre-release it will bump up to the same patch version.
		  // 1.2.0-5 patches to 1.2.0
		  // 1.2.0 patches to 1.2.1
		  if (this.prerelease.length === 0)
			this.patch++;
		  this.prerelease = [];
		  break;
		// This probably shouldn't be used publicly.
		// 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
		case 'pre':
		  if (this.prerelease.length === 0)
			this.prerelease = [0];
		  else {
			var i = this.prerelease.length;
			while (--i >= 0) {
			  if (typeof this.prerelease[i] === 'number') {
				this.prerelease[i]++;
				i = -2;
			  }
			}
			if (i === -1) // didn't increment anything
			  this.prerelease.push(0);
		  }
		  if (identifier) {
			// 1.2.0-beta.1 bumps to 1.2.0-beta.2,
			// 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
			if (this.prerelease[0] === identifier) {
			  if (isNaN(this.prerelease[1]))
				this.prerelease = [identifier, 0];
			} else
			  this.prerelease = [identifier, 0];
		  }
		  break;

		default:
		  throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};

	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof(loose) === 'string') {
		identifier = loose;
		loose = undefined;
	  }

	  try {
		return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
		return null;
	  }
	}

	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
		return null;
	  } else {
		var v1 = parse(version1);
		var v2 = parse(version2);
		if (v1.prerelease.length || v2.prerelease.length) {
		  for (var key in v1) {
			if (key === 'major' || key === 'minor' || key === 'patch') {
			  if (v1[key] !== v2[key]) {
				return 'pre'+key;
			  }
			}
		  }
		  return 'prerelease';
		}
		for (var key in v1) {
		  if (key === 'major' || key === 'minor' || key === 'patch') {
			if (v1[key] !== v2[key]) {
			  return key;
			}
		  }
		}
	  }
	}

	exports.compareIdentifiers = compareIdentifiers;

	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);

	  if (anum && bnum) {
		a = +a;
		b = +b;
	  }

	  return (anum && !bnum) ? -1 :
			 (bnum && !anum) ? 1 :
			 a < b ? -1 :
			 a > b ? 1 :
			 0;
	}

	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}

	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}

	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}

	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}

	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(new SemVer(b, loose));
	}

	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}

	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}

	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function(a, b) {
		return exports.compare(a, b, loose);
	  });
	}

	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function(a, b) {
		return exports.rcompare(a, b, loose);
	  });
	}

	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}

	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}

	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}

	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}

	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}

	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}

	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
		case '===':
		  if (typeof a === 'object') a = a.version;
		  if (typeof b === 'object') b = b.version;
		  ret = a === b;
		  break;
		case '!==':
		  if (typeof a === 'object') a = a.version;
		  if (typeof b === 'object') b = b.version;
		  ret = a !== b;
		  break;
		case '': case '=': case '==': ret = eq(a, b, loose); break;
		case '!=': ret = neq(a, b, loose); break;
		case '>': ret = gt(a, b, loose); break;
		case '>=': ret = gte(a, b, loose); break;
		case '<': ret = lt(a, b, loose); break;
		case '<=': ret = lte(a, b, loose); break;
		default: throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}

	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
		if (comp.loose === loose)
		  return comp;
		else
		  comp = comp.value;
	  }

	  if (!(this instanceof Comparator))
		return new Comparator(comp, loose);

	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);

	  if (this.semver === ANY)
		this.value = '';
	  else
		this.value = this.operator + this.semver.version;

	  debug('comp', this);
	}

	var ANY = {};
	Comparator.prototype.parse = function(comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);

	  if (!m)
		throw new TypeError('Invalid comparator: ' + comp);

	  this.operator = m[1];
	  if (this.operator === '=')
		this.operator = '';

	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2])
		this.semver = ANY;
	  else
		this.semver = new SemVer(m[2], this.loose);
	};

	Comparator.prototype.toString = function() {
	  return this.value;
	};

	Comparator.prototype.test = function(version) {
	  debug('Comparator.test', version, this.loose);

	  if (this.semver === ANY)
		return true;

	  if (typeof version === 'string')
		version = new SemVer(version, this.loose);

	  return cmp(version, this.operator, this.semver, this.loose);
	};

	Comparator.prototype.intersects = function(comp, loose) {
	  if (!(comp instanceof Comparator)) {
		throw new TypeError('a Comparator is required');
	  }

	  var rangeTmp;

	  if (this.operator === '') {
		rangeTmp = new Range(comp.value, loose);
		return satisfies(this.value, rangeTmp, loose);
	  } else if (comp.operator === '') {
		rangeTmp = new Range(this.value, loose);
		return satisfies(comp.semver, rangeTmp, loose);
	  }

	  var sameDirectionIncreasing =
		(this.operator === '>=' || this.operator === '>') &&
		(comp.operator === '>=' || comp.operator === '>');
	  var sameDirectionDecreasing =
		(this.operator === '<=' || this.operator === '<') &&
		(comp.operator === '<=' || comp.operator === '<');
	  var sameSemVer = this.semver.version === comp.semver.version;
	  var differentDirectionsInclusive =
		(this.operator === '>=' || this.operator === '<=') &&
		(comp.operator === '>=' || comp.operator === '<=');
	  var oppositeDirectionsLessThan =
		cmp(this.semver, '<', comp.semver, loose) &&
		((this.operator === '>=' || this.operator === '>') &&
		(comp.operator === '<=' || comp.operator === '<'));
	  var oppositeDirectionsGreaterThan =
		cmp(this.semver, '>', comp.semver, loose) &&
		((this.operator === '<=' || this.operator === '<') &&
		(comp.operator === '>=' || comp.operator === '>'));

	  return sameDirectionIncreasing || sameDirectionDecreasing ||
		(sameSemVer && differentDirectionsInclusive) ||
		oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
	};


	exports.Range = Range;
	function Range(range, loose) {
	  if (range instanceof Range) {
		if (range.loose === loose) {
		  return range;
		} else {
		  return new Range(range.raw, loose);
		}
	  }

	  if (range instanceof Comparator) {
		return new Range(range.value, loose);
	  }

	  if (!(this instanceof Range))
		return new Range(range, loose);

	  this.loose = loose;

	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
		return this.parseRange(range.trim());
	  }, this).filter(function(c) {
		// throw out any that are not relevant for whatever reason
		return c.length;
	  });

	  if (!this.set.length) {
		throw new TypeError('Invalid SemVer Range: ' + range);
	  }

	  this.format();
	}

	Range.prototype.format = function() {
	  this.range = this.set.map(function(comps) {
		return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};

	Range.prototype.toString = function() {
	  return this.range;
	};

	Range.prototype.parseRange = function(range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);

	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);

	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);

	  // normalize spaces
	  range = range.split(/\s+/).join(' ');

	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.

	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function(comp) {
		return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
		// in loose mode, throw out any that are not valid comparators
		set = set.filter(function(comp) {
		  return !!comp.match(compRe);
		});
	  }
	  set = set.map(function(comp) {
		return new Comparator(comp, loose);
	  });

	  return set;
	};

	Range.prototype.intersects = function(range, loose) {
	  if (!(range instanceof Range)) {
		throw new TypeError('a Range is required');
	  }

	  return this.set.some(function(thisComparators) {
		return thisComparators.every(function(thisComparator) {
		  return range.set.some(function(rangeComparators) {
			return rangeComparators.every(function(rangeComparator) {
			  return thisComparator.intersects(rangeComparator, loose);
			});
		  });
		});
	  });
	};

	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function(comp) {
		return comp.map(function(c) {
		  return c.value;
		}).join(' ').trim().split(' ');
	  });
	}

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}

	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
		return replaceTilde(comp, loose);
	  }).join(' ');
	}

	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function(_, M, m, p, pr) {
		debug('tilde', comp, _, M, m, p, pr);
		var ret;

		if (isX(M))
		  ret = '';
		else if (isX(m))
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		else if (isX(p))
		  // ~1.2 == >=1.2.0 <1.3.0
		  ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		else if (pr) {
		  debug('replaceTilde pr', pr);
		  if (pr.charAt(0) !== '-')
			pr = '-' + pr;
		  ret = '>=' + M + '.' + m + '.' + p + pr +
				' <' + M + '.' + (+m + 1) + '.0';
		} else
		  // ~1.2.3 == >=1.2.3 <1.3.0
		  ret = '>=' + M + '.' + m + '.' + p +
				' <' + M + '.' + (+m + 1) + '.0';

		debug('tilde return', ret);
		return ret;
	  });
	}

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
		return replaceCaret(comp, loose);
	  }).join(' ');
	}

	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function(_, M, m, p, pr) {
		debug('caret', comp, _, M, m, p, pr);
		var ret;

		if (isX(M))
		  ret = '';
		else if (isX(m))
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		else if (isX(p)) {
		  if (M === '0')
			ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		  else
			ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
		} else if (pr) {
		  debug('replaceCaret pr', pr);
		  if (pr.charAt(0) !== '-')
			pr = '-' + pr;
		  if (M === '0') {
			if (m === '0')
			  ret = '>=' + M + '.' + m + '.' + p + pr +
					' <' + M + '.' + m + '.' + (+p + 1);
			else
			  ret = '>=' + M + '.' + m + '.' + p + pr +
					' <' + M + '.' + (+m + 1) + '.0';
		  } else
			ret = '>=' + M + '.' + m + '.' + p + pr +
				  ' <' + (+M + 1) + '.0.0';
		} else {
		  debug('no pr');
		  if (M === '0') {
			if (m === '0')
			  ret = '>=' + M + '.' + m + '.' + p +
					' <' + M + '.' + m + '.' + (+p + 1);
			else
			  ret = '>=' + M + '.' + m + '.' + p +
					' <' + M + '.' + (+m + 1) + '.0';
		  } else
			ret = '>=' + M + '.' + m + '.' + p +
				  ' <' + (+M + 1) + '.0.0';
		}

		debug('caret return', ret);
		return ret;
	  });
	}

	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function(comp) {
		return replaceXRange(comp, loose);
	  }).join(' ');
	}

	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
		debug('xRange', comp, ret, gtlt, M, m, p, pr);
		var xM = isX(M);
		var xm = xM || isX(m);
		var xp = xm || isX(p);
		var anyX = xp;

		if (gtlt === '=' && anyX)
		  gtlt = '';

		if (xM) {
		  if (gtlt === '>' || gtlt === '<') {
			// nothing is allowed
			ret = '<0.0.0';
		  } else {
			// nothing is forbidden
			ret = '*';
		  }
		} else if (gtlt && anyX) {
		  // replace X with 0
		  if (xm)
			m = 0;
		  if (xp)
			p = 0;

		  if (gtlt === '>') {
			// >1 => >=2.0.0
			// >1.2 => >=1.3.0
			// >1.2.3 => >= 1.2.4
			gtlt = '>=';
			if (xm) {
			  M = +M + 1;
			  m = 0;
			  p = 0;
			} else if (xp) {
			  m = +m + 1;
			  p = 0;
			}
		  } else if (gtlt === '<=') {
			// <=0.7.x is actually <0.8.0, since any 0.7.x should
			// pass.  Similarly, <=7.x is actually <8.0.0, etc.
			gtlt = '<';
			if (xm)
			  M = +M + 1;
			else
			  m = +m + 1;
		  }

		  ret = gtlt + M + '.' + m + '.' + p;
		} else if (xm) {
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		} else if (xp) {
		  ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		}

		debug('xRange return', ret);

		return ret;
	  });
	}

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}

	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0,
						   from, fM, fm, fp, fpr, fb,
						   to, tM, tm, tp, tpr, tb) {

	  if (isX(fM))
		from = '';
	  else if (isX(fm))
		from = '>=' + fM + '.0.0';
	  else if (isX(fp))
		from = '>=' + fM + '.' + fm + '.0';
	  else
		from = '>=' + from;

	  if (isX(tM))
		to = '';
	  else if (isX(tm))
		to = '<' + (+tM + 1) + '.0.0';
	  else if (isX(tp))
		to = '<' + tM + '.' + (+tm + 1) + '.0';
	  else if (tpr)
		to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
	  else
		to = '<=' + to;

	  return (from + ' ' + to).trim();
	}


	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function(version) {
	  if (!version)
		return false;

	  if (typeof version === 'string')
		version = new SemVer(version, this.loose);

	  for (var i = 0; i < this.set.length; i++) {
		if (testSet(this.set[i], version))
		  return true;
	  }
	  return false;
	};

	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
		if (!set[i].test(version))
		  return false;
	  }

	  if (version.prerelease.length) {
		// Find the set of versions that are allowed to have prereleases
		// For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
		// That should allow `1.2.3-pr.2` to pass.
		// However, `1.2.4-alpha.notready` should NOT be allowed,
		// even though it's within the range set by the comparators.
		for (var i = 0; i < set.length; i++) {
		  debug(set[i].semver);
		  if (set[i].semver === ANY)
			continue;

		  if (set[i].semver.prerelease.length > 0) {
			var allowed = set[i].semver;
			if (allowed.major === version.major &&
				allowed.minor === version.minor &&
				allowed.patch === version.patch)
			  return true;
		  }
		}

		// Version has a -pre, but it's not one of the ones we like.
		return false;
	  }

	  return true;
	}

	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
		range = new Range(range, loose);
	  } catch (er) {
		return false;
	  }
	  return range.test(version);
	}

	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  var max = null;
	  var maxSV = null;
	  try {
		var rangeObj = new Range(range, loose);
	  } catch (er) {
		return null;
	  }
	  versions.forEach(function (v) {
		if (rangeObj.test(v)) { // satisfies(v, range, loose)
		  if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
			max = v;
			maxSV = new SemVer(max, loose);
		  }
		}
	  })
	  return max;
	}

	exports.minSatisfying = minSatisfying;
	function minSatisfying(versions, range, loose) {
	  var min = null;
	  var minSV = null;
	  try {
		var rangeObj = new Range(range, loose);
	  } catch (er) {
		return null;
	  }
	  versions.forEach(function (v) {
		if (rangeObj.test(v)) { // satisfies(v, range, loose)
		  if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
			min = v;
			minSV = new SemVer(min, loose);
		  }
		}
	  })
	  return min;
	}

	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
		// Return '*' instead of '' so that truthiness works.
		// This will throw if it's invalid anyway
		return new Range(range, loose).range || '*';
	  } catch (er) {
		return null;
	  }
	}

	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}

	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}

	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);

	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
		case '>':
		  gtfn = gt;
		  ltefn = lte;
		  ltfn = lt;
		  comp = '>';
		  ecomp = '>=';
		  break;
		case '<':
		  gtfn = lt;
		  ltefn = gte;
		  ltfn = gt;
		  comp = '<';
		  ecomp = '<=';
		  break;
		default:
		  throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }

	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
		return false;
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (var i = 0; i < range.set.length; ++i) {
		var comparators = range.set[i];

		var high = null;
		var low = null;

		comparators.forEach(function(comparator) {
		  if (comparator.semver === ANY) {
			comparator = new Comparator('>=0.0.0')
		  }
		  high = high || comparator;
		  low = low || comparator;
		  if (gtfn(comparator.semver, high.semver, loose)) {
			high = comparator;
		  } else if (ltfn(comparator.semver, low.semver, loose)) {
			low = comparator;
		  }
		});

		// If the edge version comparator has a operator then our version
		// isn't outside it
		if (high.operator === comp || high.operator === ecomp) {
		  return false;
		}

		// If the lowest version comparator has an operator and our version
		// is less than it then it isn't higher than the range
		if ((!low.operator || low.operator === comp) &&
			ltefn(version, low.semver)) {
		  return false;
		} else if (low.operator === ecomp && ltfn(version, low.semver)) {
		  return false;
		}
	  }
	  return true;
	}

	exports.prerelease = prerelease;
	function prerelease(version, loose) {
	  var parsed = parse(version, loose);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
	}

	exports.intersects = intersects;
	function intersects(r1, r2, loose) {
	  r1 = new Range(r1, loose)
	  r2 = new Range(r2, loose)
	  return r1.intersects(r2)
	}

	exports.coerce = coerce;
	function coerce(version) {
	  if (version instanceof SemVer)
		return version;

	  if (typeof version !== 'string')
		return null;

	  var match = version.match(re[COERCE]);

	  if (match == null)
		return null;

	  return parse((match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
	}


	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const c2p = __webpack_require__(61);
	const p2c = __webpack_require__(66);
	const Is = __webpack_require__(62);
	const async_1 = __webpack_require__(67);
	const UUID = __webpack_require__(68);
	__export(__webpack_require__(38));
	class ConsoleLogger {
		error(message) {
			console.error(message);
		}
		warn(message) {
			console.warn(message);
		}
		info(message) {
			console.info(message);
		}
		log(message) {
			console.log(message);
		}
	}
	function createConnection(input, output, errorHandler, closeHandler) {
		let logger = new ConsoleLogger();
		let connection = vscode_languageserver_protocol_1.createProtocolConnection(input, output, logger);
		connection.onError((data) => { errorHandler(data[0], data[1], data[2]); });
		connection.onClose(closeHandler);
		let result = {
			listen: () => connection.listen(),
			sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
			onRequest: (type, handler) => connection.onRequest(Is.string(type) ? type : type.method, handler),
			sendNotification: (type, params) => connection.sendNotification(Is.string(type) ? type : type.method, params),
			onNotification: (type, handler) => connection.onNotification(Is.string(type) ? type : type.method, handler),
			trace: (value, tracer, sendNotificationOrTraceOptions) => {
				const defaultTraceOptions = {
					sendNotification: false,
					traceFormat: vscode_languageserver_protocol_1.TraceFormat.Text
				};
				if (sendNotificationOrTraceOptions === void 0) {
					connection.trace(value, tracer, defaultTraceOptions);
				}
				else if (Is.boolean(sendNotificationOrTraceOptions)) {
					connection.trace(value, tracer, sendNotificationOrTraceOptions);
				}
				else {
					connection.trace(value, tracer, sendNotificationOrTraceOptions);
				}
			},
			initialize: (params) => connection.sendRequest(vscode_languageserver_protocol_1.InitializeRequest.type, params),
			shutdown: () => connection.sendRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, undefined),
			exit: () => connection.sendNotification(vscode_languageserver_protocol_1.ExitNotification.type),
			onLogMessage: (handler) => connection.onNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, handler),
			onShowMessage: (handler) => connection.onNotification(vscode_languageserver_protocol_1.ShowMessageNotification.type, handler),
			onTelemetry: (handler) => connection.onNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, handler),
			didChangeConfiguration: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, params),
			didChangeWatchedFiles: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, params),
			didOpenTextDocument: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, params),
			didChangeTextDocument: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, params),
			didCloseTextDocument: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, params),
			didSaveTextDocument: (params) => connection.sendNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, params),
			onDiagnostics: (handler) => connection.onNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, handler),
			dispose: () => connection.dispose()
		};
		return result;
	}
	/**
	 * An action to be performed when the connection is producing errors.
	 */
	var ErrorAction;
	(function (ErrorAction) {
		/**
		 * Continue running the server.
		 */
		ErrorAction[ErrorAction["Continue"] = 1] = "Continue";
		/**
		 * Shutdown the server.
		 */
		ErrorAction[ErrorAction["Shutdown"] = 2] = "Shutdown";
	})(ErrorAction = exports.ErrorAction || (exports.ErrorAction = {}));
	/**
	 * An action to be performed when the connection to a server got closed.
	 */
	var CloseAction;
	(function (CloseAction) {
		/**
		 * Don't restart the server. The connection stays closed.
		 */
		CloseAction[CloseAction["DoNotRestart"] = 1] = "DoNotRestart";
		/**
		 * Restart the server.
		 */
		CloseAction[CloseAction["Restart"] = 2] = "Restart";
	})(CloseAction = exports.CloseAction || (exports.CloseAction = {}));
	class DefaultErrorHandler {
		constructor(name) {
			this.name = name;
			this.restarts = [];
		}
		error(_error, _message, count) {
			if (count && count <= 3) {
				return ErrorAction.Continue;
			}
			return ErrorAction.Shutdown;
		}
		closed() {
			this.restarts.push(Date.now());
			if (this.restarts.length < 5) {
				return CloseAction.Restart;
			}
			else {
				let diff = this.restarts[this.restarts.length - 1] - this.restarts[0];
				if (diff <= 3 * 60 * 1000) {
					vscode_1.window.showErrorMessage(`The ${this.name} server crashed 5 times in the last 3 minutes. The server will not be restarted.`);
					return CloseAction.DoNotRestart;
				}
				else {
					this.restarts.shift();
					return CloseAction.Restart;
				}
			}
		}
	}
	var RevealOutputChannelOn;
	(function (RevealOutputChannelOn) {
		RevealOutputChannelOn[RevealOutputChannelOn["Info"] = 1] = "Info";
		RevealOutputChannelOn[RevealOutputChannelOn["Warn"] = 2] = "Warn";
		RevealOutputChannelOn[RevealOutputChannelOn["Error"] = 3] = "Error";
		RevealOutputChannelOn[RevealOutputChannelOn["Never"] = 4] = "Never";
	})(RevealOutputChannelOn = exports.RevealOutputChannelOn || (exports.RevealOutputChannelOn = {}));
	var State;
	(function (State) {
		State[State["Stopped"] = 1] = "Stopped";
		State[State["Starting"] = 3] = "Starting";
		State[State["Running"] = 2] = "Running";
	})(State = exports.State || (exports.State = {}));
	var ClientState;
	(function (ClientState) {
		ClientState[ClientState["Initial"] = 0] = "Initial";
		ClientState[ClientState["Starting"] = 1] = "Starting";
		ClientState[ClientState["StartFailed"] = 2] = "StartFailed";
		ClientState[ClientState["Running"] = 3] = "Running";
		ClientState[ClientState["Stopping"] = 4] = "Stopping";
		ClientState[ClientState["Stopped"] = 5] = "Stopped";
	})(ClientState || (ClientState = {}));
	const SupportedSymbolKinds = [
		vscode_languageserver_protocol_1.SymbolKind.File,
		vscode_languageserver_protocol_1.SymbolKind.Module,
		vscode_languageserver_protocol_1.SymbolKind.Namespace,
		vscode_languageserver_protocol_1.SymbolKind.Package,
		vscode_languageserver_protocol_1.SymbolKind.Class,
		vscode_languageserver_protocol_1.SymbolKind.Method,
		vscode_languageserver_protocol_1.SymbolKind.Property,
		vscode_languageserver_protocol_1.SymbolKind.Field,
		vscode_languageserver_protocol_1.SymbolKind.Constructor,
		vscode_languageserver_protocol_1.SymbolKind.Enum,
		vscode_languageserver_protocol_1.SymbolKind.Interface,
		vscode_languageserver_protocol_1.SymbolKind.Function,
		vscode_languageserver_protocol_1.SymbolKind.Variable,
		vscode_languageserver_protocol_1.SymbolKind.Constant,
		vscode_languageserver_protocol_1.SymbolKind.String,
		vscode_languageserver_protocol_1.SymbolKind.Number,
		vscode_languageserver_protocol_1.SymbolKind.Boolean,
		vscode_languageserver_protocol_1.SymbolKind.Array,
		vscode_languageserver_protocol_1.SymbolKind.Object,
		vscode_languageserver_protocol_1.SymbolKind.Key,
		vscode_languageserver_protocol_1.SymbolKind.Null,
		vscode_languageserver_protocol_1.SymbolKind.EnumMember,
		vscode_languageserver_protocol_1.SymbolKind.Struct,
		vscode_languageserver_protocol_1.SymbolKind.Event,
		vscode_languageserver_protocol_1.SymbolKind.Operator,
		vscode_languageserver_protocol_1.SymbolKind.TypeParameter
	];
	const SupportedCompletionItemKinds = [
		vscode_languageserver_protocol_1.CompletionItemKind.Text,
		vscode_languageserver_protocol_1.CompletionItemKind.Method,
		vscode_languageserver_protocol_1.CompletionItemKind.Function,
		vscode_languageserver_protocol_1.CompletionItemKind.Constructor,
		vscode_languageserver_protocol_1.CompletionItemKind.Field,
		vscode_languageserver_protocol_1.CompletionItemKind.Variable,
		vscode_languageserver_protocol_1.CompletionItemKind.Class,
		vscode_languageserver_protocol_1.CompletionItemKind.Interface,
		vscode_languageserver_protocol_1.CompletionItemKind.Module,
		vscode_languageserver_protocol_1.CompletionItemKind.Property,
		vscode_languageserver_protocol_1.CompletionItemKind.Unit,
		vscode_languageserver_protocol_1.CompletionItemKind.Value,
		vscode_languageserver_protocol_1.CompletionItemKind.Enum,
		vscode_languageserver_protocol_1.CompletionItemKind.Keyword,
		vscode_languageserver_protocol_1.CompletionItemKind.Snippet,
		vscode_languageserver_protocol_1.CompletionItemKind.Color,
		vscode_languageserver_protocol_1.CompletionItemKind.File,
		vscode_languageserver_protocol_1.CompletionItemKind.Reference,
		vscode_languageserver_protocol_1.CompletionItemKind.Folder,
		vscode_languageserver_protocol_1.CompletionItemKind.EnumMember,
		vscode_languageserver_protocol_1.CompletionItemKind.Constant,
		vscode_languageserver_protocol_1.CompletionItemKind.Struct,
		vscode_languageserver_protocol_1.CompletionItemKind.Event,
		vscode_languageserver_protocol_1.CompletionItemKind.Operator,
		vscode_languageserver_protocol_1.CompletionItemKind.TypeParameter
	];
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	var DynamicFeature;
	(function (DynamicFeature) {
		function is(value) {
			let candidate = value;
			return candidate && Is.func(candidate.register) && Is.func(candidate.unregister) && Is.func(candidate.dispose) && candidate.messages !== void 0;
		}
		DynamicFeature.is = is;
	})(DynamicFeature || (DynamicFeature = {}));
	class DocumentNotifiactions {
		constructor(_client, _event, _type, _middleware, _createParams, _selectorFilter) {
			this._client = _client;
			this._event = _event;
			this._type = _type;
			this._middleware = _middleware;
			this._createParams = _createParams;
			this._selectorFilter = _selectorFilter;
			this._selectors = new Map();
		}
		static textDocumentFilter(selectors, textDocument) {
			for (const selector of selectors) {
				if (vscode_1.languages.match(selector, textDocument)) {
					return true;
				}
			}
			return false;
		}
		register(_message, data) {
			if (!data.registerOptions.documentSelector) {
				return;
			}
			if (!this._listener) {
				this._listener = this._event(this.callback, this);
			}
			this._selectors.set(data.id, data.registerOptions.documentSelector);
		}
		callback(data) {
			if (!this._selectorFilter || this._selectorFilter(this._selectors.values(), data)) {
				if (this._middleware) {
					this._middleware(data, (data) => this._client.sendNotification(this._type, this._createParams(data)));
				}
				else {
					this._client.sendNotification(this._type, this._createParams(data));
				}
				this.notificationSent(data);
			}
		}
		notificationSent(_data) {
		}
		unregister(id) {
			this._selectors.delete(id);
			if (this._selectors.size === 0 && this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
		dispose() {
			this._selectors.clear();
			if (this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
	}
	class DidOpenTextDocumentFeature extends DocumentNotifiactions {
		constructor(client, _syncedDocuments) {
			super(client, vscode_1.workspace.onDidOpenTextDocument, vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, client.clientOptions.middleware.didOpen, (textDocument) => client.code2ProtocolConverter.asOpenTextDocumentParams(textDocument), DocumentNotifiactions.textDocumentFilter);
			this._syncedDocuments = _syncedDocuments;
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'textDocument'), 'synchronization').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.openClose) {
				this.register(this.messages, { id: UUID.generateUuid(), registerOptions: { documentSelector: documentSelector } });
			}
		}
		register(message, data) {
			super.register(message, data);
			if (!data.registerOptions.documentSelector) {
				return;
			}
			let documentSelector = data.registerOptions.documentSelector;
			vscode_1.workspace.textDocuments.forEach((textDocument) => {
				let uri = textDocument.uri.toString();
				if (this._syncedDocuments.has(uri)) {
					return;
				}
				if (vscode_1.languages.match(documentSelector, textDocument)) {
					let middleware = this._client.clientOptions.middleware;
					let didOpen = (textDocument) => {
						this._client.sendNotification(this._type, this._createParams(textDocument));
					};
					if (middleware.didOpen) {
						middleware.didOpen(textDocument, didOpen);
					}
					else {
						didOpen(textDocument);
					}
					this._syncedDocuments.set(uri, textDocument);
				}
			});
		}
		notificationSent(textDocument) {
			super.notificationSent(textDocument);
			this._syncedDocuments.set(textDocument.uri.toString(), textDocument);
		}
	}
	class DidCloseTextDocumentFeature extends DocumentNotifiactions {
		constructor(client, _syncedDocuments) {
			super(client, vscode_1.workspace.onDidCloseTextDocument, vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, client.clientOptions.middleware.didClose, (textDocument) => client.code2ProtocolConverter.asCloseTextDocumentParams(textDocument), DocumentNotifiactions.textDocumentFilter);
			this._syncedDocuments = _syncedDocuments;
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'textDocument'), 'synchronization').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.openClose) {
				this.register(this.messages, { id: UUID.generateUuid(), registerOptions: { documentSelector: documentSelector } });
			}
		}
		notificationSent(textDocument) {
			super.notificationSent(textDocument);
			this._syncedDocuments.delete(textDocument.uri.toString());
		}
		unregister(id) {
			let selector = this._selectors.get(id);
			// The super call removed the selector from the map
			// of selectors.
			super.unregister(id);
			let selectors = this._selectors.values();
			this._syncedDocuments.forEach((textDocument) => {
				if (vscode_1.languages.match(selector, textDocument) && !this._selectorFilter(selectors, textDocument)) {
					let middleware = this._client.clientOptions.middleware;
					let didClose = (textDocument) => {
						this._client.sendNotification(this._type, this._createParams(textDocument));
					};
					this._syncedDocuments.delete(textDocument.uri.toString());
					if (middleware.didClose) {
						middleware.didClose(textDocument, didClose);
					}
					else {
						didClose(textDocument);
					}
				}
			});
		}
	}
	class DidChangeTextDocumentFeature {
		constructor(_client) {
			this._client = _client;
			this._changeData = new Map();
			this._forcingDelivery = false;
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'textDocument'), 'synchronization').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.change !== void 0 && textDocumentSyncOptions.change !== vscode_languageserver_protocol_1.TextDocumentSyncKind.None) {
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: Object.assign({}, { documentSelector: documentSelector }, { syncKind: textDocumentSyncOptions.change })
				});
			}
		}
		register(_message, data) {
			if (!data.registerOptions.documentSelector) {
				return;
			}
			if (!this._listener) {
				this._listener = vscode_1.workspace.onDidChangeTextDocument(this.callback, this);
			}
			this._changeData.set(data.id, {
				documentSelector: data.registerOptions.documentSelector,
				syncKind: data.registerOptions.syncKind
			});
		}
		callback(event) {
			// Text document changes are send for dirty changes as well. We don't
			// have dirty / undirty events in the LSP so we ignore content changes
			// with length zero.
			if (event.contentChanges.length === 0) {
				return;
			}
			for (const changeData of this._changeData.values()) {
				if (vscode_1.languages.match(changeData.documentSelector, event.document)) {
					let middleware = this._client.clientOptions.middleware;
					if (changeData.syncKind === vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental) {
						let params = this._client.code2ProtocolConverter.asChangeTextDocumentParams(event);
						if (middleware.didChange) {
							middleware.didChange(event, () => this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, params));
						}
						else {
							this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, params);
						}
					}
					else if (changeData.syncKind === vscode_languageserver_protocol_1.TextDocumentSyncKind.Full) {
						let didChange = (event) => {
							if (this._changeDelayer) {
								if (this._changeDelayer.uri !== event.document.uri.toString()) {
									// Use this force delivery to track boolean state. Otherwise we might call two times.
									this.forceDelivery();
									this._changeDelayer.uri = event.document.uri.toString();
								}
								this._changeDelayer.delayer.trigger(() => {
									this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, this._client.code2ProtocolConverter.asChangeTextDocumentParams(event.document));
								});
							}
							else {
								this._changeDelayer = {
									uri: event.document.uri.toString(),
									delayer: new async_1.Delayer(200)
								};
								this._changeDelayer.delayer.trigger(() => {
									this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, this._client.code2ProtocolConverter.asChangeTextDocumentParams(event.document));
								}, -1);
							}
						};
						if (middleware.didChange) {
							middleware.didChange(event, didChange);
						}
						else {
							didChange(event);
						}
					}
				}
			}
		}
		unregister(id) {
			this._changeData.delete(id);
			if (this._changeData.size === 0 && this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
		dispose() {
			this._changeDelayer = undefined;
			this._forcingDelivery = false;
			this._changeData.clear();
			if (this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
		forceDelivery() {
			if (this._forcingDelivery || !this._changeDelayer) {
				return;
			}
			try {
				this._forcingDelivery = true;
				this._changeDelayer.delayer.forceDelivery();
			}
			finally {
				this._forcingDelivery = false;
			}
		}
	}
	class WillSaveFeature extends DocumentNotifiactions {
		constructor(client) {
			super(client, vscode_1.workspace.onWillSaveTextDocument, vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, client.clientOptions.middleware.willSave, (willSaveEvent) => client.code2ProtocolConverter.asWillSaveTextDocumentParams(willSaveEvent), (selectors, willSaveEvent) => DocumentNotifiactions.textDocumentFilter(selectors, willSaveEvent.document));
		}
		get messages() {
			return vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type;
		}
		fillClientCapabilities(capabilities) {
			let value = ensure(ensure(capabilities, 'textDocument'), 'synchronization');
			value.willSave = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.willSave) {
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: { documentSelector: documentSelector }
				});
			}
		}
	}
	class WillSaveWaitUntilFeature {
		constructor(_client) {
			this._client = _client;
			this._selectors = new Map();
		}
		get messages() {
			return vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type;
		}
		fillClientCapabilities(capabilities) {
			let value = ensure(ensure(capabilities, 'textDocument'), 'synchronization');
			value.willSaveWaitUntil = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.willSaveWaitUntil) {
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: { documentSelector: documentSelector }
				});
			}
		}
		register(_message, data) {
			if (!data.registerOptions.documentSelector) {
				return;
			}
			if (!this._listener) {
				this._listener = vscode_1.workspace.onWillSaveTextDocument(this.callback, this);
			}
			this._selectors.set(data.id, data.registerOptions.documentSelector);
		}
		callback(event) {
			if (DocumentNotifiactions.textDocumentFilter(this._selectors.values(), event.document)) {
				let middleware = this._client.clientOptions.middleware;
				let willSaveWaitUntil = (event) => {
					return this._client.sendRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, this._client.code2ProtocolConverter.asWillSaveTextDocumentParams(event)).then((edits) => {
						let vEdits = this._client.protocol2CodeConverter.asTextEdits(edits);
						return vEdits === void 0 ? [] : vEdits;
					});
				};
				event.waitUntil(middleware.willSaveWaitUntil
					? middleware.willSaveWaitUntil(event, willSaveWaitUntil)
					: willSaveWaitUntil(event));
			}
		}
		unregister(id) {
			this._selectors.delete(id);
			if (this._selectors.size === 0 && this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
		dispose() {
			this._selectors.clear();
			if (this._listener) {
				this._listener.dispose();
				this._listener = undefined;
			}
		}
	}
	class DidSaveTextDocumentFeature extends DocumentNotifiactions {
		constructor(client) {
			super(client, vscode_1.workspace.onDidSaveTextDocument, vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, client.clientOptions.middleware.didSave, (textDocument) => client.code2ProtocolConverter.asSaveTextDocumentParams(textDocument, this._includeText), DocumentNotifiactions.textDocumentFilter);
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'textDocument'), 'synchronization').didSave = true;
		}
		initialize(capabilities, documentSelector) {
			let textDocumentSyncOptions = capabilities.resolvedTextDocumentSync;
			if (documentSelector && textDocumentSyncOptions && textDocumentSyncOptions.save) {
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: Object.assign({}, { documentSelector: documentSelector }, { includeText: !!textDocumentSyncOptions.save.includeText })
				});
			}
		}
		register(method, data) {
			this._includeText = !!data.registerOptions.includeText;
			super.register(method, data);
		}
	}
	class FileSystemWatcherFeature {
		constructor(_client, _notifyFileEvent) {
			this._client = _client;
			this._notifyFileEvent = _notifyFileEvent;
			this._watchers = new Map();
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'workspace'), 'didChangeWatchedFiles').dynamicRegistration = true;
		}
		initialize(_capabilities, _documentSelector) {
		}
		register(_method, data) {
			if (!Array.isArray(data.registerOptions.watchers)) {
				return;
			}
			let disposeables = [];
			for (let watcher of data.registerOptions.watchers) {
				if (!Is.string(watcher.globPattern)) {
					continue;
				}
				let watchCreate = true, watchChange = true, watchDelete = true;
				if (watcher.kind !== void 0 && watcher.kind !== null) {
					watchCreate = (watcher.kind & vscode_languageserver_protocol_1.WatchKind.Create) !== 0;
					watchChange = (watcher.kind & vscode_languageserver_protocol_1.WatchKind.Change) != 0;
					watchDelete = (watcher.kind & vscode_languageserver_protocol_1.WatchKind.Delete) != 0;
				}
				let fileSystemWatcher = vscode_1.workspace.createFileSystemWatcher(watcher.globPattern, !watchCreate, !watchChange, !watchDelete);
				this.hookListeners(fileSystemWatcher, watchCreate, watchChange, watchDelete);
				disposeables.push(fileSystemWatcher);
			}
			this._watchers.set(data.id, disposeables);
		}
		registerRaw(id, fileSystemWatchers) {
			let disposeables = [];
			for (let fileSystemWatcher of fileSystemWatchers) {
				this.hookListeners(fileSystemWatcher, true, true, true, disposeables);
			}
			this._watchers.set(id, disposeables);
		}
		hookListeners(fileSystemWatcher, watchCreate, watchChange, watchDelete, listeners) {
			if (watchCreate) {
				fileSystemWatcher.onDidCreate((resource) => this._notifyFileEvent({
					uri: this._client.code2ProtocolConverter.asUri(resource),
					type: vscode_languageserver_protocol_1.FileChangeType.Created
				}), null, listeners);
			}
			if (watchChange) {
				fileSystemWatcher.onDidChange((resource) => this._notifyFileEvent({
					uri: this._client.code2ProtocolConverter.asUri(resource),
					type: vscode_languageserver_protocol_1.FileChangeType.Changed
				}), null, listeners);
			}
			if (watchDelete) {
				fileSystemWatcher.onDidDelete((resource) => this._notifyFileEvent({
					uri: this._client.code2ProtocolConverter.asUri(resource),
					type: vscode_languageserver_protocol_1.FileChangeType.Deleted
				}), null, listeners);
			}
		}
		unregister(id) {
			let disposeables = this._watchers.get(id);
			if (disposeables) {
				for (let disposable of disposeables) {
					disposable.dispose();
				}
			}
		}
		dispose() {
			this._watchers.forEach((disposeables) => {
				for (let disposable of disposeables) {
					disposable.dispose();
				}
			});
			this._watchers.clear();
		}
	}
	class TextDocumentFeature {
		constructor(_client, _message) {
			this._client = _client;
			this._message = _message;
			this._providers = new Map();
		}
		get messages() {
			return this._message;
		}
		register(message, data) {
			if (message.method !== this.messages.method) {
				throw new Error(`Register called on wrong feature. Requested ${message.method} but reached feature ${this.messages.method}`);
			}
			if (!data.registerOptions.documentSelector) {
				return;
			}
			let provider = this.registerLanguageProvider(data.registerOptions);
			if (provider) {
				this._providers.set(data.id, provider);
			}
		}
		unregister(id) {
			let provider = this._providers.get(id);
			if (provider) {
				provider.dispose();
			}
		}
		dispose() {
			this._providers.forEach((value) => {
				value.dispose();
			});
			this._providers.clear();
		}
	}
	exports.TextDocumentFeature = TextDocumentFeature;
	class WorkspaceFeature {
		constructor(_client, _message) {
			this._client = _client;
			this._message = _message;
			this._providers = new Map();
		}
		get messages() {
			return this._message;
		}
		register(message, data) {
			if (message.method !== this.messages.method) {
				throw new Error(`Register called on wron feature. Requested ${message.method} but reached feature ${this.messages.method}`);
			}
			let provider = this.registerLanguageProvider(data.registerOptions);
			if (provider) {
				this._providers.set(data.id, provider);
			}
		}
		unregister(id) {
			let provider = this._providers.get(id);
			if (provider) {
				provider.dispose();
			}
		}
		dispose() {
			this._providers.forEach((value) => {
				value.dispose();
			});
			this._providers.clear();
		}
	}
	class CompletionItemFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.CompletionRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let completion = ensure(ensure(capabilites, 'textDocument'), 'completion');
			completion.dynamicRegistration = true;
			completion.contextSupport = true;
			completion.completionItem = {
				snippetSupport: true,
				commitCharactersSupport: true,
				documentationFormat: [vscode_languageserver_protocol_1.MarkupKind.Markdown, vscode_languageserver_protocol_1.MarkupKind.PlainText],
				deprecatedSupport: true,
				preselectSupport: true
			};
			completion.completionItemKind = { valueSet: SupportedCompletionItemKinds };
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.completionProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector }, capabilities.completionProvider)
			});
		}
		registerLanguageProvider(options) {
			let triggerCharacters = options.triggerCharacters || [];
			let client = this._client;
			let provideCompletionItems = (document, position, context, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.CompletionRequest.type, client.code2ProtocolConverter.asCompletionParams(document, position, context), token).then(client.protocol2CodeConverter.asCompletionResult, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.CompletionRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let resolveCompletionItem = (item, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, client.code2ProtocolConverter.asCompletionItem(item), token).then(client.protocol2CodeConverter.asCompletionItem, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, error);
					return Promise.resolve(item);
				});
			};
			let middleware = this._client.clientOptions.middleware;
			return vscode_1.languages.registerCompletionItemProvider(options.documentSelector, {
				provideCompletionItems: (document, position, token, context) => {
					return middleware.provideCompletionItem
						? middleware.provideCompletionItem(document, position, context, token, provideCompletionItems)
						: provideCompletionItems(document, position, context, token);
				},
				resolveCompletionItem: options.resolveProvider
					? (item, token) => {
						return middleware.resolveCompletionItem
							? middleware.resolveCompletionItem(item, token, resolveCompletionItem)
							: resolveCompletionItem(item, token);
					}
					: undefined
			}, ...triggerCharacters);
		}
	}
	class HoverFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.HoverRequest.type);
		}
		fillClientCapabilities(capabilites) {
			const hoverCapability = (ensure(ensure(capabilites, 'textDocument'), 'hover'));
			hoverCapability.dynamicRegistration = true;
			hoverCapability.contentFormat = [vscode_languageserver_protocol_1.MarkupKind.Markdown, vscode_languageserver_protocol_1.MarkupKind.PlainText];
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.hoverProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideHover = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.HoverRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asHover, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.HoverRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerHoverProvider(options.documentSelector, {
				provideHover: (document, position, token) => {
					return middleware.provideHover
						? middleware.provideHover(document, position, token, provideHover)
						: provideHover(document, position, token);
				}
			});
		}
	}
	class SignatureHelpFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.SignatureHelpRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let config = ensure(ensure(capabilites, 'textDocument'), 'signatureHelp');
			config.dynamicRegistration = true;
			config.signatureInformation = { documentationFormat: [vscode_languageserver_protocol_1.MarkupKind.Markdown, vscode_languageserver_protocol_1.MarkupKind.PlainText] };
			config.signatureInformation.parameterInformation = { labelOffsetSupport: true };
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.signatureHelpProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector }, capabilities.signatureHelpProvider)
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let providerSignatureHelp = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asSignatureHelp, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			let triggerCharacters = options.triggerCharacters || [];
			return vscode_1.languages.registerSignatureHelpProvider(options.documentSelector, {
				provideSignatureHelp: (document, position, token) => {
					return middleware.provideSignatureHelp
						? middleware.provideSignatureHelp(document, position, token, providerSignatureHelp)
						: providerSignatureHelp(document, position, token);
				}
			}, ...triggerCharacters);
		}
	}
	class DefinitionFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DefinitionRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let definitionSupport = ensure(ensure(capabilites, 'textDocument'), 'definition');
			definitionSupport.dynamicRegistration = true;
			definitionSupport.linkSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.definitionProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDefinition = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asDefinitionResult, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDefinitionProvider(options.documentSelector, {
				provideDefinition: (document, position, token) => {
					return middleware.provideDefinition
						? middleware.provideDefinition(document, position, token, provideDefinition)
						: provideDefinition(document, position, token);
				}
			});
		}
	}
	class ReferencesFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.ReferencesRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'references').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.referencesProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let providerReferences = (document, position, options, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, client.code2ProtocolConverter.asReferenceParams(document, position, options), token).then(client.protocol2CodeConverter.asReferences, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerReferenceProvider(options.documentSelector, {
				provideReferences: (document, position, options, token) => {
					return middleware.provideReferences
						? middleware.provideReferences(document, position, options, token, providerReferences)
						: providerReferences(document, position, options, token);
				}
			});
		}
	}
	class DocumentHighlightFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentHighlightRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'documentHighlight').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentHighlightProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDocumentHighlights = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asDocumentHighlights, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDocumentHighlightProvider(options.documentSelector, {
				provideDocumentHighlights: (document, position, token) => {
					return middleware.provideDocumentHighlights
						? middleware.provideDocumentHighlights(document, position, token, provideDocumentHighlights)
						: provideDocumentHighlights(document, position, token);
				}
			});
		}
	}
	class DocumentSymbolFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentSymbolRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let symbolCapabilities = ensure(ensure(capabilites, 'textDocument'), 'documentSymbol');
			symbolCapabilities.dynamicRegistration = true;
			symbolCapabilities.symbolKind = {
				valueSet: SupportedSymbolKinds
			};
			symbolCapabilities.hierarchicalDocumentSymbolSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentSymbolProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDocumentSymbols = (document, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, client.code2ProtocolConverter.asDocumentSymbolParams(document), token).then((data) => {
					if (data === null) {
						return undefined;
					}
					if (data.length === 0) {
						return [];
					}
					else {
						let element = data[0];
						if (vscode_languageserver_protocol_1.DocumentSymbol.is(element)) {
							return client.protocol2CodeConverter.asDocumentSymbols(data);
						}
						else {
							return client.protocol2CodeConverter.asSymbolInformations(data);
						}
					}
				}, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDocumentSymbolProvider(options.documentSelector, {
				provideDocumentSymbols: (document, token) => {
					return middleware.provideDocumentSymbols
						? middleware.provideDocumentSymbols(document, token, provideDocumentSymbols)
						: provideDocumentSymbols(document, token);
				}
			});
		}
	}
	class WorkspaceSymbolFeature extends WorkspaceFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let symbolCapabilities = ensure(ensure(capabilites, 'workspace'), 'symbol');
			symbolCapabilities.dynamicRegistration = true;
			symbolCapabilities.symbolKind = {
				valueSet: SupportedSymbolKinds
			};
		}
		initialize(capabilities) {
			if (!capabilities.workspaceSymbolProvider) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: undefined
			});
		}
		registerLanguageProvider(_options) {
			let client = this._client;
			let provideWorkspaceSymbols = (query, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, { query }, token).then(client.protocol2CodeConverter.asSymbolInformations, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerWorkspaceSymbolProvider({
				provideWorkspaceSymbols: (query, token) => {
					return middleware.provideWorkspaceSymbols
						? middleware.provideWorkspaceSymbols(query, token, provideWorkspaceSymbols)
						: provideWorkspaceSymbols(query, token);
				}
			});
		}
	}
	class CodeActionFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.CodeActionRequest.type);
		}
		fillClientCapabilities(capabilites) {
			const cap = ensure(ensure(capabilites, 'textDocument'), 'codeAction');
			cap.dynamicRegistration = true;
			cap.codeActionLiteralSupport = {
				codeActionKind: {
					valueSet: [
						'',
						vscode_languageserver_protocol_1.CodeActionKind.QuickFix,
						vscode_languageserver_protocol_1.CodeActionKind.Refactor,
						vscode_languageserver_protocol_1.CodeActionKind.RefactorExtract,
						vscode_languageserver_protocol_1.CodeActionKind.RefactorInline,
						vscode_languageserver_protocol_1.CodeActionKind.RefactorRewrite,
						vscode_languageserver_protocol_1.CodeActionKind.Source,
						vscode_languageserver_protocol_1.CodeActionKind.SourceOrganizeImports
					]
				}
			};
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.codeActionProvider || !documentSelector) {
				return;
			}
			let codeActionKinds = undefined;
			if (!Is.boolean(capabilities.codeActionProvider)) {
				codeActionKinds = capabilities.codeActionProvider.codeActionKinds;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: { documentSelector: documentSelector, codeActionKinds }
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideCodeActions = (document, range, context, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					range: client.code2ProtocolConverter.asRange(range),
					context: client.code2ProtocolConverter.asCodeActionContext(context)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, params, token).then((values) => {
					if (values === null) {
						return undefined;
					}
					let result = [];
					for (let item of values) {
						if (vscode_languageserver_protocol_1.Command.is(item)) {
							result.push(client.protocol2CodeConverter.asCommand(item));
						}
						else {
							result.push(client.protocol2CodeConverter.asCodeAction(item));
						}
						;
					}
					return result;
				}, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerCodeActionsProvider(options.documentSelector, {
				provideCodeActions: (document, range, context, token) => {
					return middleware.provideCodeActions
						? middleware.provideCodeActions(document, range, context, token, provideCodeActions)
						: provideCodeActions(document, range, context, token);
				}
			}, options.codeActionKinds
				? { providedCodeActionKinds: client.protocol2CodeConverter.asCodeActionKinds(options.codeActionKinds) }
				: undefined);
		}
	}
	class CodeLensFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.CodeLensRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'codeLens').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.codeLensProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector }, capabilities.codeLensProvider)
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideCodeLenses = (document, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, client.code2ProtocolConverter.asCodeLensParams(document), token).then(client.protocol2CodeConverter.asCodeLenses, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let resolveCodeLens = (codeLens, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, client.code2ProtocolConverter.asCodeLens(codeLens), token).then(client.protocol2CodeConverter.asCodeLens, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, error);
					return codeLens;
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerCodeLensProvider(options.documentSelector, {
				provideCodeLenses: (document, token) => {
					return middleware.provideCodeLenses
						? middleware.provideCodeLenses(document, token, provideCodeLenses)
						: provideCodeLenses(document, token);
				},
				resolveCodeLens: (options.resolveProvider)
					? (codeLens, token) => {
						return middleware.resolveCodeLens
							? middleware.resolveCodeLens(codeLens, token, resolveCodeLens)
							: resolveCodeLens(codeLens, token);
					}
					: undefined
			});
		}
	}
	class DocumentFormattingFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentFormattingRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'formatting').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentFormattingProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDocumentFormattingEdits = (document, options, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					options: client.code2ProtocolConverter.asFormattingOptions(options)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, params, token).then(client.protocol2CodeConverter.asTextEdits, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDocumentFormattingEditProvider(options.documentSelector, {
				provideDocumentFormattingEdits: (document, options, token) => {
					return middleware.provideDocumentFormattingEdits
						? middleware.provideDocumentFormattingEdits(document, options, token, provideDocumentFormattingEdits)
						: provideDocumentFormattingEdits(document, options, token);
				}
			});
		}
	}
	class DocumentRangeFormattingFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'rangeFormatting').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentRangeFormattingProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector })
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDocumentRangeFormattingEdits = (document, range, options, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					range: client.code2ProtocolConverter.asRange(range),
					options: client.code2ProtocolConverter.asFormattingOptions(options)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, params, token).then(client.protocol2CodeConverter.asTextEdits, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDocumentRangeFormattingEditProvider(options.documentSelector, {
				provideDocumentRangeFormattingEdits: (document, range, options, token) => {
					return middleware.provideDocumentRangeFormattingEdits
						? middleware.provideDocumentRangeFormattingEdits(document, range, options, token, provideDocumentRangeFormattingEdits)
						: provideDocumentRangeFormattingEdits(document, range, options, token);
				}
			});
		}
	}
	class DocumentOnTypeFormattingFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'onTypeFormatting').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentOnTypeFormattingProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector }, capabilities.documentOnTypeFormattingProvider)
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let moreTriggerCharacter = options.moreTriggerCharacter || [];
			let provideOnTypeFormattingEdits = (document, position, ch, options, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					position: client.code2ProtocolConverter.asPosition(position),
					ch: ch,
					options: client.code2ProtocolConverter.asFormattingOptions(options)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, params, token).then(client.protocol2CodeConverter.asTextEdits, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, error);
					return Promise.resolve([]);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerOnTypeFormattingEditProvider(options.documentSelector, {
				provideOnTypeFormattingEdits: (document, position, ch, options, token) => {
					return middleware.provideOnTypeFormattingEdits
						? middleware.provideOnTypeFormattingEdits(document, position, ch, options, token, provideOnTypeFormattingEdits)
						: provideOnTypeFormattingEdits(document, position, ch, options, token);
				}
			}, options.firstTriggerCharacter, ...moreTriggerCharacter);
		}
	}
	class RenameFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.RenameRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let rename = ensure(ensure(capabilites, 'textDocument'), 'rename');
			rename.dynamicRegistration = true;
			rename.prepareSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.renameProvider || !documentSelector) {
				return;
			}
			let options = Object.assign({}, { documentSelector: documentSelector });
			if (Is.boolean(capabilities.renameProvider)) {
				options.prepareProvider = false;
			}
			else {
				options.prepareProvider = capabilities.renameProvider.prepareProvider;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: options
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideRenameEdits = (document, position, newName, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					position: client.code2ProtocolConverter.asPosition(position),
					newName: newName
				};
				return client.sendRequest(vscode_languageserver_protocol_1.RenameRequest.type, params, token).then(client.protocol2CodeConverter.asWorkspaceEdit, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.RenameRequest.type, error);
					return Promise.reject(new Error(error.message));
				});
			};
			let prepareRename = (document, position, token) => {
				let params = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
					position: client.code2ProtocolConverter.asPosition(position),
				};
				return client.sendRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, params, token).then((result) => {
					if (vscode_languageserver_protocol_1.Range.is(result)) {
						return client.protocol2CodeConverter.asRange(result);
					}
					else if (result && result.range) {
						return {
							range: client.protocol2CodeConverter.asRange(result.range),
							placeholder: result.placeholder
						};
					}
					return null;
				}, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, error);
					return Promise.reject(new Error(error.message));
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerRenameProvider(options.documentSelector, {
				provideRenameEdits: (document, position, newName, token) => {
					return middleware.provideRenameEdits
						? middleware.provideRenameEdits(document, position, newName, token, provideRenameEdits)
						: provideRenameEdits(document, position, newName, token);
				},
				prepareRename: options.prepareProvider
					? (document, position, token) => {
						return middleware.prepareRename
							? middleware.prepareRename(document, position, token, prepareRename)
							: prepareRename(document, position, token);
					}
					: undefined
			});
		}
	}
	class DocumentLinkFeature extends TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentLinkRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'documentLink').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.documentLinkProvider || !documentSelector) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, { documentSelector: documentSelector }, capabilities.documentLinkProvider)
			});
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDocumentLinks = (document, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, client.code2ProtocolConverter.asDocumentLinkParams(document), token).then(client.protocol2CodeConverter.asDocumentLinks, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, error);
					Promise.resolve(new Error(error.message));
				});
			};
			let resolveDocumentLink = (link, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, client.code2ProtocolConverter.asDocumentLink(link), token).then(client.protocol2CodeConverter.asDocumentLink, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, error);
					Promise.resolve(new Error(error.message));
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDocumentLinkProvider(options.documentSelector, {
				provideDocumentLinks: (document, token) => {
					return middleware.provideDocumentLinks
						? middleware.provideDocumentLinks(document, token, provideDocumentLinks)
						: provideDocumentLinks(document, token);
				},
				resolveDocumentLink: options.resolveProvider
					? (link, token) => {
						return middleware.resolveDocumentLink
							? middleware.resolveDocumentLink(link, token, resolveDocumentLink)
							: resolveDocumentLink(link, token);
					}
					: undefined
			});
		}
	}
	class ConfigurationFeature {
		constructor(_client) {
			this._client = _client;
			this._listeners = new Map();
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'workspace'), 'didChangeConfiguration').dynamicRegistration = true;
		}
		initialize() {
			let section = this._client.clientOptions.synchronize.configurationSection;
			if (section !== void 0) {
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: {
						section: section
					}
				});
			}
		}
		register(_message, data) {
			let disposable = vscode_1.workspace.onDidChangeConfiguration((event) => {
				this.onDidChangeConfiguration(data.registerOptions.section, event);
			});
			this._listeners.set(data.id, disposable);
			if (data.registerOptions.section !== void 0) {
				this.onDidChangeConfiguration(data.registerOptions.section, undefined);
			}
		}
		unregister(id) {
			let disposable = this._listeners.get(id);
			if (disposable) {
				this._listeners.delete(id);
				disposable.dispose();
			}
		}
		dispose() {
			for (let disposable of this._listeners.values()) {
				disposable.dispose();
			}
			this._listeners.clear();
		}
		onDidChangeConfiguration(configurationSection, event) {
			let sections;
			if (Is.string(configurationSection)) {
				sections = [configurationSection];
			}
			else {
				sections = configurationSection;
			}
			if (sections !== void 0 && event !== void 0) {
				let affected = sections.some((section) => event.affectsConfiguration(section));
				if (!affected) {
					return;
				}
			}
			let didChangeConfiguration = (sections) => {
				if (sections === void 0) {
					this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, { settings: null });
					return;
				}
				this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, { settings: this.extractSettingsInformation(sections) });
			};
			let middleware = this.getMiddleware();
			middleware
				? middleware(sections, didChangeConfiguration)
				: didChangeConfiguration(sections);
		}
		extractSettingsInformation(keys) {
			function ensurePath(config, path) {
				let current = config;
				for (let i = 0; i < path.length - 1; i++) {
					let obj = current[path[i]];
					if (!obj) {
						obj = Object.create(null);
						current[path[i]] = obj;
					}
					current = obj;
				}
				return current;
			}
			let resource = this._client.clientOptions.workspaceFolder
				? this._client.clientOptions.workspaceFolder.uri
				: undefined;
			let result = Object.create(null);
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i];
				let index = key.indexOf('.');
				let config = null;
				if (index >= 0) {
					config = vscode_1.workspace.getConfiguration(key.substr(0, index), resource).get(key.substr(index + 1));
				}
				else {
					config = vscode_1.workspace.getConfiguration(key, resource);
				}
				if (config) {
					let path = keys[i].split('.');
					ensurePath(result, path)[path[path.length - 1]] = config;
				}
			}
			return result;
		}
		getMiddleware() {
			let middleware = this._client.clientOptions.middleware;
			if (middleware.workspace && middleware.workspace.didChangeConfiguration) {
				return middleware.workspace.didChangeConfiguration;
			}
			else {
				return undefined;
			}
		}
	}
	class ExecuteCommandFeature {
		constructor(_client) {
			this._client = _client;
			this._commands = new Map();
		}
		get messages() {
			return vscode_languageserver_protocol_1.ExecuteCommandRequest.type;
		}
		fillClientCapabilities(capabilities) {
			ensure(ensure(capabilities, 'workspace'), 'executeCommand').dynamicRegistration = true;
		}
		initialize(capabilities) {
			if (!capabilities.executeCommandProvider) {
				return;
			}
			this.register(this.messages, {
				id: UUID.generateUuid(),
				registerOptions: Object.assign({}, capabilities.executeCommandProvider)
			});
		}
		register(_message, data) {
			let client = this._client;
			if (data.registerOptions.commands) {
				let disposeables = [];
				for (const command of data.registerOptions.commands) {
					disposeables.push(vscode_1.commands.registerCommand(command, (...args) => {
						let params = {
							command,
							arguments: args
						};
						return client.sendRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, params).then(undefined, (error) => {
							client.logFailedRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, error);
						});
					}));
				}
				this._commands.set(data.id, disposeables);
			}
		}
		unregister(id) {
			let disposeables = this._commands.get(id);
			if (disposeables) {
				disposeables.forEach(disposable => disposable.dispose());
			}
		}
		dispose() {
			this._commands.forEach((value) => {
				value.forEach(disposable => disposable.dispose());
			});
			this._commands.clear();
		}
	}
	var MessageTransports;
	(function (MessageTransports) {
		function is(value) {
			let candidate = value;
			return candidate && vscode_languageserver_protocol_1.MessageReader.is(value.reader) && vscode_languageserver_protocol_1.MessageWriter.is(value.writer);
		}
		MessageTransports.is = is;
	})(MessageTransports = exports.MessageTransports || (exports.MessageTransports = {}));
	class OnReady {
		constructor(_resolve, _reject) {
			this._resolve = _resolve;
			this._reject = _reject;
			this._used = false;
		}
		get isUsed() {
			return this._used;
		}
		resolve() {
			this._used = true;
			this._resolve();
		}
		reject(error) {
			this._used = true;
			this._reject(error);
		}
	}
	class BaseLanguageClient {
		constructor(id, name, clientOptions) {
			this._traceFormat = vscode_languageserver_protocol_1.TraceFormat.Text;
			this._features = [];
			this._method2Message = new Map();
			this._dynamicFeatures = new Map();
			this._id = id;
			this._name = name;
			clientOptions = clientOptions || {};
			this._clientOptions = {
				documentSelector: clientOptions.documentSelector || [],
				synchronize: clientOptions.synchronize || {},
				diagnosticCollectionName: clientOptions.diagnosticCollectionName,
				outputChannelName: clientOptions.outputChannelName || this._name,
				revealOutputChannelOn: clientOptions.revealOutputChannelOn || RevealOutputChannelOn.Error,
				stdioEncoding: clientOptions.stdioEncoding || 'utf8',
				initializationOptions: clientOptions.initializationOptions,
				initializationFailedHandler: clientOptions.initializationFailedHandler,
				errorHandler: clientOptions.errorHandler || new DefaultErrorHandler(this._name),
				middleware: clientOptions.middleware || {},
				uriConverters: clientOptions.uriConverters,
				workspaceFolder: clientOptions.workspaceFolder
			};
			this._clientOptions.synchronize = this._clientOptions.synchronize || {};
			this.state = ClientState.Initial;
			this._connectionPromise = undefined;
			this._resolvedConnection = undefined;
			this._initializeResult = undefined;
			if (clientOptions.outputChannel) {
				this._outputChannel = clientOptions.outputChannel;
				this._disposeOutputChannel = false;
			}
			else {
				this._outputChannel = undefined;
				this._disposeOutputChannel = true;
			}
			this._listeners = undefined;
			this._providers = undefined;
			this._diagnostics = undefined;
			this._fileEvents = [];
			this._fileEventDelayer = new async_1.Delayer(250);
			this._onReady = new Promise((resolve, reject) => {
				this._onReadyCallbacks = new OnReady(resolve, reject);
			});
			this._onStop = undefined;
			this._telemetryEmitter = new vscode_languageserver_protocol_1.Emitter();
			this._stateChangeEmitter = new vscode_languageserver_protocol_1.Emitter();
			this._tracer = {
				log: (messageOrDataObject, data) => {
					if (Is.string(messageOrDataObject)) {
						this.logTrace(messageOrDataObject, data);
					}
					else {
						this.logObjectTrace(messageOrDataObject);
					}
				},
			};
			this._c2p = c2p.createConverter(clientOptions.uriConverters ? clientOptions.uriConverters.code2Protocol : undefined);
			this._p2c = p2c.createConverter(clientOptions.uriConverters ? clientOptions.uriConverters.protocol2Code : undefined);
			this._syncedDocuments = new Map();
			this.registerBuiltinFeatures();
		}
		get state() {
			return this._state;
		}
		set state(value) {
			let oldState = this.getPublicState();
			this._state = value;
			let newState = this.getPublicState();
			if (newState !== oldState) {
				this._stateChangeEmitter.fire({ oldState, newState });
			}
		}
		getPublicState() {
			if (this.state === ClientState.Running) {
				return State.Running;
			}
			else if (this.state === ClientState.Starting) {
				return State.Starting;
			}
			else {
				return State.Stopped;
			}
		}
		get initializeResult() {
			return this._initializeResult;
		}
		sendRequest(type, ...params) {
			if (!this.isConnectionActive()) {
				throw new Error('Language client is not ready yet');
			}
			this.forceDocumentSync();
			try {
				return this._resolvedConnection.sendRequest(type, ...params);
			}
			catch (error) {
				this.error(`Sending request ${Is.string(type) ? type : type.method} failed.`, error);
				throw error;
			}
		}
		onRequest(type, handler) {
			if (!this.isConnectionActive()) {
				throw new Error('Language client is not ready yet');
			}
			try {
				this._resolvedConnection.onRequest(type, handler);
			}
			catch (error) {
				this.error(`Registering request handler ${Is.string(type) ? type : type.method} failed.`, error);
				throw error;
			}
		}
		sendNotification(type, params) {
			if (!this.isConnectionActive()) {
				throw new Error('Language client is not ready yet');
			}
			this.forceDocumentSync();
			try {
				this._resolvedConnection.sendNotification(type, params);
			}
			catch (error) {
				this.error(`Sending notification ${Is.string(type) ? type : type.method} failed.`, error);
				throw error;
			}
		}
		onNotification(type, handler) {
			if (!this.isConnectionActive()) {
				throw new Error('Language client is not ready yet');
			}
			try {
				this._resolvedConnection.onNotification(type, handler);
			}
			catch (error) {
				this.error(`Registering notification handler ${Is.string(type) ? type : type.method} failed.`, error);
				throw error;
			}
		}
		get clientOptions() {
			return this._clientOptions;
		}
		get protocol2CodeConverter() {
			return this._p2c;
		}
		get code2ProtocolConverter() {
			return this._c2p;
		}
		get onTelemetry() {
			return this._telemetryEmitter.event;
		}
		get onDidChangeState() {
			return this._stateChangeEmitter.event;
		}
		get outputChannel() {
			if (!this._outputChannel) {
				this._outputChannel = vscode_1.window.createOutputChannel(this._clientOptions.outputChannelName ? this._clientOptions.outputChannelName : this._name);
			}
			return this._outputChannel;
		}
		get diagnostics() {
			return this._diagnostics;
		}
		createDefaultErrorHandler() {
			return new DefaultErrorHandler(this._name);
		}
		set trace(value) {
			this._trace = value;
			this.onReady().then(() => {
				this.resolveConnection().then((connection) => {
					connection.trace(this._trace, this._tracer, {
						sendNotification: false,
						traceFormat: this._traceFormat
					});
				});
			}, () => {
			});
		}
		data2String(data) {
			if (data instanceof vscode_languageserver_protocol_1.ResponseError) {
				const responseError = data;
				return `  Message: ${responseError.message}\n  Code: ${responseError.code} ${responseError.data ? '\n' + responseError.data.toString() : ''}`;
			}
			if (data instanceof Error) {
				if (Is.string(data.stack)) {
					return data.stack;
				}
				return data.message;
			}
			if (Is.string(data)) {
				return data;
			}
			return data.toString();
		}
		info(message, data) {
			this.outputChannel.appendLine(`[Info  - ${(new Date().toLocaleTimeString())}] ${message}`);
			if (data) {
				this.outputChannel.appendLine(this.data2String(data));
			}
			if (this._clientOptions.revealOutputChannelOn <= RevealOutputChannelOn.Info) {
				this.outputChannel.show(true);
			}
		}
		warn(message, data) {
			this.outputChannel.appendLine(`[Warn  - ${(new Date().toLocaleTimeString())}] ${message}`);
			if (data) {
				this.outputChannel.appendLine(this.data2String(data));
			}
			if (this._clientOptions.revealOutputChannelOn <= RevealOutputChannelOn.Warn) {
				this.outputChannel.show(true);
			}
		}
		error(message, data) {
			this.outputChannel.appendLine(`[Error - ${(new Date().toLocaleTimeString())}] ${message}`);
			if (data) {
				this.outputChannel.appendLine(this.data2String(data));
			}
			if (this._clientOptions.revealOutputChannelOn <= RevealOutputChannelOn.Error) {
				this.outputChannel.show(true);
			}
		}
		logTrace(message, data) {
			this.outputChannel.appendLine(`[Trace - ${(new Date().toLocaleTimeString())}] ${message}`);
			if (data) {
				this.outputChannel.appendLine(this.data2String(data));
			}
		}
		logObjectTrace(data) {
			if (data.isLSPMessage && data.type) {
				this.outputChannel.append(`[LSP   - ${(new Date().toLocaleTimeString())}] `);
			}
			else {
				this.outputChannel.append(`[Trace - ${(new Date().toLocaleTimeString())}] `);
			}
			if (data) {
				this.outputChannel.appendLine(`${JSON.stringify(data)}`);
			}
		}
		needsStart() {
			return this.state === ClientState.Initial || this.state === ClientState.Stopping || this.state === ClientState.Stopped;
		}
		needsStop() {
			return this.state === ClientState.Starting || this.state === ClientState.Running;
		}
		onReady() {
			return this._onReady;
		}
		isConnectionActive() {
			return this.state === ClientState.Running && !!this._resolvedConnection;
		}
		start() {
			if (this._onReadyCallbacks.isUsed) {
				this._onReady = new Promise((resolve, reject) => {
					this._onReadyCallbacks = new OnReady(resolve, reject);
				});
			}
			this._listeners = [];
			this._providers = [];
			// If we restart then the diagnostics collection is reused.
			if (!this._diagnostics) {
				this._diagnostics = this._clientOptions.diagnosticCollectionName
					? vscode_1.languages.createDiagnosticCollection(this._clientOptions.diagnosticCollectionName)
					: vscode_1.languages.createDiagnosticCollection();
			}
			this.state = ClientState.Starting;
			this.resolveConnection().then((connection) => {
				connection.onLogMessage((message) => {
					switch (message.type) {
						case vscode_languageserver_protocol_1.MessageType.Error:
							this.error(message.message);
							break;
						case vscode_languageserver_protocol_1.MessageType.Warning:
							this.warn(message.message);
							break;
						case vscode_languageserver_protocol_1.MessageType.Info:
							this.info(message.message);
							break;
						default:
							this.outputChannel.appendLine(message.message);
					}
				});
				connection.onShowMessage((message) => {
					switch (message.type) {
						case vscode_languageserver_protocol_1.MessageType.Error:
							vscode_1.window.showErrorMessage(message.message);
							break;
						case vscode_languageserver_protocol_1.MessageType.Warning:
							vscode_1.window.showWarningMessage(message.message);
							break;
						case vscode_languageserver_protocol_1.MessageType.Info:
							vscode_1.window.showInformationMessage(message.message);
							break;
						default:
							vscode_1.window.showInformationMessage(message.message);
					}
				});
				connection.onRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, (params) => {
					let messageFunc;
					switch (params.type) {
						case vscode_languageserver_protocol_1.MessageType.Error:
							messageFunc = vscode_1.window.showErrorMessage;
							break;
						case vscode_languageserver_protocol_1.MessageType.Warning:
							messageFunc = vscode_1.window.showWarningMessage;
							break;
						case vscode_languageserver_protocol_1.MessageType.Info:
							messageFunc = vscode_1.window.showInformationMessage;
							break;
						default:
							messageFunc = vscode_1.window.showInformationMessage;
					}
					let actions = params.actions || [];
					return messageFunc(params.message, ...actions);
				});
				connection.onTelemetry((data) => {
					this._telemetryEmitter.fire(data);
				});
				connection.listen();
				// Error is handled in the initialize call.
				return this.initialize(connection);
			}).then(undefined, (error) => {
				this.state = ClientState.StartFailed;
				this._onReadyCallbacks.reject(error);
				this.error('Starting client failed', error);
				vscode_1.window.showErrorMessage(`Couldn't start client ${this._name}`);
			});
			return new vscode_1.Disposable(() => {
				if (this.needsStop()) {
					this.stop();
				}
			});
		}
		resolveConnection() {
			if (!this._connectionPromise) {
				this._connectionPromise = this.createConnection();
			}
			return this._connectionPromise;
		}
		initialize(connection) {
			this.refreshTrace(connection, false);
			let initOption = this._clientOptions.initializationOptions;
			let rootPath = this._clientOptions.workspaceFolder
				? this._clientOptions.workspaceFolder.uri.fsPath
				: this._clientGetRootPath();
			let initParams = {
				processId: process.pid,
				rootPath: rootPath ? rootPath : null,
				rootUri: rootPath ? this._c2p.asUri(vscode_1.Uri.file(rootPath)) : null,
				capabilities: this.computeClientCapabilities(),
				initializationOptions: Is.func(initOption) ? initOption() : initOption,
				trace: vscode_languageserver_protocol_1.Trace.toString(this._trace),
				workspaceFolders: null
			};
			this.fillInitializeParams(initParams);
			return connection.initialize(initParams).then((result) => {
				this._resolvedConnection = connection;
				this._initializeResult = result;
				this.state = ClientState.Running;
				let textDocumentSyncOptions = undefined;
				if (Is.number(result.capabilities.textDocumentSync)) {
					if (result.capabilities.textDocumentSync === vscode_languageserver_protocol_1.TextDocumentSyncKind.None) {
						textDocumentSyncOptions = {
							openClose: false,
							change: vscode_languageserver_protocol_1.TextDocumentSyncKind.None,
							save: undefined
						};
					}
					else {
						textDocumentSyncOptions = {
							openClose: true,
							change: result.capabilities.textDocumentSync,
							save: {
								includeText: false
							}
						};
					}
				}
				else if (result.capabilities.textDocumentSync !== void 0 && result.capabilities.textDocumentSync !== null) {
					textDocumentSyncOptions = result.capabilities.textDocumentSync;
				}
				this._capabilities = Object.assign({}, result.capabilities, { resolvedTextDocumentSync: textDocumentSyncOptions });
				connection.onDiagnostics(params => this.handleDiagnostics(params));
				connection.onRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params => this.handleRegistrationRequest(params));
				// See https://github.com/Microsoft/vscode-languageserver-node/issues/199
				connection.onRequest('client/registerFeature', params => this.handleRegistrationRequest(params));
				connection.onRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params => this.handleUnregistrationRequest(params));
				// See https://github.com/Microsoft/vscode-languageserver-node/issues/199
				connection.onRequest('client/unregisterFeature', params => this.handleUnregistrationRequest(params));
				connection.onRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params => this.handleApplyWorkspaceEdit(params));
				connection.sendNotification(vscode_languageserver_protocol_1.InitializedNotification.type, {});
				this.hookFileEvents(connection);
				this.hookConfigurationChanged(connection);
				this.initializeFeatures(connection);
				this._onReadyCallbacks.resolve();
				return result;
			}).then(undefined, (error) => {
				if (this._clientOptions.initializationFailedHandler) {
					if (this._clientOptions.initializationFailedHandler(error)) {
						this.initialize(connection);
					}
					else {
						this.stop();
						this._onReadyCallbacks.reject(error);
					}
				}
				else if (error instanceof vscode_languageserver_protocol_1.ResponseError && error.data && error.data.retry) {
					vscode_1.window.showErrorMessage(error.message, { title: 'Retry', id: "retry" }).then(item => {
						if (item && item.id === 'retry') {
							this.initialize(connection);
						}
						else {
							this.stop();
							this._onReadyCallbacks.reject(error);
						}
					});
				}
				else {
					if (error && error.message) {
						vscode_1.window.showErrorMessage(error.message);
					}
					this.error('Server initialization failed.', error);
					this.stop();
					this._onReadyCallbacks.reject(error);
				}
			});
		}
		_clientGetRootPath() {
			let folders = vscode_1.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				return undefined;
			}
			let folder = folders[0];
			if (folder.uri.scheme === 'file') {
				return folder.uri.fsPath;
			}
			return undefined;
		}
		stop() {
			this._initializeResult = undefined;
			if (!this._connectionPromise) {
				this.state = ClientState.Stopped;
				return Promise.resolve();
			}
			if (this.state === ClientState.Stopping && this._onStop) {
				return this._onStop;
			}
			this.state = ClientState.Stopping;
			this.cleanUp();
			// unhook listeners
			return this._onStop = this.resolveConnection().then(connection => {
				return connection.shutdown().then(() => {
					connection.exit();
					connection.dispose();
					this.state = ClientState.Stopped;
					this._onStop = undefined;
					this._connectionPromise = undefined;
					this._resolvedConnection = undefined;
				});
			});
		}
		cleanUp(channel = true, diagnostics = true) {
			if (this._listeners) {
				this._listeners.forEach(listener => listener.dispose());
				this._listeners = undefined;
			}
			if (this._providers) {
				this._providers.forEach(provider => provider.dispose());
				this._providers = undefined;
			}
			if (this._syncedDocuments) {
				this._syncedDocuments.clear();
			}
			for (let handler of this._dynamicFeatures.values()) {
				handler.dispose();
			}
			if (channel && this._outputChannel && this._disposeOutputChannel) {
				this._outputChannel.dispose();
				this._outputChannel = undefined;
			}
			if (diagnostics && this._diagnostics) {
				this._diagnostics.dispose();
				this._diagnostics = undefined;
			}
		}
		notifyFileEvent(event) {
			this._fileEvents.push(event);
			this._fileEventDelayer.trigger(() => {
				this.onReady().then(() => {
					this.resolveConnection().then(connection => {
						if (this.isConnectionActive()) {
							connection.didChangeWatchedFiles({ changes: this._fileEvents });
						}
						this._fileEvents = [];
					});
				}, (error) => {
					this.error(`Notify file events failed.`, error);
				});
			});
		}
		forceDocumentSync() {
			this._dynamicFeatures.get(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type.method).forceDelivery();
		}
		handleDiagnostics(params) {
			if (!this._diagnostics) {
				return;
			}
			let uri = this._p2c.asUri(params.uri);
			let diagnostics = this._p2c.asDiagnostics(params.diagnostics);
			let middleware = this.clientOptions.middleware.handleDiagnostics;
			if (middleware) {
				middleware(uri, diagnostics, (uri, diagnostics) => this.setDiagnostics(uri, diagnostics));
			}
			else {
				this.setDiagnostics(uri, diagnostics);
			}
		}
		setDiagnostics(uri, diagnostics) {
			if (!this._diagnostics) {
				return;
			}
			this._diagnostics.set(uri, diagnostics);
		}
		createConnection() {
			let errorHandler = (error, message, count) => {
				this.handleConnectionError(error, message, count);
			};
			let closeHandler = () => {
				this.handleConnectionClosed();
			};
			return this.createMessageTransports(this._clientOptions.stdioEncoding || 'utf8').then((transports) => {
				return createConnection(transports.reader, transports.writer, errorHandler, closeHandler);
			});
		}
		handleConnectionClosed() {
			// Check whether this is a normal shutdown in progress or the client stopped normally.
			if (this.state === ClientState.Stopping || this.state === ClientState.Stopped) {
				return;
			}
			try {
				if (this._resolvedConnection) {
					this._resolvedConnection.dispose();
				}
			}
			catch (error) {
				// Disposing a connection could fail if error cases.
			}
			let action = CloseAction.DoNotRestart;
			try {
				action = this._clientOptions.errorHandler.closed();
			}
			catch (error) {
				// Ignore errors coming from the error handler.
			}
			this._connectionPromise = undefined;
			this._resolvedConnection = undefined;
			if (action === CloseAction.DoNotRestart) {
				this.error('Connection to server got closed. Server will not be restarted.');
				this.state = ClientState.Stopped;
				this.cleanUp(false, true);
			}
			else if (action === CloseAction.Restart) {
				this.info('Connection to server got closed. Server will restart.');
				this.cleanUp(false, false);
				this.state = ClientState.Initial;
				this.start();
			}
		}
		handleConnectionError(error, message, count) {
			let action = this._clientOptions.errorHandler.error(error, message, count);
			if (action === ErrorAction.Shutdown) {
				this.error('Connection to server is erroring. Shutting down server.');
				this.stop();
			}
		}
		hookConfigurationChanged(connection) {
			vscode_1.workspace.onDidChangeConfiguration(() => {
				this.refreshTrace(connection, true);
			});
		}
		refreshTrace(connection, sendNotification = false) {
			let config = vscode_1.workspace.getConfiguration(this._id);
			let trace = vscode_languageserver_protocol_1.Trace.Off;
			let traceFormat = vscode_languageserver_protocol_1.TraceFormat.Text;
			if (config) {
				const traceConfig = config.get('trace.server', 'off');
				if (typeof traceConfig === 'string') {
					trace = vscode_languageserver_protocol_1.Trace.fromString(traceConfig);
				}
				else {
					trace = vscode_languageserver_protocol_1.Trace.fromString(config.get('trace.server.verbosity', 'off'));
					traceFormat = vscode_languageserver_protocol_1.TraceFormat.fromString(config.get('trace.server.format', 'text'));
				}
			}
			this._trace = trace;
			this._traceFormat = traceFormat;
			connection.trace(this._trace, this._tracer, {
				sendNotification,
				traceFormat: this._traceFormat
			});
		}
		hookFileEvents(_connection) {
			let fileEvents = this._clientOptions.synchronize.fileEvents;
			if (!fileEvents) {
				return;
			}
			let watchers;
			if (Is.array(fileEvents)) {
				watchers = fileEvents;
			}
			else {
				watchers = [fileEvents];
			}
			if (!watchers) {
				return;
			}
			this._dynamicFeatures.get(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type.method).registerRaw(UUID.generateUuid(), watchers);
		}
		registerFeatures(features) {
			for (let feature of features) {
				this.registerFeature(feature);
			}
		}
		registerFeature(feature) {
			this._features.push(feature);
			if (DynamicFeature.is(feature)) {
				let messages = feature.messages;
				if (Array.isArray(messages)) {
					for (let message of messages) {
						this._method2Message.set(message.method, message);
						this._dynamicFeatures.set(message.method, feature);
					}
				}
				else {
					this._method2Message.set(messages.method, messages);
					this._dynamicFeatures.set(messages.method, feature);
				}
			}
		}
		registerBuiltinFeatures() {
			this.registerFeature(new ConfigurationFeature(this));
			this.registerFeature(new DidOpenTextDocumentFeature(this, this._syncedDocuments));
			this.registerFeature(new DidChangeTextDocumentFeature(this));
			this.registerFeature(new WillSaveFeature(this));
			this.registerFeature(new WillSaveWaitUntilFeature(this));
			this.registerFeature(new DidSaveTextDocumentFeature(this));
			this.registerFeature(new DidCloseTextDocumentFeature(this, this._syncedDocuments));
			this.registerFeature(new FileSystemWatcherFeature(this, (event) => this.notifyFileEvent(event)));
			this.registerFeature(new CompletionItemFeature(this));
			this.registerFeature(new HoverFeature(this));
			this.registerFeature(new SignatureHelpFeature(this));
			this.registerFeature(new DefinitionFeature(this));
			this.registerFeature(new ReferencesFeature(this));
			this.registerFeature(new DocumentHighlightFeature(this));
			this.registerFeature(new DocumentSymbolFeature(this));
			this.registerFeature(new WorkspaceSymbolFeature(this));
			this.registerFeature(new CodeActionFeature(this));
			this.registerFeature(new CodeLensFeature(this));
			this.registerFeature(new DocumentFormattingFeature(this));
			this.registerFeature(new DocumentRangeFormattingFeature(this));
			this.registerFeature(new DocumentOnTypeFormattingFeature(this));
			this.registerFeature(new RenameFeature(this));
			this.registerFeature(new DocumentLinkFeature(this));
			this.registerFeature(new ExecuteCommandFeature(this));
		}
		fillInitializeParams(params) {
			for (let feature of this._features) {
				if (Is.func(feature.fillInitializeParams)) {
					feature.fillInitializeParams(params);
				}
			}
		}
		computeClientCapabilities() {
			let result = {};
			ensure(result, 'workspace').applyEdit = true;
			let workspaceEdit = ensure(ensure(result, 'workspace'), 'workspaceEdit');
			workspaceEdit.documentChanges = true;
			workspaceEdit.resourceOperations = [vscode_languageserver_protocol_1.ResourceOperationKind.Create, vscode_languageserver_protocol_1.ResourceOperationKind.Rename, vscode_languageserver_protocol_1.ResourceOperationKind.Delete];
			workspaceEdit.failureHandling = vscode_languageserver_protocol_1.FailureHandlingKind.TextOnlyTransactional;
			ensure(ensure(result, 'textDocument'), 'publishDiagnostics').relatedInformation = true;
			for (let feature of this._features) {
				feature.fillClientCapabilities(result);
			}
			return result;
		}
		initializeFeatures(_connection) {
			let documentSelector = this._clientOptions.documentSelector;
			for (let feature of this._features) {
				feature.initialize(this._capabilities, documentSelector);
			}
		}
		handleRegistrationRequest(params) {
			return new Promise((resolve, reject) => {
				for (let registration of params.registrations) {
					const feature = this._dynamicFeatures.get(registration.method);
					if (!feature) {
						reject(new Error(`No feature implementation for ${registration.method} found. Registration failed.`));
						return;
					}
					const options = registration.registerOptions || {};
					options.documentSelector = options.documentSelector || this._clientOptions.documentSelector;
					const data = {
						id: registration.id,
						registerOptions: options
					};
					feature.register(this._method2Message.get(registration.method), data);
				}
				resolve();
			});
		}
		handleUnregistrationRequest(params) {
			return new Promise((resolve, reject) => {
				for (let unregistration of params.unregisterations) {
					const feature = this._dynamicFeatures.get(unregistration.method);
					if (!feature) {
						reject(new Error(`No feature implementation for ${unregistration.method} found. Unregistration failed.`));
						return;
					}
					feature.unregister(unregistration.id);
				}
				;
				resolve();
			});
		}
		handleApplyWorkspaceEdit(params) {
			// This is some sort of workaround since the version check should be done by VS Code in the Workspace.applyEdit.
			// However doing it here adds some safety since the server can lag more behind then an extension.
			let workspaceEdit = params.edit;
			let openTextDocuments = new Map();
			vscode_1.workspace.textDocuments.forEach((document) => openTextDocuments.set(document.uri.toString(), document));
			let versionMismatch = false;
			if (workspaceEdit.documentChanges) {
				for (const change of workspaceEdit.documentChanges) {
					if (vscode_languageserver_protocol_1.TextDocumentEdit.is(change) && change.textDocument.version && change.textDocument.version >= 0) {
						let textDocument = openTextDocuments.get(change.textDocument.uri);
						if (textDocument && textDocument.version !== change.textDocument.version) {
							versionMismatch = true;
							break;
						}
					}
				}
			}
			if (versionMismatch) {
				return Promise.resolve({ applied: false });
			}
			return vscode_1.workspace.applyEdit(this._p2c.asWorkspaceEdit(params.edit)).then((value) => { return { applied: value }; });
		}
		;
		logFailedRequest(type, error) {
			// If we get a request cancel don't log anything.
			if (error instanceof vscode_languageserver_protocol_1.ResponseError && error.code === vscode_languageserver_protocol_1.ErrorCodes.RequestCancelled) {
				return;
			}
			this.error(`Request ${type.method} failed.`, error);
		}
	}
	exports.BaseLanguageClient = BaseLanguageClient;


	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	exports.ErrorCodes = vscode_jsonrpc_1.ErrorCodes;
	exports.ResponseError = vscode_jsonrpc_1.ResponseError;
	exports.CancellationToken = vscode_jsonrpc_1.CancellationToken;
	exports.CancellationTokenSource = vscode_jsonrpc_1.CancellationTokenSource;
	exports.Disposable = vscode_jsonrpc_1.Disposable;
	exports.Event = vscode_jsonrpc_1.Event;
	exports.Emitter = vscode_jsonrpc_1.Emitter;
	exports.Trace = vscode_jsonrpc_1.Trace;
	exports.TraceFormat = vscode_jsonrpc_1.TraceFormat;
	exports.SetTraceNotification = vscode_jsonrpc_1.SetTraceNotification;
	exports.LogTraceNotification = vscode_jsonrpc_1.LogTraceNotification;
	exports.RequestType = vscode_jsonrpc_1.RequestType;
	exports.RequestType0 = vscode_jsonrpc_1.RequestType0;
	exports.NotificationType = vscode_jsonrpc_1.NotificationType;
	exports.NotificationType0 = vscode_jsonrpc_1.NotificationType0;
	exports.MessageReader = vscode_jsonrpc_1.MessageReader;
	exports.MessageWriter = vscode_jsonrpc_1.MessageWriter;
	exports.ConnectionStrategy = vscode_jsonrpc_1.ConnectionStrategy;
	exports.StreamMessageReader = vscode_jsonrpc_1.StreamMessageReader;
	exports.StreamMessageWriter = vscode_jsonrpc_1.StreamMessageWriter;
	exports.IPCMessageReader = vscode_jsonrpc_1.IPCMessageReader;
	exports.IPCMessageWriter = vscode_jsonrpc_1.IPCMessageWriter;
	exports.createClientPipeTransport = vscode_jsonrpc_1.createClientPipeTransport;
	exports.createServerPipeTransport = vscode_jsonrpc_1.createServerPipeTransport;
	exports.generateRandomPipeName = vscode_jsonrpc_1.generateRandomPipeName;
	exports.createClientSocketTransport = vscode_jsonrpc_1.createClientSocketTransport;
	exports.createServerSocketTransport = vscode_jsonrpc_1.createServerSocketTransport;
	__export(__webpack_require__(51));
	__export(__webpack_require__(52));
	function createProtocolConnection(reader, writer, logger, strategy) {
		return vscode_jsonrpc_1.createMessageConnection(reader, writer, logger, strategy);
	}
	exports.createProtocolConnection = createProtocolConnection;


	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */
	/// <reference path="./thenable.ts" />

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	const Is = __webpack_require__(40);
	const messages_1 = __webpack_require__(41);
	exports.RequestType = messages_1.RequestType;
	exports.RequestType0 = messages_1.RequestType0;
	exports.RequestType1 = messages_1.RequestType1;
	exports.RequestType2 = messages_1.RequestType2;
	exports.RequestType3 = messages_1.RequestType3;
	exports.RequestType4 = messages_1.RequestType4;
	exports.RequestType5 = messages_1.RequestType5;
	exports.RequestType6 = messages_1.RequestType6;
	exports.RequestType7 = messages_1.RequestType7;
	exports.RequestType8 = messages_1.RequestType8;
	exports.RequestType9 = messages_1.RequestType9;
	exports.ResponseError = messages_1.ResponseError;
	exports.ErrorCodes = messages_1.ErrorCodes;
	exports.NotificationType = messages_1.NotificationType;
	exports.NotificationType0 = messages_1.NotificationType0;
	exports.NotificationType1 = messages_1.NotificationType1;
	exports.NotificationType2 = messages_1.NotificationType2;
	exports.NotificationType3 = messages_1.NotificationType3;
	exports.NotificationType4 = messages_1.NotificationType4;
	exports.NotificationType5 = messages_1.NotificationType5;
	exports.NotificationType6 = messages_1.NotificationType6;
	exports.NotificationType7 = messages_1.NotificationType7;
	exports.NotificationType8 = messages_1.NotificationType8;
	exports.NotificationType9 = messages_1.NotificationType9;
	const messageReader_1 = __webpack_require__(42);
	exports.MessageReader = messageReader_1.MessageReader;
	exports.StreamMessageReader = messageReader_1.StreamMessageReader;
	exports.IPCMessageReader = messageReader_1.IPCMessageReader;
	exports.SocketMessageReader = messageReader_1.SocketMessageReader;
	const messageWriter_1 = __webpack_require__(44);
	exports.MessageWriter = messageWriter_1.MessageWriter;
	exports.StreamMessageWriter = messageWriter_1.StreamMessageWriter;
	exports.IPCMessageWriter = messageWriter_1.IPCMessageWriter;
	exports.SocketMessageWriter = messageWriter_1.SocketMessageWriter;
	const events_1 = __webpack_require__(43);
	exports.Disposable = events_1.Disposable;
	exports.Event = events_1.Event;
	exports.Emitter = events_1.Emitter;
	const cancellation_1 = __webpack_require__(45);
	exports.CancellationTokenSource = cancellation_1.CancellationTokenSource;
	exports.CancellationToken = cancellation_1.CancellationToken;
	const linkedMap_1 = __webpack_require__(46);
	__export(__webpack_require__(47));
	__export(__webpack_require__(50));
	var CancelNotification;
	(function (CancelNotification) {
		CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
	})(CancelNotification || (CancelNotification = {}));
	exports.NullLogger = Object.freeze({
		error: () => { },
		warn: () => { },
		info: () => { },
		log: () => { }
	});
	var Trace;
	(function (Trace) {
		Trace[Trace["Off"] = 0] = "Off";
		Trace[Trace["Messages"] = 1] = "Messages";
		Trace[Trace["Verbose"] = 2] = "Verbose";
	})(Trace = exports.Trace || (exports.Trace = {}));
	(function (Trace) {
		function fromString(value) {
			value = value.toLowerCase();
			switch (value) {
				case 'off':
					return Trace.Off;
				case 'messages':
					return Trace.Messages;
				case 'verbose':
					return Trace.Verbose;
				default:
					return Trace.Off;
			}
		}
		Trace.fromString = fromString;
		function toString(value) {
			switch (value) {
				case Trace.Off:
					return 'off';
				case Trace.Messages:
					return 'messages';
				case Trace.Verbose:
					return 'verbose';
				default:
					return 'off';
			}
		}
		Trace.toString = toString;
	})(Trace = exports.Trace || (exports.Trace = {}));
	var TraceFormat;
	(function (TraceFormat) {
		TraceFormat["Text"] = "text";
		TraceFormat["JSON"] = "json";
	})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
	(function (TraceFormat) {
		function fromString(value) {
			value = value.toLowerCase();
			if (value === 'json') {
				return TraceFormat.JSON;
			}
			else {
				return TraceFormat.Text;
			}
		}
		TraceFormat.fromString = fromString;
	})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
	var SetTraceNotification;
	(function (SetTraceNotification) {
		SetTraceNotification.type = new messages_1.NotificationType('$/setTraceNotification');
	})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
	var LogTraceNotification;
	(function (LogTraceNotification) {
		LogTraceNotification.type = new messages_1.NotificationType('$/logTraceNotification');
	})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
	var ConnectionErrors;
	(function (ConnectionErrors) {
		/**
		 * The connection is closed.
		 */
		ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
		/**
		 * The connection got disposed.
		 */
		ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
		/**
		 * The connection is already in listening mode.
		 */
		ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
	})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
	class ConnectionError extends Error {
		constructor(code, message) {
			super(message);
			this.code = code;
			Object.setPrototypeOf(this, ConnectionError.prototype);
		}
	}
	exports.ConnectionError = ConnectionError;
	var ConnectionStrategy;
	(function (ConnectionStrategy) {
		function is(value) {
			let candidate = value;
			return candidate && Is.func(candidate.cancelUndispatched);
		}
		ConnectionStrategy.is = is;
	})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
	var ConnectionState;
	(function (ConnectionState) {
		ConnectionState[ConnectionState["New"] = 1] = "New";
		ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
		ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
		ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
	})(ConnectionState || (ConnectionState = {}));
	function _createMessageConnection(messageReader, messageWriter, logger, strategy) {
		let sequenceNumber = 0;
		let notificationSquenceNumber = 0;
		let unknownResponseSquenceNumber = 0;
		const version = '2.0';
		let starRequestHandler = undefined;
		let requestHandlers = Object.create(null);
		let starNotificationHandler = undefined;
		let notificationHandlers = Object.create(null);
		let timer;
		let messageQueue = new linkedMap_1.LinkedMap();
		let responsePromises = Object.create(null);
		let requestTokens = Object.create(null);
		let trace = Trace.Off;
		let traceFormat = TraceFormat.Text;
		let tracer;
		let state = ConnectionState.New;
		let errorEmitter = new events_1.Emitter();
		let closeEmitter = new events_1.Emitter();
		let unhandledNotificationEmitter = new events_1.Emitter();
		let disposeEmitter = new events_1.Emitter();
		function createRequestQueueKey(id) {
			return 'req-' + id.toString();
		}
		function createResponseQueueKey(id) {
			if (id === null) {
				return 'res-unknown-' + (++unknownResponseSquenceNumber).toString();
			}
			else {
				return 'res-' + id.toString();
			}
		}
		function createNotificationQueueKey() {
			return 'not-' + (++notificationSquenceNumber).toString();
		}
		function addMessageToQueue(queue, message) {
			if (messages_1.isRequestMessage(message)) {
				queue.set(createRequestQueueKey(message.id), message);
			}
			else if (messages_1.isResponseMessage(message)) {
				queue.set(createResponseQueueKey(message.id), message);
			}
			else {
				queue.set(createNotificationQueueKey(), message);
			}
		}
		function cancelUndispatched(_message) {
			return undefined;
		}
		function isListening() {
			return state === ConnectionState.Listening;
		}
		function isClosed() {
			return state === ConnectionState.Closed;
		}
		function isDisposed() {
			return state === ConnectionState.Disposed;
		}
		function closeHandler() {
			if (state === ConnectionState.New || state === ConnectionState.Listening) {
				state = ConnectionState.Closed;
				closeEmitter.fire(undefined);
			}
			// If the connection is disposed don't sent close events.
		}
		;
		function readErrorHandler(error) {
			errorEmitter.fire([error, undefined, undefined]);
		}
		function writeErrorHandler(data) {
			errorEmitter.fire(data);
		}
		messageReader.onClose(closeHandler);
		messageReader.onError(readErrorHandler);
		messageWriter.onClose(closeHandler);
		messageWriter.onError(writeErrorHandler);
		function triggerMessageQueue() {
			if (timer || messageQueue.size === 0) {
				return;
			}
			timer = setImmediate(() => {
				timer = undefined;
				processMessageQueue();
			});
		}
		function processMessageQueue() {
			if (messageQueue.size === 0) {
				return;
			}
			let message = messageQueue.shift();
			try {
				if (messages_1.isRequestMessage(message)) {
					handleRequest(message);
				}
				else if (messages_1.isNotificationMessage(message)) {
					handleNotification(message);
				}
				else if (messages_1.isResponseMessage(message)) {
					handleResponse(message);
				}
				else {
					handleInvalidMessage(message);
				}
			}
			finally {
				triggerMessageQueue();
			}
		}
		let callback = (message) => {
			try {
				// We have received a cancellation message. Check if the message is still in the queue
				// and cancel it if allowed to do so.
				if (messages_1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
					let key = createRequestQueueKey(message.params.id);
					let toCancel = messageQueue.get(key);
					if (messages_1.isRequestMessage(toCancel)) {
						let response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
						if (response && (response.error !== void 0 || response.result !== void 0)) {
							messageQueue.delete(key);
							response.id = toCancel.id;
							traceSendingResponse(response, message.method, Date.now());
							messageWriter.write(response);
							return;
						}
					}
				}
				addMessageToQueue(messageQueue, message);
			}
			finally {
				triggerMessageQueue();
			}
		};
		function handleRequest(requestMessage) {
			if (isDisposed()) {
				// we return here silently since we fired an event when the
				// connection got disposed.
				return;
			}
			function reply(resultOrError, method, startTime) {
				let message = {
					jsonrpc: version,
					id: requestMessage.id
				};
				if (resultOrError instanceof messages_1.ResponseError) {
					message.error = resultOrError.toJson();
				}
				else {
					message.result = resultOrError === void 0 ? null : resultOrError;
				}
				traceSendingResponse(message, method, startTime);
				messageWriter.write(message);
			}
			function replyError(error, method, startTime) {
				let message = {
					jsonrpc: version,
					id: requestMessage.id,
					error: error.toJson()
				};
				traceSendingResponse(message, method, startTime);
				messageWriter.write(message);
			}
			function replySuccess(result, method, startTime) {
				// The JSON RPC defines that a response must either have a result or an error
				// So we can't treat undefined as a valid response result.
				if (result === void 0) {
					result = null;
				}
				let message = {
					jsonrpc: version,
					id: requestMessage.id,
					result: result
				};
				traceSendingResponse(message, method, startTime);
				messageWriter.write(message);
			}
			traceReceivedRequest(requestMessage);
			let element = requestHandlers[requestMessage.method];
			let type;
			let requestHandler;
			if (element) {
				type = element.type;
				requestHandler = element.handler;
			}
			let startTime = Date.now();
			if (requestHandler || starRequestHandler) {
				let cancellationSource = new cancellation_1.CancellationTokenSource();
				let tokenKey = String(requestMessage.id);
				requestTokens[tokenKey] = cancellationSource;
				try {
					let handlerResult;
					if (requestMessage.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
						handlerResult = requestHandler
							? requestHandler(cancellationSource.token)
							: starRequestHandler(requestMessage.method, cancellationSource.token);
					}
					else if (Is.array(requestMessage.params) && (type === void 0 || type.numberOfParams > 1)) {
						handlerResult = requestHandler
							? requestHandler(...requestMessage.params, cancellationSource.token)
							: starRequestHandler(requestMessage.method, ...requestMessage.params, cancellationSource.token);
					}
					else {
						handlerResult = requestHandler
							? requestHandler(requestMessage.params, cancellationSource.token)
							: starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
					}
					let promise = handlerResult;
					if (!handlerResult) {
						delete requestTokens[tokenKey];
						replySuccess(handlerResult, requestMessage.method, startTime);
					}
					else if (promise.then) {
						promise.then((resultOrError) => {
							delete requestTokens[tokenKey];
							reply(resultOrError, requestMessage.method, startTime);
						}, error => {
							delete requestTokens[tokenKey];
							if (error instanceof messages_1.ResponseError) {
								replyError(error, requestMessage.method, startTime);
							}
							else if (error && Is.string(error.message)) {
								replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
							}
							else {
								replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
							}
						});
					}
					else {
						delete requestTokens[tokenKey];
						reply(handlerResult, requestMessage.method, startTime);
					}
				}
				catch (error) {
					delete requestTokens[tokenKey];
					if (error instanceof messages_1.ResponseError) {
						reply(error, requestMessage.method, startTime);
					}
					else if (error && Is.string(error.message)) {
						replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
					}
					else {
						replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
					}
				}
			}
			else {
				replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
			}
		}
		function handleResponse(responseMessage) {
			if (isDisposed()) {
				// See handle request.
				return;
			}
			if (responseMessage.id === null) {
				if (responseMessage.error) {
					logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
				}
				else {
					logger.error(`Received response message without id. No further error information provided.`);
				}
			}
			else {
				let key = String(responseMessage.id);
				let responsePromise = responsePromises[key];
				traceReceivedResponse(responseMessage, responsePromise);
				if (responsePromise) {
					delete responsePromises[key];
					try {
						if (responseMessage.error) {
							let error = responseMessage.error;
							responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
						}
						else if (responseMessage.result !== void 0) {
							responsePromise.resolve(responseMessage.result);
						}
						else {
							throw new Error('Should never happen.');
						}
					}
					catch (error) {
						if (error.message) {
							logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
						}
						else {
							logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
						}
					}
				}
			}
		}
		function handleNotification(message) {
			if (isDisposed()) {
				// See handle request.
				return;
			}
			let type = undefined;
			let notificationHandler;
			if (message.method === CancelNotification.type.method) {
				notificationHandler = (params) => {
					let id = params.id;
					let source = requestTokens[String(id)];
					if (source) {
						source.cancel();
					}
				};
			}
			else {
				let element = notificationHandlers[message.method];
				if (element) {
					notificationHandler = element.handler;
					type = element.type;
				}
			}
			if (notificationHandler || starNotificationHandler) {
				try {
					traceReceivedNotification(message);
					if (message.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
						notificationHandler ? notificationHandler() : starNotificationHandler(message.method);
					}
					else if (Is.array(message.params) && (type === void 0 || type.numberOfParams > 1)) {
						notificationHandler ? notificationHandler(...message.params) : starNotificationHandler(message.method, ...message.params);
					}
					else {
						notificationHandler ? notificationHandler(message.params) : starNotificationHandler(message.method, message.params);
					}
				}
				catch (error) {
					if (error.message) {
						logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
					}
					else {
						logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
					}
				}
			}
			else {
				unhandledNotificationEmitter.fire(message);
			}
		}
		function handleInvalidMessage(message) {
			if (!message) {
				logger.error('Received empty message.');
				return;
			}
			logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
			// Test whether we find an id to reject the promise
			let responseMessage = message;
			if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
				let key = String(responseMessage.id);
				let responseHandler = responsePromises[key];
				if (responseHandler) {
					responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
				}
			}
		}
		function traceSendingRequest(message) {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose && message.params) {
					data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
				}
				tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
			}
			else {
				logLSPMessage('send-request', message);
			}
		}
		function traceSendingNotification(message) {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose) {
					if (message.params) {
						data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
					}
					else {
						data = 'No parameters provided.\n\n';
					}
				}
				tracer.log(`Sending notification '${message.method}'.`, data);
			}
			else {
				logLSPMessage('send-notification', message);
			}
		}
		function traceSendingResponse(message, method, startTime) {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose) {
					if (message.error && message.error.data) {
						data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
					}
					else {
						if (message.result) {
							data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
						}
						else if (message.error === void 0) {
							data = 'No result returned.\n\n';
						}
					}
				}
				tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
			}
			else {
				logLSPMessage('send-response', message);
			}
		}
		function traceReceivedRequest(message) {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose && message.params) {
					data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
				}
				tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
			}
			else {
				logLSPMessage('receive-request', message);
			}
		}
		function traceReceivedNotification(message) {
			if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose) {
					if (message.params) {
						data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
					}
					else {
						data = 'No parameters provided.\n\n';
					}
				}
				tracer.log(`Received notification '${message.method}'.`, data);
			}
			else {
				logLSPMessage('receive-notification', message);
			}
		}
		function traceReceivedResponse(message, responsePromise) {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			if (traceFormat === TraceFormat.Text) {
				let data = undefined;
				if (trace === Trace.Verbose) {
					if (message.error && message.error.data) {
						data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
					}
					else {
						if (message.result) {
							data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
						}
						else if (message.error === void 0) {
							data = 'No result returned.\n\n';
						}
					}
				}
				if (responsePromise) {
					let error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
					tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
				}
				else {
					tracer.log(`Received response ${message.id} without active response promise.`, data);
				}
			}
			else {
				logLSPMessage('receive-response', message);
			}
		}
		function logLSPMessage(type, message) {
			if (!tracer || trace === Trace.Off) {
				return;
			}
			const lspMessage = {
				isLSPMessage: true,
				type,
				message,
				timestamp: Date.now()
			};
			tracer.log(lspMessage);
		}
		function throwIfClosedOrDisposed() {
			if (isClosed()) {
				throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
			}
			if (isDisposed()) {
				throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
			}
		}
		function throwIfListening() {
			if (isListening()) {
				throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
			}
		}
		function throwIfNotListening() {
			if (!isListening()) {
				throw new Error('Call listen() first.');
			}
		}
		function undefinedToNull(param) {
			if (param === void 0) {
				return null;
			}
			else {
				return param;
			}
		}
		function computeMessageParams(type, params) {
			let result;
			let numberOfParams = type.numberOfParams;
			switch (numberOfParams) {
				case 0:
					result = null;
					break;
				case 1:
					result = undefinedToNull(params[0]);
					break;
				default:
					result = [];
					for (let i = 0; i < params.length && i < numberOfParams; i++) {
						result.push(undefinedToNull(params[i]));
					}
					if (params.length < numberOfParams) {
						for (let i = params.length; i < numberOfParams; i++) {
							result.push(null);
						}
					}
					break;
			}
			return result;
		}
		let connection = {
			sendNotification: (type, ...params) => {
				throwIfClosedOrDisposed();
				let method;
				let messageParams;
				if (Is.string(type)) {
					method = type;
					switch (params.length) {
						case 0:
							messageParams = null;
							break;
						case 1:
							messageParams = params[0];
							break;
						default:
							messageParams = params;
							break;
					}
				}
				else {
					method = type.method;
					messageParams = computeMessageParams(type, params);
				}
				let notificationMessage = {
					jsonrpc: version,
					method: method,
					params: messageParams
				};
				traceSendingNotification(notificationMessage);
				messageWriter.write(notificationMessage);
			},
			onNotification: (type, handler) => {
				throwIfClosedOrDisposed();
				if (Is.func(type)) {
					starNotificationHandler = type;
				}
				else if (handler) {
					if (Is.string(type)) {
						notificationHandlers[type] = { type: undefined, handler };
					}
					else {
						notificationHandlers[type.method] = { type, handler };
					}
				}
			},
			sendRequest: (type, ...params) => {
				throwIfClosedOrDisposed();
				throwIfNotListening();
				let method;
				let messageParams;
				let token = undefined;
				if (Is.string(type)) {
					method = type;
					switch (params.length) {
						case 0:
							messageParams = null;
							break;
						case 1:
							// The cancellation token is optional so it can also be undefined.
							if (cancellation_1.CancellationToken.is(params[0])) {
								messageParams = null;
								token = params[0];
							}
							else {
								messageParams = undefinedToNull(params[0]);
							}
							break;
						default:
							const last = params.length - 1;
							if (cancellation_1.CancellationToken.is(params[last])) {
								token = params[last];
								if (params.length === 2) {
									messageParams = undefinedToNull(params[0]);
								}
								else {
									messageParams = params.slice(0, last).map(value => undefinedToNull(value));
								}
							}
							else {
								messageParams = params.map(value => undefinedToNull(value));
							}
							break;
					}
				}
				else {
					method = type.method;
					messageParams = computeMessageParams(type, params);
					let numberOfParams = type.numberOfParams;
					token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
				}
				let id = sequenceNumber++;
				let result = new Promise((resolve, reject) => {
					let requestMessage = {
						jsonrpc: version,
						id: id,
						method: method,
						params: messageParams
					};
					let responsePromise = { method: method, timerStart: Date.now(), resolve, reject };
					traceSendingRequest(requestMessage);
					try {
						messageWriter.write(requestMessage);
					}
					catch (e) {
						// Writing the message failed. So we need to reject the promise.
						responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
						responsePromise = null;
					}
					if (responsePromise) {
						responsePromises[String(id)] = responsePromise;
					}
				});
				if (token) {
					token.onCancellationRequested(() => {
						connection.sendNotification(CancelNotification.type, { id });
					});
				}
				return result;
			},
			onRequest: (type, handler) => {
				throwIfClosedOrDisposed();
				if (Is.func(type)) {
					starRequestHandler = type;
				}
				else if (handler) {
					if (Is.string(type)) {
						requestHandlers[type] = { type: undefined, handler };
					}
					else {
						requestHandlers[type.method] = { type, handler };
					}
				}
			},
			trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
				let _sendNotification = false;
				let _traceFormat = TraceFormat.Text;
				if (sendNotificationOrTraceOptions !== void 0) {
					if (Is.boolean(sendNotificationOrTraceOptions)) {
						_sendNotification = sendNotificationOrTraceOptions;
					}
					else {
						_sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
						_traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
					}
				}
				trace = _value;
				traceFormat = _traceFormat;
				if (trace === Trace.Off) {
					tracer = undefined;
				}
				else {
					tracer = _tracer;
				}
				if (_sendNotification && !isClosed() && !isDisposed()) {
					connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
				}
			},
			onError: errorEmitter.event,
			onClose: closeEmitter.event,
			onUnhandledNotification: unhandledNotificationEmitter.event,
			onDispose: disposeEmitter.event,
			dispose: () => {
				if (isDisposed()) {
					return;
				}
				state = ConnectionState.Disposed;
				disposeEmitter.fire(undefined);
				let error = new Error('Connection got disposed.');
				Object.keys(responsePromises).forEach((key) => {
					responsePromises[key].reject(error);
				});
				responsePromises = Object.create(null);
				requestTokens = Object.create(null);
				messageQueue = new linkedMap_1.LinkedMap();
				// Test for backwards compatibility
				if (Is.func(messageWriter.dispose)) {
					messageWriter.dispose();
				}
				if (Is.func(messageReader.dispose)) {
					messageReader.dispose();
				}
			},
			listen: () => {
				throwIfClosedOrDisposed();
				throwIfListening();
				state = ConnectionState.Listening;
				messageReader.listen(callback);
			},
			inspect: () => {
				console.log("inspect");
			}
		};
		connection.onNotification(LogTraceNotification.type, (params) => {
			if (trace === Trace.Off || !tracer) {
				return;
			}
			tracer.log(params.message, trace === Trace.Verbose ? params.verbose : undefined);
		});
		return connection;
	}
	function isMessageReader(value) {
		return value.listen !== void 0 && value.read === void 0;
	}
	function isMessageWriter(value) {
		return value.write !== void 0 && value.end === void 0;
	}
	function createMessageConnection(input, output, logger, strategy) {
		if (!logger) {
			logger = exports.NullLogger;
		}
		let reader = isMessageReader(input) ? input : new messageReader_1.StreamMessageReader(input);
		let writer = isMessageWriter(output) ? output : new messageWriter_1.StreamMessageWriter(output);
		return _createMessageConnection(reader, writer, logger, strategy);
	}
	exports.createMessageConnection = createMessageConnection;


	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	function boolean(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean;
	function string(value) {
		return typeof value === 'string' || value instanceof String;
	}
	exports.string = string;
	function number(value) {
		return typeof value === 'number' || value instanceof Number;
	}
	exports.number = number;
	function error(value) {
		return value instanceof Error;
	}
	exports.error = error;
	function func(value) {
		return typeof value === 'function';
	}
	exports.func = func;
	function array(value) {
		return Array.isArray(value);
	}
	exports.array = array;
	function stringArray(value) {
		return array(value) && value.every(elem => string(elem));
	}
	exports.stringArray = stringArray;


	/***/ }),
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const is = __webpack_require__(40);
	/**
	 * Predefined error codes.
	 */
	var ErrorCodes;
	(function (ErrorCodes) {
		// Defined by JSON RPC
		ErrorCodes.ParseError = -32700;
		ErrorCodes.InvalidRequest = -32600;
		ErrorCodes.MethodNotFound = -32601;
		ErrorCodes.InvalidParams = -32602;
		ErrorCodes.InternalError = -32603;
		ErrorCodes.serverErrorStart = -32099;
		ErrorCodes.serverErrorEnd = -32000;
		ErrorCodes.ServerNotInitialized = -32002;
		ErrorCodes.UnknownErrorCode = -32001;
		// Defined by the protocol.
		ErrorCodes.RequestCancelled = -32800;
		// Defined by VSCode library.
		ErrorCodes.MessageWriteError = 1;
		ErrorCodes.MessageReadError = 2;
	})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
	/**
	 * An error object return in a response in case a request
	 * has failed.
	 */
	class ResponseError extends Error {
		constructor(code, message, data) {
			super(message);
			this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
			this.data = data;
			Object.setPrototypeOf(this, ResponseError.prototype);
		}
		toJson() {
			return {
				code: this.code,
				message: this.message,
				data: this.data,
			};
		}
	}
	exports.ResponseError = ResponseError;
	/**
	 * An abstract implementation of a MessageType.
	 */
	class AbstractMessageType {
		constructor(_method, _numberOfParams) {
			this._method = _method;
			this._numberOfParams = _numberOfParams;
		}
		get method() {
			return this._method;
		}
		get numberOfParams() {
			return this._numberOfParams;
		}
	}
	exports.AbstractMessageType = AbstractMessageType;
	/**
	 * Classes to type request response pairs
	 */
	class RequestType0 extends AbstractMessageType {
		constructor(method) {
			super(method, 0);
			this._ = undefined;
		}
	}
	exports.RequestType0 = RequestType0;
	class RequestType extends AbstractMessageType {
		constructor(method) {
			super(method, 1);
			this._ = undefined;
		}
	}
	exports.RequestType = RequestType;
	class RequestType1 extends AbstractMessageType {
		constructor(method) {
			super(method, 1);
			this._ = undefined;
		}
	}
	exports.RequestType1 = RequestType1;
	class RequestType2 extends AbstractMessageType {
		constructor(method) {
			super(method, 2);
			this._ = undefined;
		}
	}
	exports.RequestType2 = RequestType2;
	class RequestType3 extends AbstractMessageType {
		constructor(method) {
			super(method, 3);
			this._ = undefined;
		}
	}
	exports.RequestType3 = RequestType3;
	class RequestType4 extends AbstractMessageType {
		constructor(method) {
			super(method, 4);
			this._ = undefined;
		}
	}
	exports.RequestType4 = RequestType4;
	class RequestType5 extends AbstractMessageType {
		constructor(method) {
			super(method, 5);
			this._ = undefined;
		}
	}
	exports.RequestType5 = RequestType5;
	class RequestType6 extends AbstractMessageType {
		constructor(method) {
			super(method, 6);
			this._ = undefined;
		}
	}
	exports.RequestType6 = RequestType6;
	class RequestType7 extends AbstractMessageType {
		constructor(method) {
			super(method, 7);
			this._ = undefined;
		}
	}
	exports.RequestType7 = RequestType7;
	class RequestType8 extends AbstractMessageType {
		constructor(method) {
			super(method, 8);
			this._ = undefined;
		}
	}
	exports.RequestType8 = RequestType8;
	class RequestType9 extends AbstractMessageType {
		constructor(method) {
			super(method, 9);
			this._ = undefined;
		}
	}
	exports.RequestType9 = RequestType9;
	class NotificationType extends AbstractMessageType {
		constructor(method) {
			super(method, 1);
			this._ = undefined;
		}
	}
	exports.NotificationType = NotificationType;
	class NotificationType0 extends AbstractMessageType {
		constructor(method) {
			super(method, 0);
			this._ = undefined;
		}
	}
	exports.NotificationType0 = NotificationType0;
	class NotificationType1 extends AbstractMessageType {
		constructor(method) {
			super(method, 1);
			this._ = undefined;
		}
	}
	exports.NotificationType1 = NotificationType1;
	class NotificationType2 extends AbstractMessageType {
		constructor(method) {
			super(method, 2);
			this._ = undefined;
		}
	}
	exports.NotificationType2 = NotificationType2;
	class NotificationType3 extends AbstractMessageType {
		constructor(method) {
			super(method, 3);
			this._ = undefined;
		}
	}
	exports.NotificationType3 = NotificationType3;
	class NotificationType4 extends AbstractMessageType {
		constructor(method) {
			super(method, 4);
			this._ = undefined;
		}
	}
	exports.NotificationType4 = NotificationType4;
	class NotificationType5 extends AbstractMessageType {
		constructor(method) {
			super(method, 5);
			this._ = undefined;
		}
	}
	exports.NotificationType5 = NotificationType5;
	class NotificationType6 extends AbstractMessageType {
		constructor(method) {
			super(method, 6);
			this._ = undefined;
		}
	}
	exports.NotificationType6 = NotificationType6;
	class NotificationType7 extends AbstractMessageType {
		constructor(method) {
			super(method, 7);
			this._ = undefined;
		}
	}
	exports.NotificationType7 = NotificationType7;
	class NotificationType8 extends AbstractMessageType {
		constructor(method) {
			super(method, 8);
			this._ = undefined;
		}
	}
	exports.NotificationType8 = NotificationType8;
	class NotificationType9 extends AbstractMessageType {
		constructor(method) {
			super(method, 9);
			this._ = undefined;
		}
	}
	exports.NotificationType9 = NotificationType9;
	/**
	 * Tests if the given message is a request message
	 */
	function isRequestMessage(message) {
		let candidate = message;
		return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
	}
	exports.isRequestMessage = isRequestMessage;
	/**
	 * Tests if the given message is a notification message
	 */
	function isNotificationMessage(message) {
		let candidate = message;
		return candidate && is.string(candidate.method) && message.id === void 0;
	}
	exports.isNotificationMessage = isNotificationMessage;
	/**
	 * Tests if the given message is a response message
	 */
	function isResponseMessage(message) {
		let candidate = message;
		return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
	}
	exports.isResponseMessage = isResponseMessage;


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(43);
	const Is = __webpack_require__(40);
	let DefaultSize = 8192;
	let CR = Buffer.from('\r', 'ascii')[0];
	let LF = Buffer.from('\n', 'ascii')[0];
	let CRLF = '\r\n';
	class MessageBuffer {
		constructor(encoding = 'utf8') {
			this.encoding = encoding;
			this.index = 0;
			this.buffer = Buffer.allocUnsafe(DefaultSize);
		}
		append(chunk) {
			var toAppend = chunk;
			if (typeof (chunk) === 'string') {
				var str = chunk;
				var bufferLen = Buffer.byteLength(str, this.encoding);
				toAppend = Buffer.allocUnsafe(bufferLen);
				toAppend.write(str, 0, bufferLen, this.encoding);
			}
			if (this.buffer.length - this.index >= toAppend.length) {
				toAppend.copy(this.buffer, this.index, 0, toAppend.length);
			}
			else {
				var newSize = (Math.ceil((this.index + toAppend.length) / DefaultSize) + 1) * DefaultSize;
				if (this.index === 0) {
					this.buffer = Buffer.allocUnsafe(newSize);
					toAppend.copy(this.buffer, 0, 0, toAppend.length);
				}
				else {
					this.buffer = Buffer.concat([this.buffer.slice(0, this.index), toAppend], newSize);
				}
			}
			this.index += toAppend.length;
		}
		tryReadHeaders() {
			let result = undefined;
			let current = 0;
			while (current + 3 < this.index && (this.buffer[current] !== CR || this.buffer[current + 1] !== LF || this.buffer[current + 2] !== CR || this.buffer[current + 3] !== LF)) {
				current++;
			}
			// No header / body separator found (e.g CRLFCRLF)
			if (current + 3 >= this.index) {
				return result;
			}
			result = Object.create(null);
			let headers = this.buffer.toString('ascii', 0, current).split(CRLF);
			headers.forEach((header) => {
				let index = header.indexOf(':');
				if (index === -1) {
					throw new Error('Message header must separate key and value using :');
				}
				let key = header.substr(0, index);
				let value = header.substr(index + 1).trim();
				result[key] = value;
			});
			let nextStart = current + 4;
			this.buffer = this.buffer.slice(nextStart);
			this.index = this.index - nextStart;
			return result;
		}
		tryReadContent(length) {
			if (this.index < length) {
				return null;
			}
			let result = this.buffer.toString(this.encoding, 0, length);
			let nextStart = length;
			this.buffer.copy(this.buffer, 0, nextStart);
			this.index = this.index - nextStart;
			return result;
		}
		get numberOfBytes() {
			return this.index;
		}
	}
	var MessageReader;
	(function (MessageReader) {
		function is(value) {
			let candidate = value;
			return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
				Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
		}
		MessageReader.is = is;
	})(MessageReader = exports.MessageReader || (exports.MessageReader = {}));
	class AbstractMessageReader {
		constructor() {
			this.errorEmitter = new events_1.Emitter();
			this.closeEmitter = new events_1.Emitter();
			this.partialMessageEmitter = new events_1.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error) {
			this.errorEmitter.fire(this.asError(error));
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(undefined);
		}
		get onPartialMessage() {
			return this.partialMessageEmitter.event;
		}
		firePartialMessage(info) {
			this.partialMessageEmitter.fire(info);
		}
		asError(error) {
			if (error instanceof Error) {
				return error;
			}
			else {
				return new Error(`Reader recevied error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
			}
		}
	}
	exports.AbstractMessageReader = AbstractMessageReader;
	class StreamMessageReader extends AbstractMessageReader {
		constructor(readable, encoding = 'utf8') {
			super();
			this.readable = readable;
			this.buffer = new MessageBuffer(encoding);
			this._partialMessageTimeout = 10000;
		}
		set partialMessageTimeout(timeout) {
			this._partialMessageTimeout = timeout;
		}
		get partialMessageTimeout() {
			return this._partialMessageTimeout;
		}
		listen(callback) {
			this.nextMessageLength = -1;
			this.messageToken = 0;
			this.partialMessageTimer = undefined;
			this.callback = callback;
			this.readable.on('data', (data) => {
				this.onData(data);
			});
			this.readable.on('error', (error) => this.fireError(error));
			this.readable.on('close', () => this.fireClose());
		}
		onData(data) {
			this.buffer.append(data);
			while (true) {
				if (this.nextMessageLength === -1) {
					let headers = this.buffer.tryReadHeaders();
					if (!headers) {
						return;
					}
					let contentLength = headers['Content-Length'];
					if (!contentLength) {
						throw new Error('Header must provide a Content-Length property.');
					}
					let length = parseInt(contentLength);
					if (isNaN(length)) {
						throw new Error('Content-Length value must be a number.');
					}
					this.nextMessageLength = length;
					// Take the encoding form the header. For compatibility
					// treat both utf-8 and utf8 as node utf8
				}
				var msg = this.buffer.tryReadContent(this.nextMessageLength);
				if (msg === null) {
					/** We haven't recevied the full message yet. */
					this.setPartialMessageTimer();
					return;
				}
				this.clearPartialMessageTimer();
				this.nextMessageLength = -1;
				this.messageToken++;
				var json = JSON.parse(msg);
				this.callback(json);
			}
		}
		clearPartialMessageTimer() {
			if (this.partialMessageTimer) {
				clearTimeout(this.partialMessageTimer);
				this.partialMessageTimer = undefined;
			}
		}
		setPartialMessageTimer() {
			this.clearPartialMessageTimer();
			if (this._partialMessageTimeout <= 0) {
				return;
			}
			this.partialMessageTimer = setTimeout((token, timeout) => {
				this.partialMessageTimer = undefined;
				if (token === this.messageToken) {
					this.firePartialMessage({ messageToken: token, waitingTime: timeout });
					this.setPartialMessageTimer();
				}
			}, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
		}
	}
	exports.StreamMessageReader = StreamMessageReader;
	class IPCMessageReader extends AbstractMessageReader {
		constructor(process) {
			super();
			this.process = process;
			let eventEmitter = this.process;
			eventEmitter.on('error', (error) => this.fireError(error));
			eventEmitter.on('close', () => this.fireClose());
		}
		listen(callback) {
			this.process.on('message', callback);
		}
	}
	exports.IPCMessageReader = IPCMessageReader;
	class SocketMessageReader extends StreamMessageReader {
		constructor(socket, encoding = 'utf-8') {
			super(socket, encoding);
		}
	}
	exports.SocketMessageReader = SocketMessageReader;


	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	var Disposable;
	(function (Disposable) {
		function create(func) {
			return {
				dispose: func
			};
		}
		Disposable.create = create;
	})(Disposable = exports.Disposable || (exports.Disposable = {}));
	var Event;
	(function (Event) {
		const _disposable = { dispose() { } };
		Event.None = function () { return _disposable; };
	})(Event = exports.Event || (exports.Event = {}));
	class CallbackList {
		add(callback, context = null, bucket) {
			if (!this._callbacks) {
				this._callbacks = [];
				this._contexts = [];
			}
			this._callbacks.push(callback);
			this._contexts.push(context);
			if (Array.isArray(bucket)) {
				bucket.push({ dispose: () => this.remove(callback, context) });
			}
		}
		remove(callback, context = null) {
			if (!this._callbacks) {
				return;
			}
			var foundCallbackWithDifferentContext = false;
			for (var i = 0, len = this._callbacks.length; i < len; i++) {
				if (this._callbacks[i] === callback) {
					if (this._contexts[i] === context) {
						// callback & context match => remove it
						this._callbacks.splice(i, 1);
						this._contexts.splice(i, 1);
						return;
					}
					else {
						foundCallbackWithDifferentContext = true;
					}
				}
			}
			if (foundCallbackWithDifferentContext) {
				throw new Error('When adding a listener with a context, you should remove it with the same context');
			}
		}
		invoke(...args) {
			if (!this._callbacks) {
				return [];
			}
			var ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
			for (var i = 0, len = callbacks.length; i < len; i++) {
				try {
					ret.push(callbacks[i].apply(contexts[i], args));
				}
				catch (e) {
					console.error(e);
				}
			}
			return ret;
		}
		isEmpty() {
			return !this._callbacks || this._callbacks.length === 0;
		}
		dispose() {
			this._callbacks = undefined;
			this._contexts = undefined;
		}
	}
	class Emitter {
		constructor(_options) {
			this._options = _options;
		}
		/**
		 * For the public to allow to subscribe
		 * to events from this Emitter
		 */
		get event() {
			if (!this._event) {
				this._event = (listener, thisArgs, disposables) => {
					if (!this._callbacks) {
						this._callbacks = new CallbackList();
					}
					if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
						this._options.onFirstListenerAdd(this);
					}
					this._callbacks.add(listener, thisArgs);
					let result;
					result = {
						dispose: () => {
							this._callbacks.remove(listener, thisArgs);
							result.dispose = Emitter._noop;
							if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
								this._options.onLastListenerRemove(this);
							}
						}
					};
					if (Array.isArray(disposables)) {
						disposables.push(result);
					}
					return result;
				};
			}
			return this._event;
		}
		/**
		 * To be kept private to fire an event to
		 * subscribers
		 */
		fire(event) {
			if (this._callbacks) {
				this._callbacks.invoke.call(this._callbacks, event);
			}
		}
		dispose() {
			if (this._callbacks) {
				this._callbacks.dispose();
				this._callbacks = undefined;
			}
		}
	}
	Emitter._noop = function () { };
	exports.Emitter = Emitter;


	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(43);
	const Is = __webpack_require__(40);
	let ContentLength = 'Content-Length: ';
	let CRLF = '\r\n';
	var MessageWriter;
	(function (MessageWriter) {
		function is(value) {
			let candidate = value;
			return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) &&
				Is.func(candidate.onError) && Is.func(candidate.write);
		}
		MessageWriter.is = is;
	})(MessageWriter = exports.MessageWriter || (exports.MessageWriter = {}));
	class AbstractMessageWriter {
		constructor() {
			this.errorEmitter = new events_1.Emitter();
			this.closeEmitter = new events_1.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose();
			this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(error, message, count) {
			this.errorEmitter.fire([this.asError(error), message, count]);
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(undefined);
		}
		asError(error) {
			if (error instanceof Error) {
				return error;
			}
			else {
				return new Error(`Writer recevied error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
			}
		}
	}
	exports.AbstractMessageWriter = AbstractMessageWriter;
	class StreamMessageWriter extends AbstractMessageWriter {
		constructor(writable, encoding = 'utf8') {
			super();
			this.writable = writable;
			this.encoding = encoding;
			this.errorCount = 0;
			this.writable.on('error', (error) => this.fireError(error));
			this.writable.on('close', () => this.fireClose());
		}
		write(msg) {
			let json = JSON.stringify(msg);
			let contentLength = Buffer.byteLength(json, this.encoding);
			let headers = [
				ContentLength, contentLength.toString(), CRLF,
				CRLF
			];
			try {
				// Header must be written in ASCII encoding
				this.writable.write(headers.join(''), 'ascii');
				// Now write the content. This can be written in any encoding
				this.writable.write(json, this.encoding);
				this.errorCount = 0;
			}
			catch (error) {
				this.errorCount++;
				this.fireError(error, msg, this.errorCount);
			}
		}
	}
	exports.StreamMessageWriter = StreamMessageWriter;
	class IPCMessageWriter extends AbstractMessageWriter {
		constructor(process) {
			super();
			this.process = process;
			this.errorCount = 0;
			this.queue = [];
			this.sending = false;
			let eventEmitter = this.process;
			eventEmitter.on('error', (error) => this.fireError(error));
			eventEmitter.on('close', () => this.fireClose);
		}
		write(msg) {
			if (!this.sending && this.queue.length === 0) {
				// See https://github.com/nodejs/node/issues/7657
				this.doWriteMessage(msg);
			}
			else {
				this.queue.push(msg);
			}
		}
		doWriteMessage(msg) {
			try {
				if (this.process.send) {
					this.sending = true;
					this.process.send(msg, undefined, undefined, (error) => {
						this.sending = false;
						if (error) {
							this.errorCount++;
							this.fireError(error, msg, this.errorCount);
						}
						else {
							this.errorCount = 0;
						}
						if (this.queue.length > 0) {
							this.doWriteMessage(this.queue.shift());
						}
					});
				}
			}
			catch (error) {
				this.errorCount++;
				this.fireError(error, msg, this.errorCount);
			}
		}
	}
	exports.IPCMessageWriter = IPCMessageWriter;
	class SocketMessageWriter extends AbstractMessageWriter {
		constructor(socket, encoding = 'utf8') {
			super();
			this.socket = socket;
			this.queue = [];
			this.sending = false;
			this.encoding = encoding;
			this.errorCount = 0;
			this.socket.on('error', (error) => this.fireError(error));
			this.socket.on('close', () => this.fireClose());
		}
		write(msg) {
			if (!this.sending && this.queue.length === 0) {
				// See https://github.com/nodejs/node/issues/7657
				this.doWriteMessage(msg);
			}
			else {
				this.queue.push(msg);
			}
		}
		doWriteMessage(msg) {
			let json = JSON.stringify(msg);
			let contentLength = Buffer.byteLength(json, this.encoding);
			let headers = [
				ContentLength, contentLength.toString(), CRLF,
				CRLF
			];
			try {
				// Header must be written in ASCII encoding
				this.sending = true;
				this.socket.write(headers.join(''), 'ascii', (error) => {
					if (error) {
						this.handleError(error, msg);
					}
					try {
						// Now write the content. This can be written in any encoding
						this.socket.write(json, this.encoding, (error) => {
							this.sending = false;
							if (error) {
								this.handleError(error, msg);
							}
							else {
								this.errorCount = 0;
							}
							if (this.queue.length > 0) {
								this.doWriteMessage(this.queue.shift());
							}
						});
					}
					catch (error) {
						this.handleError(error, msg);
					}
				});
			}
			catch (error) {
				this.handleError(error, msg);
			}
		}
		handleError(error, msg) {
			this.errorCount++;
			this.fireError(error, msg, this.errorCount);
		}
	}
	exports.SocketMessageWriter = SocketMessageWriter;


	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(43);
	const Is = __webpack_require__(40);
	var CancellationToken;
	(function (CancellationToken) {
		CancellationToken.None = Object.freeze({
			isCancellationRequested: false,
			onCancellationRequested: events_1.Event.None
		});
		CancellationToken.Cancelled = Object.freeze({
			isCancellationRequested: true,
			onCancellationRequested: events_1.Event.None
		});
		function is(value) {
			let candidate = value;
			return candidate && (candidate === CancellationToken.None
				|| candidate === CancellationToken.Cancelled
				|| (Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
		}
		CancellationToken.is = is;
	})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
	const shortcutEvent = Object.freeze(function (callback, context) {
		let handle = setTimeout(callback.bind(context), 0);
		return { dispose() { clearTimeout(handle); } };
	});
	class MutableToken {
		constructor() {
			this._isCancelled = false;
		}
		cancel() {
			if (!this._isCancelled) {
				this._isCancelled = true;
				if (this._emitter) {
					this._emitter.fire(undefined);
					this._emitter = undefined;
				}
			}
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			if (this._isCancelled) {
				return shortcutEvent;
			}
			if (!this._emitter) {
				this._emitter = new events_1.Emitter();
			}
			return this._emitter.event;
		}
	}
	class CancellationTokenSource {
		get token() {
			if (!this._token) {
				// be lazy and create the token only when
				// actually needed
				this._token = new MutableToken();
			}
			return this._token;
		}
		cancel() {
			if (!this._token) {
				// save an object by returning the default
				// cancelled token when cancellation happens
				// before someone asks for the token
				this._token = CancellationToken.Cancelled;
			}
			else {
				this._token.cancel();
			}
		}
		dispose() {
			this.cancel();
		}
	}
	exports.CancellationTokenSource = CancellationTokenSource;


	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var Touch;
	(function (Touch) {
		Touch.None = 0;
		Touch.First = 1;
		Touch.Last = 2;
	})(Touch = exports.Touch || (exports.Touch = {}));
	class LinkedMap {
		constructor() {
			this._map = new Map();
			this._head = undefined;
			this._tail = undefined;
			this._size = 0;
		}
		clear() {
			this._map.clear();
			this._head = undefined;
			this._tail = undefined;
			this._size = 0;
		}
		isEmpty() {
			return !this._head && !this._tail;
		}
		get size() {
			return this._size;
		}
		has(key) {
			return this._map.has(key);
		}
		get(key) {
			const item = this._map.get(key);
			if (!item) {
				return undefined;
			}
			return item.value;
		}
		set(key, value, touch = Touch.None) {
			let item = this._map.get(key);
			if (item) {
				item.value = value;
				if (touch !== Touch.None) {
					this.touch(item, touch);
				}
			}
			else {
				item = { key, value, next: undefined, previous: undefined };
				switch (touch) {
					case Touch.None:
						this.addItemLast(item);
						break;
					case Touch.First:
						this.addItemFirst(item);
						break;
					case Touch.Last:
						this.addItemLast(item);
						break;
					default:
						this.addItemLast(item);
						break;
				}
				this._map.set(key, item);
				this._size++;
			}
		}
		delete(key) {
			const item = this._map.get(key);
			if (!item) {
				return false;
			}
			this._map.delete(key);
			this.removeItem(item);
			this._size--;
			return true;
		}
		shift() {
			if (!this._head && !this._tail) {
				return undefined;
			}
			if (!this._head || !this._tail) {
				throw new Error('Invalid list');
			}
			const item = this._head;
			this._map.delete(item.key);
			this.removeItem(item);
			this._size--;
			return item.value;
		}
		forEach(callbackfn, thisArg) {
			let current = this._head;
			while (current) {
				if (thisArg) {
					callbackfn.bind(thisArg)(current.value, current.key, this);
				}
				else {
					callbackfn(current.value, current.key, this);
				}
				current = current.next;
			}
		}
		forEachReverse(callbackfn, thisArg) {
			let current = this._tail;
			while (current) {
				if (thisArg) {
					callbackfn.bind(thisArg)(current.value, current.key, this);
				}
				else {
					callbackfn(current.value, current.key, this);
				}
				current = current.previous;
			}
		}
		values() {
			let result = [];
			let current = this._head;
			while (current) {
				result.push(current.value);
				current = current.next;
			}
			return result;
		}
		keys() {
			let result = [];
			let current = this._head;
			while (current) {
				result.push(current.key);
				current = current.next;
			}
			return result;
		}
		/* JSON RPC run on es5 which has no Symbol.iterator
		public keys(): IterableIterator<K> {
			let current = this._head;
			let iterator: IterableIterator<K> = {
				[Symbol.iterator]() {
					return iterator;
				},
				next():IteratorResult<K> {
					if (current) {
						let result = { value: current.key, done: false };
						current = current.next;
						return result;
					} else {
						return { value: undefined, done: true };
					}
				}
			};
			return iterator;
		}

		public values(): IterableIterator<V> {
			let current = this._head;
			let iterator: IterableIterator<V> = {
				[Symbol.iterator]() {
					return iterator;
				},
				next():IteratorResult<V> {
					if (current) {
						let result = { value: current.value, done: false };
						current = current.next;
						return result;
					} else {
						return { value: undefined, done: true };
					}
				}
			};
			return iterator;
		}
		*/
		addItemFirst(item) {
			// First time Insert
			if (!this._head && !this._tail) {
				this._tail = item;
			}
			else if (!this._head) {
				throw new Error('Invalid list');
			}
			else {
				item.next = this._head;
				this._head.previous = item;
			}
			this._head = item;
		}
		addItemLast(item) {
			// First time Insert
			if (!this._head && !this._tail) {
				this._head = item;
			}
			else if (!this._tail) {
				throw new Error('Invalid list');
			}
			else {
				item.previous = this._tail;
				this._tail.next = item;
			}
			this._tail = item;
		}
		removeItem(item) {
			if (item === this._head && item === this._tail) {
				this._head = undefined;
				this._tail = undefined;
			}
			else if (item === this._head) {
				this._head = item.next;
			}
			else if (item === this._tail) {
				this._tail = item.previous;
			}
			else {
				const next = item.next;
				const previous = item.previous;
				if (!next || !previous) {
					throw new Error('Invalid list');
				}
				next.previous = previous;
				previous.next = next;
			}
		}
		touch(item, touch) {
			if (!this._head || !this._tail) {
				throw new Error('Invalid list');
			}
			if ((touch !== Touch.First && touch !== Touch.Last)) {
				return;
			}
			if (touch === Touch.First) {
				if (item === this._head) {
					return;
				}
				const next = item.next;
				const previous = item.previous;
				// Unlink the item
				if (item === this._tail) {
					// previous must be defined since item was not head but is tail
					// So there are more than on item in the map
					previous.next = undefined;
					this._tail = previous;
				}
				else {
					// Both next and previous are not undefined since item was neither head nor tail.
					next.previous = previous;
					previous.next = next;
				}
				// Insert the node at head
				item.previous = undefined;
				item.next = this._head;
				this._head.previous = item;
				this._head = item;
			}
			else if (touch === Touch.Last) {
				if (item === this._tail) {
					return;
				}
				const next = item.next;
				const previous = item.previous;
				// Unlink the item.
				if (item === this._head) {
					// next must be defined since item was not tail but is head
					// So there are more than on item in the map
					next.previous = undefined;
					this._head = next;
				}
				else {
					// Both next and previous are not undefined since item was neither head nor tail.
					next.previous = previous;
					previous.next = next;
				}
				item.next = undefined;
				item.previous = this._tail;
				this._tail.next = item;
				this._tail = item;
			}
		}
	}
	exports.LinkedMap = LinkedMap;


	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const path_1 = __webpack_require__(1);
	const os_1 = __webpack_require__(48);
	const crypto_1 = __webpack_require__(49);
	const net_1 = __webpack_require__(9);
	const messageReader_1 = __webpack_require__(42);
	const messageWriter_1 = __webpack_require__(44);
	function generateRandomPipeName() {
		const randomSuffix = crypto_1.randomBytes(21).toString('hex');
		if (process.platform === 'win32') {
			return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
		}
		else {
			// Mac/Unix: use socket file
			return path_1.join(os_1.tmpdir(), `vscode-${randomSuffix}.sock`);
		}
	}
	exports.generateRandomPipeName = generateRandomPipeName;
	function createClientPipeTransport(pipeName, encoding = 'utf-8') {
		let connectResolve;
		let connected = new Promise((resolve, _reject) => {
			connectResolve = resolve;
		});
		return new Promise((resolve, reject) => {
			let server = net_1.createServer((socket) => {
				server.close();
				connectResolve([
					new messageReader_1.SocketMessageReader(socket, encoding),
					new messageWriter_1.SocketMessageWriter(socket, encoding)
				]);
			});
			server.on('error', reject);
			server.listen(pipeName, () => {
				server.removeListener('error', reject);
				resolve({
					onConnected: () => { return connected; }
				});
			});
		});
	}
	exports.createClientPipeTransport = createClientPipeTransport;
	function createServerPipeTransport(pipeName, encoding = 'utf-8') {
		const socket = net_1.createConnection(pipeName);
		return [
			new messageReader_1.SocketMessageReader(socket, encoding),
			new messageWriter_1.SocketMessageWriter(socket, encoding)
		];
	}
	exports.createServerPipeTransport = createServerPipeTransport;


	/***/ }),
	/* 48 */
	/***/ (function(module, exports) {

	module.exports = require("os");

	/***/ }),
	/* 49 */
	/***/ (function(module, exports) {

	module.exports = require("crypto");

	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const net_1 = __webpack_require__(9);
	const messageReader_1 = __webpack_require__(42);
	const messageWriter_1 = __webpack_require__(44);
	function createClientSocketTransport(port, encoding = 'utf-8') {
		let connectResolve;
		let connected = new Promise((resolve, _reject) => {
			connectResolve = resolve;
		});
		return new Promise((resolve, reject) => {
			let server = net_1.createServer((socket) => {
				server.close();
				connectResolve([
					new messageReader_1.SocketMessageReader(socket, encoding),
					new messageWriter_1.SocketMessageWriter(socket, encoding)
				]);
			});
			server.on('error', reject);
			server.listen(port, '127.0.0.1', () => {
				server.removeListener('error', reject);
				resolve({
					onConnected: () => { return connected; }
				});
			});
		});
	}
	exports.createClientSocketTransport = createClientSocketTransport;
	function createServerSocketTransport(port, encoding = 'utf-8') {
		const socket = net_1.createConnection(port, '127.0.0.1');
		return [
			new messageReader_1.SocketMessageReader(socket, encoding),
			new messageWriter_1.SocketMessageWriter(socket, encoding)
		];
	}
	exports.createServerSocketTransport = createServerSocketTransport;


	/***/ }),
	/* 51 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationLink", function() { return LocationLink; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return ColorInformation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return ColorPresentation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return FoldingRangeKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return FoldingRange; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticRelatedInformation", function() { return DiagnosticRelatedInformation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticSeverity", function() { return DiagnosticSeverity; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diagnostic", function() { return Diagnostic; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return TextEdit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentEdit", function() { return TextDocumentEdit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFile", function() { return CreateFile; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenameFile", function() { return RenameFile; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteFile", function() { return DeleteFile; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceEdit", function() { return WorkspaceEdit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceChange", function() { return WorkspaceChange; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentIdentifier", function() { return TextDocumentIdentifier; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionedTextDocumentIdentifier", function() { return VersionedTextDocumentIdentifier; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentItem", function() { return TextDocumentItem; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupKind", function() { return MarkupKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupContent", function() { return MarkupContent; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemKind", function() { return CompletionItemKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertTextFormat", function() { return InsertTextFormat; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItem", function() { return CompletionItem; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionList", function() { return CompletionList; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedString", function() { return MarkedString; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hover", function() { return Hover; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterInformation", function() { return ParameterInformation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureInformation", function() { return SignatureInformation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlightKind", function() { return DocumentHighlightKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlight", function() { return DocumentHighlight; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolKind", function() { return SymbolKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInformation", function() { return SymbolInformation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSymbol", function() { return DocumentSymbol; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionKind", function() { return CodeActionKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionContext", function() { return CodeActionContext; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeAction", function() { return CodeAction; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeLens", function() { return CodeLens; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattingOptions", function() { return FormattingOptions; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentLink", function() { return DocumentLink; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOL", function() { return EOL; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocument", function() { return TextDocument; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentSaveReason", function() { return TextDocumentSaveReason; });
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	/**
	 * The Position namespace provides helper functions to work with
	 * [Position](#Position) literals.
	 */
	var Position;
	(function (Position) {
		/**
		 * Creates a new Position literal from the given line and character.
		 * @param line The position's line.
		 * @param character The position's character.
		 */
		function create(line, character) {
			return { line: line, character: character };
		}
		Position.create = create;
		/**
		 * Checks whether the given liternal conforms to the [Position](#Position) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
		}
		Position.is = is;
	})(Position || (Position = {}));
	/**
	 * The Range namespace provides helper functions to work with
	 * [Range](#Range) literals.
	 */
	var Range;
	(function (Range) {
		function create(one, two, three, four) {
			if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
				return { start: Position.create(one, two), end: Position.create(three, four) };
			}
			else if (Position.is(one) && Position.is(two)) {
				return { start: one, end: two };
			}
			else {
				throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
			}
		}
		Range.create = create;
		/**
		 * Checks whether the given literal conforms to the [Range](#Range) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
		}
		Range.is = is;
	})(Range || (Range = {}));
	/**
	 * The Location namespace provides helper functions to work with
	 * [Location](#Location) literals.
	 */
	var Location;
	(function (Location) {
		/**
		 * Creates a Location literal.
		 * @param uri The location's uri.
		 * @param range The location's range.
		 */
		function create(uri, range) {
			return { uri: uri, range: range };
		}
		Location.create = create;
		/**
		 * Checks whether the given literal conforms to the [Location](#Location) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
		}
		Location.is = is;
	})(Location || (Location = {}));
	/**
	 * The LocationLink namespace provides helper functions to work with
	 * [LocationLink](#LocationLink) literals.
	 */
	var LocationLink;
	(function (LocationLink) {
		/**
		 * Creates a LocationLink literal.
		 * @param targetUri The definition's uri.
		 * @param targetRange The full range of the definition.
		 * @param targetSelectionRange The span of the symbol definition at the target.
		 * @param originSelectionRange The span of the symbol being defined in the originating source file.
		 */
		function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
			return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
		}
		LocationLink.create = create;
		/**
		 * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
				&& (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
				&& (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
		}
		LocationLink.is = is;
	})(LocationLink || (LocationLink = {}));
	/**
	 * The Color namespace provides helper functions to work with
	 * [Color](#Color) literals.
	 */
	var Color;
	(function (Color) {
		/**
		 * Creates a new Color literal.
		 */
		function create(red, green, blue, alpha) {
			return {
				red: red,
				green: green,
				blue: blue,
				alpha: alpha,
			};
		}
		Color.create = create;
		/**
		 * Checks whether the given literal conforms to the [Color](#Color) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.number(candidate.red)
				&& Is.number(candidate.green)
				&& Is.number(candidate.blue)
				&& Is.number(candidate.alpha);
		}
		Color.is = is;
	})(Color || (Color = {}));
	/**
	 * The ColorInformation namespace provides helper functions to work with
	 * [ColorInformation](#ColorInformation) literals.
	 */
	var ColorInformation;
	(function (ColorInformation) {
		/**
		 * Creates a new ColorInformation literal.
		 */
		function create(range, color) {
			return {
				range: range,
				color: color,
			};
		}
		ColorInformation.create = create;
		/**
		 * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
		 */
		function is(value) {
			var candidate = value;
			return Range.is(candidate.range) && Color.is(candidate.color);
		}
		ColorInformation.is = is;
	})(ColorInformation || (ColorInformation = {}));
	/**
	 * The Color namespace provides helper functions to work with
	 * [ColorPresentation](#ColorPresentation) literals.
	 */
	var ColorPresentation;
	(function (ColorPresentation) {
		/**
		 * Creates a new ColorInformation literal.
		 */
		function create(label, textEdit, additionalTextEdits) {
			return {
				label: label,
				textEdit: textEdit,
				additionalTextEdits: additionalTextEdits,
			};
		}
		ColorPresentation.create = create;
		/**
		 * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.string(candidate.label)
				&& (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
				&& (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
		}
		ColorPresentation.is = is;
	})(ColorPresentation || (ColorPresentation = {}));
	/**
	 * Enum of known range kinds
	 */
	var FoldingRangeKind;
	(function (FoldingRangeKind) {
		/**
		 * Folding range for a comment
		 */
		FoldingRangeKind["Comment"] = "comment";
		/**
		 * Folding range for a imports or includes
		 */
		FoldingRangeKind["Imports"] = "imports";
		/**
		 * Folding range for a region (e.g. `#region`)
		 */
		FoldingRangeKind["Region"] = "region";
	})(FoldingRangeKind || (FoldingRangeKind = {}));
	/**
	 * The folding range namespace provides helper functions to work with
	 * [FoldingRange](#FoldingRange) literals.
	 */
	var FoldingRange;
	(function (FoldingRange) {
		/**
		 * Creates a new FoldingRange literal.
		 */
		function create(startLine, endLine, startCharacter, endCharacter, kind) {
			var result = {
				startLine: startLine,
				endLine: endLine
			};
			if (Is.defined(startCharacter)) {
				result.startCharacter = startCharacter;
			}
			if (Is.defined(endCharacter)) {
				result.endCharacter = endCharacter;
			}
			if (Is.defined(kind)) {
				result.kind = kind;
			}
			return result;
		}
		FoldingRange.create = create;
		/**
		 * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.number(candidate.startLine) && Is.number(candidate.startLine)
				&& (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter))
				&& (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter))
				&& (Is.undefined(candidate.kind) || Is.string(candidate.kind));
		}
		FoldingRange.is = is;
	})(FoldingRange || (FoldingRange = {}));
	/**
	 * The DiagnosticRelatedInformation namespace provides helper functions to work with
	 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
	 */
	var DiagnosticRelatedInformation;
	(function (DiagnosticRelatedInformation) {
		/**
		 * Creates a new DiagnosticRelatedInformation literal.
		 */
		function create(location, message) {
			return {
				location: location,
				message: message
			};
		}
		DiagnosticRelatedInformation.create = create;
		/**
		 * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
		}
		DiagnosticRelatedInformation.is = is;
	})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
	/**
	 * The diagnostic's severity.
	 */
	var DiagnosticSeverity;
	(function (DiagnosticSeverity) {
		/**
		 * Reports an error.
		 */
		DiagnosticSeverity.Error = 1;
		/**
		 * Reports a warning.
		 */
		DiagnosticSeverity.Warning = 2;
		/**
		 * Reports an information.
		 */
		DiagnosticSeverity.Information = 3;
		/**
		 * Reports a hint.
		 */
		DiagnosticSeverity.Hint = 4;
	})(DiagnosticSeverity || (DiagnosticSeverity = {}));
	/**
	 * The Diagnostic namespace provides helper functions to work with
	 * [Diagnostic](#Diagnostic) literals.
	 */
	var Diagnostic;
	(function (Diagnostic) {
		/**
		 * Creates a new Diagnostic literal.
		 */
		function create(range, message, severity, code, source, relatedInformation) {
			var result = { range: range, message: message };
			if (Is.defined(severity)) {
				result.severity = severity;
			}
			if (Is.defined(code)) {
				result.code = code;
			}
			if (Is.defined(source)) {
				result.source = source;
			}
			if (Is.defined(relatedInformation)) {
				result.relatedInformation = relatedInformation;
			}
			return result;
		}
		Diagnostic.create = create;
		/**
		 * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate)
				&& Range.is(candidate.range)
				&& Is.string(candidate.message)
				&& (Is.number(candidate.severity) || Is.undefined(candidate.severity))
				&& (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
				&& (Is.string(candidate.source) || Is.undefined(candidate.source))
				&& (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
		}
		Diagnostic.is = is;
	})(Diagnostic || (Diagnostic = {}));
	/**
	 * The Command namespace provides helper functions to work with
	 * [Command](#Command) literals.
	 */
	var Command;
	(function (Command) {
		/**
		 * Creates a new Command literal.
		 */
		function create(title, command) {
			var args = [];
			for (var _i = 2; _i < arguments.length; _i++) {
				args[_i - 2] = arguments[_i];
			}
			var result = { title: title, command: command };
			if (Is.defined(args) && args.length > 0) {
				result.arguments = args;
			}
			return result;
		}
		Command.create = create;
		/**
		 * Checks whether the given literal conforms to the [Command](#Command) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
		}
		Command.is = is;
	})(Command || (Command = {}));
	/**
	 * The TextEdit namespace provides helper function to create replace,
	 * insert and delete edits more easily.
	 */
	var TextEdit;
	(function (TextEdit) {
		/**
		 * Creates a replace text edit.
		 * @param range The range of text to be replaced.
		 * @param newText The new text.
		 */
		function replace(range, newText) {
			return { range: range, newText: newText };
		}
		TextEdit.replace = replace;
		/**
		 * Creates a insert text edit.
		 * @param position The position to insert the text at.
		 * @param newText The text to be inserted.
		 */
		function insert(position, newText) {
			return { range: { start: position, end: position }, newText: newText };
		}
		TextEdit.insert = insert;
		/**
		 * Creates a delete text edit.
		 * @param range The range of text to be deleted.
		 */
		function del(range) {
			return { range: range, newText: '' };
		}
		TextEdit.del = del;
		function is(value) {
			var candidate = value;
			return Is.objectLiteral(candidate)
				&& Is.string(candidate.newText)
				&& Range.is(candidate.range);
		}
		TextEdit.is = is;
	})(TextEdit || (TextEdit = {}));
	/**
	 * The TextDocumentEdit namespace provides helper function to create
	 * an edit that manipulates a text document.
	 */
	var TextDocumentEdit;
	(function (TextDocumentEdit) {
		/**
		 * Creates a new `TextDocumentEdit`
		 */
		function create(textDocument, edits) {
			return { textDocument: textDocument, edits: edits };
		}
		TextDocumentEdit.create = create;
		function is(value) {
			var candidate = value;
			return Is.defined(candidate)
				&& VersionedTextDocumentIdentifier.is(candidate.textDocument)
				&& Array.isArray(candidate.edits);
		}
		TextDocumentEdit.is = is;
	})(TextDocumentEdit || (TextDocumentEdit = {}));
	var CreateFile;
	(function (CreateFile) {
		function create(uri, options) {
			var result = {
				kind: 'create',
				uri: uri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
				result.options = options;
			}
			return result;
		}
		CreateFile.create = create;
		function is(value) {
			var candidate = value;
			return candidate && candidate.kind === 'create' && Is.string(candidate.uri) &&
				(candidate.options === void 0 ||
					((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
		}
		CreateFile.is = is;
	})(CreateFile || (CreateFile = {}));
	var RenameFile;
	(function (RenameFile) {
		function create(oldUri, newUri, options) {
			var result = {
				kind: 'rename',
				oldUri: oldUri,
				newUri: newUri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
				result.options = options;
			}
			return result;
		}
		RenameFile.create = create;
		function is(value) {
			var candidate = value;
			return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) &&
				(candidate.options === void 0 ||
					((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
		}
		RenameFile.is = is;
	})(RenameFile || (RenameFile = {}));
	var DeleteFile;
	(function (DeleteFile) {
		function create(uri, options) {
			var result = {
				kind: 'delete',
				uri: uri
			};
			if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
				result.options = options;
			}
			return result;
		}
		DeleteFile.create = create;
		function is(value) {
			var candidate = value;
			return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) &&
				(candidate.options === void 0 ||
					((candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))));
		}
		DeleteFile.is = is;
	})(DeleteFile || (DeleteFile = {}));
	var WorkspaceEdit;
	(function (WorkspaceEdit) {
		function is(value) {
			var candidate = value;
			return candidate &&
				(candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
				(candidate.documentChanges === void 0 || candidate.documentChanges.every(function (change) {
					if (Is.string(change.kind)) {
						return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
					}
					else {
						return TextDocumentEdit.is(change);
					}
				}));
		}
		WorkspaceEdit.is = is;
	})(WorkspaceEdit || (WorkspaceEdit = {}));
	var TextEditChangeImpl = /** @class */ (function () {
		function TextEditChangeImpl(edits) {
			this.edits = edits;
		}
		TextEditChangeImpl.prototype.insert = function (position, newText) {
			this.edits.push(TextEdit.insert(position, newText));
		};
		TextEditChangeImpl.prototype.replace = function (range, newText) {
			this.edits.push(TextEdit.replace(range, newText));
		};
		TextEditChangeImpl.prototype.delete = function (range) {
			this.edits.push(TextEdit.del(range));
		};
		TextEditChangeImpl.prototype.add = function (edit) {
			this.edits.push(edit);
		};
		TextEditChangeImpl.prototype.all = function () {
			return this.edits;
		};
		TextEditChangeImpl.prototype.clear = function () {
			this.edits.splice(0, this.edits.length);
		};
		return TextEditChangeImpl;
	}());
	/**
	 * A workspace change helps constructing changes to a workspace.
	 */
	var WorkspaceChange = /** @class */ (function () {
		function WorkspaceChange(workspaceEdit) {
			var _this = this;
			this._textEditChanges = Object.create(null);
			if (workspaceEdit) {
				this._workspaceEdit = workspaceEdit;
				if (workspaceEdit.documentChanges) {
					workspaceEdit.documentChanges.forEach(function (change) {
						if (TextDocumentEdit.is(change)) {
							var textEditChange = new TextEditChangeImpl(change.edits);
							_this._textEditChanges[change.textDocument.uri] = textEditChange;
						}
					});
				}
				else if (workspaceEdit.changes) {
					Object.keys(workspaceEdit.changes).forEach(function (key) {
						var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
						_this._textEditChanges[key] = textEditChange;
					});
				}
			}
		}
		Object.defineProperty(WorkspaceChange.prototype, "edit", {
			/**
			 * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
			 * use to be returned from a workspace edit operation like rename.
			 */
			get: function () {
				return this._workspaceEdit;
			},
			enumerable: true,
			configurable: true
		});
		WorkspaceChange.prototype.getTextEditChange = function (key) {
			if (VersionedTextDocumentIdentifier.is(key)) {
				if (!this._workspaceEdit) {
					this._workspaceEdit = {
						documentChanges: []
					};
				}
				if (!this._workspaceEdit.documentChanges) {
					throw new Error('Workspace edit is not configured for document changes.');
				}
				var textDocument = key;
				var result = this._textEditChanges[textDocument.uri];
				if (!result) {
					var edits = [];
					var textDocumentEdit = {
						textDocument: textDocument,
						edits: edits
					};
					this._workspaceEdit.documentChanges.push(textDocumentEdit);
					result = new TextEditChangeImpl(edits);
					this._textEditChanges[textDocument.uri] = result;
				}
				return result;
			}
			else {
				if (!this._workspaceEdit) {
					this._workspaceEdit = {
						changes: Object.create(null)
					};
				}
				if (!this._workspaceEdit.changes) {
					throw new Error('Workspace edit is not configured for normal text edit changes.');
				}
				var result = this._textEditChanges[key];
				if (!result) {
					var edits = [];
					this._workspaceEdit.changes[key] = edits;
					result = new TextEditChangeImpl(edits);
					this._textEditChanges[key] = result;
				}
				return result;
			}
		};
		WorkspaceChange.prototype.createFile = function (uri, options) {
			this.checkDocumentChanges();
			this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
		};
		WorkspaceChange.prototype.renameFile = function (oldUri, newUri, options) {
			this.checkDocumentChanges();
			this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
		};
		WorkspaceChange.prototype.deleteFile = function (uri, options) {
			this.checkDocumentChanges();
			this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
		};
		WorkspaceChange.prototype.checkDocumentChanges = function () {
			if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
				throw new Error('Workspace edit is not configured for document changes.');
			}
		};
		return WorkspaceChange;
	}());

	/**
	 * The TextDocumentIdentifier namespace provides helper functions to work with
	 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
	 */
	var TextDocumentIdentifier;
	(function (TextDocumentIdentifier) {
		/**
		 * Creates a new TextDocumentIdentifier literal.
		 * @param uri The document's uri.
		 */
		function create(uri) {
			return { uri: uri };
		}
		TextDocumentIdentifier.create = create;
		/**
		 * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri);
		}
		TextDocumentIdentifier.is = is;
	})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
	/**
	 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
	 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
	 */
	var VersionedTextDocumentIdentifier;
	(function (VersionedTextDocumentIdentifier) {
		/**
		 * Creates a new VersionedTextDocumentIdentifier literal.
		 * @param uri The document's uri.
		 * @param uri The document's text.
		 */
		function create(uri, version) {
			return { uri: uri, version: version };
		}
		VersionedTextDocumentIdentifier.create = create;
		/**
		 * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
		}
		VersionedTextDocumentIdentifier.is = is;
	})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
	/**
	 * The TextDocumentItem namespace provides helper functions to work with
	 * [TextDocumentItem](#TextDocumentItem) literals.
	 */
	var TextDocumentItem;
	(function (TextDocumentItem) {
		/**
		 * Creates a new TextDocumentItem literal.
		 * @param uri The document's uri.
		 * @param languageId The document's language identifier.
		 * @param version The document's version number.
		 * @param text The document's text.
		 */
		function create(uri, languageId, version, text) {
			return { uri: uri, languageId: languageId, version: version, text: text };
		}
		TextDocumentItem.create = create;
		/**
		 * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
		}
		TextDocumentItem.is = is;
	})(TextDocumentItem || (TextDocumentItem = {}));
	/**
	 * Describes the content type that a client supports in various
	 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
	 *
	 * Please note that `MarkupKinds` must not start with a `$`. This kinds
	 * are reserved for internal usage.
	 */
	var MarkupKind;
	(function (MarkupKind) {
		/**
		 * Plain text is supported as a content format
		 */
		MarkupKind.PlainText = 'plaintext';
		/**
		 * Markdown is supported as a content format
		 */
		MarkupKind.Markdown = 'markdown';
	})(MarkupKind || (MarkupKind = {}));
	(function (MarkupKind) {
		/**
		 * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
		 */
		function is(value) {
			var candidate = value;
			return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
		}
		MarkupKind.is = is;
	})(MarkupKind || (MarkupKind = {}));
	var MarkupContent;
	(function (MarkupContent) {
		/**
		 * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
		}
		MarkupContent.is = is;
	})(MarkupContent || (MarkupContent = {}));
	/**
	 * The kind of a completion entry.
	 */
	var CompletionItemKind;
	(function (CompletionItemKind) {
		CompletionItemKind.Text = 1;
		CompletionItemKind.Method = 2;
		CompletionItemKind.Function = 3;
		CompletionItemKind.Constructor = 4;
		CompletionItemKind.Field = 5;
		CompletionItemKind.Variable = 6;
		CompletionItemKind.Class = 7;
		CompletionItemKind.Interface = 8;
		CompletionItemKind.Module = 9;
		CompletionItemKind.Property = 10;
		CompletionItemKind.Unit = 11;
		CompletionItemKind.Value = 12;
		CompletionItemKind.Enum = 13;
		CompletionItemKind.Keyword = 14;
		CompletionItemKind.Snippet = 15;
		CompletionItemKind.Color = 16;
		CompletionItemKind.File = 17;
		CompletionItemKind.Reference = 18;
		CompletionItemKind.Folder = 19;
		CompletionItemKind.EnumMember = 20;
		CompletionItemKind.Constant = 21;
		CompletionItemKind.Struct = 22;
		CompletionItemKind.Event = 23;
		CompletionItemKind.Operator = 24;
		CompletionItemKind.TypeParameter = 25;
	})(CompletionItemKind || (CompletionItemKind = {}));
	/**
	 * Defines whether the insert text in a completion item should be interpreted as
	 * plain text or a snippet.
	 */
	var InsertTextFormat;
	(function (InsertTextFormat) {
		/**
		 * The primary text to be inserted is treated as a plain string.
		 */
		InsertTextFormat.PlainText = 1;
		/**
		 * The primary text to be inserted is treated as a snippet.
		 *
		 * A snippet can define tab stops and placeholders with `$1`, `$2`
		 * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
		 * the end of the snippet. Placeholders with equal identifiers are linked,
		 * that is typing in one will update others too.
		 *
		 * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
		 */
		InsertTextFormat.Snippet = 2;
	})(InsertTextFormat || (InsertTextFormat = {}));
	/**
	 * The CompletionItem namespace provides functions to deal with
	 * completion items.
	 */
	var CompletionItem;
	(function (CompletionItem) {
		/**
		 * Create a completion item and seed it with a label.
		 * @param label The completion item's label
		 */
		function create(label) {
			return { label: label };
		}
		CompletionItem.create = create;
	})(CompletionItem || (CompletionItem = {}));
	/**
	 * The CompletionList namespace provides functions to deal with
	 * completion lists.
	 */
	var CompletionList;
	(function (CompletionList) {
		/**
		 * Creates a new completion list.
		 *
		 * @param items The completion items.
		 * @param isIncomplete The list is not complete.
		 */
		function create(items, isIncomplete) {
			return { items: items ? items : [], isIncomplete: !!isIncomplete };
		}
		CompletionList.create = create;
	})(CompletionList || (CompletionList = {}));
	var MarkedString;
	(function (MarkedString) {
		/**
		 * Creates a marked string from plain text.
		 *
		 * @param plainText The plain text.
		 */
		function fromPlainText(plainText) {
			return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
		}
		MarkedString.fromPlainText = fromPlainText;
		/**
		 * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
		 */
		function is(value) {
			var candidate = value;
			return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
		}
		MarkedString.is = is;
	})(MarkedString || (MarkedString = {}));
	var Hover;
	(function (Hover) {
		/**
		 * Checks whether the given value conforms to the [Hover](#Hover) interface.
		 */
		function is(value) {
			var candidate = value;
			return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
				MarkedString.is(candidate.contents) ||
				Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
		}
		Hover.is = is;
	})(Hover || (Hover = {}));
	/**
	 * The ParameterInformation namespace provides helper functions to work with
	 * [ParameterInformation](#ParameterInformation) literals.
	 */
	var ParameterInformation;
	(function (ParameterInformation) {
		/**
		 * Creates a new parameter information literal.
		 *
		 * @param label A label string.
		 * @param documentation A doc string.
		 */
		function create(label, documentation) {
			return documentation ? { label: label, documentation: documentation } : { label: label };
		}
		ParameterInformation.create = create;
		;
	})(ParameterInformation || (ParameterInformation = {}));
	/**
	 * The SignatureInformation namespace provides helper functions to work with
	 * [SignatureInformation](#SignatureInformation) literals.
	 */
	var SignatureInformation;
	(function (SignatureInformation) {
		function create(label, documentation) {
			var parameters = [];
			for (var _i = 2; _i < arguments.length; _i++) {
				parameters[_i - 2] = arguments[_i];
			}
			var result = { label: label };
			if (Is.defined(documentation)) {
				result.documentation = documentation;
			}
			if (Is.defined(parameters)) {
				result.parameters = parameters;
			}
			else {
				result.parameters = [];
			}
			return result;
		}
		SignatureInformation.create = create;
	})(SignatureInformation || (SignatureInformation = {}));
	/**
	 * A document highlight kind.
	 */
	var DocumentHighlightKind;
	(function (DocumentHighlightKind) {
		/**
		 * A textual occurrence.
		 */
		DocumentHighlightKind.Text = 1;
		/**
		 * Read-access of a symbol, like reading a variable.
		 */
		DocumentHighlightKind.Read = 2;
		/**
		 * Write-access of a symbol, like writing to a variable.
		 */
		DocumentHighlightKind.Write = 3;
	})(DocumentHighlightKind || (DocumentHighlightKind = {}));
	/**
	 * DocumentHighlight namespace to provide helper functions to work with
	 * [DocumentHighlight](#DocumentHighlight) literals.
	 */
	var DocumentHighlight;
	(function (DocumentHighlight) {
		/**
		 * Create a DocumentHighlight object.
		 * @param range The range the highlight applies to.
		 */
		function create(range, kind) {
			var result = { range: range };
			if (Is.number(kind)) {
				result.kind = kind;
			}
			return result;
		}
		DocumentHighlight.create = create;
	})(DocumentHighlight || (DocumentHighlight = {}));
	/**
	 * A symbol kind.
	 */
	var SymbolKind;
	(function (SymbolKind) {
		SymbolKind.File = 1;
		SymbolKind.Module = 2;
		SymbolKind.Namespace = 3;
		SymbolKind.Package = 4;
		SymbolKind.Class = 5;
		SymbolKind.Method = 6;
		SymbolKind.Property = 7;
		SymbolKind.Field = 8;
		SymbolKind.Constructor = 9;
		SymbolKind.Enum = 10;
		SymbolKind.Interface = 11;
		SymbolKind.Function = 12;
		SymbolKind.Variable = 13;
		SymbolKind.Constant = 14;
		SymbolKind.String = 15;
		SymbolKind.Number = 16;
		SymbolKind.Boolean = 17;
		SymbolKind.Array = 18;
		SymbolKind.Object = 19;
		SymbolKind.Key = 20;
		SymbolKind.Null = 21;
		SymbolKind.EnumMember = 22;
		SymbolKind.Struct = 23;
		SymbolKind.Event = 24;
		SymbolKind.Operator = 25;
		SymbolKind.TypeParameter = 26;
	})(SymbolKind || (SymbolKind = {}));
	var SymbolInformation;
	(function (SymbolInformation) {
		/**
		 * Creates a new symbol information literal.
		 *
		 * @param name The name of the symbol.
		 * @param kind The kind of the symbol.
		 * @param range The range of the location of the symbol.
		 * @param uri The resource of the location of symbol, defaults to the current document.
		 * @param containerName The name of the symbol containing the symbol.
		 */
		function create(name, kind, range, uri, containerName) {
			var result = {
				name: name,
				kind: kind,
				location: { uri: uri, range: range }
			};
			if (containerName) {
				result.containerName = containerName;
			}
			return result;
		}
		SymbolInformation.create = create;
	})(SymbolInformation || (SymbolInformation = {}));
	/**
	 * Represents programming constructs like variables, classes, interfaces etc.
	 * that appear in a document. Document symbols can be hierarchical and they
	 * have two ranges: one that encloses its definition and one that points to
	 * its most interesting range, e.g. the range of an identifier.
	 */
	var DocumentSymbol = /** @class */ (function () {
		function DocumentSymbol() {
		}
		return DocumentSymbol;
	}());

	(function (DocumentSymbol) {
		/**
		 * Creates a new symbol information literal.
		 *
		 * @param name The name of the symbol.
		 * @param detail The detail of the symbol.
		 * @param kind The kind of the symbol.
		 * @param range The range of the symbol.
		 * @param selectionRange The selectionRange of the symbol.
		 * @param children Children of the symbol.
		 */
		function create(name, detail, kind, range, selectionRange, children) {
			var result = {
				name: name,
				detail: detail,
				kind: kind,
				range: range,
				selectionRange: selectionRange
			};
			if (children !== void 0) {
				result.children = children;
			}
			return result;
		}
		DocumentSymbol.create = create;
		/**
		 * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
		 */
		function is(value) {
			var candidate = value;
			return candidate &&
				Is.string(candidate.name) && Is.number(candidate.kind) &&
				Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
				(candidate.detail === void 0 || Is.string(candidate.detail)) &&
				(candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
				(candidate.children === void 0 || Array.isArray(candidate.children));
		}
		DocumentSymbol.is = is;
	})(DocumentSymbol || (DocumentSymbol = {}));
	/**
	 * A set of predefined code action kinds
	 */
	var CodeActionKind;
	(function (CodeActionKind) {
		/**
		 * Base kind for quickfix actions: 'quickfix'
		 */
		CodeActionKind.QuickFix = 'quickfix';
		/**
		 * Base kind for refactoring actions: 'refactor'
		 */
		CodeActionKind.Refactor = 'refactor';
		/**
		 * Base kind for refactoring extraction actions: 'refactor.extract'
		 *
		 * Example extract actions:
		 *
		 * - Extract method
		 * - Extract function
		 * - Extract variable
		 * - Extract interface from class
		 * - ...
		 */
		CodeActionKind.RefactorExtract = 'refactor.extract';
		/**
		 * Base kind for refactoring inline actions: 'refactor.inline'
		 *
		 * Example inline actions:
		 *
		 * - Inline function
		 * - Inline variable
		 * - Inline constant
		 * - ...
		 */
		CodeActionKind.RefactorInline = 'refactor.inline';
		/**
		 * Base kind for refactoring rewrite actions: 'refactor.rewrite'
		 *
		 * Example rewrite actions:
		 *
		 * - Convert JavaScript function to class
		 * - Add or remove parameter
		 * - Encapsulate field
		 * - Make method static
		 * - Move method to base class
		 * - ...
		 */
		CodeActionKind.RefactorRewrite = 'refactor.rewrite';
		/**
		 * Base kind for source actions: `source`
		 *
		 * Source code actions apply to the entire file.
		 */
		CodeActionKind.Source = 'source';
		/**
		 * Base kind for an organize imports source action: `source.organizeImports`
		 */
		CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
	})(CodeActionKind || (CodeActionKind = {}));
	/**
	 * The CodeActionContext namespace provides helper functions to work with
	 * [CodeActionContext](#CodeActionContext) literals.
	 */
	var CodeActionContext;
	(function (CodeActionContext) {
		/**
		 * Creates a new CodeActionContext literal.
		 */
		function create(diagnostics, only) {
			var result = { diagnostics: diagnostics };
			if (only !== void 0 && only !== null) {
				result.only = only;
			}
			return result;
		}
		CodeActionContext.create = create;
		/**
		 * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
		}
		CodeActionContext.is = is;
	})(CodeActionContext || (CodeActionContext = {}));
	var CodeAction;
	(function (CodeAction) {
		function create(title, commandOrEdit, kind) {
			var result = { title: title };
			if (Command.is(commandOrEdit)) {
				result.command = commandOrEdit;
			}
			else {
				result.edit = commandOrEdit;
			}
			if (kind !== void null) {
				result.kind = kind;
			}
			return result;
		}
		CodeAction.create = create;
		function is(value) {
			var candidate = value;
			return candidate && Is.string(candidate.title) &&
				(candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
				(candidate.kind === void 0 || Is.string(candidate.kind)) &&
				(candidate.edit !== void 0 || candidate.command !== void 0) &&
				(candidate.command === void 0 || Command.is(candidate.command)) &&
				(candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
		}
		CodeAction.is = is;
	})(CodeAction || (CodeAction = {}));
	/**
	 * The CodeLens namespace provides helper functions to work with
	 * [CodeLens](#CodeLens) literals.
	 */
	var CodeLens;
	(function (CodeLens) {
		/**
		 * Creates a new CodeLens literal.
		 */
		function create(range, data) {
			var result = { range: range };
			if (Is.defined(data))
				result.data = data;
			return result;
		}
		CodeLens.create = create;
		/**
		 * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
		}
		CodeLens.is = is;
	})(CodeLens || (CodeLens = {}));
	/**
	 * The FormattingOptions namespace provides helper functions to work with
	 * [FormattingOptions](#FormattingOptions) literals.
	 */
	var FormattingOptions;
	(function (FormattingOptions) {
		/**
		 * Creates a new FormattingOptions literal.
		 */
		function create(tabSize, insertSpaces) {
			return { tabSize: tabSize, insertSpaces: insertSpaces };
		}
		FormattingOptions.create = create;
		/**
		 * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
		}
		FormattingOptions.is = is;
	})(FormattingOptions || (FormattingOptions = {}));
	/**
	 * A document link is a range in a text document that links to an internal or external resource, like another
	 * text document or a web site.
	 */
	var DocumentLink = /** @class */ (function () {
		function DocumentLink() {
		}
		return DocumentLink;
	}());

	/**
	 * The DocumentLink namespace provides helper functions to work with
	 * [DocumentLink](#DocumentLink) literals.
	 */
	(function (DocumentLink) {
		/**
		 * Creates a new DocumentLink literal.
		 */
		function create(range, target, data) {
			return { range: range, target: target, data: data };
		}
		DocumentLink.create = create;
		/**
		 * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
		}
		DocumentLink.is = is;
	})(DocumentLink || (DocumentLink = {}));
	var EOL = ['\n', '\r\n', '\r'];
	var TextDocument;
	(function (TextDocument) {
		/**
		 * Creates a new ITextDocument literal from the given uri and content.
		 * @param uri The document's uri.
		 * @param languageId  The document's language Id.
		 * @param content The document's content.
		 */
		function create(uri, languageId, version, content) {
			return new FullTextDocument(uri, languageId, version, content);
		}
		TextDocument.create = create;
		/**
		 * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
		 */
		function is(value) {
			var candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
				&& Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
		}
		TextDocument.is = is;
		function applyEdits(document, edits) {
			var text = document.getText();
			var sortedEdits = mergeSort(edits, function (a, b) {
				var diff = a.range.start.line - b.range.start.line;
				if (diff === 0) {
					return a.range.start.character - b.range.start.character;
				}
				return diff;
			});
			var lastModifiedOffset = text.length;
			for (var i = sortedEdits.length - 1; i >= 0; i--) {
				var e = sortedEdits[i];
				var startOffset = document.offsetAt(e.range.start);
				var endOffset = document.offsetAt(e.range.end);
				if (endOffset <= lastModifiedOffset) {
					text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
				}
				else {
					throw new Error('Overlapping edit');
				}
				lastModifiedOffset = startOffset;
			}
			return text;
		}
		TextDocument.applyEdits = applyEdits;
		function mergeSort(data, compare) {
			if (data.length <= 1) {
				// sorted
				return data;
			}
			var p = (data.length / 2) | 0;
			var left = data.slice(0, p);
			var right = data.slice(p);
			mergeSort(left, compare);
			mergeSort(right, compare);
			var leftIdx = 0;
			var rightIdx = 0;
			var i = 0;
			while (leftIdx < left.length && rightIdx < right.length) {
				var ret = compare(left[leftIdx], right[rightIdx]);
				if (ret <= 0) {
					// smaller_equal -> take left to preserve order
					data[i++] = left[leftIdx++];
				}
				else {
					// greater -> take right
					data[i++] = right[rightIdx++];
				}
			}
			while (leftIdx < left.length) {
				data[i++] = left[leftIdx++];
			}
			while (rightIdx < right.length) {
				data[i++] = right[rightIdx++];
			}
			return data;
		}
	})(TextDocument || (TextDocument = {}));
	/**
	 * Represents reasons why a text document is saved.
	 */
	var TextDocumentSaveReason;
	(function (TextDocumentSaveReason) {
		/**
		 * Manually triggered, e.g. by the user pressing save, by starting debugging,
		 * or by an API call.
		 */
		TextDocumentSaveReason.Manual = 1;
		/**
		 * Automatic after a delay.
		 */
		TextDocumentSaveReason.AfterDelay = 2;
		/**
		 * When the editor lost focus.
		 */
		TextDocumentSaveReason.FocusOut = 3;
	})(TextDocumentSaveReason || (TextDocumentSaveReason = {}));
	var FullTextDocument = /** @class */ (function () {
		function FullTextDocument(uri, languageId, version, content) {
			this._uri = uri;
			this._languageId = languageId;
			this._version = version;
			this._content = content;
			this._lineOffsets = null;
		}
		Object.defineProperty(FullTextDocument.prototype, "uri", {
			get: function () {
				return this._uri;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(FullTextDocument.prototype, "languageId", {
			get: function () {
				return this._languageId;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(FullTextDocument.prototype, "version", {
			get: function () {
				return this._version;
			},
			enumerable: true,
			configurable: true
		});
		FullTextDocument.prototype.getText = function (range) {
			if (range) {
				var start = this.offsetAt(range.start);
				var end = this.offsetAt(range.end);
				return this._content.substring(start, end);
			}
			return this._content;
		};
		FullTextDocument.prototype.update = function (event, version) {
			this._content = event.text;
			this._version = version;
			this._lineOffsets = null;
		};
		FullTextDocument.prototype.getLineOffsets = function () {
			if (this._lineOffsets === null) {
				var lineOffsets = [];
				var text = this._content;
				var isLineStart = true;
				for (var i = 0; i < text.length; i++) {
					if (isLineStart) {
						lineOffsets.push(i);
						isLineStart = false;
					}
					var ch = text.charAt(i);
					isLineStart = (ch === '\r' || ch === '\n');
					if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
						i++;
					}
				}
				if (isLineStart && text.length > 0) {
					lineOffsets.push(text.length);
				}
				this._lineOffsets = lineOffsets;
			}
			return this._lineOffsets;
		};
		FullTextDocument.prototype.positionAt = function (offset) {
			offset = Math.max(Math.min(offset, this._content.length), 0);
			var lineOffsets = this.getLineOffsets();
			var low = 0, high = lineOffsets.length;
			if (high === 0) {
				return Position.create(0, offset);
			}
			while (low < high) {
				var mid = Math.floor((low + high) / 2);
				if (lineOffsets[mid] > offset) {
					high = mid;
				}
				else {
					low = mid + 1;
				}
			}
			// low is the least x for which the line offset is larger than the current offset
			// or array.length if no line offset is larger than the current offset
			var line = low - 1;
			return Position.create(line, offset - lineOffsets[line]);
		};
		FullTextDocument.prototype.offsetAt = function (position) {
			var lineOffsets = this.getLineOffsets();
			if (position.line >= lineOffsets.length) {
				return this._content.length;
			}
			else if (position.line < 0) {
				return 0;
			}
			var lineOffset = lineOffsets[position.line];
			var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
			return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
		};
		Object.defineProperty(FullTextDocument.prototype, "lineCount", {
			get: function () {
				return this.getLineOffsets().length;
			},
			enumerable: true,
			configurable: true
		});
		return FullTextDocument;
	}());
	var Is;
	(function (Is) {
		var toString = Object.prototype.toString;
		function defined(value) {
			return typeof value !== 'undefined';
		}
		Is.defined = defined;
		function undefined(value) {
			return typeof value === 'undefined';
		}
		Is.undefined = undefined;
		function boolean(value) {
			return value === true || value === false;
		}
		Is.boolean = boolean;
		function string(value) {
			return toString.call(value) === '[object String]';
		}
		Is.string = string;
		function number(value) {
			return toString.call(value) === '[object Number]';
		}
		Is.number = number;
		function func(value) {
			return toString.call(value) === '[object Function]';
		}
		Is.func = func;
		function objectLiteral(value) {
			// Strictly speaking class instances pass this check as well. Since the LSP
			// doesn't use classes we ignore this for now. If we do we need to add something
			// like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
			return value !== null && typeof value === 'object';
		}
		Is.objectLiteral = objectLiteral;
		function typedArray(value, check) {
			return Array.isArray(value) && value.every(check);
		}
		Is.typedArray = typedArray;
	})(Is || (Is = {}));


	/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const Is = __webpack_require__(53);
	const vscode_jsonrpc_1 = __webpack_require__(39);
	const protocol_implementation_1 = __webpack_require__(54);
	exports.ImplementationRequest = protocol_implementation_1.ImplementationRequest;
	const protocol_typeDefinition_1 = __webpack_require__(55);
	exports.TypeDefinitionRequest = protocol_typeDefinition_1.TypeDefinitionRequest;
	const protocol_workspaceFolders_1 = __webpack_require__(56);
	exports.WorkspaceFoldersRequest = protocol_workspaceFolders_1.WorkspaceFoldersRequest;
	exports.DidChangeWorkspaceFoldersNotification = protocol_workspaceFolders_1.DidChangeWorkspaceFoldersNotification;
	const protocol_configuration_1 = __webpack_require__(57);
	exports.ConfigurationRequest = protocol_configuration_1.ConfigurationRequest;
	const protocol_colorProvider_1 = __webpack_require__(58);
	exports.DocumentColorRequest = protocol_colorProvider_1.DocumentColorRequest;
	exports.ColorPresentationRequest = protocol_colorProvider_1.ColorPresentationRequest;
	const protocol_foldingRange_1 = __webpack_require__(59);
	exports.FoldingRangeRequest = protocol_foldingRange_1.FoldingRangeRequest;
	const protocol_declaration_1 = __webpack_require__(60);
	exports.DeclarationRequest = protocol_declaration_1.DeclarationRequest;
	// @ts-ignore: to avoid inlining LocatioLink as dynamic import
	let __noDynamicImport;
	var DocumentFilter;
	(function (DocumentFilter) {
		function is(value) {
			let candidate = value;
			return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
		}
		DocumentFilter.is = is;
	})(DocumentFilter = exports.DocumentFilter || (exports.DocumentFilter = {}));
	/**
	 * The `client/registerCapability` request is sent from the server to the client to register a new capability
	 * handler on the client side.
	 */
	var RegistrationRequest;
	(function (RegistrationRequest) {
		RegistrationRequest.type = new vscode_jsonrpc_1.RequestType('client/registerCapability');
	})(RegistrationRequest = exports.RegistrationRequest || (exports.RegistrationRequest = {}));
	/**
	 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
	 * handler on the client side.
	 */
	var UnregistrationRequest;
	(function (UnregistrationRequest) {
		UnregistrationRequest.type = new vscode_jsonrpc_1.RequestType('client/unregisterCapability');
	})(UnregistrationRequest = exports.UnregistrationRequest || (exports.UnregistrationRequest = {}));
	var ResourceOperationKind;
	(function (ResourceOperationKind) {
		/**
		 * Supports creating new files and folders.
		 */
		ResourceOperationKind.Create = 'create';
		/**
		 * Supports renaming existing files and folders.
		 */
		ResourceOperationKind.Rename = 'rename';
		/**
		 * Supports deleting existing files and folders.
		 */
		ResourceOperationKind.Delete = 'delete';
	})(ResourceOperationKind = exports.ResourceOperationKind || (exports.ResourceOperationKind = {}));
	var FailureHandlingKind;
	(function (FailureHandlingKind) {
		/**
		 * Applying the workspace change is simply aborted if one of the changes provided
		 * fails. All operations executed before the failing operation stay executed.
		 */
		FailureHandlingKind.Abort = 'abort';
		/**
		 * All operations are executed transactional. That means they either all
		 * succeed or no changes at all are applied to the workspace.
		 */
		FailureHandlingKind.Transactional = 'transactional';
		/**
		 * If the workspace edit contains only textual file changes they are executed transactional.
		 * If resource changes (create, rename or delete file) are part of the change the failure
		 * handling startegy is abort.
		 */
		FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
		/**
		 * The client tries to undo the operations already executed. But there is no
		 * guaruntee that this is succeeding.
		 */
		FailureHandlingKind.Undo = 'undo';
	})(FailureHandlingKind = exports.FailureHandlingKind || (exports.FailureHandlingKind = {}));
	/**
	 * Defines how the host (editor) should sync
	 * document changes to the language server.
	 */
	var TextDocumentSyncKind;
	(function (TextDocumentSyncKind) {
		/**
		 * Documents should not be synced at all.
		 */
		TextDocumentSyncKind.None = 0;
		/**
		 * Documents are synced by always sending the full content
		 * of the document.
		 */
		TextDocumentSyncKind.Full = 1;
		/**
		 * Documents are synced by sending the full content on open.
		 * After that only incremental updates to the document are
		 * send.
		 */
		TextDocumentSyncKind.Incremental = 2;
	})(TextDocumentSyncKind = exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {}));
	/**
	 * The initialize request is sent from the client to the server.
	 * It is sent once as the request after starting up the server.
	 * The requests parameter is of type [InitializeParams](#InitializeParams)
	 * the response if of type [InitializeResult](#InitializeResult) of a Thenable that
	 * resolves to such.
	 */
	var InitializeRequest;
	(function (InitializeRequest) {
		InitializeRequest.type = new vscode_jsonrpc_1.RequestType('initialize');
	})(InitializeRequest = exports.InitializeRequest || (exports.InitializeRequest = {}));
	/**
	 * Known error codes for an `InitializeError`;
	 */
	var InitializeError;
	(function (InitializeError) {
		/**
		 * If the protocol version provided by the client can't be handled by the server.
		 * @deprecated This initialize error got replaced by client capabilities. There is
		 * no version handshake in version 3.0x
		 */
		InitializeError.unknownProtocolVersion = 1;
	})(InitializeError = exports.InitializeError || (exports.InitializeError = {}));
	/**
	 * The intialized notification is sent from the client to the
	 * server after the client is fully initialized and the server
	 * is allowed to send requests from the server to the client.
	 */
	var InitializedNotification;
	(function (InitializedNotification) {
		InitializedNotification.type = new vscode_jsonrpc_1.NotificationType('initialized');
	})(InitializedNotification = exports.InitializedNotification || (exports.InitializedNotification = {}));
	//---- Shutdown Method ----
	/**
	 * A shutdown request is sent from the client to the server.
	 * It is sent once when the client decides to shutdown the
	 * server. The only notification that is sent after a shutdown request
	 * is the exit event.
	 */
	var ShutdownRequest;
	(function (ShutdownRequest) {
		ShutdownRequest.type = new vscode_jsonrpc_1.RequestType0('shutdown');
	})(ShutdownRequest = exports.ShutdownRequest || (exports.ShutdownRequest = {}));
	//---- Exit Notification ----
	/**
	 * The exit event is sent from the client to the server to
	 * ask the server to exit its process.
	 */
	var ExitNotification;
	(function (ExitNotification) {
		ExitNotification.type = new vscode_jsonrpc_1.NotificationType0('exit');
	})(ExitNotification = exports.ExitNotification || (exports.ExitNotification = {}));
	//---- Configuration notification ----
	/**
	 * The configuration change notification is sent from the client to the server
	 * when the client's configuration has changed. The notification contains
	 * the changed configuration as defined by the language client.
	 */
	var DidChangeConfigurationNotification;
	(function (DidChangeConfigurationNotification) {
		DidChangeConfigurationNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeConfiguration');
	})(DidChangeConfigurationNotification = exports.DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = {}));
	//---- Message show and log notifications ----
	/**
	 * The message type
	 */
	var MessageType;
	(function (MessageType) {
		/**
		 * An error message.
		 */
		MessageType.Error = 1;
		/**
		 * A warning message.
		 */
		MessageType.Warning = 2;
		/**
		 * An information message.
		 */
		MessageType.Info = 3;
		/**
		 * A log message.
		 */
		MessageType.Log = 4;
	})(MessageType = exports.MessageType || (exports.MessageType = {}));
	/**
	 * The show message notification is sent from a server to a client to ask
	 * the client to display a particular message in the user interface.
	 */
	var ShowMessageNotification;
	(function (ShowMessageNotification) {
		ShowMessageNotification.type = new vscode_jsonrpc_1.NotificationType('window/showMessage');
	})(ShowMessageNotification = exports.ShowMessageNotification || (exports.ShowMessageNotification = {}));
	/**
	 * The show message request is sent from the server to the client to show a message
	 * and a set of options actions to the user.
	 */
	var ShowMessageRequest;
	(function (ShowMessageRequest) {
		ShowMessageRequest.type = new vscode_jsonrpc_1.RequestType('window/showMessageRequest');
	})(ShowMessageRequest = exports.ShowMessageRequest || (exports.ShowMessageRequest = {}));
	/**
	 * The log message notification is sent from the server to the client to ask
	 * the client to log a particular message.
	 */
	var LogMessageNotification;
	(function (LogMessageNotification) {
		LogMessageNotification.type = new vscode_jsonrpc_1.NotificationType('window/logMessage');
	})(LogMessageNotification = exports.LogMessageNotification || (exports.LogMessageNotification = {}));
	//---- Telemetry notification
	/**
	 * The telemetry event notification is sent from the server to the client to ask
	 * the client to log telemetry data.
	 */
	var TelemetryEventNotification;
	(function (TelemetryEventNotification) {
		TelemetryEventNotification.type = new vscode_jsonrpc_1.NotificationType('telemetry/event');
	})(TelemetryEventNotification = exports.TelemetryEventNotification || (exports.TelemetryEventNotification = {}));
	/**
	 * The document open notification is sent from the client to the server to signal
	 * newly opened text documents. The document's truth is now managed by the client
	 * and the server must not try to read the document's truth using the document's
	 * uri. Open in this sense means it is managed by the client. It doesn't necessarily
	 * mean that its content is presented in an editor. An open notification must not
	 * be sent more than once without a corresponding close notification send before.
	 * This means open and close notification must be balanced and the max open count
	 * is one.
	 */
	var DidOpenTextDocumentNotification;
	(function (DidOpenTextDocumentNotification) {
		DidOpenTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didOpen');
	})(DidOpenTextDocumentNotification = exports.DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = {}));
	/**
	 * The document change notification is sent from the client to the server to signal
	 * changes to a text document.
	 */
	var DidChangeTextDocumentNotification;
	(function (DidChangeTextDocumentNotification) {
		DidChangeTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didChange');
	})(DidChangeTextDocumentNotification = exports.DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = {}));
	/**
	 * The document close notification is sent from the client to the server when
	 * the document got closed in the client. The document's truth now exists where
	 * the document's uri points to (e.g. if the document's uri is a file uri the
	 * truth now exists on disk). As with the open notification the close notification
	 * is about managing the document's content. Receiving a close notification
	 * doesn't mean that the document was open in an editor before. A close
	 * notification requires a previous open notification to be sent.
	 */
	var DidCloseTextDocumentNotification;
	(function (DidCloseTextDocumentNotification) {
		DidCloseTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didClose');
	})(DidCloseTextDocumentNotification = exports.DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = {}));
	/**
	 * The document save notification is sent from the client to the server when
	 * the document got saved in the client.
	 */
	var DidSaveTextDocumentNotification;
	(function (DidSaveTextDocumentNotification) {
		DidSaveTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didSave');
	})(DidSaveTextDocumentNotification = exports.DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = {}));
	/**
	 * A document will save notification is sent from the client to the server before
	 * the document is actually saved.
	 */
	var WillSaveTextDocumentNotification;
	(function (WillSaveTextDocumentNotification) {
		WillSaveTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/willSave');
	})(WillSaveTextDocumentNotification = exports.WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = {}));
	/**
	 * A document will save request is sent from the client to the server before
	 * the document is actually saved. The request can return an array of TextEdits
	 * which will be applied to the text document before it is saved. Please note that
	 * clients might drop results if computing the text edits took too long or if a
	 * server constantly fails on this request. This is done to keep the save fast and
	 * reliable.
	 */
	var WillSaveTextDocumentWaitUntilRequest;
	(function (WillSaveTextDocumentWaitUntilRequest) {
		WillSaveTextDocumentWaitUntilRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/willSaveWaitUntil');
	})(WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = {}));
	//---- File eventing ----
	/**
	 * The watched files notification is sent from the client to the server when
	 * the client detects changes to file watched by the language client.
	 */
	var DidChangeWatchedFilesNotification;
	(function (DidChangeWatchedFilesNotification) {
		DidChangeWatchedFilesNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeWatchedFiles');
	})(DidChangeWatchedFilesNotification = exports.DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = {}));
	/**
	 * The file event type
	 */
	var FileChangeType;
	(function (FileChangeType) {
		/**
		 * The file got created.
		 */
		FileChangeType.Created = 1;
		/**
		 * The file got changed.
		 */
		FileChangeType.Changed = 2;
		/**
		 * The file got deleted.
		 */
		FileChangeType.Deleted = 3;
	})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
	var WatchKind;
	(function (WatchKind) {
		/**
		 * Interested in create events.
		 */
		WatchKind.Create = 1;
		/**
		 * Interested in change events
		 */
		WatchKind.Change = 2;
		/**
		 * Interested in delete events
		 */
		WatchKind.Delete = 4;
	})(WatchKind = exports.WatchKind || (exports.WatchKind = {}));
	//---- Diagnostic notification ----
	/**
	 * Diagnostics notification are sent from the server to the client to signal
	 * results of validation runs.
	 */
	var PublishDiagnosticsNotification;
	(function (PublishDiagnosticsNotification) {
		PublishDiagnosticsNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/publishDiagnostics');
	})(PublishDiagnosticsNotification = exports.PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = {}));
	/**
	 * How a completion was triggered
	 */
	var CompletionTriggerKind;
	(function (CompletionTriggerKind) {
		/**
		 * Completion was triggered by typing an identifier (24x7 code
		 * complete), manual invocation (e.g Ctrl+Space) or via API.
		 */
		CompletionTriggerKind.Invoked = 1;
		/**
		 * Completion was triggered by a trigger character specified by
		 * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
		 */
		CompletionTriggerKind.TriggerCharacter = 2;
		/**
		 * Completion was re-triggered as current completion list is incomplete
		 */
		CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
	})(CompletionTriggerKind = exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
	/**
	 * Request to request completion at a given text document position. The request's
	 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response
	 * is of type [CompletionItem[]](#CompletionItem) or [CompletionList](#CompletionList)
	 * or a Thenable that resolves to such.
	 *
	 * The request can delay the computation of the [`detail`](#CompletionItem.detail)
	 * and [`documentation`](#CompletionItem.documentation) properties to the `completionItem/resolve`
	 * request. However, properties that are needed for the initial sorting and filtering, like `sortText`,
	 * `filterText`, `insertText`, and `textEdit`, must not be changed during resolve.
	 */
	var CompletionRequest;
	(function (CompletionRequest) {
		CompletionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/completion');
	})(CompletionRequest = exports.CompletionRequest || (exports.CompletionRequest = {}));
	/**
	 * Request to resolve additional information for a given completion item.The request's
	 * parameter is of type [CompletionItem](#CompletionItem) the response
	 * is of type [CompletionItem](#CompletionItem) or a Thenable that resolves to such.
	 */
	var CompletionResolveRequest;
	(function (CompletionResolveRequest) {
		CompletionResolveRequest.type = new vscode_jsonrpc_1.RequestType('completionItem/resolve');
	})(CompletionResolveRequest = exports.CompletionResolveRequest || (exports.CompletionResolveRequest = {}));
	//---- Hover Support -------------------------------
	/**
	 * Request to request hover information at a given text document position. The request's
	 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response is of
	 * type [Hover](#Hover) or a Thenable that resolves to such.
	 */
	var HoverRequest;
	(function (HoverRequest) {
		HoverRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/hover');
	})(HoverRequest = exports.HoverRequest || (exports.HoverRequest = {}));
	var SignatureHelpRequest;
	(function (SignatureHelpRequest) {
		SignatureHelpRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/signatureHelp');
	})(SignatureHelpRequest = exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {}));
	//---- Goto Definition -------------------------------------
	/**
	 * A request to resolve the definition location of a symbol at a given text
	 * document position. The request's parameter is of type [TextDocumentPosition]
	 * (#TextDocumentPosition) the response is of either type [Definition](#Definition)
	 * or a typed array of [DefinitionLink](#DefinitionLink) or a Thenable that resolves
	 * to such.
	 */
	var DefinitionRequest;
	(function (DefinitionRequest) {
		DefinitionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/definition');
	})(DefinitionRequest = exports.DefinitionRequest || (exports.DefinitionRequest = {}));
	/**
	 * A request to resolve project-wide references for the symbol denoted
	 * by the given text document position. The request's parameter is of
	 * type [ReferenceParams](#ReferenceParams) the response is of type
	 * [Location[]](#Location) or a Thenable that resolves to such.
	 */
	var ReferencesRequest;
	(function (ReferencesRequest) {
		ReferencesRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/references');
	})(ReferencesRequest = exports.ReferencesRequest || (exports.ReferencesRequest = {}));
	//---- Document Highlight ----------------------------------
	/**
	 * Request to resolve a [DocumentHighlight](#DocumentHighlight) for a given
	 * text document position. The request's parameter is of type [TextDocumentPosition]
	 * (#TextDocumentPosition) the request response is of type [DocumentHighlight[]]
	 * (#DocumentHighlight) or a Thenable that resolves to such.
	 */
	var DocumentHighlightRequest;
	(function (DocumentHighlightRequest) {
		DocumentHighlightRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentHighlight');
	})(DocumentHighlightRequest = exports.DocumentHighlightRequest || (exports.DocumentHighlightRequest = {}));
	//---- Document Symbol Provider ---------------------------
	/**
	 * A request to list all symbols found in a given text document. The request's
	 * parameter is of type [TextDocumentIdentifier](#TextDocumentIdentifier) the
	 * response is of type [SymbolInformation[]](#SymbolInformation) or a Thenable
	 * that resolves to such.
	 */
	var DocumentSymbolRequest;
	(function (DocumentSymbolRequest) {
		DocumentSymbolRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentSymbol');
	})(DocumentSymbolRequest = exports.DocumentSymbolRequest || (exports.DocumentSymbolRequest = {}));
	//---- Workspace Symbol Provider ---------------------------
	/**
	 * A request to list project-wide symbols matching the query string given
	 * by the [WorkspaceSymbolParams](#WorkspaceSymbolParams). The response is
	 * of type [SymbolInformation[]](#SymbolInformation) or a Thenable that
	 * resolves to such.
	 */
	var WorkspaceSymbolRequest;
	(function (WorkspaceSymbolRequest) {
		WorkspaceSymbolRequest.type = new vscode_jsonrpc_1.RequestType('workspace/symbol');
	})(WorkspaceSymbolRequest = exports.WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = {}));
	/**
	 * A request to provide commands for the given text document and range.
	 */
	var CodeActionRequest;
	(function (CodeActionRequest) {
		CodeActionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/codeAction');
	})(CodeActionRequest = exports.CodeActionRequest || (exports.CodeActionRequest = {}));
	/**
	 * A request to provide code lens for the given text document.
	 */
	var CodeLensRequest;
	(function (CodeLensRequest) {
		CodeLensRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/codeLens');
	})(CodeLensRequest = exports.CodeLensRequest || (exports.CodeLensRequest = {}));
	/**
	 * A request to resolve a command for a given code lens.
	 */
	var CodeLensResolveRequest;
	(function (CodeLensResolveRequest) {
		CodeLensResolveRequest.type = new vscode_jsonrpc_1.RequestType('codeLens/resolve');
	})(CodeLensResolveRequest = exports.CodeLensResolveRequest || (exports.CodeLensResolveRequest = {}));
	/**
	 * A request to to format a whole document.
	 */
	var DocumentFormattingRequest;
	(function (DocumentFormattingRequest) {
		DocumentFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/formatting');
	})(DocumentFormattingRequest = exports.DocumentFormattingRequest || (exports.DocumentFormattingRequest = {}));
	/**
	 * A request to to format a range in a document.
	 */
	var DocumentRangeFormattingRequest;
	(function (DocumentRangeFormattingRequest) {
		DocumentRangeFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/rangeFormatting');
	})(DocumentRangeFormattingRequest = exports.DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = {}));
	/**
	 * A request to format a document on type.
	 */
	var DocumentOnTypeFormattingRequest;
	(function (DocumentOnTypeFormattingRequest) {
		DocumentOnTypeFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/onTypeFormatting');
	})(DocumentOnTypeFormattingRequest = exports.DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = {}));
	/**
	 * A request to rename a symbol.
	 */
	var RenameRequest;
	(function (RenameRequest) {
		RenameRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/rename');
	})(RenameRequest = exports.RenameRequest || (exports.RenameRequest = {}));
	/**
	 * A request to test and perform the setup necessary for a rename.
	 */
	var PrepareRenameRequest;
	(function (PrepareRenameRequest) {
		PrepareRenameRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/prepareRename');
	})(PrepareRenameRequest = exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {}));
	/**
	 * A request to provide document links
	 */
	var DocumentLinkRequest;
	(function (DocumentLinkRequest) {
		DocumentLinkRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentLink');
	})(DocumentLinkRequest = exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {}));
	/**
	 * Request to resolve additional information for a given document link. The request's
	 * parameter is of type [DocumentLink](#DocumentLink) the response
	 * is of type [DocumentLink](#DocumentLink) or a Thenable that resolves to such.
	 */
	var DocumentLinkResolveRequest;
	(function (DocumentLinkResolveRequest) {
		DocumentLinkResolveRequest.type = new vscode_jsonrpc_1.RequestType('documentLink/resolve');
	})(DocumentLinkResolveRequest = exports.DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = {}));
	/**
	 * A request send from the client to the server to execute a command. The request might return
	 * a workspace edit which the client will apply to the workspace.
	 */
	var ExecuteCommandRequest;
	(function (ExecuteCommandRequest) {
		ExecuteCommandRequest.type = new vscode_jsonrpc_1.RequestType('workspace/executeCommand');
	})(ExecuteCommandRequest = exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {}));
	/**
	 * A request sent from the server to the client to modified certain resources.
	 */
	var ApplyWorkspaceEditRequest;
	(function (ApplyWorkspaceEditRequest) {
		ApplyWorkspaceEditRequest.type = new vscode_jsonrpc_1.RequestType('workspace/applyEdit');
	})(ApplyWorkspaceEditRequest = exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {}));


	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	function boolean(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean;
	function string(value) {
		return typeof value === 'string' || value instanceof String;
	}
	exports.string = string;
	function number(value) {
		return typeof value === 'number' || value instanceof Number;
	}
	exports.number = number;
	function error(value) {
		return value instanceof Error;
	}
	exports.error = error;
	function func(value) {
		return typeof value === 'function';
	}
	exports.func = func;
	function array(value) {
		return Array.isArray(value);
	}
	exports.array = array;
	function stringArray(value) {
		return array(value) && value.every(elem => string(elem));
	}
	exports.stringArray = stringArray;
	function typedArray(value, check) {
		return Array.isArray(value) && value.every(check);
	}
	exports.typedArray = typedArray;
	function thenable(value) {
		return value && func(value.then);
	}
	exports.thenable = thenable;


	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	// @ts-ignore: to avoid inlining LocatioLink as dynamic import
	let __noDynamicImport;
	/**
	 * A request to resolve the implementation locations of a symbol at a given text
	 * document position. The request's parameter is of type [TextDocumentPositioParams]
	 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
	 * Thenable that resolves to such.
	 */
	var ImplementationRequest;
	(function (ImplementationRequest) {
		ImplementationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/implementation');
	})(ImplementationRequest = exports.ImplementationRequest || (exports.ImplementationRequest = {}));


	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	// @ts-ignore: to avoid inlining LocatioLink as dynamic import
	let __noDynamicImport;
	/**
	 * A request to resolve the type definition locations of a symbol at a given text
	 * document position. The request's parameter is of type [TextDocumentPositioParams]
	 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
	 * Thenable that resolves to such.
	 */
	var TypeDefinitionRequest;
	(function (TypeDefinitionRequest) {
		TypeDefinitionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/typeDefinition');
	})(TypeDefinitionRequest = exports.TypeDefinitionRequest || (exports.TypeDefinitionRequest = {}));


	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	/**
	 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
	 */
	var WorkspaceFoldersRequest;
	(function (WorkspaceFoldersRequest) {
		WorkspaceFoldersRequest.type = new vscode_jsonrpc_1.RequestType0('workspace/workspaceFolders');
	})(WorkspaceFoldersRequest = exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {}));
	/**
	 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
	 * folder configuration changes.
	 */
	var DidChangeWorkspaceFoldersNotification;
	(function (DidChangeWorkspaceFoldersNotification) {
		DidChangeWorkspaceFoldersNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeWorkspaceFolders');
	})(DidChangeWorkspaceFoldersNotification = exports.DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = {}));


	/***/ }),
	/* 57 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	/**
	 * The 'workspace/configuration' request is sent from the server to the client to fetch a certain
	 * configuration setting.
	 *
	 * This pull model replaces the old push model were the client signaled configuration change via an
	 * event. If the server still needs to react to configuration changes (since the server caches the
	 * result of `workspace/configuration` requests) the server should register for an empty configuration
	 * change event and empty the cache if such an event is received.
	 */
	var ConfigurationRequest;
	(function (ConfigurationRequest) {
		ConfigurationRequest.type = new vscode_jsonrpc_1.RequestType('workspace/configuration');
	})(ConfigurationRequest = exports.ConfigurationRequest || (exports.ConfigurationRequest = {}));


	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	/**
	 * A request to list all color symbols found in a given text document. The request's
	 * parameter is of type [DocumentColorParams](#DocumentColorParams) the
	 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
	 * that resolves to such.
	 */
	var DocumentColorRequest;
	(function (DocumentColorRequest) {
		DocumentColorRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentColor');
	})(DocumentColorRequest = exports.DocumentColorRequest || (exports.DocumentColorRequest = {}));
	/**
	 * A request to list all presentation for a color. The request's
	 * parameter is of type [ColorPresentationParams](#ColorPresentationParams) the
	 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
	 * that resolves to such.
	 */
	var ColorPresentationRequest;
	(function (ColorPresentationRequest) {
		ColorPresentationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/colorPresentation');
	})(ColorPresentationRequest = exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {}));


	/***/ }),
	/* 59 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	/**
	 * Enum of known range kinds
	 */
	var FoldingRangeKind;
	(function (FoldingRangeKind) {
		/**
		 * Folding range for a comment
		 */
		FoldingRangeKind["Comment"] = "comment";
		/**
		 * Folding range for a imports or includes
		 */
		FoldingRangeKind["Imports"] = "imports";
		/**
		 * Folding range for a region (e.g. `#region`)
		 */
		FoldingRangeKind["Region"] = "region";
	})(FoldingRangeKind = exports.FoldingRangeKind || (exports.FoldingRangeKind = {}));
	/**
	 * A request to provide folding ranges in a document. The request's
	 * parameter is of type [FoldingRangeParams](#FoldingRangeParams), the
	 * response is of type [FoldingRangeList](#FoldingRangeList) or a Thenable
	 * that resolves to such.
	 */
	var FoldingRangeRequest;
	(function (FoldingRangeRequest) {
		FoldingRangeRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/foldingRange');
	})(FoldingRangeRequest = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {}));


	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(39);
	// @ts-ignore: to avoid inlining LocatioLink as dynamic import
	let __noDynamicImport;
	/**
	 * A request to resolve the type definition locations of a symbol at a given text
	 * document position. The request's parameter is of type [TextDocumentPositioParams]
	 * (#TextDocumentPositionParams) the response is of type [Declaration](#Declaration)
	 * or a typed array of [DeclarationLink](#DeclarationLink) or a Thenable that resolves
	 * to such.
	 */
	var DeclarationRequest;
	(function (DeclarationRequest) {
		DeclarationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/declaration');
	})(DeclarationRequest = exports.DeclarationRequest || (exports.DeclarationRequest = {}));


	/***/ }),
	/* 61 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const code = __webpack_require__(33);
	const proto = __webpack_require__(38);
	const Is = __webpack_require__(62);
	const protocolCompletionItem_1 = __webpack_require__(63);
	const protocolCodeLens_1 = __webpack_require__(64);
	const protocolDocumentLink_1 = __webpack_require__(65);
	function createConverter(uriConverter) {
		const nullConverter = (value) => value.toString();
		const _uriConverter = uriConverter || nullConverter;
		function asUri(value) {
			return _uriConverter(value);
		}
		function asTextDocumentIdentifier(textDocument) {
			return {
				uri: _uriConverter(textDocument.uri)
			};
		}
		function asVersionedTextDocumentIdentifier(textDocument) {
			return {
				uri: _uriConverter(textDocument.uri),
				version: textDocument.version
			};
		}
		function asOpenTextDocumentParams(textDocument) {
			return {
				textDocument: {
					uri: _uriConverter(textDocument.uri),
					languageId: textDocument.languageId,
					version: textDocument.version,
					text: textDocument.getText()
				}
			};
		}
		function isTextDocumentChangeEvent(value) {
			let candidate = value;
			return !!candidate.document && !!candidate.contentChanges;
		}
		function isTextDocument(value) {
			let candidate = value;
			return !!candidate.uri && !!candidate.version;
		}
		function asChangeTextDocumentParams(arg) {
			if (isTextDocument(arg)) {
				let result = {
					textDocument: {
						uri: _uriConverter(arg.uri),
						version: arg.version
					},
					contentChanges: [{ text: arg.getText() }]
				};
				return result;
			}
			else if (isTextDocumentChangeEvent(arg)) {
				let document = arg.document;
				let result = {
					textDocument: {
						uri: _uriConverter(document.uri),
						version: document.version
					},
					contentChanges: arg.contentChanges.map((change) => {
						let range = change.range;
						return {
							range: {
								start: { line: range.start.line, character: range.start.character },
								end: { line: range.end.line, character: range.end.character }
							},
							rangeLength: change.rangeLength,
							text: change.text
						};
					})
				};
				return result;
			}
			else {
				throw Error('Unsupported text document change parameter');
			}
		}
		function asCloseTextDocumentParams(textDocument) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument)
			};
		}
		function asSaveTextDocumentParams(textDocument, includeContent = false) {
			let result = {
				textDocument: asVersionedTextDocumentIdentifier(textDocument)
			};
			if (includeContent) {
				result.text = textDocument.getText();
			}
			return result;
		}
		function asTextDocumentSaveReason(reason) {
			switch (reason) {
				case code.TextDocumentSaveReason.Manual:
					return proto.TextDocumentSaveReason.Manual;
				case code.TextDocumentSaveReason.AfterDelay:
					return proto.TextDocumentSaveReason.AfterDelay;
				case code.TextDocumentSaveReason.FocusOut:
					return proto.TextDocumentSaveReason.FocusOut;
			}
			return proto.TextDocumentSaveReason.Manual;
		}
		function asWillSaveTextDocumentParams(event) {
			return {
				textDocument: asTextDocumentIdentifier(event.document),
				reason: asTextDocumentSaveReason(event.reason)
			};
		}
		function asTextDocumentPositionParams(textDocument, position) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument),
				position: asWorkerPosition(position)
			};
		}
		function asTriggerKind(triggerKind) {
			switch (triggerKind) {
				case code.CompletionTriggerKind.TriggerCharacter:
					return proto.CompletionTriggerKind.TriggerCharacter;
				case code.CompletionTriggerKind.TriggerForIncompleteCompletions:
					return proto.CompletionTriggerKind.TriggerForIncompleteCompletions;
				default:
					return proto.CompletionTriggerKind.Invoked;
			}
		}
		function asCompletionParams(textDocument, position, context) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument),
				position: asWorkerPosition(position),
				context: {
					triggerKind: asTriggerKind(context.triggerKind),
					triggerCharacter: context.triggerCharacter
				}
			};
		}
		function asWorkerPosition(position) {
			return { line: position.line, character: position.character };
		}
		function asPosition(value) {
			if (value === void 0) {
				return undefined;
			}
			else if (value === null) {
				return null;
			}
			return { line: value.line, character: value.character };
		}
		function asRange(value) {
			if (value === void 0 || value === null) {
				return value;
			}
			return { start: asPosition(value.start), end: asPosition(value.end) };
		}
		function asDiagnosticSeverity(value) {
			switch (value) {
				case code.DiagnosticSeverity.Error:
					return proto.DiagnosticSeverity.Error;
				case code.DiagnosticSeverity.Warning:
					return proto.DiagnosticSeverity.Warning;
				case code.DiagnosticSeverity.Information:
					return proto.DiagnosticSeverity.Information;
				case code.DiagnosticSeverity.Hint:
					return proto.DiagnosticSeverity.Hint;
			}
		}
		function asDiagnostic(item) {
			let result = proto.Diagnostic.create(asRange(item.range), item.message);
			if (Is.number(item.severity)) {
				result.severity = asDiagnosticSeverity(item.severity);
			}
			if (Is.number(item.code) || Is.string(item.code)) {
				result.code = item.code;
			}
			if (item.source) {
				result.source = item.source;
			}
			return result;
		}
		function asDiagnostics(items) {
			if (items === void 0 || items === null) {
				return items;
			}
			return items.map(asDiagnostic);
		}
		function asDocumentation(format, documentation) {
			switch (format) {
				case '$string':
					return documentation;
				case proto.MarkupKind.PlainText:
					return { kind: format, value: documentation };
				case proto.MarkupKind.Markdown:
					return { kind: format, value: documentation.value };
				default:
					return `Unsupported Markup content received. Kind is: ${format}`;
			}
		}
		function asCompletionItemKind(value, original) {
			if (original !== void 0) {
				return original;
			}
			return value + 1;
		}
		function asCompletionItem(item) {
			let result = { label: item.label };
			let protocolItem = item instanceof protocolCompletionItem_1.default ? item : undefined;
			if (item.detail) {
				result.detail = item.detail;
			}
			// We only send items back we created. So this can't be something else than
			// a string right now.
			if (item.documentation) {
				if (!protocolItem || protocolItem.documentationFormat === '$string') {
					result.documentation = item.documentation;
				}
				else {
					result.documentation = asDocumentation(protocolItem.documentationFormat, item.documentation);
				}
			}
			if (item.filterText) {
				result.filterText = item.filterText;
			}
			fillPrimaryInsertText(result, item);
			if (Is.number(item.kind)) {
				result.kind = asCompletionItemKind(item.kind, protocolItem && protocolItem.originalItemKind);
			}
			if (item.sortText) {
				result.sortText = item.sortText;
			}
			if (item.additionalTextEdits) {
				result.additionalTextEdits = asTextEdits(item.additionalTextEdits);
			}
			if (item.commitCharacters) {
				result.commitCharacters = item.commitCharacters.slice();
			}
			if (item.command) {
				result.command = asCommand(item.command);
			}
			if (item.preselect === true || item.preselect === false) {
				result.preselect = item.preselect;
			}
			if (protocolItem) {
				if (protocolItem.data !== void 0) {
					result.data = protocolItem.data;
				}
				if (protocolItem.deprecated === true || protocolItem.deprecated === false) {
					result.deprecated = protocolItem.deprecated;
				}
			}
			return result;
		}
		function fillPrimaryInsertText(target, source) {
			let format = proto.InsertTextFormat.PlainText;
			let text;
			let range = undefined;
			if (source.textEdit) {
				text = source.textEdit.newText;
				range = asRange(source.textEdit.range);
			}
			else if (source.insertText instanceof code.SnippetString) {
				format = proto.InsertTextFormat.Snippet;
				text = source.insertText.value;
			}
			else {
				text = source.insertText;
			}
			if (source.range) {
				range = asRange(source.range);
			}
			target.insertTextFormat = format;
			if (source.fromEdit && text && range) {
				target.textEdit = { newText: text, range: range };
			}
			else {
				target.insertText = text;
			}
		}
		function asTextEdit(edit) {
			return { range: asRange(edit.range), newText: edit.newText };
		}
		function asTextEdits(edits) {
			if (edits === void 0 || edits === null) {
				return edits;
			}
			return edits.map(asTextEdit);
		}
		function asReferenceParams(textDocument, position, options) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument),
				position: asWorkerPosition(position),
				context: { includeDeclaration: options.includeDeclaration }
			};
		}
		function asCodeActionContext(context) {
			if (context === void 0 || context === null) {
				return context;
			}
			return proto.CodeActionContext.create(asDiagnostics(context.diagnostics), Is.string(context.only) ? [context.only] : undefined);
		}
		function asCommand(item) {
			let result = proto.Command.create(item.title, item.command);
			if (item.arguments) {
				result.arguments = item.arguments;
			}
			return result;
		}
		function asCodeLens(item) {
			let result = proto.CodeLens.create(asRange(item.range));
			if (item.command) {
				result.command = asCommand(item.command);
			}
			if (item instanceof protocolCodeLens_1.default) {
				if (item.data) {
					result.data = item.data;
				}
				;
			}
			return result;
		}
		function asFormattingOptions(item) {
			return { tabSize: item.tabSize, insertSpaces: item.insertSpaces };
		}
		function asDocumentSymbolParams(textDocument) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument)
			};
		}
		function asCodeLensParams(textDocument) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument)
			};
		}
		function asDocumentLink(item) {
			let result = proto.DocumentLink.create(asRange(item.range));
			if (item.target) {
				result.target = asUri(item.target);
			}
			let protocolItem = item instanceof protocolDocumentLink_1.default ? item : undefined;
			if (protocolItem && protocolItem.data) {
				result.data = protocolItem.data;
			}
			return result;
		}
		function asDocumentLinkParams(textDocument) {
			return {
				textDocument: asTextDocumentIdentifier(textDocument)
			};
		}
		return {
			asUri,
			asTextDocumentIdentifier,
			asVersionedTextDocumentIdentifier,
			asOpenTextDocumentParams,
			asChangeTextDocumentParams,
			asCloseTextDocumentParams,
			asSaveTextDocumentParams,
			asWillSaveTextDocumentParams,
			asTextDocumentPositionParams,
			asCompletionParams,
			asWorkerPosition,
			asRange,
			asPosition,
			asDiagnosticSeverity,
			asDiagnostic,
			asDiagnostics,
			asCompletionItem,
			asTextEdit,
			asReferenceParams,
			asCodeActionContext,
			asCommand,
			asCodeLens,
			asFormattingOptions,
			asDocumentSymbolParams,
			asCodeLensParams,
			asDocumentLink,
			asDocumentLinkParams
		};
	}
	exports.createConverter = createConverter;


	/***/ }),
	/* 62 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	function boolean(value) {
		return value === true || value === false;
	}
	exports.boolean = boolean;
	function string(value) {
		return typeof value === 'string' || value instanceof String;
	}
	exports.string = string;
	function number(value) {
		return typeof value === 'number' || value instanceof Number;
	}
	exports.number = number;
	function error(value) {
		return value instanceof Error;
	}
	exports.error = error;
	function func(value) {
		return typeof value === 'function';
	}
	exports.func = func;
	function array(value) {
		return Array.isArray(value);
	}
	exports.array = array;
	function stringArray(value) {
		return array(value) && value.every(elem => string(elem));
	}
	exports.stringArray = stringArray;
	function typedArray(value, check) {
		return Array.isArray(value) && value.every(check);
	}
	exports.typedArray = typedArray;
	function thenable(value) {
		return value && func(value.then);
	}
	exports.thenable = thenable;


	/***/ }),
	/* 63 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const code = __webpack_require__(33);
	class ProtocolCompletionItem extends code.CompletionItem {
		constructor(label) {
			super(label);
		}
	}
	exports.default = ProtocolCompletionItem;


	/***/ }),
	/* 64 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const code = __webpack_require__(33);
	class ProtocolCodeLens extends code.CodeLens {
		constructor(range) {
			super(range);
		}
	}
	exports.default = ProtocolCodeLens;


	/***/ }),
	/* 65 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const code = __webpack_require__(33);
	class ProtocolDocumentLink extends code.DocumentLink {
		constructor(range, target) {
			super(range, target);
		}
	}
	exports.default = ProtocolDocumentLink;


	/***/ }),
	/* 66 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const code = __webpack_require__(33);
	const ls = __webpack_require__(38);
	const Is = __webpack_require__(62);
	const protocolCompletionItem_1 = __webpack_require__(63);
	const protocolCodeLens_1 = __webpack_require__(64);
	const protocolDocumentLink_1 = __webpack_require__(65);
	var CodeBlock;
	(function (CodeBlock) {
		function is(value) {
			let candidate = value;
			return candidate && Is.string(candidate.language) && Is.string(candidate.value);
		}
		CodeBlock.is = is;
	})(CodeBlock || (CodeBlock = {}));
	function createConverter(uriConverter) {
		const nullConverter = (value) => code.Uri.parse(value);
		const _uriConverter = uriConverter || nullConverter;
		function asUri(value) {
			return _uriConverter(value);
		}
		function asDiagnostics(diagnostics) {
			return diagnostics.map(asDiagnostic);
		}
		function asDiagnostic(diagnostic) {
			let result = new code.Diagnostic(asRange(diagnostic.range), diagnostic.message, asDiagnosticSeverity(diagnostic.severity));
			if (Is.number(diagnostic.code) || Is.string(diagnostic.code)) {
				result.code = diagnostic.code;
			}
			if (diagnostic.source) {
				result.source = diagnostic.source;
			}
			if (diagnostic.relatedInformation) {
				result.relatedInformation = asRelatedInformation(diagnostic.relatedInformation);
			}
			return result;
		}
		function asRelatedInformation(relatedInformation) {
			return relatedInformation.map(asDiagnosticRelatedInformation);
		}
		function asDiagnosticRelatedInformation(information) {
			return new code.DiagnosticRelatedInformation(asLocation(information.location), information.message);
		}
		function asPosition(value) {
			if (!value) {
				return undefined;
			}
			return new code.Position(value.line, value.character);
		}
		function asRange(value) {
			if (!value) {
				return undefined;
			}
			return new code.Range(asPosition(value.start), asPosition(value.end));
		}
		function asDiagnosticSeverity(value) {
			if (value === void 0 || value === null) {
				return code.DiagnosticSeverity.Error;
			}
			switch (value) {
				case ls.DiagnosticSeverity.Error:
					return code.DiagnosticSeverity.Error;
				case ls.DiagnosticSeverity.Warning:
					return code.DiagnosticSeverity.Warning;
				case ls.DiagnosticSeverity.Information:
					return code.DiagnosticSeverity.Information;
				case ls.DiagnosticSeverity.Hint:
					return code.DiagnosticSeverity.Hint;
			}
			return code.DiagnosticSeverity.Error;
		}
		function asHoverContent(value) {
			if (Is.string(value)) {
				return new code.MarkdownString(value);
			}
			else if (CodeBlock.is(value)) {
				let result = new code.MarkdownString();
				return result.appendCodeblock(value.value, value.language);
			}
			else if (Array.isArray(value)) {
				let result = [];
				for (let element of value) {
					let item = new code.MarkdownString();
					if (CodeBlock.is(element)) {
						item.appendCodeblock(element.value, element.language);
					}
					else {
						item.appendMarkdown(element);
					}
					result.push(item);
				}
				return result;
			}
			else {
				let result;
				switch (value.kind) {
					case ls.MarkupKind.Markdown:
						return new code.MarkdownString(value.value);
					case ls.MarkupKind.PlainText:
						result = new code.MarkdownString();
						result.appendText(value.value);
						return result;
					default:
						result = new code.MarkdownString();
						result.appendText(`Unsupported Markup content received. Kind is: ${value.kind}`);
						return result;
				}
			}
		}
		function asDocumentation(value) {
			if (Is.string(value)) {
				return value;
			}
			else {
				switch (value.kind) {
					case ls.MarkupKind.Markdown:
						return new code.MarkdownString(value.value);
					case ls.MarkupKind.PlainText:
						return value.value;
					default:
						return `Unsupported Markup content received. Kind is: ${value.kind}`;
				}
			}
		}
		function asHover(hover) {
			if (!hover) {
				return undefined;
			}
			return new code.Hover(asHoverContent(hover.contents), asRange(hover.range));
		}
		function asCompletionResult(result) {
			if (!result) {
				return undefined;
			}
			if (Array.isArray(result)) {
				let items = result;
				return items.map(asCompletionItem);
			}
			let list = result;
			return new code.CompletionList(list.items.map(asCompletionItem), list.isIncomplete);
		}
		function asCompletionItemKind(value) {
			// Protocol item kind is 1 based, codes item kind is zero based.
			if (ls.CompletionItemKind.Text <= value && value <= ls.CompletionItemKind.TypeParameter) {
				return [value - 1, undefined];
			}
			;
			return [code.CompletionItemKind.Text, value];
		}
		function asCompletionItem(item) {
			let result = new protocolCompletionItem_1.default(item.label);
			if (item.detail) {
				result.detail = item.detail;
			}
			if (item.documentation) {
				result.documentation = asDocumentation(item.documentation);
				result.documentationFormat = Is.string(item.documentation) ? '$string' : item.documentation.kind;
			}
			;
			if (item.filterText) {
				result.filterText = item.filterText;
			}
			let insertText = asCompletionInsertText(item);
			if (insertText) {
				result.insertText = insertText.text;
				result.range = insertText.range;
				result.fromEdit = insertText.fromEdit;
			}
			if (Is.number(item.kind)) {
				let [itemKind, original] = asCompletionItemKind(item.kind);
				result.kind = itemKind;
				if (original) {
					result.originalItemKind = original;
				}
			}
			if (item.sortText) {
				result.sortText = item.sortText;
			}
			if (item.additionalTextEdits) {
				result.additionalTextEdits = asTextEdits(item.additionalTextEdits);
			}
			if (Is.stringArray(item.commitCharacters)) {
				result.commitCharacters = item.commitCharacters.slice();
			}
			if (item.command) {
				result.command = asCommand(item.command);
			}
			if (item.deprecated === true || item.deprecated === false) {
				result.deprecated = item.deprecated;
			}
			if (item.preselect === true || item.preselect === false) {
				result.preselect = item.preselect;
			}
			if (item.data !== void 0) {
				result.data = item.data;
			}
			return result;
		}
		function asCompletionInsertText(item) {
			if (item.textEdit) {
				if (item.insertTextFormat === ls.InsertTextFormat.Snippet) {
					return { text: new code.SnippetString(item.textEdit.newText), range: asRange(item.textEdit.range), fromEdit: true };
				}
				else {
					return { text: item.textEdit.newText, range: asRange(item.textEdit.range), fromEdit: true };
				}
			}
			else if (item.insertText) {
				if (item.insertTextFormat === ls.InsertTextFormat.Snippet) {
					return { text: new code.SnippetString(item.insertText), fromEdit: false };
				}
				else {
					return { text: item.insertText, fromEdit: false };
				}
			}
			else {
				return undefined;
			}
		}
		function asTextEdit(edit) {
			if (!edit) {
				return undefined;
			}
			return new code.TextEdit(asRange(edit.range), edit.newText);
		}
		function asTextEdits(items) {
			if (!items) {
				return undefined;
			}
			return items.map(asTextEdit);
		}
		function asSignatureHelp(item) {
			if (!item) {
				return undefined;
			}
			let result = new code.SignatureHelp();
			if (Is.number(item.activeSignature)) {
				result.activeSignature = item.activeSignature;
			}
			else {
				// activeSignature was optional in the past
				result.activeSignature = 0;
			}
			if (Is.number(item.activeParameter)) {
				result.activeParameter = item.activeParameter;
			}
			else {
				// activeParameter was optional in the past
				result.activeParameter = 0;
			}
			if (item.signatures) {
				result.signatures = asSignatureInformations(item.signatures);
			}
			return result;
		}
		function asSignatureInformations(items) {
			return items.map(asSignatureInformation);
		}
		function asSignatureInformation(item) {
			let result = new code.SignatureInformation(item.label);
			if (item.documentation) {
				result.documentation = asDocumentation(item.documentation);
			}
			if (item.parameters) {
				result.parameters = asParameterInformations(item.parameters);
			}
			return result;
		}
		function asParameterInformations(item) {
			return item.map(asParameterInformation);
		}
		function asParameterInformation(item) {
			let result = new code.ParameterInformation(item.label);
			if (item.documentation) {
				result.documentation = asDocumentation(item.documentation);
			}
			;
			return result;
		}
		function asLocation(item) {
			if (!item) {
				return undefined;
			}
			return new code.Location(_uriConverter(item.uri), asRange(item.range));
		}
		function asDeclarationResult(item) {
			if (!item) {
				return undefined;
			}
			return asLocationResult(item);
		}
		function asDefinitionResult(item) {
			if (!item) {
				return undefined;
			}
			return asLocationResult(item);
		}
		function asLocationLink(item) {
			if (!item) {
				return undefined;
			}
			return {
				targetUri: _uriConverter(item.targetUri),
				targetRange: asRange(item.targetSelectionRange),
				originSelectionRange: asRange(item.originSelectionRange),
				targetSelectionRange: asRange(item.targetSelectionRange)
			};
		}
		function asLocationResult(item) {
			if (!item) {
				return undefined;
			}
			if (Is.array(item)) {
				if (item.length === 0) {
					return [];
				}
				else if (ls.LocationLink.is(item[0])) {
					let links = item;
					return links.map((link) => asLocationLink(link));
				}
				else {
					let locations = item;
					return locations.map((location) => asLocation(location));
				}
			}
			else if (ls.LocationLink.is(item)) {
				return [asLocationLink(item)];
			}
			else {
				return asLocation(item);
			}
		}
		function asReferences(values) {
			if (!values) {
				return undefined;
			}
			return values.map(location => asLocation(location));
		}
		function asDocumentHighlights(values) {
			if (!values) {
				return undefined;
			}
			return values.map(asDocumentHighlight);
		}
		function asDocumentHighlight(item) {
			let result = new code.DocumentHighlight(asRange(item.range));
			if (Is.number(item.kind)) {
				result.kind = asDocumentHighlightKind(item.kind);
			}
			return result;
		}
		function asDocumentHighlightKind(item) {
			switch (item) {
				case ls.DocumentHighlightKind.Text:
					return code.DocumentHighlightKind.Text;
				case ls.DocumentHighlightKind.Read:
					return code.DocumentHighlightKind.Read;
				case ls.DocumentHighlightKind.Write:
					return code.DocumentHighlightKind.Write;
			}
			return code.DocumentHighlightKind.Text;
		}
		function asSymbolInformations(values, uri) {
			if (!values) {
				return undefined;
			}
			return values.map(information => asSymbolInformation(information, uri));
		}
		function asSymbolKind(item) {
			if (item <= ls.SymbolKind.TypeParameter) {
				// Symbol kind is one based in the protocol and zero based in code.
				return item - 1;
			}
			return code.SymbolKind.Property;
		}
		function asSymbolInformation(item, uri) {
			// Symbol kind is one based in the protocol and zero based in code.
			let result = new code.SymbolInformation(item.name, asSymbolKind(item.kind), asRange(item.location.range), item.location.uri ? _uriConverter(item.location.uri) : uri);
			if (item.containerName) {
				result.containerName = item.containerName;
			}
			return result;
		}
		function asDocumentSymbols(values) {
			if (values === void 0 || values === null) {
				return undefined;
			}
			return values.map(asDocumentSymbol);
		}
		function asDocumentSymbol(value) {
			let result = new code.DocumentSymbol(value.name, value.detail || '', asSymbolKind(value.kind), asRange(value.range), asRange(value.selectionRange));
			if (value.children !== void 0 && value.children.length > 0) {
				let children = [];
				for (let child of value.children) {
					children.push(asDocumentSymbol(child));
				}
				result.children = children;
			}
			return result;
		}
		function asCommand(item) {
			let result = { title: item.title, command: item.command };
			if (item.arguments) {
				result.arguments = item.arguments;
			}
			return result;
		}
		function asCommands(items) {
			if (!items) {
				return undefined;
			}
			return items.map(asCommand);
		}
		const kindMapping = new Map();
		kindMapping.set('', code.CodeActionKind.Empty);
		kindMapping.set(ls.CodeActionKind.QuickFix, code.CodeActionKind.QuickFix);
		kindMapping.set(ls.CodeActionKind.Refactor, code.CodeActionKind.Refactor);
		kindMapping.set(ls.CodeActionKind.RefactorExtract, code.CodeActionKind.RefactorExtract);
		kindMapping.set(ls.CodeActionKind.RefactorInline, code.CodeActionKind.RefactorInline);
		kindMapping.set(ls.CodeActionKind.RefactorRewrite, code.CodeActionKind.RefactorRewrite);
		kindMapping.set(ls.CodeActionKind.Source, code.CodeActionKind.Source);
		kindMapping.set(ls.CodeActionKind.SourceOrganizeImports, code.CodeActionKind.SourceOrganizeImports);
		function asCodeActionKind(item) {
			if (item === void 0 || item === null) {
				return undefined;
			}
			let result = kindMapping.get(item);
			if (result) {
				return result;
			}
			let parts = item.split('.');
			result = code.CodeActionKind.Empty;
			for (let part of parts) {
				result = result.append(part);
			}
			return result;
		}
		function asCodeActionKinds(items) {
			if (items === void 0 || items === null) {
				return undefined;
			}
			return items.map(kind => asCodeActionKind(kind));
		}
		function asCodeAction(item) {
			if (item === void 0 || item === null) {
				return undefined;
			}
			let result = new code.CodeAction(item.title);
			if (item.kind !== void 0) {
				result.kind = asCodeActionKind(item.kind);
			}
			if (item.diagnostics) {
				result.diagnostics = asDiagnostics(item.diagnostics);
			}
			if (item.edit) {
				result.edit = asWorkspaceEdit(item.edit);
			}
			if (item.command) {
				result.command = asCommand(item.command);
			}
			return result;
		}
		function asCodeLens(item) {
			if (!item) {
				return undefined;
			}
			let result = new protocolCodeLens_1.default(asRange(item.range));
			if (item.command) {
				result.command = asCommand(item.command);
			}
			if (item.data !== void 0 && item.data !== null) {
				result.data = item.data;
			}
			return result;
		}
		function asCodeLenses(items) {
			if (!items) {
				return undefined;
			}
			return items.map((codeLens) => asCodeLens(codeLens));
		}
		function asWorkspaceEdit(item) {
			if (!item) {
				return undefined;
			}
			let result = new code.WorkspaceEdit();
			if (item.documentChanges) {
				item.documentChanges.forEach(change => {
					if (ls.CreateFile.is(change)) {
						result.createFile(_uriConverter(change.uri), change.options);
					}
					else if (ls.RenameFile.is(change)) {
						result.renameFile(_uriConverter(change.oldUri), _uriConverter(change.newUri), change.options);
					}
					else if (ls.DeleteFile.is(change)) {
						result.deleteFile(_uriConverter(change.uri), change.options);
					}
					else if (ls.TextDocumentEdit.is(change)) {
						result.set(_uriConverter(change.textDocument.uri), asTextEdits(change.edits));
					}
					else {
						console.error(`Unknown workspace edit change received:\n${JSON.stringify(change, undefined, 4)}`);
					}
				});
			}
			else if (item.changes) {
				Object.keys(item.changes).forEach(key => {
					result.set(_uriConverter(key), asTextEdits(item.changes[key]));
				});
			}
			return result;
		}
		function asDocumentLink(item) {
			let range = asRange(item.range);
			let target = item.target ? asUri(item.target) : undefined;
			// target must be optional in DocumentLink
			let link = new protocolDocumentLink_1.default(range, target);
			if (item.data !== void 0 && item.data !== null) {
				link.data = item.data;
			}
			return link;
		}
		function asDocumentLinks(items) {
			if (!items) {
				return undefined;
			}
			return items.map(asDocumentLink);
		}
		function asColor(color) {
			return new code.Color(color.red, color.green, color.blue, color.alpha);
		}
		function asColorInformation(ci) {
			return new code.ColorInformation(asRange(ci.range), asColor(ci.color));
		}
		function asColorInformations(colorInformation) {
			if (Array.isArray(colorInformation)) {
				return colorInformation.map(asColorInformation);
			}
			return undefined;
		}
		function asColorPresentation(cp) {
			let presentation = new code.ColorPresentation(cp.label);
			presentation.additionalTextEdits = asTextEdits(cp.additionalTextEdits);
			if (cp.textEdit) {
				presentation.textEdit = asTextEdit(cp.textEdit);
			}
			return presentation;
		}
		function asColorPresentations(colorPresentations) {
			if (Array.isArray(colorPresentations)) {
				return colorPresentations.map(asColorPresentation);
			}
			return undefined;
		}
		function asFoldingRangeKind(kind) {
			if (kind) {
				switch (kind) {
					case ls.FoldingRangeKind.Comment:
						return code.FoldingRangeKind.Comment;
					case ls.FoldingRangeKind.Imports:
						return code.FoldingRangeKind.Imports;
					case ls.FoldingRangeKind.Region:
						return code.FoldingRangeKind.Region;
				}
			}
			return void 0;
		}
		function asFoldingRange(r) {
			return new code.FoldingRange(r.startLine, r.endLine, asFoldingRangeKind(r.kind));
		}
		function asFoldingRanges(foldingRanges) {
			if (Array.isArray(foldingRanges)) {
				return foldingRanges.map(asFoldingRange);
			}
			return void 0;
		}
		return {
			asUri,
			asDiagnostics,
			asDiagnostic,
			asRange,
			asPosition,
			asDiagnosticSeverity,
			asHover,
			asCompletionResult,
			asCompletionItem,
			asTextEdit,
			asTextEdits,
			asSignatureHelp,
			asSignatureInformations,
			asSignatureInformation,
			asParameterInformations,
			asParameterInformation,
			asDeclarationResult,
			asDefinitionResult,
			asLocation,
			asReferences,
			asDocumentHighlights,
			asDocumentHighlight,
			asDocumentHighlightKind,
			asSymbolInformations,
			asSymbolInformation,
			asDocumentSymbols,
			asDocumentSymbol,
			asCommand,
			asCommands,
			asCodeAction,
			asCodeActionKind,
			asCodeActionKinds,
			asCodeLens,
			asCodeLenses,
			asWorkspaceEdit,
			asDocumentLink,
			asDocumentLinks,
			asFoldingRangeKind,
			asFoldingRange,
			asFoldingRanges,
			asColor,
			asColorInformation,
			asColorInformations,
			asColorPresentation,
			asColorPresentations
		};
	}
	exports.createConverter = createConverter;


	/***/ }),
	/* 67 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	class Delayer {
		constructor(defaultDelay) {
			this.defaultDelay = defaultDelay;
			this.timeout = undefined;
			this.completionPromise = undefined;
			this.onSuccess = undefined;
			this.task = undefined;
		}
		trigger(task, delay = this.defaultDelay) {
			this.task = task;
			if (delay >= 0) {
				this.cancelTimeout();
			}
			if (!this.completionPromise) {
				this.completionPromise = new Promise((resolve) => {
					this.onSuccess = resolve;
				}).then(() => {
					this.completionPromise = undefined;
					this.onSuccess = undefined;
					var result = this.task();
					this.task = undefined;
					return result;
				});
			}
			if (delay >= 0 || this.timeout === void 0) {
				this.timeout = setTimeout(() => {
					this.timeout = undefined;
					this.onSuccess(undefined);
				}, delay >= 0 ? delay : this.defaultDelay);
			}
			return this.completionPromise;
		}
		forceDelivery() {
			if (!this.completionPromise) {
				return undefined;
			}
			this.cancelTimeout();
			let result = this.task();
			this.completionPromise = undefined;
			this.onSuccess = undefined;
			this.task = undefined;
			return result;
		}
		isTriggered() {
			return this.timeout !== void 0;
		}
		cancel() {
			this.cancelTimeout();
			this.completionPromise = undefined;
		}
		cancelTimeout() {
			if (this.timeout !== void 0) {
				clearTimeout(this.timeout);
				this.timeout = undefined;
			}
		}
	}
	exports.Delayer = Delayer;


	/***/ }),
	/* 68 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	class ValueUUID {
		constructor(_value) {
			this._value = _value;
			// empty
		}
		asHex() {
			return this._value;
		}
		equals(other) {
			return this.asHex() === other.asHex();
		}
	}
	class V4UUID extends ValueUUID {
		constructor() {
			super([
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				'-',
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				'-',
				'4',
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				'-',
				V4UUID._oneOf(V4UUID._timeHighBits),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				'-',
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
				V4UUID._randomHex(),
			].join(''));
		}
		static _oneOf(array) {
			return array[Math.floor(array.length * Math.random())];
		}
		static _randomHex() {
			return V4UUID._oneOf(V4UUID._chars);
		}
	}
	V4UUID._chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	V4UUID._timeHighBits = ['8', '9', 'a', 'b'];
	/**
	 * An empty UUID that contains only zeros.
	 */
	exports.empty = new ValueUUID('00000000-0000-0000-0000-000000000000');
	function v4() {
		return new V4UUID();
	}
	exports.v4 = v4;
	const _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	function isUUID(value) {
		return _UUIDPattern.test(value);
	}
	exports.isUUID = isUUID;
	/**
	 * Parses a UUID that is of the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
	 * @param value A uuid string.
	 */
	function parse(value) {
		if (!isUUID(value)) {
			throw new Error('invalid uuid');
		}
		return new ValueUUID(value);
	}
	exports.parse = parse;
	function generateUuid() {
		return v4().asHex();
	}
	exports.generateUuid = generateUuid;


	/***/ }),
	/* 69 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const Is = __webpack_require__(62);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const client_1 = __webpack_require__(37);
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	class ColorProviderFeature extends client_1.TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DocumentColorRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'colorProvider').dynamicRegistration = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.colorProvider) {
				return;
			}
			const implCapabilities = capabilities.colorProvider;
			const id = Is.string(implCapabilities.id) && implCapabilities.id.length > 0 ? implCapabilities.id : UUID.generateUuid();
			const selector = implCapabilities.documentSelector || documentSelector;
			if (selector) {
				this.register(this.messages, {
					id,
					registerOptions: Object.assign({}, { documentSelector: selector })
				});
			}
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideColorPresentations = (color, context, token) => {
				const requestParams = {
					color,
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(context.document),
					range: client.code2ProtocolConverter.asRange(context.range)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, requestParams, token).then(this.asColorPresentations.bind(this), (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let provideDocumentColors = (document, token) => {
				const requestParams = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, requestParams, token).then(this.asColorInformations.bind(this), (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerColorProvider(options.documentSelector, {
				provideColorPresentations: (color, context, token) => {
					return middleware.provideColorPresentations
						? middleware.provideColorPresentations(color, context, token, provideColorPresentations)
						: provideColorPresentations(color, context, token);
				},
				provideDocumentColors: (document, token) => {
					return middleware.provideDocumentColors
						? middleware.provideDocumentColors(document, token, provideDocumentColors)
						: provideDocumentColors(document, token);
				}
			});
		}
		asColor(color) {
			return new vscode_1.Color(color.red, color.green, color.blue, color.alpha);
		}
		asColorInformations(colorInformation) {
			if (Array.isArray(colorInformation)) {
				return colorInformation.map(ci => {
					return new vscode_1.ColorInformation(this._client.protocol2CodeConverter.asRange(ci.range), this.asColor(ci.color));
				});
			}
			return [];
		}
		asColorPresentations(colorPresentations) {
			if (Array.isArray(colorPresentations)) {
				return colorPresentations.map(cp => {
					let presentation = new vscode_1.ColorPresentation(cp.label);
					presentation.additionalTextEdits = this._client.protocol2CodeConverter.asTextEdits(cp.additionalTextEdits);
					presentation.textEdit = this._client.protocol2CodeConverter.asTextEdit(cp.textEdit);
					return presentation;
				});
			}
			return [];
		}
	}
	exports.ColorProviderFeature = ColorProviderFeature;


	/***/ }),
	/* 70 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	class ConfigurationFeature {
		constructor(_client) {
			this._client = _client;
		}
		fillClientCapabilities(capabilities) {
			capabilities.workspace = capabilities.workspace || {};
			capabilities.workspace.configuration = true;
		}
		initialize() {
			let client = this._client;
			client.onRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, (params, token) => {
				let configuration = (params) => {
					let result = [];
					for (let item of params.items) {
						let resource = item.scopeUri !== void 0 && item.scopeUri !== null ? this._client.protocol2CodeConverter.asUri(item.scopeUri) : undefined;
						result.push(this.getConfiguration(resource, item.section !== null ? item.section : undefined));
					}
					return result;
				};
				let middleware = client.clientOptions.middleware.workspace;
				return middleware && middleware.configuration
					? middleware.configuration(params, token, configuration)
					: configuration(params, token);
			});
		}
		getConfiguration(resource, section) {
			let result = null;
			if (section) {
				let index = section.lastIndexOf('.');
				if (index === -1) {
					result = vscode_1.workspace.getConfiguration(undefined, resource).get(section);
				}
				else {
					let config = vscode_1.workspace.getConfiguration(section.substr(0, index));
					if (config) {
						result = config.get(section.substr(index + 1));
					}
				}
			}
			else {
				let config = vscode_1.workspace.getConfiguration(undefined, resource);
				result = {};
				for (let key of Object.keys(config)) {
					if (config.has(key)) {
						result[key] = config.get(key);
					}
				}
			}
			if (!result) {
				return null;
			}
			return result;
		}
	}
	exports.ConfigurationFeature = ConfigurationFeature;


	/***/ }),
	/* 71 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const Is = __webpack_require__(62);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const client_1 = __webpack_require__(37);
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	class ImplementationFeature extends client_1.TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.ImplementationRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let implementationSupport = ensure(ensure(capabilites, 'textDocument'), 'implementation');
			implementationSupport.dynamicRegistration = true;
			implementationSupport.linkSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.implementationProvider) {
				return;
			}
			if (capabilities.implementationProvider === true) {
				if (!documentSelector) {
					return;
				}
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: Object.assign({}, { documentSelector: documentSelector })
				});
			}
			else {
				const implCapabilities = capabilities.implementationProvider;
				const id = Is.string(implCapabilities.id) && implCapabilities.id.length > 0 ? implCapabilities.id : UUID.generateUuid();
				const selector = implCapabilities.documentSelector || documentSelector;
				if (selector) {
					this.register(this.messages, {
						id,
						registerOptions: Object.assign({}, { documentSelector: selector })
					});
				}
			}
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideImplementation = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asDefinitionResult, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerImplementationProvider(options.documentSelector, {
				provideImplementation: (document, position, token) => {
					return middleware.provideImplementation
						? middleware.provideImplementation(document, position, token, provideImplementation)
						: provideImplementation(document, position, token);
				}
			});
		}
	}
	exports.ImplementationFeature = ImplementationFeature;


	/***/ }),
	/* 72 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const Is = __webpack_require__(62);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const client_1 = __webpack_require__(37);
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	class TypeDefinitionFeature extends client_1.TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.TypeDefinitionRequest.type);
		}
		fillClientCapabilities(capabilites) {
			ensure(ensure(capabilites, 'textDocument'), 'typeDefinition').dynamicRegistration = true;
			let typeDefinitionSupport = ensure(ensure(capabilites, 'textDocument'), 'typeDefinition');
			typeDefinitionSupport.dynamicRegistration = true;
			typeDefinitionSupport.linkSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.typeDefinitionProvider) {
				return;
			}
			if (capabilities.typeDefinitionProvider === true) {
				if (!documentSelector) {
					return;
				}
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: Object.assign({}, { documentSelector: documentSelector })
				});
			}
			else {
				const implCapabilities = capabilities.typeDefinitionProvider;
				const id = Is.string(implCapabilities.id) && implCapabilities.id.length > 0 ? implCapabilities.id : UUID.generateUuid();
				const selector = implCapabilities.documentSelector || documentSelector;
				if (selector) {
					this.register(this.messages, {
						id,
						registerOptions: Object.assign({}, { documentSelector: selector })
					});
				}
			}
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideTypeDefinition = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asDefinitionResult, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerTypeDefinitionProvider(options.documentSelector, {
				provideTypeDefinition: (document, position, token) => {
					return middleware.provideTypeDefinition
						? middleware.provideTypeDefinition(document, position, token, provideTypeDefinition)
						: provideTypeDefinition(document, position, token);
				}
			});
		}
	}
	exports.TypeDefinitionFeature = TypeDefinitionFeature;


	/***/ }),
	/* 73 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	function access(target, key) {
		if (target === void 0) {
			return undefined;
		}
		return target[key];
	}
	class WorkspaceFoldersFeature {
		constructor(_client) {
			this._client = _client;
			this._listeners = new Map();
		}
		get messages() {
			return vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type;
		}
		fillInitializeParams(params) {
			let folders = vscode_1.workspace.workspaceFolders;
			if (folders === void 0) {
				params.workspaceFolders = null;
			}
			else {
				params.workspaceFolders = folders.map(folder => this.asProtocol(folder));
			}
		}
		fillClientCapabilities(capabilities) {
			capabilities.workspace = capabilities.workspace || {};
			capabilities.workspace.workspaceFolders = true;
		}
		initialize(capabilities) {
			let client = this._client;
			client.onRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type, (token) => {
				let workspaceFolders = () => {
					let folders = vscode_1.workspace.workspaceFolders;
					if (folders === void 0) {
						return null;
					}
					let result = folders.map((folder) => {
						return this.asProtocol(folder);
					});
					return result;
				};
				let middleware = client.clientOptions.middleware.workspace;
				return middleware && middleware.workspaceFolders
					? middleware.workspaceFolders(token, workspaceFolders)
					: workspaceFolders(token);
			});
			let value = access(access(access(capabilities, 'workspace'), 'workspaceFolders'), 'changeNotifications');
			let id;
			if (typeof value === 'string') {
				id = value;
			}
			else if (value === true) {
				id = UUID.generateUuid();
			}
			if (id) {
				this.register(this.messages, {
					id: id,
					registerOptions: undefined
				});
			}
		}
		register(_message, data) {
			let id = data.id;
			let client = this._client;
			let disposable = vscode_1.workspace.onDidChangeWorkspaceFolders((event) => {
				let didChangeWorkspaceFolders = (event) => {
					let params = {
						event: {
							added: event.added.map(folder => this.asProtocol(folder)),
							removed: event.removed.map(folder => this.asProtocol(folder))
						}
					};
					this._client.sendNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, params);
				};
				let middleware = client.clientOptions.middleware.workspace;
				middleware && middleware.didChangeWorkspaceFolders
					? middleware.didChangeWorkspaceFolders(event, didChangeWorkspaceFolders)
					: didChangeWorkspaceFolders(event);
			});
			this._listeners.set(id, disposable);
		}
		unregister(id) {
			let disposable = this._listeners.get(id);
			if (disposable === void 0) {
				return;
			}
			this._listeners.delete(id);
			disposable.dispose();
		}
		dispose() {
			for (let disposable of this._listeners.values()) {
				disposable.dispose();
			}
			this._listeners.clear();
		}
		asProtocol(workspaceFolder) {
			if (workspaceFolder === void 0) {
				return null;
			}
			return { uri: this._client.code2ProtocolConverter.asUri(workspaceFolder.uri), name: workspaceFolder.name };
		}
	}
	exports.WorkspaceFoldersFeature = WorkspaceFoldersFeature;


	/***/ }),
	/* 74 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const Is = __webpack_require__(62);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const client_1 = __webpack_require__(37);
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	class FoldingRangeFeature extends client_1.TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.FoldingRangeRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let capability = ensure(ensure(capabilites, 'textDocument'), 'foldingRange');
			capability.dynamicRegistration = true;
			capability.rangeLimit = 5000;
			capability.lineFoldingOnly = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.foldingRangeProvider) {
				return;
			}
			const implCapabilities = capabilities.foldingRangeProvider;
			const id = Is.string(implCapabilities.id) && implCapabilities.id.length > 0 ? implCapabilities.id : UUID.generateUuid();
			const selector = implCapabilities.documentSelector || documentSelector;
			if (selector) {
				this.register(this.messages, {
					id,
					registerOptions: Object.assign({}, { documentSelector: selector })
				});
			}
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideFoldingRanges = (document, _, token) => {
				const requestParams = {
					textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document)
				};
				return client.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, requestParams, token).then(this.asFoldingRanges.bind(this), (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerFoldingRangeProvider(options.documentSelector, {
				provideFoldingRanges(document, context, token) {
					return middleware.provideFoldingRanges
						? middleware.provideFoldingRanges(document, context, token, provideFoldingRanges)
						: provideFoldingRanges(document, context, token);
				}
			});
		}
		asFoldingRangeKind(kind) {
			if (kind) {
				switch (kind) {
					case vscode_languageserver_protocol_1.FoldingRangeKind.Comment:
						return vscode_1.FoldingRangeKind.Comment;
					case vscode_languageserver_protocol_1.FoldingRangeKind.Imports:
						return vscode_1.FoldingRangeKind.Imports;
					case vscode_languageserver_protocol_1.FoldingRangeKind.Region:
						return vscode_1.FoldingRangeKind.Region;
				}
			}
			return void 0;
		}
		asFoldingRanges(foldingRanges) {
			if (Array.isArray(foldingRanges)) {
				return foldingRanges.map(r => {
					return new vscode_1.FoldingRange(r.startLine, r.endLine, this.asFoldingRangeKind(r.kind));
				});
			}
			return [];
		}
	}
	exports.FoldingRangeFeature = FoldingRangeFeature;


	/***/ }),
	/* 75 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const UUID = __webpack_require__(68);
	const Is = __webpack_require__(62);
	const vscode_1 = __webpack_require__(33);
	const vscode_languageserver_protocol_1 = __webpack_require__(38);
	const client_1 = __webpack_require__(37);
	function ensure(target, key) {
		if (target[key] === void 0) {
			target[key] = {};
		}
		return target[key];
	}
	class DeclarationFeature extends client_1.TextDocumentFeature {
		constructor(client) {
			super(client, vscode_languageserver_protocol_1.DeclarationRequest.type);
		}
		fillClientCapabilities(capabilites) {
			let declarationSupport = ensure(ensure(capabilites, 'textDocument'), 'declaration');
			declarationSupport.dynamicRegistration = true;
			declarationSupport.linkSupport = true;
		}
		initialize(capabilities, documentSelector) {
			if (!capabilities.declarationProvider) {
				return;
			}
			if (capabilities.declarationProvider === true) {
				if (!documentSelector) {
					return;
				}
				this.register(this.messages, {
					id: UUID.generateUuid(),
					registerOptions: Object.assign({}, { documentSelector: documentSelector })
				});
			}
			else {
				const declCapabilities = capabilities.declarationProvider;
				const id = Is.string(declCapabilities.id) && declCapabilities.id.length > 0 ? declCapabilities.id : UUID.generateUuid();
				const selector = declCapabilities.documentSelector || documentSelector;
				if (selector) {
					this.register(this.messages, {
						id,
						registerOptions: Object.assign({}, { documentSelector: selector })
					});
				}
			}
		}
		registerLanguageProvider(options) {
			let client = this._client;
			let provideDeclaration = (document, position, token) => {
				return client.sendRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, client.code2ProtocolConverter.asTextDocumentPositionParams(document, position), token).then(client.protocol2CodeConverter.asDeclarationResult, (error) => {
					client.logFailedRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, error);
					return Promise.resolve(null);
				});
			};
			let middleware = client.clientOptions.middleware;
			return vscode_1.languages.registerDeclarationProvider(options.documentSelector, {
				provideDeclaration: (document, position, token) => {
					return middleware.provideDeclaration
						? middleware.provideDeclaration(document, position, token, provideDeclaration)
						: provideDeclaration(document, position, token);
				}
			});
		}
	}
	exports.DeclarationFeature = DeclarationFeature;


	/***/ }),
	/* 76 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const cp = __webpack_require__(35);
	const path_1 = __webpack_require__(1);
	const isWindows = (process.platform === 'win32');
	const isMacintosh = (process.platform === 'darwin');
	const isLinux = (process.platform === 'linux');
	function terminate(process, cwd) {
		if (isWindows) {
			try {
				// This we run in Atom execFileSync is available.
				// Ignore stderr since this is otherwise piped to parent.stderr
				// which might be already closed.
				let options = {
					stdio: ['pipe', 'pipe', 'ignore']
				};
				if (cwd) {
					options.cwd = cwd;
				}
				cp.execFileSync('taskkill', ['/T', '/F', '/PID', process.pid.toString()], options);
				return true;
			}
			catch (err) {
				return false;
			}
		}
		else if (isLinux || isMacintosh) {
			try {
				var cmd = path_1.join(__dirname, 'terminateProcess.sh');
				var result = cp.spawnSync(cmd, [process.pid.toString()]);
				return result.error ? false : true;
			}
			catch (err) {
				return false;
			}
		}
		else {
			process.kill('SIGKILL');
			return true;
		}
	}
	exports.terminate = terminate;


	/***/ }),
	/* 77 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------
	 * Copyright (C) Microsoft Corporation. All rights reserved.
	 *--------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	process.env['APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL'] = true;
	var fs = __webpack_require__(2);
	var os = __webpack_require__(48);
	var path = __webpack_require__(1);
	var vscode = __webpack_require__(33);
	var appInsights = __webpack_require__(78);
	var TelemetryReporter = /** @class */ (function () {
		// tslint:disable-next-line
		function TelemetryReporter(extensionId, extensionVersion, key) {
			var _this = this;
			this.extensionId = extensionId;
			this.extensionVersion = extensionVersion;
			this.userOptIn = false;
			var logFilePath = process.env['VSCODE_LOGS'] || '';
			if (logFilePath && extensionId && process.env['VSCODE_LOG_LEVEL'] === 'trace') {
				logFilePath = path.join(logFilePath, extensionId + ".txt");
				this.logStream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf8', autoClose: true });
			}
			this.updateUserOptIn(key);
			this.configListener = vscode.workspace.onDidChangeConfiguration(function () { return _this.updateUserOptIn(key); });
		}
		TelemetryReporter.prototype.updateUserOptIn = function (key) {
			var config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
			if (this.userOptIn !== config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true)) {
				this.userOptIn = config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
				if (this.userOptIn) {
					this.createAppInsightsClient(key);
				}
				else {
					this.dispose();
				}
			}
		};
		TelemetryReporter.prototype.createAppInsightsClient = function (key) {
			//check if another instance is already initialized
			if (appInsights.defaultClient) {
				this.appInsightsClient = new appInsights.TelemetryClient(key);
				// no other way to enable offline mode
				this.appInsightsClient.channel.setUseDiskRetryCaching(true);
			}
			else {
				appInsights.setup(key)
					.setAutoCollectRequests(false)
					.setAutoCollectPerformance(false)
					.setAutoCollectExceptions(false)
					.setAutoCollectDependencies(false)
					.setAutoDependencyCorrelation(false)
					.setAutoCollectConsole(false)
					.setUseDiskRetryCaching(true)
					.start();
				this.appInsightsClient = appInsights.defaultClient;
			}
			this.appInsightsClient.commonProperties = this.getCommonProperties();
			if (vscode && vscode.env) {
				this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.userId] = vscode.env.machineId;
				this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.sessionId] = vscode.env.sessionId;
			}
			//check if it's an Asimov key to change the endpoint
			if (key && key.indexOf('AIF-') === 0) {
				this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
			}
		};
		// __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
		// __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
		TelemetryReporter.prototype.getCommonProperties = function () {
			var commonProperties = Object.create(null);
			commonProperties['common.os'] = os.platform();
			commonProperties['common.platformversion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
			commonProperties['common.extname'] = this.extensionId;
			commonProperties['common.extversion'] = this.extensionVersion;
			if (vscode && vscode.env) {
				commonProperties['common.vscodemachineid'] = vscode.env.machineId;
				commonProperties['common.vscodesessionid'] = vscode.env.sessionId;
				commonProperties['common.vscodeversion'] = vscode.version;
			}
			return commonProperties;
		};
		TelemetryReporter.prototype.sendTelemetryEvent = function (eventName, properties, measurements) {
			if (this.userOptIn && eventName && this.appInsightsClient) {
				this.appInsightsClient.trackEvent({
					name: this.extensionId + "/" + eventName,
					properties: properties,
					measurements: measurements
				});
				if (this.logStream) {
					this.logStream.write("telemetry/" + eventName + " " + JSON.stringify({ properties: properties, measurements: measurements }) + "\n");
				}
			}
		};
		TelemetryReporter.prototype.dispose = function () {
			var _this = this;
			this.configListener.dispose();
			var flushEventsToLogger = new Promise(function (resolve) {
				if (!_this.logStream) {
					return resolve(void 0);
				}
				_this.logStream.on('finish', resolve);
				_this.logStream.end();
			});
			var flushEventsToAI = new Promise(function (resolve) {
				if (_this.appInsightsClient) {
					_this.appInsightsClient.flush({
						callback: function () {
							// all data flushed
							_this.appInsightsClient = undefined;
							resolve(void 0);
						}
					});
				}
				else {
					resolve(void 0);
				}
			});
			return Promise.all([flushEventsToAI, flushEventsToLogger]);
		};
		TelemetryReporter.TELEMETRY_CONFIG_ID = 'telemetry';
		TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';
		return TelemetryReporter;
	}());
	exports.default = TelemetryReporter;
	//# sourceMappingURL=telemetryReporter.js.map

	/***/ }),
	/* 78 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var CorrelationContextManager = __webpack_require__(79); // Keep this first
	var AutoCollectConsole = __webpack_require__(104);
	var AutoCollectExceptions = __webpack_require__(131);
	var AutoCollectPerformance = __webpack_require__(132);
	var AutoCollectHttpDependencies = __webpack_require__(133);
	var AutoCollectHttpRequests = __webpack_require__(144);
	var Logging = __webpack_require__(80);
	// We export these imports so that SDK users may use these classes directly.
	// They're exposed using "export import" so that types are passed along as expected
	exports.TelemetryClient = __webpack_require__(146);
	exports.Contracts = __webpack_require__(106);
	// Default autocollection configuration
	var _isConsole = true;
	var _isConsoleLog = false;
	var _isExceptions = true;
	var _isPerformance = true;
	var _isRequests = true;
	var _isDependencies = true;
	var _isDiskRetry = true;
	var _isCorrelating = true;
	var _diskRetryInterval = undefined;
	var _diskRetryMaxBytes = undefined;
	var _console;
	var _exceptions;
	var _performance;
	var _serverRequests;
	var _clientRequests;
	var _isStarted = false;
	/**
	 * Initializes the default client. Should be called after setting
	 * configuration options.
	 *
	 * @param instrumentationKey the instrumentation key to use. Optional, if
	 * this is not specified, the value will be read from the environment
	 * variable APPINSIGHTS_INSTRUMENTATIONKEY.
	 * @returns {Configuration} the configuration class to initialize
	 * and start the SDK.
	 */
	function setup(instrumentationKey) {
		if (!exports.defaultClient) {
			exports.defaultClient = new exports.TelemetryClient(instrumentationKey);
			_console = new AutoCollectConsole(exports.defaultClient);
			_exceptions = new AutoCollectExceptions(exports.defaultClient);
			_performance = new AutoCollectPerformance(exports.defaultClient);
			_serverRequests = new AutoCollectHttpRequests(exports.defaultClient);
			_clientRequests = new AutoCollectHttpDependencies(exports.defaultClient);
		}
		else {
			Logging.info("The default client is already setup");
		}
		if (exports.defaultClient && exports.defaultClient.channel) {
			exports.defaultClient.channel.setUseDiskRetryCaching(_isDiskRetry, _diskRetryInterval, _diskRetryMaxBytes);
		}
		return Configuration;
	}
	exports.setup = setup;
	/**
	 * Starts automatic collection of telemetry. Prior to calling start no
	 * telemetry will be *automatically* collected, though manual collection
	 * is enabled.
	 * @returns {ApplicationInsights} this class
	 */
	function start() {
		if (!!exports.defaultClient) {
			_isStarted = true;
			_console.enable(_isConsole, _isConsoleLog);
			_exceptions.enable(_isExceptions);
			_performance.enable(_isPerformance);
			_serverRequests.useAutoCorrelation(_isCorrelating);
			_serverRequests.enable(_isRequests);
			_clientRequests.enable(_isDependencies);
		}
		else {
			Logging.warn("Start cannot be called before setup");
		}
		return Configuration;
	}
	exports.start = start;
	/**
	 * Returns an object that is shared across all code handling a given request.
	 * This can be used similarly to thread-local storage in other languages.
	 * Properties set on this object will be available to telemetry processors.
	 *
	 * Do not store sensitive information here.
	 * Custom properties set on this object can be exposed in a future SDK
	 * release via outgoing HTTP headers.
	 * This is to allow for correlating data cross-component.
	 *
	 * This method will return null if automatic dependency correlation is disabled.
	 * @returns A plain object for request storage or null if automatic dependency correlation is disabled.
	 */
	function getCorrelationContext() {
		if (_isCorrelating) {
			return CorrelationContextManager.CorrelationContextManager.getCurrentContext();
		}
		return null;
	}
	exports.getCorrelationContext = getCorrelationContext;
	/**
	 * Returns a function that will get the same correlation context within its
	 * function body as the code executing this function.
	 * Use this method if automatic dependency correlation is not propagating
	 * correctly to an asynchronous callback.
	 */
	function wrapWithCorrelationContext(fn) {
		return CorrelationContextManager.CorrelationContextManager.wrapCallback(fn);
	}
	exports.wrapWithCorrelationContext = wrapWithCorrelationContext;
	/**
	 * The active configuration for global SDK behaviors, such as autocollection.
	 */
	var Configuration = (function () {
		function Configuration() {
		}
		/**
		 * Sets the state of console and logger tracking (enabled by default for third-party loggers only)
		 * @param value if true logger activity will be sent to Application Insights
		 * @param collectConsoleLog if true, logger autocollection will include console.log calls (default false)
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoCollectConsole = function (value, collectConsoleLog) {
			if (collectConsoleLog === void 0) { collectConsoleLog = false; }
			_isConsole = value;
			_isConsoleLog = collectConsoleLog;
			if (_isStarted) {
				_console.enable(value, collectConsoleLog);
			}
			return Configuration;
		};
		/**
		 * Sets the state of exception tracking (enabled by default)
		 * @param value if true uncaught exceptions will be sent to Application Insights
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoCollectExceptions = function (value) {
			_isExceptions = value;
			if (_isStarted) {
				_exceptions.enable(value);
			}
			return Configuration;
		};
		/**
		 * Sets the state of performance tracking (enabled by default)
		 * @param value if true performance counters will be collected every second and sent to Application Insights
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoCollectPerformance = function (value) {
			_isPerformance = value;
			if (_isStarted) {
				_performance.enable(value);
			}
			return Configuration;
		};
		/**
		 * Sets the state of request tracking (enabled by default)
		 * @param value if true requests will be sent to Application Insights
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoCollectRequests = function (value) {
			_isRequests = value;
			if (_isStarted) {
				_serverRequests.enable(value);
			}
			return Configuration;
		};
		/**
		 * Sets the state of dependency tracking (enabled by default)
		 * @param value if true dependencies will be sent to Application Insights
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoCollectDependencies = function (value) {
			_isDependencies = value;
			if (_isStarted) {
				_clientRequests.enable(value);
			}
			return Configuration;
		};
		/**
		 * Sets the state of automatic dependency correlation (enabled by default)
		 * @param value if true dependencies will be correlated with requests
		 * @returns {Configuration} this class
		 */
		Configuration.setAutoDependencyCorrelation = function (value) {
			_isCorrelating = value;
			if (_isStarted) {
				_serverRequests.useAutoCorrelation(value);
			}
			return Configuration;
		};
		/**
		 * Enable or disable disk-backed retry caching to cache events when client is offline (enabled by default)
		 * Note that this method only applies to the default client. Disk-backed retry caching is disabled by default for additional clients.
		 * For enable for additional clients, use client.channel.setUseDiskRetryCaching(true).
		 * These cached events are stored in your system or user's temporary directory and access restricted to your user when possible.
		 * @param value if true events that occured while client is offline will be cached on disk
		 * @param resendInterval The wait interval for resending cached events.
		 * @param maxBytesOnDisk The maximum size (in bytes) that the created temporary directory for cache events can grow to, before caching is disabled.
		 * @returns {Configuration} this class
		 */
		Configuration.setUseDiskRetryCaching = function (value, resendInterval, maxBytesOnDisk) {
			_isDiskRetry = value;
			_diskRetryInterval = resendInterval;
			_diskRetryMaxBytes = maxBytesOnDisk;
			if (exports.defaultClient && exports.defaultClient.channel) {
				exports.defaultClient.channel.setUseDiskRetryCaching(value, resendInterval, maxBytesOnDisk);
			}
			return Configuration;
		};
		/**
		 * Enables debug and warning logging for AppInsights itself.
		 * @param enableDebugLogging if true, enables debug logging
		 * @param enableWarningLogging if true, enables warning logging
		 * @returns {Configuration} this class
		 */
		Configuration.setInternalLogging = function (enableDebugLogging, enableWarningLogging) {
			if (enableDebugLogging === void 0) { enableDebugLogging = false; }
			if (enableWarningLogging === void 0) { enableWarningLogging = true; }
			Logging.enableDebug = enableDebugLogging;
			Logging.disableWarnings = !enableWarningLogging;
			return Configuration;
		};
		// Convenience shortcut to ApplicationInsights.start
		Configuration.start = start;
		return Configuration;
	}());
	exports.Configuration = Configuration;
	/**
	 * Disposes the default client and all the auto collectors so they can be reinitialized with different configuration
	*/
	function dispose() {
		exports.defaultClient = null;
		_isStarted = false;
		if (_console) {
			_console.dispose();
		}
		if (_exceptions) {
			_exceptions.dispose();
		}
		if (_performance) {
			_performance.dispose();
		}
		if (_serverRequests) {
			_serverRequests.dispose();
		}
		if (_clientRequests) {
			_clientRequests.dispose();
		}
	}
	exports.dispose = dispose;
	//# sourceMappingURL=applicationinsights.js.map

	/***/ }),
	/* 79 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Logging = __webpack_require__(80);
	var DiagChannel = __webpack_require__(81);
	var CorrelationContextManager = (function () {
		function CorrelationContextManager() {
		}
		/**
		 *  Provides the current Context.
		 *  The context is the most recent one entered into for the current
		 *  logical chain of execution, including across asynchronous calls.
		 */
		CorrelationContextManager.getCurrentContext = function () {
			if (!CorrelationContextManager.enabled) {
				return null;
			}
			return Zone.current.get("context");
		};
		/**
		 *  A helper to generate objects conforming to the CorrelationContext interface
		 */
		CorrelationContextManager.generateContextObject = function (operationId, parentId, operationName, correlationContextHeader) {
			parentId = parentId || operationId;
			if (this.enabled) {
				return {
					operation: {
						name: operationName,
						id: operationId,
						parentId: parentId
					},
					customProperties: new CustomPropertiesImpl(correlationContextHeader)
				};
			}
			return null;
		};
		/**
		 *  Runs a function inside a given Context.
		 *  All logical children of the execution path that entered this Context
		 *  will receive this Context object on calls to GetCurrentContext.
		 */
		CorrelationContextManager.runWithContext = function (context, fn) {
			if (CorrelationContextManager.enabled) {
				var newZone = Zone.current.fork({
					name: "AI-" + ((context && context.operation.parentId) || "Unknown"),
					properties: { context: context }
				});
				newZone.run(fn);
			}
			else {
				fn();
			}
		};
		/**
		 *  Patches a callback to restore the correct Context when getCurrentContext
		 *  is run within it. This is necessary if automatic correlation fails to work
		 *  with user-included libraries.
		 *
		 *  The supplied callback will be given the same context that was present for
		 *  the call to wrapCallback.  */
		CorrelationContextManager.wrapCallback = function (fn) {
			if (CorrelationContextManager.enabled) {
				return Zone.current.wrap(fn, "User-wrapped method");
			}
			return fn;
		};
		/**
		 *  Enables the CorrelationContextManager.
		 */
		CorrelationContextManager.enable = function () {
			if (this.enabled) {
				return;
			}
			if (!this.isNodeVersionCompatible()) {
				this.enabled = false;
				return;
			}
			// Run patches for Zone.js
			if (!CorrelationContextManager.hasEverEnabled) {
				this.hasEverEnabled = true;
				// Load in Zone.js
				try {
					// Require zone if we can't detect its presence - guarded because of issue #346
					// Note that usually multiple requires of zone.js does not error - but we see reports of it happening
					// in the Azure Functions environment.
					// This indicates that the file is being included multiple times in the same global scope,
					// averting require's cache somehow.
					if (typeof Zone === "undefined") {
						__webpack_require__(101);
					}
				}
				catch (e) {
					// Zone was already loaded even though we couldn't find its global variable
					Logging.warn("Failed to require zone.js");
				}
				DiagChannel.registerContextPreservation(function (cb) {
					return Zone.current.wrap(cb, "AI-ContextPreservation");
				});
				this.patchError();
				this.patchTimers(["setTimeout", "setInterval"]);
			}
			this.enabled = true;
		};
		/**
		 *  Disables the CorrelationContextManager.
		 */
		CorrelationContextManager.disable = function () {
			this.enabled = false;
		};
		/**
		 *  Reports if the CorrelationContextManager is able to run in this environment
		 */
		CorrelationContextManager.isNodeVersionCompatible = function () {
			// Unit tests warn of errors < 3.3 from timer patching. All versions before 4 were 0.x
			var nodeVer = process.versions.node.split(".");
			return parseInt(nodeVer[0]) > 3 || (parseInt(nodeVer[0]) > 2 && parseInt(nodeVer[1]) > 2);
		};
		// Zone.js breaks concatenation of timer return values.
		// This fixes that.
		CorrelationContextManager.patchTimers = function (methodNames) {
			methodNames.forEach(function (methodName) {
				var orig = global[methodName];
				global[methodName] = function () {
					var ret = orig.apply(this, arguments);
					ret.toString = function () {
						if (this.data && typeof this.data.handleId !== 'undefined') {
							return this.data.handleId.toString();
						}
						else {
							return Object.prototype.toString.call(this);
						}
					};
					return ret;
				};
			});
		};
		// Zone.js breaks deepEqual on error objects (by making internal properties enumerable).
		// This fixes that by subclassing the error object and making all properties not enumerable
		CorrelationContextManager.patchError = function () {
			var orig = global.Error;
			// New error handler
			function AppInsightsAsyncCorrelatedErrorWrapper() {
				if (!(this instanceof AppInsightsAsyncCorrelatedErrorWrapper)) {
					return AppInsightsAsyncCorrelatedErrorWrapper.apply(Object.create(AppInsightsAsyncCorrelatedErrorWrapper.prototype), arguments);
				}
				// Is this object set to rewrite the stack?
				// If so, we should turn off some Zone stuff that is prone to break
				var stackRewrite = orig.stackRewrite;
				if (orig.prepareStackTrace) {
					orig.stackRewrite = false;
					var stackTrace = orig.prepareStackTrace;
					orig.prepareStackTrace = function (e, s) {
						// Remove some AI and Zone methods from the stack trace
						// Otherwise we leave side-effects
						// Algorithm is to find the first frame on the stack after the first instance(s)
						// of AutoCollection/CorrelationContextManager
						// Eg. this should return the User frame on an array like below:
						//  Zone | Zone | CorrelationContextManager | CorrelationContextManager | User
						var foundOne = false;
						for (var i = 0; i < s.length; i++) {
							var fileName = s[i].getFileName();
							if (fileName) {
								if (fileName.indexOf("AutoCollection/CorrelationContextManager") === -1 &&
									fileName.indexOf("AutoCollection\\CorrelationContextManager") === -1) {
									if (foundOne) {
										break;
									}
								}
								else {
									foundOne = true;
								}
							}
						}
						// Loop above goes one extra step
						i = Math.max(0, i - 1);
						if (foundOne) {
							s.splice(0, i);
						}
						return stackTrace(e, s);
					};
				}
				// Apply the error constructor
				orig.apply(this, arguments);
				// Restore Zone stack rewriting settings
				orig.stackRewrite = stackRewrite;
				// Remove unexpected bits from stack trace
				if (this.stack && typeof this.stack === "string") {
					var stackFrames = this.stack.split("\n");
					// Remove this class
					if (stackFrames.length > 3) {
						if (stackFrames[2].trim().indexOf("at Error.AppInsightsAsyncCorrelatedErrorWrapper") === 0) {
							stackFrames.splice(2, 1);
						}
						else if (stackFrames[1].trim().indexOf("at AppInsightsAsyncCorrelatedErrorWrapper.ZoneAwareError") === 0
							&& stackFrames[2].trim().indexOf("at new AppInsightsAsyncCorrelatedErrorWrapper") === 0) {
							stackFrames.splice(1, 2);
						}
					}
					// Remove AI correlation ids
					this.stack = stackFrames.map(function (v) {
						var startIndex = v.indexOf(") [");
						if (startIndex > -1) {
							v = v.substr(0, startIndex + 1);
						}
						return v;
					}).join("\n");
				}
				// getOwnPropertyNames should be a superset of Object.keys...
				// This appears to not always be the case
				var props = Object.getOwnPropertyNames(this).concat(Object.keys(this));
				// Zone.js will automatically create some hidden properties at read time.
				// We need to proactively make those not enumerable as well as the currently visible properties
				for (var i = 0; i < props.length; i++) {
					var propertyName = props[i];
					var hiddenPropertyName = Zone['__symbol__'](propertyName);
					Object.defineProperty(this, propertyName, { enumerable: false });
					Object.defineProperty(this, hiddenPropertyName, { enumerable: false, writable: true });
				}
				return this;
			}
			// Inherit from the Zone.js error handler
			AppInsightsAsyncCorrelatedErrorWrapper.prototype = orig.prototype;
			// We need this loop to copy outer methods like Error.captureStackTrace
			var props = Object.getOwnPropertyNames(orig);
			for (var i = 0; i < props.length; i++) {
				var propertyName = props[i];
				if (!AppInsightsAsyncCorrelatedErrorWrapper[propertyName]) {
					Object.defineProperty(AppInsightsAsyncCorrelatedErrorWrapper, propertyName, Object.getOwnPropertyDescriptor(orig, propertyName));
				}
			}
			// explicit cast to <any> required to avoid type error for captureStackTrace
			// with latest node.d.ts (despite workaround above)
			global.Error = AppInsightsAsyncCorrelatedErrorWrapper;
		};
		CorrelationContextManager.enabled = false;
		CorrelationContextManager.hasEverEnabled = false;
		return CorrelationContextManager;
	}());
	exports.CorrelationContextManager = CorrelationContextManager;
	var CustomPropertiesImpl = (function () {
		function CustomPropertiesImpl(header) {
			this.props = [];
			this.addHeaderData(header);
		}
		CustomPropertiesImpl.prototype.addHeaderData = function (header) {
			var keyvals = header ? header.split(", ") : [];
			this.props = keyvals.map(function (keyval) {
				var parts = keyval.split("=");
				return { key: parts[0], value: parts[1] };
			}).concat(this.props);
		};
		CustomPropertiesImpl.prototype.serializeToHeader = function () {
			return this.props.map(function (keyval) {
				return keyval.key + "=" + keyval.value;
			}).join(", ");
		};
		CustomPropertiesImpl.prototype.getProperty = function (prop) {
			for (var i = 0; i < this.props.length; ++i) {
				var keyval = this.props[i];
				if (keyval.key === prop) {
					return keyval.value;
				}
			}
			return;
		};
		// TODO: Strictly according to the spec, properties which are recieved from
		// an incoming request should be left untouched, while we may add our own new
		// properties. The logic here will need to change to track that.
		CustomPropertiesImpl.prototype.setProperty = function (prop, val) {
			if (CustomPropertiesImpl.bannedCharacters.test(prop) || CustomPropertiesImpl.bannedCharacters.test(val)) {
				Logging.warn("Correlation context property keys and values must not contain ',' or '='. setProperty was called with key: " + prop + " and value: " + val);
				return;
			}
			for (var i = 0; i < this.props.length; ++i) {
				var keyval = this.props[i];
				if (keyval.key === prop) {
					keyval.value = val;
					return;
				}
			}
			this.props.push({ key: prop, value: val });
		};
		CustomPropertiesImpl.bannedCharacters = /[,=]/;
		return CustomPropertiesImpl;
	}());
	//# sourceMappingURL=CorrelationContextManager.js.map

	/***/ }),
	/* 80 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Logging = (function () {
		function Logging() {
		}
		Logging.info = function (message) {
			var optionalParams = [];
			for (var _i = 1; _i < arguments.length; _i++) {
				optionalParams[_i - 1] = arguments[_i];
			}
			if (Logging.enableDebug) {
				console.info(Logging.TAG + message, optionalParams);
			}
		};
		Logging.warn = function (message) {
			var optionalParams = [];
			for (var _i = 1; _i < arguments.length; _i++) {
				optionalParams[_i - 1] = arguments[_i];
			}
			if (!Logging.disableWarnings) {
				console.warn(Logging.TAG + message, optionalParams);
			}
		};
		Logging.enableDebug = false;
		Logging.disableWarnings = false;
		Logging.TAG = "ApplicationInsights:";
		return Logging;
	}());
	module.exports = Logging;
	//# sourceMappingURL=Logging.js.map

	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IsInitialized = !process.env["APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL"];
	if (exports.IsInitialized) {
		var publishers = __webpack_require__(82);
		var individualOptOuts = process.env["APPLICATION_INSIGHTS_NO_PATCH_MODULES"] || "";
		var unpatchedModules = individualOptOuts.split(",");
		var modules = {
			bunyan: publishers.bunyan,
			console: publishers.console,
			mongodb: publishers.mongodb,
			mongodbCore: publishers.mongodbCore,
			mysql: publishers.mysql,
			redis: publishers.redis,
			pg: publishers.pg,
			pgPool: publishers.pgPool,
			winston: publishers.winston
		};
		for (var mod in modules) {
			if (unpatchedModules.indexOf(mod) === -1) {
				modules[mod].enable();
			}
		}
	}
	function registerContextPreservation(cb) {
		if (!exports.IsInitialized) {
			return;
		}
		__webpack_require__(84).channel.addContextPreservation(cb);
	}
	exports.registerContextPreservation = registerContextPreservation;
	//# sourceMappingURL=initialization.js.map

	/***/ }),
	/* 82 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var bunyan = __webpack_require__(83);
	exports.bunyan = bunyan;
	var consolePub = __webpack_require__(89);
	exports.console = consolePub;
	var mongodbCore = __webpack_require__(92);
	exports.mongodbCore = mongodbCore;
	var mongodb = __webpack_require__(93);
	exports.mongodb = mongodb;
	var mysql = __webpack_require__(94);
	exports.mysql = mysql;
	var pgPool = __webpack_require__(97);
	exports.pgPool = pgPool;
	var pg = __webpack_require__(98);
	exports.pg = pg;
	var redis = __webpack_require__(99);
	exports.redis = redis;
	var winston = __webpack_require__(100);
	exports.winston = winston;
	function enable() {
		bunyan.enable();
		consolePub.enable();
		mongodbCore.enable();
		mongodb.enable();
		mysql.enable();
		pg.enable();
		pgPool.enable();
		redis.enable();
		winston.enable();
	}
	exports.enable = enable;
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 83 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var bunyanPatchFunction = function (originalBunyan) {
		var originalEmit = originalBunyan.prototype._emit;
		originalBunyan.prototype._emit = function (rec, noemit) {
			var ret = originalEmit.apply(this, arguments);
			if (!noemit) {
				var str = ret;
				if (!str) {
					str = originalEmit.call(this, rec, true);
				}
				diagnostic_channel_1.channel.publish("bunyan", { level: rec.level, result: str });
			}
			return ret;
		};
		return originalBunyan;
	};
	exports.bunyan = {
		versionSpecifier: ">= 1.0.0 < 2.0.0",
		patch: bunyanPatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("bunyan", exports.bunyan);
	}
	exports.enable = enable;
	//# sourceMappingURL=bunyan.pub.js.map

	/***/ }),
	/* 84 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var patchRequire_1 = __webpack_require__(85);
	var patchRequire_2 = __webpack_require__(85);
	exports.makePatchingRequire = patchRequire_2.makePatchingRequire;
	var trueFilter = function (publishing) { return true; };
	var ContextPreservingEventEmitter = (function () {
		function ContextPreservingEventEmitter() {
			this.version = __webpack_require__(88).version; // Allow for future versions to replace things?
			this.subscribers = {};
			this.contextPreservationFunction = function (cb) { return cb; };
			this.knownPatches = {};
			this.currentlyPublishing = false;
		}
		ContextPreservingEventEmitter.prototype.shouldPublish = function (name) {
			var listeners = this.subscribers[name];
			if (listeners) {
				return listeners.some(function (_a) {
					var filter = _a.filter;
					return !filter || filter(false);
				});
			}
			return false;
		};
		ContextPreservingEventEmitter.prototype.publish = function (name, event) {
			if (this.currentlyPublishing) {
				return; // Avoid reentrancy
			}
			var listeners = this.subscribers[name];
			// Note: Listeners called synchronously to preserve context
			if (listeners) {
				var standardEvent_1 = {
					timestamp: Date.now(),
					data: event,
				};
				this.currentlyPublishing = true;
				listeners.forEach(function (_a) {
					var listener = _a.listener, filter = _a.filter;
					try {
						if (filter && filter(true)) {
							listener(standardEvent_1);
						}
					}
					catch (e) {
						// Subscriber threw an error
					}
				});
				this.currentlyPublishing = false;
			}
		};
		ContextPreservingEventEmitter.prototype.subscribe = function (name, listener, filter) {
			if (filter === void 0) { filter = trueFilter; }
			if (!this.subscribers[name]) {
				this.subscribers[name] = [];
			}
			this.subscribers[name].push({ listener: listener, filter: filter });
		};
		ContextPreservingEventEmitter.prototype.unsubscribe = function (name, listener, filter) {
			if (filter === void 0) { filter = trueFilter; }
			var listeners = this.subscribers[name];
			if (listeners) {
				for (var index = 0; index < listeners.length; ++index) {
					if (listeners[index].listener === listener && listeners[index].filter === filter) {
						listeners.splice(index, 1);
						return true;
					}
				}
			}
			return false;
		};
		// Used for tests
		ContextPreservingEventEmitter.prototype.reset = function () {
			var _this = this;
			this.subscribers = {};
			this.contextPreservationFunction = function (cb) { return cb; };
			// Modify the knownPatches object rather than replace, since a reference will be used in the require patcher
			Object.getOwnPropertyNames(this.knownPatches).forEach(function (prop) { return delete _this.knownPatches[prop]; });
		};
		ContextPreservingEventEmitter.prototype.bindToContext = function (cb) {
			return this.contextPreservationFunction(cb);
		};
		ContextPreservingEventEmitter.prototype.addContextPreservation = function (preserver) {
			var previousPreservationStack = this.contextPreservationFunction;
			this.contextPreservationFunction = (function (cb) { return preserver(previousPreservationStack(cb)); });
		};
		ContextPreservingEventEmitter.prototype.registerMonkeyPatch = function (packageName, patcher) {
			if (!this.knownPatches[packageName]) {
				this.knownPatches[packageName] = [];
			}
			this.knownPatches[packageName].push(patcher);
		};
		ContextPreservingEventEmitter.prototype.getPatchesObject = function () {
			return this.knownPatches;
		};
		return ContextPreservingEventEmitter;
	}());
	if (!global.diagnosticsSource) {
		global.diagnosticsSource = new ContextPreservingEventEmitter();
		// TODO: should this only patch require after at least one monkey patch is registered?
		/* tslint:disable-next-line:no-var-requires */
		var moduleModule = __webpack_require__(87);
		// Note: We pass in the object now before any patches are registered, but the object is passed by reference
		// so any updates made to the object will be visible in the patcher.
		moduleModule.prototype.require = patchRequire_1.makePatchingRequire(global.diagnosticsSource.getPatchesObject());
	}
	exports.channel = global.diagnosticsSource;
	//# sourceMappingURL=channel.js.map

	/***/ }),
	/* 85 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var path = __webpack_require__(1);
	var semver = __webpack_require__(86);
	/* tslint:disable-next-line:no-var-requires */
	var moduleModule = __webpack_require__(87);
	var nativeModules = Object.keys(process.binding("natives"));
	var originalRequire = moduleModule.prototype.require;
	function makePatchingRequire(knownPatches) {
		var patchedModules = {};
		return function patchedRequire(moduleId) {
			var originalModule = originalRequire.apply(this, arguments);
			if (knownPatches[moduleId]) {
				// Fetch the specific path of the module
				var modulePath = moduleModule._resolveFilename(moduleId, this);
				if (patchedModules.hasOwnProperty(modulePath)) {
					// This module has already been patched, no need to reapply
					return patchedModules[modulePath];
				}
				var moduleVersion = void 0;
				if (nativeModules.indexOf(moduleId) < 0) {
					try {
						moduleVersion = originalRequire.call(this, path.join(moduleId, "package.json")).version;
					}
					catch (e) {
						// This should only happen if moduleId is actually a path rather than a module
						// This is not a supported scenario
						return originalModule;
					}
				}
				else {
					// This module is implemented natively so we cannot find a package.json
					// Instead, take the version of node itself
					moduleVersion = process.version.substring(1);
				}
				var prereleaseTagIndex = moduleVersion.indexOf("-");
				if (prereleaseTagIndex >= 0) {
					// We ignore prerelease tags to avoid impossible to fix gaps in support
					// e.g. supporting console in >= 4.0.0 would otherwise not include
					// 8.0.0-pre
					moduleVersion = moduleVersion.substring(0, prereleaseTagIndex);
				}
				var modifiedModule = originalModule;
				for (var _i = 0, _a = knownPatches[moduleId]; _i < _a.length; _i++) {
					var modulePatcher = _a[_i];
					if (semver.satisfies(moduleVersion, modulePatcher.versionSpecifier)) {
						modifiedModule = modulePatcher.patch(modifiedModule, modulePath);
					}
				}
				return patchedModules[modulePath] = modifiedModule;
			}
			return originalModule;
		};
	}
	exports.makePatchingRequire = makePatchingRequire;
	//# sourceMappingURL=patchRequire.js.map

	/***/ }),
	/* 86 */
	/***/ (function(module, exports) {

	exports = module.exports = SemVer;

	// The debug function is excluded entirely from the minified version.
	/* nomin */ var debug;
	/* nomin */ if (typeof process === 'object' &&
		/* nomin */ process.env &&
		/* nomin */ process.env.NODE_DEBUG &&
		/* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
	  /* nomin */ debug = function() {
		/* nomin */ var args = Array.prototype.slice.call(arguments, 0);
		/* nomin */ args.unshift('SEMVER');
		/* nomin */ console.log.apply(console, args);
		/* nomin */ };
	/* nomin */ else
	  /* nomin */ debug = function() {};

	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';

	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

	// Max safe segment length for coercion.
	var MAX_SAFE_COMPONENT_LENGTH = 16;

	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;

	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.

	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.

	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.

	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


	// ## Main Version
	// Three dot-separated numeric identifiers.

	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
					   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
					   '(' + src[NUMERICIDENTIFIER] + ')';

	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
							'(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
							'(' + src[NUMERICIDENTIFIERLOOSE] + ')';

	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.

	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
								'|' + src[NONNUMERICIDENTIFIER] + ')';

	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
									 '|' + src[NONNUMERICIDENTIFIER] + ')';


	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.

	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
					  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
						   '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.

	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.

	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
				 '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.

	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.

	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] +
					src[PRERELEASE] + '?' +
					src[BUILD] + '?';

	src[FULL] = '^' + FULLPLAIN + '$';

	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
					 src[PRERELEASELOOSE] + '?' +
					 src[BUILD] + '?';

	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';

	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';

	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
					   '(?:' + src[PRERELEASE] + ')?' +
					   src[BUILD] + '?' +
					   ')?)?';

	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
							'(?:' + src[PRERELEASELOOSE] + ')?' +
							src[BUILD] + '?' +
							')?)?';

	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

	// Coercion.
	// Extract anything that could conceivably be a part of a valid semver
	var COERCE = R++;
	src[COERCE] = '(?:^|[^\\d])' +
				  '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
				  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
				  '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
				  '(?:$|[^\\d])';

	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';

	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';

	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';

	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';

	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
						  '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';


	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
					   '\\s+-\\s+' +
					   '(' + src[XRANGEPLAIN] + ')' +
					   '\\s*$';

	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
							'\\s+-\\s+' +
							'(' + src[XRANGEPLAINLOOSE] + ')' +
							'\\s*$';

	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';

	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i])
		re[i] = new RegExp(src[i]);
	}

	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer)
		return version;

	  if (typeof version !== 'string')
		return null;

	  if (version.length > MAX_LENGTH)
		return null;

	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version))
		return null;

	  try {
		return new SemVer(version, loose);
	  } catch (er) {
		return null;
	  }
	}

	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}


	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}

	exports.SemVer = SemVer;

	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
		if (version.loose === loose)
		  return version;
		else
		  version = version.version;
	  } else if (typeof version !== 'string') {
		throw new TypeError('Invalid Version: ' + version);
	  }

	  if (version.length > MAX_LENGTH)
		throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

	  if (!(this instanceof SemVer))
		return new SemVer(version, loose);

	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

	  if (!m)
		throw new TypeError('Invalid Version: ' + version);

	  this.raw = version;

	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];

	  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
		throw new TypeError('Invalid major version')

	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
		throw new TypeError('Invalid minor version')

	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
		throw new TypeError('Invalid patch version')

	  // numberify any prerelease numeric ids
	  if (!m[4])
		this.prerelease = [];
	  else
		this.prerelease = m[4].split('.').map(function(id) {
		  if (/^[0-9]+$/.test(id)) {
			var num = +id;
			if (num >= 0 && num < MAX_SAFE_INTEGER)
			  return num;
		  }
		  return id;
		});

	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}

	SemVer.prototype.format = function() {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length)
		this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};

	SemVer.prototype.toString = function() {
	  return this.version;
	};

	SemVer.prototype.compare = function(other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  return this.compareMain(other) || this.comparePre(other);
	};

	SemVer.prototype.compareMain = function(other) {
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  return compareIdentifiers(this.major, other.major) ||
			 compareIdentifiers(this.minor, other.minor) ||
			 compareIdentifiers(this.patch, other.patch);
	};

	SemVer.prototype.comparePre = function(other) {
	  if (!(other instanceof SemVer))
		other = new SemVer(other, this.loose);

	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length)
		return -1;
	  else if (!this.prerelease.length && other.prerelease.length)
		return 1;
	  else if (!this.prerelease.length && !other.prerelease.length)
		return 0;

	  var i = 0;
	  do {
		var a = this.prerelease[i];
		var b = other.prerelease[i];
		debug('prerelease compare', i, a, b);
		if (a === undefined && b === undefined)
		  return 0;
		else if (b === undefined)
		  return 1;
		else if (a === undefined)
		  return -1;
		else if (a === b)
		  continue;
		else
		  return compareIdentifiers(a, b);
	  } while (++i);
	};

	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function(release, identifier) {
	  switch (release) {
		case 'premajor':
		  this.prerelease.length = 0;
		  this.patch = 0;
		  this.minor = 0;
		  this.major++;
		  this.inc('pre', identifier);
		  break;
		case 'preminor':
		  this.prerelease.length = 0;
		  this.patch = 0;
		  this.minor++;
		  this.inc('pre', identifier);
		  break;
		case 'prepatch':
		  // If this is already a prerelease, it will bump to the next version
		  // drop any prereleases that might already exist, since they are not
		  // relevant at this point.
		  this.prerelease.length = 0;
		  this.inc('patch', identifier);
		  this.inc('pre', identifier);
		  break;
		// If the input is a non-prerelease version, this acts the same as
		// prepatch.
		case 'prerelease':
		  if (this.prerelease.length === 0)
			this.inc('patch', identifier);
		  this.inc('pre', identifier);
		  break;

		case 'major':
		  // If this is a pre-major version, bump up to the same major version.
		  // Otherwise increment major.
		  // 1.0.0-5 bumps to 1.0.0
		  // 1.1.0 bumps to 2.0.0
		  if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
			this.major++;
		  this.minor = 0;
		  this.patch = 0;
		  this.prerelease = [];
		  break;
		case 'minor':
		  // If this is a pre-minor version, bump up to the same minor version.
		  // Otherwise increment minor.
		  // 1.2.0-5 bumps to 1.2.0
		  // 1.2.1 bumps to 1.3.0
		  if (this.patch !== 0 || this.prerelease.length === 0)
			this.minor++;
		  this.patch = 0;
		  this.prerelease = [];
		  break;
		case 'patch':
		  // If this is not a pre-release version, it will increment the patch.
		  // If it is a pre-release it will bump up to the same patch version.
		  // 1.2.0-5 patches to 1.2.0
		  // 1.2.0 patches to 1.2.1
		  if (this.prerelease.length === 0)
			this.patch++;
		  this.prerelease = [];
		  break;
		// This probably shouldn't be used publicly.
		// 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
		case 'pre':
		  if (this.prerelease.length === 0)
			this.prerelease = [0];
		  else {
			var i = this.prerelease.length;
			while (--i >= 0) {
			  if (typeof this.prerelease[i] === 'number') {
				this.prerelease[i]++;
				i = -2;
			  }
			}
			if (i === -1) // didn't increment anything
			  this.prerelease.push(0);
		  }
		  if (identifier) {
			// 1.2.0-beta.1 bumps to 1.2.0-beta.2,
			// 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
			if (this.prerelease[0] === identifier) {
			  if (isNaN(this.prerelease[1]))
				this.prerelease = [identifier, 0];
			} else
			  this.prerelease = [identifier, 0];
		  }
		  break;

		default:
		  throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};

	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof(loose) === 'string') {
		identifier = loose;
		loose = undefined;
	  }

	  try {
		return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
		return null;
	  }
	}

	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
		return null;
	  } else {
		var v1 = parse(version1);
		var v2 = parse(version2);
		if (v1.prerelease.length || v2.prerelease.length) {
		  for (var key in v1) {
			if (key === 'major' || key === 'minor' || key === 'patch') {
			  if (v1[key] !== v2[key]) {
				return 'pre'+key;
			  }
			}
		  }
		  return 'prerelease';
		}
		for (var key in v1) {
		  if (key === 'major' || key === 'minor' || key === 'patch') {
			if (v1[key] !== v2[key]) {
			  return key;
			}
		  }
		}
	  }
	}

	exports.compareIdentifiers = compareIdentifiers;

	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);

	  if (anum && bnum) {
		a = +a;
		b = +b;
	  }

	  return (anum && !bnum) ? -1 :
			 (bnum && !anum) ? 1 :
			 a < b ? -1 :
			 a > b ? 1 :
			 0;
	}

	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}

	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}

	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}

	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}

	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(new SemVer(b, loose));
	}

	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}

	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}

	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function(a, b) {
		return exports.compare(a, b, loose);
	  });
	}

	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function(a, b) {
		return exports.rcompare(a, b, loose);
	  });
	}

	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}

	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}

	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}

	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}

	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}

	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}

	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
		case '===':
		  if (typeof a === 'object') a = a.version;
		  if (typeof b === 'object') b = b.version;
		  ret = a === b;
		  break;
		case '!==':
		  if (typeof a === 'object') a = a.version;
		  if (typeof b === 'object') b = b.version;
		  ret = a !== b;
		  break;
		case '': case '=': case '==': ret = eq(a, b, loose); break;
		case '!=': ret = neq(a, b, loose); break;
		case '>': ret = gt(a, b, loose); break;
		case '>=': ret = gte(a, b, loose); break;
		case '<': ret = lt(a, b, loose); break;
		case '<=': ret = lte(a, b, loose); break;
		default: throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}

	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
		if (comp.loose === loose)
		  return comp;
		else
		  comp = comp.value;
	  }

	  if (!(this instanceof Comparator))
		return new Comparator(comp, loose);

	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);

	  if (this.semver === ANY)
		this.value = '';
	  else
		this.value = this.operator + this.semver.version;

	  debug('comp', this);
	}

	var ANY = {};
	Comparator.prototype.parse = function(comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);

	  if (!m)
		throw new TypeError('Invalid comparator: ' + comp);

	  this.operator = m[1];
	  if (this.operator === '=')
		this.operator = '';

	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2])
		this.semver = ANY;
	  else
		this.semver = new SemVer(m[2], this.loose);
	};

	Comparator.prototype.toString = function() {
	  return this.value;
	};

	Comparator.prototype.test = function(version) {
	  debug('Comparator.test', version, this.loose);

	  if (this.semver === ANY)
		return true;

	  if (typeof version === 'string')
		version = new SemVer(version, this.loose);

	  return cmp(version, this.operator, this.semver, this.loose);
	};

	Comparator.prototype.intersects = function(comp, loose) {
	  if (!(comp instanceof Comparator)) {
		throw new TypeError('a Comparator is required');
	  }

	  var rangeTmp;

	  if (this.operator === '') {
		rangeTmp = new Range(comp.value, loose);
		return satisfies(this.value, rangeTmp, loose);
	  } else if (comp.operator === '') {
		rangeTmp = new Range(this.value, loose);
		return satisfies(comp.semver, rangeTmp, loose);
	  }

	  var sameDirectionIncreasing =
		(this.operator === '>=' || this.operator === '>') &&
		(comp.operator === '>=' || comp.operator === '>');
	  var sameDirectionDecreasing =
		(this.operator === '<=' || this.operator === '<') &&
		(comp.operator === '<=' || comp.operator === '<');
	  var sameSemVer = this.semver.version === comp.semver.version;
	  var differentDirectionsInclusive =
		(this.operator === '>=' || this.operator === '<=') &&
		(comp.operator === '>=' || comp.operator === '<=');
	  var oppositeDirectionsLessThan =
		cmp(this.semver, '<', comp.semver, loose) &&
		((this.operator === '>=' || this.operator === '>') &&
		(comp.operator === '<=' || comp.operator === '<'));
	  var oppositeDirectionsGreaterThan =
		cmp(this.semver, '>', comp.semver, loose) &&
		((this.operator === '<=' || this.operator === '<') &&
		(comp.operator === '>=' || comp.operator === '>'));

	  return sameDirectionIncreasing || sameDirectionDecreasing ||
		(sameSemVer && differentDirectionsInclusive) ||
		oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
	};


	exports.Range = Range;
	function Range(range, loose) {
	  if (range instanceof Range) {
		if (range.loose === loose) {
		  return range;
		} else {
		  return new Range(range.raw, loose);
		}
	  }

	  if (range instanceof Comparator) {
		return new Range(range.value, loose);
	  }

	  if (!(this instanceof Range))
		return new Range(range, loose);

	  this.loose = loose;

	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
		return this.parseRange(range.trim());
	  }, this).filter(function(c) {
		// throw out any that are not relevant for whatever reason
		return c.length;
	  });

	  if (!this.set.length) {
		throw new TypeError('Invalid SemVer Range: ' + range);
	  }

	  this.format();
	}

	Range.prototype.format = function() {
	  this.range = this.set.map(function(comps) {
		return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};

	Range.prototype.toString = function() {
	  return this.range;
	};

	Range.prototype.parseRange = function(range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);

	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);

	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);

	  // normalize spaces
	  range = range.split(/\s+/).join(' ');

	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.

	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function(comp) {
		return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
		// in loose mode, throw out any that are not valid comparators
		set = set.filter(function(comp) {
		  return !!comp.match(compRe);
		});
	  }
	  set = set.map(function(comp) {
		return new Comparator(comp, loose);
	  });

	  return set;
	};

	Range.prototype.intersects = function(range, loose) {
	  if (!(range instanceof Range)) {
		throw new TypeError('a Range is required');
	  }

	  return this.set.some(function(thisComparators) {
		return thisComparators.every(function(thisComparator) {
		  return range.set.some(function(rangeComparators) {
			return rangeComparators.every(function(rangeComparator) {
			  return thisComparator.intersects(rangeComparator, loose);
			});
		  });
		});
	  });
	};

	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function(comp) {
		return comp.map(function(c) {
		  return c.value;
		}).join(' ').trim().split(' ');
	  });
	}

	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}

	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}

	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
		return replaceTilde(comp, loose);
	  }).join(' ');
	}

	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function(_, M, m, p, pr) {
		debug('tilde', comp, _, M, m, p, pr);
		var ret;

		if (isX(M))
		  ret = '';
		else if (isX(m))
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		else if (isX(p))
		  // ~1.2 == >=1.2.0 <1.3.0
		  ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		else if (pr) {
		  debug('replaceTilde pr', pr);
		  if (pr.charAt(0) !== '-')
			pr = '-' + pr;
		  ret = '>=' + M + '.' + m + '.' + p + pr +
				' <' + M + '.' + (+m + 1) + '.0';
		} else
		  // ~1.2.3 == >=1.2.3 <1.3.0
		  ret = '>=' + M + '.' + m + '.' + p +
				' <' + M + '.' + (+m + 1) + '.0';

		debug('tilde return', ret);
		return ret;
	  });
	}

	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
		return replaceCaret(comp, loose);
	  }).join(' ');
	}

	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function(_, M, m, p, pr) {
		debug('caret', comp, _, M, m, p, pr);
		var ret;

		if (isX(M))
		  ret = '';
		else if (isX(m))
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		else if (isX(p)) {
		  if (M === '0')
			ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		  else
			ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
		} else if (pr) {
		  debug('replaceCaret pr', pr);
		  if (pr.charAt(0) !== '-')
			pr = '-' + pr;
		  if (M === '0') {
			if (m === '0')
			  ret = '>=' + M + '.' + m + '.' + p + pr +
					' <' + M + '.' + m + '.' + (+p + 1);
			else
			  ret = '>=' + M + '.' + m + '.' + p + pr +
					' <' + M + '.' + (+m + 1) + '.0';
		  } else
			ret = '>=' + M + '.' + m + '.' + p + pr +
				  ' <' + (+M + 1) + '.0.0';
		} else {
		  debug('no pr');
		  if (M === '0') {
			if (m === '0')
			  ret = '>=' + M + '.' + m + '.' + p +
					' <' + M + '.' + m + '.' + (+p + 1);
			else
			  ret = '>=' + M + '.' + m + '.' + p +
					' <' + M + '.' + (+m + 1) + '.0';
		  } else
			ret = '>=' + M + '.' + m + '.' + p +
				  ' <' + (+M + 1) + '.0.0';
		}

		debug('caret return', ret);
		return ret;
	  });
	}

	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function(comp) {
		return replaceXRange(comp, loose);
	  }).join(' ');
	}

	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
		debug('xRange', comp, ret, gtlt, M, m, p, pr);
		var xM = isX(M);
		var xm = xM || isX(m);
		var xp = xm || isX(p);
		var anyX = xp;

		if (gtlt === '=' && anyX)
		  gtlt = '';

		if (xM) {
		  if (gtlt === '>' || gtlt === '<') {
			// nothing is allowed
			ret = '<0.0.0';
		  } else {
			// nothing is forbidden
			ret = '*';
		  }
		} else if (gtlt && anyX) {
		  // replace X with 0
		  if (xm)
			m = 0;
		  if (xp)
			p = 0;

		  if (gtlt === '>') {
			// >1 => >=2.0.0
			// >1.2 => >=1.3.0
			// >1.2.3 => >= 1.2.4
			gtlt = '>=';
			if (xm) {
			  M = +M + 1;
			  m = 0;
			  p = 0;
			} else if (xp) {
			  m = +m + 1;
			  p = 0;
			}
		  } else if (gtlt === '<=') {
			// <=0.7.x is actually <0.8.0, since any 0.7.x should
			// pass.  Similarly, <=7.x is actually <8.0.0, etc.
			gtlt = '<';
			if (xm)
			  M = +M + 1;
			else
			  m = +m + 1;
		  }

		  ret = gtlt + M + '.' + m + '.' + p;
		} else if (xm) {
		  ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		} else if (xp) {
		  ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		}

		debug('xRange return', ret);

		return ret;
	  });
	}

	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}

	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0,
						   from, fM, fm, fp, fpr, fb,
						   to, tM, tm, tp, tpr, tb) {

	  if (isX(fM))
		from = '';
	  else if (isX(fm))
		from = '>=' + fM + '.0.0';
	  else if (isX(fp))
		from = '>=' + fM + '.' + fm + '.0';
	  else
		from = '>=' + from;

	  if (isX(tM))
		to = '';
	  else if (isX(tm))
		to = '<' + (+tM + 1) + '.0.0';
	  else if (isX(tp))
		to = '<' + tM + '.' + (+tm + 1) + '.0';
	  else if (tpr)
		to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
	  else
		to = '<=' + to;

	  return (from + ' ' + to).trim();
	}


	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function(version) {
	  if (!version)
		return false;

	  if (typeof version === 'string')
		version = new SemVer(version, this.loose);

	  for (var i = 0; i < this.set.length; i++) {
		if (testSet(this.set[i], version))
		  return true;
	  }
	  return false;
	};

	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
		if (!set[i].test(version))
		  return false;
	  }

	  if (version.prerelease.length) {
		// Find the set of versions that are allowed to have prereleases
		// For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
		// That should allow `1.2.3-pr.2` to pass.
		// However, `1.2.4-alpha.notready` should NOT be allowed,
		// even though it's within the range set by the comparators.
		for (var i = 0; i < set.length; i++) {
		  debug(set[i].semver);
		  if (set[i].semver === ANY)
			continue;

		  if (set[i].semver.prerelease.length > 0) {
			var allowed = set[i].semver;
			if (allowed.major === version.major &&
				allowed.minor === version.minor &&
				allowed.patch === version.patch)
			  return true;
		  }
		}

		// Version has a -pre, but it's not one of the ones we like.
		return false;
	  }

	  return true;
	}

	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
		range = new Range(range, loose);
	  } catch (er) {
		return false;
	  }
	  return range.test(version);
	}

	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  var max = null;
	  var maxSV = null;
	  try {
		var rangeObj = new Range(range, loose);
	  } catch (er) {
		return null;
	  }
	  versions.forEach(function (v) {
		if (rangeObj.test(v)) { // satisfies(v, range, loose)
		  if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
			max = v;
			maxSV = new SemVer(max, loose);
		  }
		}
	  })
	  return max;
	}

	exports.minSatisfying = minSatisfying;
	function minSatisfying(versions, range, loose) {
	  var min = null;
	  var minSV = null;
	  try {
		var rangeObj = new Range(range, loose);
	  } catch (er) {
		return null;
	  }
	  versions.forEach(function (v) {
		if (rangeObj.test(v)) { // satisfies(v, range, loose)
		  if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
			min = v;
			minSV = new SemVer(min, loose);
		  }
		}
	  })
	  return min;
	}

	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
		// Return '*' instead of '' so that truthiness works.
		// This will throw if it's invalid anyway
		return new Range(range, loose).range || '*';
	  } catch (er) {
		return null;
	  }
	}

	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}

	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}

	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);

	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
		case '>':
		  gtfn = gt;
		  ltefn = lte;
		  ltfn = lt;
		  comp = '>';
		  ecomp = '>=';
		  break;
		case '<':
		  gtfn = lt;
		  ltefn = gte;
		  ltfn = gt;
		  comp = '<';
		  ecomp = '<=';
		  break;
		default:
		  throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }

	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
		return false;
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (var i = 0; i < range.set.length; ++i) {
		var comparators = range.set[i];

		var high = null;
		var low = null;

		comparators.forEach(function(comparator) {
		  if (comparator.semver === ANY) {
			comparator = new Comparator('>=0.0.0')
		  }
		  high = high || comparator;
		  low = low || comparator;
		  if (gtfn(comparator.semver, high.semver, loose)) {
			high = comparator;
		  } else if (ltfn(comparator.semver, low.semver, loose)) {
			low = comparator;
		  }
		});

		// If the edge version comparator has a operator then our version
		// isn't outside it
		if (high.operator === comp || high.operator === ecomp) {
		  return false;
		}

		// If the lowest version comparator has an operator and our version
		// is less than it then it isn't higher than the range
		if ((!low.operator || low.operator === comp) &&
			ltefn(version, low.semver)) {
		  return false;
		} else if (low.operator === ecomp && ltfn(version, low.semver)) {
		  return false;
		}
	  }
	  return true;
	}

	exports.prerelease = prerelease;
	function prerelease(version, loose) {
	  var parsed = parse(version, loose);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
	}

	exports.intersects = intersects;
	function intersects(r1, r2, loose) {
	  r1 = new Range(r1, loose)
	  r2 = new Range(r2, loose)
	  return r1.intersects(r2)
	}

	exports.coerce = coerce;
	function coerce(version) {
	  if (version instanceof SemVer)
		return version;

	  if (typeof version !== 'string')
		return null;

	  var match = version.match(re[COERCE]);

	  if (match == null)
		return null;

	  return parse((match[1] || '0') + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
	}


	/***/ }),
	/* 87 */
	/***/ (function(module, exports) {

	module.exports = require("module");

	/***/ }),
	/* 88 */
	/***/ (function(module) {

	module.exports = {"name":"diagnostic-channel","version":"0.2.0","main":"./dist/src/channel.js","types":"./dist/src/channel.d.ts","scripts":{"build":"tsc","lint":"tslint -c tslint.json -p tsconfig.json","clean":"rimraf ./dist","test":"mocha ./dist/tests/**/*.js"},"homepage":"https://github.com/Microsoft/node-diagnostic-channel","bugs":{"url":"https://github.com/Microsoft/node-diagnostic-channel/issues"},"repository":{"type":"git","url":"https://github.com/Microsoft/node-diagnostic-channel.git"},"description":"Provides a context-saving pub/sub channel to connect diagnostic event publishers and subscribers","dependencies":{"semver":"^5.3.0"},"devDependencies":{"@types/mocha":"^2.2.40","@types/node":"^7.0.12","mocha":"^3.2.0","rimraf":"^2.6.1","tslint":"^5.0.0","typescript":"^2.2.1"},"files":["dist/src/**/*.d.ts","dist/src/**/*.js","LICENSE","README.md","package.json"],"license":"MIT"};

	/***/ }),
	/* 89 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var stream_1 = __webpack_require__(90);
	var consolePatchFunction = function (originalConsole) {
		var aiLoggingOutStream = new stream_1.Writable();
		var aiLoggingErrStream = new stream_1.Writable();
		// Default console is roughly equivalent to `new Console(process.stdout, process.stderr)`
		// We create a version which publishes to the channel and also to stdout/stderr
		aiLoggingOutStream.write = function (chunk) {
			if (!chunk) {
				return true;
			}
			var message = chunk.toString();
			diagnostic_channel_1.channel.publish("console", { message: message });
			return true;
		};
		aiLoggingErrStream.write = function (chunk) {
			if (!chunk) {
				return true;
			}
			var message = chunk.toString();
			diagnostic_channel_1.channel.publish("console", { message: message, stderr: true });
			return true;
		};
		var aiLoggingConsole = new originalConsole.Console(aiLoggingOutStream, aiLoggingErrStream);
		var consoleMethods = ["log", "info", "warn", "error", "dir", "time", "timeEnd", "trace", "assert"];
		var _loop_1 = function (method) {
			var originalMethod = originalConsole[method];
			if (originalMethod) {
				originalConsole[method] = function () {
					if (aiLoggingConsole[method]) {
						try {
							aiLoggingConsole[method].apply(aiLoggingConsole, arguments);
						}
						catch (e) {
							// Ignore errors; allow the original method to throw if necessary
						}
					}
					return originalMethod.apply(originalConsole, arguments);
				};
			}
		};
		for (var _i = 0, consoleMethods_1 = consoleMethods; _i < consoleMethods_1.length; _i++) {
			var method = consoleMethods_1[_i];
			_loop_1(method);
		}
		return originalConsole;
	};
	exports.console = {
		versionSpecifier: ">= 4.0.0",
		patch: consolePatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("console", exports.console);
		// Force patching of console
		/* tslint:disable-next-line:no-var-requires */
		__webpack_require__(91);
	}
	exports.enable = enable;
	//# sourceMappingURL=console.pub.js.map

	/***/ }),
	/* 90 */
	/***/ (function(module, exports) {

	module.exports = require("stream");

	/***/ }),
	/* 91 */
	/***/ (function(module, exports) {

	module.exports = require("console");

	/***/ }),
	/* 92 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var mongodbcorePatchFunction = function (originalMongoCore) {
		var originalConnect = originalMongoCore.Server.prototype.connect;
		originalMongoCore.Server.prototype.connect = function contextPreservingConnect() {
			var ret = originalConnect.apply(this, arguments);
			// Messages sent to mongo progress through a pool
			// This can result in context getting mixed between different responses
			// so we wrap the callbacks to restore appropriate state
			var originalWrite = this.s.pool.write;
			this.s.pool.write = function contextPreservingWrite() {
				var cbidx = typeof arguments[1] === "function" ? 1 : 2;
				if (typeof arguments[cbidx] === "function") {
					arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(arguments[cbidx]);
				}
				return originalWrite.apply(this, arguments);
			};
			// Logout is a special case, it doesn't call the write function but instead
			// directly calls into connection.write
			var originalLogout = this.s.pool.logout;
			this.s.pool.logout = function contextPreservingLogout() {
				if (typeof arguments[1] === "function") {
					arguments[1] = diagnostic_channel_1.channel.bindToContext(arguments[1]);
				}
				return originalLogout.apply(this, arguments);
			};
			return ret;
		};
		return originalMongoCore;
	};
	exports.mongoCore2 = {
		versionSpecifier: ">= 2.0.0 < 2.2.0",
		patch: mongodbcorePatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("mongodb-core", exports.mongoCore2);
	}
	exports.enable = enable;
	//# sourceMappingURL=mongodb-core.pub.js.map

	/***/ }),
	/* 93 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var mongodbPatchFunction = function (originalMongo) {
		var listener = originalMongo.instrument({
			operationIdGenerator: {
				next: function () {
					return diagnostic_channel_1.channel.bindToContext(function (cb) { return cb(); });
				},
			},
		});
		var eventMap = {};
		listener.on("started", function (event) {
			if (eventMap[event.requestId]) {
				// Note: Mongo can generate 2 completely separate requests
				// which share the same requestId, if a certain race condition is triggered.
				// For now, we accept that this can happen and potentially miss or mislabel some events.
				return;
			}
			eventMap[event.requestId] = event;
		});
		listener.on("succeeded", function (event) {
			var startedData = eventMap[event.requestId];
			if (startedData) {
				delete eventMap[event.requestId];
			}
			event.operationId(function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: true }); });
		});
		listener.on("failed", function (event) {
			var startedData = eventMap[event.requestId];
			if (startedData) {
				delete eventMap[event.requestId];
			}
			event.operationId(function () { return diagnostic_channel_1.channel.publish("mongodb", { startedData: startedData, event: event, succeeded: false }); });
		});
		return originalMongo;
	};
	exports.mongo2 = {
		versionSpecifier: ">= 2.0.0 <= 2.2.x",
		patch: mongodbPatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("mongodb", exports.mongo2);
	}
	exports.enable = enable;
	//# sourceMappingURL=mongodb.pub.js.map

	/***/ }),
	/* 94 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var path = __webpack_require__(1);
	var mysqlPatchFunction = function (originalMysql, originalMysqlPath) {
		// The `name` passed in here is for debugging purposes,
		// to help distinguish which object is being patched.
		var patchObjectFunction = function (obj, name) {
			return function (func, cbWrapper) {
				var originalFunc = obj[func];
				if (originalFunc) {
					obj[func] = function mysqlContextPreserver() {
						// Find the callback, if there is one
						var cbidx = arguments.length - 1;
						for (var i = arguments.length - 1; i >= 0; --i) {
							if (typeof arguments[i] === "function") {
								cbidx = i;
								break;
							}
							else if (typeof arguments[i] !== "undefined") {
								break;
							}
						}
						var cb = arguments[cbidx];
						var resultContainer = { result: null, startTime: null };
						if (typeof cb === "function") {
							// Preserve context on the callback.
							// If this is one of the functions that we want to track,
							// then wrap the callback with the tracking wrapper
							if (cbWrapper) {
								resultContainer.startTime = process.hrtime();
								arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cbWrapper(resultContainer, cb));
							}
							else {
								arguments[cbidx] = diagnostic_channel_1.channel.bindToContext(cb);
							}
						}
						var result = originalFunc.apply(this, arguments);
						resultContainer.result = result;
						return result;
					};
				}
			};
		};
		var patchClassMemberFunction = function (classObject, name) {
			return patchObjectFunction(classObject.prototype, name + ".prototype");
		};
		var connectionCallbackFunctions = [
			"connect", "changeUser",
			"ping", "statistics", "end",
		];
		var connectionClass = __webpack_require__(95)(path.dirname(originalMysqlPath) + "/lib/Connection");
		connectionCallbackFunctions.forEach(function (value) { return patchClassMemberFunction(connectionClass, "Connection")(value); });
		// Connection.createQuery is a static method
		patchObjectFunction(connectionClass, "Connection")("createQuery", function (resultContainer, cb) {
			return function (err) {
				var hrDuration = process.hrtime(resultContainer.startTime);
				/* tslint:disable-next-line:no-bitwise */
				var duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6) | 0;
				diagnostic_channel_1.channel.publish("mysql", { query: resultContainer.result, callbackArgs: arguments, err: err, duration: duration });
				cb.apply(this, arguments);
			};
		});
		var poolCallbackFunctions = [
			"_enqueueCallback",
		];
		var poolClass = __webpack_require__(96)(path.dirname(originalMysqlPath) + "/lib/Pool");
		poolCallbackFunctions.forEach(function (value) { return patchClassMemberFunction(poolClass, "Pool")(value); });
		return originalMysql;
	};
	exports.mysql = {
		versionSpecifier: ">= 2.0.0 <= 2.14.x",
		patch: mysqlPatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("mysql", exports.mysql);
	}
	exports.enable = enable;
	//# sourceMappingURL=mysql.pub.js.map

	/***/ }),
	/* 95 */
	/***/ (function(module, exports) {

	function webpackEmptyContext(req) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	webpackEmptyContext.keys = function() { return []; };
	webpackEmptyContext.resolve = webpackEmptyContext;
	module.exports = webpackEmptyContext;
	webpackEmptyContext.id = 95;

	/***/ }),
	/* 96 */
	/***/ (function(module, exports) {

	function webpackEmptyContext(req) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	webpackEmptyContext.keys = function() { return []; };
	webpackEmptyContext.resolve = webpackEmptyContext;
	module.exports = webpackEmptyContext;
	webpackEmptyContext.id = 96;

	/***/ }),
	/* 97 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	function postgresPool1PatchFunction(originalPgPool) {
		var originalConnect = originalPgPool.prototype.connect;
		originalPgPool.prototype.connect = function connect(callback) {
			if (callback) {
				arguments[0] = diagnostic_channel_1.channel.bindToContext(callback);
			}
			originalConnect.apply(this, arguments);
		};
		return originalPgPool;
	}
	exports.postgresPool1 = {
		versionSpecifier: "1.x",
		patch: postgresPool1PatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("pg-pool", exports.postgresPool1);
	}
	exports.enable = enable;
	//# sourceMappingURL=pg-pool.pub.js.map

	/***/ }),
	/* 98 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var events_1 = __webpack_require__(17);
	function postgres6PatchFunction(originalPg, originalPgPath) {
		var originalClientQuery = originalPg.Client.prototype.query;
		var diagnosticOriginalFunc = "__diagnosticOriginalFunc";
		// wherever the callback is passed, find it, save it, and remove it from the call
		// to the the original .query() function
		originalPg.Client.prototype.query = function query(config, values, callback) {
			var data = {
				query: {},
				database: {
					host: this.connectionParameters.host,
					port: this.connectionParameters.port,
				},
				result: null,
				error: null,
				duration: 0,
			};
			var start = process.hrtime();
			var queryResult;
			function patchCallback(cb) {
				if (cb && cb[diagnosticOriginalFunc]) {
					cb = cb[diagnosticOriginalFunc];
				}
				var trackingCallback = diagnostic_channel_1.channel.bindToContext(function (err, res) {
					var end = process.hrtime(start);
					data.result = res && { rowCount: res.rowCount, command: res.command };
					data.error = err;
					data.duration = Math.ceil((end[0] * 1e3) + (end[1] / 1e6));
					diagnostic_channel_1.channel.publish("postgres", data);
					// emulate weird internal behavior in pg@6
					// on success, the callback is called *before* query events are emitted
					// on failure, the callback is called *instead of* the query emitting events
					// with no events, that means no promises (since the promise is resolved/rejected in an event handler)
					// since we are always inserting ourselves as a callback, we have to restore the original
					// behavior if the user didn't provide one themselves
					if (err) {
						if (cb) {
							return cb.apply(this, arguments);
						}
						else if (queryResult && queryResult instanceof events_1.EventEmitter) {
							queryResult.emit("error", err);
						}
					}
					else if (cb) {
						cb.apply(this, arguments);
					}
				});
				try {
					Object.defineProperty(trackingCallback, diagnosticOriginalFunc, { value: cb });
					return trackingCallback;
				}
				catch (e) {
					// this should never happen, but bailout in case it does
					return cb;
				}
			}
			// this function takes too many variations of arguments.
			// this patches any provided callback or creates a new callback if one wasn't provided.
			// since the callback is always called (if provided) in addition to always having a Promisified
			// EventEmitter returned (well, sometimes -- see above), its safe to insert a callback if none was given
			try {
				if (typeof config === "string") {
					if (values instanceof Array) {
						data.query.preparable = {
							text: config,
							args: values,
						};
						callback = patchCallback(callback);
					}
					else {
						data.query.text = config;
						// pg v6 will, for some reason, accept both
						// client.query("...", undefined, () => {...})
						// **and**
						// client.query("...", () => {...});
						// Internally, precedence is given to the callback argument
						if (callback) {
							callback = patchCallback(callback);
						}
						else {
							values = patchCallback(values);
						}
					}
				}
				else {
					if (typeof config.name === "string") {
						data.query.plan = config.name;
					}
					else if (config.values instanceof Array) {
						data.query.preparable = {
							text: config.text,
							args: config.values,
						};
					}
					else {
						data.query.text = config.text;
					}
					if (callback) {
						callback = patchCallback(callback);
					}
					else if (values) {
						values = patchCallback(values);
					}
					else {
						config.callback = patchCallback(config.callback);
					}
				}
			}
			catch (e) {
				// if our logic here throws, bail out and just let pg do its thing
				return originalClientQuery.apply(this, arguments);
			}
			arguments[0] = config;
			arguments[1] = values;
			arguments[2] = callback;
			arguments.length = (arguments.length > 3) ? arguments.length : 3;
			queryResult = originalClientQuery.apply(this, arguments);
			return queryResult;
		};
		return originalPg;
	}
	exports.postgres6 = {
		versionSpecifier: "6.x",
		patch: postgres6PatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("pg", exports.postgres6);
	}
	exports.enable = enable;
	//# sourceMappingURL=pg.pub.js.map

	/***/ }),
	/* 99 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	var redisPatchFunction = function (originalRedis) {
		var originalSend = originalRedis.RedisClient.prototype.internal_send_command;
		// Note: This is mixing together both context tracking and dependency tracking
		originalRedis.RedisClient.prototype.internal_send_command = function (commandObj) {
			if (commandObj) {
				var cb_1 = commandObj.callback;
				if (!cb_1 || !cb_1.pubsubBound) {
					var address_1 = this.address;
					var startTime_1 = process.hrtime();
					// Note: augmenting the callback on internal_send_command is correct for context
					// tracking, but may be too low-level for dependency tracking. There are some 'errors'
					// which higher levels expect in some cases
					// However, the only other option is to intercept every individual command.
					commandObj.callback = diagnostic_channel_1.channel.bindToContext(function (err, result) {
						var hrDuration = process.hrtime(startTime_1);
						/* tslint:disable-next-line:no-bitwise */
						var duration = (hrDuration[0] * 1e3 + hrDuration[1] / 1e6) | 0;
						diagnostic_channel_1.channel.publish("redis", { duration: duration, address: address_1, commandObj: commandObj, err: err, result: result });
						if (typeof cb_1 === "function") {
							cb_1.apply(this, arguments);
						}
					});
					commandObj.callback.pubsubBound = true;
				}
			}
			return originalSend.call(this, commandObj);
		};
		return originalRedis;
	};
	exports.redis = {
		versionSpecifier: ">= 2.0.0 < 3.0.0",
		patch: redisPatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("redis", exports.redis);
	}
	exports.enable = enable;
	//# sourceMappingURL=redis.pub.js.map

	/***/ }),
	/* 100 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(84);
	// register a "filter" with each logger that publishes the data about to be logged
	var winstonPatchFunction = function (originalWinston) {
		var originalLog = originalWinston.Logger.prototype.log;
		var curLevels;
		var loggingFilter = function (level, message, meta) {
			var levelKind;
			if (curLevels === originalWinston.config.npm.levels) {
				levelKind = "npm";
			}
			else if (curLevels === originalWinston.config.syslog.levels) {
				levelKind = "syslog";
			}
			else {
				levelKind = "unknown";
			}
			diagnostic_channel_1.channel.publish("winston", { level: level, message: message, meta: meta, levelKind: levelKind });
			return message;
		};
		// whenever someone logs, ensure our filter comes last
		originalWinston.Logger.prototype.log = function log() {
			curLevels = this.levels;
			if (!this.filters || this.filters.length === 0) {
				this.filters = [loggingFilter];
			}
			else if (this.filters[this.filters.length - 1] !== loggingFilter) {
				this.filters = this.filters.filter(function (f) { return f !== loggingFilter; });
				this.filters.push(loggingFilter);
			}
			return originalLog.apply(this, arguments);
		};
		return originalWinston;
	};
	exports.winston = {
		versionSpecifier: "2.x",
		patch: winstonPatchFunction,
	};
	function enable() {
		diagnostic_channel_1.channel.registerMonkeyPatch("winston", exports.winston);
	}
	exports.enable = enable;
	//# sourceMappingURL=winston.pub.js.map

	/***/ }),
	/* 101 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	* @license
	* Copyright Google Inc. All Rights Reserved.
	*
	* Use of this source code is governed by an MIT-style license that can be
	* found in the LICENSE file at https://angular.io/license
	*/
	(function (global, factory) {
		 true ? factory() :
		undefined;
	}(this, (function () { 'use strict';

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */


	var Zone$1 = (function (global) {
		if (global['Zone']) {
			throw new Error('Zone already loaded.');
		}
		var Zone = (function () {
			function Zone(parent, zoneSpec) {
				this._properties = null;
				this._parent = parent;
				this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
				this._properties = zoneSpec && zoneSpec.properties || {};
				this._zoneDelegate =
					new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
			}
			Zone.assertZonePatched = function () {
				if (global.Promise !== ZoneAwarePromise) {
					throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
						'has been overwritten.\n' +
						'Most likely cause is that a Promise polyfill has been loaded ' +
						'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
						'If you must load one, do so before loading zone.js.)');
				}
			};
			Object.defineProperty(Zone, "current", {
				get: function () {
					return _currentZoneFrame.zone;
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(Zone, "currentTask", {
				get: function () {
					return _currentTask;
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(Zone.prototype, "parent", {
				get: function () {
					return this._parent;
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(Zone.prototype, "name", {
				get: function () {
					return this._name;
				},
				enumerable: true,
				configurable: true
			});

			Zone.prototype.get = function (key) {
				var zone = this.getZoneWith(key);
				if (zone)
					return zone._properties[key];
			};
			Zone.prototype.getZoneWith = function (key) {
				var current = this;
				while (current) {
					if (current._properties.hasOwnProperty(key)) {
						return current;
					}
					current = current._parent;
				}
				return null;
			};
			Zone.prototype.fork = function (zoneSpec) {
				if (!zoneSpec)
					throw new Error('ZoneSpec required!');
				return this._zoneDelegate.fork(this, zoneSpec);
			};
			Zone.prototype.wrap = function (callback, source) {
				if (typeof callback !== 'function') {
					throw new Error('Expecting function got: ' + callback);
				}
				var _callback = this._zoneDelegate.intercept(this, callback, source);
				var zone = this;
				return function () {
					return zone.runGuarded(_callback, this, arguments, source);
				};
			};
			Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
				if (applyThis === void 0) { applyThis = null; }
				if (applyArgs === void 0) { applyArgs = null; }
				if (source === void 0) { source = null; }
				_currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
				try {
					return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
				}
				finally {
					_currentZoneFrame = _currentZoneFrame.parent;
				}
			};
			Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
				if (applyThis === void 0) { applyThis = null; }
				if (applyArgs === void 0) { applyArgs = null; }
				if (source === void 0) { source = null; }
				_currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
				try {
					try {
						return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
					}
					catch (error) {
						if (this._zoneDelegate.handleError(this, error)) {
							throw error;
						}
					}
				}
				finally {
					_currentZoneFrame = _currentZoneFrame.parent;
				}
			};
			Zone.prototype.runTask = function (task, applyThis, applyArgs) {
				task.runCount++;
				if (task.zone != this)
					throw new Error('A task can only be run in the zone which created it! (Creation: ' + task.zone.name +
						'; Execution: ' + this.name + ')');
				var previousTask = _currentTask;
				_currentTask = task;
				_currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
				try {
					if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {
						task.cancelFn = null;
					}
					try {
						return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
					}
					catch (error) {
						if (this._zoneDelegate.handleError(this, error)) {
							throw error;
						}
					}
				}
				finally {
					_currentZoneFrame = _currentZoneFrame.parent;
					_currentTask = previousTask;
				}
			};
			Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
				return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));
			};
			Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
				return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));
			};
			Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
				return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));
			};
			Zone.prototype.cancelTask = function (task) {
				var value = this._zoneDelegate.cancelTask(this, task);
				task.runCount = -1;
				task.cancelFn = null;
				return value;
			};
			return Zone;
		}());
		Zone.__symbol__ = __symbol__;

		var ZoneDelegate = (function () {
			function ZoneDelegate(zone, parentDelegate, zoneSpec) {
				this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
				this.zone = zone;
				this._parentDelegate = parentDelegate;
				this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
				this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
				this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
				this._interceptZS =
					zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
				this._interceptDlgt =
					zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
				this._interceptCurrZone =
					zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
				this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
				this._invokeDlgt =
					zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
				this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
				this._handleErrorZS =
					zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
				this._handleErrorDlgt =
					zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
				this._handleErrorCurrZone =
					zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
				this._scheduleTaskZS =
					zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
				this._scheduleTaskDlgt =
					zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
				this._scheduleTaskCurrZone =
					zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
				this._invokeTaskZS =
					zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
				this._invokeTaskDlgt =
					zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
				this._invokeTaskCurrZone =
					zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
				this._cancelTaskZS =
					zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
				this._cancelTaskDlgt =
					zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
				this._cancelTaskCurrZone =
					zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
				this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);
				this._hasTaskDlgt =
					zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);
				this._hasTaskCurrZone = zoneSpec && (zoneSpec.onHasTask ? this.zone : parentDelegate.zone);
			}
			ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
				return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
					new Zone(targetZone, zoneSpec);
			};
			ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
				return this._interceptZS ?
					this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
					callback;
			};
			ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
				return this._invokeZS ?
					this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
					callback.apply(applyThis, applyArgs);
			};
			ZoneDelegate.prototype.handleError = function (targetZone, error) {
				return this._handleErrorZS ?
					this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
					true;
			};
			ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
				try {
					if (this._scheduleTaskZS) {
						return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
					}
					else if (task.scheduleFn) {
						task.scheduleFn(task);
					}
					else if (task.type == 'microTask') {
						scheduleMicroTask(task);
					}
					else {
						throw new Error('Task is missing scheduleFn.');
					}
					return task;
				}
				finally {
					if (targetZone == this.zone) {
						this._updateTaskCount(task.type, 1);
					}
				}
			};
			ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
				try {
					return this._invokeTaskZS ?
						this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
						task.callback.apply(applyThis, applyArgs);
				}
				finally {
					if (targetZone == this.zone && (task.type != 'eventTask') &&
						!(task.data && task.data.isPeriodic)) {
						this._updateTaskCount(task.type, -1);
					}
				}
			};
			ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
				var value;
				if (this._cancelTaskZS) {
					value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
				}
				else if (!task.cancelFn) {
					throw new Error('Task does not support cancellation, or is already canceled.');
				}
				else {
					value = task.cancelFn(task);
				}
				if (targetZone == this.zone) {
					// this should not be in the finally block, because exceptions assume not canceled.
					this._updateTaskCount(task.type, -1);
				}
				return value;
			};
			ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
				return this._hasTaskZS &&
					this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
			};
			ZoneDelegate.prototype._updateTaskCount = function (type, count) {
				var counts = this._taskCounts;
				var prev = counts[type];
				var next = counts[type] = prev + count;
				if (next < 0) {
					throw new Error('More tasks executed then were scheduled.');
				}
				if (prev == 0 || next == 0) {
					var isEmpty = {
						microTask: counts.microTask > 0,
						macroTask: counts.macroTask > 0,
						eventTask: counts.eventTask > 0,
						change: type
					};
					try {
						this.hasTask(this.zone, isEmpty);
					}
					finally {
						if (this._parentDelegate) {
							this._parentDelegate._updateTaskCount(type, count);
						}
					}
				}
			};
			return ZoneDelegate;
		}());
		var ZoneTask = (function () {
			function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {
				this.runCount = 0;
				this.type = type;
				this.zone = zone;
				this.source = source;
				this.data = options;
				this.scheduleFn = scheduleFn;
				this.cancelFn = cancelFn;
				this.callback = callback;
				var self = this;
				this.invoke = function () {
					_numberOfNestedTaskFrames++;
					try {
						return zone.runTask(self, this, arguments);
					}
					finally {
						if (_numberOfNestedTaskFrames == 1) {
							drainMicroTaskQueue();
						}
						_numberOfNestedTaskFrames--;
					}
				};
			}
			ZoneTask.prototype.toString = function () {
				if (this.data && typeof this.data.handleId !== 'undefined') {
					return this.data.handleId;
				}
				else {
					return Object.prototype.toString.call(this);
				}
			};
			// add toJSON method to prevent cyclic error when
			// call JSON.stringify(zoneTask)
			ZoneTask.prototype.toJSON = function () {
				return {
					type: this.type,
					source: this.source,
					data: this.data,
					zone: this.zone.name,
					invoke: this.invoke,
					scheduleFn: this.scheduleFn,
					cancelFn: this.cancelFn,
					runCount: this.runCount,
					callback: this.callback
				};
			};
			return ZoneTask;
		}());
		var ZoneFrame = (function () {
			function ZoneFrame(parent, zone) {
				this.parent = parent;
				this.zone = zone;
			}
			return ZoneFrame;
		}());
		function __symbol__(name) {
			return '__zone_symbol__' + name;
		}

		var symbolSetTimeout = __symbol__('setTimeout');
		var symbolPromise = __symbol__('Promise');
		var symbolThen = __symbol__('then');
		var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
		var _currentTask = null;
		var _microTaskQueue = [];
		var _isDrainingMicrotaskQueue = false;
		var _uncaughtPromiseErrors = [];
		var _numberOfNestedTaskFrames = 0;
		function scheduleQueueDrain() {
			// if we are not running in any task, and there has not been anything scheduled
			// we must bootstrap the initial task creation by manually scheduling the drain
			if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
				// We are not running in Task, so we need to kickstart the microtask queue.
				if (global[symbolPromise]) {
					global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
				}
				else {
					global[symbolSetTimeout](drainMicroTaskQueue, 0);
				}
			}
		}
		function scheduleMicroTask(task) {
			scheduleQueueDrain();
			_microTaskQueue.push(task);
		}
		function consoleError(e) {
			var rejection = e && e.rejection;
			if (rejection) {
				console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
			}
			console.error(e);
		}
		function drainMicroTaskQueue() {
			if (!_isDrainingMicrotaskQueue) {
				_isDrainingMicrotaskQueue = true;
				while (_microTaskQueue.length) {
					var queue = _microTaskQueue;
					_microTaskQueue = [];
					for (var i = 0; i < queue.length; i++) {
						var task = queue[i];
						try {
							task.zone.runTask(task, null, null);
						}
						catch (e) {
							consoleError(e);
						}
					}
				}
				while (_uncaughtPromiseErrors.length) {
					var _loop_1 = function () {
						var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
						try {
							uncaughtPromiseError.zone.runGuarded(function () {
								throw uncaughtPromiseError;
							});
						}
						catch (e) {
							consoleError(e);
						}
					};
					while (_uncaughtPromiseErrors.length) {
						_loop_1();
					}
				}
				_isDrainingMicrotaskQueue = false;
			}
		}
		function isThenable(value) {
			return value && value.then;
		}
		function forwardResolution(value) {
			return value;
		}
		function forwardRejection(rejection) {
			return ZoneAwarePromise.reject(rejection);
		}
		var symbolState = __symbol__('state');
		var symbolValue = __symbol__('value');
		var source = 'Promise.then';
		var UNRESOLVED = null;
		var RESOLVED = true;
		var REJECTED = false;
		var REJECTED_NO_CATCH = 0;
		function makeResolver(promise, state) {
			return function (v) {
				resolvePromise(promise, state, v);
				// Do not return value or you will break the Promise spec.
			};
		}
		function resolvePromise(promise, state, value) {
			if (promise[symbolState] === UNRESOLVED) {
				if (value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) &&
					value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
					clearRejectedNoCatch(value);
					resolvePromise(promise, value[symbolState], value[symbolValue]);
				}
				else if (isThenable(value)) {
					value.then(makeResolver(promise, state), makeResolver(promise, false));
				}
				else {
					promise[symbolState] = state;
					var queue = promise[symbolValue];
					promise[symbolValue] = value;
					for (var i = 0; i < queue.length;) {
						scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
					}
					if (queue.length == 0 && state == REJECTED) {
						promise[symbolState] = REJECTED_NO_CATCH;
						try {
							throw new Error('Uncaught (in promise): ' + value +
								(value && value.stack ? '\n' + value.stack : ''));
						}
						catch (e) {
							var error_1 = e;
							error_1.rejection = value;
							error_1.promise = promise;
							error_1.zone = Zone.current;
							error_1.task = Zone.currentTask;
							_uncaughtPromiseErrors.push(error_1);
							scheduleQueueDrain();
						}
					}
				}
			}
			// Resolving an already resolved promise is a noop.
			return promise;
		}
		function clearRejectedNoCatch(promise) {
			if (promise[symbolState] === REJECTED_NO_CATCH) {
				promise[symbolState] = REJECTED;
				for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
					if (promise === _uncaughtPromiseErrors[i].promise) {
						_uncaughtPromiseErrors.splice(i, 1);
						break;
					}
				}
			}
		}
		function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
			clearRejectedNoCatch(promise);
			var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;
			zone.scheduleMicroTask(source, function () {
				try {
					resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));
				}
				catch (error) {
					resolvePromise(chainPromise, false, error);
				}
			});
		}
		var ZoneAwarePromise = (function () {
			function ZoneAwarePromise(executor) {
				var promise = this;
				if (!(promise instanceof ZoneAwarePromise)) {
					throw new Error('Must be an instanceof Promise.');
				}
				promise[symbolState] = UNRESOLVED;
				promise[symbolValue] = []; // queue;
				try {
					executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
				}
				catch (e) {
					resolvePromise(promise, false, e);
				}
			}
			ZoneAwarePromise.toString = function () {
				return 'function ZoneAwarePromise() { [native code] }';
			};
			ZoneAwarePromise.resolve = function (value) {
				return resolvePromise(new this(null), RESOLVED, value);
			};
			ZoneAwarePromise.reject = function (error) {
				return resolvePromise(new this(null), REJECTED, error);
			};
			ZoneAwarePromise.race = function (values) {
				var resolve;
				var reject;
				var promise = new this(function (res, rej) {
					_a = [res, rej], resolve = _a[0], reject = _a[1];
					var _a;
				});
				function onResolve(value) {
					promise && (promise = null || resolve(value));
				}
				function onReject(error) {
					promise && (promise = null || reject(error));
				}
				for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
					var value = values_1[_i];
					if (!isThenable(value)) {
						value = this.resolve(value);
					}
					value.then(onResolve, onReject);
				}
				return promise;
			};
			ZoneAwarePromise.all = function (values) {
				var resolve;
				var reject;
				var promise = new this(function (res, rej) {
					resolve = res;
					reject = rej;
				});
				var count = 0;
				var resolvedValues = [];
				for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
					var value = values_2[_i];
					if (!isThenable(value)) {
						value = this.resolve(value);
					}
					value.then((function (index) { return function (value) {
						resolvedValues[index] = value;
						count--;
						if (!count) {
							resolve(resolvedValues);
						}
					}; })(count), reject);
					count++;
				}
				if (!count)
					resolve(resolvedValues);
				return promise;
			};
			ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
				var chainPromise = new this.constructor(null);
				var zone = Zone.current;
				if (this[symbolState] == UNRESOLVED) {
					this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
				}
				else {
					scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
				}
				return chainPromise;
			};
			ZoneAwarePromise.prototype.catch = function (onRejected) {
				return this.then(null, onRejected);
			};
			return ZoneAwarePromise;
		}());
		// Protect against aggressive optimizers dropping seemingly unused properties.
		// E.g. Closure Compiler in advanced mode.
		ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
		ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
		ZoneAwarePromise['race'] = ZoneAwarePromise.race;
		ZoneAwarePromise['all'] = ZoneAwarePromise.all;
		var NativePromise = global[__symbol__('Promise')] = global['Promise'];
		global['Promise'] = ZoneAwarePromise;
		function patchThen(NativePromise) {
			var NativePromiseProtototype = NativePromise.prototype;
			var NativePromiseThen = NativePromiseProtototype[__symbol__('then')] =
				NativePromiseProtototype.then;
			NativePromiseProtototype.then = function (onResolve, onReject) {
				var nativePromise = this;
				return new ZoneAwarePromise(function (resolve, reject) {
					NativePromiseThen.call(nativePromise, resolve, reject);
				})
					.then(onResolve, onReject);
			};
		}
		if (NativePromise) {
			patchThen(NativePromise);
			if (typeof global['fetch'] !== 'undefined') {
				var fetchPromise = void 0;
				try {
					// In MS Edge this throws
					fetchPromise = global['fetch']();
				}
				catch (e) {
					// In Chrome this throws instead.
					fetchPromise = global['fetch']('about:blank');
				}
				// ignore output to prevent error;
				fetchPromise.then(function () { return null; }, function () { return null; });
				if (fetchPromise.constructor != NativePromise &&
					fetchPromise.constructor != ZoneAwarePromise) {
					patchThen(fetchPromise.constructor);
				}
			}
		}
		// This is not part of public API, but it is usefull for tests, so we expose it.
		Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
		/*
		 * This code patches Error so that:
		 *   - It ignores un-needed stack frames.
		 *   - It Shows the associated Zone for reach frame.
		 */
		var FrameType;
		(function (FrameType) {
			/// Skip this frame when printing out stack
			FrameType[FrameType["blackList"] = 0] = "blackList";
			/// This frame marks zone transition
			FrameType[FrameType["transition"] = 1] = "transition";
		})(FrameType || (FrameType = {}));
		var NativeError = global[__symbol__('Error')] = global.Error;
		// Store the frames which should be removed from the stack frames
		var blackListedStackFrames = {};
		// We must find the frame where Error was created, otherwise we assume we don't understand stack
		var zoneAwareFrame;
		global.Error = ZoneAwareError;
		// How should the stack frames be parsed.
		var frameParserStrategy = null;
		var stackRewrite = 'stackRewrite';
		// fix #595, create property descriptor
		// for error properties
		var createProperty = function (props, key) {
			// if property is already defined, skip it.
			if (props[key]) {
				return;
			}
			// define a local property
			// in case error property is not settable
			var name = __symbol__(key);
			props[key] = {
				configurable: true,
				enumerable: true,
				get: function () {
					// if local property has no value
					// use internal error's property value
					if (!this[name]) {
						var error_2 = this[__symbol__('error')];
						if (error_2) {
							this[name] = error_2[key];
						}
					}
					return this[name];
				},
				set: function (value) {
					// setter will set value to local property value
					this[name] = value;
				}
			};
		};
		// fix #595, create property descriptor
		// for error method properties
		var createMethodProperty = function (props, key) {
			if (props[key]) {
				return;
			}
			props[key] = {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function () {
					var error = this[__symbol__('error')];
					var errorMethod = (error && error[key]) || this[key];
					if (errorMethod) {
						return errorMethod.apply(error, arguments);
					}
				}
			};
		};
		var createErrorProperties = function () {
			var props = Object.create(null);
			var error = new NativeError();
			var keys = Object.getOwnPropertyNames(error);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				// Avoid bugs when hasOwnProperty is shadowed
				if (Object.prototype.hasOwnProperty.call(error, key)) {
					createProperty(props, key);
				}
			}
			var proto = NativeError.prototype;
			if (proto) {
				var pKeys = Object.getOwnPropertyNames(proto);
				for (var i = 0; i < pKeys.length; i++) {
					var key = pKeys[i];
					// skip constructor
					if (key !== 'constructor' && key !== 'toString' && key !== 'toSource') {
						createProperty(props, key);
					}
				}
			}
			// some other properties are not
			// in NativeError
			createProperty(props, 'originalStack');
			createProperty(props, 'zoneAwareStack');
			// define toString, toSource as method property
			createMethodProperty(props, 'toString');
			createMethodProperty(props, 'toSource');
			return props;
		};
		var errorProperties = createErrorProperties();
		// for derived Error class which extends ZoneAwareError
		// we should not override the derived class's property
		// so we create a new props object only copy the properties
		// from errorProperties which not exist in derived Error's prototype
		var getErrorPropertiesForPrototype = function (prototype) {
			// if the prototype is ZoneAwareError.prototype
			// we just return the prebuilt errorProperties.
			if (prototype === ZoneAwareError.prototype) {
				return errorProperties;
			}
			var newProps = Object.create(null);
			var cKeys = Object.getOwnPropertyNames(errorProperties);
			var keys = Object.getOwnPropertyNames(prototype);
			cKeys.forEach(function (cKey) {
				if (keys.filter(function (key) {
					return key === cKey;
				})
					.length === 0) {
					newProps[cKey] = errorProperties[cKey];
				}
			});
			return newProps;
		};
		/**
		 * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
		 * adds zone information to it.
		 */
		function ZoneAwareError() {
			// make sure we have a valid this
			// if this is undefined(call Error without new) or this is global
			// or this is some other objects, we should force to create a
			// valid ZoneAwareError by call Object.create()
			if (!(this instanceof ZoneAwareError)) {
				return ZoneAwareError.apply(Object.create(ZoneAwareError.prototype), arguments);
			}
			// Create an Error.
			var error = NativeError.apply(this, arguments);
			this[__symbol__('error')] = error;
			// Save original stack trace
			error.originalStack = error.stack;
			// Process the stack trace and rewrite the frames.
			if (ZoneAwareError[stackRewrite] && error.originalStack) {
				var frames_1 = error.originalStack.split('\n');
				var zoneFrame = _currentZoneFrame;
				var i = 0;
				// Find the first frame
				while (frames_1[i] !== zoneAwareFrame && i < frames_1.length) {
					i++;
				}
				for (; i < frames_1.length && zoneFrame; i++) {
					var frame = frames_1[i];
					if (frame.trim()) {
						var frameType = blackListedStackFrames.hasOwnProperty(frame) && blackListedStackFrames[frame];
						if (frameType === FrameType.blackList) {
							frames_1.splice(i, 1);
							i--;
						}
						else if (frameType === FrameType.transition) {
							if (zoneFrame.parent) {
								// This is the special frame where zone changed. Print and process it accordingly
								frames_1[i] += " [" + zoneFrame.parent.zone.name + " => " + zoneFrame.zone.name + "]";
								zoneFrame = zoneFrame.parent;
							}
							else {
								zoneFrame = null;
							}
						}
						else {
							frames_1[i] += " [" + zoneFrame.zone.name + "]";
						}
					}
				}
				error.stack = error.zoneAwareStack = frames_1.join('\n');
			}
			// use defineProperties here instead of copy property value
			// because of issue #595 which will break angular2.
			Object.defineProperties(this, getErrorPropertiesForPrototype(Object.getPrototypeOf(this)));
			return this;
		}
		// Copy the prototype so that instanceof operator works as expected
		ZoneAwareError.prototype = NativeError.prototype;
		ZoneAwareError[Zone.__symbol__('blacklistedStackFrames')] = blackListedStackFrames;
		ZoneAwareError[stackRewrite] = false;
		if (NativeError.hasOwnProperty('stackTraceLimit')) {
			// Extend default stack limit as we will be removing few frames.
			NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
			// make sure that ZoneAwareError has the same property which forwards to NativeError.
			Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
				get: function () {
					return NativeError.stackTraceLimit;
				},
				set: function (value) {
					return NativeError.stackTraceLimit = value;
				}
			});
		}
		if (NativeError.hasOwnProperty('captureStackTrace')) {
			Object.defineProperty(ZoneAwareError, 'captureStackTrace', {
				// add named function here because we need to remove this
				// stack frame when prepareStackTrace below
				value: function zoneCaptureStackTrace(targetObject, constructorOpt) {
					NativeError.captureStackTrace(targetObject, constructorOpt);
				}
			});
		}
		Object.defineProperty(ZoneAwareError, 'prepareStackTrace', {
			get: function () {
				return NativeError.prepareStackTrace;
			},
			set: function (value) {
				if (!value || typeof value !== 'function') {
					return NativeError.prepareStackTrace = value;
				}
				return NativeError.prepareStackTrace = function (error, structuredStackTrace) {
					// remove additional stack information from ZoneAwareError.captureStackTrace
					if (structuredStackTrace) {
						for (var i = 0; i < structuredStackTrace.length; i++) {
							var st = structuredStackTrace[i];
							// remove the first function which name is zoneCaptureStackTrace
							if (st.getFunctionName() === 'zoneCaptureStackTrace') {
								structuredStackTrace.splice(i, 1);
								break;
							}
						}
					}
					return value.apply(this, [error, structuredStackTrace]);
				};
			}
		});
		// Now we need to populet the `blacklistedStackFrames` as well as find the
		// run/runGuraded/runTask frames. This is done by creating a detect zone and then threading
		// the execution through all of the above methods so that we can look at the stack trace and
		// find the frames of interest.
		var detectZone = Zone.current.fork({
			name: 'detect',
			onInvoke: function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
				// Here only so that it will show up in the stack frame so that it can be black listed.
				return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
			},
			onHandleError: function (parentZD, current, target, error) {
				if (error.originalStack && Error === ZoneAwareError) {
					var frames_2 = error.originalStack.split(/\n/);
					var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
					while (frames_2.length) {
						var frame = frames_2.shift();
						// On safari it is possible to have stack frame with no line number.
						// This check makes sure that we don't filter frames on name only (must have
						// linenumber)
						if (/:\d+:\d+/.test(frame)) {
							// Get rid of the path so that we don't accidintely find function name in path.
							// In chrome the seperator is `(` and `@` in FF and safari
							// Chrome: at Zone.run (zone.js:100)
							// Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
							// FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
							// Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
							var fnName = frame.split('(')[0].split('@')[0];
							var frameType = FrameType.transition;
							if (fnName.indexOf('ZoneAwareError') !== -1) {
								zoneAwareFrame = frame;
							}
							if (fnName.indexOf('runGuarded') !== -1) {
								runGuardedFrame = true;
							}
							else if (fnName.indexOf('runTask') !== -1) {
								runTaskFrame = true;
							}
							else if (fnName.indexOf('run') !== -1) {
								runFrame = true;
							}
							else {
								frameType = FrameType.blackList;
							}
							blackListedStackFrames[frame] = frameType;
							// Once we find all of the frames we can stop looking.
							if (runFrame && runGuardedFrame && runTaskFrame) {
								ZoneAwareError[stackRewrite] = true;
								break;
							}
						}
					}
				}
				return false;
			}
		});
		// carefully constructor a stack frame which contains all of the frames of interest which
		// need to be detected and blacklisted.
		var detectRunFn = function () {
			detectZone.run(function () {
				detectZone.runGuarded(function () {
					throw new Error('blacklistStackFrames');
				});
			});
		};
		// Cause the error to extract the stack frames.
		detectZone.runTask(detectZone.scheduleMacroTask('detect', detectRunFn, null, function () { return null; }, null));
		return global['Zone'] = Zone;
	})(typeof window === 'object' && window || typeof self === 'object' && self || global);

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	/**
	 * Suppress closure compiler errors about unknown 'Zone' variable
	 * @fileoverview
	 * @suppress {undefinedVars}
	 */
	var zoneSymbol = function (n) { return "__zone_symbol__" + n; };
	var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
	function bindArguments(args, source) {
		for (var i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] === 'function') {
				args[i] = Zone.current.wrap(args[i], source + '_' + i);
			}
		}
		return args;
	}


	var isNode = (!('nw' in _global$1) && typeof process !== 'undefined' &&
		{}.toString.call(process) === '[object process]');





	var EVENT_TASKS = zoneSymbol('eventTasks');
	// For EventTarget
	var ADD_EVENT_LISTENER = 'addEventListener';
	var REMOVE_EVENT_LISTENER = 'removeEventListener';
	function findExistingRegisteredTask(target, handler, name, capture, remove) {
		var eventTasks = target[EVENT_TASKS];
		if (eventTasks) {
			for (var i = 0; i < eventTasks.length; i++) {
				var eventTask = eventTasks[i];
				var data = eventTask.data;
				var listener = data.handler;
				if ((data.handler === handler || listener.listener === handler) &&
					data.useCapturing === capture && data.eventName === name) {
					if (remove) {
						eventTasks.splice(i, 1);
					}
					return eventTask;
				}
			}
		}
		return null;
	}
	function findAllExistingRegisteredTasks(target, name, capture, remove) {
		var eventTasks = target[EVENT_TASKS];
		if (eventTasks) {
			var result = [];
			for (var i = eventTasks.length - 1; i >= 0; i--) {
				var eventTask = eventTasks[i];
				var data = eventTask.data;
				if (data.eventName === name && data.useCapturing === capture) {
					result.push(eventTask);
					if (remove) {
						eventTasks.splice(i, 1);
					}
				}
			}
			return result;
		}
		return null;
	}
	function attachRegisteredEvent(target, eventTask, isPrepend) {
		var eventTasks = target[EVENT_TASKS];
		if (!eventTasks) {
			eventTasks = target[EVENT_TASKS] = [];
		}
		if (isPrepend) {
			eventTasks.unshift(eventTask);
		}
		else {
			eventTasks.push(eventTask);
		}
	}
	var defaultListenerMetaCreator = function (self, args) {
		return {
			useCapturing: args[2],
			eventName: args[0],
			handler: args[1],
			target: self || _global$1,
			name: args[0],
			invokeAddFunc: function (addFnSymbol, delegate) {
				if (delegate && delegate.invoke) {
					return this.target[addFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
				}
				else {
					return this.target[addFnSymbol](this.eventName, delegate, this.useCapturing);
				}
			},
			invokeRemoveFunc: function (removeFnSymbol, delegate) {
				if (delegate && delegate.invoke) {
					return this.target[removeFnSymbol](this.eventName, delegate.invoke, this.useCapturing);
				}
				else {
					return this.target[removeFnSymbol](this.eventName, delegate, this.useCapturing);
				}
			}
		};
	};
	function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend, metaCreator) {
		if (useCapturingParam === void 0) { useCapturingParam = true; }
		if (allowDuplicates === void 0) { allowDuplicates = false; }
		if (isPrepend === void 0) { isPrepend = false; }
		if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
		var addFnSymbol = zoneSymbol(addFnName);
		var removeFnSymbol = zoneSymbol(removeFnName);
		var defaultUseCapturing = useCapturingParam ? false : undefined;
		function scheduleEventListener(eventTask) {
			var meta = eventTask.data;
			attachRegisteredEvent(meta.target, eventTask, isPrepend);
			return meta.invokeAddFunc(addFnSymbol, eventTask);
		}
		function cancelEventListener(eventTask) {
			var meta = eventTask.data;
			findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
			return meta.invokeRemoveFunc(removeFnSymbol, eventTask);
		}
		return function zoneAwareAddListener(self, args) {
			var data = metaCreator(self, args);
			data.useCapturing = data.useCapturing || defaultUseCapturing;
			// - Inside a Web Worker, `this` is undefined, the context is `global`
			// - When `addEventListener` is called on the global context in strict mode, `this` is undefined
			// see https://github.com/angular/zone.js/issues/190
			var delegate = null;
			if (typeof data.handler == 'function') {
				delegate = data.handler;
			}
			else if (data.handler && data.handler.handleEvent) {
				delegate = function (event) { return data.handler.handleEvent(event); };
			}
			var validZoneHandler = false;
			try {
				// In cross site contexts (such as WebDriver frameworks like Selenium),
				// accessing the handler object here will cause an exception to be thrown which
				// will fail tests prematurely.
				validZoneHandler = data.handler && data.handler.toString() === '[object FunctionWrapper]';
			}
			catch (e) {
				// Returning nothing here is fine, because objects in a cross-site context are unusable
				return;
			}
			// Ignore special listeners of IE11 & Edge dev tools, see
			// https://github.com/angular/zone.js/issues/150
			if (!delegate || validZoneHandler) {
				return data.invokeAddFunc(addFnSymbol, data.handler);
			}
			if (!allowDuplicates) {
				var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, false);
				if (eventTask) {
					// we already registered, so this will have noop.
					return data.invokeAddFunc(addFnSymbol, eventTask);
				}
			}
			var zone = Zone.current;
			var source = data.target.constructor['name'] + '.' + addFnName + ':' + data.eventName;
			zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
		};
	}
	function makeZoneAwareRemoveListener(fnName, useCapturingParam, metaCreator) {
		if (useCapturingParam === void 0) { useCapturingParam = true; }
		if (metaCreator === void 0) { metaCreator = defaultListenerMetaCreator; }
		var symbol = zoneSymbol(fnName);
		var defaultUseCapturing = useCapturingParam ? false : undefined;
		return function zoneAwareRemoveListener(self, args) {
			var data = metaCreator(self, args);
			data.useCapturing = data.useCapturing || defaultUseCapturing;
			// - Inside a Web Worker, `this` is undefined, the context is `global`
			// - When `addEventListener` is called on the global context in strict mode, `this` is undefined
			// see https://github.com/angular/zone.js/issues/190
			var eventTask = findExistingRegisteredTask(data.target, data.handler, data.eventName, data.useCapturing, true);
			if (eventTask) {
				eventTask.zone.cancelTask(eventTask);
			}
			else {
				data.invokeRemoveFunc(symbol, data.handler);
			}
		};
	}
	function makeZoneAwareRemoveAllListeners(fnName, useCapturingParam) {
		if (useCapturingParam === void 0) { useCapturingParam = true; }
		var symbol = zoneSymbol(fnName);
		var defaultUseCapturing = useCapturingParam ? false : undefined;
		return function zoneAwareRemoveAllListener(self, args) {
			var target = self || _global$1;
			if (args.length === 0) {
				// remove all listeners without eventName
				target[EVENT_TASKS] = [];
				// we don't cancel Task either, because call native eventEmitter.removeAllListeners will
				// will do remove listener(cancelTask) for us
				target[symbol]();
				return;
			}
			var eventName = args[0];
			var useCapturing = args[1] || defaultUseCapturing;
			// call this function just remove the related eventTask from target[EVENT_TASKS]
			findAllExistingRegisteredTasks(target, eventName, useCapturing, true);
			// we don't need useCapturing here because useCapturing is just for DOM, and
			// removeAllListeners should only be called by node eventEmitter
			// and we don't cancel Task either, because call native eventEmitter.removeAllListeners will
			// will do remove listener(cancelTask) for us
			target[symbol](eventName);
		};
	}
	function makeZoneAwareListeners(fnName) {
		var symbol = zoneSymbol(fnName);
		return function zoneAwareEventListeners(self, args) {
			var eventName = args[0];
			var target = self || _global$1;
			if (!target[EVENT_TASKS]) {
				return [];
			}
			return target[EVENT_TASKS]
				.filter(function (task) { return task.data.eventName === eventName; })
				.map(function (task) { return task.data.handler; });
		};
	}
	var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
	var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);

	var originalInstanceKey = zoneSymbol('originalInstance');
	// wrap some native API on `window`


	function createNamedFn(name, delegate) {
		try {
			return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
		}
		catch (e) {
			// if we fail, we must be CSP, just return delegate.
			return function () {
				return delegate(this, arguments);
			};
		}
	}
	function patchMethod(target, name, patchFn) {
		var proto = target;
		while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
			proto = Object.getPrototypeOf(proto);
		}
		if (!proto && target[name]) {
			// somehow we did not find it, but we can see it. This happens on IE for Window properties.
			proto = target;
		}
		var delegateName = zoneSymbol(name);
		var delegate;
		if (proto && !(delegate = proto[delegateName])) {
			delegate = proto[delegateName] = proto[name];
			proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
		}
		return delegate;
	}
	// TODO: support cancel task later if necessary
	function patchMacroTask(obj, funcName, metaCreator) {
		var setNative = null;
		function scheduleTask(task) {
			var data = task.data;
			data.args[data.callbackIndex] = function () {
				task.invoke.apply(this, arguments);
			};
			setNative.apply(data.target, data.args);
			return task;
		}
		setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
			var meta = metaCreator(self, args);
			if (meta.callbackIndex >= 0 && typeof args[meta.callbackIndex] === 'function') {
				var task = Zone.current.scheduleMacroTask(meta.name, args[meta.callbackIndex], meta, scheduleTask, null);
				return task;
			}
			else {
				// cause an error by calling it directly.
				return delegate.apply(self, args);
			}
		}; });
	}

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var callAndReturnFirstParam = function (fn) {
		return function (self, args) {
			fn(self, args);
			return self;
		};
	};
	// For EventEmitter
	var EE_ADD_LISTENER = 'addListener';
	var EE_PREPEND_LISTENER = 'prependListener';
	var EE_REMOVE_LISTENER = 'removeListener';
	var EE_REMOVE_ALL_LISTENER = 'removeAllListeners';
	var EE_LISTENERS = 'listeners';
	var EE_ON = 'on';
	var zoneAwareAddListener$1 = callAndReturnFirstParam(makeZoneAwareAddListener(EE_ADD_LISTENER, EE_REMOVE_LISTENER, false, true, false));
	var zoneAwarePrependListener = callAndReturnFirstParam(makeZoneAwareAddListener(EE_PREPEND_LISTENER, EE_REMOVE_LISTENER, false, true, true));
	var zoneAwareRemoveListener$1 = callAndReturnFirstParam(makeZoneAwareRemoveListener(EE_REMOVE_LISTENER, false));
	var zoneAwareRemoveAllListeners = callAndReturnFirstParam(makeZoneAwareRemoveAllListeners(EE_REMOVE_ALL_LISTENER, false));
	var zoneAwareListeners = makeZoneAwareListeners(EE_LISTENERS);
	function patchEventEmitterMethods(obj) {
		if (obj && obj.addListener) {
			patchMethod(obj, EE_ADD_LISTENER, function () { return zoneAwareAddListener$1; });
			patchMethod(obj, EE_PREPEND_LISTENER, function () { return zoneAwarePrependListener; });
			patchMethod(obj, EE_REMOVE_LISTENER, function () { return zoneAwareRemoveListener$1; });
			patchMethod(obj, EE_REMOVE_ALL_LISTENER, function () { return zoneAwareRemoveAllListeners; });
			patchMethod(obj, EE_LISTENERS, function () { return zoneAwareListeners; });
			obj[EE_ON] = obj[EE_ADD_LISTENER];
			return true;
		}
		else {
			return false;
		}
	}
	// EventEmitter
	var events;
	try {
		events = __webpack_require__(17);
	}
	catch (err) {
	}
	if (events && events.EventEmitter) {
		patchEventEmitterMethods(events.EventEmitter.prototype);
	}

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var fs;
	try {
		fs = __webpack_require__(2);
	}
	catch (err) {
	}
	// watch, watchFile, unwatchFile has been patched
	// because EventEmitter has been patched
	var TO_PATCH_MACROTASK_METHODS = [
		'access', 'appendFile', 'chmod', 'chown', 'close', 'exists', 'fchmod',
		'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes', 'lchmod',
		'lchown', 'link', 'lstat', 'mkdir', 'mkdtemp', 'open', 'read',
		'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir', 'stat',
		'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile',
	];
	if (fs) {
		TO_PATCH_MACROTASK_METHODS.filter(function (name) { return !!fs[name] && typeof fs[name] === 'function'; })
			.forEach(function (name) {
			patchMacroTask(fs, name, function (self, args) {
				return {
					name: 'fs.' + name,
					args: args,
					callbackIndex: args.length > 0 ? args.length - 1 : -1,
					target: self
				};
			});
		});
	}

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	function patchTimer(window, setName, cancelName, nameSuffix) {
		var setNative = null;
		var clearNative = null;
		setName += nameSuffix;
		cancelName += nameSuffix;
		var tasksByHandleId = {};
		function scheduleTask(task) {
			var data = task.data;
			data.args[0] = function () {
				task.invoke.apply(this, arguments);
				delete tasksByHandleId[data.handleId];
			};
			data.handleId = setNative.apply(window, data.args);
			tasksByHandleId[data.handleId] = task;
			return task;
		}
		function clearTask(task) {
			delete tasksByHandleId[task.data.handleId];
			return clearNative(task.data.handleId);
		}
		setNative =
			patchMethod(window, setName, function (delegate) { return function (self, args) {
				if (typeof args[0] === 'function') {
					var zone = Zone.current;
					var options = {
						handleId: null,
						isPeriodic: nameSuffix === 'Interval',
						delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
						args: args
					};
					var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
					if (!task) {
						return task;
					}
					// Node.js must additionally support the ref and unref functions.
					var handle = task.data.handleId;
					if (handle.ref && handle.unref) {
						task.ref = handle.ref.bind(handle);
						task.unref = handle.unref.bind(handle);
					}
					return task;
				}
				else {
					// cause an error by calling it directly.
					return delegate.apply(window, args);
				}
			}; });
		clearNative =
			patchMethod(window, cancelName, function (delegate) { return function (self, args) {
				var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
				if (task && typeof task.type === 'string') {
					if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {
						// Do not cancel already canceled functions
						task.zone.cancelTask(task);
					}
				}
				else {
					// cause an error by calling it directly.
					delegate.apply(window, args);
				}
			}; });
	}

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var set = 'set';
	var clear = 'clear';
	var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
	// Timers
	var timers = __webpack_require__(102);
	patchTimer(timers, set, clear, 'Timeout');
	patchTimer(timers, set, clear, 'Interval');
	patchTimer(timers, set, clear, 'Immediate');
	var shouldPatchGlobalTimers = global.setTimeout !== timers.setTimeout;
	if (shouldPatchGlobalTimers) {
		patchTimer(_global, set, clear, 'Timeout');
		patchTimer(_global, set, clear, 'Interval');
		patchTimer(_global, set, clear, 'Immediate');
	}
	patchNextTick();
	// Crypto
	var crypto;
	try {
		crypto = __webpack_require__(49);
	}
	catch (err) {
	}
	// TODO(gdi2290): implement a better way to patch these methods
	if (crypto) {
		var nativeRandomBytes_1 = crypto.randomBytes;
		crypto.randomBytes = function randomBytesZone(size, callback) {
			if (!callback) {
				return nativeRandomBytes_1(size);
			}
			else {
				var zone = Zone.current;
				var source = crypto.constructor.name + '.randomBytes';
				return nativeRandomBytes_1(size, zone.wrap(callback, source));
			}
		}.bind(crypto);
		var nativePbkdf2_1 = crypto.pbkdf2;
		crypto.pbkdf2 = function pbkdf2Zone() {
			var args = [];
			for (var _i = 0; _i < arguments.length; _i++) {
				args[_i] = arguments[_i];
			}
			var fn = args[args.length - 1];
			if (typeof fn === 'function') {
				var zone = Zone.current;
				var source = crypto.constructor.name + '.pbkdf2';
				args[args.length - 1] = zone.wrap(fn, source);
				return nativePbkdf2_1.apply(void 0, args);
			}
			else {
				return nativePbkdf2_1.apply(void 0, args);
			}
		}.bind(crypto);
	}
	// HTTP Client
	var httpClient;
	try {
		httpClient = __webpack_require__(103);
	}
	catch (err) {
	}
	if (httpClient && httpClient.ClientRequest) {
		var ClientRequest_1 = httpClient.ClientRequest.bind(httpClient);
		httpClient.ClientRequest = function (options, callback) {
			if (!callback) {
				return new ClientRequest_1(options);
			}
			else {
				var zone = Zone.current;
				return new ClientRequest_1(options, zone.wrap(callback, 'http.ClientRequest'));
			}
		};
	}
	function patchNextTick() {
		var setNative = null;
		function scheduleTask(task) {
			var args = task.data;
			args[0] = function () {
				task.invoke.apply(this, arguments);
			};
			setNative.apply(process, args);
			return task;
		}
		setNative =
			patchMethod(process, 'nextTick', function (delegate) { return function (self, args) {
				if (typeof args[0] === 'function') {
					var zone = Zone.current;
					var task = zone.scheduleMicroTask('nextTick', args[0], args, scheduleTask);
					return task;
				}
				else {
					// cause an error by calling it directly.
					return delegate.apply(process, args);
				}
			}; });
	}

	})));


	/***/ }),
	/* 102 */
	/***/ (function(module, exports) {

	module.exports = require("timers");

	/***/ }),
	/* 103 */
	/***/ (function(module, exports) {

	module.exports = require("_http_client");

	/***/ }),
	/* 104 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DiagChannel = __webpack_require__(81);
	var AutoCollectConsole = (function () {
		function AutoCollectConsole(client) {
			if (!!AutoCollectConsole.INSTANCE) {
				throw new Error("Console logging adapter tracking should be configured from the applicationInsights object");
			}
			this._client = client;
			AutoCollectConsole.INSTANCE = this;
		}
		AutoCollectConsole.prototype.enable = function (isEnabled, collectConsoleLog) {
			if (DiagChannel.IsInitialized) {
				__webpack_require__(105).enable(isEnabled && collectConsoleLog, this._client);
				__webpack_require__(129).enable(isEnabled, this._client);
				__webpack_require__(130).enable(isEnabled, this._client);
			}
		};
		AutoCollectConsole.prototype.isInitialized = function () {
			return this._isInitialized;
		};
		AutoCollectConsole.prototype.dispose = function () {
			AutoCollectConsole.INSTANCE = null;
			this.enable(false, false);
		};
		AutoCollectConsole._methodNames = ["debug", "info", "log", "warn", "error"];
		return AutoCollectConsole;
	}());
	module.exports = AutoCollectConsole;
	//# sourceMappingURL=Console.js.map

	/***/ }),
	/* 105 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(106);
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	var subscriber = function (event) {
		clients.forEach(function (client) {
			// Message can have a trailing newline
			var message = event.data.message;
			if (message.lastIndexOf("\n") == message.length - 1) {
				message = message.substring(0, message.length - 1);
			}
			client.trackTrace({ message: message, severity: (event.data.stderr ? Contracts_1.SeverityLevel.Warning : Contracts_1.SeverityLevel.Information) });
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("console", subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("console", subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=console.sub.js.map

	/***/ }),
	/* 106 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(107));
	__export(__webpack_require__(108));
	__export(__webpack_require__(127));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 107 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Generated_1 = __webpack_require__(108);
	var RemoteDependencyDataConstants = (function () {
		function RemoteDependencyDataConstants() {
		}
		RemoteDependencyDataConstants.TYPE_HTTP = "Http";
		RemoteDependencyDataConstants.TYPE_AI = "Http (tracked component)";
		return RemoteDependencyDataConstants;
	}());
	exports.RemoteDependencyDataConstants = RemoteDependencyDataConstants;
	function domainSupportsProperties(domain) {
		return "properties" in domain ||
			domain instanceof Generated_1.EventData ||
			domain instanceof Generated_1.ExceptionData ||
			domain instanceof Generated_1.MessageData ||
			domain instanceof Generated_1.MetricData ||
			domain instanceof Generated_1.PageViewData ||
			domain instanceof Generated_1.RemoteDependencyData ||
			domain instanceof Generated_1.RequestData;
	}
	exports.domainSupportsProperties = domainSupportsProperties;
	//# sourceMappingURL=Constants.js.map

	/***/ }),
	/* 108 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AvailabilityData = __webpack_require__(109);
	exports.Base = __webpack_require__(111);
	exports.ContextTagKeys = __webpack_require__(112);
	exports.Data = __webpack_require__(113);
	exports.DataPoint = __webpack_require__(114);
	exports.DataPointType = __webpack_require__(115);
	exports.Domain = __webpack_require__(110);
	exports.Envelope = __webpack_require__(116);
	exports.EventData = __webpack_require__(117);
	exports.ExceptionData = __webpack_require__(118);
	exports.ExceptionDetails = __webpack_require__(119);
	exports.MessageData = __webpack_require__(120);
	exports.MetricData = __webpack_require__(121);
	exports.PageViewData = __webpack_require__(122);
	exports.RemoteDependencyData = __webpack_require__(123);
	exports.RequestData = __webpack_require__(124);
	exports.SeverityLevel = __webpack_require__(125);
	exports.StackFrame = __webpack_require__(126);
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 109 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * Instances of AvailabilityData represent the result of executing an availability test.
	 */
	var AvailabilityData = (function (_super) {
		__extends(AvailabilityData, _super);
		function AvailabilityData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return AvailabilityData;
	}(Domain));
	module.exports = AvailabilityData;
	//# sourceMappingURL=AvailabilityData.js.map

	/***/ }),
	/* 110 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	/**
	 * The abstract common base of all domains.
	 */
	var Domain = (function () {
		function Domain() {
		}
		return Domain;
	}());
	module.exports = Domain;
	//# sourceMappingURL=Domain.js.map

	/***/ }),
	/* 111 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	/**
	 * Data struct to contain only C section with custom fields.
	 */
	var Base = (function () {
		function Base() {
		}
		return Base;
	}());
	module.exports = Base;
	//# sourceMappingURL=Base.js.map

	/***/ }),
	/* 112 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	var ContextTagKeys = (function () {
		function ContextTagKeys() {
			this.applicationVersion = "ai.application.ver";
			this.deviceId = "ai.device.id";
			this.deviceLocale = "ai.device.locale";
			this.deviceModel = "ai.device.model";
			this.deviceOEMName = "ai.device.oemName";
			this.deviceOSVersion = "ai.device.osVersion";
			this.deviceType = "ai.device.type";
			this.locationIp = "ai.location.ip";
			this.operationId = "ai.operation.id";
			this.operationName = "ai.operation.name";
			this.operationParentId = "ai.operation.parentId";
			this.operationSyntheticSource = "ai.operation.syntheticSource";
			this.operationCorrelationVector = "ai.operation.correlationVector";
			this.sessionId = "ai.session.id";
			this.sessionIsFirst = "ai.session.isFirst";
			this.userAccountId = "ai.user.accountId";
			this.userId = "ai.user.id";
			this.userAuthUserId = "ai.user.authUserId";
			this.cloudRole = "ai.cloud.role";
			this.cloudRoleInstance = "ai.cloud.roleInstance";
			this.internalSdkVersion = "ai.internal.sdkVersion";
			this.internalAgentVersion = "ai.internal.agentVersion";
			this.internalNodeName = "ai.internal.nodeName";
		}
		return ContextTagKeys;
	}());
	module.exports = ContextTagKeys;
	//# sourceMappingURL=ContextTagKeys.js.map

	/***/ }),
	/* 113 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Base = __webpack_require__(111);
	"use strict";
	/**
	 * Data struct to contain both B and C sections.
	 */
	var Data = (function (_super) {
		__extends(Data, _super);
		function Data() {
			return _super.call(this) || this;
		}
		return Data;
	}(Base));
	module.exports = Data;
	//# sourceMappingURL=Data.js.map

	/***/ }),
	/* 114 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// THIS FILE WAS AUTOGENERATED
	var DataPointType = __webpack_require__(115);
	"use strict";
	/**
	 * Metric data single measurement.
	 */
	var DataPoint = (function () {
		function DataPoint() {
			this.kind = DataPointType.Measurement;
		}
		return DataPoint;
	}());
	module.exports = DataPoint;
	//# sourceMappingURL=DataPoint.js.map

	/***/ }),
	/* 115 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	/**
	 * Type of the metric data measurement.
	 */
	var DataPointType;
	(function (DataPointType) {
		DataPointType[DataPointType["Measurement"] = 0] = "Measurement";
		DataPointType[DataPointType["Aggregation"] = 1] = "Aggregation";
	})(DataPointType || (DataPointType = {}));
	module.exports = DataPointType;
	//# sourceMappingURL=DataPointType.js.map

	/***/ }),
	/* 116 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * System variables for a telemetry item.
	 */
	var Envelope = (function () {
		function Envelope() {
			this.ver = 1;
			this.sampleRate = 100.0;
			this.tags = {};
		}
		return Envelope;
	}());
	module.exports = Envelope;
	//# sourceMappingURL=Envelope.js.map

	/***/ }),
	/* 117 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * Instances of Event represent structured event records that can be grouped and searched by their properties. Event data item also creates a metric of event count by name.
	 */
	var EventData = (function (_super) {
		__extends(EventData, _super);
		function EventData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return EventData;
	}(Domain));
	module.exports = EventData;
	//# sourceMappingURL=EventData.js.map

	/***/ }),
	/* 118 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * An instance of Exception represents a handled or unhandled exception that occurred during execution of the monitored application.
	 */
	var ExceptionData = (function (_super) {
		__extends(ExceptionData, _super);
		function ExceptionData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.exceptions = [];
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return ExceptionData;
	}(Domain));
	module.exports = ExceptionData;
	//# sourceMappingURL=ExceptionData.js.map

	/***/ }),
	/* 119 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Exception details of the exception in a chain.
	 */
	var ExceptionDetails = (function () {
		function ExceptionDetails() {
			this.hasFullStack = true;
			this.parsedStack = [];
		}
		return ExceptionDetails;
	}());
	module.exports = ExceptionDetails;
	//# sourceMappingURL=ExceptionDetails.js.map

	/***/ }),
	/* 120 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * Instances of Message represent printf-like trace statements that are text-searched. Log4Net, NLog and other text-based log file entries are translated into intances of this type. The message does not have measurements.
	 */
	var MessageData = (function (_super) {
		__extends(MessageData, _super);
		function MessageData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.properties = {};
			return _this;
		}
		return MessageData;
	}(Domain));
	module.exports = MessageData;
	//# sourceMappingURL=MessageData.js.map

	/***/ }),
	/* 121 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * An instance of the Metric item is a list of measurements (single data points) and/or aggregations.
	 */
	var MetricData = (function (_super) {
		__extends(MetricData, _super);
		function MetricData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.metrics = [];
			_this.properties = {};
			return _this;
		}
		return MetricData;
	}(Domain));
	module.exports = MetricData;
	//# sourceMappingURL=MetricData.js.map

	/***/ }),
	/* 122 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var EventData = __webpack_require__(117);
	"use strict";
	/**
	 * An instance of PageView represents a generic action on a page like a button click. It is also the base type for PageView.
	 */
	var PageViewData = (function (_super) {
		__extends(PageViewData, _super);
		function PageViewData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return PageViewData;
	}(EventData));
	module.exports = PageViewData;
	//# sourceMappingURL=PageViewData.js.map

	/***/ }),
	/* 123 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * An instance of Remote Dependency represents an interaction of the monitored component with a remote component/service like SQL or an HTTP endpoint.
	 */
	var RemoteDependencyData = (function (_super) {
		__extends(RemoteDependencyData, _super);
		function RemoteDependencyData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.success = true;
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return RemoteDependencyData;
	}(Domain));
	module.exports = RemoteDependencyData;
	//# sourceMappingURL=RemoteDependencyData.js.map

	/***/ }),
	/* 124 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	// THIS FILE WAS AUTOGENERATED
	var Domain = __webpack_require__(110);
	"use strict";
	/**
	 * An instance of Request represents completion of an external request to the application to do work and contains a summary of that request execution and the results.
	 */
	var RequestData = (function (_super) {
		__extends(RequestData, _super);
		function RequestData() {
			var _this = _super.call(this) || this;
			_this.ver = 2;
			_this.properties = {};
			_this.measurements = {};
			return _this;
		}
		return RequestData;
	}(Domain));
	module.exports = RequestData;
	//# sourceMappingURL=RequestData.js.map

	/***/ }),
	/* 125 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	/**
	 * Defines the level of severity for the event.
	 */
	var SeverityLevel;
	(function (SeverityLevel) {
		SeverityLevel[SeverityLevel["Verbose"] = 0] = "Verbose";
		SeverityLevel[SeverityLevel["Information"] = 1] = "Information";
		SeverityLevel[SeverityLevel["Warning"] = 2] = "Warning";
		SeverityLevel[SeverityLevel["Error"] = 3] = "Error";
		SeverityLevel[SeverityLevel["Critical"] = 4] = "Critical";
	})(SeverityLevel || (SeverityLevel = {}));
	module.exports = SeverityLevel;
	//# sourceMappingURL=SeverityLevel.js.map

	/***/ }),
	/* 126 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	/**
	 * Stack frame information.
	 */
	var StackFrame = (function () {
		function StackFrame() {
		}
		return StackFrame;
	}());
	module.exports = StackFrame;
	//# sourceMappingURL=StackFrame.js.map

	/***/ }),
	/* 127 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(128));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 128 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Converts the user-friendly enumeration TelemetryType to the underlying schema baseType value
	 * @param type Type to convert to BaseData string
	 */
	function telemetryTypeToBaseType(type) {
		switch (type) {
			case TelemetryType.Event:
				return "EventData";
			case TelemetryType.Exception:
				return "ExceptionData";
			case TelemetryType.Trace:
				return "MessageData";
			case TelemetryType.Metric:
				return "MetricData";
			case TelemetryType.Request:
				return "RequestData";
			case TelemetryType.Dependency:
				return "RemoteDependencyData";
		}
		return undefined;
	}
	exports.telemetryTypeToBaseType = telemetryTypeToBaseType;
	/**
	 * Converts the schema baseType value to the user-friendly enumeration TelemetryType
	 * @param baseType BaseData string to convert to TelemetryType
	 */
	function baseTypeToTelemetryType(baseType) {
		switch (baseType) {
			case "EventData":
				return TelemetryType.Event;
			case "ExceptionData":
				return TelemetryType.Exception;
			case "MessageData":
				return TelemetryType.Trace;
			case "MetricData":
				return TelemetryType.Metric;
			case "RequestData":
				return TelemetryType.Request;
			case "RemoteDependencyData":
				return TelemetryType.Dependency;
		}
		return undefined;
	}
	exports.baseTypeToTelemetryType = baseTypeToTelemetryType;
	/**
	 * Telemetry types supported by this SDK
	 */
	var TelemetryType;
	(function (TelemetryType) {
		TelemetryType[TelemetryType["Event"] = 0] = "Event";
		TelemetryType[TelemetryType["Exception"] = 1] = "Exception";
		TelemetryType[TelemetryType["Trace"] = 2] = "Trace";
		TelemetryType[TelemetryType["Metric"] = 3] = "Metric";
		TelemetryType[TelemetryType["Request"] = 4] = "Request";
		TelemetryType[TelemetryType["Dependency"] = 5] = "Dependency";
	})(TelemetryType = exports.TelemetryType || (exports.TelemetryType = {}));
	//# sourceMappingURL=TelemetryType.js.map

	/***/ }),
	/* 129 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(106);
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	// Mapping from bunyan levels defined at https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L256
	var bunyanToAILevelMap = {
		10: Contracts_1.SeverityLevel.Verbose,
		20: Contracts_1.SeverityLevel.Verbose,
		30: Contracts_1.SeverityLevel.Information,
		40: Contracts_1.SeverityLevel.Warning,
		50: Contracts_1.SeverityLevel.Error,
		60: Contracts_1.SeverityLevel.Critical,
	};
	var subscriber = function (event) {
		clients.forEach(function (client) {
			var AIlevel = bunyanToAILevelMap[event.data.level];
			client.trackTrace({ message: event.data.result, severity: AIlevel });
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("bunyan", subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("bunyan", subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=bunyan.sub.js.map

	/***/ }),
	/* 130 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(106);
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	var winstonToAILevelMap = {
		syslog: function (og) {
			var map = {
				emerg: Contracts_1.SeverityLevel.Critical,
				alert: Contracts_1.SeverityLevel.Critical,
				crit: Contracts_1.SeverityLevel.Critical,
				error: Contracts_1.SeverityLevel.Error,
				warning: Contracts_1.SeverityLevel.Warning,
				notice: Contracts_1.SeverityLevel.Information,
				info: Contracts_1.SeverityLevel.Information,
				debug: Contracts_1.SeverityLevel.Verbose
			};
			return map[og] === undefined ? Contracts_1.SeverityLevel.Information : map[og];
		},
		npm: function (og) {
			var map = {
				error: Contracts_1.SeverityLevel.Error,
				warn: Contracts_1.SeverityLevel.Warning,
				info: Contracts_1.SeverityLevel.Information,
				verbose: Contracts_1.SeverityLevel.Verbose,
				debug: Contracts_1.SeverityLevel.Verbose,
				silly: Contracts_1.SeverityLevel.Verbose
			};
			return map[og] === undefined ? Contracts_1.SeverityLevel.Information : map[og];
		},
		unknown: function (og) {
			return Contracts_1.SeverityLevel.Information;
		}
	};
	var subscriber = function (event) {
		clients.forEach(function (client) {
			var AIlevel = winstonToAILevelMap[event.data.levelKind](event.data.level);
			client.trackTrace({
				message: event.data.message,
				severity: AIlevel,
				properties: event.data.meta
			});
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("winston", subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("winston", subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=winston.sub.js.map

	/***/ }),
	/* 131 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var AutoCollectExceptions = (function () {
		function AutoCollectExceptions(client) {
			if (!!AutoCollectExceptions.INSTANCE) {
				throw new Error("Exception tracking should be configured from the applicationInsights object");
			}
			AutoCollectExceptions.INSTANCE = this;
			this._client = client;
		}
		Object.defineProperty(AutoCollectExceptions, "UNCAUGHT_EXCEPTION_HANDLER_NAME", {
			get: function () { return "uncaughtException"; },
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(AutoCollectExceptions, "UNHANDLED_REJECTION_HANDLER_NAME", {
			get: function () { return "unhandledRejection"; },
			enumerable: true,
			configurable: true
		});
		AutoCollectExceptions.prototype.isInitialized = function () {
			return this._isInitialized;
		};
		AutoCollectExceptions.prototype.enable = function (isEnabled) {
			var _this = this;
			if (isEnabled) {
				this._isInitialized = true;
				var self = this;
				if (!this._exceptionListenerHandle) {
					var handle = function (reThrow, error) {
						_this._client.trackException({ exception: error });
						_this._client.flush({ isAppCrashing: true });
						if (reThrow) {
							var THIS_IS_APPLICATION_INSIGHTS_RETHROWING_YOUR_EXCEPTION = error;
							throw THIS_IS_APPLICATION_INSIGHTS_RETHROWING_YOUR_EXCEPTION; // Error originated somewhere else in your app
						}
					};
					this._exceptionListenerHandle = handle.bind(this, true);
					this._rejectionListenerHandle = handle.bind(this, false);
					process.on(AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
					process.on(AutoCollectExceptions.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
				}
			}
			else {
				if (this._exceptionListenerHandle) {
					process.removeListener(AutoCollectExceptions.UNCAUGHT_EXCEPTION_HANDLER_NAME, this._exceptionListenerHandle);
					process.removeListener(AutoCollectExceptions.UNHANDLED_REJECTION_HANDLER_NAME, this._rejectionListenerHandle);
					this._exceptionListenerHandle = undefined;
					this._rejectionListenerHandle = undefined;
					delete this._exceptionListenerHandle;
					delete this._rejectionListenerHandle;
				}
			}
		};
		AutoCollectExceptions.prototype.dispose = function () {
			AutoCollectExceptions.INSTANCE = null;
			this.enable(false);
			this._isInitialized = false;
		};
		AutoCollectExceptions.INSTANCE = null;
		return AutoCollectExceptions;
	}());
	module.exports = AutoCollectExceptions;
	//# sourceMappingURL=Exceptions.js.map

	/***/ }),
	/* 132 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var os = __webpack_require__(48);
	var Logging = __webpack_require__(80);
	var AutoCollectPerformance = (function () {
		function AutoCollectPerformance(client) {
			if (!!AutoCollectPerformance.INSTANCE) {
				throw new Error("Performance tracking should be configured from the applicationInsights object");
			}
			AutoCollectPerformance.INSTANCE = this;
			this._isInitialized = false;
			this._client = client;
		}
		AutoCollectPerformance.prototype.enable = function (isEnabled) {
			var _this = this;
			this._isEnabled = isEnabled;
			if (this._isEnabled && !this._isInitialized) {
				this._isInitialized = true;
			}
			if (isEnabled) {
				if (!this._handle) {
					this._lastCpus = os.cpus();
					this._lastRequests = {
						totalRequestCount: AutoCollectPerformance._totalRequestCount,
						totalFailedRequestCount: AutoCollectPerformance._totalFailedRequestCount,
						time: +new Date
					};
					if (typeof process.cpuUsage === 'function') {
						this._lastAppCpuUsage = process.cpuUsage();
					}
					this._lastHrtime = process.hrtime();
					this._handle = setInterval(function () { return _this.trackPerformance(); }, 60000);
					this._handle.unref(); // Allow the app to terminate even while this loop is going on
				}
			}
			else {
				if (this._handle) {
					clearInterval(this._handle);
					this._handle = undefined;
				}
			}
		};
		AutoCollectPerformance.countRequest = function (request, response) {
			var _this = this;
			if (!AutoCollectPerformance.isEnabled()) {
				return;
			}
			var start = +new Date;
			if (!request || !response) {
				Logging.warn("AutoCollectPerformance.countRequest was called with invalid parameters: ", !!request, !!response);
				return;
			}
			// response listeners
			if (typeof response.once === "function") {
				response.once("finish", function () {
					var end = +new Date;
					_this._lastRequestExecutionTime = end - start;
					AutoCollectPerformance._totalRequestCount++;
					if (response.statusCode >= 400) {
						AutoCollectPerformance._totalFailedRequestCount++;
					}
				});
			}
		};
		AutoCollectPerformance.prototype.isInitialized = function () {
			return this._isInitialized;
		};
		AutoCollectPerformance.isEnabled = function () {
			return AutoCollectPerformance.INSTANCE && AutoCollectPerformance.INSTANCE._isEnabled;
		};
		AutoCollectPerformance.prototype.trackPerformance = function () {
			this._trackCpu();
			this._trackMemory();
			this._trackNetwork();
		};
		AutoCollectPerformance.prototype._trackCpu = function () {
			// this reports total ms spent in each category since the OS was booted, to calculate percent it is necessary
			// to find the delta since the last measurement
			var cpus = os.cpus();
			if (cpus && cpus.length && this._lastCpus && cpus.length === this._lastCpus.length) {
				var totalUser = 0;
				var totalSys = 0;
				var totalNice = 0;
				var totalIdle = 0;
				var totalIrq = 0;
				for (var i = 0; !!cpus && i < cpus.length; i++) {
					var cpu = cpus[i];
					var lastCpu = this._lastCpus[i];
					var name = "% cpu(" + i + ") ";
					var model = cpu.model;
					var speed = cpu.speed;
					var times = cpu.times;
					var lastTimes = lastCpu.times;
					// user cpu time (or) % CPU time spent in user space
					var user = (times.user - lastTimes.user) || 0;
					totalUser += user;
					// system cpu time (or) % CPU time spent in kernel space
					var sys = (times.sys - lastTimes.sys) || 0;
					totalSys += sys;
					// user nice cpu time (or) % CPU time spent on low priority processes
					var nice = (times.nice - lastTimes.nice) || 0;
					totalNice += nice;
					// idle cpu time (or) % CPU time spent idle
					var idle = (times.idle - lastTimes.idle) || 0;
					totalIdle += idle;
					// irq (or) % CPU time spent servicing/handling hardware interrupts
					var irq = (times.irq - lastTimes.irq) || 0;
					totalIrq += irq;
				}
				// Calculate % of total cpu time (user + system) this App Process used (Only supported by node v6.1.0+)
				var appCpuPercent = undefined;
				if (typeof process.cpuUsage === 'function') {
					var appCpuUsage = process.cpuUsage();
					var hrtime = process.hrtime();
					var totalApp = ((appCpuUsage.user - this._lastAppCpuUsage.user) + (appCpuUsage.system - this._lastAppCpuUsage.system)) || 0;
					if (typeof this._lastHrtime !== 'undefined' && this._lastHrtime.length === 2) {
						var elapsedTime = ((hrtime[0] - this._lastHrtime[0]) * 1e6 + (hrtime[1] - this._lastHrtime[1]) / 1e3) || 0; // convert to microseconds
						appCpuPercent = 100 * totalApp / (elapsedTime * cpus.length);
					}
					// Set previous
					this._lastAppCpuUsage = appCpuUsage;
					this._lastHrtime = hrtime;
				}
				var combinedTotal = (totalUser + totalSys + totalNice + totalIdle + totalIrq) || 1;
				this._client.trackMetric({ name: "\\Processor(_Total)\\% Processor Time", value: ((combinedTotal - totalIdle) / combinedTotal) * 100 });
				this._client.trackMetric({ name: "\\Process(??APP_WIN32_PROC??)\\% Processor Time", value: appCpuPercent || ((totalUser / combinedTotal) * 100) });
			}
			this._lastCpus = cpus;
		};
		AutoCollectPerformance.prototype._trackMemory = function () {
			var freeMem = os.freemem();
			var usedMem = process.memoryUsage().rss;
			this._client.trackMetric({ name: "\\Process(??APP_WIN32_PROC??)\\Private Bytes", value: usedMem });
			this._client.trackMetric({ name: "\\Memory\\Available Bytes", value: freeMem });
		};
		AutoCollectPerformance.prototype._trackNetwork = function () {
			// track total request counters
			var lastRequests = this._lastRequests;
			var requests = {
				totalRequestCount: AutoCollectPerformance._totalRequestCount,
				totalFailedRequestCount: AutoCollectPerformance._totalFailedRequestCount,
				time: +new Date
			};
			var intervalRequests = (requests.totalRequestCount - lastRequests.totalRequestCount) || 0;
			var intervalFailedRequests = (requests.totalFailedRequestCount - lastRequests.totalFailedRequestCount) || 0;
			var elapsedMs = requests.time - lastRequests.time;
			var elapsedSeconds = elapsedMs / 1000;
			if (elapsedMs > 0) {
				var requestsPerSec = intervalRequests / elapsedSeconds;
				var failedRequestsPerSec = intervalFailedRequests / elapsedSeconds;
				this._client.trackMetric({ name: "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Requests/Sec", value: requestsPerSec });
				this._client.trackMetric({ name: "\\ASP.NET Applications(??APP_W3SVC_PROC??)\\Request Execution Time", value: AutoCollectPerformance._lastRequestExecutionTime });
			}
			this._lastRequests = requests;
		};
		AutoCollectPerformance.prototype.dispose = function () {
			AutoCollectPerformance.INSTANCE = null;
			this.enable(false);
			this._isInitialized = false;
		};
		AutoCollectPerformance._totalRequestCount = 0;
		AutoCollectPerformance._totalFailedRequestCount = 0;
		AutoCollectPerformance._lastRequestExecutionTime = 0;
		return AutoCollectPerformance;
	}());
	module.exports = AutoCollectPerformance;
	//# sourceMappingURL=Performance.js.map

	/***/ }),
	/* 133 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var http = __webpack_require__(7);
	var https = __webpack_require__(6);
	var Logging = __webpack_require__(80);
	var Util = __webpack_require__(134);
	var RequestResponseHeaders = __webpack_require__(136);
	var HttpDependencyParser = __webpack_require__(137);
	var CorrelationContextManager_1 = __webpack_require__(79);
	var DiagChannel = __webpack_require__(81);
	var AutoCollectHttpDependencies = (function () {
		function AutoCollectHttpDependencies(client) {
			if (!!AutoCollectHttpDependencies.INSTANCE) {
				throw new Error("Client request tracking should be configured from the applicationInsights object");
			}
			AutoCollectHttpDependencies.INSTANCE = this;
			this._client = client;
		}
		AutoCollectHttpDependencies.prototype.enable = function (isEnabled) {
			this._isEnabled = isEnabled;
			if (this._isEnabled && !this._isInitialized) {
				this._initialize();
			}
			if (DiagChannel.IsInitialized) {
				__webpack_require__(140).enable(isEnabled, this._client);
				__webpack_require__(141).enable(isEnabled, this._client);
				__webpack_require__(142).enable(isEnabled, this._client);
				__webpack_require__(143).enable(isEnabled, this._client);
			}
		};
		AutoCollectHttpDependencies.prototype.isInitialized = function () {
			return this._isInitialized;
		};
		AutoCollectHttpDependencies.prototype._initialize = function () {
			var _this = this;
			this._isInitialized = true;
			var originalGet = http.get;
			var originalRequest = http.request;
			var originalHttpsRequest = https.request;
			var clientRequestPatch = function (request, options) {
				var shouldCollect = !options[AutoCollectHttpDependencies.disableCollectionRequestOption] &&
					!request[AutoCollectHttpDependencies.alreadyAutoCollectedFlag];
				request[AutoCollectHttpDependencies.alreadyAutoCollectedFlag] = true;
				if (request && options && shouldCollect) {
					AutoCollectHttpDependencies.trackRequest(_this._client, { options: options, request: request });
				}
			};
			// On node >= v0.11.12 and < 9.0 (excluding 8.9.0) https.request just calls http.request (with additional options).
			// On node < 0.11.12, 8.9.0, and 9.0 > https.request is handled separately
			// Patch both and leave a flag to not double-count on versions that just call through
			// We add the flag to both http and https to protect against strange double collection in other scenarios
			http.request = function (options) {
				var requestArgs = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					requestArgs[_i - 1] = arguments[_i];
				}
				var request = originalRequest.call.apply(originalRequest, [http, options].concat(requestArgs));
				clientRequestPatch(request, options);
				return request;
			};
			https.request = function (options) {
				var requestArgs = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					requestArgs[_i - 1] = arguments[_i];
				}
				var request = originalHttpsRequest.call.apply(originalHttpsRequest, [https, options].concat(requestArgs));
				clientRequestPatch(request, options);
				return request;
			};
			// Node 8 calls http.request from http.get using a local reference!
			// We have to patch .get manually in this case and can't just assume request is enough
			// We have to replace the entire method in this case. We can't call the original.
			// This is because calling the original will give us no chance to set headers as it internally does .end().
			http.get = function (options) {
				var requestArgs = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					requestArgs[_i - 1] = arguments[_i];
				}
				var request = (_a = http.request).call.apply(_a, [http, options].concat(requestArgs));
				request.end();
				return request;
				var _a;
			};
			https.get = function (options) {
				var requestArgs = [];
				for (var _i = 1; _i < arguments.length; _i++) {
					requestArgs[_i - 1] = arguments[_i];
				}
				var request = (_a = https.request).call.apply(_a, [https, options].concat(requestArgs));
				request.end();
				return request;
				var _a;
			};
		};
		/**
		 * Tracks an outgoing request. Because it may set headers this method must be called before
		 * writing content to or ending the request.
		 */
		AutoCollectHttpDependencies.trackRequest = function (client, telemetry) {
			if (!telemetry.options || !telemetry.request || !client) {
				Logging.info("AutoCollectHttpDependencies.trackRequest was called with invalid parameters: ", !telemetry.options, !telemetry.request, !client);
				return;
			}
			var requestParser = new HttpDependencyParser(telemetry.options, telemetry.request);
			var currentContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
			var uniqueRequestId = currentContext && currentContext.operation && (currentContext.operation.parentId + AutoCollectHttpDependencies.requestNumber++ + '.');
			// Add the source correlationId to the request headers, if a value was not already provided.
			// The getHeader/setHeader methods aren't available on very old Node versions, and
			// are not included in the v0.10 type declarations currently used. So check if the
			// methods exist before invoking them.
			if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl()) && telemetry.request.getHeader && telemetry.request.setHeader) {
				if (client.config && client.config.correlationId) {
					var correlationHeader = telemetry.request.getHeader(RequestResponseHeaders.requestContextHeader);
					if (correlationHeader) {
						var components = correlationHeader.split(",");
						var key_1 = RequestResponseHeaders.requestContextSourceKey + "=";
						if (!components.some(function (value) { return value.substring(0, key_1.length) === key_1; })) {
							telemetry.request.setHeader(RequestResponseHeaders.requestContextHeader, correlationHeader + "," + RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
						}
					}
					else {
						telemetry.request.setHeader(RequestResponseHeaders.requestContextHeader, RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
					}
				}
				if (currentContext && currentContext.operation) {
					telemetry.request.setHeader(RequestResponseHeaders.requestIdHeader, uniqueRequestId);
					// Also set legacy headers
					telemetry.request.setHeader(RequestResponseHeaders.parentIdHeader, currentContext.operation.id);
					telemetry.request.setHeader(RequestResponseHeaders.rootIdHeader, uniqueRequestId);
					var correlationContextHeader = currentContext.customProperties.serializeToHeader();
					if (correlationContextHeader) {
						telemetry.request.setHeader(RequestResponseHeaders.correlationContextHeader, correlationContextHeader);
					}
				}
			}
			// Collect dependency telemetry about the request when it finishes.
			if (telemetry.request.on) {
				telemetry.request.on('response', function (response) {
					requestParser.onResponse(response);
					var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
					dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
					dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
					dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
					dependencyTelemetry.contextObjects["http.ClientResponse"] = response;
					client.trackDependency(dependencyTelemetry);
				});
				telemetry.request.on('error', function (e) {
					requestParser.onError(e);
					var dependencyTelemetry = requestParser.getDependencyTelemetry(telemetry, uniqueRequestId);
					dependencyTelemetry.contextObjects = dependencyTelemetry.contextObjects || {};
					dependencyTelemetry.contextObjects["http.RequestOptions"] = telemetry.options;
					dependencyTelemetry.contextObjects["http.ClientRequest"] = telemetry.request;
					dependencyTelemetry.contextObjects["Error"] = e;
					client.trackDependency(dependencyTelemetry);
				});
			}
		};
		AutoCollectHttpDependencies.prototype.dispose = function () {
			AutoCollectHttpDependencies.INSTANCE = null;
			this.enable(false);
			this._isInitialized = false;
		};
		AutoCollectHttpDependencies.disableCollectionRequestOption = 'disableAppInsightsAutoCollection';
		AutoCollectHttpDependencies.requestNumber = 1;
		AutoCollectHttpDependencies.alreadyAutoCollectedFlag = '_appInsightsAutoCollected';
		return AutoCollectHttpDependencies;
	}());
	module.exports = AutoCollectHttpDependencies;
	//# sourceMappingURL=HttpDependencies.js.map

	/***/ }),
	/* 134 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __assign = (this && this.__assign) || Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
				t[p] = s[p];
		}
		return t;
	};
	var http = __webpack_require__(7);
	var https = __webpack_require__(6);
	var url = __webpack_require__(5);
	var constants = __webpack_require__(135);
	var Logging = __webpack_require__(80);
	var RequestResponseHeaders = __webpack_require__(136);
	var Util = (function () {
		function Util() {
		}
		/**
		 * helper method to access userId and sessionId cookie
		 */
		Util.getCookie = function (name, cookie) {
			var value = "";
			if (name && name.length && typeof cookie === "string") {
				var cookieName = name + "=";
				var cookies = cookie.split(";");
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i];
					cookie = Util.trim(cookie);
					if (cookie && cookie.indexOf(cookieName) === 0) {
						value = cookie.substring(cookieName.length, cookies[i].length);
						break;
					}
				}
			}
			return value;
		};
		/**
		 * helper method to trim strings (IE8 does not implement String.prototype.trim)
		 */
		Util.trim = function (str) {
			if (typeof str === "string") {
				return str.replace(/^\s+|\s+$/g, "");
			}
			else {
				return "";
			}
		};
		/**
		 * Convert an array of int32 to Base64 (no '==' at the end).
		 * MSB first.
		 */
		Util.int32ArrayToBase64 = function (array) {
			var toChar = function (v, i) {
				return String.fromCharCode((v >> i) & 0xFF);
			};
			var int32AsString = function (v) {
				return toChar(v, 24) + toChar(v, 16) + toChar(v, 8) + toChar(v, 0);
			};
			var x = array.map(int32AsString).join("");
			var b = Buffer.from ? Buffer.from(x, "binary") : new Buffer(x, "binary");
			var s = b.toString("base64");
			return s.substr(0, s.indexOf("="));
		};
		/**
		 * generate a random 32bit number (-0x80000000..0x7FFFFFFF).
		 */
		Util.random32 = function () {
			return (0x100000000 * Math.random()) | 0;
		};
		/**
		 * generate a random 32bit number (0x00000000..0xFFFFFFFF).
		 */
		Util.randomu32 = function () {
			return Util.random32() + 0x80000000;
		};
		/**
		 * generate W3C-compatible trace id
		 * https://github.com/w3c/distributed-tracing/blob/master/trace_context/HTTP_HEADER_FORMAT.md#trace-id
		 */
		Util.w3cTraceId = function () {
			var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
			// rfc4122 version 4 UUID without dashes and with lowercase letters
			var oct = "", tmp;
			for (var a = 0; a < 4; a++) {
				tmp = Util.random32();
				oct +=
					hexValues[tmp & 0xF] +
						hexValues[tmp >> 4 & 0xF] +
						hexValues[tmp >> 8 & 0xF] +
						hexValues[tmp >> 12 & 0xF] +
						hexValues[tmp >> 16 & 0xF] +
						hexValues[tmp >> 20 & 0xF] +
						hexValues[tmp >> 24 & 0xF] +
						hexValues[tmp >> 28 & 0xF];
			}
			// "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
			var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
			return oct.substr(0, 8) + oct.substr(9, 4) + "4" + oct.substr(13, 3) + clockSequenceHi + oct.substr(16, 3) + oct.substr(19, 12);
		};
		/**
		 * Check if an object is of type Array
		 */
		Util.isArray = function (obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		};
		/**
		 * Check if an object is of type Error
		 */
		Util.isError = function (obj) {
			return obj instanceof Error;
		};
		Util.isPrimitive = function (input) {
			var propType = typeof input;
			return propType === "string" || propType === "number" || propType === "boolean";
		};
		/**
		 * Check if an object is of type Date
		 */
		Util.isDate = function (obj) {
			return Object.prototype.toString.call(obj) === "[object Date]";
		};
		/**
		 * Convert ms to c# time span format
		 */
		Util.msToTimeSpan = function (totalms) {
			if (isNaN(totalms) || totalms < 0) {
				totalms = 0;
			}
			var sec = ((totalms / 1000) % 60).toFixed(7).replace(/0{0,4}$/, "");
			var min = "" + Math.floor(totalms / (1000 * 60)) % 60;
			var hour = "" + Math.floor(totalms / (1000 * 60 * 60)) % 24;
			var days = Math.floor(totalms / (1000 * 60 * 60 * 24));
			sec = sec.indexOf(".") < 2 ? "0" + sec : sec;
			min = min.length < 2 ? "0" + min : min;
			hour = hour.length < 2 ? "0" + hour : hour;
			var daysText = days > 0 ? days + "." : "";
			return daysText + hour + ":" + min + ":" + sec;
		};
		/**
		 * Using JSON.stringify, by default Errors do not serialize to something useful:
		 * Simplify a generic Node Error into a simpler map for customDimensions
		 * Custom errors can still implement toJSON to override this functionality
		 */
		Util.extractError = function (err) {
			// Error is often subclassed so may have code OR id properties:
			// https://nodejs.org/api/errors.html#errors_error_code
			var looseError = err;
			return {
				message: err.message,
				code: looseError.code || looseError.id || "",
			};
		};
		/**
		 * Manually call toJSON if available to pre-convert the value.
		 * If a primitive is returned, then the consumer of this function can skip JSON.stringify.
		 * This avoids double escaping of quotes for Date objects, for example.
		 */
		Util.extractObject = function (origProperty) {
			if (origProperty instanceof Error) {
				return Util.extractError(origProperty);
			}
			if (typeof origProperty.toJSON === "function") {
				return origProperty.toJSON();
			}
			return origProperty;
		};
		/**
		 * Validate that an object is of type { [key: string]: string }
		 */
		Util.validateStringMap = function (obj) {
			if (typeof obj !== "object") {
				Logging.info("Invalid properties dropped from payload");
				return;
			}
			var map = {};
			for (var field in obj) {
				var property = '';
				var origProperty = obj[field];
				var propType = typeof origProperty;
				if (Util.isPrimitive(origProperty)) {
					property = origProperty.toString();
				}
				else if (origProperty === null || propType === "undefined") {
					property = "";
				}
				else if (propType === "function") {
					Logging.info("key: " + field + " was function; will not serialize");
					continue;
				}
				else {
					var stringTarget = Util.isArray(origProperty) ? origProperty : Util.extractObject(origProperty);
					try {
						if (Util.isPrimitive(stringTarget)) {
							property = stringTarget;
						}
						else {
							property = JSON.stringify(stringTarget);
						}
					}
					catch (e) {
						property = origProperty.constructor.name.toString() + " (Error: " + e.message + ")";
						Logging.info("key: " + field + ", could not be serialized");
					}
				}
				map[field] = property.substring(0, Util.MAX_PROPERTY_LENGTH);
			}
			return map;
		};
		/**
		 * Checks if a request url is not on a excluded domain list
		 * and if it is safe to add correlation headers
		 */
		Util.canIncludeCorrelationHeader = function (client, requestUrl) {
			var excludedDomains = client && client.config && client.config.correlationHeaderExcludedDomains;
			if (!excludedDomains || excludedDomains.length == 0 || !requestUrl) {
				return true;
			}
			for (var i = 0; i < excludedDomains.length; i++) {
				var regex = new RegExp(excludedDomains[i].replace(/\./g, "\.").replace(/\*/g, ".*"));
				if (regex.test(url.parse(requestUrl).hostname)) {
					return false;
				}
			}
			return true;
		};
		Util.getCorrelationContextTarget = function (response, key) {
			var contextHeaders = response.headers && response.headers[RequestResponseHeaders.requestContextHeader];
			if (contextHeaders) {
				var keyValues = contextHeaders.split(",");
				for (var i = 0; i < keyValues.length; ++i) {
					var keyValue = keyValues[i].split("=");
					if (keyValue.length == 2 && keyValue[0] == key) {
						return keyValue[1];
					}
				}
			}
		};
		/**
		 * Generate request
		 *
		 * Proxify the request creation to handle proxy http
		 *
		 * @param {string} requestUrl url endpoint
		 * @param {Object} requestOptions Request option
		 * @param {Function} requestCallback callback on request
		 * @returns {http.ClientRequest} request object
		 */
		Util.makeRequest = function (config, requestUrl, requestOptions, requestCallback) {
			if (requestUrl && requestUrl.indexOf('//') === 0) {
				requestUrl = 'https:' + requestUrl;
			}
			var requestUrlParsed = url.parse(requestUrl);
			var options = __assign({}, requestOptions, { host: requestUrlParsed.hostname, port: requestUrlParsed.port, path: requestUrlParsed.pathname });
			var proxyUrl = undefined;
			if (requestUrlParsed.protocol === 'https:') {
				proxyUrl = config.proxyHttpsUrl || undefined;
			}
			if (requestUrlParsed.protocol === 'http:') {
				proxyUrl = config.proxyHttpUrl || undefined;
			}
			if (proxyUrl) {
				if (proxyUrl.indexOf('//') === 0) {
					proxyUrl = 'http:' + proxyUrl;
				}
				var proxyUrlParsed = url.parse(proxyUrl);
				// https is not supported at the moment
				if (proxyUrlParsed.protocol === 'https:') {
					Logging.info("Proxies that use HTTPS are not supported");
					proxyUrl = undefined;
				}
				else {
					options = __assign({}, options, { host: proxyUrlParsed.hostname, port: proxyUrlParsed.port || "80", path: requestUrl, headers: __assign({}, options.headers, { Host: requestUrlParsed.hostname }) });
				}
			}
			var isHttps = requestUrlParsed.protocol === 'https:' && !proxyUrl;
			if (isHttps && config.httpsAgent !== undefined) {
				options.agent = config.httpsAgent;
			}
			else if (!isHttps && config.httpAgent !== undefined) {
				options.agent = config.httpAgent;
			}
			else if (isHttps) {
				// HTTPS without a passed in agent. Use one that enforces our TLS rules
				options.agent = Util.tlsRestrictedAgent;
			}
			if (isHttps) {
				return https.request(options, requestCallback);
			}
			else {
				return http.request(options, requestCallback);
			}
		};
		;
		Util.MAX_PROPERTY_LENGTH = 8192;
		Util.tlsRestrictedAgent = new https.Agent({
			secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3 |
				constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
		});
		return Util;
	}());
	module.exports = Util;
	//# sourceMappingURL=Util.js.map

	/***/ }),
	/* 135 */
	/***/ (function(module, exports) {

	module.exports = require("constants");

	/***/ }),
	/* 136 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
		/**
		 * Request-Context header
		 */
		requestContextHeader: "request-context",
		/**
		 * Source instrumentation header that is added by an application while making http
		 * requests and retrieved by the other application when processing incoming requests.
		 */
		requestContextSourceKey: "appId",
		/**
		 * Target instrumentation header that is added to the response and retrieved by the
		 * calling application when processing incoming responses.
		 */
		requestContextTargetKey: "appId",
		/**
		 * Request-Id header
		 */
		requestIdHeader: "request-id",
		/**
		 * Legacy Header containing the id of the immidiate caller
		 */
		parentIdHeader: "x-ms-request-id",
		/**
		 * Legacy Header containing the correlation id that kept the same for every telemetry item
		 * accross transactions
		 */
		rootIdHeader: "x-ms-request-root-id",
		/**
		 * Correlation-Context header
		 *
		 * Not currently actively used, but the contents should be passed from incoming to outgoing requests
		 */
		correlationContextHeader: "correlation-context"
	};
	//# sourceMappingURL=RequestResponseHeaders.js.map

	/***/ }),
	/* 137 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	var url = __webpack_require__(5);
	var Contracts = __webpack_require__(106);
	var Util = __webpack_require__(134);
	var RequestResponseHeaders = __webpack_require__(136);
	var RequestParser = __webpack_require__(138);
	var CorrelationIdManager = __webpack_require__(139);
	/**
	 * Helper class to read data from the requst/response objects and convert them into the telemetry contract
	 */
	var HttpDependencyParser = (function (_super) {
		__extends(HttpDependencyParser, _super);
		function HttpDependencyParser(requestOptions, request) {
			var _this = _super.call(this) || this;
			if (request && request.method && requestOptions) {
				// The ClientRequest.method property isn't documented, but is always there.
				_this.method = request.method;
				_this.url = HttpDependencyParser._getUrlFromRequestOptions(requestOptions, request);
				_this.startTime = +new Date();
			}
			return _this;
		}
		/**
		 * Called when the ClientRequest emits an error event.
		 */
		HttpDependencyParser.prototype.onError = function (error) {
			this._setStatus(undefined, error);
		};
		/**
		 * Called when the ClientRequest emits a response event.
		 */
		HttpDependencyParser.prototype.onResponse = function (response) {
			this._setStatus(response.statusCode, undefined);
			this.correlationId = Util.getCorrelationContextTarget(response, RequestResponseHeaders.requestContextTargetKey);
		};
		/**
		 * Gets a dependency data contract object for a completed ClientRequest.
		 */
		HttpDependencyParser.prototype.getDependencyTelemetry = function (baseTelemetry, dependencyId) {
			var urlObject = url.parse(this.url);
			urlObject.search = undefined;
			urlObject.hash = undefined;
			var dependencyName = this.method.toUpperCase() + " " + urlObject.pathname;
			var remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
			var remoteDependencyTarget = urlObject.hostname;
			if (this.correlationId) {
				remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_AI;
				if (this.correlationId !== CorrelationIdManager.correlationIdPrefix) {
					remoteDependencyTarget = urlObject.hostname + " | " + this.correlationId;
				}
			}
			else {
				remoteDependencyType = Contracts.RemoteDependencyDataConstants.TYPE_HTTP;
			}
			var dependencyTelemetry = {
				id: dependencyId,
				name: dependencyName,
				data: this.url,
				duration: this.duration,
				success: this._isSuccess(),
				resultCode: this.statusCode ? this.statusCode.toString() : null,
				properties: this.properties || {},
				dependencyTypeName: remoteDependencyType,
				target: remoteDependencyTarget
			};
			// We should keep any parameters the user passed in
			// Except the fields defined above in requestTelemetry, which take priority
			// Except the properties field, where they're merged instead, with baseTelemetry taking priority
			if (baseTelemetry) {
				// Copy missing fields
				for (var key in baseTelemetry) {
					if (!dependencyTelemetry[key]) {
						dependencyTelemetry[key] = baseTelemetry[key];
					}
				}
				// Merge properties
				if (baseTelemetry.properties) {
					for (var key in baseTelemetry.properties) {
						dependencyTelemetry.properties[key] = baseTelemetry.properties[key];
					}
				}
			}
			return dependencyTelemetry;
		};
		/**
		 * Builds a URL from request options, using the same logic as http.request(). This is
		 * necessary because a ClientRequest object does not expose a url property.
		 */
		HttpDependencyParser._getUrlFromRequestOptions = function (options, request) {
			if (typeof options === 'string') {
				options = url.parse(options);
			}
			else {
				// Avoid modifying the original options object.
				var originalOptions_1 = options;
				options = {};
				if (originalOptions_1) {
					Object.keys(originalOptions_1).forEach(function (key) {
						options[key] = originalOptions_1[key];
					});
				}
			}
			// Oddly, url.format ignores path and only uses pathname and search,
			// so create them from the path, if path was specified
			if (options.path) {
				var parsedQuery = url.parse(options.path);
				options.pathname = parsedQuery.pathname;
				options.search = parsedQuery.search;
			}
			// Simiarly, url.format ignores hostname and port if host is specified,
			// even if host doesn't have the port, but http.request does not work
			// this way. It will use the port if one is not specified in host,
			// effectively treating host as hostname, but will use the port specified
			// in host if it exists.
			if (options.host && options.port) {
				// Force a protocol so it will parse the host as the host, not path.
				// It is discarded and not used, so it doesn't matter if it doesn't match
				var parsedHost = url.parse("http://" + options.host);
				if (!parsedHost.port && options.port) {
					options.hostname = options.host;
					delete options.host;
				}
			}
			// Mix in default values used by http.request and others
			options.protocol = options.protocol || (request.agent && request.agent.protocol) || undefined;
			options.hostname = options.hostname || 'localhost';
			return url.format(options);
		};
		return HttpDependencyParser;
	}(RequestParser));
	module.exports = HttpDependencyParser;
	//# sourceMappingURL=HttpDependencyParser.js.map

	/***/ }),
	/* 138 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Base class for helpers that read data from HTTP requst/response objects and convert them
	 * into the telemetry contract objects.
	 */
	var RequestParser = (function () {
		function RequestParser() {
		}
		/**
		 * Gets a url parsed out from request options
		 */
		RequestParser.prototype.getUrl = function () {
			return this.url;
		};
		RequestParser.prototype.RequestParser = function () {
			this.startTime = +new Date();
		};
		RequestParser.prototype._setStatus = function (status, error) {
			var endTime = +new Date();
			this.duration = endTime - this.startTime;
			this.statusCode = status;
			var properties = this.properties || {};
			if (error) {
				if (typeof error === "string") {
					properties["error"] = error;
				}
				else if (error instanceof Error) {
					properties["error"] = error.message;
				}
				else if (typeof error === "object") {
					for (var key in error) {
						properties[key] = error[key] && error[key].toString && error[key].toString();
					}
				}
			}
			this.properties = properties;
		};
		RequestParser.prototype._isSuccess = function () {
			return (0 < this.statusCode) && (this.statusCode < 400);
		};
		return RequestParser;
	}());
	module.exports = RequestParser;
	//# sourceMappingURL=RequestParser.js.map

	/***/ }),
	/* 139 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Util = __webpack_require__(134);
	var Logging = __webpack_require__(80);
	var CorrelationIdManager = (function () {
		function CorrelationIdManager() {
		}
		CorrelationIdManager.queryCorrelationId = function (config, callback) {
			// GET request to `${this.endpointBase}/api/profiles/${this.instrumentationKey}/appId`
			// If it 404s, the iKey is bad and we should give up
			// If it fails otherwise, try again later
			var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
			if (CorrelationIdManager.completedLookups.hasOwnProperty(appIdUrlString)) {
				callback(CorrelationIdManager.completedLookups[appIdUrlString]);
				return;
			}
			else if (CorrelationIdManager.pendingLookups[appIdUrlString]) {
				CorrelationIdManager.pendingLookups[appIdUrlString].push(callback);
				return;
			}
			CorrelationIdManager.pendingLookups[appIdUrlString] = [callback];
			var fetchAppId = function () {
				if (!CorrelationIdManager.pendingLookups[appIdUrlString]) {
					// This query has been cancelled.
					return;
				}
				var requestOptions = {
					method: 'GET',
					// Ensure this request is not captured by auto-collection.
					// Note: we don't refer to the property in HttpDependencyParser because that would cause a cyclical dependency
					disableAppInsightsAutoCollection: true
				};
				Logging.info(CorrelationIdManager.TAG, requestOptions);
				var req = Util.makeRequest(config, appIdUrlString, requestOptions, function (res) {
					if (res.statusCode === 200) {
						// Success; extract the appId from the body
						var appId_1 = "";
						res.setEncoding("utf-8");
						res.on('data', function (data) {
							appId_1 += data;
						});
						res.on('end', function () {
							Logging.info(CorrelationIdManager.TAG, appId_1);
							var result = CorrelationIdManager.correlationIdPrefix + appId_1;
							CorrelationIdManager.completedLookups[appIdUrlString] = result;
							if (CorrelationIdManager.pendingLookups[appIdUrlString]) {
								CorrelationIdManager.pendingLookups[appIdUrlString].forEach(function (cb) { return cb(result); });
							}
							delete CorrelationIdManager.pendingLookups[appIdUrlString];
						});
					}
					else if (res.statusCode >= 400 && res.statusCode < 500) {
						// Not found, probably a bad key. Do not try again.
						CorrelationIdManager.completedLookups[appIdUrlString] = undefined;
						delete CorrelationIdManager.pendingLookups[appIdUrlString];
					}
					else {
						// Retry after timeout.
						setTimeout(fetchAppId, config.correlationIdRetryIntervalMs);
					}
				});
				if (req) {
					req.on('error', function (error) {
						// Unable to contact endpoint.
						// Do nothing for now.
						Logging.warn(CorrelationIdManager.TAG, error);
					});
					req.end();
				}
			};
			setTimeout(fetchAppId, 0);
		};
		CorrelationIdManager.cancelCorrelationIdQuery = function (config, callback) {
			var appIdUrlString = config.profileQueryEndpoint + "/api/profiles/" + config.instrumentationKey + "/appId";
			var pendingLookups = CorrelationIdManager.pendingLookups[appIdUrlString];
			if (pendingLookups) {
				CorrelationIdManager.pendingLookups[appIdUrlString] = pendingLookups.filter(function (cb) { return cb != callback; });
				if (CorrelationIdManager.pendingLookups[appIdUrlString].length == 0) {
					delete CorrelationIdManager.pendingLookups[appIdUrlString];
				}
			}
		};
		/**
		 * Generate a request Id according to https://github.com/lmolkova/correlation/blob/master/hierarchical_request_id.md
		 * @param parentId
		 */
		CorrelationIdManager.generateRequestId = function (parentId) {
			if (parentId) {
				parentId = parentId[0] == '|' ? parentId : '|' + parentId;
				if (parentId[parentId.length - 1] !== '.') {
					parentId += '.';
				}
				var suffix = (CorrelationIdManager.currentRootId++).toString(16);
				return CorrelationIdManager.appendSuffix(parentId, suffix, '_');
			}
			else {
				return CorrelationIdManager.generateRootId();
			}
		};
		/**
		 * Given a hierarchical identifier of the form |X.*
		 * return the root identifier X
		 * @param id
		 */
		CorrelationIdManager.getRootId = function (id) {
			var endIndex = id.indexOf('.');
			if (endIndex < 0) {
				endIndex = id.length;
			}
			var startIndex = id[0] === '|' ? 1 : 0;
			return id.substring(startIndex, endIndex);
		};
		CorrelationIdManager.generateRootId = function () {
			return '|' + Util.w3cTraceId() + '.';
		};
		CorrelationIdManager.appendSuffix = function (parentId, suffix, delimiter) {
			if (parentId.length + suffix.length < CorrelationIdManager.requestIdMaxLength) {
				return parentId + suffix + delimiter;
			}
			// Combined identifier would be too long, so we must truncate it.
			// We need 9 characters of space: 8 for the overflow ID, 1 for the
			// overflow delimiter '#'
			var trimPosition = CorrelationIdManager.requestIdMaxLength - 9;
			if (parentId.length > trimPosition) {
				for (; trimPosition > 1; --trimPosition) {
					var c = parentId[trimPosition - 1];
					if (c === '.' || c === '_') {
						break;
					}
				}
			}
			if (trimPosition <= 1) {
				// parentId is not a valid ID
				return CorrelationIdManager.generateRootId();
			}
			suffix = Util.randomu32().toString(16);
			while (suffix.length < 8) {
				suffix = '0' + suffix;
			}
			return parentId.substring(0, trimPosition) + suffix + '#';
		};
		CorrelationIdManager.TAG = "CorrelationIdManager";
		CorrelationIdManager.correlationIdPrefix = "cid-v1:";
		// To avoid extraneous HTTP requests, we maintain a queue of callbacks waiting on a particular appId lookup,
		// as well as a cache of completed lookups so future requests can be resolved immediately.
		CorrelationIdManager.pendingLookups = {};
		CorrelationIdManager.completedLookups = {};
		CorrelationIdManager.requestIdMaxLength = 1024;
		CorrelationIdManager.currentRootId = Util.randomu32();
		return CorrelationIdManager;
	}());
	module.exports = CorrelationIdManager;
	//# sourceMappingURL=CorrelationIdManager.js.map

	/***/ }),
	/* 140 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	exports.subscriber = function (event) {
		clients.forEach(function (client) {
			var dbName = (event.data.startedData && event.data.startedData.databaseName) || "Unknown database";
			client.trackDependency({
				target: dbName,
				data: event.data.event.commandName,
				name: event.data.event.commandName,
				duration: event.data.event.duration,
				success: event.data.succeeded,
				/* TODO: transmit result code from mongo */
				resultCode: event.data.succeeded ? "0" : "1",
				dependencyTypeName: 'mongodb'
			});
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("mongodb", exports.subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("mongodb", exports.subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=mongodb.sub.js.map

	/***/ }),
	/* 141 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	exports.subscriber = function (event) {
		clients.forEach(function (client) {
			var queryObj = event.data.query || {};
			var sqlString = queryObj.sql || "Unknown query";
			var success = !event.data.err;
			var connection = queryObj._connection || {};
			var connectionConfig = connection.config || {};
			var dbName = connectionConfig.socketPath ? connectionConfig.socketPath : (connectionConfig.host || "localhost") + ":" + connectionConfig.port;
			client.trackDependency({
				target: dbName,
				data: sqlString,
				name: sqlString,
				duration: event.data.duration,
				success: success,
				/* TODO: transmit result code from mysql */
				resultCode: success ? "0" : "1",
				dependencyTypeName: "mysql"
			});
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("mysql", exports.subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("mysql", exports.subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=mysql.sub.js.map

	/***/ }),
	/* 142 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	exports.subscriber = function (event) {
		clients.forEach(function (client) {
			if (event.data.commandObj.command === "info") {
				// We don't want to report 'info', it's irrelevant
				return;
			}
			client.trackDependency({
				target: event.data.address,
				name: event.data.commandObj.command,
				data: event.data.commandObj.command,
				duration: event.data.duration,
				success: !event.data.err,
				/* TODO: transmit result code from redis */
				resultCode: event.data.err ? "1" : "0",
				dependencyTypeName: "redis"
			});
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("redis", exports.subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("redis", exports.subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=redis.sub.js.map

	/***/ }),
	/* 143 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(84);
	var clients = [];
	exports.subscriber = function (event) {
		clients.forEach(function (client) {
			var q = event.data.query;
			var sql = (q.preparable && q.preparable.text) || q.plan || q.text || "unknown query";
			var success = !event.data.error;
			var conn = event.data.database.host + ":" + event.data.database.port;
			client.trackDependency({
				target: conn,
				data: sql,
				name: sql,
				duration: event.data.duration,
				success: success,
				resultCode: success ? "0" : "1",
				dependencyTypeName: "postgres"
			});
		});
	};
	function enable(enabled, client) {
		if (enabled) {
			if (clients.length === 0) {
				diagnostic_channel_1.channel.subscribe("postgres", exports.subscriber);
			}
			;
			clients.push(client);
		}
		else {
			clients = clients.filter(function (c) { return c != client; });
			if (clients.length === 0) {
				diagnostic_channel_1.channel.unsubscribe("postgres", exports.subscriber);
			}
		}
	}
	exports.enable = enable;
	//# sourceMappingURL=postgres.sub.js.map

	/***/ }),
	/* 144 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var http = __webpack_require__(7);
	var https = __webpack_require__(6);
	var Logging = __webpack_require__(80);
	var Util = __webpack_require__(134);
	var RequestResponseHeaders = __webpack_require__(136);
	var HttpRequestParser = __webpack_require__(145);
	var CorrelationContextManager_1 = __webpack_require__(79);
	var AutoCollectPerformance = __webpack_require__(132);
	var AutoCollectHttpRequests = (function () {
		function AutoCollectHttpRequests(client) {
			if (!!AutoCollectHttpRequests.INSTANCE) {
				throw new Error("Server request tracking should be configured from the applicationInsights object");
			}
			AutoCollectHttpRequests.INSTANCE = this;
			this._client = client;
		}
		AutoCollectHttpRequests.prototype.enable = function (isEnabled) {
			this._isEnabled = isEnabled;
			// Autocorrelation requires automatic monitoring of incoming server requests
			// Disabling autocollection but enabling autocorrelation will still enable
			// request monitoring but will not produce request events
			if ((this._isAutoCorrelating || this._isEnabled || AutoCollectPerformance.isEnabled()) && !this._isInitialized) {
				this.useAutoCorrelation(this._isAutoCorrelating);
				this._initialize();
			}
		};
		AutoCollectHttpRequests.prototype.useAutoCorrelation = function (isEnabled) {
			if (isEnabled && !this._isAutoCorrelating) {
				CorrelationContextManager_1.CorrelationContextManager.enable();
			}
			else if (!isEnabled && this._isAutoCorrelating) {
				CorrelationContextManager_1.CorrelationContextManager.disable();
			}
			this._isAutoCorrelating = isEnabled;
		};
		AutoCollectHttpRequests.prototype.isInitialized = function () {
			return this._isInitialized;
		};
		AutoCollectHttpRequests.prototype.isAutoCorrelating = function () {
			return this._isAutoCorrelating;
		};
		AutoCollectHttpRequests.prototype._generateCorrelationContext = function (requestParser) {
			if (!this._isAutoCorrelating) {
				return;
			}
			return CorrelationContextManager_1.CorrelationContextManager.generateContextObject(requestParser.getOperationId(this._client.context.tags), requestParser.getRequestId(), requestParser.getOperationName(this._client.context.tags), requestParser.getCorrelationContextHeader());
		};
		AutoCollectHttpRequests.prototype._initialize = function () {
			var _this = this;
			this._isInitialized = true;
			var wrapOnRequestHandler = function (onRequest) {
				if (!onRequest) {
					return undefined;
				}
				if (typeof onRequest !== 'function') {
					throw new Error('onRequest handler must be a function');
				}
				return function (request, response) {
					var shouldCollect = request && !request[AutoCollectHttpRequests.alreadyAutoCollectedFlag];
					if (request && shouldCollect) {
						// Set up correlation context
						var requestParser_1 = new HttpRequestParser(request);
						var correlationContext = _this._generateCorrelationContext(requestParser_1);
						// Note: Check for if correlation is enabled happens within this method.
						// If not enabled, function will directly call the callback.
						CorrelationContextManager_1.CorrelationContextManager.runWithContext(correlationContext, function () {
							if (_this._isEnabled) {
								// Mark as auto collected
								request[AutoCollectHttpRequests.alreadyAutoCollectedFlag] = true;
								// Auto collect request
								AutoCollectHttpRequests.trackRequest(_this._client, { request: request, response: response }, requestParser_1);
							}
							// Add this request to the performance counter
							// Note: Check for if perf counters are enabled happens within this method.
							// TODO: Refactor common bits between trackRequest and countRequest so they can
							// be used together, even when perf counters are on, and request tracking is off
							AutoCollectPerformance.countRequest(request, response);
							if (typeof onRequest === "function") {
								onRequest(request, response);
							}
						});
					}
					else {
						if (typeof onRequest === "function") {
							onRequest(request, response);
						}
					}
				};
			};
			// The `http.createServer` function will instantiate a new http.Server object.
			// Inside the Server's constructor, it is using addListener to register the
			// onRequest handler. So there are two ways to inject the wrapped onRequest handler:
			// 1) Overwrite Server.prototype.addListener (and .on()) globally and not patching
			//    the http.createServer call. Or
			// 2) Overwrite the http.createServer method and add a patched addListener to the
			//    fresh server instance. This seems more stable for possible future changes as
			//    it also covers the case where the Server might not use addListener to manage
			//    the callback internally.
			//    And also as long as the constructor uses addListener to add the handle, it is
			//    ok to patch the addListener after construction only. Because if we would patch
			//    the prototype one and the createServer method, we would wrap the handler twice
			//    in case of the constructor call.
			var wrapServerEventHandler = function (server) {
				var originalAddListener = server.addListener.bind(server);
				server.addListener = function (eventType, eventHandler) {
					switch (eventType) {
						case 'request':
						case 'checkContinue':
							return originalAddListener(eventType, wrapOnRequestHandler(eventHandler));
						default:
							return originalAddListener(eventType, eventHandler);
					}
				};
				// on is an alias to addListener only
				server.on = server.addListener;
			};
			var originalHttpServer = http.createServer;
			http.createServer = function (onRequest) {
				// todo: get a pointer to the server so the IP address can be read from server.address
				var server = originalHttpServer(wrapOnRequestHandler(onRequest));
				wrapServerEventHandler(server);
				return server;
			};
			var originalHttpsServer = https.createServer;
			https.createServer = function (options, onRequest) {
				var server = originalHttpsServer(options, wrapOnRequestHandler(onRequest));
				wrapServerEventHandler(server);
				return server;
			};
		};
		/**
		 * Tracks a request synchronously (doesn't wait for response 'finish' event)
		 */
		AutoCollectHttpRequests.trackRequestSync = function (client, telemetry) {
			if (!telemetry.request || !telemetry.response || !client) {
				Logging.info("AutoCollectHttpRequests.trackRequestSync was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
				return;
			}
			AutoCollectHttpRequests.addResponseCorrelationIdHeader(client, telemetry.response);
			// store data about the request
			var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
			var requestParser = new HttpRequestParser(telemetry.request, (correlationContext && correlationContext.operation.parentId));
			// Overwrite correlation context with request parser results
			if (correlationContext) {
				correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
				correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
				correlationContext.operation.parentId = requestParser.getRequestId() || correlationContext.operation.parentId;
				correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
			}
			AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, telemetry.duration, telemetry.error);
		};
		/**
		 * Tracks a request by listening to the response 'finish' event
		 */
		AutoCollectHttpRequests.trackRequest = function (client, telemetry, _requestParser) {
			if (!telemetry.request || !telemetry.response || !client) {
				Logging.info("AutoCollectHttpRequests.trackRequest was called with invalid parameters: ", !telemetry.request, !telemetry.response, !client);
				return;
			}
			// store data about the request
			var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
			var requestParser = _requestParser || new HttpRequestParser(telemetry.request, correlationContext && correlationContext.operation.parentId);
			if (Util.canIncludeCorrelationHeader(client, requestParser.getUrl())) {
				AutoCollectHttpRequests.addResponseCorrelationIdHeader(client, telemetry.response);
			}
			// Overwrite correlation context with request parser results (if not an automatic track. we've already precalculated the correlation context in that case)
			if (correlationContext && !_requestParser) {
				correlationContext.operation.id = requestParser.getOperationId(client.context.tags) || correlationContext.operation.id;
				correlationContext.operation.name = requestParser.getOperationName(client.context.tags) || correlationContext.operation.name;
				correlationContext.operation.parentId = requestParser.getOperationParentId(client.context.tags) || correlationContext.operation.parentId;
				correlationContext.customProperties.addHeaderData(requestParser.getCorrelationContextHeader());
			}
			// response listeners
			if (telemetry.response.once) {
				telemetry.response.once("finish", function () {
					AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, null, null);
				});
			}
			// track a failed request if an error is emitted
			if (telemetry.request.on) {
				telemetry.request.on("error", function (error) {
					AutoCollectHttpRequests.endRequest(client, requestParser, telemetry, null, error);
				});
			}
		};
		/**
		 * Add the target correlationId to the response headers, if not already provided.
		 */
		AutoCollectHttpRequests.addResponseCorrelationIdHeader = function (client, response) {
			if (client.config && client.config.correlationId &&
				response.getHeader && response.setHeader && !response.headersSent) {
				var correlationHeader = response.getHeader(RequestResponseHeaders.requestContextHeader);
				if (correlationHeader) {
					var components = correlationHeader.split(",");
					var key_1 = RequestResponseHeaders.requestContextSourceKey + "=";
					if (!components.some(function (value) { return value.substring(0, key_1.length) === key_1; })) {
						response.setHeader(RequestResponseHeaders.requestContextHeader, correlationHeader + "," + RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
					}
				}
				else {
					response.setHeader(RequestResponseHeaders.requestContextHeader, RequestResponseHeaders.requestContextSourceKey + "=" + client.config.correlationId);
				}
			}
		};
		AutoCollectHttpRequests.endRequest = function (client, requestParser, telemetry, ellapsedMilliseconds, error) {
			if (error) {
				requestParser.onError(error, ellapsedMilliseconds);
			}
			else {
				requestParser.onResponse(telemetry.response, ellapsedMilliseconds);
			}
			var requestTelemetry = requestParser.getRequestTelemetry(telemetry);
			requestTelemetry.tagOverrides = requestParser.getRequestTags(client.context.tags);
			if (telemetry.tagOverrides) {
				for (var key in telemetry.tagOverrides) {
					requestTelemetry.tagOverrides[key] = telemetry.tagOverrides[key];
				}
			}
			requestTelemetry.contextObjects = requestTelemetry.contextObjects || {};
			requestTelemetry.contextObjects["http.ServerRequest"] = telemetry.request;
			requestTelemetry.contextObjects["http.ServerResponse"] = telemetry.response;
			client.trackRequest(requestTelemetry);
		};
		AutoCollectHttpRequests.prototype.dispose = function () {
			AutoCollectHttpRequests.INSTANCE = null;
			this.enable(false);
			this._isInitialized = false;
		};
		AutoCollectHttpRequests.alreadyAutoCollectedFlag = '_appInsightsAutoCollected';
		return AutoCollectHttpRequests;
	}());
	module.exports = AutoCollectHttpRequests;
	//# sourceMappingURL=HttpRequests.js.map

	/***/ }),
	/* 145 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	var url = __webpack_require__(5);
	var Contracts = __webpack_require__(106);
	var Util = __webpack_require__(134);
	var RequestResponseHeaders = __webpack_require__(136);
	var RequestParser = __webpack_require__(138);
	var CorrelationIdManager = __webpack_require__(139);
	/**
	 * Helper class to read data from the requst/response objects and convert them into the telemetry contract
	 */
	var HttpRequestParser = (function (_super) {
		__extends(HttpRequestParser, _super);
		function HttpRequestParser(request, requestId) {
			var _this = _super.call(this) || this;
			if (request) {
				_this.method = request.method;
				_this.url = _this._getAbsoluteUrl(request);
				_this.startTime = +new Date();
				_this.socketRemoteAddress = request.socket && request.socket.remoteAddress;
				_this.parseHeaders(request, requestId);
				if (request.connection) {
					_this.connectionRemoteAddress = request.connection.remoteAddress;
					_this.legacySocketRemoteAddress = request.connection["socket"] && request.connection["socket"].remoteAddress;
				}
			}
			return _this;
		}
		HttpRequestParser.prototype.onError = function (error, ellapsedMilliseconds) {
			this._setStatus(undefined, error);
			// This parameter is only for overrides. setStatus handles this internally for the autocollected case
			if (ellapsedMilliseconds) {
				this.duration = ellapsedMilliseconds;
			}
		};
		HttpRequestParser.prototype.onResponse = function (response, ellapsedMilliseconds) {
			this._setStatus(response.statusCode, undefined);
			// This parameter is only for overrides. setStatus handles this internally for the autocollected case
			if (ellapsedMilliseconds) {
				this.duration = ellapsedMilliseconds;
			}
		};
		HttpRequestParser.prototype.getRequestTelemetry = function (baseTelemetry) {
			var requestTelemetry = {
				id: this.requestId,
				name: this.method + " " + url.parse(this.url).pathname,
				url: this.url,
				/*
				See https://github.com/Microsoft/ApplicationInsights-dotnet-server/blob/25d695e6a906fbe977f67be3966d25dbf1c50a79/Src/Web/Web.Shared.Net/RequestTrackingTelemetryModule.cs#L250
				for reference
				*/
				source: this.sourceCorrelationId,
				duration: this.duration,
				resultCode: this.statusCode ? this.statusCode.toString() : null,
				success: this._isSuccess(),
				properties: this.properties
			};
			// We should keep any parameters the user passed in
			// Except the fields defined above in requestTelemetry, which take priority
			// Except the properties field, where they're merged instead, with baseTelemetry taking priority
			if (baseTelemetry) {
				// Copy missing fields
				for (var key in baseTelemetry) {
					if (!requestTelemetry[key]) {
						requestTelemetry[key] = baseTelemetry[key];
					}
				}
				// Merge properties
				if (baseTelemetry.properties) {
					for (var key in baseTelemetry.properties) {
						requestTelemetry.properties[key] = baseTelemetry.properties[key];
					}
				}
			}
			return requestTelemetry;
		};
		HttpRequestParser.prototype.getRequestTags = function (tags) {
			// create a copy of the context for requests since client info will be used here
			var newTags = {};
			for (var key in tags) {
				newTags[key] = tags[key];
			}
			// don't override tags if they are already set
			newTags[HttpRequestParser.keys.locationIp] = tags[HttpRequestParser.keys.locationIp] || this._getIp();
			newTags[HttpRequestParser.keys.sessionId] = tags[HttpRequestParser.keys.sessionId] || this._getId("ai_session");
			newTags[HttpRequestParser.keys.userId] = tags[HttpRequestParser.keys.userId] || this._getId("ai_user");
			newTags[HttpRequestParser.keys.userAuthUserId] = tags[HttpRequestParser.keys.userAuthUserId] || this._getId("ai_authUser");
			newTags[HttpRequestParser.keys.operationName] = this.getOperationName(tags);
			newTags[HttpRequestParser.keys.operationParentId] = this.getOperationParentId(tags);
			newTags[HttpRequestParser.keys.operationId] = this.getOperationId(tags);
			return newTags;
		};
		HttpRequestParser.prototype.getOperationId = function (tags) {
			return tags[HttpRequestParser.keys.operationId] || this.operationId;
		};
		HttpRequestParser.prototype.getOperationParentId = function (tags) {
			return tags[HttpRequestParser.keys.operationParentId] || this.parentId || this.getOperationId(tags);
		};
		HttpRequestParser.prototype.getOperationName = function (tags) {
			return tags[HttpRequestParser.keys.operationName] || this.method + " " + url.parse(this.url).pathname;
		};
		HttpRequestParser.prototype.getRequestId = function () {
			return this.requestId;
		};
		HttpRequestParser.prototype.getCorrelationContextHeader = function () {
			return this.correlationContextHeader;
		};
		HttpRequestParser.prototype._getAbsoluteUrl = function (request) {
			if (!request.headers) {
				return request.url;
			}
			var encrypted = request.connection ? request.connection.encrypted : null;
			var requestUrl = url.parse(request.url);
			var pathName = requestUrl.pathname;
			var search = requestUrl.search;
			var absoluteUrl = url.format({
				protocol: encrypted ? "https" : "http",
				host: request.headers.host,
				pathname: pathName,
				search: search
			});
			return absoluteUrl;
		};
		HttpRequestParser.prototype._getIp = function () {
			// regex to match ipv4 without port
			// Note: including the port would cause the payload to be rejected by the data collector
			var ipMatch = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
			var check = function (str) {
				var results = ipMatch.exec(str);
				if (results) {
					return results[0];
				}
			};
			var ip = check(this.rawHeaders["x-forwarded-for"])
				|| check(this.rawHeaders["x-client-ip"])
				|| check(this.rawHeaders["x-real-ip"])
				|| check(this.connectionRemoteAddress)
				|| check(this.socketRemoteAddress)
				|| check(this.legacySocketRemoteAddress);
			// node v12 returns this if the address is "localhost"
			if (!ip
				&& this.connectionRemoteAddress
				&& this.connectionRemoteAddress.substr
				&& this.connectionRemoteAddress.substr(0, 2) === "::") {
				ip = "127.0.0.1";
			}
			return ip;
		};
		HttpRequestParser.prototype._getId = function (name) {
			var cookie = (this.rawHeaders && this.rawHeaders["cookie"] &&
				typeof this.rawHeaders["cookie"] === 'string' && this.rawHeaders["cookie"]) || "";
			var value = HttpRequestParser.parseId(Util.getCookie(name, cookie));
			return value;
		};
		HttpRequestParser.prototype.parseHeaders = function (request, requestId) {
			this.rawHeaders = request.headers || request.rawHeaders;
			this.userAgent = request.headers && request.headers["user-agent"];
			this.sourceCorrelationId = Util.getCorrelationContextTarget(request, RequestResponseHeaders.requestContextSourceKey);
			if (request.headers) {
				this.correlationContextHeader = request.headers[RequestResponseHeaders.correlationContextHeader];
				if (request.headers[RequestResponseHeaders.requestIdHeader]) {
					this.parentId = request.headers[RequestResponseHeaders.requestIdHeader];
					this.requestId = CorrelationIdManager.generateRequestId(this.parentId);
					this.correlationContextHeader = request.headers[RequestResponseHeaders.correlationContextHeader];
				}
				else {
					// Legacy fallback
					var rootId = request.headers[RequestResponseHeaders.rootIdHeader];
					this.parentId = request.headers[RequestResponseHeaders.parentIdHeader];
					this.requestId = CorrelationIdManager.generateRequestId(rootId || this.parentId);
					this.correlationContextHeader = null;
				}
				if (requestId) {
					// For the scenarios that don't guarantee an AI-created context,
					// override the requestId with the provided one.
					this.requestId = requestId;
				}
				this.operationId = CorrelationIdManager.getRootId(this.requestId);
			}
		};
		HttpRequestParser.parseId = function (cookieValue) {
			return cookieValue.substr(0, cookieValue.indexOf('|'));
		};
		HttpRequestParser.keys = new Contracts.ContextTagKeys();
		return HttpRequestParser;
	}(RequestParser));
	module.exports = HttpRequestParser;
	//# sourceMappingURL=HttpRequestParser.js.map

	/***/ }),
	/* 146 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var __extends = (this && this.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	var TelemetryClient = __webpack_require__(147);
	var ServerRequestTracking = __webpack_require__(144);
	var ClientRequestTracking = __webpack_require__(133);
	var Logging = __webpack_require__(80);
	/**
	 * Application Insights Telemetry Client for Node.JS. Provides the Application Insights TelemetryClient API
	 * in addition to Node-specific helper functions.
	 * Construct a new TelemetryClient to have an instance with a different configuration than the default client.
	 * In most cases, `appInsights.defaultClient` should be used instead.
	 */
	var NodeClient = (function (_super) {
		__extends(NodeClient, _super);
		function NodeClient() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		/**
		 * Log RequestTelemetry from HTTP request and response. This method will log immediately without waitng for request completion
		 * and it requires duration parameter to be specified on NodeHttpRequestTelemetry object.
		 * Use trackNodeHttpRequest function to log the telemetry after request completion
		 * @param telemetry Object encapsulating incoming request, response and duration information
		 */
		NodeClient.prototype.trackNodeHttpRequestSync = function (telemetry) {
			if (telemetry && telemetry.request && telemetry.response && telemetry.duration) {
				ServerRequestTracking.trackRequestSync(this, telemetry);
			}
			else {
				Logging.warn("trackNodeHttpRequestSync requires NodeHttpRequestTelemetry object with request, response and duration specified.");
			}
		};
		/**
		 * Log RequestTelemetry from HTTP request and response. This method will `follow` the request to completion.
		 * Use trackNodeHttpRequestSync function to log telemetry immediately without waiting for request completion
		 * @param telemetry Object encapsulating incoming request and response information
		 */
		NodeClient.prototype.trackNodeHttpRequest = function (telemetry) {
			if (telemetry.duration || telemetry.error) {
				Logging.warn("trackNodeHttpRequest will ignore supplied duration and error parameters. These values are collected from the request and response objects.");
			}
			if (telemetry && telemetry.request && telemetry.response) {
				ServerRequestTracking.trackRequest(this, telemetry);
			}
			else {
				Logging.warn("trackNodeHttpRequest requires NodeHttpRequestTelemetry object with request and response specified.");
			}
		};
		/**
		 * Log DependencyTelemetry from outgoing HTTP request. This method will instrument the outgoing request and append
		 * the specified headers and will log the telemetry when outgoing request is complete
		 * @param telemetry Object encapsulating outgoing request information
		 */
		NodeClient.prototype.trackNodeHttpDependency = function (telemetry) {
			if (telemetry && telemetry.request) {
				ClientRequestTracking.trackRequest(this, telemetry);
			}
			else {
				Logging.warn("trackNodeHttpDependency requires NodeHttpDependencyTelemetry object with request specified.");
			}
		};
		return NodeClient;
	}(TelemetryClient));
	module.exports = NodeClient;
	//# sourceMappingURL=NodeClient.js.map

	/***/ }),
	/* 147 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var url = __webpack_require__(5);
	var Config = __webpack_require__(148);
	var Context = __webpack_require__(149);
	var Contracts = __webpack_require__(106);
	var Channel = __webpack_require__(150);
	var TelemetryProcessors = __webpack_require__(151);
	var CorrelationContextManager_1 = __webpack_require__(79);
	var Sender = __webpack_require__(153);
	var Util = __webpack_require__(134);
	var Logging = __webpack_require__(80);
	var EnvelopeFactory = __webpack_require__(154);
	/**
	 * Application Insights telemetry client provides interface to track telemetry items, register telemetry initializers and
	 * and manually trigger immediate sending (flushing)
	 */
	var TelemetryClient = (function () {
		/**
		 * Constructs a new client of the client
		 * @param iKey the instrumentation key to use (read from environment variable if not specified)
		 */
		function TelemetryClient(iKey) {
			this._telemetryProcessors = [];
			var config = new Config(iKey);
			this.config = config;
			this.context = new Context();
			this.commonProperties = {};
			var sender = new Sender(this.config);
			this.channel = new Channel(function () { return config.disableAppInsights; }, function () { return config.maxBatchSize; }, function () { return config.maxBatchIntervalMs; }, sender);
		}
		/**
		 * Log a trace message
		 * @param telemetry      Object encapsulating tracking options
		 */
		TelemetryClient.prototype.trackTrace = function (telemetry) {
			this.track(telemetry, Contracts.TelemetryType.Trace);
		};
		/**
		 * Log a numeric value that is not associated with a specific event. Typically used to send regular reports of performance indicators.
		 * To send a single measurement, use just the first two parameters. If you take measurements very frequently, you can reduce the
		 * telemetry bandwidth by aggregating multiple measurements and sending the resulting average at intervals.
		 * @param telemetry      Object encapsulating tracking options
		 */
		TelemetryClient.prototype.trackMetric = function (telemetry) {
			this.track(telemetry, Contracts.TelemetryType.Metric);
		};
		/**
		 * Log an exception
		 * @param telemetry      Object encapsulating tracking options
		 */
		TelemetryClient.prototype.trackException = function (telemetry) {
			if (telemetry && telemetry.exception && !Util.isError(telemetry.exception)) {
				telemetry.exception = new Error(telemetry.exception.toString());
			}
			this.track(telemetry, Contracts.TelemetryType.Exception);
		};
		/**
		 * Log a user action or other occurrence.
		 * @param telemetry      Object encapsulating tracking options
		 */
		TelemetryClient.prototype.trackEvent = function (telemetry) {
			this.track(telemetry, Contracts.TelemetryType.Event);
		};
		/**
		 * Log a request. Note that the default client will attempt to collect HTTP requests automatically so only use this for requests
		 * that aren't automatically captured or if you've disabled automatic request collection.
		 *
		 * @param telemetry      Object encapsulating tracking options
		 */
		TelemetryClient.prototype.trackRequest = function (telemetry) {
			this.track(telemetry, Contracts.TelemetryType.Request);
		};
		/**
		 * Log a dependency. Note that the default client will attempt to collect dependencies automatically so only use this for dependencies
		 * that aren't automatically captured or if you've disabled automatic dependency collection.
		 *
		 * @param telemetry      Object encapsulating tracking option
		 * */
		TelemetryClient.prototype.trackDependency = function (telemetry) {
			if (telemetry && !telemetry.target && telemetry.data) {
				// url.parse().host returns null for non-urls,
				// making this essentially a no-op in those cases
				// If this logic is moved, update jsdoc in DependencyTelemetry.target
				telemetry.target = url.parse(telemetry.data).host;
			}
			this.track(telemetry, Contracts.TelemetryType.Dependency);
		};
		/**
		 * Immediately send all queued telemetry.
		 * @param options Flush options, including indicator whether app is crashing and callback
		 */
		TelemetryClient.prototype.flush = function (options) {
			this.channel.triggerSend(options ? !!options.isAppCrashing : false, options ? options.callback : undefined);
		};
		/**
		 * Generic track method for all telemetry types
		 * @param data the telemetry to send
		 * @param telemetryType specify the type of telemetry you are tracking from the list of Contracts.DataTypes
		 */
		TelemetryClient.prototype.track = function (telemetry, telemetryType) {
			if (telemetry && Contracts.telemetryTypeToBaseType(telemetryType)) {
				var envelope = EnvelopeFactory.createEnvelope(telemetry, telemetryType, this.commonProperties, this.context, this.config);
				// Set time on the envelope if it was set on the telemetry item
				if (telemetry.time) {
					envelope.time = telemetry.time.toISOString();
				}
				var accepted = this.runTelemetryProcessors(envelope, telemetry.contextObjects);
				// Ideally we would have a central place for "internal" telemetry processors and users can configure which ones are in use.
				// This will do for now. Otherwise clearTelemetryProcessors() would be problematic.
				accepted = accepted && TelemetryProcessors.samplingTelemetryProcessor(envelope, { correlationContext: CorrelationContextManager_1.CorrelationContextManager.getCurrentContext() });
				if (accepted) {
					this.channel.send(envelope);
				}
			}
			else {
				Logging.warn("track() requires telemetry object and telemetryType to be specified.");
			}
		};
		/**
		 * Adds telemetry processor to the collection. Telemetry processors will be called one by one
		 * before telemetry item is pushed for sending and in the order they were added.
		 *
		 * @param telemetryProcessor function, takes Envelope, and optional context object and returns boolean
		 */
		TelemetryClient.prototype.addTelemetryProcessor = function (telemetryProcessor) {
			this._telemetryProcessors.push(telemetryProcessor);
		};
		/*
		 * Removes all telemetry processors
		 */
		TelemetryClient.prototype.clearTelemetryProcessors = function () {
			this._telemetryProcessors = [];
		};
		TelemetryClient.prototype.runTelemetryProcessors = function (envelope, contextObjects) {
			var accepted = true;
			var telemetryProcessorsCount = this._telemetryProcessors.length;
			if (telemetryProcessorsCount === 0) {
				return accepted;
			}
			contextObjects = contextObjects || {};
			contextObjects['correlationContext'] = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
			for (var i = 0; i < telemetryProcessorsCount; ++i) {
				try {
					var processor = this._telemetryProcessors[i];
					if (processor) {
						if (processor.apply(null, [envelope, contextObjects]) === false) {
							accepted = false;
							break;
						}
					}
				}
				catch (error) {
					accepted = true;
					Logging.warn("One of telemetry processors failed, telemetry item will be sent.", error, envelope);
				}
			}
			return accepted;
		};
		return TelemetryClient;
	}());
	module.exports = TelemetryClient;
	//# sourceMappingURL=TelemetryClient.js.map

	/***/ }),
	/* 148 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var CorrelationIdManager = __webpack_require__(139);
	var Config = (function () {
		function Config(instrumentationKey) {
			var _this = this;
			this.endpointBase = "https://dc.services.visualstudio.com";
			this.instrumentationKey = instrumentationKey || Config._getInstrumentationKey();
			this.endpointUrl = this.endpointBase + "/v2/track";
			this.maxBatchSize = 250;
			this.maxBatchIntervalMs = 15000;
			this.disableAppInsights = false;
			this.samplingPercentage = 100;
			this.correlationIdRetryIntervalMs = 30 * 1000;
			this.correlationHeaderExcludedDomains = [
				"*.core.windows.net",
				"*.core.chinacloudapi.cn",
				"*.core.cloudapi.de",
				"*.core.usgovcloudapi.net"
			];
			this.setCorrelationId = function (correlationId) { return _this.correlationId = correlationId; };
			this.profileQueryEndpoint = process.env[Config.ENV_profileQueryEndpoint] || this.endpointBase;
			this.proxyHttpUrl = process.env[Config.ENV_http_proxy] || undefined;
			this.proxyHttpsUrl = process.env[Config.ENV_https_proxy] || undefined;
			this.httpAgent = undefined;
			this.httpsAgent = undefined;
		}
		Object.defineProperty(Config.prototype, "profileQueryEndpoint", {
			get: function () {
				return this._profileQueryEndpoint;
			},
			set: function (endpoint) {
				CorrelationIdManager.cancelCorrelationIdQuery(this, this.setCorrelationId);
				this._profileQueryEndpoint = endpoint;
				this.correlationId = CorrelationIdManager.correlationIdPrefix; // Reset the correlationId while we wait for the new query
				CorrelationIdManager.queryCorrelationId(this, this.setCorrelationId);
			},
			enumerable: true,
			configurable: true
		});
		Config._getInstrumentationKey = function () {
			// check for both the documented env variable and the azure-prefixed variable
			var iKey = process.env[Config.ENV_iKey]
				|| process.env[Config.ENV_azurePrefix + Config.ENV_iKey]
				|| process.env[Config.legacy_ENV_iKey]
				|| process.env[Config.ENV_azurePrefix + Config.legacy_ENV_iKey];
			if (!iKey || iKey == "") {
				throw new Error("Instrumentation key not found, pass the key in the config to this method or set the key in the environment variable APPINSIGHTS_INSTRUMENTATIONKEY before starting the server");
			}
			return iKey;
		};
		// Azure adds this prefix to all environment variables
		Config.ENV_azurePrefix = "APPSETTING_";
		// This key is provided in the readme
		Config.ENV_iKey = "APPINSIGHTS_INSTRUMENTATIONKEY";
		Config.legacy_ENV_iKey = "APPINSIGHTS_INSTRUMENTATION_KEY";
		Config.ENV_profileQueryEndpoint = "APPINSIGHTS_PROFILE_QUERY_ENDPOINT";
		Config.ENV_http_proxy = "http_proxy";
		Config.ENV_https_proxy = "https_proxy";
		return Config;
	}());
	module.exports = Config;
	//# sourceMappingURL=Config.js.map

	/***/ }),
	/* 149 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var os = __webpack_require__(48);
	var fs = __webpack_require__(2);
	var path = __webpack_require__(1);
	var Contracts = __webpack_require__(106);
	var Logging = __webpack_require__(80);
	var Context = (function () {
		function Context(packageJsonPath) {
			this.keys = new Contracts.ContextTagKeys();
			this.tags = {};
			this._loadApplicationContext();
			this._loadDeviceContext();
			this._loadInternalContext();
		}
		Context.prototype._loadApplicationContext = function (packageJsonPath) {
			// note: this should return the host package.json
			packageJsonPath = packageJsonPath || path.resolve(__dirname, "../../../../package.json");
			if (!Context.appVersion[packageJsonPath]) {
				Context.appVersion[packageJsonPath] = "unknown";
				try {
					var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
					if (packageJson && typeof packageJson.version === "string") {
						Context.appVersion[packageJsonPath] = packageJson.version;
					}
				}
				catch (exception) {
					Logging.info("unable to read app version: ", exception);
				}
			}
			this.tags[this.keys.applicationVersion] = Context.appVersion[packageJsonPath];
		};
		Context.prototype._loadDeviceContext = function () {
			this.tags[this.keys.deviceId] = "";
			this.tags[this.keys.cloudRoleInstance] = os && os.hostname();
			this.tags[this.keys.deviceOSVersion] = os && (os.type() + " " + os.release());
			this.tags[this.keys.cloudRole] = Context.DefaultRoleName;
			// not yet supported tags
			this.tags["ai.device.osArchitecture"] = os && os.arch();
			this.tags["ai.device.osPlatform"] = os && os.platform();
		};
		Context.prototype._loadInternalContext = function () {
			// note: this should return the sdk package.json
			var packageJsonPath = path.resolve(__dirname, "../../package.json");
			if (!Context.sdkVersion) {
				Context.sdkVersion = "unknown";
				try {
					var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
					if (packageJson && typeof packageJson.version === "string") {
						Context.sdkVersion = packageJson.version;
					}
				}
				catch (exception) {
					Logging.info("unable to read app version: ", exception);
				}
			}
			this.tags[this.keys.internalSdkVersion] = "node:" + Context.sdkVersion;
		};
		Context.DefaultRoleName = "Web";
		Context.appVersion = {};
		Context.sdkVersion = null;
		return Context;
	}());
	module.exports = Context;
	//# sourceMappingURL=Context.js.map

	/***/ }),
	/* 150 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Logging = __webpack_require__(80);
	var Channel = (function () {
		function Channel(isDisabled, getBatchSize, getBatchIntervalMs, sender) {
			this._buffer = [];
			this._lastSend = 0;
			this._isDisabled = isDisabled;
			this._getBatchSize = getBatchSize;
			this._getBatchIntervalMs = getBatchIntervalMs;
			this._sender = sender;
		}
		/**
		 * Enable or disable disk-backed retry caching to cache events when client is offline (enabled by default)
		 * These cached events are stored in your system or user's temporary directory and access restricted to your user when possible.
		 * @param value if true events that occured while client is offline will be cached on disk
		 * @param resendInterval The wait interval for resending cached events.
		 * @param maxBytesOnDisk The maximum size (in bytes) that the created temporary directory for cache events can grow to, before caching is disabled.
		 * @returns {Configuration} this class
		 */
		Channel.prototype.setUseDiskRetryCaching = function (value, resendInterval, maxBytesOnDisk) {
			this._sender.setDiskRetryMode(value, resendInterval, maxBytesOnDisk);
		};
		/**
		 * Add a telemetry item to the send buffer
		 */
		Channel.prototype.send = function (envelope) {
			var _this = this;
			// if master off switch is set, don't send any data
			if (this._isDisabled()) {
				// Do not send/save data
				return;
			}
			// validate input
			if (!envelope) {
				Logging.warn("Cannot send null/undefined telemetry");
				return;
			}
			// check if the incoming payload is too large, truncate if necessary
			var payload = this._stringify(envelope);
			if (typeof payload !== "string") {
				return;
			}
			// enqueue the payload
			this._buffer.push(payload);
			// flush if we would exceed the max-size limit by adding this item
			if (this._buffer.length >= this._getBatchSize()) {
				this.triggerSend(false);
				return;
			}
			// ensure an invocation timeout is set if anything is in the buffer
			if (!this._timeoutHandle && this._buffer.length > 0) {
				this._timeoutHandle = setTimeout(function () {
					_this._timeoutHandle = null;
					_this.triggerSend(false);
				}, this._getBatchIntervalMs());
			}
		};
		/**
		 * Immediately send buffered data
		 */
		Channel.prototype.triggerSend = function (isNodeCrashing, callback) {
			var bufferIsEmpty = this._buffer.length < 1;
			if (!bufferIsEmpty) {
				// compose an array of payloads
				var batch = this._buffer.join("\n");
				// invoke send
				if (isNodeCrashing) {
					this._sender.saveOnCrash(batch);
					if (typeof callback === "function") {
						callback("data saved on crash");
					}
				}
				else {
					this._sender.send(Buffer.from ? Buffer.from(batch) : new Buffer(batch), callback);
				}
			}
			// update lastSend time to enable throttling
			this._lastSend = +new Date;
			// clear buffer
			this._buffer.length = 0;
			clearTimeout(this._timeoutHandle);
			this._timeoutHandle = null;
			if (bufferIsEmpty && typeof callback === "function") {
				callback("no data to send");
			}
		};
		Channel.prototype._stringify = function (envelope) {
			try {
				return JSON.stringify(envelope);
			}
			catch (error) {
				Logging.warn("Failed to serialize payload", error, envelope);
			}
		};
		return Channel;
	}());
	module.exports = Channel;
	//# sourceMappingURL=Channel.js.map

	/***/ }),
	/* 151 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(152));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 152 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts = __webpack_require__(106);
	/**
	 *  A telemetry processor that handles sampling.
	 */
	function samplingTelemetryProcessor(envelope, contextObjects) {
		var samplingPercentage = envelope.sampleRate; // Set for us in Client.getEnvelope
		var isSampledIn = false;
		if (samplingPercentage === null || samplingPercentage === undefined || samplingPercentage >= 100) {
			return true;
		}
		else if (envelope.data && Contracts.TelemetryType.Metric === Contracts.baseTypeToTelemetryType(envelope.data.baseType)) {
			// Exclude MetricData telemetry from sampling
			return true;
		}
		else if (contextObjects.correlationContext && contextObjects.correlationContext.operation) {
			// If we're using dependency correlation, sampling should retain all telemetry from a given request
			isSampledIn = getSamplingHashCode(contextObjects.correlationContext.operation.id) < samplingPercentage;
		}
		else {
			// If we're not using dependency correlation, sampling should use a random distribution on each item
			isSampledIn = (Math.random() * 100) < samplingPercentage;
		}
		return isSampledIn;
	}
	exports.samplingTelemetryProcessor = samplingTelemetryProcessor;
	/** Ported from AI .NET SDK */
	function getSamplingHashCode(input) {
		var csharpMin = -2147483648;
		var csharpMax = 2147483647;
		var hash = 5381;
		if (!input) {
			return 0;
		}
		while (input.length < 8) {
			input = input + input;
		}
		for (var i = 0; i < input.length; i++) {
			// JS doesn't respond to integer overflow by wrapping around. Simulate it with bitwise operators ( | 0)
			hash = ((((hash << 5) + hash) | 0) + input.charCodeAt(i) | 0);
		}
		hash = hash <= csharpMin ? csharpMax : Math.abs(hash);
		return (hash / csharpMax) * 100;
	}
	exports.getSamplingHashCode = getSamplingHashCode;
	//# sourceMappingURL=SamplingTelemetryProcessor.js.map

	/***/ }),
	/* 153 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var fs = __webpack_require__(2);
	var os = __webpack_require__(48);
	var path = __webpack_require__(1);
	var zlib = __webpack_require__(32);
	var child_process = __webpack_require__(35);
	var Logging = __webpack_require__(80);
	var AutoCollectHttpDependencies = __webpack_require__(133);
	var Util = __webpack_require__(134);
	var Sender = (function () {
		function Sender(config, onSuccess, onError) {
			this._config = config;
			this._onSuccess = onSuccess;
			this._onError = onError;
			this._enableDiskRetryMode = false;
			this._resendInterval = Sender.WAIT_BETWEEN_RESEND;
			this._maxBytesOnDisk = Sender.MAX_BYTES_ON_DISK;
			this._numConsecutiveFailures = 0;
			if (!Sender.OS_PROVIDES_FILE_PROTECTION) {
				// Node's chmod levels do not appropriately restrict file access on Windows
				// Use the built-in command line tool ICACLS on Windows to properly restrict
				// access to the temporary directory used for disk retry mode.
				if (Sender.USE_ICACLS) {
					// This should be async - but it's currently safer to have this synchronous
					// This guarantees we can immediately fail setDiskRetryMode if we need to
					try {
						Sender.OS_PROVIDES_FILE_PROTECTION = fs.existsSync(Sender.ICACLS_PATH);
					}
					catch (e) { }
					if (!Sender.OS_PROVIDES_FILE_PROTECTION) {
						Logging.warn(Sender.TAG, "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows.");
					}
				}
				else {
					// chmod works everywhere else
					Sender.OS_PROVIDES_FILE_PROTECTION = true;
				}
			}
		}
		/**
		* Enable or disable offline mode
		*/
		Sender.prototype.setDiskRetryMode = function (value, resendInterval, maxBytesOnDisk) {
			this._enableDiskRetryMode = Sender.OS_PROVIDES_FILE_PROTECTION && value;
			if (typeof resendInterval === 'number' && resendInterval >= 0) {
				this._resendInterval = Math.floor(resendInterval);
			}
			if (typeof maxBytesOnDisk === 'number' && maxBytesOnDisk >= 0) {
				this._maxBytesOnDisk = Math.floor(maxBytesOnDisk);
			}
			if (value && !Sender.OS_PROVIDES_FILE_PROTECTION) {
				this._enableDiskRetryMode = false;
				Logging.warn(Sender.TAG, "Ignoring request to enable disk retry mode. Sufficient file protection capabilities were not detected.");
			}
		};
		Sender.prototype.send = function (payload, callback) {
			var _this = this;
			var endpointUrl = this._config.endpointUrl;
			// todo: investigate specifying an agent here: https://nodejs.org/api/http.html#http_class_http_agent
			var options = {
				method: "POST",
				withCredentials: false,
				headers: {
					"Content-Type": "application/x-json-stream"
				}
			};
			zlib.gzip(payload, function (err, buffer) {
				var dataToSend = buffer;
				if (err) {
					Logging.warn(err);
					dataToSend = payload; // something went wrong so send without gzip
					options.headers["Content-Length"] = payload.length.toString();
				}
				else {
					options.headers["Content-Encoding"] = "gzip";
					options.headers["Content-Length"] = buffer.length;
				}
				Logging.info(Sender.TAG, options);
				// Ensure this request is not captured by auto-collection.
				options[AutoCollectHttpDependencies.disableCollectionRequestOption] = true;
				var requestCallback = function (res) {
					res.setEncoding("utf-8");
					//returns empty if the data is accepted
					var responseString = "";
					res.on("data", function (data) {
						responseString += data;
					});
					res.on("end", function () {
						_this._numConsecutiveFailures = 0;
						Logging.info(Sender.TAG, responseString);
						if (typeof _this._onSuccess === "function") {
							_this._onSuccess(responseString);
						}
						if (typeof callback === "function") {
							callback(responseString);
						}
						if (_this._enableDiskRetryMode) {
							// try to send any cached events if the user is back online
							if (res.statusCode === 200) {
								setTimeout(function () { return _this._sendFirstFileOnDisk(); }, _this._resendInterval);
								// store to disk in case of burst throttling
							}
							else if (res.statusCode === 408 ||
								res.statusCode === 429 ||
								res.statusCode === 439 ||
								res.statusCode === 500 ||
								res.statusCode === 503) {
								// TODO: Do not support partial success (206) until _sendFirstFileOnDisk checks payload age
								_this._storeToDisk(payload);
							}
						}
					});
				};
				var req = Util.makeRequest(_this._config, endpointUrl, options, requestCallback);
				req.on("error", function (error) {
					// todo: handle error codes better (group to recoverable/non-recoverable and persist)
					_this._numConsecutiveFailures++;
					// Only use warn level if retries are disabled or we've had some number of consecutive failures sending data
					// This is because warn level is printed in the console by default, and we don't want to be noisy for transient and self-recovering errors
					// Continue informing on each failure if verbose logging is being used
					if (!_this._enableDiskRetryMode || _this._numConsecutiveFailures > 0 && _this._numConsecutiveFailures % Sender.MAX_CONNECTION_FAILURES_BEFORE_WARN === 0) {
						var notice = "Ingestion endpoint could not be reached. This batch of telemetry items has been lost. Use Disk Retry Caching to enable resending of failed telemetry. Error:";
						if (_this._enableDiskRetryMode) {
							notice = "Ingestion endpoint could not be reached " + _this._numConsecutiveFailures + " consecutive times. There may be resulting telemetry loss. Most recent error:";
						}
						Logging.warn(Sender.TAG, notice, error);
					}
					else {
						var notice = "Transient failure to reach ingestion endpoint. This batch of telemetry items will be retried. Error:";
						Logging.info(Sender.TAG, notice, error);
					}
					_this._onErrorHelper(error);
					if (typeof callback === "function") {
						var errorMessage = "error sending telemetry";
						if (error && (typeof error.toString === "function")) {
							errorMessage = error.toString();
						}
						callback(errorMessage);
					}
					if (_this._enableDiskRetryMode) {
						_this._storeToDisk(payload);
					}
				});
				req.write(dataToSend);
				req.end();
			});
		};
		Sender.prototype.saveOnCrash = function (payload) {
			if (this._enableDiskRetryMode) {
				this._storeToDiskSync(payload);
			}
		};
		Sender.prototype._runICACLS = function (args, callback) {
			var aclProc = child_process.spawn(Sender.ICACLS_PATH, args, { windowsHide: true });
			aclProc.on("error", function (e) { return callback(e); });
			aclProc.on("close", function (code, signal) {
				return callback(code === 0 ? null : new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + code + ")"));
			});
		};
		Sender.prototype._runICACLSSync = function (args) {
			// Some very old versions of Node (< 0.11) don't have this
			if (child_process.spawnSync) {
				var aclProc = child_process.spawnSync(Sender.ICACLS_PATH, args, { windowsHide: true });
				if (aclProc.error) {
					throw aclProc.error;
				}
				else if (aclProc.status !== 0) {
					throw new Error("Setting ACL restrictions did not succeed (ICACLS returned code " + aclProc.status + ")");
				}
			}
			else {
				throw new Error("Could not synchronously call ICACLS under current version of Node.js");
			}
		};
		Sender.prototype._getACLIdentity = function (callback) {
			if (Sender.ACL_IDENTITY) {
				return callback(null, Sender.ACL_IDENTITY);
			}
			var psProc = child_process.spawn(Sender.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
				windowsHide: true,
				stdio: ['ignore', 'pipe', 'pipe'] // Needed to prevent hanging on Win 7
			});
			var data = "";
			psProc.stdout.on("data", function (d) { return data += d; });
			psProc.on("error", function (e) { return callback(e, null); });
			psProc.on("close", function (code, signal) {
				Sender.ACL_IDENTITY = data && data.trim();
				return callback(code === 0 ? null : new Error("Getting ACL identity did not succeed (PS returned code " + code + ")"), Sender.ACL_IDENTITY);
			});
		};
		Sender.prototype._getACLIdentitySync = function () {
			if (Sender.ACL_IDENTITY) {
				return Sender.ACL_IDENTITY;
			}
			// Some very old versions of Node (< 0.11) don't have this
			if (child_process.spawnSync) {
				var psProc = child_process.spawnSync(Sender.POWERSHELL_PATH, ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"], {
					windowsHide: true,
					stdio: ['ignore', 'pipe', 'pipe'] // Needed to prevent hanging on Win 7
				});
				if (psProc.error) {
					throw psProc.error;
				}
				else if (psProc.status !== 0) {
					throw new Error("Getting ACL identity did not succeed (PS returned code " + psProc.status + ")");
				}
				Sender.ACL_IDENTITY = psProc.stdout && psProc.stdout.toString().trim();
				return Sender.ACL_IDENTITY;
			}
			else {
				throw new Error("Could not synchronously get ACL identity under current version of Node.js");
			}
		};
		Sender.prototype._getACLArguments = function (directory, identity) {
			return [directory,
				"/grant", "*S-1-5-32-544:(OI)(CI)F",
				"/grant", identity + ":(OI)(CI)F",
				"/inheritance:r"]; // Remove all inherited permissions
		};
		Sender.prototype._applyACLRules = function (directory, callback) {
			var _this = this;
			if (!Sender.USE_ICACLS) {
				return callback(null);
			}
			// For performance, only run ACL rules if we haven't already during this session
			if (Sender.ACLED_DIRECTORIES[directory] === undefined) {
				// Avoid multiple calls race condition by setting ACLED_DIRECTORIES to false for this directory immediately
				// If batches are being failed faster than the processes spawned below return, some data won't be stored to disk
				// This is better than the alternative of potentially infinitely spawned processes
				Sender.ACLED_DIRECTORIES[directory] = false;
				// Restrict this directory to only current user and administrator access
				this._getACLIdentity(function (err, identity) {
					if (err) {
						Sender.ACLED_DIRECTORIES[directory] = false; // false is used to cache failed (vs undefined which is "not yet tried")
						return callback(err);
					}
					else {
						_this._runICACLS(_this._getACLArguments(directory, identity), function (err) {
							Sender.ACLED_DIRECTORIES[directory] = !err;
							return callback(err);
						});
					}
				});
			}
			else {
				return callback(Sender.ACLED_DIRECTORIES[directory] ? null :
					new Error("Setting ACL restrictions did not succeed (cached result)"));
			}
		};
		Sender.prototype._applyACLRulesSync = function (directory) {
			if (Sender.USE_ICACLS) {
				// For performance, only run ACL rules if we haven't already during this session
				if (Sender.ACLED_DIRECTORIES[directory] === undefined) {
					this._runICACLSSync(this._getACLArguments(directory, this._getACLIdentitySync()));
					Sender.ACLED_DIRECTORIES[directory] = true; // If we get here, it succeeded. _runIACLSSync will throw on failures
					return;
				}
				else if (!Sender.ACLED_DIRECTORIES[directory]) {
					throw new Error("Setting ACL restrictions did not succeed (cached result)");
				}
			}
		};
		Sender.prototype._confirmDirExists = function (directory, callback) {
			var _this = this;
			fs.lstat(directory, function (err, stats) {
				if (err && err.code === 'ENOENT') {
					fs.mkdir(directory, function (err) {
						if (err && err.code !== 'EEXIST') {
							callback(err);
						}
						else {
							_this._applyACLRules(directory, callback);
						}
					});
				}
				else if (!err && stats.isDirectory()) {
					_this._applyACLRules(directory, callback);
				}
				else {
					callback(err || new Error("Path existed but was not a directory"));
				}
			});
		};
		/**
		 * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
		 */
		Sender.prototype._getShallowDirectorySize = function (directory, callback) {
			// Get the directory listing
			fs.readdir(directory, function (err, files) {
				if (err) {
					return callback(err, -1);
				}
				var error = null;
				var totalSize = 0;
				var count = 0;
				if (files.length === 0) {
					callback(null, 0);
					return;
				}
				// Query all file sizes
				for (var i = 0; i < files.length; i++) {
					fs.stat(path.join(directory, files[i]), function (err, fileStats) {
						count++;
						if (err) {
							error = err;
						}
						else {
							if (fileStats.isFile()) {
								totalSize += fileStats.size;
							}
						}
						if (count === files.length) {
							// Did we get an error?
							if (error) {
								callback(error, -1);
							}
							else {
								callback(error, totalSize);
							}
						}
					});
				}
			});
		};
		/**
		 * Computes the size (in bytes) of all files in a directory at the root level. Synchronously.
		 */
		Sender.prototype._getShallowDirectorySizeSync = function (directory) {
			var files = fs.readdirSync(directory);
			var totalSize = 0;
			for (var i = 0; i < files.length; i++) {
				totalSize += fs.statSync(path.join(directory, files[i])).size;
			}
			return totalSize;
		};
		/**
		 * Stores the payload as a json file on disk in the temp directory
		 */
		Sender.prototype._storeToDisk = function (payload) {
			var _this = this;
			// tmpdir is /tmp for *nix and USERDIR/AppData/Local/Temp for Windows
			var directory = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
			// This will create the dir if it does not exist
			// Default permissions on *nix are directory listing from other users but no file creations
			Logging.info(Sender.TAG, "Checking existance of data storage directory: " + directory);
			this._confirmDirExists(directory, function (error) {
				if (error) {
					Logging.warn(Sender.TAG, "Error while checking/creating directory: " + (error && error.message));
					_this._onErrorHelper(error);
					return;
				}
				_this._getShallowDirectorySize(directory, function (err, size) {
					if (err || size < 0) {
						Logging.warn(Sender.TAG, "Error while checking directory size: " + (err && err.message));
						_this._onErrorHelper(err);
						return;
					}
					else if (size > _this._maxBytesOnDisk) {
						Logging.warn(Sender.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + size);
						return;
					}
					//create file - file name for now is the timestamp, a better approach would be a UUID but that
					//would require an external dependency
					var fileName = new Date().getTime() + ".ai.json";
					var fileFullPath = path.join(directory, fileName);
					// Mode 600 is w/r for creator and no read access for others (only applies on *nix)
					// For Windows, ACL rules are applied to the entire directory (see logic in _confirmDirExists and _applyACLRules)
					Logging.info(Sender.TAG, "saving data to disk at: " + fileFullPath);
					fs.writeFile(fileFullPath, payload, { mode: 384 }, function (error) { return _this._onErrorHelper(error); });
				});
			});
		};
		/**
		 * Stores the payload as a json file on disk using sync file operations
		 * this is used when storing data before crashes
		 */
		Sender.prototype._storeToDiskSync = function (payload) {
			// tmpdir is /tmp for *nix and USERDIR/AppData/Local/Temp for Windows
			var directory = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
			try {
				Logging.info(Sender.TAG, "Checking existance of data storage directory: " + directory);
				if (!fs.existsSync(directory)) {
					fs.mkdirSync(directory);
				}
				// Make sure permissions are valid
				this._applyACLRulesSync(directory);
				var dirSize = this._getShallowDirectorySizeSync(directory);
				if (dirSize > this._maxBytesOnDisk) {
					Logging.info(Sender.TAG, "Not saving data due to max size limit being met. Directory size in bytes is: " + dirSize);
					return;
				}
				//create file - file name for now is the timestamp, a better approach would be a UUID but that
				//would require an external dependency
				var fileName = new Date().getTime() + ".ai.json";
				var fileFullPath = path.join(directory, fileName);
				// Mode 600 is w/r for creator and no access for anyone else (only applies on *nix)
				Logging.info(Sender.TAG, "saving data before crash to disk at: " + fileFullPath);
				fs.writeFileSync(fileFullPath, payload, { mode: 384 });
			}
			catch (error) {
				Logging.warn(Sender.TAG, "Error while saving data to disk: " + (error && error.message));
				this._onErrorHelper(error);
			}
		};
		/**
		 * Check for temp telemetry files
		 * reads the first file if exist, deletes it and tries to send its load
		 */
		Sender.prototype._sendFirstFileOnDisk = function () {
			var _this = this;
			var tempDir = path.join(os.tmpdir(), Sender.TEMPDIR_PREFIX + this._config.instrumentationKey);
			fs.exists(tempDir, function (exists) {
				if (exists) {
					fs.readdir(tempDir, function (error, files) {
						if (!error) {
							files = files.filter(function (f) { return path.basename(f).indexOf(".ai.json") > -1; });
							if (files.length > 0) {
								var firstFile = files[0];
								var filePath = path.join(tempDir, firstFile);
								fs.readFile(filePath, function (error, payload) {
									if (!error) {
										// delete the file first to prevent double sending
										fs.unlink(filePath, function (error) {
											if (!error) {
												_this.send(payload);
											}
											else {
												_this._onErrorHelper(error);
											}
										});
									}
									else {
										_this._onErrorHelper(error);
									}
								});
							}
						}
						else {
							_this._onErrorHelper(error);
						}
					});
				}
			});
		};
		Sender.prototype._onErrorHelper = function (error) {
			if (typeof this._onError === "function") {
				this._onError(error);
			}
		};
		Sender.TAG = "Sender";
		Sender.ICACLS_PATH = process.env.systemdrive + "/windows/system32/icacls.exe";
		Sender.POWERSHELL_PATH = process.env.systemdrive + "/windows/system32/windowspowershell/v1.0/powershell.exe";
		Sender.ACLED_DIRECTORIES = {};
		Sender.ACL_IDENTITY = null;
		// the amount of time the SDK will wait between resending cached data, this buffer is to avoid any throtelling from the service side
		Sender.WAIT_BETWEEN_RESEND = 60 * 1000;
		Sender.MAX_BYTES_ON_DISK = 50 * 1000 * 1000;
		Sender.MAX_CONNECTION_FAILURES_BEFORE_WARN = 5;
		Sender.TEMPDIR_PREFIX = "appInsights-node";
		Sender.OS_PROVIDES_FILE_PROTECTION = false;
		Sender.USE_ICACLS = os.type() === "Windows_NT";
		return Sender;
	}());
	module.exports = Sender;
	//# sourceMappingURL=Sender.js.map

	/***/ }),
	/* 154 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Contracts = __webpack_require__(106);
	var Util = __webpack_require__(134);
	var CorrelationContextManager_1 = __webpack_require__(79);
	/**
	 * Manages the logic of creating envelopes from Telemetry objects
	 */
	var EnvelopeFactory = (function () {
		function EnvelopeFactory() {
		}
		/**
		 * Creates envelope ready to be sent by Channel
		 * @param telemetry Telemetry data
		 * @param telemetryType Type of telemetry
		 * @param commonProperties Bag of custom common properties to be added to the envelope
		 * @param context Client context
		 * @param config Client configuration
		 */
		EnvelopeFactory.createEnvelope = function (telemetry, telemetryType, commonProperties, context, config) {
			var data = null;
			switch (telemetryType) {
				case Contracts.TelemetryType.Trace:
					data = EnvelopeFactory.createTraceData(telemetry);
					break;
				case Contracts.TelemetryType.Dependency:
					data = EnvelopeFactory.createDependencyData(telemetry);
					break;
				case Contracts.TelemetryType.Event:
					data = EnvelopeFactory.createEventData(telemetry);
					break;
				case Contracts.TelemetryType.Exception:
					data = EnvelopeFactory.createExceptionData(telemetry);
					break;
				case Contracts.TelemetryType.Request:
					data = EnvelopeFactory.createRequestData(telemetry);
					break;
				case Contracts.TelemetryType.Metric:
					data = EnvelopeFactory.createMetricData(telemetry);
					break;
			}
			if (commonProperties && Contracts.domainSupportsProperties(data.baseData)) {
				if (data && data.baseData) {
					// if no properties are specified just add the common ones
					if (!data.baseData.properties) {
						data.baseData.properties = commonProperties;
					}
					else {
						// otherwise, check each of the common ones
						for (var name in commonProperties) {
							// only override if the property `name` has not been set on this item
							if (!data.baseData.properties[name]) {
								data.baseData.properties[name] = commonProperties[name];
							}
						}
					}
				}
				// sanitize properties
				data.baseData.properties = Util.validateStringMap(data.baseData.properties);
			}
			var iKey = config ? config.instrumentationKey || "" : "";
			var envelope = new Contracts.Envelope();
			envelope.data = data;
			envelope.iKey = iKey;
			// this is kind of a hack, but the envelope name is always the same as the data name sans the chars "data"
			envelope.name =
				"Microsoft.ApplicationInsights." +
					iKey.replace(/-/g, "") +
					"." +
					data.baseType.substr(0, data.baseType.length - 4);
			envelope.tags = this.getTags(context, telemetry.tagOverrides);
			envelope.time = (new Date()).toISOString();
			envelope.ver = 1;
			envelope.sampleRate = config ? config.samplingPercentage : 100;
			// Exclude metrics from sampling by default
			if (telemetryType === Contracts.TelemetryType.Metric) {
				envelope.sampleRate = 100;
			}
			return envelope;
		};
		EnvelopeFactory.createTraceData = function (telemetry) {
			var trace = new Contracts.MessageData();
			trace.message = telemetry.message;
			trace.properties = telemetry.properties;
			if (!isNaN(telemetry.severity)) {
				trace.severityLevel = telemetry.severity;
			}
			else {
				trace.severityLevel = Contracts.SeverityLevel.Information;
			}
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Trace);
			data.baseData = trace;
			return data;
		};
		EnvelopeFactory.createDependencyData = function (telemetry) {
			var remoteDependency = new Contracts.RemoteDependencyData();
			remoteDependency.name = telemetry.name;
			remoteDependency.data = telemetry.data;
			remoteDependency.target = telemetry.target;
			remoteDependency.duration = Util.msToTimeSpan(telemetry.duration);
			remoteDependency.success = telemetry.success;
			remoteDependency.type = telemetry.dependencyTypeName;
			remoteDependency.properties = telemetry.properties;
			remoteDependency.resultCode = (telemetry.resultCode ? telemetry.resultCode + '' : '');
			if (telemetry.id) {
				remoteDependency.id = telemetry.id;
			}
			else {
				remoteDependency.id = Util.w3cTraceId();
			}
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Dependency);
			data.baseData = remoteDependency;
			return data;
		};
		EnvelopeFactory.createEventData = function (telemetry) {
			var event = new Contracts.EventData();
			event.name = telemetry.name;
			event.properties = telemetry.properties;
			event.measurements = telemetry.measurements;
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Event);
			data.baseData = event;
			return data;
		};
		EnvelopeFactory.createExceptionData = function (telemetry) {
			var exception = new Contracts.ExceptionData();
			exception.properties = telemetry.properties;
			exception.severityLevel = Contracts.SeverityLevel.Error;
			exception.measurements = telemetry.measurements;
			exception.exceptions = [];
			var stack = telemetry.exception["stack"];
			var exceptionDetails = new Contracts.ExceptionDetails();
			exceptionDetails.message = telemetry.exception.message;
			exceptionDetails.typeName = telemetry.exception.name;
			exceptionDetails.parsedStack = this.parseStack(stack);
			exceptionDetails.hasFullStack = Util.isArray(exceptionDetails.parsedStack) && exceptionDetails.parsedStack.length > 0;
			exception.exceptions.push(exceptionDetails);
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Exception);
			data.baseData = exception;
			return data;
		};
		EnvelopeFactory.createRequestData = function (telemetry) {
			var requestData = new Contracts.RequestData();
			if (telemetry.id) {
				requestData.id = telemetry.id;
			}
			else {
				requestData.id = Util.w3cTraceId();
			}
			requestData.name = telemetry.name;
			requestData.url = telemetry.url;
			requestData.source = telemetry.source;
			requestData.duration = Util.msToTimeSpan(telemetry.duration);
			requestData.responseCode = (telemetry.resultCode ? telemetry.resultCode + '' : '');
			requestData.success = telemetry.success;
			requestData.properties = telemetry.properties;
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Request);
			data.baseData = requestData;
			return data;
		};
		EnvelopeFactory.createMetricData = function (telemetry) {
			var metrics = new Contracts.MetricData(); // todo: enable client-batching of these
			metrics.metrics = [];
			var metric = new Contracts.DataPoint();
			metric.count = !isNaN(telemetry.count) ? telemetry.count : 1;
			metric.kind = Contracts.DataPointType.Aggregation;
			metric.max = !isNaN(telemetry.max) ? telemetry.max : telemetry.value;
			metric.min = !isNaN(telemetry.min) ? telemetry.min : telemetry.value;
			metric.name = telemetry.name;
			metric.stdDev = !isNaN(telemetry.stdDev) ? telemetry.stdDev : 0;
			metric.value = telemetry.value;
			metrics.metrics.push(metric);
			metrics.properties = telemetry.properties;
			var data = new Contracts.Data();
			data.baseType = Contracts.telemetryTypeToBaseType(Contracts.TelemetryType.Metric);
			data.baseData = metrics;
			return data;
		};
		EnvelopeFactory.getTags = function (context, tagOverrides) {
			var correlationContext = CorrelationContextManager_1.CorrelationContextManager.getCurrentContext();
			// Make a copy of context tags so we don't alter the actual object
			// Also perform tag overriding
			var newTags = {};
			if (context && context.tags) {
				for (var key in context.tags) {
					newTags[key] = context.tags[key];
				}
			}
			if (tagOverrides) {
				for (var key in tagOverrides) {
					newTags[key] = tagOverrides[key];
				}
			}
			// Fill in internally-populated values if not already set
			if (correlationContext) {
				newTags[context.keys.operationId] = newTags[context.keys.operationId] || correlationContext.operation.id;
				newTags[context.keys.operationName] = newTags[context.keys.operationName] || correlationContext.operation.name;
				newTags[context.keys.operationParentId] = newTags[context.keys.operationParentId] || correlationContext.operation.parentId;
			}
			return newTags;
		};
		EnvelopeFactory.parseStack = function (stack) {
			var parsedStack = undefined;
			if (typeof stack === "string") {
				var frames = stack.split("\n");
				parsedStack = [];
				var level = 0;
				var totalSizeInBytes = 0;
				for (var i = 0; i <= frames.length; i++) {
					var frame = frames[i];
					if (_StackFrame.regex.test(frame)) {
						var parsedFrame = new _StackFrame(frames[i], level++);
						totalSizeInBytes += parsedFrame.sizeInBytes;
						parsedStack.push(parsedFrame);
					}
				}
				// DP Constraint - exception parsed stack must be < 32KB
				// remove frames from the middle to meet the threshold
				var exceptionParsedStackThreshold = 32 * 1024;
				if (totalSizeInBytes > exceptionParsedStackThreshold) {
					var left = 0;
					var right = parsedStack.length - 1;
					var size = 0;
					var acceptedLeft = left;
					var acceptedRight = right;
					while (left < right) {
						// check size
						var lSize = parsedStack[left].sizeInBytes;
						var rSize = parsedStack[right].sizeInBytes;
						size += lSize + rSize;
						if (size > exceptionParsedStackThreshold) {
							// remove extra frames from the middle
							var howMany = acceptedRight - acceptedLeft + 1;
							parsedStack.splice(acceptedLeft, howMany);
							break;
						}
						// update pointers
						acceptedLeft = left;
						acceptedRight = right;
						left++;
						right--;
					}
				}
			}
			return parsedStack;
		};
		return EnvelopeFactory;
	}());
	var _StackFrame = (function () {
		function _StackFrame(frame, level) {
			this.sizeInBytes = 0;
			this.level = level;
			this.method = "<no_method>";
			this.assembly = Util.trim(frame);
			var matches = frame.match(_StackFrame.regex);
			if (matches && matches.length >= 5) {
				this.method = Util.trim(matches[2]) || this.method;
				this.fileName = Util.trim(matches[4]) || "<no_filename>";
				this.line = parseInt(matches[5]) || 0;
			}
			this.sizeInBytes += this.method.length;
			this.sizeInBytes += this.fileName.length;
			this.sizeInBytes += this.assembly.length;
			// todo: these might need to be removed depending on how the back-end settles on their size calculation
			this.sizeInBytes += _StackFrame.baseSize;
			this.sizeInBytes += this.level.toString().length;
			this.sizeInBytes += this.line.toString().length;
		}
		// regex to match stack frames from ie/chrome/ff
		// methodName=$2, fileName=$4, lineNo=$5, column=$6
		_StackFrame.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/;
		_StackFrame.baseSize = 58; //'{"method":"","level":,"assembly":"","fileName":"","line":}'.length
		return _StackFrame;
	}());
	module.exports = EnvelopeFactory;
	//# sourceMappingURL=EnvelopeFactory.js.map

	/***/ }),
	/* 155 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Return a hash value for an object.
	 */
	function hash(obj, hashVal = 0) {
		switch (typeof obj) {
			case 'object':
				if (obj === null) {
					return numberHash(349, hashVal);
				}
				else if (Array.isArray(obj)) {
					return arrayHash(obj, hashVal);
				}
				return objectHash(obj, hashVal);
			case 'string':
				return stringHash(obj, hashVal);
			case 'boolean':
				return booleanHash(obj, hashVal);
			case 'number':
				return numberHash(obj, hashVal);
			case 'undefined':
				return 937 * 31;
			default:
				return numberHash(obj, 617);
		}
	}
	exports.hash = hash;
	function numberHash(val, initialHashVal) {
		return (((initialHashVal << 5) - initialHashVal) + val) | 0; // hashVal * 31 + ch, keep as int32
	}
	function booleanHash(b, initialHashVal) {
		return numberHash(b ? 433 : 863, initialHashVal);
	}
	function stringHash(s, hashVal) {
		hashVal = numberHash(149417, hashVal);
		for (let i = 0, length = s.length; i < length; i++) {
			hashVal = numberHash(s.charCodeAt(i), hashVal);
		}
		return hashVal;
	}
	function arrayHash(arr, initialHashVal) {
		initialHashVal = numberHash(104579, initialHashVal);
		return arr.reduce((hashVal, item) => hash(item, hashVal), initialHashVal);
	}
	function objectHash(obj, initialHashVal) {
		initialHashVal = numberHash(181387, initialHashVal);
		return Object.keys(obj).sort().reduce((hashVal, key) => {
			hashVal = stringHash(key, hashVal);
			return hash(obj[key], hashVal);
		}, initialHashVal);
	}


	/***/ })
	/******/ ])));
	//# sourceMappingURL=jsonMain.js.map