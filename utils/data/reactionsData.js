const reactionEndpoint = 'http://localhost:8088/reactions';

const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${reactionEndpoint}`, {
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

export default getReactions;
