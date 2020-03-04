export function baseurl(endpoint) {
  const local = 'http://localhost:3000/api/v1/';

  return `${local}${endpoint}`;
}

export function handleResponse(response) {

        if (!response.ok) {
            if (response.status === 401) {

//console.log('401');
		localStorage.removeItem('user');
                window.location.reload();
            }
        }

    return response;
}
