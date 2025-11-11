const ready = () => {
  const cards = document.querySelectorAll('.story-card');
  if (!cards.length) {
    return;
  }

  const fitCard = (card) => {
    const back = card.querySelector('.card-back');
    if (!back) return;

    const backStyles = getComputedStyle(back);
    const paddingY = parseFloat(backStyles.paddingTop) + parseFloat(backStyles.paddingBottom);
    const available = card.clientHeight - paddingY;
    if (available <= 0) return;

    const minFont = parseFloat(backStyles.getPropertyValue('--card-back-font-min')) || 0.85;
    const maxFont = parseFloat(backStyles.getPropertyValue('--card-back-font-max')) || 1.05;
    let fontSize = maxFont;

    back.style.setProperty('--card-back-font', `${fontSize}rem`);

    const shrink = () => {
      let safety = 0;
      while (back.scrollHeight > available && fontSize > minFont && safety < 100) {
        fontSize -= 0.02;
        back.style.setProperty('--card-back-font', `${fontSize}rem`);
        safety += 1;
      }
    };

    const grow = () => {
      let safety = 0;
      while (back.scrollHeight < available * 0.86 && fontSize < maxFont && safety < 100) {
        fontSize += 0.02;
        back.style.setProperty('--card-back-font', `${fontSize}rem`);
        safety += 1;
      }
    };

    shrink();
    grow();
  };

  const applyFit = () => {
    cards.forEach((card) => {
      const back = card.querySelector('.card-back');
      if (back) {
        back.style.removeProperty('--card-back-font');
      }
      fitCard(card);
    });
  };

  applyFit();
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(applyFit);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
