import Api from "./Api";
import axios from 'axios'

export default {
  addnewone(Node) {
    console.log(Node)
    return new Promise((resolve, reject) => {
      // Api()
      axios.post("http://10.0.2.2:4242/Home/addnewoneApp", Node)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
};
