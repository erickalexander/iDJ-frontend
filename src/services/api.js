const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // Authorization: token,
  // Type: 'student'
};



const token = localStorage.getItem('token');


const login = data => {
  console.log('DATA is', data);
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const signup = (username, password, name, location, level, user_type, picture, rate) => {
  if (user_type === "student"){
  return fetch(`${API_ROOT}/students`, {
    method: 'POST',
    headers,
    body: JSON.stringify({username: username, password: password, name: name, location:location, level:level, picture:picture, user_type: user_type})
  }).then(res => res.json())}
  else{
    return fetch(`${API_ROOT}/instructors`, {
      method: 'POST',
      headers,
      body: JSON.stringify({username: username, password: password, name: name, location:location, level:level, picture:picture, user_type: user_type, rate: parseInt(rate)})
    }).then(res => res.json());
  }
};

const getCurrentUser = () => {
  console.log('about to fetch the token is:', token);
  return fetch(`${API_ROOT}/current_user`, {
    headers: {
      Authorization: token,
    }
  }).then(res => res.json());
};

const newSession = data => {
  console.log('Instructor', data[0]);
  console.log('date', data[1]);
  return fetch(`${API_ROOT}/sessions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({instructor_id:data[0], start_time: data[1], end_time: data[1]})
  }).then(res => res.json());
}

const newReservation = data => {
  console.log('Session is', data[0].id);
  console.log("USERCOOOL", data[1]);
  return fetch(`${API_ROOT}/sessions/${data[0].id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({id: data[0].id, student_id: data[1].id})
  }).then(getSessions);
};

const markComplete = data => {
  console.log('Session is', data[0]);
  console.log("TRUE", data[1]);
  return fetch(`${API_ROOT}/sessions/${data[0]}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({id: data[0], completed_status: data[1]})
  }).then(getCurrentUser);
}

const getSessions = () => {
  return fetch(`${API_ROOT}/sessions`, {
    headers:headers
  }).then(res => res.json());
}


export default {
  auth: {
    login,
    signup,
    getCurrentUser,
  },
  reservations: {
    newReservation
  },

  sessions: {
    getSessions,
    markComplete,
    newSession
  }
}
