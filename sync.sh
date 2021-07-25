#!/bin/bash

rsyncb() {
    rsync -Pru "$1"/* "$2"
    rsync -Pru "$2"/* "$1"
}

while true; do rsyncb user/components/ replnotes/components/ ; sleep 1; done &
while true; do rsyncb user/services/ replnotes/services/ ; sleep 1; done