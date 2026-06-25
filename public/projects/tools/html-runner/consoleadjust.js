const consoleContainer = document.querySelector('.console-container');
const webpageIframe = document.getElementById('runner')


function getTranslationAmount(element) {
    // Get the computed style of the element
    const computedStyle = window.getComputedStyle(element);
    
    // Get the transform property value
    const transformValue = computedStyle.transform;
    
    // If the element has been translated, the value will be in the matrix form
    if (transformValue !== 'none') {
      const matrix = transformValue.match(/^matrix\((.+)\)$/);
      if (matrix) {
        const values = matrix[1].split(',').map(parseFloat);
        return {
          x: values[4], // translateX is the 5th value in the matrix
          y: values[5]  // translateY is the 6th value in the matrix
        };
      }
    }
    return { x: 0, y: 0 }; // No translation
  }

//change the webpage iframe to fit the consolecontainer
function adjust() {
    webpageIframe.style.width = `${getTranslationAmount(consoleContainer).x+consoleContainer.offsetLeft}px`;
   //// console.log(getTranslationAmount(consoleContainer).x);
    requestAnimationFrame(adjust)
    }
requestAnimationFrame(adjust)
