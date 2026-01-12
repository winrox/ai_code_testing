import App from './App';

test('renders homepage text', () => {
  const app = App();
  const appHTML = app.props.children.map((child) => child.props.children).join(' ');

  expect(appHTML).toContain('Welcome to the Homepage');
  expect(appHTML).toContain('This app was created by a human with as much help from Copilot as possible.');
});
