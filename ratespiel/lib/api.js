

export async function find(id) {
    var req = await fetch("https://ratespiel.vercel.app/api/find", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify({id: id})
    });
    
    return req.json();
}

export async function add(doc) {
    
    var req = await fetch("https://ratespiel.vercel.app/api/insert", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        body: JSON.stringify(doc)
    });
    
    return req.json();
}

export async function alive() {
    var req = await fetch("https://ratespiel.vercel.app/api/alive", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}

export async function recentSets() {
    var req = await fetch("https://ratespiel.vercel.app/api/recent", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors'
    });
    return await req.json();
}