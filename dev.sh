#!/bin/bash

./sync.sh
cd replnotes && npm run firebase &
cd replnotes && npm run dev &
cd user && npm run dev