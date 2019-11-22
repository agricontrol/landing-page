#!/bin/bash

tar -czvf page.tar.gz dist

scp page.tar.gz "${1}@${2}:public_html"

ssh "${1}@${2}" << EOF
cd public_html
rm -rf data css img js *.html *.txt .htaccess
tar -xzvf page.tar.gz
mv dist/* .
mv dist/.htaccess .
rm -rf page.tar.gz dist
exit
EOF

rm page.tar.gz
