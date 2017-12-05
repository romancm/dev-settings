#!/bin/bash
yarn build
echo "Build completed"
echo "Removing old dist files and folder"
rm -rf ../atom-settings-prod/static
rm -rf ../atom-settings-prod/index.html
rm -rf ../atom-settings-prod/service-worker.js
echo "Moving new dist files and folder"
mv dist/* ../atom-settings-prod/
echo "Pushing files to Heroku"
git add .
git commit -am "Deploying"
git push heroku master