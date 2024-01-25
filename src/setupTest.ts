import '@testing-library/jest-dom';

import { server } from './mocks/server';

beforeAll(() => server.listen()); // 서버 설정

afterEach(() => server.resetHandlers()); // 각각 테스트 요청 마다 핸들러 초기화

afterAll(() => server.close()); //

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
