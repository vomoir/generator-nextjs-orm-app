import Generator from "yeoman-generator";

export default class extends Generator {
  initializing() {}

  welcome() {
    this.log(`N E X T J S  P R O J E C T`);
    this.log("Welcome!");
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "fullNextJsAppName",
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
    const { fullNextJsAppName, srcDir, appTitle } = this.answers;

    //  Make sure there's no spaces in application name (and lowercase)
    const nextJsAppName = fullNextJsAppName.replace(/\s+/g, "_").toLowerCase();

    this.destinationRoot(this.destinationPath(nextJsAppName));

    let srcPath = "app";

    //  Copy files in 'env' folder that don't need renaming
    this.fs.copy(this.templatePath("env/*"), this.destinationPath(""));

    //  Copy individual config files that need a '.' prepended to their name
    this.fs.copy(
      this.templatePath("env/dotconfigfiles/gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("env/dotconfigfiles/editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath("env/dotconfigfiles/eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath("env/dotconfigfiles/env"),
      this.destinationPath(".env")
    );

    this.log("copied env folder");

    this.fs.copy(
      this.templatePath("template_package.json"),
      this.destinationPath("package.json")
    );

    this.fs.copy(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      { nextJsAppName }
    );

    //   Copy over the bulk of the application files,
    //   substituting the src/app or /app path depending on the choice and the app's title.

    this.fs.copyTpl(
      this.templatePath("app/**/*"),
      this.destinationPath("app"),
      { appTitle: appTitle }
    );

    this.log("copying components folders...");

    this.fs.copyTpl(
      this.templatePath("components/**/*"),
      this.destinationPath("components"),
      { appTitle: appTitle }
    );

    this.log("copying drizzle config folders...");

    this.fs.copyTpl(
      this.templatePath("drizzle/**/*"),
      this.destinationPath("drizzle"),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("lib/**/*"),
      this.destinationPath("lib"),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("public/**/*"),
      this.destinationPath("public"),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("types/**/*"),
      this.destinationPath("types"),
      { appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("styles/**/*"),
      this.destinationPath("styles"),
      { appTitle: appTitle }
    );

    // Adding specific depenmdencies to package.json:
    this.log("adding dependencies to package.json...");
    // drizzle kit needs to be this version (0.22.8) as the drizzle-kit push command fails on later versions (known bug)
    const pkgJson = {
      devDependencies: {
        "drizzle-kit": "0.22.8",
      },
      dependencies: {
        react: "^18.2.0",
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);

    this.log("Replacing name in package.json with selected project name...");

    const packageJson = this.fs.readJSON(this.destinationPath("package.json"));
    packageJson.name = "@vomsoft/" + nextJsAppName;
    this.fs.writeJSON(this.destinationPath("package.json"), packageJson);
  }

  //  Initialise the node dependencies
  install() {
    if (this.answers.includeInstall) {
      console.log("Installing dependencies, please wait...");
      this.spawnSync("npm", ["install"]);

      this.log("...initialising db using drizzle kit...");
      this.spawnSync("npx drizzle-kit generate");
      this.spawnSync("npx drizzle-kit push");
    }
  }

  end() {
    this.log("******************************************");
    this.log(`Run the project:`);
    this.log(`    cd ${this.answers.fullNextJsAppName}`);
    this.log(`then...`);
    this.log(`    'npm run dev'`);
    this.log("******************************************");
  }
}
