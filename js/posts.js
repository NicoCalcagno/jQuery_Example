$(document).ready(function () {
            let pageInit = 1;
            let pageDim = 10;
            getPosts(pageInit, pageDim);
    
            $(".page-item").click(function () {
                let pg = $(this).children().text();
                let pageD = 10;
                $("#listPosts").empty();
                getPosts(pg, pageD);
                $(".page-item.active").toggleClass("active");
                $(this).addClass("active");
            });
        });

        function getPosts(pageInit, pageDim) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                method: 'GET',
                success: function (data) {
                    getComments(data, pageInit, pageDim);
                },
                error: function () {
                    loadPostsError();
                }
            });
        }

        function getComments(posts, pageInit, pageDim) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/comments',
                method: 'GET',
                success: function (data) {
                    loadPosts(posts, pageInit, pageDim, data);
                    
                },
                error: function () {
                    loadCommentsError(posts, pageInit, pageDim);
                }
            });
        }



        function loadPosts(data, page, dim, comments) {
            let posts = data.slice((page - 1) * dim, page * dim);
        
            posts.forEach(post => {
                let col = "<div>" +
                    "<div id=p" + post.id + " class='card mb-3 border-primary' style='width:100%; margin-left:auto; margin-right:auto;'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + post.title + "</h5>" +
                    "<p class='card-text'>" + post.body + "</p>" +
                    "</div>" +
                    "<div class='card-body' style='text-align:right;'>" +
                    "<a href='#' id=" + post.id + " class='card-link'>Comments <svg id=s" + post.id + " xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-down-short' viewBox='0 0 16 16' style='display:none;'>" +
                    "<path fill-rule='evenodd' d = 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' /></svg ></a> " +
                    "</div>" +
                    "</div>" +
                    "</div>";
                let c = "<ul id=c" + post.id + " class='list-group list-group-flush' style='display: none;' > ";
                comments.forEach(comment => {
                    if (comment.postId == post.id) {
                        c += "<li class='list-group-item'>" +
                            "<div class='row g-0'>" +
                            "<div class='col-md-2'>" +
                            "<img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' class='img-fluid rounded-start' alt='' style='width:50px; hight:50px;'>" +
                            "</div>" +
                            "<div class='col-md-10'>" + comment.email + " <br> " + comment.name + " <br> " + comment.body + "</div></div></li>";
                    }
                });

                c += "</ul>";

                $("#listPosts").append(col);
                $("#p" + post.id).append(c);
            });

            $(".card-link").click(function () {
                $("#c" + $(this).attr("id")).fadeToggle();
                $("#s" + $(this).attr("id")).fadeToggle();
            })

        }

        function loadPostsError() {
            let error = "<div class='alert alert-danger' role='alert'>" +
                "Posts not Found! 404 </div> ";

            $("#listPosts").append(error);
        }

        function loadCommentsError(data, page, dim) {
            let posts = data.slice((page - 1) * dim, page * dim);

            posts.forEach(post => {
                let col = "<div>" +
                    "<div id=p" + post.id + " class='card mb-3 border-primary' style='width:100%; margin-left:auto; margin-right:auto;'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + post.title + "</h5>" +
                    "<p class='card-text'>" + post.body + "</p>" +
                    "</div>" +
                    "<div class='card-body' style='text-align:right;'>" +
                    "<a href='#' id=" + post.id + " class='card-link'>Comments <svg id=s" + post.id + " xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-down-short' viewBox='0 0 16 16' style='display:none;'>" +
                    "<path fill-rule='evenodd' d = 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' /></svg ></a> " +
                    "</div>" +
                    "</div>" +
                    "</div>";

                let error = "<div id=c" + post.id + " class='alert alert-danger' style='display:none' role='alert'>" +
                    "Comments not Found! 404 </div> ";

                $("#listPosts").append(col);
                $("#p" + post.id).append(error);
            });
            $(".card-link").click(function () {
                $("#c" + $(this).attr("id")).fadeToggle();
                $("#s" + $(this).attr("id")).fadeToggle();
            })
        }

        

