// NOTE: make a better parser implementation due the issues
// All the packages used here are related to discord markdown
// see https://github.com/brussell98/discord-markdown

import {parser, htmlOutput, toHTML} from 'discord-markdown';

export const processMarkup = (rawText: string): string => toHTML(rawText);
