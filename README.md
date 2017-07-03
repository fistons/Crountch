# Crountch! URL shortener

## What?
Crountch is an really basic URL shortener writen in ECMAScript for node.js using babel, pug, express and sqlite 

## Why?
I wanted to understand what node.js was so suddently popular. I still doesn't understand.

# Requirement
 * `node.js` Obviously. Don't know wich version. A recent one I guess.
 * `npm` but since it comes with `node.js`...
 * (Optional) `git` to clone/update the sources

# Installation
 * Create a dedicaced user: `sudo useradd crountch`
 * Create the installation folder: `sudo mkdir -p /opt/Crountch`
 * Give this folder to the crountch user: `sudo chown crounch:crountch /opt/Crountch`
 * Clone this repository: `sudo -u crountch git clone https://github.com/fistons/Crountch /opt/Crountch`
 * Go to this folder: `cd /opt/Crountch`
 * Install the depencies: `sudo -u crountch npm install`
 * Compile the ugly ECMAScript 2015 in a more ugly vanilla javascript for node: `sudo -u crountch npm run build`
 * That's it

# Run
 * You can run it "as is" with `npm run serve` 
 * Or you can use the `systemd` script in `init`:
    * `sudo cp /opt/Crountch/init/crountch.service /etc/systemd/system/`
    * `sudo systemctl daemon-reload`
    * `sudo systemctl start crountch` To run it
    * `sudo systemctl enable crountch` To enable it on boot 
    * You are not using systemd? Too bad, but maybe there is someone good in this world who would contribute with a nice script for your init system?
