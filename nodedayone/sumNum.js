let arr = [];
let even = 0;
let odd = []
let oddTotal = 0;

for(let i=2; i<process.argv.length; i++){
      arr.push(process.argv[i])
}

arr.forEach(num => {
    if (num %2 === 0){
        even += Number(num)
    }
    else{
        odd.push(Number(num));
    }
})

console.log(even);
odd.forEach(num => oddTotal += num);
console.log(oddTotal/odd.length)
