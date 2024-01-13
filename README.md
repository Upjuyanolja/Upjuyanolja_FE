# Upjuyanolja_FE

B2B Self-coupon Admin(Backoffice) 서비스 개발 FE 레포지토리 입니다.

현재 작업을 하고 main 브랜치에 머지하는 방식으로 진행되기에, main 브랜치가 가장 최신상태라고 생각해주시면 됩니다

**리드미에** **저희가 어떻게 작업했는지만 간략하게 작성했습니다**

**가능하시다면 노션도 참고부탁드리겠습니다**

[https://youthful-jump-c97.notion.site/FE-2-f8763ce2d853471ea58f0312e5c5927f?pvs=4](https://www.notion.so/f8763ce2d853471ea58f0312e5c5927f?pvs=21)

## 기능 구현

- 쿠폰 통계 데이터 차트로 노출
- 로그인 / 회원가입
- 숙소 등록 및 조회
- 객실 등록,조회,수정,삭제
- 포인트 내역 조회 및 포인트 충전
    - 포인트 충전 시 toss payments 연동
- 쿠폰 등록,조회,수정,삭제
- 미니 프로젝트 연동 기능
    - 저희 주 서비스는 B2B 서비스로 업주가 쿠폰,객실,숙소를 등록하고 관리할 수 있습니다
    - 이때 업주가 등록한 쿠폰과 숙소(객실)를 B2C 서비스에서도 확인할 수 있게 하기 위해 연동 기능을 작업했습니다!
        - 퍼블리싱 수정, api 수정, 변경된 기획에 맞춰 기능 수정

⇒ 기능 구현은 대략적으로만 적었는데, figma를 보시면 더 이해가 잘 되실 것 같아서 첨부 드립니다

https://www.figma.com/file/beUeyXdwvslGZqmb7NHxkq/2%EC%A1%B0-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%99%84%EB%A3%8C?type=design&node-id=1611%3A38110&mode=design&t=R9pOwclPMbrqyfCk-1

## 협업 방식

- draft pull request 사용
    - 팀원들의 작업 진행 상황을 쉽게 파악하기 위해
    - 이때 pr line이 500 줄 이내
- dailyScrum
    - 오전 10시 30분마다 완료한 작업, 진행할 작업을 구분해서 팀원들한테 공유
- sprint
    - 매주 금요일마다 sprint 회의를 진행
- squash merge
    - 6명이 작업을 하는 점을 고려하여 커밋 로그를 깔끔하게 관리하기 위해 도입
- commit lint
- discord web hook
- 과정 시간 내 (10:00~19:00) discord에서 화면 공유하면서 작업
- FE팀 전원 코드 리뷰

## 일정

프로젝트 초기에 계획된 대략적인 일정입니다

- ~ 12/28 기획 완료
- ~1/1 디자인 완료
- ~1/12 BE 서버 배포 ( 기능 구현 완료)
- ~1/21 FE 서버 배포 ( 최종 서비스 완성)
- ~1/28 리팩토링,QA,발표준비

## 테스트

FE 팀이 이번 프로젝트에서 가장 중요하게 여긴건 테스트였습니다

기능이 많지 않더라도 오점 없이 완벽한 프로젝트를 만드는 게 목표이고, 이를 위해 테스트 도입을 해야겠다고 생각했습니다

처음에는 아래와 같은 플로우로 진행하려 했습니다

- 기획을 참고해 테스트 케이스 작성
- UI 구현
- 테스트 코드 작성
- 비즈니스 로직을 구현함으로써 테스트 코드 성공 시키기

하지만, 대부분의 팀원이 테스트에 경험이 없었고 2조 멘토님의 피드백을 바탕으로 순서와 상관 없이 테스트 코드, 테스트 케이스, UI 구현, 비즈니스 로직을 구현 하는 방향으로 정했습니다

저희 팀원이 아무래도 테스트에 대한 경험이 많지 않다보니 테스트 케이스 작성 방식이나 테스트 코드 작성 방식이 괜찮은지, 개선해야할 점이 있는지 궁금합니다!

`테스트 케이스 예시)`

[https://youthful-jump-c97.notion.site/1-21846be88d624a53b74ab884af37cd71](https://www.notion.so/21846be88d624a53b74ab884af37cd71?pvs=21)

`테스트 코드(예시)`

```jsx
// import 문 생략 

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));

describe('Main', () => {
  const queryClient = new QueryClient();
  test('쿠폰 만들기 버튼 클릭 시 쿠폰 만들기 페이지로 이동한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const navigateButton = await screen.findByTestId(
      'navigate-coupon-registration',
    );
    act(() => {
      userEvent.click(navigateButton);
    });
    setTimeout(() => {
      expect(window.location.pathname).toBe('/coupon-registration');
    }, 5000);
  });
// 생략 
```
