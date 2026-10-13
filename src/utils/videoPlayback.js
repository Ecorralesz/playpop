export function pauseOtherVideos(activeVideo) {
  activeVideo.ownerDocument.querySelectorAll('video[data-playpop-video]').forEach((video) => {
    if (video !== activeVideo && !video.paused) video.pause();
  });
}

// One session per mounted source. Cleanup invalidates pending promises before
// pausing, so a late rejection cannot unmute or restart a newly selected clip.
export function createVideoPlaybackSession(video, onStatusChange = () => {}) {
  let stopped = false;
  let request = 0;

  const play = async ({ withSound = true } = {}) => {
    if (stopped) return false;
    const currentRequest = ++request;
    const isCurrent = () => !stopped && currentRequest === request;
    pauseOtherVideos(video);
    video.muted = !withSound;
    onStatusChange('starting');

    try {
      await video.play();
    } catch (error) {
      if (!isCurrent()) return false;
      // AbortError means another operation interrupted playback, not an audio
      // policy restriction. Let the visitor retry rather than fight that action.
      if (withSound && error?.name !== 'AbortError') {
        video.muted = true;
        try {
          await video.play();
        } catch {
          if (isCurrent()) onStatusChange('blocked');
          return false;
        }
      } else {
        onStatusChange('blocked');
        return false;
      }
    }

    if (!isCurrent()) return false;
    onStatusChange('playing');
    return true;
  };

  return {
    play,
    stop() {
      stopped = true;
      request++;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        // Some browsers reject seeking before media metadata is available.
      }
    },
  };
}

export function getAdjacentVideo(videos, videoId, direction) {
  const index = videos.findIndex((video) => video.id === videoId);
  if (index < 0 || videos.length < 2) return null;
  return videos[(index + direction + videos.length) % videos.length];
}
