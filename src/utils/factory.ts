import type {Message} from './types';
import {v4} from 'uuid';

export const createMessage = (remitent: string, contents: string): Message => ({
	id: v4(),
	remitent,
	contents,
	added: false,
});
