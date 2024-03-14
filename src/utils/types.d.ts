export type Message = {
	id: string;
	added: boolean;
	remitent: string;
	contents: string;
};

export type AppConfig = {
	preferredName: string;
	preserveOnStorage: boolean;
	prefersReducedMotion: boolean;
};

export type AsyncMessageStackParams = {
	message: string;
	remitent: string;
	listHandle: MessageList;
};

export type Response = {
	data: string;
	headers: Headers;
};

export type MessageList = Message[];

