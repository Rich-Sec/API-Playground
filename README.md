# API-Playground
A simple and intentionally vulnerable application that serves as a playground for experimenting with API vulnerabilities. The API utilises restful architecture to simulate managing an online store, simple data structures are used to store data rather than a NoSQL database such as MongoDB. 

API-Playground is built using node.js, a run time environment for JavaScript built on top of the Chrome v8 JavaScript engine. Node.js on an abstract level allows developers to build the backend of their applications using JavaScript. Node.js is often compared to web application frameworks such as Django or React however, Node.js is simply a runtime environment in which JS code can be executed without the use of a browser. Node.js is praised for its asynchronous event driven architecture, allowing developers to build scalable web applications. 

Node.js was chosen for this project because of these qualities and also due to its popularity, large support base and user friendly package manager "Node Package Manager" (NPM). 

(**!WARNING This API is intentionally vulnerable and should not be modified to store or process sensitive information, please use at your own risk!**)

# Installation:
To use deploy an instance of API-Playground you need to have installed node.js >= 18.17.1 on your deployment host:

- nodejs.org/en : Download the latest stable release here.
- git clone https://github.com/Rich-Sec/API-Playground.git
- cd API-Playground
- node install

# Usage:
- node index.js : Start the program
- By default API-Playground will run on port 3000/tcp unless the evironment variable "PORT" is set to something else.
- Requests to the API should be made to localhost:<PORT> if hosted on the localsystem, or <IP>:<PORT> if hosted on an internal network. 


