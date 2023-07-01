//Токен: 36a4b4e3-163c-41d3-80ee-7b86f4545b14
//Идентификатор группы: cohort-69

export default class Api{
    constructor(options){
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }
_checkResponse(res){
  return res.ok ? res.json() : Promise.reject
}

getInfo(){
return fetch(`${this._url}/users/me`, {
    headers:{
        authorization:this._authorization
    }
})
.then (this._checkResponse)
}

getCards(){
    return fetch(`${this._url}/cards`,  {
        headers:{
            authorization:this._authorization
        }
    })
    .then (this._checkResponse)
}
setUserInfo(data){
return fetch(`${this._url}/users/me`,{
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
        name: data.username,
        about: data.job,
    })   
})
.then (this._checkResponse)
}
}