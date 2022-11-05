import type { resultObjects } from "$lib/types";

function matchTextAreaValue(textAreaValue: HTMLTextAreaElement["value"], regex: RegExp): resultObjects {
    let results: resultObjects = [];
    let stringToTest: Array<string> = textAreaValue.split(/\r?\n/)

    stringToTest.forEach((line, i) => {
        let result: RegExpMatchArray | null = line.match(regex);
        if (result !== null) {
            results.push({
                index: i,
                result: line.match(regex)![0],
                valid: true
            })
        } else {
            results.push({
                index: i,
                result: stringToTest[i],
                valid: false
            })
        }
    })
    return results;
}

export default matchTextAreaValue;