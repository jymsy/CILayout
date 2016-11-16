module.exports = {
    inited: false,
    call: function (param) {
        if (!this.inited) {
            console.log('call');
            this.inited = true;
        } else {
            console.log('inited');
        }

    }
};