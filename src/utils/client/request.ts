import {get} from 'svelte/store';

import type {Message, MessageList, AsyncMessageStackParams} from '../types';
import {messagePumpStore, configStore} from '../stores';
import {queryToModel} from '../api';
import {spannerName} from '../constants';

export const stackMessage = async (params: AsyncMessageStackParams): Promise<Message> => {
	const {message, remitent, listHandle} = params;

	const factoryModule = await import('../factory');
	const newMessage = factoryModule.createMessage(remitent, message);

	if (get(configStore).preserveOnStorage) {
		messagePumpStore.update(() => [...listHandle, newMessage]);
	}

	return newMessage;
};

export const submitQuery = async (request: string, listHandle: MessageList): Promise<Message> => {
	const receptMessage = await queryToModel(request);
	const modelResponse = await stackMessage({message: String(receptMessage?.data), remitent: spannerName, listHandle});
	return modelResponse;
};

export const clearContext = async (): Promise<void> => {
	const storageModule = await import('../client/storage');
	storageModule.cleanMessagePump();
	messagePumpStore.set([] as MessageList);
};
