filterCategory();
setupSearch();
initializeModal();



// BURGER MENU
document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.querySelector('.header__navigation-menu');
    let menu = document.querySelector('.menu');
    let closeButton = document.querySelector('.close-btn');

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active-menu');
        menu.classList.toggle('active-menu');
        document.body.classList.toggle('active-menu');
    });

    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menuBtn.classList.remove('active-menu');
            menu.classList.remove('active-menu');
            document.body.classList.remove('active-menu');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            menuBtn.classList.remove('active-menu');
            menu.classList.remove('active-menu');
            document.body.classList.remove('active-menu');
        }
    });

    closeButton.addEventListener('click', function () {
        menuBtn.classList.remove('active-menu');
        menu.classList.remove('active-menu');
        document.body.classList.remove('active-menu');
    });
});

// SEARCH
function setupSearch() {
    let searchOpenBtn = document.querySelector('.search-open');
    let searchBtn = document.querySelector('.search-btn');
    let searchInput = document.querySelector('.header__navigation-search-box');
    let navigationSearch = document.querySelector('.header__navigation-search');

    searchOpenBtn.addEventListener('click', function (event) {
        searchInput.classList.toggle('active');
        searchBtn.classList.toggle('active');
        navigationSearch.classList.toggle('active');
        searchOpenBtn.classList.toggle('active');
        event.stopPropagation();
    });

    searchBtn.addEventListener('click', function (event) {
        searchInput.classList.remove('active');
        searchBtn.classList.remove('active');
        navigationSearch.classList.remove('active');
        searchOpenBtn.classList.remove('active');
        event.stopPropagation();
    });

    document.addEventListener('click', function (event) {
        if (!navigationSearch.contains(event.target)) {
            searchInput.classList.remove('active');
            searchBtn.classList.remove('active');
            navigationSearch.classList.remove('active');
            searchOpenBtn.classList.remove('active');
        }
    });
}

// Authorization LOGIN / SIGN UP
function initializeModal() {
    const modal = document.querySelector('.authorization');
    const openBtn = document.querySelector('.authorization-open');
    const closeBtn = document.querySelector('.authorization__close');
    const loginBtn = document.querySelector('.authorization__login-btn');
    const signUpBtn = document.querySelector('.authorization__sign-up-btn');
    const loginModal = document.querySelector('.authorization__login');
    const signUpModal = document.querySelector('.authorization__sign-up');
    let body = document.querySelector('body');
    let lastOpenModal = '.authorization__sign-up'; // Устанавливаем первоначальное значение

    function closeModal() {
        modal.classList.remove('show-modal');
    }

    function handleModalClick(event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    function handleEscKey(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    openBtn.addEventListener('click', function () {
        modal.classList.add('show-modal');
        if (lastOpenModal === '.authorization__login') {
            signUpModal.style.display = 'none';
            loginModal.style.display = 'block';
        } else if (lastOpenModal === '.authorization__sign-up') {
            loginModal.style.display = 'none';
            signUpModal.style.display = 'block';
        } else {
            signUpModal.style.display = 'block'; // Показываем модальное окно регистрации при открытии
        }
    });

    closeBtn.addEventListener('click', closeModal);

    loginBtn.addEventListener('click', function () {
        loginModal.style.display = 'none';
        signUpModal.style.display = 'block';
        lastOpenModal = '.authorization__sign-up';
    });

    signUpBtn.addEventListener('click', function () {
        signUpModal.style.display = 'none';
        loginModal.style.display = 'block';
        lastOpenModal = '.authorization__login';
    });

    document.addEventListener('click', handleModalClick);
    document.addEventListener('keyup', handleEscKey);
}

// Validation LOGIN / SIGN UP

    function togglePasswordVisibility(inputId) {
        const passwordInput = document.getElementById(inputId);
        const passwordToggle = document.querySelector(`#${inputId} + .password-toggle img`);

        if (passwordInput && passwordToggle) {
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
            passwordToggle.src = passwordInput.type === "password" ? "img/open-pasword.svg" : "img/open-pasword.svg";
        }
    }

    function validateAndSubmit(formId) {
        const form = document.getElementById(formId);
        
        if (!form) return; // Проверка наличия формы

        const fields = [
            { id: `${formId}-email`, validationMessageId: `${formId}-email-validation`, errorMessage: 'Please enter a valid email address' },
            { id: `${formId}-password`, validationMessageId: `${formId}-password-validation`, errorMessage: 'Password must be at least 8 characters long' },
            { id: `${formId}-repeat-password`, validationMessageId: `${formId}-repeat-password-validation`, errorMessage: 'Password must be at least 8 characters long' }
        ];

        let isValid = true;
        let password = ''; // Variable to store password value

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const validationMessage = document.getElementById(field.validationMessageId);

            if (input && validationMessage) {
                if (field.id === `${formId}-password`) {
                    password = input.value.trim(); // Save password value
                }

                if (field.id === `${formId}-repeat-password`) {
                    // Check password match
                    if (input.value.trim() !== password) {
                        validationMessage.textContent = 'Passwords do not match';
                        isValid = false;
                    }
                } else {
                    if (input.value.trim() === '' || !input.checkValidity()) {
                        validationMessage.textContent = field.errorMessage;
                        isValid = false;
                    } else {
                        validationMessage.textContent = '';
                    }
                }
            }
        });

        if (isValid) {
            form.submit();
            
        }
    }

    function clearValidationMessage(fieldId) {
        const validationMessage = document.getElementById(`${fieldId}-validation`);
        if (validationMessage) {
            validationMessage.textContent = '';
        }
    }

    ['signUpForm', 'loginForm'].forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault(); // Предотвращаем отправку формы по умолчанию
                validateAndSubmit(formId); // Валидация и отправка формы
            });

            const fields = ['email', 'password', 'repeat-password'];
            fields.forEach(fieldId => {
                const fieldInput = document.getElementById(`${formId}-${fieldId}`);
                if (fieldInput) {
                    fieldInput.addEventListener('input', function () {
                        clearValidationMessage(`${formId}-${fieldId}`); // Очистка сообщения об ошибке валидации
                    });
                }
            });
        }
    });


// HERO slider
var swiper = new Swiper(".hero__swiper", {
    spaceBetween: 0,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".promotion-banner__swiper", {
    spaceBetween: 0,
    effect: "fade",
    navigation: {
        nextEl: ".promotion-banner-next",
        prevEl: ".promotion-banner-prev",
    },
    pagination: {
        el: ".promotion-banner-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".gallery__swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
        nextEl: ".gallery-next",
        prevEl: ".gallery-prev",
    },
    pagination: {
        el: ".gallery-pagination",
        clickable: true,
    },
    breakpoints: {
        1280: {
            spaceBetween: 24,
        },
        1279: {
            spaceBetween: 16,
        },
        320: {
            spaceBetween: 16,
        }
    }
});


// Открыть вкладку и скрыть остальные
function openTab(tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active"); // Remove the "active" class from all tabs
    }
    document.getElementById(tabName).style.display = "block";
    document.querySelector('[onclick="openTab(\'' + tabName + '\')"]').classList.add("active"); // Add the "active" class to the current tab
}

// Check if there are any elements with the class .tab-button
const tabButtonsExist = document.querySelectorAll('.tab-button').length > 0;

// If .tab-button elements exist, call openTab function
if (tabButtonsExist) {
    openTab('category1');
}





var swiper = new Swiper(".category1", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
        nextEl: ".hot-offers-next1",
        prevEl: ".hot-offers-prev1",
    },
    pagination: {
        el: ".hot-offers-pagination1",
        clickable: true,
    },
    breakpoints: {
        1280: {
            spaceBetween: 24,
        },
        1279: {
            spaceBetween: 16,
        }
    }
});

var swiper = new Swiper(".category2", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
        nextEl: ".hot-offers-next2",
        prevEl: ".hot-offers-prev2",
    },
    pagination: {
        el: ".hot-offers-pagination2",
        clickable: true,
    },
    breakpoints: {
        1280: {
            spaceBetween: 24,
        },
        1279: {
            spaceBetween: 16,
        }
    }
});

var swiper = new Swiper(".category3", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
        nextEl: ".hot-offers-next3",
        prevEl: ".hot-offers-prev3",
    },
    pagination: {
        el: ".hot-offers-pagination3",
        clickable: true,
    },
    breakpoints: {
        1280: {
            spaceBetween: 24,
        },
        1279: {
            spaceBetween: 16,
        }
    }
});


var swiper = new Swiper(".feedback__slider", {
    spaceBetween: 0,
    navigation: {
        nextEl: ".feedback-next",
        prevEl: ".feedback-prev",
    },
    pagination: {
        el: ".feedback-pagination",
        clickable: true,
    },
});

var swiper = new Swiper(".feedback__slider2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".feedback-next",
        prevEl: ".feedback-prev",
    },
    pagination: {
        el: ".feedback-pagination2",
        clickable: true,
    },
    thumbs: {
        swiper: swiper,
    },
});



// Basket modal
document.addEventListener('DOMContentLoaded', function () {
    const openBasketBtn = document.querySelector('.open-basket');
    const basketCloseBtn = document.querySelector('.basket__close');

    openBasketBtn.addEventListener('click', function () {
        const basket = document.querySelector('.basket');
        basket.classList.add('open');
        document.body.classList.add('active-basket');
    });

    basketCloseBtn.addEventListener('click', function () {
        const basket = document.querySelector('.basket');
        basket.classList.remove('open');
        document.body.classList.remove('active-basket');
    });
});


// Basket calculator
document.addEventListener('DOMContentLoaded', function () {
    const deleteBtns = document.querySelectorAll('.card-delate');
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.basket__card');
            card.remove();
            updateTotal();
            updateCardCount();
            updateTotalSum();
        });
    });

    const cards = document.querySelectorAll('.basket__card');

    cards.forEach(card => {
        let initialTotal = parseFloat(card.querySelector('.basket__content-value').textContent.replace(/\$/, ''));
        let currentTotal = initialTotal;

        const quantityInput = card.querySelector('.quantity-input');
        const minusBtn = card.querySelector('.minus-btn');
        const plusBtn = card.querySelector('.plus-btn');

        minusBtn.addEventListener('click', function () {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateTotal(-initialTotal, card);
                updateTotalSum();
            }
        });

        plusBtn.addEventListener('click', function () {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotal(initialTotal, card);
            updateTotalSum();
        });
    });

    function updateTotal(change = 0, card) {
        if (card) {
            const contentValue = card.querySelector('.basket__content-value');
            if (contentValue) {
                let currentTotal = parseFloat(contentValue.textContent.replace(/\$/, ''));
                currentTotal += change;
                contentValue.textContent = `$${currentTotal.toFixed(2)}`;
            }
        }
    }

    function updateCardCount() {
        const basketValue = document.querySelector('.basket__value');
        if (basketValue) {
            const cardCount = document.querySelectorAll('.basket__card').length;
            basketValue.textContent = cardCount;
        }
    }

    function updateTotalSum() {
        const sumElement = document.getElementById('sum');
        if (sumElement) {
            let totalSum = 0;
            const cardValues = document.querySelectorAll('.basket__content-value');
            cardValues.forEach(value => {
                totalSum += parseFloat(value.textContent.replace(/\$/, ''));
            });
            sumElement.textContent = `$${totalSum.toFixed(2)}`;
        }
    }

    // Вызов функции updateTotalSum при загрузке страницы
    updateTotalSum();
});


document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.basket__textarea .toggle');
    const textarea = document.querySelector('.basket__textarea.additional-class');
    toggles.forEach(function (toggle) {
        const form = toggle.nextElementSibling;

        toggle.addEventListener('click', function () {
            form.classList.toggle('hidden');
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    function performSearch() {
        const searchText = searchInput.value.trim(); // Получаем текст из поля ввода, удаляя пробелы в начале и в конце

        // Здесь можно выполнить логику поиска, например, отправить запрос на сервер или обработать результаты поиска локально

        console.log("Выполняем поиск для текста:", searchText);
    }

    // Обработчик события для нажатия клавиши Enter
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});






const tabButtons = document.querySelectorAll('.sihn-up-tab');
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(tab => {
            tab.style.display = 'none';
        });
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.style.display = 'flex';
        } else {
        }
        const targetId2 = targetId + '_2';
        const targetElement2 = document.getElementById(targetId2);
        if (targetElement2) {
            targetElement2.style.display = 'flex';
        } else {
        }
    });
});


const breadcrumbsStatus = document.getElementById('breadcrumbs-status');
const firstTab = document.querySelector('.sihn-up-tab');
if (firstTab) {
    const firstTabName = firstTab.textContent;
    breadcrumbsStatus.textContent = firstTabName;
}
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetBlockId = button.getAttribute('data-target');
        const tabName = button.textContent;

        breadcrumbsStatus.textContent = tabName;
    });
});



// Модальные окна
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    var body = document.querySelector('body');
    if (modal) {
        modal.style.display = 'flex';
        body.classList.add('active');
    }
}

let closeButtons = document.querySelectorAll('.modalMessage .close');

closeButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var modal = btn.closest('.modalMessage');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('active');
        }
    });
});




// Order history аккардион в кабинете пользователя
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        const content = item.querySelector('.accordion-content');

        btn.addEventListener('click', function () {
            if (content.classList.contains('show')) {
                // Если текущий элемент уже открыт, закрываем его
                content.style.maxHeight = '0';
                setTimeout(() => {
                    content.classList.remove('show');
                }, 300);
                btn.classList.remove('open');
            } else {
                // Закрываем все другие элементы и открываем текущий
                accordionItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherBtn = otherItem.querySelector('.accordion-btn');
                    if (otherContent !== content && otherContent.classList.contains('show')) {
                        otherContent.style.maxHeight = '0';
                        setTimeout(() => {
                            otherContent.classList.remove('show');
                        }, 300);
                        otherBtn.classList.remove('open');
                    }
                });

                // Открываем текущий элемент
                content.classList.add('show');
                content.style.maxHeight = content.scrollHeight + 'px';
                btn.classList.add('open');
            }
        });
    });
});


// Bonus account аккардион в кабинете пользователя
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.bonus-item');

    accordionItems.forEach(item => {
        const btn = item.querySelector('.bonus-accordion-btn');
        const content = item.querySelector('.bonus-accordion-content');

        btn.addEventListener('click', function () {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.bonus-accordion-content');
                    const otherBtn = otherItem.querySelector('.bonus-accordion-btn');

                    otherContent.style.maxHeight = '0';
                    otherContent.classList.remove('show');
                    otherBtn.classList.remove('open');
                }
            });

            if (content.classList.contains('show')) {
                content.style.maxHeight = '0';
                setTimeout(() => {
                    content.classList.remove('show');
                }, 300);
            } else {
                content.classList.add('show');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            btn.classList.toggle('open');
        });
    });
});

// FAQ PAGE аккардион
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.faq-accordion__item');

    accordionItems.forEach(item => {
        const btn = item.querySelector('.faq-accordion__btn');
        const content = item.querySelector('.faq-accordion__content');

        btn.addEventListener('click', function () {
            const isOpen = content.classList.contains('show');

            // Закрываем все другие элементы аккордеона
            accordionItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.faq-accordion__content');
                const otherBtn = otherItem.querySelector('.faq-accordion__btn');
                
                if (otherContent !== content && otherContent.classList.contains('show')) {
                    otherContent.style.maxHeight = '0';
                    otherContent.classList.remove('show');
                    otherBtn.classList.remove('open');
                }
            });

            // Открываем или закрываем текущий элемент аккордеона
            if (isOpen) {
                content.style.maxHeight = '0';
                setTimeout(() => {
                    content.classList.remove('show');
                }, 300);
                btn.classList.remove('open');
            } else {
                content.classList.add('show');
                content.style.maxHeight = content.scrollHeight + 'px';
                btn.classList.add('open');
            }
        });
    });
});

// Services main filter
function filterCategory() {
    const buttons = $(".button");
    const cards = $(".card");
    const heroBlocks = $(".sihn-up__hero .services-page__hero");

    function filter(category) {
        let count = 0;
        cards.each(function(index, card) {
            const isItemFiltered = !$(card).hasClass(category);
            const isShowAll = category.toLowerCase() === "all";
            if ((isItemFiltered && !isShowAll) || count >= 9) {
                $(card).addClass("hide");
            } else {
                $(card).removeClass("hide");
                count++;
            }
        });

        // Переключаем блоки hero в зависимости от выбранной категории
        const isShowAll = category.toLowerCase() === "all";
        heroBlocks.each(function(index, heroBlock) {
            const isBlockFiltered = !$(heroBlock).hasClass(category);
            if (isBlockFiltered && !isShowAll) {
                $(heroBlock).addClass("hide");
            } else {
                $(heroBlock).removeClass("hide");
            }
        });
    }

    buttons.on("click", function() {
        const currentCategory = $(this).data("filter");

        // Удаляем класс "active" у всех кнопок
        buttons.removeClass("active");

        // Добавляем класс "active" к текущей кнопке
        $(this).addClass("active");

        // Показываем только блоки с классом "all" и скрываем остальные
        heroBlocks.each(function(index, heroBlock) {
            if (currentCategory === "all") {
                $(heroBlock).toggleClass("hide", !$(heroBlock).hasClass("all"));
            } else {
                $(heroBlock).toggleClass("hide", !$(heroBlock).hasClass(currentCategory));
            }
        });

        // Показываем только блоки с классом "all" и скрываем остальные
        $(".gallery__content").each(function(index, card) {
            if (currentCategory === "all") {
                $(card).toggleClass("hide", !$(card).hasClass("all"));
            } else {
                $(card).toggleClass("hide", !$(card).hasClass(currentCategory));
            }
        });
    });
}



document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.button');
    const cards = document.querySelectorAll('.card.menu__link');

    if (buttons.length > 0 && cards.length > 0) {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const currentCategory = button.dataset.filter;

                buttons.forEach((btn) => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                cards.forEach((card) => {
                    const isItemFiltered = !card.classList.contains(currentCategory);
                    const isShowAll = currentCategory.toLowerCase() === "all";
                    if (isItemFiltered && !isShowAll) {
                        card.classList.add("hide");
                    } else {
                        card.classList.remove("hide");
                    }
                });

                document.querySelectorAll('.gallery__content').forEach((card) => {
                    if (currentCategory === "all") {
                        card.classList.remove("hide");
                    } else {
                        if (!card.classList.contains(currentCategory)) {
                            card.classList.add("hide");
                        } else {
                            card.classList.remove("hide");
                        }
                    }
                });
            });
        });

        // Устанавливаем класс 'active' для первой кнопки после полной загрузки DOM
        const firstButton = document.querySelector('.button_all');
        firstButton.classList.add('active');
    }
});


 



var galleryTop = new Swiper('.product__swiper', {
    navigation: {
      nextEl: '.product__swiper-next',
      prevEl: '.product__swiper-prev',
    },
           loop: false,
          loopedSlides: 4
  });
  var galleryThumbs = new Swiper('.product__swiper-thumb', {
    spaceBetween: 8,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
          loop: false,
          loopedSlides: 1
  });
  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;




// Переключатель в форме на старнице отзывы
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('#darkbutton');
    function toggleDark() {
        if (document.body.classList.contains('dark')) {
            localStorage.setItem("theme", "light");
        } else { 
            localStorage.setItem("theme", "dark");
        }
    }
    if (button) {
        if (localStorage.getItem("theme") === "dark") {
            button.checked = true;
        }
        button.addEventListener('click', toggleDark);
    }
});

  


  document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const reviewText = this.parentElement;
            if (reviewText.classList.contains('expanded')) {
                reviewText.classList.remove('expanded');
                this.innerHTML = 'OPEN FULLY <span class="icon-NameArrow-DOWN"></span>';
            } else {
                reviewText.classList.add('expanded');
                this.innerHTML = 'CLOSE <span class="icon-NameArrow-UP"></span>';
            }
        });
    });
});
