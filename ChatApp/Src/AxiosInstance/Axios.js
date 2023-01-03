
import axios from "axios";

const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://a61.chat.agora.io/61855611/1047313/',
  timeout: 1000,
  headers: { 'Authorization': 'Bearer ' + "007eJxTYHiwoqhDVfmg6uXsrY5z45gOPXLi3ia+3O7fQht9ljB5jW4FhqRkCwtj05RkE4MUUxNL81SLFHNzw2TzFAsLE+M0S/Ok2lObkxsCGRkEt81kZWRgZWBkYGIA8RkYAB8hHBw=" }
});

export default AXIOS_INSTANCE; 