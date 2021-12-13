

export async function find(id) {
    var req = await fetch("http://localhost:3000/api/find", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify({id: id})
    });
    return req.json();
}

export async function add(doc) {
    var req = await fetch("http://localhost:3000/api/insert", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify(doc)
    });
    console.log("api got it");
    return req.json();
}

export async function alive() {
    var req = await fetch("http://localhost:3000/api/alive", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}

export async function recentSets() {
    var req = await fetch("http://localhost:3000/api/recent", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}