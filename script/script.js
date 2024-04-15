
setupSearch();
initializeModal();



// BURGER MENU
document.addEventListener('DOMContentLoaded', function () {
    let menuBtn = document.querySelector('.header__navigation-menu');
    let menu = document.querySelector('.menu');
    let closeButton = document.querySelector('.close-btn');

    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('active-menu');
        menu.classList.toggle('active-menu');
        document.body.classList.toggle('active-menu');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            menuBtn.classList.remove('active-menu');
            menu.classList.remove('active-menu');
            document.body.classList.remove('active-menu');
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            menuBtn.classList.remove('active-menu');
            menu.classList.remove('active-menu');
            document.body.classList.remove('active-menu');
        }
    });

    closeButton.addEventListener('click', function(){
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

    openBtn.addEventListener('click', function() {
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

    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        signUpModal.style.display = 'block';
        lastOpenModal = '.authorization__sign-up';
    });

    signUpBtn.addEventListener('click', function() {
        signUpModal.style.display = 'none';
        loginModal.style.display = 'block';
        lastOpenModal = '.authorization__login';
    });

    document.addEventListener('click', handleModalClick);
    document.addEventListener('keyup', handleEscKey);
}

// Validation LOGIN / SIGN UP
document.addEventListener('DOMContentLoaded', function() {
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
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Предотвращаем отправку формы по умолчанию
                validateAndSubmit(formId); // Валидация и отправка формы
            });

            const fields = ['email', 'password', 'repeat-password'];
            fields.forEach(fieldId => {
                const fieldInput = document.getElementById(`${formId}-${fieldId}`);
                if (fieldInput) {
                    fieldInput.addEventListener('input', function() {
                        clearValidationMessage(`${formId}-${fieldId}`); // Очистка сообщения об ошибке валидации
                    });
                }
            });
        }
    });
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
        tablinks[i].classList.remove("active"); // Убираем класс "active" у всех вкладок
    }
    document.getElementById(tabName).style.display = "block";
    document.querySelector('[onclick="openTab(\'' + tabName + '\')"]').classList.add("active"); // Добавляем класс "active" текущей вкладке
}
document.addEventListener("DOMContentLoaded", function() {
    openTab('category1');
});


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
