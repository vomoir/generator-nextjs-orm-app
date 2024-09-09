import Generator from "yeoman-generator";
// import { glob, globSync, globStream, globStreamSync, Glob } from "glob";

export default class extends Generator {
  initializing() {
    var today = new Date();
    this.log(`It's working! ${today}`);
  }

  welcome() {
    this.log("Welcome! Muahahaha!");
  }

  async prompting() {
    let githubUsername;
    try {
      githubUsername = await this.user.github.username();
      this.log(githubUsername);
    } catch (e) {}

    this.answers = await this.prompt([
      {
        type: "input",
        name: "componentName",
        message: "Your Component name",
        default: this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "confirm",
        name: "srcDir",
        message: "Use a 'src' folder?",
        default: false,
        sore: true,
      },
      {
        type: "input",
        name: "assetsFolder",
        message: "Folder name for application assets (e.g., images)",
        default: "public", // Default folder name for assets
        store: true,
      },
      {
        type: "confirm",
        name: "includeInstall",
        message: "Install dependencies?",
        default: true,
      },

      // {
      //     type: 'input',
      //     name: 'githubUsername',
      //     message: 'GitHub username:',
      //     default: githubUsername,
      //     store: true
      // },
    ]);
  }

  writing() {
    const { componentName, assetsFolder, srcDir } = this.answers;
    this.log(`Assets folder: ${assetsFolder}`);
    this.destinationRoot(this.destinationPath(componentName));
    let srcPath = "app";

    if (srcDir) {
      srcPath = "src/app";
    }

    this.fs.copy(
      this.templatePath("env/gitignore"),
      this.destinationPath(".gitignore")
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
      this.templatePath("env/tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );

    this.fs.copy(
      this.templatePath("env/tailwind.config.ts"),
      this.destinationPath("tailwind.config.ts")
    );

    this.fs.copy(
      this.templatePath("env/prettier.config.js"),
      this.destinationPath("prettier.config.js")
    );

    // Creates a file from scratch:
    this.fs.write(this.destinationPath("FRUNOBULAX.txt"), `# ${componentName}`);

    this.fs.copyTpl(
      this.templatePath("Component.js"),
      this.destinationPath(`src/components/${componentName}.js`),
      { componentName: componentName, srcPath: srcPath }
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json")
    );

    this.fs.copyTpl(
      this.templatePath("postcss.config.js"),
      this.destinationPath("postcss.config.js")
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      { componentName: componentName }
    );

    // Create the assets/public folder
    this.fs.copy(
      this.templatePath(`${assetsFolder}`),
      this.destinationPath(`${assetsFolder}`)
    );

    //   Copy over the bulk of the application files,
    //   substituting the src/app or /app path depending on the choice.
    this.fs.copyTpl(
      this.templatePath("core/**/*"),
      this.answers.srcDir
        ? this.destinationPath(`src/app`)
        : this.destinationPath(`app`),
      { srcPath: srcPath }
    );

    // Replace name in package.json with selected project name
    const packageJson = this.fs.readJSON(this.destinationPath("package.json"));
    packageJson.name = "@vomsoft/" + componentName;
    this.fs.writeJSON(this.destinationPath("package.json"), packageJson);
  }
  //  Initialise the node dependencies
  install() {
    if (this.answers.includeInstall) {
      this.spawnSync("npm", ["install"]);
    }
  }

  end() {
    this.log("******************************************");
    this.log(`Run the project: cd ${this.answers.componentName} then...`);

    this.log(` 'npm run dev'`);

    this.log(
      `Seed the SQLite db: cd ${this.answers.componentName}/app then 'node connect.js'`
    );
    this.log("******************************************");
  }
}
