   // Lấy giá trị từ URL theo param
   function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
async function getData(id_book,id_chap) {
    const response = await fetch ("http://5e0209f563d08b0014a285d4.mockapi.io/chapter");
    let data = await response.json();
    let mucluc = "<h3>Mục lục</h3>";
    data.forEach(function (obj) {
        
        if(obj.id === id_book)
        {
           let bookdata = obj.content;
           for (let i = 0; i < bookdata.length; i++) {
               mucluc += `<a href="?id=${id_book}&chap=${bookdata[i].cnumber}">
                            <p>Chương ${bookdata[i].cnumber}: ${bookdata[i].ctitle}</p>
                        </a>`;
                if(bookdata[i].cnumber === id_chap)
                { 
                    $("#title").html(`<h2>Chương ${bookdata[i].cnumber}: ${bookdata[i].ctitle}</h2>`);
                    $("#content_chap").html(bookdata[i].ccontent);
                    if(i == 0)
                         $("#previous").attr("href", "#");
                    else {
                        $("#previous").attr("href", `?id=${id_book}&chap=${i}`);
                    }
                    if(i === bookdata.length - 1 )
                        $("#next").attr("href", "#");
                    else
                        $("#next").attr("href", `?id=${id_book}&chap=${i+2}`);
                    
                }
            }
           $(".mucluc").html(mucluc);
           
        }
        
    });
}

