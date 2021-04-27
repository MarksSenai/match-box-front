# Match-Box Server Front

## How to use

This Front-end is used along with Match-Box Server MS (back-end). Thus, only `git clone https://bitbucket.org/machinecomm/matchbox-server-front` to the folder of 
your preference and have the Match-Box Server MS repository also cloned at the same folder location.

## Build the Front
Within the root of the project

* `npm install`
* `ng build --prod` or ` npm run ng build --prod`
If after this process a dist folder can be located then everything is set

Copy the full path of this folder to the pom.xml from Match-Box Server MS. Under the `<directory>> </<directory>` section