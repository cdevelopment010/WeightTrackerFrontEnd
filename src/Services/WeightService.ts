import type { WeightRecord } from "../Types/WeightRecord";
const API_URL = 'http://localhost:5268'; 


function getAuthHeaders(includeToken : boolean = true) : HeadersInit {
    const headers :HeadersInit = {
        'Content-Type': 'application/json', 
    }

    if (includeToken)
    {
        const token = localStorage.getItem("weighttracker-token");
        if (token == null) {
            throw new Error("Not signed in!");
        }
        headers['Authorization'] = `Bearer: ${token}`
    }

    return headers;
}


// #region auth
export async function signUp(signUp : {email: string, password: string}) { 
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST', 
        headers: getAuthHeaders(false), 
        body: JSON.stringify({ Email: signUp.email, Password: signUp.password})
    })

    if (!res.ok) {
        throw new Error(`Failed to create user: ${res.status}`);
    }

    return await res.json();

}

export async function login(login : { email: string, password: string}) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST', 
        headers: getAuthHeaders(false), 
        body: JSON.stringify({ Email: login.email, Password: login.password})
    })

    if (!res.ok) {
        throw new Error(`Failed to login: ${res.status}`);
    }

    return await res.json();
}

// #endregion 


export async function getWeightEntries() {

}



export async function addWeightEntry(entry: WeightRecord) {

    

    if (entry.date == null){
        entry.date = new Date().toISOString(); 
    }

    const res = await fetch(`${API_URL}/weight/${entry.date.substring(0,10)}`, {
        method: 'POST', 
        headers: getAuthHeaders(), 
        body: JSON.stringify(entry)
    }); 

    if (!res.ok)
    {
        throw new Error(`Failed to add weight entry: ${res.status}`);
    }

    return await res.json();
}