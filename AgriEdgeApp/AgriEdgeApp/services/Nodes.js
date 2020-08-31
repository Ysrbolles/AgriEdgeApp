import Api from "./Api";
import axios from "axios";
import { reject } from "lodash";

export default {
  //Add New Node after draw Polygon
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
  //Get Nodes list from Database
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
  //Get Node Details From API
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
  //Get Node Details From Database
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
  //Update Node Details in Database
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
  //Get Notification List From Database
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
  //Delete Notification from Database
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
  //Add Comment why Don't irrigate
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
  //Delete Node From Database
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
  //Get City or localisation name with latitude & longitude
  getlocationName(lat, long) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCn4wibiY5B9CW_EvO2aKDByH3D3aiHRmQ`
        )
        .then((data) => {
          resolve(data.data.plus_code.compound_code.substr(7));
        });
    });
  },
};
