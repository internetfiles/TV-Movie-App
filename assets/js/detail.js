for (const { key, name } of filterVideos(videos)) {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");

    if (isYoutubeVideo(key)) {
        videoCard.innerHTML = `
            <iframe
              width="500"
              height="294"
              src="https://www.youtube.com/embed/${key}?theme=dark&color=white&rel=0"
              frameborder="0"
              allowfullscreen="1"
              title="${name}"
              class="img-cover"
              loading="lazy"
            ></iframe>
        `;
    } else {
        videoCard.innerHTML = `
            <iframe
              width="500"
              height="294"
              src="https://vidsrc.xyz/embed/movie/${key}?sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&ds_langs=en,de"
              frameborder="0"
              allowfullscreen="1"
              title="${name}"
              class="img-cover"
              loading="lazy"
            ></iframe>
        `;
    }

    document.body.appendChild(videoCard);
}

function isYoutubeVideo(key) {
    // Assuming you have a function to determine if the video is from YouTube
    // You can implement this based on the format of the video key
    // For example, checking if the key starts with 'yt' or if it's a valid YouTube video ID
    // Return true if it's a YouTube video, false otherwise
}
