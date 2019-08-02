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
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(2);
	const index_1 = __webpack_require__(3);
	const languageConfiguration_1 = __webpack_require__(15);
	const task_1 = __webpack_require__(18);
	const typeScriptServiceClientHost_1 = __webpack_require__(25);
	const arrays_1 = __webpack_require__(47);
	const commandManager_1 = __webpack_require__(175);
	const fileSchemes = __webpack_require__(35);
	const languageDescription_1 = __webpack_require__(71);
	const lazy_1 = __webpack_require__(176);
	const logDirectoryProvider_1 = __webpack_require__(177);
	const managedFileContext_1 = __webpack_require__(178);
	const plugins_1 = __webpack_require__(179);
	const ProjectStatus = __webpack_require__(180);
	const surveyor_1 = __webpack_require__(181);
	function activate(context) {
		const pluginManager = new plugins_1.PluginManager();
		context.subscriptions.push(pluginManager);
		const commandManager = new commandManager_1.CommandManager();
		context.subscriptions.push(commandManager);
		const onCompletionAccepted = new vscode.EventEmitter();
		context.subscriptions.push(onCompletionAccepted);
		const lazyClientHost = createLazyClientHost(context, pluginManager, commandManager, item => {
			onCompletionAccepted.fire(item);
		});
		index_1.registerCommands(commandManager, lazyClientHost, pluginManager);
		context.subscriptions.push(new task_1.default(lazyClientHost.map(x => x.serviceClient)));
		context.subscriptions.push(new languageConfiguration_1.LanguageConfigurationManager());
		Promise.resolve().then(() => __webpack_require__(182)).then(module => {
			context.subscriptions.push(module.register());
		});
		context.subscriptions.push(lazilyActivateClient(lazyClientHost, pluginManager));
		return api_1.getExtensionApi(onCompletionAccepted.event, pluginManager);
	}
	exports.activate = activate;
	function createLazyClientHost(context, pluginManager, commandManager, onCompletionAccepted) {
		return lazy_1.lazy(() => {
			const logDirectoryProvider = new logDirectoryProvider_1.default(context);
			const clientHost = new typeScriptServiceClientHost_1.default(languageDescription_1.standardLanguageDescriptions, context.workspaceState, pluginManager, commandManager, logDirectoryProvider, onCompletionAccepted);
			context.subscriptions.push(clientHost);
			context.subscriptions.push(new surveyor_1.Surveyor(context.globalState, clientHost.serviceClient));
			clientHost.serviceClient.onReady(() => {
				context.subscriptions.push(ProjectStatus.create(clientHost.serviceClient, clientHost.serviceClient.telemetryReporter));
			});
			return clientHost;
		});
	}
	function lazilyActivateClient(lazyClientHost, pluginManager) {
		const disposables = [];
		const supportedLanguage = arrays_1.flatten([
			...languageDescription_1.standardLanguageDescriptions.map(x => x.modeIds),
			...pluginManager.plugins.map(x => x.languages)
		]);
		let hasActivated = false;
		const maybeActivate = (textDocument) => {
			if (!hasActivated && isSupportedDocument(supportedLanguage, textDocument)) {
				hasActivated = true;
				// Force activation
				// tslint:disable-next-line:no-unused-expression
				void lazyClientHost.value;
				disposables.push(new managedFileContext_1.default(resource => {
					return lazyClientHost.value.serviceClient.toPath(resource);
				}));
				return true;
			}
			return false;
		};
		const didActivate = vscode.workspace.textDocuments.some(maybeActivate);
		if (!didActivate) {
			const openListener = vscode.workspace.onDidOpenTextDocument(doc => {
				if (maybeActivate(doc)) {
					openListener.dispose();
				}
			}, undefined, disposables);
		}
		return vscode.Disposable.from(...disposables);
	}
	function isSupportedDocument(supportedLanguage, document) {
		if (supportedLanguage.indexOf(document.languageId) < 0) {
			return false;
		}
		return fileSchemes.isSupportedScheme(document.uri.scheme);
	}


	/***/ }),
	/* 1 */
	/***/ (function(module, exports) {

	module.exports = require("vscode");

	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class ApiV0 {
		constructor(onCompletionAccepted, _pluginManager) {
			this.onCompletionAccepted = onCompletionAccepted;
			this._pluginManager = _pluginManager;
		}
		configurePlugin(pluginId, configuration) {
			this._pluginManager.setConfiguration(pluginId, configuration);
		}
	}
	function getExtensionApi(onCompletionAccepted, pluginManager) {
		return {
			getAPI(version) {
				if (version === 0) {
					return new ApiV0(onCompletionAccepted, pluginManager);
				}
				return undefined;
			}
		};
	}
	exports.getExtensionApi = getExtensionApi;


	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const configurePlugin_1 = __webpack_require__(4);
	const goToProjectConfiguration_1 = __webpack_require__(5);
	const openTsServerLog_1 = __webpack_require__(11);
	const reloadProject_1 = __webpack_require__(12);
	const restartTsServer_1 = __webpack_require__(13);
	const selectTypeScriptVersion_1 = __webpack_require__(14);
	function registerCommands(commandManager, lazyClientHost, pluginManager) {
		commandManager.register(new reloadProject_1.ReloadTypeScriptProjectsCommand(lazyClientHost));
		commandManager.register(new reloadProject_1.ReloadJavaScriptProjectsCommand(lazyClientHost));
		commandManager.register(new selectTypeScriptVersion_1.SelectTypeScriptVersionCommand(lazyClientHost));
		commandManager.register(new openTsServerLog_1.OpenTsServerLogCommand(lazyClientHost));
		commandManager.register(new restartTsServer_1.RestartTsServerCommand(lazyClientHost));
		commandManager.register(new goToProjectConfiguration_1.TypeScriptGoToProjectConfigCommand(lazyClientHost));
		commandManager.register(new goToProjectConfiguration_1.JavaScriptGoToProjectConfigCommand(lazyClientHost));
		commandManager.register(new configurePlugin_1.ConfigurePluginCommand(pluginManager));
	}
	exports.registerCommands = registerCommands;


	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class ConfigurePluginCommand {
		constructor(pluginManager) {
			this.pluginManager = pluginManager;
			this.id = '_typescript.configurePlugin';
		}
		execute(pluginId, configuration) {
			this.pluginManager.setConfiguration(pluginId, configuration);
		}
	}
	exports.ConfigurePluginCommand = ConfigurePluginCommand;


	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const cancellation_1 = __webpack_require__(9);
	const tsconfig_1 = __webpack_require__(10);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'commands/goToProjectConfiguration.ts'));
	class TypeScriptGoToProjectConfigCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'typescript.goToProjectConfig';
		}
		execute() {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				goToProjectConfig(this.lazyClientHost.value, true, editor.document.uri);
			}
		}
	}
	exports.TypeScriptGoToProjectConfigCommand = TypeScriptGoToProjectConfigCommand;
	class JavaScriptGoToProjectConfigCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'javascript.goToProjectConfig';
		}
		execute() {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				goToProjectConfig(this.lazyClientHost.value, false, editor.document.uri);
			}
		}
	}
	exports.JavaScriptGoToProjectConfigCommand = JavaScriptGoToProjectConfigCommand;
	async function goToProjectConfig(clientHost, isTypeScriptProject, resource) {
		const client = clientHost.serviceClient;
		const rootPath = client.getWorkspaceRootForResource(resource);
		if (!rootPath) {
			vscode.window.showInformationMessage(localize(0, null));
			return;
		}
		const file = client.toPath(resource);
		// TSServer errors when 'projectInfo' is invoked on a non js/ts file
		if (!file || !await clientHost.handles(resource)) {
			vscode.window.showWarningMessage(localize(1, null));
			return;
		}
		let res;
		try {
			res = await client.execute('projectInfo', { file, needFileNameList: false }, cancellation_1.nulToken);
		}
		catch (_a) {
			// noop
		}
		if (!res || res.type !== 'response' || !res.body) {
			vscode.window.showWarningMessage(localize(2, null));
			return;
		}
		const { configFileName } = res.body;
		if (configFileName && !tsconfig_1.isImplicitProjectConfigFile(configFileName)) {
			const doc = await vscode.workspace.openTextDocument(configFileName);
			vscode.window.showTextDocument(doc, vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined);
			return;
		}
		let ProjectConfigAction;
		(function (ProjectConfigAction) {
			ProjectConfigAction[ProjectConfigAction["None"] = 0] = "None";
			ProjectConfigAction[ProjectConfigAction["CreateConfig"] = 1] = "CreateConfig";
			ProjectConfigAction[ProjectConfigAction["LearnMore"] = 2] = "LearnMore";
		})(ProjectConfigAction || (ProjectConfigAction = {}));
		const selected = await vscode.window.showInformationMessage((isTypeScriptProject
			? localize(3, null, 'https://go.microsoft.com/fwlink/?linkid=841896')
			: localize(4, null, 'https://go.microsoft.com/fwlink/?linkid=759670')), {
			title: isTypeScriptProject
				? localize(5, null)
				: localize(6, null),
			id: ProjectConfigAction.CreateConfig,
		});
		switch (selected && selected.id) {
			case ProjectConfigAction.CreateConfig:
				tsconfig_1.openOrCreateConfigFile(isTypeScriptProject, rootPath, client.configuration);
				return;
		}
	}


	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/* --------------------------------------------------------------------------------------------
	 * Copyright (c) Microsoft Corporation. All rights reserved.
	 * Licensed under the MIT License. See License.txt in the project root for license information.
	 * ------------------------------------------------------------------------------------------ */

	Object.defineProperty(exports, "__esModule", { value: true });
	var path = __webpack_require__(7);
	var fs = __webpack_require__(8);
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
	/* 7 */
	/***/ (function(module, exports) {

	module.exports = require("path");

	/***/ }),
	/* 8 */
	/***/ (function(module, exports) {

	module.exports = require("fs");

	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nulTokenSource = new vscode.CancellationTokenSource();
	exports.nulToken = nulTokenSource.token;


	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	function isImplicitProjectConfigFile(configFileName) {
		return configFileName.indexOf('/dev/null/') === 0;
	}
	exports.isImplicitProjectConfigFile = isImplicitProjectConfigFile;
	function inferredProjectConfig(config) {
		const base = {
			module: 'commonjs',
			target: 'es2016',
			jsx: 'preserve'
		};
		if (config.checkJs) {
			base.checkJs = true;
		}
		if (config.experimentalDecorators) {
			base.experimentalDecorators = true;
		}
		return base;
	}
	exports.inferredProjectConfig = inferredProjectConfig;
	function inferredProjectConfigSnippet(config) {
		const baseConfig = inferredProjectConfig(config);
		const compilerOptions = Object.keys(baseConfig).map(key => `"${key}": ${JSON.stringify(baseConfig[key])}`);
		return new vscode.SnippetString(`{
		"compilerOptions": {
			${compilerOptions.join(',\n\t\t')}$0
		},
		"exclude": [
			"node_modules",
			"**/node_modules/*"
		]
	}`);
	}
	async function openOrCreateConfigFile(isTypeScriptProject, rootPath, config) {
		const configFile = vscode.Uri.file(path.join(rootPath, isTypeScriptProject ? 'tsconfig.json' : 'jsconfig.json'));
		const col = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
		try {
			const doc = await vscode.workspace.openTextDocument(configFile);
			return vscode.window.showTextDocument(doc, col);
		}
		catch (_a) {
			const doc = await vscode.workspace.openTextDocument(configFile.with({ scheme: 'untitled' }));
			const editor = await vscode.window.showTextDocument(doc, col);
			if (editor.document.getText().length === 0) {
				await editor.insertSnippet(inferredProjectConfigSnippet(config));
			}
			return editor;
		}
	}
	exports.openOrCreateConfigFile = openOrCreateConfigFile;


	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class OpenTsServerLogCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'typescript.openTsServerLog';
		}
		execute() {
			this.lazyClientHost.value.serviceClient.openTsServerLogFile();
		}
	}
	exports.OpenTsServerLogCommand = OpenTsServerLogCommand;


	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class ReloadTypeScriptProjectsCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'typescript.reloadProjects';
		}
		execute() {
			this.lazyClientHost.value.reloadProjects();
		}
	}
	exports.ReloadTypeScriptProjectsCommand = ReloadTypeScriptProjectsCommand;
	class ReloadJavaScriptProjectsCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'javascript.reloadProjects';
		}
		execute() {
			this.lazyClientHost.value.reloadProjects();
		}
	}
	exports.ReloadJavaScriptProjectsCommand = ReloadJavaScriptProjectsCommand;


	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class RestartTsServerCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'typescript.restartTsServer';
		}
		execute() {
			this.lazyClientHost.value.serviceClient.restartTsServer();
		}
	}
	exports.RestartTsServerCommand = RestartTsServerCommand;


	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class SelectTypeScriptVersionCommand {
		constructor(lazyClientHost) {
			this.lazyClientHost = lazyClientHost;
			this.id = 'typescript.selectTypeScriptVersion';
		}
		execute() {
			this.lazyClientHost.value.serviceClient.onVersionStatusClicked();
		}
	}
	exports.SelectTypeScriptVersionCommand = SelectTypeScriptVersionCommand;


	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/* --------------------------------------------------------------------------------------------
	 * Includes code from typescript-sublime-plugin project, obtained from
	 * https://github.com/Microsoft/TypeScript-Sublime-Plugin/blob/master/TypeScript%20Indent.tmPreferences
	 * ------------------------------------------------------------------------------------------ */
	const vscode = __webpack_require__(1);
	const dispose_1 = __webpack_require__(16);
	const languageModeIds = __webpack_require__(17);
	const jsTsLanguageConfiguration = {
		indentationRules: {
			decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[\}\]].*$/,
			increaseIndentPattern: /^((?!\/\/).)*(\{[^}"'`]*|\([^)"'`]*|\[[^\]"'`]*)$/
		},
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
		onEnterRules: [
			{
				// e.g. /** | */
				beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
				afterText: /^\s*\*\/$/,
				action: { indentAction: vscode.IndentAction.IndentOutdent, appendText: ' * ' },
			}, {
				// e.g. /** ...|
				beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
				action: { indentAction: vscode.IndentAction.None, appendText: ' * ' },
			}, {
				// e.g.  * ...|
				beforeText: /^(\t|[ ])*[ ]\*([ ]([^\*]|\*(?!\/))*)?$/,
				oneLineAboveText: /^(\s*(\/\*\*|\*)).*/,
				action: { indentAction: vscode.IndentAction.None, appendText: '* ' },
			}, {
				// e.g.  */|
				beforeText: /^(\t|[ ])*[ ]\*\/\s*$/,
				action: { indentAction: vscode.IndentAction.None, removeText: 1 },
			},
			{
				// e.g.  *-----*/|
				beforeText: /^(\t|[ ])*[ ]\*[^/]*\*\/\s*$/,
				action: { indentAction: vscode.IndentAction.None, removeText: 1 },
			}
		]
	};
	const EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
	const jsxTagsLanguageConfiguration = {
		wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
		onEnterRules: [
			{
				beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join('|')}))([_:\\w][_:\\w-.\\d]*)([^/>]*(?!/)>)[^<]*$`, 'i'),
				afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
				action: { indentAction: vscode.IndentAction.IndentOutdent }
			},
			{
				beforeText: new RegExp(`<(?!(?:${EMPTY_ELEMENTS.join('|')}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`, 'i'),
				action: { indentAction: vscode.IndentAction.Indent }
			}
		],
	};
	class LanguageConfigurationManager extends dispose_1.Disposable {
		constructor() {
			super();
			const standardLanguages = [
				languageModeIds.javascript,
				languageModeIds.javascriptreact,
				languageModeIds.typescript,
				languageModeIds.typescriptreact,
			];
			for (const language of standardLanguages) {
				this.registerConfiguration(language, jsTsLanguageConfiguration);
			}
			this.registerConfiguration(languageModeIds.jsxTags, jsxTagsLanguageConfiguration);
		}
		registerConfiguration(language, config) {
			this._register(vscode.languages.setLanguageConfiguration(language, config));
		}
	}
	exports.LanguageConfigurationManager = LanguageConfigurationManager;


	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	function disposeAll(disposables) {
		while (disposables.length) {
			const item = disposables.pop();
			if (item) {
				item.dispose();
			}
		}
	}
	exports.disposeAll = disposeAll;
	class Disposable {
		constructor() {
			this._isDisposed = false;
			this._disposables = [];
		}
		dispose() {
			if (this._isDisposed) {
				return;
			}
			this._isDisposed = true;
			disposeAll(this._disposables);
		}
		_register(value) {
			if (this._isDisposed) {
				value.dispose();
			}
			else {
				this._disposables.push(value);
			}
			return value;
		}
		get isDisposed() {
			return this._isDisposed;
		}
	}
	exports.Disposable = Disposable;


	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	exports.typescript = 'typescript';
	exports.typescriptreact = 'typescriptreact';
	exports.javascript = 'javascript';
	exports.javascriptreact = 'javascriptreact';
	exports.jsxTags = 'jsx-tags';
	function isSupportedLanguageMode(doc) {
		return vscode.languages.match([exports.typescript, exports.typescriptreact, exports.javascript, exports.javascriptreact], doc) > 0;
	}
	exports.isSupportedLanguageMode = isSupportedLanguageMode;
	function isTypeScriptDocument(doc) {
		return vscode.languages.match([exports.typescript, exports.typescriptreact], doc) > 0;
	}
	exports.isTypeScriptDocument = isTypeScriptDocument;


	/***/ }),
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const jsonc = __webpack_require__(19);
	const tsconfig_1 = __webpack_require__(10);
	const tsconfigProvider_1 = __webpack_require__(24);
	const dispose_1 = __webpack_require__(16);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/task.ts'));
	const exists = (file) => new Promise((resolve, _reject) => {
		fs.exists(file, (value) => {
			resolve(value);
		});
	});
	/**
	 * Provides tasks for building `tsconfig.json` files in a project.
	 */
	class TscTaskProvider {
		constructor(client) {
			this.client = client;
			this.autoDetect = 'on';
			this.disposables = [];
			this.tsconfigProvider = new tsconfigProvider_1.default();
			vscode.workspace.onDidChangeConfiguration(this.onConfigurationChanged, this, this.disposables);
			this.onConfigurationChanged();
		}
		dispose() {
			this.disposables.forEach(x => x.dispose());
		}
		async provideTasks(token) {
			const folders = vscode.workspace.workspaceFolders;
			if (!folders || !folders.length) {
				return [];
			}
			const configPaths = new Set();
			const tasks = [];
			for (const project of await this.getAllTsConfigs(token)) {
				if (!configPaths.has(project.path)) {
					configPaths.add(project.path);
					tasks.push(...(await this.getTasksForProject(project)));
				}
			}
			return tasks;
		}
		resolveTask(_task) {
			return undefined;
		}
		async getAllTsConfigs(token) {
			const out = new Set();
			const configs = [
				...await this.getTsConfigForActiveFile(token),
				...await this.getTsConfigsInWorkspace()
			];
			for (const config of configs) {
				if (await exists(config.path)) {
					out.add(config);
				}
			}
			return Array.from(out);
		}
		async getTsConfigForActiveFile(token) {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				if (path.basename(editor.document.fileName).match(/^tsconfig\.(.\.)?json$/)) {
					const uri = editor.document.uri;
					return [{
							path: uri.fsPath,
							workspaceFolder: vscode.workspace.getWorkspaceFolder(uri)
						}];
				}
			}
			const file = this.getActiveTypeScriptFile();
			if (!file) {
				return [];
			}
			const response = await this.client.value.execute('projectInfo', { file, needFileNameList: false }, token);
			if (response.type !== 'response' || !response.body) {
				return [];
			}
			const { configFileName } = response.body;
			if (configFileName && !tsconfig_1.isImplicitProjectConfigFile(configFileName)) {
				const normalizedConfigPath = path.normalize(configFileName);
				const uri = vscode.Uri.file(normalizedConfigPath);
				const folder = vscode.workspace.getWorkspaceFolder(uri);
				return [{
						path: normalizedConfigPath,
						workspaceFolder: folder
					}];
			}
			return [];
		}
		async getTsConfigsInWorkspace() {
			return Array.from(await this.tsconfigProvider.getConfigsForWorkspace());
		}
		static async getCommand(project) {
			if (project.workspaceFolder) {
				const localTsc = await TscTaskProvider.getLocalTscAtPath(path.dirname(project.path));
				if (localTsc) {
					return localTsc;
				}
				const workspaceTsc = await TscTaskProvider.getLocalTscAtPath(project.workspaceFolder.uri.fsPath);
				if (workspaceTsc) {
					return workspaceTsc;
				}
			}
			// Use global tsc version
			return 'tsc';
		}
		static async getLocalTscAtPath(folderPath) {
			const platform = process.platform;
			const bin = path.join(folderPath, 'node_modules', '.bin');
			if (platform === 'win32' && await exists(path.join(bin, 'tsc.cmd'))) {
				return path.join(bin, 'tsc.cmd');
			}
			else if ((platform === 'linux' || platform === 'darwin') && await exists(path.join(bin, 'tsc'))) {
				return path.join(bin, 'tsc');
			}
			return undefined;
		}
		getActiveTypeScriptFile() {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const document = editor.document;
				if (document && (document.languageId === 'typescript' || document.languageId === 'typescriptreact')) {
					return this.client.value.toPath(document.uri);
				}
			}
			return undefined;
		}
		async getTasksForProject(project) {
			const command = await TscTaskProvider.getCommand(project);
			const args = await this.getBuildShellArgs(project);
			const label = this.getLabelForTasks(project);
			const tasks = [];
			if (this.autoDetect === 'build' || this.autoDetect === 'on') {
				const buildTaskidentifier = { type: 'typescript', tsconfig: label };
				const buildTask = new vscode.Task(buildTaskidentifier, project.workspaceFolder || vscode.TaskScope.Workspace, localize(0, null, label), 'tsc', new vscode.ShellExecution(command, args), '$tsc');
				buildTask.group = vscode.TaskGroup.Build;
				buildTask.isBackground = false;
				tasks.push(buildTask);
			}
			if (this.autoDetect === 'watch' || this.autoDetect === 'on') {
				const watchTaskidentifier = { type: 'typescript', tsconfig: label, option: 'watch' };
				const watchTask = new vscode.Task(watchTaskidentifier, project.workspaceFolder || vscode.TaskScope.Workspace, localize(1, null, label), 'tsc', new vscode.ShellExecution(command, [...args, '--watch']), '$tsc-watch');
				watchTask.group = vscode.TaskGroup.Build;
				watchTask.isBackground = true;
				tasks.push(watchTask);
			}
			return tasks;
		}
		getBuildShellArgs(project) {
			const defaultArgs = ['-p', project.path];
			return new Promise((resolve) => {
				fs.readFile(project.path, (error, result) => {
					if (error) {
						return resolve(defaultArgs);
					}
					try {
						const tsconfig = jsonc.parse(result.toString());
						if (tsconfig.references) {
							return resolve(['-b', project.path]);
						}
					}
					catch (_a) {
						// noop
					}
					return resolve(defaultArgs);
				});
			});
		}
		getLabelForTasks(project) {
			if (project.workspaceFolder) {
				return path.relative(project.workspaceFolder.uri.fsPath, project.path);
			}
			return project.path;
		}
		onConfigurationChanged() {
			const type = vscode.workspace.getConfiguration('typescript.tsc').get('autoDetect');
			this.autoDetect = typeof type === 'undefined' ? 'on' : type;
		}
	}
	/**
	 * Manages registrations of TypeScript task providers with VS Code.
	 */
	class TypeScriptTaskProviderManager extends dispose_1.Disposable {
		constructor(client) {
			super();
			this.client = client;
			this.taskProviderSub = undefined;
			vscode.workspace.onDidChangeConfiguration(this.onConfigurationChanged, this, this._disposables);
			this.onConfigurationChanged();
		}
		dispose() {
			super.dispose();
			if (this.taskProviderSub) {
				this.taskProviderSub.dispose();
				this.taskProviderSub = undefined;
			}
		}
		onConfigurationChanged() {
			const autoDetect = vscode.workspace.getConfiguration('typescript.tsc').get('autoDetect');
			if (this.taskProviderSub && autoDetect === 'off') {
				this.taskProviderSub.dispose();
				this.taskProviderSub = undefined;
			}
			else if (!this.taskProviderSub && autoDetect !== 'off') {
				this.taskProviderSub = vscode.workspace.registerTaskProvider('typescript', new TscTaskProvider(this.client));
			}
		}
	}
	exports.default = TypeScriptTaskProviderManager;


	/***/ }),
	/* 19 */
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
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modify", function() { return modify; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdits", function() { return applyEdits; });
	/* harmony import */ var _impl_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
	/* harmony import */ var _impl_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
	/* harmony import */ var _impl_scanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
	/* harmony import */ var _impl_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
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
	/* 20 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEOL", function() { return isEOL; });
	/* harmony import */ var _scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
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
	/* 21 */
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
						var commentClosed = false;
						while (pos < len) {
							var ch = text.charCodeAt(pos);
							if (ch === 42 /* asterisk */ && (pos + 1 < len) && text.charCodeAt(pos + 1) === 47 /* slash */) {
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
	/* 22 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {

	"use strict";
	__webpack_require__.r(__webpack_exports__);
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeProperty", function() { return removeProperty; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProperty", function() { return setProperty; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyEdit", function() { return applyEdit; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWS", function() { return isWS; });
	/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
	/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/



	function removeProperty(text, path, formattingOptions) {
		return setProperty(text, path, void 0, formattingOptions);
	}
	function setProperty(text, path, value, formattingOptions, getInsertionIndex) {
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
		var _a;
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
	/* 23 */
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
	/* harmony import */ var _scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/


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
	/* 24 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const vscode = __webpack_require__(1);
	class TsConfigProvider {
		async getConfigsForWorkspace() {
			if (!vscode.workspace.workspaceFolders) {
				return [];
			}
			const configs = new Map();
			for (const config of await vscode.workspace.findFiles('**/tsconfig*.json', '**/node_modules/**')) {
				const root = vscode.workspace.getWorkspaceFolder(config);
				if (root) {
					configs.set(config.fsPath, {
						path: config.fsPath,
						workspaceFolder: root
					});
				}
			}
			return configs.values();
		}
	}
	exports.default = TsConfigProvider;


	/***/ }),
	/* 25 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/* --------------------------------------------------------------------------------------------
	 * Includes code from typescript-sublime-plugin project, obtained from
	 * https://github.com/Microsoft/TypeScript-Sublime-Plugin/blob/master/TypeScript%20Indent.tmPreferences
	 * ------------------------------------------------------------------------------------------ */
	const vscode = __webpack_require__(1);
	const fileConfigurationManager_1 = __webpack_require__(26);
	const languageProvider_1 = __webpack_require__(33);
	const PConst = __webpack_require__(37);
	const typescriptServiceClient_1 = __webpack_require__(67);
	const api_1 = __webpack_require__(27);
	const dispose_1 = __webpack_require__(16);
	const typeConverters = __webpack_require__(39);
	const typingsStatus_1 = __webpack_require__(171);
	const versionStatus_1 = __webpack_require__(172);
	// Style check diagnostics that can be reported as warnings
	const styleCheckDiagnostics = [
		6133,
		6138,
		7027,
		7028,
		7029,
		7030 // not all code paths return a value
	];
	class TypeScriptServiceClientHost extends dispose_1.Disposable {
		constructor(descriptions, workspaceState, pluginManager, commandManager, logDirectoryProvider, onCompletionAccepted) {
			super();
			this.commandManager = commandManager;
			this.languages = [];
			this.languagePerId = new Map();
			this.reportStyleCheckAsWarnings = true;
			const handleProjectCreateOrDelete = () => {
				this.triggerAllDiagnostics();
			};
			const handleProjectChange = () => {
				setTimeout(() => {
					this.triggerAllDiagnostics();
				}, 1500);
			};
			const configFileWatcher = this._register(vscode.workspace.createFileSystemWatcher('**/[tj]sconfig.json'));
			configFileWatcher.onDidCreate(handleProjectCreateOrDelete, this, this._disposables);
			configFileWatcher.onDidDelete(handleProjectCreateOrDelete, this, this._disposables);
			configFileWatcher.onDidChange(handleProjectChange, this, this._disposables);
			const allModeIds = this.getAllModeIds(descriptions);
			this.client = this._register(new typescriptServiceClient_1.default(workspaceState, version => this.versionStatus.onDidChangeTypeScriptVersion(version), pluginManager, logDirectoryProvider, allModeIds));
			this.client.onDiagnosticsReceived(({ kind, resource, diagnostics }) => {
				this.diagnosticsReceived(kind, resource, diagnostics);
			}, null, this._disposables);
			this.client.onConfigDiagnosticsReceived(diag => this.configFileDiagnosticsReceived(diag), null, this._disposables);
			this.client.onResendModelsRequested(() => this.populateService(), null, this._disposables);
			this.versionStatus = this._register(new versionStatus_1.default(resource => this.client.toPath(resource)));
			this._register(new typingsStatus_1.AtaProgressReporter(this.client));
			this.typingsStatus = this._register(new typingsStatus_1.default(this.client));
			this.fileConfigurationManager = this._register(new fileConfigurationManager_1.default(this.client));
			for (const description of descriptions) {
				const manager = new languageProvider_1.default(this.client, description, this.commandManager, this.client.telemetryReporter, this.typingsStatus, this.fileConfigurationManager, onCompletionAccepted);
				this.languages.push(manager);
				this._register(manager);
				this.languagePerId.set(description.id, manager);
			}
			Promise.resolve().then(() => __webpack_require__(173)).then(module => this._register(module.register(this.client, this.fileConfigurationManager, uri => this.handles(uri))));
			Promise.resolve().then(() => __webpack_require__(174)).then(module => this._register(module.register(this.client, allModeIds)));
			this.client.ensureServiceStarted();
			this.client.onReady(() => {
				if (this.client.apiVersion.lt(api_1.default.v230)) {
					return;
				}
				const languages = new Set();
				for (const plugin of pluginManager.plugins) {
					for (const language of plugin.languages) {
						languages.add(language);
					}
				}
				if (languages.size) {
					const description = {
						id: 'typescript-plugins',
						modeIds: Array.from(languages.values()),
						diagnosticSource: 'ts-plugin',
						diagnosticLanguage: 1 /* TypeScript */,
						diagnosticOwner: 'typescript',
						isExternal: true
					};
					const manager = new languageProvider_1.default(this.client, description, this.commandManager, this.client.telemetryReporter, this.typingsStatus, this.fileConfigurationManager, onCompletionAccepted);
					this.languages.push(manager);
					this._register(manager);
					this.languagePerId.set(description.id, manager);
				}
			});
			this.client.onTsServerStarted(() => {
				this.triggerAllDiagnostics();
			});
			vscode.workspace.onDidChangeConfiguration(this.configurationChanged, this, this._disposables);
			this.configurationChanged();
		}
		getAllModeIds(descriptions) {
			const allModeIds = [];
			for (const description of descriptions) {
				allModeIds.push(...description.modeIds);
			}
			return allModeIds;
		}
		get serviceClient() {
			return this.client;
		}
		reloadProjects() {
			this.client.executeWithoutWaitingForResponse('reloadProjects', null);
			this.triggerAllDiagnostics();
		}
		async handles(resource) {
			const provider = await this.findLanguage(resource);
			if (provider) {
				return true;
			}
			return this.client.bufferSyncSupport.handles(resource);
		}
		configurationChanged() {
			const typescriptConfig = vscode.workspace.getConfiguration('typescript');
			this.reportStyleCheckAsWarnings = typescriptConfig.get('reportStyleChecksAsWarnings', true);
		}
		async findLanguage(resource) {
			try {
				const doc = await vscode.workspace.openTextDocument(resource);
				return this.languages.find(language => language.handles(resource, doc));
			}
			catch (_a) {
				return undefined;
			}
		}
		triggerAllDiagnostics() {
			for (const language of this.languagePerId.values()) {
				language.triggerAllDiagnostics();
			}
		}
		populateService() {
			this.fileConfigurationManager.reset();
			this.client.bufferSyncSupport.reOpenDocuments();
			this.client.bufferSyncSupport.requestAllDiagnostics();
			// See https://github.com/Microsoft/TypeScript/issues/5530
			vscode.workspace.saveAll(false).then(() => {
				for (const language of this.languagePerId.values()) {
					language.reInitialize();
				}
			});
		}
		async diagnosticsReceived(kind, resource, diagnostics) {
			const language = await this.findLanguage(resource);
			if (language) {
				language.diagnosticsReceived(kind, resource, this.createMarkerDatas(diagnostics, language.diagnosticSource));
			}
		}
		configFileDiagnosticsReceived(event) {
			// See https://github.com/Microsoft/TypeScript/issues/10384
			const body = event.body;
			if (!body || !body.diagnostics || !body.configFile) {
				return;
			}
			this.findLanguage(this.client.toResource(body.configFile)).then(language => {
				if (!language) {
					return;
				}
				language.configFileDiagnosticsReceived(this.client.toResource(body.configFile), body.diagnostics.map(tsDiag => {
					const diagnostic = new vscode.Diagnostic(typeConverters.Range.fromTextSpan(tsDiag), body.diagnostics[0].text);
					diagnostic.source = language.diagnosticSource;
					return diagnostic;
				}));
			});
		}
		createMarkerDatas(diagnostics, source) {
			return diagnostics.map(tsDiag => this.tsDiagnosticToVsDiagnostic(tsDiag, source));
		}
		tsDiagnosticToVsDiagnostic(diagnostic, source) {
			const { start, end, text } = diagnostic;
			const range = new vscode.Range(typeConverters.Position.fromLocation(start), typeConverters.Position.fromLocation(end));
			const converted = new vscode.Diagnostic(range, text);
			converted.severity = this.getDiagnosticSeverity(diagnostic);
			converted.source = diagnostic.source || source;
			if (diagnostic.code) {
				converted.code = diagnostic.code;
			}
			const relatedInformation = diagnostic.relatedInformation;
			if (relatedInformation) {
				converted.relatedInformation = relatedInformation.map((info) => {
					let span = info.span;
					if (!span) {
						return undefined;
					}
					return new vscode.DiagnosticRelatedInformation(typeConverters.Location.fromTextSpan(this.client.toResource(span.file), span), info.message);
				}).filter((x) => !!x);
			}
			if (diagnostic.reportsUnnecessary) {
				converted.tags = [vscode.DiagnosticTag.Unnecessary];
			}
			converted.reportUnnecessary = diagnostic.reportsUnnecessary;
			return converted;
		}
		getDiagnosticSeverity(diagnostic) {
			if (this.reportStyleCheckAsWarnings
				&& this.isStyleCheckDiagnostic(diagnostic.code)
				&& diagnostic.category === PConst.DiagnosticCategory.error) {
				return vscode.DiagnosticSeverity.Warning;
			}
			switch (diagnostic.category) {
				case PConst.DiagnosticCategory.error:
					return vscode.DiagnosticSeverity.Error;
				case PConst.DiagnosticCategory.warning:
					return vscode.DiagnosticSeverity.Warning;
				case PConst.DiagnosticCategory.suggestion:
					return vscode.DiagnosticSeverity.Hint;
				default:
					return vscode.DiagnosticSeverity.Error;
			}
		}
		isStyleCheckDiagnostic(code) {
			return code ? styleCheckDiagnostics.indexOf(code) !== -1 : false;
		}
	}
	exports.default = TypeScriptServiceClientHost;


	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const languageModeIds_1 = __webpack_require__(17);
	const resourceMap_1 = __webpack_require__(29);
	const dispose_1 = __webpack_require__(16);
	function objsAreEqual(a, b) {
		let keys = Object.keys(a);
		for (const key of keys) {
			if (a[key] !== b[key]) {
				return false;
			}
		}
		return true;
	}
	function areFileConfigurationsEqual(a, b) {
		return (objsAreEqual(a.formatOptions, b.formatOptions)
			&& objsAreEqual(a.preferences, b.preferences));
	}
	class FileConfigurationManager extends dispose_1.Disposable {
		constructor(client) {
			super();
			this.client = client;
			this.formatOptions = new resourceMap_1.ResourceMap();
			vscode.workspace.onDidCloseTextDocument(textDocument => {
				// When a document gets closed delete the cached formatting options.
				// This is necessary since the tsserver now closed a project when its
				// last file in it closes which drops the stored formatting options
				// as well.
				this.formatOptions.delete(textDocument.uri);
			}, undefined, this._disposables);
		}
		async ensureConfigurationForDocument(document, token) {
			const formattingOptions = this.getFormattingOptions(document);
			if (formattingOptions) {
				return this.ensureConfigurationOptions(document, formattingOptions, token);
			}
		}
		getFormattingOptions(document) {
			const editor = vscode.window.visibleTextEditors.find(editor => editor.document.fileName === document.fileName);
			return editor
				? {
					tabSize: editor.options.tabSize,
					insertSpaces: editor.options.insertSpaces
				}
				: undefined;
		}
		async ensureConfigurationOptions(document, options, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return;
			}
			const currentOptions = this.getFileOptions(document, options);
			const cachedOptions = this.formatOptions.get(document.uri);
			if (cachedOptions) {
				const cachedOptionsValue = await cachedOptions;
				if (cachedOptionsValue && areFileConfigurationsEqual(cachedOptionsValue, currentOptions)) {
					return;
				}
			}
			let resolve;
			this.formatOptions.set(document.uri, new Promise(r => resolve = r));
			const args = Object.assign({ file }, currentOptions);
			try {
				const response = await this.client.execute('configure', args, token);
				resolve(response.type === 'response' ? currentOptions : undefined);
			}
			finally {
				resolve(undefined);
			}
		}
		async setGlobalConfigurationFromDocument(document, token) {
			const formattingOptions = this.getFormattingOptions(document);
			if (!formattingOptions) {
				return;
			}
			const args = Object.assign({ file: undefined /*global*/ }, this.getFileOptions(document, formattingOptions));
			await this.client.execute('configure', args, token);
		}
		reset() {
			this.formatOptions.clear();
		}
		getFileOptions(document, options) {
			return {
				formatOptions: this.getFormatOptions(document, options),
				preferences: this.getPreferences(document)
			};
		}
		getFormatOptions(document, options) {
			const config = vscode.workspace.getConfiguration(languageModeIds_1.isTypeScriptDocument(document) ? 'typescript.format' : 'javascript.format', document.uri);
			return {
				tabSize: options.tabSize,
				indentSize: options.tabSize,
				convertTabsToSpaces: options.insertSpaces,
				// We can use \n here since the editor normalizes later on to its line endings.
				newLineCharacter: '\n',
				insertSpaceAfterCommaDelimiter: config.get('insertSpaceAfterCommaDelimiter'),
				insertSpaceAfterConstructor: config.get('insertSpaceAfterConstructor'),
				insertSpaceAfterSemicolonInForStatements: config.get('insertSpaceAfterSemicolonInForStatements'),
				insertSpaceBeforeAndAfterBinaryOperators: config.get('insertSpaceBeforeAndAfterBinaryOperators'),
				insertSpaceAfterKeywordsInControlFlowStatements: config.get('insertSpaceAfterKeywordsInControlFlowStatements'),
				insertSpaceAfterFunctionKeywordForAnonymousFunctions: config.get('insertSpaceAfterFunctionKeywordForAnonymousFunctions'),
				insertSpaceBeforeFunctionParenthesis: config.get('insertSpaceBeforeFunctionParenthesis'),
				insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis'),
				insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets'),
				insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces'),
				insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces'),
				insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces'),
				insertSpaceAfterTypeAssertion: config.get('insertSpaceAfterTypeAssertion'),
				placeOpenBraceOnNewLineForFunctions: config.get('placeOpenBraceOnNewLineForFunctions'),
				placeOpenBraceOnNewLineForControlBlocks: config.get('placeOpenBraceOnNewLineForControlBlocks'),
			};
		}
		getPreferences(document) {
			if (this.client.apiVersion.lt(api_1.default.v290)) {
				return {};
			}
			const config = vscode.workspace.getConfiguration(languageModeIds_1.isTypeScriptDocument(document) ? 'typescript.preferences' : 'javascript.preferences', document.uri);
			return {
				quotePreference: this.getQuoteStylePreference(config),
				importModuleSpecifierPreference: getImportModuleSpecifierPreference(config),
				allowTextChangesInNewFiles: document.uri.scheme === 'file',
				providePrefixAndSuffixTextForRename: config.get('renameShorthandProperties', true),
				allowRenameOfImportPath: true,
			};
		}
		getQuoteStylePreference(config) {
			switch (config.get('quoteStyle')) {
				case 'single': return 'single';
				case 'double': return 'double';
				default: return this.client.apiVersion.gte(api_1.default.v333) ? 'auto' : undefined;
			}
		}
	}
	exports.default = FileConfigurationManager;
	function getImportModuleSpecifierPreference(config) {
		switch (config.get('importModuleSpecifier')) {
			case 'relative': return 'relative';
			case 'non-relative': return 'non-relative';
			default: return undefined;
		}
	}


	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const semver = __webpack_require__(28);
	const nls = __webpack_require__(6);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/api.ts'));
	class API {
		constructor(versionString, version) {
			this.versionString = versionString;
			this.version = version;
		}
		static fromSimpleString(value) {
			return new API(value, value);
		}
		static fromVersionString(versionString) {
			let version = semver.valid(versionString);
			if (!version) {
				return new API(localize(0, null), '1.0.0');
			}
			// Cut off any prerelease tag since we sometimes consume those on purpose.
			const index = versionString.indexOf('-');
			if (index >= 0) {
				version = version.substr(0, index);
			}
			return new API(versionString, version);
		}
		gte(other) {
			return semver.gte(this.version, other.version);
		}
		lt(other) {
			return !this.gte(other);
		}
	}
	API.defaultVersion = API.fromSimpleString('1.0.0');
	API.v203 = API.fromSimpleString('2.0.3');
	API.v206 = API.fromSimpleString('2.0.6');
	API.v208 = API.fromSimpleString('2.0.8');
	API.v213 = API.fromSimpleString('2.1.3');
	API.v220 = API.fromSimpleString('2.2.0');
	API.v222 = API.fromSimpleString('2.2.2');
	API.v230 = API.fromSimpleString('2.3.0');
	API.v234 = API.fromSimpleString('2.3.4');
	API.v240 = API.fromSimpleString('2.4.0');
	API.v250 = API.fromSimpleString('2.5.0');
	API.v260 = API.fromSimpleString('2.6.0');
	API.v270 = API.fromSimpleString('2.7.0');
	API.v280 = API.fromSimpleString('2.8.0');
	API.v290 = API.fromSimpleString('2.9.0');
	API.v291 = API.fromSimpleString('2.9.1');
	API.v292 = API.fromSimpleString('2.9.2');
	API.v300 = API.fromSimpleString('3.0.0');
	API.v310 = API.fromSimpleString('3.1.0');
	API.v314 = API.fromSimpleString('3.1.4');
	API.v320 = API.fromSimpleString('3.2.0');
	API.v330 = API.fromSimpleString('3.3.0');
	API.v333 = API.fromSimpleString('3.3.3');
	API.v340 = API.fromSimpleString('3.4.0');
	exports.default = API;


	/***/ }),
	/* 28 */
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
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const memoize_1 = __webpack_require__(30);
	const temp_1 = __webpack_require__(31);
	/**
	 * Maps of file resources
	 *
	 * Attempts to handle correct mapping on both case sensitive and case in-sensitive
	 * file systems.
	 */
	class ResourceMap {
		constructor(_normalizePath = (resource) => resource.fsPath) {
			this._normalizePath = _normalizePath;
			this._map = new Map();
		}
		get size() {
			return this._map.size;
		}
		has(resource) {
			const file = this.toKey(resource);
			return !!file && this._map.has(file);
		}
		get(resource) {
			const file = this.toKey(resource);
			if (!file) {
				return undefined;
			}
			const entry = this._map.get(file);
			return entry ? entry.value : undefined;
		}
		set(resource, value) {
			const file = this.toKey(resource);
			if (!file) {
				return;
			}
			const entry = this._map.get(file);
			if (entry) {
				entry.value = value;
			}
			else {
				this._map.set(file, { resource, value });
			}
		}
		delete(resource) {
			const file = this.toKey(resource);
			if (file) {
				this._map.delete(file);
			}
		}
		clear() {
			this._map.clear();
		}
		get values() {
			return Array.from(this._map.values()).map(x => x.value);
		}
		get entries() {
			return this._map.values();
		}
		toKey(resource) {
			const key = this._normalizePath(resource);
			if (!key) {
				return key;
			}
			return this.isCaseInsensitivePath(key) ? key.toLowerCase() : key;
		}
		isCaseInsensitivePath(path) {
			if (isWindowsPath(path)) {
				return true;
			}
			return path[0] === '/' && this.onIsCaseInsenitiveFileSystem;
		}
		get onIsCaseInsenitiveFileSystem() {
			if (process.platform === 'win32') {
				return true;
			}
			if (process.platform !== 'darwin') {
				return false;
			}
			const temp = temp_1.getTempFile('typescript-case-check');
			fs.writeFileSync(temp, '');
			return fs.existsSync(temp.toUpperCase());
		}
	}
	__decorate([
		memoize_1.memoize
	], ResourceMap.prototype, "onIsCaseInsenitiveFileSystem", null);
	exports.ResourceMap = ResourceMap;
	function isWindowsPath(path) {
		return /^[a-zA-Z]:\\/.test(path);
	}
	exports.isWindowsPath = isWindowsPath;


	/***/ }),
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	function memoize(_target, key, descriptor) {
		let fnKey;
		let fn;
		if (typeof descriptor.value === 'function') {
			fnKey = 'value';
			fn = descriptor.value;
		}
		else if (typeof descriptor.get === 'function') {
			fnKey = 'get';
			fn = descriptor.get;
		}
		else {
			throw new Error('not supported');
		}
		const memoizeKey = `$memoize$${key}`;
		descriptor[fnKey] = function (...args) {
			if (!this.hasOwnProperty(memoizeKey)) {
				Object.defineProperty(this, memoizeKey, {
					configurable: false,
					enumerable: false,
					writable: false,
					value: fn.apply(this, args)
				});
			}
			return this[memoizeKey];
		};
	}
	exports.memoize = memoize;


	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = __webpack_require__(7);
	const os = __webpack_require__(32);
	function makeRandomHexString(length) {
		let chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
		let result = '';
		for (let i = 0; i < length; i++) {
			const idx = Math.floor(chars.length * Math.random());
			result += chars[idx];
		}
		return result;
	}
	exports.makeRandomHexString = makeRandomHexString;
	function getTempFile(name) {
		return path.join(os.tmpdir(), name);
	}
	exports.getTempFile = getTempFile;


	/***/ }),
	/* 32 */
	/***/ (function(module, exports) {

	module.exports = require("os");

	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const path_1 = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const cachedResponse_1 = __webpack_require__(34);
	const dispose_1 = __webpack_require__(16);
	const fileSchemes = __webpack_require__(35);
	const memoize_1 = __webpack_require__(30);
	const validateSetting = 'validate.enable';
	const suggestionSetting = 'suggestionActions.enabled';
	class LanguageProvider extends dispose_1.Disposable {
		constructor(client, description, commandManager, telemetryReporter, typingsStatus, fileConfigurationManager, onCompletionAccepted) {
			super();
			this.client = client;
			this.description = description;
			this.commandManager = commandManager;
			this.telemetryReporter = telemetryReporter;
			this.typingsStatus = typingsStatus;
			this.fileConfigurationManager = fileConfigurationManager;
			this.onCompletionAccepted = onCompletionAccepted;
			vscode.workspace.onDidChangeConfiguration(this.configurationChanged, this, this._disposables);
			this.configurationChanged();
			client.onReady(() => this.registerProviders());
		}
		get documentSelector() {
			const documentSelector = [];
			for (const language of this.description.modeIds) {
				for (const scheme of fileSchemes.supportedSchemes) {
					documentSelector.push({ language, scheme });
				}
			}
			return documentSelector;
		}
		async registerProviders() {
			const selector = this.documentSelector;
			const cachedResponse = new cachedResponse_1.CachedResponse();
			this._register((await Promise.resolve().then(() => __webpack_require__(36))).register(selector, this.description.id, this.client, this.typingsStatus, this.fileConfigurationManager, this.commandManager, this.onCompletionAccepted));
			this._register((await Promise.resolve().then(() => __webpack_require__(43))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(45))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(46))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(48))).register(selector, this.client, cachedResponse));
			this._register((await Promise.resolve().then(() => __webpack_require__(49))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(50))).register(selector, this.description.id, this.client, this.fileConfigurationManager));
			this._register((await Promise.resolve().then(() => __webpack_require__(51))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(52))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(53))).register(selector, this.description.id, this.client, cachedResponse));
			this._register((await Promise.resolve().then(() => __webpack_require__(56))).register(selector, this.description.id, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(57))).register(selector, this.client, this.commandManager, this.fileConfigurationManager, this.telemetryReporter));
			this._register((await Promise.resolve().then(() => __webpack_require__(58))).register(selector, this.client, this.fileConfigurationManager, this.commandManager, this.client.diagnosticsManager, this.telemetryReporter));
			this._register((await Promise.resolve().then(() => __webpack_require__(59))).register(selector, this.client, this.fileConfigurationManager, this.client.diagnosticsManager));
			this._register((await Promise.resolve().then(() => __webpack_require__(60))).register(selector, this.client, this.fileConfigurationManager, this.commandManager, this.telemetryReporter));
			this._register((await Promise.resolve().then(() => __webpack_require__(61))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(62))).register(selector, this.description.id, this.client, cachedResponse));
			this._register((await Promise.resolve().then(() => __webpack_require__(63))).register(selector, this.client, this.fileConfigurationManager));
			this._register((await Promise.resolve().then(() => __webpack_require__(64))).register(selector, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(65))).register(selector, this.description.id, this.client));
			this._register((await Promise.resolve().then(() => __webpack_require__(66))).register(selector, this.client));
		}
		configurationChanged() {
			const config = vscode.workspace.getConfiguration(this.id, null);
			this.updateValidate(config.get(validateSetting, true));
			this.updateSuggestionDiagnostics(config.get(suggestionSetting, true));
		}
		handles(resource, doc) {
			if (doc && this.description.modeIds.indexOf(doc.languageId) >= 0) {
				return true;
			}
			const base = path_1.basename(resource.fsPath);
			return !!base && (!!this.description.configFilePattern && this.description.configFilePattern.test(base));
		}
		get id() {
			return this.description.id;
		}
		get diagnosticSource() {
			return this.description.diagnosticSource;
		}
		updateValidate(value) {
			this.client.diagnosticsManager.setValidate(this._diagnosticLanguage, value);
		}
		updateSuggestionDiagnostics(value) {
			this.client.diagnosticsManager.setEnableSuggestions(this._diagnosticLanguage, value);
		}
		reInitialize() {
			this.client.diagnosticsManager.reInitialize();
		}
		triggerAllDiagnostics() {
			this.client.bufferSyncSupport.requestAllDiagnostics();
		}
		diagnosticsReceived(diagnosticsKind, file, diagnostics) {
			const config = vscode.workspace.getConfiguration(this.id, file);
			const reportUnnecessary = config.get('showUnused', true);
			this.client.diagnosticsManager.updateDiagnostics(file, this._diagnosticLanguage, diagnosticsKind, diagnostics.filter(diag => {
				if (!reportUnnecessary) {
					diag.tags = undefined;
					if (diag.reportUnnecessary && diag.severity === vscode.DiagnosticSeverity.Hint) {
						return false;
					}
				}
				return true;
			}));
		}
		configFileDiagnosticsReceived(file, diagnostics) {
			this.client.diagnosticsManager.configFileDiagnosticsReceived(file, diagnostics);
		}
		get _diagnosticLanguage() {
			return this.description.diagnosticLanguage;
		}
	}
	__decorate([
		memoize_1.memoize
	], LanguageProvider.prototype, "documentSelector", null);
	exports.default = LanguageProvider;


	/***/ }),
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Caches a class of TS Server request based on document.
	 */
	class CachedResponse {
		constructor() {
			this.version = -1;
			this.document = '';
		}
		/**
		 * Execute a request. May return cached value or resolve the new value
		 *
		 * Caller must ensure that all input `resolve` functions return equivilent results (keyed only off of document).
		 */
		execute(document, resolve) {
			if (this.response && this.matches(document)) {
				// Chain so that on cancellation we fall back to the next resolve
				return this.response = this.response.then(result => result.type === 'cancelled' ? resolve() : result);
			}
			return this.reset(document, resolve);
		}
		matches(document) {
			return this.version === document.version && this.document === document.uri.toString();
		}
		async reset(document, resolve) {
			this.version = document.version;
			this.document = document.uri.toString();
			return this.response = resolve();
		}
	}
	exports.CachedResponse = CachedResponse;


	/***/ }),
	/* 35 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.file = 'file';
	exports.untitled = 'untitled';
	exports.walkThroughSnippet = 'walkThroughSnippet';
	exports.supportedSchemes = [
		exports.file,
		exports.untitled,
		exports.walkThroughSnippet
	];
	function isSupportedScheme(scheme) {
		return exports.supportedSchemes.indexOf(scheme) >= 0;
	}
	exports.isSupportedScheme = isSupportedScheme;


	/***/ }),
	/* 36 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const PConst = __webpack_require__(37);
	const api_1 = __webpack_require__(27);
	const cancellation_1 = __webpack_require__(9);
	const codeAction_1 = __webpack_require__(38);
	const dependentRegistration_1 = __webpack_require__(40);
	const memoize_1 = __webpack_require__(30);
	const Previewer = __webpack_require__(41);
	const typeConverters = __webpack_require__(39);
	const snippetForFunctionCall_1 = __webpack_require__(42);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/completions.ts'));
	class MyCompletionItem extends vscode.CompletionItem {
		constructor(position, document, line, tsEntry, useCodeSnippetsOnMethodSuggest, completionContext, metadata) {
			super(tsEntry.name, MyCompletionItem.convertKind(tsEntry.kind));
			this.position = position;
			this.document = document;
			this.tsEntry = tsEntry;
			this.completionContext = completionContext;
			this.metadata = metadata;
			if (tsEntry.isRecommended) {
				// Make sure isRecommended property always comes first
				// https://github.com/Microsoft/vscode/issues/40325
				this.sortText = tsEntry.sortText;
				this.preselect = true;
			}
			else if (tsEntry.source) {
				// De-prioritze auto-imports
				// https://github.com/Microsoft/vscode/issues/40311
				this.sortText = '\uffff' + tsEntry.sortText;
			}
			else {
				this.sortText = tsEntry.sortText;
			}
			this.position = position;
			this.useCodeSnippet = useCodeSnippetsOnMethodSuggest && (this.kind === vscode.CompletionItemKind.Function || this.kind === vscode.CompletionItemKind.Method);
			if (tsEntry.replacementSpan) {
				this.range = typeConverters.Range.fromTextSpan(tsEntry.replacementSpan);
				// Make sure we only replace a single line at most
				if (!this.range.isSingleLine) {
					this.range = new vscode.Range(this.range.start.line, this.range.start.character, this.range.start.line, line.length);
				}
			}
			this.insertText = tsEntry.insertText;
			this.filterText = tsEntry.insertText;
			if (completionContext.isMemberCompletion && completionContext.dotAccessorContext) {
				this.filterText = completionContext.dotAccessorContext.text + (this.insertText || this.label);
				if (!this.range) {
					this.range = completionContext.dotAccessorContext.range;
					this.insertText = this.filterText;
				}
			}
			if (tsEntry.kindModifiers) {
				const kindModifiers = new Set(tsEntry.kindModifiers.split(/\s+/g));
				if (kindModifiers.has(PConst.KindModifiers.optional)) {
					if (!this.insertText) {
						this.insertText = this.label;
					}
					if (!this.filterText) {
						this.filterText = this.label;
					}
					this.label += '?';
				}
				if (kindModifiers.has(PConst.KindModifiers.color)) {
					this.kind = vscode.CompletionItemKind.Color;
				}
				if (tsEntry.kind === PConst.Kind.script) {
					for (const extModifier of PConst.KindModifiers.fileExtensionKindModifiers) {
						if (kindModifiers.has(extModifier)) {
							if (tsEntry.name.toLowerCase().endsWith(extModifier)) {
								this.detail = tsEntry.name;
							}
							else {
								this.detail = tsEntry.name + extModifier;
							}
							break;
						}
					}
				}
			}
			this.resolveRange(line);
		}
		resolveRange(line) {
			if (this.range) {
				return;
			}
			const wordRange = this.document.getWordRangeAtPosition(this.position);
			if (wordRange) {
				// TODO: Reverted next line due to https://github.com/Microsoft/vscode/issues/66187
				// this.range = wordRange;
			}
			// Try getting longer, prefix based range for completions that span words
			const text = line.slice(Math.max(0, this.position.character - this.label.length), this.position.character).toLowerCase();
			const entryName = this.label.toLowerCase();
			for (let i = entryName.length; i >= 0; --i) {
				if (text.endsWith(entryName.substr(0, i)) && (!wordRange || wordRange.start.character > this.position.character - i)) {
					this.range = new vscode.Range(new vscode.Position(this.position.line, Math.max(0, this.position.character - i)), this.position);
					break;
				}
			}
		}
		static convertKind(kind) {
			switch (kind) {
				case PConst.Kind.primitiveType:
				case PConst.Kind.keyword:
					return vscode.CompletionItemKind.Keyword;
				case PConst.Kind.const:
					return vscode.CompletionItemKind.Constant;
				case PConst.Kind.let:
				case PConst.Kind.variable:
				case PConst.Kind.localVariable:
				case PConst.Kind.alias:
					return vscode.CompletionItemKind.Variable;
				case PConst.Kind.memberVariable:
				case PConst.Kind.memberGetAccessor:
				case PConst.Kind.memberSetAccessor:
					return vscode.CompletionItemKind.Field;
				case PConst.Kind.function:
					return vscode.CompletionItemKind.Function;
				case PConst.Kind.memberFunction:
				case PConst.Kind.constructSignature:
				case PConst.Kind.callSignature:
				case PConst.Kind.indexSignature:
					return vscode.CompletionItemKind.Method;
				case PConst.Kind.enum:
					return vscode.CompletionItemKind.Enum;
				case PConst.Kind.module:
				case PConst.Kind.externalModuleName:
					return vscode.CompletionItemKind.Module;
				case PConst.Kind.class:
				case PConst.Kind.type:
					return vscode.CompletionItemKind.Class;
				case PConst.Kind.interface:
					return vscode.CompletionItemKind.Interface;
				case PConst.Kind.warning:
					return vscode.CompletionItemKind.Text;
				case PConst.Kind.script:
					return vscode.CompletionItemKind.File;
				case PConst.Kind.directory:
					return vscode.CompletionItemKind.Folder;
				case PConst.Kind.string:
					return vscode.CompletionItemKind.Constant;
			}
			return vscode.CompletionItemKind.Property;
		}
		get commitCharacters() {
			if (this.completionContext.isNewIdentifierLocation || !this.completionContext.isInValidCommitCharacterContext) {
				return undefined;
			}
			const commitCharacters = [];
			switch (this.tsEntry.kind) {
				case PConst.Kind.memberGetAccessor:
				case PConst.Kind.memberSetAccessor:
				case PConst.Kind.constructSignature:
				case PConst.Kind.callSignature:
				case PConst.Kind.indexSignature:
				case PConst.Kind.enum:
				case PConst.Kind.interface:
					commitCharacters.push('.', ';');
					break;
				case PConst.Kind.module:
				case PConst.Kind.alias:
				case PConst.Kind.const:
				case PConst.Kind.let:
				case PConst.Kind.variable:
				case PConst.Kind.localVariable:
				case PConst.Kind.memberVariable:
				case PConst.Kind.class:
				case PConst.Kind.function:
				case PConst.Kind.memberFunction:
				case PConst.Kind.keyword:
				case PConst.Kind.parameter:
					commitCharacters.push('.', ',', ';');
					if (this.completionContext.enableCallCompletions) {
						commitCharacters.push('(');
					}
					break;
			}
			return commitCharacters.length === 0 ? undefined : commitCharacters;
		}
	}
	__decorate([
		memoize_1.memoize
	], MyCompletionItem.prototype, "commitCharacters", null);
	class CompositeCommand {
		constructor() {
			this.id = CompositeCommand.ID;
		}
		execute(...commands) {
			for (const command of commands) {
				vscode.commands.executeCommand(command.command, ...(command.arguments || []));
			}
		}
	}
	CompositeCommand.ID = '_typescript.composite';
	class CompletionAcceptedCommand {
		constructor(onCompletionAccepted) {
			this.onCompletionAccepted = onCompletionAccepted;
			this.id = CompletionAcceptedCommand.ID;
		}
		execute(item) {
			this.onCompletionAccepted(item);
		}
	}
	CompletionAcceptedCommand.ID = '_typescript.onCompletionAccepted';
	class ApplyCompletionCodeActionCommand {
		constructor(client) {
			this.client = client;
			this.id = ApplyCompletionCodeActionCommand.ID;
		}
		async execute(_file, codeActions) {
			if (codeActions.length === 0) {
				return true;
			}
			if (codeActions.length === 1) {
				return codeAction_1.applyCodeAction(this.client, codeActions[0], cancellation_1.nulToken);
			}
			const selection = await vscode.window.showQuickPick(codeActions.map((action, i) => ({
				label: action.description,
				description: '',
				index: i
			})), {
				placeHolder: localize(0, null)
			});
			if (!selection) {
				return false;
			}
			const action = codeActions[selection.index];
			if (!action) {
				return false;
			}
			return codeAction_1.applyCodeAction(this.client, action, cancellation_1.nulToken);
		}
	}
	ApplyCompletionCodeActionCommand.ID = '_typescript.applyCompletionCodeAction';
	var CompletionConfiguration;
	(function (CompletionConfiguration) {
		CompletionConfiguration.useCodeSnippetsOnMethodSuggest = 'suggest.completeFunctionCalls';
		CompletionConfiguration.nameSuggestions = 'suggest.names';
		CompletionConfiguration.pathSuggestions = 'suggest.paths';
		CompletionConfiguration.autoImportSuggestions = 'suggest.autoImports';
		function getConfigurationForResource(modeId, resource) {
			const config = vscode.workspace.getConfiguration(modeId, resource);
			return {
				useCodeSnippetsOnMethodSuggest: config.get(CompletionConfiguration.useCodeSnippetsOnMethodSuggest, false),
				pathSuggestions: config.get(CompletionConfiguration.pathSuggestions, true),
				autoImportSuggestions: config.get(CompletionConfiguration.autoImportSuggestions, true),
				nameSuggestions: config.get(CompletionConfiguration.nameSuggestions, true)
			};
		}
		CompletionConfiguration.getConfigurationForResource = getConfigurationForResource;
	})(CompletionConfiguration || (CompletionConfiguration = {}));
	class TypeScriptCompletionItemProvider {
		constructor(client, modeId, typingsStatus, fileConfigurationManager, commandManager, onCompletionAccepted) {
			this.client = client;
			this.modeId = modeId;
			this.typingsStatus = typingsStatus;
			this.fileConfigurationManager = fileConfigurationManager;
			commandManager.register(new ApplyCompletionCodeActionCommand(this.client));
			commandManager.register(new CompositeCommand());
			commandManager.register(new CompletionAcceptedCommand(onCompletionAccepted));
		}
		async provideCompletionItems(document, position, token, context) {
			if (this.typingsStatus.isAcquiringTypings) {
				return Promise.reject({
					label: localize(1, null),
					detail: localize(2, null)
				});
			}
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return null;
			}
			const line = document.lineAt(position.line);
			const completionConfiguration = CompletionConfiguration.getConfigurationForResource(this.modeId, document.uri);
			if (!this.shouldTrigger(context, line, position)) {
				return null;
			}
			await this.client.interruptGetErr(() => this.fileConfigurationManager.ensureConfigurationForDocument(document, token));
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { includeExternalModuleExports: completionConfiguration.autoImportSuggestions, includeInsertTextCompletions: true, triggerCharacter: this.getTsTriggerCharacter(context) });
			let isNewIdentifierLocation = true;
			let isIncomplete = false;
			let isMemberCompletion = false;
			let dotAccessorContext;
			let entries;
			let metadata;
			if (this.client.apiVersion.gte(api_1.default.v300)) {
				const response = await this.client.interruptGetErr(() => this.client.execute('completionInfo', args, token));
				if (response.type !== 'response' || !response.body) {
					return null;
				}
				isNewIdentifierLocation = response.body.isNewIdentifierLocation;
				isMemberCompletion = response.body.isMemberCompletion;
				if (isMemberCompletion) {
					const dotMatch = line.text.slice(0, position.character).match(/\.\s*$/) || undefined;
					if (dotMatch) {
						const range = new vscode.Range(position.translate({ characterDelta: -dotMatch[0].length }), position);
						const text = document.getText(range);
						dotAccessorContext = { range, text };
					}
				}
				isIncomplete = response.metadata && response.metadata.isIncomplete;
				entries = response.body.entries;
				metadata = response.metadata;
			}
			else {
				const response = await this.client.interruptGetErr(() => this.client.execute('completions', args, token));
				if (response.type !== 'response' || !response.body) {
					return null;
				}
				entries = response.body;
				metadata = response.metadata;
			}
			const isInValidCommitCharacterContext = this.isInValidCommitCharacterContext(document, position);
			const items = entries
				.filter(entry => !shouldExcludeCompletionEntry(entry, completionConfiguration))
				.map(entry => new MyCompletionItem(position, document, line.text, entry, completionConfiguration.useCodeSnippetsOnMethodSuggest, {
				isNewIdentifierLocation,
				isMemberCompletion,
				dotAccessorContext,
				isInValidCommitCharacterContext,
				enableCallCompletions: !completionConfiguration.useCodeSnippetsOnMethodSuggest
			}, metadata));
			return new vscode.CompletionList(items, isIncomplete);
		}
		getTsTriggerCharacter(context) {
			// Workaround for https://github.com/Microsoft/TypeScript/issues/27321
			if (context.triggerCharacter === '@'
				&& this.client.apiVersion.gte(api_1.default.v310) && this.client.apiVersion.lt(api_1.default.v320)) {
				return undefined;
			}
			return context.triggerCharacter;
		}
		async resolveCompletionItem(item, token) {
			if (!(item instanceof MyCompletionItem)) {
				return undefined;
			}
			const filepath = this.client.toOpenedFilePath(item.document);
			if (!filepath) {
				return undefined;
			}
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(filepath, item.position), { entryNames: [
					item.tsEntry.source ? { name: item.tsEntry.name, source: item.tsEntry.source } : item.tsEntry.name
				] });
			const response = await this.client.interruptGetErr(() => this.client.execute('completionEntryDetails', args, token));
			if (response.type !== 'response' || !response.body || !response.body.length) {
				return item;
			}
			const detail = response.body[0];
			if (!item.detail && detail.displayParts.length) {
				item.detail = Previewer.plain(detail.displayParts);
			}
			item.documentation = this.getDocumentation(detail, item);
			const codeAction = this.getCodeActions(detail, filepath);
			const commands = [{
					command: CompletionAcceptedCommand.ID,
					title: '',
					arguments: [item]
				}];
			if (codeAction.command) {
				commands.push(codeAction.command);
			}
			item.additionalTextEdits = codeAction.additionalTextEdits;
			if (detail && item.useCodeSnippet) {
				const shouldCompleteFunction = await this.isValidFunctionCompletionContext(filepath, item.position, item.document, token);
				if (shouldCompleteFunction) {
					const { snippet, parameterCount } = snippetForFunctionCall_1.snippetForFunctionCall(item, detail.displayParts);
					item.insertText = snippet;
					if (parameterCount > 0) {
						commands.push({ title: 'triggerParameterHints', command: 'editor.action.triggerParameterHints' });
					}
				}
			}
			if (commands.length) {
				if (commands.length === 1) {
					item.command = commands[0];
				}
				else {
					item.command = {
						command: CompositeCommand.ID,
						title: '',
						arguments: commands
					};
				}
			}
			return item;
		}
		getCodeActions(detail, filepath) {
			if (!detail.codeActions || !detail.codeActions.length) {
				return {};
			}
			// Try to extract out the additionalTextEdits for the current file.
			// Also check if we still have to apply other workspace edits and commands
			// using a vscode command
			const additionalTextEdits = [];
			let hasReaminingCommandsOrEdits = false;
			for (const tsAction of detail.codeActions) {
				if (tsAction.commands) {
					hasReaminingCommandsOrEdits = true;
				}
				// Apply all edits in the current file using `additionalTextEdits`
				if (tsAction.changes) {
					for (const change of tsAction.changes) {
						if (change.fileName === filepath) {
							additionalTextEdits.push(...change.textChanges.map(typeConverters.TextEdit.fromCodeEdit));
						}
						else {
							hasReaminingCommandsOrEdits = true;
						}
					}
				}
			}
			let command = undefined;
			if (hasReaminingCommandsOrEdits) {
				// Create command that applies all edits not in the current file.
				command = {
					title: '',
					command: ApplyCompletionCodeActionCommand.ID,
					arguments: [filepath, detail.codeActions.map((x) => ({
							commands: x.commands,
							description: x.description,
							changes: x.changes.filter(x => x.fileName !== filepath)
						}))]
				};
			}
			return {
				command,
				additionalTextEdits: additionalTextEdits.length ? additionalTextEdits : undefined
			};
		}
		isInValidCommitCharacterContext(document, position) {
			if (this.client.apiVersion.lt(api_1.default.v320)) {
				// Workaround for https://github.com/Microsoft/TypeScript/issues/27742
				// Only enable dot completions when previous character not a dot preceeded by whitespace.
				// Prevents incorrectly completing while typing spread operators.
				if (position.character > 1) {
					const preText = document.getText(new vscode.Range(position.line, 0, position.line, position.character));
					return preText.match(/(\s|^)\.$/ig) === null;
				}
			}
			return true;
		}
		shouldTrigger(context, line, position) {
			if (context.triggerCharacter && this.client.apiVersion.lt(api_1.default.v290)) {
				if ((context.triggerCharacter === '"' || context.triggerCharacter === '\'')) {
					// make sure we are in something that looks like the start of an import
					const pre = line.text.slice(0, position.character);
					if (!pre.match(/\b(from|import)\s*["']$/) && !pre.match(/\b(import|require)\(['"]$/)) {
						return false;
					}
				}
				if (context.triggerCharacter === '/') {
					// make sure we are in something that looks like an import path
					const pre = line.text.slice(0, position.character);
					if (!pre.match(/\b(from|import)\s*["'][^'"]*$/) && !pre.match(/\b(import|require)\(['"][^'"]*$/)) {
						return false;
					}
				}
				if (context.triggerCharacter === '@') {
					// make sure we are in something that looks like the start of a jsdoc comment
					const pre = line.text.slice(0, position.character);
					if (!pre.match(/^\s*\*[ ]?@/) && !pre.match(/\/\*\*+[ ]?@/)) {
						return false;
					}
				}
				if (context.triggerCharacter === '<') {
					return false;
				}
			}
			return true;
		}
		getDocumentation(detail, item) {
			const documentation = new vscode.MarkdownString();
			if (detail.source) {
				const importPath = `'${Previewer.plain(detail.source)}'`;
				const autoImportLabel = localize(3, null, importPath);
				item.detail = `${autoImportLabel}\n${item.detail}`;
			}
			Previewer.addMarkdownDocumentation(documentation, detail.documentation, detail.tags);
			return documentation.value.length ? documentation : undefined;
		}
		async isValidFunctionCompletionContext(filepath, position, document, token) {
			// Workaround for https://github.com/Microsoft/TypeScript/issues/12677
			// Don't complete function calls inside of destructive assigments or imports
			try {
				const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
				const response = await this.client.execute('quickinfo', args, token);
				if (response.type === 'response' && response.body) {
					switch (response.body.kind) {
						case 'var':
						case 'let':
						case 'const':
						case 'alias':
							return false;
					}
				}
			}
			catch (_a) {
				// Noop
			}
			// Don't complete function call if there is already something that looks like a function call
			// https://github.com/Microsoft/vscode/issues/18131
			const after = document.lineAt(position.line).text.slice(position.character);
			return after.match(/^[a-z_$0-9]*\s*\(/gi) === null;
		}
	}
	TypeScriptCompletionItemProvider.triggerCharacters = ['.', '"', '\'', '/', '@', '<'];
	function shouldExcludeCompletionEntry(element, completionConfiguration) {
		return ((!completionConfiguration.nameSuggestions && element.kind === PConst.Kind.warning)
			|| (!completionConfiguration.pathSuggestions &&
				(element.kind === PConst.Kind.directory || element.kind === PConst.Kind.script || element.kind === PConst.Kind.externalModuleName))
			|| (!completionConfiguration.autoImportSuggestions && element.hasAction));
	}
	function register(selector, modeId, client, typingsStatus, fileConfigurationManager, commandManager, onCompletionAccepted) {
		return new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'suggest.enabled', () => vscode.languages.registerCompletionItemProvider(selector, new TypeScriptCompletionItemProvider(client, modeId, typingsStatus, fileConfigurationManager, commandManager, onCompletionAccepted), ...TypeScriptCompletionItemProvider.triggerCharacters));
	}
	exports.register = register;


	/***/ }),
	/* 37 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class Kind {
	}
	Kind.alias = 'alias';
	Kind.callSignature = 'call';
	Kind.class = 'class';
	Kind.const = 'const';
	Kind.constructorImplementation = 'constructor';
	Kind.constructSignature = 'construct';
	Kind.directory = 'directory';
	Kind.enum = 'enum';
	Kind.externalModuleName = 'external module name';
	Kind.function = 'function';
	Kind.indexSignature = 'index';
	Kind.interface = 'interface';
	Kind.keyword = 'keyword';
	Kind.let = 'let';
	Kind.localFunction = 'local function';
	Kind.localVariable = 'local var';
	Kind.memberFunction = 'method';
	Kind.memberGetAccessor = 'getter';
	Kind.memberSetAccessor = 'setter';
	Kind.memberVariable = 'property';
	Kind.module = 'module';
	Kind.primitiveType = 'primitive type';
	Kind.script = 'script';
	Kind.type = 'type';
	Kind.variable = 'var';
	Kind.warning = 'warning';
	Kind.string = 'string';
	Kind.parameter = 'parameter';
	exports.Kind = Kind;
	class DiagnosticCategory {
	}
	DiagnosticCategory.error = 'error';
	DiagnosticCategory.warning = 'warning';
	DiagnosticCategory.suggestion = 'suggestion';
	exports.DiagnosticCategory = DiagnosticCategory;
	class KindModifiers {
	}
	KindModifiers.optional = 'optional';
	KindModifiers.color = 'color';
	KindModifiers.dtsFile = '.d.ts';
	KindModifiers.tsFile = '.ts';
	KindModifiers.tsxFile = '.tsx';
	KindModifiers.jsFile = '.js';
	KindModifiers.jsxFile = '.jsx';
	KindModifiers.jsonFile = '.json';
	KindModifiers.fileExtensionKindModifiers = [
		KindModifiers.dtsFile,
		KindModifiers.tsFile,
		KindModifiers.tsxFile,
		KindModifiers.jsFile,
		KindModifiers.jsxFile,
		KindModifiers.jsonFile,
	];
	exports.KindModifiers = KindModifiers;
	class DisplayPartKind {
	}
	DisplayPartKind.functionName = 'functionName';
	DisplayPartKind.methodName = 'methodName';
	DisplayPartKind.parameterName = 'parameterName';
	DisplayPartKind.propertyName = 'propertyName';
	DisplayPartKind.punctuation = 'punctuation';
	DisplayPartKind.text = 'text';
	exports.DisplayPartKind = DisplayPartKind;


	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const typeConverters = __webpack_require__(39);
	function getEditForCodeAction(client, action) {
		return action.changes && action.changes.length
			? typeConverters.WorkspaceEdit.fromFileCodeEdits(client, action.changes)
			: undefined;
	}
	exports.getEditForCodeAction = getEditForCodeAction;
	async function applyCodeAction(client, action, token) {
		const workspaceEdit = getEditForCodeAction(client, action);
		if (workspaceEdit) {
			if (!(await vscode.workspace.applyEdit(workspaceEdit))) {
				return false;
			}
		}
		return applyCodeActionCommands(client, action.commands, token);
	}
	exports.applyCodeAction = applyCodeAction;
	async function applyCodeActionCommands(client, commands, token) {
		if (commands && commands.length) {
			for (const command of commands) {
				await client.execute('applyCodeActionCommand', { command }, token);
			}
		}
		return true;
	}
	exports.applyCodeActionCommands = applyCodeActionCommands;


	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Helpers for converting FROM vscode types TO ts types
	 */
	const vscode = __webpack_require__(1);
	var Range;
	(function (Range) {
		Range.fromTextSpan = (span) => new vscode.Range(Math.max(0, span.start.line - 1), Math.max(span.start.offset - 1, 0), Math.max(0, span.end.line - 1), Math.max(0, span.end.offset - 1));
		Range.toFileRangeRequestArgs = (file, range) => ({
			file,
			startLine: range.start.line + 1,
			startOffset: range.start.character + 1,
			endLine: range.end.line + 1,
			endOffset: range.end.character + 1
		});
		Range.toFormattingRequestArgs = (file, range) => ({
			file,
			line: range.start.line + 1,
			offset: range.start.character + 1,
			endLine: range.end.line + 1,
			endOffset: range.end.character + 1
		});
	})(Range = exports.Range || (exports.Range = {}));
	var Position;
	(function (Position) {
		Position.fromLocation = (tslocation) => new vscode.Position(tslocation.line - 1, tslocation.offset - 1);
		Position.toLocation = (vsPosition) => ({
			line: vsPosition.line + 1,
			offset: vsPosition.character + 1,
		});
		Position.toFileLocationRequestArgs = (file, position) => ({
			file,
			line: position.line + 1,
			offset: position.character + 1,
		});
	})(Position = exports.Position || (exports.Position = {}));
	var Location;
	(function (Location) {
		Location.fromTextSpan = (resource, tsTextSpan) => new vscode.Location(resource, Range.fromTextSpan(tsTextSpan));
	})(Location = exports.Location || (exports.Location = {}));
	var TextEdit;
	(function (TextEdit) {
		TextEdit.fromCodeEdit = (edit) => new vscode.TextEdit(Range.fromTextSpan(edit), edit.newText);
	})(TextEdit = exports.TextEdit || (exports.TextEdit = {}));
	var WorkspaceEdit;
	(function (WorkspaceEdit) {
		function fromFileCodeEdits(client, edits) {
			return withFileCodeEdits(new vscode.WorkspaceEdit(), client, edits);
		}
		WorkspaceEdit.fromFileCodeEdits = fromFileCodeEdits;
		function withFileCodeEdits(workspaceEdit, client, edits) {
			for (const edit of edits) {
				const resource = client.toResource(edit.fileName);
				for (const textChange of edit.textChanges) {
					workspaceEdit.replace(resource, Range.fromTextSpan(textChange), textChange.newText);
				}
			}
			return workspaceEdit;
		}
		WorkspaceEdit.withFileCodeEdits = withFileCodeEdits;
	})(WorkspaceEdit = exports.WorkspaceEdit || (exports.WorkspaceEdit = {}));


	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const dispose_1 = __webpack_require__(16);
	class ConditionalRegistration {
		constructor(_doRegister) {
			this._doRegister = _doRegister;
			this.registration = undefined;
		}
		dispose() {
			if (this.registration) {
				this.registration.dispose();
				this.registration = undefined;
			}
		}
		update(enabled) {
			if (enabled) {
				if (!this.registration) {
					this.registration = this._doRegister();
				}
			}
			else {
				if (this.registration) {
					this.registration.dispose();
					this.registration = undefined;
				}
			}
		}
	}
	exports.ConditionalRegistration = ConditionalRegistration;
	class VersionDependentRegistration extends dispose_1.Disposable {
		constructor(client, minVersion, register) {
			super();
			this.client = client;
			this.minVersion = minVersion;
			this._registration = new ConditionalRegistration(register);
			this.update(client.apiVersion);
			this.client.onTsServerStarted(() => {
				this.update(this.client.apiVersion);
			}, null, this._disposables);
		}
		dispose() {
			super.dispose();
			this._registration.dispose();
		}
		update(api) {
			this._registration.update(api.gte(this.minVersion));
		}
	}
	exports.VersionDependentRegistration = VersionDependentRegistration;
	class ConfigurationDependentRegistration extends dispose_1.Disposable {
		constructor(language, configValue, register) {
			super();
			this.language = language;
			this.configValue = configValue;
			this._registration = new ConditionalRegistration(register);
			this.update();
			vscode.workspace.onDidChangeConfiguration(this.update, this, this._disposables);
		}
		dispose() {
			super.dispose();
			this._registration.dispose();
		}
		update() {
			const config = vscode.workspace.getConfiguration(this.language, null);
			this._registration.update(!!config.get(this.configValue));
		}
	}
	exports.ConfigurationDependentRegistration = ConfigurationDependentRegistration;


	/***/ }),
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	function getTagBodyText(tag) {
		if (!tag.text) {
			return undefined;
		}
		switch (tag.name) {
			case 'example':
			case 'default':
				// Convert to markdown code block if it not already one
				if (tag.text.match(/^\s*[~`]{3}/g)) {
					return tag.text;
				}
				return '```\n' + tag.text + '\n```';
		}
		return tag.text;
	}
	function getTagDocumentation(tag) {
		switch (tag.name) {
			case 'param':
				const body = (tag.text || '').split(/^([\w\.]+)\s*-?\s*/);
				if (body && body.length === 3) {
					const param = body[1];
					const doc = body[2];
					const label = `*@${tag.name}* \`${param}\``;
					if (!doc) {
						return label;
					}
					return label + (doc.match(/\r\n|\n/g) ? '  \n' + doc : ` — ${doc}`);
				}
		}
		// Generic tag
		const label = `*@${tag.name}*`;
		const text = getTagBodyText(tag);
		if (!text) {
			return label;
		}
		return label + (text.match(/\r\n|\n/g) ? '  \n' + text : ` — ${text}`);
	}
	function plain(parts) {
		if (!parts) {
			return '';
		}
		return parts.map(part => part.text).join('');
	}
	exports.plain = plain;
	function tagsMarkdownPreview(tags) {
		return (tags || [])
			.map(getTagDocumentation)
			.join('  \n\n');
	}
	exports.tagsMarkdownPreview = tagsMarkdownPreview;
	function markdownDocumentation(documentation, tags) {
		const out = new vscode.MarkdownString();
		addMarkdownDocumentation(out, documentation, tags);
		return out;
	}
	exports.markdownDocumentation = markdownDocumentation;
	function addMarkdownDocumentation(out, documentation, tags) {
		if (documentation) {
			out.appendMarkdown(plain(documentation));
		}
		if (tags) {
			const tagsPreview = tagsMarkdownPreview(tags);
			if (tagsPreview) {
				out.appendMarkdown('\n\n' + tagsPreview);
			}
		}
		return out;
	}
	exports.addMarkdownDocumentation = addMarkdownDocumentation;


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const PConst = __webpack_require__(37);
	function snippetForFunctionCall(item, displayParts) {
		if (item.insertText && typeof item.insertText !== 'string') {
			return { snippet: item.insertText, parameterCount: 0 };
		}
		const parameterListParts = getParameterListParts(displayParts);
		const snippet = new vscode.SnippetString();
		snippet.appendText(`${item.insertText || item.label}(`);
		appendJoinedPlaceholders(snippet, parameterListParts.parts, ', ');
		if (parameterListParts.hasOptionalParameters) {
			snippet.appendTabstop();
		}
		snippet.appendText(')');
		snippet.appendTabstop(0);
		return { snippet, parameterCount: parameterListParts.parts.length + (parameterListParts.hasOptionalParameters ? 1 : 0) };
	}
	exports.snippetForFunctionCall = snippetForFunctionCall;
	function appendJoinedPlaceholders(snippet, parts, joiner) {
		for (let i = 0; i < parts.length; ++i) {
			const paramterPart = parts[i];
			snippet.appendPlaceholder(paramterPart.text);
			if (i !== parts.length - 1) {
				snippet.appendText(joiner);
			}
		}
	}
	function getParameterListParts(displayParts) {
		const parts = [];
		let isInMethod = false;
		let hasOptionalParameters = false;
		let parenCount = 0;
		let braceCount = 0;
		outer: for (let i = 0; i < displayParts.length; ++i) {
			const part = displayParts[i];
			switch (part.kind) {
				case PConst.DisplayPartKind.methodName:
				case PConst.DisplayPartKind.functionName:
				case PConst.DisplayPartKind.text:
				case PConst.DisplayPartKind.propertyName:
					if (parenCount === 0 && braceCount === 0) {
						isInMethod = true;
					}
					break;
				case PConst.DisplayPartKind.parameterName:
					if (parenCount === 1 && braceCount === 0 && isInMethod) {
						// Only take top level paren names
						const next = displayParts[i + 1];
						// Skip optional parameters
						const nameIsFollowedByOptionalIndicator = next && next.text === '?';
						if (!nameIsFollowedByOptionalIndicator) {
							parts.push(part);
						}
						hasOptionalParameters = hasOptionalParameters || nameIsFollowedByOptionalIndicator;
					}
					break;
				case PConst.DisplayPartKind.punctuation:
					if (part.text === '(') {
						++parenCount;
					}
					else if (part.text === ')') {
						--parenCount;
						if (parenCount <= 0 && isInMethod) {
							break outer;
						}
					}
					else if (part.text === '...' && parenCount === 1) {
						// Found rest parmeter. Do not fill in any further arguments
						hasOptionalParameters = true;
						break outer;
					}
					else if (part.text === '{') {
						++braceCount;
					}
					else if (part.text === '}') {
						--braceCount;
					}
					break;
			}
		}
		return { hasOptionalParameters, parts };
	}


	/***/ }),
	/* 43 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const typeConverters = __webpack_require__(39);
	const definitionProviderBase_1 = __webpack_require__(44);
	class TypeScriptDefinitionProvider extends definitionProviderBase_1.default {
		constructor(client) {
			super(client);
		}
		async provideDefinition(document, position, token) {
			if (this.client.apiVersion.gte(api_1.default.v270)) {
				const filepath = this.client.toOpenedFilePath(document);
				if (!filepath) {
					return undefined;
				}
				const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
				const response = await this.client.execute('definitionAndBoundSpan', args, token);
				if (response.type !== 'response' || !response.body) {
					return undefined;
				}
				const span = response.body.textSpan ? typeConverters.Range.fromTextSpan(response.body.textSpan) : undefined;
				return response.body.definitions
					.map((location) => {
					const target = typeConverters.Location.fromTextSpan(this.client.toResource(location.file), location);
					return {
						originSelectionRange: span,
						targetRange: target.range,
						targetUri: target.uri,
					};
				});
			}
			return this.getSymbolLocations('definition', document, position, token);
		}
	}
	exports.default = TypeScriptDefinitionProvider;
	function register(selector, client) {
		return vscode.languages.registerDefinitionProvider(selector, new TypeScriptDefinitionProvider(client));
	}
	exports.register = register;


	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const typeConverters = __webpack_require__(39);
	class TypeScriptDefinitionProviderBase {
		constructor(client) {
			this.client = client;
		}
		async getSymbolLocations(definitionType, document, position, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			const args = typeConverters.Position.toFileLocationRequestArgs(file, position);
			const response = await this.client.execute(definitionType, args, token);
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			return response.body.map(location => typeConverters.Location.fromTextSpan(this.client.toResource(location.file), location));
		}
	}
	exports.default = TypeScriptDefinitionProviderBase;


	/***/ }),
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/directiveCommentCompletions.ts'));
	const directives = [
		{
			value: '@ts-check',
			description: localize(0, null)
		}, {
			value: '@ts-nocheck',
			description: localize(1, null)
		}, {
			value: '@ts-ignore',
			description: localize(2, null)
		}
	];
	class DirectiveCommentCompletionProvider {
		constructor(client) {
			this.client = client;
		}
		provideCompletionItems(document, position, _token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return [];
			}
			const line = document.lineAt(position.line).text;
			const prefix = line.slice(0, position.character);
			const match = prefix.match(/^\s*\/\/+\s?(@[a-zA-Z\-]*)?$/);
			if (match) {
				return directives.map(directive => {
					const item = new vscode.CompletionItem(directive.value, vscode.CompletionItemKind.Snippet);
					item.detail = directive.description;
					item.range = new vscode.Range(position.line, Math.max(0, position.character - (match[1] ? match[1].length : 0)), position.line, position.character);
					return item;
				});
			}
			return [];
		}
	}
	function register(selector, client) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v230, () => {
			return vscode.languages.registerCompletionItemProvider(selector, new DirectiveCommentCompletionProvider(client), '@');
		});
	}
	exports.register = register;


	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const arrays_1 = __webpack_require__(47);
	const typeConverters = __webpack_require__(39);
	class TypeScriptDocumentHighlightProvider {
		constructor(client) {
			this.client = client;
		}
		async provideDocumentHighlights(document, position, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return [];
			}
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { filesToSearch: [file] });
			const response = await this.client.execute('documentHighlights', args, token);
			if (response.type !== 'response' || !response.body) {
				return [];
			}
			return arrays_1.flatten(response.body
				.filter(highlight => highlight.file === file)
				.map(convertDocumentHighlight));
		}
	}
	function convertDocumentHighlight(highlight) {
		return highlight.highlightSpans.map(span => new vscode.DocumentHighlight(typeConverters.Range.fromTextSpan(span), span.kind === 'writtenReference' ? vscode.DocumentHighlightKind.Write : vscode.DocumentHighlightKind.Read));
	}
	function register(selector, client) {
		return vscode.languages.registerDocumentHighlightProvider(selector, new TypeScriptDocumentHighlightProvider(client));
	}
	exports.register = register;


	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	function equals(one, other, itemEquals = (a, b) => a === b) {
		if (one.length !== other.length) {
			return false;
		}
		for (let i = 0, len = one.length; i < len; i++) {
			if (!itemEquals(one[i], other[i])) {
				return false;
			}
		}
		return true;
	}
	exports.equals = equals;
	function flatten(arr) {
		return [].concat.apply([], arr);
	}
	exports.flatten = flatten;


	/***/ }),
	/* 48 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const PConst = __webpack_require__(37);
	const typeConverters = __webpack_require__(39);
	const getSymbolKind = (kind) => {
		switch (kind) {
			case PConst.Kind.module: return vscode.SymbolKind.Module;
			case PConst.Kind.class: return vscode.SymbolKind.Class;
			case PConst.Kind.enum: return vscode.SymbolKind.Enum;
			case PConst.Kind.interface: return vscode.SymbolKind.Interface;
			case PConst.Kind.memberFunction: return vscode.SymbolKind.Method;
			case PConst.Kind.memberVariable: return vscode.SymbolKind.Property;
			case PConst.Kind.memberGetAccessor: return vscode.SymbolKind.Property;
			case PConst.Kind.memberSetAccessor: return vscode.SymbolKind.Property;
			case PConst.Kind.variable: return vscode.SymbolKind.Variable;
			case PConst.Kind.const: return vscode.SymbolKind.Variable;
			case PConst.Kind.localVariable: return vscode.SymbolKind.Variable;
			case PConst.Kind.function: return vscode.SymbolKind.Function;
			case PConst.Kind.localFunction: return vscode.SymbolKind.Function;
		}
		return vscode.SymbolKind.Variable;
	};
	class TypeScriptDocumentSymbolProvider {
		constructor(client, cachedResponse) {
			this.client = client;
			this.cachedResponse = cachedResponse;
		}
		async provideDocumentSymbols(document, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			const args = { file };
			const response = await this.cachedResponse.execute(document, () => this.client.execute('navtree', args, token));
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			let tree = response.body;
			if (tree && tree.childItems) {
				// The root represents the file. Ignore this when showing in the UI
				const result = [];
				tree.childItems.forEach(item => TypeScriptDocumentSymbolProvider.convertNavTree(document.uri, result, item));
				return result;
			}
			return undefined;
		}
		static convertNavTree(resource, bucket, item) {
			let shouldInclude = TypeScriptDocumentSymbolProvider.shouldInclueEntry(item);
			const children = new Set(item.childItems || []);
			for (const span of item.spans) {
				const range = typeConverters.Range.fromTextSpan(span);
				const symbolInfo = new vscode.DocumentSymbol(item.text, '', getSymbolKind(item.kind), range, range);
				for (const child of children) {
					if (child.spans.some(span => !!range.intersection(typeConverters.Range.fromTextSpan(span)))) {
						const includedChild = TypeScriptDocumentSymbolProvider.convertNavTree(resource, symbolInfo.children, child);
						shouldInclude = shouldInclude || includedChild;
						children.delete(child);
					}
				}
				if (shouldInclude) {
					bucket.push(symbolInfo);
				}
			}
			return shouldInclude;
		}
		static shouldInclueEntry(item) {
			if (item.kind === PConst.Kind.alias) {
				return false;
			}
			return !!(item.text && item.text !== '<function>' && item.text !== '<class>');
		}
	}
	function register(selector, client, cachedResponse) {
		return vscode.languages.registerDocumentSymbolProvider(selector, new TypeScriptDocumentSymbolProvider(client, cachedResponse), { label: 'TypeScript' });
	}
	exports.register = register;


	/***/ }),
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	class TypeScriptFoldingProvider {
		constructor(client) {
			this.client = client;
		}
		async provideFoldingRanges(document, _context, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return;
			}
			const args = { file };
			const response = await this.client.execute('getOutliningSpans', args, token);
			if (response.type !== 'response' || !response.body) {
				return;
			}
			return response.body
				.map(span => this.convertOutliningSpan(span, document))
				.filter(foldingRange => !!foldingRange);
		}
		convertOutliningSpan(span, document) {
			const range = typeConverters.Range.fromTextSpan(span.textSpan);
			const kind = TypeScriptFoldingProvider.getFoldingRangeKind(span);
			// Workaround for #49904
			if (span.kind === 'comment') {
				const line = document.lineAt(range.start.line).text;
				if (line.match(/\/\/\s*#endregion/gi)) {
					return undefined;
				}
			}
			const start = range.start.line;
			// workaround for #47240
			const end = (range.end.character > 0 && document.getText(new vscode.Range(range.end.translate(0, -1), range.end)) === '}')
				? Math.max(range.end.line - 1, range.start.line)
				: range.end.line;
			return new vscode.FoldingRange(start, end, kind);
		}
		static getFoldingRangeKind(span) {
			switch (span.kind) {
				case 'comment': return vscode.FoldingRangeKind.Comment;
				case 'region': return vscode.FoldingRangeKind.Region;
				case 'imports': return vscode.FoldingRangeKind.Imports;
				case 'code':
				default: return undefined;
			}
		}
	}
	function register(selector, client) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v280, () => {
			return vscode.languages.registerFoldingRangeProvider(selector, new TypeScriptFoldingProvider(client));
		});
	}
	exports.register = register;


	/***/ }),
	/* 50 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	class TypeScriptFormattingProvider {
		constructor(client, formattingOptionsManager) {
			this.client = client;
			this.formattingOptionsManager = formattingOptionsManager;
		}
		async provideDocumentRangeFormattingEdits(document, range, options, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			await this.formattingOptionsManager.ensureConfigurationOptions(document, options, token);
			const args = typeConverters.Range.toFormattingRequestArgs(file, range);
			const response = await this.client.execute('format', args, token);
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			return response.body.map(typeConverters.TextEdit.fromCodeEdit);
		}
		async provideOnTypeFormattingEdits(document, position, ch, options, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return [];
			}
			await this.formattingOptionsManager.ensureConfigurationOptions(document, options, token);
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { key: ch });
			const response = await this.client.execute('formatonkey', args, token);
			if (response.type !== 'response' || !response.body) {
				return [];
			}
			const edits = response.body;
			const result = [];
			if (!edits) {
				return result;
			}
			for (const edit of edits) {
				const textEdit = typeConverters.TextEdit.fromCodeEdit(edit);
				const range = textEdit.range;
				// Work around for https://github.com/Microsoft/TypeScript/issues/6700.
				// Check if we have an edit at the beginning of the line which only removes white spaces and leaves
				// an empty line. Drop those edits
				if (range.start.character === 0 && range.start.line === range.end.line && textEdit.newText === '') {
					const lText = document.lineAt(range.start.line).text;
					// If the edit leaves something on the line keep the edit (note that the end character is exclusive).
					// Keep it also if it removes something else than whitespace
					if (lText.trim().length > 0 || lText.length > range.end.character) {
						result.push(textEdit);
					}
				}
				else {
					result.push(textEdit);
				}
			}
			return result;
		}
	}
	function register(selector, modeId, client, fileConfigurationManager) {
		return new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'format.enable', () => {
			const formattingProvider = new TypeScriptFormattingProvider(client, fileConfigurationManager);
			return vscode.Disposable.from(vscode.languages.registerOnTypeFormattingEditProvider(selector, formattingProvider, ';', '}', '\n'), vscode.languages.registerDocumentRangeFormattingEditProvider(selector, formattingProvider));
		});
	}
	exports.register = register;


	/***/ }),
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const previewer_1 = __webpack_require__(41);
	const typeConverters = __webpack_require__(39);
	class TypeScriptHoverProvider {
		constructor(client) {
			this.client = client;
		}
		async provideHover(document, position, token) {
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return undefined;
			}
			const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
			const response = await this.client.interruptGetErr(() => this.client.execute('quickinfo', args, token));
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			return new vscode.Hover(TypeScriptHoverProvider.getContents(response.body), typeConverters.Range.fromTextSpan(response.body));
		}
		static getContents(data) {
			const parts = [];
			if (data.displayString) {
				parts.push({ language: 'typescript', value: data.displayString });
			}
			const tags = previewer_1.tagsMarkdownPreview(data.tags);
			parts.push(data.documentation + (tags ? '\n\n' + tags : ''));
			return parts;
		}
	}
	function register(selector, client) {
		return vscode.languages.registerHoverProvider(selector, new TypeScriptHoverProvider(client));
	}
	exports.register = register;


	/***/ }),
	/* 52 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const definitionProviderBase_1 = __webpack_require__(44);
	class TypeScriptImplementationProvider extends definitionProviderBase_1.default {
		provideImplementation(document, position, token) {
			return this.getSymbolLocations('implementation', document, position, token);
		}
	}
	function register(selector, client) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v220, () => {
			return vscode.languages.registerImplementationProvider(selector, new TypeScriptImplementationProvider(client));
		});
	}
	exports.register = register;


	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const PConst = __webpack_require__(37);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const baseCodeLensProvider_1 = __webpack_require__(54);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/implementationsCodeLens.ts'));
	class TypeScriptImplementationsCodeLensProvider extends baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider {
		async resolveCodeLens(inputCodeLens, token) {
			const codeLens = inputCodeLens;
			const args = typeConverters.Position.toFileLocationRequestArgs(codeLens.file, codeLens.range.start);
			const response = await this.client.execute('implementation', args, token, /* lowPriority */ true);
			if (response.type !== 'response' || !response.body) {
				codeLens.command = response.type === 'cancelled'
					? baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider.cancelledCommand
					: baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider.errorCommand;
				return codeLens;
			}
			const locations = response.body
				.map(reference =>
			// Only take first line on implementation: https://github.com/Microsoft/vscode/issues/23924
			new vscode.Location(this.client.toResource(reference.file), reference.start.line === reference.end.line
				? typeConverters.Range.fromTextSpan(reference)
				: new vscode.Range(typeConverters.Position.fromLocation(reference.start), new vscode.Position(reference.start.line, 0))))
				// Exclude original from implementations
				.filter(location => !(location.uri.toString() === codeLens.document.toString() &&
				location.range.start.line === codeLens.range.start.line &&
				location.range.start.character === codeLens.range.start.character));
			codeLens.command = this.getCommand(locations, codeLens);
			return codeLens;
		}
		getCommand(locations, codeLens) {
			return {
				title: this.getTitle(locations),
				command: locations.length ? 'editor.action.showReferences' : '',
				arguments: [codeLens.document, codeLens.range.start, locations]
			};
		}
		getTitle(locations) {
			return locations.length === 1
				? localize(0, null)
				: localize(1, null, locations.length);
		}
		extractSymbol(document, item, _parent) {
			switch (item.kind) {
				case PConst.Kind.interface:
					return baseCodeLensProvider_1.getSymbolRange(document, item);
				case PConst.Kind.class:
				case PConst.Kind.memberFunction:
				case PConst.Kind.memberVariable:
				case PConst.Kind.memberGetAccessor:
				case PConst.Kind.memberSetAccessor:
					if (item.kindModifiers.match(/\babstract\b/g)) {
						return baseCodeLensProvider_1.getSymbolRange(document, item);
					}
					break;
			}
			return null;
		}
	}
	exports.default = TypeScriptImplementationsCodeLensProvider;
	function register(selector, modeId, client, cachedResponse) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v220, () => new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'implementationsCodeLens.enabled', () => {
			return vscode.languages.registerCodeLensProvider(selector, new TypeScriptImplementationsCodeLensProvider(client, cachedResponse));
		}));
	}
	exports.register = register;


	/***/ }),
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const regexp_1 = __webpack_require__(55);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/baseCodeLensProvider.ts'));
	class ReferencesCodeLens extends vscode.CodeLens {
		constructor(document, file, range) {
			super(range);
			this.document = document;
			this.file = file;
		}
	}
	exports.ReferencesCodeLens = ReferencesCodeLens;
	class TypeScriptBaseCodeLensProvider {
		constructor(client, cachedResponse) {
			this.client = client;
			this.cachedResponse = cachedResponse;
			this.onDidChangeCodeLensesEmitter = new vscode.EventEmitter();
		}
		get onDidChangeCodeLenses() {
			return this.onDidChangeCodeLensesEmitter.event;
		}
		async provideCodeLenses(document, token) {
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return [];
			}
			const response = await this.cachedResponse.execute(document, () => this.client.execute('navtree', { file: filepath }, token));
			if (response.type !== 'response') {
				return [];
			}
			const tree = response.body;
			const referenceableSpans = [];
			if (tree && tree.childItems) {
				tree.childItems.forEach(item => this.walkNavTree(document, item, null, referenceableSpans));
			}
			return referenceableSpans.map(span => new ReferencesCodeLens(document.uri, filepath, span));
		}
		walkNavTree(document, item, parent, results) {
			if (!item) {
				return;
			}
			const range = this.extractSymbol(document, item, parent);
			if (range) {
				results.push(range);
			}
			(item.childItems || []).forEach(child => this.walkNavTree(document, child, item, results));
		}
	}
	TypeScriptBaseCodeLensProvider.cancelledCommand = {
		// Cancellation is not an error. Just show nothing until we can properly re-compute the code lens
		title: '',
		command: ''
	};
	TypeScriptBaseCodeLensProvider.errorCommand = {
		title: localize(0, null),
		command: ''
	};
	exports.TypeScriptBaseCodeLensProvider = TypeScriptBaseCodeLensProvider;
	function getSymbolRange(document, item) {
		// TS 3.0+ provides a span for just the symbol
		if (item.nameSpan) {
			return typeConverters.Range.fromTextSpan(item.nameSpan);
		}
		// In older versions, we have to calculate this manually. See #23924
		const span = item.spans && item.spans[0];
		if (!span) {
			return null;
		}
		const range = typeConverters.Range.fromTextSpan(span);
		const text = document.getText(range);
		const identifierMatch = new RegExp(`^(.*?(\\b|\\W))${regexp_1.escapeRegExp(item.text || '')}(\\b|\\W)`, 'gm');
		const match = identifierMatch.exec(text);
		const prefixLength = match ? match.index + match[1].length : 0;
		const startOffset = document.offsetAt(new vscode.Position(range.start.line, range.start.character)) + prefixLength;
		return new vscode.Range(document.positionAt(startOffset), document.positionAt(startOffset + item.text.length));
	}
	exports.getSymbolRange = getSymbolRange;


	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	function escapeRegExp(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}
	exports.escapeRegExp = escapeRegExp;


	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/jsDocCompletions.ts'));
	const defaultJsDoc = new vscode.SnippetString(`/**\n * $0\n */`);
	class JsDocCompletionItem extends vscode.CompletionItem {
		constructor(document, position) {
			super('/** */', vscode.CompletionItemKind.Snippet);
			this.document = document;
			this.position = position;
			this.detail = localize(0, null);
			this.sortText = '\0';
			const line = document.lineAt(position.line).text;
			const prefix = line.slice(0, position.character).match(/\/\**\s*$/);
			const suffix = line.slice(position.character).match(/^\s*\**\//);
			const start = position.translate(0, prefix ? -prefix[0].length : 0);
			this.range = new vscode.Range(start, position.translate(0, suffix ? suffix[0].length : 0));
		}
	}
	class JsDocCompletionProvider {
		constructor(client) {
			this.client = client;
		}
		async provideCompletionItems(document, position, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			if (!this.isPotentiallyValidDocCompletionPosition(document, position)) {
				return undefined;
			}
			const args = typeConverters.Position.toFileLocationRequestArgs(file, position);
			const response = await this.client.execute('docCommentTemplate', args, token);
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			const item = new JsDocCompletionItem(document, position);
			// Workaround for #43619
			// docCommentTemplate previously returned undefined for empty jsdoc templates.
			// TS 2.7 now returns a single line doc comment, which breaks indentation.
			if (response.body.newText === '/** */') {
				item.insertText = defaultJsDoc;
			}
			else {
				item.insertText = templateToSnippet(response.body.newText);
			}
			return [item];
		}
		isPotentiallyValidDocCompletionPosition(document, position) {
			// Only show the JSdoc completion when the everything before the cursor is whitespace
			// or could be the opening of a comment
			const line = document.lineAt(position.line).text;
			const prefix = line.slice(0, position.character);
			if (prefix.match(/^\s*$|\/\*\*\s*$|^\s*\/\*\*+\s*$/) === null) {
				return false;
			}
			// And everything after is possibly a closing comment or more whitespace
			const suffix = line.slice(position.character);
			return suffix.match(/^\s*\*+\//) !== null;
		}
	}
	function templateToSnippet(template) {
		// TODO: use append placeholder
		let snippetIndex = 1;
		template = template.replace(/\$/g, '\\$');
		template = template.replace(/^\s*(?=(\/|[ ]\*))/gm, '');
		template = template.replace(/^(\/\*\*\s*\*[ ]*)$/m, (x) => x + `\$0`);
		template = template.replace(/\* @param([ ]\{\S+\})?\s+(\S+)\s*$/gm, (_param, type, post) => {
			let out = '* @param ';
			if (type === ' {any}' || type === ' {*}') {
				out += `{\$\{${snippetIndex++}:*\}} `;
			}
			else if (type) {
				out += type + ' ';
			}
			out += post + ` \${${snippetIndex++}}`;
			return out;
		});
		return new vscode.SnippetString(template);
	}
	exports.templateToSnippet = templateToSnippet;
	function register(selector, modeId, client) {
		return new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'suggest.completeJSDocs', () => {
			return vscode.languages.registerCompletionItemProvider(selector, new JsDocCompletionProvider(client), '*');
		});
	}
	exports.register = register;


	/***/ }),
	/* 57 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeconverts = __webpack_require__(39);
	const cancellation_1 = __webpack_require__(9);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/organizeImports.ts'));
	class OrganizeImportsCommand {
		constructor(client, telemetryReporter) {
			this.client = client;
			this.telemetryReporter = telemetryReporter;
			this.id = OrganizeImportsCommand.Id;
		}
		async execute(file) {
			/* __GDPR__
				"organizeImports.execute" : {
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			this.telemetryReporter.logTelemetry('organizeImports.execute', {});
			const args = {
				scope: {
					type: 'file',
					args: {
						file
					}
				}
			};
			const response = await this.client.execute('organizeImports', args, cancellation_1.nulToken);
			if (response.type !== 'response' || !response.body) {
				return false;
			}
			const edits = typeconverts.WorkspaceEdit.fromFileCodeEdits(this.client, response.body);
			return vscode.workspace.applyEdit(edits);
		}
	}
	OrganizeImportsCommand.Id = '_typescript.organizeImports';
	class OrganizeImportsCodeActionProvider {
		constructor(client, commandManager, fileConfigManager, telemetryReporter) {
			this.client = client;
			this.fileConfigManager = fileConfigManager;
			this.metadata = {
				providedCodeActionKinds: [vscode.CodeActionKind.SourceOrganizeImports]
			};
			commandManager.register(new OrganizeImportsCommand(client, telemetryReporter));
		}
		provideCodeActions(document, _range, context, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return [];
			}
			if (!context.only || !context.only.contains(vscode.CodeActionKind.SourceOrganizeImports)) {
				return [];
			}
			this.fileConfigManager.ensureConfigurationForDocument(document, token);
			const action = new vscode.CodeAction(localize(0, null), vscode.CodeActionKind.SourceOrganizeImports);
			action.command = { title: '', command: OrganizeImportsCommand.Id, arguments: [file] };
			return [action];
		}
	}
	exports.OrganizeImportsCodeActionProvider = OrganizeImportsCodeActionProvider;
	function register(selector, client, commandManager, fileConfigurationManager, telemetryReporter) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v280, () => {
			const organizeImportsProvider = new OrganizeImportsCodeActionProvider(client, commandManager, fileConfigurationManager, telemetryReporter);
			return vscode.languages.registerCodeActionsProvider(selector, organizeImportsProvider, organizeImportsProvider.metadata);
		});
	}
	exports.register = register;


	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const cancellation_1 = __webpack_require__(9);
	const codeAction_1 = __webpack_require__(38);
	const dependentRegistration_1 = __webpack_require__(40);
	const memoize_1 = __webpack_require__(30);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/quickFix.ts'));
	class ApplyCodeActionCommand {
		constructor(client, telemetryReporter) {
			this.client = client;
			this.telemetryReporter = telemetryReporter;
			this.id = ApplyCodeActionCommand.ID;
		}
		async execute(action) {
			/* __GDPR__
				"quickFix.execute" : {
					"fixName" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" },
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			this.telemetryReporter.logTelemetry('quickFix.execute', {
				fixName: action.fixName
			});
			return codeAction_1.applyCodeActionCommands(this.client, action.commands, cancellation_1.nulToken);
		}
	}
	ApplyCodeActionCommand.ID = '_typescript.applyCodeActionCommand';
	class ApplyFixAllCodeAction {
		constructor(client, telemetryReporter) {
			this.client = client;
			this.telemetryReporter = telemetryReporter;
			this.id = ApplyFixAllCodeAction.ID;
		}
		async execute(file, tsAction) {
			if (!tsAction.fixId) {
				return;
			}
			/* __GDPR__
				"quickFixAll.execute" : {
					"fixName" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" },
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			this.telemetryReporter.logTelemetry('quickFixAll.execute', {
				fixName: tsAction.fixName
			});
			const args = {
				scope: {
					type: 'file',
					args: { file }
				},
				fixId: tsAction.fixId,
			};
			const response = await this.client.execute('getCombinedCodeFix', args, cancellation_1.nulToken);
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			const edit = typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, response.body.changes);
			await vscode.workspace.applyEdit(edit);
			await codeAction_1.applyCodeActionCommands(this.client, response.body.commands, cancellation_1.nulToken);
		}
	}
	ApplyFixAllCodeAction.ID = '_typescript.applyFixAllCodeAction';
	/**
	 * Unique set of diagnostics keyed on diagnostic range and error code.
	 */
	class DiagnosticsSet {
		constructor(_values) {
			this._values = _values;
		}
		static from(diagnostics) {
			const values = new Map();
			for (const diagnostic of diagnostics) {
				values.set(DiagnosticsSet.key(diagnostic), diagnostic);
			}
			return new DiagnosticsSet(values);
		}
		static key(diagnostic) {
			const { start, end } = diagnostic.range;
			return `${diagnostic.code}-${start.line},${start.character}-${end.line},${end.character}`;
		}
		get values() {
			return this._values.values();
		}
		get size() {
			return this._values.size;
		}
	}
	class CodeActionSet {
		constructor() {
			this._actions = new Set();
			this._fixAllActions = new Map();
		}
		get values() {
			return this._actions;
		}
		addAction(action) {
			this._actions.add(action);
		}
		addFixAllAction(fixId, action) {
			const existing = this._fixAllActions.get(fixId);
			if (existing) {
				// reinsert action at back of actions list
				this._actions.delete(existing);
			}
			this.addAction(action);
			this._fixAllActions.set(fixId, action);
		}
		hasFixAllAction(fixId) {
			return this._fixAllActions.has(fixId);
		}
	}
	class SupportedCodeActionProvider {
		constructor(client) {
			this.client = client;
		}
		async getFixableDiagnosticsForContext(context) {
			const fixableCodes = await this.fixableDiagnosticCodes;
			return DiagnosticsSet.from(context.diagnostics.filter(diagnostic => typeof diagnostic.code !== 'undefined' && fixableCodes.has(diagnostic.code + '')));
		}
		get fixableDiagnosticCodes() {
			return this.client.execute('getSupportedCodeFixes', null, cancellation_1.nulToken)
				.then(response => response.type === 'response' ? response.body || [] : [])
				.then(codes => new Set(codes));
		}
	}
	__decorate([
		memoize_1.memoize
	], SupportedCodeActionProvider.prototype, "fixableDiagnosticCodes", null);
	class TypeScriptQuickFixProvider {
		constructor(client, formattingConfigurationManager, commandManager, diagnosticsManager, telemetryReporter) {
			this.client = client;
			this.formattingConfigurationManager = formattingConfigurationManager;
			this.diagnosticsManager = diagnosticsManager;
			commandManager.register(new ApplyCodeActionCommand(client, telemetryReporter));
			commandManager.register(new ApplyFixAllCodeAction(client, telemetryReporter));
			this.supportedCodeActionProvider = new SupportedCodeActionProvider(client);
		}
		async provideCodeActions(document, _range, context, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return [];
			}
			const fixableDiagnostics = await this.supportedCodeActionProvider.getFixableDiagnosticsForContext(context);
			if (!fixableDiagnostics.size) {
				return [];
			}
			if (this.client.bufferSyncSupport.hasPendingDiagnostics(document.uri)) {
				return [];
			}
			await this.formattingConfigurationManager.ensureConfigurationForDocument(document, token);
			const results = new CodeActionSet();
			for (const diagnostic of fixableDiagnostics.values) {
				await this.getFixesForDiagnostic(document, file, diagnostic, results, token);
			}
			return Array.from(results.values);
		}
		async getFixesForDiagnostic(document, file, diagnostic, results, token) {
			const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, diagnostic.range), { errorCodes: [+(diagnostic.code)] });
			const response = await this.client.execute('getCodeFixes', args, token);
			if (response.type !== 'response' || !response.body) {
				return results;
			}
			for (const tsCodeFix of response.body) {
				this.addAllFixesForTsCodeAction(results, document, file, diagnostic, tsCodeFix);
			}
			return results;
		}
		addAllFixesForTsCodeAction(results, document, file, diagnostic, tsAction) {
			results.addAction(this.getSingleFixForTsCodeAction(diagnostic, tsAction));
			this.addFixAllForTsCodeAction(results, document, file, diagnostic, tsAction);
			return results;
		}
		getSingleFixForTsCodeAction(diagnostic, tsAction) {
			const codeAction = new vscode.CodeAction(tsAction.description, vscode.CodeActionKind.QuickFix);
			codeAction.edit = codeAction_1.getEditForCodeAction(this.client, tsAction);
			codeAction.diagnostics = [diagnostic];
			codeAction.command = {
				command: ApplyCodeActionCommand.ID,
				arguments: [tsAction],
				title: ''
			};
			codeAction.isPreferred = isPreferredFix(tsAction);
			return codeAction;
		}
		addFixAllForTsCodeAction(results, document, file, diagnostic, tsAction) {
			if (!tsAction.fixId || this.client.apiVersion.lt(api_1.default.v270) || results.hasFixAllAction(tsAction.fixId)) {
				return results;
			}
			// Make sure there are multiple diagnostics of the same type in the file
			if (!this.diagnosticsManager.getDiagnostics(document.uri).some(x => x.code === diagnostic.code && x !== diagnostic)) {
				return results;
			}
			const action = new vscode.CodeAction(tsAction.fixAllDescription || localize(0, null, tsAction.description), vscode.CodeActionKind.QuickFix);
			action.diagnostics = [diagnostic];
			action.command = {
				command: ApplyFixAllCodeAction.ID,
				arguments: [file, tsAction],
				title: ''
			};
			results.addFixAllAction(tsAction.fixId, action);
			return results;
		}
	}
	TypeScriptQuickFixProvider.metadata = {
		providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
	};
	const preferredFixes = new Set([
		'annotateWithTypeFromJSDoc',
		'constructorForDerivedNeedSuperCall',
		'extendsInterfaceBecomesImplements',
		'fixAwaitInSyncFunction',
		'fixClassIncorrectlyImplementsInterface',
		'fixUnreachableCode',
		'forgottenThisPropertyAccess',
		'spelling',
		'unusedIdentifier',
	]);
	function isPreferredFix(tsAction) {
		return preferredFixes.has(tsAction.fixName);
	}
	function register(selector, client, fileConfigurationManager, commandManager, diagnosticsManager, telemetryReporter) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v213, () => vscode.languages.registerCodeActionsProvider(selector, new TypeScriptQuickFixProvider(client, fileConfigurationManager, commandManager, diagnosticsManager, telemetryReporter), TypeScriptQuickFixProvider.metadata));
	}
	exports.register = register;


	/***/ }),
	/* 59 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/fixAll.ts'));
	const autoFixableDiagnosticCodes = new Set([
		2420,
		2552,
	]);
	class TypeScriptAutoFixProvider {
		constructor(client, fileConfigurationManager, diagnosticsManager) {
			this.client = client;
			this.fileConfigurationManager = fileConfigurationManager;
			this.diagnosticsManager = diagnosticsManager;
		}
		async provideCodeActions(document, _range, context, token) {
			if (!context.only || !vscode.CodeActionKind.SourceFixAll.intersects(context.only)) {
				return undefined;
			}
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			const autoFixableDiagnostics = this.getAutoFixableDiagnostics(document);
			if (!autoFixableDiagnostics.length) {
				return undefined;
			}
			const fixAllAction = await this.getFixAllCodeAction(document, file, autoFixableDiagnostics, token);
			return fixAllAction ? [fixAllAction] : undefined;
		}
		getAutoFixableDiagnostics(document) {
			if (this.client.bufferSyncSupport.hasPendingDiagnostics(document.uri)) {
				return [];
			}
			return this.diagnosticsManager.getDiagnostics(document.uri)
				.filter(x => autoFixableDiagnosticCodes.has(x.code));
		}
		async getFixAllCodeAction(document, file, diagnostics, token) {
			await this.fileConfigurationManager.ensureConfigurationForDocument(document, token);
			const autoFixResponse = await this.getAutoFixEdit(file, diagnostics, token);
			if (!autoFixResponse) {
				return undefined;
			}
			const { edit, fixedDiagnostics } = autoFixResponse;
			const codeAction = new vscode.CodeAction(localize(0, null), vscode.CodeActionKind.SourceFixAll);
			codeAction.edit = edit;
			codeAction.diagnostics = fixedDiagnostics;
			return codeAction;
		}
		async getAutoFixEdit(file, diagnostics, token) {
			const edit = new vscode.WorkspaceEdit();
			const fixedDiagnostics = [];
			for (const diagnostic of diagnostics) {
				const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, diagnostic.range), { errorCodes: [+(diagnostic.code)] });
				const response = await this.client.execute('getCodeFixes', args, token);
				if (response.type !== 'response' || !response.body || response.body.length > 1) {
					return undefined;
				}
				const fix = response.body[0];
				if (new Set(['fixClassIncorrectlyImplementsInterface', 'spelling']).has(fix.fixName)) {
					typeConverters.WorkspaceEdit.withFileCodeEdits(edit, this.client, fix.changes);
					fixedDiagnostics.push(diagnostic);
				}
			}
			if (!fixedDiagnostics.length) {
				return undefined;
			}
			return { edit, fixedDiagnostics };
		}
	}
	TypeScriptAutoFixProvider.metadata = {
		providedCodeActionKinds: [vscode.CodeActionKind.SourceFixAll]
	};
	function register(selector, client, fileConfigurationManager, diagnosticsManager) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v300, () => new dependentRegistration_1.ConfigurationDependentRegistration('typescript', 'experimental.autoFix.enabled', () => vscode.languages.registerCodeActionsProvider(selector, new TypeScriptAutoFixProvider(client, fileConfigurationManager, diagnosticsManager), TypeScriptAutoFixProvider.metadata)));
	}
	exports.register = register;


	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	const cancellation_1 = __webpack_require__(9);
	class ApplyRefactoringCommand {
		constructor(client, telemetryReporter) {
			this.client = client;
			this.telemetryReporter = telemetryReporter;
			this.id = ApplyRefactoringCommand.ID;
		}
		async execute(document, file, refactor, action, range) {
			/* __GDPR__
				"refactor.execute" : {
					"action" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" },
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			this.telemetryReporter.logTelemetry('refactor.execute', {
				action: action,
			});
			const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, range), { refactor,
				action });
			const response = await this.client.execute('getEditsForRefactor', args, cancellation_1.nulToken);
			if (response.type !== 'response' || !response.body || !response.body.edits.length) {
				return false;
			}
			const workspaceEdit = await this.toWorkspaceEdit(response.body);
			if (!(await vscode.workspace.applyEdit(workspaceEdit))) {
				return false;
			}
			const renameLocation = response.body.renameLocation;
			if (renameLocation) {
				await vscode.commands.executeCommand('editor.action.rename', [
					document.uri,
					typeConverters.Position.fromLocation(renameLocation)
				]);
			}
			return true;
		}
		async toWorkspaceEdit(body) {
			const workspaceEdit = new vscode.WorkspaceEdit();
			for (const edit of body.edits) {
				workspaceEdit.createFile(this.client.toResource(edit.fileName), { ignoreIfExists: true });
			}
			typeConverters.WorkspaceEdit.withFileCodeEdits(workspaceEdit, this.client, body.edits);
			return workspaceEdit;
		}
	}
	ApplyRefactoringCommand.ID = '_typescript.applyRefactoring';
	class SelectRefactorCommand {
		constructor(doRefactoring) {
			this.doRefactoring = doRefactoring;
			this.id = SelectRefactorCommand.ID;
		}
		async execute(document, file, info, range) {
			const selected = await vscode.window.showQuickPick(info.actions.map((action) => ({
				label: action.name,
				description: action.description,
			})));
			if (!selected) {
				return false;
			}
			return this.doRefactoring.execute(document, file, info.name, selected.label, range);
		}
	}
	SelectRefactorCommand.ID = '_typescript.selectRefactoring';
	class TypeScriptRefactorProvider {
		constructor(client, formattingOptionsManager, commandManager, telemetryReporter) {
			this.client = client;
			this.formattingOptionsManager = formattingOptionsManager;
			const doRefactoringCommand = commandManager.register(new ApplyRefactoringCommand(this.client, telemetryReporter));
			commandManager.register(new SelectRefactorCommand(doRefactoringCommand));
		}
		async provideCodeActions(document, rangeOrSelection, context, token) {
			if (!this.shouldTrigger(rangeOrSelection, context)) {
				return undefined;
			}
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			const args = typeConverters.Range.toFileRangeRequestArgs(file, rangeOrSelection);
			const response = await this.client.interruptGetErr(() => {
				this.formattingOptionsManager.ensureConfigurationForDocument(document, token);
				return this.client.execute('getApplicableRefactors', args, token);
			});
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			return this.convertApplicableRefactors(response.body, document, file, rangeOrSelection);
		}
		convertApplicableRefactors(body, document, file, rangeOrSelection) {
			const actions = [];
			for (const info of body) {
				if (info.inlineable === false) {
					const codeAction = new vscode.CodeAction(info.description, vscode.CodeActionKind.Refactor);
					codeAction.command = {
						title: info.description,
						command: SelectRefactorCommand.ID,
						arguments: [document, file, info, rangeOrSelection]
					};
					actions.push(codeAction);
				}
				else {
					for (const action of info.actions) {
						actions.push(this.refactorActionToCodeAction(action, document, file, info, rangeOrSelection));
					}
				}
			}
			return actions;
		}
		refactorActionToCodeAction(action, document, file, info, rangeOrSelection) {
			const codeAction = new vscode.CodeAction(action.description, TypeScriptRefactorProvider.getKind(action));
			codeAction.command = {
				title: action.description,
				command: ApplyRefactoringCommand.ID,
				arguments: [document, file, info.name, action.name, rangeOrSelection],
			};
			codeAction.isPreferred = TypeScriptRefactorProvider.isPreferred(action);
			return codeAction;
		}
		shouldTrigger(rangeOrSelection, context) {
			if (context.only && !vscode.CodeActionKind.Refactor.contains(context.only)) {
				return false;
			}
			return rangeOrSelection instanceof vscode.Selection;
		}
		static getKind(refactor) {
			if (refactor.name.startsWith('function_')) {
				return TypeScriptRefactorProvider.extractFunctionKind;
			}
			else if (refactor.name.startsWith('constant_')) {
				return TypeScriptRefactorProvider.extractConstantKind;
			}
			else if (refactor.name.startsWith('Move')) {
				return TypeScriptRefactorProvider.moveKind;
			}
			return vscode.CodeActionKind.Refactor;
		}
		static isPreferred(action) {
			if (action.name.startsWith('constant_')) {
				return action.name.endsWith('scope_0');
			}
			return false;
		}
	}
	TypeScriptRefactorProvider.extractFunctionKind = vscode.CodeActionKind.RefactorExtract.append('function');
	TypeScriptRefactorProvider.extractConstantKind = vscode.CodeActionKind.RefactorExtract.append('constant');
	TypeScriptRefactorProvider.moveKind = vscode.CodeActionKind.Refactor.append('move');
	TypeScriptRefactorProvider.metadata = {
		providedCodeActionKinds: [vscode.CodeActionKind.Refactor],
	};
	function register(selector, client, formattingOptionsManager, commandManager, telemetryReporter) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v240, () => {
			return vscode.languages.registerCodeActionsProvider(selector, new TypeScriptRefactorProvider(client, formattingOptionsManager, commandManager, telemetryReporter), TypeScriptRefactorProvider.metadata);
		});
	}
	exports.register = register;


	/***/ }),
	/* 61 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const typeConverters = __webpack_require__(39);
	class TypeScriptReferenceSupport {
		constructor(client) {
			this.client = client;
		}
		async provideReferences(document, position, options, token) {
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return [];
			}
			const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
			const response = await this.client.execute('references', args, token);
			if (response.type !== 'response' || !response.body) {
				return [];
			}
			const result = [];
			const has203Features = this.client.apiVersion.gte(api_1.default.v203);
			for (const ref of response.body.refs) {
				if (!options.includeDeclaration && has203Features && ref.isDefinition) {
					continue;
				}
				const url = this.client.toResource(ref.file);
				const location = typeConverters.Location.fromTextSpan(url, ref);
				result.push(location);
			}
			return result;
		}
	}
	function register(selector, client) {
		return vscode.languages.registerReferenceProvider(selector, new TypeScriptReferenceSupport(client));
	}
	exports.register = register;


	/***/ }),
	/* 62 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const PConst = __webpack_require__(37);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const typeConverters = __webpack_require__(39);
	const baseCodeLensProvider_1 = __webpack_require__(54);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/referencesCodeLens.ts'));
	class TypeScriptReferencesCodeLensProvider extends baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider {
		async resolveCodeLens(inputCodeLens, token) {
			const codeLens = inputCodeLens;
			const args = typeConverters.Position.toFileLocationRequestArgs(codeLens.file, codeLens.range.start);
			const response = await this.client.execute('references', args, token, /* lowPriority */ true);
			if (response.type !== 'response' || !response.body) {
				codeLens.command = response.type === 'cancelled'
					? baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider.cancelledCommand
					: baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider.errorCommand;
				return codeLens;
			}
			const locations = response.body.refs
				.map(reference => typeConverters.Location.fromTextSpan(this.client.toResource(reference.file), reference))
				.filter(location =>
			// Exclude original definition from references
			!(location.uri.toString() === codeLens.document.toString() &&
				location.range.start.isEqual(codeLens.range.start)));
			codeLens.command = {
				title: this.getCodeLensLabel(locations),
				command: locations.length ? 'editor.action.showReferences' : '',
				arguments: [codeLens.document, codeLens.range.start, locations]
			};
			return codeLens;
		}
		getCodeLensLabel(locations) {
			return locations.length === 1
				? localize(0, null)
				: localize(1, null, locations.length);
		}
		extractSymbol(document, item, parent) {
			if (parent && parent.kind === PConst.Kind.enum) {
				return baseCodeLensProvider_1.getSymbolRange(document, item);
			}
			switch (item.kind) {
				case PConst.Kind.const:
				case PConst.Kind.let:
				case PConst.Kind.variable:
				case PConst.Kind.function:
					// Only show references for exported variables
					if (!item.kindModifiers.match(/\bexport\b/)) {
						break;
					}
				// fallthrough
				case PConst.Kind.class:
					if (item.text === '<class>') {
						break;
					}
				// fallthrough
				case PConst.Kind.memberFunction:
				case PConst.Kind.memberVariable:
				case PConst.Kind.memberGetAccessor:
				case PConst.Kind.memberSetAccessor:
				case PConst.Kind.constructorImplementation:
				case PConst.Kind.interface:
				case PConst.Kind.type:
				case PConst.Kind.enum:
					return baseCodeLensProvider_1.getSymbolRange(document, item);
			}
			return null;
		}
	}
	function register(selector, modeId, client, cachedResponse) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v206, () => new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'referencesCodeLens.enabled', () => {
			return vscode.languages.registerCodeLensProvider(selector, new TypeScriptReferencesCodeLensProvider(client, cachedResponse));
		}));
	}
	exports.register = register;


	/***/ }),
	/* 63 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/rename.ts'));
	class TypeScriptRenameProvider {
		constructor(client, fileConfigurationManager) {
			this.client = client;
			this.fileConfigurationManager = fileConfigurationManager;
		}
		async prepareRename(document, position, token) {
			const response = await this.execRename(document, position, token);
			if (!response || response.type !== 'response' || !response.body) {
				return null;
			}
			const renameInfo = response.body.info;
			if (!renameInfo.canRename) {
				return Promise.reject(renameInfo.localizedErrorMessage);
			}
			if (this.client.apiVersion.gte(api_1.default.v310)) {
				const triggerSpan = renameInfo.triggerSpan;
				if (triggerSpan) {
					return typeConverters.Range.fromTextSpan(triggerSpan);
				}
			}
			return null;
		}
		async provideRenameEdits(document, position, newName, token) {
			const response = await this.execRename(document, position, token);
			if (!response || response.type !== 'response' || !response.body) {
				return null;
			}
			const renameInfo = response.body.info;
			if (!renameInfo.canRename) {
				return Promise.reject(renameInfo.localizedErrorMessage);
			}
			if (this.client.apiVersion.gte(api_1.default.v310)) {
				if (renameInfo.fileToRename) {
					const edits = await this.renameFile(renameInfo.fileToRename, newName, token);
					if (edits) {
						return edits;
					}
					else {
						return Promise.reject(localize(0, null));
					}
				}
			}
			return this.updateLocs(response.body.locs, newName);
		}
		async execRename(document, position, token) {
			const file = this.client.toOpenedFilePath(document);
			if (!file) {
				return undefined;
			}
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { findInStrings: false, findInComments: false });
			return this.client.interruptGetErr(() => {
				this.fileConfigurationManager.ensureConfigurationForDocument(document, token);
				return this.client.execute('rename', args, token);
			});
		}
		updateLocs(locations, newName) {
			const edit = new vscode.WorkspaceEdit();
			for (const spanGroup of locations) {
				const resource = this.client.toResource(spanGroup.file);
				if (resource) {
					for (const textSpan of spanGroup.locs) {
						edit.replace(resource, typeConverters.Range.fromTextSpan(textSpan), (textSpan.prefixText || '') + newName + (textSpan.suffixText || ''));
					}
				}
			}
			return edit;
		}
		async renameFile(fileToRename, newName, token) {
			// Make sure we preserve file extension if none provided
			if (!path.extname(newName)) {
				newName += path.extname(fileToRename);
			}
			const dirname = path.dirname(fileToRename);
			const newFilePath = path.join(dirname, newName);
			const args = {
				file: fileToRename,
				oldFilePath: fileToRename,
				newFilePath: newFilePath,
			};
			const response = await this.client.execute('getEditsForFileRename', args, token);
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			const edits = typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, response.body);
			edits.renameFile(vscode.Uri.file(fileToRename), vscode.Uri.file(newFilePath));
			return edits;
		}
	}
	function register(selector, client, fileConfigurationManager) {
		return vscode.languages.registerRenameProvider(selector, new TypeScriptRenameProvider(client, fileConfigurationManager));
	}
	exports.register = register;


	/***/ }),
	/* 64 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const Previewer = __webpack_require__(41);
	const typeConverters = __webpack_require__(39);
	class TypeScriptSignatureHelpProvider {
		constructor(client) {
			this.client = client;
		}
		async provideSignatureHelp(document, position, token, context) {
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return undefined;
			}
			const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(filepath, position), { triggerReason: toTsTriggerReason(context) });
			const response = await this.client.interruptGetErr(() => this.client.execute('signatureHelp', args, token));
			if (response.type !== 'response' || !response.body) {
				return undefined;
			}
			const info = response.body;
			const result = new vscode.SignatureHelp();
			result.activeSignature = info.selectedItemIndex;
			result.activeParameter = this.getActiveParmeter(info);
			result.signatures = info.items.map(signature => this.convertSignature(signature));
			return result;
		}
		getActiveParmeter(info) {
			const activeSignature = info.items[info.selectedItemIndex];
			if (activeSignature && activeSignature.isVariadic) {
				return Math.min(info.argumentIndex, activeSignature.parameters.length - 1);
			}
			return info.argumentIndex;
		}
		convertSignature(item) {
			const signature = new vscode.SignatureInformation(Previewer.plain(item.prefixDisplayParts), Previewer.markdownDocumentation(item.documentation, item.tags.filter(x => x.name !== 'param')));
			let textIndex = signature.label.length;
			const separatorLabel = Previewer.plain(item.separatorDisplayParts);
			for (let i = 0; i < item.parameters.length; ++i) {
				const parameter = item.parameters[i];
				const label = Previewer.plain(parameter.displayParts);
				signature.parameters.push(new vscode.ParameterInformation([textIndex, textIndex + label.length], Previewer.markdownDocumentation(parameter.documentation, [])));
				textIndex += label.length;
				signature.label += label;
				if (i !== item.parameters.length - 1) {
					signature.label += separatorLabel;
					textIndex += separatorLabel.length;
				}
			}
			signature.label += Previewer.plain(item.suffixDisplayParts);
			return signature;
		}
	}
	TypeScriptSignatureHelpProvider.triggerCharacters = ['(', ',', '<'];
	TypeScriptSignatureHelpProvider.retriggerCharacters = [')'];
	function toTsTriggerReason(context) {
		switch (context.triggerKind) {
			case vscode.SignatureHelpTriggerKind.TriggerCharacter:
				if (context.triggerCharacter) {
					if (context.isRetrigger) {
						return { kind: 'retrigger', triggerCharacter: context.triggerCharacter };
					}
					else {
						return { kind: 'characterTyped', triggerCharacter: context.triggerCharacter };
					}
				}
				else {
					return { kind: 'invoked' };
				}
			case vscode.SignatureHelpTriggerKind.ContentChange:
				return context.isRetrigger ? { kind: 'retrigger' } : { kind: 'invoked' };
			case vscode.SignatureHelpTriggerKind.Invoke:
			default:
				return { kind: 'invoked' };
		}
	}
	function register(selector, client) {
		return vscode.languages.registerSignatureHelpProvider(selector, new TypeScriptSignatureHelpProvider(client), {
			triggerCharacters: TypeScriptSignatureHelpProvider.triggerCharacters,
			retriggerCharacters: TypeScriptSignatureHelpProvider.retriggerCharacters
		});
	}
	exports.register = register;


	/***/ }),
	/* 65 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const dispose_1 = __webpack_require__(16);
	const typeConverters = __webpack_require__(39);
	class TagClosing extends dispose_1.Disposable {
		constructor(client) {
			super();
			this.client = client;
			this._disposed = false;
			this._timeout = undefined;
			this._cancel = undefined;
			vscode.workspace.onDidChangeTextDocument(event => this.onDidChangeTextDocument(event.document, event.contentChanges), null, this._disposables);
		}
		dispose() {
			super.dispose();
			this._disposed = true;
			if (this._timeout) {
				clearTimeout(this._timeout);
				this._timeout = undefined;
			}
			if (this._cancel) {
				this._cancel.cancel();
				this._cancel.dispose();
				this._cancel = undefined;
			}
		}
		onDidChangeTextDocument(document, changes) {
			const activeDocument = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
			if (document !== activeDocument || changes.length === 0) {
				return;
			}
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return;
			}
			if (typeof this._timeout !== 'undefined') {
				clearTimeout(this._timeout);
			}
			if (this._cancel) {
				this._cancel.cancel();
				this._cancel.dispose();
				this._cancel = undefined;
			}
			const lastChange = changes[changes.length - 1];
			const lastCharacter = lastChange.text[lastChange.text.length - 1];
			if (lastChange.rangeLength > 0 || lastCharacter !== '>' && lastCharacter !== '/') {
				return;
			}
			const priorCharacter = lastChange.range.start.character > 0
				? document.getText(new vscode.Range(lastChange.range.start.translate({ characterDelta: -1 }), lastChange.range.start))
				: '';
			if (priorCharacter === '>') {
				return;
			}
			const version = document.version;
			this._timeout = setTimeout(async () => {
				this._timeout = undefined;
				if (this._disposed) {
					return;
				}
				const addedLines = lastChange.text.split(/\r\n|\n/g);
				const position = addedLines.length <= 1
					? lastChange.range.start.translate({ characterDelta: lastChange.text.length })
					: new vscode.Position(lastChange.range.start.line + addedLines.length - 1, addedLines[addedLines.length - 1].length);
				const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
				this._cancel = new vscode.CancellationTokenSource();
				const response = await this.client.execute('jsxClosingTag', args, this._cancel.token);
				if (response.type !== 'response' || !response.body) {
					return;
				}
				if (this._disposed) {
					return;
				}
				const activeEditor = vscode.window.activeTextEditor;
				if (!activeEditor) {
					return;
				}
				const insertion = response.body;
				const activeDocument = activeEditor.document;
				if (document === activeDocument && activeDocument.version === version) {
					activeEditor.insertSnippet(this.getTagSnippet(insertion), this.getInsertionPositions(activeEditor, position));
				}
			}, 100);
		}
		getTagSnippet(closingTag) {
			const snippet = new vscode.SnippetString();
			snippet.appendPlaceholder('', 0);
			snippet.appendText(closingTag.newText);
			return snippet;
		}
		getInsertionPositions(editor, position) {
			const activeSelectionPositions = editor.selections.map(s => s.active);
			return activeSelectionPositions.some(p => p.isEqual(position))
				? activeSelectionPositions
				: position;
		}
	}
	class ActiveDocumentDependentRegistration extends dispose_1.Disposable {
		constructor(selector, register) {
			super();
			this.selector = selector;
			this._registration = this._register(new dependentRegistration_1.ConditionalRegistration(register));
			vscode.window.onDidChangeActiveTextEditor(this.update, this, this._disposables);
			vscode.workspace.onDidOpenTextDocument(this.onDidOpenDocument, this, this._disposables);
			this.update();
		}
		update() {
			const editor = vscode.window.activeTextEditor;
			const enabled = !!(editor && vscode.languages.match(this.selector, editor.document));
			this._registration.update(enabled);
		}
		onDidOpenDocument(openedDocument) {
			if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document === openedDocument) {
				// The active document's language may have changed
				this.update();
			}
		}
	}
	exports.ActiveDocumentDependentRegistration = ActiveDocumentDependentRegistration;
	function register(selector, modeId, client) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v300, () => new dependentRegistration_1.ConfigurationDependentRegistration(modeId, 'autoClosingTags', () => new ActiveDocumentDependentRegistration(selector, () => new TagClosing(client))));
	}
	exports.register = register;


	/***/ }),
	/* 66 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const dependentRegistration_1 = __webpack_require__(40);
	const definitionProviderBase_1 = __webpack_require__(44);
	class TypeScriptTypeDefinitionProvider extends definitionProviderBase_1.default {
		provideTypeDefinition(document, position, token) {
			return this.getSymbolLocations('typeDefinition', document, position, token);
		}
	}
	exports.default = TypeScriptTypeDefinitionProvider;
	function register(selector, client) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v213, () => {
			return vscode.languages.registerTypeDefinitionProvider(selector, new TypeScriptTypeDefinitionProvider(client));
		});
	}
	exports.register = register;


	/***/ }),
	/* 67 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const bufferSyncSupport_1 = __webpack_require__(68);
	const diagnostics_1 = __webpack_require__(70);
	const server_1 = __webpack_require__(72);
	const api_1 = __webpack_require__(27);
	const configuration_1 = __webpack_require__(74);
	const dispose_1 = __webpack_require__(16);
	const fileSchemes = __webpack_require__(35);
	const logger_1 = __webpack_require__(80);
	const pluginPathsProvider_1 = __webpack_require__(81);
	const telemetry_1 = __webpack_require__(83);
	const tracer_1 = __webpack_require__(168);
	const tsconfig_1 = __webpack_require__(10);
	const versionPicker_1 = __webpack_require__(169);
	const versionProvider_1 = __webpack_require__(170);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'typescriptServiceClient.ts'));
	var ServerState;
	(function (ServerState) {
		ServerState.None = new class {
			constructor() {
				this.type = 0 /* None */;
			}
		};
		class Running {
			constructor(server,
			/**
			 * API version obtained from the version picker after checking the corresponding path exists.
			 */
			apiVersion,
			/**
			 * Version reported by currently-running tsserver.
			 */
			tsserverVersion, langaugeServiceEnabled) {
				this.server = server;
				this.apiVersion = apiVersion;
				this.tsserverVersion = tsserverVersion;
				this.langaugeServiceEnabled = langaugeServiceEnabled;
				this.type = 1 /* Running */;
			}
		}
		ServerState.Running = Running;
		class Errored {
			constructor(error) {
				this.error = error;
				this.type = 2 /* Errored */;
			}
		}
		ServerState.Errored = Errored;
	})(ServerState || (ServerState = {}));
	class TypeScriptServiceClient extends dispose_1.Disposable {
		constructor(workspaceState, onDidChangeTypeScriptVersion, pluginManager, logDirectoryProvider, allModeIds) {
			super();
			this.workspaceState = workspaceState;
			this.onDidChangeTypeScriptVersion = onDidChangeTypeScriptVersion;
			this.pluginManager = pluginManager;
			this.logDirectoryProvider = logDirectoryProvider;
			this.logger = new logger_1.default();
			this.serverState = ServerState.None;
			this.isRestarting = false;
			this.loadingIndicator = new ServerInitializingIndicator();
			this._onTsServerStarted = this._register(new vscode.EventEmitter());
			this.onTsServerStarted = this._onTsServerStarted.event;
			this._onDiagnosticsReceived = this._register(new vscode.EventEmitter());
			this.onDiagnosticsReceived = this._onDiagnosticsReceived.event;
			this._onConfigDiagnosticsReceived = this._register(new vscode.EventEmitter());
			this.onConfigDiagnosticsReceived = this._onConfigDiagnosticsReceived.event;
			this._onResendModelsRequested = this._register(new vscode.EventEmitter());
			this.onResendModelsRequested = this._onResendModelsRequested.event;
			this._onProjectLanguageServiceStateChanged = this._register(new vscode.EventEmitter());
			this.onProjectLanguageServiceStateChanged = this._onProjectLanguageServiceStateChanged.event;
			this._onDidBeginInstallTypings = this._register(new vscode.EventEmitter());
			this.onDidBeginInstallTypings = this._onDidBeginInstallTypings.event;
			this._onDidEndInstallTypings = this._register(new vscode.EventEmitter());
			this.onDidEndInstallTypings = this._onDidEndInstallTypings.event;
			this._onTypesInstallerInitializationFailed = this._register(new vscode.EventEmitter());
			this.onTypesInstallerInitializationFailed = this._onTypesInstallerInitializationFailed.event;
			this._onSurveyReady = this._register(new vscode.EventEmitter());
			this.onSurveyReady = this._onSurveyReady.event;
			this.token = 0;
			this.pathSeparator = path.sep;
			this.lastStart = Date.now();
			// tslint:disable-next-line: no-var-keyword
			var p = new Promise((resolve, reject) => {
				this._onReady = { promise: p, resolve, reject };
			});
			this._onReady.promise = p;
			this.numberRestarts = 0;
			this._configuration = configuration_1.TypeScriptServiceConfiguration.loadFromWorkspace();
			this.versionProvider = new versionProvider_1.TypeScriptVersionProvider(this._configuration);
			this.pluginPathsProvider = new pluginPathsProvider_1.TypeScriptPluginPathsProvider(this._configuration);
			this.versionPicker = new versionPicker_1.TypeScriptVersionPicker(this.versionProvider, this.workspaceState);
			this.tracer = new tracer_1.default(this.logger);
			this.bufferSyncSupport = new bufferSyncSupport_1.default(this, allModeIds);
			this.onReady(() => { this.bufferSyncSupport.listen(); });
			this.diagnosticsManager = new diagnostics_1.DiagnosticsManager('typescript');
			this.bufferSyncSupport.onDelete(resource => {
				this.diagnosticsManager.delete(resource);
			}, null, this._disposables);
			vscode.workspace.onDidChangeConfiguration(() => {
				const oldConfiguration = this._configuration;
				this._configuration = configuration_1.TypeScriptServiceConfiguration.loadFromWorkspace();
				this.versionProvider.updateConfiguration(this._configuration);
				this.pluginPathsProvider.updateConfiguration(this._configuration);
				this.tracer.updateConfiguration();
				if (this.serverState.type === 1 /* Running */) {
					if (this._configuration.checkJs !== oldConfiguration.checkJs
						|| this._configuration.experimentalDecorators !== oldConfiguration.experimentalDecorators) {
						this.setCompilerOptionsForInferredProjects(this._configuration);
					}
					if (!this._configuration.isEqualTo(oldConfiguration)) {
						this.restartTsServer();
					}
				}
			}, this, this._disposables);
			this.telemetryReporter = this._register(new telemetry_1.default(() => {
				if (this.serverState.type === 1 /* Running */) {
					if (this.serverState.tsserverVersion) {
						return this.serverState.tsserverVersion;
					}
				}
				return this.apiVersion.versionString;
			}));
			this.typescriptServerSpawner = new server_1.TypeScriptServerSpawner(this.versionProvider, this.logDirectoryProvider, this.pluginPathsProvider, this.logger, this.telemetryReporter, this.tracer);
			this._register(this.pluginManager.onDidUpdateConfig(update => {
				this.configurePlugin(update.pluginId, update.config);
			}));
			this._register(this.pluginManager.onDidChangePlugins(() => {
				this.restartTsServer();
			}));
		}
		get configuration() {
			return this._configuration;
		}
		dispose() {
			super.dispose();
			this.bufferSyncSupport.dispose();
			if (this.serverState.type === 1 /* Running */) {
				this.serverState.server.kill();
			}
			this.loadingIndicator.reset();
		}
		restartTsServer() {
			if (this.serverState.type === 1 /* Running */) {
				this.info('Killing TS Server');
				this.isRestarting = true;
				this.serverState.server.kill();
			}
			this.serverState = this.startService(true);
		}
		get apiVersion() {
			if (this.serverState.type === 1 /* Running */) {
				return this.serverState.apiVersion;
			}
			return api_1.default.defaultVersion;
		}
		onReady(f) {
			return this._onReady.promise.then(f);
		}
		info(message, data) {
			this.logger.info(message, data);
		}
		error(message, data) {
			this.logger.error(message, data);
		}
		logTelemetry(eventName, properties) {
			this.telemetryReporter.logTelemetry(eventName, properties);
		}
		service() {
			if (this.serverState.type === 1 /* Running */) {
				return this.serverState;
			}
			if (this.serverState.type === 2 /* Errored */) {
				throw this.serverState.error;
			}
			const newState = this.startService();
			if (newState.type === 1 /* Running */) {
				return newState;
			}
			throw new Error('Could not create TS service');
		}
		ensureServiceStarted() {
			if (this.serverState.type !== 1 /* Running */) {
				this.startService();
			}
		}
		startService(resendModels = false) {
			if (this.isDisposed) {
				return ServerState.None;
			}
			let currentVersion = this.versionPicker.currentVersion;
			this.info(`Using tsserver from: ${currentVersion.path}`);
			if (!fs.existsSync(currentVersion.tsServerPath)) {
				vscode.window.showWarningMessage(localize(0, null, currentVersion.path));
				this.versionPicker.useBundledVersion();
				currentVersion = this.versionPicker.currentVersion;
			}
			const apiVersion = this.versionPicker.currentVersion.version || api_1.default.defaultVersion;
			this.onDidChangeTypeScriptVersion(currentVersion);
			let mytoken = ++this.token;
			const handle = this.typescriptServerSpawner.spawn(currentVersion, this.configuration, this.pluginManager);
			this.serverState = new ServerState.Running(handle, apiVersion, undefined, true);
			this.lastStart = Date.now();
			handle.onError((err) => {
				if (this.token !== mytoken) {
					// this is coming from an old process
					return;
				}
				if (err) {
					vscode.window.showErrorMessage(localize(1, null, err.message || err.name));
				}
				this.serverState = new ServerState.Errored(err);
				this.error('TSServer errored with error.', err);
				if (handle.tsServerLogFile) {
					this.error(`TSServer log file: ${handle.tsServerLogFile}`);
				}
				/* __GDPR__
					"tsserver.error" : {
						"${include}": [
							"${TypeScriptCommonProperties}"
						]
					}
				*/
				this.logTelemetry('tsserver.error');
				this.serviceExited(false);
			});
			handle.onExit((code) => {
				if (this.token !== mytoken) {
					// this is coming from an old process
					return;
				}
				if (code === null || typeof code === 'undefined') {
					this.info('TSServer exited');
				}
				else {
					this.error(`TSServer exited with code: ${code}`);
					/* __GDPR__
						"tsserver.exitWithCode" : {
							"code" : { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
							"${include}": [
								"${TypeScriptCommonProperties}"
							]
						}
					*/
					this.logTelemetry('tsserver.exitWithCode', { code: code });
				}
				if (handle.tsServerLogFile) {
					this.info(`TSServer log file: ${handle.tsServerLogFile}`);
				}
				this.serviceExited(!this.isRestarting);
				this.isRestarting = false;
			});
			handle.onReaderError(error => this.error('ReaderError', error));
			handle.onEvent(event => this.dispatchEvent(event));
			this._onReady.resolve();
			this._onTsServerStarted.fire(currentVersion.version);
			if (apiVersion.gte(api_1.default.v300)) {
				this.loadingIndicator.startedLoadingProject(undefined /* projectName */);
			}
			this.serviceStarted(resendModels);
			return this.serverState;
		}
		onVersionStatusClicked() {
			return this.showVersionPicker(false);
		}
		showVersionPicker(firstRun) {
			return this.versionPicker.show(firstRun).then(change => {
				if (firstRun || !change.newVersion || !change.oldVersion || change.oldVersion.path === change.newVersion.path) {
					return;
				}
				this.restartTsServer();
			});
		}
		async openTsServerLogFile() {
			if (this.apiVersion.lt(api_1.default.v222)) {
				vscode.window.showErrorMessage(localize(2, null));
				return false;
			}
			if (this._configuration.tsServerLogLevel === configuration_1.TsServerLogLevel.Off) {
				vscode.window.showErrorMessage(localize(3, null), {
					title: localize(4, null),
				})
					.then(selection => {
					if (selection) {
						return vscode.workspace.getConfiguration().update('typescript.tsserver.log', 'verbose', true).then(() => {
							this.restartTsServer();
						});
					}
					return undefined;
				});
				return false;
			}
			if (this.serverState.type !== 1 /* Running */ || !this.serverState.server.tsServerLogFile) {
				vscode.window.showWarningMessage(localize(5, null));
				return false;
			}
			try {
				await vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(this.serverState.server.tsServerLogFile));
				return true;
			}
			catch (_a) {
				vscode.window.showWarningMessage(localize(6, null));
				return false;
			}
		}
		serviceStarted(resendModels) {
			const configureOptions = {
				hostInfo: 'vscode',
				preferences: {
					providePrefixAndSuffixTextForRename: true,
					allowRenameOfImportPath: true,
				}
			};
			this.executeWithoutWaitingForResponse('configure', configureOptions);
			this.setCompilerOptionsForInferredProjects(this._configuration);
			if (resendModels) {
				this._onResendModelsRequested.fire();
			}
			// Reconfigure any plugins
			for (const [config, pluginName] of this.pluginManager.configurations()) {
				this.configurePlugin(config, pluginName);
			}
		}
		setCompilerOptionsForInferredProjects(configuration) {
			if (this.apiVersion.lt(api_1.default.v206)) {
				return;
			}
			const args = {
				options: this.getCompilerOptionsForInferredProjects(configuration)
			};
			this.executeWithoutWaitingForResponse('compilerOptionsForInferredProjects', args);
		}
		getCompilerOptionsForInferredProjects(configuration) {
			return Object.assign({}, tsconfig_1.inferredProjectConfig(configuration), { allowJs: true, allowSyntheticDefaultImports: true, allowNonTsExtensions: true });
		}
		serviceExited(restart) {
			this.loadingIndicator.reset();
			let MessageAction;
			(function (MessageAction) {
				MessageAction[MessageAction["reportIssue"] = 0] = "reportIssue";
			})(MessageAction || (MessageAction = {}));
			this.serverState = ServerState.None;
			if (restart) {
				const diff = Date.now() - this.lastStart;
				this.numberRestarts++;
				let startService = true;
				if (this.numberRestarts > 5) {
					let prompt = undefined;
					this.numberRestarts = 0;
					if (diff < 10 * 1000 /* 10 seconds */) {
						this.lastStart = Date.now();
						startService = false;
						prompt = vscode.window.showErrorMessage(localize(7, null), {
							title: localize(8, null),
							id: MessageAction.reportIssue,
						});
						/* __GDPR__
							"serviceExited" : {
								"${include}": [
									"${TypeScriptCommonProperties}"
								]
							}
						*/
						this.logTelemetry('serviceExited');
					}
					else if (diff < 60 * 1000 /* 1 Minutes */) {
						this.lastStart = Date.now();
						prompt = vscode.window.showWarningMessage(localize(9, null), {
							title: localize(10, null),
							id: MessageAction.reportIssue
						});
					}
					if (prompt) {
						prompt.then(item => {
							if (item && item.id === MessageAction.reportIssue) {
								return vscode.commands.executeCommand('workbench.action.reportIssues');
							}
							return undefined;
						});
					}
				}
				if (startService) {
					this.startService(true);
				}
			}
		}
		normalizedPath(resource) {
			if (this.apiVersion.gte(api_1.default.v213)) {
				if (resource.scheme === fileSchemes.walkThroughSnippet || resource.scheme === fileSchemes.untitled) {
					const dirName = path.dirname(resource.path);
					const fileName = this.inMemoryResourcePrefix + path.basename(resource.path);
					return resource.with({ path: path.posix.join(dirName, fileName) }).toString(true);
				}
			}
			if (resource.scheme !== fileSchemes.file) {
				return undefined;
			}
			const result = resource.fsPath;
			if (!result) {
				return undefined;
			}
			// Both \ and / must be escaped in regular expressions
			return result.replace(new RegExp('\\' + this.pathSeparator, 'g'), '/');
		}
		toPath(resource) {
			return this.normalizedPath(resource);
		}
		toOpenedFilePath(document) {
			if (!this.bufferSyncSupport.handles(document.uri)) {
				console.error(`Unexpected resource ${document.uri}`);
				return undefined;
			}
			return this.toPath(document.uri) || undefined;
		}
		get inMemoryResourcePrefix() {
			return this.apiVersion.gte(api_1.default.v270) ? '^' : '';
		}
		toResource(filepath) {
			if (this.apiVersion.gte(api_1.default.v213)) {
				if (filepath.startsWith(TypeScriptServiceClient.WALK_THROUGH_SNIPPET_SCHEME_COLON) || (filepath.startsWith(fileSchemes.untitled + ':'))) {
					let resource = vscode.Uri.parse(filepath);
					if (this.inMemoryResourcePrefix) {
						const dirName = path.dirname(resource.path);
						const fileName = path.basename(resource.path);
						if (fileName.startsWith(this.inMemoryResourcePrefix)) {
							resource = resource.with({ path: path.posix.join(dirName, fileName.slice(this.inMemoryResourcePrefix.length)) });
						}
					}
					return resource;
				}
			}
			return this.bufferSyncSupport.toResource(filepath);
		}
		getWorkspaceRootForResource(resource) {
			const roots = vscode.workspace.workspaceFolders;
			if (!roots || !roots.length) {
				return undefined;
			}
			if (resource.scheme === fileSchemes.file || resource.scheme === fileSchemes.untitled) {
				for (const root of roots.sort((a, b) => a.uri.fsPath.length - b.uri.fsPath.length)) {
					if (resource.fsPath.startsWith(root.uri.fsPath + path.sep)) {
						return root.uri.fsPath;
					}
				}
				return roots[0].uri.fsPath;
			}
			return undefined;
		}
		execute(command, args, token, lowPriority) {
			return this.executeImpl(command, args, {
				isAsync: false,
				token,
				expectsResult: true,
				lowPriority
			});
		}
		executeWithoutWaitingForResponse(command, args) {
			this.executeImpl(command, args, {
				isAsync: false,
				token: undefined,
				expectsResult: false
			});
		}
		executeAsync(command, args, token) {
			return this.executeImpl(command, args, {
				isAsync: true,
				token,
				expectsResult: true
			});
		}
		executeImpl(command, args, executeInfo) {
			this.bufferSyncSupport.beforeCommand(command);
			const runningServerState = this.service();
			return runningServerState.server.executeImpl(command, args, executeInfo);
		}
		interruptGetErr(f) {
			return this.bufferSyncSupport.interuptGetErr(f);
		}
		dispatchEvent(event) {
			switch (event.event) {
				case 'syntaxDiag':
				case 'semanticDiag':
				case 'suggestionDiag':
					// This event also roughly signals that projects have been loaded successfully (since the TS server is synchronous)
					this.loadingIndicator.reset();
					const diagnosticEvent = event;
					if (diagnosticEvent.body && diagnosticEvent.body.diagnostics) {
						this._onDiagnosticsReceived.fire({
							kind: getDignosticsKind(event),
							resource: this.toResource(diagnosticEvent.body.file),
							diagnostics: diagnosticEvent.body.diagnostics
						});
					}
					break;
				case 'configFileDiag':
					this._onConfigDiagnosticsReceived.fire(event);
					break;
				case 'telemetry':
					{
						const body = event.body;
						this.dispatchTelemetryEvent(body);
						break;
					}
				case 'projectLanguageServiceState':
					{
						const body = event.body;
						if (this.serverState.type === 1 /* Running */) {
							this.serverState = Object.assign({}, this.serverState, { langaugeServiceEnabled: body.languageServiceEnabled });
						}
						this._onProjectLanguageServiceStateChanged.fire(body);
						break;
					}
				case 'projectsUpdatedInBackground':
					const body = event.body;
					const resources = body.openFiles.map(vscode.Uri.file);
					this.bufferSyncSupport.getErr(resources);
					break;
				case 'beginInstallTypes':
					this._onDidBeginInstallTypings.fire(event.body);
					break;
				case 'endInstallTypes':
					this._onDidEndInstallTypings.fire(event.body);
					break;
				case 'typesInstallerInitializationFailed':
					this._onTypesInstallerInitializationFailed.fire(event.body);
					break;
				case 'surveyReady':
					this._onSurveyReady.fire(event.body);
					break;
				case 'projectLoadingStart':
					this.loadingIndicator.startedLoadingProject(event.body.projectName);
					break;
				case 'projectLoadingFinish':
					this.loadingIndicator.finishedLoadingProject(event.body.projectName);
					break;
			}
		}
		dispatchTelemetryEvent(telemetryData) {
			const properties = Object.create(null);
			switch (telemetryData.telemetryEventName) {
				case 'typingsInstalled':
					const typingsInstalledPayload = telemetryData.payload;
					properties['installedPackages'] = typingsInstalledPayload.installedPackages;
					if (typeof typingsInstalledPayload.installSuccess === 'boolean') {
						properties['installSuccess'] = typingsInstalledPayload.installSuccess.toString();
					}
					if (typeof typingsInstalledPayload.typingsInstallerVersion === 'string') {
						properties['typingsInstallerVersion'] = typingsInstalledPayload.typingsInstallerVersion;
					}
					break;
				default:
					const payload = telemetryData.payload;
					if (payload) {
						Object.keys(payload).forEach((key) => {
							try {
								if (payload.hasOwnProperty(key)) {
									properties[key] = typeof payload[key] === 'string' ? payload[key] : JSON.stringify(payload[key]);
								}
							}
							catch (e) {
								// noop
							}
						});
					}
					break;
			}
			if (telemetryData.telemetryEventName === 'projectInfo') {
				if (this.serverState.type === 1 /* Running */) {
					this.serverState = Object.assign({}, this.serverState, { tsserverVersion: properties['version'] });
				}
			}
			/* __GDPR__
				"typingsInstalled" : {
					"installedPackages" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" },
					"installSuccess": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" },
					"typingsInstallerVersion": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" },
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			// __GDPR__COMMENT__: Other events are defined by TypeScript.
			this.logTelemetry(telemetryData.telemetryEventName, properties);
		}
		configurePlugin(pluginName, configuration) {
			if (this.apiVersion.gte(api_1.default.v314)) {
				this.executeWithoutWaitingForResponse('configurePlugin', { pluginName, configuration });
			}
		}
	}
	TypeScriptServiceClient.WALK_THROUGH_SNIPPET_SCHEME_COLON = `${fileSchemes.walkThroughSnippet}:`;
	exports.default = TypeScriptServiceClient;
	function getDignosticsKind(event) {
		switch (event.event) {
			case 'syntaxDiag': return 0 /* Syntax */;
			case 'semanticDiag': return 1 /* Semantic */;
			case 'suggestionDiag': return 2 /* Suggestion */;
		}
		throw new Error('Unknown dignostics kind');
	}
	class ServerInitializingIndicator extends dispose_1.Disposable {
		reset() {
			if (this._task) {
				this._task.reject();
				this._task = undefined;
			}
		}
		/**
		 * Signal that a project has started loading.
		 */
		startedLoadingProject(projectName) {
			// TS projects are loaded sequentially. Cancel existing task because it should always be resolved before
			// the incoming project loading task is.
			this.reset();
			vscode.window.withProgress({
				location: vscode.ProgressLocation.Window,
				title: localize(11, null),
			}, () => new Promise((resolve, reject) => {
				this._task = { project: projectName, resolve, reject };
			}));
		}
		finishedLoadingProject(projectName) {
			if (this._task && this._task.project === projectName) {
				this._task.resolve();
				this._task = undefined;
			}
		}
	}


	/***/ }),
	/* 68 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const api_1 = __webpack_require__(27);
	const async_1 = __webpack_require__(69);
	const dispose_1 = __webpack_require__(16);
	const languageModeIds = __webpack_require__(17);
	const resourceMap_1 = __webpack_require__(29);
	const typeConverters = __webpack_require__(39);
	function mode2ScriptKind(mode) {
		switch (mode) {
			case languageModeIds.typescript: return 'TS';
			case languageModeIds.typescriptreact: return 'TSX';
			case languageModeIds.javascript: return 'JS';
			case languageModeIds.javascriptreact: return 'JSX';
		}
		return undefined;
	}
	/**
	 * Manages synchronization of buffers with the TS server.
	 *
	 * If supported, batches together file changes. This allows the TS server to more efficiently process changes.
	 */
	class BufferSynchronizer {
		constructor(client) {
			this.client = client;
			this._pending = {};
			this._pendingFiles = new Set();
		}
		open(args) {
			if (this.supportsBatching) {
				this.updatePending(args.file, pending => {
					if (!pending.openFiles) {
						pending.openFiles = [];
					}
					pending.openFiles.push(args);
				});
			}
			else {
				this.client.executeWithoutWaitingForResponse('open', args);
			}
		}
		close(filepath) {
			if (this.supportsBatching) {
				this.updatePending(filepath, pending => {
					if (!pending.closedFiles) {
						pending.closedFiles = [];
					}
					pending.closedFiles.push(filepath);
				});
			}
			else {
				const args = { file: filepath };
				this.client.executeWithoutWaitingForResponse('close', args);
			}
		}
		change(filepath, events) {
			if (!events.length) {
				return;
			}
			if (this.supportsBatching) {
				this.updatePending(filepath, pending => {
					if (!pending.changedFiles) {
						pending.changedFiles = [];
					}
					pending.changedFiles.push({
						fileName: filepath,
						textChanges: events.map((change) => ({
							newText: change.text,
							start: typeConverters.Position.toLocation(change.range.start),
							end: typeConverters.Position.toLocation(change.range.end),
						})).reverse(),
					});
				});
			}
			else {
				for (const { range, text } of events) {
					const args = Object.assign({ insertString: text }, typeConverters.Range.toFormattingRequestArgs(filepath, range));
					this.client.executeWithoutWaitingForResponse('change', args);
				}
			}
		}
		beforeCommand(command) {
			if (command === 'updateOpen') {
				return;
			}
			this.flush();
		}
		flush() {
			if (!this.supportsBatching) {
				// We've already eagerly synchronized
				return;
			}
			if (this._pending.changedFiles || this._pending.closedFiles || this._pending.openFiles) {
				this.client.executeWithoutWaitingForResponse('updateOpen', this._pending);
				this._pending = {};
				this._pendingFiles.clear();
			}
		}
		get supportsBatching() {
			return this.client.apiVersion.gte(api_1.default.v340) && vscode.workspace.getConfiguration('typescript', null).get('useBatchedBufferSync', true);
		}
		updatePending(filepath, f) {
			if (this.supportsBatching && this._pendingFiles.has(filepath)) {
				this.flush();
				this._pendingFiles.clear();
				f(this._pending);
				this._pendingFiles.add(filepath);
			}
			else {
				f(this._pending);
			}
		}
	}
	class SyncedBuffer {
		constructor(document, filepath, client, synchronizer) {
			this.document = document;
			this.filepath = filepath;
			this.client = client;
			this.synchronizer = synchronizer;
			this.state = 1 /* Initial */;
		}
		open() {
			const args = {
				file: this.filepath,
				fileContent: this.document.getText(),
			};
			if (this.client.apiVersion.gte(api_1.default.v203)) {
				const scriptKind = mode2ScriptKind(this.document.languageId);
				if (scriptKind) {
					args.scriptKindName = scriptKind;
				}
			}
			if (this.client.apiVersion.gte(api_1.default.v230)) {
				args.projectRootPath = this.client.getWorkspaceRootForResource(this.document.uri);
			}
			if (this.client.apiVersion.gte(api_1.default.v240)) {
				const tsPluginsForDocument = this.client.pluginManager.plugins
					.filter(x => x.languages.indexOf(this.document.languageId) >= 0);
				if (tsPluginsForDocument.length) {
					args.plugins = tsPluginsForDocument.map(plugin => plugin.name);
				}
			}
			this.synchronizer.open(args);
			this.state = 2 /* Open */;
		}
		get resource() {
			return this.document.uri;
		}
		get lineCount() {
			return this.document.lineCount;
		}
		get kind() {
			switch (this.document.languageId) {
				case languageModeIds.javascript:
				case languageModeIds.javascriptreact:
					return 2 /* JavaScript */;
				case languageModeIds.typescript:
				case languageModeIds.typescriptreact:
				default:
					return 1 /* TypeScript */;
			}
		}
		close() {
			this.synchronizer.close(this.filepath);
			this.state = 2 /* Closed */;
		}
		onContentChanged(events) {
			if (this.state !== 2 /* Open */) {
				console.error(`Unexpected buffer state: ${this.state}`);
			}
			this.synchronizer.change(this.filepath, events);
		}
	}
	class SyncedBufferMap extends resourceMap_1.ResourceMap {
		getForPath(filePath) {
			return this.get(vscode.Uri.file(filePath));
		}
		get allBuffers() {
			return this.values;
		}
	}
	class PendingDiagnostics extends resourceMap_1.ResourceMap {
		getOrderedFileSet() {
			const orderedResources = Array.from(this.entries)
				.sort((a, b) => a.value - b.value)
				.map(entry => entry.resource);
			const map = new resourceMap_1.ResourceMap();
			for (const resource of orderedResources) {
				map.set(resource, undefined);
			}
			return map;
		}
	}
	class GetErrRequest {
		constructor(client, files, _token, onDone) {
			this.files = files;
			this._token = _token;
			this._done = false;
			const args = {
				delay: 0,
				files: Array.from(files.entries)
					.map(entry => client.normalizedPath(entry.resource))
					.filter(x => !!x)
			};
			client.executeAsync('geterr', args, _token.token)
				.finally(() => {
				if (this._done) {
					return;
				}
				this._done = true;
				onDone();
			});
		}
		static executeGetErrRequest(client, files, onDone) {
			const token = new vscode.CancellationTokenSource();
			return new GetErrRequest(client, files, token, onDone);
		}
		cancel() {
			if (!this._done) {
				this._token.cancel();
			}
			this._token.dispose();
		}
	}
	class BufferSyncSupport extends dispose_1.Disposable {
		constructor(client, modeIds) {
			super();
			this._validateJavaScript = true;
			this._validateTypeScript = true;
			this.listening = false;
			this._onDelete = this._register(new vscode.EventEmitter());
			this.onDelete = this._onDelete.event;
			this.client = client;
			this.modeIds = new Set(modeIds);
			this.diagnosticDelayer = new async_1.Delayer(300);
			const pathNormalizer = (path) => this.client.normalizedPath(path);
			this.syncedBuffers = new SyncedBufferMap(pathNormalizer);
			this.pendingDiagnostics = new PendingDiagnostics(pathNormalizer);
			this.synchronizer = new BufferSynchronizer(client);
			this.updateConfiguration();
			vscode.workspace.onDidChangeConfiguration(this.updateConfiguration, this, this._disposables);
		}
		listen() {
			if (this.listening) {
				return;
			}
			this.listening = true;
			vscode.workspace.onDidOpenTextDocument(this.openTextDocument, this, this._disposables);
			vscode.workspace.onDidCloseTextDocument(this.onDidCloseTextDocument, this, this._disposables);
			vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, this._disposables);
			vscode.workspace.textDocuments.forEach(this.openTextDocument, this);
		}
		handles(resource) {
			return this.syncedBuffers.has(resource);
		}
		toResource(filePath) {
			const buffer = this.syncedBuffers.getForPath(filePath);
			if (buffer) {
				return buffer.resource;
			}
			return vscode.Uri.file(filePath);
		}
		reOpenDocuments() {
			for (const buffer of this.syncedBuffers.allBuffers) {
				buffer.open();
			}
		}
		openTextDocument(document) {
			if (!this.modeIds.has(document.languageId)) {
				return;
			}
			const resource = document.uri;
			const filepath = this.client.normalizedPath(resource);
			if (!filepath) {
				return;
			}
			if (this.syncedBuffers.has(resource)) {
				return;
			}
			const syncedBuffer = new SyncedBuffer(document, filepath, this.client, this.synchronizer);
			this.syncedBuffers.set(resource, syncedBuffer);
			syncedBuffer.open();
			this.requestDiagnostic(syncedBuffer);
		}
		closeResource(resource) {
			const syncedBuffer = this.syncedBuffers.get(resource);
			if (!syncedBuffer) {
				return;
			}
			this.pendingDiagnostics.delete(resource);
			this.syncedBuffers.delete(resource);
			syncedBuffer.close();
			this._onDelete.fire(resource);
			this.requestAllDiagnostics();
		}
		interuptGetErr(f) {
			if (!this.pendingGetErr) {
				return f();
			}
			this.pendingGetErr.cancel();
			this.pendingGetErr = undefined;
			const result = f();
			this.triggerDiagnostics();
			return result;
		}
		beforeCommand(command) {
			this.synchronizer.beforeCommand(command);
		}
		onDidCloseTextDocument(document) {
			this.closeResource(document.uri);
		}
		onDidChangeTextDocument(e) {
			const syncedBuffer = this.syncedBuffers.get(e.document.uri);
			if (!syncedBuffer) {
				return;
			}
			syncedBuffer.onContentChanged(e.contentChanges);
			const didTrigger = this.requestDiagnostic(syncedBuffer);
			if (!didTrigger && this.pendingGetErr) {
				// In this case we always want to re-trigger all diagnostics
				this.pendingGetErr.cancel();
				this.pendingGetErr = undefined;
				this.triggerDiagnostics();
			}
		}
		requestAllDiagnostics() {
			for (const buffer of this.syncedBuffers.allBuffers) {
				if (this.shouldValidate(buffer)) {
					this.pendingDiagnostics.set(buffer.resource, Date.now());
				}
			}
			this.triggerDiagnostics();
		}
		getErr(resources) {
			const handledResources = resources.filter(resource => this.handles(resource));
			if (!handledResources.length) {
				return;
			}
			for (const resource of handledResources) {
				this.pendingDiagnostics.set(resource, Date.now());
			}
			this.triggerDiagnostics();
		}
		triggerDiagnostics(delay = 200) {
			this.diagnosticDelayer.trigger(() => {
				this.sendPendingDiagnostics();
			}, delay);
		}
		requestDiagnostic(buffer) {
			if (!this.shouldValidate(buffer)) {
				return false;
			}
			this.pendingDiagnostics.set(buffer.resource, Date.now());
			const delay = Math.min(Math.max(Math.ceil(buffer.lineCount / 20), 300), 800);
			this.triggerDiagnostics(delay);
			return true;
		}
		hasPendingDiagnostics(resource) {
			return this.pendingDiagnostics.has(resource);
		}
		sendPendingDiagnostics() {
			const orderedFileSet = this.pendingDiagnostics.getOrderedFileSet();
			// Add all open TS buffers to the geterr request. They might be visible
			for (const buffer of this.syncedBuffers.values) {
				orderedFileSet.set(buffer.resource, undefined);
			}
			if (orderedFileSet.size) {
				if (this.pendingGetErr) {
					this.pendingGetErr.cancel();
					for (const file of this.pendingGetErr.files.entries) {
						orderedFileSet.set(file.resource, undefined);
					}
				}
				const getErr = this.pendingGetErr = GetErrRequest.executeGetErrRequest(this.client, orderedFileSet, () => {
					if (this.pendingGetErr === getErr) {
						this.pendingGetErr = undefined;
					}
				});
			}
			this.pendingDiagnostics.clear();
		}
		updateConfiguration() {
			const jsConfig = vscode.workspace.getConfiguration('javascript', null);
			const tsConfig = vscode.workspace.getConfiguration('typescript', null);
			this._validateJavaScript = jsConfig.get('validate.enable', true);
			this._validateTypeScript = tsConfig.get('validate.enable', true);
		}
		shouldValidate(buffer) {
			switch (buffer.kind) {
				case 2 /* JavaScript */:
					return this._validateJavaScript;
				case 1 /* TypeScript */:
				default:
					return this._validateTypeScript;
			}
		}
	}
	exports.default = BufferSyncSupport;


	/***/ }),
	/* 69 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class Delayer {
		constructor(defaultDelay) {
			this.defaultDelay = defaultDelay;
			this.timeout = null;
			this.completionPromise = null;
			this.onSuccess = null;
			this.task = null;
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
					this.completionPromise = null;
					this.onSuccess = null;
					const result = this.task && this.task();
					this.task = null;
					return result;
				});
			}
			if (delay >= 0 || this.timeout === null) {
				this.timeout = setTimeout(() => {
					this.timeout = null;
					if (this.onSuccess) {
						this.onSuccess(undefined);
					}
				}, delay >= 0 ? delay : this.defaultDelay);
			}
			return this.completionPromise;
		}
		cancelTimeout() {
			if (this.timeout !== null) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
		}
	}
	exports.Delayer = Delayer;


	/***/ }),
	/* 70 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const resourceMap_1 = __webpack_require__(29);
	const languageDescription_1 = __webpack_require__(71);
	class FileDiagnostics {
		constructor(file, language) {
			this.file = file;
			this.language = language;
			this._diagnostics = new Map();
		}
		updateDiagnostics(language, kind, diagnostics) {
			if (language !== this.language) {
				this._diagnostics.clear();
				this.language = language;
			}
			if (diagnostics.length === 0) {
				const existing = this._diagnostics.get(kind);
				if (!existing || existing && existing.length === 0) {
					// No need to update
					return false;
				}
			}
			this._diagnostics.set(kind, diagnostics);
			return true;
		}
		getDiagnostics(settings) {
			if (!settings.getValidate(this.language)) {
				return [];
			}
			return [
				...this.get(0 /* Syntax */),
				...this.get(1 /* Semantic */),
				...this.getSuggestionDiagnostics(settings),
			];
		}
		getSuggestionDiagnostics(settings) {
			const enableSuggestions = settings.getEnableSuggestions(this.language);
			return this.get(2 /* Suggestion */).filter(x => {
				if (!enableSuggestions) {
					// Still show unused
					return x.tags && x.tags.indexOf(vscode.DiagnosticTag.Unnecessary) !== -1;
				}
				return true;
			});
		}
		get(kind) {
			return this._diagnostics.get(kind) || [];
		}
	}
	class DiagnosticSettings {
		constructor() {
			this._languageSettings = new Map();
			for (const language of languageDescription_1.allDiagnosticLangauges) {
				this._languageSettings.set(language, DiagnosticSettings.defaultSettings);
			}
		}
		getValidate(language) {
			return this.get(language).validate;
		}
		setValidate(language, value) {
			return this.update(language, settings => ({
				validate: value,
				enableSuggestions: settings.enableSuggestions,
			}));
		}
		getEnableSuggestions(language) {
			return this.get(language).enableSuggestions;
		}
		setEnableSuggestions(language, value) {
			return this.update(language, settings => ({
				validate: settings.validate,
				enableSuggestions: value
			}));
		}
		get(language) {
			return this._languageSettings.get(language) || DiagnosticSettings.defaultSettings;
		}
		update(language, f) {
			const currentSettings = this.get(language);
			const newSettings = f(currentSettings);
			this._languageSettings.set(language, newSettings);
			return currentSettings.validate === newSettings.validate
				&& currentSettings.enableSuggestions && currentSettings.enableSuggestions;
		}
	}
	DiagnosticSettings.defaultSettings = {
		validate: true,
		enableSuggestions: true
	};
	class DiagnosticsManager {
		constructor(owner) {
			this._diagnostics = new resourceMap_1.ResourceMap();
			this._settings = new DiagnosticSettings();
			this._pendingUpdates = new resourceMap_1.ResourceMap();
			this._updateDelay = 50;
			this._currentDiagnostics = vscode.languages.createDiagnosticCollection(owner);
		}
		dispose() {
			this._currentDiagnostics.dispose();
			for (const value of this._pendingUpdates.values) {
				clearTimeout(value);
			}
			this._pendingUpdates.clear();
		}
		reInitialize() {
			this._currentDiagnostics.clear();
			this._diagnostics.clear();
		}
		setValidate(language, value) {
			const didUpdate = this._settings.setValidate(language, value);
			if (didUpdate) {
				this.rebuild();
			}
		}
		setEnableSuggestions(language, value) {
			const didUpdate = this._settings.setEnableSuggestions(language, value);
			if (didUpdate) {
				this.rebuild();
			}
		}
		updateDiagnostics(file, language, kind, diagnostics) {
			let didUpdate = false;
			const entry = this._diagnostics.get(file);
			if (entry) {
				didUpdate = entry.updateDiagnostics(language, kind, diagnostics);
			}
			else if (diagnostics.length) {
				const fileDiagnostics = new FileDiagnostics(file, language);
				fileDiagnostics.updateDiagnostics(language, kind, diagnostics);
				this._diagnostics.set(file, fileDiagnostics);
				didUpdate = true;
			}
			if (didUpdate) {
				this.scheduleDiagnosticsUpdate(file);
			}
		}
		configFileDiagnosticsReceived(file, diagnostics) {
			this._currentDiagnostics.set(file, diagnostics);
		}
		delete(resource) {
			this._currentDiagnostics.delete(resource);
			this._diagnostics.delete(resource);
		}
		getDiagnostics(file) {
			return this._currentDiagnostics.get(file) || [];
		}
		scheduleDiagnosticsUpdate(file) {
			if (!this._pendingUpdates.has(file)) {
				this._pendingUpdates.set(file, setTimeout(() => this.updateCurrentDiagnostics(file), this._updateDelay));
			}
		}
		updateCurrentDiagnostics(file) {
			if (this._pendingUpdates.has(file)) {
				clearTimeout(this._pendingUpdates.get(file));
				this._pendingUpdates.delete(file);
			}
			const fileDiagnostics = this._diagnostics.get(file);
			this._currentDiagnostics.set(file, fileDiagnostics ? fileDiagnostics.getDiagnostics(this._settings) : []);
		}
		rebuild() {
			this._currentDiagnostics.clear();
			for (const fileDiagnostic of this._diagnostics.values) {
				this._currentDiagnostics.set(fileDiagnostic.file, fileDiagnostic.getDiagnostics(this._settings));
			}
		}
	}
	exports.DiagnosticsManager = DiagnosticsManager;


	/***/ }),
	/* 71 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const languageModeIds = __webpack_require__(17);
	exports.allDiagnosticLangauges = [0 /* JavaScript */, 1 /* TypeScript */];
	exports.standardLanguageDescriptions = [
		{
			id: 'typescript',
			diagnosticOwner: 'typescript',
			diagnosticSource: 'ts',
			diagnosticLanguage: 1 /* TypeScript */,
			modeIds: [languageModeIds.typescript, languageModeIds.typescriptreact],
			configFilePattern: /^tsconfig(\..*)?\.json$/gi
		}, {
			id: 'javascript',
			diagnosticOwner: 'typescript',
			diagnosticSource: 'ts',
			diagnosticLanguage: 0 /* JavaScript */,
			modeIds: [languageModeIds.javascript, languageModeIds.javascriptreact],
			configFilePattern: /^jsconfig(\..*)?\.json$/gi
		}
	];


	/***/ }),
	/* 72 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const typescriptService_1 = __webpack_require__(73);
	const api_1 = __webpack_require__(27);
	const configuration_1 = __webpack_require__(74);
	const dispose_1 = __webpack_require__(16);
	const electron = __webpack_require__(75);
	const regexp_1 = __webpack_require__(55);
	const wireProtocol_1 = __webpack_require__(77);
	const callbackMap_1 = __webpack_require__(78);
	const requestQueue_1 = __webpack_require__(79);
	class TypeScriptServerError extends Error {
		constructor(version, response, serverMessage, serverStack) {
			super(`TypeScript Server Error (${version.versionString})\n${serverMessage}\n${serverStack}`);
			this.response = response;
			this.serverMessage = serverMessage;
			this.serverStack = serverStack;
		}
		static create(version, response) {
			const parsedResult = TypeScriptServerError.parseErrorText(version, response);
			return new TypeScriptServerError(version, response, parsedResult ? parsedResult.message : undefined, parsedResult ? parsedResult.stack : undefined);
		}
		get serverErrorText() {
			return this.response.message;
		}
		get serverCommand() {
			return this.response.command;
		}
		/**
		 * Given a `errorText` from a tsserver request indicating failure in handling a request,
		 * prepares a payload for telemetry-logging.
		 */
		static parseErrorText(version, response) {
			const errorText = response.message;
			if (errorText) {
				const errorPrefix = 'Error processing request. ';
				if (errorText.startsWith(errorPrefix)) {
					const prefixFreeErrorText = errorText.substr(errorPrefix.length);
					const newlineIndex = prefixFreeErrorText.indexOf('\n');
					if (newlineIndex >= 0) {
						// Newline expected between message and stack.
						return {
							message: prefixFreeErrorText.substring(0, newlineIndex),
							stack: TypeScriptServerError.normalizeMessageStack(version, prefixFreeErrorText.substring(newlineIndex + 1))
						};
					}
				}
			}
			return undefined;
		}
		/**
		 * Try to replace full TS Server paths with 'tsserver.js' so that we don't have to post process the data as much
		 */
		static normalizeMessageStack(version, message) {
			if (!message) {
				return '';
			}
			return message.replace(new RegExp(`${regexp_1.escapeRegExp(version.path)}[/\\\\]tsserver.js:`, 'gi'), 'tsserver.js:');
		}
	}
	class TypeScriptServerSpawner {
		constructor(_versionProvider, _logDirectoryProvider, _pluginPathsProvider, _logger, _telemetryReporter, _tracer) {
			this._versionProvider = _versionProvider;
			this._logDirectoryProvider = _logDirectoryProvider;
			this._pluginPathsProvider = _pluginPathsProvider;
			this._logger = _logger;
			this._telemetryReporter = _telemetryReporter;
			this._tracer = _tracer;
		}
		spawn(version, configuration, pluginManager) {
			const apiVersion = version.version || api_1.default.defaultVersion;
			const { args, cancellationPipeName, tsServerLogFile } = this.getTsServerArgs(configuration, version, apiVersion, pluginManager);
			if (TypeScriptServerSpawner.isLoggingEnabled(apiVersion, configuration)) {
				if (tsServerLogFile) {
					this._logger.info(`TSServer log file: ${tsServerLogFile}`);
				}
				else {
					this._logger.error('Could not create TSServer log directory');
				}
			}
			this._logger.info('Forking TSServer');
			const childProcess = electron.fork(version.tsServerPath, args, this.getForkOptions());
			this._logger.info('Started TSServer');
			return new TypeScriptServer(childProcess, tsServerLogFile, cancellationPipeName, version, this._telemetryReporter, this._tracer);
		}
		getForkOptions() {
			const debugPort = TypeScriptServerSpawner.getDebugPort();
			const tsServerForkOptions = {
				execArgv: debugPort ? [`--inspect=${debugPort}`] : [],
			};
			return tsServerForkOptions;
		}
		getTsServerArgs(configuration, currentVersion, apiVersion, pluginManager) {
			const args = [];
			let cancellationPipeName;
			let tsServerLogFile;
			if (apiVersion.gte(api_1.default.v206)) {
				if (apiVersion.gte(api_1.default.v250)) {
					args.push('--useInferredProjectPerProjectRoot');
				}
				else {
					args.push('--useSingleInferredProject');
				}
				if (configuration.disableAutomaticTypeAcquisition) {
					args.push('--disableAutomaticTypingAcquisition');
				}
			}
			if (apiVersion.gte(api_1.default.v208)) {
				args.push('--enableTelemetry');
			}
			if (apiVersion.gte(api_1.default.v222)) {
				cancellationPipeName = electron.getTempFile('tscancellation');
				args.push('--cancellationPipeName', cancellationPipeName + '*');
			}
			if (TypeScriptServerSpawner.isLoggingEnabled(apiVersion, configuration)) {
				const logDir = this._logDirectoryProvider.getNewLogDirectory();
				if (logDir) {
					tsServerLogFile = path.join(logDir, `tsserver.log`);
					args.push('--logVerbosity', configuration_1.TsServerLogLevel.toString(configuration.tsServerLogLevel));
					args.push('--logFile', tsServerLogFile);
				}
			}
			if (apiVersion.gte(api_1.default.v230)) {
				const pluginPaths = this._pluginPathsProvider.getPluginPaths();
				if (pluginManager.plugins.length) {
					args.push('--globalPlugins', pluginManager.plugins.map(x => x.name).join(','));
					const isUsingBundledTypeScriptVersion = currentVersion.path === this._versionProvider.defaultVersion.path;
					for (const plugin of pluginManager.plugins) {
						if (isUsingBundledTypeScriptVersion || plugin.enableForWorkspaceTypeScriptVersions) {
							pluginPaths.push(plugin.path);
						}
					}
				}
				if (pluginPaths.length !== 0) {
					args.push('--pluginProbeLocations', pluginPaths.join(','));
				}
			}
			if (apiVersion.gte(api_1.default.v234)) {
				if (configuration.npmLocation) {
					args.push('--npmLocation', `"${configuration.npmLocation}"`);
				}
			}
			if (apiVersion.gte(api_1.default.v260)) {
				args.push('--locale', TypeScriptServerSpawner.getTsLocale(configuration));
			}
			if (apiVersion.gte(api_1.default.v291)) {
				args.push('--noGetErrOnBackgroundUpdate');
			}
			return { args, cancellationPipeName, tsServerLogFile };
		}
		static getDebugPort() {
			const value = process.env['TSS_DEBUG'];
			if (value) {
				const port = parseInt(value);
				if (!isNaN(port)) {
					return port;
				}
			}
			return undefined;
		}
		static isLoggingEnabled(apiVersion, configuration) {
			return apiVersion.gte(api_1.default.v222) &&
				configuration.tsServerLogLevel !== configuration_1.TsServerLogLevel.Off;
		}
		static getTsLocale(configuration) {
			return configuration.locale
				? configuration.locale
				: vscode.env.language;
		}
	}
	exports.TypeScriptServerSpawner = TypeScriptServerSpawner;
	class TypeScriptServer extends dispose_1.Disposable {
		constructor(_childProcess, _tsServerLogFile, _cancellationPipeName, _version, _telemetryReporter, _tracer) {
			super();
			this._childProcess = _childProcess;
			this._tsServerLogFile = _tsServerLogFile;
			this._cancellationPipeName = _cancellationPipeName;
			this._version = _version;
			this._telemetryReporter = _telemetryReporter;
			this._tracer = _tracer;
			this._requestQueue = new requestQueue_1.RequestQueue();
			this._callbacks = new callbackMap_1.CallbackMap();
			this._pendingResponses = new Set();
			this._onEvent = this._register(new vscode.EventEmitter());
			this.onEvent = this._onEvent.event;
			this._onExit = this._register(new vscode.EventEmitter());
			this.onExit = this._onExit.event;
			this._onError = this._register(new vscode.EventEmitter());
			this.onError = this._onError.event;
			this._reader = this._register(new wireProtocol_1.Reader(this._childProcess.stdout));
			this._reader.onData(msg => this.dispatchMessage(msg));
			this._childProcess.on('exit', code => this.handleExit(code));
			this._childProcess.on('error', error => this.handleError(error));
		}
		get onReaderError() { return this._reader.onError; }
		get tsServerLogFile() { return this._tsServerLogFile; }
		write(serverRequest) {
			this._childProcess.stdin.write(JSON.stringify(serverRequest) + '\r\n', 'utf8');
		}
		dispose() {
			super.dispose();
			this._callbacks.destroy('server disposed');
			this._pendingResponses.clear();
		}
		kill() {
			this._childProcess.kill();
		}
		handleExit(error) {
			this._onExit.fire(error);
			this._callbacks.destroy('server exited');
		}
		handleError(error) {
			this._onError.fire(error);
			this._callbacks.destroy('server errored');
		}
		dispatchMessage(message) {
			try {
				switch (message.type) {
					case 'response':
						this.dispatchResponse(message);
						break;
					case 'event':
						const event = message;
						if (event.event === 'requestCompleted') {
							const seq = event.body.request_seq;
							const p = this._callbacks.fetch(seq);
							if (p) {
								this._tracer.traceRequestCompleted('requestCompleted', seq, p.startTime);
								p.onSuccess(undefined);
							}
						}
						else {
							this._tracer.traceEvent(event);
							this._onEvent.fire(event);
						}
						break;
					default:
						throw new Error(`Unknown message type ${message.type} received`);
				}
			}
			finally {
				this.sendNextRequests();
			}
		}
		tryCancelRequest(seq, command) {
			try {
				if (this._requestQueue.tryDeletePendingRequest(seq)) {
					this._tracer.logTrace(`TypeScript Server: canceled request with sequence number ${seq}`);
					return true;
				}
				if (this._cancellationPipeName) {
					this._tracer.logTrace(`TypeScript Server: trying to cancel ongoing request with sequence number ${seq}`);
					try {
						fs.writeFileSync(this._cancellationPipeName + seq, '');
					}
					catch (_a) {
						// noop
					}
					return true;
				}
				this._tracer.logTrace(`TypeScript Server: tried to cancel request with sequence number ${seq}. But request got already delivered.`);
				return false;
			}
			finally {
				const callback = this.fetchCallback(seq);
				if (callback) {
					callback.onSuccess(new typescriptService_1.ServerResponse.Cancelled(`Cancelled request ${seq} - ${command}`));
				}
			}
		}
		dispatchResponse(response) {
			const callback = this.fetchCallback(response.request_seq);
			if (!callback) {
				return;
			}
			this._tracer.traceResponse(response, callback.startTime);
			if (response.success) {
				callback.onSuccess(response);
			}
			else if (response.message === 'No content available.') {
				// Special case where response itself is successful but there is not any data to return.
				callback.onSuccess(typescriptService_1.ServerResponse.NoContent);
			}
			else {
				callback.onError(TypeScriptServerError.create(this._version, response));
			}
		}
		executeImpl(command, args, executeInfo) {
			const request = this._requestQueue.createRequest(command, args);
			const requestInfo = {
				request,
				expectsResponse: executeInfo.expectsResult,
				isAsync: executeInfo.isAsync,
				queueingType: getQueueingType(command, executeInfo.lowPriority)
			};
			let result;
			if (executeInfo.expectsResult) {
				result = new Promise((resolve, reject) => {
					this._callbacks.add(request.seq, { onSuccess: resolve, onError: reject, startTime: Date.now(), isAsync: executeInfo.isAsync }, executeInfo.isAsync);
					if (executeInfo.token) {
						executeInfo.token.onCancellationRequested(() => {
							this.tryCancelRequest(request.seq, command);
						});
					}
				}).catch((err) => {
					if (err instanceof TypeScriptServerError) {
						if (!executeInfo.token || !executeInfo.token.isCancellationRequested) {
							/* __GDPR__
								"languageServiceErrorResponse" : {
									"command" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
									"message" : { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
									"stack" : { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
									"errortext" : { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
									"${include}": [
										"${TypeScriptCommonProperties}"
									]
								}
							*/
							this._telemetryReporter.logTelemetry('languageServiceErrorResponse', {
								command: err.serverCommand,
								message: err.serverMessage || '',
								stack: err.serverStack || '',
								errortext: err.serverErrorText || '',
							});
						}
					}
					throw err;
				});
			}
			this._requestQueue.enqueue(requestInfo);
			this.sendNextRequests();
			return result;
		}
		sendNextRequests() {
			while (this._pendingResponses.size === 0 && this._requestQueue.length > 0) {
				const item = this._requestQueue.dequeue();
				if (item) {
					this.sendRequest(item);
				}
			}
		}
		sendRequest(requestItem) {
			const serverRequest = requestItem.request;
			this._tracer.traceRequest(serverRequest, requestItem.expectsResponse, this._requestQueue.length);
			if (requestItem.expectsResponse && !requestItem.isAsync) {
				this._pendingResponses.add(requestItem.request.seq);
			}
			try {
				this.write(serverRequest);
			}
			catch (err) {
				const callback = this.fetchCallback(serverRequest.seq);
				if (callback) {
					callback.onError(err);
				}
			}
		}
		fetchCallback(seq) {
			const callback = this._callbacks.fetch(seq);
			if (!callback) {
				return undefined;
			}
			this._pendingResponses.delete(seq);
			return callback;
		}
	}
	exports.TypeScriptServer = TypeScriptServer;
	const fenceCommands = new Set(['change', 'close', 'open']);
	function getQueueingType(command, lowPriority) {
		if (fenceCommands.has(command)) {
			return requestQueue_1.RequestQueueingType.Fence;
		}
		return lowPriority ? requestQueue_1.RequestQueueingType.LowPriority : requestQueue_1.RequestQueueingType.Normal;
	}


	/***/ }),
	/* 73 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var ServerResponse;
	(function (ServerResponse) {
		class Cancelled {
			constructor(reason) {
				this.reason = reason;
				this.type = 'cancelled';
			}
		}
		ServerResponse.Cancelled = Cancelled;
		ServerResponse.NoContent = new class {
			constructor() {
				this.type = 'noContent';
			}
		};
	})(ServerResponse = exports.ServerResponse || (exports.ServerResponse = {}));


	/***/ }),
	/* 74 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const vscode = __webpack_require__(1);
	const arrays = __webpack_require__(47);
	const os = __webpack_require__(32);
	const path = __webpack_require__(7);
	var TsServerLogLevel;
	(function (TsServerLogLevel) {
		TsServerLogLevel[TsServerLogLevel["Off"] = 0] = "Off";
		TsServerLogLevel[TsServerLogLevel["Normal"] = 1] = "Normal";
		TsServerLogLevel[TsServerLogLevel["Terse"] = 2] = "Terse";
		TsServerLogLevel[TsServerLogLevel["Verbose"] = 3] = "Verbose";
	})(TsServerLogLevel = exports.TsServerLogLevel || (exports.TsServerLogLevel = {}));
	(function (TsServerLogLevel) {
		function fromString(value) {
			switch (value && value.toLowerCase()) {
				case 'normal':
					return TsServerLogLevel.Normal;
				case 'terse':
					return TsServerLogLevel.Terse;
				case 'verbose':
					return TsServerLogLevel.Verbose;
				case 'off':
				default:
					return TsServerLogLevel.Off;
			}
		}
		TsServerLogLevel.fromString = fromString;
		function toString(value) {
			switch (value) {
				case TsServerLogLevel.Normal:
					return 'normal';
				case TsServerLogLevel.Terse:
					return 'terse';
				case TsServerLogLevel.Verbose:
					return 'verbose';
				case TsServerLogLevel.Off:
				default:
					return 'off';
			}
		}
		TsServerLogLevel.toString = toString;
	})(TsServerLogLevel = exports.TsServerLogLevel || (exports.TsServerLogLevel = {}));
	class TypeScriptServiceConfiguration {
		constructor() {
			this.tsServerLogLevel = TsServerLogLevel.Off;
			const configuration = vscode.workspace.getConfiguration();
			this.locale = TypeScriptServiceConfiguration.extractLocale(configuration);
			this.globalTsdk = TypeScriptServiceConfiguration.extractGlobalTsdk(configuration);
			this.localTsdk = TypeScriptServiceConfiguration.extractLocalTsdk(configuration);
			this.npmLocation = TypeScriptServiceConfiguration.readNpmLocation(configuration);
			this.tsServerLogLevel = TypeScriptServiceConfiguration.readTsServerLogLevel(configuration);
			this.tsServerPluginPaths = TypeScriptServiceConfiguration.readTsServerPluginPaths(configuration);
			this.checkJs = TypeScriptServiceConfiguration.readCheckJs(configuration);
			this.experimentalDecorators = TypeScriptServiceConfiguration.readExperimentalDecorators(configuration);
			this.disableAutomaticTypeAcquisition = TypeScriptServiceConfiguration.readDisableAutomaticTypeAcquisition(configuration);
		}
		static loadFromWorkspace() {
			return new TypeScriptServiceConfiguration();
		}
		isEqualTo(other) {
			return this.locale === other.locale
				&& this.globalTsdk === other.globalTsdk
				&& this.localTsdk === other.localTsdk
				&& this.npmLocation === other.npmLocation
				&& this.tsServerLogLevel === other.tsServerLogLevel
				&& this.checkJs === other.checkJs
				&& this.experimentalDecorators === other.experimentalDecorators
				&& this.disableAutomaticTypeAcquisition === other.disableAutomaticTypeAcquisition
				&& arrays.equals(this.tsServerPluginPaths, other.tsServerPluginPaths);
		}
		static fixPathPrefixes(inspectValue) {
			const pathPrefixes = ['~' + path.sep];
			for (const pathPrefix of pathPrefixes) {
				if (inspectValue.startsWith(pathPrefix)) {
					return path.join(os.homedir(), inspectValue.slice(pathPrefix.length));
				}
			}
			return inspectValue;
		}
		static extractGlobalTsdk(configuration) {
			const inspect = configuration.inspect('typescript.tsdk');
			if (inspect && typeof inspect.globalValue === 'string') {
				return this.fixPathPrefixes(inspect.globalValue);
			}
			return null;
		}
		static extractLocalTsdk(configuration) {
			const inspect = configuration.inspect('typescript.tsdk');
			if (inspect && typeof inspect.workspaceValue === 'string') {
				return this.fixPathPrefixes(inspect.workspaceValue);
			}
			return null;
		}
		static readTsServerLogLevel(configuration) {
			const setting = configuration.get('typescript.tsserver.log', 'off');
			return TsServerLogLevel.fromString(setting);
		}
		static readTsServerPluginPaths(configuration) {
			return configuration.get('typescript.tsserver.pluginPaths', []);
		}
		static readCheckJs(configuration) {
			return configuration.get('javascript.implicitProjectConfig.checkJs', false);
		}
		static readExperimentalDecorators(configuration) {
			return configuration.get('javascript.implicitProjectConfig.experimentalDecorators', false);
		}
		static readNpmLocation(configuration) {
			return configuration.get('typescript.npm', null);
		}
		static readDisableAutomaticTypeAcquisition(configuration) {
			return configuration.get('typescript.disableAutomaticTypeAcquisition', false);
		}
		static extractLocale(configuration) {
			return configuration.get('typescript.locale', null);
		}
	}
	exports.TypeScriptServiceConfiguration = TypeScriptServiceConfiguration;


	/***/ }),
	/* 75 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const temp = __webpack_require__(31);
	const path = __webpack_require__(7);
	const fs = __webpack_require__(8);
	const cp = __webpack_require__(76);
	const getRootTempDir = (() => {
		let dir;
		return () => {
			if (!dir) {
				dir = temp.getTempFile(`vscode-typescript`);
			}
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			return dir;
		};
	})();
	function getTempFile(prefix) {
		return path.join(getRootTempDir(), `${prefix}-${temp.makeRandomHexString(20)}.tmp`);
	}
	exports.getTempFile = getTempFile;
	function generatePatchedEnv(env, modulePath) {
		const newEnv = Object.assign({}, env);
		newEnv['ELECTRON_RUN_AS_NODE'] = '1';
		newEnv['NODE_PATH'] = path.join(modulePath, '..', '..', '..');
		// Ensure we always have a PATH set
		newEnv['PATH'] = newEnv['PATH'] || process.env.PATH;
		return newEnv;
	}
	function fork(modulePath, args, options) {
		const newEnv = generatePatchedEnv(process.env, modulePath);
		return cp.fork(modulePath, args, {
			silent: true,
			cwd: options.cwd,
			env: newEnv,
			execArgv: options.execArgv
		});
	}
	exports.fork = fork;


	/***/ }),
	/* 76 */
	/***/ (function(module, exports) {

	module.exports = require("child_process");

	/***/ }),
	/* 77 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const dispose_1 = __webpack_require__(16);
	const defaultSize = 8192;
	const contentLength = 'Content-Length: ';
	const contentLengthSize = Buffer.byteLength(contentLength, 'utf8');
	const blank = Buffer.from(' ', 'utf8')[0];
	const backslashR = Buffer.from('\r', 'utf8')[0];
	const backslashN = Buffer.from('\n', 'utf8')[0];
	class ProtocolBuffer {
		constructor() {
			this.index = 0;
			this.buffer = Buffer.allocUnsafe(defaultSize);
		}
		append(data) {
			let toAppend = null;
			if (Buffer.isBuffer(data)) {
				toAppend = data;
			}
			else {
				toAppend = Buffer.from(data, 'utf8');
			}
			if (this.buffer.length - this.index >= toAppend.length) {
				toAppend.copy(this.buffer, this.index, 0, toAppend.length);
			}
			else {
				let newSize = (Math.ceil((this.index + toAppend.length) / defaultSize) + 1) * defaultSize;
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
		tryReadContentLength() {
			let result = -1;
			let current = 0;
			// we are utf8 encoding...
			while (current < this.index && (this.buffer[current] === blank || this.buffer[current] === backslashR || this.buffer[current] === backslashN)) {
				current++;
			}
			if (this.index < current + contentLengthSize) {
				return result;
			}
			current += contentLengthSize;
			let start = current;
			while (current < this.index && this.buffer[current] !== backslashR) {
				current++;
			}
			if (current + 3 >= this.index || this.buffer[current + 1] !== backslashN || this.buffer[current + 2] !== backslashR || this.buffer[current + 3] !== backslashN) {
				return result;
			}
			let data = this.buffer.toString('utf8', start, current);
			result = parseInt(data);
			this.buffer = this.buffer.slice(current + 4);
			this.index = this.index - (current + 4);
			return result;
		}
		tryReadContent(length) {
			if (this.index < length) {
				return null;
			}
			let result = this.buffer.toString('utf8', 0, length);
			let sourceStart = length;
			while (sourceStart < this.index && (this.buffer[sourceStart] === backslashR || this.buffer[sourceStart] === backslashN)) {
				sourceStart++;
			}
			this.buffer.copy(this.buffer, 0, sourceStart);
			this.index = this.index - sourceStart;
			return result;
		}
	}
	class Reader extends dispose_1.Disposable {
		constructor(readable) {
			super();
			this.buffer = new ProtocolBuffer();
			this.nextMessageLength = -1;
			this._onError = this._register(new vscode.EventEmitter());
			this.onError = this._onError.event;
			this._onData = this._register(new vscode.EventEmitter());
			this.onData = this._onData.event;
			readable.on('data', data => this.onLengthData(data));
		}
		onLengthData(data) {
			if (this.isDisposed) {
				return;
			}
			try {
				this.buffer.append(data);
				while (true) {
					if (this.nextMessageLength === -1) {
						this.nextMessageLength = this.buffer.tryReadContentLength();
						if (this.nextMessageLength === -1) {
							return;
						}
					}
					const msg = this.buffer.tryReadContent(this.nextMessageLength);
					if (msg === null) {
						return;
					}
					this.nextMessageLength = -1;
					const json = JSON.parse(msg);
					this._onData.fire(json);
				}
			}
			catch (e) {
				this._onError.fire(e);
			}
		}
	}
	exports.Reader = Reader;


	/***/ }),
	/* 78 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const typescriptService_1 = __webpack_require__(73);
	class CallbackMap {
		constructor() {
			this._callbacks = new Map();
			this._asyncCallbacks = new Map();
		}
		destroy(cause) {
			const cancellation = new typescriptService_1.ServerResponse.Cancelled(cause);
			for (const callback of this._callbacks.values()) {
				callback.onSuccess(cancellation);
			}
			this._callbacks.clear();
			for (const callback of this._asyncCallbacks.values()) {
				callback.onSuccess(cancellation);
			}
			this._asyncCallbacks.clear();
		}
		add(seq, callback, isAsync) {
			if (isAsync) {
				this._asyncCallbacks.set(seq, callback);
			}
			else {
				this._callbacks.set(seq, callback);
			}
		}
		fetch(seq) {
			const callback = this._callbacks.get(seq) || this._asyncCallbacks.get(seq);
			this.delete(seq);
			return callback;
		}
		delete(seq) {
			if (!this._callbacks.delete(seq)) {
				this._asyncCallbacks.delete(seq);
			}
		}
	}
	exports.CallbackMap = CallbackMap;


	/***/ }),
	/* 79 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	var RequestQueueingType;
	(function (RequestQueueingType) {
		/**
		 * Normal request that is executed in order.
		 */
		RequestQueueingType[RequestQueueingType["Normal"] = 1] = "Normal";
		/**
		 * Request that normal requests jump in front of in the queue.
		 */
		RequestQueueingType[RequestQueueingType["LowPriority"] = 2] = "LowPriority";
		/**
		 * A fence that blocks request reordering.
		 *
		 * Fences are not reordered. Unlike a normal request, a fence will never jump in front of a low priority request
		 * in the request queue.
		 */
		RequestQueueingType[RequestQueueingType["Fence"] = 3] = "Fence";
	})(RequestQueueingType = exports.RequestQueueingType || (exports.RequestQueueingType = {}));
	class RequestQueue {
		constructor() {
			this.queue = [];
			this.sequenceNumber = 0;
		}
		get length() {
			return this.queue.length;
		}
		enqueue(item) {
			if (item.queueingType === RequestQueueingType.Normal) {
				let index = this.queue.length - 1;
				while (index >= 0) {
					if (this.queue[index].queueingType !== RequestQueueingType.LowPriority) {
						break;
					}
					--index;
				}
				this.queue.splice(index + 1, 0, item);
			}
			else {
				// Only normal priority requests can be reordered. All other requests just go to the end.
				this.queue.push(item);
			}
		}
		dequeue() {
			return this.queue.shift();
		}
		tryDeletePendingRequest(seq) {
			for (let i = 0; i < this.queue.length; i++) {
				if (this.queue[i].request.seq === seq) {
					this.queue.splice(i, 1);
					return true;
				}
			}
			return false;
		}
		createRequest(command, args) {
			return {
				seq: this.sequenceNumber++,
				type: 'request',
				command: command,
				arguments: args
			};
		}
	}
	exports.RequestQueue = RequestQueue;


	/***/ }),
	/* 80 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const memoize_1 = __webpack_require__(30);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/logger.ts'));
	class Logger {
		get output() {
			return vscode.window.createOutputChannel(localize(0, null));
		}
		data2String(data) {
			if (data instanceof Error) {
				return data.stack || data.message;
			}
			if (data.success === false && data.message) {
				return data.message;
			}
			return data.toString();
		}
		info(message, data) {
			this.logLevel('Info', message, data);
		}
		error(message, data) {
			// See https://github.com/Microsoft/TypeScript/issues/10496
			if (data && data.message === 'No content available.') {
				return;
			}
			this.logLevel('Error', message, data);
		}
		logLevel(level, message, data) {
			this.output.appendLine(`[${level}  - ${(new Date().toLocaleTimeString())}] ${message}`);
			if (data) {
				this.output.appendLine(this.data2String(data));
			}
		}
	}
	__decorate([
		memoize_1.memoize
	], Logger.prototype, "output", null);
	exports.default = Logger;


	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const relativePathResolver_1 = __webpack_require__(82);
	class TypeScriptPluginPathsProvider {
		constructor(configuration) {
			this.configuration = configuration;
			this.relativePathResolver = new relativePathResolver_1.RelativeWorkspacePathResolver();
		}
		updateConfiguration(configuration) {
			this.configuration = configuration;
		}
		getPluginPaths() {
			const pluginPaths = [];
			for (const pluginPath of this.configuration.tsServerPluginPaths) {
				pluginPaths.push(...this.resolvePluginPath(pluginPath));
			}
			return pluginPaths;
		}
		resolvePluginPath(pluginPath) {
			if (path.isAbsolute(pluginPath)) {
				return [pluginPath];
			}
			const workspacePath = this.relativePathResolver.asAbsoluteWorkspacePath(pluginPath);
			if (workspacePath !== undefined) {
				return [workspacePath];
			}
			return (vscode.workspace.workspaceFolders || [])
				.map(workspaceFolder => path.join(workspaceFolder.uri.fsPath, pluginPath));
		}
	}
	exports.TypeScriptPluginPathsProvider = TypeScriptPluginPathsProvider;


	/***/ }),
	/* 82 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	class RelativeWorkspacePathResolver {
		asAbsoluteWorkspacePath(relativePath) {
			for (const root of vscode.workspace.workspaceFolders || []) {
				const rootPrefixes = [`./${root.name}/`, `${root.name}/`, `.\\${root.name}\\`, `${root.name}\\`];
				for (const rootPrefix of rootPrefixes) {
					if (relativePath.startsWith(rootPrefix)) {
						return path.join(root.uri.fsPath, relativePath.replace(rootPrefix, ''));
					}
				}
			}
			return undefined;
		}
	}
	exports.RelativeWorkspacePathResolver = RelativeWorkspacePathResolver;


	/***/ }),
	/* 83 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const vscode_extension_telemetry_1 = __webpack_require__(84);
	const memoize_1 = __webpack_require__(30);
	class TelemetryReporter {
		constructor(clientVersionDelegate) {
			this.clientVersionDelegate = clientVersionDelegate;
			this._reporter = null;
		}
		dispose() {
			if (this._reporter) {
				this._reporter.dispose();
				this._reporter = null;
			}
		}
		logTelemetry(eventName, properties) {
			const reporter = this.reporter;
			if (reporter) {
				if (!properties) {
					properties = {};
				}
				/* __GDPR__FRAGMENT__
					"TypeScriptCommonProperties" : {
						"version" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
					}
				*/
				properties['version'] = this.clientVersionDelegate();
				reporter.sendTelemetryEvent(eventName, properties);
			}
		}
		get reporter() {
			if (this.packageInfo && this.packageInfo.aiKey) {
				this._reporter = new vscode_extension_telemetry_1.default(this.packageInfo.name, this.packageInfo.version, this.packageInfo.aiKey);
				return this._reporter;
			}
			return null;
		}
		get packageInfo() {
			const { packageJSON } = vscode.extensions.getExtension('vscode.typescript-language-features');
			if (packageJSON) {
				return {
					name: packageJSON.name,
					version: packageJSON.version,
					aiKey: packageJSON.aiKey
				};
			}
			return null;
		}
	}
	__decorate([
		memoize_1.memoize
	], TelemetryReporter.prototype, "reporter", null);
	__decorate([
		memoize_1.memoize
	], TelemetryReporter.prototype, "packageInfo", null);
	exports.default = TelemetryReporter;


	/***/ }),
	/* 84 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	/*---------------------------------------------------------
	 * Copyright (C) Microsoft Corporation. All rights reserved.
	 *--------------------------------------------------------*/

	Object.defineProperty(exports, "__esModule", { value: true });
	process.env['APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL'] = true;
	var fs = __webpack_require__(8);
	var os = __webpack_require__(32);
	var path = __webpack_require__(7);
	var vscode = __webpack_require__(1);
	var appInsights = __webpack_require__(85);
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
	/* 85 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var CorrelationContextManager = __webpack_require__(86); // Keep this first
	var AutoCollectConsole = __webpack_require__(113);
	var AutoCollectExceptions = __webpack_require__(140);
	var AutoCollectPerformance = __webpack_require__(141);
	var AutoCollectHttpDependencies = __webpack_require__(142);
	var AutoCollectHttpRequests = __webpack_require__(156);
	var Logging = __webpack_require__(87);
	// We export these imports so that SDK users may use these classes directly.
	// They're exposed using "export import" so that types are passed along as expected
	exports.TelemetryClient = __webpack_require__(158);
	exports.Contracts = __webpack_require__(115);
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
	/* 86 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Logging = __webpack_require__(87);
	var DiagChannel = __webpack_require__(88);
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
						__webpack_require__(109);
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
	/* 87 */
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
	/* 88 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IsInitialized = !process.env["APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL"];
	if (exports.IsInitialized) {
		var publishers = __webpack_require__(89);
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
		__webpack_require__(91).channel.addContextPreservation(cb);
	}
	exports.registerContextPreservation = registerContextPreservation;
	//# sourceMappingURL=initialization.js.map

	/***/ }),
	/* 89 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var bunyan = __webpack_require__(90);
	exports.bunyan = bunyan;
	var consolePub = __webpack_require__(96);
	exports.console = consolePub;
	var mongodbCore = __webpack_require__(99);
	exports.mongodbCore = mongodbCore;
	var mongodb = __webpack_require__(100);
	exports.mongodb = mongodb;
	var mysql = __webpack_require__(101);
	exports.mysql = mysql;
	var pgPool = __webpack_require__(104);
	exports.pgPool = pgPool;
	var pg = __webpack_require__(105);
	exports.pg = pg;
	var redis = __webpack_require__(107);
	exports.redis = redis;
	var winston = __webpack_require__(108);
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
	/* 90 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 91 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var patchRequire_1 = __webpack_require__(92);
	var patchRequire_2 = __webpack_require__(92);
	exports.makePatchingRequire = patchRequire_2.makePatchingRequire;
	var trueFilter = function (publishing) { return true; };
	var ContextPreservingEventEmitter = (function () {
		function ContextPreservingEventEmitter() {
			this.version = __webpack_require__(95).version; // Allow for future versions to replace things?
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
		var moduleModule = __webpack_require__(94);
		// Note: We pass in the object now before any patches are registered, but the object is passed by reference
		// so any updates made to the object will be visible in the patcher.
		moduleModule.prototype.require = patchRequire_1.makePatchingRequire(global.diagnosticsSource.getPatchesObject());
	}
	exports.channel = global.diagnosticsSource;
	//# sourceMappingURL=channel.js.map

	/***/ }),
	/* 92 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	Object.defineProperty(exports, "__esModule", { value: true });
	var path = __webpack_require__(7);
	var semver = __webpack_require__(93);
	/* tslint:disable-next-line:no-var-requires */
	var moduleModule = __webpack_require__(94);
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
	/* 93 */
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
	/* 94 */
	/***/ (function(module, exports) {

	module.exports = require("module");

	/***/ }),
	/* 95 */
	/***/ (function(module) {

	module.exports = {"name":"diagnostic-channel","version":"0.2.0","main":"./dist/src/channel.js","types":"./dist/src/channel.d.ts","scripts":{"build":"tsc","lint":"tslint -c tslint.json -p tsconfig.json","clean":"rimraf ./dist","test":"mocha ./dist/tests/**/*.js"},"homepage":"https://github.com/Microsoft/node-diagnostic-channel","bugs":{"url":"https://github.com/Microsoft/node-diagnostic-channel/issues"},"repository":{"type":"git","url":"https://github.com/Microsoft/node-diagnostic-channel.git"},"description":"Provides a context-saving pub/sub channel to connect diagnostic event publishers and subscribers","dependencies":{"semver":"^5.3.0"},"devDependencies":{"@types/mocha":"^2.2.40","@types/node":"^7.0.12","mocha":"^3.2.0","rimraf":"^2.6.1","tslint":"^5.0.0","typescript":"^2.2.1"},"files":["dist/src/**/*.d.ts","dist/src/**/*.js","LICENSE","README.md","package.json"],"license":"MIT"};

	/***/ }),
	/* 96 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
	var stream_1 = __webpack_require__(97);
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
		__webpack_require__(98);
	}
	exports.enable = enable;
	//# sourceMappingURL=console.pub.js.map

	/***/ }),
	/* 97 */
	/***/ (function(module, exports) {

	module.exports = require("stream");

	/***/ }),
	/* 98 */
	/***/ (function(module, exports) {

	module.exports = require("console");

	/***/ }),
	/* 99 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 100 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 101 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
	var path = __webpack_require__(7);
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
		var connectionClass = __webpack_require__(102)(path.dirname(originalMysqlPath) + "/lib/Connection");
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
		var poolClass = __webpack_require__(103)(path.dirname(originalMysqlPath) + "/lib/Pool");
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
	/* 102 */
	/***/ (function(module, exports) {

	function webpackEmptyContext(req) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	webpackEmptyContext.keys = function() { return []; };
	webpackEmptyContext.resolve = webpackEmptyContext;
	module.exports = webpackEmptyContext;
	webpackEmptyContext.id = 102;

	/***/ }),
	/* 103 */
	/***/ (function(module, exports) {

	function webpackEmptyContext(req) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	webpackEmptyContext.keys = function() { return []; };
	webpackEmptyContext.resolve = webpackEmptyContext;
	module.exports = webpackEmptyContext;
	webpackEmptyContext.id = 103;

	/***/ }),
	/* 104 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 105 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
	var events_1 = __webpack_require__(106);
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
	/* 106 */
	/***/ (function(module, exports) {

	module.exports = require("events");

	/***/ }),
	/* 107 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 108 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	// Copyright (c) Microsoft Corporation. All rights reserved.
	// Licensed under the MIT license. See LICENSE file in the project root for details.
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 109 */
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
		events = __webpack_require__(106);
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
		fs = __webpack_require__(8);
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
	var timers = __webpack_require__(110);
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
		crypto = __webpack_require__(111);
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
		httpClient = __webpack_require__(112);
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
	/* 110 */
	/***/ (function(module, exports) {

	module.exports = require("timers");

	/***/ }),
	/* 111 */
	/***/ (function(module, exports) {

	module.exports = require("crypto");

	/***/ }),
	/* 112 */
	/***/ (function(module, exports) {

	module.exports = require("_http_client");

	/***/ }),
	/* 113 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DiagChannel = __webpack_require__(88);
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
				__webpack_require__(114).enable(isEnabled && collectConsoleLog, this._client);
				__webpack_require__(138).enable(isEnabled, this._client);
				__webpack_require__(139).enable(isEnabled, this._client);
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
	/* 114 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(115);
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 115 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(116));
	__export(__webpack_require__(117));
	__export(__webpack_require__(136));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 116 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Generated_1 = __webpack_require__(117);
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
	/* 117 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	// THIS FILE WAS AUTOGENERATED

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AvailabilityData = __webpack_require__(118);
	exports.Base = __webpack_require__(120);
	exports.ContextTagKeys = __webpack_require__(121);
	exports.Data = __webpack_require__(122);
	exports.DataPoint = __webpack_require__(123);
	exports.DataPointType = __webpack_require__(124);
	exports.Domain = __webpack_require__(119);
	exports.Envelope = __webpack_require__(125);
	exports.EventData = __webpack_require__(126);
	exports.ExceptionData = __webpack_require__(127);
	exports.ExceptionDetails = __webpack_require__(128);
	exports.MessageData = __webpack_require__(129);
	exports.MetricData = __webpack_require__(130);
	exports.PageViewData = __webpack_require__(131);
	exports.RemoteDependencyData = __webpack_require__(132);
	exports.RequestData = __webpack_require__(133);
	exports.SeverityLevel = __webpack_require__(134);
	exports.StackFrame = __webpack_require__(135);
	//# sourceMappingURL=index.js.map

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
	var Domain = __webpack_require__(119);
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
	/* 119 */
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
	/* 120 */
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
	/* 121 */
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
	var Base = __webpack_require__(120);
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
	/* 123 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// THIS FILE WAS AUTOGENERATED
	var DataPointType = __webpack_require__(124);
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
	/* 124 */
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
	/* 125 */
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
	/* 126 */
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
	var Domain = __webpack_require__(119);
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
	/* 127 */
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
	var Domain = __webpack_require__(119);
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
	/* 128 */
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
	/* 129 */
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
	var Domain = __webpack_require__(119);
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
	/* 130 */
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
	var Domain = __webpack_require__(119);
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
	/* 131 */
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
	var EventData = __webpack_require__(126);
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
	/* 132 */
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
	var Domain = __webpack_require__(119);
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
	/* 133 */
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
	var Domain = __webpack_require__(119);
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
	/* 134 */
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
	/* 135 */
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
	/* 136 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(137));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 137 */
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
	/* 138 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(115);
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 139 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts_1 = __webpack_require__(115);
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 140 */
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
	/* 141 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var os = __webpack_require__(32);
	var Logging = __webpack_require__(87);
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
	/* 142 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var http = __webpack_require__(143);
	var https = __webpack_require__(144);
	var Logging = __webpack_require__(87);
	var Util = __webpack_require__(145);
	var RequestResponseHeaders = __webpack_require__(148);
	var HttpDependencyParser = __webpack_require__(149);
	var CorrelationContextManager_1 = __webpack_require__(86);
	var DiagChannel = __webpack_require__(88);
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
				__webpack_require__(152).enable(isEnabled, this._client);
				__webpack_require__(153).enable(isEnabled, this._client);
				__webpack_require__(154).enable(isEnabled, this._client);
				__webpack_require__(155).enable(isEnabled, this._client);
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
	/* 143 */
	/***/ (function(module, exports) {

	module.exports = require("http");

	/***/ }),
	/* 144 */
	/***/ (function(module, exports) {

	module.exports = require("https");

	/***/ }),
	/* 145 */
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
	var http = __webpack_require__(143);
	var https = __webpack_require__(144);
	var url = __webpack_require__(146);
	var constants = __webpack_require__(147);
	var Logging = __webpack_require__(87);
	var RequestResponseHeaders = __webpack_require__(148);
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
	/* 146 */
	/***/ (function(module, exports) {

	module.exports = require("url");

	/***/ }),
	/* 147 */
	/***/ (function(module, exports) {

	module.exports = require("constants");

	/***/ }),
	/* 148 */
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
	/* 149 */
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
	var url = __webpack_require__(146);
	var Contracts = __webpack_require__(115);
	var Util = __webpack_require__(145);
	var RequestResponseHeaders = __webpack_require__(148);
	var RequestParser = __webpack_require__(150);
	var CorrelationIdManager = __webpack_require__(151);
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
	/* 150 */
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
	/* 151 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Util = __webpack_require__(145);
	var Logging = __webpack_require__(87);
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
	/* 152 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 153 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 154 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 155 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var diagnostic_channel_1 = __webpack_require__(91);
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
	/* 156 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var http = __webpack_require__(143);
	var https = __webpack_require__(144);
	var Logging = __webpack_require__(87);
	var Util = __webpack_require__(145);
	var RequestResponseHeaders = __webpack_require__(148);
	var HttpRequestParser = __webpack_require__(157);
	var CorrelationContextManager_1 = __webpack_require__(86);
	var AutoCollectPerformance = __webpack_require__(141);
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
	/* 157 */
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
	var url = __webpack_require__(146);
	var Contracts = __webpack_require__(115);
	var Util = __webpack_require__(145);
	var RequestResponseHeaders = __webpack_require__(148);
	var RequestParser = __webpack_require__(150);
	var CorrelationIdManager = __webpack_require__(151);
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
	/* 158 */
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
	var TelemetryClient = __webpack_require__(159);
	var ServerRequestTracking = __webpack_require__(156);
	var ClientRequestTracking = __webpack_require__(142);
	var Logging = __webpack_require__(87);
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
	/* 159 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var url = __webpack_require__(146);
	var Config = __webpack_require__(160);
	var Context = __webpack_require__(161);
	var Contracts = __webpack_require__(115);
	var Channel = __webpack_require__(162);
	var TelemetryProcessors = __webpack_require__(163);
	var CorrelationContextManager_1 = __webpack_require__(86);
	var Sender = __webpack_require__(165);
	var Util = __webpack_require__(145);
	var Logging = __webpack_require__(87);
	var EnvelopeFactory = __webpack_require__(167);
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
	/* 160 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var CorrelationIdManager = __webpack_require__(151);
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
	/* 161 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var os = __webpack_require__(32);
	var fs = __webpack_require__(8);
	var path = __webpack_require__(7);
	var Contracts = __webpack_require__(115);
	var Logging = __webpack_require__(87);
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
	/* 162 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Logging = __webpack_require__(87);
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
	/* 163 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
		for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(164));
	//# sourceMappingURL=index.js.map

	/***/ }),
	/* 164 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	var Contracts = __webpack_require__(115);
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
	/* 165 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var fs = __webpack_require__(8);
	var os = __webpack_require__(32);
	var path = __webpack_require__(7);
	var zlib = __webpack_require__(166);
	var child_process = __webpack_require__(76);
	var Logging = __webpack_require__(87);
	var AutoCollectHttpDependencies = __webpack_require__(142);
	var Util = __webpack_require__(145);
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
	/* 166 */
	/***/ (function(module, exports) {

	module.exports = require("zlib");

	/***/ }),
	/* 167 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var Contracts = __webpack_require__(115);
	var Util = __webpack_require__(145);
	var CorrelationContextManager_1 = __webpack_require__(86);
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
	/* 168 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	var Trace;
	(function (Trace) {
		Trace[Trace["Off"] = 0] = "Off";
		Trace[Trace["Messages"] = 1] = "Messages";
		Trace[Trace["Verbose"] = 2] = "Verbose";
	})(Trace || (Trace = {}));
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
	})(Trace || (Trace = {}));
	class Tracer {
		constructor(logger) {
			this.logger = logger;
			this.updateConfiguration();
		}
		updateConfiguration() {
			this.trace = Tracer.readTrace();
		}
		static readTrace() {
			let result = Trace.fromString(vscode.workspace.getConfiguration().get('typescript.tsserver.trace', 'off'));
			if (result === Trace.Off && !!process.env.TSS_TRACE) {
				result = Trace.Messages;
			}
			return result;
		}
		traceRequest(request, responseExpected, queueLength) {
			if (this.trace === Trace.Off) {
				return;
			}
			let data = undefined;
			if (this.trace === Trace.Verbose && request.arguments) {
				data = `Arguments: ${JSON.stringify(request.arguments, null, 4)}`;
			}
			this.logTrace(`Sending request: ${request.command} (${request.seq}). Response expected: ${responseExpected ? 'yes' : 'no'}. Current queue length: ${queueLength}`, data);
		}
		traceResponse(response, startTime) {
			if (this.trace === Trace.Off) {
				return;
			}
			let data = undefined;
			if (this.trace === Trace.Verbose && response.body) {
				data = `Result: ${JSON.stringify(response.body, null, 4)}`;
			}
			this.logTrace(`Response received: ${response.command} (${response.request_seq}). Request took ${Date.now() - startTime} ms. Success: ${response.success} ${!response.success ? '. Message: ' + response.message : ''}`, data);
		}
		traceRequestCompleted(command, request_seq, startTime) {
			if (this.trace === Trace.Off) {
				return;
			}
			this.logTrace(`Async response received: ${command} (${request_seq}). Request took ${Date.now() - startTime} ms.`);
		}
		traceEvent(event) {
			if (this.trace === Trace.Off) {
				return;
			}
			let data = undefined;
			if (this.trace === Trace.Verbose && event.body) {
				data = `Data: ${JSON.stringify(event.body, null, 4)}`;
			}
			this.logTrace(`Event received: ${event.event} (${event.seq}).`, data);
		}
		logTrace(message, data) {
			if (this.trace !== Trace.Off) {
				this.logger.logLevel('Trace', message, data);
			}
		}
	}
	exports.default = Tracer;


	/***/ }),
	/* 169 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/versionPicker.ts'));
	const useWorkspaceTsdkStorageKey = 'typescript.useWorkspaceTsdk';
	var MessageAction;
	(function (MessageAction) {
		MessageAction[MessageAction["useLocal"] = 0] = "useLocal";
		MessageAction[MessageAction["useBundled"] = 1] = "useBundled";
		MessageAction[MessageAction["learnMore"] = 2] = "learnMore";
	})(MessageAction || (MessageAction = {}));
	class TypeScriptVersionPicker {
		constructor(versionProvider, workspaceState) {
			this.versionProvider = versionProvider;
			this.workspaceState = workspaceState;
			this._currentVersion = this.versionProvider.defaultVersion;
			if (this.useWorkspaceTsdkSetting) {
				const localVersion = this.versionProvider.localVersion;
				if (localVersion) {
					this._currentVersion = localVersion;
				}
			}
		}
		get useWorkspaceTsdkSetting() {
			return this.workspaceState.get(useWorkspaceTsdkStorageKey, false);
		}
		get currentVersion() {
			return this._currentVersion;
		}
		useBundledVersion() {
			this._currentVersion = this.versionProvider.bundledVersion;
		}
		async show(firstRun) {
			const pickOptions = [];
			const shippedVersion = this.versionProvider.defaultVersion;
			pickOptions.push({
				label: (!this.useWorkspaceTsdkSetting
					? '• '
					: '') + localize(0, null),
				description: shippedVersion.versionString,
				detail: shippedVersion.pathLabel,
				id: MessageAction.useBundled,
			});
			for (const version of this.versionProvider.localVersions) {
				pickOptions.push({
					label: (this.useWorkspaceTsdkSetting && this.currentVersion.path === version.path
						? '• '
						: '') + localize(1, null),
					description: version.versionString,
					detail: version.pathLabel,
					id: MessageAction.useLocal,
					version
				});
			}
			pickOptions.push({
				label: localize(2, null),
				description: '',
				id: MessageAction.learnMore
			});
			const selected = await vscode.window.showQuickPick(pickOptions, {
				placeHolder: localize(3, null),
				ignoreFocusOut: firstRun,
			});
			if (!selected) {
				return { oldVersion: this.currentVersion };
			}
			switch (selected.id) {
				case MessageAction.useLocal:
					await this.workspaceState.update(useWorkspaceTsdkStorageKey, true);
					if (selected.version) {
						const tsConfig = vscode.workspace.getConfiguration('typescript');
						await tsConfig.update('tsdk', selected.version.pathLabel, false);
						const previousVersion = this.currentVersion;
						this._currentVersion = selected.version;
						return { oldVersion: previousVersion, newVersion: selected.version };
					}
					return { oldVersion: this.currentVersion };
				case MessageAction.useBundled:
					await this.workspaceState.update(useWorkspaceTsdkStorageKey, false);
					const previousVersion = this.currentVersion;
					this._currentVersion = shippedVersion;
					return { oldVersion: previousVersion, newVersion: shippedVersion };
				case MessageAction.learnMore:
					vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://go.microsoft.com/fwlink/?linkid=839919'));
					return { oldVersion: this.currentVersion };
				default:
					return { oldVersion: this.currentVersion };
			}
		}
	}
	exports.TypeScriptVersionPicker = TypeScriptVersionPicker;


	/***/ }),
	/* 170 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", { value: true });
	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const relativePathResolver_1 = __webpack_require__(82);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/versionProvider.ts'));
	class TypeScriptVersion {
		constructor(path, _pathLabel) {
			this.path = path;
			this._pathLabel = _pathLabel;
		}
		get tsServerPath() {
			return path.join(this.path, 'tsserver.js');
		}
		get pathLabel() {
			return typeof this._pathLabel === 'undefined' ? this.path : this._pathLabel;
		}
		get isValid() {
			return this.version !== undefined;
		}
		get version() {
			const version = this.getTypeScriptVersion(this.tsServerPath);
			if (version) {
				return version;
			}
			// Allow TS developers to provide custom version
			const tsdkVersion = vscode.workspace.getConfiguration().get('typescript.tsdk_version', undefined);
			if (tsdkVersion) {
				return api_1.default.fromVersionString(tsdkVersion);
			}
			return undefined;
		}
		get versionString() {
			const version = this.version;
			return version ? version.versionString : localize(0, null);
		}
		getTypeScriptVersion(serverPath) {
			if (!fs.existsSync(serverPath)) {
				return undefined;
			}
			const p = serverPath.split(path.sep);
			if (p.length <= 2) {
				return undefined;
			}
			const p2 = p.slice(0, -2);
			const modulePath = p2.join(path.sep);
			let fileName = path.join(modulePath, 'package.json');
			if (!fs.existsSync(fileName)) {
				// Special case for ts dev versions
				if (path.basename(modulePath) === 'built') {
					fileName = path.join(modulePath, '..', 'package.json');
				}
			}
			if (!fs.existsSync(fileName)) {
				return undefined;
			}
			const contents = fs.readFileSync(fileName).toString();
			let desc = null;
			try {
				desc = JSON.parse(contents);
			}
			catch (err) {
				return undefined;
			}
			if (!desc || !desc.version) {
				return undefined;
			}
			return desc.version ? api_1.default.fromVersionString(desc.version) : undefined;
		}
	}
	exports.TypeScriptVersion = TypeScriptVersion;
	class TypeScriptVersionProvider {
		constructor(configuration) {
			this.configuration = configuration;
			this.relativePathResolver = new relativePathResolver_1.RelativeWorkspacePathResolver();
		}
		updateConfiguration(configuration) {
			this.configuration = configuration;
		}
		get defaultVersion() {
			return this.globalVersion || this.bundledVersion;
		}
		get globalVersion() {
			if (this.configuration.globalTsdk) {
				const globals = this.loadVersionsFromSetting(this.configuration.globalTsdk);
				if (globals && globals.length) {
					return globals[0];
				}
			}
			return undefined;
		}
		get localVersion() {
			const tsdkVersions = this.localTsdkVersions;
			if (tsdkVersions && tsdkVersions.length) {
				return tsdkVersions[0];
			}
			const nodeVersions = this.localNodeModulesVersions;
			if (nodeVersions && nodeVersions.length === 1) {
				return nodeVersions[0];
			}
			return undefined;
		}
		get localVersions() {
			const allVersions = this.localTsdkVersions.concat(this.localNodeModulesVersions);
			const paths = new Set();
			return allVersions.filter(x => {
				if (paths.has(x.path)) {
					return false;
				}
				paths.add(x.path);
				return true;
			});
		}
		get bundledVersion() {
			try {
				const { extensionPath } = vscode.extensions.getExtension('vscode.typescript-language-features');
				const typescriptPath = path.join(extensionPath, '../node_modules/typescript/lib');
				const bundledVersion = new TypeScriptVersion(typescriptPath, '');
				if (bundledVersion.isValid) {
					return bundledVersion;
				}
			}
			catch (e) {
				// noop
			}
			vscode.window.showErrorMessage(localize(1, null));
			throw new Error('Could not find bundled tsserver.js');
		}
		get localTsdkVersions() {
			const localTsdk = this.configuration.localTsdk;
			return localTsdk ? this.loadVersionsFromSetting(localTsdk) : [];
		}
		loadVersionsFromSetting(tsdkPathSetting) {
			if (path.isAbsolute(tsdkPathSetting)) {
				return [new TypeScriptVersion(tsdkPathSetting)];
			}
			const workspacePath = this.relativePathResolver.asAbsoluteWorkspacePath(tsdkPathSetting);
			if (workspacePath !== undefined) {
				return [new TypeScriptVersion(workspacePath, tsdkPathSetting)];
			}
			return this.loadTypeScriptVersionsFromPath(tsdkPathSetting);
		}
		get localNodeModulesVersions() {
			return this.loadTypeScriptVersionsFromPath(path.join('node_modules', 'typescript', 'lib'))
				.filter(x => x.isValid);
		}
		loadTypeScriptVersionsFromPath(relativePath) {
			if (!vscode.workspace.workspaceFolders) {
				return [];
			}
			const versions = [];
			for (const root of vscode.workspace.workspaceFolders) {
				let label = relativePath;
				if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1) {
					label = path.join(root.name, relativePath);
				}
				versions.push(new TypeScriptVersion(path.join(root.uri.fsPath, relativePath), label));
			}
			return versions;
		}
	}
	exports.TypeScriptVersionProvider = TypeScriptVersionProvider;


	/***/ }),
	/* 171 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const vscode_nls_1 = __webpack_require__(6);
	const dispose_1 = __webpack_require__(16);
	const localize = vscode_nls_1.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/typingsStatus.ts'));
	const typingsInstallTimeout = 30 * 1000;
	class TypingsStatus extends dispose_1.Disposable {
		constructor(client) {
			super();
			this._acquiringTypings = Object.create({});
			this._subscriptions = [];
			this._client = client;
			this._subscriptions.push(this._client.onDidBeginInstallTypings(event => this.onBeginInstallTypings(event.eventId)));
			this._subscriptions.push(this._client.onDidEndInstallTypings(event => this.onEndInstallTypings(event.eventId)));
		}
		dispose() {
			super.dispose();
			this._subscriptions.forEach(x => x.dispose());
			for (const eventId of Object.keys(this._acquiringTypings)) {
				clearTimeout(this._acquiringTypings[eventId]);
			}
		}
		get isAcquiringTypings() {
			return Object.keys(this._acquiringTypings).length > 0;
		}
		onBeginInstallTypings(eventId) {
			if (this._acquiringTypings[eventId]) {
				return;
			}
			this._acquiringTypings[eventId] = setTimeout(() => {
				this.onEndInstallTypings(eventId);
			}, typingsInstallTimeout);
		}
		onEndInstallTypings(eventId) {
			const timer = this._acquiringTypings[eventId];
			if (timer) {
				clearTimeout(timer);
			}
			delete this._acquiringTypings[eventId];
		}
	}
	exports.default = TypingsStatus;
	class AtaProgressReporter {
		constructor(client) {
			this._promises = new Map();
			this._disposable = vscode.Disposable.from(client.onDidBeginInstallTypings(e => this._onBegin(e.eventId)), client.onDidEndInstallTypings(e => this._onEndOrTimeout(e.eventId)), client.onTypesInstallerInitializationFailed(_ => this.onTypesInstallerInitializationFailed()));
		}
		dispose() {
			this._disposable.dispose();
			this._promises.forEach(value => value());
		}
		_onBegin(eventId) {
			const handle = setTimeout(() => this._onEndOrTimeout(eventId), typingsInstallTimeout);
			const promise = new Promise(resolve => {
				this._promises.set(eventId, () => {
					clearTimeout(handle);
					resolve();
				});
			});
			vscode.window.withProgress({
				location: vscode.ProgressLocation.Window,
				title: localize(0, null)
			}, () => promise);
		}
		_onEndOrTimeout(eventId) {
			const resolve = this._promises.get(eventId);
			if (resolve) {
				this._promises.delete(eventId);
				resolve();
			}
		}
		onTypesInstallerInitializationFailed() {
			if (vscode.workspace.getConfiguration('typescript').get('check.npmIsInstalled', true)) {
				vscode.window.showWarningMessage(localize(1, null, 'https://go.microsoft.com/fwlink/?linkid=847635'), {
					title: localize(2, null),
					id: 1
				}).then(selected => {
					if (!selected) {
						return;
					}
					switch (selected.id) {
						case 1:
							const tsConfig = vscode.workspace.getConfiguration('typescript');
							tsConfig.update('check.npmIsInstalled', false, true);
							break;
					}
				});
			}
		}
	}
	exports.AtaProgressReporter = AtaProgressReporter;


	/***/ }),
	/* 172 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const languageModeIds = __webpack_require__(17);
	const dispose_1 = __webpack_require__(16);
	class VersionStatus extends dispose_1.Disposable {
		constructor(_normalizePath) {
			super();
			this._normalizePath = _normalizePath;
			this._versionBarEntry = this._register(vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99 /* to the right of editor status (100) */));
			vscode.window.onDidChangeActiveTextEditor(this.showHideStatus, this, this._disposables);
		}
		onDidChangeTypeScriptVersion(version) {
			this.showHideStatus();
			this._versionBarEntry.text = version.versionString;
			this._versionBarEntry.tooltip = version.path;
			this._versionBarEntry.command = 'typescript.selectTypeScriptVersion';
		}
		showHideStatus() {
			if (!vscode.window.activeTextEditor) {
				this._versionBarEntry.hide();
				return;
			}
			const doc = vscode.window.activeTextEditor.document;
			if (vscode.languages.match([languageModeIds.typescript, languageModeIds.typescriptreact], doc)) {
				if (this._normalizePath(doc.uri)) {
					this._versionBarEntry.show();
				}
				else {
					this._versionBarEntry.hide();
				}
				return;
			}
			if (!vscode.window.activeTextEditor.viewColumn) {
				// viewColumn is undefined for the debug/output panel, but we still want
				// to show the version info in the existing editor
				return;
			}
			this._versionBarEntry.hide();
		}
	}
	exports.default = VersionStatus;


	/***/ }),
	/* 173 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const api_1 = __webpack_require__(27);
	const cancellation_1 = __webpack_require__(9);
	const dependentRegistration_1 = __webpack_require__(40);
	const dispose_1 = __webpack_require__(16);
	const fileSchemes = __webpack_require__(35);
	const languageModeIds_1 = __webpack_require__(17);
	const regexp_1 = __webpack_require__(55);
	const typeConverters = __webpack_require__(39);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'features/updatePathsOnRename.ts'));
	const updateImportsOnFileMoveName = 'updateImportsOnFileMove.enabled';
	var UpdateImportsOnFileMoveSetting;
	(function (UpdateImportsOnFileMoveSetting) {
		UpdateImportsOnFileMoveSetting["Prompt"] = "prompt";
		UpdateImportsOnFileMoveSetting["Always"] = "always";
		UpdateImportsOnFileMoveSetting["Never"] = "never";
	})(UpdateImportsOnFileMoveSetting || (UpdateImportsOnFileMoveSetting = {}));
	class UpdateImportsOnFileRenameHandler extends dispose_1.Disposable {
		constructor(client, fileConfigurationManager, _handles) {
			super();
			this.client = client;
			this.fileConfigurationManager = fileConfigurationManager;
			this._handles = _handles;
			this._register(vscode.workspace.onDidRenameFile(e => {
				vscode.window.withProgress({
					location: vscode.ProgressLocation.Window,
					title: localize(0, null)
				}, () => {
					return this.doRename(e.oldUri, e.newUri);
				});
			}));
		}
		async doRename(oldResource, newResource) {
			const targetResource = await this.getTargetResource(newResource);
			if (!targetResource) {
				return;
			}
			const targetFile = this.client.toPath(targetResource);
			if (!targetFile) {
				return;
			}
			const newFile = this.client.toPath(newResource);
			if (!newFile) {
				return;
			}
			const oldFile = this.client.toPath(oldResource);
			if (!oldFile) {
				return;
			}
			const document = await vscode.workspace.openTextDocument(targetResource);
			const config = this.getConfiguration(document);
			const setting = config.get(updateImportsOnFileMoveName);
			if (setting === UpdateImportsOnFileMoveSetting.Never) {
				return;
			}
			// Make sure TS knows about file
			this.client.bufferSyncSupport.closeResource(oldResource);
			this.client.bufferSyncSupport.openTextDocument(document);
			if (this.client.apiVersion.lt(api_1.default.v300) && !fs.lstatSync(newResource.fsPath).isDirectory()) {
				// Workaround for https://github.com/Microsoft/vscode/issues/52967
				// Never attempt to update import paths if the file does not contain something the looks like an export
				try {
					const response = await this.client.execute('navtree', { file: newFile }, cancellation_1.nulToken);
					if (response.type !== 'response' || !response.body) {
						return;
					}
					const hasExport = (node) => {
						return !!node.kindModifiers.match(/\bexports?\b/g) || !!(node.childItems && node.childItems.some(hasExport));
					};
					if (!hasExport(response.body)) {
						return;
					}
				}
				catch (_a) {
					// noop
				}
			}
			const edits = await this.getEditsForFileRename(targetFile, document, oldFile, newFile);
			if (!edits || !edits.size) {
				return;
			}
			if (await this.confirmActionWithUser(newResource, document)) {
				await vscode.workspace.applyEdit(edits);
			}
		}
		async confirmActionWithUser(newResource, newDocument) {
			const config = this.getConfiguration(newDocument);
			const setting = config.get(updateImportsOnFileMoveName);
			switch (setting) {
				case UpdateImportsOnFileMoveSetting.Always:
					return true;
				case UpdateImportsOnFileMoveSetting.Never:
					return false;
				case UpdateImportsOnFileMoveSetting.Prompt:
				default:
					return this.promptUser(newResource, newDocument);
			}
		}
		getConfiguration(newDocument) {
			return vscode.workspace.getConfiguration(languageModeIds_1.isTypeScriptDocument(newDocument) ? 'typescript' : 'javascript', newDocument.uri);
		}
		async promptUser(newResource, newDocument) {
			let Choice;
			(function (Choice) {
				Choice[Choice["None"] = 0] = "None";
				Choice[Choice["Accept"] = 1] = "Accept";
				Choice[Choice["Reject"] = 2] = "Reject";
				Choice[Choice["Always"] = 3] = "Always";
				Choice[Choice["Never"] = 4] = "Never";
			})(Choice || (Choice = {}));
			const response = await vscode.window.showInformationMessage(localize(1, null, path.basename(newResource.fsPath)), {
				modal: true,
			}, {
				title: localize(2, null),
				choice: Choice.Reject,
				isCloseAffordance: true,
			}, {
				title: localize(3, null),
				choice: Choice.Accept,
			}, {
				title: localize(4, null),
				choice: Choice.Always,
			}, {
				title: localize(5, null),
				choice: Choice.Never,
			});
			if (!response) {
				return false;
			}
			switch (response.choice) {
				case Choice.Accept:
					{
						return true;
					}
				case Choice.Reject:
					{
						return false;
					}
				case Choice.Always:
					{
						const config = this.getConfiguration(newDocument);
						config.update(updateImportsOnFileMoveName, UpdateImportsOnFileMoveSetting.Always, vscode.ConfigurationTarget.Global);
						return true;
					}
				case Choice.Never:
					{
						const config = this.getConfiguration(newDocument);
						config.update(updateImportsOnFileMoveName, UpdateImportsOnFileMoveSetting.Never, vscode.ConfigurationTarget.Global);
						return false;
					}
			}
			return false;
		}
		async getTargetResource(resource) {
			if (resource.scheme !== fileSchemes.file) {
				return undefined;
			}
			const isDirectory = fs.lstatSync(resource.fsPath).isDirectory();
			if (isDirectory && this.client.apiVersion.gte(api_1.default.v300)) {
				return resource;
			}
			if (isDirectory && this.client.apiVersion.gte(api_1.default.v292)) {
				const files = await vscode.workspace.findFiles({
					base: resource.fsPath,
					pattern: '**/*.{ts,tsx,js,jsx}',
				}, '**/node_modules/**', 1);
				return files[0];
			}
			return (await this._handles(resource)) ? resource : undefined;
		}
		async getEditsForFileRename(targetResource, document, oldFile, newFile) {
			const isDirectoryRename = fs.lstatSync(newFile).isDirectory();
			const response = await this.client.interruptGetErr(() => {
				this.fileConfigurationManager.setGlobalConfigurationFromDocument(document, cancellation_1.nulToken);
				const args = {
					file: targetResource,
					oldFilePath: oldFile,
					newFilePath: newFile,
				};
				return this.client.execute('getEditsForFileRename', args, cancellation_1.nulToken);
			});
			if (response.type !== 'response' || !response.body) {
				return;
			}
			const edits = [];
			for (const edit of response.body) {
				// Workaround for https://github.com/Microsoft/vscode/issues/52675
				if (this.client.apiVersion.lt(api_1.default.v300)) {
					if (edit.fileName.match(/[\/\\]node_modules[\/\\]/gi)) {
						continue;
					}
					for (const change of edit.textChanges) {
						if (change.newText.match(/\/node_modules\//gi)) {
							continue;
						}
					}
				}
				edits.push(await this.fixEdit(edit, isDirectoryRename, oldFile, newFile));
			}
			return typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, edits);
		}
		async fixEdit(edit, isDirectoryRename, oldFile, newFile) {
			if (!isDirectoryRename || this.client.apiVersion.gte(api_1.default.v300)) {
				return edit;
			}
			const document = await vscode.workspace.openTextDocument(edit.fileName);
			const oldFileRe = new RegExp('/' + regexp_1.escapeRegExp(path.basename(oldFile)) + '/');
			// Workaround for https://github.com/Microsoft/TypeScript/issues/24968
			const textChanges = edit.textChanges.map((change) => {
				const existingText = document.getText(typeConverters.Range.fromTextSpan(change));
				const existingMatch = existingText.match(oldFileRe);
				if (!existingMatch) {
					return change;
				}
				const match = new RegExp('/' + regexp_1.escapeRegExp(path.basename(newFile)) + '/(.+)$', 'g').exec(change.newText);
				if (!match) {
					return change;
				}
				return {
					newText: change.newText.slice(0, -match[1].length),
					start: change.start,
					end: {
						line: change.end.line,
						offset: change.end.offset - match[1].length,
					},
				};
			});
			return {
				fileName: edit.fileName,
				textChanges,
			};
		}
	}
	function register(client, fileConfigurationManager, handles) {
		return new dependentRegistration_1.VersionDependentRegistration(client, api_1.default.v290, () => new UpdateImportsOnFileRenameHandler(client, fileConfigurationManager, handles));
	}
	exports.register = register;


	/***/ }),
	/* 174 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const typeConverters = __webpack_require__(39);
	function getSymbolKind(item) {
		switch (item.kind) {
			case 'method': return vscode.SymbolKind.Method;
			case 'enum': return vscode.SymbolKind.Enum;
			case 'function': return vscode.SymbolKind.Function;
			case 'class': return vscode.SymbolKind.Class;
			case 'interface': return vscode.SymbolKind.Interface;
			case 'var': return vscode.SymbolKind.Variable;
			default: return vscode.SymbolKind.Variable;
		}
	}
	class TypeScriptWorkspaceSymbolProvider {
		constructor(client, modeIds) {
			this.client = client;
			this.modeIds = modeIds;
		}
		async provideWorkspaceSymbols(search, token) {
			const document = this.getDocument();
			if (!document) {
				return [];
			}
			const filepath = this.client.toOpenedFilePath(document);
			if (!filepath) {
				return [];
			}
			const args = {
				file: filepath,
				searchValue: search
			};
			const response = await this.client.execute('navto', args, token);
			if (response.type !== 'response' || !response.body) {
				return [];
			}
			const result = [];
			for (const item of response.body) {
				if (!item.containerName && item.kind === 'alias') {
					continue;
				}
				const label = TypeScriptWorkspaceSymbolProvider.getLabel(item);
				result.push(new vscode.SymbolInformation(label, getSymbolKind(item), item.containerName || '', typeConverters.Location.fromTextSpan(this.client.toResource(item.file), item)));
			}
			return result;
		}
		static getLabel(item) {
			let label = item.name;
			if (item.kind === 'method' || item.kind === 'function') {
				label += '()';
			}
			return label;
		}
		getDocument() {
			// typescript wants to have a resource even when asking
			// general questions so we check the active editor. If this
			// doesn't match we take the first TS document.
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const document = editor.document;
				if (document && this.modeIds.indexOf(document.languageId) >= 0) {
					return document;
				}
			}
			const documents = vscode.workspace.textDocuments;
			for (const document of documents) {
				if (this.modeIds.indexOf(document.languageId) >= 0) {
					return document;
				}
			}
			return undefined;
		}
	}
	function register(client, modeIds) {
		return vscode.languages.registerWorkspaceSymbolProvider(new TypeScriptWorkspaceSymbolProvider(client, modeIds));
	}
	exports.register = register;


	/***/ }),
	/* 175 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	class CommandManager {
		constructor() {
			this.commands = new Map();
		}
		dispose() {
			for (const registration of this.commands.values()) {
				registration.dispose();
			}
			this.commands.clear();
		}
		register(command) {
			for (const id of Array.isArray(command.id) ? command.id : [command.id]) {
				this.registerCommand(id, command.execute, command);
			}
			return command;
		}
		registerCommand(id, impl, thisArg) {
			if (this.commands.has(id)) {
				return;
			}
			this.commands.set(id, vscode.commands.registerCommand(id, impl, thisArg));
		}
	}
	exports.CommandManager = CommandManager;


	/***/ }),
	/* 176 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	class LazyValue {
		constructor(_getValue) {
			this._getValue = _getValue;
			this._hasValue = false;
		}
		get value() {
			if (!this._hasValue) {
				this._hasValue = true;
				this._value = this._getValue();
			}
			return this._value;
		}
		get hasValue() {
			return this._hasValue;
		}
		map(f) {
			return new LazyValue(() => f(this.value));
		}
	}
	function lazy(getValue) {
		return new LazyValue(getValue);
	}
	exports.lazy = lazy;


	/***/ }),
	/* 177 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const fs = __webpack_require__(8);
	const path = __webpack_require__(7);
	const memoize_1 = __webpack_require__(30);
	class LogDirectoryProvider {
		constructor(context) {
			this.context = context;
		}
		getNewLogDirectory() {
			const root = this.logDirectory();
			if (root) {
				try {
					return fs.mkdtempSync(path.join(root, `tsserver-log-`));
				}
				catch (e) {
					return undefined;
				}
			}
			return undefined;
		}
		logDirectory() {
			try {
				const path = this.context.logPath;
				if (!fs.existsSync(path)) {
					fs.mkdirSync(path);
				}
				return this.context.logPath;
			}
			catch (_a) {
				return undefined;
			}
		}
	}
	__decorate([
		memoize_1.memoize
	], LogDirectoryProvider.prototype, "logDirectory", null);
	exports.default = LogDirectoryProvider;


	/***/ }),
	/* 178 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const languageModeIds_1 = __webpack_require__(17);
	const dispose_1 = __webpack_require__(16);
	/**
	 * When clause context set when the current file is managed by vscode's built-in typescript extension.
	 */
	class ManagedFileContextManager extends dispose_1.Disposable {
		constructor(normalizePath) {
			super();
			this.normalizePath = normalizePath;
			this.isInManagedFileContext = false;
			vscode.window.onDidChangeActiveTextEditor(this.onDidChangeActiveTextEditor, this, this._disposables);
			this.onDidChangeActiveTextEditor(vscode.window.activeTextEditor);
		}
		onDidChangeActiveTextEditor(editor) {
			if (editor) {
				const isManagedFile = languageModeIds_1.isSupportedLanguageMode(editor.document) && this.normalizePath(editor.document.uri) !== null;
				this.updateContext(isManagedFile);
			}
		}
		updateContext(newValue) {
			if (newValue === this.isInManagedFileContext) {
				return;
			}
			vscode.commands.executeCommand('setContext', ManagedFileContextManager.contextName, newValue);
			this.isInManagedFileContext = newValue;
		}
	}
	ManagedFileContextManager.contextName = 'typescript.isManagedFile';
	exports.default = ManagedFileContextManager;


	/***/ }),
	/* 179 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const arrays = __webpack_require__(47);
	const dispose_1 = __webpack_require__(16);
	var TypeScriptServerPlugin;
	(function (TypeScriptServerPlugin) {
		function equals(a, b) {
			return a.path === b.path
				&& a.name === b.name
				&& a.enableForWorkspaceTypeScriptVersions === b.enableForWorkspaceTypeScriptVersions
				&& arrays.equals(a.languages, b.languages);
		}
		TypeScriptServerPlugin.equals = equals;
	})(TypeScriptServerPlugin || (TypeScriptServerPlugin = {}));
	class PluginManager extends dispose_1.Disposable {
		constructor() {
			super();
			this._pluginConfigurations = new Map();
			this._onDidUpdatePlugins = this._register(new vscode.EventEmitter());
			this.onDidChangePlugins = this._onDidUpdatePlugins.event;
			this._onDidUpdateConfig = this._register(new vscode.EventEmitter());
			this.onDidUpdateConfig = this._onDidUpdateConfig.event;
			vscode.extensions.onDidChange(() => {
				if (!this._plugins) {
					return;
				}
				const newPlugins = this.readPlugins();
				if (!arrays.equals(arrays.flatten(Array.from(this._plugins.values())), arrays.flatten(Array.from(newPlugins.values())), TypeScriptServerPlugin.equals)) {
					this._plugins = newPlugins;
					this._onDidUpdatePlugins.fire(this);
				}
			}, undefined, this._disposables);
		}
		get plugins() {
			if (!this._plugins) {
				this._plugins = this.readPlugins();
			}
			return arrays.flatten(Array.from(this._plugins.values()));
		}
		setConfiguration(pluginId, config) {
			this._pluginConfigurations.set(pluginId, config);
			this._onDidUpdateConfig.fire({ pluginId, config });
		}
		configurations() {
			return this._pluginConfigurations.entries();
		}
		readPlugins() {
			const pluginMap = new Map();
			for (const extension of vscode.extensions.all) {
				const pack = extension.packageJSON;
				if (pack.contributes && Array.isArray(pack.contributes.typescriptServerPlugins)) {
					const plugins = [];
					for (const plugin of pack.contributes.typescriptServerPlugins) {
						plugins.push({
							name: plugin.name,
							enableForWorkspaceTypeScriptVersions: !!plugin.enableForWorkspaceTypeScriptVersions,
							path: extension.extensionPath,
							languages: Array.isArray(plugin.languages) ? plugin.languages : [],
						});
					}
					if (plugins.length) {
						pluginMap.set(extension.id, plugins);
					}
				}
			}
			return pluginMap;
		}
	}
	exports.PluginManager = PluginManager;


	/***/ }),
	/* 180 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const vscode_nls_1 = __webpack_require__(6);
	const tsconfig_1 = __webpack_require__(10);
	const localize = vscode_nls_1.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/projectStatus.ts'));
	class ExcludeHintItem {
		constructor(telemetryReporter) {
			this.telemetryReporter = telemetryReporter;
			this._item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98 /* to the right of typescript version status (99) */);
			this._item.command = 'js.projectStatus.command';
		}
		getCurrentHint() {
			return this._currentHint;
		}
		hide() {
			this._item.hide();
		}
		show(largeRoots) {
			this._currentHint = {
				message: largeRoots
					? localize(0, null, largeRoots)
					: localize(1, null)
			};
			this._item.tooltip = this._currentHint.message;
			this._item.text = localize(2, null);
			this._item.tooltip = localize(3, null);
			this._item.color = '#A5DF3B';
			this._item.show();
			/* __GDPR__
				"js.hintProjectExcludes" : {
					"${include}": [
						"${TypeScriptCommonProperties}"
					]
				}
			*/
			this.telemetryReporter.logTelemetry('js.hintProjectExcludes');
		}
	}
	function createLargeProjectMonitorFromTypeScript(item, client) {
		return client.onProjectLanguageServiceStateChanged(body => {
			if (body.languageServiceEnabled) {
				item.hide();
			}
			else {
				item.show();
				const configFileName = body.projectName;
				if (configFileName) {
					item.configFileName = configFileName;
					vscode.window.showWarningMessage(item.getCurrentHint().message, {
						title: localize(4, null),
						index: 0
					}).then(selected => {
						if (selected && selected.index === 0) {
							onConfigureExcludesSelected(client, configFileName);
						}
					});
				}
			}
		});
	}
	function onConfigureExcludesSelected(client, configFileName) {
		if (!tsconfig_1.isImplicitProjectConfigFile(configFileName)) {
			vscode.workspace.openTextDocument(configFileName)
				.then(vscode.window.showTextDocument);
		}
		else {
			const root = client.getWorkspaceRootForResource(vscode.Uri.file(configFileName));
			if (root) {
				tsconfig_1.openOrCreateConfigFile(configFileName.match(/tsconfig\.?.*\.json/) !== null, root, client.configuration);
			}
		}
	}
	function create(client, telemetryReporter) {
		const toDispose = [];
		const item = new ExcludeHintItem(telemetryReporter);
		toDispose.push(vscode.commands.registerCommand('js.projectStatus.command', () => {
			if (item.configFileName) {
				onConfigureExcludesSelected(client, item.configFileName);
			}
			let { message } = item.getCurrentHint();
			return vscode.window.showInformationMessage(message);
		}));
		toDispose.push(createLargeProjectMonitorFromTypeScript(item, client));
		return vscode.Disposable.from(...toDispose);
	}
	exports.create = create;


	/***/ }),
	/* 181 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
		var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
		else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const vscode = __webpack_require__(1);
	const nls = __webpack_require__(6);
	const dispose_1 = __webpack_require__(16);
	const memoize_1 = __webpack_require__(30);
	const localize = nls.loadMessageBundle(__webpack_require__(7).join(__dirname, 'utils/surveyor.ts'));
	const allSurveys = [
		{
			id: 'checkJs',
			prompt: localize(0, null),
			globalTriggerThreshold: 10,
			url: vscode.Uri.parse('https://www.surveymonkey.com/r/FH8PZQ3'),
			remindLaterDelayInMilliseconds: 3 * 24 * 60 * 60 * 1000 // 3 days
		}
	];
	class Survey {
		constructor(data, memento) {
			this.data = data;
			this.memento = memento;
			this._hasShownInThisSession = false;
		}
		get id() { return this.data.id; }
		get prompt() { return this.data.prompt; }
		get isActive() {
			return !this._hasShownInThisSession && !this.memento.get(this.isCompletedMementoKey);
		}
		open() {
			this.markComplete();
			vscode.commands.executeCommand('vscode.open', this.data.url);
		}
		remindLater() {
			// Make sure we don't show again in this session (but don't persist as completed)
			this._hasShownInThisSession = true;
			// And save off prompt time.
			this.memento.update(this.lastPromptTimeMementoKey, Date.now());
		}
		trigger() {
			const triggerCount = this.triggerCount + 1;
			this.memento.update(this.triggerCountMementoKey, triggerCount);
			if (triggerCount >= this.data.globalTriggerThreshold) {
				const lastPromptTime = this.memento.get(this.lastPromptTimeMementoKey);
				if (!lastPromptTime || isNaN(+lastPromptTime)) {
					return true;
				}
				return (lastPromptTime + this.data.remindLaterDelayInMilliseconds < Date.now());
			}
			return false;
		}
		willShow() {
			this._hasShownInThisSession = true;
		}
		markComplete() {
			this._hasShownInThisSession = true;
			this.memento.update(this.isCompletedMementoKey, true);
		}
		get triggerCount() {
			const count = this.memento.get(this.triggerCountMementoKey);
			return !count || isNaN(+count) ? 0 : +count;
		}
		getMementoKey(part) {
			return `survey.v0.${this.id}.${part}`;
		}
		get isCompletedMementoKey() {
			return this.getMementoKey('isComplete');
		}
		get lastPromptTimeMementoKey() {
			return this.getMementoKey('lastPromptTime');
		}
		get triggerCountMementoKey() {
			return this.getMementoKey('globalTriggerCount');
		}
	}
	class Surveyor extends dispose_1.Disposable {
		constructor(memento, serviceClient) {
			super();
			this.memento = memento;
			this._register(serviceClient.onSurveyReady(e => this.surveyReady(e.surveyId)));
		}
		get surveys() {
			return new Map(allSurveys.map(data => [data.id, new Survey(data, this.memento)]));
		}
		surveyReady(surveyId) {
			const survey = this.tryGetActiveSurvey(surveyId);
			if (survey && survey.trigger()) {
				survey.willShow();
				this.showSurveyToUser(survey);
			}
		}
		async showSurveyToUser(survey) {
			let Choice;
			(function (Choice) {
				Choice[Choice["GoToSurvey"] = 1] = "GoToSurvey";
				Choice[Choice["RemindLater"] = 2] = "RemindLater";
				Choice[Choice["NeverAgain"] = 3] = "NeverAgain";
			})(Choice || (Choice = {}));
			const response = await vscode.window.showInformationMessage(survey.prompt, {
				title: localize(1, null),
				choice: Choice.GoToSurvey
			}, {
				title: localize(2, null),
				choice: Choice.RemindLater
			}, {
				title: localize(3, null),
				choice: Choice.NeverAgain
			});
			switch (response && response.choice) {
				case Choice.GoToSurvey:
					survey.open();
					break;
				case Choice.NeverAgain:
					survey.markComplete();
					this.disableSurveys();
					break;
				case Choice.RemindLater:
				default: // If user just closes the notification, treat this as a remind later.
					survey.remindLater();
					break;
			}
		}
		tryGetActiveSurvey(surveyId) {
			const survey = this.surveys.get(surveyId);
			if (!survey) {
				return undefined;
			}
			if (this.areSurveysEnabled() && survey.isActive) {
				return survey;
			}
			return undefined;
		}
		areSurveysEnabled() {
			const config = vscode.workspace.getConfiguration('typescript');
			return config.get('surveys.enabled', true);
		}
		disableSurveys() {
			const config = vscode.workspace.getConfiguration('typescript');
			config.update('surveys.enabled', false);
		}
	}
	__decorate([
		memoize_1.memoize
	], Surveyor.prototype, "surveys", null);
	exports.Surveyor = Surveyor;


	/***/ }),
	/* 182 */
	/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	/*---------------------------------------------------------------------------------------------
	 *  Copyright (c) Microsoft Corporation. All rights reserved.
	 *  Licensed under the MIT License. See License.txt in the project root for license information.
	 *--------------------------------------------------------------------------------------------*/
	Object.defineProperty(exports, "__esModule", { value: true });
	const jsonc = __webpack_require__(19);
	const path_1 = __webpack_require__(7);
	const vscode = __webpack_require__(1);
	const arrays_1 = __webpack_require__(47);
	function mapChildren(node, f) {
		return node && node.type === 'array' && node.children
			? node.children.map(f)
			: [];
	}
	class TsconfigLinkProvider {
		provideDocumentLinks(document, _token) {
			const root = jsonc.parseTree(document.getText());
			if (!root) {
				return null;
			}
			return [
				this.getExendsLink(document, root),
				...this.getFilesLinks(document, root),
				...this.getReferencesLinks(document, root)
			].filter(x => !!x);
		}
		getExendsLink(document, root) {
			const extendsNode = jsonc.findNodeAtLocation(root, ['extends']);
			if (!this.isPathValue(extendsNode)) {
				return undefined;
			}
			return new vscode.DocumentLink(this.getRange(document, extendsNode), path_1.basename(extendsNode.value).match('.json$')
				? this.getFileTarget(document, extendsNode)
				: vscode.Uri.file(path_1.join(path_1.dirname(document.uri.fsPath), extendsNode.value + '.json')));
		}
		getFilesLinks(document, root) {
			return mapChildren(jsonc.findNodeAtLocation(root, ['files']), child => this.pathNodeToLink(document, child));
		}
		getReferencesLinks(document, root) {
			return mapChildren(jsonc.findNodeAtLocation(root, ['references']), child => {
				const pathNode = jsonc.findNodeAtLocation(child, ['path']);
				if (!this.isPathValue(pathNode)) {
					return undefined;
				}
				return new vscode.DocumentLink(this.getRange(document, pathNode), path_1.basename(pathNode.value).match('.json$')
					? this.getFileTarget(document, pathNode)
					: this.getFolderTarget(document, pathNode));
			});
		}
		pathNodeToLink(document, node) {
			return this.isPathValue(node)
				? new vscode.DocumentLink(this.getRange(document, node), this.getFileTarget(document, node))
				: undefined;
		}
		isPathValue(extendsNode) {
			return extendsNode
				&& extendsNode.type === 'string'
				&& extendsNode.value
				&& !extendsNode.value.includes('*'); // don't treat globs as links.
		}
		getFileTarget(document, node) {
			return vscode.Uri.file(path_1.join(path_1.dirname(document.uri.fsPath), node.value));
		}
		getFolderTarget(document, node) {
			return vscode.Uri.file(path_1.join(path_1.dirname(document.uri.fsPath), node.value, 'tsconfig.json'));
		}
		getRange(document, node) {
			const offset = node.offset;
			const start = document.positionAt(offset + 1);
			const end = document.positionAt(offset + (node.length - 1));
			return new vscode.Range(start, end);
		}
	}
	function register() {
		const patterns = [
			'**/[jt]sconfig.json',
			'**/[jt]sconfig.*.json',
		];
		const languages = ['json', 'jsonc'];
		const selector = arrays_1.flatten(languages.map(language => patterns.map((pattern) => ({ language, pattern }))));
		return vscode.languages.registerDocumentLinkProvider(selector, new TsconfigLinkProvider());
	}
	exports.register = register;


	/***/ })
	/******/ ])));
	//# sourceMappingURL=extension.js.map