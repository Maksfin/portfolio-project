const blur = (function () {

    const container = document.querySelector('.b-works-form');
    const sectionEl = document.querySelector('.b-works-what');
    const blurEl = document.createElement('.b-works-form__blur');

    return {
        init: function () {
            const width = sectionEl.offsetWidth;
            const height = sectionEl.offsetHeight;
            const left = container.offsetLeft;
            const bottom = height - (container.offsetTop + container.offsetHeight);

            blurEl.style.width = width + "px";
            blurEl.style.height = height + "px";
            blurEl.style.left = `-${left}px`;
            blurEl.style.bottom = `-${bottom}px`;
        }
    }
}());

module.exports = blur;