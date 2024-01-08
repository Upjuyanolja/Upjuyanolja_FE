import { TextBox } from '@components/text-box';
import { Modal } from 'antd';
import { styled } from 'styled-components';
import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { ImageUploadFileItem, ImageUploadHandleChangeProps } from './type';
import { IMAGE_MAX_COUNT } from '@/constants/init';

export const ImageUploadContainer = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<ImageUploadFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = ({ event }: ImageUploadHandleChangeProps) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.size <= 30 * 1024 * 1024) {
        setFileList((prevFileList) => [
          ...prevFileList,
          {
            uid: Date.now(),
            name: selectedFile.name,
            url: URL.createObjectURL(selectedFile),
            originFileObj: selectedFile,
          },
        ]);
      } else {
        alert(
          '업로드 가능한 최대 파일 크기는 30MB입니다. 파일 크기를 확인하신 후 다시 업로드해주세요.',
        );
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

  return (
    <StyledInputWrapper>
      <StyledHeadTextContainer>
        <TextBox typography="h4" fontWeight={700}>
          숙소 대표 이미지
        </TextBox>
        <TextBox color="black600" typography="body3">
          이미지는 최대 {IMAGE_MAX_COUNT}개까지, (.png, .jpeg, .jpg) 형식의
          파일만 등록 가능합니다.
        </TextBox>
      </StyledHeadTextContainer>
      <StyledImageContainer>
        {fileList.map((file) => (
          <div key={file.uid}>
            <StyledCloseButton onClick={() => handleRemove(file)} />
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
              type="file"
              accept=".png, .jpeg, .jpg"
              ref={fileInputRef}
              onChange={(event) => handleChange({ event })}
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
    border: 1.5px dashed #0351ff;
    transition: 0.4s;
  }
`;

const StyledCloseButton = styled(CloseCircleFilled)`
  font-size: 20px;
  color: #9199a4;
`;

const StyledImageContainer = styled.div`
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
  }
`;
