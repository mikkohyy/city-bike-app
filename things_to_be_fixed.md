# Things that should be fixed (in the future)

- In migrations I use any on umzug things since configuring umzug to work with typescript revealed to be somewhat difficult for me. Currently it works but kind of ignores TypeScript. In other words, there were problems with Umzug that were difficult to fix. Or at least my knowlege on TypeScript was not enough.

- In frontend, using the explicitly defined setupProxy.js file is probably not the best way to do it. The reason why proxying was done with it is that I was not able to make setting up the proxy in the package.json file to work.

- In backend I mix require and import styles. They should be unified.

- Database could be normalized in a way where city and operator are in their own table. In addition, language and city could be put in their own tables.

- The types are duplicated. This was because I used Create react app to create the client and apps created with it are quite strict on not importing anything outside the src-folder.

- Search from the database works in the principle of "starts with". other ways to find matches could be good.

- Backend should check parameters, that is, if a query string with orderby (or with search), language should also be defined in the request
