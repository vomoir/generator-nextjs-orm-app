import Generator from "yeoman-generator";

export default class extends Generator {
  initializing() {

  }

  welcome() {
    this.log(`N E X T J S  P R O J E C T`);
    this.log("Welcome!");
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "nextJsAppNAme",
        message: "Your Simple Authorisation Project name",
        default: this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "input",
        name: "appTitle",
        message: "What is the title of your app? (will appear in headings etc)",
        default: this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "confirm",
        name: "includeInstall",
        message: "Install dependencies? (**will take some time**)",
        default: true,
      },
    ]);
  }

  writing() {
    const { nextJsAppNAme, srcDir, appTitle } = this.answers;
    this.destinationRoot(this.destinationPath(nextJsAppNAme));

    let srcPath = "app";

    this.fs.copy(
      this.templatePath("env/next.config.mjs"),
      this.destinationPath("next.config.mjs")
    );

    this.fs.copy(
      this.templatePath("env/gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("env/globals.css"),
      this.destinationPath("globals.css")
    );

    this.fs.copy(
      this.templatePath("env/editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath("env/eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath("env/prettier.config.js"),
      this.destinationPath("prettier.config.js")
    );

    this.fs.copy(
      this.templatePath("env/tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );

    this.fs.copy(
      this.templatePath("env/tailwind.config.ts"),
      this.destinationPath("tailwind.config.ts")
    );

    this.fs.copy(
      this.templatePath("env/drizzle.config.ts"),
      this.destinationPath("drizzle.config.ts")
    );

    this.fs.copy(
      this.templatePath("env/env"),
      this.destinationPath(".env")
    );

    this.log("copied env folder")

    this.fs.copy(
      this.templatePath("package.json"),
      this.destinationPath("package.json")
    );

    this.fs.copy(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      { nextJsAppNAme: nextJsAppNAme }
    );

    //   Copy over the bulk of the application files,
    //   substituting the src/app or /app path depending on the choice and the app's title.

    this.fs.copyTpl(
      this.templatePath("app/**/*"),
      this.destinationPath('app'),
      { appTitle: appTitle }
    );

    this.log("copying components folders...");

    this.fs.copyTpl(
      this.templatePath("components/**/*"),
      this.destinationPath('components'),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("drizzle/**/*"),
      this.destinationPath('drizzle'),
      { appTitle: appTitle }
    );


    this.fs.copyTpl(
      this.templatePath("lib/**/*"),
      this.destinationPath('lib'),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("public/**/*"),
      this.destinationPath('public'),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("types/**/*"),
      this.destinationPath('types'),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("styles/**/*"),
      this.destinationPath('styles'),
      { appTitle: appTitle }
    );

    // Replace name in package.json with selected project name
    const packageJson = this.fs.readJSON(this.destinationPath("package.json"));
    packageJson.name = "@vomsoft/" + nextJsAppNAme;
    this.fs.writeJSON(this.destinationPath("package.json"), packageJson);
  }
  //  Initialise the node dependencies
  install() {
    if (this.answers.includeInstall) {
      console.log("Installing dependencies, please wait...");
      this.spawnSync("npm", ["install"]);

      this.log("...installing drizzle orm...");

      const cmdLine = `npm i drizzle-orm better-sqlite3`;
      // this.spawnSync("npm", ["i drizzle-orm@latest"])
      // this.log("...installing drizzle kit...");
      // this.spawnSync("npm", ["install, better-sqlite3"])
      this.spawnSync("npx drizzle-kit generate");
      this.spawnSync("npx drizzle-kit push");
    }
  }

  end() {
    this.log("******************************************");
    this.log(`Run the project:`);
    this.log(`    cd ${this.answers.nextJsAppNAme}`);
    this.log(`then...`);
    this.log(`    'npm run dev'`);
    let srcPath = this.answers.srcDir
      ? `src/app` : `app`;

    this.log("******************************************");
  }
}
