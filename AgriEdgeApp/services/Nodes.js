import Api from "./Api";
import axios from 'axios'

export default {
  addnewone(Node) {
    console.log("dkhlaaaaaaaaaat");
    return new Promise((resolve, reject) => {
      // Api()
      axios.post("http://localhost:4242/Home/addnewoneApp", Node)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
};
