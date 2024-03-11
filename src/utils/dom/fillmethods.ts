import {emptyStr} from '../constants';

export const simpleFillMethod = (node: HTMLElement, content: string): void => {
	node.innerHTML = content;
};

export const dynamicFillMethod = (node: HTMLElement, content: string, typingSlowDown: number): void => {
	let characterCount = 0;
	node.innerHTML = emptyStr;

	const intervalId = setInterval(() => {
		node.innerHTML += content[characterCount];
		characterCount++;
		if (characterCount >= content.length) {
			clearInterval(intervalId);
			node.innerHTML = content;
		}
	}, typingSlowDown);
};
