import React from 'react';

function HeaderVideo() {
  // let video = document.querySelector('video');
  //   window.addEventListener('scroll', function() {
  //     let value = 1 + window.scrollY/-500;
  //     video.style.opacity = value;
  //     console.log(value);
  //   });
  
  return (
    <div className='hero-container'>
      <video src="/video/video.mkv" autoPlay loop muted></video>
      <h1>AQUASCAPING</h1>
      <p>Aquascaping ou aquapaisagismo é a arte de utilizar elementos para criar representações naturias da própria natureza em aquários. Existem diversas técnicas mas basicamente podem ser utilizadas plantas aquáticas, peixes, crustáceos entre outras coisas.</p>
      <div className="h-line"></div>
    </div>
  );
}

export default HeaderVideo;
