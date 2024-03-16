import {writable} from 'svelte/store';
import {getConfigFromStorage} from './client/storage';
import type {MessageList, AppConfig} from './types';

export const configStore = writable<AppConfig>(getConfigFromStorage());
export const messagePumpStore = writable<MessageList>([]);
