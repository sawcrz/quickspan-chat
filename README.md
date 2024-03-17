# Spanner, your basic chat assistant
![image](https://github.com/SlowArmoredWarrior/quickspan-chat/assets/134238128/030913e0-fb9c-4ef1-b542-918793ec7695)

Spanner is a simple chat assistant app written in svelte who will help you in non complex cases (like facts, objective questions and so on), using the LLAMA2 AI model (GPT 3.5) to process your questions.

- It's 100% responsive and accesibility friendship.
- supports markdown
- you can search your messages
- you can delete all messages

## Chat Settings
By the moment, the chat only has 3 options:

- **Preserve Messages**: spanner uses localstorage to preserve the chat messages, you can disable this depending if you need to maintain a context or not.

- **Preferred Name**: for a bit customizable behavior, the app lets to you decide wich are your name instead of _"You"_

- **Reduced Motion**: the app has some builtin-framework animations, if you want, you can disable it.

## Installation and Running

I used NPM but feel free to use the package manager of your preference:

_**npm**_
```bash
npm install && npm run dev
```

_**yarn**_
```bash
yarn install && yarn run dev
```

_**pnpm**_
```bash
pnpm install && pnpm run dev
```
