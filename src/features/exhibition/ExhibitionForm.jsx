import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";
import { MdOutlineFileDownload } from "react-icons/md";
import { Flex } from "../../components/Flex";
import { useNavigate } from "react-router-dom";
import {
  useGetPostimgurlEx,
  useGetimgurlEx,
} from "../../hooks/exhibition/useGetimgurlEx";
import {
  useDropzoneinputEx,
  useDropzoneinputPostEx,
} from "../../hooks/exhibition/useDropzoneEx";

function ExhibitionForm() {
  const navigator = useNavigate();
  const [createExhibition] = usePostExhibition();
  const sourceUrl = "exhibition";
  const authorid = useRef(0);
  const [authorName, setAuthorName] = useState("");
  const [exhibition, setExhibition] = useState({
    startDate: "",
    endDate: "",
    exhibitionTitle: "",
    exhibitionDesc: "",
    exhibitionCode: "",
    entranceFee: "",
    artWorkCnt: "",
    agencyAndSponsor: "",
    location: "",
    contact: "",
    authors: [],
    exhibitionCategoty: [],
    detailLocation: {
      zonecode: "",
      address: "",
      addressEnglish: "",
      addressType: "",
      buildingName: "",
      buildingCode: "",
      roadAddress: "",
      roadAddressEnglish: "",
      autoJibunAddress: "",
      autoJibunAddressEnglish: "",
      roadname: "",
      roadnameCode: "",
      roadnameEnglish: "",
    },
  });
  //dropzoneinput의 file 관리
  const [files, getRootProps, getInputProps] = useDropzoneinputEx();
  const [postfiles, getRootPropsPOST, getInputPropsPOST] =
    useDropzoneinputPostEx();
  //s3이미지 제출,url얻어오기
  const [urls, s3imgurlhandle] = useGetimgurlEx(files);
  const [posturl, s3Postimgurlhandle] = useGetPostimgurlEx(postfiles);
  //카카오 주소 api
  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  const handleComplete = (data) => {
    setExhibition((old) => {
      return {
        ...old,
        detailLocation: {
          zonecode: data.zonecode,
          address: data.address,
          addressEnglish: data.addressEnglish,
          addressType: data.addressType,
          buildingName: data.buildingName,
          buildingCode: data.buildingCode,
          roadAddress: data.roadAddress,
          roadAddressEnglish: data.roadAddressEnglish,
          autoJibunAddress: data.autoJibunAddress,
          autoJibunAddressEnglish: data.autoJibunAddressEnglish,
          roadname: data.roadname,
          roadnameCode: data.roadnameCode,
          roadnameEnglish: data.roadnameEnglish,
        },
      };
    });
  };
  //헨들러
  const onchangeHandler = (event) => {
    const { value, name } = event.target;
    //작가
    if (name === "author") {
      setAuthorName(value);
      const newarr = [...exhibition.authors];
      newarr.splice(authorid.current, 1, {
        order: (authorid.current + 1).toString(),
        author: value,
      });
      setExhibition((old) => {
        return {
          ...old,
          authors: newarr,
        };
      });
    }
    //카테고리
    else if (name === "exhibitionCategoty") {
      setExhibition((old) => {
        return {
          ...old,
          exhibitionCategoty: [...old.exhibitionCategoty, value],
        };
      });
    }
    //입장료
    else if (name === "entranceFee") {
      setExhibition((old) => {
        const regex = /^[0-9,]*$/;
        if (!regex.test(value)) {
          const sanitizedValue = value.replace(/[^0-9,]/g, "");
          return {
            ...old,
            entranceFee: sanitizedValue,
          };
        }
        const removedCommaValue = Number(value.replaceAll(",", ""));
        return {
          ...old,
          entranceFee: removedCommaValue.toLocaleString(),
        };
      });
    }
    //기본
    else {
      setExhibition((old) => {
        return { ...old, [name]: value };
      });
    }
  };
  // 마운트 해제시, 데이터 url 취소
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      postfiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  //제출하기
  const submitHandler = (event) => {
    event.preventDefault();
    s3imgurlhandle(sourceUrl);
    s3Postimgurlhandle(sourceUrl);
    createExhibition({ ...exhibition, postImage: posturl, artImage: urls });
    navigator("/exhibition");
  };

  return (
    <Flex as="form" onSubmit={submitHandler} fd="column" gap="10">
      <Box>
        <p style={{ color: "red" }}>작성구역. 카카오 지도 api가지고 오기</p>
        <button type="button" onClick={handleClick}>
          주소 검색
        </button>
        <input
          value={exhibition.detailLocation.address}
          readOnly
          placeholder="주소"
        />
        <input
          value={exhibition.detailLocation.zonecode}
          readOnly
          placeholder="우편번호"
        />
        <input
          type="text"
          onChange={onchangeHandler}
          value={exhibition.location}
          name="location"
          placeholder="상세주소"
        />
      </Box>
      <DIV2>
        <div>섬네일이미지</div>
        <Section {...getRootPropsPOST({ className: "dropzone" })}>
          <input {...getInputPropsPOST()} />
          <DragIcon>
            <MdOutlineFileDownload />
          </DragIcon>
        </Section>
        <ThumbsContainer>
          {postfiles &&
            postfiles.map((file) => (
              <Thumb key={file.name}>
                <ThumbInner>
                  <Thumbimg
                    src={file.preview}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                </ThumbInner>
              </Thumb>
            ))}
        </ThumbsContainer>
      </DIV2>
      <DIV2>
        <div>상세이미지</div>
        <Section {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <DragIcon>
            <MdOutlineFileDownload />
          </DragIcon>
        </Section>
        <ThumbsContainer>
          {files?.map((file) => (
            <Thumb key={file.name}>
              <ThumbInner>
                <Thumbimg
                  src={file.preview}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </ThumbInner>
            </Thumb>
          ))}
        </ThumbsContainer>
      </DIV2>
      <DIV>
        <div style={{ color: "red" }}>제목</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.exhibitionTitle}
          name="exhibitionTitle"
          type="text"
          placeholder="제목"
        />
      </DIV>
      <DIV>
        <div>작가</div>
        <input
          type="text"
          placeholder="작가"
          onChange={onchangeHandler}
          value={authorName}
          name="author"
        />
      </DIV>
      <DIV>
        <div>스폰서</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.agencyAndSponsor}
          name="agencyAndSponsor"
          type="text"
          placeholder="후원"
        />
      </DIV>
      <DIV>
        <div>관람료</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.entranceFee}
          name="entranceFee"
          maxLength={7}
        />
      </DIV>
      <DIV>
        <div>작품수</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.artWorkCnt}
          name="artWorkCnt"
          type="text"
          placeholder="작품수"
        />
      </DIV>
      <DIV>
        <div style={{ color: "red" }}>시작일</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.startDate}
          name="startDate"
          type="date"
        />
        <div style={{ color: "red" }}>종료일</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.endDate}
          name="endDate"
          type="date"
        />
      </DIV>
      <DIV>
        <div style={{ color: "red" }}>상세내용</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.exhibitionDesc}
          name="exhibitionDesc"
          type="text"
          placeholder="상세내용"
        />
      </DIV>
      <DIV>
        <div>전화번호</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.contact}
          name="contact"
          type="number"
          placeholder="전화번호"
        />
      </DIV>
      <DIV>
        <div style={{ color: "red" }}>전시회 종류</div>
        <select name="exhibitionCode" onChange={onchangeHandler}>
          <option>선택해 주세요</option>
          <option value="ES0001">개인전</option>
          <option value="ES0002">다인전</option>
        </select>
      </DIV>
      <DIV>
        <div>전시회 테마</div>
        <select name="exhibitionCategoty" onChange={onchangeHandler}>
          <option value="WK0001">애니메이션</option>
          <option value="WK0002">수채화</option>
        </select>
        <div>전시회 카테고리</div>
      </DIV>
      <button>등록</button>
    </Flex>
  );
}

export default ExhibitionForm;

const Box = styled.div`
  background-color: #b3f1ae;
  padding: 50px;
`;
const Section = styled.section`
  width: 100%;
  min-height: 110px;
  border: 2px dotted gray;
  border-radius: 8px;
  padding: 18px;
  text-align: center;
`;

const DragIcon = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-size: 3rem;
`;

const DIV = styled.div`
  background-color: #7a7777;
  margin: 10px;
  text-align: center;
`;
const DIV2 = styled.div`
  background-color: #e1e78e;
  text-align: center;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 130px;
  height: 130px;
  padding: 4;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Thumbimg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
  gap: 13px;
`;
