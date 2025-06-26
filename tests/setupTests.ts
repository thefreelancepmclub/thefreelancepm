/* tests/setupTests.ts -------------------------------------------------- */
import '@testing-library/jest-dom';
import 'whatwg-fetch';

/* ─ ResizeObserver polyfill ─ */
if (!global.ResizeObserver) {
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  global.ResizeObserver = MockResizeObserver;
}

/* ─ scrollIntoView polyfill (jsdom) ─ */
if (typeof window !== 'undefined' && !HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = () => {};
}

/* ─ fetch mock ─ */
const realFetch = global.fetch;

beforeAll(() => {
  global.fetch = jest.fn((input: RequestInfo, init?: RequestInit) => {
    const url = input.toString();

    if (url.endsWith('/api/currentSubscription')) {
      return Promise.resolve(
        new Response(
          JSON.stringify({ data: { tier: 'elite' } }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      );
    }

    if (url.endsWith('/api/coaching/freeRemaining')) {
      return Promise.resolve(
        new Response(
          JSON.stringify({ freeRemaining: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      );
    }

    /* default OK */
    return Promise.resolve(new Response('{}', { status: 200 }));
  }) as unknown as typeof fetch;
});

afterAll(() => {
  global.fetch = realFetch;   // restore for the next Jest run
});
