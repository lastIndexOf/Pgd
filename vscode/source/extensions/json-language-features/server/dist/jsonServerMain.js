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
	const vscode_languageserver_1 = __webpack_require__(1);
	const request_light_1 = __webpack_require__(36);
	const fs = __webpack_require__(34);
	const vscode_uri_1 = __webpack_require__(59);
	const URL = __webpack_require__(33);
	const runner_1 = __webpack_require__(60);
	const vscode_json_languageservice_1 = __webpack_require__(61);
	const languageModelCache_1 = __webpack_require__(81);
	var SchemaAssociationNotification;
	(function (SchemaAssociationNotification) {
		SchemaAssociationNotification.type = new vscode_languageserver_1.NotificationType('json/schemaAssociations');
	})(SchemaAssociationNotification || (SchemaAssociationNotification = {}));
	var VSCodeContentRequest;
	(function (VSCodeContentRequest) {
		VSCodeContentRequest.type = new vscode_languageserver_1.RequestType('vscode/content');
	})(VSCodeContentRequest || (VSCodeContentRequest = {}));
	var SchemaContentChangeNotification;
	(function (SchemaContentChangeNotification) {
		SchemaContentChangeNotification.type = new vscode_languageserver_1.NotificationType('json/schemaContent');
	})(SchemaContentChangeNotification || (SchemaContentChangeNotification = {}));
	var ForceValidateRequest;
	(function (ForceValidateRequest) {
		ForceValidateRequest.type = new vscode_languageserver_1.RequestType('json/validate');
	})(ForceValidateRequest || (ForceValidateRequest = {}));
	// Create a connection for the server
	const connection = vscode_languageserver_1.createConnection();
	process.on('unhandledRejection', (e) => {
		console.error(runner_1.formatError(`Unhandled exception`, e));
	});
	process.on('uncaughtException', (e) => {
		console.error(runner_1.formatError(`Unhandled exception`, e));
	});
	console.log = connection.console.log.bind(connection.console);
	console.error = connection.console.error.bind(connection.console);
	const workspaceContext = {
		resolveRelativePath: (relativePath, resource) => {
			return URL.resolve(resource, relativePath);
		}
	};
	function getSchemaRequestService(handledSchemas) {
		return (uri) => {
			const protocol = uri.substr(0, uri.indexOf(':'));
			if (!handledSchemas || handledSchemas[protocol]) {
				if (protocol === 'file') {
					const fsPath = vscode_uri_1.default.parse(uri).fsPath;
					return new Promise((c, e) => {
						fs.readFile(fsPath, 'UTF-8', (err, result) => {
							err ? e(err.message || err.toString()) : c(result.toString());
						});
					});
				}
				else if (protocol === 'http' || protocol === 'https') {
					if (uri.indexOf('//schema.management.azure.com/') !== -1) {
						/* __GDPR__
							"json.schema" : {
								"schemaURL" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
							}
						 */
						connection.telemetry.logEvent({
							key: 'json.schema',
							value: {
								schemaURL: uri
							}
						});
					}
					const headers = { 'Accept-Encoding': 'gzip, deflate' };
					return request_light_1.xhr({ url: uri, followRedirects: 5, headers }).then(response => {
						return response.responseText;
					}, (error) => {
						return Promise.reject(error.responseText || request_light_1.getErrorStatusDescription(error.status) || error.toString());
					});
				}
			}
			return connection.sendRequest(VSCodeContentRequest.type, uri).then(responseText => {
				return responseText;
			}, error => {
				return Promise.reject(error.message);
			});
		};
	}
	// create the JSON language service
	let languageService = vscode_json_languageservice_1.getLanguageService({
		workspaceContext,
		contributions: [],
	});
	// Create a simple text document manager. The text document manager
	// supports full document sync only
	const documents = new vscode_languageserver_1.TextDocuments();
	// Make the text document manager listen on the connection
	// for open, change and close text document events
	documents.listen(connection);
	let clientSnippetSupport = false;
	let clientDynamicRegisterSupport = false;
	let foldingRangeLimit = Number.MAX_VALUE;
	let hierarchicalDocumentSymbolSupport = false;
	// After the server has started the client sends an initialize request. The server receives
	// in the passed params the rootPath of the workspace plus the client capabilities.
	connection.onInitialize((params) => {
		const handledProtocols = params.initializationOptions && params.initializationOptions['handledSchemaProtocols'];
		languageService = vscode_json_languageservice_1.getLanguageService({
			schemaRequestService: getSchemaRequestService(handledProtocols),
			workspaceContext,
			contributions: [],
			clientCapabilities: params.capabilities
		});
		function getClientCapability(name, def) {
			const keys = name.split('.');
			let c = params.capabilities;
			for (let i = 0; c && i < keys.length; i++) {
				if (!c.hasOwnProperty(keys[i])) {
					return def;
				}
				c = c[keys[i]];
			}
			return c;
		}
		clientSnippetSupport = getClientCapability('textDocument.completion.completionItem.snippetSupport', false);
		clientDynamicRegisterSupport = getClientCapability('workspace.symbol.dynamicRegistration', false);
		foldingRangeLimit = getClientCapability('textDocument.foldingRange.rangeLimit', Number.MAX_VALUE);
		hierarchicalDocumentSymbolSupport = getClientCapability('textDocument.documentSymbol.hierarchicalDocumentSymbolSupport', false);
		const capabilities = {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			completionProvider: clientSnippetSupport ? { resolveProvider: true, triggerCharacters: ['"', ':'] } : undefined,
			hoverProvider: true,
			documentSymbolProvider: true,
			documentRangeFormattingProvider: false,
			colorProvider: {},
			foldingRangeProvider: true
		};
		return { capabilities };
	});
	let jsonConfigurationSettings = undefined;
	let schemaAssociations = undefined;
	let formatterRegistration = null;
	// The settings have changed. Is send on server activation as well.
	connection.onDidChangeConfiguration((change) => {
		let settings = change.settings;
		request_light_1.configure(settings.http && settings.http.proxy, settings.http && settings.http.proxyStrictSSL);
		jsonConfigurationSettings = settings.json && settings.json.schemas;
		updateConfiguration();
		// dynamically enable & disable the formatter
		if (clientDynamicRegisterSupport) {
			const enableFormatter = settings && settings.json && settings.json.format && settings.json.format.enable;
			if (enableFormatter) {
				if (!formatterRegistration) {
					formatterRegistration = connection.client.register(vscode_languageserver_1.DocumentRangeFormattingRequest.type, { documentSelector: [{ language: 'json' }, { language: 'jsonc' }] });
				}
			}
			else if (formatterRegistration) {
				formatterRegistration.then(r => r.dispose());
				formatterRegistration = null;
			}
		}
	});
	// The jsonValidation extension configuration has changed
	connection.onNotification(SchemaAssociationNotification.type, associations => {
		schemaAssociations = associations;
		updateConfiguration();
	});
	// A schema has changed
	connection.onNotification(SchemaContentChangeNotification.type, uri => {
		languageService.resetSchema(uri);
	});
	// Retry schema validation on all open documents
	connection.onRequest(ForceValidateRequest.type, uri => {
		return new Promise(resolve => {
			const document = documents.get(uri);
			if (document) {
				updateConfiguration();
				validateTextDocument(document, diagnostics => {
					resolve(diagnostics);
				});
			}
			else {
				resolve([]);
			}
		});
	});
	function updateConfiguration() {
		const languageSettings = {
			validate: true,
			allowComments: true,
			schemas: new Array()
		};
		if (schemaAssociations) {
			for (const pattern in schemaAssociations) {
				const association = schemaAssociations[pattern];
				if (Array.isArray(association)) {
					association.forEach(uri => {
						languageSettings.schemas.push({ uri, fileMatch: [pattern] });
					});
				}
			}
		}
		if (jsonConfigurationSettings) {
			jsonConfigurationSettings.forEach((schema, index) => {
				let uri = schema.url;
				if (!uri && schema.schema) {
					uri = schema.schema.id || `vscode://schemas/custom/${index}`;
				}
				if (uri) {
					languageSettings.schemas.push({ uri, fileMatch: schema.fileMatch, schema: schema.schema });
				}
			});
		}
		languageService.configure(languageSettings);
		// Revalidate any open text documents
		documents.all().forEach(triggerValidation);
	}
	// The content of a text document has changed. This event is emitted
	// when the text document first opened or when its content has changed.
	documents.onDidChangeContent((change) => {
		triggerValidation(change.document);
	});
	// a document has closed: clear all diagnostics
	documents.onDidClose(event => {
		cleanPendingValidation(event.document);
		connection.sendDiagnostics({ uri: event.document.uri, diagnostics: [] });
	});
	const pendingValidationRequests = {};
	const validationDelayMs = 500;
	function cleanPendingValidation(textDocument) {
		const request = pendingValidationRequests[textDocument.uri];
		if (request) {
			clearTimeout(request);
			delete pendingValidationRequests[textDocument.uri];
		}
	}
	function triggerValidation(textDocument) {
		cleanPendingValidation(textDocument);
		pendingValidationRequests[textDocument.uri] = setTimeout(() => {
			delete pendingValidationRequests[textDocument.uri];
			validateTextDocument(textDocument);
		}, validationDelayMs);
	}
	function validateTextDocument(textDocument, callback) {
		const respond = (diagnostics) => {
			connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
			if (callback) {
				callback(diagnostics);
			}
		};
		if (textDocument.getText().length === 0) {
			respond([]); // ignore empty documents
			return;
		}
		const jsonDocument = getJSONDocument(textDocument);
		const version = textDocument.version;
		const documentSettings = textDocument.languageId === 'jsonc' ? { comments: 'ignore', trailingCommas: 'ignore' } : { comments: 'error', trailingCommas: 'error' };
		languageService.doValidation(textDocument, jsonDocument, documentSettings).then(diagnostics => {
			setTimeout(() => {
				const currDocument = documents.get(textDocument.uri);
				if (currDocument && currDocument.version === version) {
					respond(diagnostics); // Send the computed diagnostics to VSCode.
				}
			}, 100);
		}, error => {
			connection.console.error(runner_1.formatError(`Error while validating ${textDocument.uri}`, error));
		});
	}
	connection.onDidChangeWatchedFiles((change) => {
		// Monitored files have changed in VSCode
		let hasChanges = false;
		change.changes.forEach(c => {
			if (languageService.resetSchema(c.uri)) {
				hasChanges = true;
			}
		});
		if (hasChanges) {
			documents.all().forEach(triggerValidation);
		}
	});
	const jsonDocuments = languageModelCache_1.getLanguageModelCache(10, 60, document => languageService.parseJSONDocument(document));
	documents.onDidClose(e => {
		jsonDocuments.onDocumentRemoved(e.document);
	});
	connection.onShutdown(() => {
		jsonDocuments.dispose();
	});
	function getJSONDocument(document) {
		return jsonDocuments.get(document);
	}
	connection.onCompletion((textDocumentPosition, token) => {
		return runner_1.runSafeAsync(async () => {
			const document = documents.get(textDocumentPosition.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				return languageService.doComplete(document, textDocumentPosition.position, jsonDocument);
			}
			return null;
		}, null, `Error while computing completions for ${textDocumentPosition.textDocument.uri}`, token);
	});
	connection.onCompletionResolve((completionItem, token) => {
		return runner_1.runSafeAsync(() => {
			return languageService.doResolve(completionItem);
		}, completionItem, `Error while resolving completion proposal`, token);
	});
	connection.onHover((textDocumentPositionParams, token) => {
		return runner_1.runSafeAsync(async () => {
			const document = documents.get(textDocumentPositionParams.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				return languageService.doHover(document, textDocumentPositionParams.position, jsonDocument);
			}
			return null;
		}, null, `Error while computing hover for ${textDocumentPositionParams.textDocument.uri}`, token);
	});
	connection.onDocumentSymbol((documentSymbolParams, token) => {
		return runner_1.runSafe(() => {
			const document = documents.get(documentSymbolParams.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				if (hierarchicalDocumentSymbolSupport) {
					return languageService.findDocumentSymbols2(document, jsonDocument);
				}
				else {
					return languageService.findDocumentSymbols(document, jsonDocument);
				}
			}
			return [];
		}, [], `Error while computing document symbols for ${documentSymbolParams.textDocument.uri}`, token);
	});
	connection.onDocumentRangeFormatting((formatParams, token) => {
		return runner_1.runSafe(() => {
			const document = documents.get(formatParams.textDocument.uri);
			if (document) {
				return languageService.format(document, formatParams.range, formatParams.options);
			}
			return [];
		}, [], `Error while formatting range for ${formatParams.textDocument.uri}`, token);
	});
	connection.onDocumentColor((params, token) => {
		return runner_1.runSafeAsync(async () => {
			const document = documents.get(params.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				return languageService.findDocumentColors(document, jsonDocument);
			}
			return [];
		}, [], `Error while computing document colors for ${params.textDocument.uri}`, token);
	});
	connection.onColorPresentation((params, token) => {
		return runner_1.runSafe(() => {
			const document = documents.get(params.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				return languageService.getColorPresentations(document, jsonDocument, params.color, params.range);
			}
			return [];
		}, [], `Error while computing color presentations for ${params.textDocument.uri}`, token);
	});
	connection.onFoldingRanges((params, token) => {
		return runner_1.runSafe(() => {
			const document = documents.get(params.textDocument.uri);
			if (document) {
				return languageService.getFoldingRanges(document, { rangeLimit: foldingRangeLimit });
			}
			return null;
		}, null, `Error while computing folding ranges for ${params.textDocument.uri}`, token);
	});
	connection.onRequest('$/textDocument/selectionRanges', async (params, token) => {
		return runner_1.runSafe(() => {
			const document = documents.get(params.textDocument.uri);
			if (document) {
				const jsonDocument = getJSONDocument(document);
				return languageService.getSelectionRanges(document, params.positions, jsonDocument);
			}
			return [];
		}, [], `Error while computing selection ranges for ${params.textDocument.uri}`, token);
	});
	// Listen on the connection
	connection.listen();


	/***/ }),
	/* 1 */
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
	const vscode_languageserver_protocol_1 = __webpack_require__(2);
	exports.Event = vscode_languageserver_protocol_1.Event;
	const configuration_1 = __webpack_require__(28);
	const workspaceFolders_1 = __webpack_require__(30);
	const Is = __webpack_require__(29);
	const UUID = __webpack_require__(31);
	// ------------- Reexport the API surface of the language worker API ----------------------
	__export(__webpack_require__(2));
	const fm = __webpack_require__(32);
	var Files;
	(function (Files) {
		Files.uriToFilePath = fm.uriToFilePath;
		Files.resolveGlobalNodePath = fm.resolveGlobalNodePath;
		Files.resolveGlobalYarnPath = fm.resolveGlobalYarnPath;
		Files.resolve = fm.resolve;
		Files.resolveModulePath = fm.resolveModulePath;
	})(Files = exports.Files || (exports.Files = {}));
	let shutdownReceived = false;
	let exitTimer = undefined;
	function setupExitTimer() {
		const argName = '--clientProcessId';
		function runTimer(value) {
			try {
				let processId = parseInt(value);
				if (!isNaN(processId)) {
					exitTimer = setInterval(() => {
						try {
							process.kill(processId, 0);
						}
						catch (ex) {
							// Parent process doesn't exist anymore. Exit the server.
							process.exit(shutdownReceived ? 0 : 1);
						}
					}, 3000);
				}
			}
			catch (e) {
				// Ignore errors;
			}
		}
		for (let i = 2; i < process.argv.length; i++) {
			let arg = process.argv[i];
			if (arg === argName && i + 1 < process.argv.length) {
				runTimer(process.argv[i + 1]);
				return;
			}
			else {
				let args = arg.split('=');
				if (args[0] === argName) {
					runTimer(args[1]);
				}
			}
		}
	}
	setupExitTimer();
	function null2Undefined(value) {
		if (value === null) {
			return void 0;
		}
		return value;
	}
	/**
	 * A manager for simple text documents
	 */
	class TextDocuments {
		/**
		 * Create a new text document manager.
		 */
		constructor() {
			this._documents = Object.create(null);
			this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
			this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
			this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
			this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
			this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
		}
		/**
		 * Returns the [TextDocumentSyncKind](#TextDocumentSyncKind) used by
		 * this text document manager.
		 */
		get syncKind() {
			return vscode_languageserver_protocol_1.TextDocumentSyncKind.Full;
		}
		/**
		 * An event that fires when a text document managed by this manager
		 * has been opened or the content changes.
		 */
		get onDidChangeContent() {
			return this._onDidChangeContent.event;
		}
		/**
		 * An event that fires when a text document managed by this manager
		 * has been opened.
		 */
		get onDidOpen() {
			return this._onDidOpen.event;
		}
		/**
		 * An event that fires when a text document managed by this manager
		 * will be saved.
		 */
		get onWillSave() {
			return this._onWillSave.event;
		}
		/**
		 * Sets a handler that will be called if a participant wants to provide
		 * edits during a text document save.
		 */
		onWillSaveWaitUntil(handler) {
			this._willSaveWaitUntil = handler;
		}
		/**
		 * An event that fires when a text document managed by this manager
		 * has been saved.
		 */
		get onDidSave() {
			return this._onDidSave.event;
		}
		/**
		 * An event that fires when a text document managed by this manager
		 * has been closed.
		 */
		get onDidClose() {
			return this._onDidClose.event;
		}
		/**
		 * Returns the document for the given URI. Returns undefined if
		 * the document is not mananged by this instance.
		 *
		 * @param uri The text document's URI to retrieve.
		 * @return the text document or `undefined`.
		 */
		get(uri) {
			return this._documents[uri];
		}
		/**
		 * Returns all text documents managed by this instance.
		 *
		 * @return all text documents.
		 */
		all() {
			return Object.keys(this._documents).map(key => this._documents[key]);
		}
		/**
		 * Returns the URIs of all text documents managed by this instance.
		 *
		 * @return the URI's of all text documents.
		 */
		keys() {
			return Object.keys(this._documents);
		}
		/**
		 * Listens for `low level` notification on the given connection to
		 * update the text documents managed by this instance.
		 *
		 * @param connection The connection to listen on.
		 */
		listen(connection) {
			function isUpdateableDocument(value) {
				return Is.func(value.update);
			}
			connection.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Full;
			connection.onDidOpenTextDocument((event) => {
				let td = event.textDocument;
				let document = vscode_languageserver_protocol_1.TextDocument.create(td.uri, td.languageId, td.version, td.text);
				this._documents[td.uri] = document;
				let toFire = Object.freeze({ document });
				this._onDidOpen.fire(toFire);
				this._onDidChangeContent.fire(toFire);
			});
			connection.onDidChangeTextDocument((event) => {
				let td = event.textDocument;
				let changes = event.contentChanges;
				let last = changes.length > 0 ? changes[changes.length - 1] : undefined;
				if (last) {
					let document = this._documents[td.uri];
					if (document && isUpdateableDocument(document)) {
						if (td.version === null || td.version === void 0) {
							throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
						}
						document.update(last, td.version);
						this._onDidChangeContent.fire(Object.freeze({ document }));
					}
				}
			});
			connection.onDidCloseTextDocument((event) => {
				let document = this._documents[event.textDocument.uri];
				if (document) {
					delete this._documents[event.textDocument.uri];
					this._onDidClose.fire(Object.freeze({ document }));
				}
			});
			connection.onWillSaveTextDocument((event) => {
				let document = this._documents[event.textDocument.uri];
				if (document) {
					this._onWillSave.fire(Object.freeze({ document, reason: event.reason }));
				}
			});
			connection.onWillSaveTextDocumentWaitUntil((event, token) => {
				let document = this._documents[event.textDocument.uri];
				if (document && this._willSaveWaitUntil) {
					return this._willSaveWaitUntil(Object.freeze({ document, reason: event.reason }), token);
				}
				else {
					return [];
				}
			});
			connection.onDidSaveTextDocument((event) => {
				let document = this._documents[event.textDocument.uri];
				if (document) {
					this._onDidSave.fire(Object.freeze({ document }));
				}
			});
		}
	}
	exports.TextDocuments = TextDocuments;
	/**
	 * Helps tracking error message. Equal occurences of the same
	 * message are only stored once. This class is for example
	 * useful if text documents are validated in a loop and equal
	 * error message should be folded into one.
	 */
	class ErrorMessageTracker {
		constructor() {
			this._messages = Object.create(null);
		}
		/**
		 * Add a message to the tracker.
		 *
		 * @param message The message to add.
		 */
		add(message) {
			let count = this._messages[message];
			if (!count) {
				count = 0;
			}
			count++;
			this._messages[message] = count;
		}
		/**
		 * Send all tracked messages to the connection's window.
		 *
		 * @param connection The connection established between client and server.
		 */
		sendErrors(connection) {
			Object.keys(this._messages).forEach(message => {
				connection.window.showErrorMessage(message);
			});
		}
	}
	exports.ErrorMessageTracker = ErrorMessageTracker;
	var BulkRegistration;
	(function (BulkRegistration) {
		/**
		 * Creates a new bulk registration.
		 * @return an empty bulk registration.
		 */
		function create() {
			return new BulkRegistrationImpl();
		}
		BulkRegistration.create = create;
	})(BulkRegistration = exports.BulkRegistration || (exports.BulkRegistration = {}));
	class BulkRegistrationImpl {
		constructor() {
			this._registrations = [];
			this._registered = new Set();
		}
		add(type, registerOptions) {
			const method = Is.string(type) ? type : type.method;
			if (this._registered.has(method)) {
				throw new Error(`${method} is already added to this registration`);
			}
			const id = UUID.generateUuid();
			this._registrations.push({
				id: id,
				method: method,
				registerOptions: registerOptions || {}
			});
			this._registered.add(method);
		}
		asRegistrationParams() {
			return {
				registrations: this._registrations
			};
		}
	}
	var BulkUnregistration;
	(function (BulkUnregistration) {
		function create() {
			return new BulkUnregistrationImpl(undefined, []);
		}
		BulkUnregistration.create = create;
	})(BulkUnregistration = exports.BulkUnregistration || (exports.BulkUnregistration = {}));
	class BulkUnregistrationImpl {
		constructor(_connection, unregistrations) {
			this._connection = _connection;
			this._unregistrations = new Map();
			unregistrations.forEach(unregistration => {
				this._unregistrations.set(unregistration.method, unregistration);
			});
		}
		get isAttached() {
			return !!this._connection;
		}
		attach(connection) {
			this._connection = connection;
		}
		add(unregistration) {
			this._unregistrations.set(unregistration.method, unregistration);
		}
		dispose() {
			let unregistrations = [];
			for (let unregistration of this._unregistrations.values()) {
				unregistrations.push(unregistration);
			}
			let params = {
				unregisterations: unregistrations
			};
			this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(undefined, (_error) => {
				this._connection.console.info(`Bulk unregistration failed.`);
			});
		}
		disposeSingle(arg) {
			const method = Is.string(arg) ? arg : arg.method;
			const unregistration = this._unregistrations.get(method);
			if (!unregistration) {
				return false;
			}
			let params = {
				unregisterations: [unregistration]
			};
			this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
				this._unregistrations.delete(method);
			}, (_error) => {
				this._connection.console.info(`Unregistering request handler for ${unregistration.id} failed.`);
			});
			return true;
		}
	}
	class ConnectionLogger {
		constructor() {
		}
		rawAttach(connection) {
			this._rawConnection = connection;
		}
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		fillServerCapabilities(_capabilities) {
		}
		initialize(_capabilities) {
		}
		error(message) {
			this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
		}
		warn(message) {
			this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
		}
		info(message) {
			this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
		}
		log(message) {
			this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
		}
		send(type, message) {
			if (this._rawConnection) {
				this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message });
			}
		}
	}
	class RemoteWindowImpl {
		constructor() {
		}
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		initialize(_capabilities) {
		}
		fillServerCapabilities(_capabilities) {
		}
		showErrorMessage(message, ...actions) {
			let params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
			return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
		}
		showWarningMessage(message, ...actions) {
			let params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
			return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
		}
		showInformationMessage(message, ...actions) {
			let params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
			return this._connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
		}
	}
	class RemoteClientImpl {
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		initialize(_capabilities) {
		}
		fillServerCapabilities(_capabilities) {
		}
		register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
			if (typeOrRegistrations instanceof BulkRegistrationImpl) {
				return this.registerMany(typeOrRegistrations);
			}
			else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
				return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
			}
			else {
				return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
			}
		}
		registerSingle1(unregistration, type, registerOptions) {
			const method = Is.string(type) ? type : type.method;
			const id = UUID.generateUuid();
			let params = {
				registrations: [{ id, method, registerOptions: registerOptions || {} }]
			};
			if (!unregistration.isAttached) {
				unregistration.attach(this._connection);
			}
			return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
				unregistration.add({ id: id, method: method });
				return unregistration;
			}, (_error) => {
				this.connection.console.info(`Registering request handler for ${method} failed.`);
				return Promise.reject(_error);
			});
		}
		registerSingle2(type, registerOptions) {
			const method = Is.string(type) ? type : type.method;
			const id = UUID.generateUuid();
			let params = {
				registrations: [{ id, method, registerOptions: registerOptions || {} }]
			};
			return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
				return vscode_languageserver_protocol_1.Disposable.create(() => {
					this.unregisterSingle(id, method);
				});
			}, (_error) => {
				this.connection.console.info(`Registering request handler for ${method} failed.`);
				return Promise.reject(_error);
			});
		}
		unregisterSingle(id, method) {
			let params = {
				unregisterations: [{ id, method }]
			};
			return this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(undefined, (_error) => {
				this.connection.console.info(`Unregistering request handler for ${id} failed.`);
			});
		}
		registerMany(registrations) {
			let params = registrations.asRegistrationParams();
			return this._connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
				return new BulkUnregistrationImpl(this._connection, params.registrations.map(registration => { return { id: registration.id, method: registration.method }; }));
			}, (_error) => {
				this.connection.console.info(`Bulk registration failed.`);
				return Promise.reject(_error);
			});
		}
	}
	class _RemoteWorkspaceImpl {
		constructor() {
		}
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		initialize(_capabilities) {
		}
		fillServerCapabilities(_capabilities) {
		}
		applyEdit(paramOrEdit) {
			function isApplyWorkspaceEditParams(value) {
				return value && !!value.edit;
			}
			let params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
			return this._connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
		}
	}
	const RemoteWorkspaceImpl = workspaceFolders_1.WorkspaceFoldersFeature(configuration_1.ConfigurationFeature(_RemoteWorkspaceImpl));
	class TracerImpl {
		constructor() {
			this._trace = vscode_languageserver_protocol_1.Trace.Off;
		}
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		initialize(_capabilities) {
		}
		fillServerCapabilities(_capabilities) {
		}
		set trace(value) {
			this._trace = value;
		}
		log(message, verbose) {
			if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
				return;
			}
			this._connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
				message: message,
				verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : undefined
			});
		}
	}
	class TelemetryImpl {
		constructor() {
		}
		attach(connection) {
			this._connection = connection;
		}
		get connection() {
			if (!this._connection) {
				throw new Error('Remote is not attached to a connection yet.');
			}
			return this._connection;
		}
		initialize(_capabilities) {
		}
		fillServerCapabilities(_capabilities) {
		}
		logEvent(data) {
			this._connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data);
		}
	}
	function combineConsoleFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineConsoleFeatures = combineConsoleFeatures;
	function combineTelemetryFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineTelemetryFeatures = combineTelemetryFeatures;
	function combineTracerFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineTracerFeatures = combineTracerFeatures;
	function combineClientFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineClientFeatures = combineClientFeatures;
	function combineWindowFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineWindowFeatures = combineWindowFeatures;
	function combineWorkspaceFeatures(one, two) {
		return function (Base) {
			return two(one(Base));
		};
	}
	exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
	function combineFeatures(one, two) {
		function combine(one, two, func) {
			if (one && two) {
				return func(one, two);
			}
			else if (one) {
				return one;
			}
			else {
				return two;
			}
		}
		let result = {
			__brand: 'features',
			console: combine(one.console, two.console, combineConsoleFeatures),
			tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
			telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
			client: combine(one.client, two.client, combineClientFeatures),
			window: combine(one.window, two.window, combineWindowFeatures),
			workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures)
		};
		return result;
	}
	exports.combineFeatures = combineFeatures;
	function createConnection(arg1, arg2, arg3, arg4) {
		let factories;
		let input;
		let output;
		let strategy;
		if (arg1 !== void 0 && arg1.__brand === 'features') {
			factories = arg1;
			arg1 = arg2;
			arg2 = arg3;
			arg3 = arg4;
		}
		if (vscode_languageserver_protocol_1.ConnectionStrategy.is(arg1)) {
			strategy = arg1;
		}
		else {
			input = arg1;
			output = arg2;
			strategy = arg3;
		}
		return _createConnection(input, output, strategy, factories);
	}
	exports.createConnection = createConnection;
	function _createConnection(input, output, strategy, factories) {
		if (!input && !output && process.argv.length > 2) {
			let port = void 0;
			let pipeName = void 0;
			let argv = process.argv.slice(2);
			for (let i = 0; i < argv.length; i++) {
				let arg = argv[i];
				if (arg === '--node-ipc') {
					input = new vscode_languageserver_protocol_1.IPCMessageReader(process);
					output = new vscode_languageserver_protocol_1.IPCMessageWriter(process);
					break;
				}
				else if (arg === '--stdio') {
					input = process.stdin;
					output = process.stdout;
					break;
				}
				else if (arg === '--socket') {
					port = parseInt(argv[i + 1]);
					break;
				}
				else if (arg === '--pipe') {
					pipeName = argv[i + 1];
					break;
				}
				else {
					var args = arg.split('=');
					if (args[0] === '--socket') {
						port = parseInt(args[1]);
						break;
					}
					else if (args[0] === '--pipe') {
						pipeName = args[1];
						break;
					}
				}
			}
			if (port) {
				let transport = vscode_languageserver_protocol_1.createServerSocketTransport(port);
				input = transport[0];
				output = transport[1];
			}
			else if (pipeName) {
				let transport = vscode_languageserver_protocol_1.createServerPipeTransport(pipeName);
				input = transport[0];
				output = transport[1];
			}
		}
		var commandLineMessage = "Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";
		if (!input) {
			throw new Error("Connection input stream is not set. " + commandLineMessage);
		}
		if (!output) {
			throw new Error("Connection output stream is not set. " + commandLineMessage);
		}
		// Backwards compatibility
		if (Is.func(input.read) && Is.func(input.on)) {
			let inputStream = input;
			inputStream.on('end', () => {
				process.exit(shutdownReceived ? 0 : 1);
			});
			inputStream.on('close', () => {
				process.exit(shutdownReceived ? 0 : 1);
			});
		}
		const logger = (factories && factories.console ? new (factories.console(ConnectionLogger))() : new ConnectionLogger());
		const connection = vscode_languageserver_protocol_1.createProtocolConnection(input, output, logger, strategy);
		logger.rawAttach(connection);
		const tracer = (factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl());
		const telemetry = (factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl());
		const client = (factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl());
		const remoteWindow = (factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl());
		const workspace = (factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl());
		const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace];
		function asThenable(value) {
			if (Is.thenable(value)) {
				return value;
			}
			else {
				return Promise.resolve(value);
			}
		}
		let shutdownHandler = undefined;
		let initializeHandler = undefined;
		let exitHandler = undefined;
		let protocolConnection = {
			listen: () => connection.listen(),
			sendRequest: (type, ...params) => connection.sendRequest(Is.string(type) ? type : type.method, ...params),
			onRequest: (type, handler) => connection.onRequest(type, handler),
			sendNotification: (type, param) => {
				const method = Is.string(type) ? type : type.method;
				if (arguments.length === 1) {
					connection.sendNotification(method);
				}
				else {
					connection.sendNotification(method, param);
				}
			},
			onNotification: (type, handler) => connection.onNotification(type, handler),
			onInitialize: (handler) => initializeHandler = handler,
			onInitialized: (handler) => connection.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
			onShutdown: (handler) => shutdownHandler = handler,
			onExit: (handler) => exitHandler = handler,
			get console() { return logger; },
			get telemetry() { return telemetry; },
			get tracer() { return tracer; },
			get client() { return client; },
			get window() { return remoteWindow; },
			get workspace() { return workspace; },
			onDidChangeConfiguration: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
			onDidChangeWatchedFiles: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
			__textDocumentSync: undefined,
			onDidOpenTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
			onDidChangeTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
			onDidCloseTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
			onWillSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
			onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
			onDidSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
			sendDiagnostics: (params) => connection.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
			onHover: (handler) => connection.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, handler),
			onCompletion: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, handler),
			onCompletionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
			onSignatureHelp: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, handler),
			onDeclaration: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, handler),
			onDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, handler),
			onTypeDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, handler),
			onImplementation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, handler),
			onReferences: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, handler),
			onDocumentHighlight: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, handler),
			onDocumentSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, handler),
			onWorkspaceSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, handler),
			onCodeAction: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, handler),
			onCodeLens: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, handler),
			onCodeLensResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, handler),
			onDocumentFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, handler),
			onDocumentRangeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, handler),
			onDocumentOnTypeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, handler),
			onRenameRequest: (handler) => connection.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, handler),
			onPrepareRename: (handler) => connection.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, handler),
			onDocumentLinks: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, handler),
			onDocumentLinkResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, handler),
			onDocumentColor: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, handler),
			onColorPresentation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, handler),
			onFoldingRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, handler),
			onExecuteCommand: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, handler),
			dispose: () => connection.dispose()
		};
		for (let remote of allRemotes) {
			remote.attach(protocolConnection);
		}
		connection.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
			const processId = params.processId;
			if (Is.number(processId) && exitTimer === void 0) {
				// We received a parent process id. Set up a timer to periodically check
				// if the parent is still alive.
				setInterval(() => {
					try {
						process.kill(processId, 0);
					}
					catch (ex) {
						// Parent process doesn't exist anymore. Exit the server.
						process.exit(shutdownReceived ? 0 : 1);
					}
				}, 3000);
			}
			if (Is.string(params.trace)) {
				tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
			}
			for (let remote of allRemotes) {
				remote.initialize(params.capabilities);
			}
			if (initializeHandler) {
				let result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token);
				return asThenable(result).then((value) => {
					if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
						return value;
					}
					let result = value;
					if (!result) {
						result = { capabilities: {} };
					}
					let capabilities = result.capabilities;
					if (!capabilities) {
						capabilities = {};
						result.capabilities = capabilities;
					}
					if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
						capabilities.textDocumentSync = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
					}
					else if (!Is.number(capabilities.textDocumentSync) && !Is.number(capabilities.textDocumentSync.change)) {
						capabilities.textDocumentSync.change = Is.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
					}
					for (let remote of allRemotes) {
						remote.fillServerCapabilities(capabilities);
					}
					return result;
				});
			}
			else {
				let result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
				for (let remote of allRemotes) {
					remote.fillServerCapabilities(result.capabilities);
				}
				return result;
			}
		});
		connection.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
			shutdownReceived = true;
			if (shutdownHandler) {
				return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
			}
			else {
				return undefined;
			}
		});
		connection.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
			try {
				if (exitHandler) {
					exitHandler();
				}
			}
			finally {
				if (shutdownReceived) {
					process.exit(0);
				}
				else {
					process.exit(1);
				}
			}
		});
		connection.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
			tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
		});
		return protocolConnection;
	}
	// Export the protocol currently in proposed state.
	var ProposedFeatures;
	(function (ProposedFeatures) {
		ProposedFeatures.all = {
			__brand: 'features'
		};
	})(ProposedFeatures = exports.ProposedFeatures || (exports.ProposedFeatures = {}));


	/***/ }),
	/* 2 */
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
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));
	function createProtocolConnection(reader, writer, logger, strategy) {
		return vscode_jsonrpc_1.createMessageConnection(reader, writer, logger, strategy);
	}
	exports.createProtocolConnection = createProtocolConnection;


	/***/ }),
	/* 3 */
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
	const Is = __webpack_require__(4);
	const messages_1 = __webpack_require__(5);
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
	const messageReader_1 = __webpack_require__(6);
	exports.MessageReader = messageReader_1.MessageReader;
	exports.StreamMessageReader = messageReader_1.StreamMessageReader;
	exports.IPCMessageReader = messageReader_1.IPCMessageReader;
	exports.SocketMessageReader = messageReader_1.SocketMessageReader;
	const messageWriter_1 = __webpack_require__(8);
	exports.MessageWriter = messageWriter_1.MessageWriter;
	exports.StreamMessageWriter = messageWriter_1.StreamMessageWriter;
	exports.IPCMessageWriter = messageWriter_1.IPCMessageWriter;
	exports.SocketMessageWriter = messageWriter_1.SocketMessageWriter;
	const events_1 = __webpack_require__(7);
	exports.Disposable = events_1.Disposable;
	exports.Event = events_1.Event;
	exports.Emitter = events_1.Emitter;
	const cancellation_1 = __webpack_require__(9);
	exports.CancellationTokenSource = cancellation_1.CancellationTokenSource;
	exports.CancellationToken = cancellation_1.CancellationToken;
	const linkedMap_1 = __webpack_require__(10);
	__export(__webpack_require__(11));
	__export(__webpack_require__(16));
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
	/* 4 */
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
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const is = __webpack_require__(4);
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
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(7);
	const Is = __webpack_require__(4);
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
	/* 7 */
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
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(7);
	const Is = __webpack_require__(4);
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
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	const events_1 = __webpack_require__(7);
	const Is = __webpack_require__(4);
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
	/* 10 */
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
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const path_1 = __webpack_require__(12);
	const os_1 = __webpack_require__(13);
	const crypto_1 = __webpack_require__(14);
	const net_1 = __webpack_require__(15);
	const messageReader_1 = __webpack_require__(6);
	const messageWriter_1 = __webpack_require__(8);
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
	/* 12 */
	/***/ (function(module, exports) {

	module.exports = require("path");

	/***/ }),
	/* 13 */
	/***/ (function(module, exports) {

	module.exports = require("os");

	/***/ }),
	/* 14 */
	/***/ (function(module, exports) {

	module.exports = require("crypto");

	/***/ }),
	/* 15 */
	/***/ (function(module, exports) {

	module.exports = require("net");

	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const net_1 = __webpack_require__(15);
	const messageReader_1 = __webpack_require__(6);
	const messageWriter_1 = __webpack_require__(8);
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
	/* 17 */
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
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const Is = __webpack_require__(19);
	const vscode_jsonrpc_1 = __webpack_require__(3);
	const protocol_implementation_1 = __webpack_require__(20);
	exports.ImplementationRequest = protocol_implementation_1.ImplementationRequest;
	const protocol_typeDefinition_1 = __webpack_require__(21);
	exports.TypeDefinitionRequest = protocol_typeDefinition_1.TypeDefinitionRequest;
	const protocol_workspaceFolders_1 = __webpack_require__(22);
	exports.WorkspaceFoldersRequest = protocol_workspaceFolders_1.WorkspaceFoldersRequest;
	exports.DidChangeWorkspaceFoldersNotification = protocol_workspaceFolders_1.DidChangeWorkspaceFoldersNotification;
	const protocol_configuration_1 = __webpack_require__(23);
	exports.ConfigurationRequest = protocol_configuration_1.ConfigurationRequest;
	const protocol_colorProvider_1 = __webpack_require__(24);
	exports.DocumentColorRequest = protocol_colorProvider_1.DocumentColorRequest;
	exports.ColorPresentationRequest = protocol_colorProvider_1.ColorPresentationRequest;
	const protocol_foldingRange_1 = __webpack_require__(25);
	exports.FoldingRangeRequest = protocol_foldingRange_1.FoldingRangeRequest;
	const protocol_declaration_1 = __webpack_require__(26);
	exports.DeclarationRequest = protocol_declaration_1.DeclarationRequest;
	const protocol_selectionRange_1 = __webpack_require__(27);
	exports.SelectionRangeRequest = protocol_selectionRange_1.SelectionRangeRequest;
	exports.SelectionRangeKind = protocol_selectionRange_1.SelectionRangeKind;
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
	/* 19 */
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
	/* 20 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 22 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
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
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_jsonrpc_1 = __webpack_require__(3);
	/**
	 * Enum of known selection range kinds
	 */
	var SelectionRangeKind;
	(function (SelectionRangeKind) {
		/**
		 * Empty Kind.
		 */
		SelectionRangeKind["Empty"] = "";
		/**
		 * The statment kind, its value is `statement`, possible extensions can be
		 * `statement.if` etc
		 */
		SelectionRangeKind["Statement"] = "statement";
		/**
		 * The declaration kind, its value is `declaration`, possible extensions can be
		 * `declaration.function`, `declaration.class` etc.
		 */
		SelectionRangeKind["Declaration"] = "declaration";
	})(SelectionRangeKind = exports.SelectionRangeKind || (exports.SelectionRangeKind = {}));
	/**
	 * A request to provide selection ranges in a document. The request's
	 * parameter is of type [TextDocumentPositionParams](#TextDocumentPositionParams), the
	 * response is of type [SelectionRange[]](#SelectionRange[]) or a Thenable
	 * that resolves to such.
	 */
	var SelectionRangeRequest;
	(function (SelectionRangeRequest) {
		SelectionRangeRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/selectionRange');
	})(SelectionRangeRequest = exports.SelectionRangeRequest || (exports.SelectionRangeRequest = {}));


	/***/ }),
	/* 28 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_languageserver_protocol_1 = __webpack_require__(2);
	const Is = __webpack_require__(29);
	exports.ConfigurationFeature = (Base) => {
		return class extends Base {
			getConfiguration(arg) {
				if (!arg) {
					return this._getConfiguration({});
				}
				else if (Is.string(arg)) {
					return this._getConfiguration({ section: arg });
				}
				else {
					return this._getConfiguration(arg);
				}
			}
			_getConfiguration(arg) {
				let params = {
					items: Array.isArray(arg) ? arg : [arg]
				};
				return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
					return Array.isArray(arg) ? result : result[0];
				});
			}
		};
	};


	/***/ }),
	/* 29 */
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
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_languageserver_protocol_1 = __webpack_require__(2);
	exports.WorkspaceFoldersFeature = (Base) => {
		return class extends Base {
			initialize(capabilities) {
				let workspaceCapabilities = capabilities.workspace;
				if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
					this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
					this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
						this._onDidChangeWorkspaceFolders.fire(params.event);
					});
				}
			}
			getWorkspaceFolders() {
				return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
			}
			get onDidChangeWorkspaceFolders() {
				if (!this._onDidChangeWorkspaceFolders) {
					throw new Error('Client doesn\'t support sending workspace folder change events.');
				}
				if (!this._unregistration) {
					this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
				}
				return this._onDidChangeWorkspaceFolders.event;
			}
		};
	};


	/***/ }),
	/* 31 */
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
	/* 32 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__filename) {/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	const url = __webpack_require__(33);
	const path = __webpack_require__(12);
	const fs = __webpack_require__(34);
	const child_process_1 = __webpack_require__(35);
	/**
	 * @deprecated Use the `vscode-uri` npm module which provides a more
	 * complete implementation of handling VS Code URIs.
	 */
	function uriToFilePath(uri) {
		let parsed = url.parse(uri);
		if (parsed.protocol !== 'file:' || !parsed.path) {
			return undefined;
		}
		let segments = parsed.path.split('/');
		for (var i = 0, len = segments.length; i < len; i++) {
			segments[i] = decodeURIComponent(segments[i]);
		}
		if (process.platform === 'win32' && segments.length > 1) {
			let first = segments[0];
			let second = segments[1];
			// Do we have a drive letter and we started with a / which is the
			// case if the first segement is empty (see split above)
			if (first.length === 0 && second.length > 1 && second[1] === ':') {
				// Remove first slash
				segments.shift();
			}
		}
		return path.normalize(segments.join('/'));
	}
	exports.uriToFilePath = uriToFilePath;
	function isWindows() {
		return process.platform === 'win32';
	}
	function resolve(moduleName, nodePath, cwd, tracer) {
		const nodePathKey = 'NODE_PATH';
		const app = [
			"var p = process;",
			"p.on('message',function(m){",
			"if(m.c==='e'){",
			"p.exit(0);",
			"}",
			"else if(m.c==='rs'){",
			"try{",
			"var r=require.resolve(m.a);",
			"p.send({c:'r',s:true,r:r});",
			"}",
			"catch(err){",
			"p.send({c:'r',s:false});",
			"}",
			"}",
			"});"
		].join('');
		return new Promise((resolve, reject) => {
			let env = process.env;
			let newEnv = Object.create(null);
			Object.keys(env).forEach(key => newEnv[key] = env[key]);
			if (nodePath) {
				if (newEnv[nodePathKey]) {
					newEnv[nodePathKey] = nodePath + path.delimiter + newEnv[nodePathKey];
				}
				else {
					newEnv[nodePathKey] = nodePath;
				}
				if (tracer) {
					tracer(`NODE_PATH value is: ${newEnv[nodePathKey]}`);
				}
			}
			newEnv['ELECTRON_RUN_AS_NODE'] = '1';
			try {
				let cp = child_process_1.fork('', [], {
					cwd: cwd,
					env: newEnv,
					execArgv: ['-e', app]
				});
				if (cp.pid === void 0) {
					reject(new Error(`Starting process to resolve node module  ${moduleName} failed`));
					return;
				}
				cp.on('error', (error) => {
					reject(error);
				});
				cp.on('message', (message) => {
					if (message.c === 'r') {
						cp.send({ c: 'e' });
						if (message.s) {
							resolve(message.r);
						}
						else {
							reject(new Error(`Failed to resolve module: ${moduleName}`));
						}
					}
				});
				let message = {
					c: 'rs',
					a: moduleName
				};
				cp.send(message);
			}
			catch (error) {
				reject(error);
			}
		});
	}
	exports.resolve = resolve;
	function resolveGlobalNodePath(tracer) {
		let npmCommand = 'npm';
		let options = {
			encoding: 'utf8'
		};
		if (isWindows()) {
			npmCommand = 'npm.cmd';
			options.shell = true;
		}
		let handler = () => { };
		try {
			process.on('SIGPIPE', handler);
			let stdout = child_process_1.spawnSync(npmCommand, ['config', 'get', 'prefix'], options).stdout;
			if (!stdout) {
				if (tracer) {
					tracer(`'npm config get prefix' didn't return a value.`);
				}
				return undefined;
			}
			let prefix = stdout.trim();
			if (tracer) {
				tracer(`'npm config get prefix' value is: ${prefix}`);
			}
			if (prefix.length > 0) {
				if (isWindows()) {
					return path.join(prefix, 'node_modules');
				}
				else {
					return path.join(prefix, 'lib', 'node_modules');
				}
			}
			return undefined;
		}
		catch (err) {
			return undefined;
		}
		finally {
			process.removeListener('SIGPIPE', handler);
		}
	}
	exports.resolveGlobalNodePath = resolveGlobalNodePath;
	function resolveGlobalYarnPath(tracer) {
		let yarnCommand = 'yarn';
		let options = {
			encoding: 'utf8'
		};
		if (isWindows()) {
			yarnCommand = 'yarn.cmd';
			options.shell = true;
		}
		let handler = () => { };
		try {
			process.on('SIGPIPE', handler);
			let results = child_process_1.spawnSync(yarnCommand, ['global', 'dir', '--json'], options);
			let stdout = results.stdout;
			if (!stdout) {
				if (tracer) {
					tracer(`'yarn global dir' didn't return a value.`);
					if (results.stderr) {
						tracer(results.stderr);
					}
				}
				return undefined;
			}
			let lines = stdout.trim().split(/\r?\n/);
			for (let line of lines) {
				try {
					let yarn = JSON.parse(line);
					if (yarn.type === 'log') {
						return path.join(yarn.data, 'node_modules');
					}
				}
				catch (e) {
					// Do nothing. Ignore the line
				}
			}
			return undefined;
		}
		catch (err) {
			return undefined;
		}
		finally {
			process.removeListener('SIGPIPE', handler);
		}
	}
	exports.resolveGlobalYarnPath = resolveGlobalYarnPath;
	var FileSystem;
	(function (FileSystem) {
		let _isCaseSensitive = undefined;
		function isCaseSensitive() {
			if (_isCaseSensitive !== void 0) {
				return _isCaseSensitive;
			}
			if (process.platform === 'win32') {
				_isCaseSensitive = false;
			}
			else {
				// convert current file name to upper case / lower case and check if file exists
				// (guards against cases when name is already all uppercase or lowercase)
				_isCaseSensitive = !fs.existsSync(__filename.toUpperCase()) || !fs.existsSync(__filename.toLowerCase());
			}
			return _isCaseSensitive;
		}
		FileSystem.isCaseSensitive = isCaseSensitive;
		function isParent(parent, child) {
			if (isCaseSensitive()) {
				return path.normalize(child).indexOf(path.normalize(parent)) === 0;
			}
			else {
				return path.normalize(child).toLowerCase().indexOf(path.normalize(parent).toLowerCase()) == 0;
			}
		}
		FileSystem.isParent = isParent;
	})(FileSystem = exports.FileSystem || (exports.FileSystem = {}));
	function resolveModulePath(workspaceRoot, moduleName, nodePath, tracer) {
		if (nodePath) {
			if (!path.isAbsolute(nodePath)) {
				nodePath = path.join(workspaceRoot, nodePath);
			}
			return resolve(moduleName, nodePath, nodePath, tracer).then((value) => {
				if (FileSystem.isParent(nodePath, value)) {
					return value;
				}
				else {
					return Promise.reject(new Error(`Failed to load ${moduleName} from node path location.`));
				}
			}).then(undefined, (_error) => {
				return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
			});
		}
		else {
			return resolve(moduleName, resolveGlobalNodePath(tracer), workspaceRoot, tracer);
		}
	}
	exports.resolveModulePath = resolveModulePath;

	/* WEBPACK VAR INJECTION */}.call(this, "/index.js"))

	/***/ }),
	/* 33 */
	/***/ (function(module, exports) {

	module.exports = require("url");

	/***/ }),
	/* 34 */
	/***/ (function(module, exports) {

	module.exports = require("fs");

	/***/ }),
	/* 35 */
	/***/ (function(module, exports) {

	module.exports = require("child_process");

	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	var url_1 = __webpack_require__(33);
	var https = __webpack_require__(37);
	var http = __webpack_require__(38);
	var HttpProxyAgent = __webpack_require__(39);
	var HttpsProxyAgent = __webpack_require__(56);
	var zlib = __webpack_require__(57);
	var nls = __webpack_require__(58);
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
	/* 37 */
	/***/ (function(module, exports) {

	module.exports = require("https");

	/***/ }),
	/* 38 */
	/***/ (function(module, exports) {

	module.exports = require("http");

	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Module dependencies.
	 */

	var net = __webpack_require__(15);
	var tls = __webpack_require__(40);
	var url = __webpack_require__(33);
	var Agent = __webpack_require__(41);
	var inherits = __webpack_require__(43).inherits;
	var debug = __webpack_require__(48)('http-proxy-agent');

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
	/* 40 */
	/***/ (function(module, exports) {

	module.exports = require("tls");

	/***/ }),
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/**
	 * Module dependencies.
	 */

	__webpack_require__(42);
	const inherits = __webpack_require__(43).inherits;
	const promisify = __webpack_require__(44);
	const EventEmitter = __webpack_require__(47).EventEmitter;

	/**
	 * Module exports.
	 */

	module.exports = Agent;

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

	Agent.prototype.addRequest = function addRequest(
	  req,
	  _opts
	) {
	  const ownOpts = Object.assign({}, _opts);

	  // set default `host` for HTTP to localhost
	  if (null == ownOpts.host) {
		ownOpts.host = 'localhost';
	  }

	  // set default `port` for HTTP if none was explicitly specified
	  if (null == ownOpts.port) {
		ownOpts.port = ownOpts.secureEndpoint ? 443 : 80;
	  }

	  const opts = Object.assign({}, this.options, ownOpts);

	  if (opts.host && opts.path) {
		// if both a `host` and `path` are specified then it's most likely the
		// result of a `url.parse()` call... we need to remove the `path` portion so
		// that `net.connect()` doesn't attempt to open that as a unix socket file.
		delete opts.path;
	  }

	  delete opts.agent;
	  delete opts.hostname;
	  delete opts._defaultAgent;
	  delete opts.defaultPort;
	  delete opts.createConnection;

	  // hint to use "Connection: close"
	  // XXX: non-documented `http` module API :(
	  req._last = true;
	  req.shouldKeepAlive = false;

	  // create the `stream.Duplex` instance
	  let timeout;
	  let timedOut = false;
	  const timeoutMs = this.timeout;

	  function onerror(err) {
		if (req._hadError) return;
		req.emit('error', err);
		// For Safety. Some additional errors might fire later on
		// and we need to make sure we don't double-fire the error event.
		req._hadError = true;
	  }

	  function ontimeout() {
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
		}
		onerror(err);
	  }

	  function onsocket(socket) {
		if (timedOut) return;
		if (timeout != null) {
		  clearTimeout(timeout);
		}
		if (socket) {
		  req.onSocket(socket);
		} else {
		  const err = new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
		  onerror(err);
		}
	  }

	  if (this.callback.length >= 3) {
		// legacy callback function, convert to Promise
		this.callback = promisify(this.callback, this);
	  }

	  if (timeoutMs > 0) {
		timeout = setTimeout(ontimeout, timeoutMs);
	  }

	  try {
		Promise.resolve(this.callback(req, opts))
		  .then(onsocket, callbackError);
	  } catch (err) {
		Promise.reject(err)
		  .catch(callbackError);
	  }
	};


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	const url = __webpack_require__(33);
	const https = __webpack_require__(37);

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
	/* 43 */
	/***/ (function(module, exports) {

	module.exports = require("util");

	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";


	/* global module, require */
	module.exports = function () {

		"use strict";

		// Get a promise object. This may be native, or it may be polyfilled

		var ES6Promise = __webpack_require__(45);

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
	/* 45 */
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
		return __webpack_require__(46).Promise;
	}();

	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	var require;/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.1.1
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

	var _isArray = undefined;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
		return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;

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
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

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
		var r = require;
		var vertx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'vertx'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
		vertxNext = vertx.runOnLoop || vertx.runOnContext;
		return useVertxTimer();
	  } catch (e) {
		return useSetTimeout();
	  }
	}

	var scheduleFlush = undefined;
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
	  var _arguments = arguments;

	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
		makePromise(child);
	  }

	  var _state = parent._state;

	  if (_state) {
		(function () {
		  var callback = _arguments[_state - 1];
		  asap(function () {
			return invokeCallback(_state, child, callback, parent._result);
		  });
		})();
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

	var PROMISE_ID = Math.random().toString(36).substring(16);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

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
		GET_THEN_ERROR.error = error;
		return GET_THEN_ERROR;
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
		if (then$$1 === GET_THEN_ERROR) {
		  reject(promise, GET_THEN_ERROR.error);
		  GET_THEN_ERROR.error = null;
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

	  var child = undefined,
		  callback = undefined,
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

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

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
		  value = undefined,
		  error = undefined,
		  succeeded = undefined,
		  failed = undefined;

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

	function Enumerator$1(Constructor, input) {
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

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	Enumerator$1.prototype._enumerate = function (input) {
	  for (var i = 0; this._state === PENDING && i < input.length; i++) {
		this._eachEntry(input[i], i);
	  }
	};

	Enumerator$1.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$1 = c.resolve;

	  if (resolve$$1 === resolve$1) {
		var _then = getThen(entry);

		if (_then === then && entry._state !== PENDING) {
		  this._settledAt(entry._state, i, entry._result);
		} else if (typeof _then !== 'function') {
		  this._remaining--;
		  this._result[i] = entry;
		} else if (c === Promise$2) {
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

	Enumerator$1.prototype._settledAt = function (state, i, value) {
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

	Enumerator$1.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
		return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
		return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

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
	function all$1(entries) {
	  return new Enumerator$1(this, entries).promise;
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
	function race$1(entries) {
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
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise$2(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];

	  if (noop !== resolver) {
		typeof resolver !== 'function' && needsResolver();
		this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise$2.all = all$1;
	Promise$2.race = race$1;
	Promise$2.resolve = resolve$1;
	Promise$2.reject = reject$1;
	Promise$2._setScheduler = setScheduler;
	Promise$2._setAsap = setAsap;
	Promise$2._asap = asap;

	Promise$2.prototype = {
	  constructor: Promise$2,

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
	  then: then,

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
	  'catch': function _catch(onRejection) {
		return this.then(null, onRejection);
	  }
	};

	/*global self*/
	function polyfill$1() {
		var local = undefined;

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

		local.Promise = Promise$2;
	}

	// Strange compat..
	Promise$2.polyfill = polyfill$1;
	Promise$2.Promise = Promise$2;

	return Promise$2;

	})));

	//# sourceMappingURL=es6-promise.map


	/***/ }),
	/* 47 */
	/***/ (function(module, exports) {

	module.exports = require("events");

	/***/ }),
	/* 48 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Detect Electron renderer process, which is node, but we should
	 * treat as a browser.
	 */

	if (typeof process === 'undefined' || process.type === 'renderer') {
	  module.exports = __webpack_require__(49);
	} else {
	  module.exports = __webpack_require__(52);
	}


	/***/ }),
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(50);
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
	/* 50 */
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
	exports.humanize = __webpack_require__(51);

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
	/* 51 */
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
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(53);
	var util = __webpack_require__(43);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(50);
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
	  var supportsColor = __webpack_require__(54);
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
	/* 53 */
	/***/ (function(module, exports) {

	module.exports = require("tty");

	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var hasFlag = __webpack_require__(55);

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
	/* 55 */
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
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var net = __webpack_require__(15);
	var tls = __webpack_require__(40);
	var url = __webpack_require__(33);
	var Agent = __webpack_require__(41);
	var inherits = __webpack_require__(43).inherits;
	var debug = __webpack_require__(48)('https-proxy-agent');

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
	/* 57 */
	/***/ (function(module, exports) {

	module.exports = require("zlib");

	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	var path = __webpack_require__(12);
	var fs = __webpack_require__(34);
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
	/* 59 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	var __extends = (undefined && undefined.__extends) || (function () {
		var extendStatics = Object.setPrototypeOf ||
			({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	var isWindows;
	if (typeof process === 'object') {
		isWindows = process.platform === 'win32';
	}
	else if (typeof navigator === 'object') {
		var userAgent = navigator.userAgent;
		isWindows = userAgent.indexOf('Windows') >= 0;
	}
	//#endregion
	var _schemePattern = /^\w[\w\d+.-]*$/;
	var _singleSlashStart = /^\//;
	var _doubleSlashStart = /^\/\//;
	function _validateUri(ret) {
		// scheme, https://tools.ietf.org/html/rfc3986#section-3.1
		// ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
		if (ret.scheme && !_schemePattern.test(ret.scheme)) {
			throw new Error('[UriError]: Scheme contains illegal characters.');
		}
		// path, http://tools.ietf.org/html/rfc3986#section-3.3
		// If a URI contains an authority component, then the path component
		// must either be empty or begin with a slash ("/") character.  If a URI
		// does not contain an authority component, then the path cannot begin
		// with two slash characters ("//").
		if (ret.path) {
			if (ret.authority) {
				if (!_singleSlashStart.test(ret.path)) {
					throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
				}
			}
			else {
				if (_doubleSlashStart.test(ret.path)) {
					throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
				}
			}
		}
	}
	// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
	function _referenceResolution(scheme, path) {
		// the slash-character is our 'default base' as we don't
		// support constructing URIs relative to other URIs. This
		// also means that we alter and potentially break paths.
		// see https://tools.ietf.org/html/rfc3986#section-5.1.4
		switch (scheme) {
			case 'https':
			case 'http':
			case 'file':
				if (!path) {
					path = _slash;
				}
				else if (path[0] !== _slash) {
					path = _slash + path;
				}
				break;
		}
		return path;
	}
	var _empty = '';
	var _slash = '/';
	var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	/**
	 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
	 * This class is a simple parser which creates the basic component parts
	 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
	 * and encoding.
	 *
	 *       foo://example.com:8042/over/there?name=ferret#nose
	 *       \_/   \______________/\_________/ \_________/ \__/
	 *        |           |            |            |        |
	 *     scheme     authority       path        query   fragment
	 *        |   _____________________|__
	 *       / \ /                        \
	 *       urn:example:animal:ferret:nose
	 */
	var URI = (function () {
		/**
		 * @internal
		 */
		function URI(schemeOrData, authority, path, query, fragment) {
			if (typeof schemeOrData === 'object') {
				this.scheme = schemeOrData.scheme || _empty;
				this.authority = schemeOrData.authority || _empty;
				this.path = schemeOrData.path || _empty;
				this.query = schemeOrData.query || _empty;
				this.fragment = schemeOrData.fragment || _empty;
				// no validation because it's this URI
				// that creates uri components.
				// _validateUri(this);
			}
			else {
				this.scheme = schemeOrData || _empty;
				this.authority = authority || _empty;
				this.path = _referenceResolution(this.scheme, path || _empty);
				this.query = query || _empty;
				this.fragment = fragment || _empty;
				_validateUri(this);
			}
		}
		URI.isUri = function (thing) {
			if (thing instanceof URI) {
				return true;
			}
			if (!thing) {
				return false;
			}
			return typeof thing.authority === 'string'
				&& typeof thing.fragment === 'string'
				&& typeof thing.path === 'string'
				&& typeof thing.query === 'string'
				&& typeof thing.scheme === 'string';
		};
		Object.defineProperty(URI.prototype, "fsPath", {
			// ---- filesystem path -----------------------
			/**
			 * Returns a string representing the corresponding file system path of this URI.
			 * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
			 * platform specific path separator.
			 *
			 * * Will *not* validate the path for invalid characters and semantics.
			 * * Will *not* look at the scheme of this URI.
			 * * The result shall *not* be used for display purposes but for accessing a file on disk.
			 *
			 *
			 * The *difference* to `URI#path` is the use of the platform specific separator and the handling
			 * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
			 *
			 * ```ts
				const u = URI.parse('file://server/c$/folder/file.txt')
				u.authority === 'server'
				u.path === '/shares/c$/file.txt'
				u.fsPath === '\\server\c$\folder\file.txt'
			```
			 *
			 * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
			 * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
			 * with URIs that represent files on disk (`file` scheme).
			 */
			get: function () {
				// if (this.scheme !== 'file') {
				// 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
				// }
				return _makeFsPath(this);
			},
			enumerable: true,
			configurable: true
		});
		// ---- modify to new -------------------------
		URI.prototype.with = function (change) {
			if (!change) {
				return this;
			}
			var scheme = change.scheme, authority = change.authority, path = change.path, query = change.query, fragment = change.fragment;
			if (scheme === void 0) {
				scheme = this.scheme;
			}
			else if (scheme === null) {
				scheme = _empty;
			}
			if (authority === void 0) {
				authority = this.authority;
			}
			else if (authority === null) {
				authority = _empty;
			}
			if (path === void 0) {
				path = this.path;
			}
			else if (path === null) {
				path = _empty;
			}
			if (query === void 0) {
				query = this.query;
			}
			else if (query === null) {
				query = _empty;
			}
			if (fragment === void 0) {
				fragment = this.fragment;
			}
			else if (fragment === null) {
				fragment = _empty;
			}
			if (scheme === this.scheme
				&& authority === this.authority
				&& path === this.path
				&& query === this.query
				&& fragment === this.fragment) {
				return this;
			}
			return new _URI(scheme, authority, path, query, fragment);
		};
		// ---- parse & validate ------------------------
		/**
		 * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
		 * `file:///usr/home`, or `scheme:with/path`.
		 *
		 * @param value A string which represents an URI (see `URI#toString`).
		 */
		URI.parse = function (value) {
			var match = _regexp.exec(value);
			if (!match) {
				return new _URI(_empty, _empty, _empty, _empty, _empty);
			}
			return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty), decodeURIComponent(match[7] || _empty), decodeURIComponent(match[9] || _empty));
		};
		/**
		 * Creates a new URI from a file system path, e.g. `c:\my\files`,
		 * `/usr/home`, or `\\server\share\some\path`.
		 *
		 * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
		 * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
		 * `URI.parse('file://' + path)` because the path might contain characters that are
		 * interpreted (# and ?). See the following sample:
		 * ```ts
		const good = URI.file('/coding/c#/project1');
		good.scheme === 'file';
		good.path === '/coding/c#/project1';
		good.fragment === '';

		const bad = URI.parse('file://' + '/coding/c#/project1');
		bad.scheme === 'file';
		bad.path === '/coding/c'; // path is now broken
		bad.fragment === '/project1';
		```
		 *
		 * @param path A file system path (see `URI#fsPath`)
		 */
		URI.file = function (path) {
			var authority = _empty;
			// normalize to fwd-slashes on windows,
			// on other systems bwd-slashes are valid
			// filename character, eg /f\oo/ba\r.txt
			if (isWindows) {
				path = path.replace(/\\/g, _slash);
			}
			// check for authority as used in UNC shares
			// or use the path as given
			if (path[0] === _slash && path[1] === _slash) {
				var idx = path.indexOf(_slash, 2);
				if (idx === -1) {
					authority = path.substring(2);
					path = _slash;
				}
				else {
					authority = path.substring(2, idx);
					path = path.substring(idx) || _slash;
				}
			}
			return new _URI('file', authority, path, _empty, _empty);
		};
		URI.from = function (components) {
			return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
		};
		// ---- printing/externalize ---------------------------
		/**
		 * Creates a string presentation for this URI. It's guardeed that calling
		 * `URI.parse` with the result of this function creates an URI which is equal
		 * to this URI.
		 *
		 * * The result shall *not* be used for display purposes but for externalization or transport.
		 * * The result will be encoded using the percentage encoding and encoding happens mostly
		 * ignore the scheme-specific encoding rules.
		 *
		 * @param skipEncoding Do not encode the result, default is `false`
		 */
		URI.prototype.toString = function (skipEncoding) {
			if (skipEncoding === void 0) { skipEncoding = false; }
			return _asFormatted(this, skipEncoding);
		};
		URI.prototype.toJSON = function () {
			return this;
		};
		URI.revive = function (data) {
			if (!data) {
				return data;
			}
			else if (data instanceof URI) {
				return data;
			}
			else {
				var result = new _URI(data);
				result._fsPath = data.fsPath;
				result._formatted = data.external;
				return result;
			}
		};
		return URI;
	}());
	/* harmony default export */ __webpack_exports__["default"] = (URI);
	// tslint:disable-next-line:class-name
	var _URI = (function (_super) {
		__extends(_URI, _super);
		function _URI() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this._formatted = null;
			_this._fsPath = null;
			return _this;
		}
		Object.defineProperty(_URI.prototype, "fsPath", {
			get: function () {
				if (!this._fsPath) {
					this._fsPath = _makeFsPath(this);
				}
				return this._fsPath;
			},
			enumerable: true,
			configurable: true
		});
		_URI.prototype.toString = function (skipEncoding) {
			if (skipEncoding === void 0) { skipEncoding = false; }
			if (!skipEncoding) {
				if (!this._formatted) {
					this._formatted = _asFormatted(this, false);
				}
				return this._formatted;
			}
			else {
				// we don't cache that
				return _asFormatted(this, true);
			}
		};
		_URI.prototype.toJSON = function () {
			var res = {
				$mid: 1
			};
			// cached state
			if (this._fsPath) {
				res.fsPath = this._fsPath;
			}
			if (this._formatted) {
				res.external = this._formatted;
			}
			// uri components
			if (this.path) {
				res.path = this.path;
			}
			if (this.scheme) {
				res.scheme = this.scheme;
			}
			if (this.authority) {
				res.authority = this.authority;
			}
			if (this.query) {
				res.query = this.query;
			}
			if (this.fragment) {
				res.fragment = this.fragment;
			}
			return res;
		};
		return _URI;
	}(URI));
	// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
	var encodeTable = (_a = {},
		_a[58 /* Colon */] = '%3A',
		_a[47 /* Slash */] = '%2F',
		_a[63 /* QuestionMark */] = '%3F',
		_a[35 /* Hash */] = '%23',
		_a[91 /* OpenSquareBracket */] = '%5B',
		_a[93 /* CloseSquareBracket */] = '%5D',
		_a[64 /* AtSign */] = '%40',
		_a[33 /* ExclamationMark */] = '%21',
		_a[36 /* DollarSign */] = '%24',
		_a[38 /* Ampersand */] = '%26',
		_a[39 /* SingleQuote */] = '%27',
		_a[40 /* OpenParen */] = '%28',
		_a[41 /* CloseParen */] = '%29',
		_a[42 /* Asterisk */] = '%2A',
		_a[43 /* Plus */] = '%2B',
		_a[44 /* Comma */] = '%2C',
		_a[59 /* Semicolon */] = '%3B',
		_a[61 /* Equals */] = '%3D',
		_a[32 /* Space */] = '%20',
		_a);
	function encodeURIComponentFast(uriComponent, allowSlash) {
		var res = undefined;
		var nativeEncodePos = -1;
		for (var pos = 0; pos < uriComponent.length; pos++) {
			var code = uriComponent.charCodeAt(pos);
			// unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
			if ((code >= 97 /* a */ && code <= 122 /* z */)
				|| (code >= 65 /* A */ && code <= 90 /* Z */)
				|| (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
				|| code === 45 /* Dash */
				|| code === 46 /* Period */
				|| code === 95 /* Underline */
				|| code === 126 /* Tilde */
				|| (allowSlash && code === 47 /* Slash */)) {
				// check if we are delaying native encode
				if (nativeEncodePos !== -1) {
					res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
					nativeEncodePos = -1;
				}
				// check if we write into a new string (by default we try to return the param)
				if (res !== undefined) {
					res += uriComponent.charAt(pos);
				}
			}
			else {
				// encoding needed, we need to allocate a new string
				if (res === undefined) {
					res = uriComponent.substr(0, pos);
				}
				// check with default table first
				var escaped = encodeTable[code];
				if (escaped !== undefined) {
					// check if we are delaying native encode
					if (nativeEncodePos !== -1) {
						res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
						nativeEncodePos = -1;
					}
					// append escaped variant to result
					res += escaped;
				}
				else if (nativeEncodePos === -1) {
					// use native encode only when needed
					nativeEncodePos = pos;
				}
			}
		}
		if (nativeEncodePos !== -1) {
			res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
		}
		return res !== undefined ? res : uriComponent;
	}
	function encodeURIComponentMinimal(path) {
		var res = undefined;
		for (var pos = 0; pos < path.length; pos++) {
			var code = path.charCodeAt(pos);
			if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
				if (res === undefined) {
					res = path.substr(0, pos);
				}
				res += encodeTable[code];
			}
			else {
				if (res !== undefined) {
					res += path[pos];
				}
			}
		}
		return res !== undefined ? res : path;
	}
	/**
	 * Compute `fsPath` for the given uri
	 * @param uri
	 */
	function _makeFsPath(uri) {
		var value;
		if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
			// unc path: file://shares/c$/far/boo
			value = "//" + uri.authority + uri.path;
		}
		else if (uri.path.charCodeAt(0) === 47 /* Slash */
			&& (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
			&& uri.path.charCodeAt(2) === 58 /* Colon */) {
			// windows drive letter: file:///c:/far/boo
			value = uri.path[1].toLowerCase() + uri.path.substr(2);
		}
		else {
			// other path
			value = uri.path;
		}
		if (isWindows) {
			value = value.replace(/\//g, '\\');
		}
		return value;
	}
	/**
	 * Create the external version of a uri
	 */
	function _asFormatted(uri, skipEncoding) {
		var encoder = !skipEncoding
			? encodeURIComponentFast
			: encodeURIComponentMinimal;
		var res = '';
		var scheme = uri.scheme, authority = uri.authority, path = uri.path, query = uri.query, fragment = uri.fragment;
		if (scheme) {
			res += scheme;
			res += ':';
		}
		if (authority || scheme === 'file') {
			res += _slash;
			res += _slash;
		}
		if (authority) {
			var idx = authority.indexOf('@');
			if (idx !== -1) {
				// <user>@<auth>
				var userinfo = authority.substr(0, idx);
				authority = authority.substr(idx + 1);
				idx = userinfo.indexOf(':');
				if (idx === -1) {
					res += encoder(userinfo, false);
				}
				else {
					// <user>:<pass>@<auth>
					res += encoder(userinfo.substr(0, idx), false);
					res += ':';
					res += encoder(userinfo.substr(idx + 1), false);
				}
				res += '@';
			}
			authority = authority.toLowerCase();
			idx = authority.indexOf(':');
			if (idx === -1) {
				res += encoder(authority, false);
			}
			else {
				// <auth>:<port>
				res += encoder(authority.substr(0, idx), false);
				res += authority.substr(idx);
			}
		}
		if (path) {
			// lower-case windows drive letters in /C:/fff or C:/fff
			if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
				var code = path.charCodeAt(1);
				if (code >= 65 /* A */ && code <= 90 /* Z */) {
					path = "/" + String.fromCharCode(code + 32) + ":" + path.substr(3); // "/c:".length === 3
				}
			}
			else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
				var code = path.charCodeAt(0);
				if (code >= 65 /* A */ && code <= 90 /* Z */) {
					path = String.fromCharCode(code + 32) + ":" + path.substr(2); // "/c:".length === 3
				}
			}
			// encode the rest of the path
			res += encoder(path, true);
		}
		if (query) {
			res += '?';
			res += encoder(query, false);
		}
		if (fragment) {
			res += '#';
			res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
		}
		return res;
	}
	var _a;


	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode_languageserver_1 = __webpack_require__(1);
	function formatError(message, err) {
		if (err instanceof Error) {
			let error = err;
			return `${message}: ${error.message}\n${error.stack}`;
		}
		else if (typeof err === 'string') {
			return `${message}: ${err}`;
		}
		else if (err) {
			return `${message}: ${err.toString()}`;
		}
		return message;
	}
	exports.formatError = formatError;
	function runSafeAsync(func, errorVal, errorMessage, token) {
		return new Promise((resolve) => {
			setImmediate(() => {
				if (token.isCancellationRequested) {
					resolve(cancelValue());
				}
				return func().then(result => {
					if (token.isCancellationRequested) {
						resolve(cancelValue());
						return;
					}
					else {
						resolve(result);
					}
				}, e => {
					console.error(formatError(errorMessage, e));
					resolve(errorVal);
				});
			});
		});
	}
	exports.runSafeAsync = runSafeAsync;
	function runSafe(func, errorVal, errorMessage, token) {
		return new Promise((resolve) => {
			setImmediate(() => {
				if (token.isCancellationRequested) {
					resolve(cancelValue());
				}
				else {
					try {
						let result = func();
						if (token.isCancellationRequested) {
							resolve(cancelValue());
							return;
						}
						else {
							resolve(result);
						}
					}
					catch (e) {
						console.error(formatError(errorMessage, e));
						resolve(errorVal);
					}
				}
			});
		});
	}
	exports.runSafe = runSafe;
	function cancelValue() {
		console.log('cancelled');
		return new vscode_languageserver_1.ResponseError(vscode_languageserver_1.ErrorCodes.RequestCancelled, 'Request cancelled');
	}


	/***/ }),
	/* 61 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLanguageService", function() { return getLanguageService; });
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextDocument", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["TextDocument"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Position"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompletionItem", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["CompletionItem"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CompletionList", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["CompletionList"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hover", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Hover"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Range"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SymbolInformation", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["SymbolInformation"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Diagnostic", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Diagnostic"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["TextEdit"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormattingOptions", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["FormattingOptions"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkedString", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["MarkedString"]; });

	/* harmony import */ var _services_jsonCompletion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
	/* harmony import */ var _services_jsonHover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73);
	/* harmony import */ var _services_jsonValidation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74);
	/* harmony import */ var _services_jsonDocumentSymbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76);
	/* harmony import */ var _parser_jsonParser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(63);
	/* harmony import */ var _services_configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(78);
	/* harmony import */ var _services_jsonSchemaService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(75);
	/* harmony import */ var _services_jsonFolding__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(79);
	/* harmony import */ var _services_jsonSelectionRanges__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(80);
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(64);
	/* harmony import */ var _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(70);
	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["Color"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["ColorInformation"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["ColorPresentation"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["FoldingRange"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["FoldingRangeKind"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionRangeKind", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["SelectionRangeKind"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["ErrorCode"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientCapabilities", function() { return _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_11__["ClientCapabilities"]; });

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/













	function getLanguageService(params) {
		var promise = params.promiseConstructor || Promise;
		var jsonSchemaService = new _services_jsonSchemaService__WEBPACK_IMPORTED_MODULE_7__["JSONSchemaService"](params.schemaRequestService, params.workspaceContext, promise);
		jsonSchemaService.setSchemaContributions(_services_configuration__WEBPACK_IMPORTED_MODULE_6__["schemaContributions"]);
		var jsonCompletion = new _services_jsonCompletion__WEBPACK_IMPORTED_MODULE_1__["JSONCompletion"](jsonSchemaService, params.contributions, promise, params.clientCapabilities);
		var jsonHover = new _services_jsonHover__WEBPACK_IMPORTED_MODULE_2__["JSONHover"](jsonSchemaService, params.contributions, promise);
		var jsonDocumentSymbols = new _services_jsonDocumentSymbols__WEBPACK_IMPORTED_MODULE_4__["JSONDocumentSymbols"](jsonSchemaService);
		var jsonValidation = new _services_jsonValidation__WEBPACK_IMPORTED_MODULE_3__["JSONValidation"](jsonSchemaService, promise);
		return {
			configure: function (settings) {
				jsonSchemaService.clearExternalSchemas();
				if (settings.schemas) {
					settings.schemas.forEach(function (settings) {
						jsonSchemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
					});
				}
				jsonValidation.configure(settings);
			},
			resetSchema: function (uri) { return jsonSchemaService.onResourceChange(uri); },
			doValidation: jsonValidation.doValidation.bind(jsonValidation),
			parseJSONDocument: function (document) { return Object(_parser_jsonParser__WEBPACK_IMPORTED_MODULE_5__["parse"])(document, { collectComments: true }); },
			newJSONDocument: function (root, diagnostics) { return Object(_parser_jsonParser__WEBPACK_IMPORTED_MODULE_5__["newJSONDocument"])(root, diagnostics); },
			doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
			doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
			findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
			findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
			findColorSymbols: function (d, s) { return jsonDocumentSymbols.findDocumentColors(d, s).then(function (s) { return s.map(function (s) { return s.range; }); }); },
			findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
			getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
			doHover: jsonHover.doHover.bind(jsonHover),
			getFoldingRanges: _services_jsonFolding__WEBPACK_IMPORTED_MODULE_8__["getFoldingRanges"],
			getSelectionRanges: _services_jsonSelectionRanges__WEBPACK_IMPORTED_MODULE_9__["getSelectionRanges"],
			format: function (d, r, o) {
				var range = void 0;
				if (r) {
					var offset = d.offsetAt(r.start);
					var length = d.offsetAt(r.end) - offset;
					range = { offset: offset, length: length };
				}
				var options = { tabSize: o ? o.tabSize : 4, insertSpaces: o ? o.insertSpaces : true, eol: '\n' };
				return Object(jsonc_parser__WEBPACK_IMPORTED_MODULE_10__["format"])(d.getText(), range, options).map(function (e) {
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["TextEdit"].replace(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Range"].create(d.positionAt(e.offset), d.positionAt(e.offset + e.length)), e.content);
				});
			}
		};
	}


	/***/ }),
	/* 62 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONCompletion", function() { return JSONCompletion; });
	/* harmony import */ var _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
	/* harmony import */ var _utils_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71);
	/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
	/* harmony import */ var _utils_objects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69);
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vscode_nls__WEBPACK_IMPORTED_MODULE_6__);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/







	var localize = vscode_nls__WEBPACK_IMPORTED_MODULE_6__["loadMessageBundle"]();
	var JSONCompletion = /** @class */ (function () {
		function JSONCompletion(schemaService, contributions, promiseConstructor, clientCapabilities) {
			if (contributions === void 0) { contributions = []; }
			if (promiseConstructor === void 0) { promiseConstructor = Promise; }
			if (clientCapabilities === void 0) { clientCapabilities = {}; }
			this.schemaService = schemaService;
			this.contributions = contributions;
			this.promiseConstructor = promiseConstructor;
			this.clientCapabilities = clientCapabilities;
			this.templateVarIdCounter = 0;
		}
		JSONCompletion.prototype.doResolve = function (item) {
			for (var i = this.contributions.length - 1; i >= 0; i--) {
				if (this.contributions[i].resolveCompletion) {
					var resolver = this.contributions[i].resolveCompletion(item);
					if (resolver) {
						return resolver;
					}
				}
			}
			return this.promiseConstructor.resolve(item);
		};
		JSONCompletion.prototype.doComplete = function (document, position, doc) {
			var _this = this;
			var result = {
				items: [],
				isIncomplete: false
			};
			var offset = document.offsetAt(position);
			var node = doc.getNodeFromOffset(offset, true);
			if (this.isInComment(document, node ? node.offset : 0, offset)) {
				return Promise.resolve(result);
			}
			var currentWord = this.getCurrentWord(document, offset);
			var overwriteRange = null;
			if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
				overwriteRange = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Range"].create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
			}
			else {
				var overwriteStart = offset - currentWord.length;
				if (overwriteStart > 0 && document.getText()[overwriteStart - 1] === '"') {
					overwriteStart--;
				}
				overwriteRange = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Range"].create(document.positionAt(overwriteStart), position);
			}
			var proposed = {};
			var collector = {
				add: function (suggestion) {
					var existing = proposed[suggestion.label];
					if (!existing) {
						proposed[suggestion.label] = suggestion;
						if (overwriteRange) {
							suggestion.textEdit = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["TextEdit"].replace(overwriteRange, suggestion.insertText);
						}
						result.items.push(suggestion);
					}
					else if (!existing.documentation) {
						existing.documentation = suggestion.documentation;
					}
				},
				setAsIncomplete: function () {
					result.isIncomplete = true;
				},
				error: function (message) {
					console.error(message);
				},
				log: function (message) {
					console.log(message);
				},
				getNumberOfProposals: function () {
					return result.items.length;
				}
			};
			return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
				var collectionPromises = [];
				var addValue = true;
				var currentKey = '';
				var currentProperty = null;
				if (node) {
					if (node.type === 'string') {
						var parent = node.parent;
						if (parent && parent.type === 'property' && parent.keyNode === node) {
							addValue = !parent.valueNode;
							currentProperty = parent;
							currentKey = document.getText().substr(node.offset + 1, node.length - 2);
							if (parent) {
								node = parent.parent;
							}
						}
					}
				}
				// proposals for properties
				if (node && node.type === 'object') {
					// don't suggest keys when the cursor is just before the opening curly brace
					if (node.offset === offset) {
						return result;
					}
					// don't suggest properties that are already present
					var properties = node.properties;
					properties.forEach(function (p) {
						if (!currentProperty || currentProperty !== p) {
							proposed[p.keyNode.value] = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItem"].create('__');
						}
					});
					var separatorAfter_1 = '';
					if (addValue) {
						separatorAfter_1 = _this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
					}
					if (schema) {
						// property proposals with schema
						_this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter_1, collector);
					}
					else {
						// property proposals without schema
						_this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
					}
					var location_1 = _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodePath"](node);
					_this.contributions.forEach(function (contribution) {
						var collectPromise = contribution.collectPropertyCompletions(document.uri, location_1, currentWord, addValue, separatorAfter_1 === '', collector);
						if (collectPromise) {
							collectionPromises.push(collectPromise);
						}
					});
					if ((!schema && currentWord.length > 0 && document.getText().charAt(offset - currentWord.length - 1) !== '"')) {
						collector.add({
							kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Property,
							label: _this.getLabelForValue(currentWord),
							insertText: _this.getInsertTextForProperty(currentWord, null, false, separatorAfter_1),
							insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet, documentation: '',
						});
						collector.setAsIncomplete();
					}
				}
				// proposals for values
				var types = {};
				if (schema) {
					// value proposals with schema
					_this.getValueCompletions(schema, doc, node, offset, document, collector, types);
				}
				else {
					// value proposals without schema
					_this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
				}
				if (_this.contributions.length > 0) {
					_this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
				}
				return _this.promiseConstructor.all(collectionPromises).then(function () {
					if (collector.getNumberOfProposals() === 0) {
						var offsetForSeparator = offset;
						if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
							offsetForSeparator = node.offset + node.length;
						}
						var separatorAfter = _this.evaluateSeparatorAfter(document, offsetForSeparator);
						_this.addFillerValueCompletions(types, separatorAfter, collector);
					}
					return result;
				});
			});
		};
		JSONCompletion.prototype.getPropertyCompletions = function (schema, doc, node, addValue, separatorAfter, collector) {
			var _this = this;
			var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
			matchingSchemas.forEach(function (s) {
				if (s.node === node && !s.inverted) {
					var schemaProperties_1 = s.schema.properties;
					if (schemaProperties_1) {
						Object.keys(schemaProperties_1).forEach(function (key) {
							var propertySchema = schemaProperties_1[key];
							if (typeof propertySchema === 'object' && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
								var proposal = {
									kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Property,
									label: _this.sanitizeLabel(key),
									insertText: _this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
									insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
									filterText: _this.getFilterTextForValue(key),
									documentation: _this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || '',
								};
								if (Object(_utils_strings__WEBPACK_IMPORTED_MODULE_3__["endsWith"])(proposal.insertText, "$1" + separatorAfter)) {
									proposal.command = {
										title: 'Suggest',
										command: 'editor.action.triggerSuggest'
									};
								}
								collector.add(proposal);
							}
						});
					}
				}
			});
		};
		JSONCompletion.prototype.getSchemaLessPropertyCompletions = function (doc, node, currentKey, collector) {
			var _this = this;
			var collectCompletionsForSimilarObject = function (obj) {
				obj.properties.forEach(function (p) {
					var key = p.keyNode.value;
					collector.add({
						kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Property,
						label: _this.sanitizeLabel(key),
						insertText: _this.getInsertTextForValue(key, ''),
						insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
						filterText: _this.getFilterTextForValue(key),
						documentation: ''
					});
				});
			};
			if (node.parent) {
				if (node.parent.type === 'property') {
					// if the object is a property value, check the tree for other objects that hang under a property of the same name
					var parentKey_1 = node.parent.keyNode.value;
					doc.visit(function (n) {
						if (n.type === 'property' && n !== node.parent && n.keyNode.value === parentKey_1 && n.valueNode && n.valueNode.type === 'object') {
							collectCompletionsForSimilarObject(n.valueNode);
						}
						return true;
					});
				}
				else if (node.parent.type === 'array') {
					// if the object is in an array, use all other array elements as similar objects
					node.parent.items.forEach(function (n) {
						if (n.type === 'object' && n !== node) {
							collectCompletionsForSimilarObject(n);
						}
					});
				}
			}
			else if (node.type === 'object') {
				collector.add({
					kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Property,
					label: '$schema',
					insertText: this.getInsertTextForProperty('$schema', null, true, ''),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet, documentation: '',
					filterText: this.getFilterTextForValue("$schema")
				});
			}
		};
		JSONCompletion.prototype.getSchemaLessValueCompletions = function (doc, node, offset, document, collector) {
			var _this = this;
			var offsetForSeparator = offset;
			if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
				offsetForSeparator = node.offset + node.length;
				node = node.parent;
			}
			if (!node) {
				collector.add({
					kind: this.getSuggestionKind('object'),
					label: 'Empty object',
					insertText: this.getInsertTextForValue({}, ''),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					documentation: ''
				});
				collector.add({
					kind: this.getSuggestionKind('array'),
					label: 'Empty array',
					insertText: this.getInsertTextForValue([], ''),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					documentation: ''
				});
				return;
			}
			var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
			var collectSuggestionsForValues = function (value) {
				if (!_parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["contains"](value.parent, offset, true)) {
					collector.add({
						kind: _this.getSuggestionKind(value.type),
						label: _this.getLabelTextForMatchingNode(value, document),
						insertText: _this.getInsertTextForMatchingNode(value, document, separatorAfter),
						insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet, documentation: ''
					});
				}
				if (value.type === 'boolean') {
					_this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
				}
			};
			if (node.type === 'property') {
				if (offset > node.colonOffset) {
					var valueNode = node.valueNode;
					if (valueNode && (offset > (valueNode.offset + valueNode.length) || valueNode.type === 'object' || valueNode.type === 'array')) {
						return;
					}
					// suggest values at the same key
					var parentKey_2 = node.keyNode.value;
					doc.visit(function (n) {
						if (n.type === 'property' && n.keyNode.value === parentKey_2 && n.valueNode) {
							collectSuggestionsForValues(n.valueNode);
						}
						return true;
					});
					if (parentKey_2 === '$schema' && node.parent && !node.parent.parent) {
						this.addDollarSchemaCompletions(separatorAfter, collector);
					}
				}
			}
			if (node.type === 'array') {
				if (node.parent && node.parent.type === 'property') {
					// suggest items of an array at the same key
					var parentKey_3 = node.parent.keyNode.value;
					doc.visit(function (n) {
						if (n.type === 'property' && n.keyNode.value === parentKey_3 && n.valueNode && n.valueNode.type === 'array') {
							n.valueNode.items.forEach(collectSuggestionsForValues);
						}
						return true;
					});
				}
				else {
					// suggest items in the same array
					node.items.forEach(collectSuggestionsForValues);
				}
			}
		};
		JSONCompletion.prototype.getValueCompletions = function (schema, doc, node, offset, document, collector, types) {
			var _this = this;
			var offsetForSeparator = offset;
			var parentKey = null;
			var valueNode = null;
			if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
				offsetForSeparator = node.offset + node.length;
				valueNode = node;
				node = node.parent;
			}
			if (!node) {
				this.addSchemaValueCompletions(schema.schema, '', collector, types);
				return;
			}
			if ((node.type === 'property') && offset > node.colonOffset) {
				var valueNode_1 = node.valueNode;
				if (valueNode_1 && offset > (valueNode_1.offset + valueNode_1.length)) {
					return; // we are past the value node
				}
				parentKey = node.keyNode.value;
				node = node.parent;
			}
			if (node && (parentKey !== null || node.type === 'array')) {
				var separatorAfter_2 = this.evaluateSeparatorAfter(document, offsetForSeparator);
				var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
				matchingSchemas.forEach(function (s) {
					if (s.node === node && !s.inverted && s.schema) {
						if (node.type === 'array' && s.schema.items) {
							if (Array.isArray(s.schema.items)) {
								var index = _this.findItemAtOffset(node, document, offset);
								if (index < s.schema.items.length) {
									_this.addSchemaValueCompletions(s.schema.items[index], separatorAfter_2, collector, types);
								}
							}
							else {
								_this.addSchemaValueCompletions(s.schema.items, separatorAfter_2, collector, types);
							}
						}
						if (s.schema.properties) {
							var propertySchema = s.schema.properties[parentKey];
							if (propertySchema) {
								_this.addSchemaValueCompletions(propertySchema, separatorAfter_2, collector, types);
							}
						}
					}
				});
				if (parentKey === '$schema' && !node.parent) {
					this.addDollarSchemaCompletions(separatorAfter_2, collector);
				}
				if (types['boolean']) {
					this.addBooleanValueCompletion(true, separatorAfter_2, collector);
					this.addBooleanValueCompletion(false, separatorAfter_2, collector);
				}
				if (types['null']) {
					this.addNullValueCompletion(separatorAfter_2, collector);
				}
			}
		};
		JSONCompletion.prototype.getContributedValueCompletions = function (doc, node, offset, document, collector, collectionPromises) {
			if (!node) {
				this.contributions.forEach(function (contribution) {
					var collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
					if (collectPromise) {
						collectionPromises.push(collectPromise);
					}
				});
			}
			else {
				if (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null') {
					node = node.parent;
				}
				if ((node.type === 'property') && offset > node.colonOffset) {
					var parentKey_4 = node.keyNode.value;
					var valueNode = node.valueNode;
					if (!valueNode || offset <= (valueNode.offset + valueNode.length)) {
						var location_2 = _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodePath"](node.parent);
						this.contributions.forEach(function (contribution) {
							var collectPromise = contribution.collectValueCompletions(document.uri, location_2, parentKey_4, collector);
							if (collectPromise) {
								collectionPromises.push(collectPromise);
							}
						});
					}
				}
			}
		};
		JSONCompletion.prototype.addSchemaValueCompletions = function (schema, separatorAfter, collector, types) {
			var _this = this;
			if (typeof schema === 'object') {
				this.addEnumValueCompletions(schema, separatorAfter, collector);
				this.addDefaultValueCompletions(schema, separatorAfter, collector);
				this.collectTypes(schema, types);
				if (Array.isArray(schema.allOf)) {
					schema.allOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
				}
				if (Array.isArray(schema.anyOf)) {
					schema.anyOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
				}
				if (Array.isArray(schema.oneOf)) {
					schema.oneOf.forEach(function (s) { return _this.addSchemaValueCompletions(s, separatorAfter, collector, types); });
				}
			}
		};
		JSONCompletion.prototype.addDefaultValueCompletions = function (schema, separatorAfter, collector, arrayDepth) {
			var _this = this;
			if (arrayDepth === void 0) { arrayDepth = 0; }
			var hasProposals = false;
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(schema.default)) {
				var type = schema.type;
				var value = schema.default;
				for (var i = arrayDepth; i > 0; i--) {
					value = [value];
					type = 'array';
				}
				collector.add({
					kind: this.getSuggestionKind(type),
					label: this.getLabelForValue(value),
					insertText: this.getInsertTextForValue(value, separatorAfter),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					detail: localize('json.suggest.default', 'Default value')
				});
				hasProposals = true;
			}
			if (Array.isArray(schema.examples)) {
				schema.examples.forEach(function (example) {
					var type = schema.type;
					var value = example;
					for (var i = arrayDepth; i > 0; i--) {
						value = [value];
						type = 'array';
					}
					collector.add({
						kind: _this.getSuggestionKind(type),
						label: _this.getLabelForValue(value),
						insertText: _this.getInsertTextForValue(value, separatorAfter),
						insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet
					});
					hasProposals = true;
				});
			}
			if (Array.isArray(schema.defaultSnippets)) {
				schema.defaultSnippets.forEach(function (s) {
					var type = schema.type;
					var value = s.body;
					var label = s.label;
					var insertText;
					var filterText;
					if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(value)) {
						var type_1 = schema.type;
						for (var i = arrayDepth; i > 0; i--) {
							value = [value];
							type_1 = 'array';
						}
						insertText = _this.getInsertTextForSnippetValue(value, separatorAfter);
						filterText = _this.getFilterTextForSnippetValue(value);
						label = label || _this.getLabelForSnippetValue(value);
					}
					else if (typeof s.bodyText === 'string') {
						var prefix = '', suffix = '', indent = '';
						for (var i = arrayDepth; i > 0; i--) {
							prefix = prefix + indent + '[\n';
							suffix = suffix + '\n' + indent + ']';
							indent += '\t';
							type = 'array';
						}
						insertText = prefix + indent + s.bodyText.split('\n').join('\n' + indent) + suffix + separatorAfter;
						label = label || _this.sanitizeLabel(insertText),
							filterText = insertText.replace(/[\n]/g, ''); // remove new lines
					}
					collector.add({
						kind: _this.getSuggestionKind(type),
						label: label,
						documentation: _this.fromMarkup(s.markdownDescription) || s.description,
						insertText: insertText,
						insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
						filterText: filterText
					});
					hasProposals = true;
				});
			}
			if (!hasProposals && typeof schema.items === 'object' && !Array.isArray(schema.items)) {
				this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
			}
		};
		JSONCompletion.prototype.addEnumValueCompletions = function (schema, separatorAfter, collector) {
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(schema.const)) {
				collector.add({
					kind: this.getSuggestionKind(schema.type),
					label: this.getLabelForValue(schema.const),
					insertText: this.getInsertTextForValue(schema.const, separatorAfter),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					documentation: this.fromMarkup(schema.markdownDescription) || schema.description
				});
			}
			if (Array.isArray(schema.enum)) {
				for (var i = 0, length = schema.enum.length; i < length; i++) {
					var enm = schema.enum[i];
					var documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
					if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
						documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
					}
					else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
						documentation = schema.enumDescriptions[i];
					}
					collector.add({
						kind: this.getSuggestionKind(schema.type),
						label: this.getLabelForValue(enm),
						insertText: this.getInsertTextForValue(enm, separatorAfter),
						insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
						documentation: documentation
					});
				}
			}
		};
		JSONCompletion.prototype.collectTypes = function (schema, types) {
			if (Array.isArray(schema.enum) || Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(schema.const)) {
				return;
			}
			var type = schema.type;
			if (Array.isArray(type)) {
				type.forEach(function (t) { return types[t] = true; });
			}
			else {
				types[type] = true;
			}
		};
		JSONCompletion.prototype.addFillerValueCompletions = function (types, separatorAfter, collector) {
			if (types['object']) {
				collector.add({
					kind: this.getSuggestionKind('object'),
					label: '{}',
					insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					detail: localize('defaults.object', 'New object'),
					documentation: ''
				});
			}
			if (types['array']) {
				collector.add({
					kind: this.getSuggestionKind('array'),
					label: '[]',
					insertText: this.getInsertTextForGuessedValue([], separatorAfter),
					insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
					detail: localize('defaults.array', 'New array'),
					documentation: ''
				});
			}
		};
		JSONCompletion.prototype.addBooleanValueCompletion = function (value, separatorAfter, collector) {
			collector.add({
				kind: this.getSuggestionKind('boolean'),
				label: value ? 'true' : 'false',
				insertText: this.getInsertTextForValue(value, separatorAfter),
				insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
				documentation: ''
			});
		};
		JSONCompletion.prototype.addNullValueCompletion = function (separatorAfter, collector) {
			collector.add({
				kind: this.getSuggestionKind('null'),
				label: 'null',
				insertText: 'null' + separatorAfter,
				insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet,
				documentation: ''
			});
		};
		JSONCompletion.prototype.addDollarSchemaCompletions = function (separatorAfter, collector) {
			var _this = this;
			var schemaIds = this.schemaService.getRegisteredSchemaIds(function (schema) { return schema === 'http' || schema === 'https'; });
			schemaIds.forEach(function (schemaId) { return collector.add({
				kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Module,
				label: _this.getLabelForValue(schemaId),
				filterText: _this.getFilterTextForValue(schemaId),
				insertText: _this.getInsertTextForValue(schemaId, separatorAfter),
				insertTextFormat: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["InsertTextFormat"].Snippet, documentation: ''
			}); });
		};
		JSONCompletion.prototype.sanitizeLabel = function (label) {
			label = label.replace(/[\n]/g, '↵');
			if (label.length > 57) {
				label = label.substr(0, 57).trim() + '...';
			}
			return label;
		};
		JSONCompletion.prototype.getLabelForValue = function (value) {
			return this.sanitizeLabel(JSON.stringify(value));
		};
		JSONCompletion.prototype.getFilterTextForValue = function (value) {
			return JSON.stringify(value);
		};
		JSONCompletion.prototype.getFilterTextForSnippetValue = function (value) {
			return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
		};
		JSONCompletion.prototype.getLabelForSnippetValue = function (value) {
			var label = JSON.stringify(value);
			label = label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
			return this.sanitizeLabel(label);
		};
		JSONCompletion.prototype.getInsertTextForPlainText = function (text) {
			return text.replace(/[\\\$\}]/g, '\\$&'); // escape $, \ and }
		};
		JSONCompletion.prototype.getInsertTextForValue = function (value, separatorAfter) {
			var text = JSON.stringify(value, null, '\t');
			if (text === '{}') {
				return '{$1}' + separatorAfter;
			}
			else if (text === '[]') {
				return '[$1]' + separatorAfter;
			}
			return this.getInsertTextForPlainText(text + separatorAfter);
		};
		JSONCompletion.prototype.getInsertTextForSnippetValue = function (value, separatorAfter) {
			var replacer = function (value) {
				if (typeof value === 'string') {
					if (value[0] === '^') {
						return value.substr(1);
					}
				}
				return JSON.stringify(value);
			};
			return Object(_utils_json__WEBPACK_IMPORTED_MODULE_2__["stringifyObject"])(value, '', replacer) + separatorAfter;
		};
		JSONCompletion.prototype.getInsertTextForGuessedValue = function (value, separatorAfter) {
			switch (typeof value) {
				case 'object':
					if (value === null) {
						return '${1:null}' + separatorAfter;
					}
					return this.getInsertTextForValue(value, separatorAfter);
				case 'string':
					var snippetValue = JSON.stringify(value);
					snippetValue = snippetValue.substr(1, snippetValue.length - 2); // remove quotes
					snippetValue = this.getInsertTextForPlainText(snippetValue); // escape \ and }
					return '"${1:' + snippetValue + '}"' + separatorAfter;
				case 'number':
				case 'boolean':
					return '${1:' + JSON.stringify(value) + '}' + separatorAfter;
			}
			return this.getInsertTextForValue(value, separatorAfter);
		};
		JSONCompletion.prototype.getSuggestionKind = function (type) {
			if (Array.isArray(type)) {
				var array = type;
				type = array.length > 0 ? array[0] : null;
			}
			if (!type) {
				return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Value;
			}
			switch (type) {
				case 'string': return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Value;
				case 'object': return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Module;
				case 'property': return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Property;
				default: return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["CompletionItemKind"].Value;
			}
		};
		JSONCompletion.prototype.getLabelTextForMatchingNode = function (node, document) {
			switch (node.type) {
				case 'array':
					return '[]';
				case 'object':
					return '{}';
				default:
					var content = document.getText().substr(node.offset, node.length);
					return content;
			}
		};
		JSONCompletion.prototype.getInsertTextForMatchingNode = function (node, document, separatorAfter) {
			switch (node.type) {
				case 'array':
					return this.getInsertTextForValue([], separatorAfter);
				case 'object':
					return this.getInsertTextForValue({}, separatorAfter);
				default:
					var content = document.getText().substr(node.offset, node.length) + separatorAfter;
					return this.getInsertTextForPlainText(content);
			}
		};
		JSONCompletion.prototype.getInsertTextForProperty = function (key, propertySchema, addValue, separatorAfter) {
			var propertyText = this.getInsertTextForValue(key, '');
			if (!addValue) {
				return propertyText;
			}
			var resultText = propertyText + ': ';
			var value;
			var nValueProposals = 0;
			if (propertySchema) {
				if (Array.isArray(propertySchema.defaultSnippets)) {
					if (propertySchema.defaultSnippets.length === 1) {
						var body = propertySchema.defaultSnippets[0].body;
						if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(body)) {
							value = this.getInsertTextForSnippetValue(body, '');
						}
					}
					nValueProposals += propertySchema.defaultSnippets.length;
				}
				if (propertySchema.enum) {
					if (!value && propertySchema.enum.length === 1) {
						value = this.getInsertTextForGuessedValue(propertySchema.enum[0], '');
					}
					nValueProposals += propertySchema.enum.length;
				}
				if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(propertySchema.default)) {
					if (!value) {
						value = this.getInsertTextForGuessedValue(propertySchema.default, '');
					}
					nValueProposals++;
				}
				if (nValueProposals === 0) {
					var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
					if (!type) {
						if (propertySchema.properties) {
							type = 'object';
						}
						else if (propertySchema.items) {
							type = 'array';
						}
					}
					switch (type) {
						case 'boolean':
							value = '$1';
							break;
						case 'string':
							value = '"$1"';
							break;
						case 'object':
							value = '{$1}';
							break;
						case 'array':
							value = '[$1]';
							break;
						case 'number':
						case 'integer':
							value = '${1:0}';
							break;
						case 'null':
							value = '${1:null}';
							break;
						default:
							return propertyText;
					}
				}
			}
			if (!value || nValueProposals > 1) {
				value = '$1';
			}
			return resultText + value + separatorAfter;
		};
		JSONCompletion.prototype.getCurrentWord = function (document, offset) {
			var i = offset - 1;
			var text = document.getText();
			while (i >= 0 && ' \t\n\r\v":{[,]}'.indexOf(text.charAt(i)) === -1) {
				i--;
			}
			return text.substring(i + 1, offset);
		};
		JSONCompletion.prototype.evaluateSeparatorAfter = function (document, offset) {
			var scanner = jsonc_parser__WEBPACK_IMPORTED_MODULE_1__["createScanner"](document.getText(), true);
			scanner.setPosition(offset);
			var token = scanner.scan();
			switch (token) {
				case 5 /* CommaToken */:
				case 2 /* CloseBraceToken */:
				case 4 /* CloseBracketToken */:
				case 17 /* EOF */:
					return '';
				default:
					return ',';
			}
		};
		JSONCompletion.prototype.findItemAtOffset = function (node, document, offset) {
			var scanner = jsonc_parser__WEBPACK_IMPORTED_MODULE_1__["createScanner"](document.getText(), true);
			var children = node.items;
			for (var i = children.length - 1; i >= 0; i--) {
				var child = children[i];
				if (offset > child.offset + child.length) {
					scanner.setPosition(child.offset + child.length);
					var token = scanner.scan();
					if (token === 5 /* CommaToken */ && offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
						return i + 1;
					}
					return i;
				}
				else if (offset >= child.offset) {
					return i;
				}
			}
			return 0;
		};
		JSONCompletion.prototype.isInComment = function (document, start, offset) {
			var scanner = jsonc_parser__WEBPACK_IMPORTED_MODULE_1__["createScanner"](document.getText(), false);
			scanner.setPosition(start);
			var token = scanner.scan();
			while (token !== 17 /* EOF */ && (scanner.getTokenOffset() + scanner.getTokenLength() < offset)) {
				token = scanner.scan();
			}
			return (token === 12 /* LineCommentTrivia */ || token === 13 /* BlockCommentTrivia */) && scanner.getTokenOffset() <= offset;
		};
		JSONCompletion.prototype.fromMarkup = function (markupString) {
			if (markupString && this.doesSupportMarkdown()) {
				return {
					kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["MarkupKind"].Markdown,
					value: markupString
				};
			}
			return undefined;
		};
		JSONCompletion.prototype.doesSupportMarkdown = function () {
			if (!Object(_utils_objects__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this.supportsMarkdown)) {
				var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
				this.supportsMarkdown = completion && completion.completionItem && Array.isArray(completion.completionItem.documentationFormat) && completion.completionItem.documentationFormat.indexOf(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["MarkupKind"].Markdown) !== -1;
			}
			return this.supportsMarkdown;
		};
		return JSONCompletion;
	}());



	/***/ }),
	/* 63 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASTNodeImpl", function() { return ASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NullASTNodeImpl", function() { return NullASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanASTNodeImpl", function() { return BooleanASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayASTNodeImpl", function() { return ArrayASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumberASTNodeImpl", function() { return NumberASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringASTNodeImpl", function() { return StringASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyASTNodeImpl", function() { return PropertyASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectASTNodeImpl", function() { return ObjectASTNodeImpl; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asSchema", function() { return asSchema; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumMatch", function() { return EnumMatch; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationResult", function() { return ValidationResult; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newJSONDocument", function() { return newJSONDocument; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeValue", function() { return getNodeValue; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodePath", function() { return getNodePath; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONDocument", function() { return JSONDocument; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
	/* harmony import */ var _utils_objects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
	/* harmony import */ var _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vscode_nls__WEBPACK_IMPORTED_MODULE_3__);
	/* harmony import */ var vscode_uri__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59);
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __extends = (undefined && undefined.__extends) || (function () {
		var extendStatics = function (d, b) {
			extendStatics = Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
				function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			return extendStatics(d, b);
		}
		return function (d, b) {
			extendStatics(d, b);
			function __() { this.constructor = d; }
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();






	var localize = vscode_nls__WEBPACK_IMPORTED_MODULE_3__["loadMessageBundle"]();
	var colorHexPattern = /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/;
	var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var ASTNodeImpl = /** @class */ (function () {
		function ASTNodeImpl(parent, offset, length) {
			this.offset = offset;
			this.length = length;
			this.parent = parent;
		}
		Object.defineProperty(ASTNodeImpl.prototype, "children", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		ASTNodeImpl.prototype.toString = function () {
			return 'type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' + (this.parent ? ' parent: {' + this.parent.toString() + '}' : '');
		};
		return ASTNodeImpl;
	}());

	var NullASTNodeImpl = /** @class */ (function (_super) {
		__extends(NullASTNodeImpl, _super);
		function NullASTNodeImpl(parent, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'null';
			_this.value = null;
			return _this;
		}
		return NullASTNodeImpl;
	}(ASTNodeImpl));

	var BooleanASTNodeImpl = /** @class */ (function (_super) {
		__extends(BooleanASTNodeImpl, _super);
		function BooleanASTNodeImpl(parent, boolValue, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'boolean';
			_this.value = boolValue;
			return _this;
		}
		return BooleanASTNodeImpl;
	}(ASTNodeImpl));

	var ArrayASTNodeImpl = /** @class */ (function (_super) {
		__extends(ArrayASTNodeImpl, _super);
		function ArrayASTNodeImpl(parent, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'array';
			_this.items = [];
			return _this;
		}
		Object.defineProperty(ArrayASTNodeImpl.prototype, "children", {
			get: function () {
				return this.items;
			},
			enumerable: true,
			configurable: true
		});
		return ArrayASTNodeImpl;
	}(ASTNodeImpl));

	var NumberASTNodeImpl = /** @class */ (function (_super) {
		__extends(NumberASTNodeImpl, _super);
		function NumberASTNodeImpl(parent, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'number';
			_this.isInteger = true;
			_this.value = Number.NaN;
			return _this;
		}
		return NumberASTNodeImpl;
	}(ASTNodeImpl));

	var StringASTNodeImpl = /** @class */ (function (_super) {
		__extends(StringASTNodeImpl, _super);
		function StringASTNodeImpl(parent, offset, length) {
			var _this = _super.call(this, parent, offset, length) || this;
			_this.type = 'string';
			_this.value = '';
			return _this;
		}
		return StringASTNodeImpl;
	}(ASTNodeImpl));

	var PropertyASTNodeImpl = /** @class */ (function (_super) {
		__extends(PropertyASTNodeImpl, _super);
		function PropertyASTNodeImpl(parent, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'property';
			_this.colonOffset = -1;
			return _this;
		}
		Object.defineProperty(PropertyASTNodeImpl.prototype, "children", {
			get: function () {
				return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
			},
			enumerable: true,
			configurable: true
		});
		return PropertyASTNodeImpl;
	}(ASTNodeImpl));

	var ObjectASTNodeImpl = /** @class */ (function (_super) {
		__extends(ObjectASTNodeImpl, _super);
		function ObjectASTNodeImpl(parent, offset) {
			var _this = _super.call(this, parent, offset) || this;
			_this.type = 'object';
			_this.properties = [];
			return _this;
		}
		Object.defineProperty(ObjectASTNodeImpl.prototype, "children", {
			get: function () {
				return this.properties;
			},
			enumerable: true,
			configurable: true
		});
		return ObjectASTNodeImpl;
	}(ASTNodeImpl));

	function asSchema(schema) {
		if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isBoolean"])(schema)) {
			return schema ? {} : { "not": {} };
		}
		return schema;
	}
	var EnumMatch;
	(function (EnumMatch) {
		EnumMatch[EnumMatch["Key"] = 0] = "Key";
		EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
	})(EnumMatch || (EnumMatch = {}));
	var SchemaCollector = /** @class */ (function () {
		function SchemaCollector(focusOffset, exclude) {
			if (focusOffset === void 0) { focusOffset = -1; }
			if (exclude === void 0) { exclude = null; }
			this.focusOffset = focusOffset;
			this.exclude = exclude;
			this.schemas = [];
		}
		SchemaCollector.prototype.add = function (schema) {
			this.schemas.push(schema);
		};
		SchemaCollector.prototype.merge = function (other) {
			var _a;
			(_a = this.schemas).push.apply(_a, other.schemas);
		};
		SchemaCollector.prototype.include = function (node) {
			return (this.focusOffset === -1 || contains(node, this.focusOffset)) && (node !== this.exclude);
		};
		SchemaCollector.prototype.newSub = function () {
			return new SchemaCollector(-1, this.exclude);
		};
		return SchemaCollector;
	}());
	var NoOpSchemaCollector = /** @class */ (function () {
		function NoOpSchemaCollector() {
		}
		Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
			get: function () { return []; },
			enumerable: true,
			configurable: true
		});
		NoOpSchemaCollector.prototype.add = function (schema) { };
		NoOpSchemaCollector.prototype.merge = function (other) { };
		NoOpSchemaCollector.prototype.include = function (node) { return true; };
		NoOpSchemaCollector.prototype.newSub = function () { return this; };
		NoOpSchemaCollector.instance = new NoOpSchemaCollector();
		return NoOpSchemaCollector;
	}());
	var ValidationResult = /** @class */ (function () {
		function ValidationResult() {
			this.problems = [];
			this.propertiesMatches = 0;
			this.propertiesValueMatches = 0;
			this.primaryValueMatches = 0;
			this.enumValueMatch = false;
			this.enumValues = null;
		}
		ValidationResult.prototype.hasProblems = function () {
			return !!this.problems.length;
		};
		ValidationResult.prototype.mergeAll = function (validationResults) {
			for (var _i = 0, validationResults_1 = validationResults; _i < validationResults_1.length; _i++) {
				var validationResult = validationResults_1[_i];
				this.merge(validationResult);
			}
		};
		ValidationResult.prototype.merge = function (validationResult) {
			this.problems = this.problems.concat(validationResult.problems);
		};
		ValidationResult.prototype.mergeEnumValues = function (validationResult) {
			if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
				this.enumValues = this.enumValues.concat(validationResult.enumValues);
				for (var _i = 0, _a = this.problems; _i < _a.length; _i++) {
					var error = _a[_i];
					if (error.code === _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].EnumValueMismatch) {
						error.message = localize('enumWarning', 'Value is not accepted. Valid values: {0}.', this.enumValues.map(function (v) { return JSON.stringify(v); }).join(', '));
					}
				}
			}
		};
		ValidationResult.prototype.mergePropertyMatch = function (propertyValidationResult) {
			this.merge(propertyValidationResult);
			this.propertiesMatches++;
			if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
				this.propertiesValueMatches++;
			}
			if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
				this.primaryValueMatches++;
			}
		};
		ValidationResult.prototype.compare = function (other) {
			var hasProblems = this.hasProblems();
			if (hasProblems !== other.hasProblems()) {
				return hasProblems ? -1 : 1;
			}
			if (this.enumValueMatch !== other.enumValueMatch) {
				return other.enumValueMatch ? -1 : 1;
			}
			if (this.primaryValueMatches !== other.primaryValueMatches) {
				return this.primaryValueMatches - other.primaryValueMatches;
			}
			if (this.propertiesValueMatches !== other.propertiesValueMatches) {
				return this.propertiesValueMatches - other.propertiesValueMatches;
			}
			return this.propertiesMatches - other.propertiesMatches;
		};
		return ValidationResult;
	}());

	function newJSONDocument(root, diagnostics) {
		if (diagnostics === void 0) { diagnostics = []; }
		return new JSONDocument(root, diagnostics, []);
	}
	function getNodeValue(node) {
		return jsonc_parser__WEBPACK_IMPORTED_MODULE_0__["getNodeValue"](node);
	}
	function getNodePath(node) {
		return jsonc_parser__WEBPACK_IMPORTED_MODULE_0__["getNodePath"](node);
	}
	function contains(node, offset, includeRightBound) {
		if (includeRightBound === void 0) { includeRightBound = false; }
		return offset >= node.offset && offset < (node.offset + node.length) || includeRightBound && offset === (node.offset + node.length);
	}
	var JSONDocument = /** @class */ (function () {
		function JSONDocument(root, syntaxErrors, comments) {
			if (syntaxErrors === void 0) { syntaxErrors = []; }
			if (comments === void 0) { comments = []; }
			this.root = root;
			this.syntaxErrors = syntaxErrors;
			this.comments = comments;
		}
		JSONDocument.prototype.getNodeFromOffset = function (offset, includeRightBound) {
			if (includeRightBound === void 0) { includeRightBound = false; }
			if (this.root) {
				return jsonc_parser__WEBPACK_IMPORTED_MODULE_0__["findNodeAtOffset"](this.root, offset, includeRightBound);
			}
			return void 0;
		};
		JSONDocument.prototype.visit = function (visitor) {
			if (this.root) {
				var doVisit_1 = function (node) {
					var ctn = visitor(node);
					var children = node.children;
					if (Array.isArray(children)) {
						for (var i = 0; i < children.length && ctn; i++) {
							ctn = doVisit_1(children[i]);
						}
					}
					return ctn;
				};
				doVisit_1(this.root);
			}
		};
		JSONDocument.prototype.validate = function (textDocument, schema) {
			if (this.root && schema) {
				var validationResult = new ValidationResult();
				validate(this.root, schema, validationResult, NoOpSchemaCollector.instance);
				return validationResult.problems.map(function (p) {
					var range = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Range"].create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Diagnostic"].create(range, p.message, p.severity, p.code);
				});
			}
			return null;
		};
		JSONDocument.prototype.getMatchingSchemas = function (schema, focusOffset, exclude) {
			if (focusOffset === void 0) { focusOffset = -1; }
			if (exclude === void 0) { exclude = null; }
			var matchingSchemas = new SchemaCollector(focusOffset, exclude);
			if (this.root && schema) {
				validate(this.root, schema, new ValidationResult(), matchingSchemas);
			}
			return matchingSchemas.schemas;
		};
		return JSONDocument;
	}());

	function validate(node, schema, validationResult, matchingSchemas) {
		if (!node || !matchingSchemas.include(node)) {
			return;
		}
		switch (node.type) {
			case 'object':
				_validateObjectNode(node, schema, validationResult, matchingSchemas);
				break;
			case 'array':
				_validateArrayNode(node, schema, validationResult, matchingSchemas);
				break;
			case 'string':
				_validateStringNode(node, schema, validationResult, matchingSchemas);
				break;
			case 'number':
				_validateNumberNode(node, schema, validationResult, matchingSchemas);
				break;
			case 'property':
				return validate(node.valueNode, schema, validationResult, matchingSchemas);
		}
		_validateNode();
		matchingSchemas.add({ node: node, schema: schema });
		function _validateNode() {
			function matchesType(type) {
				return node.type === type || (type === 'integer' && node.type === 'number' && node.isInteger);
			}
			if (Array.isArray(schema.type)) {
				if (!schema.type.some(matchesType)) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: schema.errorMessage || localize('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', schema.type.join(', '))
					});
				}
			}
			else if (schema.type) {
				if (!matchesType(schema.type)) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: schema.errorMessage || localize('typeMismatchWarning', 'Incorrect type. Expected "{0}".', schema.type)
					});
				}
			}
			if (Array.isArray(schema.allOf)) {
				for (var _i = 0, _a = schema.allOf; _i < _a.length; _i++) {
					var subSchemaRef = _a[_i];
					validate(node, asSchema(subSchemaRef), validationResult, matchingSchemas);
				}
			}
			var notSchema = asSchema(schema.not);
			if (notSchema) {
				var subValidationResult = new ValidationResult();
				var subMatchingSchemas = matchingSchemas.newSub();
				validate(node, notSchema, subValidationResult, subMatchingSchemas);
				if (!subValidationResult.hasProblems()) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('notSchemaWarning', "Matches a schema that is not allowed.")
					});
				}
				for (var _b = 0, _c = subMatchingSchemas.schemas; _b < _c.length; _b++) {
					var ms = _c[_b];
					ms.inverted = !ms.inverted;
					matchingSchemas.add(ms);
				}
			}
			var testAlternatives = function (alternatives, maxOneMatch) {
				var matches = [];
				// remember the best match that is used for error messages
				var bestMatch = null;
				for (var _i = 0, alternatives_1 = alternatives; _i < alternatives_1.length; _i++) {
					var subSchemaRef = alternatives_1[_i];
					var subSchema = asSchema(subSchemaRef);
					var subValidationResult = new ValidationResult();
					var subMatchingSchemas = matchingSchemas.newSub();
					validate(node, subSchema, subValidationResult, subMatchingSchemas);
					if (!subValidationResult.hasProblems()) {
						matches.push(subSchema);
					}
					if (!bestMatch) {
						bestMatch = { schema: subSchema, validationResult: subValidationResult, matchingSchemas: subMatchingSchemas };
					}
					else {
						if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
							// no errors, both are equally good matches
							bestMatch.matchingSchemas.merge(subMatchingSchemas);
							bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
							bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
						}
						else {
							var compareResult = subValidationResult.compare(bestMatch.validationResult);
							if (compareResult > 0) {
								// our node is the best matching so far
								bestMatch = { schema: subSchema, validationResult: subValidationResult, matchingSchemas: subMatchingSchemas };
							}
							else if (compareResult === 0) {
								// there's already a best matching but we are as good
								bestMatch.matchingSchemas.merge(subMatchingSchemas);
								bestMatch.validationResult.mergeEnumValues(subValidationResult);
							}
						}
					}
				}
				if (matches.length > 1 && maxOneMatch) {
					validationResult.problems.push({
						location: { offset: node.offset, length: 1 },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('oneOfWarning', "Matches multiple schemas when only one must validate.")
					});
				}
				if (bestMatch !== null) {
					validationResult.merge(bestMatch.validationResult);
					validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
					validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
					matchingSchemas.merge(bestMatch.matchingSchemas);
				}
				return matches.length;
			};
			if (Array.isArray(schema.anyOf)) {
				testAlternatives(schema.anyOf, false);
			}
			if (Array.isArray(schema.oneOf)) {
				testAlternatives(schema.oneOf, true);
			}
			var testBranch = function (schema) {
				var subValidationResult = new ValidationResult();
				var subMatchingSchemas = matchingSchemas.newSub();
				validate(node, asSchema(schema), subValidationResult, subMatchingSchemas);
				validationResult.merge(subValidationResult);
				validationResult.propertiesMatches += subValidationResult.propertiesMatches;
				validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
				matchingSchemas.merge(subMatchingSchemas);
			};
			var testCondition = function (ifSchema, thenSchema, elseSchema) {
				var subSchema = asSchema(ifSchema);
				var subValidationResult = new ValidationResult();
				var subMatchingSchemas = matchingSchemas.newSub();
				validate(node, subSchema, subValidationResult, subMatchingSchemas);
				matchingSchemas.merge(subMatchingSchemas);
				if (!subValidationResult.hasProblems()) {
					if (thenSchema) {
						testBranch(thenSchema);
					}
				}
				else if (elseSchema) {
					testBranch(elseSchema);
				}
			};
			var ifSchema = asSchema(schema.if);
			if (ifSchema) {
				testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
			}
			if (Array.isArray(schema.enum)) {
				var val = getNodeValue(node);
				var enumValueMatch = false;
				for (var _d = 0, _e = schema.enum; _d < _e.length; _d++) {
					var e = _e[_d];
					if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["equals"])(val, e)) {
						enumValueMatch = true;
						break;
					}
				}
				validationResult.enumValues = schema.enum;
				validationResult.enumValueMatch = enumValueMatch;
				if (!enumValueMatch) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						code: _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].EnumValueMismatch,
						message: schema.errorMessage || localize('enumWarning', 'Value is not accepted. Valid values: {0}.', schema.enum.map(function (v) { return JSON.stringify(v); }).join(', '))
					});
				}
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(schema.const)) {
				var val = getNodeValue(node);
				if (!Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["equals"])(val, schema.const)) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						code: _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].EnumValueMismatch,
						message: schema.errorMessage || localize('constWarning', 'Value must be {0}.', JSON.stringify(schema.const))
					});
					validationResult.enumValueMatch = false;
				}
				else {
					validationResult.enumValueMatch = true;
				}
				validationResult.enumValues = [schema.const];
			}
			if (schema.deprecationMessage && node.parent) {
				validationResult.problems.push({
					location: { offset: node.parent.offset, length: node.parent.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: schema.deprecationMessage
				});
			}
		}
		function _validateNumberNode(node, schema, validationResult, matchingSchemas) {
			var val = node.value;
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.multipleOf)) {
				if (val % schema.multipleOf !== 0) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('multipleOfWarning', 'Value is not divisible by {0}.', schema.multipleOf)
					});
				}
			}
			function getExclusiveLimit(limit, exclusive) {
				if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(exclusive)) {
					return exclusive;
				}
				if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isBoolean"])(exclusive) && exclusive) {
					return limit;
				}
				return void 0;
			}
			function getLimit(limit, exclusive) {
				if (!Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isBoolean"])(exclusive) || !exclusive) {
					return limit;
				}
				return void 0;
			}
			var exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(exclusiveMinimum) && val <= exclusiveMinimum) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', exclusiveMinimum)
				});
			}
			var exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(exclusiveMaximum) && val >= exclusiveMaximum) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', exclusiveMaximum)
				});
			}
			var minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(minimum) && val < minimum) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('minimumWarning', 'Value is below the minimum of {0}.', minimum)
				});
			}
			var maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(maximum) && val > maximum) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('maximumWarning', 'Value is above the maximum of {0}.', maximum)
				});
			}
		}
		function _validateStringNode(node, schema, validationResult, matchingSchemas) {
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.minLength) && node.value.length < schema.minLength) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('minLengthWarning', 'String is shorter than the minimum length of {0}.', schema.minLength)
				});
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.maxLength) && node.value.length > schema.maxLength) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('maxLengthWarning', 'String is longer than the maximum length of {0}.', schema.maxLength)
				});
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isString"])(schema.pattern)) {
				var regex = new RegExp(schema.pattern);
				if (!regex.test(node.value)) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: schema.patternErrorMessage || schema.errorMessage || localize('patternWarning', 'String does not match the pattern of "{0}".', schema.pattern)
					});
				}
			}
			if (schema.format) {
				switch (schema.format) {
					case 'uri':
					case 'uri-reference':
						{
							var errorMessage = void 0;
							if (!node.value) {
								errorMessage = localize('uriEmpty', 'URI expected.');
							}
							else {
								try {
									var uri = vscode_uri__WEBPACK_IMPORTED_MODULE_4__["default"].parse(node.value);
									if (!uri.scheme && schema.format === 'uri') {
										errorMessage = localize('uriSchemeMissing', 'URI with a scheme is expected.');
									}
								}
								catch (e) {
									errorMessage = e.message;
								}
							}
							if (errorMessage) {
								validationResult.problems.push({
									location: { offset: node.offset, length: node.length },
									severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
									message: schema.patternErrorMessage || schema.errorMessage || localize('uriFormatWarning', 'String is not a URI: {0}', errorMessage)
								});
							}
						}
						break;
					case 'email':
						{
							if (!node.value.match(emailPattern)) {
								validationResult.problems.push({
									location: { offset: node.offset, length: node.length },
									severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
									message: schema.patternErrorMessage || schema.errorMessage || localize('emailFormatWarning', 'String is not an e-mail address.')
								});
							}
						}
						break;
					case 'color-hex':
						{
							if (!node.value.match(colorHexPattern)) {
								validationResult.problems.push({
									location: { offset: node.offset, length: node.length },
									severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
									message: schema.patternErrorMessage || schema.errorMessage || localize('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.')
								});
							}
						}
						break;
					default:
				}
			}
		}
		function _validateArrayNode(node, schema, validationResult, matchingSchemas) {
			if (Array.isArray(schema.items)) {
				var subSchemas = schema.items;
				for (var index = 0; index < subSchemas.length; index++) {
					var subSchemaRef = subSchemas[index];
					var subSchema = asSchema(subSchemaRef);
					var itemValidationResult = new ValidationResult();
					var item = node.items[index];
					if (item) {
						validate(item, subSchema, itemValidationResult, matchingSchemas);
						validationResult.mergePropertyMatch(itemValidationResult);
					}
					else if (node.items.length >= subSchemas.length) {
						validationResult.propertiesValueMatches++;
					}
				}
				if (node.items.length > subSchemas.length) {
					if (typeof schema.additionalItems === 'object') {
						for (var i = subSchemas.length; i < node.items.length; i++) {
							var itemValidationResult = new ValidationResult();
							validate(node.items[i], schema.additionalItems, itemValidationResult, matchingSchemas);
							validationResult.mergePropertyMatch(itemValidationResult);
						}
					}
					else if (schema.additionalItems === false) {
						validationResult.problems.push({
							location: { offset: node.offset, length: node.length },
							severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
							message: localize('additionalItemsWarning', 'Array has too many items according to schema. Expected {0} or fewer.', subSchemas.length)
						});
					}
				}
			}
			else {
				var itemSchema = asSchema(schema.items);
				if (itemSchema) {
					for (var _i = 0, _a = node.items; _i < _a.length; _i++) {
						var item = _a[_i];
						var itemValidationResult = new ValidationResult();
						validate(item, itemSchema, itemValidationResult, matchingSchemas);
						validationResult.mergePropertyMatch(itemValidationResult);
					}
				}
			}
			var containsSchema = asSchema(schema.contains);
			if (containsSchema) {
				var doesContain = node.items.some(function (item) {
					var itemValidationResult = new ValidationResult();
					validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance);
					return !itemValidationResult.hasProblems();
				});
				if (!doesContain) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: schema.errorMessage || localize('requiredItemMissingWarning', 'Array does not contain required item.')
					});
				}
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.minItems) && node.items.length < schema.minItems) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('minItemsWarning', 'Array has too few items. Expected {0} or more.', schema.minItems)
				});
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.maxItems) && node.items.length > schema.maxItems) {
				validationResult.problems.push({
					location: { offset: node.offset, length: node.length },
					severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
					message: localize('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', schema.maxItems)
				});
			}
			if (schema.uniqueItems === true) {
				var values_1 = getNodeValue(node);
				var duplicates = values_1.some(function (value, index) {
					return index !== values_1.lastIndexOf(value);
				});
				if (duplicates) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('uniqueItemsWarning', 'Array has duplicate items.')
					});
				}
			}
		}
		function _validateObjectNode(node, schema, validationResult, matchingSchemas) {
			var seenKeys = Object.create(null);
			var unprocessedProperties = [];
			for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
				var propertyNode = _a[_i];
				var key = propertyNode.keyNode.value;
				seenKeys[key] = propertyNode.valueNode;
				unprocessedProperties.push(key);
			}
			if (Array.isArray(schema.required)) {
				for (var _b = 0, _c = schema.required; _b < _c.length; _b++) {
					var propertyName = _c[_b];
					if (!seenKeys[propertyName]) {
						var keyNode = node.parent && node.parent.type === 'property' && node.parent.keyNode;
						var location = keyNode ? { offset: keyNode.offset, length: keyNode.length } : { offset: node.offset, length: 1 };
						validationResult.problems.push({
							location: location,
							severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
							message: localize('MissingRequiredPropWarning', 'Missing property "{0}".', propertyName)
						});
					}
				}
			}
			var propertyProcessed = function (prop) {
				var index = unprocessedProperties.indexOf(prop);
				while (index >= 0) {
					unprocessedProperties.splice(index, 1);
					index = unprocessedProperties.indexOf(prop);
				}
			};
			if (schema.properties) {
				for (var _d = 0, _e = Object.keys(schema.properties); _d < _e.length; _d++) {
					var propertyName = _e[_d];
					propertyProcessed(propertyName);
					var propertySchema = schema.properties[propertyName];
					var child = seenKeys[propertyName];
					if (child) {
						if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isBoolean"])(propertySchema)) {
							if (!propertySchema) {
								var propertyNode = child.parent;
								validationResult.problems.push({
									location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
									severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
									message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
								});
							}
							else {
								validationResult.propertiesMatches++;
								validationResult.propertiesValueMatches++;
							}
						}
						else {
							var propertyValidationResult = new ValidationResult();
							validate(child, propertySchema, propertyValidationResult, matchingSchemas);
							validationResult.mergePropertyMatch(propertyValidationResult);
						}
					}
				}
			}
			if (schema.patternProperties) {
				for (var _f = 0, _g = Object.keys(schema.patternProperties); _f < _g.length; _f++) {
					var propertyPattern = _g[_f];
					var regex = new RegExp(propertyPattern);
					for (var _h = 0, _j = unprocessedProperties.slice(0); _h < _j.length; _h++) {
						var propertyName = _j[_h];
						if (regex.test(propertyName)) {
							propertyProcessed(propertyName);
							var child = seenKeys[propertyName];
							if (child) {
								var propertySchema = schema.patternProperties[propertyPattern];
								if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isBoolean"])(propertySchema)) {
									if (!propertySchema) {
										var propertyNode = child.parent;
										validationResult.problems.push({
											location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
											severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
											message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
										});
									}
									else {
										validationResult.propertiesMatches++;
										validationResult.propertiesValueMatches++;
									}
								}
								else {
									var propertyValidationResult = new ValidationResult();
									validate(child, propertySchema, propertyValidationResult, matchingSchemas);
									validationResult.mergePropertyMatch(propertyValidationResult);
								}
							}
						}
					}
				}
			}
			if (typeof schema.additionalProperties === 'object') {
				for (var _k = 0, unprocessedProperties_1 = unprocessedProperties; _k < unprocessedProperties_1.length; _k++) {
					var propertyName = unprocessedProperties_1[_k];
					var child = seenKeys[propertyName];
					if (child) {
						var propertyValidationResult = new ValidationResult();
						validate(child, schema.additionalProperties, propertyValidationResult, matchingSchemas);
						validationResult.mergePropertyMatch(propertyValidationResult);
					}
				}
			}
			else if (schema.additionalProperties === false) {
				if (unprocessedProperties.length > 0) {
					for (var _l = 0, unprocessedProperties_2 = unprocessedProperties; _l < unprocessedProperties_2.length; _l++) {
						var propertyName = unprocessedProperties_2[_l];
						var child = seenKeys[propertyName];
						if (child) {
							var propertyNode = child.parent;
							validationResult.problems.push({
								location: { offset: propertyNode.keyNode.offset, length: propertyNode.keyNode.length },
								severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
								message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
							});
						}
					}
				}
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.maxProperties)) {
				if (node.properties.length > schema.maxProperties) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('MaxPropWarning', 'Object has more properties than limit of {0}.', schema.maxProperties)
					});
				}
			}
			if (Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(schema.minProperties)) {
				if (node.properties.length < schema.minProperties) {
					validationResult.problems.push({
						location: { offset: node.offset, length: node.length },
						severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
						message: localize('MinPropWarning', 'Object has fewer properties than the required number of {0}', schema.minProperties)
					});
				}
			}
			if (schema.dependencies) {
				for (var _m = 0, _o = Object.keys(schema.dependencies); _m < _o.length; _m++) {
					var key = _o[_m];
					var prop = seenKeys[key];
					if (prop) {
						var propertyDep = schema.dependencies[key];
						if (Array.isArray(propertyDep)) {
							for (var _p = 0, propertyDep_1 = propertyDep; _p < propertyDep_1.length; _p++) {
								var requiredProp = propertyDep_1[_p];
								if (!seenKeys[requiredProp]) {
									validationResult.problems.push({
										location: { offset: node.offset, length: node.length },
										severity: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning,
										message: localize('RequiredDependentPropWarning', 'Object is missing property {0} required by property {1}.', requiredProp, key)
									});
								}
								else {
									validationResult.propertiesValueMatches++;
								}
							}
						}
						else {
							var propertySchema = asSchema(propertyDep);
							if (propertySchema) {
								var propertyValidationResult = new ValidationResult();
								validate(node, propertySchema, propertyValidationResult, matchingSchemas);
								validationResult.mergePropertyMatch(propertyValidationResult);
							}
						}
					}
				}
			}
			var propertyNames = asSchema(schema.propertyNames);
			if (propertyNames) {
				for (var _q = 0, _r = node.properties; _q < _r.length; _q++) {
					var f = _r[_q];
					var key = f.keyNode;
					if (key) {
						validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance);
					}
				}
			}
		}
	}
	function parse(textDocument, config) {
		var problems = [];
		var lastProblemOffset = -1;
		var text = textDocument.getText();
		var scanner = jsonc_parser__WEBPACK_IMPORTED_MODULE_0__["createScanner"](text, false);
		var commentRanges = config && config.collectComments ? [] : void 0;
		function _scanNext() {
			while (true) {
				var token_1 = scanner.scan();
				_checkScanError();
				switch (token_1) {
					case 12 /* LineCommentTrivia */:
					case 13 /* BlockCommentTrivia */:
						if (Array.isArray(commentRanges)) {
							commentRanges.push(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Range"].create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
						}
						break;
					case 15 /* Trivia */:
					case 14 /* LineBreakTrivia */:
						break;
					default:
						return token_1;
				}
			}
		}
		function _accept(token) {
			if (scanner.getToken() === token) {
				_scanNext();
				return true;
			}
			return false;
		}
		function _errorAtRange(message, code, startOffset, endOffset, severity) {
			if (severity === void 0) { severity = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Error; }
			if (problems.length === 0 || startOffset !== lastProblemOffset) {
				var range = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Range"].create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
				problems.push(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["Diagnostic"].create(range, message, severity, code, textDocument.languageId));
				lastProblemOffset = startOffset;
			}
		}
		function _error(message, code, node, skipUntilAfter, skipUntil) {
			if (node === void 0) { node = null; }
			if (skipUntilAfter === void 0) { skipUntilAfter = []; }
			if (skipUntil === void 0) { skipUntil = []; }
			var start = scanner.getTokenOffset();
			var end = scanner.getTokenOffset() + scanner.getTokenLength();
			if (start === end && start > 0) {
				start--;
				while (start > 0 && /\s/.test(text.charAt(start))) {
					start--;
				}
				end = start + 1;
			}
			_errorAtRange(message, code, start, end);
			if (node) {
				_finalize(node, false);
			}
			if (skipUntilAfter.length + skipUntil.length > 0) {
				var token_2 = scanner.getToken();
				while (token_2 !== 17 /* EOF */) {
					if (skipUntilAfter.indexOf(token_2) !== -1) {
						_scanNext();
						break;
					}
					else if (skipUntil.indexOf(token_2) !== -1) {
						break;
					}
					token_2 = _scanNext();
				}
			}
			return node;
		}
		function _checkScanError() {
			switch (scanner.getTokenError()) {
				case 4 /* InvalidUnicode */:
					_error(localize('InvalidUnicode', 'Invalid unicode sequence in string.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].InvalidUnicode);
					return true;
				case 5 /* InvalidEscapeCharacter */:
					_error(localize('InvalidEscapeCharacter', 'Invalid escape character in string.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].InvalidEscapeCharacter);
					return true;
				case 3 /* UnexpectedEndOfNumber */:
					_error(localize('UnexpectedEndOfNumber', 'Unexpected end of number.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].UnexpectedEndOfNumber);
					return true;
				case 1 /* UnexpectedEndOfComment */:
					_error(localize('UnexpectedEndOfComment', 'Unexpected end of comment.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].UnexpectedEndOfComment);
					return true;
				case 2 /* UnexpectedEndOfString */:
					_error(localize('UnexpectedEndOfString', 'Unexpected end of string.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].UnexpectedEndOfString);
					return true;
				case 6 /* InvalidCharacter */:
					_error(localize('InvalidCharacter', 'Invalid characters in string. Control characters must be escaped.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].InvalidCharacter);
					return true;
			}
			return false;
		}
		function _finalize(node, scanNext) {
			node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
			if (scanNext) {
				_scanNext();
			}
			return node;
		}
		function _parseArray(parent) {
			if (scanner.getToken() !== 3 /* OpenBracketToken */) {
				return null;
			}
			var node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
			_scanNext(); // consume OpenBracketToken
			var count = 0;
			var needsComma = false;
			while (scanner.getToken() !== 4 /* CloseBracketToken */ && scanner.getToken() !== 17 /* EOF */) {
				if (scanner.getToken() === 5 /* CommaToken */) {
					if (!needsComma) {
						_error(localize('ValueExpected', 'Value expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].ValueExpected);
					}
					var commaOffset = scanner.getTokenOffset();
					_scanNext(); // consume comma
					if (scanner.getToken() === 4 /* CloseBracketToken */) {
						if (needsComma) {
							_errorAtRange(localize('TrailingComma', 'Trailing comma'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].TrailingComma, commaOffset, commaOffset + 1);
						}
						continue;
					}
				}
				else if (needsComma) {
					_error(localize('ExpectedComma', 'Expected comma'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].CommaExpected);
				}
				var item = _parseValue(node, count++);
				if (!item) {
					_error(localize('PropertyExpected', 'Value expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].ValueExpected, null, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
				}
				else {
					node.items.push(item);
				}
				needsComma = true;
			}
			if (scanner.getToken() !== 4 /* CloseBracketToken */) {
				return _error(localize('ExpectedCloseBracket', 'Expected comma or closing bracket'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].CommaOrCloseBacketExpected, node);
			}
			return _finalize(node, true);
		}
		function _parseProperty(parent, keysSeen) {
			var node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset());
			var key = _parseString(node);
			if (!key) {
				if (scanner.getToken() === 16 /* Unknown */) {
					// give a more helpful error message
					_error(localize('DoubleQuotesExpected', 'Property keys must be doublequoted'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].Undefined);
					var keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
					keyNode.value = scanner.getTokenValue();
					key = keyNode;
					_scanNext(); // consume Unknown
				}
				else {
					return null;
				}
			}
			node.keyNode = key;
			var seen = keysSeen[key.value];
			if (seen) {
				_errorAtRange(localize('DuplicateKeyWarning', "Duplicate object key"), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning);
				if (typeof seen === 'object') {
					_errorAtRange(localize('DuplicateKeyWarning', "Duplicate object key"), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_5__["DiagnosticSeverity"].Warning);
				}
				keysSeen[key.value] = true; // if the same key is duplicate again, avoid duplicate error reporting
			}
			else {
				keysSeen[key.value] = node;
			}
			if (scanner.getToken() === 6 /* ColonToken */) {
				node.colonOffset = scanner.getTokenOffset();
				_scanNext(); // consume ColonToken
			}
			else {
				_error(localize('ColonExpected', 'Colon expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].ColonExpected);
				if (scanner.getToken() === 10 /* StringLiteral */ && textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
					node.length = key.length;
					return node;
				}
			}
			var value = _parseValue(node, key.value);
			if (!value) {
				return _error(localize('ValueExpected', 'Value expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].ValueExpected, node, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
			}
			node.valueNode = value;
			node.length = value.offset + value.length - node.offset;
			return node;
		}
		function _parseObject(parent) {
			if (scanner.getToken() !== 1 /* OpenBraceToken */) {
				return null;
			}
			var node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
			var keysSeen = Object.create(null);
			_scanNext(); // consume OpenBraceToken
			var needsComma = false;
			while (scanner.getToken() !== 2 /* CloseBraceToken */ && scanner.getToken() !== 17 /* EOF */) {
				if (scanner.getToken() === 5 /* CommaToken */) {
					if (!needsComma) {
						_error(localize('PropertyExpected', 'Property expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].PropertyExpected);
					}
					var commaOffset = scanner.getTokenOffset();
					_scanNext(); // consume comma
					if (scanner.getToken() === 2 /* CloseBraceToken */) {
						if (needsComma) {
							_errorAtRange(localize('TrailingComma', 'Trailing comma'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].TrailingComma, commaOffset, commaOffset + 1);
						}
						continue;
					}
				}
				else if (needsComma) {
					_error(localize('ExpectedComma', 'Expected comma'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].CommaExpected);
				}
				var property = _parseProperty(node, keysSeen);
				if (!property) {
					_error(localize('PropertyExpected', 'Property expected'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].PropertyExpected, null, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
				}
				else {
					node.properties.push(property);
				}
				needsComma = true;
			}
			if (scanner.getToken() !== 2 /* CloseBraceToken */) {
				return _error(localize('ExpectedCloseBrace', 'Expected comma or closing brace'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].CommaOrCloseBraceExpected, node);
			}
			return _finalize(node, true);
		}
		function _parseString(parent) {
			if (scanner.getToken() !== 10 /* StringLiteral */) {
				return null;
			}
			var node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
			node.value = scanner.getTokenValue();
			return _finalize(node, true);
		}
		function _parseNumber(parent) {
			if (scanner.getToken() !== 11 /* NumericLiteral */) {
				return null;
			}
			var node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
			if (scanner.getTokenError() === 0 /* None */) {
				var tokenValue = scanner.getTokenValue();
				try {
					var numberValue = JSON.parse(tokenValue);
					if (!Object(_utils_objects__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(numberValue)) {
						return _error(localize('InvalidNumberFormat', 'Invalid number format.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].Undefined, node);
					}
					node.value = numberValue;
				}
				catch (e) {
					return _error(localize('InvalidNumberFormat', 'Invalid number format.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].Undefined, node);
				}
				node.isInteger = tokenValue.indexOf('.') === -1;
			}
			return _finalize(node, true);
		}
		function _parseLiteral(parent) {
			var node;
			switch (scanner.getToken()) {
				case 7 /* NullKeyword */:
					return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
				case 8 /* TrueKeyword */:
					return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
				case 9 /* FalseKeyword */:
					return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
				default:
					return null;
			}
		}
		function _parseValue(parent, name) {
			return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
		}
		var _root = null;
		var token = _scanNext();
		if (token !== 17 /* EOF */) {
			_root = _parseValue(null, null);
			if (!_root) {
				_error(localize('Invalid symbol', 'Expected a JSON object, array or literal.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].Undefined);
			}
			else if (scanner.getToken() !== 17 /* EOF */) {
				_error(localize('End of file expected', 'End of file expected.'), _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].Undefined);
			}
		}
		return new JSONDocument(_root, problems, commentRanges);
	}


	/***/ }),
	/* 64 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScanner", function() { return createScanner; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTree", function() { return parseTree; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtLocation", function() { return findNodeAtLocation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtOffset", function() { return findNodeAtOffset; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodePath", function() { return getNodePath; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeValue", function() { return getNodeValue; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripComments", function() { return stripComments; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printParseErrorCode", function() { return printParseErrorCode; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modify", function() { return modify; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdits", function() { return applyEdits; });
	/* harmony import */ var _impl_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
	/* harmony import */ var _impl_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
	/* harmony import */ var _impl_scanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66);
	/* harmony import */ var _impl_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/





	/**
	 * Creates a JSON scanner on the given text.
	 * If ignoreTrivia is set, whitespaces or comments are ignored.
	 */
	var createScanner = _impl_scanner__WEBPACK_IMPORTED_MODULE_2__["createScanner"];
	/**
	 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
	 */
	var getLocation = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["getLocation"];
	/**
	 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
	 * Therefore always check the errors list to find out if the input was valid.
	 */
	var parse = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["parse"];
	/**
	 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
	 */
	var parseTree = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["parseTree"];
	/**
	 * Finds the node at the given path in a JSON DOM.
	 */
	var findNodeAtLocation = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["findNodeAtLocation"];
	/**
	 * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
	 */
	var findNodeAtOffset = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["findNodeAtOffset"];
	/**
	 * Gets the JSON path of the given JSON DOM node
	 */
	var getNodePath = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["getNodePath"];
	/**
	 * Evaluates the JavaScript object of the given JSON DOM node
	 */
	var getNodeValue = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["getNodeValue"];
	/**
	 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
	 */
	var visit = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["visit"];
	/**
	 * Takes JSON with JavaScript-style comments and remove
	 * them. Optionally replaces every none-newline character
	 * of comments with a replaceCharacter
	 */
	var stripComments = _impl_parser__WEBPACK_IMPORTED_MODULE_3__["stripComments"];
	function printParseErrorCode(code) {
		switch (code) {
			case 1 /* InvalidSymbol */: return 'InvalidSymbol';
			case 2 /* InvalidNumberFormat */: return 'InvalidNumberFormat';
			case 3 /* PropertyNameExpected */: return 'PropertyNameExpected';
			case 4 /* ValueExpected */: return 'ValueExpected';
			case 5 /* ColonExpected */: return 'ColonExpected';
			case 6 /* CommaExpected */: return 'CommaExpected';
			case 7 /* CloseBraceExpected */: return 'CloseBraceExpected';
			case 8 /* CloseBracketExpected */: return 'CloseBracketExpected';
			case 9 /* EndOfFileExpected */: return 'EndOfFileExpected';
			case 10 /* InvalidCommentToken */: return 'InvalidCommentToken';
			case 11 /* UnexpectedEndOfComment */: return 'UnexpectedEndOfComment';
			case 12 /* UnexpectedEndOfString */: return 'UnexpectedEndOfString';
			case 13 /* UnexpectedEndOfNumber */: return 'UnexpectedEndOfNumber';
			case 14 /* InvalidUnicode */: return 'InvalidUnicode';
			case 15 /* InvalidEscapeCharacter */: return 'InvalidEscapeCharacter';
			case 16 /* InvalidCharacter */: return 'InvalidCharacter';
		}
		return '<unknown ParseErrorCode>';
	}
	/**
	 * Computes the edits needed to format a JSON document.
	 *
	 * @param documentText The input text
	 * @param range The range to format or `undefined` to format the full content
	 * @param options The formatting options
	 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
	 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
	 * text in the original document. However, multiple edits can have
	 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
	 * To apply edits to an input, you can use `applyEdits`
	 */
	function format(documentText, range, options) {
		return _impl_format__WEBPACK_IMPORTED_MODULE_0__["format"](documentText, range, options);
	}
	/**
	 * Computes the edits needed to modify a value in the JSON document.
	 *
	 * @param documentText The input text
	 * @param path The path of the value to change. The path represents either to the document root, a property or an array item.
	 * If the path points to an non-existing property or item, it will be created.
	 * @param value The new value for the specified property or item. If the value is undefined,
	 * the property or item will be removed.
	 * @param options Options
	 * @returns A list of edit operations describing the formatting changes to the original document. Edits can be either inserts, replacements or
	 * removals of text segments. All offsets refer to the original state of the document. No two edits must change or remove the same range of
	 * text in the original document. However, multiple edits can have
	 * the same offset, for example multiple inserts, or an insert followed by a remove or replace. The order in the array defines which edit is applied first.
	 * To apply edits to an input, you can use `applyEdits`
	 */
	function modify(text, path, value, options) {
		return _impl_edit__WEBPACK_IMPORTED_MODULE_1__["setProperty"](text, path, value, options.formattingOptions, options.getInsertionIndex);
	}
	/**
	 * Applies edits to a input string.
	 */
	function applyEdits(text, edits) {
		for (var i = edits.length - 1; i >= 0; i--) {
			text = _impl_edit__WEBPACK_IMPORTED_MODULE_1__["applyEdit"](text, edits[i]);
		}
		return text;
	}
	//# sourceMappingURL=main.js.map

	/***/ }),
	/* 65 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEOL", function() { return isEOL; });
	/* harmony import */ var _scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/


	function format(documentText, range, options) {
		var initialIndentLevel;
		var formatText;
		var formatTextStart;
		var rangeStart;
		var rangeEnd;
		if (range) {
			rangeStart = range.offset;
			rangeEnd = rangeStart + range.length;
			formatTextStart = rangeStart;
			while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
				formatTextStart--;
			}
			var endOffset = rangeEnd;
			while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
				endOffset++;
			}
			formatText = documentText.substring(formatTextStart, endOffset);
			initialIndentLevel = computeIndentLevel(formatText, options);
		}
		else {
			formatText = documentText;
			initialIndentLevel = 0;
			formatTextStart = 0;
			rangeStart = 0;
			rangeEnd = documentText.length;
		}
		var eol = getEOL(options, documentText);
		var lineBreak = false;
		var indentLevel = 0;
		var indentValue;
		if (options.insertSpaces) {
			indentValue = repeat(' ', options.tabSize || 4);
		}
		else {
			indentValue = '\t';
		}
		var scanner = Object(_scanner__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(formatText, false);
		var hasError = false;
		function newLineAndIndent() {
			return eol + repeat(indentValue, initialIndentLevel + indentLevel);
		}
		function scanNext() {
			var token = scanner.scan();
			lineBreak = false;
			while (token === 15 /* Trivia */ || token === 14 /* LineBreakTrivia */) {
				lineBreak = lineBreak || (token === 14 /* LineBreakTrivia */);
				token = scanner.scan();
			}
			hasError = token === 16 /* Unknown */ || scanner.getTokenError() !== 0 /* None */;
			return token;
		}
		var editOperations = [];
		function addEdit(text, startOffset, endOffset) {
			if (!hasError && startOffset < rangeEnd && endOffset > rangeStart && documentText.substring(startOffset, endOffset) !== text) {
				editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
			}
		}
		var firstToken = scanNext();
		if (firstToken !== 17 /* EOF */) {
			var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
			var initialIndent = repeat(indentValue, initialIndentLevel);
			addEdit(initialIndent, formatTextStart, firstTokenStart);
		}
		while (firstToken !== 17 /* EOF */) {
			var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
			var secondToken = scanNext();
			var replaceContent = '';
			while (!lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
				// comments on the same line: keep them on the same line, but ignore them otherwise
				var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
				addEdit(' ', firstTokenEnd, commentTokenStart);
				firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
				replaceContent = secondToken === 12 /* LineCommentTrivia */ ? newLineAndIndent() : '';
				secondToken = scanNext();
			}
			if (secondToken === 2 /* CloseBraceToken */) {
				if (firstToken !== 1 /* OpenBraceToken */) {
					indentLevel--;
					replaceContent = newLineAndIndent();
				}
			}
			else if (secondToken === 4 /* CloseBracketToken */) {
				if (firstToken !== 3 /* OpenBracketToken */) {
					indentLevel--;
					replaceContent = newLineAndIndent();
				}
			}
			else {
				switch (firstToken) {
					case 3 /* OpenBracketToken */:
					case 1 /* OpenBraceToken */:
						indentLevel++;
						replaceContent = newLineAndIndent();
						break;
					case 5 /* CommaToken */:
					case 12 /* LineCommentTrivia */:
						replaceContent = newLineAndIndent();
						break;
					case 13 /* BlockCommentTrivia */:
						if (lineBreak) {
							replaceContent = newLineAndIndent();
						}
						else {
							// symbol following comment on the same line: keep on same line, separate with ' '
							replaceContent = ' ';
						}
						break;
					case 6 /* ColonToken */:
						replaceContent = ' ';
						break;
					case 10 /* StringLiteral */:
						if (secondToken === 6 /* ColonToken */) {
							replaceContent = '';
							break;
						}
					// fall through
					case 7 /* NullKeyword */:
					case 8 /* TrueKeyword */:
					case 9 /* FalseKeyword */:
					case 11 /* NumericLiteral */:
					case 2 /* CloseBraceToken */:
					case 4 /* CloseBracketToken */:
						if (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */) {
							replaceContent = ' ';
						}
						else if (secondToken !== 5 /* CommaToken */ && secondToken !== 17 /* EOF */) {
							hasError = true;
						}
						break;
					case 16 /* Unknown */:
						hasError = true;
						break;
				}
				if (lineBreak && (secondToken === 12 /* LineCommentTrivia */ || secondToken === 13 /* BlockCommentTrivia */)) {
					replaceContent = newLineAndIndent();
				}
			}
			var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
			addEdit(replaceContent, firstTokenEnd, secondTokenStart);
			firstToken = secondToken;
		}
		return editOperations;
	}
	function repeat(s, count) {
		var result = '';
		for (var i = 0; i < count; i++) {
			result += s;
		}
		return result;
	}
	function computeIndentLevel(content, options) {
		var i = 0;
		var nChars = 0;
		var tabSize = options.tabSize || 4;
		while (i < content.length) {
			var ch = content.charAt(i);
			if (ch === ' ') {
				nChars++;
			}
			else if (ch === '\t') {
				nChars += tabSize;
			}
			else {
				break;
			}
			i++;
		}
		return Math.floor(nChars / tabSize);
	}
	function getEOL(options, text) {
		for (var i = 0; i < text.length; i++) {
			var ch = text.charAt(i);
			if (ch === '\r') {
				if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
					return '\r\n';
				}
				return '\r';
			}
			else if (ch === '\n') {
				return '\n';
			}
		}
		return (options && options.eol) || '\n';
	}
	function isEOL(text, offset) {
		return '\r\n'.indexOf(text.charAt(offset)) !== -1;
	}
	//# sourceMappingURL=format.js.map

	/***/ }),
	/* 66 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScanner", function() { return createScanner; });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	/**
	 * Creates a JSON scanner on the given text.
	 * If ignoreTrivia is set, whitespaces or comments are ignored.
	 */
	function createScanner(text, ignoreTrivia) {
		if (ignoreTrivia === void 0) { ignoreTrivia = false; }
		var pos = 0, len = text.length, value = '', tokenOffset = 0, token = 16 /* Unknown */, scanError = 0 /* None */;
		function scanHexDigits(count, exact) {
			var digits = 0;
			var value = 0;
			while (digits < count || !exact) {
				var ch = text.charCodeAt(pos);
				if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
					value = value * 16 + ch - 48 /* _0 */;
				}
				else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
					value = value * 16 + ch - 65 /* A */ + 10;
				}
				else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
					value = value * 16 + ch - 97 /* a */ + 10;
				}
				else {
					break;
				}
				pos++;
				digits++;
			}
			if (digits < count) {
				value = -1;
			}
			return value;
		}
		function setPosition(newPosition) {
			pos = newPosition;
			value = '';
			tokenOffset = 0;
			token = 16 /* Unknown */;
			scanError = 0 /* None */;
		}
		function scanNumber() {
			var start = pos;
			if (text.charCodeAt(pos) === 48 /* _0 */) {
				pos++;
			}
			else {
				pos++;
				while (pos < text.length && isDigit(text.charCodeAt(pos))) {
					pos++;
				}
			}
			if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
				pos++;
				if (pos < text.length && isDigit(text.charCodeAt(pos))) {
					pos++;
					while (pos < text.length && isDigit(text.charCodeAt(pos))) {
						pos++;
					}
				}
				else {
					scanError = 3 /* UnexpectedEndOfNumber */;
					return text.substring(start, pos);
				}
			}
			var end = pos;
			if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
				pos++;
				if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
					pos++;
				}
				if (pos < text.length && isDigit(text.charCodeAt(pos))) {
					pos++;
					while (pos < text.length && isDigit(text.charCodeAt(pos))) {
						pos++;
					}
					end = pos;
				}
				else {
					scanError = 3 /* UnexpectedEndOfNumber */;
				}
			}
			return text.substring(start, end);
		}
		function scanString() {
			var result = '', start = pos;
			while (true) {
				if (pos >= len) {
					result += text.substring(start, pos);
					scanError = 2 /* UnexpectedEndOfString */;
					break;
				}
				var ch = text.charCodeAt(pos);
				if (ch === 34 /* doubleQuote */) {
					result += text.substring(start, pos);
					pos++;
					break;
				}
				if (ch === 92 /* backslash */) {
					result += text.substring(start, pos);
					pos++;
					if (pos >= len) {
						scanError = 2 /* UnexpectedEndOfString */;
						break;
					}
					ch = text.charCodeAt(pos++);
					switch (ch) {
						case 34 /* doubleQuote */:
							result += '\"';
							break;
						case 92 /* backslash */:
							result += '\\';
							break;
						case 47 /* slash */:
							result += '/';
							break;
						case 98 /* b */:
							result += '\b';
							break;
						case 102 /* f */:
							result += '\f';
							break;
						case 110 /* n */:
							result += '\n';
							break;
						case 114 /* r */:
							result += '\r';
							break;
						case 116 /* t */:
							result += '\t';
							break;
						case 117 /* u */:
							var ch_1 = scanHexDigits(4, true);
							if (ch_1 >= 0) {
								result += String.fromCharCode(ch_1);
							}
							else {
								scanError = 4 /* InvalidUnicode */;
							}
							break;
						default:
							scanError = 5 /* InvalidEscapeCharacter */;
					}
					start = pos;
					continue;
				}
				if (ch >= 0 && ch <= 0x1f) {
					if (isLineBreak(ch)) {
						result += text.substring(start, pos);
						scanError = 2 /* UnexpectedEndOfString */;
						break;
					}
					else {
						scanError = 6 /* InvalidCharacter */;
						// mark as error but continue with string
					}
				}
				pos++;
			}
			return result;
		}
		function scanNext() {
			value = '';
			scanError = 0 /* None */;
			tokenOffset = pos;
			if (pos >= len) {
				// at the end
				tokenOffset = len;
				return token = 17 /* EOF */;
			}
			var code = text.charCodeAt(pos);
			// trivia: whitespace
			if (isWhiteSpace(code)) {
				do {
					pos++;
					value += String.fromCharCode(code);
					code = text.charCodeAt(pos);
				} while (isWhiteSpace(code));
				return token = 15 /* Trivia */;
			}
			// trivia: newlines
			if (isLineBreak(code)) {
				pos++;
				value += String.fromCharCode(code);
				if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
					pos++;
					value += '\n';
				}
				return token = 14 /* LineBreakTrivia */;
			}
			switch (code) {
				// tokens: []{}:,
				case 123 /* openBrace */:
					pos++;
					return token = 1 /* OpenBraceToken */;
				case 125 /* closeBrace */:
					pos++;
					return token = 2 /* CloseBraceToken */;
				case 91 /* openBracket */:
					pos++;
					return token = 3 /* OpenBracketToken */;
				case 93 /* closeBracket */:
					pos++;
					return token = 4 /* CloseBracketToken */;
				case 58 /* colon */:
					pos++;
					return token = 6 /* ColonToken */;
				case 44 /* comma */:
					pos++;
					return token = 5 /* CommaToken */;
				// strings
				case 34 /* doubleQuote */:
					pos++;
					value = scanString();
					return token = 10 /* StringLiteral */;
				// comments
				case 47 /* slash */:
					var start = pos - 1;
					// Single-line comment
					if (text.charCodeAt(pos + 1) === 47 /* slash */) {
						pos += 2;
						while (pos < len) {
							if (isLineBreak(text.charCodeAt(pos))) {
								break;
							}
							pos++;
						}
						value = text.substring(start, pos);
						return token = 12 /* LineCommentTrivia */;
					}
					// Multi-line comment
					if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
						pos += 2;
						var safeLength = len - 1; // For lookahead.
						var commentClosed = false;
						while (pos < safeLength) {
							var ch = text.charCodeAt(pos);
							if (ch === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
								pos += 2;
								commentClosed = true;
								break;
							}
							pos++;
						}
						if (!commentClosed) {
							pos++;
							scanError = 1 /* UnexpectedEndOfComment */;
						}
						value = text.substring(start, pos);
						return token = 13 /* BlockCommentTrivia */;
					}
					// just a single slash
					value += String.fromCharCode(code);
					pos++;
					return token = 16 /* Unknown */;
				// numbers
				case 45 /* minus */:
					value += String.fromCharCode(code);
					pos++;
					if (pos === len || !isDigit(text.charCodeAt(pos))) {
						return token = 16 /* Unknown */;
					}
				// found a minus, followed by a number so
				// we fall through to proceed with scanning
				// numbers
				case 48 /* _0 */:
				case 49 /* _1 */:
				case 50 /* _2 */:
				case 51 /* _3 */:
				case 52 /* _4 */:
				case 53 /* _5 */:
				case 54 /* _6 */:
				case 55 /* _7 */:
				case 56 /* _8 */:
				case 57 /* _9 */:
					value += scanNumber();
					return token = 11 /* NumericLiteral */;
				// literals and unknown symbols
				default:
					// is a literal? Read the full word.
					while (pos < len && isUnknownContentCharacter(code)) {
						pos++;
						code = text.charCodeAt(pos);
					}
					if (tokenOffset !== pos) {
						value = text.substring(tokenOffset, pos);
						// keywords: true, false, null
						switch (value) {
							case 'true': return token = 8 /* TrueKeyword */;
							case 'false': return token = 9 /* FalseKeyword */;
							case 'null': return token = 7 /* NullKeyword */;
						}
						return token = 16 /* Unknown */;
					}
					// some
					value += String.fromCharCode(code);
					pos++;
					return token = 16 /* Unknown */;
			}
		}
		function isUnknownContentCharacter(code) {
			if (isWhiteSpace(code) || isLineBreak(code)) {
				return false;
			}
			switch (code) {
				case 125 /* closeBrace */:
				case 93 /* closeBracket */:
				case 123 /* openBrace */:
				case 91 /* openBracket */:
				case 34 /* doubleQuote */:
				case 58 /* colon */:
				case 44 /* comma */:
				case 47 /* slash */:
					return false;
			}
			return true;
		}
		function scanNextNonTrivia() {
			var result;
			do {
				result = scanNext();
			} while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
			return result;
		}
		return {
			setPosition: setPosition,
			getPosition: function () { return pos; },
			scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
			getToken: function () { return token; },
			getTokenValue: function () { return value; },
			getTokenOffset: function () { return tokenOffset; },
			getTokenLength: function () { return pos - tokenOffset; },
			getTokenError: function () { return scanError; }
		};
	}
	function isWhiteSpace(ch) {
		return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ ||
			ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ ||
			ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
	}
	function isLineBreak(ch) {
		return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */;
	}
	function isDigit(ch) {
		return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
	}
	//# sourceMappingURL=scanner.js.map

	/***/ }),
	/* 67 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeProperty", function() { return removeProperty; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProperty", function() { return setProperty; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdit", function() { return applyEdit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWS", function() { return isWS; });
	/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
	/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/



	function removeProperty(text, path, formattingOptions) {
		return setProperty(text, path, void 0, formattingOptions);
	}
	function setProperty(text, originalPath, value, formattingOptions, getInsertionIndex) {
		var _a;
		var path = originalPath.slice();
		var errors = [];
		var root = Object(_parser__WEBPACK_IMPORTED_MODULE_1__["parseTree"])(text, errors);
		var parent = void 0;
		var lastSegment = void 0;
		while (path.length > 0) {
			lastSegment = path.pop();
			parent = Object(_parser__WEBPACK_IMPORTED_MODULE_1__["findNodeAtLocation"])(root, path);
			if (parent === void 0 && value !== void 0) {
				if (typeof lastSegment === 'string') {
					value = (_a = {}, _a[lastSegment] = value, _a);
				}
				else {
					value = [value];
				}
			}
			else {
				break;
			}
		}
		if (!parent) {
			// empty document
			if (value === void 0) { // delete
				throw new Error('Can not delete in empty document');
			}
			return withFormatting(text, { offset: root ? root.offset : 0, length: root ? root.length : 0, content: JSON.stringify(value) }, formattingOptions);
		}
		else if (parent.type === 'object' && typeof lastSegment === 'string' && Array.isArray(parent.children)) {
			var existing = Object(_parser__WEBPACK_IMPORTED_MODULE_1__["findNodeAtLocation"])(parent, [lastSegment]);
			if (existing !== void 0) {
				if (value === void 0) { // delete
					if (!existing.parent) {
						throw new Error('Malformed AST');
					}
					var propertyIndex = parent.children.indexOf(existing.parent);
					var removeBegin = void 0;
					var removeEnd = existing.parent.offset + existing.parent.length;
					if (propertyIndex > 0) {
						// remove the comma of the previous node
						var previous = parent.children[propertyIndex - 1];
						removeBegin = previous.offset + previous.length;
					}
					else {
						removeBegin = parent.offset + 1;
						if (parent.children.length > 1) {
							// remove the comma of the next node
							var next = parent.children[1];
							removeEnd = next.offset;
						}
					}
					return withFormatting(text, { offset: removeBegin, length: removeEnd - removeBegin, content: '' }, formattingOptions);
				}
				else {
					// set value of existing property
					return withFormatting(text, { offset: existing.offset, length: existing.length, content: JSON.stringify(value) }, formattingOptions);
				}
			}
			else {
				if (value === void 0) { // delete
					return []; // property does not exist, nothing to do
				}
				var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
				var index = getInsertionIndex ? getInsertionIndex(parent.children.map(function (p) { return p.children[0].value; })) : parent.children.length;
				var edit = void 0;
				if (index > 0) {
					var previous = parent.children[index - 1];
					edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
				}
				else if (parent.children.length === 0) {
					edit = { offset: parent.offset + 1, length: 0, content: newProperty };
				}
				else {
					edit = { offset: parent.offset + 1, length: 0, content: newProperty + ',' };
				}
				return withFormatting(text, edit, formattingOptions);
			}
		}
		else if (parent.type === 'array' && typeof lastSegment === 'number' && Array.isArray(parent.children)) {
			var insertIndex = lastSegment;
			if (insertIndex === -1) {
				// Insert
				var newProperty = "" + JSON.stringify(value);
				var edit = void 0;
				if (parent.children.length === 0) {
					edit = { offset: parent.offset + 1, length: 0, content: newProperty };
				}
				else {
					var previous = parent.children[parent.children.length - 1];
					edit = { offset: previous.offset + previous.length, length: 0, content: ',' + newProperty };
				}
				return withFormatting(text, edit, formattingOptions);
			}
			else {
				if (value === void 0 && parent.children.length >= 0) {
					//Removal
					var removalIndex = lastSegment;
					var toRemove = parent.children[removalIndex];
					var edit = void 0;
					if (parent.children.length === 1) {
						// only item
						edit = { offset: parent.offset + 1, length: parent.length - 2, content: '' };
					}
					else if (parent.children.length - 1 === removalIndex) {
						// last item
						var previous = parent.children[removalIndex - 1];
						var offset = previous.offset + previous.length;
						var parentEndOffset = parent.offset + parent.length;
						edit = { offset: offset, length: parentEndOffset - 2 - offset, content: '' };
					}
					else {
						edit = { offset: toRemove.offset, length: parent.children[removalIndex + 1].offset - toRemove.offset, content: '' };
					}
					return withFormatting(text, edit, formattingOptions);
				}
				else {
					throw new Error('Array modification not supported yet');
				}
			}
		}
		else {
			throw new Error("Can not add " + (typeof lastSegment !== 'number' ? 'index' : 'property') + " to parent of type " + parent.type);
		}
	}
	function withFormatting(text, edit, formattingOptions) {
		// apply the edit
		var newText = applyEdit(text, edit);
		// format the new text
		var begin = edit.offset;
		var end = edit.offset + edit.content.length;
		if (edit.length === 0 || edit.content.length === 0) { // insert or remove
			while (begin > 0 && !Object(_format__WEBPACK_IMPORTED_MODULE_0__["isEOL"])(newText, begin - 1)) {
				begin--;
			}
			while (end < newText.length && !Object(_format__WEBPACK_IMPORTED_MODULE_0__["isEOL"])(newText, end)) {
				end++;
			}
		}
		var edits = Object(_format__WEBPACK_IMPORTED_MODULE_0__["format"])(newText, { offset: begin, length: end - begin }, formattingOptions);
		// apply the formatting edits and track the begin and end offsets of the changes
		for (var i = edits.length - 1; i >= 0; i--) {
			var edit_1 = edits[i];
			newText = applyEdit(newText, edit_1);
			begin = Math.min(begin, edit_1.offset);
			end = Math.max(end, edit_1.offset + edit_1.length);
			end += edit_1.content.length - edit_1.length;
		}
		// create a single edit with all changes
		var editLength = text.length - (newText.length - end) - begin;
		return [{ offset: begin, length: editLength, content: newText.substring(begin, end) }];
	}
	function applyEdit(text, edit) {
		return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
	}
	function isWS(text, offset) {
		return '\r\n \t'.indexOf(text.charAt(offset)) !== -1;
	}
	//# sourceMappingURL=edit.js.map

	/***/ }),
	/* 68 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocation", function() { return getLocation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTree", function() { return parseTree; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtLocation", function() { return findNodeAtLocation; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodePath", function() { return getNodePath; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeValue", function() { return getNodeValue; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNodeAtOffset", function() { return findNodeAtOffset; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visit", function() { return visit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stripComments", function() { return stripComments; });
	/* harmony import */ var _scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/


	var ParseOptions;
	(function (ParseOptions) {
		ParseOptions.DEFAULT = {
			allowTrailingComma: false
		};
	})(ParseOptions || (ParseOptions = {}));
	/**
	 * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
	 */
	function getLocation(text, position) {
		var segments = []; // strings or numbers
		var earlyReturnException = new Object();
		var previousNode = void 0;
		var previousNodeInst = {
			value: {},
			offset: 0,
			length: 0,
			type: 'object',
			parent: void 0
		};
		var isAtPropertyKey = false;
		function setPreviousNode(value, offset, length, type) {
			previousNodeInst.value = value;
			previousNodeInst.offset = offset;
			previousNodeInst.length = length;
			previousNodeInst.type = type;
			previousNodeInst.colonOffset = void 0;
			previousNode = previousNodeInst;
		}
		try {
			visit(text, {
				onObjectBegin: function (offset, length) {
					if (position <= offset) {
						throw earlyReturnException;
					}
					previousNode = void 0;
					isAtPropertyKey = position > offset;
					segments.push(''); // push a placeholder (will be replaced)
				},
				onObjectProperty: function (name, offset, length) {
					if (position < offset) {
						throw earlyReturnException;
					}
					setPreviousNode(name, offset, length, 'property');
					segments[segments.length - 1] = name;
					if (position <= offset + length) {
						throw earlyReturnException;
					}
				},
				onObjectEnd: function (offset, length) {
					if (position <= offset) {
						throw earlyReturnException;
					}
					previousNode = void 0;
					segments.pop();
				},
				onArrayBegin: function (offset, length) {
					if (position <= offset) {
						throw earlyReturnException;
					}
					previousNode = void 0;
					segments.push(0);
				},
				onArrayEnd: function (offset, length) {
					if (position <= offset) {
						throw earlyReturnException;
					}
					previousNode = void 0;
					segments.pop();
				},
				onLiteralValue: function (value, offset, length) {
					if (position < offset) {
						throw earlyReturnException;
					}
					setPreviousNode(value, offset, length, getLiteralNodeType(value));
					if (position <= offset + length) {
						throw earlyReturnException;
					}
				},
				onSeparator: function (sep, offset, length) {
					if (position <= offset) {
						throw earlyReturnException;
					}
					if (sep === ':' && previousNode && previousNode.type === 'property') {
						previousNode.colonOffset = offset;
						isAtPropertyKey = false;
						previousNode = void 0;
					}
					else if (sep === ',') {
						var last = segments[segments.length - 1];
						if (typeof last === 'number') {
							segments[segments.length - 1] = last + 1;
						}
						else {
							isAtPropertyKey = true;
							segments[segments.length - 1] = '';
						}
						previousNode = void 0;
					}
				}
			});
		}
		catch (e) {
			if (e !== earlyReturnException) {
				throw e;
			}
		}
		return {
			path: segments,
			previousNode: previousNode,
			isAtPropertyKey: isAtPropertyKey,
			matches: function (pattern) {
				var k = 0;
				for (var i = 0; k < pattern.length && i < segments.length; i++) {
					if (pattern[k] === segments[i] || pattern[k] === '*') {
						k++;
					}
					else if (pattern[k] !== '**') {
						return false;
					}
				}
				return k === pattern.length;
			}
		};
	}
	/**
	 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
	 * Therefore always check the errors list to find out if the input was valid.
	 */
	function parse(text, errors, options) {
		if (errors === void 0) { errors = []; }
		if (options === void 0) { options = ParseOptions.DEFAULT; }
		var currentProperty = null;
		var currentParent = [];
		var previousParents = [];
		function onValue(value) {
			if (Array.isArray(currentParent)) {
				currentParent.push(value);
			}
			else if (currentProperty) {
				currentParent[currentProperty] = value;
			}
		}
		var visitor = {
			onObjectBegin: function () {
				var object = {};
				onValue(object);
				previousParents.push(currentParent);
				currentParent = object;
				currentProperty = null;
			},
			onObjectProperty: function (name) {
				currentProperty = name;
			},
			onObjectEnd: function () {
				currentParent = previousParents.pop();
			},
			onArrayBegin: function () {
				var array = [];
				onValue(array);
				previousParents.push(currentParent);
				currentParent = array;
				currentProperty = null;
			},
			onArrayEnd: function () {
				currentParent = previousParents.pop();
			},
			onLiteralValue: onValue,
			onError: function (error, offset, length) {
				errors.push({ error: error, offset: offset, length: length });
			}
		};
		visit(text, visitor, options);
		return currentParent[0];
	}
	/**
	 * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
	 */
	function parseTree(text, errors, options) {
		if (errors === void 0) { errors = []; }
		if (options === void 0) { options = ParseOptions.DEFAULT; }
		var currentParent = { type: 'array', offset: -1, length: -1, children: [], parent: void 0 }; // artificial root
		function ensurePropertyComplete(endOffset) {
			if (currentParent.type === 'property') {
				currentParent.length = endOffset - currentParent.offset;
				currentParent = currentParent.parent;
			}
		}
		function onValue(valueNode) {
			currentParent.children.push(valueNode);
			return valueNode;
		}
		var visitor = {
			onObjectBegin: function (offset) {
				currentParent = onValue({ type: 'object', offset: offset, length: -1, parent: currentParent, children: [] });
			},
			onObjectProperty: function (name, offset, length) {
				currentParent = onValue({ type: 'property', offset: offset, length: -1, parent: currentParent, children: [] });
				currentParent.children.push({ type: 'string', value: name, offset: offset, length: length, parent: currentParent });
			},
			onObjectEnd: function (offset, length) {
				currentParent.length = offset + length - currentParent.offset;
				currentParent = currentParent.parent;
				ensurePropertyComplete(offset + length);
			},
			onArrayBegin: function (offset, length) {
				currentParent = onValue({ type: 'array', offset: offset, length: -1, parent: currentParent, children: [] });
			},
			onArrayEnd: function (offset, length) {
				currentParent.length = offset + length - currentParent.offset;
				currentParent = currentParent.parent;
				ensurePropertyComplete(offset + length);
			},
			onLiteralValue: function (value, offset, length) {
				onValue({ type: getLiteralNodeType(value), offset: offset, length: length, parent: currentParent, value: value });
				ensurePropertyComplete(offset + length);
			},
			onSeparator: function (sep, offset, length) {
				if (currentParent.type === 'property') {
					if (sep === ':') {
						currentParent.colonOffset = offset;
					}
					else if (sep === ',') {
						ensurePropertyComplete(offset);
					}
				}
			},
			onError: function (error, offset, length) {
				errors.push({ error: error, offset: offset, length: length });
			}
		};
		visit(text, visitor, options);
		var result = currentParent.children[0];
		if (result) {
			delete result.parent;
		}
		return result;
	}
	/**
	 * Finds the node at the given path in a JSON DOM.
	 */
	function findNodeAtLocation(root, path) {
		if (!root) {
			return void 0;
		}
		var node = root;
		for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
			var segment = path_1[_i];
			if (typeof segment === 'string') {
				if (node.type !== 'object' || !Array.isArray(node.children)) {
					return void 0;
				}
				var found = false;
				for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
					var propertyNode = _b[_a];
					if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
						node = propertyNode.children[1];
						found = true;
						break;
					}
				}
				if (!found) {
					return void 0;
				}
			}
			else {
				var index = segment;
				if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
					return void 0;
				}
				node = node.children[index];
			}
		}
		return node;
	}
	/**
	 * Gets the JSON path of the given JSON DOM node
	 */
	function getNodePath(node) {
		if (!node.parent || !node.parent.children) {
			return [];
		}
		var path = getNodePath(node.parent);
		if (node.parent.type === 'property') {
			var key = node.parent.children[0].value;
			path.push(key);
		}
		else if (node.parent.type === 'array') {
			var index = node.parent.children.indexOf(node);
			if (index !== -1) {
				path.push(index);
			}
		}
		return path;
	}
	/**
	 * Evaluates the JavaScript object of the given JSON DOM node
	 */
	function getNodeValue(node) {
		switch (node.type) {
			case 'array':
				return node.children.map(getNodeValue);
			case 'object':
				var obj = Object.create(null);
				for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
					var prop = _a[_i];
					var valueNode = prop.children[1];
					if (valueNode) {
						obj[prop.children[0].value] = getNodeValue(valueNode);
					}
				}
				return obj;
			case 'null':
			case 'string':
			case 'number':
			case 'boolean':
				return node.value;
			default:
				return void 0;
		}
	}
	function contains(node, offset, includeRightBound) {
		if (includeRightBound === void 0) { includeRightBound = false; }
		return (offset >= node.offset && offset < (node.offset + node.length)) || includeRightBound && (offset === (node.offset + node.length));
	}
	/**
	 * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
	 */
	function findNodeAtOffset(node, offset, includeRightBound) {
		if (includeRightBound === void 0) { includeRightBound = false; }
		if (contains(node, offset, includeRightBound)) {
			var children = node.children;
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length && children[i].offset <= offset; i++) {
					var item = findNodeAtOffset(children[i], offset, includeRightBound);
					if (item) {
						return item;
					}
				}
			}
			return node;
		}
		return void 0;
	}
	/**
	 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
	 */
	function visit(text, visitor, options) {
		if (options === void 0) { options = ParseOptions.DEFAULT; }
		var _scanner = Object(_scanner__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(text, false);
		function toNoArgVisit(visitFunction) {
			return visitFunction ? function () { return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
		}
		function toOneArgVisit(visitFunction) {
			return visitFunction ? function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
		}
		var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
		var disallowComments = options && options.disallowComments;
		var allowTrailingComma = options && options.allowTrailingComma;
		function scanNext() {
			while (true) {
				var token = _scanner.scan();
				switch (_scanner.getTokenError()) {
					case 4 /* InvalidUnicode */:
						handleError(14 /* InvalidUnicode */);
						break;
					case 5 /* InvalidEscapeCharacter */:
						handleError(15 /* InvalidEscapeCharacter */);
						break;
					case 3 /* UnexpectedEndOfNumber */:
						handleError(13 /* UnexpectedEndOfNumber */);
						break;
					case 1 /* UnexpectedEndOfComment */:
						if (!disallowComments) {
							handleError(11 /* UnexpectedEndOfComment */);
						}
						break;
					case 2 /* UnexpectedEndOfString */:
						handleError(12 /* UnexpectedEndOfString */);
						break;
					case 6 /* InvalidCharacter */:
						handleError(16 /* InvalidCharacter */);
						break;
				}
				switch (token) {
					case 12 /* LineCommentTrivia */:
					case 13 /* BlockCommentTrivia */:
						if (disallowComments) {
							handleError(10 /* InvalidCommentToken */);
						}
						else {
							onComment();
						}
						break;
					case 16 /* Unknown */:
						handleError(1 /* InvalidSymbol */);
						break;
					case 15 /* Trivia */:
					case 14 /* LineBreakTrivia */:
						break;
					default:
						return token;
				}
			}
		}
		function handleError(error, skipUntilAfter, skipUntil) {
			if (skipUntilAfter === void 0) { skipUntilAfter = []; }
			if (skipUntil === void 0) { skipUntil = []; }
			onError(error);
			if (skipUntilAfter.length + skipUntil.length > 0) {
				var token = _scanner.getToken();
				while (token !== 17 /* EOF */) {
					if (skipUntilAfter.indexOf(token) !== -1) {
						scanNext();
						break;
					}
					else if (skipUntil.indexOf(token) !== -1) {
						break;
					}
					token = scanNext();
				}
			}
		}
		function parseString(isValue) {
			var value = _scanner.getTokenValue();
			if (isValue) {
				onLiteralValue(value);
			}
			else {
				onObjectProperty(value);
			}
			scanNext();
			return true;
		}
		function parseLiteral() {
			switch (_scanner.getToken()) {
				case 11 /* NumericLiteral */:
					var value = 0;
					try {
						value = JSON.parse(_scanner.getTokenValue());
						if (typeof value !== 'number') {
							handleError(2 /* InvalidNumberFormat */);
							value = 0;
						}
					}
					catch (e) {
						handleError(2 /* InvalidNumberFormat */);
					}
					onLiteralValue(value);
					break;
				case 7 /* NullKeyword */:
					onLiteralValue(null);
					break;
				case 8 /* TrueKeyword */:
					onLiteralValue(true);
					break;
				case 9 /* FalseKeyword */:
					onLiteralValue(false);
					break;
				default:
					return false;
			}
			scanNext();
			return true;
		}
		function parseProperty() {
			if (_scanner.getToken() !== 10 /* StringLiteral */) {
				handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
				return false;
			}
			parseString(false);
			if (_scanner.getToken() === 6 /* ColonToken */) {
				onSeparator(':');
				scanNext(); // consume colon
				if (!parseValue()) {
					handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
				}
			}
			else {
				handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
			}
			return true;
		}
		function parseObject() {
			onObjectBegin();
			scanNext(); // consume open brace
			var needsComma = false;
			while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
				if (_scanner.getToken() === 5 /* CommaToken */) {
					if (!needsComma) {
						handleError(4 /* ValueExpected */, [], []);
					}
					onSeparator(',');
					scanNext(); // consume comma
					if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
						break;
					}
				}
				else if (needsComma) {
					handleError(6 /* CommaExpected */, [], []);
				}
				if (!parseProperty()) {
					handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
				}
				needsComma = true;
			}
			onObjectEnd();
			if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
				handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
			}
			else {
				scanNext(); // consume close brace
			}
			return true;
		}
		function parseArray() {
			onArrayBegin();
			scanNext(); // consume open bracket
			var needsComma = false;
			while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
				if (_scanner.getToken() === 5 /* CommaToken */) {
					if (!needsComma) {
						handleError(4 /* ValueExpected */, [], []);
					}
					onSeparator(',');
					scanNext(); // consume comma
					if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
						break;
					}
				}
				else if (needsComma) {
					handleError(6 /* CommaExpected */, [], []);
				}
				if (!parseValue()) {
					handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
				}
				needsComma = true;
			}
			onArrayEnd();
			if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
				handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
			}
			else {
				scanNext(); // consume close bracket
			}
			return true;
		}
		function parseValue() {
			switch (_scanner.getToken()) {
				case 3 /* OpenBracketToken */:
					return parseArray();
				case 1 /* OpenBraceToken */:
					return parseObject();
				case 10 /* StringLiteral */:
					return parseString(true);
				default:
					return parseLiteral();
			}
		}
		scanNext();
		if (_scanner.getToken() === 17 /* EOF */) {
			return true;
		}
		if (!parseValue()) {
			handleError(4 /* ValueExpected */, [], []);
			return false;
		}
		if (_scanner.getToken() !== 17 /* EOF */) {
			handleError(9 /* EndOfFileExpected */, [], []);
		}
		return true;
	}
	/**
	 * Takes JSON with JavaScript-style comments and remove
	 * them. Optionally replaces every none-newline character
	 * of comments with a replaceCharacter
	 */
	function stripComments(text, replaceCh) {
		var _scanner = Object(_scanner__WEBPACK_IMPORTED_MODULE_0__["createScanner"])(text), parts = [], kind, offset = 0, pos;
		do {
			pos = _scanner.getPosition();
			kind = _scanner.scan();
			switch (kind) {
				case 12 /* LineCommentTrivia */:
				case 13 /* BlockCommentTrivia */:
				case 17 /* EOF */:
					if (offset !== pos) {
						parts.push(text.substring(offset, pos));
					}
					if (replaceCh !== void 0) {
						parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
					}
					offset = _scanner.getPosition();
					break;
			}
		} while (kind !== 17 /* EOF */);
		return parts.join('');
	}
	function getLiteralNodeType(value) {
		switch (typeof value) {
			case 'boolean': return 'boolean';
			case 'number': return 'number';
			case 'string': return 'string';
			default: return 'null';
		}
	}
	//# sourceMappingURL=parser.js.map

	/***/ }),
	/* 69 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
	/*---------------------------------------------------------------------------------------------
	*  Copyright (c) Microsoft Corporation. All rights reserved.
	*  Licensed under the MIT License. See License.txt in the project root for license information.
	*--------------------------------------------------------------------------------------------*/
	function equals(one, other) {
		if (one === other) {
			return true;
		}
		if (one === null || one === undefined || other === null || other === undefined) {
			return false;
		}
		if (typeof one !== typeof other) {
			return false;
		}
		if (typeof one !== 'object') {
			return false;
		}
		if ((Array.isArray(one)) !== (Array.isArray(other))) {
			return false;
		}
		var i, key;
		if (Array.isArray(one)) {
			if (one.length !== other.length) {
				return false;
			}
			for (i = 0; i < one.length; i++) {
				if (!equals(one[i], other[i])) {
					return false;
				}
			}
		}
		else {
			var oneKeys = [];
			for (key in one) {
				oneKeys.push(key);
			}
			oneKeys.sort();
			var otherKeys = [];
			for (key in other) {
				otherKeys.push(key);
			}
			otherKeys.sort();
			if (!equals(oneKeys, otherKeys)) {
				return false;
			}
			for (i = 0; i < oneKeys.length; i++) {
				if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
					return false;
				}
			}
		}
		return true;
	}
	function isNumber(val) {
		return typeof val === 'number';
	}
	function isDefined(val) {
		return typeof val !== 'undefined';
	}
	function isBoolean(val) {
		return typeof val === 'boolean';
	}
	function isString(val) {
		return typeof val === 'string';
	}


	/***/ }),
	/* 70 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionRangeKind", function() { return SelectionRangeKind; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorCode", function() { return ErrorCode; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientCapabilities", function() { return ClientCapabilities; });
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Range"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["TextEdit"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Color"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["ColorInformation"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["ColorPresentation"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["FoldingRange"]; });

	/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["FoldingRangeKind"]; });



	// #region Proposed types, remove once added to vscode-languageserver-types
	/**
	 * Enum of known selection range kinds
	 */
	var SelectionRangeKind;
	(function (SelectionRangeKind) {
		/**
		 * Empty Kind.
		 */
		SelectionRangeKind["Empty"] = "";
		/**
		 * The statment kind, its value is `statement`, possible extensions can be
		 * `statement.if` etc
		 */
		SelectionRangeKind["Statement"] = "statement";
		/**
		 * The declaration kind, its value is `declaration`, possible extensions can be
		 * `declaration.function`, `declaration.class` etc.
		 */
		SelectionRangeKind["Declaration"] = "declaration";
	})(SelectionRangeKind || (SelectionRangeKind = {}));
	// #endregion
	/**
	 * Error codes used by diagnostics
	 */
	var ErrorCode;
	(function (ErrorCode) {
		ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
		ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
		ErrorCode[ErrorCode["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
		ErrorCode[ErrorCode["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
		ErrorCode[ErrorCode["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
		ErrorCode[ErrorCode["InvalidUnicode"] = 260] = "InvalidUnicode";
		ErrorCode[ErrorCode["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
		ErrorCode[ErrorCode["InvalidCharacter"] = 262] = "InvalidCharacter";
		ErrorCode[ErrorCode["PropertyExpected"] = 513] = "PropertyExpected";
		ErrorCode[ErrorCode["CommaExpected"] = 514] = "CommaExpected";
		ErrorCode[ErrorCode["ColonExpected"] = 515] = "ColonExpected";
		ErrorCode[ErrorCode["ValueExpected"] = 516] = "ValueExpected";
		ErrorCode[ErrorCode["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
		ErrorCode[ErrorCode["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
		ErrorCode[ErrorCode["TrailingComma"] = 519] = "TrailingComma";
		ErrorCode[ErrorCode["DuplicateKey"] = 520] = "DuplicateKey";
		ErrorCode[ErrorCode["CommentNotPermitted"] = 521] = "CommentNotPermitted";
		ErrorCode[ErrorCode["SchemaResolveError"] = 768] = "SchemaResolveError";
	})(ErrorCode || (ErrorCode = {}));
	var ClientCapabilities;
	(function (ClientCapabilities) {
		ClientCapabilities.LATEST = {
			textDocument: {
				completion: {
					completionItem: {
						documentationFormat: [vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["MarkupKind"].Markdown, vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["MarkupKind"].PlainText]
					}
				}
			}
		};
	})(ClientCapabilities || (ClientCapabilities = {}));


	/***/ }),
	/* 71 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringifyObject", function() { return stringifyObject; });
	/*---------------------------------------------------------------------------------------------
	*  Copyright (c) Microsoft Corporation. All rights reserved.
	*  Licensed under the MIT License. See License.txt in the project root for license information.
	*--------------------------------------------------------------------------------------------*/
	function stringifyObject(obj, indent, stringifyLiteral) {
		if (obj !== null && typeof obj === 'object') {
			var newIndent = indent + '\t';
			if (Array.isArray(obj)) {
				if (obj.length === 0) {
					return '[]';
				}
				var result = '[\n';
				for (var i = 0; i < obj.length; i++) {
					result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
					if (i < obj.length - 1) {
						result += ',';
					}
					result += '\n';
				}
				result += indent + ']';
				return result;
			}
			else {
				var keys = Object.keys(obj);
				if (keys.length === 0) {
					return '{}';
				}
				var result = '{\n';
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					result += newIndent + JSON.stringify(key) + ': ' + stringifyObject(obj[key], newIndent, stringifyLiteral);
					if (i < keys.length - 1) {
						result += ',';
					}
					result += '\n';
				}
				result += indent + '}';
				return result;
			}
		}
		return stringifyLiteral(obj);
	}


	/***/ }),
	/* 72 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return endsWith; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertSimple2RegExpPattern", function() { return convertSimple2RegExpPattern; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
	/*---------------------------------------------------------------------------------------------
	*  Copyright (c) Microsoft Corporation. All rights reserved.
	*  Licensed under the MIT License. See License.txt in the project root for license information.
	*--------------------------------------------------------------------------------------------*/
	function startsWith(haystack, needle) {
		if (haystack.length < needle.length) {
			return false;
		}
		for (var i = 0; i < needle.length; i++) {
			if (haystack[i] !== needle[i]) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Determines if haystack ends with needle.
	 */
	function endsWith(haystack, needle) {
		var diff = haystack.length - needle.length;
		if (diff > 0) {
			return haystack.lastIndexOf(needle) === diff;
		}
		else if (diff === 0) {
			return haystack === needle;
		}
		else {
			return false;
		}
	}
	function convertSimple2RegExpPattern(pattern) {
		return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
	}
	function repeat(value, count) {
		var s = '';
		while (count > 0) {
			if ((count & 1) === 1) {
				s += value;
			}
			value += value;
			count = count >>> 1;
		}
		return s;
	}


	/***/ }),
	/* 73 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONHover", function() { return JSONHover; });
	/* harmony import */ var _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/


	var JSONHover = /** @class */ (function () {
		function JSONHover(schemaService, contributions, promiseConstructor) {
			if (contributions === void 0) { contributions = []; }
			this.schemaService = schemaService;
			this.contributions = contributions;
			this.promise = promiseConstructor || Promise;
		}
		JSONHover.prototype.doHover = function (document, position, doc) {
			var offset = document.offsetAt(position);
			var node = doc.getNodeFromOffset(offset);
			if (!node || (node.type === 'object' || node.type === 'array') && offset > node.offset + 1 && offset < node.offset + node.length - 1) {
				return this.promise.resolve(null);
			}
			var hoverRangeNode = node;
			// use the property description when hovering over an object key
			if (node.type === 'string') {
				var parent = node.parent;
				if (parent && parent.type === 'property' && parent.keyNode === node) {
					node = parent.valueNode;
					if (!node) {
						return this.promise.resolve(null);
					}
				}
			}
			var hoverRange = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Range"].create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
			var createHover = function (contents) {
				var result = {
					contents: contents,
					range: hoverRange
				};
				return result;
			};
			var location = _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodePath"](node);
			for (var i = this.contributions.length - 1; i >= 0; i--) {
				var contribution = this.contributions[i];
				var promise = contribution.getInfoContribution(document.uri, location);
				if (promise) {
					return promise.then(function (htmlContent) { return createHover(htmlContent); });
				}
			}
			return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
				if (schema) {
					var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
					var title_1 = null;
					var markdownDescription_1 = null;
					var markdownEnumValueDescription_1 = null, enumValue_1 = null;
					matchingSchemas.every(function (s) {
						if (s.node === node && !s.inverted && s.schema) {
							title_1 = title_1 || s.schema.title;
							markdownDescription_1 = markdownDescription_1 || s.schema.markdownDescription || toMarkdown(s.schema.description);
							if (s.schema.enum) {
								var idx = s.schema.enum.indexOf(_parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodeValue"](node));
								if (s.schema.markdownEnumDescriptions) {
									markdownEnumValueDescription_1 = s.schema.markdownEnumDescriptions[idx];
								}
								else if (s.schema.enumDescriptions) {
									markdownEnumValueDescription_1 = toMarkdown(s.schema.enumDescriptions[idx]);
								}
								if (markdownEnumValueDescription_1) {
									enumValue_1 = s.schema.enum[idx];
									if (typeof enumValue_1 !== 'string') {
										enumValue_1 = JSON.stringify(enumValue_1);
									}
								}
							}
						}
						return true;
					});
					var result = '';
					if (title_1) {
						result = toMarkdown(title_1);
					}
					if (markdownDescription_1) {
						if (result.length > 0) {
							result += "\n\n";
						}
						result += markdownDescription_1;
					}
					if (markdownEnumValueDescription_1) {
						if (result.length > 0) {
							result += "\n\n";
						}
						result += "`" + toMarkdown(enumValue_1) + "`: " + markdownEnumValueDescription_1;
					}
					return createHover([result]);
				}
				return null;
			});
		};
		return JSONHover;
	}());

	function toMarkdown(plain) {
		if (plain) {
			var res = plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, '$1\n\n$3'); // single new lines to \n\n (Markdown paragraph)
			return res.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
		}
		return void 0;
	}


	/***/ }),
	/* 74 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONValidation", function() { return JSONValidation; });
	/* harmony import */ var _jsonSchemaService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75);
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
	/* harmony import */ var _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vscode_nls__WEBPACK_IMPORTED_MODULE_3__);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/




	var localize = vscode_nls__WEBPACK_IMPORTED_MODULE_3__["loadMessageBundle"]();
	var JSONValidation = /** @class */ (function () {
		function JSONValidation(jsonSchemaService, promiseConstructor) {
			this.jsonSchemaService = jsonSchemaService;
			this.promise = promiseConstructor;
			this.validationEnabled = true;
		}
		JSONValidation.prototype.configure = function (raw) {
			if (raw) {
				this.validationEnabled = raw.validate;
				this.commentSeverity = raw.allowComments ? void 0 : vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Error;
			}
		};
		JSONValidation.prototype.doValidation = function (textDocument, jsonDocument, documentSettings, schema) {
			var _this = this;
			if (!this.validationEnabled) {
				return this.promise.resolve([]);
			}
			var diagnostics = [];
			var added = {};
			var addProblem = function (problem) {
				// remove duplicated messages
				var signature = problem.range.start.line + ' ' + problem.range.start.character + ' ' + problem.message;
				if (!added[signature]) {
					added[signature] = true;
					diagnostics.push(problem);
				}
			};
			var getDiagnostics = function (schema) {
				var trailingCommaSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.trailingCommas) : vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Error;
				var commentSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.comments) : _this.commentSeverity;
				if (schema) {
					if (schema.errors.length && jsonDocument.root) {
						var astRoot = jsonDocument.root;
						var property = astRoot.type === 'object' ? astRoot.properties[0] : null;
						if (property && property.keyNode.value === '$schema') {
							var node = property.valueNode || property;
							var range = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Range"].create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
							addProblem(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Diagnostic"].create(range, schema.errors[0], vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Warning, _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].SchemaResolveError));
						}
						else {
							var range = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Range"].create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
							addProblem(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Diagnostic"].create(range, schema.errors[0], vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Warning, _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].SchemaResolveError));
						}
					}
					else {
						var semanticErrors = jsonDocument.validate(textDocument, schema.schema);
						if (semanticErrors) {
							semanticErrors.forEach(addProblem);
						}
					}
					if (schemaAllowsComments(schema.schema)) {
						trailingCommaSeverity = commentSeverity = void 0;
					}
				}
				for (var _i = 0, _a = jsonDocument.syntaxErrors; _i < _a.length; _i++) {
					var p = _a[_i];
					if (p.code === _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].TrailingComma) {
						if (typeof trailingCommaSeverity !== 'number') {
							continue;
						}
						p.severity = trailingCommaSeverity;
					}
					addProblem(p);
				}
				if (typeof commentSeverity === 'number') {
					var message_1 = localize('InvalidCommentToken', 'Comments are not permitted in JSON.');
					jsonDocument.comments.forEach(function (c) {
						addProblem(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["Diagnostic"].create(c, message_1, commentSeverity, _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["ErrorCode"].CommentNotPermitted));
					});
				}
				return diagnostics;
			};
			if (schema) {
				var id = schema.id || ('schemaservice://untitled/' + idCounter++);
				return this.jsonSchemaService.resolveSchemaContent(new _jsonSchemaService__WEBPACK_IMPORTED_MODULE_0__["UnresolvedSchema"](schema), id, {}).then(function (resolvedSchema) {
					return getDiagnostics(resolvedSchema);
				});
			}
			return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(function (schema) {
				return getDiagnostics(schema);
			});
		};
		return JSONValidation;
	}());

	var idCounter = 0;
	function schemaAllowsComments(schemaRef) {
		if (schemaRef && typeof schemaRef === 'object') {
			if (schemaRef.allowComments) {
				return true;
			}
			if (schemaRef.allOf) {
				return schemaRef.allOf.some(schemaAllowsComments);
			}
		}
		return false;
	}
	function toDiagnosticSeverity(severityLevel) {
		switch (severityLevel) {
			case 'error': return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Error;
			case 'warning': return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_1__["DiagnosticSeverity"].Warning;
			case 'ignore': return void 0;
		}
		return void 0;
	}


	/***/ }),
	/* 75 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnresolvedSchema", function() { return UnresolvedSchema; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolvedSchema", function() { return ResolvedSchema; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONSchemaService", function() { return JSONSchemaService; });
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
	/* harmony import */ var vscode_uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
	/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72);
	/* harmony import */ var _parser_jsonParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vscode_nls__WEBPACK_IMPORTED_MODULE_4__);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/





	var localize = vscode_nls__WEBPACK_IMPORTED_MODULE_4__["loadMessageBundle"]();
	var FilePatternAssociation = /** @class */ (function () {
		function FilePatternAssociation(pattern) {
			try {
				this.patternRegExp = new RegExp(_utils_strings__WEBPACK_IMPORTED_MODULE_2__["convertSimple2RegExpPattern"](pattern) + '$');
			}
			catch (e) {
				// invalid pattern
				this.patternRegExp = null;
			}
			this.schemas = [];
		}
		FilePatternAssociation.prototype.addSchema = function (id) {
			this.schemas.push(id);
		};
		FilePatternAssociation.prototype.matchesPattern = function (fileName) {
			return this.patternRegExp && this.patternRegExp.test(fileName);
		};
		FilePatternAssociation.prototype.getSchemas = function () {
			return this.schemas;
		};
		return FilePatternAssociation;
	}());
	var SchemaHandle = /** @class */ (function () {
		function SchemaHandle(service, url, unresolvedSchemaContent) {
			this.service = service;
			this.url = url;
			this.dependencies = {};
			if (unresolvedSchemaContent) {
				this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
			}
		}
		SchemaHandle.prototype.getUnresolvedSchema = function () {
			if (!this.unresolvedSchema) {
				this.unresolvedSchema = this.service.loadSchema(this.url);
			}
			return this.unresolvedSchema;
		};
		SchemaHandle.prototype.getResolvedSchema = function () {
			var _this = this;
			if (!this.resolvedSchema) {
				this.resolvedSchema = this.getUnresolvedSchema().then(function (unresolved) {
					return _this.service.resolveSchemaContent(unresolved, _this.url, _this.dependencies);
				});
			}
			return this.resolvedSchema;
		};
		SchemaHandle.prototype.clearSchema = function () {
			this.resolvedSchema = null;
			this.unresolvedSchema = null;
			this.dependencies = {};
		};
		return SchemaHandle;
	}());
	var UnresolvedSchema = /** @class */ (function () {
		function UnresolvedSchema(schema, errors) {
			if (errors === void 0) { errors = []; }
			this.schema = schema;
			this.errors = errors;
		}
		return UnresolvedSchema;
	}());

	var ResolvedSchema = /** @class */ (function () {
		function ResolvedSchema(schema, errors) {
			if (errors === void 0) { errors = []; }
			this.schema = schema;
			this.errors = errors;
		}
		ResolvedSchema.prototype.getSection = function (path) {
			return _parser_jsonParser__WEBPACK_IMPORTED_MODULE_3__["asSchema"](this.getSectionRecursive(path, this.schema));
		};
		ResolvedSchema.prototype.getSectionRecursive = function (path, schema) {
			if (!schema || typeof schema === 'boolean' || path.length === 0) {
				return schema;
			}
			var next = path.shift();
			if (schema.properties && typeof schema.properties[next]) {
				return this.getSectionRecursive(path, schema.properties[next]);
			}
			else if (schema.patternProperties) {
				for (var _i = 0, _a = Object.keys(schema.patternProperties); _i < _a.length; _i++) {
					var pattern = _a[_i];
					var regex = new RegExp(pattern);
					if (regex.test(next)) {
						return this.getSectionRecursive(path, schema.patternProperties[pattern]);
					}
				}
			}
			else if (typeof schema.additionalProperties === 'object') {
				return this.getSectionRecursive(path, schema.additionalProperties);
			}
			else if (next.match('[0-9]+')) {
				if (Array.isArray(schema.items)) {
					var index = parseInt(next, 10);
					if (!isNaN(index) && schema.items[index]) {
						return this.getSectionRecursive(path, schema.items[index]);
					}
				}
				else if (schema.items) {
					return this.getSectionRecursive(path, schema.items);
				}
			}
			return null;
		};
		return ResolvedSchema;
	}());

	var JSONSchemaService = /** @class */ (function () {
		function JSONSchemaService(requestService, contextService, promiseConstructor) {
			this.contextService = contextService;
			this.requestService = requestService;
			this.promiseConstructor = promiseConstructor || Promise;
			this.callOnDispose = [];
			this.contributionSchemas = {};
			this.contributionAssociations = {};
			this.schemasById = {};
			this.filePatternAssociations = [];
			this.filePatternAssociationById = {};
			this.registeredSchemasIds = {};
		}
		JSONSchemaService.prototype.getRegisteredSchemaIds = function (filter) {
			return Object.keys(this.registeredSchemasIds).filter(function (id) {
				var scheme = vscode_uri__WEBPACK_IMPORTED_MODULE_1__["default"].parse(id).scheme;
				return scheme !== 'schemaservice' && (!filter || filter(scheme));
			});
		};
		Object.defineProperty(JSONSchemaService.prototype, "promise", {
			get: function () {
				return this.promiseConstructor;
			},
			enumerable: true,
			configurable: true
		});
		JSONSchemaService.prototype.dispose = function () {
			while (this.callOnDispose.length > 0) {
				this.callOnDispose.pop()();
			}
		};
		JSONSchemaService.prototype.onResourceChange = function (uri) {
			var _this = this;
			var hasChanges = false;
			uri = this.normalizeId(uri);
			var toWalk = [uri];
			var all = Object.keys(this.schemasById).map(function (key) { return _this.schemasById[key]; });
			while (toWalk.length) {
				var curr = toWalk.pop();
				for (var i = 0; i < all.length; i++) {
					var handle = all[i];
					if (handle && (handle.url === curr || handle.dependencies[curr])) {
						if (handle.url !== curr) {
							toWalk.push(handle.url);
						}
						handle.clearSchema();
						all[i] = undefined;
						hasChanges = true;
					}
				}
			}
			return hasChanges;
		};
		JSONSchemaService.prototype.normalizeId = function (id) {
			// remove trailing '#', normalize drive capitalization
			return vscode_uri__WEBPACK_IMPORTED_MODULE_1__["default"].parse(id).toString();
		};
		JSONSchemaService.prototype.setSchemaContributions = function (schemaContributions) {
			if (schemaContributions.schemas) {
				var schemas = schemaContributions.schemas;
				for (var id in schemas) {
					var normalizedId = this.normalizeId(id);
					this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
				}
			}
			if (schemaContributions.schemaAssociations) {
				var schemaAssociations = schemaContributions.schemaAssociations;
				for (var pattern in schemaAssociations) {
					var associations = schemaAssociations[pattern];
					this.contributionAssociations[pattern] = associations;
					var fpa = this.getOrAddFilePatternAssociation(pattern);
					for (var _i = 0, associations_1 = associations; _i < associations_1.length; _i++) {
						var schemaId = associations_1[_i];
						var id = this.normalizeId(schemaId);
						fpa.addSchema(id);
					}
				}
			}
		};
		JSONSchemaService.prototype.addSchemaHandle = function (id, unresolvedSchemaContent) {
			var schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
			this.schemasById[id] = schemaHandle;
			return schemaHandle;
		};
		JSONSchemaService.prototype.getOrAddSchemaHandle = function (id, unresolvedSchemaContent) {
			return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
		};
		JSONSchemaService.prototype.getOrAddFilePatternAssociation = function (pattern) {
			var fpa = this.filePatternAssociationById[pattern];
			if (!fpa) {
				fpa = new FilePatternAssociation(pattern);
				this.filePatternAssociationById[pattern] = fpa;
				this.filePatternAssociations.push(fpa);
			}
			return fpa;
		};
		JSONSchemaService.prototype.registerExternalSchema = function (uri, filePatterns, unresolvedSchemaContent) {
			if (filePatterns === void 0) { filePatterns = null; }
			var id = this.normalizeId(uri);
			this.registeredSchemasIds[id] = true;
			if (filePatterns) {
				for (var _i = 0, filePatterns_1 = filePatterns; _i < filePatterns_1.length; _i++) {
					var pattern = filePatterns_1[_i];
					this.getOrAddFilePatternAssociation(pattern).addSchema(id);
				}
			}
			return unresolvedSchemaContent ? this.addSchemaHandle(id, unresolvedSchemaContent) : this.getOrAddSchemaHandle(id);
		};
		JSONSchemaService.prototype.clearExternalSchemas = function () {
			this.schemasById = {};
			this.filePatternAssociations = [];
			this.filePatternAssociationById = {};
			this.registeredSchemasIds = {};
			for (var id in this.contributionSchemas) {
				this.schemasById[id] = this.contributionSchemas[id];
				this.registeredSchemasIds[id] = true;
			}
			for (var pattern in this.contributionAssociations) {
				var fpa = this.getOrAddFilePatternAssociation(pattern);
				for (var _i = 0, _a = this.contributionAssociations[pattern]; _i < _a.length; _i++) {
					var schemaId = _a[_i];
					var id = this.normalizeId(schemaId);
					fpa.addSchema(id);
				}
			}
		};
		JSONSchemaService.prototype.getResolvedSchema = function (schemaId) {
			var id = this.normalizeId(schemaId);
			var schemaHandle = this.schemasById[id];
			if (schemaHandle) {
				return schemaHandle.getResolvedSchema();
			}
			return this.promise.resolve(null);
		};
		JSONSchemaService.prototype.loadSchema = function (url) {
			if (!this.requestService) {
				var errorMessage = localize('json.schema.norequestservice', 'Unable to load schema from \'{0}\'. No schema request service available', toDisplayString(url));
				return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
			}
			return this.requestService(url).then(function (content) {
				if (!content) {
					var errorMessage = localize('json.schema.nocontent', 'Unable to load schema from \'{0}\': No content.', toDisplayString(url));
					return new UnresolvedSchema({}, [errorMessage]);
				}
				var schemaContent = {};
				var jsonErrors = [];
				schemaContent = jsonc_parser__WEBPACK_IMPORTED_MODULE_0__["parse"](content, jsonErrors);
				var errors = jsonErrors.length ? [localize('json.schema.invalidFormat', 'Unable to parse content from \'{0}\': Parse error at offset {1}.', toDisplayString(url), jsonErrors[0].offset)] : [];
				return new UnresolvedSchema(schemaContent, errors);
			}, function (error) {
				var errorMessage = error.toString();
				var errorSplit = error.toString().split('Error: ');
				if (errorSplit.length > 1) {
					// more concise error message, URL and context are attached by caller anyways
					errorMessage = errorSplit[1];
				}
				return new UnresolvedSchema({}, [errorMessage]);
			});
		};
		JSONSchemaService.prototype.resolveSchemaContent = function (schemaToResolve, schemaURL, dependencies) {
			var _this = this;
			var resolveErrors = schemaToResolve.errors.slice(0);
			var schema = schemaToResolve.schema;
			var contextService = this.contextService;
			var findSection = function (schema, path) {
				if (!path) {
					return schema;
				}
				var current = schema;
				if (path[0] === '/') {
					path = path.substr(1);
				}
				path.split('/').some(function (part) {
					current = current[part];
					return !current;
				});
				return current;
			};
			var merge = function (target, sourceRoot, sourceURI, path) {
				var section = findSection(sourceRoot, path);
				if (section) {
					for (var key in section) {
						if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
							target[key] = section[key];
						}
					}
				}
				else {
					resolveErrors.push(localize('json.schema.invalidref', '$ref \'{0}\' in \'{1}\' can not be resolved.', path, sourceURI));
				}
			};
			var resolveExternalLink = function (node, uri, linkPath, parentSchemaURL, parentSchemaDependencies) {
				if (contextService && !/^\w+:\/\/.*/.test(uri)) {
					uri = contextService.resolveRelativePath(uri, parentSchemaURL);
				}
				uri = _this.normalizeId(uri);
				var referencedHandle = _this.getOrAddSchemaHandle(uri);
				return referencedHandle.getUnresolvedSchema().then(function (unresolvedSchema) {
					parentSchemaDependencies[uri] = true;
					if (unresolvedSchema.errors.length) {
						var loc = linkPath ? uri + '#' + linkPath : uri;
						resolveErrors.push(localize('json.schema.problemloadingref', 'Problems loading reference \'{0}\': {1}', loc, unresolvedSchema.errors[0]));
					}
					merge(node, unresolvedSchema.schema, uri, linkPath);
					return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
				});
			};
			var resolveRefs = function (node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
				if (!node || typeof node !== 'object') {
					return Promise.resolve(null);
				}
				var toWalk = [node];
				var seen = [];
				var openPromises = [];
				var collectEntries = function () {
					var entries = [];
					for (var _i = 0; _i < arguments.length; _i++) {
						entries[_i] = arguments[_i];
					}
					for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
						var entry = entries_1[_a];
						if (typeof entry === 'object') {
							toWalk.push(entry);
						}
					}
				};
				var collectMapEntries = function () {
					var maps = [];
					for (var _i = 0; _i < arguments.length; _i++) {
						maps[_i] = arguments[_i];
					}
					for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
						var map = maps_1[_a];
						if (typeof map === 'object') {
							for (var key in map) {
								var entry = map[key];
								if (typeof entry === 'object') {
									toWalk.push(entry);
								}
							}
						}
					}
				};
				var collectArrayEntries = function () {
					var arrays = [];
					for (var _i = 0; _i < arguments.length; _i++) {
						arrays[_i] = arguments[_i];
					}
					for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
						var array = arrays_1[_a];
						if (Array.isArray(array)) {
							for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
								var entry = array_1[_b];
								if (typeof entry === 'object') {
									toWalk.push(entry);
								}
							}
						}
					}
				};
				var handleRef = function (next) {
					var seenRefs = [];
					while (next.$ref) {
						var ref = next.$ref;
						var segments = ref.split('#', 2);
						delete next.$ref;
						if (segments[0].length > 0) {
							openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
							return;
						}
						else {
							if (seenRefs.indexOf(ref) === -1) {
								merge(next, parentSchema, parentSchemaURL, segments[1]); // can set next.$ref again, use seenRefs to avoid circle
								seenRefs.push(ref);
							}
						}
					}
					collectEntries(next.items, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else);
					collectMapEntries(next.definitions, next.properties, next.patternProperties, next.dependencies);
					collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.items);
				};
				while (toWalk.length) {
					var next = toWalk.pop();
					if (seen.indexOf(next) >= 0) {
						continue;
					}
					seen.push(next);
					handleRef(next);
				}
				return _this.promise.all(openPromises);
			};
			return resolveRefs(schema, schema, schemaURL, dependencies).then(function (_) { return new ResolvedSchema(schema, resolveErrors); });
		};
		JSONSchemaService.prototype.getSchemaForResource = function (resource, document) {
			// first use $schema if present
			if (document && document.root && document.root.type === 'object') {
				var schemaProperties = document.root.properties.filter(function (p) { return (p.keyNode.value === '$schema') && p.valueNode && p.valueNode.type === 'string'; });
				if (schemaProperties.length > 0) {
					var schemeId = _parser_jsonParser__WEBPACK_IMPORTED_MODULE_3__["getNodeValue"](schemaProperties[0].valueNode);
					if (schemeId && _utils_strings__WEBPACK_IMPORTED_MODULE_2__["startsWith"](schemeId, '.') && this.contextService) {
						schemeId = this.contextService.resolveRelativePath(schemeId, resource);
					}
					if (schemeId) {
						var id = this.normalizeId(schemeId);
						return this.getOrAddSchemaHandle(id).getResolvedSchema();
					}
				}
			}
			var seen = Object.create(null);
			var schemas = [];
			for (var _i = 0, _a = this.filePatternAssociations; _i < _a.length; _i++) {
				var entry = _a[_i];
				if (entry.matchesPattern(resource)) {
					for (var _b = 0, _c = entry.getSchemas(); _b < _c.length; _b++) {
						var schemaId = _c[_b];
						if (!seen[schemaId]) {
							schemas.push(schemaId);
							seen[schemaId] = true;
						}
					}
				}
			}
			if (schemas.length > 0) {
				return this.createCombinedSchema(resource, schemas).getResolvedSchema();
			}
			return this.promise.resolve(null);
		};
		JSONSchemaService.prototype.createCombinedSchema = function (resource, schemaIds) {
			if (schemaIds.length === 1) {
				return this.getOrAddSchemaHandle(schemaIds[0]);
			}
			else {
				var combinedSchemaId = 'schemaservice://combinedSchema/' + encodeURIComponent(resource);
				var combinedSchema = {
					allOf: schemaIds.map(function (schemaId) { return ({ $ref: schemaId }); })
				};
				return this.addSchemaHandle(combinedSchemaId, combinedSchema);
			}
		};
		return JSONSchemaService;
	}());

	function toDisplayString(url) {
		try {
			var uri = vscode_uri__WEBPACK_IMPORTED_MODULE_1__["default"].parse(url);
			if (uri.scheme === 'file') {
				return uri.fsPath;
			}
		}
		catch (e) {
			// ignore
		}
		return url;
	}


	/***/ }),
	/* 76 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONDocumentSymbols", function() { return JSONDocumentSymbols; });
	/* harmony import */ var _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
	/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
	/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(77);
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/




	var JSONDocumentSymbols = /** @class */ (function () {
		function JSONDocumentSymbols(schemaService) {
			this.schemaService = schemaService;
		}
		JSONDocumentSymbols.prototype.findDocumentSymbols = function (document, doc) {
			var _this = this;
			var root = doc.root;
			if (!root) {
				return null;
			}
			// special handling for key bindings
			var resourceString = document.uri;
			if ((resourceString === 'vscode://defaultsettings/keybindings.json') || _utils_strings__WEBPACK_IMPORTED_MODULE_1__["endsWith"](resourceString.toLowerCase(), '/user/keybindings.json')) {
				if (root.type === 'array') {
					var result_1 = [];
					root.items.forEach(function (item) {
						if (item.type === 'object') {
							for (var _i = 0, _a = item.properties; _i < _a.length; _i++) {
								var property = _a[_i];
								if (property.keyNode.value === 'key') {
									if (property.valueNode) {
										if (property.valueNode) {
											var location = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["Location"].create(document.uri, getRange(document, item));
											result_1.push({ name: _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodeValue"](property.valueNode), kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Function, location: location });
										}
										return;
									}
								}
							}
						}
					});
					return result_1;
				}
			}
			var collectOutlineEntries = function (result, node, containerName) {
				if (node.type === 'array') {
					node.items.forEach(function (node) { return collectOutlineEntries(result, node, containerName); });
				}
				else if (node.type === 'object') {
					node.properties.forEach(function (property) {
						var location = vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["Location"].create(document.uri, getRange(document, property));
						var valueNode = property.valueNode;
						if (valueNode) {
							var childContainerName = containerName ? containerName + '.' + property.keyNode.value : property.keyNode.value;
							result.push({ name: _this.getKeyLabel(property), kind: _this.getSymbolKind(valueNode.type), location: location, containerName: containerName });
							collectOutlineEntries(result, valueNode, childContainerName);
						}
					});
				}
				return result;
			};
			var result = collectOutlineEntries([], root, void 0);
			return result;
		};
		JSONDocumentSymbols.prototype.findDocumentSymbols2 = function (document, doc) {
			var _this = this;
			var root = doc.root;
			if (!root) {
				return null;
			}
			// special handling for key bindings
			var resourceString = document.uri;
			if ((resourceString === 'vscode://defaultsettings/keybindings.json') || _utils_strings__WEBPACK_IMPORTED_MODULE_1__["endsWith"](resourceString.toLowerCase(), '/user/keybindings.json')) {
				if (root.type === 'array') {
					var result_2 = [];
					root.items.forEach(function (item) {
						if (item.type === 'object') {
							for (var _i = 0, _a = item.properties; _i < _a.length; _i++) {
								var property = _a[_i];
								if (property.keyNode.value === 'key') {
									if (property.valueNode) {
										var range = getRange(document, item);
										var selectionRange = getRange(document, property.keyNode);
										result_2.push({ name: _parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodeValue"](property.valueNode), kind: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Function, range: range, selectionRange: selectionRange });
									}
									return;
								}
							}
						}
					});
					return result_2;
				}
			}
			var collectOutlineEntries = function (result, node) {
				if (node.type === 'array') {
					node.items.forEach(function (node, index) {
						if (node) {
							var range = getRange(document, node);
							var selectionRange = range;
							var name = String(index);
							var children = collectOutlineEntries([], node);
							result.push({ name: name, kind: _this.getSymbolKind(node.type), range: range, selectionRange: selectionRange, children: children });
						}
					});
				}
				else if (node.type === 'object') {
					node.properties.forEach(function (property) {
						var valueNode = property.valueNode;
						if (valueNode) {
							var range = getRange(document, property);
							var selectionRange = getRange(document, property.keyNode);
							var children = collectOutlineEntries([], valueNode);
							result.push({ name: _this.getKeyLabel(property), kind: _this.getSymbolKind(valueNode.type), range: range, selectionRange: selectionRange, children: children });
						}
					});
				}
				return result;
			};
			var result = collectOutlineEntries([], root);
			return result;
		};
		JSONDocumentSymbols.prototype.getSymbolKind = function (nodeType) {
			switch (nodeType) {
				case 'object':
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Module;
				case 'string':
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].String;
				case 'number':
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Number;
				case 'array':
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Array;
				case 'boolean':
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Boolean;
				default: // 'null'
					return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["SymbolKind"].Variable;
			}
		};
		JSONDocumentSymbols.prototype.getKeyLabel = function (property) {
			var name = property.keyNode.value;
			if (name) {
				name = name.replace(/[\n]/g, '↵');
			}
			if (name && name.trim()) {
				return name;
			}
			return "\"" + name + "\"";
		};
		JSONDocumentSymbols.prototype.findDocumentColors = function (document, doc) {
			return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
				var result = [];
				if (schema) {
					var matchingSchemas = doc.getMatchingSchemas(schema.schema);
					var visitedNode = {};
					for (var _i = 0, matchingSchemas_1 = matchingSchemas; _i < matchingSchemas_1.length; _i++) {
						var s = matchingSchemas_1[_i];
						if (!s.inverted && s.schema && (s.schema.format === 'color' || s.schema.format === 'color-hex') && s.node && s.node.type === 'string') {
							var nodeId = String(s.node.offset);
							if (!visitedNode[nodeId]) {
								var color = Object(_utils_colors__WEBPACK_IMPORTED_MODULE_2__["colorFromHex"])(_parser_jsonParser__WEBPACK_IMPORTED_MODULE_0__["getNodeValue"](s.node));
								if (color) {
									var range = getRange(document, s.node);
									result.push({ color: color, range: range });
								}
								visitedNode[nodeId] = true;
							}
						}
					}
				}
				return result;
			});
		};
		JSONDocumentSymbols.prototype.getColorPresentations = function (document, doc, color, range) {
			var result = [];
			var red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
			function toTwoDigitHex(n) {
				var r = n.toString(16);
				return r.length !== 2 ? '0' + r : r;
			}
			var label;
			if (color.alpha === 1) {
				label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256);
			}
			else {
				label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256) + toTwoDigitHex(Math.round(color.alpha * 255));
			}
			result.push({ label: label, textEdit: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["TextEdit"].replace(range, JSON.stringify(label)) });
			return result;
		};
		return JSONDocumentSymbols;
	}());

	function getRange(document, node) {
		return vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_3__["Range"].create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
	}


	/***/ }),
	/* 77 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexDigit", function() { return hexDigit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorFromHex", function() { return colorFromHex; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorFrom256RGB", function() { return colorFrom256RGB; });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var Digit0 = 48;
	var Digit9 = 57;
	var A = 65;
	var a = 97;
	var f = 102;
	function hexDigit(charCode) {
		if (charCode < Digit0) {
			return 0;
		}
		if (charCode <= Digit9) {
			return charCode - Digit0;
		}
		if (charCode < a) {
			charCode += (a - A);
		}
		if (charCode >= a && charCode <= f) {
			return charCode - a + 10;
		}
		return 0;
	}
	function colorFromHex(text) {
		if (text[0] !== '#') {
			return null;
		}
		switch (text.length) {
			case 4:
				return {
					red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
					green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
					blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
					alpha: 1
				};
			case 5:
				return {
					red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
					green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
					blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
					alpha: (hexDigit(text.charCodeAt(4)) * 0x11) / 255.0,
				};
			case 7:
				return {
					red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
					green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
					blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
					alpha: 1
				};
			case 9:
				return {
					red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
					green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
					blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
					alpha: (hexDigit(text.charCodeAt(7)) * 0x10 + hexDigit(text.charCodeAt(8))) / 255.0
				};
		}
		return null;
	}
	function colorFrom256RGB(red, green, blue, alpha) {
		if (alpha === void 0) { alpha = 1.0; }
		return {
			red: red / 255.0,
			green: green / 255.0,
			blue: blue / 255.0,
			alpha: alpha
		};
	}


	/***/ }),
	/* 78 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaContributions", function() { return schemaContributions; });
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
	/* harmony import */ var vscode_nls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode_nls__WEBPACK_IMPORTED_MODULE_0__);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/

	var localize = vscode_nls__WEBPACK_IMPORTED_MODULE_0__["loadMessageBundle"]();
	var schemaContributions = {
		schemaAssociations: {},
		schemas: {
			// bundle the schema-schema to include (localized) descriptions
			'http://json-schema.org/draft-04/schema#': {
				'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
				'$schema': 'http://json-schema.org/draft-04/schema#',
				'definitions': {
					'schemaArray': {
						'type': 'array',
						'minItems': 1,
						'items': {
							'$ref': '#'
						}
					},
					'positiveInteger': {
						'type': 'integer',
						'minimum': 0
					},
					'positiveIntegerDefault0': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveInteger'
							},
							{
								'default': 0
							}
						]
					},
					'simpleTypes': {
						'type': 'string',
						'enum': [
							'array',
							'boolean',
							'integer',
							'null',
							'number',
							'object',
							'string'
						]
					},
					'stringArray': {
						'type': 'array',
						'items': {
							'type': 'string'
						},
						'minItems': 1,
						'uniqueItems': true
					}
				},
				'type': 'object',
				'properties': {
					'id': {
						'type': 'string',
						'format': 'uri'
					},
					'$schema': {
						'type': 'string',
						'format': 'uri'
					},
					'title': {
						'type': 'string'
					},
					'description': {
						'type': 'string'
					},
					'default': {},
					'multipleOf': {
						'type': 'number',
						'minimum': 0,
						'exclusiveMinimum': true
					},
					'maximum': {
						'type': 'number'
					},
					'exclusiveMaximum': {
						'type': 'boolean',
						'default': false
					},
					'minimum': {
						'type': 'number'
					},
					'exclusiveMinimum': {
						'type': 'boolean',
						'default': false
					},
					'maxLength': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveInteger'
							}
						]
					},
					'minLength': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveIntegerDefault0'
							}
						]
					},
					'pattern': {
						'type': 'string',
						'format': 'regex'
					},
					'additionalItems': {
						'anyOf': [
							{
								'type': 'boolean'
							},
							{
								'$ref': '#'
							}
						],
						'default': {}
					},
					'items': {
						'anyOf': [
							{
								'$ref': '#'
							},
							{
								'$ref': '#/definitions/schemaArray'
							}
						],
						'default': {}
					},
					'maxItems': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveInteger'
							}
						]
					},
					'minItems': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveIntegerDefault0'
							}
						]
					},
					'uniqueItems': {
						'type': 'boolean',
						'default': false
					},
					'maxProperties': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveInteger'
							}
						]
					},
					'minProperties': {
						'allOf': [
							{
								'$ref': '#/definitions/positiveIntegerDefault0'
							}
						]
					},
					'required': {
						'allOf': [
							{
								'$ref': '#/definitions/stringArray'
							}
						]
					},
					'additionalProperties': {
						'anyOf': [
							{
								'type': 'boolean'
							},
							{
								'$ref': '#'
							}
						],
						'default': {}
					},
					'definitions': {
						'type': 'object',
						'additionalProperties': {
							'$ref': '#'
						},
						'default': {}
					},
					'properties': {
						'type': 'object',
						'additionalProperties': {
							'$ref': '#'
						},
						'default': {}
					},
					'patternProperties': {
						'type': 'object',
						'additionalProperties': {
							'$ref': '#'
						},
						'default': {}
					},
					'dependencies': {
						'type': 'object',
						'additionalProperties': {
							'anyOf': [
								{
									'$ref': '#'
								},
								{
									'$ref': '#/definitions/stringArray'
								}
							]
						}
					},
					'enum': {
						'type': 'array',
						'minItems': 1,
						'uniqueItems': true
					},
					'type': {
						'anyOf': [
							{
								'$ref': '#/definitions/simpleTypes'
							},
							{
								'type': 'array',
								'items': {
									'$ref': '#/definitions/simpleTypes'
								},
								'minItems': 1,
								'uniqueItems': true
							}
						]
					},
					'format': {
						'anyOf': [
							{
								'type': 'string',
								'enum': [
									'date-time',
									'uri',
									'email',
									'hostname',
									'ipv4',
									'ipv6',
									'regex'
								]
							},
							{
								'type': 'string'
							}
						]
					},
					'allOf': {
						'allOf': [
							{
								'$ref': '#/definitions/schemaArray'
							}
						]
					},
					'anyOf': {
						'allOf': [
							{
								'$ref': '#/definitions/schemaArray'
							}
						]
					},
					'oneOf': {
						'allOf': [
							{
								'$ref': '#/definitions/schemaArray'
							}
						]
					},
					'not': {
						'allOf': [
							{
								'$ref': '#'
							}
						]
					}
				},
				'dependencies': {
					'exclusiveMaximum': [
						'maximum'
					],
					'exclusiveMinimum': [
						'minimum'
					]
				},
				'default': {}
			},
			'http://json-schema.org/draft-07/schema#': {
				'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
				'definitions': {
					'schemaArray': {
						'type': 'array',
						'minItems': 1,
						'items': { '$ref': '#' }
					},
					'nonNegativeInteger': {
						'type': 'integer',
						'minimum': 0
					},
					'nonNegativeIntegerDefault0': {
						'allOf': [
							{ '$ref': '#/definitions/nonNegativeInteger' },
							{ 'default': 0 }
						]
					},
					'simpleTypes': {
						'enum': [
							'array',
							'boolean',
							'integer',
							'null',
							'number',
							'object',
							'string'
						]
					},
					'stringArray': {
						'type': 'array',
						'items': { 'type': 'string' },
						'uniqueItems': true,
						'default': []
					}
				},
				'type': ['object', 'boolean'],
				'properties': {
					'$id': {
						'type': 'string',
						'format': 'uri-reference'
					},
					'$schema': {
						'type': 'string',
						'format': 'uri'
					},
					'$ref': {
						'type': 'string',
						'format': 'uri-reference'
					},
					'$comment': {
						'type': 'string'
					},
					'title': {
						'type': 'string'
					},
					'description': {
						'type': 'string'
					},
					'default': true,
					'readOnly': {
						'type': 'boolean',
						'default': false
					},
					'examples': {
						'type': 'array',
						'items': true
					},
					'multipleOf': {
						'type': 'number',
						'exclusiveMinimum': 0
					},
					'maximum': {
						'type': 'number'
					},
					'exclusiveMaximum': {
						'type': 'number'
					},
					'minimum': {
						'type': 'number'
					},
					'exclusiveMinimum': {
						'type': 'number'
					},
					'maxLength': { '$ref': '#/definitions/nonNegativeInteger' },
					'minLength': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
					'pattern': {
						'type': 'string',
						'format': 'regex'
					},
					'additionalItems': { '$ref': '#' },
					'items': {
						'anyOf': [
							{ '$ref': '#' },
							{ '$ref': '#/definitions/schemaArray' }
						],
						'default': true
					},
					'maxItems': { '$ref': '#/definitions/nonNegativeInteger' },
					'minItems': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
					'uniqueItems': {
						'type': 'boolean',
						'default': false
					},
					'contains': { '$ref': '#' },
					'maxProperties': { '$ref': '#/definitions/nonNegativeInteger' },
					'minProperties': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
					'required': { '$ref': '#/definitions/stringArray' },
					'additionalProperties': { '$ref': '#' },
					'definitions': {
						'type': 'object',
						'additionalProperties': { '$ref': '#' },
						'default': {}
					},
					'properties': {
						'type': 'object',
						'additionalProperties': { '$ref': '#' },
						'default': {}
					},
					'patternProperties': {
						'type': 'object',
						'additionalProperties': { '$ref': '#' },
						'propertyNames': { 'format': 'regex' },
						'default': {}
					},
					'dependencies': {
						'type': 'object',
						'additionalProperties': {
							'anyOf': [
								{ '$ref': '#' },
								{ '$ref': '#/definitions/stringArray' }
							]
						}
					},
					'propertyNames': { '$ref': '#' },
					'const': true,
					'enum': {
						'type': 'array',
						'items': true,
						'minItems': 1,
						'uniqueItems': true
					},
					'type': {
						'anyOf': [
							{ '$ref': '#/definitions/simpleTypes' },
							{
								'type': 'array',
								'items': { '$ref': '#/definitions/simpleTypes' },
								'minItems': 1,
								'uniqueItems': true
							}
						]
					},
					'format': { 'type': 'string' },
					'contentMediaType': { 'type': 'string' },
					'contentEncoding': { 'type': 'string' },
					'if': { '$ref': '#' },
					'then': { '$ref': '#' },
					'else': { '$ref': '#' },
					'allOf': { '$ref': '#/definitions/schemaArray' },
					'anyOf': { '$ref': '#/definitions/schemaArray' },
					'oneOf': { '$ref': '#/definitions/schemaArray' },
					'not': { '$ref': '#' }
				},
				'default': true
			}
		}
	};
	var descriptions = {
		id: localize('schema.json.id', "A unique identifier for the schema."),
		$schema: localize('schema.json.$schema', "The schema to verify this document against."),
		title: localize('schema.json.title', "A descriptive title of the element."),
		description: localize('schema.json.description', "A long description of the element. Used in hover menus and suggestions."),
		default: localize('schema.json.default', "A default value. Used by suggestions."),
		multipleOf: localize('schema.json.multipleOf', "A number that should cleanly divide the current value (i.e. have no remainder)."),
		maximum: localize('schema.json.maximum', "The maximum numerical value, inclusive by default."),
		exclusiveMaximum: localize('schema.json.exclusiveMaximum', "Makes the maximum property exclusive."),
		minimum: localize('schema.json.minimum', "The minimum numerical value, inclusive by default."),
		exclusiveMinimum: localize('schema.json.exclusiveMininum', "Makes the minimum property exclusive."),
		maxLength: localize('schema.json.maxLength', "The maximum length of a string."),
		minLength: localize('schema.json.minLength', "The minimum length of a string."),
		pattern: localize('schema.json.pattern', "A regular expression to match the string against. It is not implicitly anchored."),
		additionalItems: localize('schema.json.additionalItems', "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
		items: localize('schema.json.items', "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
		maxItems: localize('schema.json.maxItems', "The maximum number of items that can be inside an array. Inclusive."),
		minItems: localize('schema.json.minItems', "The minimum number of items that can be inside an array. Inclusive."),
		uniqueItems: localize('schema.json.uniqueItems', "If all of the items in the array must be unique. Defaults to false."),
		maxProperties: localize('schema.json.maxProperties', "The maximum number of properties an object can have. Inclusive."),
		minProperties: localize('schema.json.minProperties', "The minimum number of properties an object can have. Inclusive."),
		required: localize('schema.json.required', "An array of strings that lists the names of all properties required on this object."),
		additionalProperties: localize('schema.json.additionalProperties', "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
		definitions: localize('schema.json.definitions', "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
		properties: localize('schema.json.properties', "A map of property names to schemas for each property."),
		patternProperties: localize('schema.json.patternProperties', "A map of regular expressions on property names to schemas for matching properties."),
		dependencies: localize('schema.json.dependencies', "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
		enum: localize('schema.json.enum', "The set of literal values that are valid."),
		type: localize('schema.json.type', "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
		format: localize('schema.json.format', "Describes the format expected for the value."),
		allOf: localize('schema.json.allOf', "An array of schemas, all of which must match."),
		anyOf: localize('schema.json.anyOf', "An array of schemas, where at least one must match."),
		oneOf: localize('schema.json.oneOf', "An array of schemas, exactly one of which must match."),
		not: localize('schema.json.not', "A schema which must not match."),
		$id: localize('schema.json.$id', "A unique identifier for the schema."),
		$ref: localize('schema.json.$ref', "Reference a definition hosted on any location."),
		$comment: localize('schema.json.$comment', "Comments from schema authors to readers or maintainers of the schema."),
		readOnly: localize('schema.json.readOnly', "Indicates that the value of the instance is managed exclusively by the owning authority."),
		examples: localize('schema.json.examples', "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
		contains: localize('schema.json.contains', "An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
		propertyNames: localize('schema.json.propertyNames', "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
		const: localize('schema.json.const', "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
		contentMediaType: localize('schema.json.contentMediaType', "Describes the media type of a string property."),
		contentEncoding: localize('schema.json.contentEncoding', "Describes the content encoding of a string property."),
		if: localize('schema.json.if', "The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
		then: localize('schema.json.then', "The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
		else: localize('schema.json.else', "The \"else\" subschema is used for validation when the \"if\" subschema fails.")
	};
	for (var schemaName in schemaContributions.schemas) {
		var schema = schemaContributions.schemas[schemaName];
		for (var property in schema.properties) {
			var propertyObject = schema.properties[property];
			if (propertyObject === true) {
				propertyObject = schema.properties[property] = {};
			}
			var description = descriptions[property];
			if (description) {
				propertyObject['description'] = description;
			}
			else {
				console.log(property + ": localize('schema.json." + property + "', \"\")");
			}
		}
	}


	/***/ }),
	/* 79 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoldingRanges", function() { return getFoldingRanges; });
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
	/* harmony import */ var _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/



	function getFoldingRanges(document, context) {
		var ranges = [];
		var nestingLevels = [];
		var stack = [];
		var prevStart = -1;
		var scanner = Object(jsonc_parser__WEBPACK_IMPORTED_MODULE_1__["createScanner"])(document.getText(), false);
		var token = scanner.scan();
		function addRange(range) {
			ranges.push(range);
			nestingLevels.push(stack.length);
		}
		while (token !== 17 /* EOF */) {
			switch (token) {
				case 1 /* OpenBraceToken */:
				case 3 /* OpenBracketToken */: {
					var startLine = document.positionAt(scanner.getTokenOffset()).line;
					var range = { startLine: startLine, endLine: startLine, kind: token === 1 /* OpenBraceToken */ ? 'object' : 'array' };
					stack.push(range);
					break;
				}
				case 2 /* CloseBraceToken */:
				case 4 /* CloseBracketToken */: {
					var kind = token === 2 /* CloseBraceToken */ ? 'object' : 'array';
					if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
						var range = stack.pop();
						var line = document.positionAt(scanner.getTokenOffset()).line;
						if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
							range.endLine = line - 1;
							addRange(range);
							prevStart = range.startLine;
						}
					}
					break;
				}
				case 13 /* BlockCommentTrivia */: {
					var startLine = document.positionAt(scanner.getTokenOffset()).line;
					var endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
					if (scanner.getTokenError() === 1 /* UnexpectedEndOfComment */ && startLine + 1 < document.lineCount) {
						scanner.setPosition(document.offsetAt(vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Position"].create(startLine + 1, 0)));
					}
					else {
						if (startLine < endLine) {
							addRange({ startLine: startLine, endLine: endLine, kind: _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["FoldingRangeKind"].Comment });
							prevStart = startLine;
						}
					}
					break;
				}
				case 12 /* LineCommentTrivia */: {
					var text = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
					var m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
					if (m) {
						var line = document.positionAt(scanner.getTokenOffset()).line;
						if (m[1]) { // start pattern match
							var range = { startLine: line, endLine: line, kind: _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["FoldingRangeKind"].Region };
							stack.push(range);
						}
						else {
							var i = stack.length - 1;
							while (i >= 0 && stack[i].kind !== _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["FoldingRangeKind"].Region) {
								i--;
							}
							if (i >= 0) {
								var range = stack[i];
								stack.length = i;
								if (line > range.startLine && prevStart !== range.startLine) {
									range.endLine = line;
									addRange(range);
									prevStart = range.startLine;
								}
							}
						}
					}
					break;
				}
			}
			token = scanner.scan();
		}
		var rangeLimit = context && context.rangeLimit;
		if (typeof rangeLimit !== 'number' || ranges.length <= rangeLimit) {
			return ranges;
		}
		var counts = [];
		for (var _i = 0, nestingLevels_1 = nestingLevels; _i < nestingLevels_1.length; _i++) {
			var level = nestingLevels_1[_i];
			if (level < 30) {
				counts[level] = (counts[level] || 0) + 1;
			}
		}
		var entries = 0;
		var maxLevel = 0;
		for (var i = 0; i < counts.length; i++) {
			var n = counts[i];
			if (n) {
				if (n + entries > rangeLimit) {
					maxLevel = i;
					break;
				}
				entries += n;
			}
		}
		var result = [];
		for (var i = 0; i < ranges.length; i++) {
			var level = nestingLevels[i];
			if (typeof level === 'number') {
				if (level < maxLevel || (level === maxLevel && entries++ < rangeLimit)) {
					result.push(ranges[i]);
				}
			}
		}
		return result;
	}


	/***/ }),
	/* 80 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectionRanges", function() { return getSelectionRanges; });
	/* harmony import */ var vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
	/* harmony import */ var jsonc_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
	/* harmony import */ var _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/



	function getSelectionRanges(document, positions, doc) {
		function getSelectionRange(position) {
			var offset = document.offsetAt(position);
			var node = doc.getNodeFromOffset(offset, true);
			if (!node) {
				return [];
			}
			var result = [];
			while (node) {
				switch (node.type) {
					case 'string':
					case 'object':
					case 'array':
						// range without ", [ or {
						var cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
						if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
							result.push(newRange(cStart, cEnd));
						}
						result.push(newRange(node.offset, node.offset + node.length));
						break;
					case 'number':
					case 'boolean':
					case 'null':
					case 'property':
						result.push(newRange(node.offset, node.offset + node.length));
						break;
				}
				if (node.type === 'property' || node.parent && node.parent.type === 'array') {
					var afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5 /* CommaToken */);
					if (afterCommaOffset !== -1) {
						result.push(newRange(node.offset, afterCommaOffset));
					}
				}
				node = node.parent;
			}
			return result;
		}
		function newRange(start, end) {
			return {
				range: vscode_languageserver_types__WEBPACK_IMPORTED_MODULE_0__["Range"].create(document.positionAt(start), document.positionAt(end)),
				kind: _jsonLanguageTypes__WEBPACK_IMPORTED_MODULE_2__["SelectionRangeKind"].Declaration
			};
		}
		var scanner = Object(jsonc_parser__WEBPACK_IMPORTED_MODULE_1__["createScanner"])(document.getText(), true);
		function getOffsetAfterNextToken(offset, expectedToken) {
			scanner.setPosition(offset);
			var token = scanner.scan();
			if (token === expectedToken) {
				return scanner.getTokenOffset() + scanner.getTokenLength();
			}
			return -1;
		}
		return positions.map(getSelectionRange);
	}


	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	function getLanguageModelCache(maxEntries, cleanupIntervalTimeInSec, parse) {
		let languageModels = {};
		let nModels = 0;
		let cleanupInterval = undefined;
		if (cleanupIntervalTimeInSec > 0) {
			cleanupInterval = setInterval(() => {
				let cutoffTime = Date.now() - cleanupIntervalTimeInSec * 1000;
				let uris = Object.keys(languageModels);
				for (let uri of uris) {
					let languageModelInfo = languageModels[uri];
					if (languageModelInfo.cTime < cutoffTime) {
						delete languageModels[uri];
						nModels--;
					}
				}
			}, cleanupIntervalTimeInSec * 1000);
		}
		return {
			get(document) {
				let version = document.version;
				let languageId = document.languageId;
				let languageModelInfo = languageModels[document.uri];
				if (languageModelInfo && languageModelInfo.version === version && languageModelInfo.languageId === languageId) {
					languageModelInfo.cTime = Date.now();
					return languageModelInfo.languageModel;
				}
				let languageModel = parse(document);
				languageModels[document.uri] = { languageModel, version, languageId, cTime: Date.now() };
				if (!languageModelInfo) {
					nModels++;
				}
				if (nModels === maxEntries) {
					let oldestTime = Number.MAX_VALUE;
					let oldestUri = null;
					for (let uri in languageModels) {
						let languageModelInfo = languageModels[uri];
						if (languageModelInfo.cTime < oldestTime) {
							oldestUri = uri;
							oldestTime = languageModelInfo.cTime;
						}
					}
					if (oldestUri) {
						delete languageModels[oldestUri];
						nModels--;
					}
				}
				return languageModel;
			},
			onDocumentRemoved(document) {
				let uri = document.uri;
				if (languageModels[uri]) {
					delete languageModels[uri];
					nModels--;
				}
			},
			dispose() {
				if (typeof cleanupInterval !== 'undefined') {
					clearInterval(cleanupInterval);
					cleanupInterval = undefined;
					languageModels = {};
					nModels = 0;
				}
			}
		};
	}
	exports.getLanguageModelCache = getLanguageModelCache;


	/***/ })
	/******/ ])));
	//# sourceMappingURL=jsonServerMain.js.map