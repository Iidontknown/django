export default function authHeader() {
    const access = localStorage.getItem("access");
    let user = null;
    if (access)
      user = JSON.parse(access);
    if (access) {
      return { Authorization: 'Bearer ' + user };
    } else {
      return { Authorization: '' }; 
    }
  }