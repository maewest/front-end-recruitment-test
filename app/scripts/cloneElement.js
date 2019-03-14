const cloneElement = (actionElement, elementToClone, appendTo) => {
    const button = document.querySelector(actionElement);
    const element = document.querySelector(elementToClone);
    const container = document.querySelector(appendTo);

    if (!button && !element && !container) return;

    button.addEventListener('click', () => {
      container.appendChild(element.cloneNode());
    });
  };

  cloneElement('#js-addMoreBacon', '#js-imageBacon', '#js-imageContainer');
  