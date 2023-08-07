/* eslint-disable react/react-in-jsx-scope */
// material-ui

// ==============================|| FOOTER - AUTHENTICATION ||============================== //
const year = new Date().getFullYear();

const AuthFooter = () => (
  <footer>
    <div style={{ margin: '0 auto', padding: 5, textAlign: 'center', backgroundColor: '#0d0d10dc', color: '#f2f2f2' }}>
      &copy;
      {' '}
      {year}
      {' '}
      <a href="https://anukys.com/" target="_blank" rel="noreferrer" style={{ color: '#f2f2f2' }}>Anukys Europe SL.</a>
      {' '}
      All rights reserved.
    </div>
  </footer>
);

export default AuthFooter;
