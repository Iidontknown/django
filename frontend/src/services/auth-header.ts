export default function authHeader() {
    const access = localStorage.getItem("access");
    let user = null;
    if (access)
      user = JSON.parse(access);
  
    if (access) {
      return { Authorization: 'Bearer ' + user }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return { Authorization: '' }; // for Spring Boot back-end
      // return { 'x-access-token': null }; // for Node Express back-end
    }
  }