import * as interfaces from '../docstring_parts';
import { BaseFactory } from './base_factory'
import * as vscode from 'vscode';

export class CustomFactory extends BaseFactory {

    generateSummary(docstring: interfaces.DocstringParts){
        if (this._includeName) {
            this._snippet.appendText(`${docstring.name}\n\n`);
        }

        this._snippet.appendPlaceholder("[summary]");
        this.appendNewLine()
        this.appendNewLine()
    }

    generateDescription() {
        this._snippet.appendPlaceholder("[description]");
        this.appendNewLine();
        this.appendNewLine();
    }

    formatDecorators(decorators: interfaces.Decorator[]) {
        // I need to find an example of decorators in numpy format
    }

    formatArguments(docstring: interfaces.DocstringParts) {
        if (docstring.args.length > 0 || docstring.kwargs.length > 0) {
            this.appendText("Args:\n");
        }

        for (let arg of docstring.args) {
            this.appendText("\t");
            this.appendText(arg.var + ": ");
            this.appendPlaceholder(`${arg.type}`);

            this.appendNewLine();

            this.appendText("\t\t");
            this.appendPlaceholder("[description]");
            this.appendText("\n\n");
        }
    }

    formatKeywordArguments(docstring: interfaces.DocstringParts) {
        if (!docstring.args.length) {
            this.appendText("Args:\n");
        }

        for (let kwarg of docstring.kwargs) {
            this.appendText("\t");
            this.appendText(kwarg.var + ": ");
            this.appendPlaceholder(`${kwarg.type}`);
            this.appendText(", optional (default=" + kwarg.default + ")");
            
            this.appendNewLine();
            
            this.appendText("\t\t");
            this.appendPlaceholder("[description]");
            this.appendText("\n\n");
        }
    }

    formatRaises(raises: interfaces.Raises[]) {
        this.appendText("Raises:\n");

        for (let raise of raises) {
            this.appendText(raise.exception + "\n\t");
            this.appendPlaceholder("[description]");
            this.appendNewLine();
        }
        this.appendNewLine();
    }

    formatReturns(returns: interfaces.Returns) {
        this.appendText("Returns:\n");
        this.appendText("\t");
        this.appendPlaceholder(`${returns.type}`);
        this.appendText(": ")
        this.appendPlaceholder("[description]");
        this.appendNewLine()
    }
}
