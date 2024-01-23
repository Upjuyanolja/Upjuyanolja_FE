import RoomCard from '../../components/room/room-card';
import { Card, Button, Row, Modal, message, Spin } from 'antd';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteRoom, useGetInfiniteRoomList } from '@queries/room';
import { AxiosError } from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';

const RoomManagement = () => {
  const navigate = useNavigate();
  const { accommodationId: tempAccommodationId } = useParams();
  const accommodationId = tempAccommodationId || '';
  const { data, refetch, hasNextPage, fetchNextPage } = useGetInfiniteRoomList(
    accommodationId,
    {
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    },
  );
  const roomItems = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.rooms);
  }, [data]);

  const { mutate: deleteRoom } = useDeleteRoom();

  const handleDeleteRoom = (roomId: number) => {
    Modal.confirm({
      content: (
        <div>
          <TextBox style={{ fontWeight: 'normal' }}>
            더이상 해당 객실의 예약을 받을 수 없으며
          </TextBox>
          <br />
          <TextBox style={{ fontWeight: 'bold' }}>
            삭제된 정보는 되돌릴 수 없습니다.
          </TextBox>
          <br />
          <TextBox style={{ fontWeight: 'normal' }}>삭제하시겠습니까?</TextBox>
        </div>
      ),
      cancelText: '취소',
      okText: '삭제',
      className: 'confirm-modal',
      onOk: () => {
        deleteRoom(roomId, {
          onSuccess: () => {
            message.success('삭제되었습니다');
            refetch();
          },
          onError: (error: unknown) => {
            if (error instanceof AxiosError)
              message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
          },
        });
      },
    });
  };

  return (
    <StyledPageContainer bodyStyle={{ padding: 0 }}>
      <StyledFixedTitle>
        <StyledTitleButton>
          <TextBox typography="h4" color={'black900'} fontWeight={700}>
            객실 관리
          </TextBox>
          <StyledButton
            type="primary"
            onClick={() => navigate(`/${accommodationId}/room/registration`)}
          >
            + 객실추가
          </StyledButton>
        </StyledTitleButton>
      </StyledFixedTitle>

      <InfiniteScroll
        dataLength={roomItems?.length ?? 0}
        scrollThreshold={0.95}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={<Spin tip="Loading" size="small" />}
      >
        {roomItems?.map((room) => (
          <StyledRoomCardWrapper key={room.name}>
            <RoomCard data={room} handleDeleteRoom={handleDeleteRoom} />
          </StyledRoomCardWrapper>
        ))}
      </InfiniteScroll>
    </StyledPageContainer>
  );
};

export default RoomManagement;

const StyledPageContainer = styled(Card)`
  padding: 16px 48px;
  border: none;
  margin: 0;
`;

const StyledTitleButton = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  font-size: 18px;
  font-weight: 700;

  display: flex;
  align-items: center;
  margin-top: 2px;
`;

const StyledFixedTitle = styled.div`
  // position: fixed;
`;

const StyledRoomCardWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;
