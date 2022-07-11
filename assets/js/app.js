
let cl = console.log;

let apiUrl = 'http://localhost:3000/posts';

const postsInfoDiv = document.getElementById("postsInfo");
const postForm = document.getElementById("postForm");
const title = document.getElementById("title");
const info = document.getElementById("info");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");



// fetch(apiUrl, {
//     method : "GET"
// })

// fetch returns promise

localStorage.setItem("token", "Brear Token : qwertYuiop")

function fetchData(url, methodName, obj){
    return fetch(url,{
        method : methodName,
        body :obj,
        headers : {
            "content-type" : "application/json; charset=UTF-8",
            // "authorization" : "Brear Token qwertYuiop"
            "authorization" : localStorage.getItem("token")
        }
    })
            .then(res => res.json())  // res.json() also returns promise
            // .catch(cl)
}

fetchData(apiUrl, 'GET') // here this method returns promise
                        .then(data => templating(data))
                        .catch(cl)

// fetchData returns promise



function templating(arr){
    let result = "";
    arr.forEach(element => {
        result += `
                <div class="card mb-4" data-id="${element.id}">
                    <div class="card-body">
                        <h3>
                            ${element.title}
                        </h3>
                        <p>
                            ${element.body}
                        </p>
                        <p class="text-right">
                            <button class="btn btn-success" onClick="onEditHandler(this)">Edit</button>
                            <button class="btn btn-danger" onClick="onDeleteHandler(this)">Delete</button>
                        </p>
                    </div>
                </div>
                        `
    });
    postsInfoDiv.innerHTML = result;
}




const onSubmitHandler = (e) => {
    e.preventDefault();
    let obj = {
        title : title.value,
        body : info.value,
        userId : Math.ceil(Math.random()*10)
    }
    cl(obj);
    postForm.reset();

    fetchData(apiUrl, "POST", JSON.stringify(obj))
                                                .then(cl)
}


const onEditHandler = (ele) => {
    // cl("event trigger");
    // cl(ele);
    let getId = ele.closest('.card').dataset.id;
    // cl(getId);
    localStorage.setItem("setId", getId);
    let editUrl = `${apiUrl}/${getId}`;
    cl(editUrl);

    updateBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');

    fetchData(editUrl, "GET")
                            .then(res => {
                                cl(res)
                            title.value = res.title;
                            info.value = res.body;
                            })
}

const onUpdateHandler = (o) => {
    // cl("event");
    let obj = {
        title : title.value,
        body : info.value,
    }

    let getupdatedId = localStorage.getItem("setId");
    let updateUrl = `${apiUrl}/${getupdatedId}`;
    cl(updateUrl);

    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');

    fetchData(updateUrl, "PATCH", JSON.stringify(obj))
                                                        .then(cl)
                                                        .catch(cl)
}

const onDeleteHandler = (e) => {

    let id = e.closest('.card').dataset.id;
    let deleteUrl = `${apiUrl}/${id}`;
    cl(deleteUrl);
                      
    fetchData(deleteUrl, "DELETE")
}




postForm.addEventListener("submit", onSubmitHandler);
updateBtn.addEventListener("click", onUpdateHandler);