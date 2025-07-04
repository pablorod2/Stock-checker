# Stock Price Checker

This is the boilerplate for the Stock Price Checker project. Instructions for building your project can be found at https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker

# Final Solution

The solution was developed locally and uploaded to a GitHub repository for system validation. To complete the solution, you must maintain a live solution and the repository in Git. Therefore, you must create an account at:

FreeBootCamp
MongoDB
GitHub

The project contains a pre-built library that allows you to operate with stock market data, we are required to use it to perform individual check operations by recording preferences, a simple like that is recorded in a relational database and shows how many likes each stock has had. The functions work by stock symbol or code. You can enter a code and query a pre-built API that provides, for that code, a list of parameters related to the company as XML.

The code allows you to create a custom web template on a test or development server, where you enter the code and the program retrieves the data from the API to display it on the web. This process requires incorporating some additional modules into the original project as requirements. These are:

mongoose for working with the mongodb database
node-fetch for retrieving data or parameters
nodemon for working with the web server and runing the test

The project requires a server that we will configure on a specific port, configured through the .env file, we can use as a sample.env as base, in it we can specify the port and db url to mongodb, if you uncomment HELMET and/or NODE_ENV it will proceed to run the tests coded on tests/2_functional-tests.js that are required to pass the course, helmet is another requirement that uses jquery, therefor is optional on dotenv.

The solution is programmed in the routes/api.js folder. We must create functions that allow us to create, find, and save stocks in the database, along with the main module, which will be responsible for resolving the prices and likes of each stock as appropriate. The level of knowledge of how it works is quite high considering what has been reviewed so far. If one follows the bootcamp pattern and faces this requirement, it is unlikely that anyone will be able to properly code the functions, especially because they are asynchronous functions that must wait for a response before continuing. Verifying that the "like" is not the same IP can also be complex, for example:

****************************************************
<code>async function createStock(stock, like, ip) {
const newStock = new StockModel({
symbol: stock,
likes: like ? [ip] : [],
});
const savedNew = await newStock.save();
return savedNew;
}</code>
****************************************************

Don't forget to configure mongodb database to accept the IP address from replit or it will crush, to check it you can use:

<code>curl ifconfig.me; echo</code> 

from shell to get the current IP address you have to allow.

This example checks if the symbol exists in the database. If it has never been liked, it doesn't exist and creates the entry automatically, but checks the like by IP. Although it's possible to find clues in the repository, the bootcamp doesn't provide this information and must be searched separately.

The server system doesn't always work properly and is more unstable when there are programming errors. It attempts to run one instance over another automatically every time "npm dev nodemon server.js" is called. You can close the terminal, open another, and the system continues working. To restart, you must kill the process. To do this, use "lsof -i:3000" where 3000 is the port where the server is running. This identifies if it's running and the associated PID. Then, you can run "kill -9 PID" where PID is the process ID. This will terminate the server and it can be called again with the command already indicated.

I have made an alt of the api.js that uses the name of the stock symbol as an identifier, the problem is that with that implementation the test will not pass making it unproductive to change it by default. A simple conditional depending on the ENV_VAR does the work of switching between one API and the ALTernative.

There was an error introduced by the modification of the view js, when the jquery was part of the solution. It comes from the use of the checkbox making it true whether is checked or unchecked, because of the validation procedure. It was fixed as well. The likes show up properly now.

[!WARNING]
The GitHub repo was changed by contributors and did no longer pass the tests, the version in riplit did. At the beginning they were the same. I mannage to make some new changes on commit3 and now should be working if you create a valid .env for the solution. If they don't pass the test check the IP restriction on the MongoDB server to allow connection, not always the error points to that and I find that almost every time is related to the security measure.
