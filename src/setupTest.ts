import '@testing-library/jest-dom';
import { server } from './mocks/browsers';

beforeAll(() => server.listen()); // 서버 설정

afterEach(() => server.resetHandlers()); // 각각 테스트 요청 마다 핸들러 초기화

afterAll(() => server.close()); //
