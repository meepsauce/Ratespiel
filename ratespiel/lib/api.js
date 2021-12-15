

export async function find(id) {
    var req = await fetch("https://3000-gray-hummingbird-yzr7sfio.ws-us23.gitpod.io/api/find", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify({id: id})
    });
    
    return req.json();
}

export async function add(doc) {
    
    var req = await fetch("https://3000-gray-hummingbird-yzr7sfio.ws-us23.gitpod.io/api/insert", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify(doc)
    });
    
    return req.json();
}

export async function alive() {
    var req = await fetch("https://3000-gray-hummingbird-yzr7sfio.ws-us23.gitpod.io/api/alive", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}

export async function recentSets() {
    var req = await fetch("https://3000-gray-hummingbird-yzr7sfio.ws-us23.gitpod.io/api/recent", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}