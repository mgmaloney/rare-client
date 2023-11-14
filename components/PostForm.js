import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../utils/data/postsData';
import getTags from '../utils/data/tagsData';

const initialState = {
  user_id: '',
  post_tags: [],
  title: '',
  image_url: '',
  content: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tagIdArray, setTagIdArray] = useState([]);
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const userId = localStorage.auth_token;

  console.warn(obj.id);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getTags().then((res) => setTags(res));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // NEED TO CHECK IF POST TAGS ARE BEING CREATED, RIGHT NOW THIS IS JUST HANDLING THE STATE OF TAGS BEING CHECKED AND UNCHECKED... MAY NEED TO BE A SEPARATE STATE?//
  const handleTags = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (!tagIdArray.includes(value)) {
        setTagIdArray([...tagIdArray, value]);
      }
    } else {
      const tagIndex = tagIdArray.findIndex((tagId) => tagId === value);
      const newArray = [...tagIdArray];
      newArray.splice(tagIndex, 1);
      setTagIdArray(newArray);
    }
  };

  // NEED TO UPDATE HANDLE SUBMIT SO THAT THE CHECKED TAGS ARE SUBMITTED AS WELL //
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, user_id: userId };
    if (obj.id) {
      updatePost(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createPost(payload).then(() => {
        router.push('/posts');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Post Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Date"
          name="publication_date"
          value={formInput.publication_date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Content"
          style={{ height: '100px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <div>
        {tags.map((tag) => (
          <Form.Group key={tag.id}>
            <div className="checkform">
              <Form.Check type="checkbox" label={tag.label} value={tag.id} onChange={handleTags} />
            </div>
          </Form.Group>
        ))}
      </div>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    post_tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
