
//1. Reverse a String

let teststring: string = 'playwright';
let testarray: Array<string> = Array.from(teststring);
console.log(testarray.reverse().join(''));

let arraylength = testarray.length-1;
for(let e of testarray){
    console.log(testarray[arraylength])
    arraylength--;
}

console.log("*************uisng for loop*************")

let teststring1 = 'playwright';
let reverseString = '';
for (let i = teststring1.length - 1; i >= 0; i--) {
    reverseString += teststring1[i];//here we are using + operator which is used to concatenate
}
console.log(reverseString);

//2. Find Duplicate in Number Array
//Set is a type pf collection which only stores unique values.

const arr = [1,2,3,4,2,4,1,2,5,3,1,4,2,1,3,4]
const seen = new Set<number>();
const duplicates = new Set<number>();
for (const num of arr) {
    if (seen.has(num)) {
        duplicates.add(num);
    } else {
        seen.add(num);
    }
}
console.log([...duplicates]);

const arr1 = [1, 2, 3, 2, 4, 5, 3, 6, 2];
const duplicates1 = arr1.filter(
    (item, index) => arr1.indexOf(item) !== index
);
console.log([...new Set(duplicates1)]);


