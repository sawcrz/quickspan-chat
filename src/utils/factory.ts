import {uuid} from 'uuidv4';
import type {Message} from './types';

export const createMessage = (remitent: string, contents: string): Message => ({
	id: uuid(),
	remitent,
	contents,
	added: false,
});
