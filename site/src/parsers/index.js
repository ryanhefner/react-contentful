const pageParser = (data) => {
  if (!data.items || !data.items.length) {
    return null;
  }

  const pageData = data.items[0];

  const {
    slug,
    name,
    components,
  } = pageData.fields;

  return {
    slug,
    name,
    components,
  };
};

const pageSectionParser = (data) => {
  const {
    title,
    description,
    copyComponents,
    refComponents,
  } = data.fields;

  return {
    title,
    description,
    copyComponents,
    refComponents,
  };
};

export {
  pageParser,
  pageSectionParser,
};
