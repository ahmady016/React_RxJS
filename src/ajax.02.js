import { ajax } from 'rxjs/ajax'
import {
  Subject,
  of,
  forkJoin
} from 'rxjs'
import {
  map,
  catchError,
  mergeMap,
  tap,
  filter,
  share
} from 'rxjs/operators'

class Ajax {
  baseUrl = 'https://jsonplaceholder.typicode.com';
  currentRequest = '';
  currentTime = Date.now();
  allRequests = [];
  request$ = new Subject();
  // send the request and return the server response
  send = (name, request) => {
    this.request$.next({ name, request });
    return this.request$.pipe(
      filter( req => req.name !== this.currentRequest || (Date.now() - this.currentTime) > 1000 ),
      tap(req => {
        this.currentRequest = req.name;
        this.currentTime = Date.now();
      }),
      mergeMap(req => {
        const { request } = req
        if ( Array.isArray(request) && Array.isArray(request[0]) ) {
          this.allRequests = request.map(request => {
            const [ method, url, body = null ] = request;
            return ajax({
              method,
              url: `${this.baseUrl}${url}`,
              body
            })
          });
          return forkJoin(this.allRequests).pipe(
            map(res => res.map(res => res.response) ),
            catchError(err => of({ err }))
          );
        } else {
          return ajax({method: request[0], url: `${this.baseUrl}${request[1]}`, body: request[2] }).pipe(
            map(res => res.response),
            catchError(err => of({ err }))
          )
        }
      }),
      share()
    )
  }
}

// create new and export the ajax object
export default new Ajax();