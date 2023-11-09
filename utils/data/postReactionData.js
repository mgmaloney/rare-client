const postReactionEndpoint = 'http://localhost:8088/postreactions';

const getPostReactions = () => new Promise((resolve, reject) => {
  fetch(`${postReactionEndpoint}`, {
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

const createPostReaction = (postReactionData) => new Promise((resolve, reject) => {
  fetch(`${postReactionEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postReactionData),
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

const deletePostReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${postReactionEndpoint}/${id}`, {
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
  getPostReactions,
  createPostReaction,
  deletePostReaction,
};
