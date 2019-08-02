// @ts-ignore
import VSCode from '../vscode/source/index';
import { welcomePage } from './common/settings';

VSCode.IDE.create('#root', {
    welcomePage
}).then((services: any) => {
    console.log('@@@', services)
    // success
});
