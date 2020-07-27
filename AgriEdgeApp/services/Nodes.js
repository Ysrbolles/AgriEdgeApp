import Api from "./Api";
import axios from "axios";

export default {
  addnewone(Node) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://10.0.2.2:4242/Home/addnewoneApp", Node)
        .then((res) => {
          console.debug(res);
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
          console.log(result.data);
          resolve(result.data);
        })
        .catch((err) => {
          console.debug(err);
          reject(err);
        });
    });
  },
  getNodeDetails(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://www.raptor.im/api/v2/items/uSuAgri/${id}?limit=10&format=json`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getNodeDetailsDatabase(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://10.0.2.2:4242/Home/getNodeDetailsDatabase/${id}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateNodeDetails(data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://10.0.2.2:4242/Home/updateNodeDetails", data)
        .then((result) => {
          console.log(result);
        });
    });
  },
  getAppNotif(uidApp) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://10.0.2.2:4242/Home/getAppNotif/${uidApp}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteNotif(item) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://10.0.2.2:4242/Home/deleteNotif/${item.Node}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  AddComment(res, comment) {
    const data = {
      data: res,
      comment: comment,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://10.0.2.2:4242/Home/AddComments", data)
        .then((result) => {
          console.log(result);
        });
    });
  },
};
