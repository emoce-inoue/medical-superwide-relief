const isSP = window.matchMedia('(max-width: 767px)').matches;

const triggerChart = () => {
  const buttonItems = document.querySelectorAll('.l-check__button-item');

  buttonItems.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget;

      const yesValue = target.dataset.yes;
      const noValue = target.dataset.no;
      const answerNumber = yesValue || noValue;
      const isYes = Boolean(yesValue);
      const followUpQuestion = document.querySelector('.l-check__question[data-no-answer="1"]');

      if (answerNumber === '1') {
        document.querySelectorAll('.l-check__chart--selected').forEach((targetChart) => {
          targetChart.classList.remove('l-check__chart--selected');
        });

        document.querySelectorAll('.l-check__button-item--selected').forEach((targeButton) => {
          targeButton.classList.remove('l-check__button-item--selected');
        });

        if (followUpQuestion) {
          followUpQuestion.classList.add('l-check__question--hidden');
        }
      }

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

        targetAnswer.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
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
  const cta = document.querySelector('.c-cta-sp');
  const logo = document.querySelector('.l-logo');
  const footer = document.querySelector('.l-footer');

  if (!cta || !logo) {
    return;
  }
  const startPosition = logo.getBoundingClientRect().top + window.scrollY;
  const endPosition = footer.getBoundingClientRect().top + window.scrollY;
  const winTop = window.scrollY + window.innerHeight;

  if (window.scrollY >= startPosition && endPosition >= winTop) {
    cta.classList.add('c-cta-sp--fixed');
  } else {
    cta.classList.remove('c-cta-sp--fixed');
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
