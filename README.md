![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-iterator

The iterator node can be used for paging HTTP requests. There is 2 main options for this.

## Developer

Hi, 

My name is Bram and I am the developer of this node.
I am an independant consultant and expert partner of n8n.
My nodes are free to use for everyone, but please consider [donating](https://donate.stripe.com/3cs5oe7xM6L77Yc5ko) when you use my nodes.
This helps me to build and maintain nodes for everyone to use.

If you are looking for some outside help with n8n, I can of course also offer my services.
* Node Development
* Workflow Development
* Mentoring
* Support

Please contact me @ bram@knitco.nl if you want to make use of my services.

For questions or issues with nodes, please open an issue on Github.

## Usage
The node can be a fit funky to setup some times, this because of the flexibility of it.
If you cannot figure it out or have questions please open a topic on the n8n community for help.

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


## General options and (hidden)features

![options](https://github.com/bramkn/n8n-nodes-iterator/blob/master/images/options.png)

* Option Combine:
This boolean will determine if the iterated output will be combined in the end.

* Option Limit:
The limit will limit the amount of records returned in the end. This is especially useful when the Combine boolean is set to true.

* Option Is There Another Page:
This is a boolean which can be set to end the loop when ever you need it to. This can be set with an expression to have complete control over the ending of the loop. Can also be used if an API does not have the next reference but does have a flag telling you it the last page, or if you want to use the count of all record to let it decide when to stop.

* only 1 item is send into the loop to make sure you are not accidentally querying an API multiple times with the same request. This will always be the last item. When the Loop ends, the Done path will contain the items of the last iteration or the combined set of items.


## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Compatibility

This node was developed and tested in version 0.193.3.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
