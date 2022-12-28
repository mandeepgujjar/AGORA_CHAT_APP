
import axios from "axios";

const AXIOS_INSTANCE = axios.create({
    baseURL: 'http://a61.chat.agora.io/61855611/1047313/',
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+"007eJxTYPjN5bBS5d3z5TfK/B4tu564iuNRaClf35mIXIH8TZmJp/sVGJKSLSyMTVOSTQxSTE0szVMtUszNDZPNUywsTIzTLM2TBJtXJTcEMjJoTDvMzMjAysDIwMQA4jMwAADt1R6P"}
  });
  
 export default AXIOS_INSTANCE; 