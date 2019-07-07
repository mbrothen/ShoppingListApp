const gulp = require('gulp');
const gulpNodemon = require('gulp-nodemon');
const gulpYaml = require('gulp-yaml');
const gulpWatch = require('gulp-watch');

gulp.task('nodemon', ()=> {
    gulpNodemon({
        script: './index.js',
        ingnore: ['node_modules/']
    }).on('restart', (file)=> {
        console.log('Detected changes in: ${files]');
    });
});

gulp.task('default', gulp.series(['nodemon']));