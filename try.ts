const obj1 = {
    name: "Tom",
    age: 25,
    nested: {
        score: 50,
        details: {
            passed: true,
            comments: "Great job!",
        },
    },
};
const combineObjects = <A,B>(obj1: A, obj2 : B) : A | B => {
    return {...obj1, ...obj2};
}

const differentShapes = combineObjects(obj1,
{
    email : "tom@ny.com",
    number : 2424
})
console.log(differentShapes)

