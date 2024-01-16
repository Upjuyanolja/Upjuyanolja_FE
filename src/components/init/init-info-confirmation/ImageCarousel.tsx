import { Carousel } from 'antd';
import styled from 'styled-components';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { Url } from './type';

export const ImageCarousel = ({ images }: { images: { url: string }[] }) => {
  return (
    <StyledCarouselWrapper>
      <Carousel
        arrows={true}
        prevArrow={<AiFillLeftCircle size={24} color="#9199A4B2" />}
        nextArrow={<AiFillRightCircle size={24} color="#9199A4B2" />}
      >
        {images.map((image, index) => (
          <StyledImageWrapper $imageUrl={image.url} key={index} />
        ))}
      </Carousel>
    </StyledCarouselWrapper>
  );
};

const StyledCarouselWrapper = styled.div`
  width: 224px;
  height: 144px;

  border-radius: 8px;

  overflow: hidden;

  position: relative;

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    top: 60%;
    transform: translateY(-60%);
    z-index: 2;
  }

  .ant-carousel .slick-prev {
    left: 10px;
  }

  .ant-carousel .slick-next {
    right: 10px;
  }

  .slick-dots-bottom > li {
    display: none;
  }
`;

const StyledImageWrapper = styled.div<Url>`
  width: 224px;
  height: 144px;

  background-image: url(${(props) => props.$imageUrl});
  object-fit: contain;
`;
