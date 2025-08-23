import axios from "axios";
const instance=axios.create({
    
        //    baseURL:'https://ln-bird-project.onrender.com/'
           baseURL:'https://newapi.bekiona.com/'
        // baseURL:'https://onlinerealestatecrm.in/'
        // baseURL:'http://localhost:5000/'
       
})
export default instance;