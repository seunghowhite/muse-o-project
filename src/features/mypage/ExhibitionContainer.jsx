import React, { useState } from "react";
import styled from "styled-components";
import { useGetLikedExhibitionInfo } from "../../hooks/mypage/useGetLikedExhibitionInfo";

function ExhibitionContainer() {
  const { LikedExhibitionInfo } = useGetLikedExhibitionInfo();

  const [currentTab, clickTab] = useState(0);
  // console.log(currentTab, "ct"); //index

  const menuArr = [
    {
      id: 0,
      name: "좋아요",
      content: [],
    },
    {
      id: 1,
      name: "스크랩",
      content: [
        {
          id: 0,
          src: "abc",
          alt: "",
        },
      ],
    },
    {
      id: 2,
      name: "내가 여는 전시",
      content: [
        {
          id: 0,
          src: "abc",
          alt: "",
        },
        {
          id: 1,
          src: "def",
          alt: "",
        },
      ],
    },
  ];
  const selectMenuHandler = id => {
    clickTab(id);
    if (id === 0) {
      // console.log(LikedExhibitionInfo, "info");
    }
  };

  return (
    <StContainer>
      <div style={{ fontSize: "25px", marginBottom: "15px" }}>전시</div>
      <StExhibitionBox>
        <StWrap>
          <StTabWrap>
            {menuArr.map(el => (
              <StTab key={el.id} onClick={() => selectMenuHandler(el.id)}>
                {el.name}
              </StTab>
            ))}
          </StTabWrap>
          <StImgWrap>
            {menuArr[currentTab].content.map(list => {
              return <StImg key={list.id} src={list.src} alt={list.alt} />;
            })}
          </StImgWrap>
        </StWrap>
      </StExhibitionBox>
    </StContainer>
  );
}

export default ExhibitionContainer;

const StContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;
const StExhibitionBox = styled.div`
  background-color: #ffc0cb61;
  width: 1050px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 970px;
`;

const StTabWrap = styled.div`
  display: flex;
  gap: 30px;
`;

const StTab = styled.div`
  padding: 18px 0px;
  cursor: pointer;
  font-size: 15px;
`;

const StImgWrap = styled.div`
  width: 970px;
  height: 230px;
  background-color: #80808089;
  display: flex;
  gap: 30px;
`;

const StImg = styled.img`
  width: 170px;
  height: 230px;
  background: #0000007d;
`;
