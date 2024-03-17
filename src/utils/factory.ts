import {v4} from 'uuid';
import type {Message} from './types';

export const createMessage = (remitent: string, contents: string): Message => ({
	id: v4(),
	remitent,
	contents,
	added: false,
});
