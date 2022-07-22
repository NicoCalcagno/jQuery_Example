$(document).ready(function () {
            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/todos',
                method: 'GET',
                success: function (data) {
                    loadTable(data);
                },
                error: function () {
                    loadTableError();
                }
            });
        })

function loadTable(data) {
    let row;
            data.forEach(todo => {
                if (todo.completed) {
                    row = "<tr class='bg-success tr'>" +
                        "<th scope = 'row'>" + todo.completed + "</th>" +
                        "<td>" + todo.title + "</td>" +
                        "<td>" + todo.id + "</td>" +
                        "<td>" + todo.userId + "</td>" +
                        "</tr> ";
                }
                else {
                    row = "<tr class='tr' id='t" + todo.id + "'>" +
                        "<th scope = 'row'>" + todo.completed + "</th>" +
                        "<td>" + todo.title + "</td>" +
                        "<td>" + todo.id + "</td>" +
                        "<td>" + todo.userId + "</td>" +
                        "</tr> ";

                    let card = "<div class='card' id='dt" + todo.id + "'  style='width: 18rem; display:none'>" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title'>UserId: " + todo.userId + " TodoId: " + todo.id + "</h5>" +
                        "<p class='card-text'>" + todo.title + "</p>" +
                        "<a href='#' class='btn btn-primary' id='" + todo.id + "'>Completed</a>" +
                        "<a href='#' class='btn btn-danger' id='" + todo.id + "'>Close</a>" +
                        "</div>" +
                        "</div>";
                    $("body").append(card);
                }
                $("#body-table").append(row);
            });

            let btnPrimary = $(".btn-primary");

            btnPrimary.click(function () {
                let tr = $("#t" + $(this).attr("id"));
                let div = $("#dt" + $(this).attr("id"));
                div.fadeOut();
                tr.addClass("bg-success");
                tr.children('th').text("true");

            });

            let btnDanger = $(".btn-danger");

            btnDanger.click(function () {

                let div = $("#dt" + $(this).attr("id"));
                div.fadeOut();

            });

            $(".tr").click(function () {
                let tr = $(this);

                if (tr.children('th').text() == "false") {
                    let idCard = tr.attr("id");
                    $("#d" + idCard).css({ "position": "absolute", "z-index": "100", "top": "" + (tr.offset().top + 50) + "px", "left": "" + (tr.offset().left + 100) + "px" }).fadeIn();
                }
                else {
                    tr.toggleClass("bg-success");
                    tr.children('th').text("false");
                }
            });
        }

        function loadTableError() {
            let row = "<tr class='table-danger'><td colspan='4'>Error: todos not found</td></tr>";
            $("#body-table").append(row);
        }


