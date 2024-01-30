import { Modal, Button } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';
import { AgreementModalProps } from '../type';

export const PointAgreementModal = ({
  isModalOpen,
  setIsModalOpen,
}: AgreementModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <StyledModal
      title="포인트 충전 및 이용약관"
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
            포인트 충전 서비스에 관한 규정입니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제2조 (정의)
            <br />
            &quot;포인트&quot;란 &quot;빨리잡아! 쿠폰센터&quot;의 쿠폰 구매를
            위한 통화 체계를 말합니다.
            <br />
            &quot;쿠폰&quot;이란 이용자가 회사 플랫폼을 통해 발행하고, 특정
            서비스를 할인 가격으로 이용할 수 있게 해주는 전자적 문서를 말합니다.
            <br />
            &quot;구매자&quot;란 온라인 플랫폼을 통해 쿠폰을 구매하는 이용자를
            말합니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제3조(포인트의 사용)
            <br />
            포인트는 충전 후, &quot;빨리잡아! 쿠폰센터&quot;의 쿠폰 구매 시
            자유롭게 사용할 수 있습니다.
            <br />
            포인트는 본인의 거래에 대해서만 사용할 수 있으며, 타인에게 양도가
            불가합니다.
            <br />
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제4조(포인트의 충전 및 환불)
            <br />
            포인트의 충전은 1회에 최소 10,000원부터 최대 10,000,000원까지
            가능합니다.
            <br />
            결제방법을 무통장(가상계좌)입금으로 선택한 경우에는 결제 후
            7영업일(토요일, 공휴일 제외) 이내에 입금하지 않을 경우, 결제 취소로
            간주되며 결제는 자동 취소됩니다.
            <br />
            포인트의 환불 및 결제취소는 구매 후, 7일(토요일, 공휴일 포함) 이내에
            사용하지 않은 포인트 충전 건에 대해서만 처리가 가능합니다.
            <br />
            포인트 구매 후, 7일(토요일, 공휴일 포함)이 지났거나 사용 내역이 있는
            포인트는 환불 및 취소가 불가합니다.
            <br />
            환불 및 결제 취소는 영업일 기준 최대 3~7일이 소요됩니다. 결제 시
            선택한 결제수단에 따라 환불이 불가능한 경우 고객센터를 통해
            계좌환불로 대체 처리될 수 있습니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제5조 (포인트의 소멸)
            <br />
            포인트의 유효기간은 마지막 적립/사용일을 기준으로 10년이며,
            유효기간이 지난 잔액은 자동으로 소멸됩니다.
            <br />
            &quot;빨리잡아! 쿠폰센터&quot; 서비스 해지 시, 보유한 포인트는 모두
            소멸됩니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제6조 (구매 및 결제취소 영수증)
            <br />
            구매 영수증은 결제 완료 시에 자동으로 발급되며, &apos;포인트 내역{' '}
            {'>'} 포인트 구매,사용 내역 {'>'} 영수증 보기&apos;에서 확인할 수
            있습니다.
            <br />
            영수증은 세금계산서 등의 세무상 증빙서류로 활용할 수 없으며,
            거래내역 및 금액을 확인하는 용도로만 사용 가능합니다.
          </TextBox>
        </div>
        <div>
          <TextBox typography="body3" color={'black900'}>
            제7조 (이용자의 의무)
            <br />
            이용회원은 포인트 충전 시 본인 명의의 결제수단을 사용하여야 하며,
            타인의 결제 수단을 임의로 사용해서는 안 됩니다. 이로 인해 발생하는
            회사, 결제수단의 적법한 소유자 등의 손실과 손해에 대한 책임은
            이용회원에게 있습니다.
            <br />
            포인트의 충전과 관련해 회원이 입력한 정보 및 정보와 관련해 책임과
            불이익은 이용회원이 부담합니다.
            <br />
            부당 또는 부정하게 포인트를 결제 및 충전한 경우 이용회원은 포인트를
            사용할 수 없으며, 회사는 이를 회수할 수 있습니다.
            <br />
            이용회원은 결제 시, 정당하고 적법한 사용권을 가진 결제수단을
            사용하여야 합니다. 또한 회사는 이용회원 결제수단의 적법성 등에 대한
            확인이 완료되지 않았을 경우 거래 진행을 중지하거나 해당 거래를
            취소할 수 있습니다.
            <br />
            이용회원은 서비스를 안전하게 제공할 수 있도록 협조하여야 하며,
            회사가 약관의 위반행위를 발견하여 소명을 요청할 경우 적극 응해야
            합니다.
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
  .ant-modal-title {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
  }
  .ant-modal-close-x {
    display: none;
  }
  .ant-modal-body {
    height: 413px;

    overflow-y: scroll;

    div {
      margin-bottom: 16px;
    }
  }
  .ant-btn {
    width: 100px;
    height: 46px;

    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
  }
`;
