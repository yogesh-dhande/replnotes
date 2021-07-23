#!/bin/bash

# watch "cp -r user/components replnotes/" user/components &
# watch "cp -r user/services replnotes/" user/services

rsyncb() {
    rsync -Pru "$1"/* "$2"
    rsync -Pru "$2"/* "$1"
}

while true; do rsyncb user/components/ replnotes/components/ ; sleep 1; done &
while true; do rsyncb user/services/ replnotes/services/ ; sleep 1; done &

cd replnotes && npm run firebase &
cd replnotes && npm run dev &
cd user && npm run dev