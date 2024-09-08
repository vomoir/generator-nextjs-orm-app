import Generator from 'yeoman-generator';
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob';

export default class extends Generator {
    initializing() {
        var today = new Date();
        this.log(`It's working! ${today}`);
    }

    welcome() {
        this.log("Welcome! Muahahaha!");
    }

    async prompting() {
        let githubUsername
        try {
            githubUsername = await this.user.github.username();
            this.log(githubUsername);
        } catch (e) { }

        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'componentName',
                message: 'Your Component name',
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'assetsFolder',
                message: 'Folder name for application assets (e.g., images)',
                default: 'public' // Default folder name for assets
            },
            {
                type: 'input',
                name: 'githubUsername',
                message: 'GitHub username:',
                default: githubUsername,
            },
        ]);
    }

    writing() {
        const { componentName, assetsFolder } = this.answers;
        this.log(assetsFolder);
        this.destinationRoot(this.destinationPath(componentName));
        this.fs.write(this.destinationPath('README.md'), `# ${componentName}`);
        this.fs.copyTpl(
            this.templatePath('Component.js'),
            this.destinationPath(`src/components/${componentName}.js`),
            { componentName: componentName }
        );

        // Create the assets folder
        this.fs.copy(
            this.templatePath('assets'),
            this.destinationPath(`${assetsFolder}`)
        );

        this.fs.copy(
            this.templatePath('app/dashboard'),
            this.destinationPath('src/app/dashboard')
        );
    }
}
