# WebdriverIO project

For this project we will be creating an e2e automated test script for the Urban Routes web app.
The tests will automate a user selecting a 'Supportive' ride, filling out payment and various ride options, and ordering a car.

This project uses JavaScript, Node.js, and WebdriverIO. JavaScript is the chosen language for writing our tests and seamlessly integrates with WebdriverIO and Node.js. WebdriverIO, a comprehensive browser and mobile automation testing framework, operates within the Node.js environment. Node.js not only serves as our JavaScript runtime but also acts as our package manager for streamlined project management.

Code style used in this project is camelCase, each test having a descriptive title, and comments are provided for each test to explain what the respective test does.

page.js is our page object file that contains our sets of selectors and functions that will be used to run our tests.

helper.js contains some extra functions that will help with some tasks needed to run our tests.

# To run this project:

- Clone project repo by running $ git clone git@github.com:username/
- Open terminal in project directory and run $ npm install
- Start TripleTen Urban Routes server and copy its address
- Insert address inside of API_URL variable value in the wdio.conf.js file
- Run $ npm run wdio


