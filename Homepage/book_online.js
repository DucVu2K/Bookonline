
$(document).ready(function () {
  $('.slickslider').slick({
    
  })
})
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

////////////////////////////////////

///////////////////////////
// const url = `http://5dfb0b8a38678a00145fa82b.mockapi.io/api/book/books/${number}`;

async function getBookData() {
  // Lay du lieu
  const response = await fetch(`http://5dfb0b8a38678a00145fa82b.mockapi.io/api/book/books`)
  const data = await response.json()
  return data;
}



// function htmlbook(data, n, a) {
//   // const data = await getBookData();
//   for (let i = n; i < 12; i++) {
//     a.innerHTML += `
//    <div class="book-1">
//         <div class="img-1">
//             <img src="${data[i].img}"
//                 alt="" height="176px" width="120px">
//         </div>
//         <div class="name-book-1">
//             <div>
//                 <h3>${data[i].name}</h3>

//                 <a href="#">Chi tiết</a>
//             </div>
//         </div>
//     </div>`
//     if (i == 3 || i == 8) {
//       break;
//     }

//   }

// }
async function handlesumbit() {
  const book = document.getElementById("idbook");
  const book1 = document.getElementById("idbook1");

  const data = await getBookData();
  // console.log(data[1].img)
  // console.log(data.length)
  // let n=0;

  htmlbook(data, 0, book);
  htmlbook(data, 5, book1);


}
// handlesumbit()

async function getData() {
  const response = await fetch("http://5e0209f563d08b0014a285d4.mockapi.io/bookdata");
  let data = await response.json();
  for (let i = 0; i < data.length; i++) {
    let idAPI = data[i].id;
    let abs = document.getElementById(`${idAPI}`);
    abs.addEventListener('click', function () {
      let checkClick = abs.draggable;
      if (checkClick == false) {
        window.location.href = `./review_book.html?id=${idAPI}`;
      }
    })
  }
}


getData();



//chuyen trang------//

// let book_detial = document.getElementById('3');
// // console.dir(book_detial);
// book_detial.addEventListener('click', function () {
//   let checkClick = book_detial.isContentEditable;
//   console.log(checkClick);
//   if (checkClick == false) {
//     window.location.href = 'review_book.html';
//   }
// })


  //----------------//

async function getData() {
  const response =  await fetch("http://5e0209f563d08b0014a285d4.mockapi.io/bookdata")
      let data = await  response.json();
      let book1 = "", book2 = "";
      for (let i = 0; i < data.length; i++) {
        let x = `<div class="book-1" id="${data[i].id}">
                    <div class="img-1">
                        <img src="${data[i].imgLink}"
                            alt="" height="176px" width="120px">
                    </div>
                    <div class="name-book-1" >
                        <div>
                            <h3>${data[i].name}</h3>

                            <a href="#">Chi tiết</a>
                        </div>
                    </div>
                </div>`;
        if(i<4)
        {
          book1 += x;
        }else if(i < 8)
        {
          book2 += x;
        }
        else break;
      }
      $(".nameBook-1").html(book1);
      $(".nameBook-2").html(book2);
      $("div.book-1").click(function(){
        window.location.href = `./review_book.html?id=${$(this).attr("id")}`;
    });
}

async function loadSlideBook(){
  const response =  await fetch("http://5e0209f563d08b0014a285d4.mockapi.io/bookdata")
  let data = await  response.json();
  let slideElement = "";
  data.forEach(function(obj) {
          let  x =  `<div class="book-2" id="${obj.id}">
                              <a class="img-2">
                                  <img src="${obj.imgLink}" alt="${obj.name}" width="150px" height="218px">
                              </a>
                              <div class="name-book-2">
                                  <h4>${obj.name}</h4>
                                  <p>${obj.author}</p>
                              </div>
                      </div>`;
          slideElement += x;
  }); 
  $(".DNN").html(slideElement);
  $('.DNN').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
  });
  $("div.book-2").click(function(){
      window.location.href = `./review_book.html?id=${$(this).attr("id")}`;
  });
}

 