#!/bin/bash
yarn build
echo "Build completed"
rm -rf ../atom-settings-prod/dist
echo "Removing old dist folder"
mv dist ../atom-settings-prod
echo "Moving new dist folder"
git add .
git commit -am "Deploy"
git push
echo "Is it building?"