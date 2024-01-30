import { Carousel } from 'antd';
import styled from 'styled-components';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

export const ImageCarousel = ({ images }: { images: { url: string }[] }) => {
  return (
    <StyledCarouselWrapper>
      <Carousel
        arrows={true}
        prevArrow={<AiFillLeftCircle size={24} color="#9199A4B2" />}
        nextArrow={<AiFillRightCircle size={24} color="#9199A4B2" />}
      >
        {images.map((image, index) => (
          <StyledImage src={image.url} key={index} />
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
    z-index: 1;
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

const StyledImage = styled.img`
  width: 224px;
  height: 144px;

  object-fit: cover;
`;
