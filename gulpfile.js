const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const path = require("path");

// ** Pug のコンパイル **
const compilePug = () => {
  return gulp
    .src(["src/pages/**/*.pug", "!src/components/**"]) // `_`で始まるファイルは対象外
    .pipe(plumber()) // エラーが発生しても止まらないようにする
    .pipe(pug({ pretty: true })) // PugをHTMLに変換（圧縮しない）
    .pipe(gulp.dest("dist")) // 出力先
    .pipe(browserSync.stream());
};

// ** SCSS のコンパイル **
const compileSass = () => {
  return gulp
    .src(["src/styles/**/*.scss", "!src/styles/**/_*.scss"]) // `_`で始まるファイルは対象外
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("dist/common/css"))
    // .pipe(cssnano())
    // .pipe(rename({ suffix: ".min" }))
    // .pipe(gulp.dest("dist/common/css"))
    .pipe(browserSync.stream());
};

const compileJS = () => {
  return gulp
    .src("src/scripts/**/*.js")
    .pipe(gulp.dest("dist/common/js"))
    .pipe(browserSync.stream());
}

const copyImages = () => {
  return gulp.src("src/public/images/**/*", { encoding: false })
    .pipe(gulp.dest("dist/common/images"));
};

// ** ブラウザの自動リロード設定 **
const serve = () => {
  browserSync.init({
    server: { baseDir: "dist" },
    open: true,
    notify: false,
    injectChanges: true,
    cache: false,
  });

  gulp.watch("src/pages/**/*.pug", compilePug);
  gulp.watch("src/components/**/*.pug", compilePug);
  gulp.watch("src/styles/**/*.scss", compileSass);
  gulp.watch("src/scripts/**/*.js", compileJS);
  gulp.watch("src/public/images/**/*", gulp.series(copyImages));
  gulp.watch("dist/**/*.html").on("change", browserSync.reload);
};

// ** デフォルトタスク **
exports.default = gulp.series(
  gulp.parallel(compilePug, compileSass, compileJS, copyImages),
  serve
);
