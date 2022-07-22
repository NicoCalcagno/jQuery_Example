$(document).ready(function () {
            let pageInit = 1;
            let pageDim = 10;
            getAlbums(pageInit, pageDim);
    
            $(".page-item").click(function () {
                    let pg = $(this).children().text();
                    let pageD = 10;
                    $("#listAlbums").empty();
                    getAlbums(pg, pageD);
                    $(".page-item.active").toggleClass("active");
                    $(this).addClass("active");
            });
        });

        function getAlbums(pageInit, pageDim) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/albums',
                method: 'GET',
                success: function (data) {
                    getPhotos(data, pageInit, pageDim);
                },
                error: function () {
                    loadAlbumsError();
                }
            });
        }

        function getPhotos(albums, pageInit, pageDim) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/photos',
                method: 'GET',
                success: function (data) {
                    loadAlbums(albums, pageInit, pageDim, data);

                },
                error: function () {
                    loadPhotosError(albums, pageInit, pageDim);
                }
            });
        }



        function loadAlbums(data, page, dim, photos) {
            let albums = data.slice((page - 1) * dim, page * dim);

            albums.forEach(album => {
                let col = "<div>" +
                    "<div id=p" + album.id + " class='card mb-3 border-primary' style='width:100%; margin-left:auto; margin-right:auto;'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + album.title + "</h5>" +
                    "</div>" +
                    "<div class='card-body' style='text-align:right;'>" +
                    "<a href='#' id=" + album.id + " class='card-link'>Photos <svg id=s" + album.id + " xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-down-short' viewBox='0 0 16 16' style='display:none;'>" +
                    "<path fill-rule='evenodd' d = 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' /></svg ></a> " +
                    "</div>" +
                    "</div>" +
                    "</div>";

                let c = "<div id=f" + album.id + " class='row row-cols-2 row-cols-md-3 g-4' style='display: none; margin: 0 20px 0 0;' > ";
                photos.forEach(photo => {
                    if (photo.albumId == album.id) {
                        c += "<div class='col-2' style='margin: 0 2px 5px 2px;'>" +
                            "<div class='card bg-dark text-white'>" +
                            "<img class='card-img' src=" + photo.url + " alt='Card image' >" +
                            "</div></div>";
                    }
                });

                c += "</div>";

                $("#listAlbums").append(col);
                $("#p" + album.id).append(c);
            });

            $(".card-link").click(function () {
                $("#f" + $(this).attr("id")).fadeToggle();
                $("#s" + $(this).attr("id")).fadeToggle();
            })

        }

        function loadAlbumsError() {
            let error = "<div class='alert alert-danger' role='alert'>" +
                "Albums not Found! 404 </div> ";

            $("#listAlbums").append(error);
        }


        function loadPhotosError(data, page, dim) {
            let albums = data.slice((page - 1) * dim, page * dim);

            albums.forEach(album => {
                let col = "<div>" +
                    "<div id=p" + album.id + " class='card mb-3 border-primary' style='width:100%; margin-left:auto; margin-right:auto;'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + album.title + "</h5>" +
                    "</div>" +
                    "<div class='card-body' style='text-align:right;'>" +
                    "<a href='#' id=" + album.id + " class='card-link'>Photos <svg id=s" + album.id + " xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-down-short' viewBox='0 0 16 16' style='display:none;'>" +
                    "<path fill-rule='evenodd' d = 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' /></svg ></a> " +
                    "</div>" +
                    "</div>" +
                    "</div>";

                let error = "<div id=f" + album.id + " class='alert alert-danger' style='display:none;' role='alert'>" +
                    "Photos not Found! 404 </div> ";

                $("#listAlbums").append(col);
                $("#p" + album.id).append(error);
            });

            $(".card-link").click(function () {
                $("#f" + $(this).attr("id")).fadeToggle();
                $("#s" + $(this).attr("id")).fadeToggle();
            })

        }

        
