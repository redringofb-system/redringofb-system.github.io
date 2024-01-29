// reserve 10 % loading for bootstrapping
var INITIAL_LOAD_PERCENT = 10;

var fileLoadErrors = [];
var initialized = false;

// resize handler will only be called before the game starts, forcing a reload
function gameResizeHandler() {
    window.location.reload();
}

function initCAGame() {
    // without setting the domain here we will have CORS error when accessing the parents variables
    var arrDomain = location.hostname.split('.');
    if (arrDomain.length > 2 && !/amazonaws/.test(location.hostname) && !/(?:[0-9]{1,3}\.){3}[0-9]{1,3}/.test(location.hostname)) {
        arrDomain.shift();
        document.domain = arrDomain.join('.');
    }

    // set retry loader hook
    window.preloader = {};
    var fileCounter = 0;
    var files = ['../shared/lib/phaser.min.js', 'js/main.js'];
    var retries = parent.window.gameBridge ? parent.window.gameBridge.info.numberOfRetries : 1;
    var retriesRemaining = retries;

    var loadNext = function(_retriesRemaining) {
        if (++fileCounter < files.length) {
            loadJS(files[fileCounter], loadNext, _retriesRemaining);
        }
        updateParentLoader(INITIAL_LOAD_PERCENT * fileCounter / files.length);
    }

    loadJS(files[fileCounter], loadNext, retries);


    window.addEventListener('resize', gameResizeHandler, false);
}

function updateParentLoader(percent) {
    if (parent.window.gameBridge) {
        parent.window.gameBridge.updateLoadProgress(percent);
    }
}

function getTrimmedName(name) {
    var nameEntry = name;
    if (nameEntry.length > NAME_MAX) {
        nameEntry = nameEntry.substring(0, NAME_MAX) + '…';
    }

    return nameEntry;
}

function loadJS(url, implementationCode, retriesRemaining) {
    var scriptTag = document.createElement('script');
    var onError = function() {
        console.warn('retrying load', url);
        if (retriesRemaining) {
            loadJS(url, implementationCode, --retriesRemaining);
        } else {
            console.error('unable to load', url);
        }
    }
    scriptTag.src = url;
    scriptTag.onerror = onError;
    scriptTag.onload = implementationCode;
    if (implementationCode) {
        scriptTag.onreadystatechange = implementationCode.bind(this, retriesRemaining);
    }

    document.getElementsByTagName('head')[0].appendChild(scriptTag);
};

function findScoreIndex(leaderboardText, scoreAttribute) {
    var scoreIndex = -1;
    var i;
    var studentId = parent.window.gameBridge ? parent.window.gameBridge.info.studentId : null;
    if (leaderboardText != null && leaderboardText[scoreAttribute] != null) {
        var len = leaderboardText[scoreAttribute].length;
        for (i = 0; i < len; i++) {
            if (leaderboardText[scoreAttribute][i].studentId === studentId && leaderboardText[scoreAttribute][i].score == score)
                scoreIndex = i;
        }
    }

    return scoreIndex;
}

initCAGame();

// retry hooks
function initRetryLoaders(game, context, cb) {
    var retries = parent.window.gameBridge ? parent.window.gameBridge.info.numberOfRetries : 1;
    game.load.onFileComplete.add(fileComplete, context);
    game.load.onFileError.add(fileError, context);
    game.load.onLoadComplete.add(loadComplete.bind(context, cb, retries), context);
}

//  This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    // console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    // can load up to 99%
    if (!initialized) {
        updateParentLoader(INITIAL_LOAD_PERCENT - 1 + progress * .9);
    }

}

function fileError(key, file) {
    console.warn('file load error', key, file)
    fileLoadErrors.push(file);

}

function loadComplete(cb, retries) {
    if (fileLoadErrors.length) {
        console.warn("Load Complete w/ errors", retries, ' retries remaining');
        if (retries) {
            retryLoadFailures(cb, --retries);
        }
    } else {
        if (cb) {
            cb();
        }
    }
}

function retryLoadFailures(cb, retries) {
    loader = new Phaser.Loader(game);
    loader.onFileComplete.add(fileComplete, this);
    loader.onFileError.add(fileError, this);
    loader.onLoadComplete.add(loadComplete.bind(this, cb, retries), this);
    var timestamp = Date.now().toString();

    while (fileLoadErrors.length) {
        var file = fileLoadErrors.pop();
        var url = file.url + '?ts=' + timestamp
        console.log('retrying', file)
        if (file.type === 'spritesheet') {
            loader[file.type](file.key, url, file.frameWidth, file.frameHeight, file.frameMax);
        } else {
            loader[file.type](file.key, url);
        }
    };
    loader.start();
}