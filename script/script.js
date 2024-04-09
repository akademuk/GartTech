setupMenu();
setupSearch();




// BURGER MENU
function setupMenu() {
    let menuBtn = document.querySelector('.header__navigation-menu');
    let menu = document.querySelector('.menu');
    let closeButton = document.querySelector('.close-btn');
    let body = document.querySelector('body');

    // При клике на кнопку меню открывается или закрывается меню
    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('active');
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('active');
        }
    });

    // Закрытие меню по нажатию на кнопку "Esc"
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('active');
        }
    });

    // Закрытие меню при клике на кнопку "Close"
    closeButton.addEventListener('click', function(){
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('active');
    });
}
// SEARCH
function setupSearch() {
    let searchOpenBtn = document.querySelector('.search-open');
    let searchBtn = document.querySelector('.search-btn');
    let searchInput = document.querySelector('.header__navigation-search-box');
    let navigationSearch = document.querySelector('.header__navigation-search');

    searchOpenBtn.addEventListener('click', function(event) {
        searchInput.classList.toggle('active');
        searchBtn.classList.toggle('active');
        navigationSearch.classList.toggle('active');
        searchOpenBtn.classList.toggle('active');
        event.stopPropagation();
    });

    searchBtn.addEventListener('click', function(event) {
        searchInput.classList.remove('active');
        searchBtn.classList.remove('active');
        navigationSearch.classList.remove('active');
        searchOpenBtn.classList.remove('active');
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        if (!navigationSearch.contains(event.target)) {
            searchInput.classList.remove('active');
            searchBtn.classList.remove('active');
            navigationSearch.classList.remove('active');
            searchOpenBtn.classList.remove('active');
        }
    });
}




