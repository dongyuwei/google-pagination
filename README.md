# google-pagination
A JavaScript pagination component, which behaves like Google search web pagination.

Written in Vanilla JS, without any third-party dependency.

## Usage(see the [test.html](https://github.com/dongyuwei/google-pagination/blob/master/test.html) ): 

```js
var pagination = new window.Pagination({
   baseUrl: 'http://erlang.us/posts/',
   totalPages: 30,
   currentPageNumber: 5,
   pageSize: 10
});

document.getElementById('pagination-container').innerHTML = pagination.toHTML();
```
![snapshot](https://github.com/dongyuwei/google-pagination/blob/master/snapshot.png)

