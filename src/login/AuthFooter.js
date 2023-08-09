/* eslint-disable react/react-in-jsx-scope */
// material-ui

// ==============================|| FOOTER - AUTHENTICATION ||============================== //
const year = new Date().getFullYear();

const AuthFooter = () => (
  <footer style={{ bottom: 0, position: 'fixed', width: '100%' }}>
    <div style={{ margin: '0 auto', padding: '10px 0 8px 0', textAlign: 'center', backgroundColor: '#131313c3', color: '#dfdfdf' }}>
      &copy;
      {' '}
      {year}
      {' '}
      <a href="https://anukys.com/" target="_blank" rel="noreferrer" style={{ color: '#f1f1f1', textDecoration: 'none' }}>Anukys Europe SL.</a>
      {' '}
      All rights reserved.
    </div>
  </footer>
);

export default AuthFooter;
