import styled from "styled-components";

const Layout = styled.div`
  padding: 80px 75px;
  @media (max-width: 1440px) {
    padding: 60px 56.25px;
  }
`
const H1 = styled.h1`
  font-size: 48px;
  font-family: 'S-CoreDream-3Light';

  span {
    font-family: 'Montserrat';
    font-size: 32px;
  }
  @media (max-width: 1440px) {
    font-size: 36px;
    span {
      font-size: 24px;
    }
  }
`

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 23px;
  width: 100%;
  margin-top: 60px;

  @media (max-width: 1440px) {
    gap: 17.25px;
    margin-top: 45px;
  }
`;

const HiddenRef = styled.div`
  margin-top: 10px;
  color: transparent;
`

const BoxWrap = styled.div`
  position: relative;
  height: 426px;
  box-shadow: 0px 4px 7px #878787;
  border-radius: 5px;
  background-color: #fff;
  overflow: hidden;

  @media (max-width: 1440px) {
    height: 319.5px;
  }
`;

const BoxImg = styled.div`
  position: relative;
  max-width: 364px;
  min-height: 365px;
  max-height: 365px;
  overflow: hidden;

  .artgramimg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  @media (max-width: 1440px) {
    max-width: 273px;
    min-height: 273.75px;
    max-height: 273.75px;
  }
`;

const BoxProfile = styled.div`
  display: grid;
  grid-template-columns: 29px 1fr 47px 47px;
  gap: 8px;
  height: 61px;
  padding: 16px 12px;
  align-items: center;

  @media (max-width: 1440px) {
    padding: 12px 9px;
    grid-template-columns: 21.75px 1fr 35.25px 35.25px;
    gap: 6px;
    height: 45.75px;
  }
`;

const BoxProfileimg = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 50px;
  background-color: lightgray;

  img {
    display: block;
    width: 100%;
    border-radius: 50px;
  }
  @media (max-width: 1440px) {
    width: 21.75px;
    height: 21.75px;
  }
`;

const BoxProfileNickname = styled.div`
  font-family: "Montserrat";
  font-size: 12px;
  font-weight: 600;
  @media (max-width: 1440px) {
    font-size: 9px;
  }

  span {
    font-weight: 400;
    color: #767676;
  }
`;

const Scrap = styled.div`
  font-family: "Montserrat";
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  
  p:first-child {
    font-size: 16px;
    color: ${(props) => (props.state ? "#FFD43E" : "lightgray")};
    position: relative;
    top: 2px;
  }
`;

const Heart = styled(Scrap)`
  p:first-child {
    color: ${(props) => (props.state ? "#F65959" : "lightgray")};
  }
  `;

const DetailScrap = styled(Scrap)`
  flex-direction: column;
  gap: 8px;
`
const DetailHeart = styled(Heart)`
  flex-direction: column;
  gap: 8px;
`


const PluralImgs = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #fff;
  opacity: 0.8;
  padding: 9px;

  img {
    width: 100%;
  }
  @media (max-width: 1440px) {
    top: 9px;
    right: 9px;
    width: 30px;
    height: 30px;
    padding: 6.75px;
  }
`
const ModalBackground = styled.div`
  display: ${props => props.state ? "block" : "none"};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: rgba(36, 36, 36, 0.7);
  z-index: 10200;
  
  img {
    display: block;
    width: 2rem;
    margin-left: auto;
  }
`

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.state ? "grid" : "none")};
  grid-template-columns: repeat(2, 1fr);
  width: 1264px;
  height: 894px;
  background-color: #fff;
  border-radius: 15px;
  z-index: 10200;
  @media (max-width: 1440px) {
    top: 47%;
    width: 948px;
    height: 670.5px;
  }
`;



export {
  // 아트그램 Main
  Layout,
  H1,
  Wrap,
  HiddenRef,

  // 아트그램 Box
  BoxWrap,
  BoxImg,
  BoxProfile,
  BoxProfileimg,
  BoxProfileNickname,
  Scrap,
  Heart,
  PluralImgs,

  // 아트그램 DetailModal
  ModalBackground,
  ModalWindow,

  // 아트그램 상세페이지
  DetailScrap,
  DetailHeart
}