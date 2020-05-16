function generateTags(title) {
    title = title.toLowerCase();
    return title.split(' ');
}

module.exports = generateTags;