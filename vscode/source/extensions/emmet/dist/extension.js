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
const defaultCompletionProvider_1 = __webpack_require__(2);
const abbreviationActions_1 = __webpack_require__(3);
const removeTag_1 = __webpack_require__(21);
const updateTag_1 = __webpack_require__(22);
const matchTag_1 = __webpack_require__(23);
const balance_1 = __webpack_require__(24);
const splitJoinTag_1 = __webpack_require__(25);
const mergeLines_1 = __webpack_require__(26);
const toggleComment_1 = __webpack_require__(27);
const editPoint_1 = __webpack_require__(28);
const selectItem_1 = __webpack_require__(29);
const evaluateMathExpression_1 = __webpack_require__(33);
const incrementDecrement_1 = __webpack_require__(35);
const util_1 = __webpack_require__(4);
const updateImageSize_1 = __webpack_require__(36);
const reflectCssValue_1 = __webpack_require__(56);
function activate(context) {
    registerCompletionProviders(context);
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.wrapWithAbbreviation', (args) => {
        abbreviationActions_1.wrapWithAbbreviation(args);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.wrapIndividualLinesWithAbbreviation', (args) => {
        abbreviationActions_1.wrapIndividualLinesWithAbbreviation(args);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('emmet.expandAbbreviation', (args) => {
        abbreviationActions_1.expandEmmetAbbreviation(args);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.removeTag', () => {
        return removeTag_1.removeTag();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.updateTag', (inputTag) => {
        if (inputTag && typeof inputTag === 'string') {
            return updateTag_1.updateTag(inputTag);
        }
        return vscode.window.showInputBox({ prompt: 'Enter Tag' }).then(tagName => {
            if (tagName) {
                const update = updateTag_1.updateTag(tagName);
                return update ? update : false;
            }
            return false;
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.matchTag', () => {
        matchTag_1.matchTag();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.balanceOut', () => {
        balance_1.balanceOut();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.balanceIn', () => {
        balance_1.balanceIn();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.splitJoinTag', () => {
        return splitJoinTag_1.splitJoinTag();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.mergeLines', () => {
        mergeLines_1.mergeLines();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.toggleComment', () => {
        toggleComment_1.toggleComment();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.nextEditPoint', () => {
        editPoint_1.fetchEditPoint('next');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.prevEditPoint', () => {
        editPoint_1.fetchEditPoint('prev');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.selectNextItem', () => {
        selectItem_1.fetchSelectItem('next');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.selectPrevItem', () => {
        selectItem_1.fetchSelectItem('prev');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.evaluateMathExpression', () => {
        evaluateMathExpression_1.evaluateMathExpression();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.incrementNumberByOneTenth', () => {
        return incrementDecrement_1.incrementDecrement(0.1);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.incrementNumberByOne', () => {
        return incrementDecrement_1.incrementDecrement(1);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.incrementNumberByTen', () => {
        return incrementDecrement_1.incrementDecrement(10);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.decrementNumberByOneTenth', () => {
        return incrementDecrement_1.incrementDecrement(-0.1);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.decrementNumberByOne', () => {
        return incrementDecrement_1.incrementDecrement(-1);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.decrementNumberByTen', () => {
        return incrementDecrement_1.incrementDecrement(-10);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.updateImageSize', () => {
        return updateImageSize_1.updateImageSize();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('editor.emmet.action.reflectCSSValue', () => {
        return reflectCssValue_1.reflectCssValue();
    }));
    util_1.updateEmmetExtensionsPath();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('emmet.includeLanguages')) {
            registerCompletionProviders(context);
        }
        if (e.affectsConfiguration('emmet.extensionsPath')) {
            util_1.updateEmmetExtensionsPath();
        }
    }));
}
exports.activate = activate;
/**
 * Holds any registered completion providers by their language strings
 */
const languageMappingForCompletionProviders = new Map();
const completionProvidersMapping = new Map();
function registerCompletionProviders(context) {
    let completionProvider = new defaultCompletionProvider_1.DefaultCompletionItemProvider();
    let includedLanguages = util_1.getMappingForIncludedLanguages();
    Object.keys(includedLanguages).forEach(language => {
        if (languageMappingForCompletionProviders.has(language) && languageMappingForCompletionProviders.get(language) === includedLanguages[language]) {
            return;
        }
        if (languageMappingForCompletionProviders.has(language)) {
            const mapping = completionProvidersMapping.get(language);
            if (mapping) {
                mapping.dispose();
            }
            languageMappingForCompletionProviders.delete(language);
            completionProvidersMapping.delete(language);
        }
        const provider = vscode.languages.registerCompletionItemProvider([{ language, scheme: 'file' }, { language, scheme: 'untitled' }], completionProvider, ...util_1.LANGUAGE_MODES[includedLanguages[language]]);
        context.subscriptions.push(provider);
        languageMappingForCompletionProviders.set(language, includedLanguages[language]);
        completionProvidersMapping.set(language, provider);
    });
    Object.keys(util_1.LANGUAGE_MODES).forEach(language => {
        if (!languageMappingForCompletionProviders.has(language)) {
            const provider = vscode.languages.registerCompletionItemProvider([{ language, scheme: 'file' }, { language, scheme: 'untitled' }], completionProvider, ...util_1.LANGUAGE_MODES[language]);
            context.subscriptions.push(provider);
            languageMappingForCompletionProviders.set(language, language);
            completionProvidersMapping.set(language, provider);
        }
    });
}
function deactivate() {
}
exports.deactivate = deactivate;


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
const vscode = __webpack_require__(1);
const abbreviationActions_1 = __webpack_require__(3);
const util_1 = __webpack_require__(4);
class DefaultCompletionItemProvider {
    provideCompletionItems(document, position, _, context) {
        const completionResult = this.provideCompletionItemsInternal(document, position, context);
        if (!completionResult) {
            this.lastCompletionType = undefined;
            return;
        }
        return completionResult.then(completionList => {
            if (!completionList || !completionList.items.length) {
                this.lastCompletionType = undefined;
                return completionList;
            }
            const item = completionList.items[0];
            const expandedText = item.documentation ? item.documentation.toString() : '';
            if (expandedText.startsWith('<')) {
                this.lastCompletionType = 'html';
            }
            else if (expandedText.indexOf(':') > 0 && expandedText.endsWith(';')) {
                this.lastCompletionType = 'css';
            }
            else {
                this.lastCompletionType = undefined;
            }
            return completionList;
        });
    }
    provideCompletionItemsInternal(document, position, context) {
        const emmetConfig = vscode.workspace.getConfiguration('emmet');
        const excludedLanguages = emmetConfig['excludeLanguages'] ? emmetConfig['excludeLanguages'] : [];
        if (excludedLanguages.indexOf(document.languageId) > -1) {
            return;
        }
        const mappedLanguages = util_1.getMappingForIncludedLanguages();
        const isSyntaxMapped = mappedLanguages[document.languageId] ? true : false;
        let syntax = util_1.getEmmetMode((isSyntaxMapped ? mappedLanguages[document.languageId] : document.languageId), excludedLanguages);
        if (!syntax
            || emmetConfig['showExpandedAbbreviation'] === 'never'
            || ((isSyntaxMapped || syntax === 'jsx') && emmetConfig['showExpandedAbbreviation'] !== 'always')) {
            return;
        }
        const helper = util_1.getEmmetHelper();
        let validateLocation = syntax === 'html' || syntax === 'jsx' || syntax === 'xml';
        let rootNode = undefined;
        let currentNode = null;
        if (document.languageId === 'html') {
            if (context.triggerKind === vscode.CompletionTriggerKind.TriggerForIncompleteCompletions) {
                switch (this.lastCompletionType) {
                    case 'html':
                        validateLocation = false;
                        break;
                    case 'css':
                        validateLocation = false;
                        syntax = 'css';
                        break;
                    default:
                        break;
                }
            }
            if (validateLocation) {
                rootNode = util_1.parseDocument(document, false);
                currentNode = util_1.getNode(rootNode, position, true);
                if (util_1.isStyleAttribute(currentNode, position)) {
                    syntax = 'css';
                    validateLocation = false;
                }
                else {
                    const embeddedCssNode = util_1.getEmbeddedCssNodeIfAny(document, currentNode, position);
                    if (embeddedCssNode) {
                        currentNode = util_1.getNode(embeddedCssNode, position, true);
                        syntax = 'css';
                    }
                }
            }
        }
        const extractAbbreviationResults = helper.extractAbbreviation(document, position, !util_1.isStyleSheet(syntax));
        if (!extractAbbreviationResults || !helper.isAbbreviationValid(syntax, extractAbbreviationResults.abbreviation)) {
            return;
        }
        if (util_1.isStyleSheet(document.languageId) && context.triggerKind !== vscode.CompletionTriggerKind.TriggerForIncompleteCompletions) {
            validateLocation = true;
            let usePartialParsing = vscode.workspace.getConfiguration('emmet')['optimizeStylesheetParsing'] === true;
            rootNode = usePartialParsing && document.lineCount > 1000 ? util_1.parsePartialStylesheet(document, position) : util_1.parseDocument(document, false);
            if (!rootNode) {
                return;
            }
            currentNode = util_1.getNode(rootNode, position, true);
        }
        if (validateLocation && !abbreviationActions_1.isValidLocationForEmmetAbbreviation(document, rootNode, currentNode, syntax, position, extractAbbreviationResults.abbreviationRange)) {
            return;
        }
        let noiseCheckPromise = Promise.resolve();
        // Fix for https://github.com/Microsoft/vscode/issues/32647
        // Check for document symbols in js/ts/jsx/tsx and avoid triggering emmet for abbreviations of the form symbolName.sometext
        // Presence of > or * or + in the abbreviation denotes valid abbreviation that should trigger emmet
        if (!util_1.isStyleSheet(syntax) && (document.languageId === 'javascript' || document.languageId === 'javascriptreact' || document.languageId === 'typescript' || document.languageId === 'typescriptreact')) {
            let abbreviation = extractAbbreviationResults.abbreviation;
            if (abbreviation.startsWith('this.')) {
                noiseCheckPromise = Promise.resolve(true);
            }
            else {
                noiseCheckPromise = vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', document.uri).then((symbols) => {
                    return symbols && symbols.find(x => abbreviation === x.name || (abbreviation.startsWith(x.name + '.') && !/>|\*|\+/.test(abbreviation)));
                });
            }
        }
        return noiseCheckPromise.then((noise) => {
            if (noise) {
                return;
            }
            let result = helper.doComplete(document, position, syntax, util_1.getEmmetConfiguration(syntax));
            let newItems = [];
            if (result && result.items) {
                result.items.forEach((item) => {
                    let newItem = new vscode.CompletionItem(item.label);
                    newItem.documentation = item.documentation;
                    newItem.detail = item.detail;
                    newItem.insertText = new vscode.SnippetString(item.textEdit.newText);
                    let oldrange = item.textEdit.range;
                    newItem.range = new vscode.Range(oldrange.start.line, oldrange.start.character, oldrange.end.line, oldrange.end.character);
                    newItem.filterText = item.filterText;
                    newItem.sortText = item.sortText;
                    if (emmetConfig['showSuggestionsAsSnippets'] === true) {
                        newItem.kind = vscode.CompletionItemKind.Snippet;
                    }
                    newItems.push(newItem);
                });
            }
            return new vscode.CompletionList(newItems, true);
        });
    }
}
exports.DefaultCompletionItemProvider = DefaultCompletionItemProvider;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
const trimRegex = /[\u00a0]*[\d#\-\*\u2022]+\.?/;
const hexColorRegex = /^#[\da-fA-F]{0,6}$/;
const inlineElements = ['a', 'abbr', 'acronym', 'applet', 'b', 'basefont', 'bdo',
    'big', 'br', 'button', 'cite', 'code', 'del', 'dfn', 'em', 'font', 'i',
    'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'map', 'object', 'q',
    's', 'samp', 'select', 'small', 'span', 'strike', 'strong', 'sub', 'sup',
    'textarea', 'tt', 'u', 'var'];
function wrapWithAbbreviation(args) {
    return doWrapping(false, args);
}
exports.wrapWithAbbreviation = wrapWithAbbreviation;
function wrapIndividualLinesWithAbbreviation(args) {
    return doWrapping(true, args);
}
exports.wrapIndividualLinesWithAbbreviation = wrapIndividualLinesWithAbbreviation;
function doWrapping(individualLines, args) {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    if (individualLines) {
        if (editor.selections.length === 1 && editor.selection.isEmpty) {
            vscode.window.showInformationMessage('Select more than 1 line and try again.');
            return;
        }
        if (editor.selections.find(x => x.isEmpty)) {
            vscode.window.showInformationMessage('Select more than 1 line in each selection and try again.');
            return;
        }
    }
    args = args || {};
    if (!args['language']) {
        args['language'] = editor.document.languageId;
    }
    const syntax = getSyntaxFromArgs(args) || 'html';
    const rootNode = util_1.parseDocument(editor.document, false);
    let inPreview = false;
    let currentValue = '';
    const helper = util_1.getEmmetHelper();
    // Fetch general information for the succesive expansions. i.e. the ranges to replace and its contents
    let rangesToReplace = editor.selections.sort((a, b) => { return a.start.compareTo(b.start); }).map(selection => {
        let rangeToReplace = selection.isReversed ? new vscode.Range(selection.active, selection.anchor) : selection;
        if (!rangeToReplace.isSingleLine && rangeToReplace.end.character === 0) {
            const previousLine = rangeToReplace.end.line - 1;
            const lastChar = editor.document.lineAt(previousLine).text.length;
            rangeToReplace = new vscode.Range(rangeToReplace.start, new vscode.Position(previousLine, lastChar));
        }
        else if (rangeToReplace.isEmpty) {
            const { active } = selection;
            const currentNode = util_1.getNode(rootNode, active, true);
            if (currentNode && (currentNode.start.line === active.line || currentNode.end.line === active.line)) {
                rangeToReplace = new vscode.Range(currentNode.start, currentNode.end);
            }
            else {
                rangeToReplace = new vscode.Range(rangeToReplace.start.line, 0, rangeToReplace.start.line, editor.document.lineAt(rangeToReplace.start.line).text.length);
            }
        }
        const firstLineOfSelection = editor.document.lineAt(rangeToReplace.start).text.substr(rangeToReplace.start.character);
        const matches = firstLineOfSelection.match(/^(\s*)/);
        const extraWhiteSpaceSelected = matches ? matches[1].length : 0;
        rangeToReplace = new vscode.Range(rangeToReplace.start.line, rangeToReplace.start.character + extraWhiteSpaceSelected, rangeToReplace.end.line, rangeToReplace.end.character);
        let textToWrapInPreview;
        let textToReplace = editor.document.getText(rangeToReplace);
        if (individualLines) {
            textToWrapInPreview = textToReplace.split('\n').map(x => x.trim());
        }
        else {
            const wholeFirstLine = editor.document.lineAt(rangeToReplace.start).text;
            const otherMatches = wholeFirstLine.match(/^(\s*)/);
            const preceedingWhiteSpace = otherMatches ? otherMatches[1] : '';
            textToWrapInPreview = rangeToReplace.isSingleLine ? [textToReplace] : ['\n\t' + textToReplace.split('\n' + preceedingWhiteSpace).join('\n\t') + '\n'];
        }
        textToWrapInPreview = textToWrapInPreview.map(e => e.replace(/(\$\d)/g, '\\$1'));
        return {
            previewRange: rangeToReplace,
            originalRange: rangeToReplace,
            originalContent: textToReplace,
            textToWrapInPreview
        };
    });
    function revertPreview() {
        return editor.edit(builder => {
            for (const rangeToReplace of rangesToReplace) {
                builder.replace(rangeToReplace.previewRange, rangeToReplace.originalContent);
                rangeToReplace.previewRange = rangeToReplace.originalRange;
            }
        }, { undoStopBefore: false, undoStopAfter: false });
    }
    function applyPreview(expandAbbrList) {
        let lastOldPreviewRange = new vscode.Range(0, 0, 0, 0);
        let lastNewPreviewRange = new vscode.Range(0, 0, 0, 0);
        let totalLinesInserted = 0;
        return editor.edit(builder => {
            for (let i = 0; i < rangesToReplace.length; i++) {
                const expandedText = expandAbbr(expandAbbrList[i]) || '';
                if (!expandedText) {
                    // Failed to expand text. We already showed an error inside expandAbbr.
                    break;
                }
                const oldPreviewRange = rangesToReplace[i].previewRange;
                const preceedingText = editor.document.getText(new vscode.Range(oldPreviewRange.start.line, 0, oldPreviewRange.start.line, oldPreviewRange.start.character));
                const indentPrefix = (preceedingText.match(/^(\s*)/) || ['', ''])[1];
                let newText = expandedText.replace(/\n/g, '\n' + indentPrefix); // Adding indentation on each line of expanded text
                newText = newText.replace(/\$\{[\d]*\}/g, '|'); // Removing Tabstops
                newText = newText.replace(/\$\{[\d]*(:[^}]*)?\}/g, (match) => {
                    return match.replace(/^\$\{[\d]*:/, '').replace('}', '');
                });
                builder.replace(oldPreviewRange, newText);
                const expandedTextLines = newText.split('\n');
                const oldPreviewLines = oldPreviewRange.end.line - oldPreviewRange.start.line + 1;
                const newLinesInserted = expandedTextLines.length - oldPreviewLines;
                let newPreviewLineStart = oldPreviewRange.start.line + totalLinesInserted;
                let newPreviewStart = oldPreviewRange.start.character;
                const newPreviewLineEnd = oldPreviewRange.end.line + totalLinesInserted + newLinesInserted;
                let newPreviewEnd = expandedTextLines[expandedTextLines.length - 1].length;
                if (i > 0 && newPreviewLineEnd === lastNewPreviewRange.end.line) {
                    // If newPreviewLineEnd is equal to the previous expandedText lineEnd,
                    // set newPreviewStart to the length of the previous expandedText in that line
                    // plus the number of characters between both selections.
                    newPreviewStart = lastNewPreviewRange.end.character + (oldPreviewRange.start.character - lastOldPreviewRange.end.character);
                    newPreviewEnd += newPreviewStart;
                }
                else if (i > 0 && newPreviewLineStart === lastNewPreviewRange.end.line) {
                    // Same as above but expandedTextLines.length > 1 so newPreviewEnd keeps its value.
                    newPreviewStart = lastNewPreviewRange.end.character + (oldPreviewRange.start.character - lastOldPreviewRange.end.character);
                }
                else if (expandedTextLines.length === 1) {
                    // If the expandedText is single line, add the length of preceeding text as it will not be included in line length.
                    newPreviewEnd += oldPreviewRange.start.character;
                }
                lastOldPreviewRange = rangesToReplace[i].previewRange;
                rangesToReplace[i].previewRange = lastNewPreviewRange = new vscode.Range(newPreviewLineStart, newPreviewStart, newPreviewLineEnd, newPreviewEnd);
                totalLinesInserted += newLinesInserted;
            }
        }, { undoStopBefore: false, undoStopAfter: false });
    }
    function makeChanges(inputAbbreviation, definitive) {
        if (!inputAbbreviation || !inputAbbreviation.trim() || !helper.isAbbreviationValid(syntax, inputAbbreviation)) {
            return inPreview ? revertPreview().then(() => { return false; }) : Promise.resolve(inPreview);
        }
        let extractedResults = helper.extractAbbreviationFromText(inputAbbreviation);
        if (!extractedResults) {
            return Promise.resolve(inPreview);
        }
        else if (extractedResults.abbreviation !== inputAbbreviation) {
            // Not clear what should we do in this case. Warn the user? How?
        }
        let { abbreviation, filter } = extractedResults;
        if (definitive) {
            const revertPromise = inPreview ? revertPreview() : Promise.resolve();
            return revertPromise.then(() => {
                const expandAbbrList = rangesToReplace.map(rangesAndContent => {
                    let rangeToReplace = rangesAndContent.originalRange;
                    let textToWrap;
                    if (individualLines) {
                        textToWrap = rangesAndContent.textToWrapInPreview;
                    }
                    else {
                        textToWrap = rangeToReplace.isSingleLine ? ['$TM_SELECTED_TEXT'] : ['\n\t$TM_SELECTED_TEXT\n'];
                    }
                    return { syntax: syntax || '', abbreviation, rangeToReplace, textToWrap, filter };
                });
                return expandAbbreviationInRange(editor, expandAbbrList, !individualLines).then(() => { return true; });
            });
        }
        const expandAbbrList = rangesToReplace.map(rangesAndContent => {
            return { syntax: syntax || '', abbreviation, rangeToReplace: rangesAndContent.originalRange, textToWrap: rangesAndContent.textToWrapInPreview, filter };
        });
        return applyPreview(expandAbbrList);
    }
    function inputChanged(value) {
        if (value !== currentValue) {
            currentValue = value;
            makeChanges(value, false).then((out) => {
                if (typeof out === 'boolean') {
                    inPreview = out;
                }
            });
        }
        return '';
    }
    const abbreviationPromise = (args && args['abbreviation']) ? Promise.resolve(args['abbreviation']) : vscode.window.showInputBox({ prompt: 'Enter Abbreviation', validateInput: inputChanged });
    return abbreviationPromise.then(inputAbbreviation => {
        return makeChanges(inputAbbreviation, true);
    });
}
function expandEmmetAbbreviation(args) {
    if (!util_1.validate() || !vscode.window.activeTextEditor) {
        return fallbackTab();
    }
    args = args || {};
    if (!args['language']) {
        args['language'] = vscode.window.activeTextEditor.document.languageId;
    }
    else {
        const excludedLanguages = vscode.workspace.getConfiguration('emmet')['excludeLanguages'] ? vscode.workspace.getConfiguration('emmet')['excludeLanguages'] : [];
        if (excludedLanguages.indexOf(vscode.window.activeTextEditor.document.languageId) > -1) {
            return fallbackTab();
        }
    }
    const syntax = getSyntaxFromArgs(args);
    if (!syntax) {
        return fallbackTab();
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode;
    let usePartialParsing = vscode.workspace.getConfiguration('emmet')['optimizeStylesheetParsing'] === true;
    if (editor.selections.length === 1 && util_1.isStyleSheet(editor.document.languageId) && usePartialParsing && editor.document.lineCount > 1000) {
        rootNode = util_1.parsePartialStylesheet(editor.document, editor.selection.isReversed ? editor.selection.anchor : editor.selection.active);
    }
    else {
        rootNode = util_1.parseDocument(editor.document, false);
    }
    // When tabbed on a non empty selection, do not treat it as an emmet abbreviation, and fallback to tab instead
    if (vscode.workspace.getConfiguration('emmet')['triggerExpansionOnTab'] === true && editor.selections.find(x => !x.isEmpty)) {
        return fallbackTab();
    }
    let abbreviationList = [];
    let firstAbbreviation;
    let allAbbreviationsSame = true;
    const helper = util_1.getEmmetHelper();
    let getAbbreviation = (document, selection, position, syntax) => {
        let rangeToReplace = selection;
        let abbr = document.getText(rangeToReplace);
        if (!rangeToReplace.isEmpty) {
            let extractedResults = helper.extractAbbreviationFromText(abbr);
            if (extractedResults) {
                return [rangeToReplace, extractedResults.abbreviation, extractedResults.filter];
            }
            return [null, '', ''];
        }
        const currentLine = editor.document.lineAt(position.line).text;
        const textTillPosition = currentLine.substr(0, position.character);
        // Expand cases like <div to <div></div> explicitly
        // else we will end up with <<div></div>
        if (syntax === 'html') {
            let matches = textTillPosition.match(/<(\w+)$/);
            if (matches) {
                abbr = matches[1];
                rangeToReplace = new vscode.Range(position.translate(0, -(abbr.length + 1)), position);
                return [rangeToReplace, abbr, ''];
            }
        }
        let extractedResults = helper.extractAbbreviation(editor.document, position, false);
        if (!extractedResults) {
            return [null, '', ''];
        }
        let { abbreviationRange, abbreviation, filter } = extractedResults;
        return [new vscode.Range(abbreviationRange.start.line, abbreviationRange.start.character, abbreviationRange.end.line, abbreviationRange.end.character), abbreviation, filter];
    };
    let selectionsInReverseOrder = editor.selections.slice(0);
    selectionsInReverseOrder.sort((a, b) => {
        const posA = a.isReversed ? a.anchor : a.active;
        const posB = b.isReversed ? b.anchor : b.active;
        return posA.compareTo(posB) * -1;
    });
    selectionsInReverseOrder.forEach(selection => {
        let position = selection.isReversed ? selection.anchor : selection.active;
        let [rangeToReplace, abbreviation, filter] = getAbbreviation(editor.document, selection, position, syntax);
        if (!rangeToReplace) {
            return;
        }
        if (!helper.isAbbreviationValid(syntax, abbreviation)) {
            return;
        }
        let currentNode = util_1.getNode(rootNode, position, true);
        let validateLocation = true;
        let syntaxToUse = syntax;
        if (editor.document.languageId === 'html') {
            if (util_1.isStyleAttribute(currentNode, position)) {
                syntaxToUse = 'css';
                validateLocation = false;
            }
            else {
                const embeddedCssNode = util_1.getEmbeddedCssNodeIfAny(editor.document, currentNode, position);
                if (embeddedCssNode) {
                    currentNode = util_1.getNode(embeddedCssNode, position, true);
                    syntaxToUse = 'css';
                }
            }
        }
        if (validateLocation && !isValidLocationForEmmetAbbreviation(editor.document, rootNode, currentNode, syntaxToUse, position, rangeToReplace)) {
            return;
        }
        if (!firstAbbreviation) {
            firstAbbreviation = abbreviation;
        }
        else if (allAbbreviationsSame && firstAbbreviation !== abbreviation) {
            allAbbreviationsSame = false;
        }
        abbreviationList.push({ syntax: syntaxToUse, abbreviation, rangeToReplace, filter });
    });
    return expandAbbreviationInRange(editor, abbreviationList, allAbbreviationsSame).then(success => {
        return success ? Promise.resolve(undefined) : fallbackTab();
    });
}
exports.expandEmmetAbbreviation = expandEmmetAbbreviation;
function fallbackTab() {
    if (vscode.workspace.getConfiguration('emmet')['triggerExpansionOnTab'] === true) {
        return vscode.commands.executeCommand('tab');
    }
    return Promise.resolve(true);
}
/**
 * Checks if given position is a valid location to expand emmet abbreviation.
 * Works only on html and css/less/scss syntax
 * @param document current Text Document
 * @param rootNode parsed document
 * @param currentNode current node in the parsed document
 * @param syntax syntax of the abbreviation
 * @param position position to validate
 * @param abbreviationRange The range of the abbreviation for which given position is being validated
 */
function isValidLocationForEmmetAbbreviation(document, rootNode, currentNode, syntax, position, abbreviationRange) {
    if (util_1.isStyleSheet(syntax)) {
        const stylesheet = rootNode;
        if (stylesheet && (stylesheet.comments || []).some(x => position.isAfterOrEqual(x.start) && position.isBeforeOrEqual(x.end))) {
            return false;
        }
        // Continue validation only if the file was parse-able and the currentNode has been found
        if (!currentNode) {
            return true;
        }
        // Fix for https://github.com/Microsoft/vscode/issues/34162
        // Other than sass, stylus, we can make use of the terminator tokens to validate position
        if (syntax !== 'sass' && syntax !== 'stylus' && currentNode.type === 'property') {
            // Fix for upstream issue https://github.com/emmetio/css-parser/issues/3
            if (currentNode.parent
                && currentNode.parent.type !== 'rule'
                && currentNode.parent.type !== 'at-rule') {
                return false;
            }
            const abbreviation = document.getText(new vscode.Range(abbreviationRange.start.line, abbreviationRange.start.character, abbreviationRange.end.line, abbreviationRange.end.character));
            const propertyNode = currentNode;
            if (propertyNode.terminatorToken
                && propertyNode.separator
                && position.isAfterOrEqual(propertyNode.separatorToken.end)
                && position.isBeforeOrEqual(propertyNode.terminatorToken.start)
                && abbreviation.indexOf(':') === -1) {
                return hexColorRegex.test(abbreviation) || abbreviation === '!';
            }
            if (!propertyNode.terminatorToken
                && propertyNode.separator
                && position.isAfterOrEqual(propertyNode.separatorToken.end)
                && abbreviation.indexOf(':') === -1) {
                return hexColorRegex.test(abbreviation) || abbreviation === '!';
            }
            if (hexColorRegex.test(abbreviation) || abbreviation === '!') {
                return false;
            }
        }
        // If current node is a rule or at-rule, then perform additional checks to ensure
        // emmet suggestions are not provided in the rule selector
        if (currentNode.type !== 'rule' && currentNode.type !== 'at-rule') {
            return true;
        }
        const currentCssNode = currentNode;
        // Position is valid if it occurs after the `{` that marks beginning of rule contents
        if (position.isAfter(currentCssNode.contentStartToken.end)) {
            return true;
        }
        // Workaround for https://github.com/Microsoft/vscode/30188
        // The line above the rule selector is considered as part of the selector by the css-parser
        // But we should assume it is a valid location for css properties under the parent rule
        if (currentCssNode.parent
            && (currentCssNode.parent.type === 'rule' || currentCssNode.parent.type === 'at-rule')
            && currentCssNode.selectorToken
            && position.line !== currentCssNode.selectorToken.end.line
            && currentCssNode.selectorToken.start.character === abbreviationRange.start.character
            && currentCssNode.selectorToken.start.line === abbreviationRange.start.line) {
            return true;
        }
        return false;
    }
    const startAngle = '<';
    const endAngle = '>';
    const escape = '\\';
    const question = '?';
    const currentHtmlNode = currentNode;
    let start = new vscode.Position(0, 0);
    if (currentHtmlNode) {
        if (currentHtmlNode.name === 'script') {
            const typeAttribute = (currentHtmlNode.attributes || []).filter(x => x.name.toString() === 'type')[0];
            const typeValue = typeAttribute ? typeAttribute.value.toString() : '';
            if (util_1.allowedMimeTypesInScriptTag.indexOf(typeValue) > -1) {
                return true;
            }
            const isScriptJavascriptType = !typeValue || typeValue === 'application/javascript' || typeValue === 'text/javascript';
            if (isScriptJavascriptType) {
                return !!getSyntaxFromArgs({ language: 'javascript' });
            }
            return false;
        }
        const innerRange = util_1.getInnerRange(currentHtmlNode);
        // Fix for https://github.com/Microsoft/vscode/issues/28829
        if (!innerRange || !innerRange.contains(position)) {
            return false;
        }
        // Fix for https://github.com/Microsoft/vscode/issues/35128
        // Find the position up till where we will backtrack looking for unescaped < or >
        // to decide if current position is valid for emmet expansion
        start = innerRange.start;
        let lastChildBeforePosition = currentHtmlNode.firstChild;
        while (lastChildBeforePosition) {
            if (lastChildBeforePosition.end.isAfter(position)) {
                break;
            }
            start = lastChildBeforePosition.end;
            lastChildBeforePosition = lastChildBeforePosition.nextSibling;
        }
    }
    let textToBackTrack = document.getText(new vscode.Range(start.line, start.character, abbreviationRange.start.line, abbreviationRange.start.character));
    // Worse case scenario is when cursor is inside a big chunk of text which needs to backtracked
    // Backtrack only 500 offsets to ensure we dont waste time doing this
    if (textToBackTrack.length > 500) {
        textToBackTrack = textToBackTrack.substr(textToBackTrack.length - 500);
    }
    if (!textToBackTrack.trim()) {
        return true;
    }
    let valid = true;
    let foundSpace = false; // If < is found before finding whitespace, then its valid abbreviation. Eg: <div|
    let i = textToBackTrack.length - 1;
    if (textToBackTrack[i] === startAngle) {
        return false;
    }
    while (i >= 0) {
        const char = textToBackTrack[i];
        i--;
        if (!foundSpace && /\s/.test(char)) {
            foundSpace = true;
            continue;
        }
        if (char === question && textToBackTrack[i] === startAngle) {
            i--;
            continue;
        }
        // Fix for https://github.com/Microsoft/vscode/issues/55411
        // A space is not a valid character right after < in a tag name.
        if (/\s/.test(char) && textToBackTrack[i] === startAngle) {
            i--;
            continue;
        }
        if (char !== startAngle && char !== endAngle) {
            continue;
        }
        if (i >= 0 && textToBackTrack[i] === escape) {
            i--;
            continue;
        }
        if (char === endAngle) {
            if (i >= 0 && textToBackTrack[i] === '=') {
                continue; // False alarm of cases like =>
            }
            else {
                break;
            }
        }
        if (char === startAngle) {
            valid = !foundSpace;
            break;
        }
    }
    return valid;
}
exports.isValidLocationForEmmetAbbreviation = isValidLocationForEmmetAbbreviation;
/**
 * Expands abbreviations as detailed in expandAbbrList in the editor
 *
 * @returns false if no snippet can be inserted.
 */
function expandAbbreviationInRange(editor, expandAbbrList, insertSameSnippet) {
    if (!expandAbbrList || expandAbbrList.length === 0) {
        return Promise.resolve(false);
    }
    // Snippet to replace at multiple cursors are not the same
    // `editor.insertSnippet` will have to be called for each instance separately
    // We will not be able to maintain multiple cursors after snippet insertion
    let insertPromises = [];
    if (!insertSameSnippet) {
        expandAbbrList.sort((a, b) => { return b.rangeToReplace.start.compareTo(a.rangeToReplace.start); }).forEach((expandAbbrInput) => {
            let expandedText = expandAbbr(expandAbbrInput);
            if (expandedText) {
                insertPromises.push(editor.insertSnippet(new vscode.SnippetString(expandedText), expandAbbrInput.rangeToReplace, { undoStopBefore: false, undoStopAfter: false }));
            }
        });
        if (insertPromises.length === 0) {
            return Promise.resolve(false);
        }
        return Promise.all(insertPromises).then(() => Promise.resolve(true));
    }
    // Snippet to replace at all cursors are the same
    // We can pass all ranges to `editor.insertSnippet` in a single call so that
    // all cursors are maintained after snippet insertion
    const anyExpandAbbrInput = expandAbbrList[0];
    let expandedText = expandAbbr(anyExpandAbbrInput);
    let allRanges = expandAbbrList.map(value => {
        return new vscode.Range(value.rangeToReplace.start.line, value.rangeToReplace.start.character, value.rangeToReplace.end.line, value.rangeToReplace.end.character);
    });
    if (expandedText) {
        return editor.insertSnippet(new vscode.SnippetString(expandedText), allRanges);
    }
    return Promise.resolve(false);
}
/**
 * Expands abbreviation as detailed in given input.
 */
function expandAbbr(input) {
    const helper = util_1.getEmmetHelper();
    const expandOptions = helper.getExpandOptions(input.syntax, util_1.getEmmetConfiguration(input.syntax), input.filter);
    if (input.textToWrap) {
        if (input.filter && input.filter.indexOf('t') > -1) {
            input.textToWrap = input.textToWrap.map(line => {
                return line.replace(trimRegex, '').trim();
            });
        }
        expandOptions['text'] = input.textToWrap;
        // Below fixes https://github.com/Microsoft/vscode/issues/29898
        // With this, Emmet formats inline elements as block elements
        // ensuring the wrapped multi line text does not get merged to a single line
        if (!input.rangeToReplace.isSingleLine) {
            expandOptions.profile['inlineBreak'] = 1;
        }
    }
    let expandedText;
    try {
        // Expand the abbreviation
        if (input.textToWrap) {
            let parsedAbbr = helper.parseAbbreviation(input.abbreviation, expandOptions);
            if (input.rangeToReplace.isSingleLine && input.textToWrap.length === 1) {
                // Fetch rightmost element in the parsed abbreviation (i.e the element that will contain the wrapped text).
                let wrappingNode = parsedAbbr;
                while (wrappingNode && wrappingNode.children && wrappingNode.children.length > 0) {
                    wrappingNode = wrappingNode.children[wrappingNode.children.length - 1];
                }
                // If wrapping with a block element, insert newline in the text to wrap.
                if (wrappingNode && inlineElements.indexOf(wrappingNode.name) === -1 && (expandOptions['profile'].hasOwnProperty('format') ? expandOptions['profile'].format : true)) {
                    wrappingNode.value = '\n\t' + wrappingNode.value + '\n';
                }
            }
            expandedText = helper.expandAbbreviation(parsedAbbr, expandOptions);
            // All $anyword would have been escaped by the emmet helper.
            // Remove the escaping backslash from $TM_SELECTED_TEXT so that VS Code Snippet controller can treat it as a variable
            expandedText = expandedText.replace('\\$TM_SELECTED_TEXT', '$TM_SELECTED_TEXT');
        }
        else {
            expandedText = helper.expandAbbreviation(input.abbreviation, expandOptions);
        }
    }
    catch (e) {
        vscode.window.showErrorMessage('Failed to expand abbreviation');
    }
    return expandedText;
}
function getSyntaxFromArgs(args) {
    const mappedModes = util_1.getMappingForIncludedLanguages();
    const language = args['language'];
    const parentMode = args['parentMode'];
    const excludedLanguages = vscode.workspace.getConfiguration('emmet')['excludeLanguages'] ? vscode.workspace.getConfiguration('emmet')['excludeLanguages'] : [];
    if (excludedLanguages.indexOf(language) > -1) {
        return;
    }
    let syntax = util_1.getEmmetMode((mappedModes[language] ? mappedModes[language] : language), excludedLanguages);
    if (!syntax) {
        syntax = util_1.getEmmetMode((mappedModes[parentMode] ? mappedModes[parentMode] : parentMode), excludedLanguages);
    }
    return syntax;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const html_matcher_1 = __webpack_require__(5);
const css_parser_1 = __webpack_require__(8);
const bufferStream_1 = __webpack_require__(9);
let _emmetHelper;
let _currentExtensionsPath = undefined;
function getEmmetHelper() {
    // Lazy load vscode-emmet-helper instead of importing it
    // directly to reduce the start-up time of the extension
    if (!_emmetHelper) {
        _emmetHelper = __webpack_require__(10);
    }
    updateEmmetExtensionsPath();
    return _emmetHelper;
}
exports.getEmmetHelper = getEmmetHelper;
/**
 * Update Emmet Helper to use user snippets from the extensionsPath setting
 */
function updateEmmetExtensionsPath() {
    if (!_emmetHelper) {
        return;
    }
    let extensionsPath = vscode.workspace.getConfiguration('emmet')['extensionsPath'];
    if (_currentExtensionsPath !== extensionsPath) {
        _currentExtensionsPath = extensionsPath;
        _emmetHelper.updateExtensionsPath(extensionsPath, vscode.workspace.rootPath).then(null, (err) => vscode.window.showErrorMessage(err));
    }
}
exports.updateEmmetExtensionsPath = updateEmmetExtensionsPath;
/**
 * Mapping between languages that support Emmet and completion trigger characters
 */
exports.LANGUAGE_MODES = {
    'html': ['!', '.', '}', ':', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'jade': ['!', '.', '}', ':', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'slim': ['!', '.', '}', ':', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'haml': ['!', '.', '}', ':', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'xml': ['.', '}', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'xsl': ['!', '.', '}', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'css': [':', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'scss': [':', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'sass': [':', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'less': [':', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'stylus': [':', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'javascriptreact': ['!', '.', '}', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'typescriptreact': ['!', '.', '}', '*', '$', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};
function isStyleSheet(syntax) {
    let stylesheetSyntaxes = ['css', 'scss', 'sass', 'less', 'stylus'];
    return (stylesheetSyntaxes.indexOf(syntax) > -1);
}
exports.isStyleSheet = isStyleSheet;
function validate(allowStylesheet = true) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor is active');
        return false;
    }
    if (!allowStylesheet && isStyleSheet(editor.document.languageId)) {
        return false;
    }
    return true;
}
exports.validate = validate;
function getMappingForIncludedLanguages() {
    // Explicitly map languages that have built-in grammar in VS Code to their parent language
    // to get emmet completion support
    // For other languages, users will have to use `emmet.includeLanguages` or
    // language specific extensions can provide emmet completion support
    const MAPPED_MODES = {
        'handlebars': 'html',
        'php': 'html'
    };
    const finalMappedModes = Object.create(null);
    let includeLanguagesConfig = vscode.workspace.getConfiguration('emmet')['includeLanguages'];
    let includeLanguages = Object.assign({}, MAPPED_MODES, includeLanguagesConfig ? includeLanguagesConfig : {});
    Object.keys(includeLanguages).forEach(syntax => {
        if (typeof includeLanguages[syntax] === 'string' && exports.LANGUAGE_MODES[includeLanguages[syntax]]) {
            finalMappedModes[syntax] = includeLanguages[syntax];
        }
    });
    return finalMappedModes;
}
exports.getMappingForIncludedLanguages = getMappingForIncludedLanguages;
/**
* Get the corresponding emmet mode for given vscode language mode
* Eg: jsx for typescriptreact/javascriptreact or pug for jade
* If the language is not supported by emmet or has been excluded via `excludeLanguages` setting,
* then nothing is returned
*
* @param excludedLanguages Array of language ids that user has chosen to exclude for emmet
*/
function getEmmetMode(language, excludedLanguages) {
    if (!language || excludedLanguages.indexOf(language) > -1) {
        return;
    }
    if (/\b(typescriptreact|javascriptreact|jsx-tags)\b/.test(language)) { // treat tsx like jsx
        return 'jsx';
    }
    if (language === 'sass-indented') { // map sass-indented to sass
        return 'sass';
    }
    if (language === 'jade') {
        return 'pug';
    }
    const emmetModes = ['html', 'pug', 'slim', 'haml', 'xml', 'xsl', 'jsx', 'css', 'scss', 'sass', 'less', 'stylus'];
    if (emmetModes.indexOf(language) > -1) {
        return language;
    }
    return;
}
exports.getEmmetMode = getEmmetMode;
/**
 * Parses the given document using emmet parsing modules
 */
function parseDocument(document, showError = true) {
    let parseContent = isStyleSheet(document.languageId) ? css_parser_1.default : html_matcher_1.default;
    try {
        return parseContent(new bufferStream_1.DocumentStreamReader(document));
    }
    catch (e) {
        if (showError) {
            vscode.window.showErrorMessage('Emmet: Failed to parse the file');
        }
    }
    return undefined;
}
exports.parseDocument = parseDocument;
const closeBrace = 125;
const openBrace = 123;
const slash = 47;
const star = 42;
/**
 * Traverse the given document backward & forward from given position
 * to find a complete ruleset, then parse just that to return a Stylesheet
 * @param document vscode.TextDocument
 * @param position vscode.Position
 */
function parsePartialStylesheet(document, position) {
    const isCSS = document.languageId === 'css';
    let startPosition = new vscode.Position(0, 0);
    let endPosition = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
    const limitCharacter = document.offsetAt(position) - 5000;
    const limitPosition = limitCharacter > 0 ? document.positionAt(limitCharacter) : startPosition;
    const stream = new bufferStream_1.DocumentStreamReader(document, position);
    function findOpeningCommentBeforePosition(pos) {
        let text = document.getText(new vscode.Range(0, 0, pos.line, pos.character));
        let offset = text.lastIndexOf('/*');
        if (offset === -1) {
            return;
        }
        return document.positionAt(offset);
    }
    function findClosingCommentAfterPosition(pos) {
        let text = document.getText(new vscode.Range(pos.line, pos.character, document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length));
        let offset = text.indexOf('*/');
        if (offset === -1) {
            return;
        }
        offset += 2 + document.offsetAt(pos);
        return document.positionAt(offset);
    }
    function consumeLineCommentBackwards() {
        if (!isCSS && currentLine !== stream.pos.line) {
            currentLine = stream.pos.line;
            let startLineComment = document.lineAt(currentLine).text.indexOf('//');
            if (startLineComment > -1) {
                stream.pos = new vscode.Position(currentLine, startLineComment);
            }
        }
    }
    function consumeBlockCommentBackwards() {
        if (stream.peek() === slash) {
            if (stream.backUp(1) === star) {
                stream.pos = findOpeningCommentBeforePosition(stream.pos) || startPosition;
            }
            else {
                stream.next();
            }
        }
    }
    function consumeCommentForwards() {
        if (stream.eat(slash)) {
            if (stream.eat(slash) && !isCSS) {
                stream.pos = new vscode.Position(stream.pos.line + 1, 0);
            }
            else if (stream.eat(star)) {
                stream.pos = findClosingCommentAfterPosition(stream.pos) || endPosition;
            }
        }
    }
    // Go forward until we find a closing brace.
    while (!stream.eof() && !stream.eat(closeBrace)) {
        if (stream.peek() === slash) {
            consumeCommentForwards();
        }
        else {
            stream.next();
        }
    }
    if (!stream.eof()) {
        endPosition = stream.pos;
    }
    stream.pos = position;
    let openBracesToFind = 1;
    let currentLine = position.line;
    let exit = false;
    // Go back until we found an opening brace. If we find a closing one, consume its pair and continue.
    while (!exit && openBracesToFind > 0 && !stream.sof()) {
        consumeLineCommentBackwards();
        switch (stream.backUp(1)) {
            case openBrace:
                openBracesToFind--;
                break;
            case closeBrace:
                if (isCSS) {
                    stream.next();
                    startPosition = stream.pos;
                    exit = true;
                }
                else {
                    openBracesToFind++;
                }
                break;
            case slash:
                consumeBlockCommentBackwards();
                break;
            default:
                break;
        }
        if (position.line - stream.pos.line > 100 || stream.pos.isBeforeOrEqual(limitPosition)) {
            exit = true;
        }
    }
    // We are at an opening brace. We need to include its selector.
    currentLine = stream.pos.line;
    openBracesToFind = 0;
    let foundSelector = false;
    while (!exit && !stream.sof() && !foundSelector && openBracesToFind >= 0) {
        consumeLineCommentBackwards();
        const ch = stream.backUp(1);
        if (/\s/.test(String.fromCharCode(ch))) {
            continue;
        }
        switch (ch) {
            case slash:
                consumeBlockCommentBackwards();
                break;
            case closeBrace:
                openBracesToFind++;
                break;
            case openBrace:
                openBracesToFind--;
                break;
            default:
                if (!openBracesToFind) {
                    foundSelector = true;
                }
                break;
        }
        if (!stream.sof() && foundSelector) {
            startPosition = stream.pos;
        }
    }
    try {
        return css_parser_1.default(new bufferStream_1.DocumentStreamReader(document, startPosition, new vscode.Range(startPosition, endPosition)));
    }
    catch (e) {
        return;
    }
}
exports.parsePartialStylesheet = parsePartialStylesheet;
/**
 * Returns node corresponding to given position in the given root node
 */
function getNode(root, position, includeNodeBoundary) {
    if (!root) {
        return null;
    }
    let currentNode = root.firstChild;
    let foundNode = null;
    while (currentNode) {
        const nodeStart = currentNode.start;
        const nodeEnd = currentNode.end;
        if ((nodeStart.isBefore(position) && nodeEnd.isAfter(position))
            || (includeNodeBoundary && (nodeStart.isBeforeOrEqual(position) && nodeEnd.isAfterOrEqual(position)))) {
            foundNode = currentNode;
            // Dig deeper
            currentNode = currentNode.firstChild;
        }
        else {
            currentNode = currentNode.nextSibling;
        }
    }
    return foundNode;
}
exports.getNode = getNode;
exports.allowedMimeTypesInScriptTag = ['text/html', 'text/plain', 'text/x-template', 'text/template', 'text/ng-template'];
/**
 * Returns HTML node corresponding to given position in the given root node
 * If position is inside a script tag of type template, then it will be parsed to find the inner HTML node as well
 */
function getHtmlNode(document, root, position, includeNodeBoundary) {
    let currentNode = getNode(root, position, includeNodeBoundary);
    if (!currentNode) {
        return;
    }
    const isTemplateScript = currentNode.name === 'script' &&
        (currentNode.attributes &&
            currentNode.attributes.some(x => x.name.toString() === 'type'
                && exports.allowedMimeTypesInScriptTag.indexOf(x.value.toString()) > -1));
    if (isTemplateScript && currentNode.close &&
        (position.isAfter(currentNode.open.end) && position.isBefore(currentNode.close.start))) {
        let buffer = new bufferStream_1.DocumentStreamReader(document, currentNode.open.end, new vscode.Range(currentNode.open.end, currentNode.close.start));
        try {
            let scriptInnerNodes = html_matcher_1.default(buffer);
            currentNode = getNode(scriptInnerNodes, position, includeNodeBoundary) || currentNode;
        }
        catch (e) { }
    }
    return currentNode;
}
exports.getHtmlNode = getHtmlNode;
/**
 * Returns inner range of an html node.
 */
function getInnerRange(currentNode) {
    if (!currentNode.close) {
        return undefined;
    }
    return new vscode.Range(currentNode.open.end, currentNode.close.start);
}
exports.getInnerRange = getInnerRange;
/**
 * Returns the deepest non comment node under given node
 */
function getDeepestNode(node) {
    if (!node || !node.children || node.children.length === 0 || !node.children.find(x => x.type !== 'comment')) {
        return node;
    }
    for (let i = node.children.length - 1; i >= 0; i--) {
        if (node.children[i].type !== 'comment') {
            return getDeepestNode(node.children[i]);
        }
    }
    return undefined;
}
exports.getDeepestNode = getDeepestNode;
function findNextWord(propertyValue, pos) {
    let foundSpace = pos === -1;
    let foundStart = false;
    let foundEnd = false;
    let newSelectionStart;
    let newSelectionEnd;
    while (pos < propertyValue.length - 1) {
        pos++;
        if (!foundSpace) {
            if (propertyValue[pos] === ' ') {
                foundSpace = true;
            }
            continue;
        }
        if (foundSpace && !foundStart && propertyValue[pos] === ' ') {
            continue;
        }
        if (!foundStart) {
            newSelectionStart = pos;
            foundStart = true;
            continue;
        }
        if (propertyValue[pos] === ' ') {
            newSelectionEnd = pos;
            foundEnd = true;
            break;
        }
    }
    if (foundStart && !foundEnd) {
        newSelectionEnd = propertyValue.length;
    }
    return [newSelectionStart, newSelectionEnd];
}
exports.findNextWord = findNextWord;
function findPrevWord(propertyValue, pos) {
    let foundSpace = pos === propertyValue.length;
    let foundStart = false;
    let foundEnd = false;
    let newSelectionStart;
    let newSelectionEnd;
    while (pos > -1) {
        pos--;
        if (!foundSpace) {
            if (propertyValue[pos] === ' ') {
                foundSpace = true;
            }
            continue;
        }
        if (foundSpace && !foundEnd && propertyValue[pos] === ' ') {
            continue;
        }
        if (!foundEnd) {
            newSelectionEnd = pos + 1;
            foundEnd = true;
            continue;
        }
        if (propertyValue[pos] === ' ') {
            newSelectionStart = pos + 1;
            foundStart = true;
            break;
        }
    }
    if (foundEnd && !foundStart) {
        newSelectionStart = 0;
    }
    return [newSelectionStart, newSelectionEnd];
}
exports.findPrevWord = findPrevWord;
function getNodesInBetween(node1, node2) {
    // Same node
    if (sameNodes(node1, node2)) {
        return [node1];
    }
    // Not siblings
    if (!sameNodes(node1.parent, node2.parent)) {
        // node2 is ancestor of node1
        if (node2.start.isBefore(node1.start)) {
            return [node2];
        }
        // node1 is ancestor of node2
        if (node2.start.isBefore(node1.end)) {
            return [node1];
        }
        // Get the highest ancestor of node1 that should be commented
        while (node1.parent && node1.parent.end.isBefore(node2.start)) {
            node1 = node1.parent;
        }
        // Get the highest ancestor of node2 that should be commented
        while (node2.parent && node2.parent.start.isAfter(node1.start)) {
            node2 = node2.parent;
        }
    }
    const siblings = [];
    let currentNode = node1;
    const position = node2.end;
    while (currentNode && position.isAfter(currentNode.start)) {
        siblings.push(currentNode);
        currentNode = currentNode.nextSibling;
    }
    return siblings;
}
exports.getNodesInBetween = getNodesInBetween;
function sameNodes(node1, node2) {
    if (!node1 || !node2) {
        return false;
    }
    return node1.start.isEqual(node2.start) && node1.end.isEqual(node2.end);
}
exports.sameNodes = sameNodes;
function getEmmetConfiguration(syntax) {
    const emmetConfig = vscode.workspace.getConfiguration('emmet');
    const syntaxProfiles = Object.assign({}, emmetConfig['syntaxProfiles'] || {});
    const preferences = Object.assign({}, emmetConfig['preferences'] || {});
    // jsx, xml and xsl syntaxes need to have self closing tags unless otherwise configured by user
    if (syntax === 'jsx' || syntax === 'xml' || syntax === 'xsl') {
        syntaxProfiles[syntax] = syntaxProfiles[syntax] || {};
        if (typeof syntaxProfiles[syntax] === 'object'
            && !syntaxProfiles[syntax].hasOwnProperty('self_closing_tag') // Old Emmet format
            && !syntaxProfiles[syntax].hasOwnProperty('selfClosingStyle') // Emmet 2.0 format
        ) {
            syntaxProfiles[syntax] = Object.assign({}, syntaxProfiles[syntax], { selfClosingStyle: 'xml' });
        }
    }
    return {
        preferences,
        showExpandedAbbreviation: emmetConfig['showExpandedAbbreviation'],
        showAbbreviationSuggestions: emmetConfig['showAbbreviationSuggestions'],
        syntaxProfiles,
        variables: emmetConfig['variables'],
        excludeLanguages: emmetConfig['excludeLanguages'],
        showSuggestionsAsSnippets: emmetConfig['showSuggestionsAsSnippets']
    };
}
exports.getEmmetConfiguration = getEmmetConfiguration;
/**
 * Itereates by each child, as well as nested child's children, in their order
 * and invokes `fn` for each. If `fn` function returns `false`, iteration stops
 */
function iterateCSSToken(token, fn) {
    for (let i = 0, il = token.size; i < il; i++) {
        if (fn(token.item(i)) === false || iterateCSSToken(token.item(i), fn) === false) {
            return false;
        }
    }
    return true;
}
exports.iterateCSSToken = iterateCSSToken;
/**
 * Returns `name` CSS property from given `rule`
 */
function getCssPropertyFromRule(rule, name) {
    return rule.children.find(node => node.type === 'property' && node.name === name);
}
exports.getCssPropertyFromRule = getCssPropertyFromRule;
/**
 * Returns css property under caret in given editor or `null` if such node cannot
 * be found
 */
function getCssPropertyFromDocument(editor, position) {
    const rootNode = parseDocument(editor.document);
    const node = getNode(rootNode, position, true);
    if (isStyleSheet(editor.document.languageId)) {
        return node && node.type === 'property' ? node : null;
    }
    let htmlNode = node;
    if (htmlNode
        && htmlNode.name === 'style'
        && htmlNode.open.end.isBefore(position)
        && htmlNode.close.start.isAfter(position)) {
        let buffer = new bufferStream_1.DocumentStreamReader(editor.document, htmlNode.start, new vscode.Range(htmlNode.start, htmlNode.end));
        let rootNode = css_parser_1.default(buffer);
        const node = getNode(rootNode, position, true);
        return (node && node.type === 'property') ? node : null;
    }
    return null;
}
exports.getCssPropertyFromDocument = getCssPropertyFromDocument;
function getEmbeddedCssNodeIfAny(document, currentNode, position) {
    if (!currentNode) {
        return;
    }
    const currentHtmlNode = currentNode;
    if (currentHtmlNode && currentHtmlNode.close) {
        const innerRange = getInnerRange(currentHtmlNode);
        if (innerRange && innerRange.contains(position)) {
            if (currentHtmlNode.name === 'style'
                && currentHtmlNode.open.end.isBefore(position)
                && currentHtmlNode.close.start.isAfter(position)) {
                let buffer = new bufferStream_1.DocumentStreamReader(document, currentHtmlNode.open.end, new vscode.Range(currentHtmlNode.open.end, currentHtmlNode.close.start));
                return css_parser_1.default(buffer);
            }
        }
    }
    return;
}
exports.getEmbeddedCssNodeIfAny = getEmbeddedCssNodeIfAny;
function isStyleAttribute(currentNode, position) {
    if (!currentNode) {
        return false;
    }
    const currentHtmlNode = currentNode;
    const index = (currentHtmlNode.attributes || []).findIndex(x => x.name.toString() === 'style');
    if (index === -1) {
        return false;
    }
    const styleAttribute = currentHtmlNode.attributes[index];
    return position.isAfterOrEqual(styleAttribute.value.start) && position.isBeforeOrEqual(styleAttribute.value.end);
}
exports.isStyleAttribute = isStyleAttribute;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return match; });
/* harmony import */ var _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



class Node {
	constructor(stream, type, open, close) {
		this.stream = stream;
		this.type = type;
		this.open = open;
		this.close = close;

		this.children = [];
		this.parent = null;
	}

	/**
	 * Returns node name
	 * @return {String}
	 */
	get name() {
		if (this.type === 'tag' && this.open) {
			return this.open && this.open.name && this.open.name.value;
		}

		return '#' + this.type;
	}

	/**
	 * Returns attributes of current node
	 * @return {Array}
	 */
	get attributes() {
		return this.open && this.open.attributes;
	}

	/**
	 * Returns node’s start position in stream
	 * @return {*}
	 */
	get start() {
		return this.open && this.open.start;
	}

	/**
	 * Returns node’s start position in stream
	 * @return {*}
	 */
	get end() {
		return this.close ? this.close.end : this.open && this.open.end;
	}

	get firstChild() {
		return this.children[0];
	}

	get nextSibling() {
		const ix = this.getIndex();
		return ix !== -1 ? this.parent.children[ix + 1] : null;
	}

	get previousSibling() {
		const ix = this.getIndex();
		return ix !== -1 ? this.parent.children[ix - 1] : null;
	}

	/**
	 * Returns current element’s index in parent list of child nodes
	 * @return {Number}
	 */
	getIndex() {
		return this.parent ? this.parent.children.indexOf(this) : -1;
	}

	/**
	 * Adds given node as a child
	 * @param {Node} node
	 * @return {Node} Current node
	 */
	addChild(node) {
		this.removeChild(node);
		this.children.push(node);
		node.parent = this;
		return this;
	}

	/**
	 * Removes given node from current node’s child list
	 * @param  {Node} node
	 * @return {Node} Current node
	 */
	removeChild(node) {
		const ix = this.children.indexOf(node);
		if (ix !== -1) {
			this.children.splice(ix, 1);
			node.parent = null;
		}

		return this;
	}
}

/**
 * A token factory method
 * @param  {StreamReader}   stream
 * @param  {Point|Function} start  Tokens’ start location or stream consumer
 * @param  {Point}          [end]  Tokens’ end location
 * @return {Token}
 */
var token = function(stream, start, end) {
	return typeof start === 'function'
		? eatToken(stream, start)
		: new Token(stream, start, end);
};

/**
 * Consumes characters from given stream that matches `fn` call and returns it
 * as token, if consumed
 * @param  {StreamReader} stream
 * @param  {Function} test
 * @return {Token}
 */
function eatToken(stream, test) {
	const start = stream.pos;
	if (stream.eatWhile(test)) {
		return new Token(stream, start, stream.pos);
	}

	stream.pos = start;
}

/**
 * A structure describing text fragment in content stream
 */
class Token {
	/**
	 * @param {ContentStreamReader} stream
	 * @param {Point} start         Tokens’ start location in content stream
	 * @param {Point} end           Tokens’ end location in content stream
	 */
	constructor(stream, start, end) {
		this.stream = stream;
		this.start = start != null ? start : stream.start;
		this.end   = end   != null ? end   : stream.pos;
		this._value = null;
	}

	/**
	 * Returns token textual value
	 * NB implemented as getter to reduce unnecessary memory allocations for
	 * strings that not required
	 * @return {String}
	 */
	get value() {
		if (this._value === null) {
			const start = this.stream.start;
			const end = this.stream.pos;

			this.stream.start = this.start;
			this.stream.pos = this.end;
			this._value = this.stream.current();

			this.stream.start = start;
			this.stream.pos = end;
		}

		return this._value;
	}

	toString() {
		return this.value;
	}

	valueOf() {
		return `${this.value} [${this.start}; ${this.end}]`;
	}
}

const LANGLE  = 60;
const RANGLE  = 62;  // < and >
const LSQUARE = 91;
const RSQUARE = 93;  // [ and ]
const LROUND  = 40;
const RROUND  = 41;  // ( and )
const LCURLY  = 123;
const RCURLY  = 125; // { and }

const opt = { throws: true };

/**
 * Consumes paired tokens (like `[` and `]`) with respect of nesting and embedded
 * quoted values
 * @param  {StreamReader} stream
 * @return {Token} A token with consumed paired character
 */
var eatPaired = function(stream) {
	const start = stream.pos;
	const consumed = Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, LANGLE, RANGLE, opt)
		|| Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, LSQUARE, RSQUARE, opt)
		|| Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, LROUND,  RROUND,  opt)
		|| Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, LCURLY,  RCURLY,  opt);

	if (consumed) {
		return token(stream, start);
	}
};

const SLASH$1        = 47;  // /
const EQUALS       = 61;  // =
const RIGHT_ANGLE$1  = 62;  // >

/**
 * Consumes attributes from given stream
 * @param {StreamReader} stream
 * @return {Array} Array of consumed attributes
 */
var eatAttributes = function(stream) {
	const result = [];
	let name, value, attr;

	while (!stream.eof()) {
		stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"]);
		attr = { start: stream.pos };

		// A name could be a regular name or expression:
		// React-style – <div {...props}>
		// Angular-style – <div [ng-for]>
		if (attr.name = eatAttributeName(stream)) {
			// Consumed attribute name. Can be an attribute with name
			// or boolean attribute. The value can be React-like expression
			if (stream.eat(EQUALS)) {
				attr.value = eatAttributeValue(stream);
			} else {
				attr.boolean = true;
			}
			attr.end = stream.pos;
			result.push(attr);
		} else if (isTerminator(stream.peek())) {
			// look for tag terminator in order to skip any other possible characters
			// (maybe junk)
			break;
		} else {
			stream.next();
		}
	}

	return result;
};

/**
 * Consumes attribute name from current location
 * @param  {StreamReader} stream
 * @return {Token}
 */
function eatAttributeName(stream) {
	return eatPaired(stream) || token(stream, isAttributeName);
}

/**
 * Consumes attribute value from given location
 * @param  {StreamReader} stream
 * @return {Token}
 */
function eatAttributeValue(stream) {
	const start = stream.pos;
	if (Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatQuoted"])(stream)) {
		// Should return token that points to unquoted value.
		// Use stream readers’ public API to traverse instead of direct
		// manipulation
		const current = stream.pos;
		let valueStart, valueEnd;

		stream.pos = start;
		stream.next();
		valueStart = stream.start = stream.pos;

		stream.pos = current;
		stream.backUp(1);
		valueEnd = stream.pos;

		const result = token(stream, valueStart, valueEnd);
		stream.pos = current;
		return result;
	}

	return eatPaired(stream) || eatUnquoted(stream);
}

/**
 * Check if given code belongs to attribute name.
 * NB some custom HTML variations allow non-default values in name, like `*ngFor`
 * @param  {Number}  code
 * @return {Boolean}
 */
function isAttributeName(code) {
	return code !== EQUALS && !isTerminator(code) && !Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"])(code);
}

/**
 * Check if given code is tag terminator
 * @param  {Number}  code
 * @return {Boolean}
 */
function isTerminator(code) {
	return code === RIGHT_ANGLE$1 || code === SLASH$1;
}

/**
 * Eats unquoted value from stream
 * @param  {StreamReader} stream
 * @return {Token}
 */
function eatUnquoted(stream) {
	return token(stream, isUnquoted);
}

/**
 * Check if given character code is valid unquoted value
 * @param  {Number}  code
 * @return {Boolean}
 */
function isUnquoted(code) {
	return !isNaN(code) && !Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isQuote"])(code) && !Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"])(code) && !isTerminator(code);
}

const DASH        = 45; // -
const DOT         = 46; // .
const SLASH       = 47; // /
const COLON       = 58; // :
const LEFT_ANGLE  = 60; // <
const RIGHT_ANGLE = 62; // >
const UNDERSCORE  = 95; // _

/**
 * Parses tag definition (open or close tag) from given stream state
 * @param {StreamReader} stream Content stream reader
 * @return {Object}
 */
var tag = function(stream) {
	const start = stream.pos;

	if (stream.eat(LEFT_ANGLE)) {
		const model = { type: stream.eat(SLASH) ? 'close' : 'open' };

		if (model.name = eatTagName(stream)) {
			if (model.type !== 'close') {
				model.attributes = eatAttributes(stream);
				stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"]);
				model.selfClosing = stream.eat(SLASH);
			}

			if (stream.eat(RIGHT_ANGLE)) {
				// tag properly closed
				return Object.assign(token(stream, start), model);
			}
		}
	}

	// invalid tag, revert to original position
	stream.pos = start;
	return null;
};

/**
 * Eats HTML identifier (tag or attribute name) from given stream
 * @param  {StreamReader} stream
 * @return {Token}
 */
function eatTagName(stream) {
	return token(stream, isTagName);
}

/**
 * Check if given character code can be used as HTML/XML tag name
 * @param  {Number}  code
 * @return {Boolean}
 */
function isTagName(code) {
	return Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isAlphaNumeric"])(code)
		|| code === COLON // colon is used for namespaces
		|| code === DOT   // in rare cases declarative tag names may have dots in names
		|| code === DASH
		|| code === UNDERSCORE;
}

/**
 * Eats array of character codes from given stream
 * @param  {StreamReader} stream
 * @param  {Number[]} codes  Array of character codes
 * @return {Boolean}
 */
function eatArray(stream, codes) {
	const start = stream.pos;

	for (let i = 0; i < codes.length; i++) {
		if (!stream.eat(codes[i])) {
			stream.pos = start;
			return false;
		}
	}

	stream.start = start;
	return true;
}

/**
 * Consumes section from given string which starts with `open` character codes
 * and ends with `close` character codes
 * @param  {StreamReader} stream
 * @param  {Number[]} open
 * @param  {Number[]} close
 * @return {Boolean}  Returns `true` if section was consumed
 */
function eatSection(stream, open, close, allowUnclosed) {
	const start = stream.pos;
	if (eatArray(stream, open)) {
		// consumed `<!--`, read next until we find ending part or reach the end of input
		while (!stream.eof()) {
			if (eatArray(stream, close)) {
				return true;
			}

			stream.next();
		}

		// unclosed section is allowed
		if (allowUnclosed) {
			return true;
		}

		stream.pos = start;
		return false;
	}

	// unable to find section, revert to initial position
	stream.pos = start;
	return null;
}

/**
 * Converts given string into array of character codes
 * @param  {String} str
 * @return {Number[]}
 */
function toCharCodes(str) {
	return str.split('').map(ch => ch.charCodeAt(0));
}

const open  = toCharCodes('<!--');
const close = toCharCodes('-->');

/**
 * Consumes HTML comment from given stream
 * @param  {StreamReader} stream
 * @return {Token}
 */
var comment = function(stream) {
	const start = stream.pos;
	if (eatSection(stream, open, close, true)) {
		const result = token(stream, start);
		result.type = 'comment';
		return result;
	}

	return null;
};

const open$1  = toCharCodes('<![CDATA[');
const close$1 = toCharCodes(']]>');

/**
 * Consumes CDATA from given stream
 * @param  {StreamReader} stream
 * @return {Token}
 */
var cdata = function(stream) {
	const start = stream.pos;
	if (eatSection(stream, open$1, close$1, true)) {
		const result = token(stream, start);
		result.type = 'cdata';
		return result;
	}

	return null;
};

const defaultOptions = {
	/**
	 * Expect XML content in searching content. It alters how should-be-empty
	 * elements are treated: for example, in XML mode parser will try to locate
	 * closing pair for `<br>` tag
	 * @type {Boolean}
	 */
	xml: false,

	special: ['script', 'style'],

	/**
	 * List of elements that should be treated as empty (e.g. without closing tag)
	 * in non-XML syntax
	 * @type {Array}
	 */
	empty: ['img', 'meta', 'link', 'br', 'base', 'hr', 'area', 'wbr','col', 'embed', 'input', 'param', 'source', 'track']
};

/**
 * Parses given content into a DOM-like structure
 * @param  {String|StreamReader} content
 * @param  {Object} options
 * @return {Node}
 */
function parse(content, options) {
	options = Object.assign({}, defaultOptions, options);
	const stream = typeof content === 'string'
		? new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](content)
		: content;

	const root = new Node(stream, 'root');
	const empty = new Set(options.empty);
	const special = options.special.reduce(
		(map, name) => map.set(name, toCharCodes(`</${name}>`)), new Map());
	const isEmpty = (token, name) =>
		token.selfClosing || (!options.xml && empty.has(name));

	let m, node, name, stack = [root];

	while (!stream.eof()) {
		if (m = match(stream)) {
			name = getName(m);

			if (m.type === 'open') {
				// opening tag
				node = new Node(stream, 'tag', m);
				last(stack).addChild(node);
				if (special.has(name)) {
					node.close = consumeSpecial(stream, special.get(name));
				} else if (!isEmpty(m, name)) {
					stack.push(node);
				}
			} else if (m.type === 'close') {
				// closing tag, find it’s matching opening tag
				for (let i = stack.length - 1; i > 0; i--) {
					if (stack[i].name.toLowerCase() === name) {
						stack[i].close = m;
						stack = stack.slice(0, i);
						break;
					}
				}
			} else {
				last(stack).addChild(new Node(stream, m.type, m));
			}
		} else {
			stream.next();
		}
	}

	return root;
}

/**
 * Matches known token in current state of given stream
 * @param  {ContentStreamReader} stream
 * @return {Token}
 */
function match(stream) {
	// fast-path optimization: check for `<` code
	if (stream.peek() === 60 /* < */) {
		return comment(stream) || cdata(stream) || tag(stream);
	}
}

/**
 * @param  {StreamReader} stream
 * @param  {Number[]} codes
 * @return {Token}
 */
function consumeSpecial(stream, codes) {
	const start = stream.pos;
	let m;

	while (!stream.eof()) {
		if (eatArray(stream, codes)) {
			stream.pos = stream.start;
			return tag(stream);
		}
		stream.next();
	}

	stream.pos = start;
	return null;
}

/**
 * Returns name of given matched token
 * @param  {Token} tag
 * @return {String}
 */
function getName(tag$$1) {
	return tag$$1.name ? tag$$1.name.value.toLowerCase() : `#${tag$$1.type}`;
}

function last(arr) {
	return arr[arr.length - 1];
}

/* harmony default export */ __webpack_exports__["default"] = (parse);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A streaming, character code-based string reader
 */
class StreamReader {
	constructor(string, start, end) {
		if (end == null && typeof string === 'string') {
			end = string.length;
		}

		this.string = string;
		this.pos = this.start = start || 0;
		this.end = end;
	}

	/**
	 * Returns true only if the stream is at the end of the file.
	 * @returns {Boolean}
	 */
	eof() {
		return this.pos >= this.end;
	}

	/**
	 * Creates a new stream instance which is limited to given `start` and `end`
	 * range. E.g. its `eof()` method will look at `end` property, not actual
	 * stream end
	 * @param  {Point} start
	 * @param  {Point} end
	 * @return {StreamReader}
	 */
	limit(start, end) {
		return new this.constructor(this.string, start, end);
	}

	/**
	 * Returns the next character code in the stream without advancing it.
	 * Will return NaN at the end of the file.
	 * @returns {Number}
	 */
	peek() {
		return this.string.charCodeAt(this.pos);
	}

	/**
	 * Returns the next character in the stream and advances it.
	 * Also returns <code>undefined</code> when no more characters are available.
	 * @returns {Number}
	 */
	next() {
		if (this.pos < this.string.length) {
			return this.string.charCodeAt(this.pos++);
		}
	}

	/**
	 * `match` can be a character code or a function that takes a character code
	 * and returns a boolean. If the next character in the stream 'matches'
	 * the given argument, it is consumed and returned.
	 * Otherwise, `false` is returned.
	 * @param {Number|Function} match
	 * @returns {Boolean}
	 */
	eat(match) {
		const ch = this.peek();
		const ok = typeof match === 'function' ? match(ch) : ch === match;

		if (ok) {
			this.next();
		}

		return ok;
	}

	/**
	 * Repeatedly calls <code>eat</code> with the given argument, until it
	 * fails. Returns <code>true</code> if any characters were eaten.
	 * @param {Object} match
	 * @returns {Boolean}
	 */
	eatWhile(match) {
		const start = this.pos;
		while (!this.eof() && this.eat(match)) {}
		return this.pos !== start;
	}

	/**
	 * Backs up the stream n characters. Backing it up further than the
	 * start of the current token will cause things to break, so be careful.
	 * @param {Number} n
	 */
	backUp(n) {
		this.pos -= (n || 1);
	}

	/**
	 * Get the string between the start of the current token and the
	 * current stream position.
	 * @returns {String}
	 */
	current() {
		return this.substring(this.start, this.pos);
	}

	/**
	 * Returns substring for given range
	 * @param  {Number} start
	 * @param  {Number} [end]
	 * @return {String}
	 */
	substring(start, end) {
		return this.string.slice(start, end);
	}

	/**
	 * Creates error object with current stream state
	 * @param {String} message
	 * @return {Error}
	 */
	error(message) {
		const err = new Error(`${message} at char ${this.pos + 1}`);
		err.originalMessage = message;
		err.pos = this.pos;
		err.string = this.string;
		return err;
	}
}

/* harmony default export */ __webpack_exports__["default"] = (StreamReader);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eatQuoted", function() { return eatQuoted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isQuote", function() { return isQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAlpha", function() { return isAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAlphaNumeric", function() { return isAlphaNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSpace", function() { return isSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWhiteSpace", function() { return isWhiteSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eatPair", function() { return eatPair; });
/**
 * Methods for consuming quoted values
 */

const SINGLE_QUOTE = 39; // '
const DOUBLE_QUOTE = 34; // "

const defaultOptions = {
	escape: 92,   // \ character
	throws: false
};

/**
 * Consumes 'single' or "double"-quoted string from given string, if possible
 * @param  {StreamReader} stream
 * @param  {Number}  options.escape A character code of quote-escape symbol
 * @param  {Boolean} options.throws Throw error if quotes string can’t be properly consumed
 * @return {Boolean} `true` if quoted string was consumed. The contents
 *                   of quoted string will be availabe as `stream.current()`
 */
var eatQuoted = function(stream, options) {
	options = options ? Object.assign({}, defaultOptions, options) : defaultOptions;
	const start = stream.pos;
	const quote = stream.peek();

	if (stream.eat(isQuote)) {
		while (!stream.eof()) {
			switch (stream.next()) {
				case quote:
					stream.start = start;
					return true;

				case options.escape:
					stream.next();
					break;
			}
		}

		// If we’re here then stream wasn’t properly consumed.
		// Revert stream and decide what to do
		stream.pos = start;

		if (options.throws) {
			throw stream.error('Unable to consume quoted string');
		}
	}

	return false;
};

function isQuote(code) {
	return code === SINGLE_QUOTE || code === DOUBLE_QUOTE;
}

/**
 * Check if given code is a number
 * @param  {Number}  code
 * @return {Boolean}
 */
function isNumber(code) {
	return code > 47 && code < 58;
}

/**
 * Check if given character code is alpha code (letter through A to Z)
 * @param  {Number}  code
 * @param  {Number}  [from]
 * @param  {Number}  [to]
 * @return {Boolean}
 */
function isAlpha(code, from, to) {
	from = from || 65; // A
	to   = to   || 90; // Z
	code &= ~32; // quick hack to convert any char code to uppercase char code

	return code >= from && code <= to;
}

/**
 * Check if given character code is alpha-numeric (letter through A to Z or number)
 * @param  {Number}  code
 * @return {Boolean}
 */
function isAlphaNumeric(code) {
	return isNumber(code) || isAlpha(code);
}

function isWhiteSpace(code) {
	return code === 32   /* space */
		|| code === 9    /* tab */
		|| code === 160; /* non-breaking space */
}

/**
 * Check if given character code is a space
 * @param  {Number}  code
 * @return {Boolean}
 */
function isSpace(code) {
	return isWhiteSpace(code)
		|| code === 10  /* LF */
		|| code === 13; /* CR */
}

const defaultOptions$1 = {
	escape: 92,   // \ character
	throws: false
};

/**
 * Eats paired characters substring, for example `(foo)` or `[bar]`
 * @param  {StreamReader} stream
 * @param  {Number} open      Character code of pair openinig
 * @param  {Number} close     Character code of pair closing
 * @param  {Object} [options]
 * @return {Boolean}       Returns `true` if chacarter pair was successfully
 *                         consumed, it’s content will be available as `stream.current()`
 */
function eatPair(stream, open, close, options) {
	options = options ? Object.assign({}, defaultOptions$1, options) : defaultOptions$1;
	const start = stream.pos;

	if (stream.eat(open)) {
		let stack = 1, ch;

		while (!stream.eof()) {
			if (eatQuoted(stream, options)) {
				continue;
			}

			ch = stream.next();
			if (ch === open) {
				stack++;
			} else if (ch === close) {
				stack--;
				if (!stack) {
					stream.start = start;
					return true;
				}
			} else if (ch === options.escape) {
				stream.next();
			}
		}

		// If we’re here then paired character can’t be consumed
		stream.pos = start;

		if (options.throws) {
			throw stream.error(`Unable to find matching pair for ${String.fromCharCode(open)}`);
		}
	}

	return false;
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lexer", function() { return lexer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Token", function() { return Token; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return selector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "value", function() { return value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyword", function() { return keyword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "variable", function() { return variable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatting", function() { return formatting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comment", function() { return comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whitespace", function() { return whitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ident", function() { return ident; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "string", function() { return string; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "url", function() { return url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolation", function() { return interpolation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backtick", function() { return backtick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMediaExpression", function() { return parseMediaExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePropertyName", function() { return parsePropertyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePropertyValue", function() { return parsePropertyValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSelector", function() { return parseSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProperty", function() { return createProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRule", function() { return createRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAtRule", function() { return createAtRule; });
/* harmony import */ var _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



/**
 * Abstract container that contains nested nodes or other containers
 */
class Node {
	constructor(type) {
		this.type = type;
		this.children = [];
		this.parent = null;
	}

	get firstChild() {
		return this.children[0];
	}

	get nextSibling() {
		const ix = this.index();
		return ix !== -1 ? this.parent.children[ix + 1] : null;
	}

	get previousSibling() {
		const ix = this.index();
		return ix !== -1 ? this.parent.children[ix - 1] : null;
	}

	/**
	 * Returns current element’s index in parent list of child nodes
	 * @return {Number}
	 */
	index() {
		return this.parent ? this.parent.children.indexOf(this) : -1;
	}

	/**
	 * Adds given node as a child
	 * @param {Node} node
	 * @return {Node} Current node
	 */
	add(node) {
		if (node) {
			node.remove();
			this.children.push(node);
			node.parent = this;
		}
		return this;
	}

	/**
	 * Removes current node from its parent
	 * @return {Node} Current node
	 */
	remove() {
		if (this.parent) {
			const ix = this.index();
			if (ix !== -1) {
				this.parent.children.splice(ix, 1);
				this.parent = null;
			}
		}

		return this;
	}
}

class Stylesheet extends Node {
	constructor() {
		super('stylesheet');
		this.comments = [];
	}

	/**
	 * Returns node’s start position in stream
	 * @return {*}
	 */
	get start() {
		const node = this.firstChild;
		return node && node.start;
	}

	/**
	 * Returns node’s end position in stream
	 * @return {*}
	 */
	get end() {
		const node = this.children[this.children.length - 1];
		return node && node.end;
	}

	/**
	 * Adds comment token into a list.
	 * This somewhat awkward feature is required to properly detect comment
	 * ranges. Specifically, in Atom: it’s API provides scopes limited to current
	 * line only
	 * @param {Token} token
	 */
	addComment(token) {
		this.comments.push(token);
	}
}

/**
 * Removes tokens that matches given criteria from start and end of given list
 * @param  {Token[]} tokens
 * @return {Token[]}
 */
function trimTokens(tokens) {
	tokens = tokens.slice();
	let len;
	while (len !== tokens.length) {
		len = tokens.length;
		if (isFormattingToken(tokens[0])) {
			tokens.shift();
		}

		if (isFormattingToken(last(tokens))) {
			tokens.pop();
		}
	}

	return tokens;
}

/**
 * Trims formatting tokens (whitespace and comments) from the beginning and end
 * of given token list
 * @param  {Token[]} tokens
 * @return {Token[]}
 */
function trimFormatting(tokens) {
	return trimTokens(tokens, isFormattingToken);
}

/**
 * Check if given token is a formatting one (whitespace or comment)
 * @param  {Token}  token
 * @return {Boolean}
 */
function isFormattingToken(token) {
	const type = token && token.type;
	return type === 'whitespace' || type === 'comment';
}

/**
 * Consumes string char-by-char from given stream
 * @param  {StreamReader} stream
 * @param  {String} string
 * @return {Boolean} Returns `true` if string was completely consumed
 */
function eatString(stream, string) {
	const start = stream.pos;

	for (let i = 0, il = string.length; i < il; i++) {
		if (!stream.eat(string.charCodeAt(i))) {
			stream.pos = start;
			return false;
		}
	}

	return true;
}

function consume(stream, match) {
	const start = stream.pos;
	if (stream.eat(match)) {
		stream.start = start;
		return true;
	}

	return false;
}

function consumeWhile(stream, match) {
	const start = stream.pos;
	if (stream.eatWhile(match)) {
		stream.start = start;
		return true;
	}

	return false;
}

function last(arr) {
	return arr[arr.length - 1];
}

function valueOf(token) {
	return token && token.valueOf();
}

/**
 * A structure describing text fragment in content stream. It may contain
 * other sub-fragments (also tokens) that represent current fragments’ logical
 * parts
 */
class Token {
	/**
	 * @param {StreamReader} stream
	 * @param {String}       type    Token type
	 * @param {Object}       [start] Tokens’ start position in `stream`
	 * @param {Object}       [end]   Tokens’ end position in `stream`
	 */
	constructor(stream, type, start, end) {
		this.stream = stream;
		this.start = start != null ? start : stream.start;
		this.end = end != null ? end : stream.pos;
		this.type = type;

		this._props = null;
		this._value = null;
		this._items = null;
	}

	get size() {
		return this._items ? this._items.length : 0;
	}

	get items() {
		return this._items;
	}

	clone(start, end) {
		return new this.constructor(this.stream, this.type,
			start != null ? start : this.start,
			end != null ? end : this.end);
	}

	add(item) {
		if (Array.isArray(item)) {
			for (let i = 0, il = item.length; i < il; i++) {
				this.add(item[i]);
			}
		} else if (item) {
			if (!this._items) {
				this._items = [item];
			} else {
				this._items.push(item);
			}
		}

		return this;
	}

	remove(item) {
		if (this._items) {
			const ix = this._items.indexOf(item);
			if (ix !== -1 ) {
				this._items.splice(ix, 1);
			}
		}

		return this;
	}

	item(i) {
		const size = this.size;
		return this._items && this._items[(size + i) % size];
	}

	limit() {
		return this.stream.limit(this.start, this.end);
	}

	slice(from, to) {
		const token = this.clone();
		const items = this._items && this._items.slice(from, to);
		if (items && items.length) {
			token.start = items[0].start;
			token.end = items[items.length - 1].end;
			token.add(items);
		} else if (items) {
			// Empty token
			token.start = token.end;
		}

		return token;
	}

	property(name, value) {
		if (typeof value !== 'undefined') {
			// set property value
			if (!this._props) {
				this._props = {};
			}

			this._props[name] = value;
		}

		return this._props && this._props[name];
	}

	/**
	 * Returns token textual representation
	 * @return {String}
	 */
	toString() {
		return `${this.valueOf()} [${this.start}, ${this.end}] (${this.type})`;
	}

	valueOf() {
		if (this._value === null) {
			this._value = this.stream.substring(this.start, this.end);
		}

		return this._value;
	}
}

const COMMA           = 44;  // ,
const PROP_DELIMITER$1  = 58;  // :
const PROP_TERMINATOR$1 = 59;  // ;
const RULE_START$1      = 123; // {
const RULE_END$1        = 125; // }

const types = new Map()
	.set(COMMA, 'comma')
	.set(PROP_DELIMITER$1, 'propertyDelimiter')
	.set(PROP_TERMINATOR$1, 'propertyTerminator')
	.set(RULE_START$1, 'ruleStart')
	.set(RULE_END$1, 'ruleEnd');

/**
 * Consumes separator token from given string
 */
function separator(stream) {
	if (isSeparator(stream.peek())) {
		const start = stream.pos;
		const type = types.get(stream.next());
		const token = new Token(stream, 'separator', start);

		token.property('type', type);
		return token;
	}
}



function isSeparator(code) {
	return code === COMMA
		|| code === PROP_DELIMITER$1 || code === PROP_TERMINATOR$1
		|| code === RULE_START$1 || code === RULE_END$1;
}

const ARGUMENTS_START = 40;  // (
const ARGUMENTS_END   = 41;  // )

var args = function(stream, tokenConsumer) {
	if (stream.peek() === ARGUMENTS_START) {
		const start = stream.pos;
		stream.next();

		const tokens = [];
		let t;
		// in LESS, it’s possible to separate arguments list either by `;` or `,`.
		// In first case, we should keep comma-separated item as a single argument
		let usePropTerminator = false;

		while (!stream.eof()) {
			if (isUnexpectedTerminator(stream.peek()) || stream.eat(ARGUMENTS_END)) {
				break;
			}

			t = tokenConsumer(stream);
			if (!t) {
				break;
			}

			if (isSemicolonSeparator(t)) {
				usePropTerminator = true;
			}

			tokens.push(t);
		}

		stream.start = start;
		return createArgumentList(stream, tokens, usePropTerminator);
	}
};

function isUnexpectedTerminator(code) {
	return code === RULE_START$1 || code === RULE_END$1;
}

function createArgumentList(stream, tokens, usePropTerminator) {
	const argsToken = new Token(stream, 'arguments');
	const isSeparator = usePropTerminator ? isSemicolonSeparator : isCommaSeparator;
	let arg = [];

	for (let i = 0, il = tokens.length, token; i < il; i++) {
		token = tokens[i];
		if (isSeparator(token)) {
			argsToken.add(createArgument(stream, arg) || createEmptyArgument(stream, token.start));
			arg.length = 0;
		} else {
			arg.push(token);
		}
	}

	if (arg.length) {
		argsToken.add(createArgument(stream, arg));
	}

	return argsToken;
}

function createArgument(stream, tokens) {
	tokens = trimFormatting(tokens);

	if (tokens.length) {
		const arg = new Token(stream, 'argument', tokens[0].start, last(tokens).end);

		for (let i = 0; i < tokens.length; i++) {
			arg.add(tokens[i]);
		}

		return arg;
	}
}

function createEmptyArgument(stream, pos) {
	const token = new Token(stream, 'argument', pos, pos);
	token.property('empty', true);
	return token;
}

function isCommaSeparator(token) {
	return token.property('type') === 'comma';
}

function isSemicolonSeparator(token) {
	return token.property('type') === 'propertyTerminator';
}

const HYPHEN     = 45;
const UNDERSCORE = 95;

function ident(stream) {
	return eatIdent(stream) && new Token(stream, 'ident');
}

function eatIdent(stream) {
	const start = stream.pos;

	stream.eat(HYPHEN);
	if (stream.eat(isIdentStart)) {
		stream.eatWhile(isIdent);
		stream.start = start;
		return true;
	}

	stream.pos = start;
	return false;
}

function isIdentStart(code) {
	return code === UNDERSCORE || code === HYPHEN || Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isAlpha"])(code) || code >= 128;
}

function isIdent(code) {
	return Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(code) || isIdentStart(code);
}

function prefixed(stream, tokenType, prefix, body, allowEmptyBody) {
	const start = stream.pos;

	if (stream.eat(prefix)) {
		const bodyToken = body(stream, start);
		if (bodyToken || allowEmptyBody) {
			stream.start = start;
			return new Token(stream, tokenType, start).add(bodyToken);
		}
	}

	stream.pos = start;
}

const AT = 64; // @

/**
 * Consumes at-keyword from given stream
 */
function atKeyword(stream) {
	return prefixed(stream, 'at-keyword', AT, ident);
}

const HASH = 35; // #
const AT$1   = 64; // @

/**
 * Consumes interpolation token, e.g. `#{expression}`
 * @param  {StreamReader} stream
 * @param  {Function} tokenConsumer
 * @return {Token}
 */
function interpolation(stream, tokenConsumer) {
	const start = stream.pos;
	tokenConsumer = tokenConsumer || defaultTokenConsumer;

	if ((stream.eat(HASH) || stream.eat(AT$1)) && stream.eat(RULE_START$1)) {
		const container = new Token(stream, 'interpolation', start);
		let stack = 1, token;

		while (!stream.eof()) {
			if (stream.eat(RULE_START$1)) {
				stack++;
			} else if (stream.eat(RULE_END$1)) {
				stack--;
				if (!stack) {
					container.end = stream.pos;
					return container;
				}
			} else if (token = tokenConsumer(stream)) {
				container.add(token);
			} else {
				break;
			}
		}
	}

	stream.pos = start;
}

function eatInterpolation(stream) {
	const start = stream.pos;

	if ((stream.eat(HASH) || stream.eat(AT$1)) && Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, RULE_START$1, RULE_END$1)) {
		stream.start = start;
		return true;
	}

	stream.pos = start;
	return false;
}

function defaultTokenConsumer(stream) {
	const start = stream.pos;

	while (!stream.eof()) {
		if (stream.peek() === RULE_END$1) {
			break;
		}

		eatString$1(stream) || stream.next();
	}

	if (start !== stream.pos) {
		return new Token(stream, 'expression', start);
	}
}

/**
 * Consumes quoted string from current string and returns token with consumed
 * data or `null`, if string wasn’t consumed
 * @param  {StreamReader} stream
 * @return {StringToken}
 */
function string(stream) {
	return eatString$1(stream, true);
}

function eatString$1(stream, asToken) {
	let ch = stream.peek(), pos, tokens, token;

	if (Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isQuote"])(ch)) {
		stream.start = stream.pos;
		stream.next();
		const quote = ch;
		const valueStart = stream.pos;

		while (!stream.eof()) {
			pos = stream.pos;
			if (stream.eat(quote) || stream.eat(isNewline)) {
				// found end of string or newline without preceding '\',
				// which is not allowed (don’t throw error, for now)
				break;
			} else if (stream.eat(92 /* \ */)) {
				// backslash allows newline in string
				stream.eat(isNewline);
			} else if (asToken && (token = interpolation(stream))) {
				if (!tokens) {
					tokens = [token];
				} else {
					tokens.push(token);
				}
			}

			stream.next();
		}

		// Either reached EOF or explicitly stopped at string end
		// NB use extra `asToken` param to return boolean instead of token to reduce
		// memory allocations and improve performance
		if (asToken) {
			const token = new Token(stream, 'string');
			const inner = new Token(stream, 'unquoted', valueStart, pos);
			inner.add(tokens);
			token.add(inner);
			token.property('quote', quote);
			return token;
		}

		return true;
	}

	return false;
}

function isNewline(code) {
	return code === 10  /* LF */ || code === 13 /* CR */;
}

const ASTERISK = 42;
const SLASH    = 47;

/**
 * Consumes comment from given stream: either multi-line or single-line
 * @param  {StreamReader} stream
 * @return {CommentToken}
 */
var comment = function(stream) {
	return singleLineComment(stream) || multiLineComment(stream);
};

function singleLineComment(stream) {
	if (eatSingleLineComment(stream)) {
		const token = new Token(stream, 'comment');
		token.property('type', 'single-line');
		return token;
	}
}

function multiLineComment(stream) {
	if (eatMultiLineComment(stream)) {
		const token = new Token(stream, 'comment');
		token.property('type', 'multiline');
		return token;
	}
}

function eatComment(stream) {
	return eatSingleLineComment(stream) || eatMultiLineComment(stream);
}

function eatSingleLineComment(stream) {
	const start = stream.pos;

	if (stream.eat(SLASH) && stream.eat(SLASH)) {
		// single-line comment, consume till the end of line
		stream.start = start;
		while (!stream.eof()) {
			if (isLineBreak(stream.next())) {
				break;
			}
		}
		return true;
	}

	stream.pos = start;
	return false;
}

function eatMultiLineComment(stream) {
	const start = stream.pos;

	if (stream.eat(SLASH) && stream.eat(ASTERISK)) {
		while (!stream.eof()) {
			if (stream.next() === ASTERISK && stream.eat(SLASH)) {
				break;
			}
		}

		stream.start = start;
		return true;
	}

	stream.pos = start;
	return false;
}

function isLineBreak(code) {
	return code === 10 /* LF */ || code === 13 /* CR */;
}

/**
 * Consumes white-space tokens from given stream
 */
function whitespace(stream) {
	return eatWhitespace(stream) && new Token(stream, 'whitespace');
}

function eatWhitespace(stream) {
	return consumeWhile(stream, _emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"]);
}

const ATTR_START = 91; // [
const ATTR_END   = 93; // ]

/**
 * Consumes attribute from given string, e.g. value between [ and ]
 * @param  {StreamReader} stream
 * @return {AttributeToken}
 */
function eatAttribuite(stream) {
	const start = stream.pos;

	if (stream.eat(ATTR_START)) {
		skip(stream);
		const name = ident(stream);

		skip(stream);
		const op = operator(stream);

		skip(stream);
		const value = string(stream) || ident(stream);

		skip(stream);
		stream.eat(ATTR_END);

		return new Token(stream, 'attribute', start).add(name).add(op).add(value);
	}
}

function skip(stream) {
	while (!stream.eof()) {
		if (!eatWhitespace(stream) && !eatComment(stream)) {
			return true;
		}
	}
}

function operator(stream) {
	return consumeWhile(stream, isOperator) && new Token(stream, 'operator');
}

function isOperator(code) {
	return code === 126 /* ~ */
		|| code === 124 /* | */
		|| code === 94  /* ^ */
		|| code === 36  /* $ */
		|| code === 42  /* * */
		|| code === 61; /* = */
}

const BACKTICK = 96; // `

/**
 * Consumes backtick token, e.g. `...`
 * @param  {StreamReader} stream
 * @param  {Function} tokenConsumer
 * @return {Token}
 */
function backtick(stream) {
	if (eatBacktick(stream)) {
		return new Token(stream, 'backtick');
	}
}

function eatBacktick(stream) {
	const start = stream.pos;

	if (Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["eatPair"])(stream, BACKTICK, BACKTICK)) {
		stream.start = start;
		return true;
	}

	return false;
}

const CLASS = 46; // .

/**
 * Consumes class fragment from given stream, e.g. `.foo`
 * @param  {StreamReader} stream
 * @return {ClassToken}
 */
function className(stream) {
	return prefixed(stream, 'class', CLASS, ident);
}

const ADJACENT_SIBLING = 43;  // +
const GENERAL_SIBLING  = 126; // ~
const CHILD            = 62;  // >
const NESTING          = 38;  // &

const types$1 = {
	[ADJACENT_SIBLING]: 'adjacentSibling',
	[GENERAL_SIBLING]: 'generalSibling',
	[CHILD]: 'child',
	[NESTING]: 'nesting'
};

/**
 * Consumes combinator token from given string
 */
var combinator = function(stream) {
	if (isCombinator(stream.peek())) {
		const start = stream.pos;
		const type = types$1[stream.next()];
		const token = new Token(stream, 'combinator', start);

		token.property('type', type);
		return token;
	}
};



function isCombinator(code) {
	return code === ADJACENT_SIBLING || code === GENERAL_SIBLING
		|| code === NESTING || code === CHILD;
}

const HASH$1 = 35;

function hash(stream) {
	return prefixed(stream, 'hash', HASH$1, hashValue, true);
}



function hashValue(stream) {
	if (eatHashValue(stream)) {
		return new Token(stream, 'hash-value');
	}
}

function eatHashValue(stream) {
	return consumeWhile(stream, isHashValue);
}

function isHashValue(code) {
	return Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(code) || Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isAlpha"])(code, 65 /* A */, 70 /* F */)
		|| code === 95 /* _ */ || code === 45 /* - */
		|| code > 128; /* non-ASCII */
}

const ID = 35; // #

/**
 * Consumes id fragment from given stream, e.g. `#foo`
 * @param  {StreamReader} stream
 * @return {Token}
 */
function id(stream) {
	return prefixed(stream, 'id', ID, ident);
}

const IMPORTANT = 33; // !

/**
 * Consumes !important token
 * @param  {StreamReader} stream
 * @return {Token}
 */
function important(stream) {
	return prefixed(stream, 'important', IMPORTANT, ident);
}

const DOT = 46; // .

/**
 * Consumes number from given string, e.g. `10px`
 * @param  {StreamReader} stream
 * @return {NumberToken}
 */
function number(stream) {
	if (eatNumericPart(stream)) {
		const start = stream.start;
		const num = new Token(stream, 'value');
		const unit = eatUnitPart(stream) ? new Token(stream, 'unit') : null;

		return new Token(stream, 'number', start).add(num).add(unit);
	}
}



function eatNumericPart(stream) {
	const start = stream.pos;

	stream.eat(isOperator$1);
	if (stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])) {
		stream.start = start;
		const decimalEnd = stream.pos;

		if (!(stream.eat(DOT) && stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"]))) {
			stream.pos = decimalEnd;
		}

		return true;
	} else if (stream.eat(DOT) && stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])) {
		stream.start = start;
		return true;
	}

	// TODO eat exponent part

	stream.pos = start;
	return false;
}

function eatUnitPart(stream) {
	return eatIdent(stream) || eatPercent(stream);
}

function eatPercent(stream) {
	return consume(stream, 37 /* % */);
}

function isOperator$1(code) {
	return code === 45 /* - */ || code === 43 /* + */;
}

const NOT          = 33; // !
const MULTIPLY     = 42; // *
const PLUS         = 43; // +
const MINUS        = 45; // -
const DIVIDE       = 47; // /
const LESS_THAN    = 60; // <
const EQUALS       = 61; // =
const GREATER_THAN = 62; // <

function operator$1(stream) {
	return eatOperator(stream) && new Token(stream, 'operator');
}

function eatOperator(stream) {
	if (consume(stream, isEquality)) {
		stream.eatWhile(EQUALS);
		return true;
	} else if (consume(stream, isOperator$2)) {
		return true;
	}

	return false;
}

function isEquality(code) {
	return code === NOT || code === LESS_THAN || code === EQUALS || code === GREATER_THAN;
}

function isOperator$2(code) {
	return code === MULTIPLY || code === PLUS || code === MINUS || code === DIVIDE
		|| isEquality(code);
}

const PSEUDO = 58; // :

/**
 * Consumes pseudo-selector from given stream
 */
var pseudo = function(stream) {
	const start = stream.pos;

	if (stream.eatWhile(PSEUDO)) {
		const name = ident(stream);
		if (name) {
			return new Token(stream, 'pseudo', start).add(name);
		}
	}

	stream.pos = start;
};

/**
 * Consumes unquoted value from given stream
 * @param  {StreamReader} stream
 * @return {UnquotedToken}
 */
var unquoted = function(stream) {
	return eatUnquoted(stream) && new Token(stream, 'unquoted');
};

function eatUnquoted(stream) {
	return consumeWhile(stream, isUnquoted);
}

function isUnquoted(code) {
	return !isNaN(code) && !Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isQuote"])(code) && !Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isSpace"])(code)
		&& code !== 40 /* ( */ && code !== 41 /* ) */ && code !== 92 /* \ */
		&& !isNonPrintable(code);
}

function isNonPrintable(code) {
	return (code >= 0 && code <= 8) || code === 11
	|| (code >= 14 && code <= 31) || code === 127;
}

/**
 * Consumes URL token from given stream
 * @param  {StreamReader} stream
 * @return {Token}
 */
function url(stream) {
	const start = stream.pos;

	if (eatString(stream, 'url(')) {
		eatWhitespace(stream);
		const value = string(stream) || unquoted(stream);
		eatWhitespace(stream);
		stream.eat(41); // )

		return new Token(stream, 'url', start).add(value);
	}

	stream.pos = start;
}

function eatUrl(stream) {
	const start = stream.pos;

	if (eatString(stream, 'url(')) {
		eatWhitespace(stream);
		eatString$1(stream) || eatUnquoted(stream);
		eatWhitespace(stream);
		stream.eat(41); // )
		stream.start = start;

		return true;
	}

	stream.pos = start;
	return false;
}

const VARIABLE = 36; // $

/**
 * Consumes SCSS variable from given stream
 */
function variable(stream) {
	return prefixed(stream, 'variable', VARIABLE, variableName);
}



function variableName(stream) {
	if (eatVariableName(stream)) {
		return new Token(stream, 'name');
	}
}

function eatVariableName(stream) {
	return consumeWhile(stream, isVariableName);
}

function isVariableName(code) {
	return code === VARIABLE || isIdent(code);
}

/**
 * Group tokens by commonly used context
 */

function consumeToken(stream) {
	const _token = any(stream) || args(stream, consumeToken);
	if (_token && _token.type === 'ident') {
		const _args = args(stream, consumeToken);
		if (_args) {
			// An identifier followed by arguments – function call
			return new Token(stream, 'function', _token.start, _args.end).add(_token).add(_args);
		}
	}

	return _token || unknown(stream);
}

function any(stream) {
	return formatting(stream) || url(stream) || selector(stream) || value(stream)
		|| separator(stream);
}

function selector(stream) {
	return interpolation(stream) || backtick(stream) || ident(stream) || atKeyword(stream)
		|| className(stream) || id(stream) || pseudo(stream) || eatAttribuite(stream)
		|| combinator(stream);
}

function value(stream) {
	return url(stream) || string(stream) || interpolation(stream) || backtick(stream)
		|| number(stream) || hash(stream) || keyword(stream) || important(stream)
		|| operator$1(stream);
}

function keyword(stream) {
	return backtick(stream) || variable(stream) || atKeyword(stream) || ident(stream);
}

function formatting(stream) {
	return comment(stream) || whitespace(stream);
}

function unknown(stream) {
	stream.start = stream.pos;
	const ch = stream.next();
	if (ch != null) {
		return new Token(stream, 'unknown');
	}
}

/**
 * Parses CSS rule selector
 * @param  {String|StreamReader} source
 * @return {Token[]}
 */
function parseSelector(source) {
	return parseList(source, 'selector');
}

/**
 * Parses CSS property name. Mostly used for LESS where
 * property-like entry might be used as a mixin call
 * @param {String|StreamReader} source
 * @return {Token}
 */
function parsePropertyName(source) {
	const stream = typeof source === 'string' ? new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](source) : source;
	const items = [];

	while (!stream.eof()) {
		items.push(consumeToken(stream));
	}

	let token;
	if (items.length === 1) {
		token = items[0];
	} else {
		token = new Token(stream, 'property-name', stream.start, stream.end);
		for (let i = 0, il = items.length; i < il; i++) {
			token.add(items[i]);
		}
	}

	return token;
}

/**
 * Parses CSS property value
 * @param  {String|StreamReader} source
 * @return {Token[]}
 */
function parsePropertyValue(source) {
	return parseList(source);
}

/**
 * Parses @media CSS rule expression
 * @param  {String|StreamReader} source
 * @return {Token[]}
 */
function parseMediaExpression(source) {
	return parseList(source);
}

/**
 * Parses given source into a set of tokens, separated by comma. Each token contains
 * parsed sub-items as independent tokens and so on. Mostly used to parse
 * selectors and property values
 * @param  {String|StreamReader} source     Source to parse
 * @param  {String}             [tokenType] Type of first-level tokens.
 *                                          Default is `item`
 * @return {Token[]}
 */
function parseList(source, tokenType) {
	tokenType = tokenType || 'item';
	const stream = typeof source === 'string' ? new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](source) : source;
	const items = [];
	const fragments = [];
	const flush = () => {
		const clean = trimFormatting(fragments);

		if (clean.length) {
			const item = new Token(stream, tokenType, clean[0].start, last(clean).end);
			for (let i = 0; i < clean.length; i++) {
				item.add(clean[i]);
			}
			items.push(item);
		}

		fragments.length = 0;
	};

	let token;
	while (!stream.eof()) {
		if (stream.eat(44 /* , */)) {
			flush();
		} else if (token = consumeToken(stream)) {
			if (token.type !== 'comment') {
				fragments.push(token);
			}
		} else {
			throw stream.error('Unexpected character');
		}
	}

	flush();
	return items;
}

/**
 * Creates CSS rule from given tokens
 * @param  {StreamReader} stream
 * @param  {Token[]} tokens
 * @param  {Token} [content]
 * @return {Rule}
 */
function createRule(stream, tokens, contentStart, contentEnd) {
	if (!tokens.length) {
		return null;
	}

	const name = tokens[0];
	name.end = last(tokens).end;

	return new Rule(stream, name, contentStart, contentEnd);
}

/**
 * Represents CSS rule
 * @type {Node}
 */
class Rule extends Node {
	/**
	 * @param {StreamReader} stream
	 * @param {Token} name         Rule’s name token
	 * @param {Token} contentStart Rule’s content start token
	 * @param {Token} [contentEnd] Rule’s content end token
	 */
	constructor(stream, name, contentStart, contentEnd) {
		super('rule');
		this.stream = stream;
		this.selectorToken = name;
		this.contentStartToken = contentStart;
		this.contentEndToken = contentEnd || contentStart;
		this._parsedSelector = null;
	}

	/**
	 * Returns rule selector
	 * @return {String}
	 */
	get selector() {
		return valueOf(this.selectorToken);
	}

	get parsedSelector() {
		if (!this._parsedSelector) {
			this._parsedSelector = parseSelector(this.selectorToken.limit());
		}

		return this._parsedSelector;
	}

	/**
	 * Returns node’s start position in stream
	 * @return {*}
	 */
	get start() {
		return this.selectorToken && this.selectorToken.start;
	}

	/**
	 * Returns node’s end position in stream
	 * @return {*}
	 */
	get end() {
		const token = this.contentEndToken || this.contentStartToken || this.nameToken;
		return token && token.end;
	}
}

/**
 * Creates CSS rule from given tokens
 * @param  {StreamReader} stream
 * @param  {Token[]} tokens
 * @param  {Token} [content]
 * @return {Rule}
 */
function createAtRule(stream, tokens, contentStart, contentEnd) {
	if (!tokens.length) {
		return null;
	}

	let ix = 0, expression;
	const name = tokens[ix++];

	if (ix < tokens.length) {
		expression = tokens[ix++];
		expression.type = 'expression';
		expression.end = last(tokens).end;
	} else {
		expression = new Token(stream, 'expression', name.end, name.end);
	}

	return new AtRule(stream, name, expression, contentStart, contentEnd);
}

class AtRule extends Node {
	constructor(stream, name, expression, contentStart, contentEnd) {
		super('at-rule');
		this.stream = stream;
		this.nameToken = name;
		this.expressionToken = expression;
		this.contentStartToken = contentStart;
		this.contentEndToken = contentEnd || contentStart;
		this._parsedExpression = null;
	}

	/**
	 * Returns at-rule name
	 * @return {String}
	 */
	get name() {
		return valueOf(this.nameToken && this.nameToken.item(0));
	}

	get expression() {
		return valueOf(this.expressionToken);
	}

	get parsedExpression() {
		if (!this._parsedExpression) {
			this._parsedExpression = parseMediaExpression(this.expressionToken.limit());
		}

		return this._parsedExpression;
	}

	/**
	 * Returns node’s start position in stream
	 * @return {*}
	 */
	get start() {
		return this.nameToken && this.nameToken.start;
	}

	/**
	 * Returns node’s end position in stream
	 * @return {*}
	 */
	get end() {
		const token = this.contentEndToken || this.contentStartToken || this.nameToken;
		return token && token.end;
	}
}

/**
 * Factory method that creates property node from given tokens
 * @param  {StreamReader} stream
 * @param  {Token[]}      tokens
 * @param  {Token}        terminator
 * @return {Property}
 */
function createProperty(stream, tokens, terminator) {
	// NB in LESS, fragmented properties without value like `.foo.bar;` must be
	// treated like mixin call
	if (!tokens.length) {
		return null;
	}

	let separator, value, ix = 0;
	const name = tokens[ix++];

	if (ix < tokens.length) {
		value = tokens[ix++];
		value.type = 'value';
		value.end = last(tokens).end;
	}

	if (name && value) {
		separator = new Token(stream, 'separator', name.end, value.start);
	}

	return new Property(
		stream,
		name,
		value,
		separator,
		terminator
	);
}

class Property extends Node {
	constructor(stream, name, value, separator, terminator) {
		super('property');
		this.stream = stream;
		this.nameToken = name;
		this.valueToken = value;
		this._parsedName = null;
		this._parsedValue = null;

		this.separatorToken = separator;
		this.terminatorToken = terminator;
	}

	/**
	 * Property name
	 * @return {String}
	 */
	get name() {
		return valueOf(this.nameToken);
	}

	/**
	 * Returns parsed sub-tokens of current property name
	 * @return {Token[]}
	 */
	get parsedName() {
		if (!this._parsedName) {
			this._parsedName = parsePropertyName(this.nameToken.limit());
		}

		return this._parsedName;
	}

	/**
	 * Property value
	 * @return {String}
	 */
	get value() {
		return valueOf(this.valueToken);
	}

	/**
	 * Parsed value parts: a list of tokens, separated by comma. Each token may
	 * contains parsed sub-tokens and so on
	 * @return {Token[]}
	 */
	get parsedValue() {
		if (!this._parsedValue) {
			this._parsedValue = parsePropertyValue(this.valueToken.limit());
		}

		return this._parsedValue;
	}

	get separator() {
		return valueOf(this.separatorToken);
	}

	get terminator() {
		return valueOf(this.terminatorToken);
	}

	get start() {
		const token = this.nameToken || this.separatorToken || this.valueToken
			|| this.terminatorToken;
		return token && token.start;
	}

	get end() {
		const token = this.terminatorToken || this.valueToken
			|| this.separatorToken || this.nameToken;
		return token && token.end;
	}
}

const LBRACE          = 40;  // (
const RBRACE          = 41;  // )
const PROP_DELIMITER  = 58;  // :
const PROP_TERMINATOR = 59;  // ;
const RULE_START      = 123; // {
const RULE_END        = 125; // }

function parseStylesheet(source) {
	const stream = typeof source === 'string' ? new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](source) : source;
	const root = new Stylesheet();
	let ctx = root, child, accum, token;
	let tokens = [];
	const flush = () => {
		if (accum) {
			tokens.push(accum);
			accum = null;
		}
	};

	while (!stream.eof()) {
		if (eatWhitespace(stream)) {
			continue;
		}

		if (token = comment(stream)) {
			root.addComment(token);
			continue;
		}

		stream.start = stream.pos;

		if (stream.eatWhile(PROP_DELIMITER)) {
			// Property delimiter can be either a real property delimiter or a
			// part of pseudo-selector.
			if (!tokens.length) {
				if (accum) {
					// No consumed tokens yet but pending token: most likely it’s
					// a CSS property
					flush();
				} else {
					// No consumend or accumulated token, seems like a start of
					// pseudo-selector, e.g. `::slotted`
					accum = new Token(stream, 'preparse');
				}
			}
			// Skip delimiter if there are already consumend tokens: most likely
			// it’s a part of pseudo-selector
		} else if (stream.eat(PROP_TERMINATOR)) {
			flush();
			ctx.add(createProperty(stream, tokens, new Token(stream, 'termintator')));
			tokens.length = 0;
		} else if (stream.eat(RULE_START)) {
			flush();
			if (tokens.length > 0) {
				child = tokens[0].type === 'at-keyword'
				? createAtRule(stream, tokens, new Token(stream, 'body-start'))
				: createRule(stream, tokens, new Token(stream, 'body-start'));
				ctx.add(child);
				ctx = child;
				tokens.length = 0;
			}

		} else if (stream.eat(RULE_END)) {
			flush();

			// Finalize context section
			ctx.add(createProperty(stream, tokens));

			if (ctx.type !== 'stylesheet') {
				// In case of invalid stylesheet with redundant `}`,
				// don’t modify root section.
				ctx.contentEndToken = new Token(stream, 'body-end');
				ctx = ctx.parent;
			}

			tokens.length = 0;
		} else if (token = atKeyword(stream)) {
			// Explictly consume @-tokens since it defines how rule or property
			// should be pre-parsed
			flush();
			tokens.push(token);
		} else if (eatUrl(stream) || eatInterpolation(stream) || eatBacktick(stream)
				|| eatBraces(stream, root) || eatString$1(stream) || stream.next()) {
			// NB explicitly consume `url()` token since it may contain
			// an unquoted url like `http://example.com` which interferes
			// with single-line comment
			accum = accum || new Token(stream, 'preparse');
			accum.end = stream.pos;
		} else {
			throw new Error(`Unexpected end-of-stream at ${stream.pos}`);
		}
	}

	if (accum) {
		tokens.push(accum);
	}

	// Finalize all the rest properties
	ctx.add(createProperty(stream, tokens));

	// Finalize unterminated rules
	stream.start = stream.pos;
	while (ctx && ctx !== root) {
		ctx.contentEndToken = new Token(stream, 'body-end');
		ctx = ctx.parent;
	}

	return root;
}

/**
 * Parses given source into tokens
 * @param  {String|StreamReader} source
 * @param  {Function} [consumer] Token consumer function, for example, `selector`,
 * `value` etc. from `lib/tokens` module. Default is generic `consumeToken`
 * @return {Token[]}
 */
function lexer(source, consumer) {
	consumer = consumer || consumeToken;
	const stream = typeof source === 'string' ? new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](source) : source;
	const result = [];
	let token;

	while (!stream.eof() && (token = consumer(stream))) {
		result.push(token);
	}

	return result;
}

/**
 * Consumes content inside round braces. Mostly used to skip `;` token inside
 * expressions since in LESS it is also used to separate function arguments
 * @param  {StringReader} stream
 * @param  {Stylesheet}   root   A stylesheet root. Used to accumulate comments
 * @return {Boolean}
 */
function eatBraces(stream, root) {
	if (stream.eat(LBRACE)) {
		let stack = 1, token;

		while (!stream.eof()) {
			if (stream.eat(RBRACE)) {
				stack--;
				if (!stack) {
					break;
				}
			} else if (stream.eat(LBRACE)) {
				stack++;
			} else if (eatUrl(stream) || eatString$1(stream)) {
				continue;
			} else if (token = comment(stream)) {
				root.addComment(token);
				continue;
			} else {
				stream.next();
			}
		}

		return true;
	}

	return false;
}

/* harmony default export */ __webpack_exports__["default"] = (parseStylesheet);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/* Based on @sergeche's work in his emmet plugin */
const vscode_1 = __webpack_require__(1);
/**
 * A stream reader for VSCode's `TextDocument`
 * Based on @emmetio/stream-reader and @emmetio/atom-plugin
 */
class DocumentStreamReader {
    constructor(document, pos, limit) {
        this.document = document;
        this.start = this.pos = pos ? pos : new vscode_1.Position(0, 0);
        this._sof = limit ? limit.start : new vscode_1.Position(0, 0);
        this._eof = limit ? limit.end : new vscode_1.Position(this.document.lineCount - 1, this._lineLength(this.document.lineCount - 1));
        this._eol = this.document.eol === vscode_1.EndOfLine.LF ? '\n' : '\r\n';
    }
    /**
     * Returns true only if the stream is at the start of the file.
     */
    sof() {
        return this.pos.isBeforeOrEqual(this._sof);
    }
    /**
     * Returns true only if the stream is at the end of the file.
     */
    eof() {
        return this.pos.isAfterOrEqual(this._eof);
    }
    /**
     * Creates a new stream instance which is limited to given range for given document
     */
    limit(start, end) {
        return new DocumentStreamReader(this.document, start, new vscode_1.Range(start, end));
    }
    /**
     * Returns the next character code in the stream without advancing it.
     * Will return NaN at the end of the file.
     */
    peek() {
        if (this.eof()) {
            return NaN;
        }
        const line = this.document.lineAt(this.pos.line).text;
        return this.pos.character < line.length ? line.charCodeAt(this.pos.character) : this._eol.charCodeAt(this.pos.character - line.length);
    }
    /**
     * Returns the next character in the stream and advances it.
     * Also returns NaN when no more characters are available.
     */
    next() {
        if (this.eof()) {
            return NaN;
        }
        const line = this.document.lineAt(this.pos.line).text;
        let code;
        if (this.pos.character < line.length) {
            code = line.charCodeAt(this.pos.character);
            this.pos = this.pos.translate(0, 1);
        }
        else {
            code = this._eol.charCodeAt(this.pos.character - line.length);
            this.pos = new vscode_1.Position(this.pos.line + 1, 0);
        }
        if (this.eof()) {
            // restrict pos to eof, if in case it got moved beyond eof
            this.pos = new vscode_1.Position(this._eof.line, this._eof.character);
        }
        return code;
    }
    /**
     * Backs up the stream n characters. Backing it up further than the
     * start of the current token will cause things to break, so be careful.
     */
    backUp(n) {
        let row = this.pos.line;
        let column = this.pos.character;
        column -= (n || 1);
        while (row >= 0 && column < 0) {
            row--;
            column += this._lineLength(row);
        }
        this.pos = row < 0 || column < 0
            ? new vscode_1.Position(0, 0)
            : new vscode_1.Position(row, column);
        return this.peek();
    }
    /**
     * Get the string between the start of the current token and the
     * current stream position.
     */
    current() {
        return this.substring(this.start, this.pos);
    }
    /**
     * Returns contents for given range
     */
    substring(from, to) {
        return this.document.getText(new vscode_1.Range(from, to));
    }
    /**
     * Creates error object with current stream state
     */
    error(message) {
        const err = new Error(`${message} at row ${this.pos.line}, column ${this.pos.character}`);
        return err;
    }
    /**
     * Returns line length of given row, including line ending
     */
    _lineLength(row) {
        if (row === this.document.lineCount - 1) {
            return this.document.lineAt(row).text.length;
        }
        return this.document.lineAt(row).text.length + this._eol.length;
    }
    /**
     * `match` can be a character code or a function that takes a character code
     * and returns a boolean. If the next character in the stream 'matches'
     * the given argument, it is consumed and returned.
     * Otherwise, `false` is returned.
     */
    eat(match) {
        const ch = this.peek();
        const ok = typeof match === 'function' ? match(ch) : ch === match;
        if (ok) {
            this.next();
        }
        return ok;
    }
    /**
     * Repeatedly calls <code>eat</code> with the given argument, until it
     * fails. Returns <code>true</code> if any characters were eaten.
     */
    eatWhile(match) {
        const start = this.pos;
        while (!this.eof() && this.eat(match)) { }
        return !this.pos.isEqual(start);
    }
}
exports.DocumentStreamReader = DocumentStreamReader;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(11);
const expand_full_1 = __webpack_require__(13);
const extract = __webpack_require__(14).default;
const path = __webpack_require__(15);
const fs = __webpack_require__(16);
const JSONC = __webpack_require__(17);
const os_1 = __webpack_require__(19);
const data_1 = __webpack_require__(20);
const snippetKeyCache = new Map();
let markupSnippetKeys;
let markupSnippetKeysRegex;
const stylesheetCustomSnippetsKeyCache = new Map();
const htmlAbbreviationStartRegex = /^[a-z,A-Z,!,(,[,#,\.]/;
const cssAbbreviationRegex = /^-?[a-z,A-Z,!,@,#]/;
const htmlAbbreviationRegex = /[a-z,A-Z\.]/;
const emmetModes = ['html', 'pug', 'slim', 'haml', 'xml', 'xsl', 'jsx', 'css', 'scss', 'sass', 'less', 'stylus'];
const commonlyUsedTags = [...data_1.htmlData.tags, 'lorem'];
const bemFilterSuffix = 'bem';
const filterDelimitor = '|';
const trimFilterSuffix = 't';
const commentFilterSuffix = 'c';
const maxFilters = 3;
const vendorPrefixes = { 'w': "webkit", 'm': "moz", 's': "ms", 'o': "o" };
const defaultVendorProperties = {
    'w': "animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-clip, background-composite, background-origin, background-size, border-fit, border-horizontal-spacing, border-image, border-vertical-spacing, box-align, box-direction, box-flex, box-flex-group, box-lines, box-ordinal-group, box-orient, box-pack, box-reflect, box-shadow, color-correction, column-break-after, column-break-before, column-break-inside, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, dashboard-region, font-smoothing, highlight, hyphenate-character, hyphenate-limit-after, hyphenate-limit-before, hyphens, line-box-contain, line-break, line-clamp, locale, margin-before-collapse, margin-after-collapse, marquee-direction, marquee-increment, marquee-repetition, marquee-style, mask-attachment, mask-box-image, mask-box-image-outset, mask-box-image-repeat, mask-box-image-slice, mask-box-image-source, mask-box-image-width, mask-clip, mask-composite, mask-image, mask-origin, mask-position, mask-repeat, mask-size, nbsp-mode, perspective, perspective-origin, rtl-ordering, text-combine, text-decorations-in-effect, text-emphasis-color, text-emphasis-position, text-emphasis-style, text-fill-color, text-orientation, text-security, text-stroke-color, text-stroke-width, transform, transition, transform-origin, transform-style, transition-delay, transition-duration, transition-property, transition-timing-function, user-drag, user-modify, user-select, writing-mode, svg-shadow, box-sizing, border-radius",
    'm': "animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-inline-policy, binding, border-bottom-colors, border-image, border-left-colors, border-right-colors, border-top-colors, box-align, box-direction, box-flex, box-ordinal-group, box-orient, box-pack, box-shadow, box-sizing, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-width, float-edge, font-feature-settings, font-language-override, force-broken-image-icon, hyphens, image-region, orient, outline-radius-bottomleft, outline-radius-bottomright, outline-radius-topleft, outline-radius-topright, perspective, perspective-origin, stack-sizing, tab-size, text-blink, text-decoration-color, text-decoration-line, text-decoration-style, text-size-adjust, transform, transform-origin, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-focus, user-input, user-modify, user-select, window-shadow, background-clip, border-radius",
    's': "accelerator, backface-visibility, background-position-x, background-position-y, behavior, block-progression, box-align, box-direction, box-flex, box-line-progression, box-lines, box-ordinal-group, box-orient, box-pack, content-zoom-boundary, content-zoom-boundary-max, content-zoom-boundary-min, content-zoom-chaining, content-zoom-snap, content-zoom-snap-points, content-zoom-snap-type, content-zooming, filter, flow-from, flow-into, font-feature-settings, grid-column, grid-column-align, grid-column-span, grid-columns, grid-layer, grid-row, grid-row-align, grid-row-span, grid-rows, high-contrast-adjust, hyphenate-limit-chars, hyphenate-limit-lines, hyphenate-limit-zone, hyphens, ime-mode, interpolation-mode, layout-flow, layout-grid, layout-grid-char, layout-grid-line, layout-grid-mode, layout-grid-type, line-break, overflow-style, perspective, perspective-origin, perspective-origin-x, perspective-origin-y, scroll-boundary, scroll-boundary-bottom, scroll-boundary-left, scroll-boundary-right, scroll-boundary-top, scroll-chaining, scroll-rails, scroll-snap-points-x, scroll-snap-points-y, scroll-snap-type, scroll-snap-x, scroll-snap-y, scrollbar-arrow-color, scrollbar-base-color, scrollbar-darkshadow-color, scrollbar-face-color, scrollbar-highlight-color, scrollbar-shadow-color, scrollbar-track-color, text-align-last, text-autospace, text-justify, text-kashida-space, text-overflow, text-size-adjust, text-underline-position, touch-action, transform, transform-origin, transform-origin-x, transform-origin-y, transform-origin-z, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-select, word-break, wrap-flow, wrap-margin, wrap-through, writing-mode",
    'o': "dashboard-region, animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, border-image, link, link-source, object-fit, object-position, tab-size, table-baseline, transform, transform-origin, transition, transition-delay, transition-duration, transition-property, transition-timing-function, accesskey, input-format, input-required, marquee-dir, marquee-loop, marquee-speed, marquee-style"
};
/**
 * Returns all applicable emmet expansions for abbreviation at given position in a CompletionList
 * @param document TextDocument in which completions are requested
 * @param position Position in the document at which completions are requested
 * @param syntax Emmet supported language
 * @param emmetConfig Emmet Configurations as derived from VS Code
 */
function doComplete(document, position, syntax, emmetConfig) {
    if (emmetConfig.showExpandedAbbreviation === 'never' || !getEmmetMode(syntax, emmetConfig.excludeLanguages)) {
        return;
    }
    // Fetch markupSnippets so that we can provide possible abbreviation completions
    // For example, when text at position is `a`, completions should return `a:blank`, `a:link`, `acr` etc.
    if (!isStyleSheet(syntax)) {
        if (!snippetKeyCache.has(syntax) || !markupSnippetKeysRegex || markupSnippetKeysRegex.length === 0) {
            let registry = customSnippetRegistry[syntax] ? customSnippetRegistry[syntax] : expand_full_1.createSnippetsRegistry(syntax);
            if (!snippetKeyCache.has(syntax)) {
                snippetKeyCache.set(syntax, registry.all({ type: 'string' }).map(snippet => {
                    return snippet.key;
                }));
            }
            markupSnippetKeysRegex = registry.all({ type: 'regexp' }).map(snippet => {
                return snippet.key;
            });
        }
        markupSnippetKeys = snippetKeyCache.get(syntax);
    }
    let extractedValue = extractAbbreviation(document, position, { syntax, lookAhead: !isStyleSheet(syntax) });
    if (!extractedValue) {
        return;
    }
    let { abbreviationRange, abbreviation, filter } = extractedValue;
    let currentLineTillPosition = getCurrentLine(document, position).substr(0, position.character);
    let currentWord = getCurrentWord(currentLineTillPosition);
    // Dont attempt to expand open tags
    if (currentWord === abbreviation
        && currentLineTillPosition.endsWith(`<${abbreviation}`)
        && (syntax === 'html' || syntax === 'xml' || syntax === 'xsl' || syntax === 'jsx')) {
        return;
    }
    // `preferences` is supported in Emmet config to allow backward compatibility
    // `getExpandOptions` converts it into a format understandable by new modules
    // We retain a copy here to be used by the vendor prefixing feature
    let expandOptions = getExpandOptions(syntax, emmetConfig, filter);
    let preferences = expandOptions['preferences'];
    delete expandOptions['preferences'];
    let expandedText;
    let expandedAbbr;
    let completionItems = [];
    // Create completion item after expanding given abbreviation
    // if abbreviation is valid and expanded value is not noise
    const createExpandedAbbr = (syntax, abbr) => {
        if (!isAbbreviationValid(syntax, abbreviation)) {
            return;
        }
        try {
            expandedText = expand_full_1.expand(abbr, expandOptions);
        }
        catch (e) {
        }
        if (!expandedText || isExpandedTextNoise(syntax, abbr, expandedText)) {
            return;
        }
        expandedAbbr = vscode_languageserver_types_1.CompletionItem.create(abbr);
        expandedAbbr.textEdit = vscode_languageserver_types_1.TextEdit.replace(abbreviationRange, escapeNonTabStopDollar(addFinalTabStop(expandedText)));
        expandedAbbr.documentation = replaceTabStopsWithCursors(expandedText);
        expandedAbbr.insertTextFormat = vscode_languageserver_types_1.InsertTextFormat.Snippet;
        expandedAbbr.detail = 'Emmet Abbreviation';
        expandedAbbr.label = abbreviation;
        expandedAbbr.label += filter ? '|' + filter.replace(',', '|') : "";
        completionItems = [expandedAbbr];
    };
    if (isStyleSheet(syntax)) {
        let { prefixOptions, abbreviationWithoutPrefix } = splitVendorPrefix(abbreviation);
        createExpandedAbbr(syntax, abbreviationWithoutPrefix);
        // When abbr is longer than usual emmet snippets and matches better with existing css property, then no emmet
        if (abbreviationWithoutPrefix.length > 4
            && data_1.cssData.properties.find(x => x.startsWith(abbreviationWithoutPrefix))) {
            return vscode_languageserver_types_1.CompletionList.create([], true);
        }
        if (expandedAbbr) {
            let prefixedExpandedText = applyVendorPrefixes(expandedText, prefixOptions, preferences);
            expandedAbbr.textEdit = vscode_languageserver_types_1.TextEdit.replace(abbreviationRange, escapeNonTabStopDollar(addFinalTabStop(prefixedExpandedText)));
            expandedAbbr.documentation = replaceTabStopsWithCursors(prefixedExpandedText);
            expandedAbbr.label = removeTabStops(expandedText);
            expandedAbbr.filterText = abbreviation;
            // Custom snippets should show up in completions if abbreviation is a prefix
            const stylesheetCustomSnippetsKeys = stylesheetCustomSnippetsKeyCache.has(syntax) ? stylesheetCustomSnippetsKeyCache.get(syntax) : stylesheetCustomSnippetsKeyCache.get('css');
            completionItems = makeSnippetSuggestion(stylesheetCustomSnippetsKeys, abbreviation, abbreviation, abbreviationRange, expandOptions, 'Emmet Custom Snippet', false);
            if (!completionItems.find(x => x.textEdit.newText === expandedAbbr.textEdit.newText)) {
                // Fix for https://github.com/Microsoft/vscode/issues/28933#issuecomment-309236902
                // When user types in propertyname, emmet uses it to match with snippet names, resulting in width -> widows or font-family -> font: family
                // Filter out those cases here.
                const abbrRegex = new RegExp('.*' + abbreviationWithoutPrefix.split('').map(x => (x === '$' || x === '+') ? '\\' + x : x).join('.*') + '.*', 'i');
                if (/\d/.test(abbreviation) || abbrRegex.test(expandedAbbr.label)) {
                    completionItems.push(expandedAbbr);
                }
            }
        }
        // Incomplete abbreviations that use vendor prefix
        if (!completionItems.length && (abbreviation === '-' || /^-[wmso]{1,4}-?$/.test(abbreviation))) {
            return vscode_languageserver_types_1.CompletionList.create([], true);
        }
    }
    else {
        createExpandedAbbr(syntax, abbreviation);
        let tagToFindMoreSuggestionsFor = abbreviation;
        let newTagMatches = abbreviation.match(/(>|\+)([\w:-]+)$/);
        if (newTagMatches && newTagMatches.length === 3) {
            tagToFindMoreSuggestionsFor = newTagMatches[2];
        }
        let commonlyUsedTagSuggestions = makeSnippetSuggestion(commonlyUsedTags, tagToFindMoreSuggestionsFor, abbreviation, abbreviationRange, expandOptions, 'Emmet Abbreviation');
        completionItems = completionItems.concat(commonlyUsedTagSuggestions);
        if (emmetConfig.showAbbreviationSuggestions === true) {
            let abbreviationSuggestions = makeSnippetSuggestion(markupSnippetKeys.filter(x => !commonlyUsedTags.includes(x)), tagToFindMoreSuggestionsFor, abbreviation, abbreviationRange, expandOptions, 'Emmet Abbreviation');
            // Workaround for the main expanded abbr not appearing before the snippet suggestions
            if (expandedAbbr && abbreviationSuggestions.length > 0 && tagToFindMoreSuggestionsFor !== abbreviation) {
                expandedAbbr.sortText = '0' + expandedAbbr.label;
                abbreviationSuggestions.forEach(item => {
                    // Workaround for snippet suggestions items getting filtered out as the complete abbr does not start with snippetKey
                    item.filterText = abbreviation;
                    // Workaround for the main expanded abbr not appearing before the snippet suggestions
                    item.sortText = '9' + abbreviation;
                });
            }
            completionItems = completionItems.concat(abbreviationSuggestions);
        }
    }
    if (emmetConfig.showSuggestionsAsSnippets === true) {
        completionItems.forEach(x => x.kind = vscode_languageserver_types_1.CompletionItemKind.Snippet);
    }
    return completionItems.length ? vscode_languageserver_types_1.CompletionList.create(completionItems, true) : undefined;
}
exports.doComplete = doComplete;
/**
 * Create & return snippets for snippet keys that start with given prefix
 */
function makeSnippetSuggestion(snippetKeys, prefix, abbreviation, abbreviationRange, expandOptions, snippetDetail, skipFullMatch = true) {
    if (!prefix || !snippetKeys) {
        return [];
    }
    let snippetCompletions = [];
    snippetKeys.forEach(snippetKey => {
        if (!snippetKey.startsWith(prefix.toLowerCase()) || (skipFullMatch && snippetKey === prefix.toLowerCase())) {
            return;
        }
        let currentAbbr = abbreviation + snippetKey.substr(prefix.length);
        let expandedAbbr;
        try {
            expandedAbbr = expand_full_1.expand(currentAbbr, expandOptions);
        }
        catch (e) {
        }
        if (!expandedAbbr) {
            return;
        }
        let item = vscode_languageserver_types_1.CompletionItem.create(prefix + snippetKey.substr(prefix.length));
        item.documentation = replaceTabStopsWithCursors(expandedAbbr);
        item.detail = snippetDetail;
        item.textEdit = vscode_languageserver_types_1.TextEdit.replace(abbreviationRange, escapeNonTabStopDollar(addFinalTabStop(expandedAbbr)));
        item.insertTextFormat = vscode_languageserver_types_1.InsertTextFormat.Snippet;
        snippetCompletions.push(item);
    });
    return snippetCompletions;
}
function getCurrentWord(currentLineTillPosition) {
    if (currentLineTillPosition) {
        let matches = currentLineTillPosition.match(/[\w,:,-,\.]*$/);
        if (matches) {
            return matches[0];
        }
    }
}
function replaceTabStopsWithCursors(expandedWord) {
    return expandedWord.replace(/([^\\])\$\{\d+\}/g, '$1|').replace(/\$\{\d+:([^\}]+)\}/g, '$1');
}
function removeTabStops(expandedWord) {
    return expandedWord.replace(/([^\\])\$\{\d+\}/g, '$1').replace(/\$\{\d+:([^\}]+)\}/g, '$1');
}
function escapeNonTabStopDollar(text) {
    return text ? text.replace(/([^\\])(\$)([^\{])/g, '$1\\$2$3') : text;
}
function addFinalTabStop(text) {
    if (!text || !text.trim()) {
        return text;
    }
    let maxTabStop = -1;
    let maxTabStopRanges = [];
    let foundLastStop = false;
    let replaceWithLastStop = false;
    let i = 0;
    let n = text.length;
    try {
        while (i < n && !foundLastStop) {
            // Look for ${
            if (text[i++] != '$' || text[i++] != '{') {
                continue;
            }
            // Find tabstop
            let numberStart = -1;
            let numberEnd = -1;
            while (i < n && /\d/.test(text[i])) {
                numberStart = numberStart < 0 ? i : numberStart;
                numberEnd = i + 1;
                i++;
            }
            // If ${ was not followed by a number and either } or :, then its not a tabstop
            if (numberStart === -1 || numberEnd === -1 || i >= n || (text[i] != '}' && text[i] != ':')) {
                continue;
            }
            // If ${0} was found, then break
            const currentTabStop = text.substring(numberStart, numberEnd);
            foundLastStop = currentTabStop === '0';
            if (foundLastStop) {
                break;
            }
            let foundPlaceholder = false;
            if (text[i++] == ':') {
                // TODO: Nested placeholders may break here
                while (i < n) {
                    if (text[i] == '}') {
                        foundPlaceholder = true;
                        break;
                    }
                    i++;
                }
            }
            // Decide to replace currentTabStop with ${0} only if its the max among all tabstops and is not a placeholder
            if (Number(currentTabStop) > Number(maxTabStop)) {
                maxTabStop = currentTabStop;
                maxTabStopRanges = [{ numberStart, numberEnd }];
                replaceWithLastStop = !foundPlaceholder;
            }
            else if (currentTabStop == maxTabStop) {
                maxTabStopRanges.push({ numberStart, numberEnd });
            }
        }
    }
    catch (e) {
    }
    if (replaceWithLastStop && !foundLastStop) {
        for (let i = 0; i < maxTabStopRanges.length; i++) {
            let rangeStart = maxTabStopRanges[i].numberStart;
            let rangeEnd = maxTabStopRanges[i].numberEnd;
            text = text.substr(0, rangeStart) + '0' + text.substr(rangeEnd);
        }
    }
    return text;
}
function getCurrentLine(document, position) {
    let offset = document.offsetAt(position);
    let text = document.getText();
    let start = 0;
    let end = text.length;
    for (let i = offset - 1; i >= 0; i--) {
        if (text[i] === '\n') {
            start = i + 1;
            break;
        }
    }
    for (let i = offset; i < text.length; i++) {
        if (text[i] === '\n') {
            end = i;
            break;
        }
    }
    return text.substring(start, end);
}
let customSnippetRegistry = {};
let variablesFromFile = {};
let profilesFromFile = {};
exports.emmetSnippetField = (index, placeholder) => `\${${index}${placeholder ? ':' + placeholder : ''}}`;
function isStyleSheet(syntax) {
    let stylesheetSyntaxes = ['css', 'scss', 'sass', 'less', 'stylus'];
    return (stylesheetSyntaxes.indexOf(syntax) > -1);
}
exports.isStyleSheet = isStyleSheet;
function getFilters(text, pos) {
    let filter;
    for (let i = 0; i < maxFilters; i++) {
        if (text.endsWith(`${filterDelimitor}${bemFilterSuffix}`, pos)) {
            pos -= bemFilterSuffix.length + 1;
            filter = filter ? bemFilterSuffix + ',' + filter : bemFilterSuffix;
        }
        else if (text.endsWith(`${filterDelimitor}${commentFilterSuffix}`, pos)) {
            pos -= commentFilterSuffix.length + 1;
            filter = filter ? commentFilterSuffix + ',' + filter : commentFilterSuffix;
        }
        else if (text.endsWith(`${filterDelimitor}${trimFilterSuffix}`, pos)) {
            pos -= trimFilterSuffix.length + 1;
            filter = filter ? trimFilterSuffix + ',' + filter : trimFilterSuffix;
        }
        else {
            break;
        }
    }
    return {
        pos: pos,
        filter: filter
    };
}
/**
 *  * Extracts abbreviation from the given position in the given document
 * @param document The TextDocument from which abbreviation needs to be extracted
 * @param position The Position in the given document from where abbreviation needs to be extracted
 * @param options The options to pass to the @emmetio/extract-abbreviation module
 */
function extractAbbreviation(document, position, options) {
    const currentLine = getCurrentLine(document, position);
    const currentLineTillPosition = currentLine.substr(0, position.character);
    const { pos, filter } = getFilters(currentLineTillPosition, position.character);
    const lengthOccupiedByFilter = filter ? filter.length + 1 : 0;
    try {
        let extractOptions = options;
        if (typeof extractOptions !== 'boolean') {
            extractOptions = extractOptions || {};
            extractOptions = {
                syntax: (isStyleSheet(extractOptions.syntax) || extractOptions.syntax === 'stylesheet') ? 'stylesheet' : 'markup',
                lookAhead: extractOptions.lookAhead
            };
        }
        const result = extract(currentLine, pos, extractOptions);
        const rangeToReplace = vscode_languageserver_types_1.Range.create(position.line, result.location, position.line, result.location + result.abbreviation.length + lengthOccupiedByFilter);
        return {
            abbreviationRange: rangeToReplace,
            abbreviation: result.abbreviation,
            filter
        };
    }
    catch (e) {
        console.log(e);
    }
}
exports.extractAbbreviation = extractAbbreviation;
/**
 * Extracts abbreviation from the given text
 * @param text Text from which abbreviation needs to be extracted
 * @param syntax Syntax used to extract the abbreviation from the given text
 */
function extractAbbreviationFromText(text, syntax) {
    if (!text) {
        return;
    }
    const { pos, filter } = getFilters(text, text.length);
    try {
        let extractOptions = (isStyleSheet(syntax) || syntax === 'stylesheet') ? { syntax: 'stylesheet', lookAhead: false } : true;
        const result = extract(text, pos, extractOptions);
        return {
            abbreviation: result.abbreviation,
            filter
        };
    }
    catch (e) {
    }
}
exports.extractAbbreviationFromText = extractAbbreviationFromText;
/**
 * Returns a boolean denoting validity of given abbreviation in the context of given syntax
 * Not needed once https://github.com/emmetio/atom-plugin/issues/22 is fixed
 * @param syntax string
 * @param abbreviation string
 */
function isAbbreviationValid(syntax, abbreviation) {
    if (!abbreviation) {
        return false;
    }
    if (isStyleSheet(syntax)) {
        // Fix for https://github.com/Microsoft/vscode/issues/1623 in new emmet
        if (abbreviation.endsWith(':')) {
            return false;
        }
        if (abbreviation.indexOf('#') > -1) {
            return hexColorRegex.test(abbreviation) || propertyHexColorRegex.test(abbreviation);
        }
        return cssAbbreviationRegex.test(abbreviation);
    }
    if (abbreviation.startsWith('!')) {
        return !/[^!]/.test(abbreviation);
    }
    const multipleMatch = abbreviation.match(/\*(\d+)$/);
    if (multipleMatch) {
        return parseInt(multipleMatch[1], 10) <= 100;
    }
    // Its common for users to type (sometextinsidebrackets), this should not be treated as an abbreviation
    // Grouping in abbreviation is valid only if preceeded/succeeded with one of the symbols for nesting, sibling, repeater or climb up
    if (!/\(.*\)[>\+\*\^]/.test(abbreviation) && !/[>\+\*\^]\(.*\)/.test(abbreviation) && /\(/.test(abbreviation) && /\)/.test(abbreviation)) {
        return false;
    }
    return (htmlAbbreviationStartRegex.test(abbreviation) && htmlAbbreviationRegex.test(abbreviation));
}
exports.isAbbreviationValid = isAbbreviationValid;
function isExpandedTextNoise(syntax, abbreviation, expandedText) {
    // Unresolved css abbreviations get expanded to a blank property value
    // Eg: abc -> abc: ; or abc:d -> abc: d; which is noise if it gets suggested for every word typed
    if (isStyleSheet(syntax)) {
        let after = (syntax === 'sass' || syntax === 'stylus') ? '' : ';';
        return expandedText === `${abbreviation}: \${1}${after}` || expandedText.replace(/\s/g, '') === abbreviation.replace(/\s/g, '') + after;
    }
    if (commonlyUsedTags.indexOf(abbreviation.toLowerCase()) > -1 || markupSnippetKeys.indexOf(abbreviation) > -1) {
        return false;
    }
    // Custom tags can have - or :
    if (/[-,:]/.test(abbreviation) && !/--|::/.test(abbreviation) && !abbreviation.endsWith(':')) {
        return false;
    }
    // Its common for users to type some text and end it with period, this should not be treated as an abbreviation
    // Else it becomes noise.
    // When user just types '.', return the expansion
    // Otherwise emmet loses change to participate later
    // For example in `.foo`. See https://github.com/Microsoft/vscode/issues/66013
    if (abbreviation === '.') {
        return false;
    }
    const dotMatches = abbreviation.match(/^([a-z,A-Z,\d]*)\.$/);
    if (dotMatches) {
        // Valid html tags such as `div.`
        if (dotMatches[1] && data_1.htmlData.tags.includes(dotMatches[1])) {
            return false;
        }
        return true;
    }
    // Unresolved html abbreviations get expanded as if it were a tag
    // Eg: abc -> <abc></abc> which is noise if it gets suggested for every word typed
    return (expandedText.toLowerCase() === `<${abbreviation.toLowerCase()}>\${1}</${abbreviation.toLowerCase()}>`);
}
/**
 * Returns options to be used by the @emmetio/expand-abbreviation module
 * @param syntax
 * @param textToReplace
 */
function getExpandOptions(syntax, emmetConfig, filter) {
    emmetConfig = emmetConfig || {};
    emmetConfig['preferences'] = emmetConfig['preferences'] || {};
    // Fetch snippet registry
    let baseSyntax = isStyleSheet(syntax) ? 'css' : 'html';
    if (!customSnippetRegistry[syntax] && customSnippetRegistry[baseSyntax]) {
        customSnippetRegistry[syntax] = customSnippetRegistry[baseSyntax];
    }
    // Fetch Profile
    let profile = getProfile(syntax, emmetConfig['syntaxProfiles']);
    let filtersFromProfile = (profile && profile['filters']) ? profile['filters'].split(',') : [];
    filtersFromProfile = filtersFromProfile.map(filterFromProfile => filterFromProfile.trim());
    // Update profile based on preferences
    if (emmetConfig['preferences']['format.noIndentTags']) {
        if (Array.isArray(emmetConfig['preferences']['format.noIndentTags'])) {
            profile['formatSkip'] = emmetConfig['preferences']['format.noIndentTags'];
        }
        else if (typeof emmetConfig['preferences']['format.noIndentTags'] === 'string') {
            profile['formatSkip'] = emmetConfig['preferences']['format.noIndentTags'].split(',');
        }
    }
    if (emmetConfig['preferences']['format.forceIndentationForTags']) {
        if (Array.isArray(emmetConfig['preferences']['format.forceIndentationForTags'])) {
            profile['formatForce'] = emmetConfig['preferences']['format.forceIndentationForTags'];
        }
        else if (typeof emmetConfig['preferences']['format.forceIndentationForTags'] === 'string') {
            profile['formatForce'] = emmetConfig['preferences']['format.forceIndentationForTags'].split(',');
        }
    }
    if (emmetConfig['preferences']['profile.allowCompactBoolean'] && typeof emmetConfig['preferences']['profile.allowCompactBoolean'] === 'boolean') {
        profile['compactBooleanAttributes'] = emmetConfig['preferences']['profile.allowCompactBoolean'];
    }
    // Fetch Add Ons
    let addons = {};
    if (filter && filter.split(',').find(x => x.trim() === 'bem') || filtersFromProfile.indexOf('bem') > -1) {
        addons['bem'] = { element: '__' };
        if (emmetConfig['preferences']['bem.elementSeparator']) {
            addons['bem']['element'] = emmetConfig['preferences']['bem.elementSeparator'];
        }
        if (emmetConfig['preferences']['bem.modifierSeparator']) {
            addons['bem']['modifier'] = emmetConfig['preferences']['bem.modifierSeparator'];
        }
    }
    if (syntax === 'jsx') {
        addons['jsx'] = true;
    }
    // Fetch Formatters
    let formatters = getFormatters(syntax, emmetConfig['preferences']);
    if (filter && filter.split(',').find(x => x.trim() === 'c') || filtersFromProfile.indexOf('c') > -1) {
        if (!formatters['comment']) {
            formatters['comment'] = {
                enabled: true
            };
        }
        else {
            formatters['comment']['enabled'] = true;
        }
    }
    // If the user doesn't provide specific properties for a vendor, use the default values
    let preferences = emmetConfig['preferences'];
    for (const v in vendorPrefixes) {
        let vendorProperties = preferences['css.' + vendorPrefixes[v] + 'Properties'];
        if (vendorProperties == null) {
            preferences['css.' + vendorPrefixes[v] + 'Properties'] = defaultVendorProperties[v];
        }
    }
    return {
        field: exports.emmetSnippetField,
        syntax: syntax,
        profile: profile,
        addons: addons,
        variables: getVariables(emmetConfig['variables']),
        snippets: customSnippetRegistry[syntax],
        format: formatters,
        preferences: preferences
    };
}
exports.getExpandOptions = getExpandOptions;
function splitVendorPrefix(abbreviation) {
    abbreviation = abbreviation || "";
    if (abbreviation[0] != '-') {
        return {
            prefixOptions: "",
            abbreviationWithoutPrefix: abbreviation
        };
    }
    else {
        abbreviation = abbreviation.substr(1);
        let pref = "-";
        if (/^[wmso]*-./.test(abbreviation)) {
            let index = abbreviation.indexOf("-");
            if (index > -1) {
                pref += abbreviation.substr(0, index + 1);
                abbreviation = abbreviation.substr(index + 1);
            }
        }
        return {
            prefixOptions: pref,
            abbreviationWithoutPrefix: abbreviation
        };
    }
}
function applyVendorPrefixes(expandedProperty, vendors, preferences) {
    preferences = preferences || {};
    expandedProperty = expandedProperty || "";
    vendors = vendors || "";
    if (vendors[0] !== '-') {
        return expandedProperty;
    }
    if (vendors == "-") {
        let defaultVendors = "-";
        let property = expandedProperty.substr(0, expandedProperty.indexOf(':'));
        if (!property) {
            return expandedProperty;
        }
        for (const v in vendorPrefixes) {
            let vendorProperties = preferences['css.' + vendorPrefixes[v] + 'Properties'];
            if (vendorProperties && vendorProperties.split(',').find(x => x.trim() === property))
                defaultVendors += v;
        }
        // If no vendors specified, add all
        vendors = defaultVendors == "-" ? "-wmso" : defaultVendors;
        vendors += '-';
    }
    vendors = vendors.substr(1);
    let prefixedProperty = "";
    for (let index = 0; index < vendors.length - 1; index++) {
        prefixedProperty += '-' + vendorPrefixes[vendors[index]] + '-' + expandedProperty + "\n";
    }
    return prefixedProperty + expandedProperty;
}
/**
 * Parses given abbreviation using given options and returns a tree
 * @param abbreviation string
 * @param options options used by the @emmetio/expand-abbreviation module to parse given abbreviation
 */
function parseAbbreviation(abbreviation, options) {
    return expand_full_1.parse(abbreviation, options);
}
exports.parseAbbreviation = parseAbbreviation;
/**
 * Expands given abbreviation using given options
 * @param abbreviation string or parsed abbreviation
 * @param options options used by the @emmetio/expand-abbreviation module to expand given abbreviation
 */
function expandAbbreviation(abbreviation, options) {
    let expandedText;
    let preferences = options['preferences'];
    delete options['preferences'];
    if (isStyleSheet(options['syntax']) && typeof abbreviation === 'string') {
        let { prefixOptions, abbreviationWithoutPrefix } = splitVendorPrefix(abbreviation);
        expandedText = expand_full_1.expand(abbreviationWithoutPrefix, options);
        expandedText = applyVendorPrefixes(expandedText, prefixOptions, preferences);
    }
    else {
        expandedText = expand_full_1.expand(abbreviation, options);
    }
    return escapeNonTabStopDollar(addFinalTabStop(expandedText));
}
exports.expandAbbreviation = expandAbbreviation;
/**
 * Maps and returns syntaxProfiles of previous format to ones compatible with new emmet modules
 * @param syntax
 */
function getProfile(syntax, profilesFromSettings) {
    if (!profilesFromSettings) {
        profilesFromSettings = {};
    }
    let profilesConfig = Object.assign({}, profilesFromFile, profilesFromSettings);
    let options = profilesConfig[syntax];
    if (!options || typeof options === 'string') {
        if (options === 'xhtml') {
            return {
                selfClosingStyle: 'xhtml'
            };
        }
        return {};
    }
    let newOptions = {};
    for (let key in options) {
        switch (key) {
            case 'tag_case':
                newOptions['tagCase'] = (options[key] === 'lower' || options[key] === 'upper') ? options[key] : '';
                break;
            case 'attr_case':
                newOptions['attributeCase'] = (options[key] === 'lower' || options[key] === 'upper') ? options[key] : '';
                break;
            case 'attr_quotes':
                newOptions['attributeQuotes'] = options[key];
                break;
            case 'tag_nl':
                newOptions['format'] = (options[key] === true || options[key] === false) ? options[key] : true;
                break;
            case 'inline_break':
                newOptions['inlineBreak'] = options[key];
                break;
            case 'self_closing_tag':
                if (options[key] === true) {
                    newOptions['selfClosingStyle'] = 'xml';
                    break;
                }
                if (options[key] === false) {
                    newOptions['selfClosingStyle'] = 'html';
                    break;
                }
                newOptions['selfClosingStyle'] = options[key];
                break;
            case 'compact_bool':
                newOptions['compactBooleanAttributes'] = options[key];
                break;
            default:
                newOptions[key] = options[key];
                break;
        }
    }
    return newOptions;
}
/**
 * Returns variables to be used while expanding snippets
 */
function getVariables(variablesFromSettings) {
    if (!variablesFromSettings) {
        return variablesFromFile;
    }
    return Object.assign({}, variablesFromFile, variablesFromSettings);
}
function getFormatters(syntax, preferences) {
    if (!preferences) {
        return {};
    }
    if (!isStyleSheet(syntax)) {
        let commentFormatter = {};
        for (let key in preferences) {
            switch (key) {
                case 'filter.commentAfter':
                    commentFormatter['after'] = preferences[key];
                    break;
                case 'filter.commentBefore':
                    commentFormatter['before'] = preferences[key];
                    break;
                case 'filter.commentTrigger':
                    commentFormatter['trigger'] = preferences[key];
                    break;
                default:
                    break;
            }
        }
        return {
            comment: commentFormatter
        };
    }
    let fuzzySearchMinScore = typeof preferences['css.fuzzySearchMinScore'] === 'number' ? preferences['css.fuzzySearchMinScore'] : 0.3;
    if (fuzzySearchMinScore > 1) {
        fuzzySearchMinScore = 1;
    }
    else if (fuzzySearchMinScore < 0) {
        fuzzySearchMinScore = 0;
    }
    let stylesheetFormatter = {
        'fuzzySearchMinScore': fuzzySearchMinScore
    };
    for (let key in preferences) {
        switch (key) {
            case 'css.floatUnit':
                stylesheetFormatter['floatUnit'] = preferences[key];
                break;
            case 'css.intUnit':
                stylesheetFormatter['intUnit'] = preferences[key];
                break;
            case 'css.unitAliases':
                let unitAliases = {};
                preferences[key].split(',').forEach(alias => {
                    if (!alias || !alias.trim() || alias.indexOf(':') === -1) {
                        return;
                    }
                    let aliasName = alias.substr(0, alias.indexOf(':'));
                    let aliasValue = alias.substr(aliasName.length + 1);
                    if (!aliasName.trim() || !aliasValue) {
                        return;
                    }
                    unitAliases[aliasName.trim()] = aliasValue;
                });
                stylesheetFormatter['unitAliases'] = unitAliases;
                break;
            case `${syntax}.valueSeparator`:
                stylesheetFormatter['between'] = preferences[key];
                break;
            case `${syntax}.propertyEnd`:
                stylesheetFormatter['after'] = preferences[key];
                break;
            default:
                break;
        }
    }
    return {
        stylesheet: stylesheetFormatter
    };
}
/**
 * Updates customizations from snippets.json and syntaxProfiles.json files in the directory configured in emmet.extensionsPath setting
 */
function updateExtensionsPath(emmetExtensionsPath, workspaceFolderPath) {
    if (!emmetExtensionsPath || !emmetExtensionsPath.trim()) {
        resetSettingsFromFile();
        return Promise.resolve();
    }
    emmetExtensionsPath = emmetExtensionsPath.trim();
    workspaceFolderPath = workspaceFolderPath ? workspaceFolderPath.trim() : '';
    if (emmetExtensionsPath[0] === '~') {
        emmetExtensionsPath = path.join(os_1.homedir(), emmetExtensionsPath.substr(1));
    }
    else if (!path.isAbsolute(emmetExtensionsPath) && workspaceFolderPath) {
        emmetExtensionsPath = path.join(workspaceFolderPath, emmetExtensionsPath);
    }
    if (!path.isAbsolute(emmetExtensionsPath)) {
        resetSettingsFromFile();
        return Promise.reject('The path provided in emmet.extensionsPath setting should be absoulte path');
    }
    if (!dirExists(emmetExtensionsPath)) {
        resetSettingsFromFile();
        return Promise.reject(`The directory ${emmetExtensionsPath} doesnt exist. Update emmet.extensionsPath setting`);
    }
    let dirPath = emmetExtensionsPath;
    let snippetsPath = path.join(dirPath, 'snippets.json');
    let profilesPath = path.join(dirPath, 'syntaxProfiles.json');
    let snippetsPromise = new Promise((resolve, reject) => {
        fs.readFile(snippetsPath, (err, snippetsData) => {
            if (err) {
                return reject(`Error while fetching the file ${snippetsPath}`);
            }
            try {
                let errors = [];
                let snippetsJson = JSONC.parse(snippetsData.toString(), errors);
                if (errors.length > 0) {
                    return reject(`Found error ${JSONC.ScanError[errors[0].error]} while parsing the file ${snippetsPath} at offset ${errors[0].offset}`);
                }
                variablesFromFile = snippetsJson['variables'];
                customSnippetRegistry = {};
                snippetKeyCache.clear();
                Object.keys(snippetsJson).forEach(syntax => {
                    if (!snippetsJson[syntax]['snippets']) {
                        return;
                    }
                    let baseSyntax = isStyleSheet(syntax) ? 'css' : 'html';
                    let customSnippets = snippetsJson[syntax]['snippets'];
                    if (snippetsJson[baseSyntax] && snippetsJson[baseSyntax]['snippets'] && baseSyntax !== syntax) {
                        customSnippets = Object.assign({}, snippetsJson[baseSyntax]['snippets'], snippetsJson[syntax]['snippets']);
                    }
                    if (!isStyleSheet(syntax)) {
                        // In Emmet 2.0 all snippets should be valid abbreviations
                        // Convert old snippets that do not follow this format to new format
                        for (let snippetKey in customSnippets) {
                            if (customSnippets.hasOwnProperty(snippetKey)
                                && customSnippets[snippetKey].startsWith('<')
                                && customSnippets[snippetKey].endsWith('>')) {
                                customSnippets[snippetKey] = `{${customSnippets[snippetKey]}}`;
                            }
                        }
                    }
                    else {
                        stylesheetCustomSnippetsKeyCache.set(syntax, Object.keys(customSnippets));
                    }
                    customSnippetRegistry[syntax] = expand_full_1.createSnippetsRegistry(syntax, customSnippets);
                    let snippetKeys = customSnippetRegistry[syntax].all({ type: 'string' }).map(snippet => {
                        return snippet.key;
                    });
                    snippetKeyCache.set(syntax, snippetKeys);
                });
            }
            catch (e) {
                return reject(`Error while parsing the file ${snippetsPath}`);
            }
            return resolve();
        });
    });
    let variablesPromise = new Promise((resolve, reject) => {
        fs.readFile(profilesPath, (err, profilesData) => {
            try {
                if (!err) {
                    profilesFromFile = JSON.parse(profilesData.toString());
                }
            }
            catch (e) {
            }
            return resolve();
        });
    });
    return Promise.all([snippetsPromise, variablesFromFile]).then(() => Promise.resolve());
}
exports.updateExtensionsPath = updateExtensionsPath;
function dirExists(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    }
    catch (e) {
        return false;
    }
}
function resetSettingsFromFile() {
    customSnippetRegistry = {};
    snippetKeyCache.clear();
    stylesheetCustomSnippetsKeyCache.clear();
    profilesFromFile = {};
    variablesFromFile = {};
}
/**
* Get the corresponding emmet mode for given vscode language mode
* Eg: jsx for typescriptreact/javascriptreact or pug for jade
* If the language is not supported by emmet or has been exlcuded via `exlcudeLanguages` setting,
* then nothing is returned
*
* @param language
* @param exlcudedLanguages Array of language ids that user has chosen to exlcude for emmet
*/
function getEmmetMode(language, excludedLanguages = []) {
    if (!language || excludedLanguages.indexOf(language) > -1) {
        return;
    }
    if (/\b(typescriptreact|javascriptreact|jsx-tags)\b/.test(language)) { // treat tsx like jsx
        return 'jsx';
    }
    if (language === 'sass-indented') { // map sass-indented to sass
        return 'sass';
    }
    if (language === 'jade') {
        return 'pug';
    }
    if (emmetModes.indexOf(language) > -1) {
        return language;
    }
}
exports.getEmmetMode = getEmmetMode;
const propertyHexColorRegex = /^[a-zA-Z]+:?#[\d.a-fA-F]{0,6}$/;
const hexColorRegex = /^#[\d,a-f,A-F]{1,6}$/;
const onlyLetters = /^[a-z,A-Z]+$/;
/**
 * Returns a completion participant for Emmet of the form {
 * 		onCssProperty: () => void
 * 		onCssPropertyValue: () => void
 * 		onHtmlContent: () => void
 * }
 * @param document The TextDocument for which completions are being provided
 * @param position The Position in the given document where completions are being provided
 * @param syntax The Emmet syntax to use when providing Emmet completions
 * @param emmetSettings The Emmet settings to use when providing Emmet completions
 * @param result The Completion List object that needs to be updated with Emmet completions
 */
function getEmmetCompletionParticipants(document, position, syntax, emmetSettings, result) {
    return {
        getId: () => 'emmet',
        onCssProperty: (context) => {
            if (context && context.propertyName) {
                const currentresult = doComplete(document, position, syntax, emmetSettings);
                if (result && currentresult) {
                    result.items = currentresult.items;
                    result.isIncomplete = true;
                }
            }
        },
        onCssPropertyValue: (context) => {
            if (context && context.propertyValue) {
                const extractedResults = extractAbbreviation(document, position, { syntax: 'css', lookAhead: false });
                if (!extractedResults) {
                    return;
                }
                const validAbbreviationWithColon = extractedResults.abbreviation === `${context.propertyName}:${context.propertyValue}` && onlyLetters.test(context.propertyValue);
                if (validAbbreviationWithColon // Allows abbreviations like pos:f
                    || hexColorRegex.test(extractedResults.abbreviation)
                    || extractedResults.abbreviation === '!') {
                    const currentresult = doComplete(document, position, syntax, emmetSettings);
                    if (result && currentresult) {
                        result.items = currentresult.items;
                        result.isIncomplete = true;
                    }
                }
            }
        },
        onHtmlContent: () => {
            const currentresult = doComplete(document, position, syntax, emmetSettings);
            if (result && currentresult) {
                result.items = currentresult.items;
                result.isIncomplete = true;
            }
        }
    };
}
exports.getEmmetCompletionParticipants = getEmmetCompletionParticipants;
//# sourceMappingURL=emmetHelper.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(__webpack_require__(12), exports);
        if (v !== undefined) module.exports = v;
    }
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(function (require, exports) {
    /* --------------------------------------------------------------------------------------------
     * Copyright (c) Microsoft Corporation. All rights reserved.
     * Licensed under the MIT License. See License.txt in the project root for license information.
     * ------------------------------------------------------------------------------------------ */
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
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
            return Is.defined(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
        }
        Position.is = is;
    })(Position = exports.Position || (exports.Position = {}));
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
            return Is.defined(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
        }
        Range.is = is;
    })(Range = exports.Range || (exports.Range = {}));
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
    })(Location = exports.Location || (exports.Location = {}));
    /**
     * The diagnostic's serverity.
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
    })(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));
    /**
     * The Diagnostic namespace provides helper functions to work with
     * [Diagnostic](#Diagnostic) literals.
     */
    var Diagnostic;
    (function (Diagnostic) {
        /**
         * Creates a new Diagnostic literal.
         */
        function create(range, message, severity, code, source) {
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
                && (Is.string(candidate.source) || Is.undefined(candidate.source));
        }
        Diagnostic.is = is;
    })(Diagnostic = exports.Diagnostic || (exports.Diagnostic = {}));
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
            return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.title);
        }
        Command.is = is;
    })(Command = exports.Command || (exports.Command = {}));
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
         * @param psotion The position to insert the text at.
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
    })(TextEdit = exports.TextEdit || (exports.TextEdit = {}));
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
    })(TextDocumentEdit = exports.TextDocumentEdit || (exports.TextDocumentEdit = {}));
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
                    workspaceEdit.documentChanges.forEach(function (textDocumentEdit) {
                        var textEditChange = new TextEditChangeImpl(textDocumentEdit.edits);
                        _this._textEditChanges[textDocumentEdit.textDocument.uri] = textEditChange;
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
                    throw new Error('Workspace edit is not configured for versioned document changes.');
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
        return WorkspaceChange;
    }());
    exports.WorkspaceChange = WorkspaceChange;
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
    })(TextDocumentIdentifier = exports.TextDocumentIdentifier || (exports.TextDocumentIdentifier = {}));
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
            return Is.defined(candidate) && Is.string(candidate.uri) && Is.number(candidate.version);
        }
        VersionedTextDocumentIdentifier.is = is;
    })(VersionedTextDocumentIdentifier = exports.VersionedTextDocumentIdentifier || (exports.VersionedTextDocumentIdentifier = {}));
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
    })(TextDocumentItem = exports.TextDocumentItem || (exports.TextDocumentItem = {}));
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
    })(MarkupKind = exports.MarkupKind || (exports.MarkupKind = {}));
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
    })(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));
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
    })(InsertTextFormat = exports.InsertTextFormat || (exports.InsertTextFormat = {}));
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
    })(CompletionItem = exports.CompletionItem || (exports.CompletionItem = {}));
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
    })(CompletionList = exports.CompletionList || (exports.CompletionList = {}));
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
    })(MarkedString = exports.MarkedString || (exports.MarkedString = {}));
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
    })(ParameterInformation = exports.ParameterInformation || (exports.ParameterInformation = {}));
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
    })(SignatureInformation = exports.SignatureInformation || (exports.SignatureInformation = {}));
    /**
     * A document highlight kind.
     */
    var DocumentHighlightKind;
    (function (DocumentHighlightKind) {
        /**
         * A textual occurrance.
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
    })(DocumentHighlightKind = exports.DocumentHighlightKind || (exports.DocumentHighlightKind = {}));
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
    })(DocumentHighlight = exports.DocumentHighlight || (exports.DocumentHighlight = {}));
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
    })(SymbolKind = exports.SymbolKind || (exports.SymbolKind = {}));
    var SymbolInformation;
    (function (SymbolInformation) {
        /**
         * Creates a new symbol information literal.
         *
         * @param name The name of the symbol.
         * @param kind The kind of the symbol.
         * @param range The range of the location of the symbol.
         * @param uri The resource of the location of symbol, defaults to the current document.
         * @param containerName The name of the symbol containg the symbol.
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
    })(SymbolInformation = exports.SymbolInformation || (exports.SymbolInformation = {}));
    /**
     * The CodeActionContext namespace provides helper functions to work with
     * [CodeActionContext](#CodeActionContext) literals.
     */
    var CodeActionContext;
    (function (CodeActionContext) {
        /**
         * Creates a new CodeActionContext literal.
         */
        function create(diagnostics) {
            return { diagnostics: diagnostics };
        }
        CodeActionContext.create = create;
        /**
         * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
         */
        function is(value) {
            var candidate = value;
            return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is);
        }
        CodeActionContext.is = is;
    })(CodeActionContext = exports.CodeActionContext || (exports.CodeActionContext = {}));
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
    })(CodeLens = exports.CodeLens || (exports.CodeLens = {}));
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
    })(FormattingOptions = exports.FormattingOptions || (exports.FormattingOptions = {}));
    /**
     * A document link is a range in a text document that links to an internal or external resource, like another
     * text document or a web site.
     */
    var DocumentLink = /** @class */ (function () {
        function DocumentLink() {
        }
        return DocumentLink;
    }());
    exports.DocumentLink = DocumentLink;
    /**
     * The DocumentLink namespace provides helper functions to work with
     * [DocumentLink](#DocumentLink) literals.
     */
    (function (DocumentLink) {
        /**
         * Creates a new DocumentLink literal.
         */
        function create(range, target) {
            return { range: range, target: target };
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
    })(DocumentLink = exports.DocumentLink || (exports.DocumentLink = {}));
    exports.DocumentLink = DocumentLink;
    exports.EOL = ['\n', '\r\n', '\r'];
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
    })(TextDocument = exports.TextDocument || (exports.TextDocument = {}));
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
    })(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
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
        FullTextDocument.prototype.getText = function () {
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
        function typedArray(value, check) {
            return Array.isArray(value) && value.every(check);
        }
        Is.typedArray = typedArray;
    })(Is || (Is = {}));
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 12;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	undefined;
}(this, (function (exports) { 'use strict';

var defaultOptions = {
	/**
	 * String for one-level indentation
	 * @type {String}
	 */
	indent: '\t',

	/**
	 * Tag case: 'lower', 'upper' or '' (keep as-is)
	 * @type {String}
	 */
	tagCase: '',

	/**
	 * Attribute name case: 'lower', 'upper' or '' (keep as-is)
	 * @type {String}
	 */
	attributeCase: '',

	/**
	 * Attribute value quotes: 'single' or 'double'
	 * @type {String}
	 */
	attributeQuotes: 'double',

	/**
	 * Enable output formatting (indentation and line breaks)
	 * @type {Boolean}
	 */
	format: true,

	/**
	 * A list of tag names that should not get inner indentation
	 * @type {Set}
	 */
	formatSkip: ['html'],

	/**
	 * A list of tag names that should *always* get inner indentation.
	 * @type {Set}
	 */
	formatForce: ['body'],

	/**
	 * How many inline sibling elements should force line break for each tag.
	 * Set to 0 to output all inline elements without formatting.
	 * Set to 1 to output all inline elements with formatting (same as block-level).
	 * @type {Number}
	 */
	inlineBreak: 3,

	/**
	 * Produce compact notation of boolean attribues: attributes where name equals value.
	 * With this option enabled, output `<div contenteditable>` instead of
	 * `<div contenteditable="contenteditable">`
	 * @type {Boolean}
	 */
	compactBooleanAttributes: false,

	/**
	 * A set of boolean attributes
	 * @type {Set}
	 */
	booleanAttributes: ['contenteditable', 'seamless', 'async', 'autofocus',
		'autoplay', 'checked', 'controls', 'defer', 'disabled', 'formnovalidate',
		'hidden', 'ismap', 'loop', 'multiple', 'muted', 'novalidate', 'readonly',
		'required', 'reversed', 'selected', 'typemustmatch'],

	/**
	 * Style of self-closing tags:
	 * 'html'  – <br>
	 * 'xml'   – <br/>
	 * 'xhtml' – <br />
	 * @type {String}
	 */
	selfClosingStyle: 'html',

	/**
	 * A set of inline-level elements
	 * @type {Set}
	 */
	inlineElements: ['a', 'abbr', 'acronym', 'applet', 'b', 'basefont', 'bdo',
		'big', 'br', 'button', 'cite', 'code', 'del', 'dfn', 'em', 'font', 'i',
		'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'map', 'object', 'q',
		's', 'samp', 'select', 'small', 'span', 'strike', 'strong', 'sub', 'sup',
		'textarea', 'tt', 'u', 'var']
};

/**
 * Creates output profile for given options (@see defaults)
 * @param {defaults} options
 */
class Profile {
    constructor(options) {
        this.options = Object.assign({}, defaultOptions, options);
        this.quoteChar = this.options.attributeQuotes === 'single' ? '\'' : '"';
    }

	/**
	 * Returns value of given option name
	 * @param {String} name
	 * @return {*}
	 */
	get(name) {
		return this.options[name];
	}

    /**
     * Quote given string according to profile
     * @param {String} str String to quote
     * @return {String}
     */
    quote(str) {
        return `${this.quoteChar}${str != null ? str : ''}${this.quoteChar}`;
    }

    /**
     * Output given tag name accoding to options
     * @param {String} name
     * @return {String}
     */
    name(name) {
        return strcase(name, this.options.tagCase);
    }

	/**
	 * Outputs attribute name accoding to current settings
	 * @param {String} Attribute name
	 * @return {String}
	 */
    attribute(attr) {
        return strcase(attr, this.options.attributeCase);
    }

    /**
     * Check if given attribute is boolean
     * @param {Attribute} attr
     * @return {Boolean}
     */
    isBooleanAttribute(attr) {
        return attr.options.boolean
			|| this.get('booleanAttributes').indexOf((attr.name || '').toLowerCase()) !== -1;
    }

	/**
	 * Returns a token for self-closing tag, depending on current options
	 * @return {String}
	 */
	selfClose() {
		switch (this.options.selfClosingStyle) {
			case 'xhtml': return ' /';
			case 'xml':   return '/';
			default:      return '';
		}
	}

	/**
	 * Returns indent for given level
	 * @param {Number} level Indentation level
	 * @return {String}
	 */
	indent(level) {
		level = level || 0;
		let output = '';
		while (level--) {
			output += this.options.indent;
		}

		return output;
	}

	/**
	 * Check if given tag name belongs to inline-level element
	 * @param {Node|String} node Parsed node or tag name
	 * @return {Boolean}
	 */
	isInline(node) {
        if (typeof node === 'string') {
            return this.get('inlineElements').indexOf(node.toLowerCase()) !== -1;
        }

        // inline node is a node either with inline-level name or text-only node
        return node.name != null ? this.isInline(node.name) : node.isTextOnly;
	}

	/**
	 * Outputs formatted field for given params
	 * @param {Number} index Field index
	 * @param {String} [placeholder] Field placeholder, can be empty
	 * @return {String}
	 */
	field(index, placeholder) {
		return this.options.field(index, placeholder);
	}
}

function strcase(string, type) {
    if (type) {
        string = type === 'upper' ? string.toUpperCase() : string.toLowerCase();
    }
    return string;
}

class Snippet {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class SnippetsStorage {
    constructor(data) {
        this._string = new Map();
        this._regexp = new Map();
        this._disabled = false;

        this.load(data);
    }

    get disabled() {
        return this._disabled;
    }

    /**
     * Disables current store. A disabled store always returns `undefined`
     * on `get()` method
     */
    disable() {
        this._disabled = true;
    }

    /**
     * Enables current store.
     */
    enable() {
        this._disabled = false;
    }

    /**
     * Registers a new snippet item
     * @param {String|Regexp} key
     * @param {String|Function} value
     */
    set(key, value) {
        if (typeof key === 'string') {
            key.split('|').forEach(k => this._string.set(k, new Snippet(k, value)));
        } else if (key instanceof RegExp) {
            this._regexp.set(key, new Snippet(key, value));
        } else {
            throw new Error('Unknow snippet key: ' + key);
        }

        return this;
    }

    /**
     * Returns a snippet matching given key. It first tries to find snippet
     * exact match in a string key map, then tries to match one with regexp key
     * @param {String} key
     * @return {Snippet}
     */
    get(key) {
        if (this.disabled) {
            return undefined;
        }

        if (this._string.has(key)) {
            return this._string.get(key);
        }

        const keys = Array.from(this._regexp.keys());
        for (let i = 0, il = keys.length; i < il; i++) {
            if (keys[i].test(key)) {
                return this._regexp.get(keys[i]);
            }
        }
    }

    /**
     * Batch load of snippets data
     * @param {Object|Map} data
     */
    load(data) {
        this.reset();
        if (data instanceof Map) {
            data.forEach((value, key) => this.set(key, value));
        } else if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => this.set(key, data[key]));
        }
    }

    /**
     * Clears all stored snippets
     */
    reset() {
        this._string.clear();
        this._regexp.clear();
    }

    /**
     * Returns all available snippets from given store
     */
    values() {
        if (this.disabled) {
            return [];
        }

        const string = Array.from(this._string.values());
        const regexp = Array.from(this._regexp.values());
        return string.concat(regexp);
    }
}

/**
 * A snippets registry. Contains snippets, separated by store and sorted by
 * priority: a store with higher priority takes precedence when resolving snippet
 * for given key
 */
class SnippetsRegistry {
    /**
     * Creates snippets registry, filled with given `data`
     * @param {Object|Array} data Registry snippets. If array is given, adds items
     * from array in order of precedence, registers global snippets otherwise
     */
    constructor(data) {
        this._registry = [];

        if (Array.isArray(data)) {
            data.forEach((snippets, level) => this.add(level, snippets));
        } else if (typeof data === 'object') {
            this.add(data);
        }
    }

    /**
     * Return store for given level
     * @param {Number} level
     * @return {SnippetsStorage}
     */
    get(level) {
        for (let i = 0; i < this._registry.length; i++) {
            const item = this._registry[i];
            if (item.level === level) {
                return item.store;
            }
        }
    }

    /**
     * Adds new store for given level
     * @param {Number} [level] Store level (priority). Store with higher level
     * takes precedence when resolving snippets
     * @param {Object} [snippets] A snippets data for new store
     * @return {SnipetsStorage}
     */
    add(level, snippets) {
        if (level != null && typeof level === 'object') {
            snippets = level;
            level = 0;
        }

        const store = new SnippetsStorage(snippets);

        // remove previous store from same level
        this.remove(level);

        this._registry.push({level, store});
        this._registry.sort((a, b) => b.level - a.level);

        return store;
    }

    /**
     * Remove registry with given level or store
     * @param {Number|SnippetsStorage} data Either level or snippets store
     */
    remove(data) {
        this._registry = this._registry
        .filter(item => item.level !== data && item.store !== data);
    }

    /**
     * Returns snippet from registry that matches given name
     * @param {String} name
     * @return {Snippet}
     */
    resolve(name) {
        for (let i = 0; i < this._registry.length; i++) {
            const snippet = this._registry[i].store.get(name);
            if (snippet) {
                return snippet;
            }
        }
    }

    /**
     * Returns all available snippets from current registry. Snippets with the
     * same key are resolved by their storage priority.
     * @param {Object} options
     * @param {Object} options.type Return snippets only of given type: 'string'
     * or 'regexp'. Returns all snippets if not defined
     * @return {Array}
     */
    all(options) {
        options = options || {};
        const result = new Map();

        const fillResult = snippet => {
            const type = snippet.key instanceof RegExp ? 'regexp' : 'string';
            if ((!options.type || options.type === type) && !result.has(snippet.key)) {
                result.set(snippet.key, snippet);
            }
        };

        this._registry.forEach(item => {
            item.store.values().forEach(fillResult);
        });

        return Array.from(result.values());
    }

    /**
     * Removes all stores from registry
     */
    clear() {
        this._registry.length = 0;
    }
}

/**
 * Methods for consuming quoted values
 */

const SINGLE_QUOTE = 39; // '
const DOUBLE_QUOTE = 34; // "

const defaultOptions$1 = {
	escape: 92,   // \ character
	throws: false
};

/**
 * Consumes 'single' or "double"-quoted string from given string, if possible
 * @param  {StreamReader} stream
 * @param  {Number}  options.escape A character code of quote-escape symbol
 * @param  {Boolean} options.throws Throw error if quotes string can’t be properly consumed
 * @return {Boolean} `true` if quoted string was consumed. The contents
 *                   of quoted string will be availabe as `stream.current()`
 */
var eatQuoted = function(stream, options) {
	options = options ? Object.assign({}, defaultOptions$1, options) : defaultOptions$1;
	const start = stream.pos;
	const quote = stream.peek();

	if (stream.eat(isQuote)) {
		while (!stream.eof()) {
			switch (stream.next()) {
				case quote:
					stream.start = start;
					return true;

				case options.escape:
					stream.next();
					break;
			}
		}

		// If we’re here then stream wasn’t properly consumed.
		// Revert stream and decide what to do
		stream.pos = start;

		if (options.throws) {
			throw stream.error('Unable to consume quoted string');
		}
	}

	return false;
};

function isQuote(code) {
	return code === SINGLE_QUOTE || code === DOUBLE_QUOTE;
}

/**
 * Check if given code is a number
 * @param  {Number}  code
 * @return {Boolean}
 */
function isNumber(code) {
	return code > 47 && code < 58;
}

/**
 * Check if given character code is alpha code (letter through A to Z)
 * @param  {Number}  code
 * @param  {Number}  [from]
 * @param  {Number}  [to]
 * @return {Boolean}
 */
function isAlpha(code, from, to) {
	from = from || 65; // A
	to   = to   || 90; // Z
	code &= ~32; // quick hack to convert any char code to uppercase char code

	return code >= from && code <= to;
}

/**
 * Check if given character code is alpha-numeric (letter through A to Z or number)
 * @param  {Number}  code
 * @return {Boolean}
 */
function isAlphaNumeric(code) {
	return isNumber(code) || isAlpha(code);
}

function isWhiteSpace(code) {
	return code === 32   /* space */
		|| code === 9    /* tab */
		|| code === 160; /* non-breaking space */
}

/**
 * Check if given character code is a space
 * @param  {Number}  code
 * @return {Boolean}
 */
function isSpace(code) {
	return isWhiteSpace(code)
		|| code === 10  /* LF */
		|| code === 13; /* CR */
}

/**
 * Attribute descriptor of parsed abbreviation node
 * @param {String} name Attribute name
 * @param {String} value Attribute value
 * @param {Object} options Additional custom attribute options
 * @param {Boolean} options.boolean Attribute is boolean (e.g. name equals value)
 * @param {Boolean} options.implied Attribute is implied (e.g. must be outputted
 * only if contains non-null value)
 */
class Attribute {
	constructor(name, value, options) {
		this.name = name;
		this.value = value != null ? value : null;
		this.options = options || {};
	}

	/**
	 * Create a copy of current attribute
	 * @return {Attribute}
	 */
	clone() {
		return new Attribute(this.name, this.value, Object.assign({}, this.options));
	}

	/**
	 * A string representation of current node
	 */
	valueOf() {
		return `${this.name}="${this.value}"`;
	}
}

/**
 * A parsed abbreviation AST node. Nodes build up an abbreviation AST tree
 */
class Node {
	/**
	 * Creates a new node
	 * @param {String} [name] Node name
	 * @param {Array} [attributes] Array of attributes to add
	 */
	constructor(name, attributes) {
		// own properties
		this.name = name || null;
		this.value = null;
		this.repeat = null;
		this.selfClosing = false;

		this.children = [];

		/** @type {Node} Pointer to parent node */
		this.parent = null;

		/** @type {Node} Pointer to next sibling */
		this.next = null;

		/** @type {Node} Pointer to previous sibling */
		this.previous = null;

		this._attributes = [];

		if (Array.isArray(attributes)) {
			attributes.forEach(attr => this.setAttribute(attr));
		}
	}

	/**
	 * Array of current node attributes
	 * @return {Attribute[]} Array of attributes
	 */
	get attributes() {
		return this._attributes;
	}

	/**
	 * A shorthand to retreive node attributes as map
	 * @return {Object}
	 */
	get attributesMap() {
		return this.attributes.reduce((out, attr) => {
			out[attr.name] = attr.options.boolean ? attr.name : attr.value;
			return out;
		}, {});
	}

	/**
	 * Check if current node is a grouping one, e.g. has no actual representation
	 * and is used for grouping subsequent nodes only
	 * @return {Boolean}
	 */
	get isGroup() {
		return !this.name && !this.value && !this._attributes.length;
	}

	/**
	 * Check if given node is a text-only node, e.g. contains only value
	 * @return {Boolean}
	 */
	get isTextOnly() {
		return !this.name && !!this.value && !this._attributes.length;
	}

	/**
	 * Returns first child node
	 * @return {Node}
	 */
	get firstChild() {
		return this.children[0];
	}

	/**
	 * Returns last child of current node
	 * @return {Node}
	 */
	get lastChild() {
		return this.children[this.children.length - 1];
	}

	/**
	 * Return index of current node in its parent child list
	 * @return {Number} Returns -1 if current node is a root one
	 */
	get childIndex() {
		return this.parent ? this.parent.children.indexOf(this) : -1;
	}

	/**
	 * Returns next sibling of current node
	 * @return {Node}
	 */
	get nextSibling() {
		return this.next;
	}

	/**
	 * Returns previous sibling of current node
	 * @return {Node}
	 */
	get previousSibling() {
		return this.previous;
	}

	/**
	 * Returns array of unique class names in current node
	 * @return {String[]}
	 */
	get classList() {
		const attr = this.getAttribute('class');
		return attr && attr.value
			? attr.value.split(/\s+/g).filter(uniqueClass)
			: [];
	}

	/**
	 * Convenient alias to create a new node instance
	 * @param {String} [name] Node name
	 * @param {Object} [attributes] Attributes hash
	 * @return {Node}
	 */
	create(name, attributes) {
		return new Node(name, attributes);
	}

	/**
	 * Sets given attribute for current node
	 * @param {String|Object|Attribute} name Attribute name or attribute object
	 * @param {String} [value] Attribute value
	 */
	setAttribute(name, value) {
		const attr = createAttribute(name, value);
		const curAttr = this.getAttribute(name);
		if (curAttr) {
			this.replaceAttribute(curAttr, attr);
		} else {
			this._attributes.push(attr);
		}
	}

	/**
	 * Check if attribute with given name exists in node
	 * @param  {String} name
	 * @return {Boolean}
	 */
	hasAttribute(name) {
		return !!this.getAttribute(name);
	}

	/**
	 * Returns attribute object by given name
	 * @param  {String} name
	 * @return {Attribute}
	 */
	getAttribute(name) {
		if (typeof name === 'object') {
			name = name.name;
		}

		for (var i = 0; i < this._attributes.length; i++) {
			const attr = this._attributes[i];
			if (attr.name === name) {
				return attr;
			}
		}
	}

	/**
	 * Replaces attribute with new instance
	 * @param {String|Attribute} curAttribute Current attribute name or instance
	 * to replace
	 * @param {String|Object|Attribute} newName New attribute name or attribute object
	 * @param {String} [newValue] New attribute value
	 */
	replaceAttribute(curAttribute, newName, newValue) {
		if (typeof curAttribute === 'string') {
			curAttribute = this.getAttribute(curAttribute);
		}

		const ix = this._attributes.indexOf(curAttribute);
		if (ix !== -1) {
			this._attributes.splice(ix, 1, createAttribute(newName, newValue));
		}
	}

	/**
	 * Removes attribute with given name
	 * @param  {String|Attribute} attr Atrtibute name or instance
	 */
	removeAttribute(attr) {
		if (typeof attr === 'string') {
			attr = this.getAttribute(attr);
		}

		const ix = this._attributes.indexOf(attr);
		if (ix !== -1) {
			this._attributes.splice(ix, 1);
		}
	}

	/**
	 * Removes all attributes from current node
	 */
	clearAttributes() {
		this._attributes.length = 0;
	}

	/**
	 * Adds given class name to class attribute
	 * @param {String} token Class name token
	 */
	addClass(token) {
		token = normalize(token);

		if (!this.hasAttribute('class')) {
			this.setAttribute('class', token);
		} else if (token && !this.hasClass(token)) {
			this.setAttribute('class', this.classList.concat(token).join(' '));
		}
	}

	/**
	 * Check if current node contains given class name
	 * @param {String} token Class name token
	 * @return {Boolean}
	 */
	hasClass(token) {
		return this.classList.indexOf(normalize(token)) !== -1;
	}

	/**
	 * Removes given class name from class attribute
	 * @param {String} token Class name token
	 */
	removeClass(token) {
		token = normalize(token);
		if (this.hasClass(token)) {
			this.setAttribute('class', this.classList.filter(name => name !== token).join(' '));
		}
	}

	/**
	 * Appends child to current node
	 * @param {Node} node
	 */
	appendChild(node) {
		this.insertAt(node, this.children.length);
	}

	/**
	 * Inserts given `newNode` before `refNode` child node
	 * @param {Node} newNode
	 * @param {Node} refNode
	 */
	insertBefore(newNode, refNode) {
		this.insertAt(newNode, this.children.indexOf(refNode));
	}

	/**
	 * Insert given `node` at `pos` position of child list
	 * @param {Node} node
	 * @param {Number} pos
	 */
	insertAt(node, pos) {
		if (pos < 0 || pos > this.children.length) {
			throw new Error('Unable to insert node: position is out of child list range');
		}

		const prev = this.children[pos - 1];
		const next = this.children[pos];

		node.remove();
		node.parent = this;
		this.children.splice(pos, 0, node);

		if (prev) {
			node.previous = prev;
			prev.next = node;
		}

		if (next) {
			node.next = next;
			next.previous = node;
		}
	}

	/**
	 * Removes given child from current node
	 * @param {Node} node
	 */
	removeChild(node) {
		const ix = this.children.indexOf(node);
		if (ix !== -1) {
			this.children.splice(ix, 1);
			if (node.previous) {
				node.previous.next = node.next;
			}

			if (node.next) {
				node.next.previous = node.previous;
			}

			node.parent = node.next = node.previous = null;
		}
	}

	/**
	 * Removes current node from its parent
	 */
	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	/**
	 * Creates a detached copy of current node
	 * @param {Boolean} deep Clone node contents as well
	 * @return {Node}
	 */
	clone(deep) {
		const clone = new Node(this.name);
		clone.value = this.value;
		clone.selfClosing = this.selfClosing;
		if (this.repeat) {
			clone.repeat = Object.assign({}, this.repeat);
		}

		this._attributes.forEach(attr => clone.setAttribute(attr.clone()));

		if (deep) {
			this.children.forEach(child => clone.appendChild(child.clone(true)));
		}

		return clone;
	}

	/**
	 * Walks on each descendant node and invokes given `fn` function on it.
	 * The function receives two arguments: the node itself and its depth level
	 * from current node. If function returns `false`, it stops walking
	 * @param {Function} fn
	 */
	walk(fn, _level) {
		_level = _level || 0;
		let ctx = this.firstChild;

		while (ctx) {
			// in case if context node will be detached during `fn` call
			const next = ctx.next;

			if (fn(ctx, _level) === false || ctx.walk(fn, _level + 1) === false) {
				return false;
			}

			ctx = next;
		}
	}

	/**
	 * A helper method for transformation chaining: runs given `fn` function on
	 * current node and returns the same node
	 */
	use(fn) {
		const args = [this];
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		fn.apply(null, args);
		return this;
	}

	toString() {
		const attrs = this.attributes.map(attr => {
			attr = this.getAttribute(attr.name);
			const opt = attr.options;
			let out = `${opt && opt.implied ? '!' : ''}${attr.name || ''}`;
			if (opt && opt.boolean) {
				out += '.';
			} else if (attr.value != null) {
				out += `="${attr.value}"`;
			}
			return out;
		});

		let out = `${this.name || ''}`;
		if (attrs.length) {
			out += `[${attrs.join(' ')}]`;
		}

		if (this.value != null) {
			out += `{${this.value}}`;
		}

		if (this.selfClosing) {
			out += '/';
		}

		if (this.repeat) {
			out += `*${this.repeat.count ? this.repeat.count : ''}`;
			if (this.repeat.value != null) {
				out += `@${this.repeat.value}`;
			}
		}

		return out;
	}
}

/**
 * Attribute factory
 * @param  {String|Attribute|Object} name  Attribute name or attribute descriptor
 * @param  {*} value Attribute value
 * @return {Attribute}
 */
function createAttribute(name, value) {
	if (name instanceof Attribute) {
		return name;
	}

	if (typeof name === 'string') {
		return new Attribute(name, value);
	}

	if (name && typeof name === 'object') {
		return new Attribute(name.name, name.value, name.options);
	}
}

/**
 * @param  {String} str
 * @return {String}
 */
function normalize(str) {
	return String(str).trim();
}

function uniqueClass(item, i, arr) {
	return item && arr.indexOf(item) === i;
}

/**
 * A streaming, character code-based string reader
 */
class StreamReader {
	constructor(string, start, end) {
		if (end == null && typeof string === 'string') {
			end = string.length;
		}

		this.string = string;
		this.pos = this.start = start || 0;
		this.end = end;
	}

	/**
	 * Returns true only if the stream is at the end of the file.
	 * @returns {Boolean}
	 */
	eof() {
		return this.pos >= this.end;
	}

	/**
	 * Creates a new stream instance which is limited to given `start` and `end`
	 * range. E.g. its `eof()` method will look at `end` property, not actual
	 * stream end
	 * @param  {Point} start
	 * @param  {Point} end
	 * @return {StreamReader}
	 */
	limit(start, end) {
		return new this.constructor(this.string, start, end);
	}

	/**
	 * Returns the next character code in the stream without advancing it.
	 * Will return NaN at the end of the file.
	 * @returns {Number}
	 */
	peek() {
		return this.string.charCodeAt(this.pos);
	}

	/**
	 * Returns the next character in the stream and advances it.
	 * Also returns <code>undefined</code> when no more characters are available.
	 * @returns {Number}
	 */
	next() {
		if (this.pos < this.string.length) {
			return this.string.charCodeAt(this.pos++);
		}
	}

	/**
	 * `match` can be a character code or a function that takes a character code
	 * and returns a boolean. If the next character in the stream 'matches'
	 * the given argument, it is consumed and returned.
	 * Otherwise, `false` is returned.
	 * @param {Number|Function} match
	 * @returns {Boolean}
	 */
	eat(match) {
		const ch = this.peek();
		const ok = typeof match === 'function' ? match(ch) : ch === match;

		if (ok) {
			this.next();
		}

		return ok;
	}

	/**
	 * Repeatedly calls <code>eat</code> with the given argument, until it
	 * fails. Returns <code>true</code> if any characters were eaten.
	 * @param {Object} match
	 * @returns {Boolean}
	 */
	eatWhile(match) {
		const start = this.pos;
		while (!this.eof() && this.eat(match)) {}
		return this.pos !== start;
	}

	/**
	 * Backs up the stream n characters. Backing it up further than the
	 * start of the current token will cause things to break, so be careful.
	 * @param {Number} n
	 */
	backUp(n) {
		this.pos -= (n || 1);
	}

	/**
	 * Get the string between the start of the current token and the
	 * current stream position.
	 * @returns {String}
	 */
	current() {
		return this.substring(this.start, this.pos);
	}

	/**
	 * Returns substring for given range
	 * @param  {Number} start
	 * @param  {Number} [end]
	 * @return {String}
	 */
	substring(start, end) {
		return this.string.slice(start, end);
	}

	/**
	 * Creates error object with current stream state
	 * @param {String} message
	 * @return {Error}
	 */
	error(message) {
		const err = new Error(`${message} at char ${this.pos + 1}`);
		err.originalMessage = message;
		err.pos = this.pos;
		err.string = this.string;
		return err;
	}
}

const ASTERISK = 42; // *

/**
 * Consumes node repeat token from current stream position and returns its
 * parsed value
 * @param  {StringReader} stream
 * @return {Object}
 */
function consumeRepeat(stream) {
	if (stream.eat(ASTERISK)) {
		stream.start = stream.pos;

		// XXX think about extending repeat syntax with through numbering
		return { count: stream.eatWhile(isNumber) ? +stream.current() : null };
	}
}

const opt = { throws: true };

/**
 * Consumes quoted literal from current stream position and returns it’s inner,
 * unquoted, value
 * @param  {StringReader} stream
 * @return {String} Returns `null` if unable to consume quoted value from current
 * position
 */
function consumeQuoted(stream) {
	if (eatQuoted(stream, opt)) {
		return stream.current().slice(1, -1);
	}
}

const TEXT_START = 123; // {
const TEXT_END = 125; // }
const ESCAPE =  92; // \ character

/**
 * Consumes text node `{...}` from stream
 * @param  {StreamReader} stream
 * @return {String} Returns consumed text value (without surrounding braces) or
 * `null` if there’s no text at starting position
 */
function consumeText(stream) {
	// NB using own implementation instead of `eatPair()` from @emmetio/stream-reader-utils
	// to disable quoted value consuming
	const start = stream.pos;

	if (stream.eat(TEXT_START)) {
		let stack = 1, ch;
		let result = '';
		let offset = stream.pos;

		while (!stream.eof()) {
			ch = stream.next();
			if (ch === TEXT_START) {
				stack++;
			} else if (ch === TEXT_END) {
				stack--;
				if (!stack) {
					stream.start = start;
					return result + stream.substring(offset, stream.pos - 1);
				}
			} else if (ch === ESCAPE) {
				ch = stream.next();
				if (ch === TEXT_START || ch === TEXT_END) {
					result += stream.substring(offset, stream.pos - 2) + String.fromCharCode(ch);
					offset = stream.pos;
				}
			}
		}

		// If we’re here then paired character can’t be consumed
		stream.pos = start;
		throw stream.error(`Unable to find closing ${String.fromCharCode(TEXT_END)} for text start`);
	}

	return null;
}

const EXCL       = 33; // .
const DOT        = 46; // .
const EQUALS     = 61; // =
const ATTR_OPEN  = 91; // [
const ATTR_CLOSE = 93; // ]

const reAttributeName = /^\!?[\w\-:\$@]+\.?$|^\!?\[[\w\-:\$@]+\]\.?$/;

/**
 * Consumes attributes defined in square braces from given stream.
 * Example:
 * [attr col=3 title="Quoted string" selected. support={react}]
 * @param {StringReader} stream
 * @returns {Array} Array of consumed attributes
 */
function consumeAttributes(stream) {
	if (!stream.eat(ATTR_OPEN)) {
		return null;
	}

	const result = [];
	let token, attr;

	while (!stream.eof()) {
		stream.eatWhile(isWhiteSpace);

		if (stream.eat(ATTR_CLOSE)) {
			return result; // End of attribute set
		} else if ((token = consumeQuoted(stream)) != null) {
			// Consumed quoted value: anonymous attribute
			result.push({
				name: null,
				value: token
			});
		} else if (eatUnquoted(stream)) {
			// Consumed next word: could be either attribute name or unquoted default value
			token = stream.current();

			// In angular attribute names can be surrounded by []
			if (token[0] === '[' && stream.peek() === ATTR_CLOSE) {
				stream.next();
				token = stream.current();
			}

			if (!reAttributeName.test(token)) {
				// anonymous attribute
				result.push({ name: null, value: token });
			} else {
				// Looks like a regular attribute
				attr = parseAttributeName(token);
				result.push(attr);

				if (stream.eat(EQUALS)) {
					// Explicitly defined value. Could be a word, a quoted string
					// or React-like expression
					if ((token = consumeQuoted(stream)) != null) {
						attr.value = token;
					} else if ((token = consumeText(stream)) != null) {
						attr.value = token;
						attr.options = {
							before: '{',
							after: '}'
						};
					} else if (eatUnquoted(stream)) {
						attr.value = stream.current();
					}
				}
			}
		} else {
			throw stream.error('Expected attribute name');
		}
	}

	throw stream.error('Expected closing "]" brace');
}

function parseAttributeName(name) {
	const options = {};

	// If a first character in attribute name is `!` — it’s an implied
	// default attribute
	if (name.charCodeAt(0) === EXCL) {
		name = name.slice(1);
		options.implied = true;
	}

	// Check for last character: if it’s a `.`, user wants boolean attribute
	if (name.charCodeAt(name.length - 1) === DOT) {
		name = name.slice(0, name.length - 1);
		options.boolean = true;
	}

	const attr = { name };
	if (Object.keys(options).length) {
		attr.options = options;
	}

	return attr;
}

/**
 * Eats token that can be an unquoted value from given stream
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
function eatUnquoted(stream) {
	const start = stream.pos;
	if (stream.eatWhile(isUnquoted)) {
		stream.start = start;
		return true;
	}
}

function isUnquoted(code) {
	return !isSpace(code) && !isQuote(code)
		 && code !== ATTR_CLOSE && code !== EQUALS;
}

const HASH    = 35; // #
const DOT$1     = 46; // .
const SLASH   = 47; // /

/**
 * Consumes a single element node from current abbreviation stream
 * @param  {StringReader} stream
 * @return {Node}
 */
function consumeElement(stream) {
	// consume element name, if provided
	const start = stream.pos;
	const node = new Node(eatName(stream));
	let next;

	while (!stream.eof()) {
		if (stream.eat(DOT$1)) {
			node.addClass(eatName(stream));
		} else if (stream.eat(HASH)) {
			node.setAttribute('id', eatName(stream));
		} else if (stream.eat(SLASH)) {
			// A self-closing indicator must be at the end of non-grouping node
			if (node.isGroup) {
				stream.backUp(1);
				throw stream.error('Unexpected self-closing indicator');
			}
			node.selfClosing = true;
			if (next = consumeRepeat(stream)) {
				node.repeat = next;
			}
			break;
		} else if (next = consumeAttributes(stream)) {
			for (let i = 0, il = next.length; i < il; i++) {
				node.setAttribute(next[i]);
			}
		} else if ((next = consumeText(stream)) !== null) {
			node.value = next;
		} else if (next = consumeRepeat(stream)) {
			node.repeat = next;
		} else {
			break;
		}
	}

	if (start === stream.pos) {
		throw stream.error(`Unable to consume abbreviation node, unexpected ${stream.peek()}`);
	}

	return node;
}

function eatName(stream) {
	stream.start = stream.pos;
	stream.eatWhile(isName);
	return stream.current();
}

function isName(code) {
	return isAlphaNumeric(code)
		|| code === 45 /* - */
		|| code === 58 /* : */
		|| code === 36 /* $ */
		|| code === 64 /* @ */
		|| code === 33 /* ! */
		|| code === 95 /* _ */
		|| code === 37 /* % */;
}

const GROUP_START = 40; // (
const GROUP_END   = 41; // )
const OP_SIBLING  = 43; // +
const OP_CHILD    = 62; // >
const OP_CLIMB    = 94; // ^

/**
 * Parses given string into a node tree
 * @param  {String} str Abbreviation to parse
 * @return {Node}
 */
function parse(str) {
	const stream = new StreamReader(str.trim());
	const root = new Node();
	let ctx = root, groupStack = [], ch;

	while (!stream.eof()) {
		ch = stream.peek();

		if (ch === GROUP_START) { // start of group
			// The grouping node should be detached to properly handle
			// out-of-bounds `^` operator. Node will be attached right on group end
			const node = new Node();
			groupStack.push([node, ctx, stream.pos]);
			ctx = node;
			stream.next();
			continue;
		} else if (ch === GROUP_END) { // end of group
			const lastGroup = groupStack.pop();
			if (!lastGroup) {
				throw stream.error('Unexpected ")" group end');
			}

			const node = lastGroup[0];
			ctx = lastGroup[1];
			stream.next();

			// a group can have a repeater
			if (node.repeat = consumeRepeat(stream)) {
				ctx.appendChild(node);
			} else {
				// move all children of group into parent node
				while (node.firstChild) {
					ctx.appendChild(node.firstChild);
				}
			}
			// for convenience, groups can be joined with optional `+` operator
			stream.eat(OP_SIBLING);

			continue;
		}

		const node = consumeElement(stream);
		ctx.appendChild(node);

		if (stream.eof()) {
			break;
		}

		switch (stream.peek()) {
			case OP_SIBLING:
				stream.next();
				continue;

			case OP_CHILD:
				stream.next();
				ctx = node;
				continue;

			case OP_CLIMB:
				// it’s perfectly valid to have multiple `^` operators
				while (stream.eat(OP_CLIMB)) {
					ctx = ctx.parent || ctx;
				}
				continue;
		}
	}

	if (groupStack.length) {
		stream.pos = groupStack.pop()[2];
		throw stream.error('Expected group close');
	}

	return root;
}

/**
 * Parses given abbreviation and un-rolls it into a full tree: recursively
 * replaces repeated elements with actual nodes
 * @param  {String} abbr
 * @return {Node}
 */
function index(abbr) {
	const tree = parse(abbr);
	tree.walk(unroll);
	return tree;
}

function unroll(node) {
	if (!node.repeat || !node.repeat.count) {
		return;
	}

	const parent = node.parent;
	let ix = parent.children.indexOf(node);

	for (let i = 0; i < node.repeat.count; i++) {
		const clone = node.clone(true);
		clone.repeat.value = i + 1;
		clone.walk(unroll);

		if (clone.isGroup) {
			while (clone.children.length > 0) {
				clone.firstChild.repeat = clone.repeat;
				parent.insertAt(clone.firstChild, ix++);
			}
		} else {
			parent.insertAt(clone, ix++);
		}
	}

	node.parent.removeChild(node);
}

/**
 * For every node in given `tree`, finds matching snippet from `registry` and
 * resolves it into a parsed abbreviation. Resolved node is then updated or
 * replaced with matched abbreviation tree.
 *
 * A HTML registry basically contains aliases to another Emmet abbreviations,
 * e.g. a predefined set of name, attribues and so on, possibly a complex
 * abbreviation with multiple elements. So we have to get snippet, parse it
 * and recursively resolve it.
 *
 * @param  {Node} tree                 Parsed Emmet abbreviation
 * @param  {SnippetsRegistry} registry Registry with all available snippets
 * @return {Node} Updated tree
 */

var index$1 = function(tree, registry) {
    tree.walk(node => resolveNode(node, registry));
    return tree;
};

function resolveNode(node, registry) {
    const stack = new Set();
    const resolve = node => {
        const snippet = registry.resolve(node.name);
        // A snippet in stack means circular reference.
        // It can be either a user error or a perfectly valid snippet like
        // "img": "img[src alt]/", e.g. an element with predefined shape.
        // In any case, simply stop parsing and keep element as is
        if (!snippet || stack.has(snippet)) {
            return;
        }

        // In case if matched snippet is a function, pass control into it
        if (typeof snippet.value === 'function') {
            return snippet.value(node, registry, resolve);
        }

        const tree = index(snippet.value);

        stack.add(snippet);
        tree.walk(resolve);
        stack.delete(snippet);

        // move current node contents into new tree
        const childTarget = findDeepestNode(tree);
        merge(childTarget, node);

        while (tree.firstChild) {
            node.parent.insertBefore(tree.firstChild, node);
        }

        childTarget.parent.insertBefore(node, childTarget);
        childTarget.remove();
    };

    resolve(node);
}

/**
 * Adds data from first node into second node and returns it
 * @param  {Node} from
 * @param  {Node} to
 * @return {Node}
 */
function merge(from, to) {
    to.name = from.name;

    if (from.selfClosing) {
        to.selfClosing = true;
    }

    if (from.value != null) {
        to.value = from.value;
    }

    if (from.repeat) {
        to.repeat = Object.assign({}, from.repeat);
    }

    return mergeAttributes(from, to);
}

/**
 * Transfer attributes from first element to second one and preserve first
 * element’s attributes order
 * @param  {Node} from
 * @param  {Node} to
 * @return {Node}
 */
function mergeAttributes(from, to) {
    mergeClassNames(from, to);

    // It’s important to preserve attributes order: ones in `from` have higher
    // pripority than in `to`. Collect attributes in map in order they should
    // appear in `to`
    const attrMap = new Map();

    let attrs = from.attributes;
    for (let i = 0; i < attrs.length; i++) {
        attrMap.set(attrs[i].name, attrs[i].clone());
    }

    attrs = to.attributes.slice();
    for (let i = 0, attr, a; i < attrs.length; i++) {
        attr = attrs[i];
        if (attrMap.has(attr.name)) {
            a = attrMap.get(attr.name);
            a.value = attr.value;

            // If user explicitly wrote attribute in abbreviation, it’s no longer
            // implied and should be outputted even if value is empty
            if (a.options.implied) {
                a.options.implied = false;
            }
        } else {
            attrMap.set(attr.name, attr);
        }

        to.removeAttribute(attr);
    }

    const newAttrs = Array.from(attrMap.values());
    for (let i = 0; i < newAttrs.length; i++) {
        to.setAttribute(newAttrs[i]);
    }

    return to;
}

/**
 * Adds class names from first node to second one
 * @param  {Node} from
 * @param  {Node} to
 * @return {Node}
 */
function mergeClassNames(from, to) {
    const classNames = from.classList;
    for (let i = 0; i < classNames.length; i++) {
        to.addClass(classNames[i]);
    }

    return to;
}

/**
 * Finds node which is the deepest for in current node or node iteself.
 * @param  {Node} node
 * @return {Node}
 */
function findDeepestNode(node) {
	while (node.children.length) {
		node = node.children[node.children.length - 1];
	}

	return node;
}

const inlineElements = new Set('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'.split(','));
const elementMap = {
    p: 'span',
    ul: 'li',
    ol: 'li',
    table: 'tr',
    tr: 'td',
    tbody: 'tr',
    thead: 'tr',
    tfoot: 'tr',
    colgroup: 'col',
    select: 'option',
    optgroup: 'option',
    audio: 'source',
    video: 'source',
    object: 'param',
    map: 'area'
};

/**
 * Returns best child node name for given parent node name
 * @param  {String} parentName Name of parent node
 * @return {String}
 */
function resolveImplicitName(parentName) {
    parentName = (parentName || '').toLowerCase();
    return elementMap[parentName]
        || (inlineElements.has(parentName) ? 'span' : 'div');
}

/**
 * Adds missing tag names for given tree depending on node’s parent name
 */
var implicitTags = function(tree) {
    tree.walk(node => {
        // resolve only nameless nodes without content
        if (node.name == null && node.attributes.length) {
            node.name = resolveImplicitName(node.parent.name);
        }
    });
    return tree;
};

/**
 * Locates all occurances of given `token` which are not escaped (e.g. are not
 * preceded with `\`) given in `str`
 * @param  {String} str
 * @return {Array}  Array of token ranges
 */
function findUnescapedTokens(str, token) {
    const result = new Set();
    const tlen = token.length;

    // 1. Find all occurances of tokens
    let pos = 0;
    while ((pos = str.indexOf(token, pos)) !== -1) {
        result.add(pos);
        pos += tlen;
    }

    if (result.size) {
        // 2. Remove ones that escaped
        let pos = 0;
        const len = str.length;

        while (pos < len) {
            if (str[pos++] === '\\') {
                result.delete(pos++);
            }
        }
    }

    return Array.from(result).map(ix => range(ix, tlen));
}

/**
 * Replaces `ranges`, generated by `range()` function, with given `value` in `str`
 * @param  {String} str    Where to replace ranges
 * @param  {Array} ranges Ranes, created by `range()` function
 * @param  {String|Function} value  Replacement value. If it’s a function, it
 * will take a range value as argument and should return a new string
 * @return {String}
 */
function replaceRanges(str, ranges, value) {
	// should walk from the end of array to keep ranges valid after replacement
	for (let i = ranges.length - 1; i >= 0; i--) {
		const r = ranges[i];

        let offset = 0;
        let offsetLength = 0;
        if (str.substr(r[0] + r[1], 1) === '@'){
            const matches = str.substr(r[0] + r[1] + 1).match(/^(\d+)/);
            if (matches) {
                offsetLength = matches[1].length + 1;
                offset = parseInt(matches[1]) - 1;
            }
        }

		str = str.substring(0, r[0])
			+ (typeof value === 'function' ? value(str.substr(r[0], r[1]), offset) : value)
			+ str.substring(r[0] + r[1] + offsetLength);
	}

	return str;
}

function range(start, length) {
    return [start, length];
}

const numberingToken = '$';

/**
 * Numbering of expanded abbreviation: finds all nodes with `$` in value
 * or attributes and replaces its occurances with repeater value
 */
var applyNumbering = function(tree) {
    tree.walk(applyNumbering$1);
    return tree;
};

/**
 * Applies numbering for given node: replaces occurances of numbering token
 * in node’s name, content and attributes
 * @param  {Node} node
 * @return {Node}
 */
function applyNumbering$1(node) {
    const repeater = findRepeater(node);

    if (repeater && repeater.value != null) {
        // NB replace numbering in nodes with explicit repeater only:
        // it solves issues with abbreviations like `xsl:if[test=$foo]` where
        // `$foo` is preferred output
        const value = repeater.value;

        node.name = replaceNumbering(node.name, value);
        node.value = replaceNumbering(node.value, value);
        node.attributes.forEach(attr => {
            const copy = node.getAttribute(attr.name).clone();
            copy.name = replaceNumbering(attr.name, value);
            copy.value = replaceNumbering(attr.value, value);
            node.replaceAttribute(attr.name, copy);
        });
    }

    return node;
}

/**
 * Returns repeater object for given node
 * @param  {Node} node
 * @return {Object}
 */
function findRepeater(node) {
    while (node) {
        if (node.repeat) {
            return node.repeat;
        }

        node = node.parent;
    }
}

/**
 * Replaces numbering in given string
 * @param  {String} str
 * @param  {Number} value
 * @return {String}
 */
function replaceNumbering(str, value) {
    // replace numbering in strings only: skip explicit wrappers that could
    // contain unescaped numbering tokens
    if (typeof str === 'string') {
        const ranges = getNumberingRanges(str);
        return replaceNumberingRanges(str, ranges, value);
    }

    return str;
}

/**
 * Returns numbering ranges, e.g. ranges of `$` occurances, in given string.
 * Multiple adjacent ranges are combined
 * @param  {String} str
 * @return {Array}
 */
function getNumberingRanges(str) {
    return findUnescapedTokens(str || '', numberingToken)
    .reduce((out, range$$1) => {
        // skip ranges that actually belongs to output placeholder or tabstops
        if (!/[#{]/.test(str[range$$1[0] + 1] || '')) {
            const lastRange = out[out.length - 1];
            if (lastRange && lastRange[0] + lastRange[1] === range$$1[0]) {
                lastRange[1] += range$$1[1];
            } else {
                out.push(range$$1);
            }
        }

        return out;
    }, []);
}

/**
 * @param  {String} str
 * @param  {Array} ranges
 * @param  {Number} value
 * @return {String}
 */
function replaceNumberingRanges(str, ranges, value) {
    const replaced = replaceRanges(str, ranges, (token, offset) => {
        let _value = String(value + offset);
        // pad values for multiple numbering tokens, e.g. 3 for $$$ becomes 003
        while (_value.length < token.length) {
            _value = '0' + _value;
        }
        return _value;
    });

    // unescape screened numbering tokens
    return unescapeString(replaced);
}

/**
 * Unescapes characters, screened with `\`, in given string
 * @param  {String} str
 * @return {String}
 */
function unescapeString(str) {
    let i = 0, result = '';
    const len = str.length;

    while (i < len) {
        const ch = str[i++];
        result += (ch === '\\') ? (str[i++] || '') : ch;
    }

    return result;
}

/** Placeholder for inserted content */
const placeholder = '$#';

/** Placeholder for caret */
const caret = '|';

const reUrl = /^((?:https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
const reEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
const reProto = /^([a-z]+:)?\/\//i;

/**
 * Inserts content into node with implicit repeat count: this node is then
 * duplicated for each content item and content itself is inserted either into
 * deepest child or instead of a special token.
 *
 * This method uses two distinct steps: `prepare()` and `insert()` since most
 * likely these steps will be used separately to properly insert content
 * with unescaped `$` numbering markers.
 *
 * @param {Node} tree Parsed abbreviation
 * @param {String[]} content Array of content items to insert
 * @return {Node}
 */
/**
 * Finds nodes with implicit repeat and creates `amount` copies of it in tree
 * @param  {Node} tree
 * @param  {Number} amount
 * @return {Node}
 */
function prepare(tree, amount) {
    amount = amount || 1;
    tree.walk(node => {
        if (node.repeat && node.repeat.count === null) {
            for (let i = 0; i < amount; i++) {
                const clone = node.clone(true);
                clone.repeat.implicit = true;
                clone.repeat.count = amount;
                clone.repeat.value = i + 1;
                clone.repeat.index = i;
                node.parent.insertBefore(clone, node);
            }

            node.remove();
        }
    });

    return tree;
}

/**
 * Inserts content into implicitly repeated nodes, created by `prepare()` method
 * @param  {Node} tree
 * @param  {String[]} content
 * @return {Node}
 */
function insert(tree, content) {
    if (Array.isArray(content) && content.length) {
        let updated = false;
        tree.walk(node => {
            if (node.repeat && node.repeat.implicit) {
                updated = true;
                insertContent(node, content[node.repeat.index]);
            }
        });

        if (!updated) {
            // no node with implicit repeat was found, insert content as
            // deepest child
            setNodeContent(findDeepestNode$1(tree), content.join('\n'));
        }
    }

    return tree;
}

/**
 * Inserts `content` into given `node`: either replaces output placeholders
 * or inserts it into deepest child node
 * @param  {Node} node
 * @param  {String} content
 * @return {Node}
 */
function insertContent(node, content) {
	let inserted = insertContentIntoPlaceholder(node, content);
	node.walk(child => inserted |= insertContentIntoPlaceholder(child, content));

	if (!inserted) {
		// no placeholders were found in node, insert content into deepest child
		setNodeContent(findDeepestNode$1(node), content);
	}

	return node;
}

/**
 * Inserts given `content` into placeholders for given `node`. Placeholders
 * might be available in attribute values and node content
 * @param  {Node} node
 * @param  {String} content
 * @return {Boolean} Returns `true` if placeholders were found and replaced in node
 */
function insertContentIntoPlaceholder(node, content) {
	const state = {replaced: false};

	node.value = replacePlaceholder(node.value, content, state);
	node.attributes.forEach(attr => {
		if (attr.value) {
			node.setAttribute(attr.name, replacePlaceholder(attr.value, content, state));
		}
	});

	return state.replaced;
}

/**
 * Replaces all placeholder occurances in given `str` with `value`
 * @param  {String} str
 * @param  {String} value
 * @param  {Object} [_state] If provided, set `replaced` property of given
 * object to `true` if placeholder was found and replaced
 * @return {String}
 */
function replacePlaceholder(str, value, _state) {
	if (typeof str === 'string') {
		const ranges = findUnescapedTokens(str, placeholder);
		if (ranges.length) {
			if (_state) {
				_state.replaced = true;
			}

			str = replaceRanges(str, ranges, value);
		}
	}

	return str;
}

/**
 * Finds node which is the deepest for in current node or node iteself.
 * @param  {Node} node
 * @return {Node}
 */
function findDeepestNode$1(node) {
	while (node.children.length) {
		node = node.children[node.children.length - 1];
	}

	return node;
}

/**
 * Updates content of given node
 * @param {Node} node
 * @param {String} content
 */
function setNodeContent(node, content) {
	// find caret position and replace it with content, if possible
	if (node.value) {
		const ranges = findUnescapedTokens(node.value, caret);
		if (ranges.length) {
			node.value = replaceRanges(node.value, ranges, content);
			return;
		}
	}

	if (node.name.toLowerCase() === 'a' || node.hasAttribute('href')) {
		// special case: inserting content into `<a>` tag
		if (reUrl.test(content)) {
			node.setAttribute('href', (reProto.test(content) ? '' : 'http://') + content);
		} else if (reEmail.test(content)) {
			node.setAttribute('href', 'mailto:' + content);
		}
	}

	node.value = content;
}

const defaultOptions$2 = {
	element: '__',
	modifier: '_'
};

const reElement  = /^(-+)([a-z0-9]+[a-z0-9-]*)/i;
const reModifier = /^(_+)([a-z0-9]+[a-z0-9-]*)/i;
const blockCandidates1 = className => /^[a-z]\-/i.test(className);
const blockCandidates2 = className => /^[a-z]/i.test(className);

/**
 * BEM transformer: updates class names written as `-element` and
 * `_modifier` into full class names as described in BEM specs. Also adds missing
 * class names: fir example, if node contains `.block_modifier` class, ensures
 * that element contains `.block` class as well
 */
var bem = function(tree, options) {
	options = Object.assign({}, defaultOptions$2, options);

	tree.walk(node => expandClassNames(node, options));

	const lookup = createBlockLookup(tree);
	tree.walk(node => expandShortNotation(node, lookup, options));

	return tree;
};

/**
 * Expands existing class names in BEM notation in given `node`.
 * For example, if node contains `b__el_mod` class name, this method ensures
 * that element contains `b__el` class as well
 * @param  {Node} node
 * @param  {Object} options
 * @return {Set}
 */
function expandClassNames(node, options) {
	const classNames = node.classList.reduce((out, cl) => {
		// remove all modifiers and element prefixes from class name to get a base element name
		const ix = cl.indexOf('_');
		if (ix > 0 && !cl.startsWith('-')) {
			out.add(cl.slice(0, ix));
		    out.add(cl.slice(ix));
			return out;
		}

		return out.add(cl);
	}, new Set());

	if (classNames.size) {
		node.setAttribute('class', Array.from(classNames).join(' '));
	}
}

/**
 * Expands short BEM notation, e.g. `-element` and `_modifier`
 * @param  {Node} node      Parsed Emmet abbreviation node
 * @param  {Map} lookup     BEM block name lookup
 * @param  {Object} options
 */
function expandShortNotation(node, lookup, options) {
	const classNames = node.classList.reduce((out, cl) => {
		let prefix, m;
		const originalClass = cl;

		// parse element definition (could be only one)
		if (m = cl.match(reElement)) {
			prefix = getBlockName(node, lookup, m[1]) + options.element + m[2];
			out.add(prefix);
			cl = cl.slice(m[0].length);
		}

		// parse modifiers definitions (may contain multiple)
		while (m = cl.match(reModifier)) {
			if (!prefix) {
				prefix = getBlockName(node, lookup, m[1]);
				out.add(prefix);
			}

			out.add(`${prefix}${options.modifier}${m[2]}`);
			cl = cl.slice(m[0].length);
		}

		if (cl === originalClass) {
			// class name wasn’t modified: it’s not a BEM-specific class,
			// add it as-is into output
			out.add(originalClass);
		}

		return out;
	}, new Set());

	const arrClassNames = Array.from(classNames).filter(Boolean);
	if (arrClassNames.length) {
		node.setAttribute('class', arrClassNames.join(' '));
	}
}

/**
 * Creates block name lookup for each node in given tree, e.g. finds block
 * name explicitly for each node
 * @param  {Node} tree
 * @return {Map}
 */
function createBlockLookup(tree) {
	const lookup = new Map();

	tree.walk(node => {
		const classNames = node.classList;
		if (classNames.length) {
			// guess best block name from class or use parent’s block name
			lookup.set(node,
				find(classNames, blockCandidates1)
				|| find(classNames, blockCandidates2)
				|| lookup.get(node.parent)
			);
		}
	});

	return lookup;
}

/**
 * Returns block name for given `node` by `prefix`, which tells the depth of
 * of parent node lookup
 * @param  {Node} node
 * @param  {Map} lookup
 * @param  {String} prefix
 * @return {String}
 */
function getBlockName(node, lookup, prefix) {
	let depth = prefix.length > 1 ? prefix.length : 0;

	// NB don’t walk up to root node, stay at first root child in case of
	// too deep prefix
	while (node.parent && node.parent.parent && depth--) {
		node = node.parent;
	}

	return lookup.get(node) || '';
}

function find(arr, filter) {
	return arr.filter(filter)[0];
}

/**
 * JSX transformer: replaces `class` and `for` attributes with `className` and
 * `htmlFor` attributes respectively
 */
var jsx = function(tree) {
	tree.walk(node => {
		replace(node, 'class', 'className');
		replace(node, 'for', 'htmlFor');
	});
	return tree;
};

function replace(node, oldName, newName) {
	let attr = node.getAttribute(oldName);
	if (attr) {
		attr.name = newName;
	}
}

const reSupporterNames = /^xsl:(variable|with\-param)$/i;

/**
 * XSL transformer: removes `select` attributes from certain nodes that contain
 * children
 */
var xsl = function(tree) {
	tree.walk(node => {
		if (reSupporterNames.test(node.name || '') && (node.children.length || node.value)) {
			node.removeAttribute('select');
		}
	});
	return tree;
};

const supportedAddons = { bem, jsx, xsl };

/**
 * Runs additional transforms on given tree.
 * These transforms may introduce side-effects and unexpected result
 * so they are not applied by default, authors must specify which addons
 * in `addons` argument as `{addonName: addonOptions}`
 * @param {Node} tree Parsed Emmet abbreviation
 * @param {Object} addons Add-ons to apply and their options
 */
var addons = function(tree, addons) {
    Object.keys(addons || {}).forEach(key => {
        if (key in supportedAddons) {
            const addonOpt = typeof addons[key] === 'object' ? addons[key] : null;
            tree = tree.use(supportedAddons[key], addonOpt);
        }
    });

    return tree;
};

/**
 * Applies basic HTML-specific transformations for given parsed abbreviation:
 * – resolve implied tag names
 * – insert repeated content
 * – resolve node numbering
 */
var index$2 = function(tree, content, appliedAddons) {
    if (typeof content === 'string') {
        content = [content];
    } else if (content && typeof content === 'object' && !Array.isArray(content)) {
        appliedAddons = content;
        content = null;
    }

    return tree
    .use(implicitTags)
    .use(prepare, Array.isArray(content) ? content.length : null)
    .use(applyNumbering)
    .use(insert, content)
    .use(addons, appliedAddons);
};

/**
 * Replaces all unescaped ${variable} occurances in given parsed abbreviation
 * `tree` with values provided in `variables` hash. Precede `$` with `\` to
 * escape it and skip replacement
 * @param {Node} tree Parsed abbreviation tree
 * @param {Object} variables Variables values
 * @return {Node}
 */
function replaceVariables(tree, variables) {
	variables = variables || {};
    tree.walk(node => replaceInNode(node, variables));
    return tree;
}

function replaceInNode(node, variables) {
    // Replace variables in attributes.
    const attrs = node.attributes;

    for (let i = 0, il = attrs.length; i < il; i++) {
        const attr = attrs[i];
        if (typeof attr.value === 'string') {
            node.setAttribute(attr.name, replaceInString(attr.value, variables));
        }
    }

    if (node.value != null) {
        node.value = replaceInString(node.value, variables);
    }

    return node;
}

/**
 * Replaces all unescaped `${variable}` occurances in given string with values
 * from `variables` object
 * @param  {String} string
 * @param  {Object} variables
 * @return {String}
 */
function replaceInString(string, variables) {
    const model = createModel(string);
    let offset = 0;
    let output = '';

    for (let i = 0, il = model.variables.length; i < il; i++) {
        const v = model.variables[i];
        let value = v.name in variables ? variables[v.name] : v.name;
        if (typeof value === 'function') {
            value = value(model.string, v, offset + v.location);
        }

        output += model.string.slice(offset, v.location) + value;
        offset = v.location + v.length;
    }

    return output + model.string.slice(offset);
}

/**
 * Creates variable model from given string. The model contains a `string` with
 * all escaped variable tokens written without escape symbol and `variables`
 * property with all unescaped variables and their ranges
 * @param  {String} string
 * @return {Object}
 */
function createModel(string) {
    const reVariable = /\$\{([a-z][\w\-]*)\}/ig;
    const escapeCharCode = 92; // `\` symbol
    const variables = [];

    // We have to replace unescaped (e.g. not preceded with `\`) tokens.
    // Instead of writing a stream parser, we’ll cut some edges here:
    // 1. Find all tokens
    // 2. Walk string char-by-char and resolve only tokens that are not escaped
    const tokens = new Map();
    let m;
    while (m = reVariable.exec(string)) {
        tokens.set(m.index, m);
    }

    if (tokens.size) {
        let start = 0, pos = 0, len = string.length;
        let output = '';
        while (pos < len) {
            if (string.charCodeAt(pos) === escapeCharCode && tokens.has(pos + 1)) {
                // Found escape symbol that escapes variable: we should
                // omit this symbol in output string and skip variable
                const token = tokens.get(pos + 1);
                output += string.slice(start, pos) + token[0];
                start = pos = token.index + token[0].length;
                tokens.delete(pos + 1);
                continue;
            }

            pos++;
        }

        string = output + string.slice(start);

        // Not using `.map()` here to reduce memory allocations
        const validMatches = Array.from(tokens.values());
        for (let i = 0, il = validMatches.length; i < il; i++) {
            const token = validMatches[i];
            variables.push({
                name: token[1],
                location: token.index,
                length: token[0].length
            });
        }
    }

    return {string, variables};
}

const DOLLAR      = 36;  // $
const COLON       = 58;  // :
const ESCAPE$1      = 92;  // \
const OPEN_BRACE  = 123; // {
const CLOSE_BRACE = 125; // }

/**
 * Finds fields in given string and returns object with field-less string
 * and array of fileds found
 * @param  {String} string
 * @return {Object}
 */
function parse$2(string) {
	const stream = new StreamReader(string);
	const fields = [];
	let cleanString = '', offset = 0, pos = 0;
	let code, field;

	while (!stream.eof()) {
		code = stream.peek();
		pos = stream.pos;

		if (code === ESCAPE$1) {
			stream.next();
			stream.next();
		} else if (field = consumeField(stream, cleanString.length + pos - offset)) {
			fields.push(field);
			cleanString += stream.string.slice(offset, pos) + field.placeholder;
			offset = stream.pos;
		} else {
			stream.next();
		}
	}

	return new FieldString(cleanString + stream.string.slice(offset), fields);
}

/**
 * Marks given `string` with `fields`: wraps each field range with
 * `${index:placeholder}` (by default) or any other token produced by `token`
 * function, if provided
 * @param  {String} string String to mark
 * @param  {Array} fields Array of field descriptor. A field descriptor is a
 * `{index, location, length}` array. It is important that fields in array
 * must be ordered by their location in string: some fields my refer the same
 * location so they must appear in order that user expects.
 * @param  {Function} [token] Function that generates field token. This function
 * received two arguments: `index` and `placeholder` and should return string
 * @return {String}  String with marked fields
 */
function mark(string, fields, token) {
	token = token || createToken;

	// order fields by their location and appearence
	// NB field ranges should not overlap! (not supported yet)
	const ordered = fields
	.map((field, order) => ({order, field, end: field.location + field.length}))
	.sort((a, b) => (a.end - b.end) || (a.order - b.order));

	// mark ranges in string
	let offset = 0;
	const result = ordered.map(item => {
		const placeholder = string.substr(item.field.location, item.field.length);
		const prefix = string.slice(offset, item.field.location);
		offset = item.end;
		return prefix + token(item.field.index, placeholder);
	});

	return result.join('') + string.slice(offset);
}

/**
 * Creates field token for string
 * @param  {Number} index       Field index
 * @param  {String} placeholder Field placeholder, could be empty string
 * @return {String}
 */
function createToken(index, placeholder) {
	return placeholder ? `\${${index}:${placeholder}}` : `\${${index}}`;
}

/**
 * Consumes field from current stream position: it can be an `$index` or
 * or `${index}` or `${index:placeholder}`
 * @param  {StreamReader} stream
 * @param  {Number}       location Field location in *clean* string
 * @return {Object} Object with `index` and `placeholder` properties if
 * fieald was successfully consumed, `null` otherwise
 */
function consumeField(stream, location) {
	const start = stream.pos;

	if (stream.eat(DOLLAR)) {
		// Possible start of field
		let index = consumeIndex(stream);
		let placeholder = '';

		// consumed $index placeholder
		if (index != null) {
			return new Field(index, placeholder, location);
		}

		if (stream.eat(OPEN_BRACE)) {
			index = consumeIndex(stream);
			if (index != null) {
				if (stream.eat(COLON)) {
					placeholder = consumePlaceholder(stream);
				}

				if (stream.eat(CLOSE_BRACE)) {
					return new Field(index, placeholder, location);
				}
			}
		}
	}

	// If we reached here then there’s no valid field here, revert
	// back to starting position
	stream.pos = start;
}

/**
 * Consumes a placeholder: value right after `:` in field. Could be empty
 * @param  {StreamReader} stream
 * @return {String}
 */
function consumePlaceholder(stream) {
	let code;
	const stack = [];
	stream.start = stream.pos;

	while (!stream.eof()) {
		code = stream.peek();

		if (code === OPEN_BRACE) {
			stack.push(stream.pos);
		} else if (code === CLOSE_BRACE) {
			if (!stack.length) {
				break;
			}
			stack.pop();
		}
		stream.next();
	}

	if (stack.length) {
		throw stream.error('Unable to find matching "}" for curly brace at ' + stack.pop());
	}

	return stream.current();
}

/**
 * Consumes integer from current stream position
 * @param  {StreamReader} stream
 * @return {Number}
 */
function consumeIndex(stream) {
	stream.start = stream.pos;
	if (stream.eatWhile(isNumber)) {
		return Number(stream.current());
	}
}

class Field {
	constructor(index, placeholder, location) {
		this.index = index;
		this.placeholder = placeholder;
		this.location = location;
		this.length = this.placeholder.length;
	}
}

class FieldString {
	/**
	 * @param {String} string
	 * @param {Field[]} fields
	 */
	constructor(string, fields) {
		this.string = string;
		this.fields = fields;
	}

	mark(token) {
		return mark(this.string, this.fields, token);
	}

	toString() {
		return string;
	}
}

const defaultFieldsRenderer = text => text;

/**
 * Output node is an object containing generated output for given Emmet
 * abbreviation node. Output node can be passed to various processors that
 * may shape-up final node output. The final output is simply a concatenation
 * of `.open`, `.text` and `.close` properties and its `.before*` and `.after*`
 * satellites
 * @param {Node}     node           Parsed Emmet abbreviation node
 * @param {Function} fieldsRenderer A function for rendering fielded text (text with
 * tabstops) for current node. @see ./render.js for details
 */
class OutputNode {
	constructor(node, fieldsRenderer, options) {
		if (typeof fieldsRenderer === 'object') {
			options = fieldsRenderer;
			fieldsRenderer = null;
		}

		this.node = node;
		this._fieldsRenderer = fieldsRenderer || defaultFieldsRenderer;

		this.open = null;
		this.beforeOpen = '';
		this.afterOpen = '';

		this.close = null;
		this.beforeClose = '';
		this.afterClose = '';

		this.text = null;
		this.beforeText = '';
		this.afterText = '';

		this.indent = '';
		this.newline = '';

		if (options) {
            Object.assign(this, options);
        }
	}

	clone() {
		return new this.constructor(this.node, this);
	}

	/**
	 * Properly indents given multiline text
	 * @param {String} text
	 */
	indentText(text) {
		const lines = splitByLines(text);
        if (lines.length === 1) {
            // no newlines, nothing to indent
            return text;
        }

        // No newline and no indent means no formatting at all:
        // in this case we should replace newlines with spaces
        const nl = (!this.newline && !this.indent) ? ' ' : this.newline;
        return lines.map((line, i) => i ? this.indent + line : line).join(nl);
	}

	/**
	 * Renders given text with fields
	 * @param {String} text
	 * @return {String}
	 */
	renderFields(text) {
		return this._fieldsRenderer(text);
	}

	toString(children) {
		const open = this._wrap(this.open, this.beforeOpen, this.afterOpen);
		const close = this._wrap(this.close, this.beforeClose, this.afterClose);
		const text = this._wrap(this.text, this.beforeText, this.afterText);

		return open + text + (children != null ? children : '') + close;
	}

	_wrap(str, before, after) {
		before = before != null ? before : '';
		after = after != null ? after : '';

        // automatically trim whitespace for non-empty wraps
        if (str != null) {
            str = before ? str.replace(/^\s+/, '') : str;
            str = after ? str.replace(/\s+$/, '') : str;
            return before + this.indentText(str) + after;
        }

        return '';
	}
}

/**
 * Splits given text by lines
 * @param  {String} text
 * @return {String[]}
 */
function splitByLines(text) {
	return (text || '').split(/\r\n|\r|\n/g);
}

/**
 * Default output of field (tabstop)
 * @param  {Number} index       Field index
 * @param  {String} placeholder Field placeholder, can be null
 * @return {String}
 */
const defaultField = (index, placeholder) => (placeholder || '');

/**
 * Renders given parsed abbreviation `tree` via `formatter` function.

 * @param {Node}     tree      Parsed Emmet abbreviation
 * @param {Function} [field]   Optional function to format field/tabstop (@see `defaultField`)
 * @param {Function} formatter Output formatter function. It takes an output node—
 * a special wrapper for parsed node that holds formatting and output properties—
 * and updates its output properties to shape-up node’s output.
 * Function arguments:
 * 	– `outNode`: OutputNode
 * 	– `renderFields`: a helper function that parses fields/tabstops from given
 * 	   text and replaces them with `field` function output.
 * 	   It also takes care about field indicies and ensures that the same indicies
 * 	   from different nodes won’t collide
 */
function render(tree, field, formatter) {
    if (typeof formatter === 'undefined') {
        formatter = field;
        field = null;
    }

    field = field || defaultField;

    // Each node may contain fields like `${1:placeholder}`.
	// Since most modern editors will link all fields with the same
	// index, we have to ensure that different nodes has their own indicies.
	// We’ll use this `fieldState` object to globally increment field indices
	// during output
	const fieldState = { index: 1 };

    const fieldsRenderer = text => text == null
        ? field(fieldState.index++)
        : getFieldsModel(text, fieldState).mark(field);

	return run(tree.children, formatter, fieldsRenderer);
}

function run(nodes, formatter, fieldsRenderer) {
	return nodes.map(node => {
		const outNode = formatter(new OutputNode(node, fieldsRenderer));
		return outNode ? outNode.toString(run(node.children, formatter, fieldsRenderer)) : '';
	}).join('');
}

/**
 * Returns fields (tab-stops) model with properly updated indices that won’t
 * collide with fields in other nodes of foprmatted tree
 * @param  {String|Object} text Text to get fields model from or model itself
 * @param  {Object} fieldState Abbreviation tree-wide field state reference
 * @return {Object} Field model
 */
function getFieldsModel(text, fieldState) {
	const model = typeof text === 'object' ? text : parse$2(text);
    let largestIndex = -1;

    model.fields.forEach(field => {
		field.index += fieldState.index;
		if (field.index > largestIndex) {
			largestIndex = field.index;
		}
	});

	if (largestIndex !== -1) {
		fieldState.index = largestIndex + 1;
	}

    return model;
}

const TOKEN       = /^(.*?)([A-Z_]+)(.*?)$/;
const TOKEN_OPEN  = 91; // [
const TOKEN_CLOSE = 93; // ]

/**
 * A basic templating engine.
 * Takes every `[TOKEN]` from given string and replaces it with
 * `TOKEN` value from given `data` attribute. The token itself may contain
 * various characters between `[`, token name and `]`. Contents of `[...]` will
 * be outputted only if `TOKEN` value is not empty. Also, only `TOKEN` name will
 * be replaced with actual value, all other characters will remain as is.
 *
 * Example:
 * ```
 * template('[<NAME>]', {NAME: 'foo'}) -> "<foo>"
 * template('[<NAME>]', {}) -> ""
 * ```
 */
function template(str, data) {
	if (str == null) {
		return str;
	}

	// NB since token may contain inner `[` and `]`, we can’t just use regexp
	// for replacement, should manually parse string instead
	const stack = [];
	const replacer = (str, left, token, right) =>
		data[token] != null ? left + data[token] + right : '';

	let output = '';
	let offset = 0, i = 0;
	let code, lastPos;

	while (i < str.length) {
		code = str.charCodeAt(i);
		if (code === TOKEN_OPEN) {
			stack.push(i);
		} else if (code === TOKEN_CLOSE) {
			lastPos = stack.pop();
			if (!stack.length) {
				output += str.slice(offset, lastPos) +
					str.slice(lastPos + 1, i).replace(TOKEN, replacer);
				offset = i + 1;
			}
		}

		i++;
	}

	return output + str.slice(offset);
}

/**
 * Various utility methods used by formatters
 */

/**
 * Splits given text by lines
 * @param  {String} text
 * @return {String[]}
 */
function splitByLines$1(text) {
	return (text || '').split(/\r\n|\r|\n/g);
}

/**
 * Check if given node is a first child in its parent
 * @param  {Node}  node
 * @return {Boolean}
 */
function isFirstChild(node) {
	return node.parent.firstChild === node;
}

/**
 * Check if given node is a last child in its parent node
 * @param  {Node}  node
 * @return {Boolean}
 */


/**
 * Check if given node is a root node
 * @param  {Node}  node
 * @return {Boolean}
 */
function isRoot(node) {
	return node && !node.parent;
}

/**
 * Check if given node is a pseudo-snippet: a text-only node with explicitly
 * defined children
 * @param  {Node}  node
 * @return {Boolean}
 */
function isPseudoSnippet(node) {
    return node.isTextOnly && !!node.children.length;
}

/**
 * Handles pseudo-snippet node.
 * A pseudo-snippet is a text-only node with explicitly defined children.
 * For such case, we have to figure out if pseudo-snippet contains fields
 * (tab-stops) in node value and “split” it: make contents before field with
 * lowest index node’s “open” part and contents after lowest index — “close”
 * part. With this trick a final output will look like node’s children
 * are nested inside node value
 * @param  {OutputNode} outNode
 * @return {Boolean} Returns “true” if given node is a pseudo-snippets,
 * `false` otherwise
 */
function handlePseudoSnippet(outNode) {
	const node = outNode.node; // original abbreviaiton node

	if (isPseudoSnippet(node)) {
		const fieldsModel = parse$2(node.value);
		const field = findLowestIndexField(fieldsModel);
		if (field) {
			const parts = splitFieldsModel(fieldsModel, field);
            outNode.open = outNode.renderFields(parts[0]);
			outNode.close = outNode.renderFields(parts[1]);
		} else {
			outNode.text = outNode.renderFields(fieldsModel);
		}

		return true;
	}

	return false;
}

/**
 * Finds field with lowest index in given text
 * @param  {Object} model
 * @return {Object}
 */
function findLowestIndexField(model) {
	return model.fields.reduce((result, field) =>
		!result || field.index < result.index ? field : result
		, null);
}

/**
 * Splits given fields model in two parts by given field
 * @param  {Object} model
 * @param  {Object} field
 * @return {Array} Two-items array
 */
function splitFieldsModel(model, field) {
	const ix = model.fields.indexOf(field);

	const left = new model.constructor(
		model.string.slice(0, field.location),
		model.fields.slice(0, ix)
	);

	const right = new model.constructor(
		model.string.slice(field.location + field.length),
		model.fields.slice(ix + 1)
	);

	return [left, right];
}

const commentOptions = {
	// enable node commenting
	enabled: false,

	// attributes that should trigger node commenting on specific node,
	// if commenting is enabled
	trigger: ['id', 'class'],

	// comment before opening tag
	before: '',

	// comment after closing tag
	after: '\n<!-- /[#ID][.CLASS] -->'
};

/**
 * Renders given parsed Emmet abbreviation as HTML, formatted according to
 * `profile` options
 * @param  {Node}     tree    Parsed Emmet abbreviation
 * @param  {Profile}  profile Output profile
 * @param  {Object}  [options] Additional formatter options
 * @return {String}
 */
function html(tree, profile, options) {
	options = Object.assign({}, options);
	options.comment = Object.assign({}, commentOptions, options.comment);

	return render(tree, options.field, outNode => {
		outNode = setFormatting(outNode, profile);

		if (!handlePseudoSnippet(outNode)) {
			const node = outNode.node;

			if (node.name) {
				const name = profile.name(node.name);
				const attrs = formatAttributes(outNode, profile);

				outNode.open = `<${name}${attrs}${node.selfClosing ? profile.selfClose() : ''}>`;
				if (!node.selfClosing) {
					outNode.close = `</${name}>`;
				}

				commentNode(outNode, options.comment);
			}

			// Do not generate fields for nodes with empty value and children
			// or if node is self-closed
			if (node.value || (!node.children.length && !node.selfClosing) ) {
				outNode.text = outNode.renderFields(node.value);
			}
		}

		return outNode;
	});
}

/**
 * Updates formatting properties for given output node
 * @param  {OutputNode} outNode Output wrapper of farsed abbreviation node
 * @param  {Profile}    profile Output profile
 * @return {OutputNode}
 */
function setFormatting(outNode, profile) {
	const node = outNode.node;

    if (shouldFormatNode(node, profile)) {
        outNode.indent = profile.indent(getIndentLevel(node, profile));
        outNode.newline = '\n';
        const prefix = outNode.newline + outNode.indent;

        // do not format the very first node in output
        if (!isRoot(node.parent) || !isFirstChild(node)) {
            outNode.beforeOpen = prefix;
            if (node.isTextOnly) {
                outNode.beforeText = prefix;
            }
        }

        if (hasInnerFormatting(node, profile)) {
            if (!node.isTextOnly) {
                outNode.beforeText = prefix + profile.indent(1);
            }
            outNode.beforeClose = prefix;
        }
    }

    return outNode;
}

/**
 * Check if given node should be formatted
 * @param  {Node} node
 * @param  {Profile} profile
 * @return {Boolean}
 */
function shouldFormatNode(node, profile) {
	if (!profile.get('format')) {
		return false;
	}

    if (node.parent.isTextOnly
        && node.parent.children.length === 1
        && parse$2(node.parent.value).fields.length) {
        // Edge case: do not format the only child of text-only node,
        // but only if parent contains fields
        return false;
    }

	return isInline(node, profile) ? shouldFormatInline(node, profile) : true;
}

/**
 * Check if given inline node should be formatted as well, e.g. it contains
 * enough adjacent siblings that should force formatting
 * @param  {Node} node
 * @param  {Profile} profile
 * @return {Boolean}
 */
function shouldFormatInline(node, profile) {
	if (!isInline(node, profile)) {
		return false;
	}

    if (isPseudoSnippet(node)) {
        return true;
    }

    // check if inline node is the next sibling of block-level node
    if (node.childIndex === 0) {
        // first node in parent: format if it’s followed by a block-level element
        let next = node;
        while (next = next.nextSibling) {
            if (!isInline(next, profile)) {
                return true;
            }
        }
    } else if (!isInline(node.previousSibling, profile)) {
        // node is right after block-level element
        return true;
    }

    if (profile.get('inlineBreak')) {
        // check for adjacent inline elements before and after current element
        let adjacentInline = 1;
        let before = node, after = node;

        while (isInlineElement((before = before.previousSibling), profile)) {
            adjacentInline++;
        }

        while (isInlineElement((after = after.nextSibling), profile)) {
            adjacentInline++;
        }

		if (adjacentInline >= profile.get('inlineBreak')) {
			return true;
		}
    }

	// Another edge case: inline node contains node that should receive foramtting
	for (let i = 0, il = node.children.length; i < il; i++) {
		if (shouldFormatNode(node.children[i], profile)) {
			return true;
		}
	}

    return false;
}

/**
 * Check if given node contains inner formatting, e.g. any of its children should
 * be formatted
 * @param  {Node} node
 * @param  {Profile} profile
 * @return {Boolean}
 */
function hasInnerFormatting(node, profile) {
    // check if node if forced for inner formatting
    const nodeName = (node.name || '').toLowerCase();
    if (profile.get('formatForce').indexOf(nodeName) !== -1) {
        return true;
    }

    // check if any of children should receive formatting
    // NB don’t use `childrent.some()` to reduce memory allocations
    for (let i = 0; i < node.children.length; i++) {
        if (shouldFormatNode(node.children[i], profile)) {
            return true;
        }
    }

    return false;
}

/**
 * Outputs attributes of given abbreviation node as HTML attributes
 * @param  {OutputNode} outNode
 * @param  {Profile}    profile
 * @return {String}
 */
function formatAttributes(outNode, profile) {
	const node = outNode.node;

    return node.attributes.map(attr => {
        if (attr.options.implied && attr.value == null) {
    		return null;
    	}

    	const attrName = profile.attribute(attr.name);
    	let attrValue = null;

        // handle boolean attributes
    	if (attr.options.boolean || profile.get('booleanAttributes').indexOf(attrName.toLowerCase()) !== -1) {
    		if (profile.get('compactBooleanAttributes') && attr.value == null) {
    			return ` ${attrName}`;
    		} else if (attr.value == null) {
    			attrValue = attrName;
    		}
    	}

    	if (attrValue == null) {
    		attrValue = outNode.renderFields(attr.value);
    	}

			// For https://github.com/Microsoft/vscode/issues/63703
			// https://github.com/emmetio/markup-formatters/pull/2/files
    	return attr.options.before && attr.options.after
				? ` ${attrName}=${attr.options.before+attrValue+attr.options.after}`
				: ` ${attrName}=${profile.quote(attrValue)}`;
    }).join('');
}

/**
 * Check if given node is inline-level
 * @param  {Node}  node
 * @param  {Profile}  profile
 * @return {Boolean}
 */
function isInline(node, profile) {
	return (node && node.isTextOnly) || isInlineElement(node, profile);
}

/**
 * Check if given node is inline-level element, e.g. element with explicitly
 * defined node name
 * @param  {Node}  node
 * @param  {Profile}  profile
 * @return {Boolean}
 */
function isInlineElement(node, profile) {
	return node && profile.isInline(node);
}

/**
 * Computes indent level for given node
 * @param  {Node} node
 * @param  {Profile} profile
 * @param  {Number} level
 * @return {Number}
 */
function getIndentLevel(node, profile) {
	// Increase indent level IF NOT:
	// * parent is text-only node
	// * there’s a parent node with a name that is explicitly set to decrease level
	const skip = profile.get('formatSkip') || [];
	let level = node.parent.isTextOnly ? -2 : -1;
	let ctx = node;
	while (ctx = ctx.parent) {
		if (skip.indexOf( (ctx.name || '').toLowerCase() ) === -1) {
			level++;
		}
	}

	return level < 0 ? 0 : level;
}

/**
 * Comments given output node, if required
 * @param  {OutputNode} outNode
 * @param  {Object} options
 */
function commentNode(outNode, options) {
	const node = outNode.node;

	if (!options.enabled || !options.trigger || !node.name) {
		return;
	}

	const attrs = outNode.node.attributes.reduce((out, attr) => {
		if (attr.name && attr.value != null) {
			out[attr.name.toUpperCase().replace(/-/g, '_')] = attr.value;
		}

		return out;
	}, {});

	// add comment only if attribute trigger is present
	for (let i = 0, il = options.trigger.length; i < il; i++) {
		if (options.trigger[i].toUpperCase() in attrs) {
			outNode.open = template(options.before, attrs) + outNode.open;
			if (outNode.close) {
				outNode.close += template(options.after, attrs);
			}
			break;
		}
	}
}

/**
 * Common utility methods for indent-based syntaxes (Slim, Pug, etc.)
 */

const reId = /^id$/i;
const reClass = /^class$/i;
const defaultAttrOptions = {
	primary: attrs => attrs.join(''),
	secondary: attrs => attrs.map(attr => attr.isBoolean ? attr.name : `${attr.name}=${attr.value}`).join(', ')
};

const defaultNodeOptions = {
	open: null,
	close: null,
	omitName: /^div$/i,
	attributes: defaultAttrOptions
};

function indentFormat(outNode, profile, options) {
	options = Object.assign({}, defaultNodeOptions, options);
	const node = outNode.node;

	outNode.indent = profile.indent(getIndentLevel$1(node, profile));
	outNode.newline = '\n';

	// Do not format the very first node in output
    if (!isRoot(node.parent) || !isFirstChild(node)) {
        outNode.beforeOpen = outNode.newline + outNode.indent;
    }

	if (node.name) {
		const data = Object.assign({
			NAME: profile.name(node.name),
			SELF_CLOSE: node.selfClosing ? options.selfClose : null
		}, getAttributes(outNode, profile, options.attributes));

		// omit tag name if node has primary attributes
		if (options.omitName && options.omitName.test(data.NAME) && data.PRIMARY_ATTRS) {
			data.NAME = null;
		}

		if (options.open != null) {
			outNode.open = template(options.open, data);
		}

		if (options.close != null) {
			outNode.close = template(options.close, data);
		}
	}

	return outNode;
}

/**
 * Formats attributes of given node into a string.
 * @param  {OutputNode} node          Output node wrapper
 * @param  {Profile}    profile       Output profile
 * @param  {Object}     options       Additional formatting options
 * @return {String}
 */
function getAttributes(outNode, profile, options) {
	options = Object.assign({}, defaultAttrOptions, options);
	const primary = [], secondary = [];
	const node = outNode.node;

	node.attributes.forEach(attr => {
		if (attr.options.implied && attr.value == null) {
			return null;
		}

		const name = profile.attribute(attr.name);
		const value = outNode.renderFields(attr.value);

		if (reId.test(name)) {
			value && primary.push(`#${value}`);
		} else if (reClass.test(name)) {
			value && primary.push(`.${value.replace(/\s+/g, '.')}`);
		} else {
			const isBoolean = attr.value == null
				&& (attr.options.boolean || profile.get('booleanAttributes').indexOf(name.toLowerCase()) !== -1);

			secondary.push({ name, value, isBoolean });
		}
	});

	return {
		PRIMARY_ATTRS: options.primary(primary) || null,
		SECONDARY_ATTRS: options.secondary(secondary) || null
	};
}

/**
 * Computes indent level for given node
 * @param  {Node} node
 * @param  {Profile} profile
 * @param  {Number} level
 * @return {Number}
 */
function getIndentLevel$1(node, profile) {
	let level = node.parent.isTextOnly ? -2 : -1;
	let ctx = node;
	while (ctx = ctx.parent) {
		level++;
	}

	return level < 0 ? 0 : level;
}

const reNl = /\n|\r/;

/**
 * Renders given parsed Emmet abbreviation as HAML, formatted according to
 * `profile` options
 * @param  {Node}    tree      Parsed Emmet abbreviation
 * @param  {Profile} profile   Output profile
 * @param  {Object}  [options] Additional formatter options
 * @return {String}
 */
function haml(tree, profile, options) {
	options = options || {};
	const nodeOptions = {
		open: '[%NAME][PRIMARY_ATTRS][(SECONDARY_ATTRS)][SELF_CLOSE]',
		selfClose: '/',
		attributes: {
			secondary(attrs) {
				return attrs.map(attr => attr.isBoolean
					? `${attr.name}${profile.get('compactBooleanAttributes') ? '' : '=true'}`
					: `${attr.name}=${profile.quote(attr.value)}`
				).join(' ');
			}
		}
	};

	return render(tree, options.field, outNode => {
		outNode = indentFormat(outNode, profile, nodeOptions);
		outNode = updateFormatting(outNode, profile);

		if (!handlePseudoSnippet(outNode)) {
			const node = outNode.node;

			// Do not generate fields for nodes with empty value and children
			// or if node is self-closed
			if (node.value || (!node.children.length && !node.selfClosing) ) {
				outNode.text = outNode.renderFields(formatNodeValue(node, profile));
			}
		}

        return outNode;
	});
}

/**
 * Updates formatting properties for given output node
 * NB Unlike HTML, HAML is indent-based format so some formatting options from
 * `profile` will not take effect, otherwise output will be broken
 * @param  {OutputNode} outNode Output wrapper of parsed abbreviation node
 * @param  {Profile}    profile Output profile
 * @return {OutputNode}
 */
function updateFormatting(outNode, profile) {
	const node = outNode.node;

    if (!node.isTextOnly && node.value) {
        // node with text: put a space before single-line text
        outNode.beforeText = reNl.test(node.value)
			? outNode.newline + outNode.indent + profile.indent(1)
			: ' ';
    }

	return outNode;
}
/**
 * Formats value of given node: for multiline text we should add a ` |` suffix
 * at the end of each line. Also ensure that text is perfectly aligned.
 * @param  {Node}    node
 * @param  {Profile} profile
 * @return {String|null}
 */
function formatNodeValue(node, profile) {
	if (node.value != null && reNl.test(node.value)) {
		const lines = splitByLines$1(node.value);
		const indent = profile.indent(1);
		const maxLength = lines.reduce((prev, line) => Math.max(prev, line.length), 0);

		return lines.map((line, i) => `${i ? indent : ''}${pad(line, maxLength)} |`).join('\n');
	}

	return node.value;
}

function pad(text, len) {
	while (text.length < len) {
		text += ' ';
	}

	return text;
}

const reNl$1 = /\n|\r/;
const secondaryAttrs = {
	none:   '[ SECONDARY_ATTRS]',
	round:  '[(SECONDARY_ATTRS)]',
	curly:  '[{SECONDARY_ATTRS}]',
	square: '[[SECONDARY_ATTRS]'
};

/**
 * Renders given parsed Emmet abbreviation as Slim, formatted according to
 * `profile` options
 * @param  {Node}    tree      Parsed Emmet abbreviation
 * @param  {Profile} profile   Output profile
 * @param  {Object}  [options] Additional formatter options
 * @return {String}
 */
function slim(tree, profile, options) {
	options = options || {};
	const SECONDARY_ATTRS = options.attributeWrap
		&& secondaryAttrs[options.attributeWrap]
		|| secondaryAttrs.none;

	const booleanAttr = SECONDARY_ATTRS === secondaryAttrs.none
		? attr => `${attr.name}=true`
		: attr => attr.name;

	const nodeOptions = {
		open: `[NAME][PRIMARY_ATTRS]${SECONDARY_ATTRS}[SELF_CLOSE]`,
		selfClose: '/',
		attributes: {
			secondary(attrs) {
				return attrs.map(attr => attr.isBoolean
					? booleanAttr(attr)
					: `${attr.name}=${profile.quote(attr.value)}`
				).join(' ');
			}
		}
	};

	return render(tree, options.field, (outNode, renderFields) => {
		outNode = indentFormat(outNode, profile, nodeOptions);
		outNode = updateFormatting$1(outNode, profile);

		if (!handlePseudoSnippet(outNode)) {
			const node = outNode.node;

			// Do not generate fields for nodes with empty value and children
			// or if node is self-closed
			if (node.value || (!node.children.length && !node.selfClosing) ) {
				outNode.text = outNode.renderFields(formatNodeValue$1(node, profile));
			}
		}

        return outNode;
	});
}

/**
 * Updates formatting properties for given output node
 * NB Unlike HTML, Slim is indent-based format so some formatting options from
 * `profile` will not take effect, otherwise output will be broken
 * @param  {OutputNode} outNode Output wrapper of farsed abbreviation node
 * @param  {Profile}    profile Output profile
 * @return {OutputNode}
 */
function updateFormatting$1(outNode, profile) {
	const node = outNode.node;
	const parent = node.parent;

	// Edge case: a single inline-level child inside node without text:
	// allow it to be inlined
	if (profile.get('inlineBreak') === 0 && isInline$1(node, profile)
		&& !isRoot(parent) && parent.value == null && parent.children.length === 1) {
		outNode.beforeOpen = ': ';
	}

    if (!node.isTextOnly && node.value) {
        // node with text: put a space before single-line text
        outNode.beforeText = reNl$1.test(node.value)
			? outNode.newline + outNode.indent + profile.indent(1)
			: ' ';
    }

	return outNode;
}

/**
 * Formats value of given node: for multiline text we should precede each
 * line with `| ` with one-level deep indent
 * @param  {Node} node
 * @param  {Profile} profile
 * @return {String|null}
 */
function formatNodeValue$1(node, profile) {
	if (node.value != null && reNl$1.test(node.value)) {
		const indent = profile.indent(1);
		return splitByLines$1(node.value).map((line, i) => `${indent}${i ? ' ' : '|'} ${line}`).join('\n');
	}

	return node.value;
}

/**
 * Check if given node is inline-level
 * @param  {Node}  node
 * @param  {Profile}  profile
 * @return {Boolean}
 */
function isInline$1(node, profile) {
	return node && (node.isTextOnly || profile.isInline(node));
}

const reNl$2 = /\n|\r/;

/**
 * Renders given parsed Emmet abbreviation as Pug, formatted according to
 * `profile` options
 * @param  {Node}    tree      Parsed Emmet abbreviation
 * @param  {Profile} profile   Output profile
 * @param  {Object}  [options] Additional formatter options
 * @return {String}
 */
function pug(tree, profile, options) {
	options = options || {};
	const nodeOptions = {
		open: '[NAME][PRIMARY_ATTRS][(SECONDARY_ATTRS)]',
		attributes: {
			secondary(attrs) {
				return attrs.map(attr => attr.isBoolean ? attr.name : `${attr.name}=${profile.quote(attr.value)}`).join(', ');
			}
		}
	};

	return render(tree, options.field, outNode => {
		outNode = indentFormat(outNode, profile, nodeOptions);
		outNode = updateFormatting$2(outNode, profile);

		if (!handlePseudoSnippet(outNode)) {
			const node = outNode.node;
			// Do not generate fields for nodes with empty value and children
			// or if node is self-closed
			if (node.value || (!node.children.length && !node.selfClosing) ) {
				outNode.text = outNode.renderFields(formatNodeValue$2(node, profile));
			}
		}

        return outNode;
	});
}

/**
 * Updates formatting properties for given output node
 * NB Unlike HTML, Pug is indent-based format so some formatting options from
 * `profile` will not take effect, otherwise output will be broken
 * @param  {OutputNode} outNode Output wrapper of parsed abbreviation node
 * @param  {Profile}    profile Output profile
 * @return {OutputNode}
 */
function updateFormatting$2(outNode, profile) {
	const node = outNode.node;

    if (!node.isTextOnly && node.value) {
        // node with text: put a space before single-line text
        outNode.beforeText = reNl$2.test(node.value)
			? outNode.newline + outNode.indent + profile.indent(1)
			: ' ';
    }

	return outNode;
}

/**
 * Formats value of given node: for multiline text we should precede each
 * line with `| ` with one-level deep indent
 * @param  {Node} node
 * @param  {Profile} profile
 * @return {String|null}
 */
function formatNodeValue$2(node, profile) {
	if (node.value != null && reNl$2.test(node.value)) {
		const indent = profile.indent(1);
		return splitByLines$1(node.value).map(line => `${indent}| ${line}`).join('\n');
	}

	return node.value;
}

const supportedSyntaxed = { html, haml, slim, pug };

/**
 * Outputs given parsed abbreviation in specified syntax
 * @param {Node}     tree     Parsed abbreviation tree
 * @param {Profile}  profile  Output profile
 * @param {String}   [syntax] Output syntax. If not given, `html` syntax is used
 * @param {Function} options.field A function to output field/tabstop for
 * host editor. This function takes two arguments: `index` and `placeholder` and
 * should return a string that represents tabstop in host editor. By default
 * only a placeholder is returned
 * @example
 * {
 * 	field(index, placeholder) {
 * 		// return field in TextMate-style, e.g. ${1} or ${2:foo}
 * 		return `\${${index}${placeholder ? ':' + placeholder : ''}}`;
 *  }
 * }
 * @return {String}
 */
var index$3 = function(tree, profile, syntax, options) {
	if (typeof syntax === 'object') {
		options = syntax;
		syntax = null;
	}

	if (!supports(syntax)) {
		// fallback to HTML if given syntax is not supported
		syntax = 'html';
	}

	return supportedSyntaxed[syntax](tree, profile, options);
};

/**
 * Check if given syntax is supported
 * @param {String} syntax
 * @return {Boolean}
 */
function supports(syntax) {
	return !!syntax && syntax in supportedSyntaxed;
}

/**
 * Expands given abbreviation into code
 * @param  {String|Node} abbr    Abbreviation to parse or already parsed abbreviation
 * @param  {Object} options
 * @return {String}
 */
function expand(abbr, options) {
	options = options || {};

	if (typeof abbr === 'string') {
		abbr = parse$3(abbr, options);
	}

	return index$3(abbr, options.profile, options.syntax, options.format);
}

/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 * @param {String} Abbreviation to parse
 * @param  {Object} options
 * @return {Node}
 */
function parse$3(abbr, options) {
	return index(abbr)
	.use(index$1, options.snippets)
	.use(replaceVariables, options.variables)
	.use(index$2, options.text, options.addons);
}

/**
 * A wrapper for holding CSS value
 */
class CSSValue {
	constructor() {
		this.type = 'css-value';
		this.value = [];
	}

	get size() {
		return this.value.length;
	}

	add(value) {
		this.value.push(value);
	}

	has(value) {
		return this.value.indexOf(value) !== -1;
	}

	toString() {
		return this.value.join(' ');
	}
}

const HASH$1 = 35; // #
const DOT$2  = 46; // .

/**
 * Consumes a color token from given string
 * @param  {StreamReader} stream
 * @return {Color} Returns consumend color object, `undefined` otherwise
 */
var consumeColor = function(stream) {
	// supported color variations:
	// #abc   → #aabbccc
	// #0     → #000000
	// #fff.5 → rgba(255, 255, 255, 0.5)
	// #t     → transparent
	if (stream.peek() === HASH$1) {
		stream.start = stream.pos;
		stream.next();

		stream.eat(116) /* t */ || stream.eatWhile(isHex);
		const base = stream.current();

		// a hex color can be followed by `.num` alpha value
		stream.start = stream.pos;
		if (stream.eat(DOT$2) && !stream.eatWhile(isNumber)) {
			throw stream.error('Unexpected character for alpha value of color');
		}

		return new Color(base, stream.current());
	}
};

class Color {
	constructor(value, alpha) {
		this.type = 'color';
		this.raw = value;
		this.alpha = Number(alpha != null && alpha !== '' ? alpha : 1);
		value = value.slice(1); // remove #

		let r = 0, g = 0, b = 0;

		if (value === 't') {
			this.alpha = 0;
		} else {
			switch (value.length) {
				case 0:
					break;

				case 1:
					r = g = b = value + value;
					break;

				case 2:
					r = g = b = value;
					break;

				case 3:
					r = value[0] + value[0];
					g = value[1] + value[1];
					b = value[2] + value[2];
					break;

				default:
					value += value;
					r = value.slice(0, 2);
					g = value.slice(2, 4);
					b = value.slice(4, 6);
			}
		}

		this.r = parseInt(r, 16);
		this.g = parseInt(g, 16);
		this.b = parseInt(b, 16);
	}

	/**
	 * Output current color as hex value
	 * @param {Boolean} shor Produce short value (e.g. #fff instead of #ffffff), if possible
	 * @return {String}
	 */
	toHex(short) {
		const fn = (short && isShortHex(this.r) && isShortHex(this.g) && isShortHex(this.b))
			? toShortHex : toHex;

		return '#' + fn(this.r)  + fn(this.g) + fn(this.b);
	}

	/**
	 * Output current color as `rgba?(...)` CSS color
	 * @return {String}
	 */
	toRGB() {
		const values = [this.r, this.g, this.b];
		if (this.alpha !== 1) {
			values.push(this.alpha.toFixed(8).replace(/\.?0+$/, ''));
		}

		return `${values.length === 3 ? 'rgb' : 'rgba'}(${values.join(', ')})`;
	}

	toString(short) {
		if (!this.r && !this.g && !this.b && !this.alpha) {
			return 'transparent';
		}
		return this.alpha === 1 ? this.toHex(short) : this.toRGB();
	}
}

/**
 * Check if given code is a hex value (/0-9a-f/)
 * @param  {Number}  code
 * @return {Boolean}
 */
function isHex(code) {
	return isNumber(code) || isAlpha(code, 65, 70); // A-F
}

function isShortHex(hex) {
	return !(hex % 17);
}

function toShortHex(num) {
	return (num >> 4).toString(16);
}

function toHex(num) {
	return pad$1(num.toString(16), 2);
}

function pad$1(value, len) {
	while (value.length < len) {
		value = '0' + value;
	}
	return value;
}

/**
 * @param  {Number}  code
 * @return {Boolean}
 */
function isAlphaNumericWord(code) {
	return isNumber(code) || isAlphaWord(code);
}

/**
 * @param  {Number}  code
 * @return {Boolean}
 */
function isAlphaWord(code) {
	return code === 95 /* _ */ || isAlpha(code);
}

const PERCENT = 37; // %
const DOT$1$1     = 46; // .
const DASH$1    = 45; // -

/**
 * Consumes numeric CSS value (number with optional unit) from current stream,
 * if possible
 * @param  {StreamReader} stream
 * @return {NumericValue}
 */
var consumeNumericValue = function(stream) {
	stream.start = stream.pos;
	if (eatNumber(stream)) {
		const num = stream.current();
		stream.start = stream.pos;

		// eat unit, which can be a % or alpha word
		stream.eat(PERCENT) || stream.eatWhile(isAlphaWord);
		return new NumericValue(num, stream.current());
	}
};

/**
 * A numeric CSS value with optional unit
 */
class NumericValue {
	constructor(value, unit) {
		this.type = 'numeric';
		this.value = Number(value);
		this.unit = unit || '';
	}

	toString() {
		return `${this.value}${this.unit}`;
	}
}

/**
 * Eats number value from given stream
 * @param  {StreamReader} stream
 * @return {Boolean} Returns `true` if number was consumed
 */
function eatNumber(stream) {
	const start = stream.pos;
	const negative = stream.eat(DASH$1);
	let hadDot = false, consumed = false, code;

	while (!stream.eof()) {
		code = stream.peek();

		// either a second dot or not a number: stop parsing
		if (code === DOT$1$1 ? hadDot : !isNumber(code)) {
			break;
		}

		consumed = true;

		if (code === DOT$1$1) {
			hadDot = true;
		}

		stream.next();
	}

	if (negative && !consumed) {
		// edge case: consumed dash only, bail out
		stream.pos = start;
	}

	return start !== stream.pos;
}

const DOLLAR$1 = 36; // $
const DASH$2   = 45; // -
const AT$1     = 64; // @

/**
 * Consumes a keyword: either a variable (a word that starts with $ or @) or CSS
 * keyword or shorthand
 * @param  {StreamReader} stream
 * @param  {Boolean} [short] Use short notation for consuming value.
 * The difference between “short” and “full” notation is that first one uses
 * alpha characters only and used for extracting keywords from abbreviation,
 * while “full” notation also supports numbers and dashes
 * @return {String} Consumed variable
 */
var consumeKeyword = function(stream, short) {
	stream.start = stream.pos;

	if (stream.eat(DOLLAR$1) || stream.eat(AT$1)) {
		// SCSS or LESS variable
		stream.eatWhile(isVariableName);
	} else if (short) {
		stream.eatWhile(isAlphaWord);
	} else {
		stream.eatWhile(isKeyword);
	}

	return stream.start !== stream.pos ? new Keyword(stream.current()) : null;
};

class Keyword {
	constructor(value) {
		this.type = 'keyword';
		this.value = value;
	}

	toString() {
		return this.value;
	}
}

function isKeyword(code) {
	return isAlphaNumericWord(code) || code === DASH$2;
}

function isVariableName(code) {
	return code === 45 /* - */ || isAlphaNumericWord(code);
}

const opt$1 = { throws: true };

/**
 * Consumes 'single' or "double"-quoted string from given string, if possible
 * @param  {StreamReader} stream
 * @return {String}
 */
var consumeQuoted$1 = function(stream) {
	if (eatQuoted(stream, opt$1)) {
		return new QuotedString(stream.current());
	}
};

class QuotedString {
	constructor(value) {
		this.type = 'string';
		this.value = value;
	}

	toString() {
		return this.value;
	}
}

const LBRACE = 40; // (
const RBRACE = 41; // )
const COMMA  = 44; // ,

/**
 * Consumes arguments from given string.
 * Arguments are comma-separated list of CSS values inside round braces, e.g.
 * `(1, a2, 'a3')`. Nested lists and quoted strings are supported
 * @param  {StreamReader} stream
 * @return {Array}        Array of arguments, `null` if arguments cannot be consumed
 */
function consumeArgumentList(stream) {
	if (!stream.eat(LBRACE)) {
		// not an argument list
		return null;
	}

	let level = 1, code, arg;
	const argsList = [];

	while (!stream.eof()) {
		if (arg = consumeArgument(stream)) {
			argsList.push(arg);
		} else {
			// didn’t consumed argument, expect argument separator or end-of-arguments
			stream.eatWhile(isWhiteSpace);

			if (stream.eat(RBRACE)) {
				// end of arguments list
				break;
			}

			if (!stream.eat(COMMA)) {
				throw stream.error('Expected , or )');
			}
		}
	}

	return argsList;
}

/**
 * Consumes a single argument. An argument is a `CSSValue`, e.g. it could be
 * a space-separated string of value
 * @param  {StreamReader} stream
 * @return {CSSValue}
 */
function consumeArgument(stream) {
	const result = new CSSValue();
	let value;

	while (!stream.eof()) {
		stream.eatWhile(isWhiteSpace);
		value = consumeNumericValue(stream) || consumeColor(stream)
			|| consumeQuoted$1(stream) || consumeKeywordOrFunction(stream);

		if (!value) {
			break;
		}

		result.add(value);
	}

	return result.size ? result : null;
}

/**
 * Consumes either function call like `foo()` or keyword like `foo`
 * @param  {StreamReader} stream
 * @return {Keyword|FunctionCall}
 */
function consumeKeywordOrFunction(stream) {
	const kw = consumeKeyword(stream);
	if (kw) {
		const args = consumeArgumentList(stream);
		return args ? new FunctionCall(kw.toString(), args) : kw;
	}
}

class FunctionCall {
	/**
	 * @param {String} name Function name
	 * @param {Array}  args Function arguments
	 */
	constructor(name, args) {
		this.type = 'function';
		this.name = name;
		this.args = args || [];
	}

	toString() {
		return `${this.name}(${this.args.join(', ')})`;
	}
}

const EXCL$1   = 33; // !
const DOLLAR$2 = 36; // $
const PLUS   = 43; // +
const DASH   = 45; // -
const COLON$1  = 58; // :
const AT     = 64; // @

/**
 * Parses given Emmet CSS abbreviation and returns it as parsed Node tree
 * @param {String} abbr
 * @return {Node}
 */
var index$4 = function(abbr) {
	const root = new Node();
	const stream = new StreamReader(abbr);
	while (!stream.eof()) {
		let node = new Node(consumeIdent(stream));
		node.value = consumeValue(stream);

		const args = consumeArgumentList(stream);
		if (args) {
			// technically, arguments in CSS are anonymous Emmet Node attributes,
			// but since Emmet can support only one anonymous, `null`-name
			// attribute (for good reasons), we’ll use argument index as name
			for (let i = 0; i < args.length; i++) {
				node.setAttribute(String(i), args[i]);
			}
		}

		// Consume `!important` modifier at the end of expression
		if (stream.eat(EXCL$1)) {
			node.value.add('!');
		}

		root.appendChild(node);

		// CSS abbreviations cannot be nested, only listed
		if (!stream.eat(PLUS)) {
			break;
		}
	}

	if (!stream.eof()) {
		throw stream.error('Unexpected character');
	}

	return root;
};

/**
 * Consumes CSS property identifier from given stream
 * @param  {StreamReader} stream
 * @return {String}
 */
function consumeIdent(stream) {
	stream.start = stream.pos;
	stream.eatWhile(isIdentPrefix);
	stream.eatWhile(isIdent);
	return stream.start !== stream.pos ? stream.current() : null;
}

/**
 * Consumes embedded value from Emmet CSS abbreviation stream
 * @param  {StreamReader} stream
 * @return {CSSValue}
 */
function consumeValue(stream) {
	const values = new CSSValue();
	let value;

	while (!stream.eof()) {
		// use colon as value separator
		stream.eat(COLON$1);
		if (value = consumeNumericValue(stream) || consumeColor(stream)) {
			// edge case: a dash after unit-less numeric value or color should
			// be treated as value separator, not negative sign
			if (!value.unit) {
				stream.eat(DASH);
			}
		} else {
			stream.eat(DASH);
			value = consumeKeyword(stream, true);
		}

		if (!value) {
			break;
		}

		values.add(value);
	}

	return values;
}

/**
 * @param  {Number}  code
 * @return {Boolean}
 */
function isIdent(code) {
	return isAlphaWord(code);
}

/**
 * @param  {Number}  code
 * @return {Boolean}
 */
function isIdentPrefix(code) {
	return code === AT || code === DOLLAR$2 || code === EXCL$1;
}

const DASH$3 = 45; // -

/**
 * Calculates fuzzy match score of how close `abbr` matches given `string`.
 * @param  {String} abbr        Abbreviation to score
 * @param  {String} string      String to match
 * @param  {Number} [fuzziness] Fuzzy factor
 * @return {Number}             Match score
 */
var stringScore = function(abbr, string) {
    abbr = abbr.toLowerCase();
    string = string.toLowerCase();

    if (abbr === string) {
        return 1;
    }

    // a string MUST start with the same character as abbreviation
    if (!string || abbr.charCodeAt(0) !== string.charCodeAt(0)) {
        return 0;
    }

    const abbrLength = abbr.length;
    const stringLength = string.length;
    let i = 1, j = 1, score = stringLength;
    let ch1, ch2, found, acronym;

    while (i < abbrLength) {
        ch1 = abbr.charCodeAt(i);
        found = false;
        acronym = false;

        while (j < stringLength) {
            ch2 = string.charCodeAt(j);

            if (ch1 === ch2) {
                found = true;
                score += (stringLength - j) * (acronym ? 2 : 1);
                break;
            }

            // add acronym bonus for exactly next match after unmatched `-`
            acronym = ch2 === DASH$3;
            j++;
        }

        if (!found) {
            break;
        }

        i++;
    }

    return score && score * (i / abbrLength) / sum(stringLength);
};

/**
 * Calculates sum of first `n` natural numbers, e.g. 1+2+3+...n
 * @param  {Number} n
 * @return {Number}
 */
function sum(n) {
    return n * (n + 1) / 2;
}

const reProperty = /^([a-z\-]+)(?:\s*:\s*([^\n\r]+))?$/;
const DASH$1$1 = 45; // -

/**
 * Creates a special structure for resolving CSS properties from plain CSS
 * snippets.
 * Almost all CSS snippets are aliases for real CSS properties with available
 * value variants, optionally separated by `|`. Most values are keywords that
 * can be fuzzy-resolved as well. Some CSS properties are shorthands for other,
 * more specific properties, like `border` and `border-style`. For such cases
 * keywords from more specific properties should be available in shorthands too.
 * @param {Snippet[]} snippets
 * @return {CSSSnippet[]}
 */
var cssSnippets = function(snippets) {
    return nest( snippets.map(snippet => new CSSSnippet(snippet.key, snippet.value)) );
};

class CSSSnippet {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.property = null;

        // detect if given snippet is a property
        const m = value && value.match(reProperty);
        if (m) {
            this.property = m[1];
            this.value = m[2];
        }

        this.dependencies = [];
    }

    addDependency(dep) {
        this.dependencies.push(dep);
    }

    get defaulValue() {
        return this.value != null ? splitValue(this.value)[0] : null;
    }

    /**
     * Returns list of unique keywords for current CSS snippet and its dependencies
     * @return {String[]}
     */
    keywords() {
        const stack = [];
        const keywords = new Set();
        let i = 0, item, candidates;

        if (this.property) {
            // scan valid CSS-properties only
            stack.push(this);
        }

        while (i < stack.length) {
            // NB Keep items in stack instead of push/pop to avoid possible
            // circular references
            item = stack[i++];

            if (item.value) {
                candidates = splitValue(item.value).filter(isKeyword$1);

                // extract possible keywords from snippet value
                for (let j = 0; j < candidates.length; j++) {
                    keywords.add(candidates[j].trim());
                }

                // add dependencies into scan stack
                for (let j = 0, deps = item.dependencies; j < deps.length; j++) {
                    if (stack.indexOf(deps[j]) === -1) {
                        stack.push(deps[j]);
                    }
                }
            }
        }

        return Array.from(keywords);
    }
}

/**
 * Nests more specific CSS properties into shorthand ones, e.g.
 * background-position-x -> background-position -> background
 * @param  {CSSSnippet[]} snippets
 * @return {CSSSnippet[]}
 */
function nest(snippets) {
    snippets = snippets.sort(snippetsSort);
    const stack = [];

    // For sorted list of CSS properties, create dependency graph where each
    // shorthand property contains its more specific one, e.g.
    // backgound -> background-position -> background-position-x
    for (let i = 0, cur, prev; i < snippets.length; i++) {
        cur = snippets[i];

        if (!cur.property) {
            // not a CSS property, skip it
            continue;
        }

        // Check if current property belongs to one from parent stack.
        // Since `snippets` array is sorted, items are perfectly aligned
        // from shorthands to more specific variants
        while (stack.length) {
            prev = stack[stack.length - 1];

            if (cur.property.indexOf(prev.property) === 0
                && cur.property.charCodeAt(prev.property.length) === DASH$1$1) {
                prev.addDependency(cur);
                stack.push(cur);
                break;
            }

            stack.pop();
        }

        if (!stack.length) {
            stack.push(cur);
        }
    }

    return snippets;
}

/**
 * A sorting function for array of snippets
 * @param  {CSSSnippet} a
 * @param  {CSSSnippet} b
 * @return {Number}
 */
function snippetsSort(a, b) {
    if (a.key === b.key) {
        return 0;
    }

    return a.key < b.key ? -1 : 1;
}

/**
 * Check if given string is a keyword candidate
 * @param  {String}  str
 * @return {Boolean}
 */
function isKeyword$1(str) {
    return /^\s*[\w\-]+/.test(str);
}

function splitValue(value) {
    return String(value).split('|');
}

const globalKeywords = ['auto', 'inherit', 'unset'];
const unitlessProperties = [
    'z-index', 'line-height', 'opacity', 'font-weight', 'zoom',
    'flex', 'flex-grow', 'flex-shrink'
];

const defaultOptions$3 = {
	intUnit: 'px',
	floatUnit: 'em',
	unitAliases: {
		e :'em',
		p: '%',
		x: 'ex',
		r: 'rem'
	},
	fuzzySearchMinScore: 0
};

/**
 * For every node in given `tree`, finds matching snippet from `registry` and
 * updates node with snippet data.
 *
 * This resolver uses fuzzy matching for searching matched snippets and their
 * keyword values.
 */

var index$5 = function(tree, registry, options) {
	const snippets = convertToCSSSnippets(registry);
	options = {
		intUnit: (options && options.intUnit) || defaultOptions$3.intUnit,
		floatUnit: (options && options.floatUnit) || defaultOptions$3.floatUnit,
		unitAliases: Object.assign({}, defaultOptions$3.unitAliases, options && options.unitAliases),
		fuzzySearchMinScore: (options && options.fuzzySearchMinScore) || defaultOptions$3.fuzzySearchMinScore
	};
	tree.walk(node => resolveNode$1(node, snippets, options));
	return tree;
};

function convertToCSSSnippets(registry) {
    return cssSnippets(registry.all({type: 'string'}))
}

/**
 * Resolves given node: finds matched CSS snippets using fuzzy match and resolves
 * keyword aliases from node value
 * @param  {Node} node
 * @param  {CSSSnippet[]} snippets
 * @param  {Object} options
 * @return {Node}
 */
function resolveNode$1(node, snippets, options) {
	const snippet = findBestMatch(node.name, snippets, 'key', options.fuzzySearchMinScore);

	if (!snippet) {
		// Edge case: `!important` snippet
		return node.name === '!' ? setNodeAsText(node, '!important') : node;
	}

	return snippet.property
		? resolveAsProperty(node, snippet, options)
		: resolveAsSnippet(node, snippet);
}

/**
 * Resolves given parsed abbreviation node as CSS propery
 * @param {Node} node
 * @param {CSSSnippet} snippet
 * @param  {Object} formatOptions
 * @return {Node}
 */
function resolveAsProperty(node, snippet, formatOptions) {
    const abbr = node.name;
	node.name = snippet.property;

	if (node.value && typeof node.value === 'object') {
		// resolve keyword shortcuts
		const keywords = snippet.keywords();

		if (!node.value.size) {
			// no value defined, try to resolve unmatched part as a keyword alias
			let kw = findBestMatch(getUnmatchedPart(abbr, snippet.key), keywords);

            if (!kw) {
                // no matching value, try to get default one
                kw = snippet.defaulValue;
                if (kw && kw.indexOf('${') === -1) {
                    // Quick and dirty test for existing field. If not, wrap
                    // default value in a field
                    kw = `\${1:${kw}}`;
                }
            }

			if (kw) {
				node.value.add(kw);
			}
		} else {
			// replace keyword aliases in current node value
			for (let i = 0, token; i < node.value.value.length; i++) {
				token = node.value.value[i];

				if (token === '!') {
					token = `${!i ? '${1} ' : ''}!important`;
				} else if (isKeyword$2(token)) {
					token = findBestMatch(token.value, keywords)
						|| findBestMatch(token.value, globalKeywords)
						|| token;
				} else if (isNumericValue(token)) {
                    token = resolveNumericValue(node.name, token, formatOptions);
                }

                node.value.value[i] = token;
			}
		}
	}

	return node;
}

/**
 * Resolves given parsed abbreviation node as a snippet: a plain code chunk
 * @param {Node} node
 * @param {CSSSnippet} snippet
 * @return {Node}
 */
function resolveAsSnippet(node, snippet) {
	return setNodeAsText(node, snippet.value);
}

/**
 * Sets given parsed abbreviation node as a text snippet
 * @param {Node} node
 * @param {String} text
 * @return {Node}
 */
function setNodeAsText(node, text) {
	node.name = null;
	node.value = text;
	return node;
}

/**
 * Finds best matching item from `items` array
 * @param {String} abbr  Abbreviation to match
 * @param {Array}  items List of items for match
 * @param {String} [key] If `items` is a list of objects, use `key` as object
 * property to test against
 * @param {Number} fuzzySearchMinScore The minimum score the best matched item should have to be a valid match.
 * @return {*}
 */
function findBestMatch(abbr, items, key, fuzzySearchMinScore) {
	if (!abbr) {
		return null;
	}

	let matchedItem = null;
	let maxScore = 0;
	fuzzySearchMinScore = fuzzySearchMinScore || 0;

	for (let i = 0, item; i < items.length; i++) {
		item = items[i];
		const score = stringScore(abbr, getScoringPart(item, key));

		if (score === 1) {
			// direct hit, no need to look further
			return item;
		}

		if (score && score >= maxScore) {
			maxScore = score;
			matchedItem = item;
		}
	}

	return maxScore >= fuzzySearchMinScore ? matchedItem : null;
}

function getScoringPart(item, key) {
    const value = item && typeof item === 'object' ? item[key] : item;
    const m = (value || '').match(/^[\w-@]+/);
    return m ? m[0] : value;
}

/**
 * Returns a part of `abbr` that wasn’t directly matched agains `string`.
 * For example, if abbreviation `poas` is matched against `position`, the unmatched part will be `as`
 * since `a` wasn’t found in string stream
 * @param {String} abbr
 * @param {String} string
 * @return {String}
 */
function getUnmatchedPart(abbr, string) {
	for (let i = 0, lastPos = 0; i < abbr.length; i++) {
		lastPos = string.indexOf(abbr[i], lastPos);
		if (lastPos === -1) {
			return abbr.slice(i);
		}
        lastPos++;
	}

	return '';
}

/**
 * Check if given CSS value token is a keyword
 * @param {*} token
 * @return {Boolean}
 */
function isKeyword$2(token) {
	return tokenTypeOf(token, 'keyword');
}

/**
 * Check if given CSS value token is a numeric value
 * @param  {*}  token
 * @return {Boolean}
 */
function isNumericValue(token) {
    return tokenTypeOf(token, 'numeric');
}

function tokenTypeOf(token, type) {
	return token && typeof token === 'object' && token.type === type;
}

/**
 * Resolves numeric value for given CSS property
 * @param  {String} property    CSS property name
 * @param  {NumericValue} token CSS numeric value token
 * @param  {Object} formatOptions Formatting options for units
 * @return {NumericValue}
 */
function resolveNumericValue(property, token, formatOptions) {
    if (token.unit) {
        token.unit = formatOptions.unitAliases[token.unit] || token.unit;
    } else if (token.value !== 0 && unitlessProperties.indexOf(property) === -1) {
        // use `px` for integers, `em` for floats
        // NB: num|0 is a quick alternative to Math.round(0)
        token.unit = token.value === (token.value|0) ? formatOptions.intUnit : formatOptions.floatUnit;
    }

    return token;
}

const defaultOptions$4 = {
	shortHex: true,
	format: {
		between: ': ',
		after: ';'
	}
};

/**
 * Renders given parsed Emmet CSS abbreviation as CSS-like
 * stylesheet, formatted according to `profile` options
 * @param  {Node}     tree    Parsed Emmet abbreviation
 * @param  {Profile}  profile Output profile
 * @param  {Object}  [options] Additional formatter options
 * @return {String}
 */
function css(tree, profile, options) {
	options = Object.assign({}, defaultOptions$4, options);

	return render(tree, options.field, outNode => {
		const node = outNode.node;
		let value = String(node.value || '');

		if (node.attributes.length) {
			const fieldValues = node.attributes.map(attr => stringifyAttribute(attr, options));
			value = injectFields(value, fieldValues);
		}

		outNode.open = node.name && profile.name(node.name);
		outNode.afterOpen = options.format.between;
		outNode.text = outNode.renderFields(value || null);

		if (outNode.open && (!outNode.text || !outNode.text.endsWith(';'))) {
			outNode.afterText = options.format.after;
		}

		if (profile.get('format')) {
			outNode.newline = '\n';
			if (tree.lastChild !== node) {
				outNode.afterText += outNode.newline;
			}
		}

		return outNode;
	});
}

/**
 * Injects given field values at each field of given string
 * @param  {String}   string
 * @param  {String[]} attributes
 * @return {FieldString}
 */
function injectFields(string, values) {
	const fieldsModel = parse$2(string);
	const fieldsAmount = fieldsModel.fields.length;

	if (fieldsAmount) {
		values = values.slice();
		if (values.length > fieldsAmount) {
			// More values that output fields: collapse rest values into
			// a single token
			values = values.slice(0, fieldsAmount - 1)
				.concat(values.slice(fieldsAmount - 1).join(', '));
		}

		while (values.length) {
			const value = values.shift();
			const field = fieldsModel.fields.shift();
			const delta = value.length - field.length;

			fieldsModel.string = fieldsModel.string.slice(0, field.location)
				+ value
				+ fieldsModel.string.slice(field.location + field.length);

			// Update location of the rest fields in string
			for (let i = 0, il = fieldsModel.fields.length; i < il; i++) {
				fieldsModel.fields[i].location += delta;
			}
		}
	}

	return fieldsModel;
}

function stringifyAttribute(attr, options) {
	if (attr.value && typeof attr.value === 'object' && attr.value.type === 'css-value') {
		return attr.value.value
		.map(token => {
			if (token && typeof token === 'object') {
				return token.type === 'color'
					? token.toString(options.shortHex)
					: token.toString();
			}

			return String(token);
		})
		.join(' ');
	}

	return attr.value != null ? String(attr.value) : '';
}

const syntaxFormat = {
	css: {
		between: ': ',
		after: ';'
	},
	scss: 'css',
	less: 'css',
	sass: {
		between: ': ',
		after: ''
	},
	stylus: {
		between: ' ',
		after: ''
	}
};

/**
 * Outputs given parsed abbreviation in specified stylesheet syntax
 * @param {Node}     tree     Parsed abbreviation tree
 * @param {Profile}  profile  Output profile
 * @param {String}   [syntax] Output syntax. If not given, `css` syntax is used
 * @param {Function} options.field A function to output field/tabstop for
 * host editor. This function takes two arguments: `index` and `placeholder` and
 * should return a string that represents tabstop in host editor. By default
 * only a placeholder is returned
 * @example
 * {
 * 	field(index, placeholder) {
 * 		// return field in TextMate-style, e.g. ${1} or ${2:foo}
 * 		return `\${${index}${placeholder ? ':' + placeholder : ''}}`;
 *  }
 * }
 * @return {String}
 */
var index$6 = function(tree, profile, syntax, options) {
	if (typeof syntax === 'object') {
		options = syntax;
		syntax = null;
	}

	if (!supports$1(syntax)) {
		// fallback to CSS if given syntax is not supported
		syntax = 'css';
	}

	options = Object.assign({}, options, {
		format: getFormat(syntax, options)
	});

	// CSS abbreviations doesn’t support nesting so simply
	// output root node children
	return css(tree, profile, options);
};

/**
 * Check if given syntax is supported
 * @param {String} syntax
 * @return {Boolean}
 */
function supports$1(syntax) {
	return !!syntax && syntax in syntaxFormat;
}

/**
 * Returns formatter object for given syntax
 * @param  {String} syntax
 * @param  {Object} [options]
 * @return {Object} Formatter object as defined in `syntaxFormat`
 */
function getFormat(syntax, options) {
	let format = syntaxFormat[syntax];
	if (typeof format === 'string') {
		format = syntaxFormat[format];
	}

	return Object.assign({}, format, options && options.stylesheet);
}

/**
 * Expands given abbreviation into code
 * @param  {String|Node} abbr    Abbreviation to parse or already parsed abbreviation
 * @param  {Object} options
 * @return {String}
 */
function expand$1(abbr, options) {
	options = options || {};

	if (typeof abbr === 'string') {
		abbr = parse$4(abbr, options);
	}

	return index$6(abbr, options.profile, options.syntax, options.format);
}

/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 * @param {String|Node} abbr Abbreviation to parse or already parsed abbreviation
 * @param  {Object} options
 * @return {Node}
 */
function parse$4(abbr, options) {
	if (typeof abbr === 'string') {
		abbr = index$4(abbr);
	}

	return abbr.use(index$5, options.snippets, options.format ? options.format.stylesheet : {});
}

var html$1 = {
	"a": "a[href]",
	"a:blank": "a[href='http://${0}' target='_blank' rel='noopener noreferrer']",
	"a:link": "a[href='http://${0}']",
	"a:mail": "a[href='mailto:${0}']",
	"a:tel": "a[href='tel:+${0}']",
	"abbr": "abbr[title]",
	"acr|acronym": "acronym[title]",
	"base": "base[href]/",
	"basefont": "basefont/",
	"br": "br/",
	"frame": "frame/",
	"hr": "hr/",
	"bdo": "bdo[dir]",
	"bdo:r": "bdo[dir=rtl]",
	"bdo:l": "bdo[dir=ltr]",
	"col": "col/",
	"link": "link[rel=stylesheet href]/",
	"link:css": "link[href='${1:style}.css']",
	"link:print": "link[href='${1:print}.css' media=print]",
	"link:favicon": "link[rel='shortcut icon' type=image/x-icon href='${1:favicon.ico}']",
	"link:mf|link:manifest": "link[rel='manifest' href='${1:manifest.json}']",
	"link:touch": "link[rel=apple-touch-icon href='${1:favicon.png}']",
	"link:rss": "link[rel=alternate type=application/rss+xml title=RSS href='${1:rss.xml}']",
	"link:atom": "link[rel=alternate type=application/atom+xml title=Atom href='${1:atom.xml}']",
	"link:im|link:import": "link[rel=import href='${1:component}.html']",
	"meta": "meta/",
	"meta:utf": "meta[http-equiv=Content-Type content='text/html;charset=UTF-8']",
	"meta:vp": "meta[name=viewport content='width=${1:device-width}, initial-scale=${2:1.0}']",
	"meta:compat": "meta[http-equiv=X-UA-Compatible content='${1:IE=7}']",
	"meta:edge": "meta:compat[content='${1:ie=edge}']",
	"meta:redirect": "meta[http-equiv=refresh content='0; url=${1:http://example.com}']",
	"style": "style",
	"script": "script[!src]",
	"script:src": "script[src]",
	"img": "img[src alt]/",
	"img:s|img:srcset": "img[srcset src alt]",
	"img:z|img:sizes": "img[sizes srcset src alt]",
	"picture": "picture",
	"src|source": "source/",
	"src:sc|source:src": "source[src type]",
	"src:s|source:srcset": "source[srcset]",
	"src:t|source:type": "source[srcset type='${1:image/}']",
	"src:z|source:sizes": "source[sizes srcset]",
	"src:m|source:media": "source[media='(${1:min-width: })' srcset]",
	"src:mt|source:media:type": "source:media[type='${2:image/}']",
	"src:mz|source:media:sizes": "source:media[sizes srcset]",
	"src:zt|source:sizes:type": "source[sizes srcset type='${1:image/}']",
	"iframe": "iframe[src frameborder=0]",
	"embed": "embed[src type]/",
	"object": "object[data type]",
	"param": "param[name value]/",
	"map": "map[name]",
	"area": "area[shape coords href alt]/",
	"area:d": "area[shape=default]",
	"area:c": "area[shape=circle]",
	"area:r": "area[shape=rect]",
	"area:p": "area[shape=poly]",
	"form": "form[action]",
	"form:get": "form[method=get]",
	"form:post": "form[method=post]",
	"label": "label[for]",
	"input": "input[type=${1:text}]/",
	"inp": "input[name=${1} id=${1}]",
	"input:h|input:hidden": "input[type=hidden name]",
	"input:t|input:text": "inp[type=text]",
	"input:search": "inp[type=search]",
	"input:email": "inp[type=email]",
	"input:url": "inp[type=url]",
	"input:p|input:password": "inp[type=password]",
	"input:datetime": "inp[type=datetime]",
	"input:date": "inp[type=date]",
	"input:datetime-local": "inp[type=datetime-local]",
	"input:month": "inp[type=month]",
	"input:week": "inp[type=week]",
	"input:time": "inp[type=time]",
	"input:tel": "inp[type=tel]",
	"input:number": "inp[type=number]",
	"input:color": "inp[type=color]",
	"input:c|input:checkbox": "inp[type=checkbox]",
	"input:r|input:radio": "inp[type=radio]",
	"input:range": "inp[type=range]",
	"input:f|input:file": "inp[type=file]",
	"input:s|input:submit": "input[type=submit value]",
	"input:i|input:image": "input[type=image src alt]",
	"input:b|input:button": "input[type=button value]",
    "input:reset": "input:button[type=reset]",
	"isindex": "isindex/",
	"select": "select[name=${1} id=${1}]",
	"select:d|select:disabled": "select[disabled.]",
	"opt|option": "option[value]",
	"textarea": "textarea[name=${1} id=${1} cols=${2:30} rows=${3:10}]",
	"marquee": "marquee[behavior direction]",
	"menu:c|menu:context": "menu[type=context]",
	"menu:t|menu:toolbar": "menu[type=toolbar]",
	"video": "video[src]",
	"audio": "audio[src]",
	"html:xml": "html[xmlns=http://www.w3.org/1999/xhtml]",
	"keygen": "keygen/",
	"command": "command/",
	"btn:s|button:s|button:submit" : "button[type=submit]",
	"btn:r|button:r|button:reset" : "button[type=reset]",
	"btn:d|button:d|button:disabled" : "button[disabled.]",
	"fst:d|fset:d|fieldset:d|fieldset:disabled" : "fieldset[disabled.]",

	"bq": "blockquote",
	"fig": "figure",
	"figc": "figcaption",
	"pic": "picture",
	"ifr": "iframe",
	"emb": "embed",
	"obj": "object",
	"cap": "caption",
	"colg": "colgroup",
	"fst": "fieldset",
	"btn": "button",
	"optg": "optgroup",
	"tarea": "textarea",
	"leg": "legend",
	"sect": "section",
	"art": "article",
	"hdr": "header",
	"ftr": "footer",
	"adr": "address",
	"dlg": "dialog",
	"str": "strong",
	"prog": "progress",
	"mn": "main",
	"tem": "template",
	"fset": "fieldset",
	"datag": "datagrid",
	"datal": "datalist",
	"kg": "keygen",
	"out": "output",
	"det": "details",
	"cmd": "command",

	"ri:d|ri:dpr": "img:s",
	"ri:v|ri:viewport": "img:z",
	"ri:a|ri:art": "pic>src:m+img",
	"ri:t|ri:type": "pic>src:t+img",

	"!!!": "{<!DOCTYPE html>}",
	"doc": "html[lang=${lang}]>(head>meta[charset=${charset}]+meta:vp+meta:edge+title{${1:Document}})+body",
	"!|html:5": "!!!+doc",

	"c": "{<!-- ${0} -->}",
	"cc:ie": "{<!--[if IE]>${0}<![endif]-->}",
	"cc:noie": "{<!--[if !IE]><!-->${0}<!--<![endif]-->}"
};

var css$1 = {
	"@f": "@font-face {\n\tfont-family: ${1};\n\tsrc: url(${1});\n}",
	"@ff": "@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}",
	"@i|@import": "@import url(${0});",
	"@kf": "@keyframes ${1:identifier} {\n\t${2}\n}",
	"@m|@media": "@media ${1:screen} {\n\t${0}\n}",
	"ac": "align-content:flex-start|flex-end|center|space-between|space-around|stretch",
	"ai": "align-items:flex-start|flex-end|center|baseline|stretch",
	"anim": "animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode}",
	"animdel": "animation-delay:${1:time}",
	"animdir": "animation-direction:normal|reverse|alternate|alternate-reverse",
	"animdur": "animation-duration:${1:0}s",
	"animfm": "animation-fill-mode:both|forwards|backwards",
	"animic": "animation-iteration-count:1|infinite",
	"animn": "animation-name",
	"animps": "animation-play-state:running|paused",
	"animtf": "animation-timing-function:linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1})",
	"ap": "appearance:none",
	"as": "align-self:auto|flex-start|flex-end|center|baseline|stretch",
	"b": "bottom",
	"bd": "border:${1:1px} ${2:solid} ${3:#000}",
	"bdb": "border-bottom:${1:1px} ${2:solid} ${3:#000}",
	"bdbc": "border-bottom-color:#${1:000}",
	"bdbi": "border-bottom-image:url(${0})",
	"bdbk": "border-break:close",
	"bdbli": "border-bottom-left-image:url(${0})|continue",
	"bdblrs": "border-bottom-left-radius",
	"bdbri": "border-bottom-right-image:url(${0})|continue",
	"bdbrrs": "border-bottom-right-radius",
	"bdbs": "border-bottom-style",
	"bdbw": "border-bottom-width",
	"bdc": "border-color:#${1:000}",
	"bdci": "border-corner-image:url(${0})|continue",
	"bdcl": "border-collapse:collapse|separate",
	"bdf": "border-fit:repeat|clip|scale|stretch|overwrite|overflow|space",
	"bdi": "border-image:url(${0})",
	"bdl": "border-left:${1:1px} ${2:solid} ${3:#000}",
	"bdlc": "border-left-color:#${1:000}",
	"bdlen": "border-length",
	"bdli": "border-left-image:url(${0})",
	"bdls": "border-left-style",
	"bdlw": "border-left-width",
	"bdr": "border-right:${1:1px} ${2:solid} ${3:#000}",
	"bdrc": "border-right-color:#${1:000}",
	"bdri": "border-right-image:url(${0})",
	"bdrs": "border-radius",
	"bdrst": "border-right-style",
	"bdrw": "border-right-width",
	"bds": "border-style:none|hidden|dotted|dashed|solid|double|dot-dash|dot-dot-dash|wave|groove|ridge|inset|outset",
	"bdsp": "border-spacing",
	"bdt": "border-top:${1:1px} ${2:solid} ${3:#000}",
	"bdtc": "border-top-color:#${1:000}",
	"bdti": "border-top-image:url(${0})",
	"bdtli": "border-top-left-image:url(${0})|continue",
	"bdtlrs": "border-top-left-radius",
	"bdtri": "border-top-right-image:url(${0})|continue",
	"bdtrrs": "border-top-right-radius",
	"bdts": "border-top-style",
	"bdtw": "border-top-width",
	"bdw": "border-width",
	"bfv": "backface-visibility:hidden|visible",
	"bg": "background:#${1:000}",
	"bga": "background-attachment:fixed|scroll",
	"bgbk": "background-break:bounding-box|each-box|continuous",
	"bgc": "background-color:#${1:fff}",
	"bgcp": "background-clip:padding-box|border-box|content-box|no-clip",
	"bgi": "background-image:url(${0})",
	"bgo": "background-origin:padding-box|border-box|content-box",
	"bgp": "background-position:${1:0} ${2:0}",
	"bgpx": "background-position-x",
	"bgpy": "background-position-y",
	"bgr": "background-repeat:no-repeat|repeat-x|repeat-y|space|round",
	"bgsz": "background-size:contain|cover",
	"bxsh": "box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} #${5:000}|none",
	"bxsz": "box-sizing:border-box|content-box|border-box",
	"c": "color:#${1:000}",
	"cl": "clear:both|left|right|none",
	"cm": "/* ${0} */",
	"cnt": "content:'${0}'|normal|open-quote|no-open-quote|close-quote|no-close-quote|attr(${0})|counter(${0})|counters({$0})",
	"coi": "counter-increment",
	"colm": "columns",
	"colmc": "column-count",
	"colmf": "column-fill",
	"colmg": "column-gap",
	"colmr": "column-rule",
	"colmrc": "column-rule-color",
	"colmrs": "column-rule-style",
	"colmrw": "column-rule-width",
	"colms": "column-span",
	"colmw": "column-width",
	"cor": "counter-reset",
	"cp": "clip:auto|rect(${1:top} ${2:right} ${3:bottom} ${4:left})",
	"cps": "caption-side:top|bottom",
	"cur": "cursor:pointer|auto|default|crosshair|hand|help|move|pointer|text",
	"d": "display:block|none|flex|inline-flex|inline|inline-block|list-item|run-in|compact|table|inline-table|table-caption|table-column|table-column-group|table-header-group|table-footer-group|table-row|table-row-group|table-cell|ruby|ruby-base|ruby-base-group|ruby-text|ruby-text-group",
	"ec": "empty-cells:show|hide",
	"f": "font:${1:1em} ${2:sans-serif}",
	"fd": "font-display:auto|block|swap|fallback|optional",
	"fef": "font-effect:none|engrave|emboss|outline",
	"fem": "font-emphasize",
	"femp": "font-emphasize-position:before|after",
	"fems": "font-emphasize-style:none|accent|dot|circle|disc",
	"ff": "font-family:serif|sans-serif|cursive|fantasy|monospace",
	"fft": "font-family:\"Times New Roman\", Times, Baskerville, Georgia, serif",
	"ffa": "font-family:Arial, \"Helvetica Neue\", Helvetica, sans-serif",
	"ffv": "font-family:Verdana, Geneva, sans-serif",
	"fl": "float:left|right|none",
	"fs": "font-style:italic|normal|oblique",
	"fsm": "font-smoothing:antialiased|subpixel-antialiased|none",
	"fst": "font-stretch:normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
	"fv": "font-variant:normal|small-caps",
	"fvs": "font-variation-settings:normal|inherit|initial|unset",
	"fw": "font-weight:normal|bold|bolder|lighter",
	"fx": "flex",
	"fxb": "flex-basis:fill|max-content|min-content|fit-content|content",
	"fxd": "flex-direction:row|row-reverse|column|column-reverse",
	"fxf": "flex-flow",
	"fxg": "flex-grow",
	"fxsh": "flex-shrink",
	"fxw": "flex-wrap:nowrap|wrap|wrap-reverse",
	"fz": "font-size",
	"fza": "font-size-adjust",
	"h": "height",
	"jc": "justify-content:flex-start|flex-end|center|space-between|space-around",
	"l": "left",
	"lg": "background-image:linear-gradient(${1})",
	"lh": "line-height",
	"lis": "list-style",
	"lisi": "list-style-image",
	"lisp": "list-style-position:inside|outside",
	"list": "list-style-type:disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman",
	"lts": "letter-spacing:normal",
	"m": "margin",
	"mah": "max-height",
	"mar": "max-resolution",
	"maw": "max-width",
	"mb": "margin-bottom",
	"mih": "min-height",
	"mir": "min-resolution",
	"miw": "min-width",
	"ml": "margin-left",
	"mr": "margin-right",
	"mt": "margin-top",
	"ol": "outline",
	"olc": "outline-color:#${1:000}|invert",
	"olo": "outline-offset",
	"ols": "outline-style:none|dotted|dashed|solid|double|groove|ridge|inset|outset",
	"olw": "outline-width|thin|medium|thick",
	"op": "opacity",
	"ord": "order",
	"ori": "orientation:landscape|portrait",
	"orp": "orphans",
	"ov": "overflow:hidden|visible|hidden|scroll|auto",
	"ovs": "overflow-style:scrollbar|auto|scrollbar|panner|move|marquee",
	"ovx": "overflow-x:hidden|visible|hidden|scroll|auto",
	"ovy": "overflow-y:hidden|visible|hidden|scroll|auto",
	"p": "padding",
	"pb": "padding-bottom",
	"pgba": "page-break-after:auto|always|left|right",
	"pgbb": "page-break-before:auto|always|left|right",
	"pgbi": "page-break-inside:auto|avoid",
	"pl": "padding-left",
	"pos": "position:relative|absolute|relative|fixed|static",
	"pr": "padding-right",
	"pt": "padding-top",
	"q": "quotes",
	"qen": "quotes:'\\201C' '\\201D' '\\2018' '\\2019'",
	"qru": "quotes:'\\00AB' '\\00BB' '\\201E' '\\201C'",
	"r": "right",
	"rsz": "resize:none|both|horizontal|vertical",
	"t": "top",
	"ta": "text-align:left|center|right|justify",
	"tal": "text-align-last:left|center|right",
	"tbl": "table-layout:fixed",
	"td": "text-decoration:none|underline|overline|line-through",
	"te": "text-emphasis:none|accent|dot|circle|disc|before|after",
	"th": "text-height:auto|font-size|text-size|max-size",
	"ti": "text-indent",
	"tj": "text-justify:auto|inter-word|inter-ideograph|inter-cluster|distribute|kashida|tibetan",
	"to": "text-outline:${1:0} ${2:0} ${3:#000}",
	"tov": "text-overflow:ellipsis|clip",
	"tr": "text-replace",
	"trf": "transform:${1}|skewX(${1:angle})|skewY(${1:angle})|scale(${1:x}, ${2:y})|scaleX(${1:x})|scaleY(${1:y})|scaleZ(${1:z})|scale3d(${1:x}, ${2:y}, ${3:z})|rotate(${1:angle})|rotateX(${1:angle})|rotateY(${1:angle})|rotateZ(${1:angle})|translate(${1:x}, ${2:y})|translateX(${1:x})|translateY(${1:y})|translateZ(${1:z})|translate3d(${1:tx}, ${2:ty}, ${3:tz})",
	"trfo": "transform-origin",
	"trfs": "transform-style:preserve-3d",
	"trs": "transition:${1:prop} ${2:time}",
	"trsde": "transition-delay:${1:time}",
	"trsdu": "transition-duration:${1:time}",
	"trsp": "transition-property:${1:prop}",
	"trstf": "transition-timing-function:${1:fn}",
	"tsh": "text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000}",
	"tt": "text-transform:uppercase|lowercase|capitalize|none",
	"tw": "text-wrap:none|normal|unrestricted|suppress",
	"us": "user-select:none",
	"v": "visibility:hidden|visible|collapse",
	"va": "vertical-align:top|super|text-top|middle|baseline|bottom|text-bottom|sub",
	"w": "width",
	"whs": "white-space:nowrap|pre|pre-wrap|pre-line|normal",
	"whsc": "white-space-collapse:normal|keep-all|loose|break-strict|break-all",
	"wid": "widows",
	"wm": "writing-mode:lr-tb|lr-tb|lr-bt|rl-tb|rl-bt|tb-rl|tb-lr|bt-lr|bt-rl",
	"wob": "word-break:normal|keep-all|break-all",
	"wos": "word-spacing",
	"wow": "word-wrap:none|unrestricted|suppress|break-word|normal",
	"z": "z-index",
	"zom": "zoom:1"
};

var xsl$1 = {
    "tm|tmatch": "xsl:template[match mode]",
    "tn|tname": "xsl:template[name]",
    "call": "xsl:call-template[name]",
    "ap": "xsl:apply-templates[select mode]",
    "api": "xsl:apply-imports",
    "imp": "xsl:import[href]",
    "inc": "xsl:include[href]",
    "ch": "xsl:choose",
    "wh|xsl:when": "xsl:when[test]",
    "ot": "xsl:otherwise",
    "if": "xsl:if[test]",
    "par": "xsl:param[name]",
    "pare": "xsl:param[name select]",
    "var": "xsl:variable[name]",
    "vare": "xsl:variable[name select]",
    "wp": "xsl:with-param[name select]",
    "key": "xsl:key[name match use]",
    "elem": "xsl:element[name]",
    "attr": "xsl:attribute[name]",
    "attrs": "xsl:attribute-set[name]",
    "cp": "xsl:copy[select]",
    "co": "xsl:copy-of[select]",
    "val": "xsl:value-of[select]",
    "for|each": "xsl:for-each[select]",
    "tex": "xsl:text",
    "com": "xsl:comment",
    "msg": "xsl:message[terminate=no]",
    "fall": "xsl:fallback",
    "num": "xsl:number[value]",
    "nam": "namespace-alias[stylesheet-prefix result-prefix]",
    "pres": "xsl:preserve-space[elements]",
    "strip": "xsl:strip-space[elements]",
    "proc": "xsl:processing-instruction[name]",
    "sort": "xsl:sort[select order]",
    "choose": "xsl:choose>xsl:when+xsl:otherwise",
    "xsl": "!!!+xsl:stylesheet[version=1.0 xmlns:xsl=http://www.w3.org/1999/XSL/Transform]>{\n|}",
    "!!!": "{<?xml version=\"1.0\" encoding=\"UTF-8\"?>}"
};

var index$7 = { html: html$1, css: css$1, xsl: xsl$1 };

var latin = {
	"common": ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit"],
	"words": ["exercitationem", "perferendis", "perspiciatis", "laborum", "eveniet",
		"sunt", "iure", "nam", "nobis", "eum", "cum", "officiis", "excepturi",
		"odio", "consectetur", "quasi", "aut", "quisquam", "vel", "eligendi",
		"itaque", "non", "odit", "tempore", "quaerat", "dignissimos",
		"facilis", "neque", "nihil", "expedita", "vitae", "vero", "ipsum",
		"nisi", "animi", "cumque", "pariatur", "velit", "modi", "natus",
		"iusto", "eaque", "sequi", "illo", "sed", "ex", "et", "voluptatibus",
		"tempora", "veritatis", "ratione", "assumenda", "incidunt", "nostrum",
		"placeat", "aliquid", "fuga", "provident", "praesentium", "rem",
		"necessitatibus", "suscipit", "adipisci", "quidem", "possimus",
		"voluptas", "debitis", "sint", "accusantium", "unde", "sapiente",
		"voluptate", "qui", "aspernatur", "laudantium", "soluta", "amet",
		"quo", "aliquam", "saepe", "culpa", "libero", "ipsa", "dicta",
		"reiciendis", "nesciunt", "doloribus", "autem", "impedit", "minima",
		"maiores", "repudiandae", "ipsam", "obcaecati", "ullam", "enim",
		"totam", "delectus", "ducimus", "quis", "voluptates", "dolores",
		"molestiae", "harum", "dolorem", "quia", "voluptatem", "molestias",
		"magni", "distinctio", "omnis", "illum", "dolorum", "voluptatum", "ea",
		"quas", "quam", "corporis", "quae", "blanditiis", "atque", "deserunt",
		"laboriosam", "earum", "consequuntur", "hic", "cupiditate",
		"quibusdam", "accusamus", "ut", "rerum", "error", "minus", "eius",
		"ab", "ad", "nemo", "fugit", "officia", "at", "in", "id", "quos",
		"reprehenderit", "numquam", "iste", "fugiat", "sit", "inventore",
		"beatae", "repellendus", "magnam", "recusandae", "quod", "explicabo",
		"doloremque", "aperiam", "consequatur", "asperiores", "commodi",
		"optio", "dolor", "labore", "temporibus", "repellat", "veniam",
		"architecto", "est", "esse", "mollitia", "nulla", "a", "similique",
		"eos", "alias", "dolore", "tenetur", "deleniti", "porro", "facere",
		"maxime", "corrupti"]
};

var ru = {
	"common": ["далеко-далеко", "за", "словесными", "горами", "в стране", "гласных", "и согласных", "живут", "рыбные", "тексты"],
	"words": ["вдали", "от всех", "они", "буквенных", "домах", "на берегу", "семантика",
		"большого", "языкового", "океана", "маленький", "ручеек", "даль",
		"журчит", "по всей", "обеспечивает", "ее","всеми", "необходимыми",
		"правилами", "эта", "парадигматическая", "страна", "которой", "жаренные",
		"предложения", "залетают", "прямо", "рот", "даже", "всемогущая",
		"пунктуация", "не", "имеет", "власти", "над", "рыбными", "текстами",
		"ведущими", "безорфографичный", "образ", "жизни", "однажды", "одна",
		"маленькая", "строчка","рыбного", "текста", "имени", "lorem", "ipsum",
		"решила", "выйти", "большой", "мир", "грамматики", "великий", "оксмокс",
		"предупреждал", "о", "злых", "запятых", "диких", "знаках", "вопроса",
		"коварных", "точках", "запятой", "но", "текст", "дал", "сбить",
		"себя", "толку", "он", "собрал", "семь", "своих", "заглавных", "букв",
		"подпоясал", "инициал", "за", "пояс", "пустился", "дорогу",
		"взобравшись", "первую", "вершину", "курсивных", "гор", "бросил",
		"последний", "взгляд", "назад", "силуэт", "своего", "родного", "города",
		"буквоград", "заголовок", "деревни", "алфавит", "подзаголовок", "своего",
		"переулка", "грустный", "реторический", "вопрос", "скатился", "его",
		"щеке", "продолжил", "свой", "путь", "дороге", "встретил", "рукопись",
		"она", "предупредила",  "моей", "все", "переписывается", "несколько",
		"раз", "единственное", "что", "меня", "осталось", "это", "приставка",
		"возвращайся", "ты", "лучше", "свою", "безопасную", "страну", "послушавшись",
		"рукописи", "наш", "продолжил", "свой", "путь", "вскоре", "ему",
		"повстречался", "коварный", "составитель", "рекламных", "текстов",
		"напоивший", "языком", "речью", "заманивший", "свое", "агентство",
		"которое", "использовало", "снова", "снова", "своих", "проектах",
		"если", "переписали", "то", "живет", "там", "до", "сих", "пор"]
};

var sp = {
	"common": ["mujer", "uno", "dolor", "más", "de", "poder", "mismo", "si"],
	"words": ["ejercicio", "preferencia", "perspicacia", "laboral", "paño",
		"suntuoso", "molde", "namibia", "planeador", "mirar", "demás", "oficinista", "excepción",
		"odio", "consecuencia", "casi", "auto", "chicharra", "velo", "elixir",
		"ataque", "no", "odio", "temporal", "cuórum", "dignísimo",
		"facilismo", "letra", "nihilista", "expedición", "alma", "alveolar", "aparte",
		"león", "animal", "como", "paria", "belleza", "modo", "natividad",
		"justo", "ataque", "séquito", "pillo", "sed", "ex", "y", "voluminoso",
		"temporalidad", "verdades", "racional", "asunción", "incidente", "marejada",
		"placenta", "amanecer", "fuga", "previsor", "presentación", "lejos",
		"necesariamente", "sospechoso", "adiposidad", "quindío", "pócima",
		"voluble", "débito", "sintió", "accesorio", "falda", "sapiencia",
		"volutas", "queso", "permacultura", "laudo", "soluciones", "entero",
		"pan", "litro", "tonelada", "culpa", "libertario", "mosca", "dictado",
		"reincidente", "nascimiento", "dolor", "escolar", "impedimento", "mínima",
		"mayores", "repugnante", "dulce", "obcecado", "montaña", "enigma",
		"total", "deletéreo", "décima", "cábala", "fotografía", "dolores",
		"molesto", "olvido", "paciencia", "resiliencia", "voluntad", "molestias",
		"magnífico", "distinción", "ovni", "marejada", "cerro", "torre", "y",
		"abogada", "manantial", "corporal", "agua", "crepúsculo", "ataque", "desierto",
		"laboriosamente", "angustia", "afortunado", "alma", "encefalograma",
		"materialidad", "cosas", "o", "renuncia", "error", "menos", "conejo",
		"abadía", "analfabeto", "remo", "fugacidad", "oficio", "en", "almácigo", "vos", "pan",
		"represión", "números", "triste", "refugiado", "trote", "inventor",
		"corchea", "repelente", "magma", "recusado", "patrón", "explícito",
		"paloma", "síndrome", "inmune", "autoinmune", "comodidad",
		"ley", "vietnamita", "demonio", "tasmania", "repeler", "apéndice",
		"arquitecto", "columna", "yugo", "computador", "mula", "a", "propósito",
		"fantasía", "alias", "rayo", "tenedor", "deleznable", "ventana", "cara",
		"anemia", "corrupto"]
};

const langs = { latin, ru, sp };

const defaultOptions$5 = {
	wordCount: 30,
	skipCommon: false,
	lang: 'latin'
};

/**
 * Replaces given parsed Emmet abbreviation node with nodes filled with
 * Lorem Ipsum stub text.
 * @param {Node} node
 * @return {Node}
 */
var index$8 = function(node, options) {
	options = Object.assign({}, defaultOptions$5, options);
	const dict = langs[options.lang] || langs.latin;
    const startWithCommon = !options.skipCommon && !isRepeating(node);

	if (!node.repeat && !isRoot$1(node.parent)) {
		// non-repeating element, insert text stub as a content of parent node
		// and remove current one
		node.parent.value = paragraph(dict, options.wordCount, startWithCommon);
		node.remove();
	} else {
		// Replace named node with generated content
		node.value = paragraph(dict, options.wordCount, startWithCommon);
		node.name = node.parent.name ? resolveImplicitName(node.parent.name) : null;
	}

	return node;
};

function isRoot$1(node) {
	return !node.parent;
}

/**
 * Returns random integer between <code>from</code> and <code>to</code> values
 * @param {Number} from
 * @param {Number} to
 * @returns {Number}
 */
function rand(from, to) {
	return Math.floor(Math.random() * (to - from) + from);
}

/**
 * @param {Array} arr
 * @param {Number} count
 * @returns {Array}
 */
function sample(arr, count) {
	const len = arr.length;
	const iterations = Math.min(len, count);
	const result = new Set();

	while (result.size < iterations) {
		result.add(arr[rand(0, len)]);
	}

	return Array.from(result);
}

function choice(val) {
	return val[rand(0, val.length - 1)];
}

function sentence(words, end) {
	if (words.length) {
		words = [capitalize(words[0])].concat(words.slice(1));
	}

	return words.join(' ') + (end || choice('?!...')); // more dots than question marks
}

function capitalize(word) {
	return word[0].toUpperCase() + word.slice(1);
}

/**
 * Insert commas at randomly selected words. This function modifies values
 * inside <code>words</code> array
 * @param {Array} words
 */
function insertCommas(words) {
	if (words.length < 2) {
		return words;
	}

	words = words.slice();
	const len = words.length;
	const hasComma = /,$/;
	let totalCommas = 0;

	if (len > 3 && len <= 6) {
		totalCommas = rand(0, 1);
	} else if (len > 6 && len <= 12) {
		totalCommas = rand(0, 2);
	} else {
		totalCommas = rand(1, 4);
	}

	for (let i = 0, pos; i < totalCommas; i++) {
		pos = rand(0, len - 2);
		if (!hasComma.test(words[pos])) {
			words[pos] += ',';
		}
	}

	return words;
}

/**
 * Generate a paragraph of "Lorem ipsum" text
 * @param {Object} dict Words dictionary (see `lang/*.json`)
 * @param {Number} wordCount Words count in paragraph
 * @param {Boolean} startWithCommon Should paragraph start with common
 * "lorem ipsum" sentence.
 * @returns {String}
 */
function paragraph(dict, wordCount, startWithCommon) {
	const result = [];
	let totalWords = 0;
	let words;

	if (startWithCommon && dict.common) {
		words = dict.common.slice(0, wordCount);
		totalWords += words.length;
		result.push(sentence(insertCommas(words), '.'));
	}

	while (totalWords < wordCount) {
		words = sample(dict.words, Math.min(rand(2, 30), wordCount - totalWords));
		totalWords += words.length;
		result.push(sentence(insertCommas(words)));
	}

	return result.join(' ');
}

/**
 * Check if given node is in repeating context, e.g. node itself or one of its
 * parent is repeated
 * @param  {Node}  node
 * @return {Boolean}
 */
function isRepeating(node) {
    while (node.parent) {
        if (node.repeat && node.repeat.value && node.repeat.value > 1) {
            return true;
        }

        node = node.parent;
    }

    return false;
}

const reLorem = /^lorem([a-z]*)(\d*)$/i;

/**
 * Constructs a snippets registry, filled with snippets, for given options
 * @param  {String} syntax  Abbreviation syntax
 * @param  {Object|Object[]} snippets Additional snippets
 * @return {SnippetsRegistry}
 */
function snippetsRegistryFactory(syntax, snippets) {
	const registrySnippets = [index$7[syntax] || index$7.html];

	if (Array.isArray(snippets)) {
		snippets.forEach(item => {
			// if array item is a string, treat it as a reference to globally
			// defined snippets
			registrySnippets.push(typeof item === 'string' ? index$7[item] : item);
		});
	} else if (typeof snippets === 'object') {
		registrySnippets.push(snippets);
	}

	const registry = new SnippetsRegistry(registrySnippets.filter(Boolean));

	// for non-stylesheet syntaxes add Lorem Ipsum generator
	if (syntax !== 'css') {
		registry.get(0).set(reLorem, loremGenerator);
	}

	return registry;
}

function loremGenerator(node) {
	const options = {};
	const m = node.name.match(reLorem);
	if (m[1]) {
		options.lang = m[1];
	}

	if (m[2]) {
		options.wordCount = +m[2];
	}

	return index$8(node, options);
}

/**
 * Default variables used in snippets to insert common values into predefined snippets
 * @type {Object}
 */
const defaultVariables = {
	lang: 'en',
	locale: 'en-US',
	charset: 'UTF-8'
};

/**
 * A list of syntaxes that should use Emmet CSS abbreviations:
 * a variations of default abbreivation that holds values right in abbreviation name
 * @type {Set}
 */
const stylesheetSyntaxes = new Set(['css', 'sass', 'scss', 'less', 'stylus', 'sss']);

const defaultOptions$6 = {
	/**
	 * Abbreviation output syntax
	 * @type {String}
	 */
	syntax: 'html',

	/**
	 * Field/tabstop generator for editor. Most editors support TextMate-style
	 * fields: ${0} or ${1:item}. So for TextMate-style fields this function
	 * will look like this:
	 * @example
	 * (index, placeholder) => `\${${index}${placeholder ? ':' + placeholder : ''}}`
	 *
	 * @param  {Number} index         Placeholder index. Fields with the same indices
	 * should be linked
	 * @param  {String} [placeholder] Field placeholder
	 * @return {String}
	 */
	field: (index, placeholder) => placeholder || '',

	/**
	 * Insert given text string(s) into expanded abbreviation
	 * If array of strings is given, the implicitly repeated element (e.g. `li*`)
	 * will be repeated by the amount of items in array
	 * @type {String|String[]}
	 */
	text: null,

	/**
	 * Either predefined output profile or options for output profile. Used for
	 * abbreviation output
	 * @type {Profile|Object}
	 */
	profile: null,

	/**
	 * Custom variables for variable resolver
	 * @see @emmetio/variable-resolver
	 * @type {Object}
	 */
	variables: {},

	/**
	 * Custom predefined snippets for abbreviation. The expanded abbreviation
	 * will try to match given snippets that may contain custom elements,
	 * predefined attributes etc.
	 * May also contain array of items: either snippets (Object) or references
	 * to default syntax snippets (String; the key in default snippets hash)
	 * @see @emmetio/snippets
	 * @type {Object|SnippetsRegistry}
	 */
	snippets: {},

	/**
	 * Hash of additional transformations that should be applied to expanded
	 * abbreviation, like BEM or JSX. Since these transformations introduce
	 * side-effect, they are disabled by default and should be enabled by
	 * providing a transform name as a key and transform options as value:
	 * @example
	 * {
	 *     bem: {element: '--'},
	 *     jsx: true // no options, just enable transform
	 * }
	 * @see @emmetio/html-transform/lib/addons
	 * @type {Object}
	 */
	addons: null,

	/**
	 * Additional options for syntax formatter
	 * @see @emmetio/markup-formatters
	 * @type {Object}
	 */
	format: null
};

/**
 * Expands given abbreviation into string, formatted according to provided
 * syntax and options
 * @param  {String|Node} abbr        Abbreviation string or parsed abbreviation tree
 * @param  {String|Object} [options] Parsing and formatting options (object) or
 * abbreviation syntax (string)
 * @return {String}
 */
function expand$2(abbr, options) {
	options = createOptions(options);

	return isStylesheet(options.syntax)
		? expand$1(abbr, options)
		: expand(abbr, options);
}

/**
 * Parses given abbreviation into AST tree. This tree can be later formatted to
 * string with `expand` function
 * @param  {String} abbr             Abbreviation to parse
 * @param  {String|Object} [options] Parsing and formatting options (object) or
 * abbreviation syntax (string)
 * @return {Node}
 */
function parse$5(abbr, options) {
	options = createOptions(options);

	return isStylesheet(options.syntax)
		? parse$4(abbr, options)
		: parse$3(abbr, options);
}

/**
 * Creates snippets registry for given syntax and additional `snippets`
 * @param  {String} syntax   Snippets syntax, used for retreiving predefined snippets
 * @param  {SnippetsRegistry|Object|Object[]} [snippets] Additional snippets
 * @return {SnippetsRegistry}
 */
function createSnippetsRegistry(syntax, snippets) {
	return snippets instanceof SnippetsRegistry
		? snippets
		: snippetsRegistryFactory(isStylesheet(syntax) ? 'css' : syntax, snippets);
}

function createOptions(options) {
	if (typeof options === 'string') {
		options = { syntax: options };
	}

	options = Object.assign({}, defaultOptions$6, options);
	options.format = Object.assign({field: options.field}, options.format);
	options.profile = createProfile(options);
	options.variables = Object.assign({}, defaultVariables, options.variables);
	options.snippets = createSnippetsRegistry(isStylesheet(options.syntax) ? 'css' : options.syntax, options.snippets);

	return options;
}

/**
 * Check if given syntax belongs to stylesheet markup.
 * Emmet uses different abbreviation flavours: one is a default markup syntax,
 * used for HTML, Slim, Pug etc, the other one is used for stylesheets and
 * allows embedded values in abbreviation name
 * @param  {String}  syntax
 * @return {Boolean}
 */
function isStylesheet(syntax) {
	return stylesheetSyntaxes.has(syntax);
}

/**
 * Creates output profile from given options
 * @param  {Object} options
 * @return {Profile}
 */
function createProfile(options) {
	return options.profile instanceof Profile
		? options.profile
		: new Profile(options.profile);
}

exports.expand = expand$2;
exports.parse = parse$5;
exports.createSnippetsRegistry = createSnippetsRegistry;
exports.createOptions = createOptions;
exports.isStylesheet = isStylesheet;
exports.createProfile = createProfile;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Minimalistic backwards stream reader
 */
class StreamReader {
	constructor(string) {
		this.string = string;
		this.pos = this.string.length;
	}

	sol() {
		return this.pos === 0;
	}

	peek(offset) {
		return this.string.charCodeAt(this.pos - 1 + (offset || 0));
	}

	prev() {
		if (!this.sol()) {
			return this.string.charCodeAt(--this.pos);
		}
	}

	eat(match) {
		const ok = typeof match === 'function'
			? match(this.peek())
			: match === this.peek();

		if (ok) {
			this.pos--;
		}

		return ok;
	}

	eatWhile(match) {
		const start = this.pos;
		while (this.eat(match)) {}
		return this.pos < start;
	}
}

/**
 * Quotes-related utilities
 */

const SINGLE_QUOTE = 39; // '
const DOUBLE_QUOTE = 34; // "
const ESCAPE       = 92; // \

/**
 * Check if given character code is a quote
 * @param  {Number}  c
 * @return {Boolean}
 */
function isQuote(c) {
	return c === SINGLE_QUOTE || c === DOUBLE_QUOTE;
}

/**
 * Consumes quoted value, if possible
 * @param  {StreamReader} stream
 * @return {Boolean}      Returns `true` is value was consumed
 */
function eatQuoted(stream) {
	const start = stream.pos;
	const quote = stream.prev();

	if (isQuote(quote)) {
		while (!stream.sol()) {
			if (stream.prev() === quote && stream.peek() !== ESCAPE) {
				return true;
			}
		}
	}

	stream.pos = start;
	return false;
}

const TAB         = 9;
const SPACE       = 32;
const DASH        = 45; // -
const SLASH       = 47; // /
const COLON       = 58; // :
const EQUALS      = 61; // =
const ANGLE_LEFT  = 60; // <
const ANGLE_RIGHT = 62; // >

/**
 * Check if given reader’s current position points at the end of HTML tag
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
var isAtHTMLTag = function (stream) {
	const start = stream.pos;

	if (!stream.eat(ANGLE_RIGHT)) {
		return false;
	}

	let ok = false;
	stream.eat(SLASH); // possibly self-closed element

	while (!stream.sol()) {
		stream.eatWhile(isWhiteSpace);

		if (eatIdent(stream)) {
			// ate identifier: could be a tag name, boolean attribute or unquoted
			// attribute value
			if (stream.eat(SLASH)) {
				// either closing tag or invalid tag
				ok = stream.eat(ANGLE_LEFT);
				break;
			} else if (stream.eat(ANGLE_LEFT)) {
				// opening tag
				ok = true;
				break;
			} else if (stream.eat(isWhiteSpace)) {
				// boolean attribute
				continue;
			} else if (stream.eat(EQUALS)) {
				// simple unquoted value or invalid attribute
				if (eatIdent(stream)) {
					continue;
				}
				break;
			} else if (eatAttributeWithUnquotedValue(stream)) {
				// identifier was a part of unquoted value
				ok = true;
				break;
			}

			// invalid tag
			break;
		}

		if (eatAttribute(stream)) {
			continue;
		}

		break;
	}

	stream.pos = start;
	return ok;
};

/**
 * Eats HTML attribute from given string.
 * @param  {StreamReader} state
 * @return {Boolean}       `true` if attribute was consumed.
 */
function eatAttribute(stream) {
	return eatAttributeWithQuotedValue(stream) || eatAttributeWithUnquotedValue(stream);
}

/**
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
function eatAttributeWithQuotedValue(stream) {
	const start = stream.pos;
	if (eatQuoted(stream) && stream.eat(EQUALS) && eatIdent(stream)) {
		return true;
	}

	stream.pos = start;
	return false;
}

/**
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
function eatAttributeWithUnquotedValue(stream) {
	const start = stream.pos;
	if (stream.eatWhile(isUnquotedValue) && stream.eat(EQUALS) && eatIdent(stream)) {
		return true;
	}

	stream.pos = start;
	return false;
}

/**
 * Eats HTML identifier from stream
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
function eatIdent(stream) {
	return stream.eatWhile(isIdent);
}

/**
 * Check if given character code belongs to HTML identifier
 * @param  {Number}  c
 * @return {Boolean}
 */
function isIdent(c) {
	return c === COLON || c === DASH || isAlpha(c) || isNumber(c);
}

/**
 * Check if given character code is alpha code (letter though A to Z)
 * @param  {Number}  c
 * @return {Boolean}
 */
function isAlpha(c) {
	c &= ~32; // quick hack to convert any char code to uppercase char code
	return c >= 65 && c <= 90; // A-Z
}

/**
 * Check if given code is a number
 * @param  {Number}  c
 * @return {Boolean}
 */
function isNumber(c) {
	return c > 47 && c < 58;
}

/**
 * Check if given code is a whitespace
 * @param  {Number}  c
 * @return {Boolean}
 */
function isWhiteSpace(c) {
	return c === SPACE || c === TAB;
}

/**
 * Check if given code may belong to unquoted attribute value
 * @param  {Number}  c
 * @return {Boolean}
 */
function isUnquotedValue(c) {
	return c && c !== EQUALS && !isWhiteSpace(c) && !isQuote(c);
}

const code = ch => ch.charCodeAt(0);
const SQUARE_BRACE_L = code('[');
const SQUARE_BRACE_R = code(']');
const ROUND_BRACE_L  = code('(');
const ROUND_BRACE_R  = code(')');
const CURLY_BRACE_L  = code('{');
const CURLY_BRACE_R  = code('}');

const specialChars = new Set('#.*:$-_!@%^+>/'.split('').map(code));
const bracePairs = new Map()
	.set(SQUARE_BRACE_L, SQUARE_BRACE_R)
	.set(ROUND_BRACE_L,  ROUND_BRACE_R)
	.set(CURLY_BRACE_L,  CURLY_BRACE_R);

const defaultOptions = {
	syntax: 'markup',
	lookAhead: null
};

/**
 * Extracts Emmet abbreviation from given string.
 * The goal of this module is to extract abbreviation from current editor’s line,
 * e.g. like this: `<span>.foo[title=bar|]</span>` -> `.foo[title=bar]`, where
 * `|` is a current caret position.
 * @param {String}  line A text line where abbreviation should be expanded
 * @param {Number}  [pos] Caret position in line. If not given, uses end-of-line
 * @param {Object}  [options]
 * @param {Boolean} [options.lookAhead] Allow parser to look ahead of `pos` index for
 * searching of missing abbreviation parts. Most editors automatically inserts
 * closing braces for `[`, `{` and `(`, which will most likely be right after
 * current caret position. So in order to properly expand abbreviation, user
 * must explicitly move caret right after auto-inserted braces. Whith this option
 * enabled, parser will search for closing braces right after `pos`. Default is `true`
 * @param {String} [options.syntax] Name of context syntax of expanded abbreviation.
 * Either 'markup' (default) or 'stylesheet'. In 'stylesheet' syntax, braces `[]`
 * and `{}` are not supported thus not extracted.
 * @return {Object} Object with `abbreviation` and its `location` in given line
 * if abbreviation can be extracted, `null` otherwise
 */
function extractAbbreviation(line, pos, options) {
	// make sure `pos` is within line range
	pos = Math.min(line.length, Math.max(0, pos == null ? line.length : pos));

	if (typeof options === 'boolean') {
		options = Object.assign(defaultOptions, { lookAhead: options });
	} else {
		options = Object.assign(defaultOptions, options);
	}

	if (options.lookAhead == null || options.lookAhead === true) {
		pos = offsetPastAutoClosed(line, pos, options);
	}

	let c;
	const stream = new StreamReader(line);
	stream.pos = pos;
	const stack = [];

	while (!stream.sol()) {
		c = stream.peek();

		if (isCloseBrace(c, options.syntax)) {
			stack.push(c);
		} else if (isOpenBrace(c, options.syntax)) {
			if (stack.pop() !== bracePairs.get(c)) {
				// unexpected brace
				break;
			}
		} else if (has(stack, SQUARE_BRACE_R) || has(stack, CURLY_BRACE_R)) {
			// respect all characters inside attribute sets or text nodes
			stream.pos--;
			continue;
		} else if (isAtHTMLTag(stream) || !isAbbreviation(c)) {
			break;
		}

		stream.pos--;
	}

	if (!stack.length && stream.pos !== pos) {
		// found something, remove some invalid symbols from the
		// beginning and return abbreviation
		const abbreviation = line.slice(stream.pos, pos).replace(/^[*+>^]+/, '');
		return {
			abbreviation,
			location: pos - abbreviation.length
		};
	}
}

/**
 * Returns new `line` index which is right after characters beyound `pos` that
 * edditor will likely automatically close, e.g. }, ], and quotes
 * @param {String} line
 * @param {Number} pos
 * @return {Number}
 */
function offsetPastAutoClosed(line, pos, options) {
	// closing quote is allowed only as a next character
	if (isQuote(line.charCodeAt(pos))) {
		pos++;
	}

	// offset pointer until non-autoclosed character is found
	while (isCloseBrace(line.charCodeAt(pos), options.syntax)) {
		pos++;
	}

	return pos;
}

function has(arr, value) {
	return arr.indexOf(value) !== -1;
}

function isAbbreviation(c) {
	return (c > 64 && c < 91)   // uppercase letter
		|| (c > 96 && c < 123)  // lowercase letter
		|| (c > 47 && c < 58)   // number
		|| specialChars.has(c); // special character
}

function isOpenBrace(c, syntax) {
	return c === ROUND_BRACE_L || (syntax === 'markup' && (c === SQUARE_BRACE_L || c === CURLY_BRACE_L));
}

function isCloseBrace(c, syntax) {
	return c === ROUND_BRACE_R || (syntax === 'markup' && (c === SQUARE_BRACE_R || c === CURLY_BRACE_R));
}

/* harmony default export */ __webpack_exports__["default"] = (extractAbbreviation);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(__webpack_require__(18), exports);
        if (v !== undefined) module.exports = v;
    }
    else if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var ScanError;
    (function (ScanError) {
        ScanError[ScanError["None"] = 0] = "None";
        ScanError[ScanError["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
        ScanError[ScanError["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
        ScanError[ScanError["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
        ScanError[ScanError["InvalidUnicode"] = 4] = "InvalidUnicode";
        ScanError[ScanError["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
        ScanError[ScanError["InvalidCharacter"] = 6] = "InvalidCharacter";
    })(ScanError = exports.ScanError || (exports.ScanError = {}));
    var SyntaxKind;
    (function (SyntaxKind) {
        SyntaxKind[SyntaxKind["Unknown"] = 0] = "Unknown";
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 1] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 2] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 3] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 4] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 5] = "CommaToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 6] = "ColonToken";
        SyntaxKind[SyntaxKind["NullKeyword"] = 7] = "NullKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 8] = "TrueKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 9] = "FalseKeyword";
        SyntaxKind[SyntaxKind["StringLiteral"] = 10] = "StringLiteral";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 11] = "NumericLiteral";
        SyntaxKind[SyntaxKind["LineCommentTrivia"] = 12] = "LineCommentTrivia";
        SyntaxKind[SyntaxKind["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
        SyntaxKind[SyntaxKind["LineBreakTrivia"] = 14] = "LineBreakTrivia";
        SyntaxKind[SyntaxKind["Trivia"] = 15] = "Trivia";
        SyntaxKind[SyntaxKind["EOF"] = 16] = "EOF";
    })(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
    /**
     * Creates a JSON scanner on the given text.
     * If ignoreTrivia is set, whitespaces or comments are ignored.
     */
    function createScanner(text, ignoreTrivia) {
        if (ignoreTrivia === void 0) { ignoreTrivia = false; }
        var pos = 0, len = text.length, value = '', tokenOffset = 0, token = SyntaxKind.Unknown, scanError = ScanError.None;
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
            token = SyntaxKind.Unknown;
            scanError = ScanError.None;
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
                    scanError = ScanError.UnexpectedEndOfNumber;
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
                    scanError = ScanError.UnexpectedEndOfNumber;
                }
            }
            return text.substring(start, end);
        }
        function scanString() {
            var result = '', start = pos;
            while (true) {
                if (pos >= len) {
                    result += text.substring(start, pos);
                    scanError = ScanError.UnexpectedEndOfString;
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
                        scanError = ScanError.UnexpectedEndOfString;
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
                                scanError = ScanError.InvalidUnicode;
                            }
                            break;
                        default:
                            scanError = ScanError.InvalidEscapeCharacter;
                    }
                    start = pos;
                    continue;
                }
                if (ch >= 0 && ch <= 0x1f) {
                    if (isLineBreak(ch)) {
                        result += text.substring(start, pos);
                        scanError = ScanError.UnexpectedEndOfString;
                        break;
                    }
                    else {
                        scanError = ScanError.InvalidCharacter;
                    }
                }
                pos++;
            }
            return result;
        }
        function scanNext() {
            value = '';
            scanError = ScanError.None;
            tokenOffset = pos;
            if (pos >= len) {
                // at the end
                tokenOffset = len;
                return token = SyntaxKind.EOF;
            }
            var code = text.charCodeAt(pos);
            // trivia: whitespace
            if (isWhiteSpace(code)) {
                do {
                    pos++;
                    value += String.fromCharCode(code);
                    code = text.charCodeAt(pos);
                } while (isWhiteSpace(code));
                return token = SyntaxKind.Trivia;
            }
            // trivia: newlines
            if (isLineBreak(code)) {
                pos++;
                value += String.fromCharCode(code);
                if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                    pos++;
                    value += '\n';
                }
                return token = SyntaxKind.LineBreakTrivia;
            }
            switch (code) {
                // tokens: []{}:,
                case 123 /* openBrace */:
                    pos++;
                    return token = SyntaxKind.OpenBraceToken;
                case 125 /* closeBrace */:
                    pos++;
                    return token = SyntaxKind.CloseBraceToken;
                case 91 /* openBracket */:
                    pos++;
                    return token = SyntaxKind.OpenBracketToken;
                case 93 /* closeBracket */:
                    pos++;
                    return token = SyntaxKind.CloseBracketToken;
                case 58 /* colon */:
                    pos++;
                    return token = SyntaxKind.ColonToken;
                case 44 /* comma */:
                    pos++;
                    return token = SyntaxKind.CommaToken;
                // strings
                case 34 /* doubleQuote */:
                    pos++;
                    value = scanString();
                    return token = SyntaxKind.StringLiteral;
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
                        return token = SyntaxKind.LineCommentTrivia;
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
                            scanError = ScanError.UnexpectedEndOfComment;
                        }
                        value = text.substring(start, pos);
                        return token = SyntaxKind.BlockCommentTrivia;
                    }
                    // just a single slash
                    value += String.fromCharCode(code);
                    pos++;
                    return token = SyntaxKind.Unknown;
                // numbers
                case 45 /* minus */:
                    value += String.fromCharCode(code);
                    pos++;
                    if (pos === len || !isDigit(text.charCodeAt(pos))) {
                        return token = SyntaxKind.Unknown;
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
                    return token = SyntaxKind.NumericLiteral;
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
                            case 'true': return token = SyntaxKind.TrueKeyword;
                            case 'false': return token = SyntaxKind.FalseKeyword;
                            case 'null': return token = SyntaxKind.NullKeyword;
                        }
                        return token = SyntaxKind.Unknown;
                    }
                    // some
                    value += String.fromCharCode(code);
                    pos++;
                    return token = SyntaxKind.Unknown;
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
                    return false;
            }
            return true;
        }
        function scanNextNonTrivia() {
            var result;
            do {
                result = scanNext();
            } while (result >= SyntaxKind.LineCommentTrivia && result <= SyntaxKind.Trivia);
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
    exports.createScanner = createScanner;
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
    /**
     * Takes JSON with JavaScript-style comments and remove
     * them. Optionally replaces every none-newline character
     * of comments with a replaceCharacter
     */
    function stripComments(text, replaceCh) {
        var _scanner = createScanner(text), parts = [], kind, offset = 0, pos;
        do {
            pos = _scanner.getPosition();
            kind = _scanner.scan();
            switch (kind) {
                case SyntaxKind.LineCommentTrivia:
                case SyntaxKind.BlockCommentTrivia:
                case SyntaxKind.EOF:
                    if (offset !== pos) {
                        parts.push(text.substring(offset, pos));
                    }
                    if (replaceCh !== void 0) {
                        parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
                    }
                    offset = _scanner.getPosition();
                    break;
            }
        } while (kind !== SyntaxKind.EOF);
        return parts.join('');
    }
    exports.stripComments = stripComments;
    var ParseErrorCode;
    (function (ParseErrorCode) {
        ParseErrorCode[ParseErrorCode["InvalidSymbol"] = 0] = "InvalidSymbol";
        ParseErrorCode[ParseErrorCode["InvalidNumberFormat"] = 1] = "InvalidNumberFormat";
        ParseErrorCode[ParseErrorCode["PropertyNameExpected"] = 2] = "PropertyNameExpected";
        ParseErrorCode[ParseErrorCode["ValueExpected"] = 3] = "ValueExpected";
        ParseErrorCode[ParseErrorCode["ColonExpected"] = 4] = "ColonExpected";
        ParseErrorCode[ParseErrorCode["CommaExpected"] = 5] = "CommaExpected";
        ParseErrorCode[ParseErrorCode["CloseBraceExpected"] = 6] = "CloseBraceExpected";
        ParseErrorCode[ParseErrorCode["CloseBracketExpected"] = 7] = "CloseBracketExpected";
        ParseErrorCode[ParseErrorCode["EndOfFileExpected"] = 8] = "EndOfFileExpected";
    })(ParseErrorCode = exports.ParseErrorCode || (exports.ParseErrorCode = {}));
    function getLiteralNodeType(value) {
        switch (typeof value) {
            case 'boolean': return 'boolean';
            case 'number': return 'number';
            case 'string': return 'string';
            default: return 'null';
        }
    }
    /**
     * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
     */
    function getLocation(text, position) {
        var segments = []; // strings or numbers
        var earlyReturnException = new Object();
        var previousNode = void 0;
        var previousNodeInst = {
            value: void 0,
            offset: void 0,
            length: void 0,
            type: void 0
        };
        var isAtPropertyKey = false;
        function setPreviousNode(value, offset, length, type) {
            previousNodeInst.value = value;
            previousNodeInst.offset = offset;
            previousNodeInst.length = length;
            previousNodeInst.type = type;
            previousNodeInst.columnOffset = void 0;
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
                    if (sep === ':' && previousNode.type === 'property') {
                        previousNode.columnOffset = offset;
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
    exports.getLocation = getLocation;
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
    exports.parse = parse;
    /**
     * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
     */
    function parseTree(text, errors, options) {
        if (errors === void 0) { errors = []; }
        var currentParent = { type: 'array', offset: -1, length: -1, children: [] }; // artificial root
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
                        currentParent.columnOffset = offset;
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
    exports.parseTree = parseTree;
    function findNodeAtLocation(root, path) {
        if (!root) {
            return void 0;
        }
        var node = root;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var segment = path_1[_i];
            if (typeof segment === 'string') {
                if (node.type !== 'object') {
                    return void 0;
                }
                var found = false;
                for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
                    var propertyNode = _b[_a];
                    if (propertyNode.children[0].value === segment) {
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
                if (node.type !== 'array' || index < 0 || index >= node.children.length) {
                    return void 0;
                }
                node = node.children[index];
            }
        }
        return node;
    }
    exports.findNodeAtLocation = findNodeAtLocation;
    function getNodeValue(node) {
        if (node.type === 'array') {
            return node.children.map(getNodeValue);
        }
        else if (node.type === 'object') {
            var obj = {};
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var prop = _a[_i];
                obj[prop.children[0].value] = getNodeValue(prop.children[1]);
            }
            return obj;
        }
        return node.value;
    }
    exports.getNodeValue = getNodeValue;
    /**
     * Parses the given text and invokes the visitor functions for each object, array and literal reached.
     */
    function visit(text, visitor, options) {
        var _scanner = createScanner(text, false);
        function toNoArgVisit(visitFunction) {
            return visitFunction ? function () { return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
        }
        function toOneArgVisit(visitFunction) {
            return visitFunction ? function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()); } : function () { return true; };
        }
        var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onError = toOneArgVisit(visitor.onError);
        var disallowComments = options && options.disallowComments;
        var allowTrailingComma = options && options.allowTrailingComma;
        function scanNext() {
            while (true) {
                var token = _scanner.scan();
                switch (token) {
                    case SyntaxKind.LineCommentTrivia:
                    case SyntaxKind.BlockCommentTrivia:
                        if (disallowComments) {
                            handleError(ParseErrorCode.InvalidSymbol);
                        }
                        break;
                    case SyntaxKind.Unknown:
                        handleError(ParseErrorCode.InvalidSymbol);
                        break;
                    case SyntaxKind.Trivia:
                    case SyntaxKind.LineBreakTrivia:
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
                while (token !== SyntaxKind.EOF) {
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
                case SyntaxKind.NumericLiteral:
                    var value = 0;
                    try {
                        value = JSON.parse(_scanner.getTokenValue());
                        if (typeof value !== 'number') {
                            handleError(ParseErrorCode.InvalidNumberFormat);
                            value = 0;
                        }
                    }
                    catch (e) {
                        handleError(ParseErrorCode.InvalidNumberFormat);
                    }
                    onLiteralValue(value);
                    break;
                case SyntaxKind.NullKeyword:
                    onLiteralValue(null);
                    break;
                case SyntaxKind.TrueKeyword:
                    onLiteralValue(true);
                    break;
                case SyntaxKind.FalseKeyword:
                    onLiteralValue(false);
                    break;
                default:
                    return false;
            }
            scanNext();
            return true;
        }
        function parseProperty() {
            if (_scanner.getToken() !== SyntaxKind.StringLiteral) {
                handleError(ParseErrorCode.PropertyNameExpected, [], [SyntaxKind.CloseBraceToken, SyntaxKind.CommaToken]);
                return false;
            }
            parseString(false);
            if (_scanner.getToken() === SyntaxKind.ColonToken) {
                onSeparator(':');
                scanNext(); // consume colon
                if (!parseValue()) {
                    handleError(ParseErrorCode.ValueExpected, [], [SyntaxKind.CloseBraceToken, SyntaxKind.CommaToken]);
                }
            }
            else {
                handleError(ParseErrorCode.ColonExpected, [], [SyntaxKind.CloseBraceToken, SyntaxKind.CommaToken]);
            }
            return true;
        }
        function parseObject() {
            onObjectBegin();
            scanNext(); // consume open brace
            var needsComma = false;
            while (_scanner.getToken() !== SyntaxKind.CloseBraceToken && _scanner.getToken() !== SyntaxKind.EOF) {
                if (_scanner.getToken() === SyntaxKind.CommaToken) {
                    if (!needsComma) {
                        handleError(ParseErrorCode.ValueExpected, [], []);
                    }
                    onSeparator(',');
                    scanNext(); // consume comma
                    if (_scanner.getToken() === SyntaxKind.CloseBraceToken && allowTrailingComma) {
                        break;
                    }
                }
                else if (needsComma) {
                    handleError(ParseErrorCode.CommaExpected, [], []);
                }
                if (!parseProperty()) {
                    handleError(ParseErrorCode.ValueExpected, [], [SyntaxKind.CloseBraceToken, SyntaxKind.CommaToken]);
                }
                needsComma = true;
            }
            onObjectEnd();
            if (_scanner.getToken() !== SyntaxKind.CloseBraceToken) {
                handleError(ParseErrorCode.CloseBraceExpected, [SyntaxKind.CloseBraceToken], []);
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
            while (_scanner.getToken() !== SyntaxKind.CloseBracketToken && _scanner.getToken() !== SyntaxKind.EOF) {
                if (_scanner.getToken() === SyntaxKind.CommaToken) {
                    if (!needsComma) {
                        handleError(ParseErrorCode.ValueExpected, [], []);
                    }
                    onSeparator(',');
                    scanNext(); // consume comma
                }
                else if (needsComma) {
                    handleError(ParseErrorCode.CommaExpected, [], []);
                }
                if (!parseValue()) {
                    handleError(ParseErrorCode.ValueExpected, [], [SyntaxKind.CloseBracketToken, SyntaxKind.CommaToken]);
                }
                needsComma = true;
            }
            onArrayEnd();
            if (_scanner.getToken() !== SyntaxKind.CloseBracketToken) {
                handleError(ParseErrorCode.CloseBracketExpected, [SyntaxKind.CloseBracketToken], []);
            }
            else {
                scanNext(); // consume close bracket
            }
            return true;
        }
        function parseValue() {
            switch (_scanner.getToken()) {
                case SyntaxKind.OpenBracketToken:
                    return parseArray();
                case SyntaxKind.OpenBraceToken:
                    return parseObject();
                case SyntaxKind.StringLiteral:
                    return parseString(true);
                default:
                    return parseLiteral();
            }
        }
        scanNext();
        if (_scanner.getToken() === SyntaxKind.EOF) {
            return true;
        }
        if (!parseValue()) {
            handleError(ParseErrorCode.ValueExpected, [], []);
            return false;
        }
        if (_scanner.getToken() !== SyntaxKind.EOF) {
            handleError(ParseErrorCode.EndOfFileExpected, [], []);
        }
        return true;
    }
    exports.visit = visit;
});
//# sourceMappingURL=main.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cssData = {
    "properties": ["additive-symbols", "align-content", "align-items", "justify-items", "justify-self", "justify-items", "align-self", "all", "alt", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "behavior", "block-size", "border", "border-block-end", "border-block-start", "border-block-end-color", "border-block-start-color", "border-block-end-style", "border-block-start-style", "border-block-end-width", "border-block-start-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline-end", "border-inline-start", "border-inline-end-color", "border-inline-start-color", "border-inline-end-style", "border-inline-start-style", "border-inline-end-width", "border-inline-start-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "color-interpolation-filters", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "columns", "column-span", "column-width", "contain", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "enable-background", "fallback", "fill", "fill-opacity", "fill-rule", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flood-color", "flood-opacity", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "glyph-orientation-horizontal", "glyph-orientation-vertical", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "height", "hyphens", "image-orientation", "image-rendering", "ime-mode", "inline-size", "isolation", "justify-content", "kerning", "left", "letter-spacing", "lighting-color", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marker", "marker-end", "marker-mid", "marker-start", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "motion", "motion-offset", "motion-path", "motion-rotation", "-moz-animation", "-moz-animation-delay", "-moz-animation-direction", "-moz-animation-duration", "-moz-animation-iteration-count", "-moz-animation-name", "-moz-animation-play-state", "-moz-animation-timing-function", "-moz-appearance", "-moz-backface-visibility", "-moz-background-clip", "-moz-background-inline-policy", "-moz-background-origin", "-moz-border-bottom-colors", "-moz-border-image", "-moz-border-left-colors", "-moz-border-right-colors", "-moz-border-top-colors", "-moz-box-align", "-moz-box-direction", "-moz-box-flex", "-moz-box-flexgroup", "-moz-box-ordinal-group", "-moz-box-orient", "-moz-box-pack", "-moz-box-sizing", "-moz-column-count", "-moz-column-gap", "-moz-column-rule", "-moz-column-rule-color", "-moz-column-rule-style", "-moz-column-rule-width", "-moz-columns", "-moz-column-width", "-moz-font-feature-settings", "-moz-hyphens", "-moz-perspective", "-moz-perspective-origin", "-moz-text-align-last", "-moz-text-decoration-color", "-moz-text-decoration-line", "-moz-text-decoration-style", "-moz-text-size-adjust", "-moz-transform", "-moz-transform-origin", "-moz-transition", "-moz-transition-delay", "-moz-transition-duration", "-moz-transition-property", "-moz-transition-timing-function", "-moz-user-focus", "-moz-user-select", "-ms-accelerator", "-ms-behavior", "-ms-block-progression", "-ms-content-zoom-chaining", "-ms-content-zooming", "-ms-content-zoom-limit", "-ms-content-zoom-limit-max", "-ms-content-zoom-limit-min", "-ms-content-zoom-snap", "-ms-content-zoom-snap-points", "-ms-content-zoom-snap-type", "-ms-filter", "-ms-flex", "-ms-flex-align", "-ms-flex-direction", "-ms-flex-flow", "-ms-flex-item-align", "-ms-flex-line-pack", "-ms-flex-order", "-ms-flex-pack", "-ms-flex-wrap", "-ms-flow-from", "-ms-flow-into", "-ms-grid-column", "-ms-grid-column-align", "-ms-grid-columns", "-ms-grid-column-span", "-ms-grid-layer", "-ms-grid-row", "-ms-grid-row-align", "-ms-grid-rows", "-ms-grid-row-span", "-ms-high-contrast-adjust", "-ms-hyphenate-limit-chars", "-ms-hyphenate-limit-lines", "-ms-hyphenate-limit-zone", "-ms-hyphens", "-ms-ime-mode", "-ms-interpolation-mode", "-ms-layout-grid", "-ms-layout-grid-char", "-ms-layout-grid-line", "-ms-layout-grid-mode", "-ms-layout-grid-type", "-ms-line-break", "-ms-overflow-style", "-ms-perspective", "-ms-perspective-origin", "-ms-perspective-origin-x", "-ms-perspective-origin-y", "-ms-progress-appearance", "-ms-scrollbar-3dlight-color", "-ms-scrollbar-arrow-color", "-ms-scrollbar-base-color", "-ms-scrollbar-darkshadow-color", "-ms-scrollbar-face-color", "-ms-scrollbar-highlight-color", "-ms-scrollbar-shadow-color", "-ms-scrollbar-track-color", "-ms-scroll-chaining", "-ms-scroll-limit", "-ms-scroll-limit-x-max", "-ms-scroll-limit-x-min", "-ms-scroll-limit-y-max", "-ms-scroll-limit-y-min", "-ms-scroll-rails", "-ms-scroll-snap-points-x", "-ms-scroll-snap-points-y", "-ms-scroll-snap-type", "-ms-scroll-snap-x", "-ms-scroll-snap-y", "-ms-scroll-translation", "-ms-text-align-last", "-ms-text-autospace", "-ms-text-combine-horizontal", "-ms-text-justify", "-ms-text-kashida-space", "-ms-text-overflow", "-ms-text-size-adjust", "-ms-text-underline-position", "-ms-touch-action", "-ms-touch-select", "-ms-transform", "-ms-transform-origin", "-ms-transform-origin-x", "-ms-transform-origin-y", "-ms-transform-origin-z", "-ms-user-select", "-ms-word-break", "-ms-word-wrap", "-ms-wrap-flow", "-ms-wrap-margin", "-ms-wrap-through", "-ms-writing-mode", "-ms-zoom", "-ms-zoom-animation", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "negative", "-o-animation", "-o-animation-delay", "-o-animation-direction", "-o-animation-duration", "-o-animation-fill-mode", "-o-animation-iteration-count", "-o-animation-name", "-o-animation-play-state", "-o-animation-timing-function", "object-fit", "object-position", "-o-border-image", "-o-object-fit", "-o-object-position", "opacity", "order", "orphans", "-o-table-baseline", "-o-tab-size", "-o-text-overflow", "-o-transform", "-o-transform-origin", "-o-transition", "-o-transition-delay", "-o-transition-duration", "-o-transition-property", "-o-transition-timing-function", "offset-block-end", "offset-block-start", "offset-inline-end", "offset-inline-start", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "pad", "padding", "padding-bottom", "padding-block-end", "padding-block-start", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "pointer-events", "position", "prefix", "quotes", "range", "resize", "right", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "scrollbar-3dlight-color", "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-darkshadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-track-color", "scroll-behavior", "scroll-snap-coordinate", "scroll-snap-destination", "scroll-snap-points-x", "scroll-snap-points-y", "scroll-snap-type", "shape-image-threshold", "shape-margin", "shape-outside", "shape-rendering", "size", "src", "stop-color", "stop-opacity", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "suffix", "system", "symbols", "table-layout", "tab-size", "text-align", "text-align-last", "text-anchor", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "touch-action", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "unicode-range", "user-select", "vertical-align", "visibility", "-webkit-animation", "-webkit-animation-delay", "-webkit-animation-direction", "-webkit-animation-duration", "-webkit-animation-fill-mode", "-webkit-animation-iteration-count", "-webkit-animation-name", "-webkit-animation-play-state", "-webkit-animation-timing-function", "-webkit-appearance", "-webkit-backdrop-filter", "-webkit-backface-visibility", "-webkit-background-clip", "-webkit-background-composite", "-webkit-background-origin", "-webkit-border-image", "-webkit-box-align", "-webkit-box-direction", "-webkit-box-flex", "-webkit-box-flex-group", "-webkit-box-ordinal-group", "-webkit-box-orient", "-webkit-box-pack", "-webkit-box-reflect", "-webkit-box-sizing", "-webkit-break-after", "-webkit-break-before", "-webkit-break-inside", "-webkit-column-break-after", "-webkit-column-break-before", "-webkit-column-break-inside", "-webkit-column-count", "-webkit-column-gap", "-webkit-column-rule", "-webkit-column-rule-color", "-webkit-column-rule-style", "-webkit-column-rule-width", "-webkit-columns", "-webkit-column-span", "-webkit-column-width", "-webkit-filter", "-webkit-flow-from", "-webkit-flow-into", "-webkit-font-feature-settings", "-webkit-hyphens", "-webkit-line-break", "-webkit-margin-bottom-collapse", "-webkit-margin-collapse", "-webkit-margin-start", "-webkit-margin-top-collapse", "-webkit-mask-clip", "-webkit-mask-image", "-webkit-mask-origin", "-webkit-mask-repeat", "-webkit-mask-size", "-webkit-nbsp-mode", "-webkit-overflow-scrolling", "-webkit-padding-start", "-webkit-perspective", "-webkit-perspective-origin", "-webkit-region-fragment", "-webkit-tap-highlight-color", "-webkit-text-fill-color", "-webkit-text-size-adjust", "-webkit-text-stroke", "-webkit-text-stroke-color", "-webkit-text-stroke-width", "-webkit-touch-callout", "-webkit-transform", "-webkit-transform-origin", "-webkit-transform-origin-x", "-webkit-transform-origin-y", "-webkit-transform-origin-z", "-webkit-transform-style", "-webkit-transition", "-webkit-transition-delay", "-webkit-transition-duration", "-webkit-transition-property", "-webkit-transition-timing-function", "-webkit-user-drag", "-webkit-user-modify", "-webkit-user-select", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]
};
exports.htmlData = {
    "tags": [
        "body", "head", "html",
        "address", "blockquote", "dd", "div", "section", "article", "aside", "header", "footer", "nav", "menu", "dl", "dt", "fieldset", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "iframe", "noframes", "object", "ol", "p", "ul", "applet", "center", "dir", "hr", "pre",
        "a", "abbr", "acronym", "area", "b", "base", "basefont", "bdo", "big", "br", "button", "caption", "cite", "code", "col", "colgroup", "del", "dfn", "em", "font", "head", "html", "i", "img", "input", "ins", "isindex", "kbd", "label", "legend", "li", "link", "map", "meta", "noscript", "optgroup", "option", "param", "q", "s", "samp", "script", "select", "small", "span", "strike", "strong", "style", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "title", "tr", "tt", "u", "var",
        "canvas", "main", "figure", "plaintext"
    ]
};
//# sourceMappingURL=data.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function removeTag() {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let indentInSpaces = '';
    const tabSize = editor.options.tabSize ? +editor.options.tabSize : 0;
    for (let i = 0; i < tabSize || 0; i++) {
        indentInSpaces += ' ';
    }
    let rangesToRemove = [];
    editor.selections.reverse().forEach(selection => {
        rangesToRemove = rangesToRemove.concat(getRangeToRemove(editor, rootNode, selection, indentInSpaces));
    });
    return editor.edit(editBuilder => {
        rangesToRemove.forEach(range => {
            editBuilder.replace(range, '');
        });
    });
}
exports.removeTag = removeTag;
function getRangeToRemove(editor, rootNode, selection, indentInSpaces) {
    let nodeToUpdate = util_1.getHtmlNode(editor.document, rootNode, selection.start, true);
    if (!nodeToUpdate) {
        return [];
    }
    let openRange = new vscode.Range(nodeToUpdate.open.start, nodeToUpdate.open.end);
    let closeRange = null;
    if (nodeToUpdate.close) {
        closeRange = new vscode.Range(nodeToUpdate.close.start, nodeToUpdate.close.end);
    }
    let ranges = [openRange];
    if (closeRange) {
        for (let i = openRange.start.line + 1; i <= closeRange.start.line; i++) {
            let lineContent = editor.document.lineAt(i).text;
            if (lineContent.startsWith('\t')) {
                ranges.push(new vscode.Range(i, 0, i, 1));
            }
            else if (lineContent.startsWith(indentInSpaces)) {
                ranges.push(new vscode.Range(i, 0, i, indentInSpaces.length));
            }
        }
        ranges.push(closeRange);
    }
    return ranges;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function updateTag(tagName) {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    let editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let rangesToUpdate = [];
    editor.selections.reverse().forEach(selection => {
        rangesToUpdate = rangesToUpdate.concat(getRangesToUpdate(editor, selection, rootNode));
    });
    return editor.edit(editBuilder => {
        rangesToUpdate.forEach(range => {
            editBuilder.replace(range, tagName);
        });
    });
}
exports.updateTag = updateTag;
function getRangesToUpdate(editor, selection, rootNode) {
    let nodeToUpdate = util_1.getHtmlNode(editor.document, rootNode, selection.start, true);
    if (!nodeToUpdate) {
        return [];
    }
    let openStart = nodeToUpdate.open.start.translate(0, 1);
    let openEnd = openStart.translate(0, nodeToUpdate.name.length);
    let ranges = [new vscode.Range(openStart, openEnd)];
    if (nodeToUpdate.close) {
        let closeStart = nodeToUpdate.close.start.translate(0, 2);
        let closeEnd = nodeToUpdate.close.end.translate(0, -1);
        ranges.push(new vscode.Range(closeStart, closeEnd));
    }
    return ranges;
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function matchTag() {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let updatedSelections = [];
    editor.selections.forEach(selection => {
        let updatedSelection = getUpdatedSelections(editor, selection.start, rootNode);
        if (updatedSelection) {
            updatedSelections.push(updatedSelection);
        }
    });
    if (updatedSelections.length > 0) {
        editor.selections = updatedSelections;
        editor.revealRange(editor.selections[updatedSelections.length - 1]);
    }
}
exports.matchTag = matchTag;
function getUpdatedSelections(editor, position, rootNode) {
    let currentNode = util_1.getHtmlNode(editor.document, rootNode, position, true);
    if (!currentNode) {
        return;
    }
    // If no closing tag or cursor is between open and close tag, then no-op
    if (!currentNode.close || (position.isAfter(currentNode.open.end) && position.isBefore(currentNode.close.start))) {
        return;
    }
    // Place cursor inside the close tag if cursor is inside the open tag, else place it inside the open tag
    let finalPosition = position.isBeforeOrEqual(currentNode.open.end) ? currentNode.close.start.translate(0, 2) : currentNode.open.start.translate(0, 1);
    return new vscode.Selection(finalPosition, finalPosition);
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
let balanceOutStack = [];
let lastOut = false;
let lastBalancedSelections = [];
function balanceOut() {
    balance(true);
}
exports.balanceOut = balanceOut;
function balanceIn() {
    balance(false);
}
exports.balanceIn = balanceIn;
function balance(out) {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let getRangeFunction = out ? getRangeToBalanceOut : getRangeToBalanceIn;
    let newSelections = [];
    editor.selections.forEach(selection => {
        let range = getRangeFunction(editor.document, selection, rootNode);
        newSelections.push(range);
    });
    if (areSameSelections(newSelections, editor.selections)) {
        return;
    }
    if (areSameSelections(lastBalancedSelections, editor.selections)) {
        if (out) {
            if (!balanceOutStack.length) {
                balanceOutStack.push(editor.selections);
            }
            balanceOutStack.push(newSelections);
        }
        else {
            if (lastOut) {
                balanceOutStack.pop();
            }
            newSelections = balanceOutStack.pop() || newSelections;
        }
    }
    else {
        balanceOutStack = out ? [editor.selections, newSelections] : [];
    }
    lastOut = out;
    lastBalancedSelections = editor.selections = newSelections;
}
function getRangeToBalanceOut(document, selection, rootNode) {
    let nodeToBalance = util_1.getHtmlNode(document, rootNode, selection.start, false);
    if (!nodeToBalance) {
        return selection;
    }
    if (!nodeToBalance.close) {
        return new vscode.Selection(nodeToBalance.start, nodeToBalance.end);
    }
    let innerSelection = new vscode.Selection(nodeToBalance.open.end, nodeToBalance.close.start);
    let outerSelection = new vscode.Selection(nodeToBalance.start, nodeToBalance.end);
    if (innerSelection.contains(selection) && !innerSelection.isEqual(selection)) {
        return innerSelection;
    }
    if (outerSelection.contains(selection) && !outerSelection.isEqual(selection)) {
        return outerSelection;
    }
    return selection;
}
function getRangeToBalanceIn(document, selection, rootNode) {
    let nodeToBalance = util_1.getHtmlNode(document, rootNode, selection.start, true);
    if (!nodeToBalance) {
        return selection;
    }
    if (nodeToBalance.close) {
        const entireNodeSelected = selection.start.isEqual(nodeToBalance.start) && selection.end.isEqual(nodeToBalance.end);
        const startInOpenTag = selection.start.isAfter(nodeToBalance.open.start) && selection.start.isBefore(nodeToBalance.open.end);
        const startInCloseTag = selection.start.isAfter(nodeToBalance.close.start) && selection.start.isBefore(nodeToBalance.close.end);
        if (entireNodeSelected || startInOpenTag || startInCloseTag) {
            return new vscode.Selection(nodeToBalance.open.end, nodeToBalance.close.start);
        }
    }
    if (!nodeToBalance.firstChild) {
        return selection;
    }
    if (selection.start.isEqual(nodeToBalance.firstChild.start)
        && selection.end.isEqual(nodeToBalance.firstChild.end)
        && nodeToBalance.firstChild.close) {
        return new vscode.Selection(nodeToBalance.firstChild.open.end, nodeToBalance.firstChild.close.start);
    }
    return new vscode.Selection(nodeToBalance.firstChild.start, nodeToBalance.firstChild.end);
}
function areSameSelections(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!a[i].isEqual(b[i])) {
            return false;
        }
    }
    return true;
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function splitJoinTag() {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    return editor.edit(editBuilder => {
        editor.selections.reverse().forEach(selection => {
            let nodeToUpdate = util_1.getHtmlNode(editor.document, rootNode, selection.start, true);
            if (nodeToUpdate) {
                let textEdit = getRangesToReplace(editor.document, nodeToUpdate);
                editBuilder.replace(textEdit.range, textEdit.newText);
            }
        });
    });
}
exports.splitJoinTag = splitJoinTag;
function getRangesToReplace(document, nodeToUpdate) {
    let rangeToReplace;
    let textToReplaceWith;
    if (!nodeToUpdate.close) {
        // Split Tag
        let nodeText = document.getText(new vscode.Range(nodeToUpdate.start, nodeToUpdate.end));
        let m = nodeText.match(/(\s*\/)?>$/);
        let end = nodeToUpdate.end;
        let start = m ? end.translate(0, -m[0].length) : end;
        rangeToReplace = new vscode.Range(start, end);
        textToReplaceWith = `></${nodeToUpdate.name}>`;
    }
    else {
        // Join Tag
        let start = nodeToUpdate.open.end.translate(0, -1);
        let end = nodeToUpdate.end;
        rangeToReplace = new vscode.Range(start, end);
        textToReplaceWith = '/>';
        const emmetMode = util_1.getEmmetMode(document.languageId, []) || '';
        const emmetConfig = util_1.getEmmetConfiguration(emmetMode);
        if (emmetMode && emmetConfig.syntaxProfiles[emmetMode] &&
            (emmetConfig.syntaxProfiles[emmetMode]['selfClosingStyle'] === 'xhtml' || emmetConfig.syntaxProfiles[emmetMode]['self_closing_tag'] === 'xhtml')) {
            textToReplaceWith = ' ' + textToReplaceWith;
        }
    }
    return new vscode.TextEdit(rangeToReplace, textToReplaceWith);
}


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
const util_1 = __webpack_require__(4);
function mergeLines() {
    if (!util_1.validate(false) || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    return editor.edit(editBuilder => {
        editor.selections.reverse().forEach(selection => {
            let textEdit = getRangesToReplace(editor.document, selection, rootNode);
            if (textEdit) {
                editBuilder.replace(textEdit.range, textEdit.newText);
            }
        });
    });
}
exports.mergeLines = mergeLines;
function getRangesToReplace(document, selection, rootNode) {
    let startNodeToUpdate;
    let endNodeToUpdate;
    if (selection.isEmpty) {
        startNodeToUpdate = endNodeToUpdate = util_1.getNode(rootNode, selection.start, true);
    }
    else {
        startNodeToUpdate = util_1.getNode(rootNode, selection.start, true);
        endNodeToUpdate = util_1.getNode(rootNode, selection.end, true);
    }
    if (!startNodeToUpdate || !endNodeToUpdate || startNodeToUpdate.start.line === endNodeToUpdate.end.line) {
        return;
    }
    let rangeToReplace = new vscode.Range(startNodeToUpdate.start, endNodeToUpdate.end);
    let textToReplaceWith = document.lineAt(startNodeToUpdate.start.line).text.substr(startNodeToUpdate.start.character);
    for (let i = startNodeToUpdate.start.line + 1; i <= endNodeToUpdate.end.line; i++) {
        textToReplaceWith += document.lineAt(i).text.trim();
    }
    return new vscode.TextEdit(rangeToReplace, textToReplaceWith);
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
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
const css_parser_1 = __webpack_require__(8);
const bufferStream_1 = __webpack_require__(9);
const startCommentStylesheet = '/*';
const endCommentStylesheet = '*/';
const startCommentHTML = '<!--';
const endCommentHTML = '-->';
function toggleComment() {
    if (!util_1.validate() || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    return editor.edit(editBuilder => {
        let allEdits = [];
        editor.selections.reverse().forEach(selection => {
            let edits = util_1.isStyleSheet(editor.document.languageId) ? toggleCommentStylesheet(selection, rootNode) : toggleCommentHTML(editor.document, selection, rootNode);
            if (edits.length > 0) {
                allEdits.push(edits);
            }
        });
        // Apply edits in order so we can skip nested ones.
        allEdits.sort((arr1, arr2) => {
            let result = arr1[0].range.start.line - arr2[0].range.start.line;
            return result === 0 ? arr1[0].range.start.character - arr2[0].range.start.character : result;
        });
        let lastEditPosition = new vscode.Position(0, 0);
        for (const edits of allEdits) {
            if (edits[0].range.end.isAfterOrEqual(lastEditPosition)) {
                edits.forEach(x => {
                    editBuilder.replace(x.range, x.newText);
                    lastEditPosition = x.range.end;
                });
            }
        }
    });
}
exports.toggleComment = toggleComment;
function toggleCommentHTML(document, selection, rootNode) {
    const selectionStart = selection.isReversed ? selection.active : selection.anchor;
    const selectionEnd = selection.isReversed ? selection.anchor : selection.active;
    let startNode = util_1.getHtmlNode(document, rootNode, selectionStart, true);
    let endNode = util_1.getHtmlNode(document, rootNode, selectionEnd, true);
    if (!startNode || !endNode) {
        return [];
    }
    if (util_1.sameNodes(startNode, endNode) && startNode.name === 'style'
        && startNode.open.end.isBefore(selectionStart)
        && startNode.close.start.isAfter(selectionEnd)) {
        let buffer = new bufferStream_1.DocumentStreamReader(document, startNode.open.end, new vscode.Range(startNode.open.end, startNode.close.start));
        let cssRootNode = css_parser_1.default(buffer);
        return toggleCommentStylesheet(selection, cssRootNode);
    }
    let allNodes = util_1.getNodesInBetween(startNode, endNode);
    let edits = [];
    allNodes.forEach(node => {
        edits = edits.concat(getRangesToUnCommentHTML(node, document));
    });
    if (startNode.type === 'comment') {
        return edits;
    }
    edits.push(new vscode.TextEdit(new vscode.Range(allNodes[0].start, allNodes[0].start), startCommentHTML));
    edits.push(new vscode.TextEdit(new vscode.Range(allNodes[allNodes.length - 1].end, allNodes[allNodes.length - 1].end), endCommentHTML));
    return edits;
}
function getRangesToUnCommentHTML(node, document) {
    let unCommentTextEdits = [];
    // If current node is commented, then uncomment and return
    if (node.type === 'comment') {
        unCommentTextEdits.push(new vscode.TextEdit(new vscode.Range(node.start, node.start.translate(0, startCommentHTML.length)), ''));
        unCommentTextEdits.push(new vscode.TextEdit(new vscode.Range(node.end.translate(0, -endCommentHTML.length), node.end), ''));
        return unCommentTextEdits;
    }
    // All children of current node should be uncommented
    node.children.forEach(childNode => {
        unCommentTextEdits = unCommentTextEdits.concat(getRangesToUnCommentHTML(childNode, document));
    });
    return unCommentTextEdits;
}
function toggleCommentStylesheet(selection, rootNode) {
    let selectionStart = selection.isReversed ? selection.active : selection.anchor;
    let selectionEnd = selection.isReversed ? selection.anchor : selection.active;
    let startNode = util_1.getNode(rootNode, selectionStart, true);
    let endNode = util_1.getNode(rootNode, selectionEnd, true);
    if (!selection.isEmpty) {
        selectionStart = adjustStartNodeCss(startNode, selectionStart, rootNode);
        selectionEnd = adjustEndNodeCss(endNode, selectionEnd, rootNode);
        selection = new vscode.Selection(selectionStart, selectionEnd);
    }
    else if (startNode) {
        selectionStart = startNode.start;
        selectionEnd = startNode.end;
        selection = new vscode.Selection(selectionStart, selectionEnd);
    }
    // Uncomment the comments that intersect with the selection.
    let rangesToUnComment = [];
    let edits = [];
    rootNode.comments.forEach(comment => {
        let commentRange = new vscode.Range(comment.start, comment.end);
        if (selection.intersection(commentRange)) {
            rangesToUnComment.push(commentRange);
            edits.push(new vscode.TextEdit(new vscode.Range(comment.start, comment.start.translate(0, startCommentStylesheet.length)), ''));
            edits.push(new vscode.TextEdit(new vscode.Range(comment.end.translate(0, -endCommentStylesheet.length), comment.end), ''));
        }
    });
    if (edits.length > 0) {
        return edits;
    }
    return [
        new vscode.TextEdit(new vscode.Range(selection.start, selection.start), startCommentStylesheet),
        new vscode.TextEdit(new vscode.Range(selection.end, selection.end), endCommentStylesheet)
    ];
}
function adjustStartNodeCss(node, pos, rootNode) {
    for (const comment of rootNode.comments) {
        let commentRange = new vscode.Range(comment.start, comment.end);
        if (commentRange.contains(pos)) {
            return pos;
        }
    }
    if (!node) {
        return pos;
    }
    if (node.type === 'property') {
        return node.start;
    }
    const rule = node;
    if (pos.isBefore(rule.contentStartToken.end) || !rule.firstChild) {
        return rule.start;
    }
    if (pos.isBefore(rule.firstChild.start)) {
        return pos;
    }
    let newStartNode = rule.firstChild;
    while (newStartNode.nextSibling && pos.isAfter(newStartNode.end)) {
        newStartNode = newStartNode.nextSibling;
    }
    return newStartNode.start;
}
function adjustEndNodeCss(node, pos, rootNode) {
    for (const comment of rootNode.comments) {
        let commentRange = new vscode.Range(comment.start, comment.end);
        if (commentRange.contains(pos)) {
            return pos;
        }
    }
    if (!node) {
        return pos;
    }
    if (node.type === 'property') {
        return node.end;
    }
    const rule = node;
    if (pos.isEqual(rule.contentEndToken.end) || !rule.firstChild) {
        return rule.end;
    }
    if (pos.isAfter(rule.children[rule.children.length - 1].end)) {
        return pos;
    }
    let newEndNode = rule.children[rule.children.length - 1];
    while (newEndNode.previousSibling && pos.isBefore(newEndNode.start)) {
        newEndNode = newEndNode.previousSibling;
    }
    return newEndNode.end;
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function fetchEditPoint(direction) {
    if (!util_1.validate() || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let newSelections = [];
    editor.selections.forEach(selection => {
        let updatedSelection = direction === 'next' ? nextEditPoint(selection, editor) : prevEditPoint(selection, editor);
        newSelections.push(updatedSelection);
    });
    editor.selections = newSelections;
    editor.revealRange(editor.selections[editor.selections.length - 1]);
}
exports.fetchEditPoint = fetchEditPoint;
function nextEditPoint(selection, editor) {
    for (let lineNum = selection.anchor.line; lineNum < editor.document.lineCount; lineNum++) {
        let updatedSelection = findEditPoint(lineNum, editor, selection.anchor, 'next');
        if (updatedSelection) {
            return updatedSelection;
        }
    }
    return selection;
}
function prevEditPoint(selection, editor) {
    for (let lineNum = selection.anchor.line; lineNum >= 0; lineNum--) {
        let updatedSelection = findEditPoint(lineNum, editor, selection.anchor, 'prev');
        if (updatedSelection) {
            return updatedSelection;
        }
    }
    return selection;
}
function findEditPoint(lineNum, editor, position, direction) {
    let line = editor.document.lineAt(lineNum);
    let lineContent = line.text;
    if (lineNum !== position.line && line.isEmptyOrWhitespace) {
        return new vscode.Selection(lineNum, lineContent.length, lineNum, lineContent.length);
    }
    if (lineNum === position.line && direction === 'prev') {
        lineContent = lineContent.substr(0, position.character);
    }
    let emptyAttrIndex = direction === 'next' ? lineContent.indexOf('""', lineNum === position.line ? position.character : 0) : lineContent.lastIndexOf('""');
    let emptyTagIndex = direction === 'next' ? lineContent.indexOf('><', lineNum === position.line ? position.character : 0) : lineContent.lastIndexOf('><');
    let winner = -1;
    if (emptyAttrIndex > -1 && emptyTagIndex > -1) {
        winner = direction === 'next' ? Math.min(emptyAttrIndex, emptyTagIndex) : Math.max(emptyAttrIndex, emptyTagIndex);
    }
    else if (emptyAttrIndex > -1) {
        winner = emptyAttrIndex;
    }
    else {
        winner = emptyTagIndex;
    }
    if (winner > -1) {
        return new vscode.Selection(lineNum, winner + 1, lineNum, winner + 1);
    }
    return;
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
const selectItemHTML_1 = __webpack_require__(30);
const selectItemStylesheet_1 = __webpack_require__(32);
function fetchSelectItem(direction) {
    if (!util_1.validate() || !vscode.window.activeTextEditor) {
        return;
    }
    const editor = vscode.window.activeTextEditor;
    let rootNode = util_1.parseDocument(editor.document);
    if (!rootNode) {
        return;
    }
    let newSelections = [];
    editor.selections.forEach(selection => {
        const selectionStart = selection.isReversed ? selection.active : selection.anchor;
        const selectionEnd = selection.isReversed ? selection.anchor : selection.active;
        let updatedSelection;
        if (util_1.isStyleSheet(editor.document.languageId)) {
            updatedSelection = direction === 'next' ? selectItemStylesheet_1.nextItemStylesheet(selectionStart, selectionEnd, rootNode) : selectItemStylesheet_1.prevItemStylesheet(selectionStart, selectionEnd, rootNode);
        }
        else {
            updatedSelection = direction === 'next' ? selectItemHTML_1.nextItemHTML(selectionStart, selectionEnd, editor, rootNode) : selectItemHTML_1.prevItemHTML(selectionStart, selectionEnd, editor, rootNode);
        }
        newSelections.push(updatedSelection ? updatedSelection : selection);
    });
    editor.selections = newSelections;
    editor.revealRange(editor.selections[editor.selections.length - 1]);
}
exports.fetchSelectItem = fetchSelectItem;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
const util_2 = __webpack_require__(31);
function nextItemHTML(selectionStart, selectionEnd, editor, rootNode) {
    let currentNode = util_1.getHtmlNode(editor.document, rootNode, selectionEnd, false);
    let nextNode = undefined;
    if (!currentNode) {
        return;
    }
    if (currentNode.type !== 'comment') {
        // If cursor is in the tag name, select tag
        if (selectionEnd.isBefore(currentNode.open.start.translate(0, currentNode.name.length))) {
            return getSelectionFromNode(currentNode);
        }
        // If cursor is in the open tag, look for attributes
        if (selectionEnd.isBefore(currentNode.open.end)) {
            let attrSelection = getNextAttribute(selectionStart, selectionEnd, currentNode);
            if (attrSelection) {
                return attrSelection;
            }
        }
        // Get the first child of current node which is right after the cursor and is not a comment
        nextNode = currentNode.firstChild;
        while (nextNode && (selectionEnd.isAfterOrEqual(nextNode.end) || nextNode.type === 'comment')) {
            nextNode = nextNode.nextSibling;
        }
    }
    // Get next sibling of current node which is not a comment. If none is found try the same on the parent
    while (!nextNode && currentNode) {
        if (currentNode.nextSibling) {
            if (currentNode.nextSibling.type !== 'comment') {
                nextNode = currentNode.nextSibling;
            }
            else {
                currentNode = currentNode.nextSibling;
            }
        }
        else {
            currentNode = currentNode.parent;
        }
    }
    return nextNode && getSelectionFromNode(nextNode);
}
exports.nextItemHTML = nextItemHTML;
function prevItemHTML(selectionStart, selectionEnd, editor, rootNode) {
    let currentNode = util_1.getHtmlNode(editor.document, rootNode, selectionStart, false);
    let prevNode = undefined;
    if (!currentNode) {
        return;
    }
    if (currentNode.type !== 'comment' && selectionStart.translate(0, -1).isAfter(currentNode.open.start)) {
        if (selectionStart.isBefore(currentNode.open.end) || !currentNode.firstChild || selectionEnd.isBeforeOrEqual(currentNode.firstChild.start)) {
            prevNode = currentNode;
        }
        else {
            // Select the child that appears just before the cursor and is not a comment
            prevNode = currentNode.firstChild;
            let oldOption = undefined;
            while (prevNode.nextSibling && selectionStart.isAfterOrEqual(prevNode.nextSibling.end)) {
                if (prevNode && prevNode.type !== 'comment') {
                    oldOption = prevNode;
                }
                prevNode = prevNode.nextSibling;
            }
            prevNode = util_1.getDeepestNode((prevNode && prevNode.type !== 'comment') ? prevNode : oldOption);
        }
    }
    // Select previous sibling which is not a comment. If none found, then select parent
    while (!prevNode && currentNode) {
        if (currentNode.previousSibling) {
            if (currentNode.previousSibling.type !== 'comment') {
                prevNode = util_1.getDeepestNode(currentNode.previousSibling);
            }
            else {
                currentNode = currentNode.previousSibling;
            }
        }
        else {
            prevNode = currentNode.parent;
        }
    }
    if (!prevNode) {
        return undefined;
    }
    let attrSelection = getPrevAttribute(selectionStart, selectionEnd, prevNode);
    return attrSelection ? attrSelection : getSelectionFromNode(prevNode);
}
exports.prevItemHTML = prevItemHTML;
function getSelectionFromNode(node) {
    if (node && node.open) {
        let selectionStart = node.open.start.translate(0, 1);
        let selectionEnd = selectionStart.translate(0, node.name.length);
        return new vscode.Selection(selectionStart, selectionEnd);
    }
    return undefined;
}
function getNextAttribute(selectionStart, selectionEnd, node) {
    if (!node.attributes || node.attributes.length === 0 || node.type === 'comment') {
        return;
    }
    for (const attr of node.attributes) {
        if (selectionEnd.isBefore(attr.start)) {
            // select full attr
            return new vscode.Selection(attr.start, attr.end);
        }
        if (!attr.value || attr.value.start.isEqual(attr.value.end)) {
            // No attr value to select
            continue;
        }
        if ((selectionStart.isEqual(attr.start) && selectionEnd.isEqual(attr.end)) || selectionEnd.isBefore(attr.value.start)) {
            // cursor is in attr name,  so select full attr value
            return new vscode.Selection(attr.value.start, attr.value.end);
        }
        // Fetch the next word in the attr value
        if (attr.value.toString().indexOf(' ') === -1) {
            // attr value does not have space, so no next word to find
            continue;
        }
        let pos = undefined;
        if (selectionStart.isEqual(attr.value.start) && selectionEnd.isEqual(attr.value.end)) {
            pos = -1;
        }
        if (pos === undefined && selectionEnd.isBefore(attr.end)) {
            pos = selectionEnd.character - attr.value.start.character - 1;
        }
        if (pos !== undefined) {
            let [newSelectionStartOffset, newSelectionEndOffset] = util_1.findNextWord(attr.value.toString(), pos);
            if (!util_2.isNumber(newSelectionStartOffset) || !util_2.isNumber(newSelectionEndOffset)) {
                return;
            }
            if (newSelectionStartOffset >= 0 && newSelectionEndOffset >= 0) {
                const newSelectionStart = attr.value.start.translate(0, newSelectionStartOffset);
                const newSelectionEnd = attr.value.start.translate(0, newSelectionEndOffset);
                return new vscode.Selection(newSelectionStart, newSelectionEnd);
            }
        }
    }
    return;
}
function getPrevAttribute(selectionStart, selectionEnd, node) {
    if (!node.attributes || node.attributes.length === 0 || node.type === 'comment') {
        return;
    }
    for (let i = node.attributes.length - 1; i >= 0; i--) {
        let attr = node.attributes[i];
        if (selectionStart.isBeforeOrEqual(attr.start)) {
            continue;
        }
        if (!attr.value || attr.value.start.isEqual(attr.value.end) || selectionStart.isBefore(attr.value.start)) {
            // select full attr
            return new vscode.Selection(attr.start, attr.end);
        }
        if (selectionStart.isEqual(attr.value.start)) {
            if (selectionEnd.isAfterOrEqual(attr.value.end)) {
                // select full attr
                return new vscode.Selection(attr.start, attr.end);
            }
            // select attr value
            return new vscode.Selection(attr.value.start, attr.value.end);
        }
        // Fetch the prev word in the attr value
        let pos = selectionStart.isAfter(attr.value.end) ? attr.value.toString().length : selectionStart.character - attr.value.start.character;
        let [newSelectionStartOffset, newSelectionEndOffset] = util_1.findPrevWord(attr.value.toString(), pos);
        if (!util_2.isNumber(newSelectionStartOffset) || !util_2.isNumber(newSelectionEndOffset)) {
            return;
        }
        if (newSelectionStartOffset >= 0 && newSelectionEndOffset >= 0) {
            const newSelectionStart = attr.value.start.translate(0, newSelectionStartOffset);
            const newSelectionEnd = attr.value.start.translate(0, newSelectionEndOffset);
            return new vscode.Selection(newSelectionStart, newSelectionEnd);
        }
    }
    return;
}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __webpack_require__(1);
const util_1 = __webpack_require__(4);
function nextItemStylesheet(startOffset, endOffset, rootNode) {
    let currentNode = util_1.getNode(rootNode, endOffset, true);
    if (!currentNode) {
        currentNode = rootNode;
    }
    if (!currentNode) {
        return;
    }
    // Full property is selected, so select full property value next
    if (currentNode.type === 'property' && startOffset.isEqual(currentNode.start) && endOffset.isEqual(currentNode.end)) {
        return getSelectionFromProperty(currentNode, startOffset, endOffset, true, 'next');
    }
    // Part or whole of propertyValue is selected, so select the next word in the propertyValue
    if (currentNode.type === 'property' && startOffset.isAfterOrEqual(currentNode.valueToken.start) && endOffset.isBeforeOrEqual(currentNode.valueToken.end)) {
        let singlePropertyValue = getSelectionFromProperty(currentNode, startOffset, endOffset, false, 'next');
        if (singlePropertyValue) {
            return singlePropertyValue;
        }
    }
    // Cursor is in the selector or in a property
    if ((currentNode.type === 'rule' && endOffset.isBefore(currentNode.selectorToken.end))
        || (currentNode.type === 'property' && endOffset.isBefore(currentNode.valueToken.end))) {
        return getSelectionFromNode(currentNode);
    }
    // Get the first child of current node which is right after the cursor
    let nextNode = currentNode.firstChild;
    while (nextNode && endOffset.isAfterOrEqual(nextNode.end)) {
        nextNode = nextNode.nextSibling;
    }
    // Get next sibling of current node or the parent
    while (!nextNode && currentNode) {
        nextNode = currentNode.nextSibling;
        currentNode = currentNode.parent;
    }
    return getSelectionFromNode(nextNode);
}
exports.nextItemStylesheet = nextItemStylesheet;
function prevItemStylesheet(startOffset, endOffset, rootNode) {
    let currentNode = util_1.getNode(rootNode, startOffset, false);
    if (!currentNode) {
        currentNode = rootNode;
    }
    if (!currentNode) {
        return;
    }
    // Full property value is selected, so select the whole property next
    if (currentNode.type === 'property' && startOffset.isEqual(currentNode.valueToken.start) && endOffset.isEqual(currentNode.valueToken.end)) {
        return getSelectionFromNode(currentNode);
    }
    // Part of propertyValue is selected, so select the prev word in the propertyValue
    if (currentNode.type === 'property' && startOffset.isAfterOrEqual(currentNode.valueToken.start) && endOffset.isBeforeOrEqual(currentNode.valueToken.end)) {
        let singlePropertyValue = getSelectionFromProperty(currentNode, startOffset, endOffset, false, 'prev');
        if (singlePropertyValue) {
            return singlePropertyValue;
        }
    }
    if (currentNode.type === 'property' || !currentNode.firstChild || (currentNode.type === 'rule' && startOffset.isBeforeOrEqual(currentNode.firstChild.start))) {
        return getSelectionFromNode(currentNode);
    }
    // Select the child that appears just before the cursor
    let prevNode = currentNode.firstChild;
    while (prevNode.nextSibling && startOffset.isAfterOrEqual(prevNode.nextSibling.end)) {
        prevNode = prevNode.nextSibling;
    }
    prevNode = util_1.getDeepestNode(prevNode);
    return getSelectionFromProperty(prevNode, startOffset, endOffset, false, 'prev');
}
exports.prevItemStylesheet = prevItemStylesheet;
function getSelectionFromNode(node) {
    if (!node) {
        return;
    }
    let nodeToSelect = node.type === 'rule' ? node.selectorToken : node;
    return new vscode.Selection(nodeToSelect.start, nodeToSelect.end);
}
function getSelectionFromProperty(node, selectionStart, selectionEnd, selectFullValue, direction) {
    if (!node || node.type !== 'property') {
        return;
    }
    const propertyNode = node;
    let propertyValue = propertyNode.valueToken.stream.substring(propertyNode.valueToken.start, propertyNode.valueToken.end);
    selectFullValue = selectFullValue || (direction === 'prev' && selectionStart.isEqual(propertyNode.valueToken.start) && selectionEnd.isBefore(propertyNode.valueToken.end));
    if (selectFullValue) {
        return new vscode.Selection(propertyNode.valueToken.start, propertyNode.valueToken.end);
    }
    let pos = -1;
    if (direction === 'prev') {
        if (selectionStart.isEqual(propertyNode.valueToken.start)) {
            return;
        }
        pos = selectionStart.isAfter(propertyNode.valueToken.end) ? propertyValue.length : selectionStart.character - propertyNode.valueToken.start.character;
    }
    if (direction === 'next') {
        if (selectionEnd.isEqual(propertyNode.valueToken.end) && (selectionStart.isAfter(propertyNode.valueToken.start) || propertyValue.indexOf(' ') === -1)) {
            return;
        }
        pos = selectionEnd.isEqual(propertyNode.valueToken.end) ? -1 : selectionEnd.character - propertyNode.valueToken.start.character - 1;
    }
    let [newSelectionStartOffset, newSelectionEndOffset] = direction === 'prev' ? util_1.findPrevWord(propertyValue, pos) : util_1.findNextWord(propertyValue, pos);
    if (!newSelectionStartOffset && !newSelectionEndOffset) {
        return;
    }
    const newSelectionStart = propertyNode.valueToken.start.translate(0, newSelectionStartOffset);
    const newSelectionEnd = propertyNode.valueToken.start.translate(0, newSelectionEndOffset);
    return new vscode.Selection(newSelectionStart, newSelectionEnd);
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/* Based on @sergeche's work in his emmet plugin */
const vscode = __webpack_require__(1);
const math_expression_1 = __webpack_require__(34);
const bufferStream_1 = __webpack_require__(9);
function evaluateMathExpression() {
    if (!vscode.window.activeTextEditor) {
        vscode.window.showInformationMessage('No editor is active');
        return;
    }
    const editor = vscode.window.activeTextEditor;
    const stream = new bufferStream_1.DocumentStreamReader(editor.document);
    editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            const pos = selection.isReversed ? selection.anchor : selection.active;
            stream.pos = pos;
            try {
                const result = String(math_expression_1.default(stream, true));
                editBuilder.replace(new vscode.Range(stream.pos, pos), result);
            }
            catch (err) {
                vscode.window.showErrorMessage('Could not evaluate expression');
                // Ignore error since most likely it’s because of non-math expression
                console.warn('Math evaluation error', err);
            }
        });
    });
}
exports.evaluateMathExpression = evaluateMathExpression;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



/**
 * Fixes StreamReader design flaw: check if stream is at the start-of-file
 * @param  {StreamReader}  stream
 * @return {Boolean}
 */
function isSoF(stream) {
	return stream.sof ? stream.sof() : stream.pos <= 0;
}

const DOT = 46; // .

/**
 * Consumes number from given stream, either in forward or backward direction
 * @param {StreamReader} stream
 * @param {Boolean}      backward Consume number in backward direction
 */
var consumeNumber = function(stream, backward) {
	return backward ? consumeBackward(stream) : consumeForward(stream);
};

/**
 * Consumes number in forward stream direction
 * @param  {StreamReader} stream
 * @return {Boolean}        Returns true if number was consumed
 */
function consumeForward(stream) {
	const start = stream.pos;
	if (stream.eat(DOT) && stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])) {
		// short decimal notation: .025
		return true;
	}

	if (stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"]) && (!stream.eat(DOT) || stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"]))) {
		// either integer or decimal: 10, 10.25
		return true;
	}

	stream.pos = start;
	return false;
}

/**
 * Consumes number in backward stream direction
 * @param  {StreamReader} stream
 * @return {Boolean}        Returns true if number was consumed
 */
function consumeBackward(stream) {
	const start = stream.pos;
	let ch, hadDot = false, hadNumber = false;
	// NB a StreamReader insance can be editor-specific and contain objects
	// as a position marker. Since we don’t know for sure how to compare editor
	// position markers, use consumed length instead to detect if number was consumed
	let len = 0;

	while (!isSoF(stream)) {
		stream.backUp(1);
		ch = stream.peek();

		if (ch === DOT && !hadDot && hadNumber) {
			hadDot = true;
		} else if (!Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"])(ch)) {
			stream.next();
			break;
		}

		hadNumber = true;
		len++;
	}

	if (len) {
		const pos = stream.pos;
		stream.start = pos;
		stream.pos = start;
		return true;
	}

	stream.pos = start;
	return false;
}

/**
 * Expression parser and tokenizer
 */
// token types
const NUMBER = 'num';
const OP1    = 'op1';
const OP2    = 'op2';

// operators
const PLUS              = 43; // +
const MINUS             = 45; // -
const MULTIPLY          = 42; // *
const DIVIDE            = 47; // /
const INT_DIVIDE        = 92; // \
const LEFT_PARENTHESIS  = 40; // (
const RIGHT_PARENTHESIS = 41; // )

// parser states
const PRIMARY      = 1 << 0;
const OPERATOR     = 1 << 1;
const LPAREN       = 1 << 2;
const RPAREN       = 1 << 3;
const SIGN         = 1 << 4;
const NULLARY_CALL = 1 << 5;

class Token {
	constructor(type, value, priority) {
		this.type = type;
		this.value = value;
		this.priority = priority || 0;
	}
}

const nullary = new Token(NULLARY_CALL);

function parse(expr, backward) {
	return backward ? parseBackward(expr) : parseForward(expr);
}

/**
 * Parses given expression in forward direction
 * @param  {String|StreamReader} expr
 * @return {Token[]}
 */
function parseForward(expr) {
	const stream = typeof expr === 'object' ? expr : new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](expr);
	let ch, priority = 0;
	let expected = (PRIMARY | LPAREN | SIGN);
	const tokens = [];

	while (!stream.eof()) {
		stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isWhiteSpace"]);
		stream.start = stream.pos;

		if (consumeNumber(stream)) {
			if ((expected & PRIMARY) === 0) {
				error('Unexpected number', stream);
			}

			tokens.push( number(stream.current()) );
			expected = (OPERATOR | RPAREN);
		} else if (isOperator(stream.peek())) {
			ch = stream.next();
			if (isSign(ch) && (expected & SIGN)) {
				if (isNegativeSign(ch)) {
					tokens.push(op1(ch, priority));
				}
				expected = (PRIMARY | LPAREN | SIGN);
			} else {
				if ((expected & OPERATOR) === 0) {
					error('Unexpected operator', stream);
				}
				tokens.push(op2(ch, priority));
				expected = (PRIMARY | LPAREN | SIGN);
			}
		} else if (stream.eat(LEFT_PARENTHESIS)) {
			if ((expected & LPAREN) === 0) {
				error('Unexpected "("', stream);
			}

			priority += 10;
			expected = (PRIMARY | LPAREN | SIGN | NULLARY_CALL);
		} else if (stream.eat(RIGHT_PARENTHESIS)) {
			priority -= 10;

			if (expected & NULLARY_CALL) {
				tokens.push(nullary);
			} else if ((expected & RPAREN) === 0) {
				error('Unexpected ")"', stream);
			}

			expected = (OPERATOR | RPAREN | LPAREN);
		} else {
			error('Unknown character', stream);
		}
	}

	if (priority < 0 || priority >= 10) {
		error('Unmatched "()"', stream);
	}

	const result = orderTokens(tokens);

	if (result === null) {
		error('Parity', stream);
	}

	return result;
}

/**
 * Parses given exprssion in reverse order, e.g. from back to end, and stops when
 * first unknown character was found
 * @param  {String|StreamReader} expr
 * @return {Array}
 */
function parseBackward(expr) {
	let stream;
	if (typeof expr === 'object') {
		stream = expr;
	} else {
		stream = new _emmetio_stream_reader__WEBPACK_IMPORTED_MODULE_0__["default"](expr);
		stream.start = stream.pos = expr.length;
	}

	let ch, priority = 0;
	let expected = (PRIMARY | RPAREN);
	const tokens = [];

	while (!isSoF(stream)) {
		if (consumeNumber(stream, true)) {
			if ((expected & PRIMARY) === 0) {
				error('Unexpected number', stream);
			}

			tokens.push( number(stream.current()) );
			expected = (OPERATOR | SIGN | LPAREN);

			// NB should explicitly update stream position for backward direction
			stream.pos = stream.start;
		} else {
			stream.backUp(1);
			ch = stream.peek();

			if (isOperator(ch)) {
				if (isSign(ch) && (expected & SIGN) && isReverseSignContext(stream)) {
					if (isNegativeSign(ch)) {
						tokens.push(op1(ch, priority));
					}
					expected = (LPAREN | RPAREN | OPERATOR | PRIMARY);
				} else {
					if ((expected & OPERATOR) === 0) {
						stream.next();
						break;
					}
					tokens.push(op2(ch, priority));
					expected = (PRIMARY | RPAREN);
				}
			} else if (ch === RIGHT_PARENTHESIS) {
				if ((expected & RPAREN) === 0) {
					stream.next();
					break;
				}

				priority += 10;
				expected = (PRIMARY | RPAREN | LPAREN);
			} else if (ch === LEFT_PARENTHESIS) {
				priority -= 10;

				if (expected & NULLARY_CALL) {
					tokens.push(nullary);
				} else if ((expected & LPAREN) === 0) {
					stream.next();
					break;
				}

				expected = (OPERATOR | SIGN | LPAREN | NULLARY_CALL);
			} else if (!Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isWhiteSpace"])(ch)) {
				stream.next();
				break;
			}
		}
	}

	if (priority < 0 || priority >= 10) {
		error('Unmatched "()"', stream);
	}

	const result = orderTokens(tokens.reverse());
	if (result === null) {
		error('Parity', stream);
	}

	// edge case: expression is preceded by white-space;
	// move stream position back to expression start
	stream.eatWhile(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isWhiteSpace"]);

	return result;
}

/**
 * Orders parsed tokens (operands and operators) in given array so that they are
 * laid off in order of execution
 * @param  {Token[]} tokens
 * @return {Token[]}
 */
function orderTokens(tokens) {
	const operators = [], operands = [];
	let noperators = 0;

	for (let i = 0, token; i < tokens.length; i++) {
		token = tokens[i];

		if (token.type === NUMBER) {
			operands.push(token);
		} else {
			noperators += token.type === OP1 ? 1 : 2;

			while (operators.length) {
				if (token.priority <= operators[operators.length - 1].priority) {
					operands.push(operators.pop());
				} else {
					break;
				}
			}

			operators.push(token);
		}
	}

	return noperators + 1 === operands.length + operators.length
		? operands.concat(operators.reverse())
		: null /* parity */;
}

/**
 * Check if current stream state is in sign (e.g. positive or negative) context
 * for reverse parsing
 * @param  {StreamReader} stream
 * @return {Boolean}
 */
function isReverseSignContext(stream) {
	const start = stream.pos;
	let ch, inCtx = true;

	while (!isSoF(stream)) {
		stream.backUp(1);
		ch = stream.peek();

		if (Object(_emmetio_stream_reader_utils__WEBPACK_IMPORTED_MODULE_1__["isWhiteSpace"])(ch)) {
			continue;
		}

		inCtx = ch === LEFT_PARENTHESIS || isOperator(ch);
		break;
	}

	stream.pos = start;
	return inCtx;
}

/**
 * Number token factory
 * @param  {String} value
 * @param  {Number} [priority ]
 * @return {Token}
 */
function number(value, priority) {
	return new Token(NUMBER, parseFloat(value), priority);
}

/**
 * Unary operator factory
 * @param  {Number} value    Operator  character code
 * @param  {Number} priority Operator execution priority
 * @return {Token[]}
 */
function op1(value, priority) {
	if (value === MINUS) {
		priority += 2;
	}
	return new Token(OP1, value, priority);
}

/**
 * Binary operator factory
 * @param  {Number} value    Operator  character code
 * @param  {Number} priority Operator execution priority
 * @return {Token[]}
 */
function op2(value, priority) {
	if (value === MULTIPLY) {
		priority += 1;
	} else if (value === DIVIDE || value === INT_DIVIDE) {
		priority += 2;
	}

	return new Token(OP2, value, priority);
}

function error(name, stream) {
	if (stream) {
		name += ` at column ${stream.start} of expression`;
	}
	throw new Error(name);
}

function isSign(ch) {
	return isPositiveSign(ch) || isNegativeSign(ch);
}

function isPositiveSign(ch) {
	return ch === PLUS;
}

function isNegativeSign(ch) {
	return ch === MINUS;
}

function isOperator(ch) {
	return ch === PLUS || ch === MINUS || ch === MULTIPLY
		|| ch === DIVIDE || ch === INT_DIVIDE;
}

const ops1 = {
	[MINUS]: num => -num
};

const ops2 = {
	[PLUS]:       (a, b) => a + b,
	[MINUS]:      (a, b) => a - b,
	[MULTIPLY]:   (a, b) => a * b,
	[DIVIDE]:     (a, b) => a / b,
	[INT_DIVIDE]: (a, b) => Math.floor(a / b)
};

/**
 * Evaluates given math expression
 * @param  {String|StreamReader|Array} expr Expression to evaluate
 * @param  {Boolean}                   [backward] Parses given expression (string
 *                                                or stream) in backward direction
 * @return {Number}
 */
var index = function(expr, backward) {
	if (!Array.isArray(expr)) {
		expr = parse(expr, backward);
	}

	if (!expr || !expr.length) {
		return null;
	}

	const nstack = [];
	let n1, n2, f;
	let item, value;

	for (let i = 0, il = expr.length, token; i < il; i++) {
		token = expr[i];
		if (token.type === NUMBER) {
			nstack.push(token.value);
		} else if (token.type === OP2) {
			n2 = nstack.pop();
			n1 = nstack.pop();
			f = ops2[token.value];
			nstack.push(f(n1, n2));
		} else if (token.type === OP1) {
			n1 = nstack.pop();
			f = ops1[token.value];
			nstack.push(f(n1));
		} else {
			throw new Error('Invalid expression');
		}
	}

	if (nstack.length > 1) {
		throw new Error('Invalid Expression (parity)');
	}

	return nstack[0];
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/* Based on @sergeche's work in his emmet plugin */
const vscode = __webpack_require__(1);
const reNumber = /[0-9]/;
/**
 * Incerement number under caret of given editor
 */
function incrementDecrement(delta) {
    if (!vscode.window.activeTextEditor) {
        vscode.window.showInformationMessage('No editor is active');
        return;
    }
    const editor = vscode.window.activeTextEditor;
    return editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
            let rangeToReplace = locate(editor.document, selection.isReversed ? selection.anchor : selection.active);
            if (!rangeToReplace) {
                return;
            }
            const text = editor.document.getText(rangeToReplace);
            if (isValidNumber(text)) {
                editBuilder.replace(rangeToReplace, update(text, delta));
            }
        });
    });
}
exports.incrementDecrement = incrementDecrement;
/**
 * Updates given number with `delta` and returns string formatted according
 * to original string format
 */
function update(numString, delta) {
    let m;
    let decimals = (m = numString.match(/\.(\d+)$/)) ? m[1].length : 1;
    let output = String((parseFloat(numString) + delta).toFixed(decimals)).replace(/\.0+$/, '');
    if (m = numString.match(/^\-?(0\d+)/)) {
        // padded number: preserve padding
        output = output.replace(/^(\-?)(\d+)/, (_, minus, prefix) => minus + '0'.repeat(Math.max(0, (m ? m[1].length : 0) - prefix.length)) + prefix);
    }
    if (/^\-?\./.test(numString)) {
        // omit integer part
        output = output.replace(/^(\-?)0+/, '$1');
    }
    return output;
}
exports.update = update;
/**
 * Locates number from given position in the document
 *
 * @return Range of number or `undefined` if not found
 */
function locate(document, pos) {
    const line = document.lineAt(pos.line).text;
    let start = pos.character;
    let end = pos.character;
    let hadDot = false, hadMinus = false;
    let ch;
    while (start > 0) {
        ch = line[--start];
        if (ch === '-') {
            hadMinus = true;
            break;
        }
        else if (ch === '.' && !hadDot) {
            hadDot = true;
        }
        else if (!reNumber.test(ch)) {
            start++;
            break;
        }
    }
    if (line[end] === '-' && !hadMinus) {
        end++;
    }
    while (end < line.length) {
        ch = line[end++];
        if (ch === '.' && !hadDot && reNumber.test(line[end])) {
            // A dot must be followed by a number. Otherwise stop parsing
            hadDot = true;
        }
        else if (!reNumber.test(ch)) {
            end--;
            break;
        }
    }
    // ensure that found range contains valid number
    if (start !== end && isValidNumber(line.slice(start, end))) {
        return new vscode.Range(pos.line, start, pos.line, end);
    }
    return;
}
exports.locate = locate;
/**
 * Check if given string contains valid number
 */
function isValidNumber(str) {
    return str ? !isNaN(parseFloat(str)) : false;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// Based on @sergeche's work on the emmet plugin for atom
const vscode_1 = __webpack_require__(1);
const path = __webpack_require__(15);
const imageSizeHelper_1 = __webpack_require__(37);
const util_1 = __webpack_require__(4);
const locateFile_1 = __webpack_require__(55);
const css_parser_1 = __webpack_require__(8);
const bufferStream_1 = __webpack_require__(9);
/**
 * Updates size of context image in given editor
 */
function updateImageSize() {
    if (!util_1.validate() || !vscode_1.window.activeTextEditor) {
        return;
    }
    const editor = vscode_1.window.activeTextEditor;
    let allUpdatesPromise = editor.selections.reverse().map(selection => {
        let position = selection.isReversed ? selection.active : selection.anchor;
        if (!util_1.isStyleSheet(editor.document.languageId)) {
            return updateImageSizeHTML(editor, position);
        }
        else {
            return updateImageSizeCSSFile(editor, position);
        }
    });
    return Promise.all(allUpdatesPromise).then((updates) => {
        return editor.edit(builder => {
            updates.forEach(update => {
                update.forEach((textEdit) => {
                    builder.replace(textEdit.range, textEdit.newText);
                });
            });
        });
    });
}
exports.updateImageSize = updateImageSize;
/**
 * Updates image size of context tag of HTML model
 */
function updateImageSizeHTML(editor, position) {
    const imageNode = getImageHTMLNode(editor, position);
    const src = imageNode && getImageSrcHTML(imageNode);
    if (!src) {
        return updateImageSizeStyleTag(editor, position);
    }
    return locateFile_1.locateFile(path.dirname(editor.document.fileName), src)
        .then(imageSizeHelper_1.getImageSize)
        .then((size) => {
        // since this action is asynchronous, we have to ensure that editor wasn’t
        // changed and user didn’t moved caret outside <img> node
        const img = getImageHTMLNode(editor, position);
        if (img && getImageSrcHTML(img) === src) {
            return updateHTMLTag(editor, img, size.width, size.height);
        }
        return [];
    })
        .catch(err => { console.warn('Error while updating image size:', err); return []; });
}
function updateImageSizeStyleTag(editor, position) {
    const getPropertyInsiderStyleTag = (editor) => {
        const rootNode = util_1.parseDocument(editor.document);
        const currentNode = util_1.getNode(rootNode, position, true);
        if (currentNode && currentNode.name === 'style'
            && currentNode.open.end.isBefore(position)
            && currentNode.close.start.isAfter(position)) {
            let buffer = new bufferStream_1.DocumentStreamReader(editor.document, currentNode.open.end, new vscode_1.Range(currentNode.open.end, currentNode.close.start));
            let rootNode = css_parser_1.default(buffer);
            const node = util_1.getNode(rootNode, position, true);
            return (node && node.type === 'property') ? node : null;
        }
        return null;
    };
    return updateImageSizeCSS(editor, position, getPropertyInsiderStyleTag);
}
function updateImageSizeCSSFile(editor, position) {
    return updateImageSizeCSS(editor, position, getImageCSSNode);
}
/**
 * Updates image size of context rule of stylesheet model
 */
function updateImageSizeCSS(editor, position, fetchNode) {
    const node = fetchNode(editor, position);
    const src = node && getImageSrcCSS(node, position);
    if (!src) {
        return Promise.reject(new Error('No valid image source'));
    }
    return locateFile_1.locateFile(path.dirname(editor.document.fileName), src)
        .then(imageSizeHelper_1.getImageSize)
        .then((size) => {
        // since this action is asynchronous, we have to ensure that editor wasn’t
        // changed and user didn’t moved caret outside <img> node
        const prop = fetchNode(editor, position);
        if (prop && getImageSrcCSS(prop, position) === src) {
            return updateCSSNode(editor, prop, size.width, size.height);
        }
        return [];
    })
        .catch(err => { console.warn('Error while updating image size:', err); return []; });
}
/**
 * Returns <img> node under caret in given editor or `null` if such node cannot
 * be found
 */
function getImageHTMLNode(editor, position) {
    const rootNode = util_1.parseDocument(editor.document);
    const node = util_1.getNode(rootNode, position, true);
    return node && node.name.toLowerCase() === 'img' ? node : null;
}
/**
 * Returns css property under caret in given editor or `null` if such node cannot
 * be found
 */
function getImageCSSNode(editor, position) {
    const rootNode = util_1.parseDocument(editor.document);
    const node = util_1.getNode(rootNode, position, true);
    return node && node.type === 'property' ? node : null;
}
/**
 * Returns image source from given <img> node
 */
function getImageSrcHTML(node) {
    const srcAttr = getAttribute(node, 'src');
    if (!srcAttr) {
        return;
    }
    return srcAttr.value.value;
}
/**
 * Returns image source from given `url()` token
 */
function getImageSrcCSS(node, position) {
    if (!node) {
        return;
    }
    const urlToken = findUrlToken(node, position);
    if (!urlToken) {
        return;
    }
    // A stylesheet token may contain either quoted ('string') or unquoted URL
    let urlValue = urlToken.item(0);
    if (urlValue && urlValue.type === 'string') {
        urlValue = urlValue.item(0);
    }
    return urlValue && urlValue.valueOf();
}
/**
 * Updates size of given HTML node
 */
function updateHTMLTag(editor, node, width, height) {
    const srcAttr = getAttribute(node, 'src');
    const widthAttr = getAttribute(node, 'width');
    const heightAttr = getAttribute(node, 'height');
    const quote = getAttributeQuote(editor, srcAttr);
    const endOfAttributes = node.attributes[node.attributes.length - 1].end;
    let edits = [];
    let textToAdd = '';
    if (!widthAttr) {
        textToAdd += ` width=${quote}${width}${quote}`;
    }
    else {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(widthAttr.value.start, widthAttr.value.end), String(width)));
    }
    if (!heightAttr) {
        textToAdd += ` height=${quote}${height}${quote}`;
    }
    else {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(heightAttr.value.start, heightAttr.value.end), String(height)));
    }
    if (textToAdd) {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(endOfAttributes, endOfAttributes), textToAdd));
    }
    return edits;
}
/**
 * Updates size of given CSS rule
 */
function updateCSSNode(editor, srcProp, width, height) {
    const rule = srcProp.parent;
    const widthProp = util_1.getCssPropertyFromRule(rule, 'width');
    const heightProp = util_1.getCssPropertyFromRule(rule, 'height');
    // Detect formatting
    const separator = srcProp.separator || ': ';
    const before = getPropertyDelimitor(editor, srcProp);
    let edits = [];
    if (!srcProp.terminatorToken) {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(srcProp.end, srcProp.end), ';'));
    }
    let textToAdd = '';
    if (!widthProp) {
        textToAdd += `${before}width${separator}${width}px;`;
    }
    else {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(widthProp.valueToken.start, widthProp.valueToken.end), `${width}px`));
    }
    if (!heightProp) {
        textToAdd += `${before}height${separator}${height}px;`;
    }
    else {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(heightProp.valueToken.start, heightProp.valueToken.end), `${height}px`));
    }
    if (textToAdd) {
        edits.push(new vscode_1.TextEdit(new vscode_1.Range(srcProp.end, srcProp.end), textToAdd));
    }
    return edits;
}
/**
 * Returns attribute object with `attrName` name from given HTML node
 */
function getAttribute(node, attrName) {
    attrName = attrName.toLowerCase();
    return node && node.open.attributes.find((attr) => attr.name.value.toLowerCase() === attrName);
}
/**
 * Returns quote character, used for value of given attribute. May return empty
 * string if attribute wasn’t quoted

 */
function getAttributeQuote(editor, attr) {
    const range = new vscode_1.Range(attr.value ? attr.value.end : attr.end, attr.end);
    return range.isEmpty ? '' : editor.document.getText(range);
}
/**
 * Finds 'url' token for given `pos` point in given CSS property `node`
 */
function findUrlToken(node, pos) {
    for (let i = 0, il = node.parsedValue.length, url; i < il; i++) {
        util_1.iterateCSSToken(node.parsedValue[i], (token) => {
            if (token.type === 'url' && token.start.isBeforeOrEqual(pos) && token.end.isAfterOrEqual(pos)) {
                url = token;
                return false;
            }
            return true;
        });
        if (url) {
            return url;
        }
    }
    return;
}
/**
 * Returns a string that is used to delimit properties in current node’s rule
 */
function getPropertyDelimitor(editor, node) {
    let anchor;
    if (anchor = (node.previousSibling || node.parent.contentStartToken)) {
        return editor.document.getText(new vscode_1.Range(anchor.end, node.start));
    }
    else if (anchor = (node.nextSibling || node.parent.contentEndToken)) {
        return editor.document.getText(new vscode_1.Range(node.end, anchor.start));
    }
    return '';
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// Based on @sergeche's work on the emmet plugin for atom
// TODO: Move to https://github.com/emmetio/image-size
const path = __webpack_require__(15);
const http = __webpack_require__(38);
const https = __webpack_require__(39);
const url_1 = __webpack_require__(40);
const sizeOf = __webpack_require__(41);
const reUrl = /^https?:/;
/**
 * Get size of given image file. Supports files from local filesystem,
 * as well as URLs
 */
function getImageSize(file) {
    file = file.replace(/^file:\/\//, '');
    return reUrl.test(file) ? getImageSizeFromURL(file) : getImageSizeFromFile(file);
}
exports.getImageSize = getImageSize;
/**
 * Get image size from file on local file system
 */
function getImageSizeFromFile(file) {
    return new Promise((resolve, reject) => {
        const isDataUrl = file.match(/^data:.+?;base64,/);
        if (isDataUrl) {
            // NB should use sync version of `sizeOf()` for buffers
            try {
                const data = Buffer.from(file.slice(isDataUrl[0].length), 'base64');
                return resolve(sizeForFileName('', sizeOf(data)));
            }
            catch (err) {
                return reject(err);
            }
        }
        sizeOf(file, (err, size) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(sizeForFileName(path.basename(file), size));
            }
        });
    });
}
/**
 * Get image size from given remove URL
 */
function getImageSizeFromURL(urlStr) {
    return new Promise((resolve, reject) => {
        const url = url_1.parse(urlStr);
        const getTransport = url.protocol === 'https:' ? https.get : http.get;
        if (!url.pathname) {
            return reject('Given url doesnt have pathname property');
        }
        const urlPath = url.pathname;
        getTransport(url, resp => {
            const chunks = [];
            let bufSize = 0;
            const trySize = (chunks) => {
                try {
                    const size = sizeOf(Buffer.concat(chunks, bufSize));
                    resp.removeListener('data', onData);
                    resp.destroy(); // no need to read further
                    resolve(sizeForFileName(path.basename(urlPath), size));
                }
                catch (err) {
                    // might not have enough data, skip error
                }
            };
            const onData = (chunk) => {
                bufSize += chunk.length;
                chunks.push(chunk);
                trySize(chunks);
            };
            resp
                .on('data', onData)
                .on('end', () => trySize(chunks))
                .once('error', err => {
                resp.removeListener('data', onData);
                reject(err);
            });
        })
            .once('error', reject);
    });
}
/**
 * Returns size object for given file name. If file name contains `@Nx` token,
 * the final dimentions will be downscaled by N
 */
function sizeForFileName(fileName, size) {
    const m = fileName.match(/@(\d+)x\./);
    const scale = m ? +m[1] : 1;
    return {
        realWidth: size.width,
        realHeight: size.height,
        width: Math.floor(size.width / scale),
        height: Math.floor(size.height / scale)
    };
}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(16);
var path = __webpack_require__(15);

var detector = __webpack_require__(42);

var handlers = {};
var types = __webpack_require__(43);

// load all available handlers
types.forEach(function (type) {
  handlers[type] = __webpack_require__(44)("./" + type);
});

// Maximum buffer size, with a default of 128 kilobytes.
// TO-DO: make this adaptive based on the initial signature of the image
var MaxBufferSize = 128*1024;

function lookup (buffer, filepath) {
  // detect the file type.. don't rely on the extension
  var type = detector(buffer, filepath);

  // find an appropriate handler for this file type
  if (type in handlers) {
    var size = handlers[type].calculate(buffer, filepath);
    if (size !== false) {
      size.type = type;
      return size;
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type: ' + type + ' (file: ' + filepath + ')');
}

function asyncFileToBuffer (filepath, callback) {
  // open the file in read only mode
  fs.open(filepath, 'r', function (err, descriptor) {
    if (err) { return callback(err); }
    var size = fs.fstatSync(descriptor).size;
    if (size <= 0){return callback(new Error("File size is not greater than 0 —— " + filepath)); }
    var bufferSize = Math.min(size, MaxBufferSize);
    var buffer = new Buffer(bufferSize);
    // read first buffer block from the file, asynchronously
    fs.read(descriptor, buffer, 0, bufferSize, 0, function (err) {
      if (err) { return callback(err); }
      // close the file, we are done
      fs.close(descriptor, function (err) {
        callback(err, buffer);
      });
    });
  });
}

function syncFileToBuffer (filepath) {
  // read from the file, synchronously
  var descriptor = fs.openSync(filepath, 'r');
  var size = fs.fstatSync(descriptor).size;
  var bufferSize = Math.min(size, MaxBufferSize);
  var buffer = new Buffer(bufferSize);
  fs.readSync(descriptor, buffer, 0, bufferSize, 0);
  fs.closeSync(descriptor);
  return buffer;
}

/**
 * @params input - buffer or relative/absolute path of the image file
 * @params callback - optional function for async detection
 */
module.exports = function (input, callback) {

  // Handle buffer input
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }

  // input should be a string at this point
  if (typeof input !== 'string') {
    throw new TypeError('invalid invocation');
  }

  // resolve the file path
  var filepath = path.resolve(input);

  if (typeof callback === 'function') {
    asyncFileToBuffer(filepath, function (err, buffer) {
      if (err) { return callback(err); }

      // return the dimensions
      var dimensions;
      try {
        dimensions = lookup(buffer, filepath);
      } catch (e) {
        err = e;
      }
      callback(err, dimensions);
    });
  } else {
    var buffer = syncFileToBuffer(filepath);
    return lookup(buffer, filepath);
  }
};

module.exports.types = types;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typeMap = {};
var types = __webpack_require__(43);

// load all available handlers
types.forEach(function (type) {
  typeMap[type] = __webpack_require__(44)("./" + type).detect;
});

module.exports = function (buffer, filepath) {
  var type, result;
  for (type in typeMap) {
    result = typeMap[type](buffer, filepath);
    if (result) {
      return type;
    }
  }
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [
  'bmp',
  'gif',
  'jpg',
  'png',
  'psd',
  'svg',
  'tiff',
  'webp',
  'dds'
];


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bmp": 45,
	"./bmp.js": 45,
	"./dds": 46,
	"./dds.js": 46,
	"./gif": 47,
	"./gif.js": 47,
	"./jpg": 48,
	"./jpg.js": 48,
	"./png": 49,
	"./png.js": 49,
	"./psd": 50,
	"./psd.js": 50,
	"./svg": 51,
	"./svg.js": 51,
	"./tiff": 52,
	"./tiff.js": 52,
	"./webp": 54,
	"./webp.js": 54
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isBMP (buffer) {
  return ('BM' === buffer.toString('ascii', 0, 2));
}

function calculate (buffer) {
  return {
    'width': buffer.readUInt32LE(18),
    'height': Math.abs(buffer.readInt32LE(22))
  };
}

module.exports = {
  'detect': isBMP,
  'calculate': calculate
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isDDS(buffer){
	return buffer.readUInt32LE(0) === 0x20534444;
}

function calculate(buffer){
	// read file resolution metadata
	return {
		'height': buffer.readUInt32LE(12),
		'width': buffer.readUInt32LE(16)
	};
}

module.exports = {
	'detect': isDDS,
	'calculate': calculate
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var gifRegexp = /^GIF8[79]a/;
function isGIF (buffer) {
  var signature = buffer.toString('ascii', 0, 6);
  return (gifRegexp.test(signature));
}

function calculate(buffer) {
  return {
    'width': buffer.readUInt16LE(6),
    'height': buffer.readUInt16LE(8)
  };
}

module.exports = {
  'detect': isGIF,
  'calculate': calculate
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// NOTE: we only support baseline and progressive JPGs here
// due to the structure of the loader class, we only get a buffer
// with a maximum size of 4096 bytes. so if the SOF marker is outside
// if this range we can't detect the file size correctly.

function isJPG (buffer) { //, filepath
  var SOIMarker = buffer.toString('hex', 0, 2);
  return ('ffd8' === SOIMarker);
}

function extractSize (buffer, i) {
  return {
    'height' : buffer.readUInt16BE(i),
    'width' : buffer.readUInt16BE(i + 2)
  };
}

function validateBuffer (buffer, i) {
  // index should be within buffer limits
  if (i > buffer.length) {
    throw new TypeError('Corrupt JPG, exceeded buffer limits');
  }
  // Every JPEG block must begin with a 0xFF
  if (buffer[i] !== 0xFF) {
    throw new TypeError('Invalid JPG, marker table corrupted');
  }
}

function calculate (buffer) {

  // Skip 4 chars, they are for signature
  buffer = buffer.slice(4);

  var i, next;
  while (buffer.length) {
    // read length of the next block
    i = buffer.readUInt16BE(0);

    // ensure correct format
    validateBuffer(buffer, i);

    // 0xFFC0 is baseline standard(SOF)
    // 0xFFC1 is baseline optimized(SOF)
    // 0xFFC2 is progressive(SOF2)
    next = buffer[i + 1];
    if (next === 0xC0 || next === 0xC1 || next === 0xC2) {
      return extractSize(buffer, i + 5);
    }

    // move to the next block
    buffer = buffer.slice(i + 2);
  }

  throw new TypeError('Invalid JPG, no size found');
}

module.exports = {
  'detect': isJPG,
  'calculate': calculate
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pngSignature = 'PNG\r\n\x1a\n';
var pngImageHeaderChunkName = 'IHDR';
var pngFriedChunkName = 'CgBI'; // Used to detect "fried" png's: http://www.jongware.com/pngdefry.html

function isPNG (buffer) {
  if (pngSignature === buffer.toString('ascii', 1, 8)) {
    var chunkName = buffer.toString('ascii', 12, 16);
    if (chunkName === pngFriedChunkName) {
      chunkName = buffer.toString('ascii', 28, 32);
    }
    if (chunkName !== pngImageHeaderChunkName) {
      throw new TypeError('invalid png');
    }
    return true;
  }
}

function calculate (buffer) {
  if (buffer.toString('ascii', 12, 16) === pngFriedChunkName) {
    return {
      'width': buffer.readUInt32BE(32),
      'height': buffer.readUInt32BE(36)
    };
  }
  return {
    'width': buffer.readUInt32BE(16),
    'height': buffer.readUInt32BE(20)
  };
}

module.exports = {
  'detect': isPNG,
  'calculate': calculate
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isPSD (buffer) {
  return ('8BPS' === buffer.toString('ascii', 0, 4));
}

function calculate (buffer) {
  return {
    'width': buffer.readUInt32BE(18),
    'height': buffer.readUInt32BE(14)
  };
}

module.exports = {
  'detect': isPSD,
  'calculate': calculate
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svgReg = /<svg[^>]+[^>]*>/;
function isSVG (buffer) {
  return svgReg.test(buffer);
}

var extractorRegExps = {
  'root': /<svg\s[^>]+>/,
  'width': /\bwidth=(['"])([^%]+?)\1/,
  'height': /\bheight=(['"])([^%]+?)\1/,
  'viewbox': /\bviewBox=(['"])(.+?)\1/
};

function parseViewbox (viewbox) {
  var bounds = viewbox.split(' ');
  return {
    'width': parseInt(bounds[2], 10),
    'height': parseInt(bounds[3], 10)
  };
}

function parseAttributes (root) {
  var width = root.match(extractorRegExps.width);
  var height = root.match(extractorRegExps.height);
  var viewbox = root.match(extractorRegExps.viewbox);
  return {
    'width': width && parseInt(width[2], 10),
    'height': height && parseInt(height[2], 10),
    'viewbox': viewbox && parseViewbox(viewbox[2])
  };
}

function calculateByDimensions (attrs) {
  return {
    'width': attrs.width,
    'height': attrs.height
  };
}

function calculateByViewbox (attrs) {
  var ratio = attrs.viewbox.width / attrs.viewbox.height;
  if (attrs.width) {
    return {
      'width': attrs.width,
      'height': Math.floor(attrs.width / ratio)
    };
  }
  if (attrs.height) {
    return {
      'width': Math.floor(attrs.height * ratio),
      'height': attrs.height
    };
  }
  return {
    'width': attrs.viewbox.width,
    'height': attrs.viewbox.height
  };
}

function calculate (buffer) {
  var root = buffer.toString('utf8').match(extractorRegExps.root);
  if (root) {
    var attrs = parseAttributes(root[0]);
    if (attrs.width && attrs.height) {
      return calculateByDimensions(attrs);
    }
    if (attrs.viewbox) {
      return calculateByViewbox(attrs);
    }
  }
  throw new TypeError('invalid svg');
}

module.exports = {
  'detect': isSVG,
  'calculate': calculate
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// based on http://www.compix.com/fileformattif.htm
// TO-DO: support big-endian as well

var fs = __webpack_require__(16);
var readUInt = __webpack_require__(53);

function isTIFF (buffer) {
  var hex4 = buffer.toString('hex', 0, 4);
  return ('49492a00' === hex4 || '4d4d002a' === hex4);
}

// Read IFD (image-file-directory) into a buffer
function readIFD (buffer, filepath, isBigEndian) {

  var ifdOffset = readUInt(buffer, 32, 4, isBigEndian);

  // read only till the end of the file
  var bufferSize = 1024;
  var fileSize = fs.statSync(filepath).size;
  if (ifdOffset + bufferSize > fileSize) {
    bufferSize = fileSize - ifdOffset - 10;
  }

  // populate the buffer
  var endBuffer = new Buffer(bufferSize);
  var descriptor = fs.openSync(filepath, 'r');
  fs.readSync(descriptor, endBuffer, 0, bufferSize, ifdOffset);

  // var ifdLength = readUInt(endBuffer, 16, 0, isBigEndian);
  var ifdBuffer = endBuffer.slice(2); //, 2 + 12 * ifdLength);
  return ifdBuffer;
}

// TIFF values seem to be messed up on Big-Endian, this helps
function readValue (buffer, isBigEndian) {
  var low = readUInt(buffer, 16, 8, isBigEndian);
  var high = readUInt(buffer, 16, 10, isBigEndian);
  return (high << 16) + low;
}

// move to the next tag
function nextTag (buffer) {
  if (buffer.length > 24) {
    return buffer.slice(12);
  }
}

// Extract IFD tags from TIFF metadata
function extractTags (buffer, isBigEndian) {
  var tags = {};
  var code, type, length;

  while (buffer && buffer.length) {
    code = readUInt(buffer, 16, 0, isBigEndian);
    type = readUInt(buffer, 16, 2, isBigEndian);
    length = readUInt(buffer, 32, 4, isBigEndian);

    // 0 means end of IFD
    if (code === 0) {
      break;
    } else {
      // 256 is width, 257 is height
      // if (code === 256 || code === 257) {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(buffer, isBigEndian);
      }

      // move to the next tag
      buffer = nextTag(buffer);
    }
  }
  return tags;
}

// Test if the TIFF is Big Endian or Little Endian
function determineEndianness (buffer) {
  var signature = buffer.toString('ascii', 0, 2);
  if ('II' === signature) {
    return 'LE';
  } else if ('MM' === signature) {
    return 'BE';
  }
}

function calculate (buffer, filepath) {

  if (!filepath) {
    throw new TypeError('Tiff doesn\'t support buffer');
  }

  // Determine BE/LE
  var isBigEndian = determineEndianness(buffer) === 'BE';

  // read the IFD
  var ifdBuffer = readIFD(buffer, filepath, isBigEndian);

  // extract the tags from the IFD
  var tags = extractTags(ifdBuffer, isBigEndian);

  var width = tags[256];
  var height = tags[257];

  if (!width || !height) {
    throw new TypeError('Invalid Tiff, missing tags');
  }

  return {
    'width': width,
    'height': height
  };
}

module.exports = {
  'detect': isTIFF,
  'calculate': calculate
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Abstract reading multi-byte unsigned integers
function readUInt (buffer, bits, offset, isBigEndian) {
  offset = offset || 0;
  var endian = !!isBigEndian ? 'BE' : 'LE';
  var method = buffer['readUInt' + bits + endian];
  return method.call(buffer, offset);
}

module.exports = readUInt;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// based on https://developers.google.com/speed/webp/docs/riff_container

function isWebP (buffer) {
  var riffHeader = 'RIFF' === buffer.toString('ascii', 0, 4);
  var webpHeader = 'WEBP' === buffer.toString('ascii', 8, 12);
  var vp8Header  = 'VP8'  === buffer.toString('ascii', 12, 15);
  return (riffHeader && webpHeader && vp8Header);
}

function calculate (buffer) {
  var chunkHeader = buffer.toString('ascii', 12, 16);
  buffer = buffer.slice(20, 30);

  // Extended webp stream signature
  if (chunkHeader === 'VP8X') {
    var extendedHeader = buffer[0];
    var validStart = (extendedHeader & 0xc0) === 0;
    var validEnd = (extendedHeader & 0x01) === 0;
    if (validStart && validEnd) {
      return calculateExtended(buffer);
    } else {
      return false;
    }
  }

  // Lossless webp stream signature
  if (chunkHeader === 'VP8 ' && buffer[0] !== 0x2f) {
    return calculateLossy(buffer);
  }

  // Lossy webp stream signature
  var signature = buffer.toString('hex', 3, 6);
  if (chunkHeader === 'VP8L' && signature !== '9d012a') {
    return calculateLossless(buffer);
  }

  return false;
}

function calculateExtended (buffer) {
  return {
    'width': 1 + buffer.readUIntLE(4, 3),
    'height': 1 + buffer.readUIntLE(7, 3)
  }
}

function calculateLossless (buffer) {
  return {
    'width': 1 + (((buffer[2] & 0x3F) << 8) | buffer[1]),
    'height': 1 + (((buffer[4] & 0xF) << 10) | (buffer[3] << 2) |
                  ((buffer[2] & 0xC0) >> 6))
  };
}

function calculateLossy (buffer) {
  // `& 0x3fff` returns the last 14 bits
  // TO-DO: include webp scaling in the calculations
  return {
    'width': buffer.readInt16LE(6) & 0x3fff,
    'height': buffer.readInt16LE(8) & 0x3fff
  };
}

module.exports = {
  'detect': isWebP,
  'calculate': calculate
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
// Based on @sergeche's work on the emmet plugin for atom
// TODO: Move to https://github.com/emmetio/file-utils
const path = __webpack_require__(15);
const fs = __webpack_require__(16);
const reAbsolutePosix = /^\/+/;
const reAbsoluteWin32 = /^\\+/;
const reAbsolute = path.sep === '/' ? reAbsolutePosix : reAbsoluteWin32;
/**
 * Locates given `filePath` on user’s file system and returns absolute path to it.
 * This method expects either URL, or relative/absolute path to resource
 * @param basePath Base path to use if filePath is not absoulte
 * @param filePath File to locate.
 */
function locateFile(base, filePath) {
    if (/^\w+:/.test(filePath)) {
        // path with protocol, already absolute
        return Promise.resolve(filePath);
    }
    filePath = path.normalize(filePath);
    return reAbsolute.test(filePath)
        ? resolveAbsolute(base, filePath)
        : resolveRelative(base, filePath);
}
exports.locateFile = locateFile;
/**
 * Resolves relative file path
 */
function resolveRelative(basePath, filePath) {
    return tryFile(path.resolve(basePath, filePath));
}
/**
 * Resolves absolute file path agaist given editor: tries to find file in every
 * parent of editor’s file
 */
function resolveAbsolute(basePath, filePath) {
    return new Promise((resolve, reject) => {
        filePath = filePath.replace(reAbsolute, '');
        const next = (ctx) => {
            tryFile(path.resolve(ctx, filePath))
                .then(resolve, () => {
                const dir = path.dirname(ctx);
                if (!dir || dir === ctx) {
                    return reject(`Unable to locate absolute file ${filePath}`);
                }
                next(dir);
            });
        };
        next(basePath);
    });
}
/**
 * Check if given file exists and it’s a file, not directory
 */
function tryFile(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stat) => {
            if (err) {
                return reject(err);
            }
            if (!stat.isFile()) {
                return reject(new Error(`${file} is not a file`));
            }
            resolve(file);
        });
    });
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __webpack_require__(1);
const util_1 = __webpack_require__(4);
const vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
function reflectCssValue() {
    let editor = vscode_1.window.activeTextEditor;
    if (!editor) {
        vscode_1.window.showInformationMessage('No editor is active.');
        return;
    }
    let node = util_1.getCssPropertyFromDocument(editor, editor.selection.active);
    if (!node) {
        return;
    }
    return updateCSSNode(editor, node);
}
exports.reflectCssValue = reflectCssValue;
function updateCSSNode(editor, property) {
    const rule = property.parent;
    let currentPrefix = '';
    // Find vendor prefix of given property node
    for (const prefix of vendorPrefixes) {
        if (property.name.startsWith(prefix)) {
            currentPrefix = prefix;
            break;
        }
    }
    const propertyName = property.name.substr(currentPrefix.length);
    const propertyValue = property.value;
    return editor.edit(builder => {
        // Find properties with vendor prefixes, update each
        vendorPrefixes.forEach(prefix => {
            if (prefix === currentPrefix) {
                return;
            }
            let vendorProperty = util_1.getCssPropertyFromRule(rule, prefix + propertyName);
            if (vendorProperty) {
                builder.replace(new vscode_1.Range(vendorProperty.valueToken.start, vendorProperty.valueToken.end), propertyValue);
            }
        });
    });
}


/***/ })
/******/ ])));
//# sourceMappingURL=extension.js.map