import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __uploadPost } from "../../redux/modules/postsSlice";
import {
  AddPostContainer,
  AddPostForm,
  CategoryInput,
  InputA,
  InputB,
  TitleInput,
} from "./style";
import CustomButton from "../../redux/components/CustomButtons";
import useInput from "../../hooks/useInput";

const UploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserDi = localStorage.getItem("id");

  //use Input
  const [title, setTitle, titleChangeHandler] = useInput();
  const [categoryA, setCategoryA, categoryAChangeHandler] = useInput();
  const [categoryB, setCategoryB, categoryBChangeHandler] = useInput();

  //추가하기 핸들러
  const addPostHandler = (e) => {
    //값이 모두 입력될때 실행될것들
    if (title && categoryA && categoryB) {
      e.preventDefault();
      // 새로운 post
      const newPost = {
        id: uuidv4(),
        user: currentUserDi,
        title,
        categoryA,
        categoryB,
        date: new Date(),
        like: [],
      };
      //값이 모두 입력되고 실행되면 navigate로 해당 생성된 id의 디테일페이지로 이동
      dispatch(__uploadPost(newPost));
      navigate(`/${newPost.id}`);
      setCategoryA("");
      setCategoryB("");
      setTitle("");
    }

    if (!title) {
      e.preventDefault();
      document.getElementById("title").focus();
      alert("주제를 입력해주세요");
      return;
    }
    if (!categoryA) {
      e.preventDefault();
      document.getElementById("categoryA").focus();
      alert("A의 내용을 입력해 주세요");
      return;
    }
    if (!categoryB) {
      e.preventDefault();
      document.getElementById("categoryB").focus();
      alert("B의 내용을 입력해 주세요");
      return;
    }
  };

  return (
    <AddPostContainer>
      <AddPostForm onSubmit={addPostHandler}>
        <section>
          <h1>토론주제</h1>
          <TitleInput id="title" value={title} onChange={titleChangeHandler} />
          <br></br>
          <CategoryInput>
            <h2>선택분류</h2>
            <InputA>
              <h2>A</h2> :
              <input
                id="categoryA"
                value={categoryA}
                onChange={categoryAChangeHandler}
              />
            </InputA>
            <InputB>
              <h2>B</h2> :
              <input
                id="categoryB"
                value={categoryB}
                onChange={categoryBChangeHandler}
              />
              <CustomButton>등록</CustomButton>
            </InputB>
          </CategoryInput>
        </section>
      </AddPostForm>
    </AddPostContainer>
  );
};

export default UploadPage;
