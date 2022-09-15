import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Iterator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Iterator',
		name: 'iterator',
		group: ['transform'],
		icon: 'file:repeat.svg',
		//<i class="fa-solid fa-arrows-repeat"></i>
		version: 1,
		description: 'Iterator',
		defaults: {
			name: 'Iterator',
		},
		inputs: ['main'],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: ['main', 'main'],
		outputNames: ['Done' , 'Iterate'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Iterator Type',
				name: 'iterType',
				type: 'options',
				options:[
					{
						name: 'Auto Increment',
					  value: 'increment',
					},
					{
						name: 'Reference Next',
					  value: 'nextRef',
					},
				],
				default: 'increment',
				description: 'Type of Iterator',
			},
			{
				displayName: 'Increment Start',
				name: 'incrementStart',
				type: 'number',
				default: 0,
				description: 'Start of the auto increment',
				displayOptions:{
					show:{
						iterType:['increment'],
					},
				},
			},
			{
				displayName: 'Increment Size',
				name: 'incrementSize',
				type: 'number',
				default: 1,
				description: 'Size of the auto increment',
				displayOptions:{
					show:{
						iterType:['increment'],
					},
				},
			},

			{
				displayName: 'Reference Start',
				name: 'refStart',
				type: 'string',
				default: '',
				description: 'Value to start with',
				displayOptions:{
					show:{
						iterType:['nextRef'],
					},
				},
			},
			{
				displayName: 'Reference Next',
				name: 'refNext',
				type: 'string',
				default: '',
				description: 'Value of the next reference, for example the next page',
				displayOptions:{
					show:{
						iterType:['nextRef'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Expected Item Count',
						name: 'expectedItemCount',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Expected item count, is used to determine if the loop should continue. When using an offset this is often the same as the Increment Size.',
					},
					{
						displayName: 'Is There Another Page',
						name: 'anotherPage',
						type: 'boolean',
						default: false,
						description:
							'Whether there is another page, this can be set to a field returned by an API for example',
					},
					{
						displayName: 'Combine',
						name: 'combine',
						type: 'boolean',
						default: false,
						description:
							'Whether the node will combine all items before outputting to Done',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
					},
				]
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null> {
		const items = this.getInputData();
		const nodeContext = this.getContext('node');
		const iterType = this.getNodeParameter('iterType', 0, '') as string;
		const limit = this.getNodeParameter('options.limit', 0, 0) as number;
		const expectedItemCount = this.getNodeParameter('expectedItemCount', 0, 50) as number;
		const combine = this.getNodeParameter('options.combine', 0, '') as boolean;
		const anotherPage = this.getNodeParameter('options.anotherPage', 0, true) as boolean;
		let done = !anotherPage;

		const returnItems: INodeExecutionData[][] = [[],[]];

		if(iterType === 'increment'){

			if (nodeContext.currentIncrement === undefined) {
				const incrementStart = this.getNodeParameter('incrementStart', 0, 0) as number;
				nodeContext.currentIncrement = incrementStart;

				nodeContext.processedItems = [];
			}
			else{
				const incrementSize = this.getNodeParameter('incrementSize', 0, 1) as number;
				nodeContext.currentIncrement = nodeContext.currentIncrement + incrementSize;

				if(combine===true){
					nodeContext.processedItems.push.apply(nodeContext.processedItems,items);
				}
				else{
					nodeContext.processedItems =  items;
				}

				if(items.length < expectedItemCount){
					done = true;
				}

			}


		}

		if(iterType === 'nextRef'){
			if (nodeContext.currentReference === undefined) {
				const refStart = this.getNodeParameter('refStart', 0, '') as string;
				nodeContext.currentReference = refStart;

				nodeContext.processedItems = [];
			}
			else{
				const refNext = this.getNodeParameter('refNext', 0, '') as string;
				nodeContext.currentReference = refNext;

				if(combine===true){
					nodeContext.processedItems.push.apply(nodeContext.processedItems,items);
				}
				else{
					nodeContext.processedItems =  items;
				}
			}

			if(nodeContext.currentReference === null){
				done = true;
			}

		}

		if(limit !== 0 && nodeContext.processedItems.length >= limit){
			returnItems[0] = nodeContext.processedItems.slice(0,limit);
		}
		else if(done === true){
			returnItems[0] = nodeContext.processedItems;
		}
		else{
			returnItems[1] = [items[items.length-1]];
		}


		return returnItems;
	}
}
