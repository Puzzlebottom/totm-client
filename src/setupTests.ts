/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom/vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
