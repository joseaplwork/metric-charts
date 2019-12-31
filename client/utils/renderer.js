export function isElement(obj) {
  return (
    typeof obj === 'object' &&
    obj.nodeType === 1 &&
    typeof obj.style === 'object' &&
    typeof obj.ownerDocument === 'object'
  );
}

export function composeView(strings, ...values) {
  return {
    strings,
    values,
  };
}

export function renderView(templates, element) {
  if (!templates || !element) {
    return null;
  }

  const recursiveContent = template => {
    const finalValues = template.values.map(value => {
      if (typeof value === 'object') {
        if (isElement(value)) {
          return value.outerHTML;
        }

        if (Array.isArray(value) && value.length === 0) {
          return '';
        }

        if (Array.isArray(value) && value.length) {
          return value.map(recursiveContent).join('');
        }

        return recursiveContent(value);
      }

      return value;
    });

    return String.raw(template.strings, ...finalValues);
  };

  const content = recursiveContent(templates);

  // eslint-disable-next-line no-param-reassign
  element.innerHTML = content;

  return element;
}
