import axios from 'axios';
import axiosCancel from 'axios-cancel';
// import uniqid from 'uniqid';

// setting the baseURL
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// adds cancel method to the axios prototype
axiosCancel(axios);

class Ajax {
  // send the request and return the server response
  send = (name, request) => {
    let allPromises = [],
        requestPromise = null;
    // build the ajax requset promise
    if (Array.isArray(request)) {
      allPromises = request.map(request => {
        const { method, url, body = null } = request;
        return axios[method](url,body);
      })
      requestPromise = axios.all(allPromises, { requestId: name });
    }
    else if (typeof request === 'object') {
      const { method, url, body = {} } = request;
      body.requestId = name;
      requestPromise = axios[method](url,body);
    }
    // send the request
    return requestPromise
      .then(res => {
        // console.log(res)
        return (Array.isArray(res))
                ? res.map(item => item.data)
                : res.data
      })
      .catch(err => {
        // console.log(err)
        return err
      })
  }
}

// class Ajax {
//   // hold the pending requests
//   pendingRequests = [];
//   // hold the currentRequestIndex
//   requestIndex = -1;
//   // holding the current requestId
//   requestId = '';
//   // send the request and return the server response
//   send = (name, request) => {
//     let allPromises = [],
//         requestPromise = null;

//     // first cancel any pendingRequests with same name
//     // this.cancel(name);
//     // generate the new requestId
//     this.requestId = uniqid();
//     // add request to pending requests
//     this.pendingRequests.push( { id: this.requestId, name } );
//     // build the ajax requset promise
//     if (Array.isArray(request)) {
//       allPromises = request.map(request => {
//         const { method, url, body = null } = request;
//         return axios[method](url,body);
//       })
//       requestPromise = axios.all(allPromises, { requestId: this.requestId });
//     }
//     else if (typeof request === 'object') {
//       const { method, url, body = {} } = request;
//       body.requestId = this.requestId;
//       requestPromise = axios[method](url,body);
//     }
//     // send the request
//     return requestPromise
//       .then(res => {
//         this.requestIndex = this.pendingRequests.findIndex( request => request.name === name);
//         if( this.requestIndex !== -1 )
//           this.pendingRequests.splice(this.requestIndex,1);
//         console.log(res)
//         return (Array.isArray(res))
//                 ? res.map(item => item.data)
//                 : res.data
//       })
//       .catch(err => {
//         this.requestIndex = this.pendingRequests.findIndex( request => request.name === name);
//         if( this.requestIndex !== -1 )
//           this.pendingRequests.splice(this.requestIndex,1);
//         console.log(err)
//         return err
//       })
//   }
//   // cancel any pending requsts by its id
//   cancel = (name) => {
//     this.requestIndex = this.pendingRequests.findIndex( request => request.name === name)
//     if( this.requestIndex !== -1 ) {
//       axios.cancel(this.pendingRequests[this.requestIndex].id);
//       this.pendingRequests.splice(this.requestIndex,1);
//     }
//   }
// }

// create new and export the ajax object
export default new Ajax();