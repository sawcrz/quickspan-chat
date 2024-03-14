import {emptyStr} from '../constants';
import {processMarkup} from '../parser';

export const simpleFillMethod = (node: HTMLElement, content: string): void => {
	const cleanMarkup = processMarkup(content);
	node.innerHTML = cleanMarkup;
};

export const dynamicFillMethod = (node: HTMLElement, content: string, typingSlowDown: number): void => {
	let characterCount = 0;
	node.innerHTML = emptyStr;

	const intervalId = setInterval(() => {
		node.innerHTML += content[characterCount];
		characterCount++;
		if (characterCount >= content.length) {
			clearInterval(intervalId);
			const cleanMarkup = processMarkup(content);
			node.innerHTML = cleanMarkup;
		}
	}, typingSlowDown);
};
