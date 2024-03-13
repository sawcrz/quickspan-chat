import {Marked, Renderer, type MarkedOptions} from '@ts-stack/markdown';
import DOMPurify from 'dompurify';
import hljs from 'hljs';

const mdOptions: MarkedOptions = {
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	renderer: new Renderer(),

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
	highlight: (code, lang) => hljs.highlight(lang, code).value,
};

export const processMarkup = (rawText: string): string => Marked.parse(rawText, mdOptions);
