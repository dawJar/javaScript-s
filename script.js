(function() {

    var container = document.getElementById('app-container');
    var btnLetItSnow = document.getElementById('btn');
    var windowWidth = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;
    var windowHeight = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
    var appWidth = windowWidth - 40;
    var appHeight = windowHeight - 40;
    var letItSnowInterval;
    var snowballsArray = [];
    var snowballId = 0;
    var speed = 20;
    var snowballFall = 1;

    var addSnowball = function () {
        createSnowball();
        if (letItSnowInterval === undefined) {
            startSnowing();
        }
    }

    var startSnowing = function () {
        letItSnowInterval = setInterval(moveSnowballs, speed);
    }

    var moveSnowballs = function () {
        if (snowballsArray.length > 0) {
            snowballsArray = snowballsArray.filter(x => {
                var condition = x.top < appHeight;
                if (!condition) {
                    var toDelete = document.getElementById(String(x.key));
                    toDelete.parentNode.removeChild(toDelete);
                    delete toDelete;
                }
                return condition;
            });
            snowballsArray = snowballsArray.map(x => {
                var newTopVal = x.top + snowballFall;
                setSnowbalTopStyle(x.key, newTopVal);
                return {
                    key: x.key,
                    top: newTopVal
                }
            });
        } else {
            clearInterval(letItSnowInterval);
            letItSnowInterval = undefined;
        }
    }

    var createSnowball = function () {
        var snowball = document.createElement('i');
        var startTopVal = 0;
        var generatedLeftVal = generateRandomInPixels(0, appWidth);
        var generatedFontSize = generateRandomInPixels(16, 40);

        snowball.id = snowballId++;
        snowball.className = 'fa fa-snowflake-o';
        snowball.style.position = 'absolute';
        snowball.style.left = generatedLeftVal + 'px';
        snowball.style.fontSize = generatedFontSize + 'px';

        container.appendChild(snowball);

        setSnowbalTopStyle(snowball.id, startTopVal);
        snowballsArray = [...snowballsArray,
                            { key: parseInt(snowball.id), top: startTopVal }];
    }

    var setSnowbalTopStyle = function (id, topVal) {
        document.getElementById(String(id)).style.top = topVal + 'px';
    }

    var generateRandomInPixels = function (lowerLimit, upperLimit) {
        return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
    }

    btnLetItSnow.addEventListener('click', addSnowball);

})();
