import Api from "./Api";
import axios from "axios";
import { reject } from "lodash";

export default {
  addnewone(Node) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://3.16.109.122:4242/Home/addnewoneApp", Node)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  },
  getNodes(uidApp) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://3.16.109.122:4242/Home/getNodesApp/${uidApp}`)
        .then((result) => {
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
        .get(`http://3.16.109.122:4242/Home/nodehours/${id}`)
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
        .get(`http://3.16.109.122:4242/Home/getNodeDetailsDatabase/${id}`)
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
        .post("http://3.16.109.122:4242/Home/updateNodeDetails", data)
        .then((result) => {
          console.log(result.status);
          resolve(result);
        });
    });
  },
  getAppNotif(uidApp) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://3.16.109.122:4242/Home/getAppNotif/${uidApp}`)
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
        .delete(`http://3.16.109.122:4242/Home/deleteNotif/${item.Node}`)
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
        .post("http://3.16.109.122:4242/Home/AddComments", data)
        .then((result) => {})
        .catch((err) => reject(err));
    });
  },
  deleteNode(nodeID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`http://3.16.109.122:4242/Home/deleteNode/${nodeID}`)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => reject(err));
    });
  },
  getlocationName(lat, long) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCn4wibiY5B9CW_EvO2aKDByH3D3aiHRmQ`
        )
        .then((data) => {
          console.log("||||||||||||||||||||||||||||||||||||||||||||||");
          resolve(data.data.plus_code.compound_code.substr(7));
          console.log("||||||||||||||||||||||||||||||||||||||||||||||");
        });
    });
  },
};
