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

When there is no next page left it will stop the loop.

### Auto Increment

To make your custom node available to the community, you must create it as an npm package, and [submit it to the npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).

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
