const rootSelector = '[data-js-video-player]'

class VideoPlayer {
    selectros = {
        root: rootSelector,
        video: '[data-js-video-player-video]',
        panel: '[data-js-video-player-panel]',
        playButton: '[data-js-video-player-play-button]',
    }

    stateClasses = {
        isActive: 'is-active'
    }
 
    constructor(rootElement) {
        this.rootELement = rootElement
        this.videoElement = this.rootELement.querySelector(this.selectros.video)
        this.panelElement = this.rootELement.querySelector(this.selectros.panel)
        this.playButtonElement = this.rootELement.querySelector(this.selectros.playButton)

        this.bindEvents()
    }

    onPlayButtonClick = () => {
        this.videoElement.play()
        this.videoElement.controls = true
        this.panelElement.classList.remove(this.stateClasses.isActive)
    }

    onVideoPause = () => {
        this.videoElement.controls = false
        this.panelElement.classList.add(this.stateClasses.isActive)
    }

    bindEvents() {
        this.playButtonElement.addEventListener('click', this.onPlayButtonClick)
        this.videoElement.addEventListener('pause', this.onVideoPause)
    }
}

class VideoPlayerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {    
            new VideoPlayer(element)                                               
        })
    }
}

export default VideoPlayerCollection