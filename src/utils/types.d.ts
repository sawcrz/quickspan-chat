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

export type MessageList = Message[];
