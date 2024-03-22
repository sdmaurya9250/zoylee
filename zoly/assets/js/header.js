$(document).on("click", "[name='slaon-type']", function() {
    $('.UserSearchResult a').remove();
    $("#searchbar").val("");
});
$('.CartDropdownButton').click(function() {
    $('.CartDropdownButton .Dropdown').addClass('active');
});
$('#searchbar').keyup(function() {
    var url = window.location.pathname;
    let type = $("[name='slaon-type']:checked").val();
    var search = $(this).val();
    if (search.length >= 2) {
        $('.SearchByDefault').hide();
        $('.SearchActive').show();
        $('.SearchInput .Clear').show();
        $(".SearchActive").html("<p class='m-0 text-black'>Searching...</p>");
        $.ajax({
            type: "GET",
            url: base_url + "/custom-search-new?random=" + Date.now(),
            data: {
                search: search,
                type: type
            },
            success: function(responseData) {
                if (responseData.html == "") {
                    $(".SearchActive").html("<p class='m-0 text-black'>No Record Found for " + search + "</p>");
                } else {
                    $(".SearchActive").html(responseData.html);
                    filter_list();
                }
            },
            error: function(err) {
                $("#suggestionList").addClass("display-none");
                $("#msg-status").html("No record found!");
            },
        });
    } else {
        $('.SearchByDefault').show();
        $('.SearchActive a').remove();
        $('.SearchInput .Clear').hide();
    }
    if ($(this).val().length == 0) {
        $('.SearchByDefault').show();
        $('.SearchActive a').remove();
        $('.SearchInput .Clear').hide();
    } else {
        $('.SearchByDefault').hide();
        $('.SearchActive').show();
        $('.SearchInput .Clear').show();
    }
});

function filter_list() {
    let input = document.querySelector('#searchbar');
    let list = document.querySelector('.UserSearchResult').querySelectorAll('a');
    let result = new RegExp(input.value, 'i');
    list.forEach((item) => {
        if (result.test(item.textContent)) {
            item.innerHTML = item.textContent.replace(result, '<b class="yellow">$&</b>');
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};
$("#CartToggleSalon").click(function() {
    $(".NavLink .CartDropdownButton .Dropdown").addClass("Dark");
});
$("#CartToggleHome").click(function() {
    $(".NavLink .CartDropdownButton .Dropdown ").removeClass("Dark");
});
$(".OpenNav").click(function() {
    $(".NavLink").addClass("Open");
});
$(".CloseNav").click(function() {
    $(".NavLink").removeClass("Open");
});
$(".OpenSearch").click(function() {
    $(".SearchLocation").addClass("Open");
});
$(".CloseSearch").click(function() {
    $(".SearchLocation").removeClass("Open");
});
$("#searchzoyleeathome").click(function() {
    $(".SearchResult .SelectServiceVanue").addClass("SearchZoyleeatHome");
});
$("#Searchsalon").click(function() {
    $(".SearchResult .SelectServiceVanue").removeClass("SearchZoyleeatHome");
});
$(document).on("click", "#user-location", function() {
    $(".location-menu").addClass("Open");
});
$(document).on("click", "#CloseLocation", function() {
    $(".location-menu").removeClass("Open");
});
$(".Fav svg").click(function() {
    $(".Fav svg").css("stroke", "red");
    $(".Fav svg").css("fill", "red");
});
$("#searchbar").on('focus blur', function() {
    $(".SearchInput").toggleClass('active');
});
$(".search-location").on('focus blur', function() {
    $(".location").toggleClass('active');
});
let hisarr = JSON.parse(localStorage.getItem('history'));
if (hisarr != null) {
    var hisdata = hisarr;
    let li = '';
    $(hisarr).each(function(i, val) {
        li = li + `<li><a href="` + val.url + `">` + val.label + `</a></li>`
    });
    var htmel = `<h6 class="text-black">Recent searches</h6><ul>` + li + `</ul>`;
    $(".RecentSearch").html(htmel);
} else {
    var hisdata = [];
}
$(document).on("click", ".UserSearchResult a", function() {
    let val = $.trim($(this).text());
    let url = $(this).attr('href');
    hisdata.push({
        label: val,
        url: url
    });
    if (hisdata.length > 4) {
        hisdata.shift();
    }
    localStorage.setItem('history', JSON.stringify(hisdata));
});
$(document).on("click", ".close-btn", function() {
    $(".loader").removeClass('d-none');
    var salonType = $('[name="CartServiceType"]:checked').val();
    var id = $(this).attr('id');
    $.ajax({
        type: 'GET',
        url: '/cart/remove-cart-item',
        data: {
            salonType: salonType,
            'id': $(this).attr('id')
        },
        success: function(data) {
            $(".loader").addClass('d-none');
            if (data.msg == true) {
                $("#" + id).parents('.cart-item').remove();
                let salonItem = $("#ZoyleeSalonCart .cart-item").length;
                if (salonItem == 0) {
                    $("#ZoyleeSalonCart .checkout-button").addClass('d-none');
                } else {
                    $("#ZoyleeSalonCart .checkout-button").removeClass('d-none');
                }
                let wahItem = $("#ZoyleeHomeCart .cart-item").length;
                if (wahItem == 0) {
                    $("#ZoyleeHomeCart .checkout-button").addClass('d-none')
                } else {
                    $("#ZoyleeHomeCart .checkout-button").removeClass('d-none')
                }
                location.reload();
            } else {
                console.log("Server Error");
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
});
$(document).mouseup(function(e) {
    var container = $(".Dropdown  , .CartDropdownButton");
    var dropdown = $(".Dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.Dropdown').removeClass('active');
    }
});