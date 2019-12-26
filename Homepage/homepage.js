
   // Lấy giá trị từ URL theo param
   function gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }   
    async function getBookData(id){
      const response =  await fetch("http://5e0209f563d08b0014a285d4.mockapi.io/bookdata")
      let data = await  response.json();

        data.forEach(function(obj) {
            if(obj.id === id)
                {
                    // console.log(obj);
                    $("#name_book").text(obj.name);
                    $("#author").text(obj.author);
                    $('#publisher_book').text(obj.publisher);
                    $('#content_book').html("<p>" + obj.content+ "</p>");
                    $("#img_book").attr("src",obj.imgLink);
                    $("title").text(obj.name + " - Book Online 2");

                    // Lấy dữ liệu thể loại chèn vào
                    let category_data = "Thể Loại: ";
                    let category_text = "";
                    obj.kind.forEach(function(category) {
                        category_data += '<a class="category-detail" href="#">'+category+'</a>, ';
                        category_text += category+", ";
                    });
                    category_text = category_text.slice(0,-2);
                    category_data = category_data.slice(0,-2);
                    $('#DNN-title').text(category_text);
                    $('#category').html(category_data);
                    loadSlideBook(obj.kind);

                    // Lấy dữ liệu Ngày tháng
                    let UpdateDate = new Date(obj.updateDate*1000);
                    let UpdateDate_Type = UpdateDate.getDay()+'/'+UpdateDate.getMonth()+'/'+UpdateDate.getUTCFullYear();
                    // console.log(UpdateDate_Type);
                    $('#updatedate').html('Ngày cập nhật: '+ UpdateDate_Type);
                }
              
        }); 
    }   

    async function loadSlideBook(kind){
        const response =  await fetch("http://5e0209f563d08b0014a285d4.mockapi.io/bookdata")
        let data = await  response.json();
        let slideElement = "";
        data.forEach(function(obj) {
            let isFounded = obj.kind.some( text => kind.includes(text) );
            if(isFounded){
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
            }
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

