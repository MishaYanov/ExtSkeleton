#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command =>{
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}

const repoName = process.argv[2];

const gitCheckout = `git clone --depth 1 https://github.com/MishaYanov/ExtSkeleton.git ${repoName}`;

const install = `cd ${repoName} && npm install`;

console.log(`Creating ${repoName}...`);
const checkout = runCommand(gitCheckout) 
if(!checkout) process.exit(1);

console.log(`Installing dependencies...`);
const installDeps = runCommand(install);
if(!installDeps) process.exit(1);
