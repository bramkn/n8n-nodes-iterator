![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-iterator

The iterator node can be used for paging HTTP requests. There is 2 main options for this.

### Reference Next
This can be used if the API has a response which also tells you what the next page is.
It can also be used with APIs which only give a "next cursor" for example, you will simply need to use that as part of the string in an expression.

![Next](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/nextResponseExample.png)

You can use the "currentReference" as the value in the HTTP node. So in this case it is the full URL.
![currentRef](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/currentRef.png)

This will automatically be filled with the correct value, when you setup the Iterator node correctly.
The Reference Start is the first page it needs to retrieve.

![setupNext](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/setupNext.png)

An expression is used in the Reference Next, to get the next page for every iteration:
![httpNext](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/httpNext.png)

When there is no next page left it will end the loop.

### Auto Increment
The auto increment is for manual iteration through the different pages.
This is usually simply a page number so from 1,2,3 etc. But it can also be an offset that needs to be set.
* If it is normal pages, set the increment size to 1 to retrieve all pages.
* If the API is using an offset set it to the size of the page to let it loop through all pages.

![increment](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/increment.png)

The "Expected Item Count" is used to make sure it will stop at some point. This is the page size you need to fill in here. Whenever you are getting les records than the pagesize it will end the loop.
The default value is 50, so if no value is set it will stop when less than 50 are returned.

The HTTP node will look something like this for this example:

![incrementHTTP](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/incrementHTTP.png)

![currentIncrement](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/currentIncrement.png)


### General options and (hidden)features

![options](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/options.png)

* Option Combine:
This boolean will determine if the iterated output will be combined in the end.

* Option Limit:
The limit will limit the amount of records returned in the end. This is especially useful when the Combine boolean is set to true.

* Option Is There Another Page:
This is a boolean which can be set to end the loop when ever you need it to. This can be set with an expression to have complete control over the ending of the loop. Can also be used if an API does not have the next reference but does have a flag telling you it the last page, or if you want to use the count of all record to let it decide when to stop.

* only 1 item is send into the loop to make sure you are not accidentally querying an API multiple times with the same request.

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 16. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
	```
	npm install n8n -g
	```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).


## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from this template repository.
2. Clone your new repo:
    ```
    git clone https://github.com/<your organization>/<your-repo-name>.git
    ```
3. Run `npm i` to install dependencies.
4. Open the project in your editor.
5. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
6. Update the `package.json` to match your details.
7. Run `npm run lint` to check for errors or `npm run lintfix` to automatically fix errors when possible.
8. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.
9. Replace this README with documentation for your node. Use the [README_TEMPLATE](README_TEMPLATE.md) to get started.
10. Update the LICENSE file to use your details.
11. [Publish](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) your package to npm.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
