export default async function decorate() {
    const video_banner = document.querySelector(".videobanner");
    if (video_banner) {
      const anchorTag = video_banner.querySelector("a");
      if (anchorTag) {
        const videoLink = anchorTag.getAttribute("href");
        const videoTag = document.createElement("video");
        videoTag.setAttribute("src", videoLink);
        videoTag.setAttribute("controls", true);
        videoTag.setAttribute("autoplay", true); 
        videoTag.setAttribute("loop", true); 
        videoTag.setAttribute("muted", true); 
        videoTag.setAttribute("preload", "auto"); 
        
        // Set initial style for video
        videoTag.style.width = "100%";
        videoTag.style.height = "100%";
        videoTag.style.objectFit = "cover";
        videoTag.style.borderRadius = "0px"; 
        
        const videoBannerWrapper = anchorTag.parentElement;
        videoBannerWrapper.replaceChild(videoTag, anchorTag);
        const playPauseButton = document.createElement('button');
        const playIcon = document.createElement('img');
        playIcon.setAttribute('src', '../../icons/play.png'); 
        playIcon.setAttribute('alt', 'Play');
        playPauseButton.appendChild(playIcon);
        videoBannerWrapper.appendChild(playPauseButton);
        playPauseButton.classList.add("play-pause");

        playPauseButton.addEventListener('click', () => {
          if (videoTag.paused) {
            videoTag.play().catch(error => {
              console.log("Play failed:", error);
            });
           
            playIcon.setAttribute('src', '../../icons/pause.png'); 
            playIcon.setAttribute('alt', 'Pause');
          } else {
            videoTag.pause();
          
            playIcon.setAttribute('src', '../../icons/play.png'); 
            playIcon.setAttribute('alt', 'Play');
          }
        });
  
        // Add scroll event listener to zoom out and apply border radius as you scroll down
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY;
          const minZoom = 0.85; 
          const maxRadius = 50; 
  
          // Calculate scale and border radius based on scroll position
          const scaleValue = Math.max(minZoom, 1 - scrollTop / 500); 
          const borderRadiusValue = Math.min(maxRadius, scrollTop / 10); 
  
          video_banner.style.transform = `scale(${scaleValue})`;
          video_banner.style.borderRadius = `${borderRadiusValue}px`;
  
          videoTag.style.borderRadius = `${borderRadiusValue}px`;
        });
      } else {
        console.log("No <a> tag found in the video banner.");
      }
    } else {
      console.log("No .videobanner element found.");
    }
  }
  