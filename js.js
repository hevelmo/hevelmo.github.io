// Vista de navegación
const navigationView = {
	setActiveLink: function(link) {
		const activeLink = document.querySelector('header nav ul li a.active');
		if (activeLink) {
			activeLink.classList.remove('active');
		}
		link.classList.add('active');
	}
};
// Controlador de navegación
const navController = {
	init: function() {
		// Seleccionar los enlaces de la navegación
		const navLinks = document.querySelectorAll('header nav ul li a');

		// Agregar evento de click a cada enlace
		navLinks.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault(); // Prevenir comportamiento por defecto
				const target = e.target.getAttribute('href'); // Obtener el identificador de la sección
				navigationView.setActiveLink(link);
				sectionController.show(target); // Mostrar la sección correspondiente
			});
		});
	}
};
// Controlador de secciones
const sectionController = {
	init: function() {
		// Seleccionar todas las secciones
		const sections = document.querySelectorAll('main section');

		// Ocultar todas las secciones excepto la primera
		sections.forEach((section, index) => {
			if (index > 0) {
				section.style.display = 'none';
			}
		});
	},

	show: function(target) {
		// Seleccionar la sección correspondiente al identificador
		const section = document.querySelector(target);

		// Ocultar todas las secciones
		const sections = document.querySelectorAll('main section');
		sections.forEach(section => {
			section.style.display = 'none';
		});

		// Mostrar la sección correspondiente
		section.style.display = 'block';
	}
};

const toggleNavBtn = document.querySelector('.portafolio-header__toggle-nav');
const nav = document.querySelector('.portafolio-header__nav');

toggleNavBtn.addEventListener('click', () => {
  nav.classList.toggle('portafolio-header__nav--open');
});

const TypeAndDelete = function(element, words, delay = 100, isMultipleWords = true) {
  let currentText = "";
  let isDeleting = false;
  let wordIndex = 0;
  let textIndex = 0;

  const type = () => {
    if (textIndex < words[wordIndex].length) {
      currentText += words[wordIndex].charAt(textIndex);
      element.innerHTML = currentText;
      textIndex++;
      setTimeout(type, delay);
    } else {
      setTimeout(() => {
        if (isMultipleWords) {
          isDeleting = true;
          setTimeout(deleteText, delay * 2);
        } else {
          currentText = "";
          textIndex = 0;
          isDeleting = true;
          setTimeout(deleteText, delay);
        }
      }, delay * 4);
    }
  };

  const deleteText = () => {
    if (textIndex > 0) {
      currentText = words[wordIndex].substring(0, textIndex - 1);
      element.innerHTML = currentText;
      textIndex--;
      setTimeout(deleteText, delay / 2);
    } else {
      isDeleting = false;
      if (isMultipleWords) {
        wordIndex++;
        if (wordIndex >= words.length) {
          wordIndex = 0;
        }
      }
      setTimeout(type, delay);
    }
  };

  type();
};

// Ejemplo de uso con varias palabras
const words = ['Ing. en Sistemas Computacionales', 'Desarrollador Full Stack', 'Programador web Front End', 'Programador web Back End', 'Desarrollador UX & UI', 'Diseñador Gráfico', 'Marketing Digital', 'SEO', 'Email Marketing', 'Gestor de redes sociales'];
const element = document.getElementById('output');

TypeAndDelete(element, words, 100);
navController.init();
sectionController.init();

// Ejemplo de uso con una palabra
const word = 'Desarrollo UI & UX';
const element2 = document.getElementById('output2');

//TypeAndDelete(element2, [word], 100, false);

const cardsPerPageSelect = document.getElementById("cards-per-page");
const cardContainer = document.getElementById("card-container");
const paginationContainer = document.getElementById("pagination-container");

let currentPage = 1;
let cardsPerPage = parseInt(cardsPerPageSelect.value);

function showCards(cards, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  cards.slice(start, end).forEach((card) => {
    card.style.display = "block";
  });
}

function hideCards(cards) {
  cards.forEach((card) => {
    card.style.display = "none";
  });
}

function displayPagination(cards, page, perPage) {
  const pageCount = Math.ceil(cards.length / perPage);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i;

    if (i === page) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      hideCards(cards);
      showCards(cards, currentPage, perPage);

      const currentButton = paginationContainer.querySelector(".active");
      currentButton.classList.remove("active");
      button.classList.add("active");
    });

    pages.push(button);
  }

  paginationContainer.innerHTML = "";
  pages.forEach((page) => {
    paginationContainer.appendChild(page);
	});
}

function paginateCards(cards, page, perPage) {
  hideCards(cards);
  showCards(cards, page, perPage);
  displayPagination(cards, page, perPage);
}

const cards = Array.from(cardContainer.querySelectorAll(".card"));

paginateCards(cards, currentPage, cardsPerPage);

cardsPerPageSelect.addEventListener("change", (event) => {
  cardsPerPage = parseInt(event.target.value);
  paginateCards(cards, currentPage, cardsPerPage);
});

const cardSlider = document.querySelector(".card-slider");
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

cardSlider.addEventListener("mousedown", (event) => {
  isDragging = true;
  startPosition = event.clientX;
  stopAutoSlide();
  animationID = requestAnimationFrame(animation);
});

cardSlider.addEventListener("mouseup", () => {
  isDragging = false;
  cancelAnimationFrame(animationID);
  startAutoSlide();
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentPage < Math.ceil(cards.length / cardsPerPage)) {
    currentPage++;
    paginateCards(cards, currentPage, cardsPerPage);
  }
  if (movedBy > 100 && currentPage > 1) {
    currentPage--;
    paginateCards(cards, currentPage, cardsPerPage);
  }
  paginateCards(cards, currentPage, cardsPerPage);
});

cardSlider.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const currentPosition = event.clientX;
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
});

function animation() {
  //cardSlider.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
  prevTranslate = currentTranslate;
}

let autoSlideInterval = setInterval(() => {
  if (currentPage >= Math.ceil(cards.length / cardsPerPage)) {
    currentPage = 0;
  }
  currentPage++;
  paginateCards(cards, currentPage, cardsPerPage);
}, 8000);

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (currentPage >= Math.ceil(cards.length / cardsPerPage)) {
      currentPage = 0;
    }
    currentPage++;
    paginateCards(cards, currentPage, cardsPerPage);
  }, 6000);
}
//startAutoSlide();

/*
const cardContainer = document.getElementById("card-container");
const cardSlider = document.getElementById("card-slider");
const cardCount = cardContainer.children.length;

let currentSlide = 0;
let timerId = null;
const autoSlideDelay = 5000;

function showSlide(slideIndex) {
  const slideWidth = cardContainer.offsetWidth;
  const x = -slideIndex * slideWidth;
  cardSlider.style.transform = `translateX(${x}px)`;
}

function startAutoSlide() {
  timerId = setInterval(() => {
    currentSlide = (currentSlide + 1) % cardCount;
    showSlide(currentSlide);
  }, autoSlideDelay);
}

function stopAutoSlide() {
  clearInterval(timerId);
}

showSlide(currentSlide);
startAutoSlide();

cardSlider.addEventListener("mousedown", (event) => {
  event.preventDefault();
  stopAutoSlide();
  const initialX = event.clientX;
  const slideWidth = cardContainer.offsetWidth;
  const initialSlide = currentSlide;
  const mouseMoveListener = (event) => {
    const deltaX = event.clientX - initialX;
    const slideDelta = Math.round(deltaX / slideWidth);
    currentSlide = initialSlide - slideDelta;
    showSlide(currentSlide);
  };
  const mouseUpListener = () => {
    cardSlider.removeEventListener("mousemove", mouseMoveListener);
    cardSlider.removeEventListener("mouseup", mouseUpListener);
    startAutoSlide();
  };
  cardSlider.addEventListener("mousemove", mouseMoveListener);
  cardSlider.addEventListener("mouseup", mouseUpListener);
});

cardSlider.addEventListener("touchstart", (event) => {
  event.preventDefault();
  stopAutoSlide();
  const initialX = event.touches[0].clientX;
  const slideWidth = cardContainer.offsetWidth;
  const initialSlide = currentSlide;
  const touchMoveListener = (event) => {
    const deltaX = event.touches[0].clientX - initialX;
    const slideDelta = Math.round(deltaX / slideWidth);
    currentSlide = initialSlide - slideDelta;
    showSlide(currentSlide);
  };
  const touchEndListener = () => {
    cardSlider.removeEventListener("touchmove", touchMoveListener);
    cardSlider.removeEventListener("touchend", touchEndListener);
    startAutoSlide();
  };
  cardSlider.addEventListener("touchmove", touchMoveListener);
  cardSlider.addEventListener("touchend", touchEndListener);
});
*/
/*
const cardsPerPageSelect = document.getElementById("cards-per-page");
const cardContainer = document.getElementById("card-container");
const paginationContainer = document.getElementById("pagination-container");

let currentPage = 1;
let cardsPerPage = parseInt(cardsPerPageSelect.value);

function showCards(cards, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  cards.slice(start, end).forEach((card) => {
    card.style.display = "block";
  });
}

function hideCards(cards) {
  cards.forEach((card) => {
    card.style.display = "none";
  });
}

function displayPagination(cards, page, perPage) {
  const pageCount = Math.ceil(cards.length / perPage);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i;

    if (i === page) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      hideCards(cards);
      showCards(cards, currentPage, perPage);

      const currentButton = paginationContainer.querySelector(".active");
      currentButton.classList.remove("active");
      button.classList.add("active");
    });

    pages.push(button);
  }

  paginationContainer.innerHTML = "";
  pages.forEach((page) => {
    paginationContainer.appendChild(page);
  });
}

function paginateCards(cards, page, perPage) {
  hideCards(cards);
  showCards(cards, page, perPage);
  displayPagination(cards, page, perPage);
}

function updateCardContainerClass(perPage) {
  if (perPage === 1) {
    let itemCount = 0;
    let node = cardContainer.firstChild;
    while (node) {
      if (node.nodeType === 1) {
        itemCount++;
      }
      node = node.nextSibling;
    }
    cardContainer.className = `cards-items-${itemCount}`;
		console.log(itemCount)
  } else {
    cardContainer.classList.remove(`cards-items-${cardsPerPage}`);
		console.log(cardsPerPage);
    cardContainer.classList.add(`cards-items-${perPage}`);
		console.log(perPage);
  }
}

const cards = Array.from(cardContainer.querySelectorAll(".card"));

paginateCards(cards, currentPage, cardsPerPage);
updateCardContainerClass(1);

cardsPerPageSelect.addEventListener("change", (event) => {
  cardsPerPage = parseInt(event.target.value);
  
  if (cardsPerPage === 1) {
    let itemCount = 0;
    let node = cardContainer.firstChild;
    while (node) {
      if (node.nodeType === 1) {
        itemCount++;
      }
      node = node.nextSibling;
    }
    cardContainer.className = `cards-items-${itemCount}`;
  } else {
    cardContainer.classList.remove(`cards-items-${cardsPerPage}`);
    cardContainer.classList.add(`cards-items-${cardsPerPage}`);
  }

  paginateCards(cards, currentPage, cardsPerPage);
});
*/

/*
const cardsPerPageSelect = document.getElementById("cards-per-page");
const cardContainer = document.getElementById("card-container");
const paginationContainer = document.getElementById("pagination-container");

let currentPage = 1;
let cardsPerPage = parseInt(cardsPerPageSelect.value);

function showCards(cards, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  cards.slice(start, end).forEach((card) => {
    card.style.display = "block";
  });
}

function hideCards(cards) {
  cards.forEach((card) => {
    card.style.display = "none";
  });
}

function displayPagination(cards, page, perPage) {
  const pageCount = Math.ceil(cards.length / perPage);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.innerText = i;

    if (i === page) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      hideCards(cards);
      showCards(cards, currentPage, perPage);

      const currentButton = paginationContainer.querySelector(".active");
      currentButton.classList.remove("active");
      button.classList.add("active");
    });

    pages.push(button);
  }

  paginationContainer.innerHTML = "";
  pages.forEach((page) => {
    paginationContainer.appendChild(page);
	});
}

function paginateCards(cards, page, perPage) {
  hideCards(cards);
  showCards(cards, page, perPage);
  displayPagination(cards, page, perPage);

  // Find the tallest card on the page
  const tallestCardHeight = Math.max(...cards.map(card => card.offsetHeight));

  // Set the height of all cards to the tallest card height
  cards.forEach(card => {
    card.style.height = tallestCardHeight + "px";
  });
}

const cards = Array.from(cardContainer.querySelectorAll(".card"));

paginateCards(cards, currentPage, cardsPerPage);

cardsPerPageSelect.addEventListener("change", (event) => {
  cardsPerPage = parseInt(event.target.value);
  paginateCards(cards, currentPage, cardsPerPage);
});
*/

/*
const CARDS_PER_PAGE = 4;

const carousel = document.querySelector('.carousel');
const cardsWrapper = document.querySelector('.cards-wrapper');
const carousel_cards = document.querySelectorAll('.carousel-card');
const navPrev = document.querySelector('.carousel-prev');
const navNext = document.querySelector('.carousel-next');
const dotsWrapper = document.querySelector('.carousel-dots');

let currentPage_carousel_cards = 0;
let numPages = Math.ceil(carousel_cards.length / CARDS_PER_PAGE);
let dots = [];

function renderCards() {
  const start = currentPage_carousel_cards * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  carousel_cards.forEach((card, i) => {
    if (i >= start && i < end) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function renderDots() {
  dotsWrapper.innerHTML = '';
  for (let i = 0; i < numPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === currentPage) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentPage_carousel_cards = i;
      renderCards();
      renderDots();
    });
    dotsWrapper.appendChild(dot);
    dots.push(dot);
  }
}

function initCarousel() {
  renderCards();
  if (numPages > 1 && useDotsNavigation) {
    renderDots();
  }
  navPrev.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards - 1 + numPages) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
  });
  navNext.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards + 1) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
  });
}

let useDotsNavigation = true;
initCarousel();
*/
/*
const CARDS_PER_PAGE = 2;

const carousel = document.querySelector('.carousel');
const cardsWrapper = document.querySelector('.cards-wrapper');
const carousel_cards = document.querySelectorAll('.carousel-card');
const navPrev = document.querySelector('.carousel-prev');
const navNext = document.querySelector('.carousel-next');
const dotsWrapper = document.querySelector('.carousel-dots');

let currentPage_carousel_cards = 0;
let numPages = Math.ceil(carousel_cards.length / CARDS_PER_PAGE);
let dots = [];
let autoplayInterval;

function renderCards() {
  const start = currentPage_carousel_cards * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  carousel_cards.forEach((card, i) => {
    if (i >= start && i < end) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function renderDots() {
  dotsWrapper.innerHTML = '';
  for (let i = 0; i < numPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === currentPage_carousel_cards) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentPage_carousel_cards = i;
      renderCards();
      renderDots();
      resetAutoplayInterval();
    });
    dotsWrapper.appendChild(dot);
    dots.push(dot);
  }
}

function initCarousel() {
  renderCards();
  if (numPages > 1 && useDotsNavigation) {
    renderDots();
  }
  navPrev.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards - 1 + numPages) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
    resetAutoplayInterval();
  });
  navNext.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards + 1) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
    resetAutoplayInterval();
  });
  startAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    currentPage_carousel_cards = (currentPage_carousel_cards + 1) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
  }, 5000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function resetAutoplayInterval() {
  if (useAutoplay) {
    stopAutoplay();
    startAutoplay();
  }
}

let useDotsNavigation = true;
let useAutoplay = true;
initCarousel();
*/
const CARDS_PER_PAGE = 3;

const carousel = document.querySelector('.carousel');
const cardsWrapper = document.querySelector('.cards-wrapper');
const carousel_cards = document.querySelectorAll('.carousel-card');
const navPrev = document.querySelector('.carousel-prev');
const navNext = document.querySelector('.carousel-next');
const dotsWrapper = document.querySelector('.carousel-dots');

let currentPage_carousel_cards = 0;
let numPages = Math.ceil(carousel_cards.length / CARDS_PER_PAGE);
let dots = [];
let autoplayInterval;

function renderCards() {
  const start = currentPage_carousel_cards * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  carousel_cards.forEach((card, i) => {
    if (i >= start && i < end && i < carousel_cards.length) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function renderDots() {
  dotsWrapper.innerHTML = '';
  dots = [];
  for (let i = 0; i < numPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === currentPage_carousel_cards) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      currentPage_carousel_cards = i;
      renderCards();
      renderDots();
      resetAutoplayInterval();
    });
    dotsWrapper.appendChild(dot);
    dots.push(dot);
  }
}

function initCarousel() {
  renderCards();
  if (numPages > 1 && useDotsNavigation) {
    renderDots();
  }
  navPrev.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards - 1 + numPages) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
    resetAutoplayInterval();
  });
  navNext.addEventListener('click', () => {
    currentPage_carousel_cards = (currentPage_carousel_cards + 1) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
    resetAutoplayInterval();
  });
  startAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    currentPage_carousel_cards = (currentPage_carousel_cards + 1) % numPages;
    renderCards();
    if (numPages > 1 && useDotsNavigation) {
      renderDots();
    }
  }, 5000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function resetAutoplayInterval() {
  if (useAutoplay) {
    stopAutoplay();
    startAutoplay();
  }
}

let useDotsNavigation = true;
let useAutoplay = true;
initCarousel();

/*
function init() {
  
  var i = 0;
  var items = document.querySelectorAll(".servicios__description");
  var itemsHeight = [];
  
  console.log(items);
  console.log(itemsHeight);
  
  for (i = 0; i < items.length; i++) {
    
    itemsHeight.push(items[i].offsetHeight);
  }
  
  var maxHeight = Math.max(...itemsHeight);
  
  for (i = 0; i < items.length; i++) {
  
    items[i].style.height = maxHeight + "px";
  }
}

init();
*/
function setupHorizontalScroll(containerSelector, contentSelector, buttonsSelector) {
  const scrollContainer = document.querySelector(containerSelector);
  const scrollContent = document.querySelector(contentSelector);
  const scrollButtons = document.querySelectorAll(buttonsSelector);

  // Función para desplazar el scroll con el mouse
  scrollContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollContainer.scrollLeft += event.deltaY;
  });

  // Función para desplazar el scroll al hacer clic en los botones de navegación
  scrollButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const scrollAmount = scrollContainer.clientWidth / 2;
      if (event.target.classList.contains('scroll-button-left')) {
        scrollContainer.scrollLeft -= scrollAmount;
      } else if (event.target.classList.contains('scroll-button-right')) {
        scrollContainer.scrollLeft += scrollAmount;
      }
    });
  });
}
setupHorizontalScroll('.design-skills-container', '.design-skills-content', '.design-skills-scroll-button');
setupHorizontalScroll('.coding-skills-container', '.coding-skills-content', '.coding-skills-scroll-button');

