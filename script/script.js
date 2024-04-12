setupMenu();
setupSearch();
initializeModal();




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

    menu.addEventListener('click', function(event) {
        if (event.target.classList.contains('menu__link')) {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('active');
        }
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

// Authorization LOGIN / SIGN UP
function initializeModal() {
    const modal = document.querySelector('.authorization');
    const openBtn = document.querySelector('.authorization-open');
    const closeBtn = document.querySelector('.authorization__close');
    const loginBtn = document.querySelector('.authorization__login-btn');
    const signUpBtn = document.querySelector('.authorization__sign-up-btn');
    const loginModal = document.querySelector('.authorization__login');
    const signUpModal = document.querySelector('.authorization__sign-up');
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
});

var swiper = new Swiper(".hot-offers__swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    navigation: {
      nextEl: ".hot-offers-next",
      prevEl: ".hot-offers-prev",
    },
    pagination: {
      el: ".hot-offers-pagination",
      clickable: true,
    },
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
});
