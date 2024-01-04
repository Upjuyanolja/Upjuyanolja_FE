import React from 'react';
function Footer() {
  return (
    <div>
      <button>
        <a href="https://terms.yanolja.com/basicTerms" data-testid="btn1">
          이용 약관
        </a>
      </button>
      <button>
        <a href="https://terms.yanolja.com/privacyUse" data-testid="btn2">
          개인정보 처리방침
        </a>
      </button>
    </div>
  );
}

export default Footer;
