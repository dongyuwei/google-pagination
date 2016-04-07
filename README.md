# google-pagination
A JavaScript pagination component, google style.

Written in Vanilla JS, without any third-party dependency.

##usage: 

```js
var pagination = new window.Pagination({
   baseUrl: 'http://erlang.us/posts/',
   totalPages: 20,
   currentPageNumber: 5,
   pageSize: 10
});

document.getElementById('pagination-container').innerHTML = pagination.toHTML();
```

