import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { updatePost, createPost } from '../utils/data/postsData';

const initialPostState = {
  user_id: '',
  category_id: '',
  title: '',
  publication_date: '',
  image_url: '',
  content: '',
  approved: 1,
};

export default function PostForm({ obj }) {
  // const [tags, setTags] = useState([]);
  const [postFormInput, setPostFormInput] = useState(initialPostState);
  const router = useRouter();
  // const [checkedTags, setCheckedTags] = useState([]);
  // const [user, setUser] = {[]};

  // const getTagsThenSetChecked = () => {
  //   getTagsByPostTags(postId).then(async (arr) => {
  //     await setCheckedTags(arr);
  //   });
  // };

  // const getTagsThenSet = () => {
  //   getAllTags().then(setTags);
  // }

  // useEffect(() => {
  //   getTagsThenSetChecked();
  //   getTagsThenSet();
  //   if (obj.id) {
  //   }
  // })

  useEffect(() => {
    if (obj) {
      setPostFormInput(obj);
    }
  }, [obj]);

  // useEffect(() => {
  //   getAllTags().then(setTags);
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleCheckboxChange = (tagId) => {
  //   if (checkedTags.some((checktag) => checktag.id === tagId)) {
  //     setCheckedTags(checkedTags.filter((checktags) => checktags.id !== tagsId));
  //   } else {
  //     const tag = tags.filter((checktags) => tag.id === tagsId);
  //     setCheckedTags([...checkedTags, tag[0]]);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventdefault();
    const currentDate = new Date().toISOString().split('T')[0];
    if (obj.id) {
      const postUpdate = {
        id: postFormInput.id,
        category_id: postFormInput.category_id,
        title: postFormInput,
        image_url: postFormInput.image_url,
        content: postFormInput.content,
        approved: postFormInput.approved,
      };
      updatePost(postUpdate)
        .then(() => router.push('/posts'));
    } else {
      const post = {
        id: postFormInput.id,
        category_id: postFormInput.category_id,
        title: postFormInput.title,
        publication_date: currentDate,
        image_url: postFormInput.image_url,
        content: postFormInput.content,
        approved: postFormInput.approved,
        user_id: postFormInput.user_id,
      };
      createPost(post)
        .then(() => router.push('/posts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="add a title"
          name="title"
          value={postFormInput.title}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="add an img url"
          name="image_url"
          value={postFormInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="content"
          name="content"
          value={postFormInput.content}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* <FloatingLabel>
        <div>
          {}
        </div>
      </FloatingLabel> */}

      <Button className="primary" type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>

    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    user_id: PropTypes.string,
    category_id: PropTypes.string,
    title: PropTypes.string,
    publication_date: PropTypes.number,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.string,
    // FIXME: Also, would it be .number? I'm still confused about bit. Since it's 1, 0, or null?
    id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialPostState,
};
