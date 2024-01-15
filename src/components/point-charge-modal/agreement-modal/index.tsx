import { Modal, Button } from 'antd';
import styled from 'styled-components';
import { PointModalProps } from '../point-modal/types';
import { TextBox } from '@components/text-box';

export const AgreementModal = ({
  isModalOpen,
  setIsModalOpen,
}: PointModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <StyledModal
      title="쿠폰 구매 및 이용약관"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          확인
        </Button>,
      ]}
    >
      <>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제1조 (목적)
            <br />본 약관은 회사가 운영하는 “빨리잡아! 쿠폰센터”에서 제공하는
            쿠폰 구매 서비스에 관한 규정입니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제2조 (정의)
            <br />
            &quot;쿠폰&quot;이란 이용자가 회사 플랫폼을 통해 발행하고, 특정
            서비스를 할인 가격으로 이용할 수 있게 해주는 전자적 문서를 말합니다.
            <br />
            &quot;구매자&quot;란 온라인 플랫폼을 통해 쿠폰을 구매하는 이용자를
            말합니다.
            <br />
            &quot;포인트&quot;란 “빨리잡아! 쿠폰센터”의 쿠폰 구매를 위한 통화
            체계를 말합니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제3조 (쿠폰 구매)
            <br />
            구매자는 회사에서 정한 방법에 따라 포인트를 사용하여 쿠폰을 구매할
            수 있습니다.
            <br />
            쿠폰 구매 시 필요한 포인트는 구매자의 계정에서 자동으로 차감됩니다.
            <br />
            할인가(정액) 쿠폰은 1,000원 단위로 최대 50,000원까지 쿠폰유형을 선택
            할 수 있으며 최대 999장 까지 구매 가능합니다.
            <br />
            할인율(정률) 쿠폰은 1%단위로 최대 50%까지 쿠폰유형을 선택 할 수
            있으며 최대 999장 까지 구매 가능합니다.
            <br />
            쿠폰은 유상으로 발행하는 쿠폰으로 발행유형, 적용객실 등에 따라
            구분될 수 있으며, 쿠폰의 세부조건, 할인금액(할인율), 사용방법,
            적용기간 및 제한에 대한 사항은 쿠폰 또는 서비스 화면에 표시됩니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제4조 (쿠폰 이용)
            <br />
            쿠폰은 구매자가 설정한 적용 기간 동안에만 사용 가능하며, 해당 기간은
            구매자에 의해 언제든지 수정될 수 있습니다.
            <br />
            쿠폰의 사용은 객실 예약 시, 최종 결제 금액에 적용되며, 사용된 쿠폰의
            개수는 구매자의 쿠폰 발행량에서 차감됩니다.
            <br />
            연박에 대한 쿠폰 사용 시, 최종 결제 금액에 쿠폰이 적용되지만 쿠폰은
            1장만 사용 처리되며, 이는 입실일을 기준으로 합니다.
            <br />
            이미 구매한 쿠폰의 유형이나 적용 객실은 변경할 수 없습니다.
            <br />
            예약거래가 취소될 경우 예약에 이용된 쿠폰은 회사의 정책에 따라 환원
            되며 자세한 사항은 예약서비스 화면을 통해 안내됩니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제5조 (쿠폰 취소 및 환불)
            <br />
            쿠폰은 발행 즉시 노출효과가 적용되기 때문에 구매 후 포인트로의
            환불은 원칙적으로 불가능합니다.
            <br />
            단, 쿠폰의 결함이나 서비스 이행 불가 등 회사의 귀책사유로 인한
            경우에는 예외적으로 환불이 가능하며, 이 경우 환불 절차는 회사의
            정책에 따릅니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제6조(쿠폰의 소멸)
            <br />
            쿠폰은 별도의 유효기간은 마지막 구매일을 기준으로 10년이며,
            유효기간이 지난 쿠폰은 자동으로 소멸됩니다.
            <br />
            “빨리잡아! 쿠폰센터” 서비스 해지 시, 보유한 쿠폰은 모두 소멸됩니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제7조 (이용자의 의무)
            <br />
            회사가 별도로 명시한 경우를 제외하고는 쿠폰을 제3자에게 또는 다른
            아이디로 양도 할 수 없으며 유상으로 거래하거나 현금으로 전환 할 수
            없습니다. 만일 회원이 회사가 승인하지 않은 방법으로 부정한 방법으로
            쿠폰을 획득/이용한 사실이 확인될 경우 회사는 회원의 쿠폰을 사용한
            예약 신청을 취소하거나 회원 자격을 정지 또는 해지할 수 있습니다.
            <br />
            쿠폰구매와 관련해 회원이 입력한 정보 및 정보와 관련해 책임과
            불이익은 이용회원이 부담합니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제8조 (면책)
            <br />
            회사는 쿠폰의 사용과 관련해 발생한 구매자의 손해에 대해 책임을 지지
            않습니다.
            <br />
            구매자는 본인의 포인트 및 쿠폰 관리 책임을 집니다. 세부조건 설정
            등으로 인한 손해는 회사가 책임지지 않습니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제9조 (개인정보 처리)
            <br />
            회사는 이용자의 개인정보를 적법하게 수집, 사용, 보관, 파기합니다.
            이용자의 개인정보 처리에 대한 상세한 내용은 &quot;개인정보
            처리방침&quot;을 참조하시기 바랍니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제10조 (서비스 중지)
            <br />
            회사는 시스템 점검, 보수 및 고장, 통신장애, 기타 불가피한 사정 등의
            경우에는 서비스 제공을 일시적으로 중단할 수 있습니다. 이 경우
            이용자에게 통지합니다. 서비스 중지로 인한 손해에 대해 회사는 책임을
            지지 않습니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제11조 (약관 변경)
            <br />
            회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 공지 후
            7일 후부터 효력을 발휘합니다. 이용자는 정기적으로 회사의 웹사이트를
            방문하여 약관의 변경사항을 확인해야 합니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제12조 (분쟁해결)
            <br />본 약관에 관한 분쟁은 대한민국의 법률에 의해 해결됩니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제13조 (기타)
            <br />본 약관에 명시되지 않은 사항은 관계법령 및 회사의 이용약관을
            따릅니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            부칙
            <br />
            제1조 (시행일)
            <br />
            본 약관은 2024년 01월 11일부터 적용합니다.
            <br />
            주식회사 빨리잡아
          </TextBox>
        </div>
      </>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-body {
    height: 413px;

    overflow-y: scroll;

    div {
      margin-bottom: 16px;
    }
  }
`;
