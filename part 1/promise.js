/*
## ****Part 1: Number Facts****

1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you 
get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, 
put all of the number facts on the page.
3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of 
the facts are repeats.

*/

console.log("Let's get this party started!");
let url = "http://numbersapi.com/"
let promise = axios.get(`${url}7?json`)
    .then(res => {
        console.log(res.data);
        document.getElementById("question-one").innerText = res.data.text;
    })

let promise2 = axios.get(`${url}0,8,9,10?json`)
    .then(res => {
        console.log(res.data);

        for (key in res.data) {
            let li = document.createElement("li");
            li.innerHTML = res.data[key];
            document.getElementById("question-two").appendChild(li);
        }
    })

let promiseArr = [];
for (let i = 0; i < 4; i++) {
    promiseArr.push(axios.get(`${url + i}?json`));
}

Promise.all(promiseArr)
    .then(res => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = res[i].data.text;
            document.getElementById("question-three").appendChild(li);
        }
    })