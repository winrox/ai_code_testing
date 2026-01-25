// Global test teardown helpers for map mocks and any collected map layer errors
afterEach(() => {
  if (globalThis.__MAP_INSTANCES__ && Array.isArray(globalThis.__MAP_INSTANCES__)) {
    globalThis.__MAP_INSTANCES__.forEach((m) => {
      if (m && typeof m.remove === 'function') {
        try {
          m.remove();
        } catch {
          // ignore removal errors in teardown
        }
      }
    });
    globalThis.__MAP_INSTANCES__.length = 0;
  }

  if (typeof window !== 'undefined' && Array.isArray(window.__mapLayerErrors)) {
    window.__mapLayerErrors.length = 0;
  }

  jest.clearAllMocks();
});
