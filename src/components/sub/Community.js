import React, { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";
import CommunityCard from "./CommunityCard";

// https://react-hook-form.com/
// npm install react-hook-form
// https://github.com/jquense/yup/tree/pre-v1
// npm install -S yup
// npm install @hookform/resolvers

// 01. useForm import
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// 02. form 요소의 항목별 에러 체크 정의
const schema = yup.object({
  title: yup.string().trim().required("제목을 입력해주세요."),
  content: yup.string().trim().required("내용을 입력해주세요."),
  timestamp: yup.string().required("날짜를 선택해 주세요"),
});

const Community = () => {
  // 03. useForm 생성
  // register : 각각의 form 의 name 을 설정
  // handleSubmit : form 에서 onSubmit 할때 실행됨
  // reset : form 에서 reset 할때 실행
  // formState: { errors }  yup 에러 출력 활용
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // yup 과 연결 시켜줌.
    mode: "onChange", // mode 가 onChange 면 실행하라..
  });

  // 데모용 데이터 생성
  const initPost = [
    { title: "Hello 1", content: "Welocome To React!" },
    { title: "Hello 2", content: "Welocome To React!" },
    { title: "Hello 3", content: "Welocome To React!" },
    { title: "Hello 4", content: "Welocome To React!" },
    { title: "Hello 5", content: "Welocome To React!" },
  ];

  // 로컬에 저장된 내용을 가지고 온다.
  const getLocalPost = () => {
    const data = localStorage.getItem("post");
    if (data === null) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };
  const [posts, setPosts] = useState(getLocalPost());

  const [Allowed, setAllowed] = useState(true);
  const createPost = (data) => {
    // data ======>  { title: title, content: conten}
    setPosts([...posts, data]);
    // ...register("title")
    // ...register("conente")
    reset();

    setAllowed((prev) => true);
    setPosts((prev) => {
      const arr = [...prev];
      const updateArr = arr.map((item, index) => {
        item.enableUpdate = false;
        return item;
      });
      return updateArr;
    });

    // 파일을 강제로 업로드 한다.
    
    // const formData = new FormData();
    // formData.append("files", uploadFile);
    // await axios({
    //   method: "post",
    //   url: "/api/files/images",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };

  // 삭제기능
  const deletePost = (idx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    setPosts(posts.filter((item, index) => idx !== index));
  };
  // 업데이트 기능
  const enableUpdate = (idx) => {
    if (!Allowed) return;
    setAllowed(false);
    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.enableUpdate = true;
        }
        return item;
      })
    );
  };
  // 업데이트 취소
  const disapleUpdate = (idx) => {
    setAllowed(true);
    setPosts(
      posts.map((item, index) => {
        if (index === idx) {
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };
  // 게시물 업데이트
  const updatePost = (data) => {
    setPosts(
      posts.map((item, index) => {
        // 숫자로 변경하여서 비교
        if (parseInt(data.index) === index) {
          item.title = data.title;
          item.content = data.content;
          item.timestamp = data.timestamp;
          item.enableUpdate = false;
        }
        return item;
      })
    );

    setAllowed(true);
  };

  // 로컬에 저장
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(posts));
  }, [posts]);

  // 이미지 업로드 및 미리보기
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef(null);
  const onChangeImg = async (e) => {
    e.preventDefault();

    // 미리보기 기능
    if (e.target.files) {
      // files는 배열에 담긴다.
      // file 이 1개 이므로 e.taret.files[0]
      const uploadFile = e.target.files[0];
      console.log(uploadFile);

      // 이미지를 읽어들이는 바닐라 함수
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        // 임시 이미지주소가 만들어진다.
        // useState 입니다.
        setImgFile(reader.result);
      };

      // 서버로 이미지를 임시로 보내고 URL 글자를 받아오는 코드
      // 일반적 방법

      // const formData = new FormData();
      // formData.append("files", uploadFile);
      // await axios({
      //   method: "post",
      //   url: "/api/files/images",
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
    }
  };

  return (
    <Layout title={"Community"}>
      {/* 입력폼 */}

      <div className="inputBox">
        <form onSubmit={handleSubmit(createPost)}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            {...register("title")}
          />
          <span className="err">{errors.title?.message}</span>
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="본문을 입력하세요."
            {...register("content")}
          ></textarea>
          <span className="err">{errors.content?.message}</span>
          <br />
          <input type="date" {...register("timestamp")} />
          <span className="err">{errors.timestamp?.message}</span>
          <br />

          {/* 이미지 업로드 하기 : 이미지 미리보기 연동 */}
          <div>
            <img src={imgFile} alt="프로필 이미지" />
            <input
              type="file"
              accept="image/*"
              onInput={onChangeImg}
              ref={imgRef}
            ></input>
          </div>

          <div className="btnSet">
            {/* form 안쪽에 버튼은 type 을 정의한다. */}
            <button type="reset">CANCEL</button>
            <button type="submit">WRITE</button>
          </div>
        </form>
      </div>
      {/* 리스트 출력 */}
      <div className="showBox">
        {posts.map((item, index) => {
          return (
            <CommunityCard
              key={index}
              item={item}
              disapleUpdate={disapleUpdate}
              updatePost={updatePost}
              enableUpdate={enableUpdate}
              deletePost={deletePost}
              index={index}
            />
          );
        })}
      </div>
    </Layout>
  );
};
export default Community;
