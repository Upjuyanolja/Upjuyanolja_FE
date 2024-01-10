import { TextBox } from '@components/text-box';
import { Modal, message } from 'antd';
import { styled } from 'styled-components';
import { CloseCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { ImageUploadFileItem, ImageUploadContainerProps } from './type';
import { IMAGE_MAX_CAPACITY, IMAGE_MAX_COUNT } from '@/constants/init';
import { colors } from '@/constants/colors';
import { useSetRecoilState } from 'recoil';
import {
  isUploadedImage,
  selectedAccommodationFilesState,
} from '@stores/init/atoms';

export const ImageUploadContainer = ({ header }: ImageUploadContainerProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<ImageUploadFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setIsUploadedImage = useSetRecoilState(isUploadedImage);

  const setSelectedFiles = useSetRecoilState(selectedAccommodationFilesState);

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target;
    const selectedFile = inputElement.files?.[0];

    inputElement.value = '';

    if (selectedFile) {
      if (
        !selectedFile.type ||
        (!selectedFile.type.includes('png') &&
          !selectedFile.type.includes('jpeg') &&
          !selectedFile.type.includes('jpg'))
      ) {
        message.error({
          content: '.png, .jpeg, .jpg 파일만 등록 가능합니다.',
        });
      } else {
        if (selectedFile.size <= IMAGE_MAX_CAPACITY * 1024 * 1024) {
          setFileList((prevFileList) => [
            ...prevFileList,
            {
              uid: Date.now(),
              name: selectedFile.name,
              url: URL.createObjectURL(selectedFile),
              originFileObj: selectedFile,
            },
          ]);

          setSelectedFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            { url: URL.createObjectURL(selectedFile) },
          ]);
        } else {
          message.error({
            content: `최대 ${IMAGE_MAX_CAPACITY}MB 파일 크기로 업로드 가능합니다.`,
          });
        }
      }
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageClick = (file: ImageUploadFileItem) => {
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const handleRemove = (file: ImageUploadFileItem) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  useEffect(() => {
    setIsUploadedImage(fileList.length !== 0);
  }, [fileList]);

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
      <StyledImageContainer $fileList={fileList}>
        {fileList.map((file) => (
          <div key={file.uid}>
            <StyledCloseButton
              onClick={() => handleRemove(file)}
              twoToneColor={colors.black600}
            />
            <img
              src={file.url}
              alt={file.name}
              onClick={() => handleImageClick(file)}
            />
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
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={previewTitle}
          style={{ width: '100%' }}
          src={fileList.find((file) => file.name === previewTitle)?.url}
        />
      </Modal>
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

const StyledImageContainer = styled.div<{ $fileList: ImageUploadFileItem[] }>`
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
      cursor: pointer;

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

      display: ${(props) => (props.$fileList.length === 0 ? 'none' : 'block')};
    }
  }
`;
