import Api from "./Api";
import axios from "axios";

export default {
  addnewone(Node) {
    console.log(Node);
    return new Promise((resolve, reject) => {
      // Api()
      axios
        .post("http://10.0.2.2:4242/Home/addnewoneApp", Node)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
  getNodes(uidApp) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://10.0.2.2:4242/Home/getNodesApp/${uidApp}`)
        .then((result) => {
          console.log(result.data)
          resolve(result.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
