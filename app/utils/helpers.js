const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime);

module.exports = {
    format_time: (date) => {
        return dayjs(date).fromNow();
    },
    section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
    },
    count: (arr) => {
        if (arr.length === 1) {
            return `1 comment`
        } else {
            return `${arr.length} comments`;
        } 
    }
}