import {writable} from 'svelte/store';

import {defaultConfig} from './constants';
import type {MessageList, AppConfig} from './types';

export const configStore = writable<AppConfig>(defaultConfig);
export const messagePumpStore = writable<MessageList>([]);
