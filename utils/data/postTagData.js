const postTagEndpoint = 'http://localhost:8088/posttags';

const getPostTags = () => new Promise((resolve, reject) => {
  fetch(`${postTagEndpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createPostTag = (postTagData) => new Promise((resolve, reject) => {
  fetch(`${postTagEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postTagData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const deletePostTag = (id) => new Promise((resolve, reject) => {
  fetch(`${postTagEndpoint}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

export {
  getPostTags,
  createPostTag,
  deletePostTag,
};
