export const getFocusableElements = (container: Element): HTMLElement[] => {
  const focusableSelectors = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const elements = container.querySelectorAll(focusableSelectors);
  return Array.from(elements) as HTMLElement[];
};

export const getFirstAndLastFocusableElements = (container: Element) => {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) {
    return { firstElement: null, lastElement: null };
  }

  return {
    firstElement: focusableElements[0],
    lastElement: focusableElements[focusableElements.length - 1]
  };
};

export const shouldWrapToLast = (currentElement: Element | null, firstElement: HTMLElement): boolean => {
  return currentElement === firstElement;
};

export const shouldWrapToFirst = (currentElement: Element | null, lastElement: HTMLElement): boolean => {
  return currentElement === lastElement;
};