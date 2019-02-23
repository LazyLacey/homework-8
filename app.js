function getJSON(url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.open("GET", url);

    request.onload = function () {
      try {
        if(this.status == 200 ){
          resolve(JSON.parse(this.response));
        } else {
          reject(this.status + " " + this.statusText);
        }
      } catch(e){
        reject(e.message);
      }
    };
  
    request.onerror = function () {
      reject(this.status + " " + this.statusText);
    };

    request.send();
  });
};

const p1 = getJSON("./users.json");
const p2 = getJSON("./books.json");
const p3 = getJSON("./union.json");

Promise.all([p1, p2, p3]).then(values => {
  let users = values[0].filter((member,index)=> index % 2 == 0);
 
  let books = values[1];
  
  let union = values[2];
//   1)Написать крч 3 жсон объекта
// 	1.1)Содержит массив пользователей вида 
// 	id, name, username
// 	1.2)Содержит массив книг вида id, name
// 	1.3)Содержит массив объединения книги-пользователя
// 2)Написать функцию, которая будет принимать массив пользователей(id, которые получаются из другой функции, 
// которая получает каждого второго пользователя из жсона)
// и возвращать массив книг, которые им принадлежат, сгруппированые по пользователю
// т.е.
// userId: [bookName, bookName1]
// userId2: [bookName2]

  let usersWithBooks = users.map(x => {
    var userId = x.userId;
    var username = x.username;
    var booksIds = union.filter(u => u.userId == x.userId).flatMap(x => x.bookId);
    var userBooks = books.filter((book)=> booksIds.includes(book.bookId));
    return {
      userId,
      userBooks,
      username
    }
  });

  console.log(usersWithBooks);
}, function(reason) {
  console.log("reason", reason);
});



























//task2
function getData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1500)
  })
}

var getDataState = false;
var cache = 0;
function caching(){
  if (!getDataState){
    var promise = getData();
    promise.then(
      (value) => {
        getDataState = true;
        setTimeout(()=> {
          getDataState = false
        }, 3000)
        cache = value
      }
    )
  }
  else{
    return cache; 
  }
}

