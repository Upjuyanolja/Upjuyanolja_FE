import { TextBox } from '@components/text-box';
import { message } from 'antd';
import { styled } from 'styled-components';
import { CloseCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useRef, ChangeEvent, useEffect } from 'react';
import { StyledImageContainerProps } from './type';
import { IMAGE_MAX_CAPACITY, IMAGE_MAX_COUNT } from '@/constants/init';
import { colors } from '@/constants/colors';
import { useRecoilState } from 'recoil';
import { imageFileState } from '@stores/init/atoms';
import { addedImageFileState, deletedImageFileState } from '@stores/room/atoms';
import { ROUTES } from '@/constants/routes';
import { Image } from '@api/room/type';

export const ImageUploadContainer = ({
  header,
  images,
}: {
  header: string;
  images?: Image[];
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (images) {
      const data = images.map((image, index) => {
        return { key: index, url: image.url, file: null };
      });
      setImageFile(data);
    }
  }, [images]);

  const [imageFile, setImageFile] = useRecoilState(imageFileState);
  const [addedImageFile, setAddedImageFile] =
    useRecoilState(addedImageFileState);
  const [removedImageFile, setRemovedImageFile] = useRecoilState(
    deletedImageFileState,
  );

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
      setImageFile((prev) => [
        ...prev,
        { key: imageFile.length, url: '', file: selectedFile },
      ]);

      setAddedImageFile((prev) => [
        ...prev,
        { key: imageFile.length, url: '', file: selectedFile },
      ]);
      console.log(selectedFile);
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

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (key: number) => {
    const itemToRemove = imageFile.find((item) => item.key === key);
    if (!itemToRemove) return;

    const isInAddedImages = addedImageFile.some((item) => item.key === key);

    if (isInAddedImages) {
      setAddedImageFile((prevAddedImageFile) =>
        prevAddedImageFile.filter((item) => item.key !== key),
      );
    } else {
      setRemovedImageFile((prevRemovedImageFile) => [
        ...prevRemovedImageFile,
        itemToRemove,
      ]);
    }

    const newFileList = imageFile.filter((item) => item.key !== key);
    setImageFile(newFileList);
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
      <StyledImageContainer $fileList={imageFile} header={header}>
        {imageFile.map((obj) => (
          <div key={obj.key}>
            <StyledCloseButton
              onClick={() => handleRemove(obj.key)}
              twoToneColor={colors.black600}
            />
            <img
              src={obj.file !== null ? URL.createObjectURL(obj.file) : obj.url}
              alt={'이미지'}
            />
          </div>
        ))}
        {imageFile.length < IMAGE_MAX_COUNT && (
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
