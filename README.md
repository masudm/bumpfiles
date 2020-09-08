# Bumpfiles
## Transfer files between devices using web-rtc to allow fast peer-to-peer data transfers.

Split into two parts - a client and a server. 
### Server
The server is basic and it's only responsibility is acting as a broker for the peers. The clients connect to the server first and then establish a peer-to-peer between themselves.
Installation

 1. Create the SQL tables using the `database.sql` file.
 2. `npm install`
 3. `node app.js`

### Client
The client is built in React and uses Redux for state management. 
This can be built `npm run build` and hosted.
Make sure to change the `IO_SERVER_URL` in `App.js` to the correct server location.
