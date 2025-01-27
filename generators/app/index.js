import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";

export default class extends Generator {
  initializing() {}

  welcome() {
    this.log("N E X T J S ORM  P R O J E C T");
  }

  async prompting() {
    let msgText =
      "This generator will scaffold a functioning NextJS ORM project for you.\n\n";
    msgText +=
      "It will create a new folder with the name you specify, and populate it with the necessary files.\n";
    msgText +=
      "It will also install the necessary dependencies and initialise the database using drizzle-kit.";
    this.log(
      yosay(
        chalk.red.bold("Welcome to the NextJS ORM Project generator!\n\n") +
          chalk.whiteBright(msgText)
      )
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "fullNextJsAppName",
        message: "Your Simple NextJs ORM Project name:",
        default: this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "input",
        name: "appTitle",
        message:
          "What is the title of your app? (will appear in headings etc):",
        default: this.fullNextJsAppName ? this.fullNextJsAppName : this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "confirm",
        name: "useSrcDir",
        message: "Use a 'src' folder?",
        default: false,
        store: true,
      },
      {
        type: "confirm",
        name: "includeInstall",
        message: "Install dependencies? (**will take some time**):",
        default: true,
      },
    ]);
  }

  writing() {
    const { fullNextJsAppName, useSrcDir, appTitle } = this.answers;

    //  Make sure there's no spaces in application name (and lowercase)
    const nextJsAppName = fullNextJsAppName.replace(/\s+/g, "_").toLowerCase();

    this.destinationRoot(this.destinationPath(nextJsAppName));

    let srcPath = "app";
    if (useSrcDir) {
      srcPath = "src/app";
    }

    //  Copy files in 'env' folder that don't need renaming
    this.fs.copyTpl(
      this.templatePath("environment/*"),
      this.destinationPath(""),
      { srcPath: srcPath, appTitle: appTitle }
    );

    //  Copy individual config files that need a '.' prepended to their name
    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/env"),
      this.destinationPath(".env")
    );

    this.log("***copied environment folder");

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

    this.fs.copyTpl(
      this.templatePath("environment/tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      {
        srcPath: srcPath,
        appTitle: appTitle,
      }
    );

    //   Copy over the bulk of the application files,
    //   substituting the src/app or /app path depending on the choice and the app's title.

    this.fs.copyTpl(
      this.templatePath("core/**/*"),
      this.answers.useSrcDir
        ? this.destinationPath(`src/app`)
        : this.destinationPath(`app`),
      { srcPath: srcPath, appTitle: appTitle }
    );

    this.log("***copying components folders...");

    this.fs.copyTpl(
      this.templatePath("core/components/**/*"),
      this.destinationPath("components"),
      { appTitle: appTitle }
    );

    this.log("***copying drizzle/db config folders...");

    this.fs.copyTpl(
      this.templatePath("core/db/**/*"),
      this.destinationPath("db"),
      {
        srcPath: srcPath,
        appTitle: appTitle,
      }
    );

    this.fs.copyTpl(
      this.templatePath("core/drizzleconfig/drizzle.config.ts"),
      this.destinationPath("drizzle.config.ts"),
      {
        srcPath: srcPath,
        appTitle: appTitle,
      }
    );

    this.fs.copyTpl(
      this.templatePath("public/**/*"),
      this.destinationPath("public"),
      { appTitle: appTitle }
    );

    // Adding specific dependencies to package.json:
    this.log("adding dependencies to package.json...");
    // drizzle kit needs to be this version (0.22.8) as the drizzle-kit push command fails on later versions (known bug)
    const pkgJson = {
      devDependencies: {
        "drizzle-kit": "^0.22.8",
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
      this.spawnSync("npx drizzle-kit migrate");
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
