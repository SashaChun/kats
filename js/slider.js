$(document).ready(function () {
  const slidesData = [
    { id: 1, name: "Абіссінська кішка", price: "12 000 uah", photo: "img/1.webp" },
    { id: 1, name: "Американська жорсткошерста", price: "20 000 uah", photo: "img/2.webp" },
    { id: 1, name: "Бенгальська кішка", price: "11 000 uah", photo: "img/3.webp" },
    { id: 1, name: "Бірманська кішка", price: "10 000 uah", photo: "img/4.webp" },
    { id: 1, name: "Британська короткошерста кішка", price: "3 000 uah", photo: "img/5.webp" },
    { id: 1, name: "Кіт Манчкін", price: "7 000 uah", photo: "img/6.webp" },
    { id: 1, name: "Кіт Сфінкс", price: "4 000 uah", photo: "img/7.webp" },
    { id: 1, name: "Кішка Регдол", price: "25 000 uah", photo: "img/8.webp" },
    { id: 1, name: "Мейн-кун", price: "26 000 uah", photo: "img/9.webp" },
    { id: 1, name: "Сіамська кішка", price: "2 000 uah", photo: "img/10.webp" },
  ];

  const $track = $('.recomendation__list');

   slidesData.forEach(slide => {
    const $item = $(`
      <div class="recomendation__item">
        <div class="recomendation__photo" style="background-image: url('${slide.photo}');"></div>
        <p class="recomendation__name">${slide.name}</p>
        <p class="recomendation__price">${slide.price}</p>
        <button class="recomendation__button">Додати у кошик</button>
      </div>
    `);
    $track.append($item);
  });

  const $items = $('.recomendation__item');
  const totalItems = $items.length;

  let itemsPerView = getItemsPerView();
  let currentIndex = 0;
  let maxIndex;

  function getItemsPerView() {
    const width = $(window).width();
    if (width >= 1200) return 4;
    if (width >= 900) return 3;
    if (width >= 600) return 2;
    return 1;
  }

  function updateLayout() {
    itemsPerView = getItemsPerView();
    const itemWidthPercent = 100 / itemsPerView;
    $items.css('flex-basis', itemWidthPercent + '%');

     maxIndex = totalItems - itemsPerView;
    if (maxIndex < 0) maxIndex = 0;

     if (currentIndex > maxIndex) currentIndex = maxIndex;

    updateSlider();
  }

  $('.next').click(function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
       currentIndex = 0;
    }
    updateSlider();
  });

  $('.prev').click(function () {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
       currentIndex = maxIndex;
    }
    updateSlider();
  });


  function updateSlider() {
    const itemWidth = $items.outerWidth(true);
    const offset = currentIndex * itemWidth;
    $track.css('transform', `translateX(-${offset}px)`);
  }

  $('.next').click(function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  $('.prev').click(function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  $(window).resize(function () {
    updateLayout();
  });

  updateLayout();
});
