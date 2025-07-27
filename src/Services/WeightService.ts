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
        headers['Authorization'] = `Bearer ${token}`
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
    const res = await fetch(`${API_URL}/weight`, {
        method: 'GET', 
        headers: getAuthHeaders()
    }); 

    if (!res.ok)
    {
        throw new Error(`Failed toget weights: ${res.status}`);
    }

    return await res.json();
}



export async function addWeightEntry(entry: WeightRecord) {
    if (entry.Date == null){
        entry.Date = new Date().toISOString(); 
    }
    const dto = { 
        Weight: entry.Weight, 
        MuscleMass: entry.MuscleMass, 
        BodyFat: entry.BodyFat
    }
    const res = await fetch(`${API_URL}/weight/${entry.Date.substring(0,10)}`, {
        method: 'POST', 
        headers: getAuthHeaders(), 
        body: JSON.stringify(dto)
    }); 

    if (!res.ok)
    {
        throw new Error(`Failed to add weight entry: ${res.status}`);
    }

    return await res.json();
}

export async function testPing() {
    const res = await fetch(`${API_URL}/weight/test-ping`, {
        method: 'GET', 
        headers: getAuthHeaders()
    }); 

    if (!res.ok)
    {
        throw new Error(`Failed to add weight entry: ${res.status}`);
    }

    return await res.json();
}

export async function getWeekComparison(from : Date, to: Date) {

    const fromString = from.toISOString().substring(0,10)
    const toString = to.toISOString().substring(0,10)
    const res = await fetch(`${API_URL}/weight/summary/${fromString}/${toString}`, {
        method: 'GET', 
        headers: getAuthHeaders()
    });

    if (!res.ok)
    {
        throw new Error(`Failed to get summary data: ${res.status}`);
    }

    return await res.json();



}