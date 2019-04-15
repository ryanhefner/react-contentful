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

export const mockCheckCache = function(requestKey) {
  return null;
};

function ContentfulClient () {
  return {
    checkCache: mockCheckCache,
    getEntry: mockGetEntry,
    getEntries: mockGetEntries,
  };
};

export default ContentfulClient;
