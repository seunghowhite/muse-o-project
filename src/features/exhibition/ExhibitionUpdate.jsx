import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetailGetExibition } from "../../hooks/exhibition/useDetailGetExibition";

import { MdOutlineFileDownload } from "react-icons/md";
import { Flex } from "../../components/Flex";
import styled from "styled-components";
import { usePatchExhibition } from "../../hooks/exhibition/usePatchExhibition";
import { useDeleteExhibition } from "../../hooks/exhibition/useDeleteExhbition";
import { useSetExhibition } from "../../hooks/exhibition/useSetExhibition";
import {
  useDropzoneinputEx,
  useDropzoneinputPostEx,
} from "../../hooks/exhibition/useDropzoneEx";
import {
  useGetPostimgurlEx,
  useGetimgurlEx,
} from "../../hooks/exhibition/useGetimgurlEx";
function ExhibitionUpdate() {
  const { id } = useParams();
  const [data, isLoading, isError] = useDetailGetExibition(id);
  const info = data?.exhibitionInfo;
  const ExAddress = data?.exhibitionInfo.ExhibitionAddress;
  const [updateExhibition] = usePatchExhibition(id);
  const sourceUrl = "exhibition";
  const [
    exhibition,
    setExhibition,
    authorid,
    authorName,
    setAuthorName,
    handleClick,
    onchangeHandler,
  ] = useSetExhibition();
  //dropzoneinput의 file 관리
  const [postfiles, setPostFiles, getRootPropsPOST, getInputPropsPOST] =
    useDropzoneinputPostEx();
  const [files, setFiles, getRootProps, getInputProps] = useDropzoneinputEx();
  //s3이미지 제출,url얻어오기
  const [s3imgurlhandle] = useGetimgurlEx(files);
  const [s3Postimgurlhandle] = useGetPostimgurlEx(postfiles);
  // 마운트 해제시, 데이터 url 취소
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      postfiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);
  useEffect(() => {
    // 서버에서 받아온 데이터가 로딩되면 exhibition state를 업데이트
    //!나중에 필수값 유효성검사 필요!
    //!작가,이미지 order없이 받는데 어떻게 해야 하는가?
    if (!isLoading && !isError && info) {
      //!value값 따로??
      setAuthorName(info.ExhibitionAuthors[authorid.current].author_name);
      const newarr = [...exhibition.authors];
      newarr.splice(authorid.current, 1, {
        order: (authorid.current + 1).toString(),
        author: info.ExhibitionAuthors[authorid.current].author_name,
      });
      const newExCodeArr = info.ExhibitionCategories.map(
        (item) => item.categoryCode
      );
      //TODO 디테일한 유효성 검사 필요
      setExhibition((prevExhibition) => ({
        ...prevExhibition,
        startDate: info.startDate.slice(0, 10),
        endDate: info.endDate.slice(0, 10),
        exhibitionTitle: info.exhibitionTitle,
        exhibitionDesc: info.exhibitionDesc,
        //?status가 뭐지?
        exhibitionCode: info.exhibitionStatus,
        entranceFee: info.entranceFee,
        artWorkCnt: info.artWorkCnt,
        agencyAndSponsor: info.agencyAndSponsor || "임시값",
        location: info.location,
        contact: info.contact,
        authors: newarr,
        exhibitionCategoty: newExCodeArr,
        detailLocation: {
          zonecode: ExAddress.zonecode,
          address: ExAddress.address,
          addressEnglish: ExAddress.addressEnglish,
          addressType: ExAddress.addressType,
          buildingName: ExAddress.buildingName,
          buildingCode: ExAddress.buildingCode,
          roadAddress: ExAddress.roadAddress,
          roadAddressEnglish: ExAddress.roadAddressEnglish,
          autoJibunAddress: ExAddress.autoJibunAddress,
          autoJibunAddressEnglish: ExAddress.autoJibunAddressEnglish,
          roadname: ExAddress.roadname,
          roadnameCode: ExAddress.roadnameCode,
          roadnameEnglish: ExAddress.roadnameEnglish,
        },
      }));
      //*썸네일 미리보기 가지고 와보기
      setPostFiles([{ preview: info?.postImage }]);
      //*일반 파일 미리보기 가지고 와보기
      const previewFileArr = info?.ExhibitionImgs.map((file) => {
        return { preview: file.img_url };
      });
      setFiles(previewFileArr);
    }
  }, [isLoading, isError, data]);
  console.log("가지고오는값", info);
  console.log("파일", files);
  //수정하기
  const submitHandler = (event) => {
    event.preventDefault();
    let urls = null;
    let posturl = null;
    if (!postfiles[0].type) {
      posturl = info.postImage;
    } else {
      posturl = s3Postimgurlhandle(sourceUrl);
    }
    if (!files[0].type) {
      urls = info.ExhibitionImgs;
    } else {
      urls = s3imgurlhandle(sourceUrl);
    }
    updateExhibition({ ...exhibition, postImage: posturl, artImage: urls });
  };
  //삭제 버튼
  const [deleteExhibition] = useDeleteExhibition();
  const deleteHandler = () => {
    if (window.confirm("정말 이 게시글을 삭제합니까?")) {
      deleteExhibition(id);
    } else {
      alert("취소합니다.");
    }
  };
  // console.log("상세이미지", files[0].type);
  console.log("포스트", postfiles);
  return (
    <>
      {data && (
        <>
          <Flex as="form" onSubmit={submitHandler} fd="column" gap="10">
            <button onClick={deleteHandler}>삭제</button>
            <Box>
              <p style={{ color: "red" }}>
                작성구역. 카카오 지도 api가지고 오기
              </p>
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
                {files &&
                  files.map((file) => (
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
            <button type="submit">수정완료</button>
          </Flex>
        </>
      )}
    </>
  );
}

export default ExhibitionUpdate;

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
