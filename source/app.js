(function () {
  if (!window.addEventListener) return // Check for IE9+

  const UPDATE_DELAY = 1500
  const elements = []
  let options = INSTALL_OPTIONS
  let updateTimeout

  function updateElements () {
    options.embeds
      .reverse()
      .forEach((embed, i) => {
        const element = elements[i] = INSTALL.createElement(embed.location, elements[i])
        element.setAttribute('app', 'add-video')

        embed.player = {
          videos: [{
            id: 'abc123',
            sources: [
              {
                src: 'https://video.t3st3r.net/3313222/7133d724388d8bb6bd16144b1433dc1e.out/manifest/video.mpd',
                type: 'application/dash+xml'
              },
              {
                src: 'https://video.t3st3r.net/3313222/7133d724388d8bb6bd16144b1433dc1e.out/manifest/video.m3u8',
                type: 'application/x-mpegURL'
              }
            ]
          }]
        }

        const mediaPlayer = INSTALL.createMediaPlayer(embed.player)
        element.appendChild(mediaPlayer)
      })
  }

  window.INSTALL_SCOPE = {
    setOptions (nextOptions) {
      clearTimeout(updateTimeout)
      options = nextOptions

      updateTimeout = setTimeout(() => {
        elements.forEach(element => INSTALL.createElement(null, element))

        updateElements()
      }, UPDATE_DELAY)
    }
  }

  function tempBootstrap () {
    const bundlerScript = document.createElement('script')
    bundlerScript.src = 'https://teffen.fwd.wf/media.js'
    bundlerScript.addEventListener('load', updateElements)

    document.head.appendChild(bundlerScript)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tempBootstrap)
  } else {
    tempBootstrap()
  }
}())
