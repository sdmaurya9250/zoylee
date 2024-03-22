$(".TimeSlot .Single").click(function() {
    $(this).toggleClass("Selected");
});
$(".SelectDate .Single").click(function() {
    $(this).toggleClass("Selected");
});
$(document).ready(function() {
    const user_location = document.getElementById('user-location');
    const loader = document.querySelector('.circle');
    const location_database = document.querySelector('[location-data]');
    const results = document.querySelector('.location-results');
    const location_input = document.querySelector('.search-location');
    location_input.oninput = (e) => {
        results.innerHTML = '';
        let value = e.target.value;
        if (value == '') {
            results.innerHTML = '';
        } else if ('content' in location_database) {
            let children = location_database.content.children;
            for (child of children) {
                let includes = child.innerHTML.toLowerCase().includes(value.toLowerCase());
                if (includes) {
                    if (results.children.length !== 6) {
                        var anchor = document.createElement('a');
                        anchor.innerHTML = child.innerHTML;
                        anchor.href = child.href;
                        results.appendChild(anchor);
                    }
                }
            }
            [...results.children].forEach((anchor) => {
                anchor.onclick = (e) => {
                    e.preventDefault();
                    user_location.innerHTML = anchor.innerHTML;
                }
            })
        }
    }
});
$('#searchbar').keyup(function() {
    if ($(this).val().length == 0) {
        $('.SearchByDefault').show();
        $('.SearchActive').hide();
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
    $("body").addClass("PopupOpen");
});
$(".CloseSearch").click(function() {
    $(".SearchLocation").removeClass("Open");
    $("body").removeClass("PopupOpen");
});
$("#searchzoyleeathome").click(function() {
    $(".SearchResult .SelectServiceVanue").addClass("SearchZoyleeatHome");
});
$("#Searchsalon").click(function() {
    $(".SearchResult .SelectServiceVanue").removeClass("SearchZoyleeatHome");
});
$("#user-location").click(function() {
    $(".location-menu").addClass("Open");
});
$(".CloseLocation").click(function() {
    $(".location-menu").removeClass("Open");
});
$(".AddReview button.OpenNewReview").click(function() {
    $('.AddReview').addClass("Open");
});
$(".AddReview .Close button").click(function() {
    $('.AddReview').removeClass("Open");
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
$(window).scroll(function() {
    var sticky = $('header'),
        scroll = $(window).scrollTop();
    if (scroll >= 5) sticky.addClass('Scrolled');
    else sticky.removeClass('Scrolled');
});
$('.Remove img').click(function() {
    $(this).parent().parent().parent().remove();
});
$(window).scroll(function() {
    var topSlider = $('.carousel-slider'),
        scroll = $(window).scrollTop();
    if (scroll >= 5) topSlider.addClass('Scrolled');
    else topSlider.removeClass('Scrolled');
});