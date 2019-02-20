export const mockGetEntry = async function(id, params) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (id !== "1") {
        return reject(new Error({
          method: 'mockGetEntry',
          id,
          params,
        }));
      }

      return resolve({
        method: 'mockGetEntry',
        id,
        params,
      });
    });
  });
};

export const mockGetEntries = async function(params) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      return resolve({
        method: 'mockGetEntries',
        params,
      });
    });
  });
};

function ContentfulClient () {
  return {
    getEntry: mockGetEntry,
    getEntries: mockGetEntries,
  };
};

export default ContentfulClient;
