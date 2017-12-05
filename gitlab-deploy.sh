#!/bin/bash
yarn build
echo "Build completed"
rm -rf ../atom-settings-prod/public
echo "Removing old dist folder"
mv dist ../atom-settings-prod/public
echo "Moving new dist folder"
cd ../atom-settings-prod
git add .
git commit -am "Deploy"
git push
echo "Is it building?"