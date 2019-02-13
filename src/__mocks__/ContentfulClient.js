export const mockGetEntry = jest.fn(function(id, params) {
  return Promise.resolve({
    method: 'mockGetEntry',
    id,
    params,
  });
});
export const mockGetEntries = jest.fn(function(params) {
  return Promise.resolve({
    method: 'mockGetEntries',
    params,
  });
});

function ContentfulClient () {
  return {
    getEntry: mockGetEntry,
    getEntries: mockGetEntries,
  };
};

export default ContentfulClient;
