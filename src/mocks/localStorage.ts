const localStorageMock: Storage = (() => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    // clear: (): void => {
    //   store = {};
    // },
    // key: (): string | null => '',
    // length: Object.keys(store).length,
  } as Storage;
})();

export default localStorageMock;
