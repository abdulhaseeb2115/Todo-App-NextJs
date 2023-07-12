# Full Stack Todo App

This is a full stack todo app that allows users to manage their tasks. It consists of a homepage, an about page, and a dummy page. The app also includes a login page and utilizes authentication using JSON Web Tokens (JWT). The homepage, which is the todo route, is private, while the about and dummy pages are public.

## Deployed App Links

- Next App: [https://test-ccript.vercel.app/](https://test-ccript.vercel.app/)
- React App: [https://abh-todo-updated.netlify.app/](https://abh-todo-updated.netlify.app/)
- API Link: [https://abh-todo-updated-e2365dde0f1b.herokuapp.com/](https://abh-todo-updated-e2365dde0f1b.herokuapp.com/)
- GitHub Repository: [https://github.com/abdulhaseeb2115/test_ccript](https://github.com/abdulhaseeb2115/test_ccript)

## Instructions

Follow these steps to run the different components of the application:

1. Run the Node.js API by navigating to the `server` folder and executing the command: `npm run dev`.
2. Run the React client by navigating to the `client_react` folder and executing the command: `npm start`.
3. Run the Next.js client by navigating to the `client` folder and executing the command: `npm run dev`.

## Folder Structure

### React App

```
client_react/
├── build
├── cypress
├── public
├── nodeModules
├── src/
│   ├── api
│   ├── app
│   ├── assets
│   ├── components
│   ├── features
│   ├── screens
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env.development
├── .gitignore
├── cypress.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

### Next.js App

```
client/
├── .next
├── store
├── app/
│   ├── about
│   ├── dummy
│   ├── login
│   ├── main
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── assets
├── cypress
├── components
├── nodeModules
├── public
├── requests
├── .env.local
├── .gitignore
├── post.css.config.js
├── cypress.config.js
├── package.json
├── README.md
└── tailwind.config.js
```

## Additional Notes

1. Basic Jest and Cypress tests have been included. To run the tests, follow these instructions:
   - For server tests, navigate to the `server` folder and execute the command: `npm test`.
   - For React client tests, navigate to the `client_react` folder and execute the command: `npm test`.
   - For Next.js client tests, navigate to the `client_next` folder and execute the command: `npm test`.
2. Please refer to the respective test folders for more information on the test suites and coverage.
