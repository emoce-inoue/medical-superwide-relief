const isSP = window.matchMedia('(max-width: 767px)').matches;

const triggerChart = () => {
  const buttonItems = document.querySelectorAll('.l-check__button-item');

  buttonItems.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget;

      const yesValue = target.dataset.yes;
      const noValue = target.dataset.no;
      const answerNumber = yesValue || noValue;
      const isYes = !!yesValue;

      if (answerNumber === '1') {
        document.querySelectorAll('.l-check__chart--selected').forEach((targetChart) => {
          targetChart.classList.remove('l-check__chart--selected');
        });

        document.querySelectorAll('.l-check__button-item--selected').forEach((targeButton) => {
          targeButton.classList.remove('l-check__button-item--selected');
        });

        const followUpQuestion = document.querySelector('.l-check__question[data-no-answer="1"]');
        if (followUpQuestion) {
          followUpQuestion.classList.add('l-check__question--hidden');
        }
      }

      const followUpQuestion = document.querySelector('.l-check__question[data-no-answer="1"]');
      if (followUpQuestion) {
        if (noValue === '1') {
          followUpQuestion.classList.remove('l-check__question--hidden');
        } else if (yesValue === '1') {
          followUpQuestion.classList.add('l-check__question--hidden');
        }
      }

      const answerSelector = isYes ? `.l-check__chart[data-yes-answer="${answerNumber}"]` : `.l-check__chart[data-no-answer="${answerNumber}"]`;

      const targetAnswer = document.querySelector(answerSelector);

      document.querySelectorAll('.l-check__chart--selected').forEach((allChart) => {
        allChart.classList.remove('l-check__chart--selected');
      });

      if (targetAnswer) {
        targetAnswer.classList.add('l-check__chart--selected');
      }

      const parentButtons = target.closest('.l-check__button');
      if (parentButtons) {
        parentButtons.querySelectorAll('.l-check__button-item--selected').forEach((button) => {
          button.classList.remove('l-check__button-item--selected');
        });
      }

      target.classList.add('l-check__button-item--selected');
    });
  });
};

const setCTA = () => {
  const cta = document.querySelector('.js-sticky-cta');
  const logo = document.querySelector('.l-logo');

  if (!cta || !logo) {
    return;
  }
  const fixPosition = logo.getBoundingClientRect().top + window.scrollY;

  if (window.scrollY >= fixPosition) {
    cta.classList.add('js-sticky-cta--fixed');
  } else {
    cta.classList.remove('js-sticky-cta--fixed');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  triggerChart();
  if (isSP) {
    setCTA();
  }
});

window.addEventListener('load', () => {
  const loadElms = document.querySelectorAll('.js-load');
  loadElms.forEach((loadElm) => {
    loadElm.classList.add('js-load--loaded');
  });
});

window.addEventListener('scroll', () => {
  if (isSP) {
    setCTA();
  }
});
