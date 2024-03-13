import {apiKey} from './constants';
import type {Response} from './types';

export const queryToModel = async (query: string): Promise<Response | undefined> => {
	const url = 'https://gpts4u.p.rapidapi.com/llama2';

	const headers = {
		'X-RapidAPI-Host': 'gpts4u.p.rapidapi.com',
		'content-type': 'application/json',
		'X-RapidAPI-Key': apiKey,
	};

	const body = JSON.stringify([
		{
			role: 'user',
			content: query,
		},
	]);

	const options = {
		method: 'POST',
		headers,
		body,
	};

	try {
		const response = await fetch(url, options);
		const resData = await response.text();
		const data = resData.slice(1, (resData.length - 1));
		const result = {
			data,
			headers: response.headers,
		};

		return result;
	} catch (error) {
		console.error(error);
	}
};
