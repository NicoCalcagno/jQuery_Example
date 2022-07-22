$(document).ready(function () {
            let pageInit = 1;
            let pageDim = 5;
            getUsers(pageInit, pageDim);
    
            $(".page-item").click(function () {
                let pg = $(this).children().text();
                let pageD = 5;
                console.log(pg);
                $("#listUsers").empty();
                getUsers(pg, pageD);
                $(".page-item.active").toggleClass("active");
                $(this).addClass("active");
            });
});

        function getUsers(pageInit, pageDim) {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/users',
                method: 'GET',
                success: function (data) {
                    loadUsers(data, pageInit, pageDim);
                },
                error: function () {
                    loadUsersError();
                }
            });
        }

        function loadUsers(data, page, dim) {
            let users = data.slice((page - 1) * dim, page * dim);

            users.forEach(user => {
                let col = "<div id=u" + user.id + " class='col' > " +
                    "<div class='card' style = 'width: 18rem;' >" +
                    "<img src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' class='card-img-top' alt=''>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + user.name + " " + user.username + "</h5>" +
                    "<p class='card-text'>Address: <br>" + user.address.street + " " + user.address.suite + " " + user.address.city + " " + user.address.zipcode + "</p>" +
                    "</div>" +
                    "<ul class='list-group list-group-flush'>" +
                    "<li class='list-group-item'>Email: " + user.email + "</li>" +
                    "<li class='list-group-item'>Phone: " + user.phone + "</li>" +
                    "<li class='list-group-item'>Website: " + user.website + "</li>" +
                    "</ul>" +
                    "<div class='card-body'>" +
                    "<a href='#' id=" + user.id + " class='card-link company'>Company</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                let company = "<div id=c" + user.id + " class='col' style='display: none'> " +
                    "<div class='card' style = 'width: 18rem;' >" +
                    "<img src='https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' class='card-img-top' alt=''>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + user.company.name + "</h5>" +
                    "<p class='card-text'>Motto: <br>" + user.company.catchPhrase + "</p>" +
                    "</div>" +
                    "<ul class='list-group list-group-flush'>" +
                    "<li class='list-group-item'>Bs: " + user.company.bs + "</li>" +

                    "</ul>" +
                    "<div class='card-body'>" +
                    "<a href='#' id=" + user.id + " class='card-link user'>User</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $("#listUsers").append(col);
                $("#listUsers").append(company);
            });

            $(".card-link.company").click(function () {
                $("#u" + $(this).attr("id")).hide();
                $("#c" + $(this).attr("id")).fadeIn();
            })

            $(".card-link.user").click(function () {
                $("#c" + $(this).attr("id")).hide();
                $("#u" + $(this).attr("id")).fadeIn();
            })
        }


        function loadUsersError() {
            let error = "<div class='alert alert-danger' role='alert'>" +
                "Users not Found! 404 </div> ";

            $("#listUsers").append(error);
        }

        