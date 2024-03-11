import {configKey, defaultConfig, storageKey} from '../constants';
import type {MessageList, AppConfig} from '../types';

export const checkStorageIntegrityOf = (key: string): boolean => localStorage.getItem(key) !== null;

export const getMessagesFromStorage = (): MessageList => {
	if (checkStorageIntegrityOf(storageKey)) {
		try {
			const messages = localStorage.getItem(storageKey)!;
			return JSON.parse(messages) as MessageList;
		} catch (e) {
			console.error(e);
		}
	}

	return [] as MessageList;
};

export const updateMessagesStorage = (messages: MessageList): boolean => {
	try {
		const bufferedPump = JSON.stringify(messages);
		localStorage.setItem(storageKey, bufferedPump);
		return true;
	} catch (e) {
		console.error(e);
	}

	return false;
};

export const cleanMessagePump = (): void => {
	localStorage.setItem(storageKey, JSON.stringify([]));
};

export const getConfigFromStorage = (): AppConfig => {
	if (checkStorageIntegrityOf(configKey)) {
		try {
			const config = localStorage.getItem(configKey)!;
			return JSON.parse(config) as AppConfig;
		} catch (e) {
			console.error(e);
		}
	}

	return defaultConfig as AppConfig;
};

export const updateConfig = (cfg: AppConfig): boolean => {
	try {
		const rawCfg = JSON.stringify(cfg);
		localStorage.setItem(storageKey, rawCfg);
		return true;
	} catch (e) {
		console.error(e);
	}

	return false;
};

export const cleanConfig = (): void => {
	localStorage.setItem(configKey, JSON.stringify(defaultConfig));
};
