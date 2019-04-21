;(function() {
  let currentTarget = null;

  const topEl = document.createElement('div');
  topEl.className = 'chrome_plugin_toTop';
  topEl.style.cssText = `
    position: fixed;
    display: none;
    width: 40px;
    height: 40px;
    right: 10px;
    bottom: 10px;
    background-color: rgba(39,174,96,.6);
    z-index: 100000;
    cursor: pointer;
    border-radius: 2px;
    color: #fff;
    justify-content: center;
    align-items: center;
  `;

  topEl.innerHTML = `
    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg t="1555770118113" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2193" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
      <defs><style type="text/css"></style></defs>
      <path fill="#fff" d="M588.231374 851.58652h-1.14889c-7.934337 0-14.367124 6.430789-14.367124 14.367124v63.219941c0 7.93134 6.431788 14.367124 14.367124 14.367124h1.14889c7.935336 0 14.369122-6.434785 14.369122-14.367124V865.953644c0-7.936335-6.433786-14.367124-14.369122-14.367124z m182.18704-401.155555S789.959541 149.276825 508.346529 0.999035c0 0-262.072885 117.242765-262.072885 449.43193 0 0-97.702637 45.977594-97.702637 165.519138 0 119.542543 100.001417 175.865146 127.587773 183.911375 27.586357 8.046229 41.379035-12.642789 42.528925-25.288576 1.149889-12.642789 4.598559-49.426263 13.793678-49.426263 9.196118 0 54.023823 70.117279 72.41506 75.863729 18.391237 5.748448 198.852944 3.446671 209.197952-1.14889 10.34401-4.59756 65.518721-77.011621 71.26617-75.86373 5.74645 1.14889 17.241348 52.874932 18.389239 57.471493 1.14889 4.59756 12.643788 29.886135 41.381034 18.391238 28.735247-11.493899 127.586774-67.816501 127.586774-183.911375 0-116.092875-102.299197-165.518139-102.299198-165.518139z m-260.922995 11.494898c-66.655623 0-120.691434-54.034812-120.691434-120.691434s54.035811-120.692433 120.691434-120.692433S630.185854 274.577807 630.185854 341.234429c0 66.655623-54.034812 120.691434-120.690435 120.691434z m-0.575444 389.660657h-1.148891c-7.936335 0-14.368123 6.430789-14.368123 14.367124v143.680231c0 7.933338 6.431788 14.367124 14.368123 14.367124h1.148891c7.935336 0 14.368123-6.432787 14.368123-14.367124V865.953644c0.000999-7.936335-6.432787-14.367124-14.368123-14.367124z m0.575444-582.767151c-41.263147 0-74.71384 33.450693-74.71384 74.71384s33.449694 74.71384 74.71384 74.71384 74.712841-33.450693 74.712841-74.71384-33.448695-74.71384-74.712841-74.71384z m-77.587065 582.767151h-1.149889c-7.935336 0-14.368123 6.430789-14.368123 14.367124v63.219941c0 7.93134 6.431788 14.367124 14.368123 14.367124h1.149889c7.935336 0 14.368123-6.434785 14.368123-14.367124V865.953644c0-7.936335-6.432787-14.367124-14.368123-14.367124z" p-id="2194"></path>
    </svg>
  `;

  topEl.onmouseover = () => {
    topEl.style.backgroundColor = '#27ae60';
  };
  topEl.onmouseout = () => {
    topEl.style.backgroundColor = 'rgba(39,174,96,.6)';
  };
  topEl.onclick = () => {
    animate({
      duration: 500,
      draw(progress) {
        currentTarget.scrollTop = currentTarget.scrollTop * ( 1- progress);
      }
    })
  };

  document.body.appendChild(topEl);

  function animate({timing = (timeFraction) => {
    return timeFraction < 0 ? 0 : timeFraction;
  }, draw, duration}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      // calculate the current animation state
      let progress = timing(timeFraction)
      draw(progress); // draw it
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  function handleScroll(event) {
    currentTarget = event.target.documentElement;
    const rect = currentTarget.getBoundingClientRect();
    const top = Math.abs(rect.top);
    
    if (top >= 100) {
      topEl.style.display = 'flex';
    } else {
      topEl.style.display = 'none';
    }
  }

  window.addEventListener('scroll', handleScroll);
})();