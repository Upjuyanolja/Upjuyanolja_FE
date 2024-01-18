import { TextBox } from '@components/text-box';
import { message } from 'antd';
import { styled } from 'styled-components';
import { CloseCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { ImageUploadFileItem, StyledImageContainerProps } from './type';
import { IMAGE_MAX_CAPACITY, IMAGE_MAX_COUNT } from '@/constants/init';
import { colors } from '@/constants/colors';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accommodationEditState,
  selectedAccommodationFilesState,
  selectedInitRoomFilesState,
  userInputValueState,
} from '@stores/init/atoms';
import { ROUTES } from '@/constants/routes';

export const ImageUploadContainer = ({ header }: { header: string }) => {
  const [fileList, setFileList] = useState<ImageUploadFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setSelectedAccommodationFiles = useSetRecoilState(
    selectedAccommodationFilesState,
  );

  const setSelectedInitRoomFiles = useSetRecoilState(
    selectedInitRoomFilesState,
  );

  const isAccommodationEdit = useRecoilValue(accommodationEditState);
  const userInputValue = useRecoilValue(userInputValueState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target;
    const selectedFile = inputElement.files?.[0];

    inputElement.value = '';
    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.type ||
      (!selectedFile.type.includes('png') &&
        !selectedFile.type.includes('jpeg') &&
        !selectedFile.type.includes('jpg'))
    ) {
      return message.error({
        content: '.png, .jpeg, .jpg 파일만 등록 가능합니다.',
        style: {
          marginTop:
            window.location.pathname ===
              ROUTES.INIT_ACCOMMODATION_REGISTRATION ||
            ROUTES.INIT_ROOM_REGISTRATION
              ? '210px'
              : '0',
        },
      });
    }
    if (selectedFile.size <= IMAGE_MAX_CAPACITY * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;

        setFileList((prevFileList) => [
          ...prevFileList,
          {
            url: imageUrl,
          },
        ]);

        if (header === '숙소 대표 이미지 설정') {
          setSelectedAccommodationFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            { url: imageUrl },
          ]);
        } else if (
          header === '객실 사진' &&
          window.location.pathname === ROUTES.INIT_ROOM_REGISTRATION
        ) {
          setSelectedInitRoomFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            { url: imageUrl },
          ]);
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      message.error({
        content: `최대 ${IMAGE_MAX_CAPACITY}MB 파일 크기로 업로드 가능합니다.`,
        style: {
          marginTop:
            window.location.pathname ===
              ROUTES.INIT_ACCOMMODATION_REGISTRATION ||
            ROUTES.INIT_ROOM_REGISTRATION
              ? '210px'
              : '0',
        },
      });
    }
  };

  useEffect(() => {
    if (isAccommodationEdit) {
      setFileList(userInputValue[0].images);
      setSelectedAccommodationFiles(userInputValue[0].images);
    }
  }, [isAccommodationEdit]);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (file: ImageUploadFileItem) => {
    const newFileList = fileList.filter((item) => item.url !== file.url);
    setFileList(newFileList);

    if (header === '숙소 대표 이미지 설정') {
      setSelectedAccommodationFiles(newFileList);
    } else if (
      header === '객실 사진' &&
      window.location.pathname === ROUTES.INIT_ROOM_REGISTRATION
    ) {
      setSelectedInitRoomFiles(newFileList);
    }
  };

  return (
    <StyledInputWrapper>
      <StyledHeadTextContainer>
        <TextBox typography="h4" fontWeight={700}>
          {header}
        </TextBox>
        <TextBox color="black600" typography="body3">
          이미지는 최대 {IMAGE_MAX_COUNT}개까지 등록 가능합니다.
        </TextBox>
      </StyledHeadTextContainer>
      <StyledImageContainer $fileList={fileList} header={header}>
        {fileList.map((file) => (
          <div key={file.url}>
            <StyledCloseButton
              onClick={() => handleRemove(file)}
              twoToneColor={colors.black600}
            />
            <img src={file.url} />
          </div>
        ))}
        {fileList.length < IMAGE_MAX_COUNT && (
          <StyledUploadButtonWrapper onClick={openFileInput}>
            <PlusOutlined />
            <TextBox typography="body3" color="black600">
              이미지 추가하기
            </TextBox>
            <input
              id="file-input"
              type="file"
              accept=".png, .jpeg, .jpg"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: 'none' }}
              data-testid="file-input"
            />
          </StyledUploadButtonWrapper>
        )}
      </StyledImageContainer>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  margin-bottom: 8px;
`;

const StyledUploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;

  background-color: #fafafa;
  border: 1.5px dashed #d9d9d9;

  &:hover {
    border: 1.5px dashed ${colors.primary};
    transition: 0.4s;
  }
`;

const StyledCloseButton = styled(CloseCircleTwoTone)`
  font-size: 20px;
`;

const StyledImageContainer = styled.div<StyledImageContainerProps>`
  display: flex;

  div {
    position: relative;
    width: 150px;
    height: 100px;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &:hover {
        opacity: 80%;
        transition: 0.4s;
      }
    }

    ${StyledCloseButton} {
      position: absolute;
      top: 8px;
      right: 8px;

      z-index: 1;
    }

    &:first-child::before {
      content: '대표 이미지';
      position: absolute;
      top: 4px;
      left: 4px;

      background-color: ${colors.primary};

      border-radius: 2px;
      padding: 2px;

      color: ${colors.white};
      font-size: 10px;

      z-index: 1;

      display: ${(props) =>
        props.$fileList.length === 0 || props.header !== '숙소 대표 이미지 설정'
          ? 'none'
          : 'block'};
    }
  }
`;
