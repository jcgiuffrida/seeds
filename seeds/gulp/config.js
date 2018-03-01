
let apps = [
  'contacts',
];

module.exports = {
  sass: {
    files: [
      {
        src: 'seeds/scss/*.scss',
        dest: 'contacts/static/contacts',
      },
    ],
    dirs: function(){
      return apps.map(
        a => ({
          // Pattern to find source and destination directories based on apps
          src: `seeds/scss/${a}/*.scss`, 
          dest: `${a}/static/${a}`,
        })
      ).concat(this.files);
    },
  },
  js: {
    files: [],
    dirs: function(){
      return apps.map(
        a => ({
          src: `seeds/js/${a}/*.js`,
          dest: `${a}/static/${a}`,
        })
      ).concat(this.files);
    },
  },
  html: {
    src: ['**/templates/*.html'],
  },
}
