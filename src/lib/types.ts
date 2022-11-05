interface resultObject {
	index: number
	result: string
	valid: boolean
}

interface resultObjects extends Array<resultObject> { }

interface mdData {
	id: number,
	md: {
		fileName: string;
		compiled: string;
		metadata: {
			title: string;
			description: string;
			tags: Array<string>;
			regex: string;
			testString: string;
		};
	}
}

interface mdDatas extends Array<mdData> { markdown: mdDatas }

export type { resultObject, resultObjects, mdData, mdDatas };
