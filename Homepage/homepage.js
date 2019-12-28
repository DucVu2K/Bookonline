
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

                    // Lấy dữ liệu thể loại chèn vào
                    let category_data = "Thể Loại: ";
                    obj.kind.forEach(function(category) {
                        let x = '<a class="category-detail" href="#">'+category+'</a>, ';
                        category_data += x;
                    });
                    category_data = category_data.slice(0,-2);
                    $('#category').html(category_data);

                    // Lấy dữ liệu Ngày tháng
                    let UpdateDate = new Date(obj.updateDate*1000);
                    let UpdateDate_Type = UpdateDate.getDay()+'/'+UpdateDate.getMonth()+'/'+UpdateDate.getUTCFullYear();
                    console.log(UpdateDate_Type);
                    $('#updatedate').html('Ngày cập nhật: '+ UpdateDate_Type);

                    return true;
                }
        }); 
    }   
    // let id = gup('id',window.location.href);
    getBookData(id);
