# TFC+ Discord Bot

This is a bot for the TFC+ discord server. It is currently incomplete. In this iteration, I intended to learn some more JS, as well as principles of clean code. I was adviced to look into Pure Functions, and I realized that it was a good way to write clean, testable code. Clean code makes me happier to work on the bot, and therefore speeds up development.

## Install

### Development
Node 10 or above is recommended. You will need the Yarn package manager.
Run 

`yarn install`

`yarn build`

This will compile files in /src to the out directory, which can be used in production.

The compilation is actually two-fold, due to limitations of Babel. With the advice of another engineer, I decided to go against using Gulp to automate this. Instead, all this is done within the `build` script. First, the /src directory is compiled. Then, the /commands directory is compiled, and the output from the commands copied into the /out folder. The /out folder can now be used to run the bot. 

### Test
Test files using the tests in /tests, using the Jest test driver.

`yarn test`

/config/test.json is required, as otherwise Node-config complains. https://github.com/lorenwest/node-config/wiki/Strict-Mode

**Remember to build your files before you test!**