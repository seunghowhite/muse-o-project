import { styled } from "@tanstack/react-query-devtools/build/lib/utils";

const SectionSpan = styled.span`
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  user-select: none;
`;
const Count = styled.span`
  margin-left: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
`;
const DetailExplanation = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex: 1;
  max-width: 495px;
`;
const UpDateButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ButtonsAddress = styled.button`
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  background: #ffffff;

  :hover {
    background-color: #eeeeee;
  }
`;
const TitleP = styled.p`
  flex: 1;
  max-width: 32px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 25px;
`;
const LocationBox = styled.div`
  display: flex;
  gap: 5px;
`;

const Separator = styled.span`
  margin: 0 8px;
  font-size: 35px;
`;

const Textarea = styled.textarea`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`;

const Post = styled.div`
  position: fixed;
`;
const ExDesc = styled.div`
  width: 493px;
  height: auto;
`;
const Explanation = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  flex: 1;
  max-width: 130px;
  padding-top: 8px;
`;
const TitleInput = styled.input`
  background-color: ${({ bg }) => bg};
  max-width: ${({ width }) => width || "100%"};
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 15px;
  font-size: 16px;
  height: 41px;
  flex: 1;
`;

const ExTitleKor = styled.div`
  display: flex;
  height: 41px;
  width: 100%;
  align-items: center;
`;
const EXColum = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  margin: 18px 0px;
`;
const ContentsWrap = styled.div`
  margin-top: 172px;
  display: flex;
  width: 820px;
  flex-direction: column;
`;
const Caution = styled.div`
  width: 364px;
  height: 100px;
  background-color: #d9d9d9;
  margin-top: 20px;
`;
const SubmitButton = styled.button`
  background-color: #d9d9d9;
  width: 364px;
  height: 40px;
  border-radius: 50px;
  margin-top: 15px;
`;
const PostImgArea = styled.div`
  display: flex;
  background-color: #d9d9d9;
  height: 520px;
  width: 364px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const OnLine = styled.button`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  background-color: #ffffff;
  :hover {
    background-color: #fff0f0;
  }
  color: ${(props) => (props.exhibitionKind === "EK0002" ? "red" : "black")};
`;
const Offline = styled.button`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  margin-right: 60px;
  background-color: #ffffff;
  :hover {
    background-color: #fff0f0;
  }
  color: ${(props) => (props.exhibitionKind === "EK0001" ? "red" : "black")};
`;
const PageTitle = styled.h1`
  margin-top: 40px;
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 57px;
`;

const PostWrap = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 515px;
  max-height: 1080px;
  margin-left: 75px;
`;

const SelectOnOff = styled.div`
  margin-top: 30px;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 110px;
  background: #3c3c3c;
  border-radius: 10px 10px 0px 0px;
`;

const DragIcon = styled.img`
  width: 3em;
  height: 3em;
`;

const Postimg = styled.img`
  display: block;
  width: 365px;
  max-height: 520px;
  margin-top: 40px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  gap: 8px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const WriteRule = styled.div`
  display: flex;
  flex: 1;
  max-width: 190px;
  margin-left: 12px;
  & > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #5a5a5a;
  }
`;

const Thumbimg = styled.img`
  display: block;
  max-width: auto;
  max-height: 150px;
`;

const ThumbsContainer = styled.aside`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  min-height: 250px;
  gap: 13px;
  border-bottom: 1px dashed #242424;
  border-right: 1px dashed #242424;
  border-left: 1px dashed #242424;
  border-radius: 0 0 10px 10px;
  margin: 0px 0px 50px 0px;
`;
const TumbsWrap = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  min-height: 210px;
  margin: 0px 0px 50px 0px;
  padding: 16px;
  gap: 13px;
  overflow-x: scroll;
  margin: 10px;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #244dde;
  }
`;

export {
  SectionSpan,
  Count,
  DetailExplanation,
  UpDateButtons,
  ButtonsAddress,
  TitleP,
  LocationBox,
  Separator,
  Textarea,
  Post,
  ExDesc,
  Explanation,
  TitleInput,
  ExTitleKor,
  EXColum,
  Box,
  ContentsWrap,
  Caution,
  SubmitButton,
  PostImgArea,
  OnLine,
  Offline,
  PageTitle,
  PostWrap,
  SelectOnOff,
  Section,
  DragIcon,
  Postimg,
  Thumb,
  ThumbInner,
  WriteRule,
  Thumbimg,
  ThumbsContainer,
  TumbsWrap,
};
