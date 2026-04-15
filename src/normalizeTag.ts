export function normalizeTag(tagStr: string): string {
    let returnStrArr = tagStr.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(" ")
    return returnStrArr.reduce((accumulator, currentValue) => {
        if (!accumulator.length) return accumulator + currentValue
        if (currentValue.length) return accumulator + " " + currentValue
        else return accumulator
    }, "")
}