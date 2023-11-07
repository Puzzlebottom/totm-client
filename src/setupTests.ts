/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
import { QueryCache } from '@tanstack/react-query';
import server from './mocks/server';

expect.extend(matchers);
const queryCache = new QueryCache();

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});

afterAll(() => server.close());
